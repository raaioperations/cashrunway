export function parseMoneyToCents(value) {
  const text = String(value ?? '').trim();
  if (!/^\d+(?:\.\d{1,2})?$/.test(text)) throw new Error('Enter a positive amount in dollars and cents.');
  const [whole, fraction = ''] = text.split('.');
  const cents = Number(whole) * 100 + Number((fraction + '00').slice(0, 2));
  if (!Number.isSafeInteger(cents) || cents <= 0) throw new Error('Amount must be a positive safe integer number of cents.');
  return cents;
}

export function formatMoney(cents) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', signDisplay: cents < 0 ? 'auto' : 'auto' }).format(cents / 100);
}

export function centsToInput(cents) { return (cents / 100).toFixed(2); }
