import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from "../components/ui/card";
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { SEO } from '../components/SEO';
import { PAGE_META, corePageSchema } from '../seo/pages';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

export function Contact() {
  const { t } = useTranslation();

  const faqs = [
    {
      q: t("contact.faqs.booking.question"),
      a: t("contact.faqs.booking.answer"),
    },
    {
      q: t("contact.faqs.timings.question"),
      a: t("contact.faqs.timings.answer"),
    },
    {
      q: t("contact.faqs.emergency.question"),
      a: t("contact.faqs.emergency.answer"),
    },
    {
      q: t("contact.faqs.insurance.question"),
      a: t("contact.faqs.insurance.answer"),
    },
    {
      q: t("contact.faqs.contact.question"),
      a: t("contact.faqs.contact.answer"),
    },
    {
      q: t("contact.faqs.location.question"),
      a: t("contact.faqs.location.answer"),
    },
  ];

  const contactCards = [
    {
      icon: "solar:map-point-linear",
      title: t("contact.info.visit.title"),
      lines: [
        t("contact.info.visit.address"),
      ],
    },
    {
      icon: "solar:phone-calling-linear",
      title: t("contact.info.call.title"),
      lines: [
        t("contact.info.call.emergency"),
        t("contact.info.call.opd"),
      ],
    },
    {
      icon: "solar:clock-circle-linear",
      title: t("contact.info.hours.title"),
      lines: [
        t("contact.info.hours.winter"),
        t("contact.info.hours.summer"),
        t("contact.info.hours.emergency"),
        t("contact.info.hours.sunday"),
      ],
    },
  ];

  const [formData, setFormData] = useState({
    name: '',
    number: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone_no: Number(formData.number) || 0,
          subject: formData.subject,
          body: formData.message,
          read: false
        })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to send message');
      }

      toast.success(t("contact.form.success", "Your message has been sent successfully!"));
      setFormData({
        name: '',
        number: '',
        subject: '',
        message: ''
      });
    } catch (err: any) {
      console.error('Error saving message to MongoDB:', err);
      toast.error(t("contact.form.error", "Unable to send message. Please check your connection or try again."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen">
      <SEO
        title={PAGE_META.contact.title}
        description={PAGE_META.contact.description}
        path={PAGE_META.contact.path}
        schema={corePageSchema(PAGE_META.contact.path)}
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
              {t("contact.hero.title")}{" "}
              <span className="text-primary">{t("contact.hero.highlight")}</span>
            </h1>

            <p className="text-lg text-muted-foreground">
              {t("contact.hero.description")}
            </p>
          </motion.div>
        </div>
      </section>



      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-4 sm:gap-6 md:grid-cols-3">
          {contactCards.map((card) => (
            <Card
              key={card.title}
              className="group border-border/60 bg-card shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md"
            >
              <CardContent className="p-6 sm:p-8">
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
                {t("contact.form.title")}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("contact.form.name.label")}</Label>
                  <Input
                    id="name"
                    placeholder={t("contact.form.name.placeholder")}
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                    className="border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="number">{t("contact.form.mobile.label")}</Label>
                  <Input
                    id="number"
                    type="number"
                    placeholder={t("contact.form.mobile.placeholder")}
                    value={formData.number}
                    onChange={(e) => handleChange('number', e.target.value)}
                    required
                    className="border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">{t("contact.form.subject.label")}</Label>
                  <Input
                    id="subject"
                    placeholder={t("contact.form.subject.placeholder")}
                    value={formData.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    required
                    className="border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t("contact.form.message.label")}</Label>
                  <Textarea
                    id="message"
                    placeholder={t("contact.form.message.placeholder")}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    required
                    rows={6}
                    className="border-border"
                  />
                </div>

                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60">
                  <Icon icon="solar:plane-linear" className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Sending..." : t("contact.form.button", "Send Message")}
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Map */}
          <div className="flex flex-col">
            <h2 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">
              {t("contact.map.title")}
            </h2>

            <p className="mb-8 text-muted-foreground">
              {t("contact.map.description")}
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
              {t("contact.faq.title")}
            </h2>
            <p className="text-muted-foreground">
              {t("contact.faq.description")}
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
              {t("contact.emergency.title")}
            </h2>
            <p className="text-white/90 text-lg mb-8">
              {t("contact.emergency.description")}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="tel:+911744270516">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 rounded-full px-6 font-medium shadow-[0_2px_8px_-2px_hsl(180_94%_26%/0.4)] transition-all duration-200 hover:shadow-[0_4px_16px_-2px_hsl(180_94%_26%/0.5)]"
                >
                  <Icon icon="solar:phone-calling-linear" className="w-5 h-5 mr-2" />
                  {t("contact.emergency.button")}
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
