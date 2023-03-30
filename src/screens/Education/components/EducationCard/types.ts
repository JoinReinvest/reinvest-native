import { ReactNode } from 'react';

export interface EducationCardProps {
  buttonLabel: string;
  subtitle: string;
  title: string;
  uri: string;
  icon?: ReactNode;
}
