import { VariantName, VariantOption } from './types';

/**
 * Determines which variant a user should see based on their user ID and the weights of each variant.
 * It assigns a consistent variant to each user ID across sessions by using a hashing function.
 *
 * @param {string} userId - A unique identifier for the user.
 * @param {VariantOption[]} variants - An array of variant options, each with a name and a weight.
 * @returns {VariantName} The name of the chosen variant for the user.
 *
 * @example
 * const userId = 'user123';
 * const variants = [
 *   { name: 'A', weight: 1 },
 *   { name: 'B', weight: 2 },
 * ];
 * const chosenVariant = determineVariant(userId, variants);
 * // chosenVariant will be 'A' or 'B', with 'B' being twice as likely as 'A'
 */
export const determineVariant = (userId: string, variants: VariantOption[]): VariantName => {
  const hash = simpleHash(userId);

  const totalWeight = variants.reduce((acc, variant) => acc + variant.weight, 0);

  const normalizedHash = hash % totalWeight;

  let cumulativeWeight = 0;
  for (let i = 0; i < variants.length; i++) {
    const variant = variants[i];
    cumulativeWeight += variant.weight;
    if (normalizedHash < cumulativeWeight) {
      return variant.name;
    }
  }

  // In a very unlikely event of error, return the last variant
  return variants[variants.length - 1].name;
};

/**
 * Generates a hash code from a string.
 * This is a simple non-cryptographic hash function based on the djb2 algorithm.
 * https://theartincode.stanis.me/008-djb2/
 * @param {string} str - The input string from which to generate the hash code.
 * @returns {number} The generated hash code.
 */
export const simpleHash = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
  }
  return Math.abs(hash);
};
