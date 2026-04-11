/**
 * Carbon Type — main.js
 *
 * Responsibilities:
 *   1. Load the stylesheet (Vite processes CSS imports).
 *   2. Resolve and apply the initial theme before first paint.
 *   3. Persist theme choice in localStorage.
 *   4. Respond to OS-level prefers-color-scheme changes.
 *   5. Wire up the theme toggle button.
 *   6. Emit a live-region update when the theme changes so
 *      screen readers can announce it (WCAG 4.1.3).
 */

import './styles.css';

const STORAGE_KEY = 'carbon-type-theme';
const DARK = 'dark';
const LIGHT = 'light';

const html = document.documentElement;

/** Return the theme that should be active on load. */
function resolveInitialTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === DARK || stored === LIGHT) return stored;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? LIGHT : DARK;
}

/** Apply a theme and persist the choice. */
function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEY, theme);
  announceThemeChange(theme);
  syncToggleButton(theme);
}

/** Update toggle button label and pressed state. */
function syncToggleButton(theme) {
  const btns = document.querySelectorAll('[data-action="toggle-theme"]');
  btns.forEach((btn) => {
    const isDark = theme === DARK;
    btn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    btn.textContent = isDark ? '☀ Light' : '☽ Dark';
  });
}

/**
 * Announce theme changes to screen readers via a visually-hidden
 * aria-live region (WCAG SC 4.1.3 – Status Messages).
 */
function announceThemeChange(theme) {
  let region = document.getElementById('theme-announce');
  if (!region) {
    region = document.createElement('div');
    region.id = 'theme-announce';
    region.setAttribute('role', 'status');
    region.setAttribute('aria-live', 'polite');
    region.setAttribute('aria-atomic', 'true');
    region.className = 'sr-only';
    document.body.appendChild(region);
  }
  region.textContent = theme === DARK ? 'Dark theme applied.' : 'Light theme applied.';
}

/* ── Initialise on load ───────────────────── */
applyTheme(resolveInitialTheme());

/* ── Respond to OS preference changes ─────── */
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (event) => {
  /* Only auto-switch when the user hasn't made an explicit choice. */
  if (!localStorage.getItem(STORAGE_KEY)) {
    applyTheme(event.matches ? LIGHT : DARK);
  }
});

/* ── Theme toggle button handler ──────────── */
document.addEventListener('click', (event) => {
  const btn = event.target.closest('[data-action="toggle-theme"]');
  if (!btn) return;
  const current = html.getAttribute('data-theme') ?? DARK;
  applyTheme(current === DARK ? LIGHT : DARK);
});
