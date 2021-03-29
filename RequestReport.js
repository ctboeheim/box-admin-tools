#!/usr/bin/env node

// Log into Box and fire off a request for a Collaboration report

const { chromium } = require('playwright');
const { exec } = require('child_process');

var cred;

// Get credentials from a credential manager.

exec('/csm/scripts/cred boxmanager', (err, stdout, stderr) => {
  if (err) {
    console.error('Cannot get credential: %s', stderr);
    process.exit;
  }
  cred = JSON.parse(stdout);
});

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
  await page.fill('input[name="netid"]', cred.username);
  await page.fill('input[name="password"]', cred.password);

  await Promise.all([
    page.waitForNavigation(),
    page.click('input[alt="Login"]')
  ]);

  // The user should have its Box home page set to the Admin console.
  // If not, there is additional navigation to insert here.
  await page.click('text=Reports');

  await page.click('text=Create Report');

  await page.click('text=CollaborationsCollaborationsExport a current snapshot of user permissions on all >> button');

  await Promise.all([
    page.waitForNavigation(),
    page.click('button:has-text("Export")')
  ]);

  // ---------------------
  await context.close();
  await browser.close();
})();
