import { motion } from 'motion/react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Link } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Award, GraduationCap, Mail, Phone } from 'lucide-react';
import { useState, useMemo } from "react";
import {
  Search,
  Heart,
  Brain,
  Bone,
  Stethoscope,
  Baby,
  Shield,
  Scissors,
  Microscope,
  Clock,
  Users,
  CheckCircle,
  ArrowRight,
  MapPin,
  ChevronDown,
  Star,
  Calendar,
  Menu,
  X,
} from "lucide-react";
import { Icon } from '@iconify/react';
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export function Doctors() {
  const [activeSpecialty, setActiveSpecialty] = useState("All");


  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    }),
  };

  const specialties = [
    {
      name: "General Medicine",
      icon: Stethoscope,
      color: "from-blue-50 to-cyan-50",
    },
    {
      name: "Surgery",
      icon: Scissors,
      color: "from-red-50 to-rose-50",
    },
    {
      name: "Pathology",
      icon: Microscope,
      color: "from-purple-50 to-violet-50",
    },
    {
      name: "Pediatrics & Neonatal Care",
      icon: Baby,
      color: "from-green-50 to-emerald-50",
    },
  ];

  const doctors = [
    {
      id: 1,
      name: "Dr. Akanksha Tyagi",
      specialty: "General Medicine",
      qualification: "MD (General Medicine)",
      available: true,
      nextSlot: "Appointments Available",
      experience: "Experienced",
      initials: "AT",
    },
    {
      id: 2,
      name: "Dr. Shashank Singhal",
      specialty: "Surgery",
      qualification: "MD (General Surgery)",
      available: true,
      nextSlot: "Appointments Available",
      experience: "Experienced",
      initials: "SS",
    },
    {
      id: 3,
      name: "Dr. Monika Dixit",
      specialty: "Pathology",
      qualification: "MD (Pathology)",
      available: true,
      nextSlot: "Appointments Available",
      experience: "Experienced",
      initials: "MD",
    },
    {
      id: 4,
      name: "Dr. Lokender Goyal",
      specialty: "Pediatrics & Neonatal Care",
      qualification: "MD (Pediatrics)",
      available: true,
      nextSlot: "Appointments Available",
      experience: "Experienced",
      initials: "LG",
    },
  ];

  const filteredDoctors = useMemo(() => {
    const normalizedSpecialty = activeSpecialty.trim().toLowerCase();

    if (normalizedSpecialty === "all") {
      return doctors;
    }

    return doctors.filter((doc) => doc.specialty.toLowerCase() === normalizedSpecialty);
  }, [activeSpecialty]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#f0fafa] to-white py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl mb-6" style={{ fontWeight: 700 }}>
              Meet Our <span className="text-primary">Expert Doctors</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Our team of highly qualified and experienced medical professionals is
              dedicated to providing you with the best healthcare possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Specialties */}
      <section id="specialties" className="py-16 sm:py-24 bg-surface-subtle bg-[#f7fafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <motion.p variants={fadeUp} custom={0} className="text-sm font-semibold text-primary tracking-widest uppercase mb-3">
              Specialties
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl font-bold font-display text-foreground">
              Expert Care Across Disciplines
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4"
          >
            {specialties.map((spec, i) => (
              <motion.button
                key={spec.name}
                variants={fadeUp}
                custom={i}
                onClick={() => setActiveSpecialty(activeSpecialty === spec.name ? "All" : spec.name)}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative p-6 rounded-2xl bg-card shadow-elegant hover:shadow-elegant-lg transition-all duration-300 text-center cursor-pointer ${activeSpecialty === spec.name ? "ring-2 ring-primary shadow-elegant-lg" : ""
                  }`}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${spec.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <spec.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="font-semibold text-sm text-foreground">{spec.name}</p>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Doctor Directory */}
      <section id="find-a-doctor" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4"
          >
            <div>
              <motion.p variants={fadeUp} custom={0} className="text-sm font-semibold text-primary tracking-widest uppercase mb-3">
                Our Doctors
              </motion.p>
              <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl font-bold font-display text-foreground">
                Meet Our Specialists
              </motion.h2>
            </div>
            <motion.div variants={fadeUp} custom={2} className="flex items-center gap-2 flex-wrap">
              {["All", ...specialties.map((s) => s.name)].map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveSpecialty(s)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${activeSpecialty === s
                    ? "bg-primary text-primary-foreground shadow-elegant"
                    : "bg-secondary text-secondary-foreground hover:bg-accent"
                    }`}
                >
                  {s}
                </button>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            key={activeSpecialty}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {filteredDoctors.map((doc) => (
              <motion.div
                key={doc.id}
                whileHover={{ y: -6 }}
                className="group"
              >
                <Link to={`/doctor/${doc.id}`}>
                  <div className="bg-card rounded-2xl p-5  shadow-[0_10px_30px_rgba(15,23,42,0.06)] hover:shadow-[0_16px_32px_rgba(15,23,42,0.1)] transition-all duration-300 cursor-pointer">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center shrink-0">
                        <span className="text-lg font-bold text-primary">{doc.initials}</span>
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-foreground text-sm truncate group-hover:text-primary transition-colors">{doc.name}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{doc.specialty}</p>
                        <p className="text-xs text-muted-foreground">{doc.experience} exp.</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <Icon icon="solar:square-academic-cap-linear" className="w-4 h-4 text-primary" />
                      <span className="text-xs text-muted-foreground">
                        {doc.qualification}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${doc.available ? "bg-emerald-500" : "bg-amber-500"}`} />
                        <span className="text-xs text-muted-foreground">{doc.nextSlot}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
            {filteredDoctors.length === 0 && (
              <div className="sm:col-span-2 lg:col-span-4 rounded-2xl border border-dashed border-border bg-card/40 py-10 text-center text-muted-foreground">
                No doctors found for this specialty.
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Why Our Doctors */}
      <section className="py-20 bg-[#f8fafa]">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-4">
          <motion.div
            {...fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl mb-4" style={{ fontWeight: 700 }}>
              Why Choose Our Doctors
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our medical professionals are committed to excellence in patient care
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: 'Board Certified',
                description: 'All our doctors are board-certified in their specialties'
              },
              {
                title: 'Experienced',
                description: 'Average of 15+ years of medical experience'
              },
              {
                title: 'Compassionate',
                description: 'Patient-centered approach with empathy and care'
              },
              {
                title: 'Innovative',
                description: 'Using latest medical techniques and technologies'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-3 h-3 bg-primary rounded-full" />
                  </div>
                  <h3 className="mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-gradient-to-br from-primary to-[#047070] text-white p-12">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl mb-4 text-white" style={{ fontWeight: 700 }}>
                  Schedule Your Appointment Today
                </h2>
                <p className="text-white/90 text-lg mb-8">
                  Connect with our expert doctors and start your journey to better health
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link to="/appointments">
                    <Button size="lg" className="bg-white text-[#058080] rounded-full px-6 font-medium shadow-[0_2px_8px_-2px_hsl(180_94%_26%/0.4)] transition-all duration-200 hover:bg-[#e6f2f2] hover:shadow-[0_4px_16px_-2px_hsl(180_94%_26%/0.5)]">
                      Book Appointment
                    </Button>
                  </Link>

                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
