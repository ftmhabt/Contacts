export function ValidateNumericInput(str: string): string | undefined {
  const number = Number(str);

  if (isNaN(number)) {
    return "Enter only numbers.";
  }

  return undefined;
}
