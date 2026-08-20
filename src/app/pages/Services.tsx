import { motion } from 'motion/react';
import { 
  Heart, 
  Stethoscope, 
  Activity, 
  Users, 
  Baby,
  Bone,
  Eye,
  Brain,
  Pill,
  Microscope,
  Siren,
  Scan,
} from 'lucide-react';
import { Icon } from "@iconify/react";
import { Button } from '../components/ui/button';
import { Link } from 'react-router';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export function Services() {
  const services = [
    {
      icon: Heart,
      title: 'Cardiology',
      description: 'Comprehensive heart care including diagnosis, treatment, and management of cardiovascular conditions.',
      features: [
        'Cardiac catheterization',
        'ECG and stress testing',
        'Heart disease prevention',
        'Cardiac rehabilitation'
      ]
    },
    {
      icon: Siren,
      title: 'Emergency Care',
      description: '24/7 emergency services with rapid response teams and advanced life support.',
      features: [
        'Trauma care',
        'Critical care units',
        'Emergency surgery',
        'Ambulance services'
      ]
    },
    {
      icon: Baby,
      title: 'Pediatrics',
      description: 'Specialized care for infants, children, and adolescents with a gentle approach.',
      features: [
        'Well-child checkups',
        'Vaccinations',
        'Pediatric emergency care',
        'Growth monitoring'
      ]
    },
    {
      icon: Bone,
      title: 'Orthopedics',
      description: 'Expert treatment for musculoskeletal conditions, injuries, and disorders.',
      features: [
        'Joint replacement',
        'Sports medicine',
        'Fracture care',
        'Spine surgery'
      ]
    },
    {
      icon: Brain,
      title: 'Neurology',
      description: 'Advanced care for neurological disorders affecting the brain and nervous system.',
      features: [
        'Stroke care',
        'Epilepsy treatment',
        'Headache management',
        'Neurosurgery'
      ]
    },
    {
      icon: Eye,
      title: 'Ophthalmology',
      description: 'Complete eye care services from routine exams to advanced surgical procedures.',
      features: [
        'Cataract surgery',
        'LASIK procedures',
        'Glaucoma treatment',
        'Retinal care'
      ]
    },
    {
      icon: Users,
      title: 'General Medicine',
      description: 'Comprehensive primary care services for adults of all ages.',
      features: [
        'Annual checkups',
        'Chronic disease management',
        'Preventive care',
        'Health screenings'
      ]
    },
    {
      icon: Activity,
      title: 'Radiology',
      description: 'State-of-the-art diagnostic imaging services with expert radiologists.',
      features: [
        'MRI and CT scans',
        'X-rays and ultrasound',
        'Mammography',
        'Interventional radiology'
      ]
    },
    {
      icon: Microscope,
      title: 'Laboratory Services',
      description: 'Advanced diagnostic testing with accurate and timely results.',
      features: [
        'Blood tests',
        'Pathology services',
        'Molecular diagnostics',
        'Clinical chemistry'
      ]
    },
    {
      icon: Pill,
      title: 'Pharmacy',
      description: 'Full-service pharmacy with expert pharmaceutical care and counseling.',
      features: [
        'Prescription filling',
        'Medication therapy management',
        'Drug information',
        'Home delivery'
      ]
    },
    {
      icon: Stethoscope,
      title: 'Internal Medicine',
      description: 'Expert care for complex adult medical conditions and chronic diseases.',
      features: [
        'Diabetes management',
        'Hypertension care',
        'Respiratory diseases',
        'Preventive medicine'
      ]
    },
    {
      icon: Scan,
      title: 'Surgery',
      description: 'Advanced surgical procedures with minimally invasive techniques.',
      features: [
        'General surgery',
        'Laparoscopic surgery',
        'Day surgery',
        'Post-operative care'
      ]
    }
  ];

const whyChoose = [
  {
    icon: "solar:cup-star-linear",
    title: "World-Class Expertise",
    description: "Our physicians are internationally trained leaders in their specialties, bringing unmatched clinical insight to every case.",
  },
  {
    icon: "solar:cpu-linear",
    title: "Advanced Technology",
    description: "We invest in the latest diagnostic and treatment technologies, ensuring the most accurate and effective care available.",
  },
  {
    icon: "solar:user-check-linear",
    title: "Personalized Care",
    description: "Every treatment plan is tailored to the individual — because exceptional medicine starts with understanding the patient.",
  },
];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#f0fafa] to-white pb-5 pt-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl mb-6" style={{ fontWeight: 700 }}>
              Our Medical <span className="text-primary">Services</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive healthcare solutions delivered by expert medical professionals 
              using state-of-the-art technology and compassionate care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="px-6 lg:px-4 py-24">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: Icon, title, description }) => (
              <div key={title} className="group relative rounded-[24px] bg-card p-8 shadow-[0_1px_3px_0_rgba(0,0,0,0.04),0_6px_24px_-4px_rgba(0,0,0,0.06)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_4px_12px_0_rgba(0,0,0,0.06),0_16px_40px_-8px_rgba(0,0,0,0.1)]">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 transition-colors duration-200 group-hover:bg-primary">
                  <Icon className="h-6 w-6 text-primary transition-colors duration-200 group-hover:text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
                
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 lg:px-4 pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl">
              Why Choose Radha Kishan Hospital
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              The difference is in every detail.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {whyChoose.map(({ icon, title, description }) => (
              <div key={title} className="text-center">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Icon icon={icon} className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-[#047070]">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto text-white"
          >
            <h2 className="text-3xl md:text-4xl mb-6" style={{ fontWeight: 700 }}>
              Need Medical Assistance?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Our team is ready to provide you with the best healthcare services. 
              Book an appointment or contact us for more information.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/appointments">
                <Button size="lg" className="bg-white text-[#058080] rounded-full px-6 font-medium shadow-[0_2px_8px_-2px_hsl(180_94%_26%/0.4)] transition-all duration-200 hover:bg-[#e6f2f2] hover:shadow-[0_4px_16px_-2px_hsl(180_94%_26%/0.5)]">
                  Book Appointment
                </Button>
              </Link>
              
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
