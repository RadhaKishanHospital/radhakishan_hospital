import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    dob: '',
    address: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    doctor: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/general-appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          fatherName: formData.fatherName,
          dob: formData.dob,
          address: formData.address,
          email: formData.email,
          phone: formData.phone,
          date: formData.date,
          time: formData.time,
          notes: formData.message,
          status: 'pending'
        })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to schedule appointment');
      }

      toast.success(t("appointments.form.success"));
      setFormData({
        name: '',
        fatherName: '',
        dob: '',
        address: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        doctor: '',
        message: ''
      });
    } catch (err: any) {
      console.error('Error saving general appointment to MongoDB:', err);
      toast.error(t("appointments.form.error", "Unable to set appointment. Please check your connection or try again."));
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
              {t("appointments.hero.title")}{" "}
              <span className="text-primary">
                {t("appointments.hero.highlight")}
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              {t("appointments.hero.description")}
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
                        {t("appointments.form.name.label")}
                      </Label>
                      <Input
                        id="name"
                        placeholder={t("appointments.form.name.placeholder")}
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                        className="border-border"
                      />
                    </div>

                    {/* Father's Name */}
                    <div className="space-y-2">
                      <Label htmlFor="fatherName" className="flex items-center gap-2">
                        <Icon icon="solar:user-outline" className="w-4 h-4 text-primary" />
                        {t("appointments.form.fatherName.label", "Father's Name *")}
                      </Label>
                      <Input
                        id="fatherName"
                        placeholder={t("appointments.form.fatherName.placeholder", "Enter father's name")}
                        value={formData.fatherName}
                        onChange={(e) => handleChange('fatherName', e.target.value)}
                        required
                        className="border-border"
                      />
                    </div>

                    {/* Date of Birth */}
                    <div className="space-y-2">
                      <Label htmlFor="dob" className="flex items-center gap-2">
                        <Icon icon="solar:calendar-linear" className="w-4 h-4 text-primary" />
                        {t("appointments.form.dob.label", "Date of Birth *")}
                      </Label>
                      <Input
                        id="dob"
                        type="date"
                        value={formData.dob}
                        onChange={(e) => handleChange('dob', e.target.value)}
                        required
                        className="border-border"
                      />
                    </div>

                    {/* Address */}
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address" className="flex items-center gap-2">
                        <Icon icon="solar:home-2-linear" className="w-4 h-4 text-primary" />
                        {t("appointments.form.address.label", "Address *")}
                      </Label>
                      <Textarea
                        id="address"
                        placeholder={t("appointments.form.address.placeholder", "Enter your full address")}
                        value={formData.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        rows={3}
                        required
                        className="border-border"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Icon icon="solar:letter-linear" className="w-4 h-4 text-primary" />
                        {t("appointments.form.email.label")}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={t("appointments.form.email.placeholder")}
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
                        {t("appointments.form.phone.label")}
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder={t("appointments.form.phone.placeholder")}
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        required
                        className="border-border"
                      />
                    </div>

                    {/* Date */}
                    <div className="space-y-2">
                      <Label htmlFor="date" className="flex items-center gap-2">
                        <Icon icon="solar:calendar-linear" className="w-4 h-4 text-primary" />
                        {t("appointments.form.date.label")}
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
                        {t("appointments.form.time.label")}
                      </Label>
                      <Select value={formData.time} onValueChange={(value) => handleChange('time', value)} required>
                        <SelectTrigger className="border-border">
                          <SelectValue placeholder={t("appointments.form.time.placeholder")} />
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
                      {t("appointments.form.message.label")}
                    </Label>
                    <Textarea
                      id="message"
                      placeholder={t("appointments.form.message.placeholder")}
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      rows={4}
                      className="border-border"
                    />
                  </div>

                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60">
                    {isSubmitting ? "Submitting..." : t("appointments.form.button")}
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    {t("appointments.form.required")}
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
                <h3 className="mb-2">
                  {t("appointments.info.scheduling.title")}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {t("appointments.info.scheduling.description")}
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
                <h3 className="mb-2">
                  {t("appointments.info.confirmation.title")}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {t("appointments.info.confirmation.description")}
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
                <h3 className="mb-2">
                  {t("appointments.info.care.title")}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {t("appointments.info.care.description")}
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
