/**
 *
 * @param obj1 - first object to compare
 * @param obj2 - second object to compare
 * @returns true - when two objects are the same
 */
export const compareObjects = <T extends object>(obj1: T | undefined, obj2: T | undefined) => {
  if (obj1 === obj2) return true;

  if (!obj1 || !obj2) return false;

  return Object.entries(obj1).every(([key, value]) => obj2[key as keyof T] === value);
};
