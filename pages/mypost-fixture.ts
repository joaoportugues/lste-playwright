import { test as base } from '@playwright/test';
import { MyPostPage } from './mypost-page';
import { LuxIdPage } from './luxid-page';

// Declare the types of your fixtures.
type MyPostFixture = {
  myPostPage: MyPostPage;
  luxIdPage: LuxIdPage;
};

export const test = base.extend<MyPostFixture>({
  myPostPage: async ({ page }, use) => {
    // Set up the fixture
    await use(new MyPostPage(page));
  },
  luxIdPage: async ({ page }, use) => {
    await use(new LuxIdPage(page));
  }
});
export { expect } from '@playwright/test';