import { useMemo, useState } from "react";
import FilterBar from "../components/FilterBar";
import DataTable from "../components/DataTable";
import ActionPanel from "../components/ActionPanel";
import StatusChip from "../components/StatusChip";

export default function LoanReconstructionWorkspace({ loans }) {
  const [template, setTemplate] = useState("All");
  const [artifactType, setArtifactType] = useState("All");
  const [confidence, setConfidence] = useState("All");

  const options = useMemo(
    () => ({
      template: ["All", ...new Set(loans.map((loan) => loan.template))],
      artifactType: ["All", ...new Set(loans.map((loan) => loan.artifactType))],
      confidence: ["All", ...new Set(loans.map((loan) => loan.confidence))]
    }),
    [loans]
  );

  const filtered = loans.filter((loan) => {
    return (
      (template === "All" || loan.template === template) &&
      (artifactType === "All" || loan.artifactType === artifactType) &&
      (confidence === "All" || loan.confidence === confidence)
    );
  });

  const columns = [
    { key: "loanId", label: "Loan ID" },
    { key: "template", label: "Mapping Template" },
    { key: "artifactType", label: "Artifact Focus" },
    { key: "confidence", label: "Confidence Threshold" },
    { key: "coverage", label: "Coverage %" },
    {
      key: "ownerChain",
      label: "Ownership Chain",
      render: (value) => <StatusChip label={value} tone={value === "Complete" ? "good" : "warn"} />
    },
    { key: "conflictCount", label: "Mapping Conflicts" }
  ];

  return (
    <section className="screen-layout">
      <FilterBar
        filters={[
          { label: "Mapping Template", value: template, options: options.template, onChange: setTemplate },
          { label: "Artifact Type", value: artifactType, options: options.artifactType, onChange: setArtifactType },
          { label: "Confidence Threshold", value: confidence, options: options.confidence, onChange: setConfidence }
        ]}
      />

      <div className="split-panels">
        <article className="panel">
          <h3>Canonical Field Panel</h3>
          <p className="muted">Normalized identifiers, borrower, collateral, and lien metadata mapped into canonical schema.</p>
          <ul className="bullet-list">
            <li>Primary Identifier: LN-77834</li>
            <li>Collateral Type: Residential 1-4</li>
            <li>Lien Position: 1st</li>
            <li>Assignment Chain Confidence: 76%</li>
          </ul>
        </article>
        <article className="panel">
          <h3>Source Mapping Panel</h3>
          <p className="muted">Raw source fields and mismatches requiring resolution before defect scoring.</p>
          <ul className="bullet-list">
            <li>Legacy Field: MORT_NOTE_VER to `note_version`</li>
            <li>Mismatch: Assignment date format inconsistency</li>
            <li>Pending artifact re-link: Title policy revision</li>
          </ul>
        </article>
      </div>

      <DataTable columns={columns} rows={filtered} />
      <ActionPanel title="Available Functions" actions={["Resolve Mapping Conflicts", "Attach or Replace Artifact", "Submit to Defect Scoring"]} />
    </section>
  );
}
