export function validateCampaign(payload = {}) {
  const errors = [];
  if (typeof payload.title !== 'string' || payload.title.trim().length < 5) errors.push('Назва має містити щонайменше 5 символів.');
  if (!Number.isFinite(Number(payload.goalAmount)) || Number(payload.goalAmount) <= 0) errors.push('Цільова сума має бути додатним числом.');
  if (payload.collectedAmount !== undefined && (!Number.isFinite(Number(payload.collectedAmount)) || Number(payload.collectedAmount) < 0)) errors.push('Зібрана сума не може бути від’ємною.');
  if (typeof payload.description !== 'string' || payload.description.trim().length < 15) errors.push('Опис має містити щонайменше 15 символів.');
  if (typeof payload.category !== 'string' || !payload.category.trim()) errors.push('Категорія є обов’язковою.');
  if (payload.status !== undefined && !['active', 'completed', 'paused'].includes(payload.status)) errors.push('Невідомий статус кампанії.');
  return errors;
}

export function validateContact(payload = {}) {
  const errors = [];
  if (typeof payload.name !== 'string' || payload.name.trim().length < 2) errors.push('Ім’я має містити щонайменше 2 символи.');
  if (typeof payload.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim())) errors.push('Вкажіть коректну електронну адресу.');
  if (payload.phone && !/^\+380\d{9}$/.test(payload.phone.trim())) errors.push('Телефон має бути у форматі +380XXXXXXXXX.');
  if (typeof payload.message !== 'string' || payload.message.trim().length < 10) errors.push('Повідомлення має містити щонайменше 10 символів.');
  if (payload.consent !== true) errors.push('Потрібна згода на обробку звернення.');
  return errors;
}
