import { Link, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Icon } from "@iconify/react";
import { Button } from "../components/ui/button";
import { SEO } from "../components/SEO";

const DEFAULT_DOCTOR_IMAGE =
  "https://res.cloudinary.com/hizkabhg/image/upload/v1789883056/close-up-doctor-with-stethoscope.jpg";

const doctors: Record<
  number,
  {
    id: number;
    name: string;
    specialty: string;
    qualification: string;
    experience?: string;
    initials: string;
    bio: string;
    education: string[];
    registrationAuthority: string;
    registrationNo: string;
    available: boolean;
    image?: string;
  }
> = {

  1: {
    id: 1,
    name: "Dr. Lokender Goyal",
    specialty: "pediatricsNeonatal",
    qualification: "MBBS, MD (Pediatrics)",
    initials: "LG",
    bio: "pediatricsNeonatal",
    education: [
      "Himachal Pradesh University",
      "Panjab University",
    ],
    registrationAuthority: "Haryana Medical Council",
    registrationNo: "HN-21452",
    available: true,
    image: "https://res.cloudinary.com/hizkabhg/image/upload/v1789882019/IMG_9137.JPG.jpg",
  },

  2: {
    id: 2,
    name: "Dr. Monika Dixit",
    specialty: "pathology",
    qualification: "MBBS, MD (Pathology)",
    initials: "MD",
    bio: "pathology",
    education: [
      "Institute of Medical Sciences, BHU, Varanasi",
    ],
    registrationAuthority: "Haryana Medical Council",
    registrationNo: "HN-013272",
    available: true,
    image: "https://res.cloudinary.com/hizkabhg/image/upload/v1789882574/IMG_9134.JPG.jpg",
  },
  3: {
    id: 3,
    name: "Dr. Akanksha Tyagi",
    specialty: "generalMedicine",
    qualification: "MBBS, MD (General Medicine)",
    initials: "AT",
    bio: "generalMedicine",
    education: [
      "Rajasthan University of Health Sciences",
    ],
    registrationAuthority: "Haryana Medical Council",
    registrationNo: "HN-23419",
    available: true,
    image: "https://res.cloudinary.com/hizkabhg/image/upload/v1789882575/IMG_9136.JPG.jpg",
  },

  4: {
    id: 4,
    name: "Dr. Shashank Singhal",
    specialty: "surgery",
    qualification: "MBBS, MS (General Surgery)",
    initials: "SS",
    bio: "surgery",
    education: [
      "Pt. B.D. Sharma University of Health Sciences, Rohtak",
      "NIMS University, Jaipur",
    ],
    registrationAuthority: "Haryana Medical Council",
    registrationNo: "HN-10817",
    available: true,
    image: "https://res.cloudinary.com/hizkabhg/image/upload/v1789882575/IMG_9135.JPG.jpg",
  },
};

const DoctorProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const doctor = doctors[Number(id)];

   const [doctorImage, setDoctorImage] = useState(
    doctor?.image || DEFAULT_DOCTOR_IMAGE
  );

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <SEO
          title="Doctor Not Found"
          description="The requested doctor profile was not found at Radhakishan Hospital."
          noIndex
        />
        <div className="text-center">
          <h1 className="text-2xl font-bold font-display text-foreground mb-4">{t("doctors.profile.notFound")}</h1>
          <Link to="/">
            <Button variant="outline" className="rounded-full">
              <ArrowLeft className="w-4 h-4 mr-2" /> {t("doctors.profile.backHome")}
            </Button>
          </Link>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${doctor.name} — ${doctor.qualification}`}
        description={`${doctor.name}, ${doctor.qualification} at Radhakishan Hospital, Kurukshetra. Registered with ${doctor.registrationAuthority} (Reg. No. ${doctor.registrationNo}). Book an appointment today.`}
        path={`/doctor/${doctor.id}`}
        ogImage={doctor.image || "/logo.png"}
        ogType="profile"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Physician',
          name: doctor.name,
          jobTitle: doctor.qualification,
          medicalSpecialty: doctor.specialty,
          worksFor: {
            '@type': 'Hospital',
            name: 'Radhakishan Hospital',
            url: 'https://radhakishanhospital.in',
          },
          url: `https://radhakishanhospital.in/doctor/${doctor.id}`,
          image: doctor.image || 'https://radhakishanhospital.in/logo.png',
        }}
      />
      {/* Header */}
      <header className="top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 min-w-0 max-w-[calc(100%-3.5rem)] sm:max-w-none">
              <motion.div
                className="flex items-center gap-2"
              >
                <div className="w-10 h-10 shrink-0 flex items-center justify-center">
                  <img
                    src="/logo.png"
                    alt="Radhakishan Hospital"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-base sm:text-xl tracking-tight leading-tight" style={{ fontWeight: 600 }}>
                    Radhakishan Hospital
                  </div>
                  <div className="text-xs text-muted-foreground">Medical Center</div>
                </div>
              </motion.div>
            </Link>
            <Link to="/doctors">
              <Button variant="ghost" className="rounded-full text-sm">
                <ArrowLeft className="w-4 h-4 mr-2" /> {t("doctors.profile.back")}
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
            className="lg:col-span-2 order-2 lg:order-1"
          >
            <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/25 flex items-center justify-center shrink-0">
                <span className="text-3xl font-bold text-primary">{doctor.initials}</span>
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold font-display text-foreground mb-2">{doctor.name}</h1>
                <p className="text-lg text-primary font-medium mb-3">
                  {t(`doctors.specialties.${doctor.specialty}`)}
                </p>
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
                <h2 className="text-xl font-bold font-display text-foreground mb-3">
                  {t("doctors.profile.about")}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t(`doctors.bio.${doctor.bio}`)}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold font-display text-foreground mb-3">
                  {t("doctors.profile.qualification")}
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
                  {t("doctors.profile.registration")}
                </h2>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Icon icon="solar:diploma-verified-linear" className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {t("doctors.profile.registrationAuthority")}
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
                        {t("doctors.profile.registrationNo")}
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

          {/* Right: Doctor Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="relative lg:sticky lg:top-28">
              <div className="relative overflow-hidden rounded-3xl aspect-[4/5] border-1 bg-gradient-to-br from-primary/10 to-primary/25">
                <img
                  src={doctorImage}
                  alt={doctor.name}
                  loading="eager"
                  onError={() => {
                    if (doctorImage !== DEFAULT_DOCTOR_IMAGE) {
                      setDoctorImage(DEFAULT_DOCTOR_IMAGE);
                    }
                  }}
                  className="h-full w-full object-cover"
                />
                {doctor.available && (
                  <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm">
                    {t("doctors.profile.available")}
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-5">
                  <p className="text-lg font-bold font-display text-white leading-tight">{doctor.name}</p>
                  <p className="text-sm text-white/85">
                    {t(`doctors.specialties.${doctor.specialty}`)}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
