import { copyFile, mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const seoRoot = resolve(process.cwd(), "..");
const copySourcePath = resolve(seoRoot, "copy.json");
const artSourcePath = resolve(seoRoot, "article_art.json");
const copyTargetPath = resolve(process.cwd(), "src", "content", "copy.generated.json");
const artTargetPath = resolve(
  process.cwd(),
  "src",
  "content",
  "article-art.generated.json",
);
const publicArtDir = resolve(process.cwd(), "public", "article-art");

async function loadJson(sourcePath, description) {
  let raw;

  try {
    raw = await readFile(sourcePath, "utf8");
  } catch (error) {
    throw new Error(`Unable to read ${description} at ${sourcePath}`, {
      cause: error,
    });
  }

  return JSON.parse(raw);
}

async function writeJson(targetPath, value) {
  await mkdir(dirname(targetPath), { recursive: true });
  await writeFile(targetPath, `${JSON.stringify(value, null, 2)}\n`);
}

async function main() {
  const copyData = await loadJson(copySourcePath, "canonical copy file");
  const artData = await loadJson(artSourcePath, "article art manifest");

  await writeJson(copyTargetPath, copyData);

  await rm(publicArtDir, { force: true, recursive: true });
  await mkdir(publicArtDir, { recursive: true });

  const syncedArtArticles = await Promise.all(
    artData.articles.map(async (article) => {
      const sourceImagePath = resolve(seoRoot, article.sourceImagePath);
      const targetImagePath = resolve(
        process.cwd(),
        "public",
        article.publicImagePath.replace(/^\//, ""),
      );

      let available = false;
      let cacheKey = null;

      try {
        await copyFile(sourceImagePath, targetImagePath);
        const imageStats = await stat(sourceImagePath);
        available = true;
        cacheKey = `${Math.round(imageStats.mtimeMs)}-${imageStats.size}`;
      } catch {
        available = false;
        cacheKey = null;
      }

      return {
        ...article,
        available,
        cacheKey,
      };
    }),
  );

  await writeJson(artTargetPath, {
    ...artData,
    articles: syncedArtArticles,
  });

  console.log(`Synced ${copySourcePath} -> ${copyTargetPath}`);
  console.log(`Synced ${artSourcePath} -> ${artTargetPath}`);
  console.log(`Copied generated article art into ${publicArtDir}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
