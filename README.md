# Добра Справа — навчальний вебзастосунок для волонтерських зборів

Навчальний проєкт за варіантом № 21 дисципліни «WEB-технології та WEB-дизайн».

> **Важливо:** кампанії та суми в цьому проєкті демонстраційні. Форма «Підтримати» лише змінює тестові дані локального API. Вона не приймає оплату, не переказує кошти та не є реальною благодійною платформою.

## Можливості

- Головна сторінка, каталог, сторінка деталей збору та контакти.
- Пошук із debounce 300 мс, категорії, статуси та сортування.
- Динамічний прогрес-бар (зібрана сума / ціль) — обов'язкова функція варіанта № 21.
- Історія звітів про витрати кожної кампанії.
- Демонстраційна дія підтримки з оновленням тестової суми на сервері.
- Контактна форма з клієнтською та серверною валідацією.
- Світла/темна тема, мобільна навігація, адаптивна сітка, стани loading/error/empty.
- React Router, Express REST API з CRUD, JSON-файлове сховище.
- PWA manifest і service worker для кешування оболонки сайту.
- Автоматизовані тести на Vitest і React Testing Library.

## Стек

React, Vite, React Router, JavaScript ES modules, CSS3, Tailwind CSS (utility-приклад у компонентах каталогу), Node.js, Express, CORS, dotenv, Vitest, React Testing Library.

## Структура

```text
client/                 React + Vite
  public/                manifest, service worker, SEO-файли, іконки
  src/components/        повторно використовувані компоненти
  src/pages/             Home, Catalog, CampaignDetails, Contacts, 404
  src/hooks/             useCampaigns
  src/lib/               API, форматування, валідація
  src/test/              автоматизовані тести
server/                 Express REST API
  data/                  демонстраційні кампанії та повідомлення
  src/                   сховище та валідація
  server.js              маршрути, middleware, запуск
 docs/                   ТЗ, UX, API, AI, аудит
```

## Запуск локально

Потрібен Node.js 20 або новіший.

**1. Сервер API**

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

API працює на `http://localhost:3001`. Перевірка: `http://localhost:3001/api/health`.

**2. Клієнт (у другому терміналі)**

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

Відкрийте адресу, показану Vite (типово `http://localhost:5173`). Клієнт звертається до API через `VITE_API_URL`; локальне значення — `http://localhost:3001/api`.

**3. Перевірка**

```bash
cd client
npm test
npm run build
```

## API

Повний перелік маршрутів, форматів запитів і кодів відповіді — у [`docs/API.md`](docs/API.md).

## Дані й безпека

Демонстраційні кампанії зберігаються у `server/data/campaigns.json`. Контактні повідомлення — у `server/data/messages.json`. Це спрощене файлове сховище для навчальної роботи, а не production-БД. Не додавайте справжні персональні дані чи платіжні реквізити. Файл `.env` виключений із Git.

## Перед здачею практики

1. Запустити проєкт і перевірити його на ширинах 360, 768 та 1280 px.
2. Зробити власні скриншоти браузера, W3C Validator, Network, Lighthouse та axe DevTools.
3. Створити публічний GitHub-репозиторій, Issues, Pull Requests, теги й щонайменше 30 осмислених комітів.
4. Створити wireframe та макети у Figma, додати фактичне посилання у звіт.
5. Опублікувати frontend і backend, оновити URL у README та звіті.

Ці зовнішні дії не виконуються автоматично під час локального створення проєкту.
