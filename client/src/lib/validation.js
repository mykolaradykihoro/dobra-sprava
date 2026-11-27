export function validateContact(values) {
  const errors = {};
  const name = String(values.name || '').trim();
  const email = String(values.email || '').trim();
  const phone = String(values.phone || '').trim();
  const message = String(values.message || '').trim();

  if (name.length < 2) errors.name = 'Вкажіть ім’я (не менше 2 символів).';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Введіть коректну електронну адресу.';
  if (phone && !/^\+380\d{9}$/.test(phone)) errors.phone = 'Формат телефону: +380XXXXXXXXX.';
  if (message.length < 10) errors.message = 'Повідомлення має містити щонайменше 10 символів.';
  if (!values.consent) errors.consent = 'Потрібна згода на обробку звернення.';
  return errors;
}
