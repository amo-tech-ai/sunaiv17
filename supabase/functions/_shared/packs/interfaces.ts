
export interface DiagnosticOption {
  label: string;
  mapped_system_id: string;
  pain_point_tag: string;
  ai_explanation?: string;
  priority_weight?: 'Critical' | 'High' | 'Medium' | 'Low';
}

export interface DiagnosticQuestion {
  id: string;
  text: string;
  ai_hint: string;
  type: 'single' | 'multi';
  options: DiagnosticOption[];
}

export interface DiagnosticSection {
  id: string;
  title: string;
  description: string;
  questions: DiagnosticQuestion[];
}

export interface IndustryPack {
  industry: string;
  systemNames: Record<string, string>;
  roiFormulas: Record<string, string>;
  diagnosticTemplates: Record<string, string>;
  kpis: string[];
  riskFactors: string[];
  diagnostics: DiagnosticSection[];
  fallbackQuestions?: DiagnosticSection[]; // Added based on potential usage in some files, though optional
}
