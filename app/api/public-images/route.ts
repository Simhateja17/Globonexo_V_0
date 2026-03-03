import { NextResponse } from "next/server";
import { readdir, stat } from "fs/promises";
import { join } from "path";

const IMAGE_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".svg",
  ".gif",
  ".ico",
]);

async function getImageFiles(dir: string, basePath: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    const relativePath = join(basePath, entry.name);

    if (entry.isDirectory()) {
      const subFiles = await getImageFiles(fullPath, relativePath);
      files.push(...subFiles);
    } else {
      const ext = entry.name.substring(entry.name.lastIndexOf(".")).toLowerCase();
      if (IMAGE_EXTENSIONS.has(ext)) {
        const fileStat = await stat(fullPath);
        files.push(
          JSON.stringify({
            path: `/images/${relativePath}`,
            name: entry.name,
            size: fileStat.size,
          })
        );
      }
    }
  }

  return files;
}

export async function GET() {
  try {
    const imagesDir = join(process.cwd(), "public", "images");
    const rawFiles = await getImageFiles(imagesDir, "");
    const files = rawFiles.map((f) => JSON.parse(f));
    return NextResponse.json({ files });
  } catch (error) {
    console.error("Failed to list public images:", error);
    return NextResponse.json({ files: [] });
  }
}
