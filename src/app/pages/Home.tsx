import { motion } from 'motion/react';
import { Link } from 'react-router';
import {
  Heart,
  Stethoscope,
  Activity,
  Users,
  Award,
  Clock,
  ArrowRight,
  CheckCircle2,
  Star
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

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

export function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#f0fafa] to-white py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
                <span className="text-primary">Welcome to Radha Krishan Hospital</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6" style={{ fontWeight: 700, lineHeight: 1.2 }}>
                Your Health is Our{' '}
                <span className="text-primary">Top Priority</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Experience world-class healthcare with our team of dedicated professionals.
                We provide comprehensive medical services with compassion and excellence.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/appointments">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Book Appointment
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5">
                    Our Services
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div>
                  <div className="text-3xl text-primary mb-1" style={{ fontWeight: 700 }}>25+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl text-primary mb-1" style={{ fontWeight: 700 }}>50+</div>
                  <div className="text-sm text-muted-foreground">Expert Doctors</div>
                </div>
                <div>
                  <div className="text-3xl text-primary mb-1" style={{ fontWeight: 700 }}>100K+</div>
                  <div className="text-sm text-muted-foreground">Happy Patients</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.jdmagicbox.com/comp/kurukshetra/d6/9999p1744.1744.200703024710.z1d6/catalogue/radha-krishan-hospital-kurukshetra-sector-5-kurukshetra-hospitals-TbGIwWgptw.jpg"
                  alt="Modern hospital building"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>

              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Available</div>
                    <div style={{ fontWeight: 600 }}>24/7 Emergency</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      {/* <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            {...fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl mb-4" style={{ fontWeight: 700 }}>
              Our Medical Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive healthcare solutions tailored to your needs
            </p>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Heart,
                title: 'Cardiology',
                description: 'Advanced heart care with state-of-the-art technology and experienced cardiologists.',
                image: 'https://images.unsplash.com/photo-1762939079730-23708c0dd337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJkaW9sb2d5JTIwaGVhcnQlMjBoZWFsdGh8ZW58MXx8fHwxNzczNDE1MTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
              },
              {
                icon: Stethoscope,
                title: 'General Medicine',
                description: 'Comprehensive primary care services for all your health needs.',
                image: 'https://images.unsplash.com/photo-1770134223774-13b735e29201?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBzbWlsaW5nJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MzQxNTkxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
              },
              {
                icon: Activity,
                title: 'Emergency Care',
                description: '24/7 emergency services with rapid response and expert care.',
                image: 'https://images.unsplash.com/photo-1579684288361-5c1a2957a700?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXJnZW9uJTIwb3BlcmF0aW5nJTIwcm9vbXxlbnwxfHx8fDE3NzMzOTA5NTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
              },
              {
                icon: Users,
                title: 'Pediatrics',
                description: 'Specialized care for children with a gentle, caring approach.',
                image: 'https://images.unsplash.com/photo-1632052999485-d748103abf98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWRpYXRyaWMlMjBkb2N0b3IlMjBjaGlsZHxlbnwxfHx8fDE3NzM0MTU5MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
              },
              {
                icon: Activity,
                title: 'Orthopedics',
                description: 'Expert treatment for bone, joint, and muscle conditions.',
                image: 'https://images.unsplash.com/photo-1720180244339-95e56d52e182?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMHJvb20lMjBtb2Rlcm58ZW58MXx8fHwxNzczNDE1OTE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
              },
              {
                icon: Stethoscope,
                title: 'Laboratory Services',
                description: 'Advanced diagnostic services with accurate and timely results.',
                image: 'https://images.unsplash.com/photo-1766299892683-d50398e31823?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVjaG5vbG9neSUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NzMzOTM5MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
              },
            ].map((service, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 group overflow-hidden border-border">
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="mb-2">{service.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                    <Link 
                      to="/services" 
                      className="text-primary inline-flex items-center gap-2 text-sm hover:gap-3 transition-all"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section> */}



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
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl text-white mb-6" style={{ fontWeight: 700 }}>
                Why Choose Radha Krishan Hospital?
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
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" />
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
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl text-primary mb-2" style={{ fontWeight: 700 }}>98%</div>
                <div className="text-sm text-muted-foreground">Patient Satisfaction</div>
              </Card>

              <Card className="bg-white p-6 h-full text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl text-primary mb-2" style={{ fontWeight: 700 }}>50+</div>
                <div className="text-sm text-muted-foreground">Expert Doctors</div>
              </Card>

              <Card className="bg-white p-6 h-full text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl text-primary mb-2" style={{ fontWeight: 700 }}>100K+</div>
                <div className="text-sm text-muted-foreground">Patients Treated</div>
              </Card>

              <Card className="bg-white p-6 h-full text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-primary" />
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
        <div className="container mx-auto px-4">
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
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#f0fafa]">
        <div className="container mx-auto px-4">
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
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
