import { Page } from "@playwright/test"

export async function typePassword(page: Page) {
  const password = process.env.POST_PW || '';
  const encodedPassword = Buffer.from(password).toString('base64');

  await page.evaluate((encodedPw: string) => {
    (window as {tempPassword?: string }).tempPassword = encodedPw; // Store it in a global variable
  }, encodedPassword);

  // Access the encoded password and decode it in the browser context
  await page.evaluate(() => {
    const passwordInput = document.querySelector<HTMLInputElement>('#passwordInput');
    const encodedPassword = (window as { tempPassword?: string }).tempPassword; // Access the global variable

    if (passwordInput && encodedPassword) {
      // Decode the Base64 encoded password
      const password = atob(encodedPassword);
      passwordInput.value = password;

      // Create and dispatch the input event
      const event = new Event('input', { bubbles: true });
      passwordInput.dispatchEvent(event);
    }

    // Clean up the global variable
    delete (window as { tempPassword?: string }).tempPassword;
  });
}
