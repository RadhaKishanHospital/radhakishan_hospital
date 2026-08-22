import { useEffect, useRef, useState, type ReactNode } from "react"
import { AnimatePresence, motion } from "motion/react"
import {
  Save,
  Trash2,
  ImageIcon,
  ArrowLeft,
  UserRoundPlus,
  User,
  Stethoscope,
  Award,
  Clock,
  Star,
  MessageSquareText,
  Languages as LanguagesIcon,
  ShieldCheck,
  Camera,
} from "lucide-react"
import { db, type Doctor } from "../../../lib/store"
import { Field, Modal, ModalHeader, inputCls, useIsMobile, useToast } from "./ui"

function Section({ title, desc, children }: { title: string; desc?: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <span className="h-4 w-1 rounded-full bg-brand-500" />
        <div>
          <h4 className="text-sm font-bold text-ink">{title}</h4>
          {desc && <p className="text-xs text-muted-foreground">{desc}</p>}
        </div>
      </div>
      {children}
    </section>
  )
}

function IconInput({
  icon: Icon,
  ...props
}: { icon: React.ComponentType<{ size?: number; className?: string }> } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      <Icon size={16} className="pointer-events-none absolute left-3.5 top-3 text-brand-600" />
      <input {...props} className={inputCls + " pl-10"} />
    </div>
  )
}

type FormState = {
  name: string
  specialty: string
  experience: string
  rating: string
  reviews: string
  education: string
  about: string
  languages: string
  insurance: string
  photo: string
}

const empty: FormState = {
  name: "",
  specialty: "",
  experience: "",
  rating: "",
  reviews: "",
  education: "",
  about: "",
  languages: "",
  insurance: "",
  photo: "",
}

function toForm(d: Doctor): FormState {
  return {
    name: d.name,
    specialty: d.specialty,
    experience: String(d.experience),
    rating: String(d.rating),
    reviews: String(d.reviews),
    education: d.education,
    about: d.about,
    languages: d.languages.join(", "),
    insurance: d.insurance.join(", "),
    photo: d.photo ?? "",
  }
}

