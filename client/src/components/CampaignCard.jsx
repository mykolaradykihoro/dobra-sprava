import React from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from './ProgressBar.jsx';
import { formatMoney } from '../lib/format.js';

const categoryIcons = { Медицина: '✳', Транспорт: '↗', Гуманітарна: '♡', Освіта: '✦' };

export default function CampaignCard({ campaign, featured = false }) {
  const completed = campaign.status === 'completed';
  return (
    <article className={`campaign-card ${featured ? 'campaign-card--featured' : ''}`}>
      <Link to={`/items/${campaign.id}`} className={`campaign-art campaign-art--${campaign.theme || 'green'}`} aria-label={`Переглянути збір: ${campaign.title}`}>
        {campaign.image && <picture className="campaign-art__picture"><source media="(max-width: 600px)" srcSet={campaign.image} /><img src={campaign.image} srcSet={`${campaign.image} 640w`} sizes="(max-width: 600px) 100vw, 33vw" alt={`Ілюстрація до збору «${campaign.title}»`} loading="lazy" width="640" height="420" /></picture>}
        <span className="campaign-art__orb campaign-art__orb--one" />
        <span className="campaign-art__orb campaign-art__orb--two" />
        <span className="campaign-art__symbol" aria-hidden="true">{campaign.symbol || categoryIcons[campaign.category] || '♡'}</span>
        <span className="campaign-art__tag">{campaign.category}</span>
      </Link>
      <div className="campaign-card__body">
        <div className="campaign-card__meta">
          <span className={`status-dot ${completed ? 'status-dot--done' : ''}`}>{completed ? 'Завершено' : 'Активний збір'}</span>
          {campaign.verified && <span className="verified">✓ Перевірено</span>}
        </div>
        <h3><Link to={`/items/${campaign.id}`}>{campaign.title}</Link></h3>
        <p>{campaign.shortDescription || campaign.description}</p>
        <ProgressBar collected={campaign.collectedAmount} goal={campaign.goalAmount} compact />
        <div className="campaign-card__bottom">
          <span>Ціль <b>{formatMoney(campaign.goalAmount)}</b></span>
          <Link className="text-link" to={`/items/${campaign.id}`}>Детальніше <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </article>
  );
}
