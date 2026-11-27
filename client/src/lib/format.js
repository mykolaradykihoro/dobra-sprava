export function formatMoney(value) {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency', currency: 'UAH', maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}

export function getProgress(collectedAmount, goalAmount) {
  const goal = Number(goalAmount) || 0;
  if (goal <= 0) return 0;
  return Math.min(100, Math.round((Number(collectedAmount || 0) / goal) * 100));
}

export function formatDate(value) {
  if (!value) return '';
  return new Intl.DateTimeFormat('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value));
}
