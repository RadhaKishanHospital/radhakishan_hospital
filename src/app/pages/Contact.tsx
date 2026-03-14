import { motion } from 'motion/react';
import { Card, CardContent } from "../components/ui/card";
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { MapPin, Phone, Mail, Clock, Send, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const departments = [
  { name: "Emergency", phone: "+1 (555) 911-0001", email: "emergency@medhaven.com" },
  { name: "Cardiology", phone: "+1 (555) 911-0002", email: "cardiology@medhaven.com" },
  { name: "Pediatrics", phone: "+1 (555) 911-0003", email: "pediatrics@medhaven.com" },
  { name: "Orthopedics", phone: "+1 (555) 911-0004", email: "orthopedics@medhaven.com" },
  { name: "Neurology", phone: "+1 (555) 911-0005", email: "neurology@medhaven.com" },
  { name: "Oncology", phone: "+1 (555) 911-0006", email: "oncology@medhaven.com" },
];

const faqs = [
  {
    q: "How do I book an appointment?",
    a: "You can book an appointment by calling our appointments line at +1 (555) 911-2000, using our online portal, or visiting the reception desk in person. We recommend booking at least 48 hours in advance for non-urgent consultations.",
  },
  {
    q: "What insurance plans do you accept?",
    a: "We accept most major insurance plans including Blue Cross Blue Shield, Aetna, UnitedHealthcare, Cigna, and Medicare/Medicaid. Please contact our billing department for specific coverage inquiries.",
  },
  {
    q: "What are your visiting hours?",
    a: "General visiting hours are from 10:00 AM to 8:00 PM daily. ICU visiting is limited to 15-minute intervals every two hours. Pediatric wards allow one parent/guardian to stay overnight.",
  },
  {
    q: "Do you offer telemedicine consultations?",
    a: "Yes, we offer telemedicine consultations for follow-up appointments and non-emergency cases. You can schedule a virtual visit through our patient portal or by calling our appointments line.",
  },
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#f0fafa] to-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl mb-6" style={{ fontWeight: 700 }}>
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Have questions or need assistance? We're here to help. Reach out to us 
              and we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>



      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {[
            {
              icon: MapPin,
              title: "Visit Us",
              lines: ["1234 Healthcare Boulevard", "Suite 500, Medical District", "New York, NY 10001"],
            },
            {
              icon: Phone,
              title: "Call Us",
              lines: [
                "Emergency: +1 (555) 911-0000",
                "Appointments: +1 (555) 911-2000",
                "General: +1 (555) 911-3000",
              ],
            },
            {
              icon: Clock,
              title: "Working Hours",
              lines: [
                "Mon – Fri: 7:00 AM – 9:00 PM",
                "Saturday: 8:00 AM – 5:00 PM",
                "Emergency: 24/7",
              ],
            },
          ].map((card) => (
            <Card
              key={card.title}
              className="group border-border/60 bg-card shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md"
            >
              <CardContent className="p-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <card.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-foreground">{card.title}</h3>
                {card.lines.map((line) => (
                  <p key={line} className="text-sm leading-relaxed text-muted-foreground">
                    {line}
                  </p>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-secondary/40 px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          {/* Form */}
          <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-8">
                <h2 className="text-2xl mb-6" style={{ fontWeight: 700 }}>
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      required
                      className="border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      required
                      className="border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      placeholder="How can we help you?"
                      value={formData.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                      required
                      className="border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      required
                      rows={6}
                      className="border-border"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </Card>
            </motion.div>

          {/* Map */}
          <div className="flex flex-col">
            <h2 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">
              Find Us
            </h2>
            <p className="mb-8 text-muted-foreground">
              Proudly serving the community from the heart of Kurukshetra.
            </p>
            <div className="flex-1 overflow-hidden rounded-2xl border border-border/60 shadow-sm">
              <iframe
                title="Hospital Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.2459097687315!2d76.84059897535357!3d29.97236207496002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e46d0c969312b%3A0xd5093e57fcb9126c!2sRadha%20Kishan%20Hospital%20Multi%20%26%20Super%20Speciality%20Center!5e0!3m2!1sen!2sin!4v1773487267019!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 400 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Department Directory */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-primary" />
            <h2 className="mb-3 text-2xl font-bold text-foreground md:text-3xl">
              Department Directory
            </h2>
            <p className="text-muted-foreground">
              Reach the right department directly for faster assistance.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((dept) => (
              <div
                key={dept.name}
                className="group flex items-center justify-between rounded-xl border border-border/60 bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-sm"
              >
                <div>
                  <h4 className="mb-1 font-semibold text-foreground">{dept.name}</h4>
                  <p className="text-sm text-muted-foreground">{dept.phone}</p>
                  <p className="text-sm text-primary">{dept.email}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-secondary/40 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-primary" />
            <h2 className="mb-3 text-2xl font-bold text-foreground md:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Find quick answers to common questions about our services.
            </p>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-xl border border-border/60 bg-card px-6 shadow-sm transition-all data-[state=open]:shadow-md"
              >
                <AccordionTrigger className="text-left text-foreground hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-[#047070]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl mb-4 text-white" style={{ fontWeight: 700 }}>
              Need Emergency Care?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Our emergency department is open 24/7 to provide immediate medical attention
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-6 font-medium shadow-[0_2px_8px_-2px_hsl(180_94%_26%/0.4)] transition-all duration-200 hover:shadow-[0_4px_16px_-2px_hsl(180_94%_26%/0.5)]">
                <Phone className="w-5 h-5 mr-2" />
                Call Emergency: +1 (555) 911-0000
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
