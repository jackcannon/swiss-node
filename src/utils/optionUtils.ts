export const option = <T extends unknown>(value: T, deflt: T, safeFn: (v: T, deflt?: T) => T) => (value !== undefined ? safeFn(value, deflt) : deflt);
export const optionalOption = <T extends unknown>(value: T, deflt: T, safeFn: (v: T, deflt?: T) => T) =>
  value !== undefined ? safeFn(value, deflt) : undefined;
