import React, { ReactNode, useEffect } from 'react';
import { ExperimentContextType, VariantOption } from './types';
import { determineVariant } from './determineVariant';

/**
 * Context for the A/B testing experiment.
 * This will provide access to the current active variant and a setter to update it (if necessary).
 */
export const ExperimentContext = React.createContext<ExperimentContextType | undefined>(undefined);

interface ExperimentProviderProps {
  children: ReactNode;
  userId: string;
  variants: VariantOption[];
}

/**
 * Provider component that determines and provides the current active variant
 * based on the user ID and defined variant weights.
 * @param children - The children to render.
 * @param userId - The user ID to use for determining the variant.
 * @param variants - The variants to choose from.
 *
 * @component
 * @example
 * <ExperimentProvider userId="12345" variants={[{ name: 'A', weight: 1 }, { name: 'B', weight: 2 }]}>
 *   <App />
 * </ExperimentProvider>
 */
export const ExperimentProvider = ({ children, userId, variants }: ExperimentProviderProps) => {
  const [variant, setVariant] = React.useState<string | null>(null);

  useEffect(() => {
    setVariant(determineVariant(userId, variants));
  }, [userId, variants]);

  return <ExperimentContext.Provider value={{ variant, setVariant }}>{children}</ExperimentContext.Provider>;
};
