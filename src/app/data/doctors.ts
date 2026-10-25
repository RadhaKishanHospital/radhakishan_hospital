/** Doctor directory data shared by the profile page and the SEO prerender step. */
export interface DoctorRecord {
  id: number;
  name: string;
  specialty: string;
  /** Plain-language specialty used in titles and descriptions */
  specialtyLabel: string;
  /** schema.org MedicalSpecialty value */
  schemaSpecialty: string;
  qualification: string;
  experience?: string;
  initials: string;
  bio: string;
  education: string[];
  registrationAuthority: string;
  registrationNo: string;
  available: boolean;
  image?: string;
}

export const DOCTORS: Record<number, DoctorRecord> = {
  1: {
    id: 1,
    name: 'Dr. Lokender Goyal',
    specialty: 'pediatricsNeonatal',
    specialtyLabel: 'Child Specialist (Pediatrician) & Neonatal Care Specialist',
    schemaSpecialty: 'Pediatric',
    qualification: 'MBBS, MD (Pediatrics)',
    initials: 'LG',
    bio: 'pediatricsNeonatal',
    education: ['Himachal Pradesh University', 'Panjab University'],
    registrationAuthority: 'Haryana Medical Council',
    registrationNo: 'HN-21452',
    available: true,
    image: 'https://res.cloudinary.com/hizkabhg/image/upload/v1789882019/IMG_9137.JPG.jpg',
  },
  2: {
    id: 2,
    name: 'Dr. Monika Dixit',
    specialty: 'pathology',
    specialtyLabel: 'Pathologist',
    schemaSpecialty: 'Pathology',
    qualification: 'MBBS, MD (Pathology)',
    initials: 'MD',
    bio: 'pathology',
    education: ['Institute of Medical Sciences, BHU, Varanasi'],
    registrationAuthority: 'Haryana Medical Council',
    registrationNo: 'HN-013272',
    available: true,
    image: 'https://res.cloudinary.com/hizkabhg/image/upload/v1789882574/IMG_9134.JPG.jpg',
  },
  3: {
    id: 3,
    name: 'Dr. Akanksha Tyagi',
    specialty: 'generalMedicine',
    specialtyLabel: 'General Physician',
    schemaSpecialty: 'PrimaryCare',
    qualification: 'MBBS, MD (General Medicine)',
    initials: 'AT',
    bio: 'generalMedicine',
    education: ['Rajasthan University of Health Sciences'],
    registrationAuthority: 'Haryana Medical Council',
    registrationNo: 'HN-23419',
    available: true,
    image: 'https://res.cloudinary.com/hizkabhg/image/upload/v1789882575/IMG_9136.JPG.jpg',
  },
  4: {
    id: 4,
    name: 'Dr. Shashank Singhal',
    specialty: 'surgery',
    specialtyLabel: 'General Surgeon',
    schemaSpecialty: 'Surgical',
    qualification: 'MBBS, MS (General Surgery)',
    initials: 'SS',
    bio: 'surgery',
    education: ['Pt. B.D. Sharma University of Health Sciences, Rohtak', 'NIMS University, Jaipur'],
    registrationAuthority: 'Haryana Medical Council',
    registrationNo: 'HN-10817',
    available: true,
    image: 'https://res.cloudinary.com/hizkabhg/image/upload/v1789882575/IMG_9135.JPG.jpg',
  },
  5: {
  id: 5,
  name: 'Dr. Manan Bansal',
  specialty: 'pediatricsNeonatal',
  specialtyLabel: 'Pediatrician (Child Specialist)',
  schemaSpecialty: 'Pediatric',
  qualification: 'MBBS, MD (Pediatrics)',
  initials: 'MB',
  bio: 'pediatricsNeonatal',
  education: [
    'SGT Medical College',
    'Geetanjali Medical College, Udaipur',
  ],
  registrationAuthority: '',
  registrationNo: '',
  available: true,
  image: 'https://res.cloudinary.com/hizkabhg/image/upload/v1792921608/WhatsApp_Image_2026-10-25_at_15.15.10.jpg',
},
};

export function doctorSeo(doctor: DoctorRecord) {
  return {
    title: `${doctor.name} — ${doctor.specialtyLabel} in Kurukshetra`,
    description: `${doctor.name} (${doctor.qualification}), ${doctor.specialtyLabel.toLowerCase()} at Radhakishan Hospital, Kurukshetra. Registered with ${doctor.registrationAuthority} (Reg. No. ${doctor.registrationNo}). Book an OPD appointment.`,
    path: `/doctor/${doctor.id}`,
  };
}

export function doctorSchema(doctor: DoctorRecord) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: doctor.name,
    description: `${doctor.specialtyLabel} at Radhakishan Hospital, Kurukshetra`,
    medicalSpecialty: doctor.schemaSpecialty,
    hasCredential: doctor.qualification,
    identifier: { '@type': 'PropertyValue', propertyID: doctor.registrationAuthority, value: doctor.registrationNo },
    alumniOf: doctor.education.map((name) => ({ '@type': 'CollegeOrUniversity', name })),
    hospitalAffiliation: { '@type': 'Hospital', '@id': 'https://radhakishanhospital.in/#hospital', name: 'Radhakishan Hospital' },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jyoti Nagar, Thanesar',
      addressLocality: 'Kurukshetra',
      addressRegion: 'Haryana',
      postalCode: '136118',
      addressCountry: 'IN',
    },
    telephone: '+91 72060 29516',
    url: `https://radhakishanhospital.in/doctor/${doctor.id}`,
    image: doctor.image || 'https://radhakishanhospital.in/logo.png',
  };
}
