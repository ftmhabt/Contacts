export function ValidateStringLength(
  str: string,
  min: number,
  max: number
): [true] | [false, string] {
  if (str.length < min) {
    return [false, `String is too short. Minimum length is ${min}.`];
  }

  if (str.length > max) {
    return [false, `String is too long. Maximum length is ${max}.`];
  }

  return [true];
}
