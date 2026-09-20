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

export function Appointments() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    department: '',
    doctor: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/general-appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          department: formData.department,
          date: formData.date,
          time: formData.time,
          notes: formData.message,
          status: 'pending'
        })
      });
    } catch (err) {
      console.error('Error saving general appointment to MongoDB:', err);
    }

    toast.success('Appointment request submitted successfully! We will contact you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      department: '',
      doctor: '',
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
              <Card className="p-8 md:p-12 shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <Icon icon="solar:user-outline" className="w-4 h-4 text-primary" />
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                        className="border-border"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Icon icon="solar:letter-linear" className="w-4 h-4 text-primary" />
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Your email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                        className="border-border"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Icon icon="solar:phone-linear" className="w-4 h-4 text-primary" />
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Your 10-digit mobile number"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        required
                        className="border-border"
                      />
                    </div>

                    {/* Department */}
                    <div className="space-y-2">
                      <Label htmlFor="department" className="flex items-center gap-2">
                        <Icon icon="solar:file-text-linear" className="w-4 h-4 text-primary" />
                        Department *
                      </Label>
                      <Select value={formData.department} onValueChange={(value) => handleChange('department', value)} required>
                        <SelectTrigger className="border-border">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cardiology">Cardiology</SelectItem>
                          <SelectItem value="pediatrics">Pediatrics</SelectItem>
                          <SelectItem value="orthopedics">Orthopedics</SelectItem>
                          <SelectItem value="neurology">Neurology</SelectItem>
                          <SelectItem value="general">General Medicine</SelectItem>
                          <SelectItem value="emergency">Emergency Care</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Date */}
                    <div className="space-y-2">
                      <Label htmlFor="date" className="flex items-center gap-2">
                        <Icon icon="solar:calendar-linear" className="w-4 h-4 text-primary" />
                        Preferred Date *
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleChange('date', e.target.value)}
                        required
                        className="border-border"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    {/* Time */}
                    <div className="space-y-2">
                      <Label htmlFor="time" className="flex items-center gap-2">
                        <Icon icon="solar:clock-circle-linear" className="w-4 h-4 text-primary" />
                        Preferred Time *
                      </Label>
                      <Select value={formData.time} onValueChange={(value) => handleChange('time', value)} required>
                        <SelectTrigger className="border-border">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="09:00">09:00 AM</SelectItem>
                          <SelectItem value="10:00">10:00 AM</SelectItem>
                          <SelectItem value="11:00">11:00 AM</SelectItem>
                          <SelectItem value="12:00">12:00 PM</SelectItem>
                          <SelectItem value="14:00">02:00 PM</SelectItem>
                          <SelectItem value="15:00">03:00 PM</SelectItem>
                          <SelectItem value="16:00">04:00 PM</SelectItem>
                          <SelectItem value="17:00">05:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="flex items-center gap-2">
                      <Icon icon="solar:file-text-linear" className="w-4 h-4 text-primary" />
                      Additional Notes
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Please provide any additional information about your appointment..."
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      rows={4}
                      className="border-border"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                    Submit Appointment Request
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    * Required fields. We will contact you to confirm your appointment.
                  </p>
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
