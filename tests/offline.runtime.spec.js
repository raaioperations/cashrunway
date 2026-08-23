import { test, expect } from '@playwright/test';

async function setInput(page, selector, value) {
  await page.locator(selector).fill(value);
  await page.locator(selector).dispatchEvent('change');
}

async function addEvent(page, { name, direction, kind, frequency, amount, date, startDate }) {
  await page.locator('#eventName').fill(name);
  await page.locator('#eventDirection').selectOption(direction);
  await page.locator('#eventKind').selectOption(kind);
  await page.locator('#eventAmount').fill(amount);
  if (kind === 'recurring') {
    await page.locator('#frequency').selectOption(frequency);
    await page.locator('#eventStartDate').fill(startDate);
  } else {
    await page.locator('#eventDate').fill(date);
  }
  await page.locator('button[type="submit"]').click();
}

test('CR-OFFLINE-001 preserves the controlled CashRunway workflow offline', async ({ page, context }) => {
  await page.goto('./');
  await page.evaluate(async () => { await navigator.serviceWorker.ready; });
  if (!(await page.evaluate(() => Boolean(navigator.serviceWorker.controller)))) {
    await page.reload();
  }
  const onlineCacheState = await page.evaluate(async () => ({
    controlled: Boolean(navigator.serviceWorker.controller),
    registered: (await navigator.serviceWorker.getRegistrations()).some(registration => Boolean(registration.active)),
    caches: await caches.keys(),
    shellCached: Boolean(await caches.match('./index.html'))
  }));
  expect(onlineCacheState.controlled).toBe(true);
  expect(onlineCacheState.registered).toBe(true);
  expect(onlineCacheState.caches).toContain('cashrunway-v1');
  expect(onlineCacheState.shellCached).toBe(true);

  await setInput(page, '#startingCash', '10000');
  await setInput(page, '#safetyThreshold', '2500');
  await setInput(page, '#forecastStart', '2026-09-01');
  await setInput(page, '#forecastEnd', '2027-02-28');
  await addEvent(page, { name: 'Client Revenue', direction: 'in', kind: 'recurring', frequency: 'monthly', amount: '4000', startDate: '2026-09-01' });
  await addEvent(page, { name: 'Operating Expenses', direction: 'out', kind: 'recurring', frequency: 'monthly', amount: '5500', startDate: '2026-09-01' });
  await addEvent(page, { name: 'Equipment Purchase', direction: 'out', kind: 'oneTime', amount: '2000', date: '2026-11-15' });
  await expect(page.locator('#metrics')).toContainText('153 days');
  await expect(page.locator('#status')).toHaveText('Saved locally');

  await context.setOffline(true);
  expect(await page.evaluate(() => navigator.onLine)).toBe(false);
  await page.reload({ waitUntil: 'domcontentloaded' });
  await expect(page).toHaveTitle('CashRunway');
  await expect(page.locator('#chart svg')).toBeVisible();
  await expect(page.locator('#metrics')).toContainText('153 days');
  await expect(page.locator('#eventList')).toContainText('Client Revenue');

  await setInput(page, '#startingCash', '9000');
  await expect(page.locator('#status')).toHaveText('Saved locally');
  await expect(page.locator('#metrics')).toContainText('-$2,000.00');
  await page.reload({ waitUntil: 'domcontentloaded' });
  await expect(page.locator('#startingCash')).toHaveValue('9000.00');
  await expect(page.locator('#metrics')).toContainText('-$2,000.00');
  await context.setOffline(false);
  expect(await page.evaluate(() => navigator.onLine)).toBe(true);
});
