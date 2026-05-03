import path from "node:path";
import { fileURLToPath } from "node:url";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const outputPath = path.join(root, "outputs", "floravelle-product-intake-template.xlsx");

const input = await FileBlob.load(outputPath);
const workbook = await SpreadsheetFile.importXlsx(input);

const table = await workbook.inspect({
  kind: "table",
  range: "Product Intake!A1:Z4",
  include: "values",
  tableMaxRows: 4,
  tableMaxCols: 26,
});

const text = table.ndjson;
for (const required of [
  "内部编号 Internal ID",
  "中文名 Chinese Name",
  "一级分类 Primary Category",
  "Real Touch White Hydrangea Stem - 19",
  "Cream Magnolia Faux Flower Branch - 35",
]) {
  if (!text.includes(required)) {
    throw new Error(`Workbook verification failed. Missing: ${required}`);
  }
}

console.log("Product workbook verification passed.");
