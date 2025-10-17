"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { collection, doc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";

interface Gift {
  id: string;
  name: string;
  description: string;
  image?: string; // url to the image
  price?: string;
  link?: string; // URL to the gift/product
  reserved: boolean;
  reservedBy?: string;
  isSpecial?: boolean; // For cancerfonden and cervera gifts
}

export default function GiftReservation() {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [showAllGifts, setShowAllGifts] = useState(false);

  // Initialize gifts data
  useEffect(() => {
    const initialGifts: Gift[] = [
      {
        id: "cancerfonden",
        name: "Valfri gåva till Cancerfonden",
        description:
          "Vi vill bidra till Cancerfondens viktiga arbete. Alla bidrag är välkomna!",
        reserved: false,
        isSpecial: true,
      },
      {
        id: "cervera",
        name: "Presentkort på Cervera",
        description:
          "Presentkort på Cervera för att fylla vårt hem med vackra saker.",
        reserved: false,
        isSpecial: true,
      },
      {
        id: "bed-linen",
        name: "Sängkläder",
        description: "Mjuka och vackra sängkläder i bomull",
        price: "899 kr",
        reserved: false,
        isSpecial: false,
      },
      {
        id: "det-vilda-skafferiet-skarbrada-naturoljad-ek",
        name: "Skärbräda",
        description: "Skärbräda av ek.",
        image: "/skärbräda.avif",
        link: "https://www.bagarenochkocken.se/p/det-vilda-skafferiet-skarbrada-naturoljad-ek_60065/",
        price: "970 kr",
        reserved: false,
        isSpecial: false,
      },
      {
        id: "satake-ame-knivset",
        name: "Satake Ame Knivset",
        description:
          "Satake Ame Knivset är en perfekt gåva för den som har allt.",
        price: "2,941 kr",
        image: "/kniv.avif",
        link: "https://royaldesign.se/ame-knivset-petty-santoku-kiritsuke-3-delar",
        reserved: false,
        isSpecial: false,
      },
      {
        id: "nod-brodrost-4-skivor-rostfritt-stal",
        name: "Brödrost",
        description: "Nod brödrost för 4 skivor",
        price: "699 kr",
        image: "/bröd.avif",
        link: "https://www.bagarenochkocken.se/p/nod-brodrost-4-skivor-rostfritt-stal_58396/?utm_source=adtraction&utm_medium=affiliate&utm_campaign=Product+Tester_B%C3%A4st-i-Test.se&at_gd=EFF4D836E430273D24E9D98BC420FB5819B77FF1",
        reserved: false,
        isSpecial: false,
      },
    ];

    // Set initial gifts
    setGifts(initialGifts);

    // Set up real-time listener for reservations
    const unsubscribe = onSnapshot(
      collection(db, "reservations"),
      (snapshot) => {
        const reservations: Record<string, boolean> = {};
        snapshot.forEach((doc) => {
          reservations[doc.id] = doc.data().reserved;
        });

        // Update gifts with reservation status
        setGifts((prevGifts) =>
          prevGifts.map((gift) => ({
            ...gift,
            reserved: reservations[gift.id] || false,
          }))
        );
      }
    );

    return () => unsubscribe();
  }, []);

  const handleReserveGift = async (giftId: string) => {
    if (gifts.find((g) => g.id === giftId)?.isSpecial) {
      return; // Don't allow reservation of special gifts
    }

    const gift = gifts.find((g) => g.id === giftId);
    if (!gift) return;

    try {
      // Update reservation in Firebase
      await setDoc(doc(db, "reservations", giftId), {
        reserved: !gift.reserved,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };

  const visibleGifts = showAllGifts ? gifts : gifts.slice(0, 2);
  const hasMoreGifts = gifts.length > 2;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
        {visibleGifts.map((gift) => (
          <div
            key={gift.id}
            className={`bg-white/85 border-2 rounded-lg overflow-hidden shadow-sm transition-all ${
              gift.reserved
                ? "border-gray-300 bg-gray-100/50 opacity-60"
                : gift.isSpecial
                ? "border-blue-200 bg-blue-50/50"
                : "border-black/10 hover:border-accent"
            }`}
          >
            {gift.image && (
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={gift.image as string}
                  alt={gift.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="p-6">
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: "var(--accent)" }}
              >
                {gift.name}
              </h3>

              <p className="text-sm text-black/70 mb-4">
                {gift.description}
                {gift.link && (
                  <span className="block mt-2">
                    <a
                      href={gift.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline text-xs"
                    >
                      Se gåvan →
                    </a>
                  </span>
                )}
              </p>

              {gift.price && (
                <p className="text-sm font-medium text-black/80 mb-4">
                  {gift.price}
                </p>
              )}

              <div className="mt-4">
                {gift.isSpecial && gift.id === "cancerfonden" ? (
                  <div className="text-center">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      Alla kan bidra
                    </span>
                  </div>
                ) : gift.reserved ? (
                  <div className="text-center">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-200 text-gray-600 rounded-full">
                      Reserverad
                    </span>
                  </div>
                ) : gift.id === "cervera" ? (
                  <div></div>
                ) : (
                  <button
                    onClick={() => handleReserveGift(gift.id)}
                    className="w-full py-2 px-4 text-sm font-medium rounded-lg transition-colors bg-(--accent) text-white hover:bg-(--little-darker-green)"
                  >
                    Reservera gåva
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {hasMoreGifts && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowAllGifts(!showAllGifts)}
            className="px-6 py-3 text-sm font-medium rounded-lg transition-colors border-2 border-(--accent) text-(--accent) hover:bg-(--accent) hover:text-white"
          >
            {showAllGifts
              ? "Visa färre"
              : `Visa alla gåvor (${gifts.length - 2} till)`}
          </button>
        </div>
      )}
    </div>
  );
}
