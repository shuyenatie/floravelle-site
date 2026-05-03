# Floravelle Static Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a local responsive static website prototype for Floravelle, a premium faux floral brand with factory-backed wholesale inquiry conversion.

**Architecture:** Use plain HTML, CSS, and JavaScript so the prototype can run locally without installing frontend dependencies. Pages share one stylesheet and one small script for navigation, brand text, and inquiry form feedback. A Node-based verification script checks required pages, links, and content before visual QA.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Node.js built-in `fs/path/url` modules, optional Python or PowerShell local server for preview.

---

## 0. 文件结构

项目根目录：`D:\Codex-Workspace\Projects\floravelle-site`

需要创建或修改：

- Create: `D:\Codex-Workspace\Projects\floravelle-site\index.html`
- Create: `D:\Codex-Workspace\Projects\floravelle-site\collections.html`
- Create: `D:\Codex-Workspace\Projects\floravelle-site\product.html`
- Create: `D:\Codex-Workspace\Projects\floravelle-site\custom-oem.html`
- Create: `D:\Codex-Workspace\Projects\floravelle-site\factory.html`
- Create: `D:\Codex-Workspace\Projects\floravelle-site\contact.html`
- Create: `D:\Codex-Workspace\Projects\floravelle-site\assets\css\styles.css`
- Create: `D:\Codex-Workspace\Projects\floravelle-site\assets\js\site.js`
- Create: `D:\Codex-Workspace\Projects\floravelle-site\assets\images\image-plan.md`
- Create: `D:\Codex-Workspace\Projects\floravelle-site\tests\check-site.js`

页面责任：

- `index.html`: 首页，高端品牌视觉、分类入口、精选产品、场景系列、工厂能力、询盘 CTA。
- `collections.html`: 产品分类/系列页，展示仿真花、绿植、婚礼、户外等系列。
- `product.html`: 产品详情页模板，展示规格、材质、定制选项、询价按钮。
- `custom-oem.html`: 定制/OEM 页面，解释可定制内容和合作流程。
- `factory.html`: 工厂实力页面，展示生产、质检、包装、样品支持。
- `contact.html`: 联系和询盘页面。
- `styles.css`: 全站视觉系统、布局、响应式样式。
- `site.js`: 移动端菜单、品牌名替换、表单本地反馈。
- `image-plan.md`: 后续真实图片拍摄/替换清单。
- `check-site.js`: 自动检查页面是否齐全、核心链接是否存在、核心文案是否出现。

## 1. Task 1: 创建站点验证脚本

**Files:**

- Create: `D:\Codex-Workspace\Projects\floravelle-site\tests\check-site.js`

- [ ] **Step 1: 写一个先失败的验证脚本**

Create `tests/check-site.js` with:

```javascript
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

const requiredPages = [
  "index.html",
  "collections.html",
  "product.html",
  "custom-oem.html",
  "factory.html",
  "contact.html",
];

const requiredAssets = [
  "assets/css/styles.css",
  "assets/js/site.js",
  "assets/images/image-plan.md",
];

const requiredText = {
  "index.html": [
    "Faux Florals, Made to Feel Effortless",
    "Explore Collections",
    "Request Wholesale Quote",
    "Start Your Wholesale Collection",
  ],
  "collections.html": ["Shop Artificial Flowers", "Hydrangeas", "Wedding Florals"],
  "product.html": ["Product Specifications", "Request Quote", "Ask for Sample"],
  "custom-oem.html": ["Custom Faux Floral Production", "Private Label", "Confirm Samples"],
  "factory.html": ["Our Factory", "Quality Control", "Export Packaging"],
  "contact.html": ["Wholesale Inquiry", "Request a Quote", "WhatsApp"],
};

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

for (const file of [...requiredPages, ...requiredAssets]) {
  assert(fs.existsSync(path.join(root, file)), `Missing required file: ${file}`);
}

for (const [file, snippets] of Object.entries(requiredText)) {
  const html = read(file);
  for (const snippet of snippets) {
    assert(html.includes(snippet), `Missing text in ${file}: ${snippet}`);
  }
}

for (const file of requiredPages) {
  const html = read(file);
  assert(html.includes("assets/css/styles.css"), `${file} does not load shared CSS`);
  assert(html.includes("assets/js/site.js"), `${file} does not load shared JS`);
  assert(html.includes("Wholesale Inquiry"), `${file} missing inquiry navigation`);
}

const allHtml = requiredPages.map(read).join("\n");
const localLinks = [...allHtml.matchAll(/href="([^"]+\.html)"/g)].map((match) => match[1]);
for (const href of localLinks) {
  assert(fs.existsSync(path.join(root, href)), `Broken local link target: ${href}`);
}

console.log(`Site check passed: ${requiredPages.length} pages, ${requiredAssets.length} shared assets.`);
```

