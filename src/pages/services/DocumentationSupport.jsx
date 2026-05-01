import ConciergeServiceTemplate from '../../components/ConciergeServiceTemplate';

export default function DocumentationSupport() {
    return (
        <ConciergeServiceTemplate
            title="VIP Documentation"
            gradientWord="Documentation"
            heroImage="https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?q=80&w=2000&auto=format&fit=crop"
            description="Bypass the bureaucracy. Our dedicated legal and documentation team processes all your paperwork from RTO registration to luxury auto insurance and bespoke financing."
            features={[
                { icon: '📄', title: 'RTO & Registration', text: 'Fast-track premium number selection and complete RTO handling.' },
                { icon: '🤝', title: 'Bespoke Finance', text: 'Exclusive interest rates and custom structuring from top private wealth lenders.' },
                { icon: '🛡️', title: 'Premium Insurance', text: 'Zero-depreciation, high-IDV insurance packages tailored for exotics.' }
            ]}
            testimonial={{
                quote: "I despise doing paperwork. The documentation team literally did everything in the background while I just enjoyed my new car.",
                author: "Sneha P.",
                role: "Tech Executive"
            }}
            ctaText="Get Assistance"
        />
    );
}
