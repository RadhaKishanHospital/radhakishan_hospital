import { useCallback, useEffect, useState } from "react"

export type Status = "pending" | "confirmed" | "cancelled" | "completed"

export type GeneralAppointment = {
  id: string
  name: string
  email: string
  phone: string
  department: string
  date: string
  time: string
  notes?: string
  status: Status
  createdAt: number
}

export type DoctorAppointment = {
  id: string
  patientName: string
  patientEmail: string
  patientPhone: string
  doctorId: string
  doctorName: string
  specialty: string
  date: string
  time: string
  status: Status
  createdAt: number
}

export type Message = {
  id: string
  name: string
  email: string
  subject: string
  body: string
  read: boolean
  createdAt: number
}

export type Doctor = {
  id: string
  name: string
  specialty: string
  experience: number
  rating: number
  reviews: number
  education: string
  about: string
  languages: string[]
  insurance: string[]
  photo?: string
}

export type DB = {
  generalAppointments: GeneralAppointment[]
  doctorAppointments: DoctorAppointment[]
  messages: Message[]
  doctors: Doctor[]
}

const KEY = "rkh_admin_db_v1"

const now = Date.now()
const day = 86_400_000

const seed: DB = {
  doctors: [
    {
      id: "d1",
      name: "Dr. Sarah Mitchell",
      specialty: "Cardiology",
      experience: 15,
      rating: 4.9,
      reviews: 234,
      education: "Harvard Medical School",
      about:
        "Board-certified cardiologist specializing in interventional cardiology and heart failure management. Pioneer in minimally invasive cardiac procedures.",
      languages: ["English", "Spanish"],
      insurance: ["BlueCross", "Aetna", "United"],
      photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&auto=format",
    },
    {
      id: "d2",
      name: "Dr. Rajeev Sharma",
      specialty: "Orthopedics",
      experience: 12,
      rating: 4.8,
      reviews: 187,
      education: "AIIMS New Delhi",
      about:
        "Orthopedic surgeon focused on joint replacement and sports injuries. Passionate about restoring mobility with the latest surgical techniques.",
      languages: ["English", "Hindi", "Punjabi"],
      insurance: ["Star Health", "HDFC Ergo", "BlueCross"],
      photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&auto=format",
    },
    {
      id: "d3",
      name: "Dr. Anita Verma",
      specialty: "Pediatrics",
      experience: 9,
      rating: 4.9,
      reviews: 312,
      education: "PGIMER Chandigarh",
      about:
        "Compassionate pediatrician dedicated to child wellness, immunization, and developmental care from newborns to adolescents.",
      languages: ["English", "Hindi"],
      insurance: ["Star Health", "Aetna"],
      photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&auto=format",
    },
  ],
  generalAppointments: [
    {
      id: "g1",
      name: "Ramesh Gupta",
      email: "ramesh@example.com",
      phone: "+91 98765 43210",
      department: "General Medicine",
      date: "2026-08-22",
      time: "10:00 AM",
      notes: "Recurring headaches for the past two weeks.",
      status: "pending",
      createdAt: now - day * 0.5,
    },
    {
      id: "g2",
      name: "Priya Nair",
      email: "priya.nair@example.com",
      phone: "+91 91234 56780",
      department: "Dermatology",
      date: "2026-08-23",
      time: "2:30 PM",
      notes: "Skin allergy consultation.",
      status: "confirmed",
      createdAt: now - day * 2,
    },
    {
      id: "g3",
      name: "Mohit Sethi",
      email: "mohit.sethi@example.com",
      phone: "+91 99887 66554",
      department: "ENT",
      date: "2026-08-24",
      time: "11:30 AM",
      status: "pending",
      createdAt: now - day * 1.2,
    },
  ],
  doctorAppointments: [
    {
      id: "da1",
      patientName: "Neha Kapoor",
      patientEmail: "neha.k@example.com",
      patientPhone: "+91 90000 11122",
      doctorId: "d1",
      doctorName: "Dr. Sarah Mitchell",
      specialty: "Cardiology",
      date: "2026-08-21",
      time: "9:30 AM",
      status: "confirmed",
      createdAt: now - day * 1,
    },
    {
      id: "da2",
      patientName: "Arjun Singh",
      patientEmail: "arjun.singh@example.com",
      patientPhone: "+91 98111 22233",
      doctorId: "d2",
      doctorName: "Dr. Rajeev Sharma",
      specialty: "Orthopedics",
      date: "2026-08-25",
      time: "4:00 PM",
      status: "pending",
      createdAt: now - day * 0.2,
    },
  ],
  messages: [
    {
      id: "m1",
      name: "Suresh Kumar",
      email: "suresh@example.com",
      subject: "Insurance query",
      body: "Do you accept Star Health insurance for cardiac procedures? Please advise.",
      read: false,
      createdAt: now - day * 0.3,
    },
    {
      id: "m2",
      name: "Kavita Rao",
      email: "kavita.rao@example.com",
      subject: "Feedback on my visit",
      body: "Thank you to Dr. Verma and the pediatric team — wonderful experience with my daughter.",
      read: true,
      createdAt: now - day * 3,
    },
  ],
}