- [ ] **Step 2: 运行验证脚本，确认现在失败**

Run:

```powershell
node .\tests\check-site.js
```

Expected:

```text
Error: Missing required file: index.html
```

- [ ] **Step 3: 提交检查点**

如果当前项目不是 git 仓库，跳过提交，只记录状态。  
如果已经初始化 git，运行：

```powershell
git add tests/check-site.js
git commit -m "test: add static site verification"
```

## 2. Task 2: 创建全站骨架和共享资源

**Files:**

- Create: `D:\Codex-Workspace\Projects\floravelle-site\index.html`
- Create: `D:\Codex-Workspace\Projects\floravelle-site\collections.html`
- Create: `D:\Codex-Workspace\Projects\floravelle-site\product.html`
- Create: `D:\Codex-Workspace\Projects\floravelle-site\custom-oem.html`
- Create: `D:\Codex-Workspace\Projects\floravelle-site\factory.html`
- Create: `D:\Codex-Workspace\Projects\floravelle-site\contact.html`
- Create: `D:\Codex-Workspace\Projects\floravelle-site\assets\css\styles.css`
- Create: `D:\Codex-Workspace\Projects\floravelle-site\assets\js\site.js`
- Create: `D:\Codex-Workspace\Projects\floravelle-site\assets\images\image-plan.md`

- [ ] **Step 1: 创建目录**

Run:

```powershell
New-Item -ItemType Directory -Force .\assets\css, .\assets\js, .\assets\images, .\tests
```

Expected:

```text
assets/css, assets/js, assets/images, tests directories exist.
```

- [ ] **Step 2: 创建共享 CSS 基础**

Create `assets/css/styles.css` with the design tokens and base layout:

