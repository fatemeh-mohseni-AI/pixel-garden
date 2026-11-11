import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Locator, type Page } from '@playwright/test';
import { mockProfile } from './fixtures';

const night = (page: Page) => page.getByRole('button', { name: 'Night mode' });
const door = (page: Page) =>
  page.getByRole('button', { name: 'Open cottage door' });
const landscape = (page: Page) =>
  page.getByRole('region', { name: 'Garden landscape' });
const inspect = (page: Page, name: string) =>
  page.getByRole('button', { name: `Inspect ${name}`, exact: true });

function activate(control: Locator, isMobile: boolean) {
  return isMobile ? control.tap() : control.click();
}

test('changes the night palette and scenery in every section without moving the garden', async ({
  page,
  isMobile,
}) => {
  await mockProfile(page, 'gardener', 50);
  await page.goto('./?user=gardener');
  await expect(page.getByRole('heading', { name: '@gardener' })).toBeVisible();
  const sky = page.locator('svg.landscape stop:first-child');
  await expect(sky.first()).toHaveCSS('stop-color', 'rgb(151, 202, 219)');
  await expect(night(page)).toHaveAttribute('aria-pressed', 'false');
  await activate(night(page), isMobile);
  await expect(night(page)).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.night-moon')).toHaveCSS('opacity', '1');
  await expect(page.locator('.cottage-lights')).toHaveCSS('opacity', '1');
  await expect(page.locator('.night-fireflies').first()).toHaveCSS(
    'animation-name',
    'none',
  );
  const next = page.getByRole('button', { name: 'Next garden section' });
  await activate(next, isMobile);
  await expect(page.getByText('2 / 5')).toBeVisible();
  for (const scene of await page.locator('svg.landscape').all()) {
    await expect(scene.locator('stop').first()).toHaveCSS(
      'stop-color',
      'rgb(32, 35, 71)',
    );
    await expect(scene.locator('.night-stars')).toHaveCSS('opacity', '1');
    await expect(scene.locator('.night-fireflies')).toHaveCSS('opacity', '1');
  }
  await night(page).press('Space');
  await expect(page.getByText('2 / 5')).toBeVisible();
  await expect(page.locator('.night-moon')).toHaveCSS('opacity', '0');
  await expect(sky.first()).toHaveCSS('stop-color', 'rgb(151, 202, 219)');
});

test('waters a sprout, flowering bush and rare tree without changing their data', async ({
  page,
  isMobile,
}) => {
  await page.goto('./');
  for (const [name, stage, stars] of [
    ['little-greenhouse', 'sprout', '0'],
    ['sunny-sketches', 'flowering', '38'],
    ['grove-tools', 'rare', '440'],
  ]) {
    const plant = inspect(page, name!);
    await activate(plant, isMobile);
    const panel = page.getByRole('region', { name: name! });
    await expect(panel.getByText(stars!, { exact: true })).toBeVisible();
    const water = panel.getByRole('button', { name: 'Water Plant' });
    await activate(water, isMobile);
    await expect(plant.locator('[data-plant-effect="water"]')).toBeVisible();
    await expect(plant.locator('.water-drop').first()).toHaveCSS(
      'animation-name',
      'none',
    );
    await expect(page.getByText(`Watered ${name}.`)).toHaveCount(1);
    await expect(plant.locator('[data-plant-effect="water"]')).toHaveCount(0);
    await expect(plant.locator('[data-plant-stage]')).toHaveAttribute(
      'data-plant-stage',
      stage!,
    );
    await expect(panel.getByText(stars!, { exact: true })).toBeVisible();
    await activate(
      panel.getByRole('button', { name: 'Close plant details' }),
      isMobile,
    );
  }
});

test('watering brings an offscreen plant back and animates the can, drops and bloom', async ({
  page,
}) => {
  await mockProfile(page, 'gardener', 50);
  await page.goto('./?user=gardener');
  const plant = inspect(page, 'garden-project-1');
  await plant.click();
  await landscape(page).press('End');
  await expect(page.getByText('5 / 5')).toBeVisible();
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.getByRole('button', { name: 'Water Plant' }).click();
  await expect(page.getByText('1 / 5')).toBeVisible();
  await expect(plant.locator('.watering-can')).toHaveCSS(
    'animation-name',
    'pour-water',
  );
  await expect(plant.locator('.water-drop').first()).toHaveCSS(
    'animation-name',
    'water-drop',
  );
  await expect(plant.locator('.water-bloom')).toHaveCSS(
    'animation-name',
    'water-bloom',
  );
});

test('cat and both birds respond to pointer, keyboard and touch', async ({
  page,
  isMobile,
}) => {
  await page.goto('./');
  const cat = page.getByRole('button', { name: 'Pet the cat' });
  await activate(cat, isMobile);
  await expect(cat.locator('.cat-heart')).toBeVisible();
  await expect(cat.locator('.cat-heart')).toHaveCSS('animation-name', 'none');
  await expect(page.getByText('The cat sends you a heart.')).toHaveCount(1);
  const firstBird = page.getByRole('button', { name: 'Greet the first bird' });
  await firstBird.press('Enter');
  await expect(firstBird.locator('.bird-sparks')).toBeVisible();
  const secondBird = page.getByRole('button', {
    name: 'Greet the second bird',
  });
  await activate(secondBird, isMobile);
  await expect(secondBird.locator('.bird-sparks')).toBeVisible();
  await expect(secondBird.locator('.bird-sparks')).toHaveCount(0);
});

