import React from 'react';
import ContactForm from '../components/ContactForm.jsx';

export default function Contacts() {
  return (
    <>
      <section className="page-hero page-hero--contacts"><div className="container page-hero-inner"><div className="eyebrow">МИ НА ЗВ’ЯЗКУ</div><h1>Є ідея або <em>питання?</em></h1><p>Напишіть нам — розберемося разом. Відкритий діалог допомагає робити ініціативи кращими.</p></div><div className="page-hero-shape" aria-hidden="true">✳</div></section>
      <section className="section contacts-section"><div className="container contacts-grid"><div className="contacts-info"><div className="eyebrow">КОНТАКТИ</div><h2>Поговорімо<br /><em>про важливе.</em></h2><p>Форма працює в межах локального навчального проєкту й надсилає тестове звернення до API.</p><div className="contact-info-card"><span>✉</span><div><small>Електронна пошта (демо)</small><strong>hello@dobrasprava.example</strong></div></div><div className="contact-info-card"><span>◷</span><div><small>Час відповіді</small><strong>1–2 робочі дні (умовно)</strong></div></div><div className="contact-mini-note">✳  ЧЕСНІСТЬ ПОЧИНАЄТЬСЯ ЗІ СПІЛКУВАННЯ</div></div><div className="contact-form-card"><h2>Напишіть нам</h2><p>Поля з позначкою * обов’язкові.</p><ContactForm /></div></div></section>
    </>
  );
}
