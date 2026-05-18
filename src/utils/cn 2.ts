/**
 * Utility function to merge class names conditionally.
 * Uses clsx and tailwind-merge logic for Tailwind CSS class deduplication.
 */

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
