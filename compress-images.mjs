// Script para comprimir todas as fotos da galeria para web
import sharp from "sharp";
import { readdirSync, statSync, readFileSync, writeFileSync, renameSync, unlinkSync } from "fs";
import { join, extname, basename } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const GALLERY_DIR = join(__dirname, "src", "assets", "galeria");
const MAX_WIDTH = 1200;
const QUALITY = 75;

let total = 0;
let compressed = 0;
let savedBytes = 0;

function getAllJpgs(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...getAllJpgs(full));
    } else if ([".jpg", ".jpeg"].includes(extname(entry).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

const jpgs = getAllJpgs(GALLERY_DIR);
console.log(`\n🔍 Encontradas ${jpgs.length} fotos. Comprimindo...\n`);

for (const filePath of jpgs) {
  total++;
  const originalSize = statSync(filePath).size;
  const tmpPath = filePath + ".tmp";

  try {
    // Lê a imagem original para a memória primeiro
    const inputBuffer = readFileSync(filePath);

    // Processa em memória
    const buffer = await sharp(inputBuffer)
      .resize({ width: MAX_WIDTH, height: MAX_WIDTH, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: QUALITY, progressive: true })
      .toBuffer();

    if (buffer.length < originalSize) {
      // Salva no arquivo temporário primeiro
      writeFileSync(tmpPath, buffer);
      // Apaga original e renomeia o temp
      unlinkSync(filePath);
      renameSync(tmpPath, filePath);

      const saved = originalSize - buffer.length;
      savedBytes += saved;
      compressed++;
      console.log(`  ✅ ${basename(filePath)}: ${(originalSize/1024).toFixed(0)}KB → ${(buffer.length/1024).toFixed(0)}KB  (−${(saved/1024).toFixed(0)}KB)`);
    } else {
      console.log(`  ⏭️  ${basename(filePath)}: já otimizada`);
    }
  } catch (e) {
    // Limpa arquivo temp se existir
    try { unlinkSync(tmpPath); } catch {}
    console.error(`  ❌ Erro em ${basename(filePath)}: ${e.message}`);
  }
}

console.log(`\n✨ Pronto!`);
console.log(`   ${compressed}/${total} fotos comprimidas`);
console.log(`   Total economizado: ${(savedBytes / 1024 / 1024).toFixed(1)} MB`);
