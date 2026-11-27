import React, { useState } from 'react';
import { sendContact } from '../lib/api.js';
import { validateContact } from '../lib/validation.js';
import Button from './Button.jsx';

const initial = { name: '', email: '', phone: '', topic: 'Питання щодо збору', message: '', consent: false };

export default function ContactForm() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  const update = (event) => {
    const { name, value, checked, type } = event.target;
    const next = { ...values, [name]: type === 'checkbox' ? checked : value };
    setValues(next);
    if (status) setStatus('');
    setErrors(validateContact(next));
  };

  const submit = async (event) => {
    event.preventDefault();
    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setSending(true);
    setStatus('');
    try {
      await sendContact(values);
      setStatus('success');
      setValues(initial);
      setErrors({});
    } catch (error) {
      setStatus(error.message || 'Не вдалося надіслати повідомлення.');
    } finally {
      setSending(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <fieldset className="contact-fieldset"><legend className="sr-only">Форма зворотного зв’язку</legend>
      {status === 'success' && <div className="form-alert form-alert--success" role="status">Дякуємо! Повідомлення успішно збережено в навчальному середовищі.</div>}
      {status && status !== 'success' && <div className="form-alert form-alert--error" role="alert">{status}</div>}
      <div className="form-row">
        <div className="field"><label htmlFor="contact-name">Ваше ім’я</label><input id="contact-name" name="name" value={values.name} onChange={update} minLength="2" required autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} placeholder="Як до вас звертатися?" />{errors.name && <small id="name-error" className="field-error">{errors.name}</small>}</div>
        <div className="field"><label htmlFor="contact-email">Електронна пошта</label><input id="contact-email" name="email" type="email" value={values.email} onChange={update} required autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} placeholder="name@example.com" />{errors.email && <small id="email-error" className="field-error">{errors.email}</small>}</div>
      </div>
      <div className="form-row">
        <div className="field"><label htmlFor="contact-phone">Телефон <span>(необов’язково)</span></label><input id="contact-phone" name="phone" type="tel" value={values.phone} onChange={update} pattern="\+380[0-9]{9}" placeholder="+380XXXXXXXXX" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'phone-error' : undefined} />{errors.phone && <small id="phone-error" className="field-error">{errors.phone}</small>}</div>
        <div className="field"><label htmlFor="contact-topic">Тема звернення</label><select id="contact-topic" name="topic" value={values.topic} onChange={update}><option>Питання щодо збору</option><option>Співпраця</option><option>Звітність</option><option>Інше</option></select></div>
      </div>
      <div className="field"><label htmlFor="contact-message">Повідомлення</label><textarea id="contact-message" name="message" rows="5" minLength="10" required value={values.message} onChange={update} placeholder="Напишіть, чим можемо допомогти…" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} />{errors.message && <small id="message-error" className="field-error">{errors.message}</small>}</div>
      <label className="checkbox-field"><input name="consent" type="checkbox" checked={values.consent} onChange={update} /> <span>Погоджуюся на обробку звернення в межах навчального проєкту.</span></label>
      {errors.consent && <small className="field-error">{errors.consent}</small>}
      <div className="form-submit"><Button type="submit" disabled={sending}>{sending ? 'Надсилаємо…' : 'Надіслати повідомлення ↗'}</Button><span>Відповідь буде збережена в локальному API.</span></div>
      </fieldset>
    </form>
  );
}
