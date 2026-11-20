#!/usr/bin/env python3
"""Generate static-export-friendly WebP image candidates without modifying originals.

Install the optional image-tool dependency with:
  python3 -m pip install -r scripts/requirements-images.txt
Then run:
  python3 scripts/generate-responsive-images.py

All renditions are generated under public/images/responsive/ and the manifest is
written to src/data/responsive-image-manifest.json. Original images stay untouched.
"""

from __future__ import annotations

import json
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
IMAGE_ROOT = ROOT / "public" / "images"
RENDITION_ROOT = IMAGE_ROOT / "responsive"
MANIFEST_PATH = ROOT / "src" / "data" / "responsive-image-manifest.json"
SUPPORTED_SUFFIXES = {".jpg", ".jpeg", ".png", ".webp"}
TARGET_WIDTHS = (480, 768)
RESPONSIVE_QUALITY = 82
FULL_JPEG_QUALITY = 86
# Social crawlers use the original Open Graph image directly; it is not a UI source.
ORIGINAL_ONLY_SOURCES = {"og-cover.jpg"}


def make_candidate(relative: Path, image: Image.Image, source_format: str, width: int) -> dict[str, int | str]:
    if width == image.width and source_format == "WEBP":
        return {"src": f"/images/{relative.as_posix()}", "width": width}

    output_relative = relative.with_suffix("")
    output_path = RENDITION_ROOT / output_relative.parent / f"{output_relative.name}-{width}.webp"
    output_path.parent.mkdir(parents=True, exist_ok=True)

    if width == image.width:
        rendition = image.copy()
        quality = FULL_JPEG_QUALITY
    else:
        target_height = max(1, round(image.height * width / image.width))
        rendition = image.resize((width, target_height), Image.Resampling.LANCZOS)
        quality = RESPONSIVE_QUALITY

    icc_profile = image.info.get("icc_profile")
    if rendition.mode not in ("RGB", "RGBA"):
        rendition = rendition.convert("RGBA" if "A" in rendition.getbands() else "RGB")
    rendition.save(
        output_path,
        format="WEBP",
        quality=quality,
        method=6,
        alpha_quality=100,
        icc_profile=icc_profile,
    )
    actual_width, _ = rendition.size
    return {
        "src": "/images/responsive/" + (output_relative.parent / f"{output_relative.name}-{width}.webp").as_posix(),
        "width": actual_width,
    }


def main() -> None:
    manifest: dict[str, dict[str, object]] = {}
    rendition_paths: set[Path] = set()
    original_bytes = 0

    source_paths = sorted(
        path
        for path in IMAGE_ROOT.rglob("*")
        if path.is_file()
        and path.suffix.lower() in SUPPORTED_SUFFIXES
        and RENDITION_ROOT not in path.parents
        and path.relative_to(IMAGE_ROOT).as_posix() not in ORIGINAL_ONLY_SOURCES
    )

    for source in source_paths:
        relative = source.relative_to(IMAGE_ROOT)
        original_bytes += source.stat().st_size
        with Image.open(source) as opened:
            source_format = (opened.format or source.suffix.lstrip(".")).upper()
            image = ImageOps.exif_transpose(opened)
            image.load()
            width, height = image.size
            candidate_widths = sorted({min(width, target) for target in TARGET_WIDTHS})
            candidates = []

            for candidate_width in candidate_widths:
                candidate = make_candidate(relative, image, source_format, candidate_width)
                candidates.append(candidate)
                candidate_src = candidate["src"]
                if str(candidate_src).startswith("/images/responsive/"):
                    rendition_paths.add(IMAGE_ROOT / str(candidate_src).removeprefix("/images/"))

            manifest[f"/images/{relative.as_posix()}"] = {
                "width": width,
                "height": height,
                "sources": candidates,
            }

    for path in RENDITION_ROOT.rglob("*") if RENDITION_ROOT.exists() else []:
        if path.is_file() and path not in rendition_paths:
            path.unlink()
    if RENDITION_ROOT.exists():
        for directory in sorted((p for p in RENDITION_ROOT.rglob("*") if p.is_dir()), reverse=True):
            try:
                directory.rmdir()
            except OSError:
                pass

    MANIFEST_PATH.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST_PATH.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    rendition_bytes = sum(path.stat().st_size for path in rendition_paths if path.exists())
    print(f"Sources: {len(source_paths)}; responsive candidates: {len(rendition_paths)}")
    print(f"Originals: {original_bytes:,} bytes (unchanged); generated WebP: {rendition_bytes:,} bytes")
    print(f"Manifest: {MANIFEST_PATH.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
