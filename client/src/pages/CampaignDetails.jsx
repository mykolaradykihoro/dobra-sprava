import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { createDonationDemo, getCampaign } from '../lib/api.js';
import { formatDate, formatMoney } from '../lib/format.js';
import ProgressBar from '../components/ProgressBar.jsx';
import Button from '../components/Button.jsx';
import Modal from '../components/Modal.jsx';

export default function CampaignDetails() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [amount, setAmount] = useState(200);
  const [donating, setDonating] = useState(false);
  const [notice, setNotice] = useState('');

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try { setCampaign(await getCampaign(id)); }
    catch (err) { setError(err.message || 'Не вдалося завантажити збір.'); }
    finally { setLoading(false); }
  }, [id]);
  useEffect(() => { load(); }, [load]);

  const donate = async (event) => {
    event.preventDefault();
    if (!Number.isFinite(Number(amount)) || Number(amount) < 1) return;
    setDonating(true); setNotice('');
    try {
      const result = await createDonationDemo(id, Number(amount));
      setCampaign((previous) => ({ ...previous, collectedAmount: result.collectedAmount }));
      setModalOpen(false);
      setNotice('Демонстраційний внесок додано до тестових даних. Гроші не переказувалися.');
    } catch (err) { setNotice(err.message); }
    finally { setDonating(false); }
  };

  if (loading) return <main className="container section"><div className="state-panel" role="status"><span className="spinner" />Завантажуємо сторінку збору…</div></main>;
  if (error || !campaign) return <main className="container section"><div className="state-panel state-panel--error">{error || 'Збір не знайдено.'}<p><Link className="text-link" to="/catalog">Повернутися до каталогу →</Link></p></div></main>;

  return (
    <>
      <div className="breadcrumbs container"><Link to="/">Головна</Link><span>/</span><Link to="/catalog">Збори</Link><span>/</span><span>{campaign.title}</span></div>
      <section className="section detail-section"><div className="container detail-grid">
        <div className={`detail-art campaign-art campaign-art--${campaign.theme || 'green'}`}>{campaign.image && <picture className="campaign-art__picture"><source media="(max-width: 600px)" srcSet={campaign.image} /><img src={campaign.image} srcSet={`${campaign.image} 640w`} sizes="(max-width: 900px) 100vw, 45vw" alt={`Ілюстрація до збору «${campaign.title}»`} width="640" height="420" /></picture>}<span className="campaign-art__orb campaign-art__orb--one" /><span className="campaign-art__orb campaign-art__orb--two" /><span className="detail-art__symbol">{campaign.symbol || '♡'}</span><span className="campaign-art__tag">{campaign.category}</span><div className="detail-art__caption"><span>ДОБРА СПРАВА</span><b>Разом — до мети.</b></div></div>
        <div className="detail-main"><div className="eyebrow">{campaign.category.toUpperCase()} · {campaign.status === 'completed' ? 'ЗАВЕРШЕНО' : 'АКТИВНИЙ ЗБІР'}</div><h1>{campaign.title}</h1><p className="detail-lead">{campaign.description}</p><div className="detail-progress-card"><div className="detail-progress-head"><div><span>Зібрано на цей момент</span><strong>{formatMoney(campaign.collectedAmount)}</strong></div><span className="detail-goal">Ціль<br /><b>{formatMoney(campaign.goalAmount)}</b></span></div><ProgressBar collected={campaign.collectedAmount} goal={campaign.goalAmount} /><div className="detail-meta"><span>⌁ Організатор: {campaign.organizer || 'Команда ініціативи'}</span><span>◷ Оновлено: {formatDate(campaign.updatedAt || campaign.createdAt)}</span></div><Button onClick={() => setModalOpen(true)} disabled={campaign.status !== 'active'}>Підтримати (демо) ↗</Button><small className="demo-inline">Тестова дія: не є оплатою і не переказує кошти.</small></div>{notice && <div className="form-alert form-alert--success" role="status">{notice}</div>}</div>
      </div></section>
      <section className="section report-section"><div className="container report-layout"><div><div className="eyebrow">ВІДКРИТІСТЬ І ДОВІРА</div><h2>Звіти про <em>витрати.</em></h2><p className="report-intro">Організатор додає записи про використання коштів, щоб можна було простежити шлях від внеску до результату.</p></div><div className="report-list">{(campaign.reports || []).length ? campaign.reports.map((report) => <article className="report-row" key={report.id}><div className="report-date">{formatDate(report.date)}</div><div className="report-content"><h3>{report.title}</h3><p>{report.description}</p></div><strong>{formatMoney(report.amount)}</strong></article>) : <div className="state-panel">Для цієї кампанії ще не додано звітів.</div>}<div className="report-total"><span>Разом у звітах</span><strong>{formatMoney((campaign.reports || []).reduce((sum, report) => sum + Number(report.amount || 0), 0))}</strong></div></div></div></section>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Долучитися до ініціативи">
        <p className="modal-description">Оберіть суму тестового внеску. Вона буде додана до демонстраційного прогресу збору.</p>
        <form onSubmit={donate}>
          <div className="amount-options">{[100, 200, 500, 1000].map((value) => <button key={value} type="button" className={Number(amount) === value ? 'amount-option amount-option--active' : 'amount-option'} onClick={() => setAmount(value)}>{value} ₴</button>)}</div>
          <label className="field"><span>Власна сума (грн)</span><input type="number" min="1" max="100000" step="1" value={amount} onChange={(event) => setAmount(event.target.value)} required /></label>
          <div className="demo-warning">Це навчальна симуляція. Не вводьте платіжні реквізити. Платіж не буде здійснено.</div>
          <Button type="submit" disabled={donating}>{donating ? 'Оновлюємо…' : 'Додати тестовий внесок'}</Button>
        </form>
      </Modal>
    </>
  );
}
