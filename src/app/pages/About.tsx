import { motion } from 'motion/react';
import { Icon } from "@iconify/react";
import { Card, CardContent } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { LogoCarousel, LogoItem } from '../components/ui/logo-carousel';
import { ArrowRight, Play } from "lucide-react";
import { useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/SEO';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export function About() {



  const { t } = useTranslation();
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const cards = scene.querySelectorAll('.floating-card');

    const animateCards = () => {
      cards.forEach((card, index) => {
        const element = card as HTMLElement;
        const time = Date.now() * 0.001;
        const offset = index * 0.5;

        const x = Math.sin(time + offset) * 30;
        const y = Math.cos(time + offset * 1.2) * 20;
        const rotateX = Math.sin(time + offset) * 10;
        const rotateY = Math.cos(time + offset * 0.8) * 15;

        element.style.transform = `
          translate3d(${x}px, ${y}px, 0) 
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg)
        `;
      });

      requestAnimationFrame(animateCards);
    };

    animateCards();
  }, []);

  return (
    <>
      <SEO
        title="About Us — Our Story, Mission & Values"
        description="Learn about Radhakishan Hospital, Kurukshetra — serving patients since 1987 with compassionate, evidence-based healthcare. Discover our mission, vision, core values, and commitment to the community."
        path="/about"
        ogImage="/logo.png"
      />

      <style>
        {`
@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.animate-scroll {
  animation: scroll linear infinite;
  will-change: transform;
  transform: translate3d(0,0,0);
}

.animate-scroll:hover {
  animation-play-state: paused;
}
`}
      </style>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#f0fafa] to-white pt-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl mb-6" style={{ fontWeight: 700 }}>
                {t("about.hero.title")}{" "}
                <span className="text-primary">
                  {t("about.hero.hospitalName")}
                </span>
              </h1>

              <p className="text-lg text-muted-foreground">
                {t("about.hero.description")}
              </p>
            </motion.div>
          </div>

          <section className="relative overflow-hidden">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-4 text-center">


              {/* 3D Graphics Scene */}
              <div className="relative mx-auto max-w-5xl h-96 lg:h-[500px]">
                <div
                  ref={sceneRef}
                  className="relative w-full h-full perspective-1000"
                  style={{ perspective: '1000px' }}
                >
                  {/* Central Hub */}
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-primary to-primary/70 rounded-3xl shadow-2xl flex items-center justify-center z-10">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center p-2">
                      <img
                        src="/logo.png"
                        alt="Radhakishan Hospital"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  {/* Floating Design System Components */}

                  {/* Button Component Card */}
                  <div className="floating-card absolute top-16 left-20 w-40 h-24 bg-card border rounded-2xl shadow-lg p-4 transform-gpu">
                    <div className="text-xs text-muted-foreground mb-2">Emergency Care</div>
                    <div className="space-y-2">
                      <div className="h-3 bg-primary rounded w-16"></div>
                      <div className="h-3 bg-muted rounded w-20"></div>
                    </div>
                  </div>

                  {/* Color Tokens Card */}
                  <div className="floating-card absolute top-32 right-16 w-36 h-28 bg-card border rounded-2xl shadow-lg p-4 transform-gpu">
                    <div className="text-xs text-muted-foreground mb-2">Medical Departments</div>
                    <div className="grid grid-cols-4 gap-1">
                      <div className="w-4 h-4 bg-primary rounded"></div>
                      <div className="w-4 h-4 bg-secondary rounded"></div>
                      <div className="w-4 h-4 bg-accent rounded"></div>
                      <div className="w-4 h-4 bg-muted rounded"></div>
                      <div className="w-4 h-4 bg-destructive rounded"></div>
                      <div className="w-4 h-4 bg-chart-1 rounded"></div>
                      <div className="w-4 h-4 bg-chart-2 rounded"></div>
                      <div className="w-4 h-4 bg-chart-3 rounded"></div>
                    </div>
                  </div>

                  {/* Typography Card */}
                  <div className="floating-card absolute bottom-20 left-12 w-44 h-32 bg-card border rounded-2xl shadow-lg p-4 transform-gpu">
                    <div className="text-xs text-muted-foreground mb-2">Expert Doctors</div>
                    <div className="space-y-2">
                      <div className="h-4 bg-foreground/90 rounded w-32"></div>
                      <div className="h-3 bg-foreground/70 rounded w-28"></div>
                      <div className="h-2 bg-foreground/50 rounded w-24"></div>
                    </div>
                  </div>

                  {/* Component Library Card */}
                  <div className="floating-card absolute bottom-24 right-20 w-38 h-36 bg-card border rounded-2xl shadow-lg p-4 transform-gpu">
                    <div className="text-xs text-muted-foreground mb-2">Treatments</div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-primary rounded"></div>
                        <div className="h-2 bg-muted rounded flex-1"></div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-secondary rounded"></div>
                        <div className="h-2 bg-muted rounded flex-1"></div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-accent rounded"></div>
                        <div className="h-2 bg-muted rounded flex-1"></div>
                      </div>
                    </div>
                  </div>

                  {/* Spacing Tokens */}
                  <div className="floating-card absolute top-20 right-32 w-32 h-20 bg-card border rounded-2xl shadow-lg p-4 transform-gpu">
                    <div className="text-xs text-muted-foreground mb-2">Patient Services</div>
                    <div className="space-y-1">
                      <div className="h-1 bg-primary rounded w-4"></div>
                      <div className="h-1 bg-primary rounded w-8"></div>
                      <div className="h-1 bg-primary rounded w-12"></div>
                      <div className="h-1 bg-primary rounded w-16"></div>
                    </div>
                  </div>

                  {/* Icon Library */}
                  <div className="floating-card absolute bottom-32 left-32 w-36 h-24 bg-card border rounded-2xl shadow-lg p-4 transform-gpu">
                    <div className="text-xs text-muted-foreground mb-2">Medical Facilities</div>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="w-4 h-4 bg-foreground/20 rounded"></div>
                      <div className="w-4 h-4 bg-foreground/30 rounded"></div>
                      <div className="w-4 h-4 bg-foreground/40 rounded"></div>
                      <div className="w-4 h-4 bg-foreground/50 rounded"></div>
                    </div>
                  </div>

                  {/* Documentation Card */}
                  <div className="floating-card absolute top-40 left-40 w-40 h-28 bg-card border rounded-2xl shadow-lg p-4 transform-gpu">
                    <div className="text-xs text-muted-foreground mb-2">Medical Records</div>
                    <div className="space-y-1">
                      <div className="h-2 bg-muted rounded w-full"></div>
                      <div className="h-2 bg-muted rounded w-3/4"></div>
                      <div className="h-2 bg-muted rounded w-5/6"></div>
                      <div className="h-2 bg-muted rounded w-2/3"></div>
                    </div>
                  </div>

                  {/* Version Control */}
                  <div className="floating-card absolute top-12 right-48 w-34 h-26 bg-card border rounded-2xl shadow-lg p-4 transform-gpu">
                    <div className="text-xs text-muted-foreground mb-2">Reports</div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="text-xs">Latest Report</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <div className="text-xs">Blood Test</div>
                      </div>
                    </div>
                  </div>

                  {/* Connecting Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                    <defs>
                      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
                        <stop offset="50%" stopColor="currentColor" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
                      </linearGradient>
                    </defs>
                    <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="url(#lineGradient)" strokeWidth="2" className="animate-pulse" />
                    <line x1="50%" y1="50%" x2="80%" y2="30%" stroke="url(#lineGradient)" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                    <line x1="50%" y1="50%" x2="25%" y2="75%" stroke="url(#lineGradient)" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '1s' }} />
                    <line x1="50%" y1="50%" x2="75%" y2="80%" stroke="url(#lineGradient)" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
                  </svg>

                  {/* Background Particles */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-primary/20 rounded-full animate-pulse"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 3}s`,
                          animationDuration: `${2 + Math.random() * 3}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>


        </section>


        {/* Our Story */}
        <section className="py-20 bg-white">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2
                  className="text-3xl md:text-4xl mb-6"
                  style={{ fontWeight: 700 }}
                >
                  {t("about.journey.title")}
                </h2>

                <div className="space-y-4 text-muted-foreground">
                  <p>
                    {t("about.journey.paragraph1")}
                  </p>

                  <p>
                    {t("about.journey.paragraph2")}
                  </p>

                  <p>
                    {t("about.journey.paragraph3")}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <ImageWithFallback
                    src="https://res.cloudinary.com/hizkabhg/image/upload/v1789885274/IMG_9142.JPG.jpg"
                    alt="Radhakishan Hospital medical team"
                    className="w-full h-[415px] object-cover"
                  />
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section
          className="relative py-20 bg-[#f8fafa] overflow-hidden"
          style={{
            backgroundImage: `
      linear-gradient(
        rgba(248, 250, 250, 0.72),
        rgba(248, 250, 250, 0.72)
      ),
      url("https://img.magnific.com/free-photo/group-medics-masks-reading-paper_23-2147763838.jpg?t=st=1790063029~exp=1790066629~hmac=b425cc407605ba345d489daa2dd57cf753081c6e48a6d8ef0f54da6eeefe591d&w=1480")
    `,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="h-full p-8 border border-slate-100 hover:shadow-lg transition-shadow">

                  {/* Icon */}
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <Icon
                      icon="solar:target-linear"
                      className="w-8 h-8 text-primary"
                    />
                  </div>

                  <h3
                    className="text-2xl mb-4"
                    style={{ fontWeight: 700 }}
                  >
                    {t("about.mission.title")}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">
                    {t("about.mission.description")}
                  </p>

                  {/* Mission pillars */}
                  <div className="mt-7 grid grid-cols-2 gap-3">

                    <div className="rounded-xl bg-[#f8fafa] border border-slate-100 p-3.5">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Icon
                          icon="solar:heart-pulse-linear"
                          className="w-4 h-4 text-primary"
                        />
                        <span className="text-sm font-semibold text-slate-800">
                          {t("about.mission.pillars.care.title")}
                        </span>
                      </div>

                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {t("about.mission.pillars.care.description")}
                      </p>
                    </div>

                    <div className="rounded-xl bg-[#f8fafa] border border-slate-100 p-3.5">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Icon
                          icon="solar:test-tube-linear"
                          className="w-4 h-4 text-primary"
                        />
                        <span className="text-sm font-semibold text-slate-800">
                          {t("about.mission.pillars.science.title")}
                        </span>
                      </div>

                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {t("about.mission.pillars.science.description")}
                      </p>
                    </div>

                    <div className="rounded-xl bg-[#f8fafa] border border-slate-100 p-3.5">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Icon
                          icon="solar:book-2-linear"
                          className="w-4 h-4 text-primary"
                        />
                        <span className="text-sm font-semibold text-slate-800">
                          {t("about.mission.pillars.teach.title")}
                        </span>
                      </div>

                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {t("about.mission.pillars.teach.description")}
                      </p>
                    </div>

                    <div className="rounded-xl bg-[#f8fafa] border border-slate-100 p-3.5">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Icon
                          icon="solar:users-group-rounded-linear"
                          className="w-4 h-4 text-primary"
                        />
                        <span className="text-sm font-semibold text-slate-800">
                          {t("about.mission.pillars.community.title")}
                        </span>
                      </div>

                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {t("about.mission.pillars.community.description")}
                      </p>
                    </div>

                  </div>
                </Card>
              </motion.div>


              {/* Vision + Goal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Card className="h-full p-8 border border-slate-100 hover:shadow-lg transition-shadow flex flex-col">

                  {/* Vision - Top Half */}
                  <div className="flex-1 flex flex-col">

                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                      <Icon
                        icon="solar:eye-linear"
                        className="w-8 h-8 text-primary"
                      />
                    </div>

                    <h3
                      className="text-2xl mb-4"
                      style={{ fontWeight: 700 }}
                    >
                      {t("about.vision.title")}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">
                      {t("about.vision.description")}                   </p>

                  </div>


                  {/* Divider */}
                  <div className="border-t border-slate-100 my-7" />


                  {/* Goal - Bottom Half */}
                  <div className="flex-1 flex flex-col">

                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                      <Icon
                        icon="solar:medal-star-linear"
                        className="w-8 h-8 text-primary"
                      />
                    </div>

                    <h3
                      className="text-2xl mb-4"
                      style={{ fontWeight: 700 }}
                    >
                      {t("about.goal.title")}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">
                      {t("about.goal.description")}
                    </p>

                  </div>

                </Card>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-white">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-4">

            <motion.div
              {...fadeInUp}
              className="text-center mb-12"
            >
              <p className="text-primary font-medium mb-2">
                {t("about.values.subtitle")}
              </p>

              <h2
                className="text-3xl md:text-4xl mb-4"
                style={{ fontWeight: 700 }}
              >
                {t("about.values.title")}
              </h2>

              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t("about.values.description")}
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {[
                {
                  icon: "solar:dialog-2-linear",
                  title: t("about.values.communication.title"),
                  description: t("about.values.communication.description")
                },
                {
                  icon: "solar:clipboard-check-linear",
                  title: t("about.values.accountability.title"),
                  description: t("about.values.accountability.description")
                },
                {
                  icon: "solar:medal-star-linear",
                  title: t("about.values.excellence.title"),
                  description: t("about.values.excellence.description")
                },
                {
                  icon: "solar:hand-shake-linear",
                  title: t("about.values.respect.title"),
                  description: t("about.values.respect.description")
                },
                {
                  icon: "solar:users-group-rounded-linear",
                  title: t("about.values.teamwork.title"),
                  description: t("about.values.teamwork.description")
                }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Card className="h-full text-center p-6 hover:shadow-lg transition-shadow">

                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                      <Icon
                        icon={value.icon}
                        className="w-7 h-7 text-primary"
                      />
                    </div>

                    <h3
                      className="mb-3"
                      style={{ fontWeight: 700 }}
                    >
                      {value.title}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>

                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-[#047070]">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                {
                  number: '100%',
                  label: t("about.stats.patientCare")
                },
                {
                  number: '24/7',
                  label: t("about.stats.emergency")
                },
                {
                  number: '100K+',
                  label: t("about.stats.happyPatients")
                },
                {
                  number: '98%',
                  label: t("about.stats.successRate")
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center text-white"
                >
                  <div className="text-4xl md:text-5xl mb-2" style={{ fontWeight: 700 }}>
                    {stat.number}
                  </div>
                  <div className="text-white/90">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Accreditations */}
        <section className="py-20 bg-white">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-4">
            <motion.div
              {...fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl mb-4" style={{ fontWeight: 700 }}>
                {t("about.highlights.title")}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t("about.highlights.description")}
              </p>
            </motion.div>

            <div className="size-full flex items-center justify-center bg-gray-50">
              <LogoCarousel speed={60}>
                <LogoItem>
                  <div className="text-2xl font-bold text-gray-800">
                    {t("about.highlights.patientCare")}
                  </div>
                </LogoItem>

                <LogoItem>
                  <div className="text-2xl font-bold text-gray-800">
                    {t("about.highlights.qualityServices")}
                  </div>
                </LogoItem>

                <LogoItem>
                  <div className="text-2xl font-bold text-gray-800">
                    {t("about.highlights.medicalTeam")}
                  </div>
                </LogoItem>

                <LogoItem>
                  <div className="text-2xl font-bold text-gray-800">
                    {t("about.highlights.facilities")}
                  </div>
                </LogoItem>

                <LogoItem>
                  <div className="text-2xl font-bold text-gray-800">
                    {t("about.highlights.emergency")}
                  </div>
                </LogoItem>

                <LogoItem>
                  <div className="text-2xl font-bold text-gray-800">
                    {t("about.highlights.safety")}
                  </div>
                </LogoItem>
              </LogoCarousel>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
