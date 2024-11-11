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

    public async consoleListener() {
        await test.step('Validate no console errors', async () => {
            this.page.on('console', (message) => {
                if (message.type() === 'error') {
                    this.errorLogs.push({ message: message.text() });
                }
            });
        })
    }

    public async compareScreenshots(){
        await test.step('Validate dashboard screenshot', async () => {
          // Default threshold 0.2 for acceptable perceived color difference in the YIQ color space
          // Possible to configure maxDiffPixelRatio and maxDiffPixels for some flexibility
          // expect(await this.page.screenshot()).toMatchSnapshot('dashboard.png');
          // expect(await this.page.locator('.pt-overlay').first().screenshot()).toMatchSnapshot('first-tile.png');
          await this.page.screenshot({ 
            path: 'tests/example.spec.ts-snapshots/masked.png', 
            mask: [this.page.locator('.pt-overlay').first()],
            maskColor: '#000000',
          });
        });
      }

    public async compareScreenshotElement() {
        await test.step('Validate element screenshot', async () => {
            expect.soft(await this.page.locator('.pt-overlay').first().screenshot()).toMatchSnapshot('first-tile.png');
        });
    }
}