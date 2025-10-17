"use client";

import { useState } from "react";
import Image from "next/image";
import Hero from "./components/Hero";
import Section from "./components/Section";
import { MapEmbed } from "./components/Maps";
import OSAForm from "./components/OSAForm";
import Countdown from "./components/Countdown";
import PasswordProtection from "./components/PasswordProtection";
import GiftReservation from "./components/GiftReservation";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <PasswordProtection onAuthenticated={handleAuthenticated} />;
  }
  return (
    <div className="font-sans min-h-screen">
      <header className="sticky top-0 z-50 backdrop-blur bg-[color:var(--background)]/80 border-b border-black/10">
        <nav className="mx-auto max-w-5xl px-4 py-3">
          <ul className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-base">
            <li>
              <a href="#vigsel">Vigsel</a>
            </li>
            <li>
              <a href="#festen">Festen</a>
            </li>
            <li>
              <a href="#bra-att-veta">Bra att veta</a>
            </li>
            <li>
              <a href="#gavor">Gåvor</a>
            </li>
            <li>
              <a href="#osa">OSA</a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 space-y-35">
        <div className="hidden lg:block absolute top-140 -left-28 w-80 h-180 rotate-5">
          <Image src="/tree.png" alt="Tree" fill className="object-fill" />
        </div>
        <Hero />
        <Section id="om-oss">
          <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-black/10 bg-black/5">
            <Image
              src="/IMG_1698.jpeg"
              alt="Om oss"
              fill
              className="object-cover"
            />
          </div>
        </Section>

        <Section id="countdown">
          <Countdown />
        </Section>
        <div className="hidden lg:block absolute top-350 -right-20 w-80 h-180 -rotate-20">
          <Image src="/hearts.png" alt="Hearts" fill className="object-fill" />
        </div>
        <Section id="vigsel" title="Vigsel">
          <div className="grid gap-4 sm:grid-cols-2 mb-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-tl-md border border-black/10 bg-black/5">
              <Image
                src="/kyrka.jpg"
                alt="Kyrka"
                fill
                className="object-cover"
                unoptimized
                priority={false}
              />
            </div>
            <MapEmbed
              title="Karta till vigseln"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2042.214968568528!2d17.8821204!3d59.2124216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f7175b1b359cb%3A0xd33b26195e1f9d74!2sTullinge%20kyrka!5e0!3m2!1ssv!2sse!4v1759694562989!5m2!1ssv!2sse"
            />
          </div>
          <div className="bg-white/85 border border-black/10 rounded-b-md p-8 sm:p-10 shadow-sm text-center">
            <p>Vigseln äger rum kl. 14:30 i Tullinge kyrka.</p>
            <p className="mt-3 text-sm text-black/70">
              Adress: Ulvsbergsvägen 1, 146 54 Tullinge
            </p>
          </div>
        </Section>

        <Section id="festen" title="Middag och fest">
          <div className="grid gap-4 sm:grid-cols-2 mb-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-tl-md border border-black/10 bg-black/5">
              <Image
                src="/sundby.jpg"
                alt="Middag och fest"
                fill
                className="object-cover"
                sizes="(min-width: 640px) 50vw, 100vw"
                priority={false}
              />
            </div>
            <MapEmbed
              title="Karta till festen"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2042.8581353480724!2d18.019115077311255!3d59.201669621232675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f7a7a8514047b%3A0xb8c9412b5bcc2b81!2sSundby%20g%C3%A5rd!5e0!3m2!1ssv!2sse!4v1759695212731!5m2!1ssv!2sse"
            />
          </div>
          <div className="bg-white/85 border border-black/10 rounded-b-md p-8 sm:p-10 shadow-sm text-center">
            <p>Middag och fest börjar kl. 16:00 på Sundby gård.</p>
            <p>
              Vi bjuder på 3-rätters middag med dryck, bröllopstårta och fest in
              på småtimmarna.
            </p>
            <p className="mt-3 text-sm text-black/70">
              Adress: Sundby gårdsväg 5, 141 91 Huddinge
            </p>
          </div>
        </Section>

        <Section id="bra-att-veta" title="Bra att veta">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="bg-white/85 border border-black/10 rounded-lg shadow-sm text-center">
              <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg border border-black/10 bg-black/5 mb-4">
                <Image
                  src="/klädkod.jpg"
                  alt="Klädkod"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-2 sm:p-6">
                <h3 className="text-xl font-bold mb-2">Klädkod: Kavaj</h3>
                <p>
                  För herrar innebär kavaj att man ska bära kostym. Men val av
                  färg både på kavajen och skjortan gör du själv. För damer
                  innebär det klänning, kjol, byxdress eller dräkt.
                </p>
              </div>
            </div>
            <div className="bg-white/85 border border-black/10 rounded-lg shadow-sm text-center">
              <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg border border-black/10 bg-black/5 mb-4">
                <Image
                  src="/barn.jpg"
                  alt="Barnpolicy"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-2 sm:p-6">
                <h3 className="text-xl font-bold mb-2">Barn</h3>
                <p>
                  Barn är underbara men den här dagen väljer vi att fira i vuxet
                  sällskap över 15 år.
                </p>
              </div>
            </div>
            <div className="bg-white/85 border border-black/10 rounded-lg shadow-sm text-center">
              <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg border border-black/10 bg-black/5 mb-4">
                <Image
                  src="/middag.jpg"
                  alt="Allergier"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-2 sm:p-6">
                <h3 className="text-xl font-bold mb-2">Mat och dryck</h3>
                <p>
                  Förrätt, huvudrätt, efterrätt och bröllopstårta. Vi bjuder på
                  dryck under middagen och baren har öppet resten av kvällen
                  till självkostnadspris.
                </p>
              </div>
            </div>
          </div>
        </Section>

        <Section id="gavor" title="Gåvor">
          <div className="bg-white/85 border border-black/10 rounded-lg p-8 sm:p-10 shadow-sm">
            <div className="text-center mb-8">
              <p className="text-lg mb-6">
                Din närvaro är allt vi önskar. Men vill ni ändå uppmärksamma vår
                stora dag med en gåva, har vi samlat några önskningar.
              </p>
              <p className="text-sm text-black/70">
                För att undvika dubletter ber vi er reservera gåvor nedan
                (självklart anonymt).
              </p>
            </div>
            <GiftReservation />
          </div>
        </Section>

        <Section id="osa" title="OSA">
          <div className="bg-white/85 border border-black/10 rounded-lg p-4 sm:p-2 shadow-sm text-center">
            <OSAForm />
          </div>
        </Section>
      </main>

      <footer className="border-t border-black/10 py-8 text-center text-sm text-black/60">
        © {new Date().getFullYear()} Caroline & Kevin
      </footer>
    </div>
  );
}
