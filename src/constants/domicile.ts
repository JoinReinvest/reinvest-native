export const DOMICILE_LABELS = ['US Citizen', 'Visa', 'Green Card'] as const;

export type DomicileLabel = (typeof DOMICILE_LABELS)[number];
