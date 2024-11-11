import { test, expect } from '@playwright/test';
import { typePassword } from './type-password';

test('test', async ({ page }) => {
  await page.goto('https://www.post.lu/particuliers/mypost?TAM_OP=login&METHOD=GET&URL=https%3A%2F%2Fwww.mypost.lu%2Fmyaccount-web%2F&AUTHNLEVEL=');
  await page.getByRole('button', { name: 'Ok, j’accepte' }).click();
  await page.getByLabel('Je me connecte à mon compte').click();
  await page.getByPlaceholder('joanna.schmidt@pt.lu').click();
  await page.getByPlaceholder('joanna.schmidt@pt.lu').fill('joao.portugues@post.lu');
  await page.getByRole('button', { name: 'Connexion' }).click();
  await page.getByPlaceholder('mot de passe').click();
  await typePassword(page);
  await page.getByRole('button', { name: 'Connexion avec mot de passe' }).click();
  await page.getByRole('button', { name: 'Ok, j’accepte' }).click();
  await expect(page.locator('span').filter({ hasText: /^Achetez et imprimez vos affranchissements depuis chez vous !$/ })).toBeVisible();
});