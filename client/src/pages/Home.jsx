import React from 'react';
import { Link } from 'react-router-dom';
import { useCampaigns } from '../hooks/useCampaigns.js';
import CampaignList from '../components/CampaignList.jsx';
import Button from '../components/Button.jsx';
import { formatMoney } from '../lib/format.js';

export default function Home() {
  const { campaigns, loading, error } = useCampaigns();
  const active = campaigns.filter((item) => item.status === 'active');
  const collected = campaigns.reduce((sum, item) => sum + Number(item.collectedAmount || 0), 0);
  const goal = campaigns.reduce((sum, item) => sum + Number(item.goalAmount || 0), 0);

  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> МАЛЕНЬКІ ВНЕСКИ. ВЕЛИКІ ЗМІНИ.</div>
            <h1>Добро має силу,<br /><em>коли ми разом.</em></h1>
            <p className="hero-lead">Знаходьте ініціативи, які вам близькі. Стежте за кожним кроком до мети та бачте, на що спрямовано допомогу.</p>
            <div className="hero-actions"><Link className="button" to="/catalog">Знайти свій збір <span>↗</span></Link><Link className="button button--outline" to="/contacts">Запропонувати ініціативу</Link></div>
            <div className="hero-proof"><div className="avatar-stack"><span>М</span><span>О</span><span>І</span><span>+</span></div><div><strong>Кожен внесок має значення</strong><small>Прозорість на кожному етапі</small></div></div>
          </div>
          <div className="hero-visual" aria-label="Ілюстрація рук, що підтримують зелене серце" role="img">
            <div className="hero-visual__sun" /><div className="hero-visual__ring hero-visual__ring--one" /><div className="hero-visual__ring hero-visual__ring--two" />
            <div className="hero-visual__card hero-visual__card--top"><span>✳</span><div><b>Довіра</b><small>Через відкритість</small></div></div>
            <div className="hero-heart"><svg viewBox="0 0 300 300" role="presentation"><path d="M150 255C120 228 49 175 49 111c0-36 25-61 59-61 21 0 36 11 42 27 7-16 22-27 43-27 34 0 59 25 59 61 0 64-71 117-102 144Z" fill="#f2bd66"/><path d="M150 248C125 224 66 179 66 123c0-30 20-50 47-50 18 0 31 10 37 25 6-15 19-25 37-25 27 0 47 20 47 50 0 56-59 101-84 125Z" fill="#1f775b"/><path d="M107 123c5-14 16-22 30-22" stroke="#d7f0db" strokeWidth="7" strokeLinecap="round" fill="none"/></svg></div>
            <div className="hero-visual__card hero-visual__card--bottom"><span>↗</span><div><b>Прозорий прогрес</b><small>Від мети до результату</small></div></div>
            <span className="hero-spark hero-spark--one">✳</span><span className="hero-spark hero-spark--two">✦</span>
          </div>
        </div>
        <div className="hero-bottom container"><span>01 / ДОПОМАГАТИ ПРОСТО</span><span className="hero-line" /><span>ГОРТАЙТЕ, ЩОБ ЗНАЙТИ СВОЄ</span><span>↓</span></div>
      </section>

      <section className="stats-strip">
        <div className="container stats-grid">
          <div><span className="stat-icon">✳</span><strong>{loading ? '—' : campaigns.length.toString().padStart(2, '0')}</strong><small>ініціатив у каталозі</small></div>
          <div><span className="stat-icon">↗</span><strong>{loading ? '—' : formatMoney(collected)}</strong><small>демонстраційно зібрано</small></div>
          <div><span className="stat-icon">◎</span><strong>{loading ? '—' : `${active.length.toString().padStart(2, '0')}`}</strong><small>активних кампаній</small></div>
          <div><span className="stat-icon">♡</span><strong>{loading ? '—' : formatMoney(goal)}</strong><small>сукупна ціль зборів</small></div>
        </div>
      </section>

      <section className="section section--campaigns">
        <div className="container">
          <div className="section-heading"><div><div className="eyebrow">РАЗОМ МИ МОЖЕМО БІЛЬШЕ</div><h2>Ініціативи, що <em>мають значення.</em></h2></div><Link className="text-link text-link--large" to="/catalog">Усі збори <span>↗</span></Link></div>
          <CampaignList campaigns={campaigns.slice(0, 3)} loading={loading} error={error} />
          <div className="center-action"><Link className="button button--outline" to="/catalog">Переглянути всі ініціативи <span>→</span></Link></div>
        </div>
      </section>

      <section className="section section--values">
        <div className="container values-grid">
          <div className="values-intro"><div className="eyebrow">НАШ ПІДХІД</div><h2>Допомога,<br /><em>якій видно</em><br />результат.</h2><p>Ми віримо, що довіра починається з чесної інформації. Тому найважливіше — просто перед очима.</p><Link className="text-link" to="/catalog">Як це працює <span>↗</span></Link></div>
          <div className="value-list">
            <article className="value-item"><span className="value-number">01</span><div><h3>Зрозуміла мета</h3><p>Кожен збір має чіткий опис потреби, категорію та цільову суму.</p></div><span className="value-icon">◎</span></article>
            <article className="value-item"><span className="value-number">02</span><div><h3>Видимий прогрес</h3><p>Динамічна шкала показує, скільки вже зібрано та скільки залишилося.</p></div><span className="value-icon">↗</span></article>
            <article className="value-item"><span className="value-number">03</span><div><h3>Відкриті звіти</h3><p>У деталях ініціативи можна переглянути записи про використання коштів.</p></div><span className="value-icon">▤</span></article>
          </div>
        </div>
      </section>

      <section className="cta-section"><div className="container cta-inner"><div><div className="eyebrow eyebrow--light">ПОЧНІМО ЗАРАЗ</div><h2>Добро починається<br />з <em>одного кроку.</em></h2></div><Link className="button button--cream" to="/catalog">Обрати ініціативу <span>↗</span></Link><div className="cta-decoration">✳</div></div></section>
      <p className="demo-disclaimer container">Навчальний макет: назви, суми та звіти є демонстраційними. Реальні платежі не здійснюються.</p>
    </>
  );
}
