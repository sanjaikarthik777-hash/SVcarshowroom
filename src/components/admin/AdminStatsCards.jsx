export default function AdminStatsCards({ stats }) {
    const cards = [
        { label: 'Total Test Drive Bookings', value: stats.totalBookings, icon: '🗓️', color: 'blue' },
        { label: 'Approved Bookings', value: stats.approvedBookings, icon: '✅', color: 'green' },
        { label: 'Total Cars Available', value: stats.totalCars, icon: '🚗', color: 'gold' },
        { label: 'Total Customers', value: stats.totalCustomers, icon: '👥', color: 'purple' },
    ];

    return (
        <div className="admin-stats-grid">
            {cards.map((card, idx) => (
                <div key={idx} className={`admin-stat-card ${card.color}`}>
                    <div className="admin-stat-content">
                        <p className="admin-stat-label">{card.label}</p>
                        <h3 className="admin-stat-value">{card.value}</h3>
                    </div>
                    <div className="admin-stat-icon">
                        {card.icon}
                    </div>
                </div>
            ))}
        </div>
    );
}
