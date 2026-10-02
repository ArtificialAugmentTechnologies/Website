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
    <section className="surface-panel">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <p className="eyebrow text-accent">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-bold sm:text-4xl md:text-5xl">{title}</h1>
        {description && (
          <div className="mt-5 max-w-2xl space-y-4 text-base leading-relaxed text-surface-foreground/75 md:text-lg">
            {description}
          </div>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
