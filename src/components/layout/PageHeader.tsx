import { BookOpen, GraduationCap, Code2 } from "lucide-react";
import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
}

/** Dark chocolate page banner used at the top of every inner page. */
export function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <section className="surface-panel page-depth">
      <div className="page-education-symbols" aria-hidden="true"><GraduationCap /><BookOpen /><Code2 /></div>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <p className="animate-reveal eyebrow text-accent">{eyebrow}</p>
        <h1 className="animate-reveal-late type-h1 mt-3 max-w-3xl">{title}</h1>
        {description && (
          <div className="animate-reveal-late type-body-lg mt-5 max-w-2xl space-y-4 text-surface-foreground/75">
            {description}
          </div>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
