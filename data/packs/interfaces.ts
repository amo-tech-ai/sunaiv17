
import { DiagnosticSection } from "../../types";

export interface IndustryPack {
  industry: string;
  systemNames: Record<string, string>;
  roiFormulas: Record<string, string>;
  diagnosticTemplates: Record<string, string>;
  kpis: string[];
  riskFactors: string[];
  diagnostics: DiagnosticSection[];
  fallbackQuestions?: DiagnosticSection[];
}
