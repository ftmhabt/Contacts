export function ValidateStringLength(
  str: string,
  min: number,
  max: number
): string | undefined {
  if (str.length < min) return `Too short. Minimum ${min} characters.`;
  if (str.length > max) return `Too long. Maximum ${max} characters.`;
  return undefined;
}
