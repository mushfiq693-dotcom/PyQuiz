/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', 'serif'],
        sans: ['"Source Sans 3"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'Fira Code', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        editorial: {
          bg: 'var(--background)',
          fg: 'var(--foreground)',
          muted: 'var(--muted)',
          'muted-fg': 'var(--muted-foreground)',
          accent: 'var(--accent)',
          'accent-light': 'var(--accent-secondary)',
          'accent-muted': 'var(--accent-muted)',
          border: 'var(--border)',
          card: 'var(--card)',
        },
      },
      boxShadow: {
        'editorial-sm': '0 1px 2px var(--shadow-color)',
        'editorial-md': '0 4px 12px var(--shadow-color)',
        'editorial-lg': '0 8px 24px var(--shadow-color)',
        'editorial-accent': '0 4px 14px var(--accent-glow)',
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'timer-ring': 'timerRing 20s linear forwards',
      },
    },
  },
  plugins: [],
}

