import { test, expect } from '@playwright/test';
import { writeFile } from 'node:fs/promises';

async function setInput(page, selector, value) { await page.locator(selector).fill(value); await page.locator(selector).dispatchEvent('change'); }
async function addEvent(page, event) {
  await page.locator('#eventName').fill(event.name); await page.locator('#eventDirection').selectOption(event.direction); await page.locator('#eventKind').selectOption(event.kind); await page.locator('#eventAmount').fill(event.amount);
  if (event.kind === 'recurring') { await page.locator('#frequency').selectOption(event.frequency); await page.locator('#eventStartDate').fill(event.startDate); } else await page.locator('#eventDate').fill(event.date);
  await page.locator('button[type="submit"]').click();
}

test('production purposeful demonstration covers forecast, persistence, scenarios, portability, and responsive layout', async ({ page }) => {
  const validCsv = test.info().outputPath('valid.csv');
  const invalidCsv = test.info().outputPath('invalid.csv');
  await writeFile(validCsv, 'name,direction,kind,amount,date,frequency,start_date,end_date\nBonus,in,oneTime,100.00,2026-12-15,,,\n');
  await writeFile(invalidCsv, 'name,direction,kind,amount,date,frequency,start_date,end_date\nBroken,out,oneTime,not-money,2026-12-15,,,\n');
  await page.goto('./', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForFunction(async () => (await navigator.serviceWorker.getRegistrations()).some(registration => Boolean(registration.active)), null, { timeout: 10000 });
  await expect(page.locator('#startingCash')).toBeVisible();
  await setInput(page, '#startingCash', '10000'); await setInput(page, '#safetyThreshold', '2500'); await setInput(page, '#forecastStart', '2026-09-01'); await setInput(page, '#forecastEnd', '2027-02-28');
  await addEvent(page, { name: 'Client Revenue', direction: 'in', kind: 'recurring', frequency: 'monthly', amount: '4000', startDate: '2026-09-01' });
  await addEvent(page, { name: 'Operating Expenses', direction: 'out', kind: 'recurring', frequency: 'monthly', amount: '5500', startDate: '2026-09-01' });
  await addEvent(page, { name: 'Equipment Purchase', direction: 'out', kind: 'oneTime', amount: '2000', date: '2026-11-15' });
  await expect(page.locator('#status')).toHaveText('Saved locally'); await expect(page.locator('#metrics')).toContainText('153 days');
  await page.reload(); await expect(page.locator('#metrics')).toContainText('-$1,000.00');
  await page.locator('#duplicateScenario').click(); await addEvent(page, { name: 'Alternative Expense', direction: 'out', kind: 'oneTime', amount: '100', date: '2026-10-15' });
  await expect(page.locator('#metrics')).toContainText('-$1,100.00'); await page.locator('#scenarioSelect').selectOption({ label: 'Base' }); await expect(page.locator('#metrics')).toContainText('-$1,000.00');
  page.once('dialog', dialog => dialog.accept()); await page.locator('#importFile').setInputFiles(validCsv); await expect(page.locator('#eventList')).toContainText('Bonus');
  await page.locator('#importFile').setInputFiles(invalidCsv); await expect(page.locator('#status')).toContainText('Import rejected'); await expect(page.locator('#eventList')).not.toContainText('Broken');
  const downloadPromise = page.waitForEvent('download'); await page.locator('#backup').click(); const download = await downloadPromise; const backupPath = test.info().outputPath(download.suggestedFilename()); await download.saveAs(backupPath);
  page.once('dialog', dialog => dialog.accept()); await page.locator('#restoreFile').setInputFiles(backupPath); await expect(page.locator('#status')).toContainText('Backup restored');
  await page.setViewportSize({ width: 390, height: 844 }); await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
  await page.setViewportSize({ width: 1280, height: 900 }); await expect(page.locator('#chart svg')).toBeVisible();
});
