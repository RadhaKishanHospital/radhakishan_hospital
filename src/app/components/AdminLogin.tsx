import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { Lock, Mail, Eye, EyeOff, ShieldCheck, Loader2 } from "lucide-react"
import { Modal, inputCls } from "./ui"

import { ADMIN_USERS_STORAGE_KEY, INITIAL_ADMIN_USERS, type AdminUser } from "./ManageAccess"

const ADMIN_EMAIL = "admin@co.in"
const ADMIN_PASSWORD = "123456"
export const ADMIN_SESSION_KEY = "rkh_admin_authenticated"
export const ADMIN_CURRENT_USER_KEY = "rkh_admin_current_user"

export default function AdminLogin({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open) {
      setEmail("")
      setPassword("")
      setError("")
      setShow(false)
    }
  }, [open])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Check against stored admin users or fallback
    let storedUsers: AdminUser[] = INITIAL_ADMIN_USERS
    try {
      const raw = localStorage.getItem(ADMIN_USERS_STORAGE_KEY)
      if (raw) storedUsers = JSON.parse(raw)
    } catch {
      /* ignore */
    }

    const inputEmail = email.trim().toLowerCase()
    const foundUser = storedUsers.find((u) => u.email.toLowerCase() === inputEmail)

    setTimeout(() => {
      // Direct superadmin fallback or matched user password
      const isDefaultSuperAdmin = inputEmail === ADMIN_EMAIL && password === ADMIN_PASSWORD
      const isMatchedUser = foundUser && (foundUser.password === password || (foundUser.isPrimary && password === ADMIN_PASSWORD))

      if (isDefaultSuperAdmin || isMatchedUser) {
        if (foundUser && foundUser.status === "inactive") {
          setLoading(false)
          setError("This administrator account is currently deactivated. Please contact Super Admin.")
          return
        }

        // Store active session user info
        try {
          const sessionUser = foundUser || {
            id: "usr_primary_admin",
            name: "Dr. Radhakishan (Super Admin)",
            email: ADMIN_EMAIL,
            role: "super_admin",
            status: "active",
          }
          sessionStorage.setItem(ADMIN_CURRENT_USER_KEY, JSON.stringify(sessionUser))
        } catch {
          /* ignore */
        }

        setLoading(false)
        onSuccess()
      } else {
        setLoading(false)
        setError("Invalid email or password. Please try again.")
      }
    }, 550)
  }

  return (
    <Modal open={open} onClose={onClose} size="sm" labelledBy="admin-login-title">
      <div className="p-7">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="mx-auto flex items-center justify-center"
        >
          <div className="flex h-16 w-16 items-center justify-center">
            <img
              src="/logo.png"
              alt="Radhakishan Hospital"
              className="h-full w-full object-contain"
            />
          </div>
        </motion.div>
        <h2 id="admin-login-title" className="mt-4 text-center text-xl font-bold text-ink">
          Admin Access
        </h2>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          Restricted area — sign in to manage the hospital dashboard.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div className="relative">
            <Mail size={16} className="pointer-events-none absolute left-3.5 top-3 text-brand-600" />
            <input
              autoFocus
              type="email"
              className={inputCls + " pl-10"}
              placeholder="admin@co.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <Lock size={16} className="pointer-events-none absolute left-3.5 top-3 text-brand-600" />
            <input
              type={show ? "text" : "password"}
              className={inputCls + " px-10"}
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? "Hide password" : "Show password"}
              className="absolute right-3 top-2.5 text-slate-400 transition hover:text-slate-700"
            >
              {show ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-700/25 transition hover:bg-brand-800 disabled:opacity-70"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Lock size={15} />}
            {loading ? "Verifying…" : "Sign In"}
          </button>
        </form>
      </div>
    </Modal>
  )
}
