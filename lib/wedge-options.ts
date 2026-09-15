// Size and density are two separate choices. Colour identifies the size; density is the foam.
// Both are derived from the original Shopify variant titles so checkout is never affected.

export type SizeKey = "blue" | "red" | "black";
export type DensityKey = "standard" | "extra-firm";

export const sizeOrder: SizeKey[] = ["blue", "red", "black"];
export const densityOrder: DensityKey[] = ["standard", "extra-firm"];

export const sizeInfo: Record<SizeKey, {
  name: string; code: string; swatch: string; height: string; torso: string; image: string; extraFirmImage?: string;
}> = {
  blue: { name: "Small / Medium", code: "S/M", swatch: "#3c65b5", height: "5'6\" and under", torso: "Short to average torso", image: "blue-original.png", extraFirmImage: "blue-extra-firm.png" },
  red: { name: "Medium / Large", code: "L", swatch: "#bc3f48", height: "5'6\" and above", torso: "Average to long torso", image: "red-original.png", extraFirmImage: "red-extra-firm.png" },
  black: { name: "X-Large", code: "L/XL", swatch: "#262b26", height: "6'0\" and above", torso: "Long torso", image: "black-original.png" },
};

export const densityInfo: Record<DensityKey, { name: string; foam: string; weight: string; detail: string }> = {
  standard: { name: "Standard", foam: "Dense foam", weight: "Up to 250 lbs", detail: "The original firmness. The starting point for most people." },
  "extra-firm": { name: "Extra Firm", foam: "Extra firm foam", weight: "250 lbs and above", detail: "More supportive foam for a firmer feel under load." },
};

export type WedgeVariant = { id: number; title: string; price: number; available: boolean };
export type WedgeOption = WedgeVariant & { size: SizeKey; density: DensityKey };

/** "Blue (S/M) Extra Firm" -> { size: "blue", density: "extra-firm" }. Kit titles say "Firm", which is the standard foam. */
export function describeVariant(title: string): { size: SizeKey; density: DensityKey } {
  const size: SizeKey = title.startsWith("Red") ? "red" : title.startsWith("Blue") ? "blue" : "black";
  return { size, density: /extra\s*firm/i.test(title) ? "extra-firm" : "standard" };
}

export function toOptions(variants: readonly WedgeVariant[]): WedgeOption[] {
  return variants.map(v => ({ ...v, ...describeVariant(v.title) }));
}

export const availableSizes = (options: WedgeOption[]) => sizeOrder.filter(size => options.some(o => o.size === size));
export const availableDensities = (options: WedgeOption[]) => densityOrder.filter(density => options.some(o => o.density === density));
export const findOption = (options: WedgeOption[], size: SizeKey, density: DensityKey) => options.find(o => o.size === size && o.density === density);

/** The chosen density, or the fallback that exists for this size. */
export function resolveDensity(options: WedgeOption[], size: SizeKey, density: DensityKey): DensityKey {
  if (findOption(options, size, density)) return density;
  return densityOrder.find(d => findOption(options, size, d)) || density;
}

export const productImage = (size: SizeKey, density: DensityKey) =>
  density === "extra-firm" && sizeInfo[size].extraFirmImage ? sizeInfo[size].extraFirmImage! : sizeInfo[size].image;