export default function DoctorForm({
  open,
  onClose,
  editing,
}: {
  open: boolean
  onClose: () => void
  editing: Doctor | null
}) {
  const { push } = useToast()
  const isMobile = useIsMobile()
  const [form, setForm] = useState<FormState>(empty)
  const set = (k: keyof FormState, v: string) => setForm((f) => ({ ...f, [k]: v }))
  const fileRef = useRef<HTMLInputElement>(null)

  const onPickPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith("image/")) {
      push("Please choose an image file.", "error")
      return
    }
    if (file.size > 3 * 1024 * 1024) {
      push("Image is too large (max 3MB).", "error")
      return
    }
    const reader = new FileReader()
    reader.onload = () => set("photo", String(reader.result))
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    if (open) setForm(editing ? toForm(editing) : empty)
  }, [open, editing])

  // Lock body scroll when the mobile full page is open
  useEffect(() => {
    if (open && isMobile) {
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = ""
      }
    }
  }, [open, isMobile])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.specialty) {
      push("Name and specialty are required.", "error")
      return
    }
    const payload = {
      name: form.name.trim(),
      specialty: form.specialty.trim(),
      experience: Number(form.experience) || 0,
      rating: Math.min(5, Number(form.rating) || 0),
      reviews: Number(form.reviews) || 0,
      education: form.education.trim(),
      about: form.about.trim(),
      languages: form.languages.split(",").map((s) => s.trim()).filter(Boolean),
      insurance: form.insurance.split(",").map((s) => s.trim()).filter(Boolean),
      photo: form.photo.trim() || undefined,
    }
    if (editing) {
      db.updateDoctor({ ...payload, id: editing.id })
      push("Doctor updated successfully.")
    } else {
      db.addDoctor(payload)
      push("Doctor added successfully.")
    }
    onClose()
  }

  const title = editing ? "Edit Doctor" : "Add New Doctor"
  const subtitle = editing ? "Update the doctor's profile details." : "Create a new doctor profile for the directory."

  const initialsPreview = form.name
    ? form.name.split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase()
    : ""

  const fields = (
    <div className="space-y-4">
      {/* Photo + identity hero */}
      <Section title="Profile" desc="This is how the doctor appears across the site.">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onPickPhoto} />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="group relative grid size-24 shrink-0 place-items-center overflow-hidden rounded-3xl border border-dashed border-brand-300 bg-brand-50 transition hover:border-brand-500 hover:bg-brand-100/60"
            aria-label="Upload photo"
          >
            {form.photo ? (
              <img src={form.photo} alt="Doctor preview" className="size-full object-cover" />
            ) : initialsPreview ? (
              <span className="text-2xl font-bold text-brand-600">{initialsPreview}</span>
            ) : (
              <ImageIcon size={26} className="text-brand-400" />
            )}
            <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1 bg-slate-900/55 py-1 text-[11px] font-semibold text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
              <Camera size={12} /> {form.photo ? "Change" : "Upload"}
            </span>
          </button>

          <div className="w-full flex-1 space-y-4">
            <Field label="Full Name" required>
              <IconInput icon={User} placeholder="Dr. Jane Doe" value={form.name} onChange={(e) => set("name", e.target.value)} />
            </Field>
            <Field label="Specialty" required>
              <IconInput icon={Stethoscope} placeholder="Cardiology" value={form.specialty} onChange={(e) => set("specialty", e.target.value)} />
            </Field>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span>PNG or JPG · up to 3MB</span>
              {form.photo && (
                <button
                  type="button"
                  onClick={() => set("photo", "")}
                  className="inline-flex items-center gap-1 font-semibold text-rose-600 transition hover:text-rose-700"
                >
                  <Trash2 size={12} /> Remove photo
                </button>
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* Credentials */}
      <Section title="Credentials & Experience">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Experience (years)">
            <IconInput icon={Clock} type="number" min="0" placeholder="10" value={form.experience} onChange={(e) => set("experience", e.target.value)} />
          </Field>
          <Field label="Education">
            <IconInput icon={Award} placeholder="AIIMS New Delhi" value={form.education} onChange={(e) => set("education", e.target.value)} />
          </Field>
          <Field label="Rating (0–5)">
            <IconInput icon={Star} type="number" min="0" max="5" step="0.1" placeholder="4.8" value={form.rating} onChange={(e) => set("rating", e.target.value)} />
          </Field>
          <Field label="Reviews count">
            <IconInput icon={MessageSquareText} type="number" min="0" placeholder="120" value={form.reviews} onChange={(e) => set("reviews", e.target.value)} />
          </Field>
        </div>
      </Section>

      {/* Coverage */}
      <Section title="Languages & Insurance" desc="Separate multiple entries with commas.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Languages">
            <IconInput icon={LanguagesIcon} placeholder="English, Hindi" value={form.languages} onChange={(e) => set("languages", e.target.value)} />
          </Field>
          <Field label="Insurance Accepted">
            <IconInput icon={ShieldCheck} placeholder="Star Health, Aetna" value={form.insurance} onChange={(e) => set("insurance", e.target.value)} />
          </Field>
        </div>
      </Section>

      {/* About */}
      <Section title="About">
        <textarea
          rows={4}
          className={inputCls + " resize-none"}
          placeholder="Short professional bio — specializations, approach, notable achievements…"
          value={form.about}
          onChange={(e) => set("about", e.target.value)}
        />
      </Section>
    </div>
  )

  const footer = (
    <>
      <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-ink transition hover:bg-slate-50 sm:flex-none sm:px-6 sm:py-2.5">
        Cancel
      </button>
      <button type="submit" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-700/25 transition hover:bg-brand-800 sm:py-2.5">
        <Save size={16} /> {editing ? "Save Changes" : "Add Doctor"}
      </button>
    </>
  )

  // ---- Mobile: dedicated full page ----
  if (isMobile) {
    return (
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 360, damping: 36, mass: 0.9 }}
            className="fixed inset-0 z-[95] flex flex-col bg-slate-50"
            role="dialog"
            aria-modal="true"
          >
            <header className="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3.5">
              <button onClick={onClose} aria-label="Back" className="grid size-10 shrink-0 place-items-center rounded-xl border border-slate-200 text-slate-600 transition active:scale-95">
                <ArrowLeft size={18} />
              </button>
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <UserRoundPlus size={18} />
                </span>
                <div className="leading-tight">
                  <h1 className="text-base font-bold text-ink">{title}</h1>
                  <p className="text-xs text-muted-foreground">{subtitle}</p>
                </div>
              </div>
            </header>

            <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col">
              <div className="flex-1 overflow-y-auto px-4 py-5">{fields}</div>
              <div className="flex gap-3 border-t border-slate-200 bg-white px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
                {footer}
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  // ---- Desktop: modal ----
  return (
    <Modal open={open} onClose={onClose} size="lg" labelledBy="doctor-form-title">
      <ModalHeader id="doctor-form-title" title={title} subtitle={subtitle} onClose={onClose} icon={UserRoundPlus} />
      <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col">
        <div className="overflow-y-auto bg-slate-50/70 px-6 py-5">{fields}</div>
        <div className="flex gap-3 border-t border-slate-100 bg-white px-6 py-4">{footer}</div>
      </form>
    </Modal>
  )
}
