import { expect, Locator, Page, test } from '@playwright/test';

export class MyPostPage {
    readonly acceptCookies: Locator;
    readonly acceptCookiesBad: Locator;
    readonly acceptCookiesCss: Locator;
    readonly acceptCookiesId: Locator;
    readonly connectBtn: Locator;
    readonly acceptMyPostCookies: Locator;
    readonly firstTile: Locator;
    readonly page: Page
    errorLogs: { message: string }[];


    constructor(page: Page) {
        this.page = page;
        this.acceptCookies = this.page.getByRole('button', { name: 'Ok, j’accepte' });
        this.connectBtn = this.page.getByLabel('Je me connecte à mon compte');
        this.acceptCookiesBad = this.page.getByRole('button', { name: 'Ok, j’acsdsdfdzhgsdcepte' });
        this.acceptCookiesCss = this.page.locator('#onetrust-accept-btn-handler');
        this.acceptCookiesId = this.page.locator('id=onetrust-accept-btn-handler');
        this.acceptMyPostCookies = this.page.getByRole('button', { name: 'Ok, j’accepte' });
        this.firstTile = this.page.locator('span').filter({ hasText: /^Achetez et imprimez vos affranchissements depuis chez vous !$/ });
        this.errorLogs = []
    }

    public async goToLogin() {
        await test.step('Go to LuxId Login', async () => {
            await this.page.goto('/');
            await this.acceptCookies.click();
            await this.connectBtn.click();
        })
    }

    public async validateDashboard() {
        await test.step('Validate dashboard', async () => {

            //await expect(async () => {
            await this.acceptMyPostCookies.click();
            await expect(this.firstTile).toBeVisible();
            //}).toPass();
        });
    }
}