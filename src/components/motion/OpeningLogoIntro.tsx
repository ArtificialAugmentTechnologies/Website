import { useEffect, useState, type ReactNode } from "react";
import loader from "@/assets/images/A2-logo-loader-once.gif";
import { Button } from "@/components/ui/button";

/** Plays once when the site link is first opened; never replays on navigation. */
export function OpeningLogoIntro({ children }: { children: ReactNode }) {
  const [dismissed, setDismissed] = useState(false);
  const visible = !dismissed;
  const dismiss = () => setDismissed(true);

  useEffect(() => {
    if (!visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDismissed(true);
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // One full GIF loop (86 frames ≈ 3.6s): white line draws, orange arrow finishes, then the site opens.
    const timeout = window.setTimeout(() => setDismissed(true), 3700);
    return () => {
      window.clearTimeout(timeout);
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  return (
    <>
      <div inert={visible}>{children}</div>
      {visible && (
        <div className="opening-logo-intro" role="dialog" aria-modal="true" aria-label="A² Technologies opening animation">
          <img
            src={loader}
            alt="A² Technologies — animated white line and orange arrow"
            width={600}
            height={600}
            fetchPriority="high"
            className="opening-logo-image"
            onError={dismiss}
          />
          <Button variant="onDark" size="sm" autoFocus className="opening-logo-skip" onClick={dismiss}>
            Skip
          </Button>
        </div>
      )}
    </>
  );
}
