// Render dos 4 conteudos da rodada novidades-2026-05-21
// Uso: node render.js  (precisa de playwright instalado)
// Se Playwright nao estiver instalado: npm install -g playwright && npx playwright install chromium

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ROOT = __dirname;
const TARGETS = [
  {
    name: 'gemini-daily-brief',
    htmlPath: path.join(ROOT, '01-gemini-daily-brief', 'carrossel.html'),
    outDir:   path.join(ROOT, '01-gemini-daily-brief', 'instagram'),
    slidesSelector: '.slide',
    prefix: 'slide'
  },
  {
    name: 'google-ads-diretrizes',
    htmlPath: path.join(ROOT, '02-google-ads-diretrizes', 'carrossel.html'),
    outDir:   path.join(ROOT, '02-google-ads-diretrizes', 'instagram'),
    slidesSelector: '.slide',
    prefix: 'slide'
  },
  {
    name: 'hostgator-pmes-ia',
    htmlPath: path.join(ROOT, '03-hostgator-pmes-ia', 'estatico.html'),
    outDir:   path.join(ROOT, '03-hostgator-pmes-ia', 'instagram'),
    slidesSelector: '.slide',
    prefix: 'post'
  },
  {
    name: 'socialhub-whatsapp-25',
    htmlPath: path.join(ROOT, '04-socialhub-whatsapp-25', 'estatico.html'),
    outDir:   path.join(ROOT, '04-socialhub-whatsapp-25', 'instagram'),
    slidesSelector: '.slide',
    prefix: 'post'
  }
];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1080, height: 1350 },
    deviceScaleFactor: 2
  });
  const page = await context.newPage();

  for (const t of TARGETS) {
    console.log('\n>>> Rendering ' + t.name);
    if (!fs.existsSync(t.outDir)) fs.mkdirSync(t.outDir, { recursive: true });

    const url = 'file://' + t.htmlPath.replace(/\\/g, '/');
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(500);

    const slides = await page.locator(t.slidesSelector).all();
    console.log('  - ' + slides.length + ' slide(s) encontrado(s)');

    for (let i = 0; i < slides.length; i++) {
      const filename = t.prefix + '-' + String(i + 1).padStart(2, '0') + '.png';
      const outPath = path.join(t.outDir, filename);
      await slides[i].screenshot({ path: outPath });
      console.log('  - ' + filename);
    }
  }

  await browser.close();
  console.log('\nOK. PNGs gerados em cada pasta instagram/.');
})().catch(err => {
  console.error('Erro:', err);
  process.exit(1);
});
