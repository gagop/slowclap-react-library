import { ReactNode, useContext } from 'react';
import { ExperimentContext } from './ExperimentContext';
import { VariantName } from './types';

interface VariantProps {
  name: VariantName;
  children: ReactNode;
}

export const Variant: React.FC<VariantProps> = ({ name, children }) => {
  const experimentContext = useContext(ExperimentContext);

  if (!experimentContext) {
    throw new Error('Variant must be used within an ExperimentProvider');
  }

  const { variant } = experimentContext;

  if (variant === name) {
    return children;
  }

  return null;
};