```css
:root {
  --warm-white: #f7f5f1;
  --paper: #fffdf9;
  --soft-gray: #e8e6e1;
  --charcoal: #20201d;
  --muted: #6f6a61;
  --sage: #7a8b6f;
  --olive: #394333;
  --wine: #8b4a4a;
  --line: rgba(32, 32, 29, 0.14);
  --max: 1180px;
  --serif: Georgia, "Times New Roman", serif;
  --sans: "Segoe UI", Arial, sans-serif;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  background: var(--warm-white);
  color: var(--charcoal);
  font-family: var(--sans);
  line-height: 1.6;
}

a { color: inherit; text-decoration: none; }
img { max-width: 100%; display: block; }

.site-shell { background: var(--paper); min-height: 100vh; }
.container { width: min(var(--max), calc(100% - 40px)); margin: 0 auto; }

.top-note {
  background: var(--charcoal);
  color: var(--paper);
  text-align: center;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 8px 16px;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(255, 253, 249, 0.94);
  border-bottom: 1px solid var(--line);
  backdrop-filter: blur(12px);
}

.nav {
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.brand {
  font-family: var(--serif);
  font-size: 28px;
  letter-spacing: 0.03em;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 24px;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.nav-action,
.btn {
  border: 1px solid var(--charcoal);
  background: var(--charcoal);
  color: var(--paper);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0 20px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.btn.secondary {
  background: rgba(255, 253, 249, 0.82);
  color: var(--charcoal);
}

.menu-toggle { display: none; }

.section {
  padding: 82px 0;
}

.section-title {
  font-family: var(--serif);
  font-size: clamp(30px, 4vw, 48px);
  line-height: 1.1;
  font-weight: 400;
  margin: 0 0 18px;
}

.section-kicker {
  color: var(--sage);
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 14px;
}

.lead {
  color: var(--muted);
  font-size: 17px;
  max-width: 680px;
}

.hero {
  min-height: 680px;
  display: grid;
  align-items: center;
  background:
    linear-gradient(90deg, rgba(32,32,29,0.55), rgba(32,32,29,0.18) 45%, rgba(247,245,241,0.05)),
    radial-gradient(circle at 74% 36%, rgba(255,255,255,0.88), transparent 0 10%, transparent 24%),
    linear-gradient(135deg, #d8d1c4 0%, #f4efe6 38%, #bfc8b5 39%, #ede8dd 62%, #353931 63%, #1f211e 100%);
  color: var(--paper);
}

.hero-content {
  max-width: 560px;
  padding: 70px 0;
}

.hero h1 {
  font-family: var(--serif);
  font-size: clamp(44px, 7vw, 82px);
  line-height: 0.98;
  font-weight: 400;
  margin: 0 0 22px;
}

.hero p {
  font-size: 18px;
  max-width: 520px;
}

.button-row { display: flex; gap: 14px; flex-wrap: wrap; margin-top: 28px; }

.category-grid,
.product-grid,
.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.category-grid { grid-template-columns: repeat(6, 1fr); text-align: center; }

.image-tile,
.product-image,
.story-image {
  min-height: 260px;
  background:
    radial-gradient(circle at 50% 34%, rgba(255,255,255,0.92), transparent 0 16%, transparent 26%),
    linear-gradient(145deg, #efede8, #d8ddd1);
}

.category-image {
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(circle at 50% 42%, #f7f5f1 0 18%, transparent 19%),
    linear-gradient(145deg, #d6dccd, #f0ece3);
  margin-bottom: 14px;
}

.category-name,
.product-title {
  font-family: var(--serif);
  font-size: 17px;
}

.product-meta {
  color: var(--muted);
  font-size: 13px;
}

.story-band {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 420px;
  background: var(--soft-gray);
}

.story-copy {
  padding: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.split {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 60px;
  align-items: center;
}

.capability-list,
.process-list {
  display: grid;
  gap: 14px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.capability-list li,
.process-card,
.spec-row {
  border-top: 1px solid var(--line);
  padding: 16px 0;
}

.process-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.inquiry-panel {
  background: var(--olive);
  color: var(--paper);
  padding: 64px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.form-grid label {
  display: grid;
  gap: 8px;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

input,
textarea,
select {
  width: 100%;
  border: 1px solid var(--line);
  background: var(--paper);
  color: var(--charcoal);
  min-height: 44px;
  padding: 10px 12px;
  font: inherit;
}

textarea { min-height: 120px; resize: vertical; }
.full { grid-column: 1 / -1; }

.footer {
  background: var(--charcoal);
  color: var(--paper);
  padding: 52px 0;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.2fr repeat(3, 1fr);
  gap: 36px;
}

@media (max-width: 900px) {
  .menu-toggle {
    display: inline-flex;
    border: 1px solid var(--line);
    background: transparent;
    padding: 10px 12px;
  }
  .nav-links {
    position: absolute;
    left: 0;
    right: 0;
    top: 76px;
    display: none;
    flex-direction: column;
    align-items: flex-start;
    padding: 22px 20px;
    background: var(--paper);
    border-bottom: 1px solid var(--line);
  }
  .nav-links.is-open { display: flex; }
  .nav-action { display: none; }
  .category-grid { grid-template-columns: repeat(3, 1fr); }
  .product-grid,
  .feature-grid,
  .process-grid,
  .story-band,
  .split,
  .footer-grid {
    grid-template-columns: 1fr;
  }
  .story-copy,
  .inquiry-panel {
    padding: 38px 24px;
  }
}

@media (max-width: 560px) {
  .container { width: min(100% - 28px, var(--max)); }
  .hero { min-height: 590px; }
  .category-grid { grid-template-columns: repeat(2, 1fr); }
  .product-grid { grid-template-columns: 1fr; }
  .form-grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 3: 创建共享 JS**

Create `assets/js/site.js` with:

```javascript
(function () {
  const brand = "Floravelle";
  document.querySelectorAll("[data-brand]").forEach((node) => {
    node.textContent = brand;
  });

  const toggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav-links]");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  document.querySelectorAll("[data-inquiry-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const status = form.querySelector("[data-form-status]");
      if (status) {
        status.textContent = "Thanks. This local prototype does not send messages yet, but the inquiry path is ready for integration.";
      }
    });
  });
})();
```

- [ ] **Step 4: 创建图片替换计划**

Create `assets/images/image-plan.md` with:

```markdown
# Floravelle Image Replacement Plan

The static prototype uses styled visual placeholders first. Replace them with real assets in this order:

1. Hero lifestyle image: faux flowers in a refined kitchen, dining room, mantel, or window-side vase.
2. Category images: hydrangeas, orchids, blossom branches, greenery, hanging plants, wedding florals.
3. Product images: consistent warm-white or pale-gray backgrounds.
4. Detail images: petals, leaves, stems, material texture, scale.
5. Factory images: sample room, production, quality control, export packaging.

Recommended image ratio:

