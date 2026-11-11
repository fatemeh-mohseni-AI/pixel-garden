import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';
import { mockProfile } from './fixtures';

const plants = (page: Page) => page.getByRole('button', { name: /^Inspect / });
const landscape = (page: Page) =>
  page.getByRole('region', { name: 'Garden landscape' });
const lookup = (page: Page) =>
  page.getByRole('button', { name: 'Try Your Own' });
const field = (page: Page) =>
  page.getByRole('textbox', { name: 'GitHub username or profile URL' });

test('lands on an offline-ready example, with no API traffic or broken assets', async ({
  page,
}) => {
  const github: string[] = [];
  const broken: string[] = [];
  page.on('request', (request) => {
    if (request.url().includes('api.github.com')) github.push(request.url());
  });
  page.on('response', (response) => {
    if (response.status() >= 400) broken.push(response.url());
  });
  await page.route('https://api.github.com/**', (route) => route.abort());
  await page.goto('./');
  await expect(
    page.getByRole('heading', { name: 'Example garden' }),
  ).toBeVisible();
  await expect(plants(page)).toHaveCount(10);
  const favicon = await page.request.get('./sprout.svg');
  expect(favicon.ok()).toBe(true);
  expect(await favicon.text()).toContain('<svg');
  await page.evaluate(() => document.fonts.ready);
  expect(github).toEqual([]);
  expect(broken).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    await page.evaluate(() => innerWidth),
  );
  expect(await landscape(page).evaluate((el) => el.scrollWidth)).toBe(
    await landscape(page).evaluate((el) => el.clientWidth),
  );
});

test('manages dialog focus, validates input and grows a profile garden', async ({
  page,
}) => {
  await mockProfile(page, 'gardener', 1);
  await page.goto('./');
  await lookup(page).focus();
  await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog', { name: 'Grow your garden' });
  await expect(dialog).toBeVisible();
  await expect(field(page)).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(lookup(page)).toBeFocused();

  await lookup(page).click();
  await field(page).fill('github.com/gardener/private-repo');
  await field(page).press('Enter');
  await expect(dialog.getByRole('alert')).toContainText(
    'Enter a valid GitHub username',
  );
  await expect(field(page)).toBeFocused();
  await field(page).fill('https://github.com/Gardener/');
  await field(page).press('Enter');
  await expect(dialog).toBeHidden();
  await expect(lookup(page)).toBeFocused();
  await expect(page).toHaveURL(/\/pixel-garden\/\?user=gardener$/);
  await expect(page.getByRole('heading', { name: '@gardener' })).toBeVisible();
  await expect(plants(page)).toHaveCount(1);
  await page.reload();
  await expect(plants(page)).toHaveCount(1);
});

for (const [count, sections] of [
  [0, 1],
  [10, 1],
  [11, 2],
  [50, 5],
  [100, 10],
] as const) {
  test(`shows ${count} repositories in ${sections} contiguous sections`, async ({
    page,
  }) => {
    await mockProfile(page, 'gardener', count);
    await page.goto('./?user=gardener');
    await expect(
      page.getByRole('heading', { name: '@gardener' }),
    ).toBeVisible();
    await expect(plants(page)).toHaveCount(count);
    await expect(page.locator('[data-section]')).toHaveCount(sections);
    const size = await landscape(page).evaluate((el) => [
      el.clientWidth,
      el.scrollWidth,
    ]);
    expect(Math.abs(size[1]! - size[0]! * sections)).toBeLessThanOrEqual(
      sections / 2,
    );
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBe(await page.evaluate(() => innerWidth));
    if (count === 0)
      await expect(
        page.getByText('This profile has no public repositories yet.'),
      ).toBeVisible();
    if (count === 100)
      await expect(
        page.getByText('First 100 public repositories'),
      ).toBeVisible();
    if (sections > 1) {
      await landscape(page).focus();
      await page.keyboard.press('End');
      await expect
        .poll(() => landscape(page).evaluate((el) => el.scrollLeft))
        .toBe(size[1]! - size[0]!);
      await page.keyboard.press('Home');
      await expect
        .poll(() => landscape(page).evaluate((el) => el.scrollLeft))
        .toBe(0);
      await page.getByRole('button', { name: 'Next garden section' }).click();
      await expect
        .poll(() => landscape(page).evaluate((el) => el.scrollLeft))
        .toBe(size[0]);
    }
    if (count) {
      const overlaps = await plants(page).evaluateAll((elements) => {
        const rects = elements.map((element) =>
          element.getBoundingClientRect(),
        );
        return rects.some((a, i) =>
          rects
            .slice(i + 1)
            .some(
              (b) =>
                Math.min(a.right, b.right) > Math.max(a.left, b.left) &&
                Math.min(a.bottom, b.bottom) > Math.max(a.top, b.top),
            ),
        );
      });
      expect(overlaps).toBe(false);
    }
  });
}

