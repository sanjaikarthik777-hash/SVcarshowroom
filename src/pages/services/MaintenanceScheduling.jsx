import ConciergeServiceTemplate from '../../components/ConciergeServiceTemplate';

export default function MaintenanceScheduling() {
    return (
        <ConciergeServiceTemplate
            title="Premium Maintenance"
            gradientWord="Maintenance"
            heroImage="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&auto=format&fit=crop"
            description="Keep your luxury vehicle in pristine condition. Our white-glove maintenance service includes valet pick-up, certified servicing, and a complimentary premium detail."
            features={[
                { icon: '🚙', title: 'Valet Pick & Drop', text: 'We pick up your car and return it directly to you, fully serviced.' },
                { icon: '🔧', title: 'Master Technicians', text: 'Only brand-certified master technicians handle your high-performance machine.' },
                { icon: '✨', title: 'Complimentary Detailing', text: 'Every service includes an exterior and interior luxury detailing session.' }
            ]}
            testimonial={{
                quote: "I didn't even have to leave my office. They picked up the car, serviced it perfectly, and brought it back looking brand new.",
                author: "Vikram S.",
                role: "Architect"
            }}
            ctaText="Book Service"
        />
    );
}
