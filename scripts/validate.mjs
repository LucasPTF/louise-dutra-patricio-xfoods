import { readFile, readdir } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const forbidden = ["\u2014", "\u2013"];
const requiredRoutes = ["/a1", "/a2", "/a3", "/obrigado"];
const textExtensions = new Set([".html", ".css", ".ts", ".tsx", ".js", ".mjs", ".json", ".md", ".example"]);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (["node_modules", "dist", ".git", ".vercel"].includes(entry.name)) continue;
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(fullPath)));
    else files.push(fullPath);
  }
  return files;
}

const files = await walk(root);
const violations = [];

for (const file of files) {
  const extension = file.slice(file.lastIndexOf("."));
  if (!textExtensions.has(extension)) continue;
  const content = await readFile(file, "utf8");
  for (const character of forbidden) {
    if (content.includes(character)) violations.push(`${relative(root, file)} contém ${JSON.stringify(character)}`);
  }
}

const vercel = JSON.parse(await readFile(join(root, "vercel.json"), "utf8"));
const routeSources = vercel.rewrites.map(item => item.source);
for (const route of requiredRoutes) {
  if (!routeSources.includes(route)) violations.push(`Rota ausente no vercel.json: ${route}`);
}

const appSource = await readFile(join(root, "src", "main.tsx"), "utf8");
for (const route of requiredRoutes) {
  if (!appSource.includes(`"${route}"`)) violations.push(`Rota ausente na aplicação: ${route}`);
}

const requiredAssets = [
  "louise-hero.webp",
  "louise-authority.webp",
  "xfoods-logo.png",
  "xfoods-business-logo.png",
  "xfoods-burger.webp",
  "xfoods-chicken.webp",
  "xfoods-product-meat.webp"
];
for (const asset of requiredAssets) {
  if (!files.some(file => file.endsWith(asset))) violations.push(`Asset ausente: ${asset}`);
}

if (violations.length) {
  console.error(violations.join("\n"));
  process.exit(1);
}

console.log("Validação concluída: rotas, assets e caracteres proibidos estão corretos.");
