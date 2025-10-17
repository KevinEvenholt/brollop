import { PropsWithChildren } from "react";

type SectionProps = PropsWithChildren<{
  id: string;
  title?: string;
}>;

export default function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mx-auto max-w-8xl px-3 sm:px-6">
        {title && (
          <h2 className="text-4xl font-bold mb-5 text-center">{title}</h2>
        )}
        <div className="space-y-4">{children}</div>
      </div>
    </section>
  );
}
