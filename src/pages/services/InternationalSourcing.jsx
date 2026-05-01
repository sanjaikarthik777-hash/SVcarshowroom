import ConciergeServiceTemplate from '../../components/ConciergeServiceTemplate';

export default function InternationalSourcing() {
    return (
        <ConciergeServiceTemplate
            title="Global Auto Sourcing"
            gradientWord="Sourcing"
            heroImage="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000&auto=format&fit=crop"
            description="Looking for an exclusive limited edition or a specific hypercar configuration? Our global network allows us to locate, verify, and import the worlds rarest automobiles directly to your garage."
            features={[
                { icon: '🌐', title: 'Worldwide Network', text: 'Direct access to international collectors, auctions, and private sellers.' },
                { icon: '🔍', title: 'Expert Verification', text: 'Every sourced vehicle undergoes a rigorous 200-point physical and historic inspection.' },
                { icon: '✈️', title: 'Seamless Import', text: 'We handle customs, transportation, and port clearances end-to-end.' }
            ]}
            testimonial={{
                quote: "I was looking for a very specific 1-of-50 supercar for over a year. The sourcing team found it in Monaco and had it in my garage in 3 weeks.",
                author: "Rohan D.",
                role: "Collector"
            }}
            ctaText="Request A Vehicle"
        />
    );
}
