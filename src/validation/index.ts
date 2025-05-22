export function ValidateStringLength(
  str: string,
  min: number,
  max: number
): string | undefined {
  if (str.length < min) return `Too short. Minimum ${min} characters.`;
  if (str.length > max) return `Too long. Maximum ${max} characters.`;
  return undefined;
}

export function ValidateNumericInput(str: string): string | undefined {
  return isNaN(Number(str)) ? "Enter only numbers." : undefined;
}

export function combineValidators(
  ...validators: Array<(input: string) => string | undefined>
): (input: string) => string | undefined {
  return (input: string) => {
    for (const validate of validators) {
      const error = validate(input);
      if (error) return error;
    }
    return undefined;
  };
}
