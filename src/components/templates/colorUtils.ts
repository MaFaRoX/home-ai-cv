// Utility functions for color manipulation in templates

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 37, g: 99, b: 235 }; // default blue
}

export function rgbToString(rgb: { r: number; g: number; b: number }): string {
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

export function darken(hex: string, percent: number = 20): string {
  const rgb = hexToRgb(hex);
  const factor = (100 - percent) / 100;
  return rgbToString({
    r: Math.round(rgb.r * factor),
    g: Math.round(rgb.g * factor),
    b: Math.round(rgb.b * factor),
  });
}

export function lighten(hex: string, percent: number = 20): string {
  const rgb = hexToRgb(hex);
  const factor = percent / 100;
  return rgbToString({
    r: Math.min(255, Math.round(rgb.r + (255 - rgb.r) * factor)),
    g: Math.min(255, Math.round(rgb.g + (255 - rgb.g) * factor)),
    b: Math.min(255, Math.round(rgb.b + (255 - rgb.b) * factor)),
  });
}

export function getGradient(hex: string): string {
  const base = rgbToString(hexToRgb(hex));
  const dark = darken(hex, 30);
  return `linear-gradient(to right, ${base}, ${dark})`;
}

export function getGradientDiagonal(hex: string): string {
  const base = rgbToString(hexToRgb(hex));
  const dark = darken(hex, 25);
  return `linear-gradient(135deg, ${base}, ${dark})`;
}

export function getColorPalette(hex: string) {
  const rgb = hexToRgb(hex);
  return {
    primary: rgbToString(rgb),
    primaryDark: darken(hex, 30),
    primaryLight: lighten(hex, 60),
    primaryVeryLight: lighten(hex, 80),
    primaryLighter: lighten(hex, 40), // For borders (like border-purple-300)
    primaryMedium: darken(hex, 20), // For text (like text-purple-800)
    primaryUltraLight: lighten(hex, 90), // For backgrounds (like bg-purple-50)
    primarySemiLight: lighten(hex, 70), // For subtle elements
    secondary: darken(hex, 15),
    gradient: getGradient(hex),
    gradientDiagonal: getGradientDiagonal(hex),
  };
}
