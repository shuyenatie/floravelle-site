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
