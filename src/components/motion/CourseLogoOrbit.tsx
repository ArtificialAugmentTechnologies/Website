import type { CSSProperties } from "react";
import { BrainCircuit } from "lucide-react";
import companyLogo from "@/assets/images/A2-logo-orbit.gif";
import staticLogo from "@/assets/images/A2-logo-orbit-still.png";
import aws from "@/assets/images/tech/aws.png";
import azure from "@/assets/images/tech/azure.png";
import claude from "@/assets/images/tech/claude.png";
import github from "@/assets/images/tech/github.png";
import huggingFace from "@/assets/images/tech/huggingface.svg";
import langGraph from "@/assets/images/tech/langgraph.png";
import python from "@/assets/images/tech/python.png";
import sql from "@/assets/images/tech/sql.png";

type Technology = { label: string; src?: string; wide?: boolean };

// Inner ring turns anticlockwise, outer ring clockwise. Badges counter-turn to stay upright.
const INNER: Technology[] = [
  { label: "AI & ML" },
  { label: "Claude", src: claude },
  { label: "Hugging Face", src: huggingFace },
  { label: "LangGraph", src: langGraph, wide: true },
];
const OUTER: Technology[] = [
  { label: "Python", src: python },
  { label: "SQL", src: sql },
  { label: "Azure", src: azure },
  { label: "AWS", src: aws },
  { label: "GitHub", src: github },
];

type OrbitStyle = CSSProperties & { "--orbit-dur": string };

function Badge({ item }: { item: Technology }) {
  return (
    <span className="tech-orbit-item">
      <span className="tech-orbit-badge">
        {item.src ? (
          <img src={item.src} alt="" draggable={false} className={item.wide ? "is-wide" : undefined} />
        ) : (
          <BrainCircuit aria-hidden="true" strokeWidth={1.8} />
        )}
      </span>
      <span className="tech-orbit-label">{item.label}</span>
    </span>
  );
}

/** One ring that turns; `size` is its diameter as a % of the orbit box. */
function Ring({ items, size, duration, reverse = false, offset = 0 }: { items: Technology[]; size: number; duration: number; reverse?: boolean; offset?: number }) {
  const style: OrbitStyle = { width: `${size}%`, height: `${size}%`, "--orbit-dur": `${duration}s` };
  return (
    <div className={`tech-orbit-ring ${reverse ? "tech-orbit-ccw" : "tech-orbit-cw"}`} style={style}>
      {items.map((item, i) => {
        const angle = offset + (360 / items.length) * i;
        return (
          <div key={item.label} className="tech-orbit-arm" style={{ transform: `rotate(${angle}deg)` }}>
            <div className="tech-orbit-anchor" style={{ transform: `translate(-50%, -50%) rotate(${-angle}deg)` }}>
              <div className={reverse ? "tech-orbit-cw" : "tech-orbit-ccw"} style={{ "--orbit-dur": `${duration}s` } as OrbitStyle} title={item.label}>
                <Badge item={item} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Glowing orange dots riding a ring (decorative). */
function Sparks({ size, count, duration, reverse = false }: { size: number; count: number; duration: number; reverse?: boolean }) {
  const style: OrbitStyle = { width: `${size}%`, height: `${size}%`, "--orbit-dur": `${duration}s` };
  return (
    <div className={`tech-orbit-ring ${reverse ? "tech-orbit-ccw" : "tech-orbit-cw"}`} style={style} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="tech-orbit-arm" style={{ transform: `rotate(${(360 / count) * i + 20}deg)` }}>
          <span className="tech-orbit-spark" style={{ animationDelay: `${i * 0.7}s` }} />
        </div>
      ))}
    </div>
  );
}

export function CourseLogoOrbit() {
  return (
    <div
      className="course-logo-orbit tech-orbit"
      role="img"
      aria-label="A² Technologies logo surrounded by Python, SQL, Azure, AWS, GitHub, AI & ML, Claude, Hugging Face and LangGraph"
    >
      <div className="tech-orbit-track tech-orbit-track-outer" aria-hidden="true" />
      <div className="tech-orbit-track tech-orbit-track-middle" aria-hidden="true" />
      <div className="tech-orbit-track tech-orbit-track-dashed" aria-hidden="true" />
      <div className="tech-orbit-track tech-orbit-pulse" aria-hidden="true" />

      <Sparks size={68} count={3} duration={26} reverse />
      <Sparks size={94} count={4} duration={40} />

      <div className="tech-orbit-center">
        <div className="tech-orbit-core">
          <img src={companyLogo} width={600} height={600} alt="" className="course-orbit-gif" />
          <img src={staticLogo} width={600} height={600} alt="" className="course-orbit-still" />
        </div>
      </div>

      <Ring items={INNER} size={52} duration={48} reverse offset={45} />
      <Ring items={OUTER} size={94} duration={70} />
    </div>
  );
}
