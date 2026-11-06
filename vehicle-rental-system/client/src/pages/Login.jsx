// Controlled form with client-side validation (Sprint 10).
// Real authentication is outside the scope of Sprints 1-17.
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button.jsx';
import Icon from '../components/common/Icon.jsx';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.email.trim()) err.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = 'Enter a valid email address';
    if (!form.password) err.password = 'Password is required';
    else if (form.password.length < 6) err.password = 'Password must be at least 6 characters';
    setErrors(err);
    setDone(Object.keys(err).length === 0);
    if (Object.keys(err).length === 0) setForm({ email: '', password: '' });
  };

  return (
    <div className="auth">
      <section className="auth-art">
        <span className="brand-mark big"><Icon name="key" size={26} /></span>
        <h1>Every vehicle, every booking, in one place.</h1>
        <p>DriveEasy keeps your fleet, customers and rentals organised so the counter never slows down.</p>
        <div className="road" aria-hidden="true" />
      </section>
      <section className="auth-form">
        <form onSubmit={handleSubmit} noValidate>
          <h2>Welcome back</h2>
          <p className="muted">Sign in to your account.</p>
          {done && <p className="alert alert-success">Form is valid. Sign-in with the server is added in a later sprint.</p>}
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="At least 6 characters" />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>
          <Button type="submit" text="Sign in" />
          <p className="muted back"><Link to="/">Back to dashboard</Link></p>
        </form>
      </section>
    </div>
  );
}

export default Login;
