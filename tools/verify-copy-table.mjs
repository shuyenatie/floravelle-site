import path from "node:path";
import { fileURLToPath } from "node:url";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const outputPath = path.join(root, "outputs", "floravelle-site-copy-bilingual.xlsx");

const input = await FileBlob.load(outputPath);
const workbook = await SpreadsheetFile.importXlsx(input);

const firstRows = await workbook.inspect({
  kind: "table",
  range: "Site Copy!A1:E18",
  include: "values",
  tableMaxRows: 18,
  tableMaxCols: 5,
});

const allRows = await workbook.inspect({
  kind: "table",
  range: "Site Copy!A1:E90",
  include: "values",
  tableMaxRows: 90,
  tableMaxCols: 5,
});

await workbook.render({ sheetName: "Site Copy", range: "A1:E25", scale: 1 });

const text = `${firstRows.ndjson}\n${allRows.ndjson}`;
for (const required of [
  "English Copy",
  "中文意思",
  "Faux Florals, Made to Feel Effortless",
  "自然、省心、有质感的仿真花",
  "Request Wholesale Quote",
  "Tell us sizes, materials, packaging, target price, or reference styles.",
]) {
  if (!text.includes(required)) {
    throw new Error(`Copy workbook verification failed. Missing: ${required}`);
  }
}

if (text.includes("涓") || text.includes("鐨") || text.includes("绔")) {
  throw new Error("Copy workbook verification failed. Detected mojibake Chinese text.");
}

console.log("Copy workbook verification passed.");
