import { test } from '@playwright/test';
import { MyPostPage } from '../pages/mypost-page';
import { LuxIdPage } from '../pages/luxid-page';

test('Login to mypost', async ({ page}) => {
  const myPostPage = new MyPostPage(page);
  const luxIdPage = new LuxIdPage(page);

    await myPostPage.goToLogin();
    await luxIdPage.connectToLuxID();
    await myPostPage.validateDashboard();
});