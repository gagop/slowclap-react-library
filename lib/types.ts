export type VariantName = string;

export interface VariantOption {
  name: VariantName;
  weight: number;
}

export interface ExperimentContextType {
  variant: VariantName | null;
  setVariant: (variant: VariantName) => void;
}

export type DetermineVariantFunction = (userId: string, variants: VariantOption[]) => VariantName;
