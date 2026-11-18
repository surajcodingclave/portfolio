const colors = require('tailwindcss/colors');

function themedPalette(palette, setting, targets, weight) {
  return Object.fromEntries(Object.entries(palette).map(([shade]) => [shade, ({ opacityValue = 1 }) => {
    const target = targets(shade);
    const edited = `color-mix(in srgb, var(--portfolio-${setting}) ${weight(shade)}%, ${target})`;
    const color = `var(--portfolio-${setting}-off, ${edited})`;
    return `color-mix(in srgb, var(--portfolio-${setting}-${shade}, ${color}) calc(${opacityValue} * 100%), transparent)`;
  }]));
}

const { slate, blue, cyan } = colors;
const accent = themedPalette(blue, 'accent', (shade) => shade < 500 ? 'white' : 'black',
  (shade) => shade < 500 ? 10 + shade * 0.18 : Math.max(20, 100 - (shade - 500) * 0.17));
const highlight = themedPalette(cyan, 'highlight', (shade) => shade < 400 ? 'white' : 'black',
  (shade) => shade < 400 ? 10 + shade * 0.2 : Math.max(20, 100 - (shade - 400) * 0.15));
const surfaceWeights = { 50: 3, 100: 8, 200: 16, 300: 28, 400: 42, 500: 58, 600: 74, 700: 86, 800: 93, 900: 98, 950: 100 };
const textWeights = { 50: 100, 100: 96, 200: 88, 300: 80, 400: 60, 500: 40 };
const surface = themedPalette(slate, 'surface', () => 'white', (shade) => surfaceWeights[shade]);
const text = themedPalette(slate, 'text', () => 'black', (shade) => textWeights[shade]);
const textShades = Object.fromEntries(Object.entries(text).filter(([shade]) => Number(shade) <= 500));

module.exports = {
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  plugins: [],
  theme: {
    extend: {
      colors: { blue: accent, cyan: highlight, slate: { ...surface, ...textShades } },
      fontFamily: {
        display: ['system-ui', 'sans-serif'],
        body: ['system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'monospace'],
      },
      animation: { marquee: 'marquee 30s linear infinite' },
    },
  },
};
