import { useMemo, useState } from "react";
import FilterBar from "../components/FilterBar";
import DataTable from "../components/DataTable";
import ActionPanel from "../components/ActionPanel";
import StatusChip from "../components/StatusChip";

export default function DefectAndCureConsole({ defects }) {
  const [severity, setSeverity] = useState("All");
  const [category, setCategory] = useState("All");
  const [owner, setOwner] = useState("All");
  const [slaWindow, setSlaWindow] = useState("All");
  const [exceptionReason, setExceptionReason] = useState("All");

  const options = useMemo(() => {
    return {
      severity: ["All", ...new Set(defects.map((item) => item.severity))],
      category: ["All", ...new Set(defects.map((item) => item.category))],
      owner: ["All", ...new Set(defects.map((item) => item.owner))],
      slaWindow: ["All", ...new Set(defects.map((item) => item.sla))],
      exceptionReason: ["All", ...new Set(defects.map((item) => item.exceptionReason))]
    };
  }, [defects]);

  const filtered = defects.filter((item) => {
    return (
      (severity === "All" || item.severity === severity) &&
      (category === "All" || item.category === category) &&
      (owner === "All" || item.owner === owner) &&
      (slaWindow === "All" || item.sla === slaWindow) &&
      (exceptionReason === "All" || item.exceptionReason === exceptionReason)
    );
  });

  const columns = [
    { key: "defectId", label: "Defect ID" },
    { key: "loanId", label: "Loan ID" },
    { key: "severity", label: "Severity", render: (value) => <StatusChip label={value} tone={value === "High" ? "warn" : value === "Medium" ? "neutral" : "good"} /> },
    { key: "category", label: "Category" },
    { key: "owner", label: "Cure Owner" },
    { key: "sla", label: "SLA Window" },
    { key: "exceptionReason", label: "Exception Reason" },
    { key: "status", label: "State", render: (value) => <StatusChip label={value} tone={value === "Open" ? "warn" : "neutral"} /> }
  ];

  return (
    <section className="screen-layout">
      <FilterBar
        filters={[
          { label: "Severity", value: severity, options: options.severity, onChange: setSeverity },
          { label: "Defect Category", value: category, options: options.category, onChange: setCategory },
          { label: "Owner", value: owner, options: options.owner, onChange: setOwner },
          { label: "SLA Window", value: slaWindow, options: options.slaWindow, onChange: setSlaWindow },
          { label: "Exception Reason", value: exceptionReason, options: options.exceptionReason, onChange: setExceptionReason }
        ]}
      />
      <DataTable columns={columns} rows={filtered} />
      <ActionPanel title="Available Functions" actions={["Assign Cure Owner", "Approve Exception with Reason", "Re-score Defect"]} />
    </section>
  );
}
