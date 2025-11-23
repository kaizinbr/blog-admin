// --- helpers to generate lighter variations ---
const baseColors = [
    "#2e2e2e",
    "#868e96",
    "#fa5252",
    "#e64980",
    "#be4bdb",
    "#7950f2",
    "#4c6ef5",
    "#228be6",
    "#15aabf",
    "#12b886",
    "#40c057",
    "#82c91e",
    "#fab005",
    "#fd7e14",
];

function hexToRgb(hex: string) {
    const h = hex.replace("#", "");
    const bigint = parseInt(
        h.length === 3
            ? h
                  .split("")
                  .map((c) => c + c)
                  .join("")
            : h,
        16
    );
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
}

function rgbToHex(r: number, g: number, b: number) {
    const toHex = (n: number) => {
        const s = Math.round(Math.max(0, Math.min(255, n))).toString(16);
        return s.length === 1 ? "0" + s : s;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function mixWithWhite(hex: string, t: number) {
    // t in [0,1], 0 => original, 1 => white
    const { r, g, b } = hexToRgb(hex);
    const nr = r + (255 - r) * t;
    const ng = g + (255 - g) * t;
    const nb = b + (255 - b) * t;
    return rgbToHex(nr, ng, nb);
}

function variationsForColor(hex: string, count = 8) {
    // produce `count` steps from original to a very light tint (not pure white)
    const maxT = 0.92; // how close to white the lightest variant is
    return Array.from({ length: count }).map((_, i) => {
        const t = (i / (count - 1)) * maxT;
        return mixWithWhite(hex, t);
    });
}

export function generateSwatches() {
    // flatten list of variations for all base colors
    return baseColors.flatMap((c) => variationsForColor(c, 8));
}
