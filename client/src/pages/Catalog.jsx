import React, { useEffect, useMemo, useState } from 'react';
import { useCampaigns } from '../hooks/useCampaigns.js';
import CampaignList from '../components/CampaignList.jsx';
import Button from '../components/Button.jsx';

export default function Catalog() {
  const { campaigns, loading, error } = useCampaigns();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [category, setCategory] = useState('Усі категорії');
  const [status, setStatus] = useState('Усі статуси');
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(query.trim().toLocaleLowerCase('uk-UA')), 300);
    return () => window.clearTimeout(timer);
  }, [query]);

  const categories = useMemo(() => ['Усі категорії', ...new Set(campaigns.map((item) => item.category))], [campaigns]);
  const filtered = useMemo(() => {
    const result = campaigns.filter((item) => {
      const matchesText = `${item.title} ${item.description} ${item.category}`.toLocaleLowerCase('uk-UA').includes(debouncedQuery);
      const matchesCategory = category === 'Усі категорії' || item.category === category;
      const matchesStatus = status === 'Усі статуси' || item.status === status;
      return matchesText && matchesCategory && matchesStatus;
    });
    return result.sort((a, b) => {
      if (sort === 'progress') return (b.collectedAmount / b.goalAmount) - (a.collectedAmount / a.goalAmount);
      if (sort === 'goal') return b.goalAmount - a.goalAmount;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [campaigns, debouncedQuery, category, status, sort]);

  const reset = () => { setQuery(''); setCategory('Усі категорії'); setStatus('Усі статуси'); setSort('newest'); };

  return (
    <>
      <section className="page-hero page-hero--catalog"><div className="container page-hero-inner"><div className="eyebrow">КАТАЛОГ ІНІЦІАТИВ</div><h1>Знайдіть справу,<br /><em>яка відгукується.</em></h1><p>Переглядайте ініціативи, стежте за ходом збору та знайомтеся зі звітами про витрати.</p><div className="page-hero-meta"><span>✳ {campaigns.length || '—'} ініціатив</span><span>↗ Прогрес у реальному часі API</span></div></div><div className="page-hero-shape" aria-hidden="true">♡</div></section>
      <section className="section catalog-section"><div className="container">
        <div className="catalog-toolbar">
          <div className="search-box"><span aria-hidden="true">⌕</span><label className="sr-only" htmlFor="campaign-search">Пошук зборів</label><input id="campaign-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Знайти ініціативу…" /></div>
          <div className="filter-group"><label htmlFor="category-filter">Категорія</label><select id="category-filter" value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select></div>
          <div className="filter-group"><label htmlFor="status-filter">Статус</label><select id="status-filter" value={status} onChange={(event) => setStatus(event.target.value)}><option value="Усі статуси">Усі статуси</option><option value="active">Активні</option><option value="completed">Завершені</option><option value="paused">На паузі</option></select></div>
          <div className="filter-group"><label htmlFor="sort-filter">Сортувати</label><select id="sort-filter" value={sort} onChange={(event) => setSort(event.target.value)}><option value="newest">Найновіші</option><option value="progress">За прогресом</option><option value="goal">За ціллю</option></select></div>
          <Button variant="ghost" onClick={reset}>Скинути ↺</Button>
        </div>
        <div className="catalog-result-line flex items-center justify-between gap-3"><span>{loading ? 'Завантаження…' : `Знайдено: ${filtered.length}`}</span><span>Оновлення даних із REST API</span></div>
        <CampaignList campaigns={filtered} loading={loading} error={error} />
      </div></section>
    </>
  );
}
