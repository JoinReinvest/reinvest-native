export const maskSocialSecurityNumber = (value: string | undefined) => {
  if (value) {
    const lastFourDigits = value.slice(-4);

    return `***-**-${lastFourDigits}`;
  }

  return '';
};