- Hero: 16:9 or 21:9
- Category: 1:1
- Product card: 4:5
- Story band: 16:9
- Factory/process: 4:3
```

- [ ] **Step 5: 创建六个页面的最小骨架**

Each page must include:

```html
<link rel="stylesheet" href="assets/css/styles.css">
...
<script src="assets/js/site.js" defer></script>
```

Use the same header links on every page:

```html
<a href="index.html">Home</a>
<a href="collections.html">Artificial Flowers</a>
<a href="collections.html#plants">Faux Plants</a>
<a href="collections.html#wedding">Wedding & Event</a>
<a href="custom-oem.html">Custom & OEM</a>
<a href="factory.html">Factory</a>
<a href="contact.html">Contact</a>
```

- [ ] **Step 6: 运行验证脚本，确认共享文件仍缺核心文案所以失败**

Run:

```powershell
node .\tests\check-site.js
```

Expected:

```text
Error: Missing text in index.html: Faux Florals, Made to Feel Effortless
```

## 3. Task 3: 实现首页

**Files:**

- Modify: `D:\Codex-Workspace\Projects\floravelle-site\index.html`

- [ ] **Step 1: 写首页完整结构**

Replace `index.html` with a complete page containing:

- top note: `Factory-crafted faux florals for wholesale collections`
- header navigation
- hero with `Faux Florals, Made to Feel Effortless`
- category section with Hydrangeas, Orchids, Blossom Branches, Greenery, Hanging Plants, Wedding Florals
- featured products section
- scene-based collections section
- factory capability section
- 4-step process section
- inquiry form CTA
- footer

Required homepage CTA labels:

```text
Explore Collections
Request Wholesale Quote
View Details
Request Quote
Start Your Wholesale Collection
```

- [ ] **Step 2: 运行首页文案检查**

Run:

```powershell
node .\tests\check-site.js
```

Expected:

```text
The script may still fail on other pages, but index.html text checks must no longer be the first failure.
```

- [ ] **Step 3: 手动检查首页结构**

Run:

```powershell
Select-String -Path .\index.html -Pattern "Faux Florals|Hydrangeas|Own Factory|Start Your Wholesale Collection"
```

Expected:

```text
All four terms appear in index.html.
```

## 4. Task 4: 实现产品分类页和产品详情页

**Files:**

- Modify: `D:\Codex-Workspace\Projects\floravelle-site\collections.html`
- Modify: `D:\Codex-Workspace\Projects\floravelle-site\product.html`

- [ ] **Step 1: 实现 `collections.html`**

Content requirements:

```text
Page title: Shop Artificial Flowers
Intro: Browse wholesale-ready faux flowers, greenery, and event botanicals crafted for refined interiors and seasonal collections.
Category chips: Hydrangeas, Orchids, Blossom Branches, Greenery, Hanging Plants, Wedding Florals
At least 8 product cards
Inquiry CTA: Need a custom collection? Request a wholesale quote.
```

At least these product names must appear:

```text
Real Touch White Hydrangea Stem - 19"
Cream Magnolia Faux Flower Branch - 35"
Faux Lilac Flower in Cream - 25"
Potted Faux Orchid Arrangement - 28"
UV Resistant Outdoor Greenery Bush - 32"
Artificial Hanging Philodendron Bush - 32"
Blush Wedding Rose Bundle - 16"
Olive Faux Eucalyptus Spray - 30"
```

- [ ] **Step 2: 实现 `product.html`**

Content requirements:

```text
Product title: Real Touch White Hydrangea Stem - 19"
Section title: Product Specifications
Buttons: Request Quote, Ask for Sample
Spec rows: Item Type, Material, Size, Color, Usage, MOQ, Customization, Packaging
Related products section
```

- [ ] **Step 3: 运行验证脚本**

Run:

```powershell
node .\tests\check-site.js
```

Expected:

```text
The script may still fail on custom-oem.html, factory.html, or contact.html, but collections.html and product.html requirements should pass.
```

## 5. Task 5: 实现 Custom & OEM、Factory、Contact 页面

**Files:**

- Modify: `D:\Codex-Workspace\Projects\floravelle-site\custom-oem.html`
- Modify: `D:\Codex-Workspace\Projects\floravelle-site\factory.html`
- Modify: `D:\Codex-Workspace\Projects\floravelle-site\contact.html`

- [ ] **Step 1: 实现 `custom-oem.html`**

Required text:

```text
Custom Faux Floral Production
Private Label
Custom Colors
Confirm Samples
Bulk Production
Packaging
OEM
```

Required sections:

- What Can Be Customized
- Development Process
- Packaging & Private Label
- Best For
- Inquiry CTA

- [ ] **Step 2: 实现 `factory.html`**

Required text:

```text
Our Factory
Quality Control
Export Packaging
Sample Support
Production Process
```

Required sections:

- Factory Overview
- Production Process
- Quality Control
- Packaging and Export
- Why Work With Us

- [ ] **Step 3: 实现 `contact.html`**

Required text:

```text
Wholesale Inquiry
Request a Quote
WhatsApp
Email
Company
Country
Interested Products
Estimated Quantity
```

Required form fields:

- Name
- Email
- WhatsApp
- Company
- Country
- Interested products
- Estimated quantity
- Message

- [ ] **Step 4: 运行完整验证脚本**

Run:

```powershell
node .\tests\check-site.js
```

Expected:

```text
Site check passed: 6 pages, 3 shared assets.
```

## 6. Task 6: 响应式和可访问性检查

**Files:**

- Modify: `D:\Codex-Workspace\Projects\floravelle-site\assets\css\styles.css`
- Modify: `D:\Codex-Workspace\Projects\floravelle-site\assets\js\site.js`
- Modify pages only if missing labels or structure.

- [ ] **Step 1: 检查移动端菜单属性**

Every page header menu button should include:

```html
<button class="menu-toggle" type="button" aria-expanded="false" aria-label="Open navigation" data-menu-toggle>Menu</button>
```

The nav links container should include:

```html
<nav class="nav-links" aria-label="Primary navigation" data-nav-links>
```

- [ ] **Step 2: 检查表单标签**

Every form input must be inside a visible `label`, for example:

```html
<label>
  Email
  <input type="email" name="email" autocomplete="email" required>
