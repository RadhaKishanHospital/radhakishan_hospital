import { Link, useParams } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Star, Clock, Award, MapPin, Phone, Calendar, CheckCircle, Stethoscope } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { useState } from "react";

const doctors: Record<number, {
  id: number; name: string; specialty: string; rating: number; reviews: number;
  experience: string; initials: string; bio: string; education: string;
  languages: string[]; insurance: string[]; available: boolean;
}> = {
  1: { id: 1, name: "Dr. Sarah Mitchell", specialty: "Cardiology", rating: 4.9, reviews: 234, experience: "15 years", initials: "SM", bio: "Board-certified cardiologist specializing in interventional cardiology and heart failure management. Pioneer in minimally invasive cardiac procedures.", education: "Harvard Medical School", languages: ["English", "Spanish"], insurance: ["BlueCross", "Aetna", "United"], available: true },
  2: { id: 2, name: "Dr. James Chen", specialty: "Neurology", rating: 4.8, reviews: 189, experience: "12 years", initials: "JC", bio: "Expert neurologist with focus on movement disorders and neurodegenerative diseases. Published researcher in Parkinson's disease therapeutics.", education: "Johns Hopkins University", languages: ["English", "Mandarin"], insurance: ["BlueCross", "Cigna", "Medicare"], available: true },
  3: { id: 3, name: "Dr. Amara Okafor", specialty: "Orthopedics", rating: 4.9, reviews: 312, experience: "20 years", initials: "AO", bio: "Leading orthopedic surgeon specializing in joint replacement and sports medicine. Team physician for professional athletes.", education: "Stanford University", languages: ["English", "Yoruba"], insurance: ["Aetna", "United", "Humana"], available: false },
  4: { id: 4, name: "Dr. Elena Rodriguez", specialty: "Pediatrics", rating: 4.7, reviews: 156, experience: "10 years", initials: "ER", bio: "Compassionate pediatrician dedicated to child wellness and developmental health. Expert in childhood immunology.", education: "Columbia University", languages: ["English", "Spanish", "Portuguese"], insurance: ["BlueCross", "Medicaid", "Cigna"], available: true },
  5: { id: 5, name: "Dr. Michael Park", specialty: "General Medicine", rating: 4.8, reviews: 278, experience: "18 years", initials: "MP", bio: "Experienced internist providing comprehensive primary care with a focus on preventive medicine and chronic disease management.", education: "Yale School of Medicine", languages: ["English", "Korean"], insurance: ["United", "Aetna", "BlueCross"], available: true },
  6: { id: 6, name: "Dr. Priya Sharma", specialty: "Oncology", rating: 4.9, reviews: 201, experience: "22 years", initials: "PS", bio: "Renowned oncologist specializing in targeted cancer therapies and immunotherapy. Leader in clinical research trials.", education: "University of Pennsylvania", languages: ["English", "Hindi", "Gujarati"], insurance: ["BlueCross", "Aetna", "Medicare"], available: true },
  7: { id: 7, name: "Dr. Robert Williams", specialty: "Cardiology", rating: 4.6, reviews: 143, experience: "8 years", initials: "RW", bio: "Cardiologist with expertise in cardiac imaging and electrophysiology. Focused on arrhythmia management.", education: "Duke University", languages: ["English"], insurance: ["Cigna", "United", "Humana"], available: false },
  8: { id: 8, name: "Dr. Aisha Khan", specialty: "Neurology", rating: 4.8, reviews: 167, experience: "14 years", initials: "AK", bio: "Neurologist specializing in headache medicine and multiple sclerosis. Advocate for patient-centered neurological care.", education: "UCLA Medical School", languages: ["English", "Urdu", "Arabic"], insurance: ["BlueCross", "Aetna", "United"], available: true },
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
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold font-display text-foreground tracking-tight">MedElite</span>
            </Link>
            <Link to="/">
              <Button variant="ghost" className="rounded-full text-sm">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
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
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> {doctor.rating} ({doctor.reviews} reviews)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-primary" /> {doctor.experience}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-primary" /> {doctor.education}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold font-display text-foreground mb-3">About</h2>
                <p className="text-muted-foreground leading-relaxed">{doctor.bio}</p>
              </div>

              <div>
                <h2 className="text-xl font-bold font-display text-foreground mb-3">Languages</h2>
                <div className="flex flex-wrap gap-2">
                  {doctor.languages.map((l) => (
                    <Badge key={l} variant="secondary" className="rounded-full px-4 py-1">{l}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold font-display text-foreground mb-3">Insurance Accepted</h2>
                <div className="flex flex-wrap gap-2">
                  {doctor.insurance.map((ins) => (
                    <Badge key={ins} variant="outline" className="rounded-full px-4 py-1">{ins}</Badge>
                  ))}
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
            <div className="bg-card rounded-3xl shadow-elegant-lg p-6 sticky top-28">
              <h3 className="text-lg font-bold font-display text-foreground mb-1">Book Appointment</h3>
              <p className="text-sm text-muted-foreground mb-6">Select an available time slot</p>

              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">Today, March 14</span>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-6">
                {timeSlots.map((slot) => {
                  const isUnavailable = !doctor.available && ["9:00 AM", "9:30 AM", "10:00 AM"].includes(slot);
                  return (
                    <button
                      key={slot}
                      onClick={() => !isUnavailable && setSelectedSlot(slot)}
                      disabled={isUnavailable}
                      className={`py-2.5 px-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                        selectedSlot === slot
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
                <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">MedElite Hospital, Floor 3</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
