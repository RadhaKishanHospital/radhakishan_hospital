import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";

export interface ReviewDraft {
  name: string;
  description: string;
  rating: number;
}

interface ReviewModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (review: ReviewDraft) => void;
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <Icon
      icon={filled ? "solar:star-bold" : "solar:star-linear"}
      className="h-8 w-8 transition-transform duration-150"
    />
  );
}

export default function ReviewModal({ open, onClose, onSubmit }: ReviewModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [touched, setTouched] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Reset form each time the modal opens and move focus to a neutral control
  // (the close button) so no text cursor is placed in an input.
  useEffect(() => {
    if (open) {
      setName("");
      setDescription("");
      setRating(0);
      setHover(0);
      setTouched(false);
      const id = requestAnimationFrame(() => closeRef.current?.focus());
      return () => cancelAnimationFrame(id);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const valid = name.trim() && description.trim() && rating > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    onSubmit({ name: name.trim(), description: description.trim(), rating });
  };

  const active = hover || rating;
  const ratingLabels = ["", "Poor", "Fair", "Good", "Great", "Excellent"];

  return (
    <div
      className="animate-overlay fixed inset-0 z-50 flex items-end justify-center bg-slate-900/10 p-0 backdrop-blur-md sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-modal-title"
    >
      <div className="animate-modal relative w-full max-w-lg overflow-hidden rounded-t-3xl border border-slate-100 bg-white shadow-[0_24px_60px_-20px_rgba(15,23,42,0.25)] sm:rounded-2xl">
        {/* Header */}
        <div className="relative px-6 pt-7 sm:px-8">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-5 flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e]/40"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <h2 id="review-modal-title" className="font-display mt-1.5 text-2xl font-bold tracking-tight text-[#0f1720]">
            Share your experience
          </h2>
          <p className="mt-1 text-sm text-slate-500">Your feedback helps us care for patients better.</p>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 pb-7 pt-6 sm:px-8">
          {/* Rating */}
          <div className="mb-5">
            <label className="font-display mb-2 block text-sm font-semibold text-[#0f1720]">Your rating</label>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-[#0f766e]" onMouseLeave={() => setHover(0)}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    aria-label={`Rate ${n} star${n > 1 ? "s" : ""}`}
                    onClick={() => setRating(n)}
                    onMouseEnter={() => setHover(n)}
                    className={`rounded-md p-0.5 transition-transform cursor-pointer duration-150 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e]/40 ${
                      n <= active ? "text-[#0f766e]" : "text-slate-300"
                    }`}
                  >
                    <StarIcon filled={n <= active} />
                  </button>
                ))}
              </div>
              <span className="font-display text-sm font-semibold text-[#0f766e]">{ratingLabels[active]}</span>
            </div>
            {touched && rating === 0 && (
              <p className="mt-1.5 text-xs text-rose-500">Please select a rating.</p>
            )}
          </div>

          {/* Name */}
          <div className="mb-4">
            <label htmlFor="review-name" className="font-display mb-1.5 block text-sm font-semibold text-[#0f1720]">
              Name
            </label>
            <input
              id="review-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sarah Johnson"
              className={`w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-[#0f1720] placeholder:text-slate-400 transition focus:outline-none focus:ring-4 ${
                touched && !name.trim()
                  ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
                  : "border-slate-200 focus:border-[#0f766e] focus:ring-[#0f766e]/10"
              }`}
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label htmlFor="review-desc" className="font-display mb-1.5 block text-sm font-semibold text-[#0f1720]">
              Your review
            </label>
            <textarea
              id="review-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Tell us about the care you received…"
              className={`w-full resize-none rounded-xl border bg-white px-4 py-3 text-[15px] leading-relaxed text-[#0f1720] placeholder:text-slate-400 transition focus:outline-none focus:ring-4 ${
                touched && !description.trim()
                  ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
                  : "border-slate-200 focus:border-[#0f766e] focus:ring-[#0f766e]/10"
              }`}
            />
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="font-display rounded-full px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="font-display rounded-full px-8 py-3 text-sm font-semibold text-white bg-primary hover:bg-primary/90 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#0f766e]/25 active:scale-[0.98]"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
