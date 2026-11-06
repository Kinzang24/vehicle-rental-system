import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/common/Card.jsx';
import Icon from '../components/common/Icon.jsx';
import Loading from '../components/common/Loading.jsx';
import ErrorMessage from '../components/common/ErrorMessage.jsx';
import { getVehicles } from '../services/vehicleService.js';
import { getCustomers } from '../services/customerService.js';
import { getErrorMessage } from '../services/api.js';

function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([getVehicles(), getCustomers()])
      .then(([v, c]) => setData({ vehicles: v.data.data, customers: c.data.data }))
      .catch((err) => setError(getErrorMessage(err)));
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const total = data?.vehicles.length ?? 0;
  const available = data?.vehicles.filter((v) => v.available).length ?? 0;
  const rented = total - available;
  const pct = total ? Math.round((available / total) * 100) : 0;

  const stats = [
    { label: 'Total vehicles', value: total, icon: 'car', tone: 'navy' },
    { label: 'Available now', value: available, icon: 'check', tone: 'green' },
    { label: 'Currently rented', value: rented, icon: 'key', tone: 'amber' },
    { label: 'Customers', value: data?.customers.length ?? 0, icon: 'users', tone: 'blue' }
  ];

  return (
    <>
      <section className="hero">
        <div>
          <h1>{greeting}, Admin</h1>
          <p>Here is your fleet and customer summary, read live from the database.</p>
        </div>
        <div className="hero-actions">
          <Link className="btn btn-primary" to="/vehicles">Manage vehicles</Link>
          <Link className="btn btn-light" to="/customers">Manage customers</Link>
        </div>
      </section>

      <ErrorMessage message={error} />
      {!data && !error && <Loading text="Loading summary..." />}

      {data && (
        <>
          <div className="card-grid">
            {stats.map((s) => (
              <div className="stat-card" key={s.label}>
                <span className={`stat-icon tone-${s.tone}`}><Icon name={s.icon} size={22} /></span>
                <div><p className="stat-value">{s.value}</p><p className="stat-label">{s.label}</p></div>
              </div>
            ))}
          </div>

          <div className="two-col">
            <Card title="Recent vehicles">
              {data.vehicles.length === 0 ? (
                <p className="empty">No vehicles yet. Add your first vehicle from the Vehicles page.</p>
              ) : (
                <ul className="list">
                  {data.vehicles.slice(0, 5).map((v) => (
                    <li key={v._id}>
                      <span className="list-avatar">{v.name.charAt(0)}</span>
                      <span className="list-main"><strong>{v.name}</strong><small>{v.brand} &middot; {v.type} &middot; {v.registrationNumber}</small></span>
                      <span className={`badge ${v.available ? 'badge-ok' : 'badge-no'}`}>{v.available ? 'Available' : 'Rented'}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Card>

            <Card title="Fleet availability">
              <p className="big-pct">{pct}%</p>
              <div className="bar" role="img" aria-label={`${pct}% of vehicles available`}><span style={{ width: `${pct}%` }} /></div>
              <p className="bar-note">{available} of {total} vehicles are ready to rent.</p>
              <h4 className="mini-title">Newest customers</h4>
              {data.customers.length === 0 ? (
                <p className="empty">No customers yet.</p>
              ) : (
                <ul className="list compact">
                  {data.customers.slice(0, 3).map((c) => (
                    <li key={c._id}>
                      <span className="list-avatar alt">{c.name.charAt(0)}</span>
                      <span className="list-main"><strong>{c.name}</strong><small>{c.phone}</small></span>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
