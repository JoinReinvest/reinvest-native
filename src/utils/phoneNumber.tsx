export const maskPhoneNumber = (countryCode: string, phoneNumber: string) => {
  const maskedCountryCode = countryCode.replace(/[0-9]/g, 'x');
  const maskedPhoneNumber = phoneNumber
    .split('-')
    .join('')
    .replace(/[0-9]/g, 'x')
    .split('')
    .map((char, index) => ((index + 1) % 3 === 0 && index < 6 ? `${char}-` : char))
    .join('')
    .slice(0, -2);

  return `(${maskedCountryCode}) ${maskedPhoneNumber}${phoneNumber.slice(-2)}`;
};
