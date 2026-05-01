import ConciergeServiceTemplate from '../../components/ConciergeServiceTemplate';

export default function VipDelivery() {
    return (
        <ConciergeServiceTemplate
            title="VIP Delivery Experience"
            gradientWord="Delivery"
            heroImage="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=2000&auto=format&fit=crop"
            description="Transform your car delivery into a cinematic event. Receive your new luxury vehicle at your doorstep with a full ceremony, luxury gifting, and personalized handover."
            features={[
                { icon: '🎬', title: 'Cinematic Handover', text: 'A grand reveal tailored to your taste at your residence.' },
                { icon: '🎁', title: 'Exclusive Gifting', text: 'Complimentary premium accessories and a personalized welcome kit.' },
                { icon: '🚘', title: 'Detailed Walkthrough', text: 'A comprehensive explanation of all features, tech, and performance modes.' }
            ]}
            testimonial={{
                quote: "I've bought many luxury cars, but the VIP delivery from this showroom was unlike anything else. Outstanding attention to detail.",
                author: "Priya R.",
                role: "Corporate Executive"
            }}
            ctaText="Schedule VIP Delivery"
        />
    );
}
