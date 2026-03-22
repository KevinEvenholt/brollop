"use client";

import { useState } from "react";

export default function Tal() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [speechType, setSpeechType] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [details, setDetails] = useState("");
  const [sent, setSent] = useState(false);

  const isFormValid = () => {
    return (
      name.trim() &&
      email.trim() &&
      speechType.trim() &&
      timeframe.trim() &&
      details.trim()
    );
  };

  const showIntro =
    !name.trim() &&
    !email.trim() &&
    !speechType.trim() &&
    !timeframe.trim() &&
    !details.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/speach", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, speechType, timeframe, details }),
    });
    if (res.ok) setSent(true);
  };

  if (sent) {
    return (
      <div className="text-center">
        <h2 className="text-3xl font-serif font-light">Tack för din anmälan!</h2>
      </div>
    );
  } 

  return (
    <div className="mx-auto max-w-2xl text-left">
      {showIntro && (
        <>
          <p className="text-black/80 leading-relaxed text-center mb-4">
            Vill du hålla tal under bröllopet? Det gör oss så glada! 💛 Fyll
            gärna i formuläret nedan.
          </p>
          <p className="text-black/80 leading-relaxed text-center mb-8">
            Informationen skickas inte direkt till oss, utan till en i
            brudföljet som hjälper till att få dagen att flyta på så fint som
            möjligt.
          </p>
        </>
      )}
      <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
        <div className="sm:col-span-1">
          <label htmlFor="name" className="mb-1 block text-sm font-medium">
            Namn *
          </label>
          <input
            type="text"
            id="name"
            placeholder="Ditt namn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-md border border-black/15 bg-white px-3 py-2 outline-none transition focus:border-black/40 focus:ring-2 focus:ring-black/10"
          />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            E-post *
          </label>
          <input
            type="email"
            id="email"
            placeholder="din@email.se"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-md border border-black/15 bg-white px-3 py-2 outline-none transition focus:border-black/40 focus:ring-2 focus:ring-black/10"
          />
        </div>

        <div className="sm:col-span-1">
          <label
            htmlFor="timeframe"
            className="mb-1 block text-sm font-medium"
          >
            Ungefärlig tid
          </label>
          <input
            type="text"
            id="timeframe"
            placeholder="Till exempel 3-5 minuter"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="w-full rounded-md border border-black/15 bg-white px-3 py-2 outline-none transition focus:border-black/40 focus:ring-2 focus:ring-black/10"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="details" className="mb-1 block text-sm font-medium">
            Relevant information
          </label>
          <textarea
            id="details"
            placeholder="Skriv gärna om innehåll, upplägg eller annat som kan vara bra att veta."
            rows={5}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full rounded-md border border-black/15 bg-white px-3 py-2 outline-none transition focus:border-black/40 focus:ring-2 focus:ring-black/10"
          />
        </div>

        <div className="sm:col-span-2 flex justify-center pt-2">
          <button
            type="submit"
            disabled={!isFormValid()}
            className={`rounded-md px-6 py-2.5 text-white transition-colors ${
              isFormValid()
                ? "bg-(--accent) cursor-pointer hover:bg(--little-darker-green)"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Skicka anmälan
          </button>
        </div>
      </form>
    </div>
  );
}