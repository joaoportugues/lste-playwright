import { test, expect } from '../pages/mypost-fixture';

test('Login to mypost', async ({ page, myPostPage }) => {
  await myPostPage.goto('https://www.mypost.lu/myaccount-web/dashboard');
  await page.waitForLoadState('networkidle')
  await myPostPage.compareScreenshots();

  expect.soft(myPostPage.errorLogs.length).toBeLessThan(10)
});