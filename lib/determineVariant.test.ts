import { describe, it, expect, vi } from 'vitest';
import { determineVariant } from './determineVariant';
import { VariantOption } from './types';

vi.mock('./determineVariant', async () => {
  const actual: object = await vi.importActual('./determineVariant');
  return {
    ...actual,
    simpleHash: vi.fn(() => 2345), // Mock the simpleHash function
  };
});

describe('determineVariant', () => {
  it('should return a variant based on the hash of the userId', () => {
    // Arrange
    const userId = 'user123';
    const variants: VariantOption[] = [
      { name: 'A', weight: 50 },
      { name: 'B', weight: 50 },
    ];

    // Act
    const variant = determineVariant(userId, variants);

    // Assert
    expect(variant).toBe('B');
  });

  it('should return a variant based on the hash of the userId 2', () => {
    // Arrange
    const userId = 'user123';
    const variants: VariantOption[] = [
      { name: 'A', weight: 500 },
      { name: 'B', weight: 40 },
    ];

    // Act
    const variant = determineVariant(userId, variants);

    // Assert
    expect(variant).toBe('A');
  });
});
