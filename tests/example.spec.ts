import { test, expect } from '../pages/mypost-fixture';

test('Login to mypost', async ({ myPostPage, luxIdPage }) => {
  await myPostPage.consoleListener();

  await myPostPage.goToLogin();
  await luxIdPage.connectToLuxID();
  await myPostPage.validateDashboard();

  expect.soft(myPostPage.errorLogs.length).toBeLessThan(10)
});