test('the cottage greets visitors, closes with Escape and discovers an example plant', async ({
  page,
  isMobile,
}) => {
  await page.goto('./');
  await activate(door(page), isMobile);
  const greeting = page.getByRole('region', { name: 'Hello, sprout!' });
  await expect(door(page)).toHaveAttribute('aria-expanded', 'true');
  await expect(greeting.getByRole('heading')).toBeFocused();
  await expect(door(page).locator('.cottage-gardener')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(greeting).toBeHidden();
  await expect(door(page)).toBeFocused();
  await door(page).press('Enter');
  await activate(
    greeting.getByRole('button', { name: 'Discover a project' }),
    isMobile,
  );
  await expect(greeting).toBeHidden();
  await expect(
    page.getByRole('region', { name: 'raspberry-patch' }).getByRole('heading'),
  ).toBeFocused();
  await expect(inspect(page, 'raspberry-patch')).toHaveAttribute(
    'aria-expanded',
    'true',
  );
});

test('cottage discovery scrolls to a loaded repository and an empty garden has a friendly greeting', async ({
  page,
  isMobile,
}) => {
  await mockProfile(page, 'gardener', 50);
  await mockProfile(page, 'empty-garden', 0);
  await page.goto('./?user=gardener');
  await expect(page.getByRole('heading', { name: '@gardener' })).toBeVisible();
  await activate(door(page), isMobile);
  await activate(
    page.getByRole('button', { name: 'Discover a project' }),
    isMobile,
  );
  await expect(page.getByText('5 / 5')).toBeVisible();
  await expect(inspect(page, 'garden-project-50')).toHaveAttribute(
    'aria-expanded',
    'true',
  );
  await expect(
    page.getByRole('link', { name: /View on GitHub/ }),
  ).toHaveAttribute('href', 'https://github.com/gardener/garden-project-50');
  await page.goto('./?user=empty-garden');
  await expect(
    page.getByRole('heading', { name: '@empty-garden' }),
  ).toBeVisible();
  await activate(door(page), isMobile);
  await expect(
    page.getByText('This garden is waiting for its first project.'),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Discover a project' }),
  ).toHaveCount(0);
});

test('high-star fixtures celebrate within their own plant slots and keep night controls accessible', async ({
  page,
  isMobile,
}) => {
  await mockProfile(page, 'gardener', 10);
  await page.goto('./?user=gardener');
  await activate(night(page), isMobile);
  const legendary = inspect(page, 'garden-project-3');
  await activate(legendary, isMobile);
  await expect(legendary.locator('[data-plant-stage]')).toHaveAttribute(
    'data-plant-stage',
    'rare',
  );
  await expect(
    legendary.locator('[data-plant-effect="celebrate"]'),
  ).toBeVisible();
  await expect(legendary.locator('.magic-sparks')).toHaveCSS(
    'animation-name',
    'none',
  );
  await expect(
    page
      .getByRole('region', { name: 'garden-project-3' })
      .getByText('480', { exact: true }),
  ).toBeVisible();
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();
  expect(
    results.violations.map(({ id, nodes }) => ({
      id,
      nodes: nodes.map(({ target }) => target),
    })),
  ).toEqual([]);
  await expect(
    legendary.locator('[data-plant-effect="celebrate"]'),
  ).toHaveCount(0);
  await page.getByRole('button', { name: 'Close plant details' }).click();
  await activate(door(page), isMobile);
  const cottage = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();
  expect(
    cottage.violations.map(({ id, nodes }) => ({
      id,
      nodes: nodes.map(({ target }) => target),
    })),
  ).toEqual([]);
});

test('creature and plant targets are reachable on compact and wide layouts', async ({
  page,
  isMobile,
}) => {
  await page.setViewportSize(
    isMobile ? { width: 320, height: 500 } : { width: 960, height: 420 },
  );
  await page.goto('./');
  const covered = await page
    .locator('.plant-button, .scene-control, .time-toggle')
    .evaluateAll((buttons) =>
      buttons
        .filter((button) => {
          const { x, y, width, height } = button.getBoundingClientRect();
          return (
            width < 43.9 ||
            height < 43.9 ||
            document
              .elementFromPoint(x + width / 2, y + height / 2)
              ?.closest('button') !== button
          );
        })
        .map((button) => button.getAttribute('aria-label')),
    );
  expect(covered).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    await page.evaluate(() => innerWidth),
  );
});

test('trail visitors take turns, leave the scene and respect reduced motion', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.clock.install();
  await page.goto('./');
  const visitor = page.locator('[data-trail-visitor]');
  await expect(visitor).toHaveCount(0);
  await page.clock.runFor(2700);
  await expect(visitor).toHaveAttribute('data-trail-visitor', 'pup');
  await expect(visitor).toHaveCSS('pointer-events', 'none');
  await expect(visitor).toHaveAttribute('aria-hidden', 'true');
  await page.clock.runFor(4500);
  await expect(visitor).toHaveCount(0);
  await page.clock.runFor(5000);
  await expect(visitor).toHaveAttribute('data-trail-visitor', 'fox');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(visitor).toHaveCount(0);
  await page.clock.fastForward(40000);
  await expect(visitor).toHaveCount(0);
});
