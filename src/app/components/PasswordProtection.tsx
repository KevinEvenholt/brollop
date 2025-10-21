"use client";

import { useState, useEffect } from "react";

interface PasswordProtectionProps {
  onAuthenticated: () => void;
}

export default function PasswordProtection({
  onAuthenticated,
}: PasswordProtectionProps) {
  const [dayInput, setDayInput] = useState("");
  const [monthInput, setMonthInput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if already authenticated
    const isAuthenticated = localStorage.getItem("weddingAuthenticated");
    if (isAuthenticated === "true") {
      onAuthenticated();
    } else {
      setIsLoading(false);
    }
  }, [onAuthenticated]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Check if input matches the correct date (13/06)
    if (dayInput === "13" && monthInput === "06") {
      localStorage.setItem("weddingAuthenticated", "true");
      onAuthenticated();
    } else {
      setError("Fel datum. Försök igen.");
    }
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Only allow numbers
    value = value.replace(/[^0-9]/g, "");

    // Limit to 2 characters
    if (value.length <= 2) {
      setDayInput(value);

      // Auto-focus to month input when day is complete
      if (value.length === 2) {
        const monthInput = document.getElementById(
          "monthInput"
        ) as HTMLInputElement;
        monthInput?.focus();
      }
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Only allow numbers
    value = value.replace(/[^0-9]/g, "");

    // Limit to 2 characters
    if (value.length <= 2) {
      setMonthInput(value);
    }
  };

  const handleDayKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // If backspace on empty day input, focus month input
    if (e.key === "Backspace" && dayInput === "") {
      const monthInput = document.getElementById(
        "monthInput"
      ) as HTMLInputElement;
      monthInput?.focus();
    }
  };

  const handleMonthKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // If backspace on empty month input, focus day input
    if (e.key === "Backspace" && monthInput === "") {
      const dayInput = document.getElementById("dayInput") as HTMLInputElement;
      dayInput?.focus();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p style={{ color: "var(--accent)" }}>Laddar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="bg-white/90 backdrop-blur-sm border border-green-200 rounded-2xl shadow-xl p-8 sm:p-12 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="mb-6">
            <h1 className="flex items-center justify-center gap-4 text-[48px] sm:text-[64px] leading-none mb-4">
              <span>C</span>
              <span
                className="inline-block"
                style={{
                  width: 1,
                  height: "1.2em",
                  background: "var(--accent)",
                }}
              />
              <span>K</span>
            </h1>
          </div>
          <h2
            className="text-xl sm:text-2xl font-serif font-light mb-2"
            style={{ color: "var(--accent)" }}
          >
            Caroline & Kevin
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Välkommen till vår bröllopssida
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
              Ange bröllopsdatumet (DD/MM) för att komma vidare
            </label>
            <div className="flex items-center justify-center gap-2">
              <input
                id="dayInput"
                type="text"
                value={dayInput}
                onChange={handleDayChange}
                onKeyDown={handleDayKeyDown}
                placeholder="DD"
                className="w-20 h-12 px-3 border-2 border-black/10 rounded-lg focus:border-(--accent) focus:outline-none transition-colors text-center text-lg font-medium"
                maxLength={2}
                autoComplete="off"
              />
              <span
                className="text-2xl font-bold"
                style={{ color: "var(--accent)" }}
              >
                /
              </span>
              <input
                id="monthInput"
                type="text"
                value={monthInput}
                onChange={handleMonthChange}
                onKeyDown={handleMonthKeyDown}
                placeholder="MM"
                className="w-20 h-12 px-3 border-2 border-black/10 rounded-lg focus:border-(--accent) focus:outline-none transition-colors text-center text-lg font-medium"
                maxLength={2}
                autoComplete="off"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={dayInput.length !== 2 || monthInput.length !== 2}
            className={`w-full h-12 text-lg font-medium rounded-lg transition-colors ${
              dayInput.length === 2 && monthInput.length === 2
                ? "bg-(--accent) text-white cursor-pointer hover:bg-(--little-darker-green)"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Fortsätt
          </button>
        </form>
      </div>
    </div>
  );
}
