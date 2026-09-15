import type { LayoutConfig } from '@/types/config';

export const normalConfig: LayoutConfig = {
  version: 1,
  theme: {
    primary: '#176B87', secondary: '#64CCC5', background: '#F5FBFA', surface: '#FFFFFF',
    textPrimary: '#12343B', textSecondary: '#61767A', accent: '#F4B942',
    festival: { name: '', greeting: '', bannerImageUrl: '' },
  },
  tabs: [
    { id: 'home', label: 'Home', icon: 'home', screen: '/' },
    { id: 'bookings', label: 'Bookings', icon: 'calendar', screen: '/bookings' },
    { id: 'prescriptions', label: 'Prescriptions', icon: 'medication', screen: '/prescriptions' },
    { id: 'profile', label: 'Profile', icon: 'person', screen: '/profile' },
  ],
  sections: [
    { id: 'header', type: 'header', background: { kind: 'color', value: '#F5FBFA' }, items: [{ greeting: 'Good morning, Mohul', subtitle: 'How can we help you today?' }] },
    { id: 'hero', type: 'hero_banner', background: { kind: 'image', value: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80' }, items: [{ eyebrow: 'PERSONAL CARE', title: 'Your health, our priority', subtitle: 'Book trusted consultations from the comfort of home.', ctaLabel: 'Book now', imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80' }] },
    { id: 'categories', type: 'category_chips', title: 'Explore care', background: { kind: 'color', value: '#FFFFFF' }, items: [
      { id: 'general', label: 'General', icon: '+' }, { id: 'dental', label: 'Dental', icon: 'D' }, { id: 'skin', label: 'Skin', icon: 'S' }, { id: 'heart', label: 'Heart', icon: 'H' }, { id: 'mental', label: 'Mental health', icon: 'M' },
    ] },
    { id: 'quick-actions', type: 'quick_actions', title: 'Quick actions', background: { kind: 'color', value: '#F5FBFA' }, items: [
      { id: 'doctor', title: 'Find a doctor', subtitle: 'Talk to a specialist', icon: '+', action: 'bookings' }, { id: 'appointment', title: 'Book appointment', subtitle: 'Choose a convenient time', icon: 'C', action: 'booking' }, { id: 'records', title: 'Health records', subtitle: 'Your care in one place', icon: 'R', action: 'profile' }, { id: 'medicine', title: 'Medicines', subtitle: 'Manage your prescriptions', icon: 'M', action: 'prescriptions' },
    ] },
    { id: 'services', type: 'service_grid', title: 'Popular services', background: { kind: 'color', value: '#FFFFFF' }, items: [
      { id: 'clinic', name: 'Doctor visit', imageUrl: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=600&q=80', priceInr: 499, badge: 'Popular', description: 'In-person consultation' }, { id: 'video', name: 'Video consult', imageUrl: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=600&q=80', priceInr: 299, description: 'Speak from anywhere' },
    ] },
    { id: 'doctors', type: 'doctor_carousel', title: 'Top doctors', background: { kind: 'color', value: '#F5FBFA' }, items: [
      { id: 'dr-adebayo', name: 'Dr. Tola Adebayo', specialty: 'Family medicine', photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80', feeInr: 599, languages: ['English', 'Yoruba'], availability: 'available', nextAvailableAt: 'Today, 4:30 PM' }, { id: 'dr-okafor', name: 'Dr. Chidi Okafor', specialty: 'General practice', photoUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=500&q=80', feeInr: 499, languages: ['English', 'Igbo'], availability: 'busy', nextAvailableAt: 'Today, 6:00 PM' },
    ] },
    { id: 'offer', type: 'offer_strip', background: { kind: 'color', value: '#176B87' }, items: [{ badge: 'FIRST VISIT', title: '20% off your first consultation', subtitle: 'Use code FIRSTCARE when you book today.', ctaLabel: 'Claim offer' }] },
  ],
};