test('lets keyboard focus reveal details and reach a safe repository link', async ({
  page,
}) => {
  await mockProfile(page, 'gardener', 50);
  await page.goto('./?user=gardener');
  const plant = page.getByRole('button', { name: 'Inspect garden-project-50' });
  await expect(plant).toBeAttached();
  await page.keyboard.press('Tab');
  await plant.focus();
  const details = page.getByRole('region', { name: 'garden-project-50' });
  await expect(details).toBeVisible();
  await expect
    .poll(() => landscape(page).evaluate((el) => el.scrollLeft))
    .toBeGreaterThan(0);
  await page.keyboard.press('Enter');
  await expect(details.getByRole('heading')).toBeFocused();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  const link = details.getByRole('link', { name: /View on GitHub/ });
  await expect(link).toBeFocused();
  await expect(link).toHaveAttribute(
    'href',
    'https://github.com/gardener/garden-project-50',
  );
  await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  await page.keyboard.press('Escape');
  await expect(details).toBeHidden();
  await expect(plant).toBeFocused();
});

test('supports native touch scrolling and tapping a plant', async ({
  page,
  context,
  isMobile,
}) => {
  test.skip(!isMobile, 'Touch emulation is enabled on the mobile project');
  await mockProfile(page, 'gardener', 50);
  await page.goto('./?user=gardener');
  await expect(plants(page)).toHaveCount(50);
  const cdp = await context.newCDPSession(page);
  const box = await landscape(page).boundingBox();
  if (!box) throw new Error('Garden viewport is missing');
  const y = Math.round(box.y + box.height / 3);
  const start = Math.round(box.x + box.width * 0.85);
  await cdp.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [{ x: start, y }],
  });
  for (let x = start - 26; x > box.x + 28; x -= 26) {
    await cdp.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [{ x, y }],
    });
  }
  await cdp.send('Input.dispatchTouchEvent', {
    type: 'touchEnd',
    touchPoints: [],
  });
  await expect
    .poll(() => landscape(page).evaluate((el) => el.scrollLeft))
    .toBeGreaterThan(100);
  await page.getByRole('button', { name: 'Inspect garden-project-20' }).tap();
  await expect(
    page.getByRole('region', { name: 'garden-project-20' }),
  ).toBeVisible();
});

for (const mode of ['missing', 'offline', 'rate-limited'] as const) {
  test(`keeps the example and reports a ${mode} profile lookup`, async ({
    page,
  }) => {
    await page.route(
      'https://api.github.com/users/gardener/repos?*',
      (route) => {
        if (mode === 'offline') return route.abort('internetdisconnected');
        return route.fulfill({
          status: mode === 'missing' ? 404 : 429,
          headers:
            mode === 'rate-limited'
              ? {
                  'retry-after': '60',
                  'access-control-expose-headers': 'retry-after',
                }
              : undefined,
          json: {},
        });
      },
    );
    await page.goto('./');
    await lookup(page).click();
    await field(page).fill('gardener');
    await field(page).press('Enter');
    const copy = {
      missing: 'Check the username',
      offline: 'Check your connection',
      'rate-limited': 'Try again after',
    };
    await expect(page.getByRole('alert')).toContainText(copy[mode]);
    await page.keyboard.press('Escape');
    await expect(
      page.getByRole('heading', { name: 'Example garden' }),
    ).toBeVisible();
  });
}

test('prevents duplicate submissions and cancels a slow lookup', async ({
  page,
}) => {
  let requests = 0;
  let release = () => {};
  const hold = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route(
    'https://api.github.com/users/gardener/repos?*',
    async (route) => {
      requests++;
      await hold;
      await route.fulfill({ json: [] }).catch(() => {});
    },
  );
  await mockProfile(page, 'octocat', 1);
  await page.goto('./');
  await lookup(page).click();
  await field(page).fill('gardener');
  await field(page).press('Enter');
  await expect(page.getByRole('button', { name: 'Growing…' })).toHaveAttribute(
    'aria-disabled',
    'true',
  );
  await field(page).press('Enter');
  await expect.poll(() => requests).toBe(1);
  await page.keyboard.press('Escape');
  await lookup(page).click();
  await field(page).fill('octocat');
  await field(page).press('Enter');
  await expect(page.getByRole('heading', { name: '@octocat' })).toBeVisible();
  release();
  await page.unrouteAll({ behavior: 'wait' });
  await expect(page.getByRole('heading', { name: '@octocat' })).toBeVisible();
});

test('disables motion and passes axe on the garden, details and dialog', async ({
  page,
  isMobile,
}) => {
  await page.goto('./');
  await expect(page.locator('.clouds')).toHaveCSS('animation-name', 'none');
  await expect(landscape(page)).toHaveCSS('scroll-behavior', 'auto');
  const audit = () =>
    new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
  expect((await audit()).violations).toEqual([]);
  const plant = plants(page).first();
  if (isMobile) await plant.tap();
  else await plant.click();
  await expect(page.locator('#plant-details')).toBeVisible();
  expect((await audit()).violations).toEqual([]);
  await lookup(page).click();
  await expect(field(page)).toBeFocused();
  expect((await audit()).violations).toEqual([]);
});

test('returns focus to the header after dismissing a retry from an invalid link', async ({
  page,
}) => {
  await page.goto('./?user=not_a_login');
  await expect(
    page
      .getByRole('main')
      .getByText('This link contains an invalid GitHub username.'),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Try again' }).click();
  await expect(field(page)).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(lookup(page)).toBeFocused();
  await expect(plants(page)).toHaveCount(10);
});
