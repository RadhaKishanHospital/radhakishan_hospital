import { Link, useParams } from "react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import { Icon } from "@iconify/react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { useState } from "react";
import AppointmentModal, {
  type AppointmentDraft,
} from "../components/AppointmentModal";
import { toast } from "sonner";

const doctors: Record<
  number,
  {
    id: number;
    name: string;
    specialty: string;
    qualification: string;
    experience: string;
    initials: string;
    bio: string;
    education: string[];
    registrationAuthority: string;
    registrationNo: string;
    available: boolean;
  }
> = {
  1: {
    id: 1,
    name: "Dr. Akanksha Tyagi",
    specialty: "General Medicine",
    qualification: "MBBS, MD (General Medicine)",
    initials: "AT",
    bio: "Specialist in General Medicine.",
    education: [
      "Rajasthan University of Health Sciences",
    ],
    registrationAuthority: "Haryana Medical Council",
    registrationNo: "HN-23419",
    available: true,
  },

  2: {
    id: 2,
    name: "Dr. Shashank Singhal",
    specialty: "Surgery",
    qualification: "MBBS, MS (General Surgery)",
    initials: "SS",
    bio: "Specialist in General Surgery.",
    education: [
      "Pt. B.D. Sharma University of Health Sciences, Rohtak",
      "NIMS University, Jaipur",
    ],
    registrationAuthority: "Haryana Medical Council",
    registrationNo: "HN-10817",
    available: true,
  },

  3: {
    id: 3,
    name: "Dr. Monika Dixit",
    specialty: "Pathology",
    qualification: "MBBS, MD (Pathology)",
    initials: "MD",
    bio: "Specialist in Pathology.",
    education: [
      "Institute of Medical Sciences, BHU, Varanasi",
    ],
    registrationAuthority: "Haryana Medical Council",
    registrationNo: "HN-013272",
    available: true,
  },

  4: {
    id: 4,
    name: "Dr. Lokender Goyal",
    specialty: "Pediatrics & Neonatal Care",
    qualification: "MBBS, MD (Pediatrics)",
    initials: "LG",
    bio: "Specialist in Pediatrics and Neonatal Care.",
    education: [
      "Himachal Pradesh University",
      "Panjab University",
    ],
    registrationAuthority: "Haryana Medical Council",
    registrationNo: "HN-21452",
    available: true,
  },
};

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
];

const DoctorProfile = () => {
  const { id } = useParams<{ id: string }>();
  const doctor = doctors[Number(id)];
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold font-display text-foreground mb-4">Doctor not found</h1>
          <Link to="/">
            <Button variant="outline" className="rounded-full">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-2 min-w-0 max-w-[calc(100%-3.5rem)] sm:max-w-none">
              <motion.div
                className="flex items-center gap-2"
              >
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <div className="text-white text-xl">+</div>
                </div>
                <div className="min-w-0">
                  <div className="text-base sm:text-xl tracking-tight leading-tight" style={{ fontWeight: 600 }}>
                    Radha Kishan Hospital
                  </div>
                  <div className="text-xs text-muted-foreground">Medical Center</div>
                </div>
              </motion.div>
            </Link>
            <Link to="/doctors">
              <Button variant="ghost" className="rounded-full text-sm">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-10 lg:py-16">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left: Doctor Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/25 flex items-center justify-center shrink-0">
                <span className="text-3xl font-bold text-primary">{doctor.initials}</span>
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold font-display text-foreground mb-2">{doctor.name}</h1>
                <p className="text-lg text-primary font-medium mb-3">{doctor.specialty}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Icon icon="solar:stethoscope-linear" className="w-4 h-4 text-primary" />
                    {doctor.qualification}
                  </span>
                  <div className="flex items-start gap-1.5">
                    <Icon icon="solar:square-academic-cap-linear" className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div className="flex flex-col gap-1">
                      {doctor.education.map((university) => (
                        <span key={university}>{university}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold font-display text-foreground mb-3">About</h2>
                <p className="text-muted-foreground leading-relaxed">{doctor.bio}</p>
              </div>

              <div>
                <h2 className="text-xl font-bold font-display text-foreground mb-3">
                  Qualification
                </h2>

                <div className="flex items-center gap-3">
                  <Icon icon="solar:square-academic-cap-linear" className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">
                    {doctor.qualification}
                  </span>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold font-display text-foreground mb-3">
                  Registration
                </h2>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Icon icon="solar:diploma-verified-linear" className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Registration Authority
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {doctor.registrationAuthority}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Icon icon="solar:clipboard-linear" className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Registration No.
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {doctor.registrationNo}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Booking */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-card rounded-3xl  p-6 sticky top-28 shadow-[0_10px_30px_rgba(15,23,42,0.06)] hover:shadow-[0_16px_32px_rgba(15,23,42,0.1)] transition-all duration-300">
              <h3 className="text-lg font-bold font-display text-foreground mb-1">Book Appointment</h3>
              <p className="text-sm text-muted-foreground mb-6">Select an available time slot</p>

              <div className="flex items-center gap-2 mb-4">
  <Icon icon="solar:calendar-linear" className="w-4 h-4 text-primary" />
  <span className="text-sm font-semibold text-foreground">
    Choose your preferred date & time
  </span>
</div>

              <div className="grid grid-cols-3 gap-2 mb-6">
                {timeSlots.map((slot) => {
                  const isUnavailable = !doctor.available && ["9:00 AM", "9:30 AM", "10:00 AM"].includes(slot);
                  return (
                    <button
                      key={slot}
                      onClick={() => !isUnavailable && setSelectedSlot(slot)}
                      disabled={isUnavailable}
                      className={`py-2.5 px-2 rounded-xl text-xs font-semibold transition-all duration-200 ${selectedSlot === slot
                        ? "bg-primary text-primary-foreground shadow-elegant"
                        : isUnavailable
                          ? "bg-muted text-muted-foreground/40 cursor-not-allowed"
                          : "bg-secondary text-secondary-foreground hover:bg-accent"
                        }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>

              <Button
  className="w-full rounded-xl h-12 text-sm font-semibold shadow-elegant hover:shadow-elegant-lg transition-all duration-300"
  disabled={!selectedSlot}
  onClick={() => setAppointmentModalOpen(true)}
>
                {selectedSlot ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Confirm {selectedSlot}
                  </span>
                ) : (
                  "Select a time slot"
                )}
              </Button>

              <div className="flex items-center gap-2 mt-4 justify-center">
                <Icon icon="solar:map-point-linear" className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Radha Kishan Hospital, Floor 3</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <AppointmentModal
        open={appointmentModalOpen}
        slot={selectedSlot ?? ""}
        doctorName={doctor.name}
        onClose={() => setAppointmentModalOpen(false)}
        onSubmit={async (data) => {
          try {
            const response = await fetch('/api/doctor-appointments', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                patientName: data.name,
                patientEmail: data.email,
                patientPhone: data.mobile,
                doctorId: String(doctor.id),
                doctorName: doctor.name,
                specialty: doctor.specialty,
                date: data.date,
                time: selectedSlot ?? "",
                status: "pending"
              })
            });
            if (!response.ok) throw new Error("Unable to save doctor appointment");
            toast.success("Doctor appointment booked successfully!");
          } catch (err) {
            console.error("Error saving doctor appointment to MongoDB:", err);
            toast.error("Unable to book your appointment. Please try again.");
            return;
          }
          setAppointmentModalOpen(false);
        }}
      />
    </div>
  );
};

export default DoctorProfile;
