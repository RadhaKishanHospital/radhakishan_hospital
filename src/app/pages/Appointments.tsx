import { motion } from 'motion/react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Calendar, Clock, User, Mail, Phone, FileText } from 'lucide-react';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

const retryableStatusCodes = new Set([408, 429, 500, 502, 503, 504]);

async function saveAppointment(payload: Record<string, string>, requestId: string) {
  let lastError: Error | undefined;

  // Retrying with the same key means a request that reached MongoDB is saved
  // exactly once even when Vercel/the network drops the first response.
  for (let attempt = 0; attempt < 3; attempt += 1) {
    let response: Response;
    try {
      response = await fetch('/api/general-appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Idempotency-Key': requestId,
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('We could not save your appointment request.');
      if (attempt < 2) await new Promise((resolve) => window.setTimeout(resolve, 400 * (attempt + 1)));
      continue;
    }

    const result = await response.json().catch(() => null);
    if (response.ok) return;

    lastError = new Error(result?.error || 'We could not save your appointment request.');
    if (!retryableStatusCodes.has(response.status)) throw lastError;
    if (attempt < 2) await new Promise((resolve) => window.setTimeout(resolve, 400 * (attempt + 1)));
  }

  throw lastError ?? new Error('We could not save your appointment request.');
}


export function Appointments() {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    doctor: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
       await saveAppointment({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        notes: formData.message,
      }, crypto.randomUUID());

      await queryClient.invalidateQueries({ queryKey: ['generalAppointments'] });
      toast.success('Appointment request submitted successfully! We will contact you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        doctor: '',
        message: ''
      });
    } catch (err) {
      console.error('Error saving general appointment to MongoDB:', err);
      toast.error(err instanceof Error ? err.message : 'We could not save your appointment request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
              Book an <span className="text-primary">Appointment</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Schedule your visit with our expert medical team. We're here to provide
              you with the best healthcare experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Appointment Form */}
      <section className="py-20 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="overflow-hidden border-border/60 shadow-lg">
                <div className="border-b border-border/60 bg-gradient-to-r from-primary/[0.04] to-transparent px-6 py-6 md:px-10">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon icon="solar:calendar-linear" className="h-5 w-5" />
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-foreground">
                        Appointment Details
                      </h2>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        Please provide your details and preferred appointment time.
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 md:p-10">
                  {/* Patient Information */}
                  <div className="mb-8">
                    <div className="mb-5">
                      <h3 className="text-base font-semibold text-foreground">
                        Patient Information
                      </h3>
                      <div className="mt-2 h-px w-full bg-border/60" />
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      {/* Name */}
                      <div className="space-y-2">
                        <Label htmlFor="name" className="flex items-center gap-2">
                          <Icon
                            icon="solar:user-outline"
                            className="h-4 w-4 text-primary"
                          />
                          Full Name *
                        </Label>

                        <Input
                          id="name"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          required
                          className="h-11 border-border/70"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center gap-2">
                          <Icon
                            icon="solar:phone-linear"
                            className="h-4 w-4 text-primary"
                          />
                          Phone Number *
                        </Label>

                        <Input
                          id="phone"
                          type="tel"
                          inputMode="tel"
                          placeholder="Your 10-digit mobile number"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          required
                          className="h-11 border-border/70"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="email" className="flex items-center gap-2">
                          <Icon
                            icon="solar:letter-linear"
                            className="h-4 w-4 text-primary"
                          />
                          Email Address *
                        </Label>

                        <Input
                          id="email"
                          type="email"
                          placeholder="Your email address"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          required
                          className="h-11 border-border/70"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Appointment Information */}
                  <div className="mb-8">
                    <div className="mb-5">
                      <h3 className="text-base font-semibold text-foreground">
                        Appointment Information
                      </h3>
                      <div className="mt-2 h-px w-full bg-border/60" />
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      {/* Date */}
                      <div className="space-y-2">
                        <Label htmlFor="date" className="flex items-center gap-2">
                          <Icon
                            icon="solar:calendar-linear"
                            className="h-4 w-4 text-primary"
                          />
                          Preferred Date *
                        </Label>

                        <Input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) => handleChange('date', e.target.value)}
                          required
                          className="h-11 border-border/70"
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>

                      {/* Time */}
                      <div className="space-y-2">
                        <Label htmlFor="time" className="flex items-center gap-2">
                          <Icon
                            icon="solar:clock-circle-linear"
                            className="h-4 w-4 text-primary"
                          />
                          Preferred Time *
                        </Label>

                        <Select
                          value={formData.time}
                          onValueChange={(value) => handleChange('time', value)}
                          required
                        >
                          <SelectTrigger className="h-11 border-border/70">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectItem value="10:00">10:00 AM</SelectItem>
                            <SelectItem value="11:00">11:00 AM</SelectItem>
                            <SelectItem value="12:00">12:00 PM</SelectItem>
                            <SelectItem value="13:00">01:00 PM</SelectItem>
                            <SelectItem value="14:00">02:00 PM</SelectItem>
                            <SelectItem value="17:00">05:00 PM</SelectItem>
                            <SelectItem value="18:00">06:00 PM</SelectItem>
                            <SelectItem value="19:00">07:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div className="mb-7">
                    <div className="mb-5">
                      <h3 className="text-base font-semibold text-foreground">
                        Additional Information
                      </h3>
                      <div className="mt-2 h-px w-full bg-border/60" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="flex items-center gap-2">
                        <Icon
                          icon="solar:file-text-linear"
                          className="h-4 w-4 text-primary"
                        />
                        Additional Notes
                        <span className="font-normal text-muted-foreground">
                          (Optional)
                        </span>
                      </Label>

                      <Textarea
                        id="message"
                        placeholder="Please provide any additional information about your appointment..."
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        rows={4}
                        className="resize-none border-border/70"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="border-t border-border/60 pt-6">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="h-12 w-full bg-primary text-base font-semibold shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
                    >
                      <Icon
                        icon="solar:calendar-add-linear"
                        className="mr-2 h-5 w-5"
                      />
                      {isSubmitting ? 'Submitting Appointment Request…' : 'Submit Appointment Request'}
                    </Button>

                    <p className="mt-4 text-center text-xs text-muted-foreground">
                      By submitting this request, you are requesting an appointment.
                      Our team will contact you to confirm the date and time.
                    </p>
                  </div>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-[#f8fafa]">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 text-center hover:shadow-lg transition-shadow h-full">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon icon="solar:calendar-linear" className="w-7 h-7 text-primary" />
                </div>
                <h3 className="mb-2">Flexible Scheduling</h3>
                <p className="text-muted-foreground text-sm">
                  Choose a date and time that works best for you
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6 text-center hover:shadow-lg transition-shadow h-full">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon icon="solar:clock-circle-linear" className="w-7 h-7 text-primary" />
                </div>
                <h3 className="mb-2">Quick Confirmation</h3>
                <p className="text-muted-foreground text-sm">
                  Receive confirmation within 24 hours
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 text-center hover:shadow-lg transition-shadow h-full">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon icon="solar:user-outline" className="w-7 h-7 text-primary" />
                </div>
                <h3 className="mb-2">Expert Care</h3>
                <p className="text-muted-foreground text-sm">
                  Connect with our qualified medical professionals
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
