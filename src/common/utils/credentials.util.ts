function randomDigits(length: number): string {
  let result = '';
  for (let i = 0; i < length; i++) result += Math.floor(Math.random() * 10);
  return result;
}

export function generateLoginId(): string {
  const length = 4 + Math.floor(Math.random() * 3); // 4, 5 yoki 6 xonali
  return randomDigits(length);
}

export function generatePassword(): string {
  const length = Math.random() < 0.5 ? 5 : 6; // 5 yoki 6 xonali
  return randomDigits(length);
}