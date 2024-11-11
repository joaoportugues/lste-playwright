import { test } from '@playwright/test';
import { MyPostPage } from '../pages/mypost-page';
import { LuxIdPage } from '../pages/luxid-page';

test('Login to mypost', async ({ page}) => {
  const myPostPage = new MyPostPage(page);
  const luxIdPage = new LuxIdPage(page);


  await test.step('Go to LuxId Login', async () => {
    await myPostPage.goToLogin();
  })

  await test.step('Login to LuxId', async () => {
    await luxIdPage.connectToLuxID();
  })

  await test.step('Validate dashboard', async () => {
      await myPostPage.validateDashboard();
  })
});