import { AnimatePresence, motion } from "motion/react"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import { CheckCircle2, Info, X, AlertTriangle, type LucideIcon } from "lucide-react"
import { cn } from "../../../lib/utils"

/* ---------------- Responsive hook ---------------- */

export function useIsMobile(query = "(max-width: 639px)") {
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia(query)
    const on = () => setMobile(mql.matches)
    on()
    mql.addEventListener("change", on)
    return () => mql.removeEventListener("change", on)
  }, [query])
  return mobile
}

/* ---------------- Toasts ---------------- */

type Toast = { id: number; message: string; type: "success" | "info" | "error" }
type ToastCtx = { push: (message: string, type?: Toast["type"]) => void }

const ToastContext = createContext<ToastCtx>({ push: () => {} })
export const useToast = () => useContext(ToastContext)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const push = useCallback((message: string, type: Toast["type"] = "success") => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, message, type }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200)
  }, [])

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-[min(92vw,360px)] flex-col gap-2">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              className="pointer-events-auto flex items-start gap-3 rounded-2xl border border-border bg-white/95 p-3.5 shadow-lg shadow-slate-900/5 backdrop-blur"
            >
              <span
                className={cn(
                  "mt-0.5 shrink-0",
                  t.type === "success" && "text-brand-600",
                  t.type === "info" && "text-sky-600",
                  t.type === "error" && "text-rose-600",
                )}
              >
                {t.type === "success" ? (
                  <CheckCircle2 size={18} />
                ) : t.type === "error" ? (
                  <AlertTriangle size={18} />
                ) : (
                  <Info size={18} />
                )}
              </span>
              <p className="text-sm font-medium leading-snug text-ink">{t.message}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

/* ---------------- Modal ---------------- */

export function Modal({
  open,
  onClose,
  children,
  size = "md",
  labelledBy,
}: {
  open: boolean
  onClose: () => void
  children: ReactNode
  size?: "sm" | "md" | "lg"
  labelledBy?: string
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  const [touch, setTouch] = useState(false)
  useEffect(() => {
    setTouch(typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches)
  }, [])

  const width = size === "sm" ? "max-w-md" : size === "lg" ? "max-w-3xl" : "max-w-lg"

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-4">
          <motion.div
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 38, mass: 0.9 }}
            drag={touch ? "y" : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120 || info.velocity.y > 600) onClose()
            }}
            className={cn(
              "relative z-10 flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-[1.75rem] border border-white/60 bg-white shadow-[0_40px_80px_-20px_rgba(15,23,42,0.4)] ring-1 ring-slate-900/5 sm:rounded-[1.75rem]",
              width,
            )}
          >
            {/* Mobile grab handle */}
            <div className="flex shrink-0 cursor-grab justify-center pb-1 pt-3 active:cursor-grabbing sm:hidden">
              <span className="h-1.5 w-11 rounded-full bg-slate-300" />
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export function ModalHeader({
  title,
  subtitle,
  onClose,
  id,
  icon: Icon,
}: {
  title: string
  subtitle?: string
  onClose: () => void
  id?: string
  icon?: LucideIcon
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
      <div className="flex items-start gap-3.5">
        {Icon && (
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
            <Icon size={20} />
          </span>
        )}
        <div>
          <h3 id={id} className="text-lg font-bold tracking-tight text-ink">
            {title}
          </h3>
          {subtitle && <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      <button
        onClick={onClose}
        aria-label="Close"
        className="grid size-9 shrink-0 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
      >
        <X size={18} />
      </button>
    </div>
  )
}

/* ---------------- Confirm dialog ---------------- */

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Delete",
  onConfirm,
  onCancel,
}: {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  onConfirm: () => void
  onCancel: () => void
}) {
  return (
    <Modal open={open} onClose={onCancel} size="sm">
      <div className="p-6 pt-5 sm:pt-6">
        <div className="mb-4 grid size-14 place-items-center rounded-2xl bg-rose-50 text-rose-600 ring-1 ring-rose-100">
          <AlertTriangle size={24} />
        </div>
        <h3 className="text-lg font-bold tracking-tight text-ink">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{message}</p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-rose-600/25 transition hover:bg-rose-700"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  )
}

/* ---------------- Field ---------------- */

export function Field({
  label,
  children,
  required,
  hint,
}: {
  label: string
  children: ReactNode
  required?: boolean
  hint?: string
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1 text-sm font-semibold text-ink">
        {label}
        {required && <span className="text-brand-600">*</span>}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
    </label>
  )
}

export const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
