import { lazy, Suspense, useEffect, useRef, useState } from "react";
import type { ScenePalette } from "./TechnologyScene";

const TechnologyScene = lazy(() => import("./TechnologyScene"));

export function InteractiveArtwork() {
  const ref = useRef<HTMLDivElement>(null);
  const [palette, setPalette] = useState<ScenePalette | null>(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const css = getComputedStyle(document.documentElement);
    setPalette({ primary: css.getPropertyValue("--primary").trim(), accent: css.getPropertyValue("--accent").trim(), secondary: css.getPropertyValue("--secondary").trim(), light: css.getPropertyValue("--surface-foreground").trim() });
    const update = () => setPaused(document.documentElement.dataset["motion"] === "paused");
    update();
    window.addEventListener("motionchange", update);
    const node = ref.current;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry?.isIntersecting ?? false));
    if (node) observer.observe(node);
    return () => { observer.disconnect(); window.removeEventListener("motionchange", update); };
  }, []);
  return (
    <div ref={ref} className="technology-artwork" aria-hidden="true">
      {palette && <Suspense fallback={null}><TechnologyScene palette={palette} paused={paused || !visible} /></Suspense>}
    </div>
  );
}