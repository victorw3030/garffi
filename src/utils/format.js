export function formatMoney(amount, currency = 'ARS', locale = 'es-AR') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(dateStr, locale = 'es-AR') {
  const d = new Date(dateStr + 'T12:00:00')
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d)
}

export function formatPercent(value) {
  return `${Math.round(value)}%`
}
