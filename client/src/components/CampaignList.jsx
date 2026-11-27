import React from 'react';
import CampaignCard from './CampaignCard.jsx';

export default function CampaignList({ campaigns, loading, error, emptyText = 'За вашим запитом зборів не знайдено.' }) {
  if (loading) return <div className="state-panel" role="status"><span className="spinner" />Завантажуємо актуальні збори…</div>;
  if (error) return <div className="state-panel state-panel--error" role="alert">{error}<p>Переконайтеся, що сервер запущено на порту 3001.</p></div>;
  if (!campaigns.length) return <div className="state-panel">{emptyText}</div>;
  return <div className="campaign-grid">{campaigns.map((campaign) => <CampaignCard key={campaign.id} campaign={campaign} />)}</div>;
}
