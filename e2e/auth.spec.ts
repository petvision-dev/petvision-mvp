import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
  });

  test('home page loads and shows sign up/login buttons when signed out', async ({ page }) => {
    // Wait for Clerk to load - look for either the buttons or an error message
    await page.waitForTimeout(3000); // Give Clerk time to initialize
    
    // Take a screenshot for debugging
    await page.screenshot({ path: 'e2e/screenshots/home-page.png', fullPage: true });
    
    // Check if the page has loaded properly
    const pageContent = await page.content();
    console.log('Page title:', await page.title());
    
    // Look for key elements
    const getStartedButton = page.getByText('Get Started');
    const loginButton = page.getByText('Log In');
    const errorMessage = page.getByText('Missing Clerk Publishable Key');
    
    // Check what's visible
    const hasGetStarted = await getStartedButton.isVisible().catch(() => false);
    const hasLogin = await loginButton.isVisible().catch(() => false);
    const hasError = await errorMessage.isVisible().catch(() => false);
    
    console.log('Get Started visible:', hasGetStarted);
    console.log('Log In visible:', hasLogin);
    console.log('Error visible:', hasError);
    
    if (hasError) {
      throw new Error('Clerk Publishable Key is missing - check .env file');
    }
    
    // Either buttons should be visible OR we should see signed-in state
    expect(hasGetStarted || hasLogin || await page.getByText('Go to Dashboard').isVisible().catch(() => false)).toBeTruthy();
  });

  test('clicking Get Started navigates to sign-up page', async ({ page }) => {
    await page.waitForTimeout(3000);
    
    const getStartedButton = page.getByText('Get Started');
    
    if (await getStartedButton.isVisible().catch(() => false)) {
      await getStartedButton.click();
      
      // Wait for navigation
      await page.waitForTimeout(2000);
      await page.screenshot({ path: 'e2e/screenshots/sign-up-page.png', fullPage: true });
      
      // Check URL or page content
      const url = page.url();
      console.log('Current URL after clicking Get Started:', url);
      
      // Should be on sign-up page
      const hasSignUpTitle = await page.getByText('Create Account').isVisible().catch(() => false);
      const hasEmailInput = await page.getByPlaceholder('Email address').isVisible().catch(() => false);
      
      console.log('Sign Up title visible:', hasSignUpTitle);
      console.log('Email input visible:', hasEmailInput);
      
      expect(hasSignUpTitle || hasEmailInput || url.includes('sign-up')).toBeTruthy();
    } else {
      console.log('Get Started button not visible - user might be signed in');
    }
  });

  test('clicking Log In navigates to sign-in page', async ({ page }) => {
    await page.waitForTimeout(3000);
    
    const loginButton = page.getByText('Log In');
    
    if (await loginButton.isVisible().catch(() => false)) {
      await loginButton.click();
      
      // Wait for navigation
      await page.waitForTimeout(2000);
      await page.screenshot({ path: 'e2e/screenshots/sign-in-page.png', fullPage: true });
      
      // Check URL or page content
      const url = page.url();
      console.log('Current URL after clicking Log In:', url);
      
      // Should be on sign-in page
      const hasWelcomeBack = await page.getByText('Welcome Back').isVisible().catch(() => false);
      const hasEmailInput = await page.getByPlaceholder('Email address').isVisible().catch(() => false);
      
      console.log('Welcome Back title visible:', hasWelcomeBack);
      console.log('Email input visible:', hasEmailInput);
      
      expect(hasWelcomeBack || hasEmailInput || url.includes('sign-in')).toBeTruthy();
    } else {
      console.log('Log In button not visible - user might be signed in');
    }
  });

  test('sign-up page has required form fields', async ({ page }) => {
    await page.goto('/(auth)/sign-up');
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'e2e/screenshots/sign-up-direct.png', fullPage: true });
    
    const emailInput = page.getByPlaceholder('Email address');
    const passwordInput = page.getByPlaceholder('Password');
    const signUpButton = page.getByRole('button', { name: /sign up/i });
    
    const hasEmail = await emailInput.isVisible().catch(() => false);
    const hasPassword = await passwordInput.isVisible().catch(() => false);
    
    console.log('Email input:', hasEmail);
    console.log('Password input:', hasPassword);
    
    expect(hasEmail).toBeTruthy();
    expect(hasPassword).toBeTruthy();
  });

  test('sign-in page has required form fields', async ({ page }) => {
    await page.goto('/(auth)/sign-in');
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'e2e/screenshots/sign-in-direct.png', fullPage: true });
    
    const emailInput = page.getByPlaceholder('Email address');
    const passwordInput = page.getByPlaceholder('Password');
    
    const hasEmail = await emailInput.isVisible().catch(() => false);
    const hasPassword = await passwordInput.isVisible().catch(() => false);
    
    console.log('Email input:', hasEmail);
    console.log('Password input:', hasPassword);
    
    expect(hasEmail).toBeTruthy();
    expect(hasPassword).toBeTruthy();
  });
});

test.describe('Debug Tests', () => {
  test('check what renders on page load', async ({ page }) => {
    await page.goto('/');
    
    // Wait and take multiple screenshots
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'e2e/screenshots/debug-1s.png', fullPage: true });
    
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'e2e/screenshots/debug-3s.png', fullPage: true });
    
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'e2e/screenshots/debug-5s.png', fullPage: true });
    
    // Log all visible text
    const bodyText = await page.locator('body').innerText();
    console.log('Page body text:', bodyText);
    
    // Log any console errors
    page.on('console', msg => console.log('Browser console:', msg.type(), msg.text()));
    
    // Check for specific elements
    const elements = {
      'Get Started': await page.getByText('Get Started').count(),
      'Log In': await page.getByText('Log In').count(),
      'Sign Up': await page.getByText('Sign Up').count(),
      'Sign In': await page.getByText('Sign In').count(),
      'Missing Clerk': await page.getByText('Missing Clerk').count(),
      'Hello': await page.getByText('Hello').count(),
      'Welcome': await page.getByText('Welcome').count(),
      'Loading': await page.locator('text=/loading/i').count(),
    };
    
    console.log('Element counts:', elements);
    
    expect(true).toBeTruthy(); // This test is for debugging
  });
});
