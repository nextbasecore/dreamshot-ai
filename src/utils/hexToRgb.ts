export const hexToRgb = (color: string): number[] => {
  const parts = color.replace("#", "").match(/.{1,2}/g);
  if (!parts) {
    return [];
  }
  return parts.map((part) => parseInt(part, 16));
};

