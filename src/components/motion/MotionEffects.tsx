import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MotionEffects() {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPaused(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    document.documentElement.dataset["motion"] = paused ? "paused" : "active";
    window.dispatchEvent(new Event("motionchange"));
  }, [paused]);
  useEffect(() => {
    let frame = 0;
    let active: HTMLElement | null = null;
    const reset = () => {
      active?.style.setProperty("--card-x", "0deg");
      active?.style.setProperty("--card-y", "0deg");
      active = null;
    };
    const onMove = (event: PointerEvent) => {
      if (paused || event.pointerType !== "mouse") return;
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>(".card-lift") : null;
      if (active !== target) reset();
      active = target;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--card-x", `${(0.5 - (event.clientY - rect.top) / rect.height) * 7}deg`);
      target.style.setProperty("--card-y", `${((event.clientX - rect.left) / rect.width - 0.5) * 7}deg`);
    };
    const updateScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const range = document.documentElement.scrollHeight - window.innerHeight;
        document.documentElement.style.setProperty("--reading-progress", `${range > 0 ? window.scrollY / range : 0}`);
      });
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", reset);
    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();
    return () => { reset(); cancelAnimationFrame(frame); document.removeEventListener("pointermove", onMove); document.removeEventListener("pointerleave", reset); window.removeEventListener("scroll", updateScroll); };
  }, [paused]);
  return (
    <>
      <div className="reading-progress" aria-hidden="true" />
      <Button variant="outline" size="icon" className="motion-toggle" onClick={() => setPaused((value) => !value)} aria-label={paused ? "Resume animations" : "Pause animations"} title={paused ? "Resume animations" : "Pause animations"}>
        {paused ? <Play aria-hidden /> : <Pause aria-hidden />}
      </Button>
    </>
  );
}