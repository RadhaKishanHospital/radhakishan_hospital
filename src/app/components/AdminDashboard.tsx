import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import {
  LayoutDashboard,
  CalendarDays,
  MessageSquare,
  LogOut,
  Search,
  Trash2,
  Plus,
  X,
  Mail,
  MailOpen,
  Menu,
  ArrowUpRight,
  Clock,
  Bell,
} from "lucide-react"
import type { Status } from "../../../lib/store"
import { cn, formatDate, statusStyles, timeAgo } from "../../../lib/utils"
import { ConfirmDialog, useToast } from "./ui"
import {
  useGeneralAppointments,
  useMessages,
  useUpdateGeneralAppointmentStatus,
  useDeleteGeneralAppointment,
  useToggleMessageRead,
  useDeleteMessage,
} from "../../../lib/queries"

type Tab = "overview" | "general" | "messages"

const nav: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "general", label: "General Appointments", icon: CalendarDays },
  { id: "messages", label: "Messages", icon: MessageSquare },
]

const statusOptions: Status[] = ["pending", "confirmed", "completed", "cancelled"]

function initials(name: string) {
  return name.split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase()
}

function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ring-1", statusStyles[status])}>
      {status}
    </span>
  )
}

function StatusSelect({ value, onChange }: { value: Status; onChange: (s: Status) => void }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as Status)}
      className={cn(
        "cursor-pointer rounded-full px-3 py-1 text-xs font-semibold capitalize outline-none ring-1 transition",
        statusStyles[value],
      )}
    >
      {statusOptions.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  )
}

function Avatar({ name, className }: { name: string; className?: string }) {
  return (
    <span className={cn("grid shrink-0 place-items-center rounded-full bg-brand-50 font-bold text-brand-700 ring-1 ring-brand-100", className)}>
      {initials(name)}
    </span>
  )
}

function Toolbar({
  search,
  onSearch,
  action,
}: {
  search?: string
  onSearch?: (v: string) => void
  action?: React.ReactNode
}) {
  if (!onSearch && !action) return null
  return (
    <div className="mb-5 flex items-center gap-2.5">
      {onSearch && (
        <div className="relative flex-1">
          <Search size={16} className="pointer-events-none absolute left-3.5 top-3 text-slate-400" />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search…"
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:ring-4 focus:ring-brand-500/10"
          />
        </div>
      )}
      {action}
    </div>
  )
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-slate-200 bg-white py-20 text-center">
      <div className="mb-3 grid size-14 place-items-center rounded-2xl bg-slate-50 text-slate-300 ring-1 ring-slate-100">
        <Search size={24} />
      </div>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
    </div>
  )
}

const cardCls = "rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-slate-300"

/* ---------------- Overview ---------------- */

