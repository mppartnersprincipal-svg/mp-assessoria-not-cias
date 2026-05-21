// Render dos 3 conteudos da rodada novidades-2026-05-20
// Uso: node render.js  (precisa de playwright instalado)
// Se Playwright nao estiver instalado: npm install -g playwright && npx playwright install chromium

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ROOT = __dirname;
const TARGETS = [
  {
    name: 'claude-small-business',
    htmlPath: path.join(ROOT, '01-claude-small-business', 'carrossel.html'),
    outDir:   path.join(ROOT, '01-claude-small-business', 'instagram'),
    slidesSelector: '.slide',
    prefix: 'slide'
  },
  {
    name: 'meta-ads-maio-2026',
    htmlPath: path.join(ROOT, '02-meta-ads-maio-2026', 'carrossel.html'),
    outDir:   path.join(ROOT, '02-meta-ads-maio-2026', 'instagram'),
    slidesSelector: '.slide',
    prefix: 'slide'
  },
  {
    name: 'whatsapp-2-68',
    htmlPath: path.join(ROOT, '03-whatsapp-2-68', 'estatico.html'),
    outDir:   path.join(ROOT, '03-whatsapp-2-68', 'instagram'),
    slidesSelector: '.slide',
    prefix: 'post'
  }
];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1080, height: 1350 },
    deviceScaleFactor: 2  // 2x pra qualidade Instagram
  });
  const page = await context.newPage();

  for (const t of TARGETS) {
    console.log('\n>>> Rendering ' + t.name);
    if (!fs.existsSync(t.outDir)) fs.mkdirSync(t.outDir, { recursive: true });

    const url = 'file://' + t.htmlPath.replace(/\\/g, '/');
    await page.goto(url, { waitUntil: 'networkidle' });
    // Aguarda fontes carregarem
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
