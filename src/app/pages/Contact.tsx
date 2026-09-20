import { motion } from 'motion/react';
import { Card, CardContent } from "../components/ui/card";
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { MapPin, Phone, Mail, Clock, Send, ChevronRight } from 'lucide-react';
import { Icon } from '@iconify/react';
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
    q: "How do I book an OPD appointment?",
    a: "OPD appointments start at 9:00 AM in the morning. You can book an appointment by calling our OPD number at +91 72060 29516.",
  },
  {
    q: "What are your OPD timings?",
    a: "OPD timings are from 10:00 AM to 2:00 PM and from 5:00 PM to 7:00 PM. OPD remains closed on Sunday. OPD appointments start at 9:00 AM in the morning.",
  },
  {
    q: "Is emergency care available 24/7?",
    a: "Yes. Our Emergency Department is available 24/7. For emergency assistance, call +91 1744 270516.",
  },
  {
    q: "Do you provide cashless insurance facilities?",
    a: "Yes. Cashless facility is available for the following insurance/healthcare schemes and providers: Genins India Insurance TPA Limited, Star Health Insurance, Reliance Health Insurance, Niva Bupa Health Insurance, Tata AIG, Care Health Insurance, HDFC ERGO Health Insurance Plans, Aditya Birla Capital, Ayushman Bharat, Cigna Health Life Insurance, Heritage Health, Medi Assist Insurance TPA Pvt. Ltd., Paramount Health Insurance, IFFCO Tokio General Insurance, Chola MS General Insurance, Universal Sompo, FHPL Insurance (Beyond Insurance), and ECHS.",
  },
  {
    q: "How can I contact the hospital?",
    a: "For OPD-related queries and appointments, call +91 72060 29516. For emergency assistance, call +91 1744 270516.",
  },
  {
    q: "Where is Radhakishan Hospital located?",
    a: "Radhakishan Hospital is located at Jyoti Nagar, Thanesar, Kurukshetra, Haryana 136118.",
  },
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone_no: Number(formData.email || (formData as any).number || 0) || 0,
          subject: formData.subject,
          body: formData.message,
          read: false
        })
      });
    } catch (err) {
      console.error('Error saving message to MongoDB:', err);
    }

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
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-4">
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
              icon: "solar:map-point-linear",
              title: "Visit Us",
              lines: ["Jyoti Nagar, Thanesar, Kurukshetra, Haryana 136118"],
            },
            {
              icon: "solar:phone-calling-linear",
              title: "Call Us",
              lines: [
                "Emergency: +91 1744 270516",
                "OPD: +91 72060 29516",
              ],
            },
            {
              icon: "solar:clock-circle-linear",
              title: "Working Hours",
              lines: [
                "OPD: 10:00 AM – 2:00 PM",
                "OPD: 5:00 PM – 7:00 PM",
                "Emergency: 24/7",
                "Sunday: OPD Closed",
              ],
            },
          ].map((card) => (
            <Card
              key={card.title}
              className="group border-border/60 bg-card shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md"
            >
              <CardContent className="p-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon icon={card.icon} className="h-5 w-5" />
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
                  <Label htmlFor="number">Mobile number *</Label>
                  <Input
                    id="number"
                    type="number"
                    placeholder="Enter your mobile number"
                    value={formData.number}
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
                  <Icon icon="solar:plane-linear" className="w-4 h-4 mr-2" />
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



      {/* FAQ Section */}
      <section className=" px-6 py-20">
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
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-4">
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
              <a href="tel:+911744270516">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 rounded-full px-6 font-medium shadow-[0_2px_8px_-2px_hsl(180_94%_26%/0.4)] transition-all duration-200 hover:shadow-[0_4px_16px_-2px_hsl(180_94%_26%/0.5)]"
                >
                  <Icon icon="solar:phone-calling-linear" className="w-5 h-5 mr-2" />
                  Call Emergency: +91 1744 270516
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
