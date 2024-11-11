import { test } from '../pages/mypost-fixture';

test('Login to mypost', async ({ myPostPage, luxIdPage }) => {
  await myPostPage.goToLogin();
  await luxIdPage.connectToLuxID();
  await myPostPage.validateDashboard();
});