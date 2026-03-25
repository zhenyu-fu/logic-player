export type RiskLevel = 'low' | 'medium' | 'high';

export interface Strategy {
  id: string;
  name: string;
  tags: string[];
  description: string;
  updatedAt: string;
  riskLevel: RiskLevel;
  enabled: boolean;
}

