import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  ShieldCheck,
  UserPlus,
  Search,
  Trash2,
  Edit2,
  KeyRound,
  Shield,
  CheckCircle2,
  Copy,
  Eye,
  EyeOff,
  Clock,
  History,
  Lock,
  UserCheck,
  Sparkles,
  SlidersHorizontal,
  X,
  Mail,
  User,
} from "lucide-react"
import { Modal, ModalHeader, Field, inputCls, ConfirmDialog, useToast } from "./ui"
import { cn, timeAgo } from "../../../lib/utils"

export type AdminRole = "super_admin" | "admin" | "manager" | "staff"
export type AdminStatus = "active" | "inactive"

export type AdminPermission =
  | "overview"
  | "appointments"
  | "messages"
  | "doctors"
  | "manage_access"
  | "export_data"

export interface AdminUser {
  id: string
  name: string
  email: string
  password?: string
  role: AdminRole
  status: AdminStatus
  permissions: AdminPermission[]
  department?: string
  lastActive?: number
  createdAt: number
  isPrimary?: boolean
  mustChangePassword?: boolean
}

export interface AccessLog {
  id: string
  action: string
  targetUser: string
  performedBy: string
  timestamp: number
  type: "create" | "update" | "delete" | "password" | "status" | "login"
}

export const ADMIN_USERS_STORAGE_KEY = "rkh_admin_access_users_v1"
export const LOGS_STORAGE_KEY = "rkh_admin_access_logs_v1"

export const ROLE_CONFIG: Record<
  AdminRole,
  { label: string; desc: string; color: string; badgeCls: string; defaultPermissions: AdminPermission[] }
> = {
  super_admin: {
    label: "Super Admin",
    desc: "Full system control, can manage all resources and administrators",
    color: "#6366f1",
    badgeCls: "bg-indigo-50 text-indigo-700 ring-indigo-200",
    defaultPermissions: ["overview", "appointments", "messages", "doctors", "manage_access", "export_data"],
  },
  admin: {
    label: "Administrator",
    desc: "Can manage appointments, messages, doctors and view analytics",
    color: "#0d9488",
    badgeCls: "bg-brand-50 text-brand-700 ring-brand-200",
    defaultPermissions: ["overview", "appointments", "messages", "doctors", "export_data"],
  },
  manager: {
    label: "Clinic Manager",
    desc: "Can manage appointments, patient requests and doctor schedules",
    color: "#0284c7",
    badgeCls: "bg-sky-50 text-sky-700 ring-sky-200",
    defaultPermissions: ["overview", "appointments", "messages"],
  },
  staff: {
    label: "Front Desk Staff",
    desc: "Can view and process patient inquiries and general appointments",
    color: "#d97706",
    badgeCls: "bg-amber-50 text-amber-700 ring-amber-200",
    defaultPermissions: ["overview", "appointments"],
  },
}

export const PERMISSION_OPTIONS: { id: AdminPermission; label: string; desc: string }[] = [
  { id: "overview", label: "Dashboard Analytics", desc: "View real-time statistics and overview metrics" },
  { id: "appointments", label: "General Appointments", desc: "View, confirm, and manage appointment requests" },
  { id: "messages", label: "Patient Messages", desc: "Read, respond to, and organize contact messages" },
  { id: "doctors", label: "Doctor Directory", desc: "Add, modify, and schedule doctor profiles" },
  { id: "manage_access", label: "Access & User Management", desc: "Create, edit, and revoke dashboard user credentials" },
  { id: "export_data", label: "Export Reports", desc: "Download patient and administrative records" },
]

export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: "usr_primary_admin",
    name: "Dr. Radhakishan (Super Admin)",
    email: "admin@co.in",
    password: "•••••• (123456)",
    role: "super_admin",
    status: "active",
    department: "Executive Management",
    permissions: ["overview", "appointments", "messages", "doctors", "manage_access", "export_data"],
    createdAt: Date.now() - 30 * 86400000,
    lastActive: Date.now() - 5 * 60000,
    isPrimary: true,
  },
  {
    id: "usr_2",
    name: "Priya Sharma",
    email: "operations@radhakishanhospital.com",
    password: "•••••• (Pass@2026)",
    role: "admin",
    status: "active",
    department: "Hospital Operations",
    permissions: ["overview", "appointments", "messages", "doctors", "export_data"],
    createdAt: Date.now() - 14 * 86400000,
    lastActive: Date.now() - 45 * 60000,
  },
  {
    id: "usr_3",
    name: "Dr. Arun Patel",
    email: "clinical.ops@radhakishanhospital.com",
    password: "•••••• (Arun#882)",
    role: "manager",
    status: "active",
    department: "Outpatient Department (OPD)",
    permissions: ["overview", "appointments", "messages"],
    createdAt: Date.now() - 7 * 86400000,
    lastActive: Date.now() - 2 * 3600000,
  },
  {
    id: "usr_4",
    name: "Neha Gupta",
    email: "reception@radhakishanhospital.com",
    password: "•••••• (FrontDesk!9)",
    role: "staff",
    status: "inactive",
    department: "Front Desk & Reception",
    permissions: ["overview", "appointments"],
    createdAt: Date.now() - 2 * 86400000,
    lastActive: Date.now() - 24 * 3600000,
  },
]

