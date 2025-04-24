export async function GetValidInput(
  ask: () => Promise<string>,
  validate: (input: string) => [true] | [false, string]
): Promise<string> {
  const input = await ask();
  const [isValid, message] = validate(input);
  if (isValid) return input;
  console.error(message);
  return GetValidInput(ask, validate);
}