function load(): DB {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return seed
    const parsed = JSON.parse(raw) as DB
    return { ...seed, ...parsed }
  } catch {
    return seed
  }
}

// Simple pub/sub so every hook instance stays in sync.
let state: DB = load()
const listeners = new Set<() => void>()

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* ignore quota errors */
  }
  listeners.forEach((l) => l())
}

function setState(updater: (db: DB) => DB) {
  state = updater(state)
  persist()
}

export const uid = () => Math.random().toString(36).slice(2, 10)

export const db = {
  get: () => state,

  updateAppointmentStatus: (id: string, status: Status) =>
    setState((s) => ({
      ...s,
      generalAppointments: s.generalAppointments.map((a) => (a.id === id ? { ...a, status } : a)),
    })),
  deleteGeneralAppointment: (id: string) =>
    setState((s) => ({ ...s, generalAppointments: s.generalAppointments.filter((a) => a.id !== id) })),

  updateDoctorApptStatus: (id: string, status: Status) =>
    setState((s) => ({
      ...s,
      doctorAppointments: s.doctorAppointments.map((a) => (a.id === id ? { ...a, status } : a)),
    })),
  deleteDoctorAppointment: (id: string) =>
    setState((s) => ({ ...s, doctorAppointments: s.doctorAppointments.filter((a) => a.id !== id) })),

  toggleMessageRead: (id: string) =>
    setState((s) => ({
      ...s,
      messages: s.messages.map((m) => (m.id === id ? { ...m, read: !m.read } : m)),
    })),
  deleteMessage: (id: string) =>
    setState((s) => ({ ...s, messages: s.messages.filter((m) => m.id !== id) })),
  addMessage: (m: Omit<Message, "id" | "read" | "createdAt">) =>
    setState((s) => ({
      ...s,
      messages: [{ ...m, id: uid(), read: false, createdAt: Date.now() }, ...s.messages],
    })),

  addGeneralAppointment: (a: Omit<GeneralAppointment, "id" | "status" | "createdAt">) =>
    setState((s) => ({
      ...s,
      generalAppointments: [
        { ...a, id: uid(), status: "pending", createdAt: Date.now() },
        ...s.generalAppointments,
      ],
    })),

  addDoctor: (d: Omit<Doctor, "id">) =>
    setState((s) => ({ ...s, doctors: [{ ...d, id: uid() }, ...s.doctors] })),
  updateDoctor: (d: Doctor) =>
    setState((s) => ({ ...s, doctors: s.doctors.map((x) => (x.id === d.id ? d : x)) })),
  deleteDoctor: (id: string) =>
    setState((s) => ({ ...s, doctors: s.doctors.filter((x) => x.id !== id) })),

  reset: () => {
    state = seed
    persist()
  },
}

export function useDB(): DB {
  const [, force] = useState(0)
  const rerender = useCallback(() => force((n) => n + 1), [])
  useEffect(() => {
    listeners.add(rerender)
    return () => {
      listeners.delete(rerender)
    }
  }, [rerender])
  return state
}
