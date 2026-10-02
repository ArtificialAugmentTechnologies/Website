import type { Faculty } from "@/data/people";

export function FacultyCard({ member }: { member: Faculty }) {
  return (
    <article className="card-lift flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <div className="flex items-start gap-4">
        <span
          aria-hidden
          className="flex size-14 shrink-0 items-center justify-center rounded-full border border-border bg-accent-soft font-display text-lg font-semibold text-accent-foreground"
        >
          {member.name.charAt(0).toUpperCase()}
        </span>
        <div>
          <h3 className="font-display text-base font-semibold leading-tight">{member.name}</h3>
          <p className="mt-1 text-sm font-medium text-secondary">{member.designation}</p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>

      <dl className="mt-4 space-y-1.5 text-xs text-muted-foreground">
        <div className="flex gap-2">
          <dt className="font-semibold text-foreground">Qualification</dt>
          <dd>{member.qualification}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="font-semibold text-foreground">Experience</dt>
          <dd>{member.experience}</dd>
        </div>
      </dl>

      <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
        {member.subjects.map((s) => (
          <li
            key={s}
            className="rounded-md bg-accent-soft px-2 py-1 text-[0.7rem] font-medium text-accent-foreground"
          >
            {s}
          </li>
        ))}
      </ul>
    </article>
  );
}
