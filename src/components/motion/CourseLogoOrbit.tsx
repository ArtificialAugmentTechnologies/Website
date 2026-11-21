import { BrainCircuit, Database } from "lucide-react";
import companyLogo from "@/assets/images/A2-logo-loader-v2.gif";
import powerBi from "@/assets/images/power-bi.svg";
import powerAutomate from "@/assets/images/power-automate.svg";
import python from "@/assets/images/python.svg";
import staticLogo from "@/assets/images/A2-app-logo.png";

const middleTechnologies = [
  { name: "Power BI", image: powerBi },
  { name: "Power Automate", image: powerAutomate },
];

const outerTechnologies = [
  { name: "SQL", icon: Database },
  { name: "Python", image: python },
  { name: "AI & ML", icon: BrainCircuit },
];

export function CourseLogoOrbit() {
  return (
    <div className="course-logo-orbit" role="group" aria-label="A² Technologies surrounded by course technologies">
      <div className="course-orbit-inner-ring" aria-hidden="true" />
      <div className="course-orbit-center">
        <img src={companyLogo} width={600} height={600} alt="A² Technologies animated logo" className="course-orbit-gif" />
        <img src={staticLogo} width={600} height={600} alt="A² Technologies logo" className="course-orbit-still" />
      </div>
      {[middleTechnologies, outerTechnologies].map((technologies, ringIndex) => (
        <ul key={ringIndex} className={`course-orbit-ring course-orbit-ring-${ringIndex === 0 ? "middle" : "outer"}`} aria-label={ringIndex === 0 ? "Middle ring course technologies" : "Outer ring course technologies"}>
          {technologies.flatMap((technology) => {
            const image = "image" in technology ? technology.image : undefined;
            const Icon = "icon" in technology ? technology.icon : undefined;
            return [
              <li key={technology.name} className="course-orbit-arm">
                <div className="course-orbit-node">
                  <div className="course-orbit-content">
                    <span className="course-orbit-logo">
                      {image ? <img src={image} width={40} height={40} alt="" /> : Icon ? <Icon aria-hidden="true" /> : null}
                    </span>
                    <span className="course-orbit-name">{technology.name}</span>
                  </div>
                </div>
              </li>,
              <li key={`${technology.name}-dot`} className="course-orbit-arm" aria-hidden="true">
                <span className="course-orbit-dot" />
              </li>,
            ];
          })}
        </ul>
      ))}
    </div>
  );
}