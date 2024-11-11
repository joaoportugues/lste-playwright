import { expect, Locator, Page, test } from '@playwright/test';
import fs from 'fs';

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
            await this.page.waitForLoadState('networkidle')
            await this.page.mouse.move(0, 0);
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

    public async compareScreenshots() {
        await test.step('Validate dashboard screenshot', async () => {
            // Default threshold 0.2 for acceptable perceived color difference in the YIQ color space
            // Possible to configure maxDiffPixelRatio and maxDiffPixels for some flexibility
            await this.page.waitForLoadState('networkidle');
            expect.soft(await this.page.screenshot()).toMatchSnapshot('dashboard.png');
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

    public async interceptMe() {
        await this.page.route('**/services/myaccount-web-api/me', async route => {
            const response = await this.page.request.fetch(route.request());
            const jsonData = await fs.promises.readFile('responses/myaccount-web-api-me.json', 'utf8');

            await route.fulfill({
                response,
                body: JSON.stringify(
                    jsonData
                ),
            });
        })
    }

    public async saveState(){
        await this.page.context().storageState( {path: 'auth/user.json'})
      }

    public async goto(url: string) {
        await this.page.goto(url);
    }
}