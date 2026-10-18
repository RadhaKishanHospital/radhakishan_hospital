import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Link, useNavigate } from 'react-router';
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
import { SEO } from '../components/SEO';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export function Doctors() {
  const [activeSpecialty, setActiveSpecialty] = useState("all");
  const { t } = useTranslation();
  const navigate = useNavigate();


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
      name: "generalMedicine",
      label: t("doctors.specialties.generalMedicine"),
      icon: Stethoscope,
      color: "from-blue-50 to-cyan-50",
    },
    {
      name: "surgery",
      label: t("doctors.specialties.surgery"),
      icon: Scissors,
      color: "from-red-50 to-rose-50",
    },
    {
      name: "pathology",
      label: t("doctors.specialties.pathology"),
      icon: Microscope,
      color: "from-purple-50 to-violet-50",
    },
    {
      name: "pediatricsNeonatal",
      label: t("doctors.specialties.pediatricsNeonatal"),
      icon: Baby,
      color: "from-green-50 to-emerald-50",
    },
  ];

  const doctors = [
    {
      id: 1,
      name: "Dr. Lokender Goyal",
      specialty: "pediatricsNeonatal",
      qualification: "MD (Pediatrics)",
      available: true,
      nextSlot: "appointmentsAvailable",
      experience: "experienced",
      initials: "LG",
      image: "https://res.cloudinary.com/hizkabhg/image/upload/v1789882019/IMG_9137.JPG.jpg",
    },
    {
      id: 2,
      name: "Dr. Monika Dixit",
      specialty: "pathology",
      qualification: "MD (Pathology)",
      available: true,
      nextSlot: "appointmentsAvailable",
      experience: "experienced",
      initials: "MD",
      image: "https://res.cloudinary.com/hizkabhg/image/upload/v1789882574/IMG_9134.JPG.jpg",
    },
    {
      id: 3,
      name: "Dr. Akanksha Tyagi",
      specialty: "generalMedicine",
      qualification: "MD (General Medicine)",
      available: true,
      nextSlot: "appointmentsAvailable",
      experience: "experienced",
      initials: "AT",
      image: "https://res.cloudinary.com/hizkabhg/image/upload/v1789882575/IMG_9136.JPG.jpg",
    },
    {
      id: 4,
      name: "Dr. Shashank Singhal",
      specialty: "surgery",
      qualification: "MD (General Surgery)",
      available: true,
      nextSlot: "appointmentsAvailable",
      experience: "experienced",
      initials: "SS",
      image: "https://res.cloudinary.com/hizkabhg/image/upload/v1789882575/IMG_9135.JPG.jpg",
    },
  ];

  const filteredDoctors = useMemo(() => {
    if (activeSpecialty === "all") {
      return doctors;
    }

    return doctors.filter((doc) => doc.specialty === activeSpecialty);
  }, [activeSpecialty]);

  return (
    <div className="min-h-screen">
      <SEO
        title="Our Doctors — Specialists in Pediatrics, Medicine, Surgery & Pathology"
        description="Meet the qualified doctors at Radhakishan Hospital, Kurukshetra. Board-certified specialists in pediatrics & neonatal care, general medicine, general surgery, and pathology."
        path="/doctors"
        ogImage="/logo.png"
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#f0fafa] to-white py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl mb-6" style={{ fontWeight: 700 }}>
              {t("doctors.hero.title")}{" "}
              <span className="text-primary">{t("doctors.hero.highlight")}</span>
            </h1>

            <p className="text-lg text-muted-foreground">
              {t("doctors.hero.description")}
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
              {t("doctors.specialties.title")}
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl font-bold font-display text-foreground">
              {t("doctors.specialties.subtitle")}
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
                onClick={() =>
                  setActiveSpecialty(
                    activeSpecialty === spec.name ? "all" : spec.name
                  )
                }
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative p-6 rounded-2xl bg-card shadow-elegant hover:shadow-elegant-lg transition-all duration-300 text-center cursor-pointer ${activeSpecialty === spec.name ? "ring-2 ring-primary shadow-elegant-lg" : ""
                  }`}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${spec.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <spec.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="font-semibold text-sm text-foreground">
                  {spec.label}
                </p>
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
                {t("doctors.directory.title")}
              </motion.p>
              <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl font-bold font-display text-foreground">
                {t("doctors.directory.subtitle")}
              </motion.h2>
            </div>
            <motion.div variants={fadeUp} custom={2} className="flex items-center gap-2 flex-wrap">
              {[
                { key: "all", label: t("doctors.filters.all") },
                ...specialties.map((s) => ({
                  key: s.name,
                  label: s.label,
                })),
              ].map((s) => (
                <button
                  key={s.key}
                  onClick={() => setActiveSpecialty(s.key)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${activeSpecialty === s.key
                    ? "bg-primary text-primary-foreground shadow-elegant"
                    : "bg-secondary text-secondary-foreground hover:bg-accent"
                    }`}
                >
                  {s.label}
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
                <Link
                  to={`/doctor/${doc.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    navigate(`/doctor/${doc.id}`, {
                      state: { scrollY: window.scrollY },
                    });
                  }}
                >
                  <div className="bg-card rounded-2xl p-5  shadow-[0_10px_30px_rgba(15,23,42,0.06)] hover:shadow-[0_16px_32px_rgba(15,23,42,0.1)] transition-all duration-300 cursor-pointer">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center shrink-0">
                        <ImageWithFallback
                          src={doc.image}
                          alt={doc.name}
                          className="w-full h-full rounded-2xl object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-foreground text-sm truncate group-hover:text-primary transition-colors">{doc.name}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {t(`doctors.specialties.${doc.specialty}`)}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {t(`doctors.experience.${doc.experience}`)}
                        </p>
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
                        <span className="text-xs text-muted-foreground">
                          {t(`doctors.availability.${doc.nextSlot}`)}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
            {filteredDoctors.length === 0 && (
              <div className="sm:col-span-2 lg:col-span-4 rounded-2xl border border-dashed border-border bg-card/40 py-10 text-center text-muted-foreground">
                {t("doctors.directory.noDoctors")}
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
              {t("doctors.whyChoose.title")}
            </h2>

            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("doctors.whyChoose.description")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: t("doctors.whyChoose.features.boardCertified.title"),
                description: t("doctors.whyChoose.features.boardCertified.description"),
              },
              {
                title: t("doctors.whyChoose.features.experienced.title"),
                description: t("doctors.whyChoose.features.experienced.description"),
              },
              {
                title: t("doctors.whyChoose.features.compassionate.title"),
                description: t("doctors.whyChoose.features.compassionate.description"),
              },
              {
                title: t("doctors.whyChoose.features.innovative.title"),
                description: t("doctors.whyChoose.features.innovative.description"),
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >

                <div className="rounded-3xl border border-primary/10 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

                  <h3 className="mb-5 text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>

                </div>
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
                  {t("doctors.cta.title")}
                </h2>
                <p className="text-white/90 text-lg mb-8">
                  {t("doctors.cta.description")}
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link to="/appointments">
                    <Button size="lg" className="bg-white text-[#058080] rounded-full px-6 font-medium shadow-[0_2px_8px_-2px_hsl(180_94%_26%/0.4)] transition-all duration-200 hover:bg-[#e6f2f2] hover:shadow-[0_4px_16px_-2px_hsl(180_94%_26%/0.5)]">
                      {t("doctors.cta.button")}
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