</label>
```

- [ ] **Step 3: 检查移动端文字和网格**

Run a local server:

```powershell
python -m http.server 4173
```

Expected:

```text
Serving HTTP on :: port 4173
```

Open:

```text
http://localhost:4173
```

Check at desktop width and mobile width:

- Header does not overlap.
- Hero text fits.
- Product cards stack cleanly.
- Inquiry form fields do not overflow.
- Footer columns stack on mobile.

If Python is not available, use:

```powershell
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd D:\Codex-Workspace\Projects\floravelle-site; py -m http.server 4173"
```

## 7. Task 7: Visual QA with Browser Companion

**Files:**

- Modify CSS/HTML only if visual QA finds issues.

- [ ] **Step 1: Open local preview**

Use the in-app browser at:

```text
http://localhost:4173
```

- [ ] **Step 2: Check desktop homepage**

Expected:

- Large premium hero.
- No cramped text.
- Clear primary and secondary CTAs.
- Category section resembles refined ecommerce, not a factory catalog.
- Factory section is calm and trust-building.

- [ ] **Step 3: Check mobile homepage**

Expected:

- Menu opens and closes.
- Text does not overlap images.
- Product grid is readable.
- Inquiry form is usable.

- [ ] **Step 4: Check all pages**

Visit:

```text
http://localhost:4173/collections.html
http://localhost:4173/product.html
http://localhost:4173/custom-oem.html
http://localhost:4173/factory.html
http://localhost:4173/contact.html
```

Expected:

- All pages load.
- Navigation links work.
- Visual system is consistent.
- Inquiry buttons are visible.

## 8. Task 8: Final Verification

**Files:**

- No planned edits unless verification fails.

- [ ] **Step 1: Run automated site check**

Run:

```powershell
node .\tests\check-site.js
```

Expected:

```text
Site check passed: 6 pages, 3 shared assets.
```

- [ ] **Step 2: Confirm file list**

Run:

```powershell
Get-ChildItem -Recurse -File | Select-Object FullName
```

Expected:

```text
index.html
collections.html
product.html
custom-oem.html
factory.html
contact.html
assets/css/styles.css
assets/js/site.js
assets/images/image-plan.md
tests/check-site.js
```

- [ ] **Step 3: Stop any local server started for QA**

If a foreground server is running, press:

```text
Ctrl+C
```

If a background PowerShell server was started, close that server window after QA.

## 9. 后续不在本计划范围内

这些内容后面单独做：

- 正式品牌名和 Logo
- 真实产品图片替换
- 完整产品库
- 表单后端接收邮件或 CRM
- Shopify / WooCommerce 电商化
- 多语言版本
- SEO 内容页和博客
- Google Analytics / Meta Pixel / 广告追踪

