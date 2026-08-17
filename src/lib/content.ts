/**
 * Returns true if a data field holds real content rather than an
 * un-filled "[TODO: ...]" placeholder (see src/data/*.ts). Used to hide
 * incomplete UI — a broken social link or an empty video embed — until
 * the real value is filled in, instead of rendering the placeholder
 * text as if it were live content.
 */
export function hasContent(value?: string | null): boolean {
  if (!value) return false;
  return !value.trim().startsWith("[TODO");
}
