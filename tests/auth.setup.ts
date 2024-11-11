import { test as setup } from '../pages/mypost-fixture';

setup('Login to mypost and save storage state', async ({ myPostPage, luxIdPage }) => {
    await myPostPage.goToLogin();
    await luxIdPage.connectToLuxID();
    await myPostPage.validateDashboard();
    await myPostPage.saveState();
});