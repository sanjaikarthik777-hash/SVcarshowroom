import ConciergeServiceTemplate from '../../components/ConciergeServiceTemplate';

export default function TestDriveBooking() {
    return (
        <ConciergeServiceTemplate
            title="Private Test Drive"
            gradientWord="Test Drive"
            heroImage="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2000&auto=format&fit=crop"
            description="Book a fully personalized, private test drive at your preferred location. Whether at your residence or office, our specialist will bring the vehicle directly to you for an uninterrupted experience."
            features={[
                { icon: '📍', title: 'Location of Your Choice', text: 'We deliver the vehicle to your home, office, or anywhere you prefer.' },
                { icon: '⏱️', title: 'Flexible Timing', text: 'Schedule a time that fits perfectly within your busy day, available 7 days a week.' },
                { icon: '🤵', title: 'Expert Specialist', text: 'A dedicated product genius will accompany the vehicle to answer all your queries.' }
            ]}
            testimonial={{
                quote: "The home test drive experience was flawless. The specialist arrived exactly on time, and the car was immaculate. True luxury service.",
                author: "Arjun M.",
                role: "Entrepreneur"
            }}
            ctaText="Book Test Drive"
        />
    );
}
