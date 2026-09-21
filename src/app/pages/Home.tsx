"use client"

import { motion } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router';
import { Icon } from '@iconify/react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import ReviewModal, { ReviewDraft } from '../components/ReviewModal';
import { useReviews, useAddReview } from '../../../lib/queries';
import { toast } from 'sonner';

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
  "https://res.cloudinary.com/m89jw24l/video/upload/v1788940880/herosectionrkh.mp4";

const HOSPITAL_PHONE = "+917206029516";

// Inlined design values (previously lived in src/styles.css).
const OVERLAY_COLOR = "rgba(0, 0, 0, 0.35)";
const BOTTOM_FADE =
  "linear-gradient(to top, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0) 38%)";
const HERO_SHADOW = "0 20px 50px -24px rgba(0, 0, 0, 0.35)";


export function Home() {
  const [open, setOpen] = useState(false);
  const { data: reviews = [] } = useReviews();
  const addReviewMutation = useAddReview();
  const [isRatingsPaused, setIsRatingsPaused] = useState(false);

  const handleReviewSubmit = async (review: ReviewDraft) => {
    try {
      await addReviewMutation.mutateAsync(review);
      toast.success("Thank you for sharing your experience!");
    } catch (err) {
      console.error("Failed to submit review to MongoDB:", err);
    }
    setOpen(false);
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <style>{`
  @keyframes reviews-slide {
    from {
      transform: translate3d(0, 0, 0);
    }

    to {
      transform: translate3d(-50%, 0, 0);
    }
  }

  .reviews-track {
    display: flex;
    width: max-content;
    animation: reviews-slide 32s linear infinite;
    will-change: transform;
  }

  .reviews-group {
    display: flex;
    gap: 1.5rem;
    padding-right: 1.5rem;
    align-items: stretch;
  }

  .reviews-track:hover {
    animation-play-state: paused;
  }

  /* Soft fade at both ends */
  .reviews-viewport::before,
  .reviews-viewport::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 90px;
    z-index: 10;
    pointer-events: none;
  }

  .reviews-viewport::before {
    left: 0;
    background: linear-gradient(
      to right,
      white 0%,
      rgba(255, 255, 255, 0.85) 30%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  .reviews-viewport::after {
    right: 0;
    background: linear-gradient(
      to left,
      white 0%,
      rgba(255, 255, 255, 0.85) 30%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  @media (max-width: 640px) {
    .reviews-viewport::before,
    .reviews-viewport::after {
      width: 45px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .reviews-track {
      animation: none;
      transform: none;
    }
  }
`}</style>
      {/* Hero Section */}
      <section className="relative isolate flex min-h-[720px] w-full flex-col overflow-hidden bg-slate-950 sm:min-h-screen">
        {/* Video background */}
        {/* Hero image background */}
<div className="absolute inset-0 -z-20 h-full w-full">
  <img
    src="https://res.cloudinary.com/hizkabhg/image/upload/v1789981105/WhatsApp_Image_2026-09-06_at_16.20.47.jpg"
    alt="RadhaKishan Hospital"
    className="h-full w-full object-cover object-[65%_center] sm:object-center"
  />
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
              Welcome to RadhaKishan Hospital
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
                href={`tel:${HOSPITAL_PHONE}`}
                aria-label={`Call RadhaKishan Hospital at ${HOSPITAL_PHONE}`}
                className="group inline-flex items-center gap-2.5 text-sm font-semibold text-white"
              >
                <span className="flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 transition-colors group-hover:border-white/60 group-hover:bg-white/10">
                  <Icon
                    icon="solar:phone-calling-linear"
                    className="h-5 w-5"
                  />
                  Call Us
                </span>
              </a>
            </div>

            {/* Trust row */}
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/15 pt-7">
              {[
                { k: "1987", v: "Established" },
                { k: "24/7", v: "Emergency Care" },
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
              <img src="illustrations/doctors.svg" alt="Qualified doctors" className='w-full h-auto max-h-[280px] sm:max-h-[340px] md:max-h-[380px] object-contain' />
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
              <img src="illustrations/tech.svg" alt="Modern medical technology" className='w-full h-auto max-h-[280px] sm:max-h-[340px] md:max-h-[380px] object-contain' />
            </div>
          </div>
        </div>


        <div className='flex justify-start'>
          <div className='bg-[#d8eded] w-full max-w-[1040px] p-6 sm:p-8 md:p-12 lg:p-16 xl:pr-20 flex flex-col lg:flex-row gap-8 lg:gap-[70px] rounded-3xl'>
            <div className='w-full lg:w-1/2'>
              <img src="illustrations/emergency.svg" alt="Emergency services" className='w-full h-auto max-h-[280px] sm:max-h-[340px] md:max-h-[380px] object-contain' />
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
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl md:text-4xl text-white mb-6" style={{ fontWeight: 700 }}>
              Why Choose RadhaKishan Hospital?
            </h2>
            <p className="text-white/90">
              We are committed to providing the highest quality healthcare services with a patient-centered approach.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:gap-5">
            {[
              {
                icon: 'solar:user-check-rounded-linear',
                title: 'Experienced and qualified medical professionals'
              },
              {
                icon: 'solar:test-tube-linear',
                title: 'State-of-the-art medical equipment and facilities'
              },
              {
                icon: 'solar:hospital-linear',
                title: 'Comprehensive healthcare services under one roof'
              },
              {
                icon: 'solar:heart-pulse-linear',
                title: 'Patient-centered care and personalized treatment'
              },
              {
                icon: 'solar:tag-price-linear',
                title: 'Affordable and transparent pricing'
              },
              {
                icon: 'solar:clock-circle-linear',
                title: '24/7 emergency services availability'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm transition-colors hover:border-white/30 hover:bg-white/15"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/15 text-white transition-colors group-hover:bg-white group-hover:text-primary">
                  <Icon icon={item.icon} className="h-6 w-6" />
                </div>
                <span className="text-white leading-snug" style={{ fontWeight: 500 }}>
                  {item.title}
                </span>
              </motion.div>
            ))}
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

          <div className="reviews-viewport relative w-full overflow-hidden">
            {reviews.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No reviews yet. Be the first to share your experience!
              </div>
            ) : (
              <div className="reviews-track">

                {/* First row */}
                <div className="reviews-group flex items-stretch gap-6 shrink-0">
                  {reviews.map((testimonial, index) => (
                    <motion.div
                      key={`first-${testimonial.id || index}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="w-[340px] shrink-0"
                    >
                      <Card className="flex h-full min-h-[360px] flex-col p-6 transition-shadow hover:shadow-lg">
                        <div className="mb-5 flex gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Icon
                              key={i}
                              icon="solar:star-bold"
                              className="h-5 w-5 text-primary"
                            />
                          ))}
                        </div>

                        <p className="text-muted-foreground break-words [overflow-wrap:anywhere]">
                          {testimonial.description}
                        </p>

                        <div className="mt-auto pt-8">
                          <div style={{ fontWeight: 600 }}>
                            {testimonial.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Patient
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Duplicate row for seamless loop */}
                <div
                  className="reviews-group flex items-stretch gap-6 shrink-0"
                  aria-hidden="true"
                >
                  {reviews.map((testimonial, index) => (
                    <div
                      key={`second-${testimonial.id || index}`}
                      className="w-[320px] shrink-0"
                    >
                      <Card className="flex h-full min-h-[360px] flex-col p-6 transition-shadow hover:shadow-lg">
  <div className="mb-5 flex gap-1">
    {[...Array(testimonial.rating)].map((_, i) => (
      <Icon
        key={i}
        icon="solar:star-bold"
        className="h-5 w-5 text-primary"
      />
    ))}
  </div>

  <p className="text-muted-foreground break-words [overflow-wrap:anywhere]">
    {testimonial.description}
  </p>

  <div className="mt-auto pt-8">
    <div style={{ fontWeight: 600 }}>
      {testimonial.name}
    </div>
    <div className="text-sm text-muted-foreground">
      Patient
    </div>
  </div>
</Card>
                    </div>
                  ))}
                </div>

              </div>
            )}
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
      <ReviewModal open={open} onClose={() => setOpen(false)} onSubmit={handleReviewSubmit} />
    </div>
  );
}
