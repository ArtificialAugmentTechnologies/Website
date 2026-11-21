"""Live owner-isolation and signup-trigger checks; requires test server credentials."""
import os
import secrets
import unittest
import requests

class ProfileRules(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.url = os.environ.get('SUPABASE_URL')
        cls.admin = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')
        cls.public = os.environ.get('SUPABASE_ANON_KEY') or os.environ.get('SUPABASE_PUBLISHABLE_KEY') or os.environ.get('VITE_SUPABASE_PUBLISHABLE_KEY')
        if not cls.public:
            from pathlib import Path
            for line in Path('.env').read_text().splitlines():
                if line.startswith('VITE_SUPABASE_PUBLISHABLE_KEY='):
                    cls.public = line.split('=', 1)[1].strip().strip('"').strip("'")
        if not all([cls.url, cls.admin, cls.public]):
            raise unittest.SkipTest('Live test connection unavailable')
        cls.users = []
        cls.headers = {'apikey': cls.admin, 'Authorization': 'Bearer '+cls.admin}
        for _ in range(2):
            email = 'a2-verification-'+secrets.token_hex(8)+'@artificialaugmenttechnologies.com'
            password = secrets.token_urlsafe(28)
            created = requests.post(cls.url+'/auth/v1/admin/users', headers=cls.headers, json={'email':email,'password':password,'email_confirm':True,'user_metadata':{'display_name':'Learning verification'}})
            created.raise_for_status()
            uid = created.json()['id']
            cls.users.append({'id':uid,'email':email,'password':password})
            signin = requests.post(cls.url+'/auth/v1/token?grant_type=password',headers={'apikey':cls.public},json={'email':email,'password':password})
            signin.raise_for_status()
            cls.users[-1]['headers']={'apikey':cls.public,'Authorization':'Bearer '+signin.json()['access_token']}
    @classmethod
    def tearDownClass(cls):
        for user in cls.users:
            requests.delete(cls.url+'/auth/v1/admin/users/'+user['id'],headers=cls.headers).raise_for_status()
    def test_signup_creates_personal_profile(self):
        user=self.users[0]
        result=requests.get(self.url+'/rest/v1/profiles',headers=user['headers'],params={'id':'eq.'+user['id'],'select':'display_name'})
        result.raise_for_status()
        self.assertEqual(result.json(),[{'display_name':'Learning verification'}])
    def test_profiles_are_owner_only(self):
        result=requests.get(self.url+'/rest/v1/profiles',headers=self.users[0]['headers'],params={'select':'id'})
        result.raise_for_status()
        self.assertEqual(result.json(),[{'id':self.users[0]['id']}])
    def test_other_profile_cannot_be_updated(self):
        headers={**self.users[0]['headers'],'Prefer':'return=representation'}
        result=requests.patch(self.url+'/rest/v1/profiles',headers=headers,params={'id':'eq.'+self.users[1]['id']},json={'display_name':'Forbidden change'})
        result.raise_for_status()
        self.assertEqual(result.json(),[])
    def test_anonymous_profiles_are_not_readable(self):
        result=requests.get(self.url+'/rest/v1/profiles',headers={'apikey':self.public},params={'select':'id'})
        if result.status_code == 200:
            self.assertEqual(result.json(),[])
        else:
            self.assertIn(result.status_code,[401,403])

if __name__ == '__main__': unittest.main()
