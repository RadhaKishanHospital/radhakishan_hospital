import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type { GeneralAppointment, Message, Status } from "./store"

// --- Fetch Functions ---
export async function fetchGeneralAppointments(): Promise<GeneralAppointment[]> {
  const res = await fetch("/api/general-appointments")
  if (!res.ok) throw new Error("Failed to fetch general appointments")
  return res.json()
}

export async function fetchMessages(): Promise<Message[]> {
  const res = await fetch("/api/messages")
  if (!res.ok) throw new Error("Failed to fetch messages")
  return res.json()
}

// --- Query Hooks ---
export function useGeneralAppointments() {
  return useQuery({
    queryKey: ["generalAppointments"],
    queryFn: fetchGeneralAppointments,
    staleTime: 1000 * 60 * 5, // Keep cached for 5 mins
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  })
}

export function useMessages() {
  return useQuery({
    queryKey: ["messages"],
    queryFn: fetchMessages,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  })
}

// --- Mutation Hooks ---
export function useUpdateGeneralAppointmentStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Status }) => {
      const res = await fetch(`/api/general-appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error("Failed to update status")
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["generalAppointments"] })
    },
  })
}

export function useDeleteGeneralAppointment() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/general-appointments/${id}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Failed to delete appointment")
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["generalAppointments"] })
    },
  })
}

export function useToggleMessageRead() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, read }: { id: string; read: boolean }) => {
      const res = await fetch(`/api/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: !read }),
      })
      if (!res.ok) throw new Error("Failed to toggle read state")
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] })
    },
  })
}

export function useDeleteMessage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/messages/${id}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Failed to delete message")
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] })
    },
  })
}

// --- Reviews ---
export interface Review {
  id: string
  name: string
  description: string
  rating: number
  createdAt: number
}

export async function fetchReviews(): Promise<Review[]> {
  const res = await fetch("/api/reviews")
  if (!res.ok) throw new Error("Failed to fetch reviews")
  return res.json()
}

export function useReviews() {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  })
}

export function useAddReview() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (review: { name: string; description: string; rating: number }) => {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      })
      if (!res.ok) throw new Error("Failed to submit review")
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] })
    },
  })
}
