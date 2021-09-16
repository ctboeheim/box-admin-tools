#!/usr/bin/env node

// Log into Box and fire off a request for a Collaboration report

const { chromium } = require('playwright');
const { execSync } = require('child_process');

const cred = JSON.parse(execSync('/csm/scripts/cred boxmanager'));

process.exit;

// Launch the browser

(async () => {
  const browser = await chromium.launch({
    headless: true
  });
  const context = await browser.newContext();
  const page    = await context.newPage();

  // Go to Box login page for domain
  await page.goto(cred.hostname);

  // Press the annoying Continue button
  await Promise.all([
    page.waitForNavigation(),
    page.click('button:has-text("Continue")')
  ]);

  // Site-specific login, will vary depending on your SSO screen.
  await page.fill('input[id="username"]', cred.username);
  await page.fill('input[id="password"]', cred.password);

  await Promise.all([
    page.waitForNavigation(),
    page.click('input[value="Login"]')
  ]);

  // The user should have its Box home page set to the Admin console.
  // If not, there is additional navigation to insert here.
  await page.click('text=Reports');

  await page.click('text=Create Report');

  await page.click('text=CollaborationsCollaborationsExport a current snapshot of user permissions on all >> button');

  await Promise.all([
    page.waitForNavigation(),
    page.click('div.modal-actions button.btn-primary')
  ]);

  // ---------------------
  await context.close();
  await browser.close();
})();
