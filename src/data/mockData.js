export const roles = ["Operations Analyst", "Data Ops Specialist", "Risk Reviewer", "Compliance Reviewer", "Capital Markets"];

export const globalStates = [
  "All States",
  "Ingested",
  "Reconstructed",
  "Scored",
  "ProofAnchored",
  "DiligenceOpen",
  "WholeLoanReady",
  "MBSReady",
  "TokenCandidate"
];

export const intakePools = [
  { id: "POOL-104", seller: "BlueRidge Capital", sourceType: "Warehouse Fallout", schemaProfile: "MISMO 3.4", status: "Ingested", missingArtifacts: 12, schemaErrors: 3, integrity: "Hash Seeded" },
  { id: "POOL-221", seller: "Summit Servicing", sourceType: "Servicer Transfer", schemaProfile: "CSV Legacy", status: "Ingested", missingArtifacts: 5, schemaErrors: 1, integrity: "Hash Seeded" },
  { id: "POOL-318", seller: "Axis Non-QM", sourceType: "Originator Pool", schemaProfile: "MISMO 3.6", status: "Routed", missingArtifacts: 2, schemaErrors: 0, integrity: "Hash Confirmed" }
];

export const reconstructionLoans = [
  { loanId: "LN-77821", template: "Non-QM v2", artifactType: "Title", confidence: "High", coverage: 92, ownerChain: "Complete", conflictCount: 1 },
  { loanId: "LN-77834", template: "NPL v1", artifactType: "Assignment", confidence: "Medium", coverage: 76, ownerChain: "Gap Found", conflictCount: 3 },
  { loanId: "LN-77891", template: "RPL v1", artifactType: "Servicing", confidence: "High", coverage: 88, ownerChain: "Complete", conflictCount: 0 }
];

export const defectQueue = [
  { defectId: "DF-1002", loanId: "LN-77834", severity: "High", category: "Assignment Gap", owner: "Legal Ops", sla: "5 days", exceptionReason: "Pending corrective assignment", status: "Open" },
  { defectId: "DF-1028", loanId: "LN-77821", severity: "Medium", category: "Stale Appraisal", owner: "Valuation Team", sla: "3 days", exceptionReason: "Re-order initiated", status: "InCure" },
  { defectId: "DF-1091", loanId: "LN-77819", severity: "Low", category: "Doc Mismatch", owner: "Data Ops", sla: "2 days", exceptionReason: "Minor metadata mismatch", status: "AcceptedException" }
];

export const proofPackages = [
  { pkg: "PKG-ARZ-01", loanId: "LN-77834", eventType: "OwnershipTransition", timestamp: "2026-05-05 14:42 UTC", hash: "8a7f...b42e", actor: "Legal Ops", status: "Verified" },
  { pkg: "PKG-ARZ-01", loanId: "LN-77834", eventType: "DefectCure", timestamp: "2026-05-06 09:18 UTC", hash: "14bf...ee21", actor: "Risk Reviewer", status: "Verified" },
  { pkg: "PKG-TX-04", loanId: "LN-77821", eventType: "ServicingUpdate", timestamp: "2026-05-06 10:07 UTC", hash: "5dc1...77fa", actor: "Servicer Feed", status: "Verified" }
];

export const diligenceAssets = [
  {
    assetId: "AST-300",
    assetClass: "Non-QM",
    geography: "TX",
    riskProfile: "Moderate",
    eligibility: "DiligenceOnly",
    distributionPath: "WholeLoan",
    tokenizationStatus: "NotPlanned",
    disclosure: "2 open cures",
    servicing: "Current"
  },
  {
    assetId: "AST-301",
    assetClass: "NPL",
    geography: "FL",
    riskProfile: "High",
    eligibility: "NotReady",
    distributionPath: "MBS",
    tokenizationStatus: "Candidate",
    disclosure: "Assignment break",
    servicing: "Delinquent"
  },
  {
    assetId: "AST-302",
    assetClass: "RPL",
    geography: "CA",
    riskProfile: "Low",
    eligibility: "TokenCandidate",
    distributionPath: "MBS",
    tokenizationStatus: "Ready",
    disclosure: "No critical defects",
    servicing: "Current"
  },
  {
    assetId: "AST-303",
    assetClass: "Prime",
    geography: "NY",
    riskProfile: "Low",
    eligibility: "WholeLoanReady",
    distributionPath: "WholeLoan",
    tokenizationStatus: "NotPlanned",
    disclosure: "No critical defects",
    servicing: "Current"
  },
  {
    assetId: "AST-304",
    assetClass: "RPL",
    geography: "AZ",
    riskProfile: "Moderate",
    eligibility: "MBSReady",
    distributionPath: "MBS",
    tokenizationStatus: "Tokenized",
    disclosure: "All cures completed",
    servicing: "Current"
  }
];