function Overview({ go }: { go: (t: Tab) => void }) {
  const { data: generalAppointments = [] } = useGeneralAppointments()
  const { data: messages = [] } = useMessages()

  const stats = [
    { label: "General Appointments", value: generalAppointments.length, sub: `${generalAppointments.filter((a) => a.status === "pending").length} pending`, icon: CalendarDays, tab: "general" as Tab },
    { label: "Messages", value: messages.length, sub: `${messages.filter((m) => !m.read).length} unread`, icon: MessageSquare, tab: "messages" as Tab },
  ]

  const recent = [
    ...generalAppointments.map((a) => ({ id: a.id, who: a.name, what: "booked a general appointment", at: a.createdAt })),
    ...messages.map((m) => ({ id: m.id, who: m.name, what: `sent “${m.subject}”`, at: m.createdAt })),
  ]
    .sort((a, b) => b.at - a.at)
    .slice(0, 7)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {stats.map((s, i) => (
          <motion.button
            key={s.label}
            onClick={() => go(s.tab)}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={cn(cardCls, "group p-5 text-left")}
          >
            <div className="flex items-center justify-between">
              <span className="grid size-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <s.icon size={19} />
              </span>
              <ArrowUpRight size={17} className="text-slate-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-500" />
            </div>
            <div className="mt-4 text-3xl font-bold tracking-tight text-ink">{s.value}</div>
            <div className="mt-0.5 text-sm font-semibold text-ink">{s.label}</div>
            <div className="text-xs text-muted-foreground">{s.sub}</div>
          </motion.button>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-ink">Recent activity</h2>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
            <span className="size-1.5 rounded-full bg-brand-500" /> Live
          </span>
        </div>
        <ul className="divide-y divide-slate-100">
          {recent.map((r) => (
            <li key={r.id + r.at} className="flex items-center gap-3 py-2.5">
              <Avatar name={r.who} className="size-9 text-xs" />
              <p className="min-w-0 flex-1 truncate text-sm text-ink">
                <span className="font-semibold">{r.who}</span> <span className="text-muted-foreground">{r.what}</span>
              </p>
              <span className="shrink-0 text-xs font-medium text-slate-400">{timeAgo(r.at)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* ---------------- General appointments ---------------- */

function GeneralAppointments() {
  const { data: generalAppointments = [] } = useGeneralAppointments()
  const updateStatusMutation = useUpdateGeneralAppointmentStatus()
  const deleteMutation = useDeleteGeneralAppointment()
  const { push } = useToast()
  const [q, setQ] = useState("")
  const [del, setDel] = useState<string | null>(null)

  const rows = useMemo(
    () => generalAppointments.filter((a) => [a.name, a.email, a.phone].join(" ").toLowerCase().includes(q.toLowerCase())),
    [generalAppointments, q],
  )

  return (
    <>
      <Toolbar search={q} onSearch={setQ} />
      {rows.length === 0 ? (
        <EmptyState label="No appointments found." />
      ) : (
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {rows.map((a) => (
              <motion.div key={a.id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} className={cardCls}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex min-w-0 gap-3.5">
                    <Avatar name={a.name} className="size-11 text-sm" />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-ink">{a.name}</h3>
                        <StatusBadge status={a.status} />
                      </div>
                      <p className="text-sm text-muted-foreground">{a.email} · {a.phone}</p>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
                        <span className="inline-flex items-center gap-1"><CalendarDays size={13} /> {formatDate(a.date)}</span>
                        <span className="inline-flex items-center gap-1"><Clock size={13} /> {a.time}</span>
                      </div>
                      {a.notes && <p className="mt-2 rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-600">{a.notes}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusSelect value={a.status} onChange={(s) => updateStatusMutation.mutate({ id: a.id, status: s })} />
                    <button onClick={() => setDel(a.id)} aria-label="Delete appointment" className="grid size-9 place-items-center rounded-xl text-slate-400 transition hover:bg-rose-50 hover:text-rose-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
      <ConfirmDialog
        open={del !== null}
        title="Delete appointment?"
        message="This will permanently remove the appointment record. This action cannot be undone."
        onCancel={() => setDel(null)}
        onConfirm={() => {
          if (del) deleteMutation.mutate(del)
          setDel(null)
          push("Appointment deleted.", "info")
        }}
      />
    </>
  )
}

/* ---------------- Messages ---------------- */

function Messages() {
  const { data: messages = [] } = useMessages()
  const toggleReadMutation = useToggleMessageRead()
  const deleteMutation = useDeleteMessage()
  const { push } = useToast()
  const [q, setQ] = useState("")
  const [del, setDel] = useState<string | null>(null)

  const rows = useMemo(
    () => messages.filter((m) => [m.name, m.phone_no, m.subject, m.body].join(" ").toLowerCase().includes(q.toLowerCase())),
    [messages, q],
  )

  return (
    <>
      <Toolbar search={q} onSearch={setQ} />
      {rows.length === 0 ? (
        <EmptyState label="No messages found." />
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          <AnimatePresence initial={false}>
            {rows.map((m) => (
              <motion.div
                key={m.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className={cn(cardCls, "relative flex flex-col", !m.read && "border-brand-200 bg-brand-50/30")}
              >
                {!m.read && <span className="absolute right-4 top-4 size-2.5 rounded-full bg-brand-500 ring-4 ring-brand-100" />}
                <div className="flex items-center gap-3">
                  <Avatar name={m.name} className="size-11 text-sm" />
                  <div className="min-w-0">
                    <h3 className="truncate font-bold text-ink">{m.name}</h3>
                    <p className="truncate text-xs text-muted-foreground">{m.phone_no}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm font-semibold text-ink">{m.subject}</p>
                <p className="mt-1 flex-1 text-sm leading-relaxed text-slate-600">{m.body}</p>
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                  <span className="text-xs font-medium text-slate-400">{timeAgo(m.createdAt)}</span>
                  <div className="flex items-center gap-1">
                    <button onClick={() => toggleReadMutation.mutate({ id: m.id, read: m.read })} className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100">
                      {m.read ? <Mail size={14} /> : <MailOpen size={14} />}
                      {m.read ? "Mark unread" : "Mark read"}
                    </button>
                    <button onClick={() => setDel(m.id)} aria-label="Delete message" className="grid size-8 place-items-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
      <ConfirmDialog
        open={del !== null}
        title="Delete message?"
        message="This will permanently remove the message from your inbox."
        onCancel={() => setDel(null)}
        onConfirm={() => {
          if (del) deleteMutation.mutate(del)
          setDel(null)
          push("Message deleted.", "info")
        }}
      />
    </>
  )
}

/* ---------------- Shell ---------------- */

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const { data: generalAppointments = [] } = useGeneralAppointments()
  const { data: messages = [] } = useMessages()

  const [tab, setTab] = useState<Tab>("overview")
  const [drawer, setDrawer] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)

  const unread = messages.filter((m) => !m.read).length

  const notifications = [
    ...messages
      .filter((m) => !m.read)
      .map((m) => ({ id: "msg" + m.id, who: m.name, text: `New message: ${m.subject}`, at: m.createdAt, tab: "messages" as Tab, icon: MessageSquare })),
    ...generalAppointments
      .filter((a) => a.status === "pending")
      .map((a) => ({ id: "gen" + a.id, who: a.name, text: "New general appointment", at: a.createdAt, tab: "general" as Tab, icon: CalendarDays })),
  ].sort((a, b) => b.at - a.at)
  const badges: Partial<Record<Tab, number>> = {
    general: generalAppointments.filter((a) => a.status === "pending").length,
    messages: unread,
  }

  const current = nav.find((n) => n.id === tab)!

  const go = (t: Tab) => {
    setTab(t)
    setDrawer(false)
  }

  const SidebarContent = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 px-5 py-5">
        <span className="grid size-10 place-items-center rounded-xl bg-brand-600 text-white">
          <Plus size={20} strokeWidth={2.5} />
        </span>
        <div className="leading-tight">
          <div className="text-sm font-bold text-ink">RadhaKishan</div>
          <div className="text-xs text-muted-foreground">Admin Console</div>
        </div>
      </div>

      <div className="px-5 pb-2 pt-3">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Menu</p>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {nav.map((n) => {
          const active = tab === n.id
          const badge = badges[n.id]
          return (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className={cn(
                "relative flex w-full items-center gap-3 rounded-[8px] px-3 py-2.5 text-sm font-semibold transition",
                active ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-slate-50 hover:text-ink",
              )}
            >
              {active && <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-brand-600" />}
              <n.icon size={18} className={active ? "text-brand-600" : "text-slate-400"} />
              <span className="flex-1 text-left">{n.label}</span>
              {badge ? (
                <span className={cn("grid min-w-5 place-items-center rounded-full px-1.5 text-xs font-bold", active ? "bg-brand-600 text-white" : "bg-slate-200 text-slate-600")}>
                  {badge}
                </span>
              ) : null}
            </button>
          )
        })}
      </nav>

      <div className="m-3 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
        <span className="grid size-9 place-items-center rounded-full bg-brand-600 text-xs font-bold text-white">AD</span>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold text-ink">Administrator</div>
          <div className="truncate text-xs text-muted-foreground">admin@co.in</div>
        </div>
        <button onClick={onLogout} aria-label="Sign out" className="grid size-8 place-items-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-600">
          <LogOut size={16} />
        </button>
      </div>
    </div>
  )

  return (
    <div className="admin-dashboard flex min-h-screen bg-slate-50">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-slate-200 bg-white lg:block">{SidebarContent}</aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawer && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawer(false)} />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="absolute left-0 top-0 h-full w-72 border-r border-slate-200 bg-white shadow-2xl"
            >
              <button onClick={() => setDrawer(false)} className="absolute right-3 top-5 grid size-9 place-items-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-ink" aria-label="Close menu">
                <X size={18} />
              </button>
              {SidebarContent}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-slate-200 bg-white/85 px-4 py-3 backdrop-blur-xl sm:px-6">
          <button onClick={() => setDrawer(true)} aria-label="Open menu" className="grid size-10 shrink-0 place-items-center rounded-xl border border-slate-200 text-slate-600 lg:hidden">
            <Menu size={18} />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-lg font-bold text-ink sm:text-xl">{current.label}</h1>
            <p className="hidden text-xs text-muted-foreground sm:block">Manage your hospital operations</p>
          </div>
          <div className="relative">
            <button
              onClick={() => setNotifOpen((o) => !o)}
              aria-label="Notifications"
              className={cn(
                "relative grid size-10 place-items-center rounded-xl border transition",
                notifOpen ? "border-brand-300 bg-brand-50 text-brand-700" : "border-slate-200 text-slate-500 hover:bg-slate-50",
              )}
            >
              <Bell size={17} />
              {notifications.length > 0 && (
                <span className="absolute -right-1 -top-1 grid min-w-[18px] place-items-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white ring-2 ring-white">
                  {notifications.length}
                </span>
              )}
            </button>

            <AnimatePresence>
              {notifOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.16 }}
                    className="absolute right-0 top-12 z-50 w-[min(88vw,360px)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/15"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                      <h3 className="text-sm font-bold text-ink">Notifications</h3>
                      <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-700">{notifications.length} new</span>
                    </div>
                    <div className="max-h-[60vh] overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="grid place-items-center px-4 py-10 text-center">
                          <span className="mb-2 grid size-11 place-items-center rounded-full bg-slate-50 text-slate-300">
                            <Bell size={20} />
                          </span>
                          <p className="text-sm font-medium text-muted-foreground">You&apos;re all caught up</p>
                        </div>
                      ) : (
                        notifications.map((n) => (
                          <button
                            key={n.id}
                            onClick={() => {
                              go(n.tab)
                              setNotifOpen(false)
                            }}
                            className="flex w-full items-start gap-3 border-b border-slate-50 px-4 py-3 text-left transition last:border-0 hover:bg-slate-50"
                          >
                            <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                              <n.icon size={16} />
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-semibold text-ink">{n.who}</p>
                              <p className="truncate text-xs text-muted-foreground">{n.text}</p>
                            </div>
                            <span className="shrink-0 text-[11px] font-medium text-slate-400">{timeAgo(n.at)}</span>
                          </button>
                        ))
                      )}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 p-4 sm:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>
              {tab === "overview" && <Overview go={go} />}
              {tab === "general" && <GeneralAppointments />}
              {tab === "messages" && <Messages />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
