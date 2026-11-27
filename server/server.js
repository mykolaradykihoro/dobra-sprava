import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { randomUUID } from 'node:crypto';
import { readCampaigns, writeCampaigns, readMessages, writeMessages } from './src/store.js';
import { validateCampaign, validateContact } from './src/validation.js';

dotenv.config();
const app = express();
const PORT = Number(process.env.PORT) || 3001;
const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: allowedOrigin === '*' ? true : allowedOrigin }));
app.use(express.json({ limit: '100kb' }));
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  console.info(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'dobra-sprava-api', demo: true }));

app.get('/api/items', async (_req, res, next) => {
  try { res.json(await readCampaigns()); } catch (error) { next(error); }
});

app.get('/api/items/:id', async (req, res, next) => {
  try {
    const items = await readCampaigns();
    const item = items.find((campaign) => campaign.id === req.params.id);
    if (!item) return res.status(404).json({ message: 'Збір не знайдено.' });
    return res.json(item);
  } catch (error) { return next(error); }
});

app.post('/api/items', async (req, res, next) => {
  try {
    const errors = validateCampaign(req.body);
    if (errors.length) return res.status(400).json({ message: 'Перевірте дані збору.', errors });
    const now = new Date().toISOString();
    const item = {
      id: randomUUID(), title: req.body.title.trim(), goalAmount: Number(req.body.goalAmount),
      collectedAmount: Number(req.body.collectedAmount || 0), description: req.body.description.trim(),
      shortDescription: String(req.body.shortDescription || req.body.description).trim().slice(0, 160),
      category: req.body.category.trim(), status: req.body.status || 'active', reports: Array.isArray(req.body.reports) ? req.body.reports : [],
      organizer: String(req.body.organizer || 'Команда ініціативи'), theme: req.body.theme || 'green', symbol: req.body.symbol || '♡',
      verified: Boolean(req.body.verified), createdAt: now, updatedAt: now,
    };
    const items = await readCampaigns(); items.unshift(item); await writeCampaigns(items);
    return res.status(201).json(item);
  } catch (error) { return next(error); }
});

app.put('/api/items/:id', async (req, res, next) => {
  try {
    const items = await readCampaigns();
    const index = items.findIndex((campaign) => campaign.id === req.params.id);
    if (index < 0) return res.status(404).json({ message: 'Збір не знайдено.' });
    const updated = { ...items[index], ...req.body, id: items[index].id, updatedAt: new Date().toISOString() };
    const errors = validateCampaign(updated);
    if (errors.length) return res.status(400).json({ message: 'Перевірте дані збору.', errors });
    updated.goalAmount = Number(updated.goalAmount); updated.collectedAmount = Number(updated.collectedAmount);
    items[index] = updated; await writeCampaigns(items);
    return res.json(updated);
  } catch (error) { return next(error); }
});

app.delete('/api/items/:id', async (req, res, next) => {
  try {
    const items = await readCampaigns();
    const nextItems = items.filter((campaign) => campaign.id !== req.params.id);
    if (nextItems.length === items.length) return res.status(404).json({ message: 'Збір не знайдено.' });
    await writeCampaigns(nextItems);
    return res.status(204).end();
  } catch (error) { return next(error); }
});

// Навчальна симуляція: не проводить оплату та не створює платіжних транзакцій.
app.post('/api/items/:id/donations', async (req, res, next) => {
  try {
    const amount = Number(req.body.amount);
    if (!Number.isFinite(amount) || amount < 1 || amount > 100000) return res.status(400).json({ message: 'Сума має бути від 1 до 100 000 грн.' });
    const items = await readCampaigns();
    const item = items.find((campaign) => campaign.id === req.params.id);
    if (!item) return res.status(404).json({ message: 'Збір не знайдено.' });
    if (item.status !== 'active') return res.status(400).json({ message: 'Цей збір наразі не приймає демонстраційні внески.' });
    item.collectedAmount = Number(item.collectedAmount) + amount;
    item.updatedAt = new Date().toISOString();
    await writeCampaigns(items);
    return res.status(200).json({ demo: true, collectedAmount: item.collectedAmount, message: 'Тестову суму додано. Реальний платіж не здійснювався.' });
  } catch (error) { return next(error); }
});

app.post('/api/contact', async (req, res, next) => {
  try {
    const errors = validateContact(req.body);
    if (errors.length) return res.status(400).json({ message: 'Форма містить помилки.', errors });
    const messages = await readMessages();
    const record = {
      id: randomUUID(), name: req.body.name.trim(), email: req.body.email.trim(),
      phone: String(req.body.phone || '').trim(), topic: String(req.body.topic || 'Інше'),
      message: req.body.message.trim(), createdAt: new Date().toISOString(),
    };
    messages.push(record); await writeMessages(messages);
    return res.status(201).json({ message: 'Звернення збережено.', id: record.id });
  } catch (error) { return next(error); }
});

app.use((_req, res) => res.status(404).json({ message: 'Маршрут API не знайдено.' }));
app.use((error, _req, res, _next) => {
  console.error(error);
  if (error instanceof SyntaxError && 'body' in error) return res.status(400).json({ message: 'Некоректний JSON у запиті.' });
  return res.status(500).json({ message: 'Внутрішня помилка сервера.' });
});

app.listen(PORT, () => console.info(`Добра Справа API: http://localhost:${PORT}`));
