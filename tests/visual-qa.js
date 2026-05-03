const path = require("path");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "..");
const screenshotDir = path.join(root, "qa-screenshots");
const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const url = "http://127.0.0.1:4173/index.html?qa=playwright";

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: edgePath,
  });

  const desktop = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  await desktop.goto(url, { waitUntil: "networkidle" });
  await desktop.screenshot({
    path: path.join(screenshotDir, "home-desktop-playwright.png"),
    fullPage: false,
  });

  const mobile = await browser.newPage({
    viewport: { width: 390, height: 900 },
    isMobile: true,
  });
  await mobile.goto(url, { waitUntil: "networkidle" });
  await mobile.screenshot({
    path: path.join(screenshotDir, "home-mobile-playwright.png"),
    fullPage: false,
  });

  const result = await mobile.evaluate(() => {
    const menu = document.querySelector("[data-menu-toggle]");
    const heroTitle = document.querySelector(".hero h1");
    const heroText = document.querySelector(".hero p");
    const body = document.body;
    const doc = document.documentElement;
    const menuRect = menu ? menu.getBoundingClientRect() : null;
    const titleRect = heroTitle ? heroTitle.getBoundingClientRect() : null;
    const textRect = heroText ? heroText.getBoundingClientRect() : null;
    return {
      viewportWidth: window.innerWidth,
      scrollWidth: Math.max(body.scrollWidth, doc.scrollWidth),
      menuVisible: !!menu && getComputedStyle(menu).display !== "none",
      menuRight: menuRect ? Math.round(menuRect.right) : null,
      titleRight: titleRect ? Math.round(titleRect.right) : null,
      textRight: textRect ? Math.round(textRect.right) : null,
    };
  });

  await browser.close();

  if (!result.menuVisible) {
    throw new Error(`Mobile menu is not visible: ${JSON.stringify(result)}`);
  }
  if (result.scrollWidth > result.viewportWidth + 2) {
    throw new Error(`Mobile page overflows horizontally: ${JSON.stringify(result)}`);
  }
  if (result.menuRight > result.viewportWidth + 2) {
    throw new Error(`Mobile menu is outside viewport: ${JSON.stringify(result)}`);
  }
  if (result.titleRight > result.viewportWidth + 2 || result.textRight > result.viewportWidth + 2) {
    throw new Error(`Hero text is outside viewport: ${JSON.stringify(result)}`);
  }

  console.log(`Visual QA passed: ${JSON.stringify(result)}`);
})();
