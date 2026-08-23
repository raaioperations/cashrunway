import { addDays, addMonths, compareDates } from './dates.js';
export function occursOn(event, date) {
  if (event.kind === 'oneTime') return event.date === date;
  if (compareDates(date, event.startDate) < 0 || (event.endDate && compareDates(date, event.endDate) > 0)) return false;
  if (event.frequency === 'weekly' || event.frequency === 'biweekly') {
    const step = event.frequency === 'weekly' ? 7 : 14;
    const cursor = event.startDate;
    const diff = Math.round((Date.parse(`${date}T00:00:00Z`) - Date.parse(`${cursor}T00:00:00Z`)) / 86400000);
    return diff >= 0 && diff % step === 0;
  }
  if (event.frequency === 'monthly') {
    const [sy, sm] = event.startDate.split('-').map(Number); const [y, m] = date.split('-').map(Number);
    const months = (y - sy) * 12 + (m - sm); return months >= 0 && addMonths(event.startDate, months) === date;
  }
  return false;
}
