"use client";

import { useState, useRef, useEffect } from "react";

export default function OsaForm() {
  const [step, setStep] = useState<"choose" | "form">("choose");
  const [guestCount, setGuestCount] = useState<number | null>(null);
  const [guests, setGuests] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [attending, setAttending] = useState(true);
  const [allergies, setAllergies] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const handleChoose = (count: number) => {
    setGuestCount(count);
    setGuests(Array(count).fill(""));
    setStep("form");
  };

  // Scroll to form when transitioning to step 2
  useEffect(() => {
    if (step === "form" && formRef.current) {
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [step]);

  // Check if form is valid
  const isFormValid = () => {
    if (!email.trim()) return false;
    if (guests.some((guest) => !guest.trim())) return false;
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, guests, attending, allergies, message }),
    });
    if (res.ok) setSent(true);
  };

  // --- Tackmeddelande ---
  if (sent)
    return (
      <div className="max-w-3xl mx-auto">
        <div className="text-center p-8">
          <h2
            className="text-3xl font-serif font-light mb-4"
            style={{ color: "var(--accent)" }}
          >
            💌 Tack för ditt svar!
          </h2>
          {attending ? (
            <p className="text-lg">
              Vi har fått din OSA och ser fram emot att fira med er!
            </p>
          ) : (
            <p className="text-lg">
              Vi har fått din OSA och förstår att ni inte kan komma. Vi kommer
              att sakna er på vår stora dag.
            </p>
          )}
        </div>
      </div>
    );

  // --- Steg 1: välj antal gäster ---
  if (step === "choose")
    return (
      <div className="max-w-3xl px-4 py-8 mx-auto">
        <div className="">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-serif font-light mb-2">
              Antal gäster
            </h3>
            <p className="text-base text-black/70">
              Hur många personer vill du OSA för?
            </p>
          </div>
          <div className="grid grid-cols-5 gap-4 max-w-lg mx-auto">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => handleChoose(n)}
                className="h-16 text-xl font-medium border-2 border-black/10 rounded-lg hover:bg-black/5 cursor-pointer transition-colors"
                style={{ color: "var(--accent)" }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>
    );

  // --- Steg 2: formulär ---
  return (
    <div className="max-w-3xl mx-auto" ref={formRef}>
      <div>
        <div className="px-4 sm:px-8 pb-8">
          <div className="mb-6">
            <button
              type="button"
              onClick={() => setStep("choose")}
              className="cursor-pointer text-sm text-black/60 hover:text-black/80 transition-colors"
            >
              ← Tillbaka till antal gäster
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Guest Information */}
            <div className="space-y-6">
              {[...Array(guestCount ?? 0)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <label className="text-base font-medium text-left block">
                    Namn på gäst {i + 1} *
                  </label>
                  <input
                    type="text"
                    placeholder={`Namn på gäst ${i + 1}`}
                    value={guests[i]}
                    onChange={(e) => {
                      const updated = [...guests];
                      updated[i] = e.target.value;
                      setGuests(updated);
                    }}
                    required
                    className="w-full h-12 px-4 border-2 border-black/10 rounded-lg focus:border-accent focus:outline-none transition-colors"
                  />
                </div>
              ))}

              <div className="space-y-2">
                <label className="text-base font-medium text-left block">
                  E-postadress *
                </label>
                <input
                  type="email"
                  placeholder="E-postadress till en i sällskapet"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-12 px-4 border-2 border-black/10 rounded-lg focus:border-accent focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Attendance */}
            <div className="space-y-4 pt-4 border-t border-black/10">
              <label className="text-base font-medium text-left block">
                Kommer ni att delta? *
              </label>
              <div className="space-y-3">
                <div
                  className="flex items-center space-x-3 p-4 rounded-lg border-2 border-black/10 hover:border-accent transition-colors cursor-pointer"
                  onClick={() => setAttending(true)}
                >
                  <input
                    type="radio"
                    checked={attending}
                    onChange={() => setAttending(true)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <label className="flex-1 cursor-pointer text-base">
                    Kommer gladeligen
                  </label>
                </div>
                <div
                  className="flex items-center space-x-3 p-4 rounded-lg border-2 border-black/10 hover:border-accent transition-colors cursor-pointer"
                  onClick={() => setAttending(false)}
                >
                  <input
                    type="radio"
                    checked={!attending}
                    onChange={() => setAttending(false)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <label className="flex-1 cursor-pointer text-base">
                    Kan tyvärr inte
                  </label>
                </div>
              </div>
            </div>

            {/* Special Notes */}
            <div className="space-y-2 pt-4 border-t border-black/10">
              <label className="text-base font-medium text-left block">
                Allergier eller specialkost
              </label>
              <input
                placeholder="Beskriv eventuella allergier"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                className="w-full h-12 px-4 border-2 border-black/10 rounded-lg focus:border-accent focus:outline-none transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-base font-medium text-left block">
                Meddelande eller önskemål
              </label>
              <textarea
                placeholder="Dela era välgångar eller önskemål..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:border-accent focus:outline-none transition-colors resize-none"
                rows={4}
              />
            </div>

            <button
              type="submit"
              disabled={!isFormValid()}
              className={`w-full h-14 text-lg font-medium rounded-lg transition-colors ${
                isFormValid()
                  ? "bg-(--accent) text-white cursor-pointer hover:bg(--little-darker-green)"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Skicka OSA 💌
            </button>
          </form>
        </div>
      </div>

      <p className="text-center text-sm text-black/60 mt-8">
        Om ni har frågor, kontakta oss på{" "}
        <a
          href="mailto:carro_avila@hotmail.com"
          className="hover:underline"
          style={{ color: "var(--accent)" }}
        >
          carro_avila@hotmail.com
        </a>
      </p>
    </div>
  );
}
