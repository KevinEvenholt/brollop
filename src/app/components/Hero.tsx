export default function Hero() {
  return (
    <section className="text-center pt-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <h1 className="flex items-center justify-center gap-4 text-[96px] sm:text-[120px] leading-none">
            <span>C</span>
            <span
              className="inline-block"
              style={{ width: 1, height: "1.2em", background: "var(--accent)" }}
            />
            <span>K</span>
          </h1>
        </div>
        <h2 className="text-base sm:text-lg">Caroline & Kevin</h2>
        <h2 className="text-base sm:text-lg">2026-06-13</h2>
      </div>
    </section>
  );
}
