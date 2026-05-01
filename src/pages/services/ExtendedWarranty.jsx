import ConciergeServiceTemplate from '../../components/ConciergeServiceTemplate';

export default function ExtendedWarranty() {
    return (
        <ConciergeServiceTemplate
            title="Extended Warranty Shield"
            gradientWord="Warranty"
            heroImage="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&auto=format&fit=crop"
            description="Protect your investment with our comprehensive extended warranty packages. Tailored protection designed exclusively for ultra-high-end performance vehicles with up to 5 years of coverage."
            features={[
                { icon: '🛡️', title: 'Platinum Coverage', text: 'End-to-end protection encompassing engine, electronics, and transmission.' },
                { icon: '🌍', title: 'Global Support', text: 'Valid across our entire network, both domestically and internationally.' },
                { icon: '🔄', title: 'Transferable Value', text: 'Enhance your cars resale value with a fully transferable warranty policy.' }
            ]}
            testimonial={{
                quote: "The extended warranty gave me complete peace of mind. When an electronic sensor needed replacement, it was handled immediately with zero cost.",
                author: "Anil K.",
                role: "Business Owner"
            }}
            ctaText="Protect Your Car"
        />
    );
}
