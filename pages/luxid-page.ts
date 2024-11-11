import { expect,  Locator,  Page } from '@playwright/test';
import { typePassword } from '../tests/type-password';


export class LuxIdPage {
    readonly email: Locator;
    readonly connect: Locator;
    readonly password: Locator;
    readonly connectWithPassword: Locator;
    readonly page: Page

    constructor(page: Page) {
        this.page = page
        this.email = this.page.getByPlaceholder('joanna.schmidt@pt.lu');
        this.connect = this.page.getByRole('button', { name: 'Connexion' });
        this.password = this.page.getByPlaceholder('mot de passe');
        this.connectWithPassword = this.page.getByRole('button', { name: 'Connexion avec mot de passe' });
    }

    public async connectToLuxID(){
        await this.email.click();
        await this.email.fill('joao.portugues@post.lu');
        await this.connect.click();
        await this.password.click()
        await typePassword(this.page);
        await this.connectWithPassword.click();
    }
}