// Sprints 9, 10, 16, 17: one reusable CRUD screen (list, search, add, edit, delete).
// Vehicles and Customers pages pass their own fields, columns and service functions.
import { useEffect, useState } from 'react';
import PageTitle from './PageTitle.jsx';
import Card from './Card.jsx';
import Button from './Button.jsx';
import Loading from './Loading.jsx';
import ErrorMessage from './ErrorMessage.jsx';
import { getErrorMessage } from '../../services/api.js';

const emailPattern = /^\S+@\S+\.\S+$/;

function ResourceManager({ title, subtitle, singular, service, fields, columns }) {
  const blank = Object.fromEntries(fields.map((f) => [f.name, f.default ?? '']));

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const [form, setForm] = useState(blank);
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  // GET: load records from the backend (Sprint 16)
  const loadItems = async () => {
    try {
      const res = await service.getAll();
      setItems(res.data.data);
      setError('');
    } catch (err) {
      setError(`Unable to load ${title.toLowerCase()}. ${getErrorMessage(err)}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadItems(); }, []);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  // Client-side validation (Sprint 10)
  const validate = () => {
    const err = {};
    fields.forEach((f) => {
      const value = form[f.name];
      const text = typeof value === 'string' ? value.trim() : value;
      if (f.required && (text === '' || text === undefined)) err[f.name] = `${f.label} is required`;
      else if (f.type === 'email' && text && !emailPattern.test(text)) err[f.name] = 'Enter a valid email address';
      else if (f.type === 'number' && text !== '' && Number(text) < (f.min ?? 0)) err[f.name] = `${f.label} must be at least ${f.min ?? 0}`;
      else if (f.minLength && text && text.length < f.minLength) err[f.name] = `${f.label} must be at least ${f.minLength} characters`;
    });
    return err;
  };

  const resetForm = () => {
    setForm(blank);
    setErrors({});
    setEditingId(null);
    setShowForm(false);
  };

  const flash = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(''), 4000);
  };

  // POST or PUT
  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    const payload = { ...form };
    fields.forEach((f) => { if (f.type === 'number') payload[f.name] = Number(payload[f.name]); });

    setSaving(true);
    setError('');
    try {
      if (editingId) {
        await service.update(editingId, payload);
        flash(`${singular} updated successfully.`);
      } else {
        await service.create(payload);
        flash(`${singular} added successfully.`);
      }
      resetForm();
      await loadItems();
    } catch (err2) {
      setError(getErrorMessage(err2));
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    const next = {};
    fields.forEach((f) => { next[f.name] = item[f.name] ?? f.default ?? ''; });
    setForm(next);
    setEditingId(item._id);
    setErrors({});
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // DELETE with confirmation
  const handleDelete = async (item) => {
    if (!window.confirm(`Are you sure you want to delete this ${singular.toLowerCase()}?`)) return;
    try {
      await service.remove(item._id);
      flash(`${singular} deleted successfully.`);
      await loadItems();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const visible = items.filter((item) =>
    columns.some((c) => String(item[c.key] ?? '').toLowerCase().includes(search.toLowerCase()))
  );

  const renderField = (f) => (
    <div className={`field ${f.type === 'checkbox' ? 'field-check' : ''}`} key={f.name}>
      {f.type === 'checkbox' ? (
        <label>
          <input type="checkbox" name={f.name} checked={!!form[f.name]} onChange={handleChange} /> {f.label}
        </label>
      ) : (
        <>
          <label htmlFor={f.name}>{f.label}</label>
          {f.type === 'select' ? (
            <select id={f.name} name={f.name} value={form[f.name]} onChange={handleChange}>
              <option value="">Select {f.label.toLowerCase()}</option>
              {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          ) : (
            <input id={f.name} name={f.name} type={f.type || 'text'} value={form[f.name]} onChange={handleChange} placeholder={f.placeholder || ''} />
          )}
        </>
      )}
      {errors[f.name] && <span className="field-error">{errors[f.name]}</span>}
    </div>
  );

  return (
    <>
      <PageTitle title={title} subtitle={subtitle}>
        {!showForm && <Button text={`+ Add ${singular}`} onClick={() => setShowForm(true)} />}
      </PageTitle>

      {message && <p className="alert alert-success" role="status">{message}</p>}
      <ErrorMessage message={error} />

      {showForm && (
        <Card title={editingId ? `Edit ${singular}` : `Add ${singular}`}>
          <form className="form-grid" onSubmit={handleSubmit} noValidate>
            {fields.map(renderField)}
            <div className="form-actions">
              <Button type="submit" text={saving ? 'Saving...' : editingId ? `Update ${singular}` : `Save ${singular}`} disabled={saving} />
              <Button text="Cancel" variant="ghost" onClick={resetForm} />
            </div>
          </form>
        </Card>
      )}

      <Card>
        <div className="toolbar">
          <input className="search" type="search" placeholder={`Search ${title.toLowerCase()}`} value={search} onChange={(e) => setSearch(e.target.value)} aria-label={`Search ${title}`} />
          <span className="count">{visible.length} of {items.length}</span>
        </div>

        {loading ? (
          <Loading text={`Loading ${title.toLowerCase()}...`} />
        ) : visible.length === 0 ? (
          <p className="empty">{items.length === 0 ? `No ${title.toLowerCase()} yet. Use "Add ${singular}" to create the first one.` : 'No records match your search.'}</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  {columns.map((c) => <th key={c.key}>{c.label}</th>)}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((item) => (
                  <tr key={item._id}>
                    {columns.map((c) => <td key={c.key} data-label={c.label}>{c.render ? c.render(item) : item[c.key]}</td>)}
                    <td data-label="Actions" className="actions">
                      <Button text="Edit" variant="ghost" onClick={() => handleEdit(item)} />
                      <Button text="Delete" variant="danger" onClick={() => handleDelete(item)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </>
  );
}

export default ResourceManager;
