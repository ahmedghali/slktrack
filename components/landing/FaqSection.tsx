"use client";

import { useState } from "react";
import { CaretDown, Question } from "@phosphor-icons/react";

const FAQS = [
  {
    question: "How do QR codes endure downhole heat, crude oil, and rough mechanical handling?",
    answer:
      "Physical downhole tools are etched with high-durability fiber laser marking or fitted with 316L stainless steel serialized ID bands. For field trucks and lubricator boxes, ruggedized anodized aluminum barcode plates rated for harsh H2S, oil, and sand environments are used.",
  },
  {
    question: "Does the mobile scanner work at remote wellsite locations with zero GSM/cellular signal?",
    answer:
      "Yes. SLKTrack supports offline-first mobile check-in and check-out. Technicians can scan QR tags directly at the wellhead; actions are cryptographically timestamped and queued locally in device storage, then automatically synchronized once connection to the base hub is re-established.",
  },
  {
    question: "How does the system prevent double-booking of high-demand Slickline tools?",
    answer:
      "When a supervisor or dispatcher stages a new well intervention (e.g. at Well HMD-221), the platform validates asset states in real time. Tools currently marked as 'Assigned', 'In Job', or 'Under Inspection' cannot be allocated to another job, eliminating dispatch conflicts.",
  },
  {
    question: "Can we configure custom Bottom Hole Assembly (BHA) sequences for deviated or deep wells?",
    answer:
      "Yes. The Tool String CAD Builder allows field engineers to assemble any custom downhole stack (Rope Socket, Stem sizes, Mechanical/Hydraulic Jars, Knuckle Joints, Gauge Cutters, Pulling Tools, Impression Blocks) with full pin/box thread validation and calculated total tool string length/weight.",
  },
  {
    question: "What happens when an operator leaves a tool at a well or in an unassigned truck?",
    answer:
      "Upon closing a job ticket, the Reconciliation Watchdog flags any unreturned asset immediately with a prominent 'Not Returned' alert. The system records the last verified technician, truck ID, and well location for immediate recovery.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {FAQS.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className={`rounded-2xl border transition-all ${
              isOpen
                ? "border-brand/50 bg-white/[0.04] shadow-lg shadow-brand/10"
                : "border-white/10 bg-white/[0.02] hover:border-white/20"
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="flex w-full items-center justify-between gap-4 p-5 text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand/10 font-mono text-xs font-bold text-brand border border-brand/20">
                  {idx + 1}
                </span>
                <span className="text-base font-semibold text-white">
                  {faq.question}
                </span>
              </div>
              <CaretDown
                size={18}
                className={`shrink-0 text-brand transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="anim-fade px-5 pb-5 pt-1 text-sm leading-relaxed text-text-muted border-t border-white/5 mt-1">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
