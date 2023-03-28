import {ReactNode} from 'react';

export interface EducationCardProps {
  buttonLabel: string;
  uri: string;
  icon?: ReactNode;
  subtitle: string;
  title: string;
}
