import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";

export interface AppointmentDraft {
  name: string;
  email: string;
  mobile: string;
  date: string;
}

interface AppointmentModalProps {
  open: boolean;
  slot: string;
  doctorName: string;
  onClose: () => void;
  onSubmit: (data: AppointmentDraft) => void;
}

export default function AppointmentModal({
  open,
  slot,
  doctorName,
  onClose,
  onSubmit,
}: AppointmentModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [date, setDate] = useState("");
  const [touched, setTouched] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Reset on open and park focus on a neutral control (the close button) so no
  // input is auto-focused — on mobile the keyboard stays down until the user
  // deliberately taps a field.
  useEffect(() => {
    if (open) {
      setName("");
      setEmail("");
      setMobile("");
      setDate("");
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

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const mobileOk = mobile.replace(/\D/g, "").length >= 10;
  const valid = name.trim() && emailOk && mobileOk && date;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    onSubmit({ name: name.trim(), email: email.trim(), mobile: mobile.trim(), date });
  };

  const fieldBase =
    "w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-[#0f1720] placeholder:text-slate-400 transition focus:outline-none focus:ring-4";
  const ok = "border-slate-200 focus:border-primary focus:ring-primary/10";
  const bad = "border-rose-300 focus:border-rose-400 focus:ring-rose-100";
  const cls = (invalid: boolean) => `${fieldBase} ${touched && invalid ? bad : ok}`;

  return (
    <div
      className="animate-overlay fixed inset-0 z-50 flex items-end justify-center bg-slate-900/10 p-0 backdrop-blur-md sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="appt-modal-title"
    >
      <div className="animate-modal relative w-full max-w-lg overflow-hidden rounded-t-3xl border border-slate-100 bg-white shadow-[0_24px_60px_-20px_rgba(15,23,42,0.25)] sm:rounded-2xl">
        {/* Header */}
        <div className="relative px-6 pt-7 sm:px-8">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-5 flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Icon icon="solar:calendar-linear" className="h-6 w-6" />
          </div>
          <h2 id="appt-modal-title" className="font-display mt-4 text-2xl font-extrabold tracking-tight text-[#0f1720]">
            Confirm your appointment
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Booking the{" "}
            <span className="font-semibold text-primary">{slot}</span>
            {" "}slot with{" "}
            <span className="font-semibold text-primary">{doctorName}</span>.
          </p>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 pb-7 pt-6 sm:px-8">
          <div className="mb-4">
            <label htmlFor="appt-name" className="font-display mb-1.5 block text-sm font-semibold text-[#0f1720]">
              Full name
            </label>
            <input
              id="appt-name"
              type="text"
              autoFocus={false}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sarah Johnson"
              className={cls(!name.trim())}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="appt-email" className="font-display mb-1.5 block text-sm font-semibold text-[#0f1720]">
              Email address
            </label>
            <input
              id="appt-email"
              type="email"
              inputMode="email"
              autoFocus={false}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={cls(!emailOk)}
            />
            {touched && !emailOk && <p className="mt-1.5 text-xs text-rose-500">Enter a valid email address.</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="appt-mobile" className="font-display mb-1.5 block text-sm font-semibold text-[#0f1720]">
              Mobile number
            </label>
            <input
              id="appt-mobile"
              type="tel"
              inputMode="tel"
              autoFocus={false}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="+91 98765 43210"
              className={cls(!mobileOk)}
            />
            {touched && !mobileOk && <p className="mt-1.5 text-xs text-rose-500">Enter a valid 10-digit number.</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="appt-date" className="font-display mb-1.5 block text-sm font-semibold text-[#0f1720]">
              Appointment date
            </label>
            <input
              id="appt-date"
              type="date"
              autoFocus={false}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={cls(!date)}
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
              className="font-display flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/25 active:scale-[0.98]"
            >
              <Icon icon="solar:check-circle-bold" className="h-5 w-5" />
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
