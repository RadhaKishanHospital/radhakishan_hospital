"use client"
import { motion } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router';
import { Icon } from '@iconify/react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import ReviewModal, { ReviewDraft } from '../components/ReviewModal';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const HERO_VIDEO =
  "https://res.cloudinary.com/m89jw24l/video/upload/v1787195293/large.mp4";

// Inlined design values (previously lived in src/styles.css).
const OVERLAY_COLOR = "rgba(0, 0, 0, 0.35)";
const BOTTOM_FADE =
  "linear-gradient(to top, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0) 38%)";
const HERO_SHADOW = "0 20px 50px -24px rgba(0, 0, 0, 0.35)";


export function Home() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative isolate flex min-h-screen w-full flex-col overflow-hidden bg-slate-950">
        {/* Video background */}
        <div className="absolute inset-0 -z-20 h-full w-full">
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
        </div>

        {/* Flat dark overlay + bottom fade */}
        <div
          className="absolute inset-0 -z-10"
          style={{ backgroundColor: OVERLAY_COLOR }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 -z-10"
          style={{ backgroundImage: BOTTOM_FADE }}
          aria-hidden="true"
        />
        {/* Hero content */}
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-16 sm:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm">
              Welcome to Radha Kishan Hospital
            </div>

            <h1
              className="mt-7 text-[2.75rem] font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.75rem]"

            >
              Exceptional care,
              <span className="block text-white/90">trusted for life.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              From preventive wellness to complex surgery, our specialists deliver
              compassionate, evidence-based medicine — powered by advanced technology,
              available 24 hours a day.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-5">
              <a
                href="/appointments"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 transition-transform hover:bg-white/90"
                style={{ boxShadow: HERO_SHADOW }}
              >
                Book an appointment
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a
                href="/services"
                className="group inline-flex items-center gap-2.5 text-sm font-semibold text-white"
              >
                <span className="gap-2 px-7 py-3.5 text-sm font-semibold flex items-center justify-center rounded-full border border-white/30 transition-colors group-hover:border-white/60">
                  Our Services
                </span>

              </a>
            </div>

            {/* Trust row */}
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/15 pt-7">
              {[
                { k: "40+", v: "Specialties" },
                { k: "120K", v: "Patients / year" },
                { k: "98%", v: "Satisfaction" },
              ].map((s) => (
                <div key={s.v} className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">
                    {s.k}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wider text-white/55">
                    {s.v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



      <section className='flex flex-col gap-6 md:gap-8 py-14 md:py-20 bg-white px-4'>
        <div className='flex justify-center text-sm md:text-base'>Services</div>
        <div><p className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center text-[#047575] max-w-[800px] mx-auto leading-tight'>Expert care for your health,
          <br aria-hidden="true" />
          so you can focus on what matters most.</p></div>
        <div><p className='text-center text-sm sm:text-base'>Providing modern healthcare solutions for patients and families since 1987.</p></div>
        <div className='flex justify-center'>
          <Button size="lg" className="w-fit rounded-full bg-primary hover:bg-primary/90">Schedule a call</Button>
        </div>
      </section>

      <section className='flex flex-col gap-5 lg:gap-8 pb-16 md:pb-24 bg-white px-4'>
        <div className='flex justify-start'>
          <div className='bg-[#d8eded] w-full max-w-[1040px] p-6 sm:p-8 md:p-12 lg:p-16 xl:pr-20 flex flex-col lg:flex-row gap-8 lg:gap-[70px] rounded-3xl'>
            <div className='w-full lg:w-1/2'>
              <img src="doctors.svg" alt="Qualified doctors" className='w-full h-auto max-h-[280px] sm:max-h-[340px] md:max-h-[380px] object-contain' />
            </div>
            <div className='w-full lg:w-1/2'>
              <div className='flex flex-col gap-16'>
                <div className='flex flex-col gap-6 md:gap-8'>
                  <div className='text-2xl sm:text-3xl md:text-4xl'>Experienced & Qualified Medical Professionals</div>
                  <div><p className='leading-tight'>Highly experienced and qualified doctors providing safe, personalized, and compassionate healthcare for patients and families.</p></div>
                </div>
                <div className='flex flex-wrap gap-2 text-[12px]'>
                  <div className='bg-white w-fit p-3 rounded-sm'>Expertise</div>
                  <div className='bg-white w-fit p-3 rounded-sm'>Experience</div>
                  <div className='bg-white w-fit p-3 rounded-sm'>Compassion</div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className='flex justify-end'>
          <div className='bg-[#d8eded] w-full max-w-[1040px] p-6 sm:p-8 md:p-12 lg:p-16 xl:pr-20 flex flex-col-reverse lg:flex-row gap-8 lg:gap-[70px] rounded-3xl'>

            <div className='w-full lg:w-1/2'>
              <div className='flex flex-col gap-16'>
                <div className='flex flex-col gap-6 md:gap-8'>
                  <div className='text-2xl sm:text-3xl md:text-4xl'>State-of-the-art medical equipment and facilities</div>
                  <div><p className='leading-tight'>Our hospital uses state-of-the-art medical equipment and modern facilities to ensure accurate diagnosis and advanced treatment.</p></div>
                </div>
                <div className='flex flex-wrap gap-2 text-[12px]'>
                  <div className='bg-white w-fit p-3 rounded-sm'>Technology</div>
                  <div className='bg-white w-fit p-3 rounded-sm'>Precision</div>
                  <div className='bg-white w-fit p-3 rounded-sm'>Innovation</div>
                </div>
              </div>
            </div>
            <div className='w-full lg:w-1/2'>
              <img src="tech.svg" alt="Modern medical technology" className='w-full h-auto max-h-[280px] sm:max-h-[340px] md:max-h-[380px] object-contain' />
            </div>
          </div>
        </div>


        <div className='flex justify-start'>
          <div className='bg-[#d8eded] w-full max-w-[1040px] p-6 sm:p-8 md:p-12 lg:p-16 xl:pr-20 flex flex-col lg:flex-row gap-8 lg:gap-[70px] rounded-3xl'>
            <div className='w-full lg:w-1/2'>
              <img src="emergency.svg" alt="Emergency services" className='w-full h-auto max-h-[280px] sm:max-h-[340px] md:max-h-[380px] object-contain' />
            </div>
            <div className='w-full lg:w-1/2'>
              <div className='flex flex-col gap-16'>
                <div className='flex flex-col gap-6 md:gap-8'>
                  <div className='text-2xl sm:text-3xl md:text-4xl'>24/7 emergency services availability</div>
                  <div><p className='leading-tight'>Our hospital provides 24/7 emergency services with rapid response, expert doctors, and immediate critical care support.</p></div>
                </div>
                <div className='flex flex-wrap gap-2 text-[12px]'>
                  <div className='bg-white w-fit p-3 rounded-sm'>Emergency</div>
                  <div className='bg-white w-fit p-3 rounded-sm'>Response</div>
                  <div className='bg-white w-fit p-3 rounded-sm'>Availability</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-primary to-[#047070]">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl text-white mb-6" style={{ fontWeight: 700 }}>
                Why Choose Radha Kishan Hospital?
              </h2>
              <p className="text-white/90 mb-8">
                We are committed to providing the highest quality healthcare services with a patient-centered approach.
              </p>

              <div className="space-y-4">
                {[
                  'Experienced and qualified medical professionals',
                  'State-of-the-art medical equipment and facilities',
                  'Comprehensive healthcare services under one roof',
                  'Patient-centered care and personalized treatment',
                  'Affordable and transparent pricing',
                  '24/7 emergency services availability'
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 text-white"
                  >
                    <Icon
                      icon="solar:check-circle-bold"
                      className="w-6 h-6 flex-shrink-0 mt-0.5"
                    />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-6"
            >
              <Card className="bg-white p-6 h-full text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon icon="solar:chat-square-like-linear" className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl text-primary mb-2" style={{ fontWeight: 700 }}>98%</div>
                <div className="text-sm text-muted-foreground">Patient Satisfaction</div>
              </Card>

              <Card className="bg-white p-6 h-full text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon icon="solar:user-outline" className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl text-primary mb-2" style={{ fontWeight: 700 }}>50+</div>
                <div className="text-sm text-muted-foreground">Expert Doctors</div>
              </Card>

              <Card className="bg-white p-6 h-full text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon icon="solar:heart-linear" className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl text-primary mb-2" style={{ fontWeight: 700 }}>100K+</div>
                <div className="text-sm text-muted-foreground">Patients Treated</div>
              </Card>

              <Card className="bg-white p-6 h-full text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon icon="solar:clock-circle-linear" className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl text-primary mb-2" style={{ fontWeight: 700 }}>24/7</div>
                <div className="text-sm text-muted-foreground">Emergency Care</div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl mb-4" style={{ fontWeight: 700 }}>
              What Our Patients Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real stories from real patients
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Patient',
                content: 'The care I received at CarePulse was exceptional. The staff was professional, compassionate, and attentive to all my needs.',
                rating: 5
              },
              {
                name: 'Michael Chen',
                role: 'Patient',
                content: 'From the moment I walked in, I felt welcomed and cared for. The medical team is outstanding and truly dedicated to patient wellness.',
                rating: 5
              },
              {
                name: 'Emily Davis',
                role: 'Patient',
                content: 'CarePulse has been my trusted healthcare provider for years. Their commitment to excellence and patient care is unmatched.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full p-6 hover:shadow-lg transition-shadow">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Icon
                        key={i}
                        icon="solar:star-bold"
                        className="w-5 h-5 text-primary"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6">{testimonial.content}</p>
                  <div>
                    <div style={{ fontWeight: 600 }}>{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Button
              type='button'
              onClick={() => setOpen(true)}
              size="lg"
              className="w-fit rounded-full bg-primary cursor-pointer hover:bg-primary/90"
            >
              Add Your Review
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#f0fafa]">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl mb-6" style={{ fontWeight: 700 }}>
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Book an appointment today and experience world-class healthcare
            </p>
            <Link to="/appointments">
              <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-6 font-medium shadow-[0_2px_8px_-2px_hsl(180_94%_26%/0.4)] transition-all duration-200">
                Book Your Appointment
                <Icon
                  icon="solar:arrow-right-linear"
                  className="ml-2 w-5 h-5"
                />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      <ReviewModal open={open} onClose={() => setOpen(false)} onSubmit={()=> setOpen(false)} />
    </div>
  );
}
