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
        id: "presentkort",
        name: "Presentkort",
        description:
          "Presentkort på Cervera, Ikea, Kitchentime, etc. för att fylla vårt hem med vackra saker.",
        reserved: false,
        isSpecial: true,
      },
      {
        id: "le-creuset-bestick-och-redskapsforvaring",
        name: "Le Creuset bestick- och redskapsförvaring",
        description: "Le Creuset bestick- och redskapsförvaring 1,1 l",
        price: "499 kr",
        link: "https://www.kitchentime.se/varumarken/le-creuset/le-creuset-bestick--och-redskapsforvaring-11-l/?variantId=40245-04",
        image: "/skål.avif",
        reserved: false,
        isSpecial: false,
      },
      {
        id: "le-creuset-heritage-ugnsform-32-cm",
        name: "Le Creuset Heritage ugnsform",
        description: "Le Creuset Heritage ugnsform 32 cm",
        price: "639 kr",
        link: "https://www.kitchentime.se/varumarken/le-creuset/le-creuset-heritage-ugnsform-37-cm/?variantId=37122-02",
        image: "/sform.avif",
        reserved: false,
        isSpecial: false,
      },
      {
        id: "le-creuset-heritage-ugnsform-26-cm",
        name: "Le Creuset Heritage ugnsform",
        description: "Le Creuset Heritage ugnsform 26 cm",
        price: "535 kr",
        link: "https://www.kitchentime.se/varumarken/le-creuset/le-creuset-heritage-ugnsform-31-cm/?variantId=37121-01",
        image: "/sform.avif",
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
          "Satake Ame knivset från Satake är ett elegant och välbalanserat set där tradition möter precision.",
        price: "2,941 kr",
        image: "/kniv.avif",
        link: "https://www.kitchentime.se/varumarken/satake/satake-ame-knivset/?variantId=46221-01&country=SE&utm_source=google&utm_medium=cpc&utm_campaign=%5BShopping%5D%20-%20High%20price%20rank&utm_id=21845745784&gad_source=1&gad_campaignid=21845745784&gclid=CjwKCAjw3tzHBhBREiwAlMJoUgdhAa0eQRYPLZUYOPLwK3hR3jqbnnhOgik0nn85D8GDZwqhSkovlBoCkacQAvD_BwE",
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
                ? "border-gray-400 bg-gray-200/70 opacity-75 cursor-not-allowed"
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
                  className="object-contain scale-90"
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
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-300 text-gray-700 rounded-full">
                      Reserverad
                    </span>
                  </div>
                ) : gift.id === "presentkort" ? (
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

      {/* Mer kommer snart card - only shown when all gifts are visible */}
      {showAllGifts && (
        <div className="max-w-4xl mx-auto mt-8">
          <div className="flex justify-center">
            <div className="bg-white/85 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden shadow-sm w-full max-w-sm">
              <div className="p-6 text-center">
                <div className="mb-4">
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-600">
                  Mer kommer snart
                </h3>
                <p className="text-sm text-gray-500">
                  Vi lägger till fler gåvor efter hand
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
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
