export type ParsedCountUpValue = {
  target: number;
  suffix: string;
};

export const parseCountUpValue = (value: string): ParsedCountUpValue | null => {
  const match = value.trim().match(/^(\d+)(.*)$/);
  if (!match) return null;

  return {
    target: Number(match[1]),
    suffix: match[2],
  };
};
