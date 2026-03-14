import { motion } from 'motion/react';
import { Target, Eye, Award, Users, Heart, Shield } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { LogoCarousel, LogoItem } from '../components/ui/logo-carousel';
import { ArrowRight, Play } from "lucide-react";
import { useEffect, useRef } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export function About() {




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
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl mb-6" style={{ fontWeight: 700 }}>
              About <span className="text-primary">Radha Krishan Hospital</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Dedicated to providing exceptional healthcare services with compassion, 
              integrity, and excellence since 1995.
            </p>
          </motion.div>
        </div>
      






    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        
        
        {/* 3D Graphics Scene */}
        <div className="relative mx-auto max-w-5xl h-96 lg:h-[500px]">
          <div 
            ref={sceneRef}
            className="relative w-full h-full perspective-1000"
            style={{ perspective: '1000px' }}
          >
            {/* Central Hub */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-primary to-primary/70 rounded-3xl shadow-2xl flex items-center justify-center z-10">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" id="hospital" viewBox="0 0 32 32" width="36" height="36">
  <path d="M28,11h-7v-7c0-1.1-.9-2-2-2h-6c-1.1,0-2,.9-2,2v7h-7c-1.1,0-2,.9-2,2v6c0,1.1.9,2,2,2h7v7c0,1.1.9,2,2,2h6c1.1,0,2-.9,2-2v-7h7c1.1,0,2-.9,2-2v-6c0-1.1-.9-2-2-2Z" style={{ fill: "#daeded" }}></path>
  <path d="M28,11h-7v-7c0-1.1-.9-2-2-2h-6c-1.1,0-2,.9-2,2v7h-7c-1.1,0-2,.9-2,2v6c0,1.1.9,2,2,2h7v7c0,1.1.9,2,2,2h6c1.1,0,2-.9,2-2v-7h7c1.1,0,2-.9,2-2v-6c0-1.1-.9-2-2-2ZM28,19h-8c-.55,0-1,.45-1,1v8h-6v-8c0-.55-.45-1-1-1H4v-6h8c.55,0,1-.45,1-1V4h6v8c0,.55.45,1,1,1h8v6Z" style={{ fill: "#269191" }}></path>
</svg>
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
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl mb-6" style={{ fontWeight: 700 }}>
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  CarePulse Medical Center was founded in 1995 with a simple yet powerful mission: 
                  to provide world-class healthcare services that are accessible, affordable, and compassionate.
                </p>
                <p>
                  Over the past 25+ years, we have grown from a small clinic to a comprehensive 
                  medical center, serving over 100,000 patients annually. Our success is built on 
                  the trust and confidence of our patients and the dedication of our medical professionals.
                </p>
                <p>
                  Today, CarePulse stands as a beacon of excellence in healthcare, equipped with 
                  state-of-the-art technology and staffed by some of the most experienced and 
                  compassionate medical professionals in the field.
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
                  src="https://images.unsplash.com/photo-1762237798212-bcc000c00891?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVhbSUyMGhlYWx0aGNhcmV8ZW58MXx8fHwxNzczNDAzMDAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Medical team"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-[#f8fafa]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full p-8 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl mb-4" style={{ fontWeight: 700 }}>Our Mission</h3>
                <p className="text-muted-foreground">
                  To provide comprehensive, high-quality healthcare services that improve the 
                  health and well-being of our community. We are committed to delivering 
                  patient-centered care with compassion, respect, and excellence.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full p-8 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl mb-4" style={{ fontWeight: 700 }}>Our Vision</h3>
                <p className="text-muted-foreground">
                  To be the leading healthcare provider in the region, recognized for clinical 
                  excellence, innovative treatments, and exceptional patient experiences. We 
                  envision a healthier community where everyone has access to quality healthcare.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            {...fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl mb-4" style={{ fontWeight: 700 }}>
              Our Core Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Heart,
                title: 'Compassion',
                description: 'We treat every patient with kindness, empathy, and understanding.'
              },
              {
                icon: Award,
                title: 'Excellence',
                description: 'We strive for the highest standards in medical care and service.'
              },
              {
                icon: Shield,
                title: 'Integrity',
                description: 'We uphold honesty, transparency, and ethical practices in all we do.'
              },
              {
                icon: Users,
                title: 'Teamwork',
                description: 'We collaborate to provide comprehensive, coordinated care.'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center p-6 hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-[#047070]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '25+', label: 'Years of Service' },
              { number: '50+', label: 'Expert Doctors' },
              { number: '100K+', label: 'Happy Patients' },
              { number: '98%', label: 'Success Rate' }
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
        <div className="container mx-auto px-4">
          <motion.div
            {...fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl mb-4" style={{ fontWeight: 700 }}>
              Accreditations & Awards
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Recognized for excellence in healthcare
            </p>
          </motion.div>

          <div className="size-full flex items-center justify-center bg-gray-50">
      <LogoCarousel speed={60}>
        {/* Replace these placeholders with your 6 components */}
        <LogoItem>
          <div className="text-2xl font-bold text-gray-800">Joint Commission Accreditation</div>
        </LogoItem>
        <LogoItem>
          <div className="text-2xl font-bold text-gray-800">Best Hospital Award 2025</div>
        </LogoItem>
        <LogoItem>
          <div className="text-2xl font-bold text-gray-800">Patient Safety Excellence Award</div>
        </LogoItem>
        <LogoItem>
          <div className="text-2xl font-bold text-gray-800">Healthcare Innovation Award</div>
        </LogoItem>
        <LogoItem>
          <div className="text-2xl font-bold text-gray-800">Top 100 Hospitals Nationwide</div>
        </LogoItem>
        <LogoItem>
          <div className="text-2xl font-bold text-gray-800">Quality Care Certification</div>
        </LogoItem>
      </LogoCarousel>
    </div>
        </div>
      </section>
    </div>
    </>
  );
}
