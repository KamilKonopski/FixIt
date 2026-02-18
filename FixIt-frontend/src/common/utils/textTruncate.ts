export const textTruncate = (str: string, number: number): string => {
  return str && str.length > number ? str.slice(0, number) + "..." : str;
};