const INITIAL_LOGS: AccessLog[] = [
  {
    id: "log_1",
    action: "User Created",
    targetUser: "reception@radhakishanhospital.com",
    performedBy: "admin@co.in",
    timestamp: Date.now() - 2 * 86400000,
    type: "create",
  },
  {
    id: "log_2",
    action: "Permissions Updated",
    targetUser: "clinical.ops@radhakishanhospital.com",
    performedBy: "admin@co.in",
    timestamp: Date.now() - 4 * 86400000,
    type: "update",
  },
  {
    id: "log_3",
    action: "Admin Sign In",
    targetUser: "admin@co.in",
    performedBy: "admin@co.in",
    timestamp: Date.now() - 5 * 60000,
    type: "login",
  },
]

function generatePassword() {
  const chars = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789!@#$%&*"
  let pwd = ""
  for (let i = 0; i < 12; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return pwd
}

export function getStoredAdminUsers(): AdminUser[] {
  try {
    const raw = localStorage.getItem(ADMIN_USERS_STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(ADMIN_USERS_STORAGE_KEY, JSON.stringify(INITIAL_ADMIN_USERS))
      return INITIAL_ADMIN_USERS
    }
    return JSON.parse(raw)
  } catch {
    return INITIAL_ADMIN_USERS
  }
}

export default function ManageAccess() {
  const { push } = useToast()

  // State
  const [users, setUsers] = useState<AdminUser[]>(() => getStoredAdminUsers())
  const [logs, setLogs] = useState<AccessLog[]>(() => {
    try {
      const raw = localStorage.getItem(LOGS_STORAGE_KEY)
      return raw ? JSON.parse(raw) : INITIAL_LOGS
    } catch {
      return INITIAL_LOGS
    }
  })

  // Filters
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null)
  const [passwordTargetUser, setPasswordTargetUser] = useState<AdminUser | null>(null)
  const [deleteTargetUser, setDeleteTargetUser] = useState<AdminUser | null>(null)
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false)

  // Add User Form State
  const [newName, setNewName] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [newConfirmPassword, setNewConfirmPassword] = useState("")
  const [newRole, setNewRole] = useState<AdminRole>("admin")
  const [newDepartment, setNewDepartment] = useState("")
  const [newStatus, setNewStatus] = useState<AdminStatus>("active")
  const [newPermissions, setNewPermissions] = useState<AdminPermission[]>(ROLE_CONFIG.admin.defaultPermissions)
  const [requireReset, setRequireReset] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Edit User Form State
  const [editName, setEditName] = useState("")
  const [editEmail, setEditEmail] = useState("")
  const [editRole, setEditRole] = useState<AdminRole>("admin")
  const [editDepartment, setEditDepartment] = useState("")
  const [editStatus, setEditStatus] = useState<AdminStatus>("active")
  const [editPermissions, setEditPermissions] = useState<AdminPermission[]>([])

  // Change Password Modal State
  const [resetNewPassword, setResetNewPassword] = useState("")
  const [resetConfirmPassword, setResetConfirmPassword] = useState("")
  const [showResetPassword, setShowResetPassword] = useState(false)
  const [passwordError, setPasswordError] = useState("")

  // Save changes to localStorage
  const saveUsers = (updatedUsers: AdminUser[]) => {
    setUsers(updatedUsers)
    try {
      localStorage.setItem(ADMIN_USERS_STORAGE_KEY, JSON.stringify(updatedUsers))
    } catch {
      /* ignore */
    }
  }

  const logActivity = (action: string, targetUser: string, type: AccessLog["type"]) => {
    const newLog: AccessLog = {
      id: "log_" + Date.now(),
      action,
      targetUser,
      performedBy: "admin@co.in",
      timestamp: Date.now(),
      type,
    }
    const updatedLogs = [newLog, ...logs].slice(0, 50)
    setLogs(updatedLogs)
    try {
      localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(updatedLogs))
    } catch {
      /* ignore */
    }
  }

  // Update role defaults when adding user
  const handleRoleChange = (role: AdminRole) => {
    setNewRole(role)
    setNewPermissions(ROLE_CONFIG[role].defaultPermissions)
  }

  const handleEditRoleChange = (role: AdminRole) => {
    setEditRole(role)
    setEditPermissions(ROLE_CONFIG[role].defaultPermissions)
  }

  const togglePermission = (perm: AdminPermission, isEdit = false) => {
    if (isEdit) {
      setEditPermissions((prev) =>
        prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
      )
    } else {
      setNewPermissions((prev) =>
        prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
      )
    }
  }

  // Reset Add Form
  const resetAddForm = () => {
    setNewName("")
    setNewEmail("")
    setNewPassword("")
    setNewConfirmPassword("")
    setNewRole("admin")
    setNewDepartment("")
    setNewStatus("active")
    setNewPermissions(ROLE_CONFIG.admin.defaultPermissions)
    setRequireReset(false)
    setShowPassword(false)
    setFormErrors({})
  }

  // Open Edit Modal
  const openEditModal = (user: AdminUser) => {
    setEditingUser(user)
    setEditName(user.name)
    setEditEmail(user.email)
    setEditRole(user.role)
    setEditDepartment(user.department || "")
    setEditStatus(user.status)
    setEditPermissions(user.permissions || ROLE_CONFIG[user.role].defaultPermissions)
  }

  // Open Password Modal
  const openPasswordModal = (user: AdminUser) => {
    setPasswordTargetUser(user)
    setResetNewPassword("")
    setResetConfirmPassword("")
    setShowResetPassword(false)
    setPasswordError("")
  }

  // Handle Create User
  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault()
    const errors: Record<string, string> = {}

    if (!newName.trim()) errors.name = "Full name is required"
    if (!newEmail.trim()) {
      errors.email = "Email address is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail.trim())) {
      errors.email = "Please enter a valid email address"
    } else if (users.some((u) => u.email.toLowerCase() === newEmail.trim().toLowerCase())) {
      errors.email = "An administrator account with this email already exists"
    }

    if (!newPassword) {
      errors.password = "Password is required"
    } else if (newPassword.length < 6) {
      errors.password = "Password must be at least 6 characters"
    }

    if (newPassword !== newConfirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    const newUser: AdminUser = {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      name: newName.trim(),
      email: newEmail.trim().toLowerCase(),
      password: newPassword,
      role: newRole,
      status: newStatus,
      department: newDepartment.trim() || undefined,
      permissions: newPermissions,
      createdAt: Date.now(),
      mustChangePassword: requireReset,
    }

    const updated = [newUser, ...users]
    saveUsers(updated)
    logActivity(`Created admin user (${ROLE_CONFIG[newRole].label})`, newUser.email, "create")
    setIsAddModalOpen(false)
    resetAddForm()
    push(`Admin access granted to ${newUser.name}`, "success")
  }

  // Handle Edit User Submit
  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingUser) return

    if (!editName.trim()) {
      push("Full name cannot be empty", "error")
      return
    }

    const updated = users.map((u) => {
      if (u.id === editingUser.id) {
        return {
          ...u,
          name: editName.trim(),
          role: editRole,
          department: editDepartment.trim() || undefined,
          status: editStatus,
          permissions: editPermissions,
        }
      }
      return u
    })

    saveUsers(updated)
    logActivity(`Updated profile & permissions for ${editingUser.email}`, editingUser.email, "update")
    setEditingUser(null)
    push("User permissions and profile updated successfully", "success")
  }

  // Handle Quick Status Toggle
  const toggleUserStatus = (user: AdminUser) => {
    if (user.isPrimary) {
      push("Primary Super Admin account status cannot be deactivated", "error")
      return
    }

    const nextStatus: AdminStatus = user.status === "active" ? "inactive" : "active"
    const updated = users.map((u) => (u.id === user.id ? { ...u, status: nextStatus } : u))
    saveUsers(updated)
    logActivity(`Changed status to ${nextStatus}`, user.email, "status")
    push(`Account status for ${user.name} set to ${nextStatus}`, "info")
  }

  // Handle Change Password Submit
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (!passwordTargetUser) return

    if (!resetNewPassword) {
      setPasswordError("New password is required")
      return
    }
    if (resetNewPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters")
      return
    }
    if (resetNewPassword !== resetConfirmPassword) {
      setPasswordError("Passwords do not match")
      return
    }

    const updated = users.map((u) => {
      if (u.id === passwordTargetUser.id) {
        return { ...u, password: resetNewPassword }
      }
      return u
    })

    saveUsers(updated)
    logActivity(`Password reset for ${passwordTargetUser.email}`, passwordTargetUser.email, "password")
    setPasswordTargetUser(null)
    push(`Password successfully updated for ${passwordTargetUser.name}`, "success")
  }

  // Handle Delete User
  const handleDeleteUser = () => {
    if (!deleteTargetUser) return
    if (deleteTargetUser.isPrimary) {
      push("The primary super admin account cannot be removed", "error")
      setDeleteTargetUser(null)
      return
    }

    const updated = users.filter((u) => u.id !== deleteTargetUser.id)
    saveUsers(updated)
    logActivity(`Removed dashboard access for ${deleteTargetUser.email}`, deleteTargetUser.email, "delete")
    setDeleteTargetUser(null)
    push(`Access revoked for ${deleteTargetUser.name}`, "info")
  }

  // Filtered Users
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesQuery =
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (u.department && u.department.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesRole = roleFilter === "all" || u.role === roleFilter
      const matchesStatus = statusFilter === "all" || u.status === statusFilter

      return matchesQuery && matchesRole && matchesStatus
    })
  }, [users, searchQuery, roleFilter, statusFilter])

  // Summary Metrics
  const metrics = useMemo(() => {
    const total = users.length
    const active = users.filter((u) => u.status === "active").length
    const superAdmins = users.filter((u) => u.role === "super_admin").length
    const managers = users.filter((u) => u.role === "manager" || u.role === "staff").length
    return { total, active, superAdmins, managers }
  }, [users])

  const copyCredentials = (user: AdminUser) => {
    const text = `Radhakishan Hospital Admin Access\nURL: ${window.location.origin}/admin\nEmail: ${user.email}\nRole: ${ROLE_CONFIG[user.role].label}`
    navigator.clipboard.writeText(text)
    push("Credentials information copied to clipboard", "info")
  }

  return (
    <div className="space-y-6">
      {/* Top Banner & Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="grid size-10 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
              <ShieldCheck size={20} />
            </span>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
              {metrics.active} Active
            </span>
          </div>
          <p className="mt-3 text-2xl font-bold text-ink">{metrics.total}</p>
          <p className="text-xs font-medium text-muted-foreground">Authorized Dashboard Users</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="grid size-10 place-items-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
              <Shield size={20} />
            </span>
            <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-700">
              Full Access
            </span>
          </div>
          <p className="mt-3 text-2xl font-bold text-ink">{metrics.superAdmins}</p>
          <p className="text-xs font-medium text-muted-foreground">Super Administrators</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="grid size-10 place-items-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-100">
              <UserCheck size={20} />
            </span>
            <span className="rounded-full bg-sky-50 px-2 py-0.5 text-xs font-semibold text-sky-700">
              Delegated
            </span>
          </div>
          <p className="mt-3 text-2xl font-bold text-ink">{metrics.managers}</p>
          <p className="text-xs font-medium text-muted-foreground">Managers & Staff Members</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="grid size-10 place-items-center rounded-xl bg-amber-50 text-amber-600 ring-1 ring-amber-100">
              <Lock size={20} />
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Protected
            </span>
          </div>
          <p className="mt-3 text-2xl font-bold text-ink">Strict RBAC</p>
          <p className="text-xs font-medium text-muted-foreground">Role-Based Access Control</p>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={16} className="pointer-events-none absolute left-3.5 top-3 text-slate-400" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search admins by name, email, or department..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-2.5 rounded-full p-0.5 text-slate-400 hover:text-ink"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Role Filter */}
          <div className="flex items-center gap-1.5">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 outline-none transition hover:border-slate-300 focus:border-brand-500"
            >
              <option value="all">All Roles</option>
              <option value="super_admin">Super Admin</option>
              <option value="admin">Administrator</option>
              <option value="manager">Clinic Manager</option>
              <option value="staff">Staff</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 outline-none transition hover:border-slate-300 focus:border-brand-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Activity Log Button */}
          <button
            onClick={() => setIsAuditModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            title="View Security & Access Audit Log"
          >
            <History size={14} className="text-slate-500" />
            <span className="hidden sm:inline">Audit Log</span>
          </button>

          {/* Add User Button */}
          <button
            onClick={() => {
              resetAddForm()
              setIsAddModalOpen(true)
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-brand-800"
          >
            <UserPlus size={15} />
            <span>Add Administrator</span>
          </button>
        </div>
      </div>

      {/* Admin Users List */}
      {filteredUsers.length === 0 ? (
        <div className="grid place-items-center rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center">
          <div className="mb-3 grid size-12 place-items-center rounded-2xl bg-slate-50 text-slate-400 ring-1 ring-slate-100">
            <ShieldCheck size={24} />
          </div>
          <p className="text-sm font-semibold text-ink">No administrator users found</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {searchQuery || roleFilter !== "all" || statusFilter !== "all"
              ? "Try adjusting your search query or filters."
              : "Click 'Add Administrator' to grant dashboard access to new team members."}
          </p>
          {(searchQuery || roleFilter !== "all" || statusFilter !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("")
                setRoleFilter("all")
                setStatusFilter("all")
              }}
              className="mt-3 text-xs font-semibold text-brand-600 hover:underline"
            >
              Reset all filters
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {filteredUsers.map((user) => {
              const roleInfo = ROLE_CONFIG[user.role]
              const initials = user.name
                .split(" ")
                .map((s) => s[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()

              return (
                <motion.div
                  key={user.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className={cn(
                    "relative overflow-hidden rounded-2xl border bg-white p-4 transition hover:border-slate-300 sm:p-5",
                    user.status === "inactive" ? "border-slate-200 bg-slate-50/40 opacity-80" : "border-slate-200 shadow-sm"
                  )}
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    {/* Left: User Details */}
                    <div className="flex min-w-0 items-start gap-3.5">
                      <span
                        className={cn(
                          "grid size-11 shrink-0 place-items-center rounded-xl text-sm font-bold ring-1",
                          user.role === "super_admin"
                            ? "bg-indigo-50 text-indigo-700 ring-indigo-100"
                            : user.role === "admin"
                            ? "bg-brand-50 text-brand-700 ring-brand-100"
                            : user.role === "manager"
                            ? "bg-sky-50 text-sky-700 ring-sky-100"
                            : "bg-amber-50 text-amber-700 ring-amber-100"
                        )}
                      >
                        {initials}
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="truncate text-base font-bold text-ink">{user.name}</h3>

                          {/* Role Badge */}
                          <span
                            className={cn(
                              "inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1",
                              roleInfo.badgeCls
                            )}
                          >
                            {roleInfo.label}
                          </span>

                          {/* Status Badge */}
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1",
                              user.status === "active"
                                ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                                : "bg-slate-100 text-slate-600 ring-slate-200"
                            )}
                          >
                            <span
                              className={cn(
                                "size-1.5 rounded-full",
                                user.status === "active" ? "bg-emerald-500" : "bg-slate-400"
                              )}
                            />
                            {user.status === "active" ? "Active" : "Inactive"}
                          </span>

                          {user.isPrimary && (
                            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">
                              Primary Account
                            </span>
                          )}
                        </div>

                        {/* Email & Department */}
                        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600">
                          <span className="font-medium text-slate-700">{user.email}</span>
                          {user.department && (
                            <>
                              <span className="text-slate-300">·</span>
                              <span className="text-slate-500">{user.department}</span>
                            </>
                          )}
                          {user.lastActive && (
                            <>
                              <span className="text-slate-300">·</span>
                              <span className="inline-flex items-center gap-1 text-slate-400">
                                <Clock size={12} />
                                Active {timeAgo(user.lastActive)}
                              </span>
                            </>
                          )}
                        </div>

                        {/* Granted Permissions Tags */}
                        <div className="mt-3 flex flex-wrap items-center gap-1.5">
                          <span className="text-[11px] font-medium text-slate-400">Permissions:</span>
                          {user.role === "super_admin" ? (
                            <span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-700">
                              <Sparkles size={11} />
                              Full System Access (All Modules)
                            </span>
                          ) : (
                            user.permissions?.map((p) => {
                              const opt = PERMISSION_OPTIONS.find((o) => o.id === p)
                              return (
                                <span
                                  key={p}
                                  className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
                                >
                                  {opt?.label || p}
                                </span>
                              )
                            })
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3 lg:border-0 lg:pt-0">
                      {/* Status switch toggle */}
                      {!user.isPrimary && (
                        <button
                          type="button"
                          onClick={() => toggleUserStatus(user)}
                          title={user.status === "active" ? "Deactivate User Access" : "Activate User Access"}
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition",
                            user.status === "active"
                              ? "border-emerald-200 bg-emerald-50/50 text-emerald-700 hover:bg-emerald-100"
                              : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                          )}
                        >
                          <span
                            className={cn(
                              "size-2 rounded-full",
                              user.status === "active" ? "bg-emerald-500" : "bg-slate-400"
                            )}
                          />
                          {user.status === "active" ? "Enabled" : "Disabled"}
                        </button>
                      )}

                      {/* Copy credentials */}
                      <button
                        type="button"
                        onClick={() => copyCredentials(user)}
                        title="Copy Access Details"
                        className="grid size-9 place-items-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-ink"
                      >
                        <Copy size={15} />
                      </button>

                      {/* Reset / Change Password */}
                      <button
                        type="button"
                        onClick={() => openPasswordModal(user)}
                        title="Change / Reset Password"
                        className="grid size-9 place-items-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-brand-50 hover:text-brand-700"
                      >
                        <KeyRound size={15} />
                      </button>

                      {/* Edit Profile & Permissions */}
                      <button
                        type="button"
                        onClick={() => openEditModal(user)}
                        title="Edit Details & Permissions"
                        className="grid size-9 place-items-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-brand-50 hover:text-brand-700"
                      >
                        <Edit2 size={15} />
                      </button>

                      {/* Delete User */}
                      {!user.isPrimary && (
                        <button
                          type="button"
                          onClick={() => setDeleteTargetUser(user)}
                          title="Revoke Admin Access"
                          className="grid size-9 place-items-center rounded-xl border border-slate-200 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      )}

      {/* ----------------- MODAL: Add Administrator ----------------- */}
      <Modal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} size="lg" labelledBy="add-admin-title">
        <ModalHeader
          id="add-admin-title"
          title="Add Administrator"
          subtitle="Grant new team members dashboard access and assign customized role privileges."
          icon={UserPlus}
          onClose={() => setIsAddModalOpen(false)}
        />

        <form onSubmit={handleCreateUser} className="max-h-[75vh] overflow-y-auto p-6 space-y-5">
          {/* Name & Email */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Full Name" required hint="e.g., Dr. Meera Reddy">
              <div className="relative">
                <User size={16} className="pointer-events-none absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={newName}
                  onChange={(e) => {
                    setNewName(e.target.value)
                    if (formErrors.name) setFormErrors((p) => ({ ...p, name: "" }))
                  }}
                  className={cn(inputCls, "pl-10", formErrors.name && "border-rose-400 focus:border-rose-500")}
                />
              </div>
              {formErrors.name && <p className="mt-1 text-xs text-rose-600">{formErrors.name}</p>}
            </Field>

            <Field label="Email Address" required hint="Used for dashboard sign-in">
              <div className="relative">
                <Mail size={16} className="pointer-events-none absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="email"
                  placeholder="admin.user@hospital.com"
                  value={newEmail}
                  onChange={(e) => {
                    setNewEmail(e.target.value)
                    if (formErrors.email) setFormErrors((p) => ({ ...p, email: "" }))
                  }}
                  className={cn(inputCls, "pl-10", formErrors.email && "border-rose-400 focus:border-rose-500")}
                />
              </div>
              {formErrors.email && <p className="mt-1 text-xs text-rose-600">{formErrors.email}</p>}
            </Field>
          </div>

          {/* Password & Confirm Password */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Access Credentials</span>
              <button
                type="button"
                onClick={() => {
                  const gen = generatePassword()
                  setNewPassword(gen)
                  setNewConfirmPassword(gen)
                  setShowPassword(true)
                  push("Strong password generated!", "info")
                }}
                className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700"
              >
                <Sparkles size={13} />
                Generate Strong Password
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label="Password" required>
                <div className="relative">
                  <Lock size={16} className="pointer-events-none absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password (min 6 chars)"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value)
                      if (formErrors.password) setFormErrors((p) => ({ ...p, password: "" }))
                    }}
                    className={cn(inputCls, "pl-10 pr-10", formErrors.password && "border-rose-400")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {formErrors.password && <p className="mt-1 text-xs text-rose-600">{formErrors.password}</p>}
              </Field>

              <Field label="Confirm Password" required>
                <div className="relative">
                  <Lock size={16} className="pointer-events-none absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    value={newConfirmPassword}
                    onChange={(e) => {
                      setNewConfirmPassword(e.target.value)
                      if (formErrors.confirmPassword) setFormErrors((p) => ({ ...p, confirmPassword: "" }))
                    }}
                    className={cn(inputCls, "pl-10", formErrors.confirmPassword && "border-rose-400")}
                  />
                </div>
                {formErrors.confirmPassword && (
                  <p className="mt-1 text-xs text-rose-600">{formErrors.confirmPassword}</p>
                )}
              </Field>
            </div>
          </div>

          {/* Role Selection */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-ink">
              Select Role & Base Privileges <span className="text-brand-600">*</span>
            </label>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {(Object.keys(ROLE_CONFIG) as AdminRole[]).map((r) => {
                const info = ROLE_CONFIG[r]
                const selected = newRole === r
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => handleRoleChange(r)}
                    className={cn(
                      "flex flex-col items-start rounded-xl border p-3 text-left transition",
                      selected
                        ? "border-brand-500 bg-brand-50/40 ring-2 ring-brand-500/20"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    )}
                  >
                    <div className="flex w-full items-center justify-between">
                      <span className="text-sm font-bold text-ink">{info.label}</span>
                      {selected && <CheckCircle2 size={16} className="text-brand-600" />}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{info.desc}</p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Department / Unit */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Department / Unit" hint="e.g. Cardiology, OPD, Front Office">
              <input
                type="text"
                placeholder="Hospital Department"
                value={newDepartment}
                onChange={(e) => setNewDepartment(e.target.value)}
                className={inputCls}
              />
            </Field>

            <Field label="Initial Status">
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as AdminStatus)}
                className={inputCls}
              >
                <option value="active">Active (Instant Access)</option>
                <option value="inactive">Inactive (Disabled)</option>
              </select>
            </Field>
          </div>

          {/* Granular Permissions */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-ink">Custom Granular Permissions</span>
              <span className="text-xs text-muted-foreground">Adjust access to specific modules</span>
            </div>
            <div className="grid grid-cols-1 gap-2 rounded-xl border border-slate-200 bg-slate-50/40 p-3 sm:grid-cols-2">
              {PERMISSION_OPTIONS.map((opt) => {
                const checked = newPermissions.includes(opt.id)
                return (
                  <label
                    key={opt.id}
                    className="flex cursor-pointer items-start gap-2.5 rounded-lg p-2 transition hover:bg-white"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => togglePermission(opt.id)}
                      className="mt-1 size-4 rounded text-brand-600 focus:ring-brand-500"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-ink">{opt.label}</p>
                      <p className="text-[11px] text-muted-foreground">{opt.desc}</p>
                    </div>
                  </label>
                )
              })}
            </div>
          </div>

          {/* Options: Require Reset */}
          <div className="space-y-2 border-t border-slate-100 pt-3">
            <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-slate-700">
              <input
                type="checkbox"
                checked={requireReset}
                onChange={(e) => setRequireReset(e.target.checked)}
                className="size-4 rounded text-brand-600 focus:ring-brand-500"
              />
              Require user to change password on first login
            </label>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-800"
            >
              <UserPlus size={16} />
              <span>Create Administrator</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* ----------------- MODAL: Edit User ----------------- */}
      <Modal open={editingUser !== null} onClose={() => setEditingUser(null)} size="lg" labelledBy="edit-admin-title">
        <ModalHeader
          id="edit-admin-title"
          title="Edit Administrator"
          subtitle={`Modify profile details and granular permissions for ${editingUser?.email}`}
          icon={Edit2}
          onClose={() => setEditingUser(null)}
        />

        {editingUser && (
          <form onSubmit={handleUpdateUser} className="max-h-[75vh] overflow-y-auto p-6 space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Full Name" required>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className={inputCls}
                />
              </Field>

              <Field label="Email Address (Login Identifier)">
                <input
                  type="email"
                  disabled
                  value={editEmail}
                  className={cn(inputCls, "bg-slate-100 text-slate-500 cursor-not-allowed")}
                />
              </Field>
            </div>

            {/* Role Selection */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-ink">Role Level</label>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {(Object.keys(ROLE_CONFIG) as AdminRole[]).map((r) => {
                  const info = ROLE_CONFIG[r]
                  const selected = editRole === r
                  return (
                    <button
                      key={r}
                      type="button"
                      disabled={editingUser.isPrimary && r !== "super_admin"}
                      onClick={() => handleEditRoleChange(r)}
                      className={cn(
                        "flex flex-col items-start rounded-xl border p-3 text-left transition",
                        selected
                          ? "border-brand-500 bg-brand-50/40 ring-2 ring-brand-500/20"
                          : "border-slate-200 bg-white hover:border-slate-300",
                        editingUser.isPrimary && r !== "super_admin" && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <div className="flex w-full items-center justify-between">
                        <span className="text-sm font-bold text-ink">{info.label}</span>
                        {selected && <CheckCircle2 size={16} className="text-brand-600" />}
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{info.desc}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Department / Unit">
                <input
                  type="text"
                  value={editDepartment}
                  onChange={(e) => setEditDepartment(e.target.value)}
                  className={inputCls}
                />
              </Field>

              <Field label="Status">
                <select
                  disabled={editingUser.isPrimary}
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as AdminStatus)}
                  className={cn(inputCls, editingUser.isPrimary && "bg-slate-100 cursor-not-allowed")}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </Field>
            </div>

            {/* Permissions */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-ink">Module Access Permissions</span>
                <span className="text-xs text-muted-foreground">Toggle module rights</span>
              </div>
              <div className="grid grid-cols-1 gap-2 rounded-xl border border-slate-200 bg-slate-50/40 p-3 sm:grid-cols-2">
                {PERMISSION_OPTIONS.map((opt) => {
                  const checked = editPermissions.includes(opt.id)
                  return (
                    <label
                      key={opt.id}
                      className="flex cursor-pointer items-start gap-2.5 rounded-lg p-2 transition hover:bg-white"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => togglePermission(opt.id, true)}
                        className="mt-1 size-4 rounded text-brand-600 focus:ring-brand-500"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-ink">{opt.label}</p>
                        <p className="text-[11px] text-muted-foreground">{opt.desc}</p>
                      </div>
                    </label>
                  )
                })}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-800"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* ----------------- MODAL: Reset / Change Password ----------------- */}
      <Modal
        open={passwordTargetUser !== null}
        onClose={() => setPasswordTargetUser(null)}
        size="sm"
        labelledBy="reset-pwd-title"
      >
        <ModalHeader
          id="reset-pwd-title"
          title="Reset Password"
          subtitle={`Assign a new password for ${passwordTargetUser?.name}`}
          icon={KeyRound}
          onClose={() => setPasswordTargetUser(null)}
        />

        {passwordTargetUser && (
          <form onSubmit={handleChangePassword} className="p-6 space-y-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
              <p className="font-semibold text-ink">Account: {passwordTargetUser.email}</p>
              <p className="mt-0.5 text-slate-500">
                Updating this will immediately allow the administrator to sign in with their new credentials.
              </p>
            </div>

            <Field label="New Password" required>
              <div className="relative">
                <Lock size={16} className="pointer-events-none absolute left-3.5 top-3 text-slate-400" />
                <input
                  type={showResetPassword ? "text" : "password"}
                  placeholder="New password (min 6 characters)"
                  value={resetNewPassword}
                  onChange={(e) => {
                    setResetNewPassword(e.target.value)
                    setPasswordError("")
                  }}
                  className={cn(inputCls, "pl-10 pr-10")}
                />
                <button
                  type="button"
                  onClick={() => setShowResetPassword((s) => !s)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showResetPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </Field>

            <Field label="Confirm New Password" required>
              <div className="relative">
                <Lock size={16} className="pointer-events-none absolute left-3.5 top-3 text-slate-400" />
                <input
                  type={showResetPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={resetConfirmPassword}
                  onChange={(e) => {
                    setResetConfirmPassword(e.target.value)
                    setPasswordError("")
                  }}
                  className={cn(inputCls, "pl-10")}
                />
              </div>
            </Field>

            <button
              type="button"
              onClick={() => {
                const gen = generatePassword()
                setResetNewPassword(gen)
                setResetConfirmPassword(gen)
                setShowResetPassword(true)
                push("Random strong password generated", "info")
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700"
            >
              <Sparkles size={13} />
              Auto-generate strong password
            </button>

            {passwordError && (
              <p className="rounded-lg bg-rose-50 p-2.5 text-xs font-medium text-rose-700">
                {passwordError}
              </p>
            )}

            <div className="flex gap-2 pt-3">
              <button
                type="button"
                onClick={() => setPasswordTargetUser(null)}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-800"
              >
                Update Password
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* ----------------- MODAL: Security Audit Log ----------------- */}
      <Modal open={isAuditModalOpen} onClose={() => setIsAuditModalOpen(false)} size="md" labelledBy="audit-log-title">
        <ModalHeader
          id="audit-log-title"
          title="Access & Security Audit Log"
          subtitle="Real-time log of administrative access modifications and login activities"
          icon={History}
          onClose={() => setIsAuditModalOpen(false)}
        />

        <div className="max-h-[60vh] overflow-y-auto p-6">
          {logs.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">No access logs recorded yet.</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {logs.map((log) => (
                <div key={log.id} className="flex items-start gap-3 py-3">
                  <span
                    className={cn(
                      "mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg text-xs",
                      log.type === "create" && "bg-emerald-50 text-emerald-600",
                      log.type === "delete" && "bg-rose-50 text-rose-600",
                      log.type === "password" && "bg-amber-50 text-amber-600",
                      log.type === "update" && "bg-sky-50 text-sky-600",
                      log.type === "status" && "bg-purple-50 text-purple-600",
                      log.type === "login" && "bg-brand-50 text-brand-600"
                    )}
                  >
                    {log.type === "create" && <UserPlus size={14} />}
                    {log.type === "delete" && <Trash2 size={14} />}
                    {log.type === "password" && <KeyRound size={14} />}
                    {log.type === "update" && <Edit2 size={14} />}
                    {log.type === "status" && <SlidersHorizontal size={14} />}
                    {log.type === "login" && <ShieldCheck size={14} />}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-ink">{log.action}</p>
                      <span className="text-[11px] text-slate-400">{timeAgo(log.timestamp)}</span>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      Target: <span className="font-medium text-slate-700">{log.targetUser}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Modal>

      {/* ----------------- Confirm Delete Dialog ----------------- */}
      <ConfirmDialog
        open={deleteTargetUser !== null}
        title="Revoke Admin Access?"
        message={`Are you sure you want to remove dashboard access for ${deleteTargetUser?.name} (${deleteTargetUser?.email})? They will no longer be able to log in or manage hospital records.`}
        confirmLabel="Revoke Access"
        onCancel={() => setDeleteTargetUser(null)}
        onConfirm={handleDeleteUser}
      />
    </div>
  )
}
