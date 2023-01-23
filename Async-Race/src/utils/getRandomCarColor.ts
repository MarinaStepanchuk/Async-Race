export const getRandomCarColor = (): string => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
};
