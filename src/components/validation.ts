export function ValidateStringLength(str: string, min: number, max: number) {
  const length = str.length;

  if (length < min) {
    console.error(`String is too short. Minimum length is ${min}.`);
    return false;
  }

  if (length > max) {
    console.error(`String is too long. Maximum length is ${max}.`);
    return false;
  }

  return true;
}
