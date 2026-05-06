import { useMemo, useState } from "react";
import FilterBar from "../components/FilterBar";
import DataTable from "../components/DataTable";
import ActionPanel from "../components/ActionPanel";
import StatusChip from "../components/StatusChip";

export default function ProofChainViewer({ events }) {
  const [proofPackage, setProofPackage] = useState("All");
  const [eventType, setEventType] = useState("All");
  const [dateRange, setDateRange] = useState("Last 7 days");
  const [exportFormat, setExportFormat] = useState("PDF");

  const options = useMemo(() => {
    return {
      proofPackage: ["All", ...new Set(events.map((item) => item.pkg))],
      eventType: ["All", ...new Set(events.map((item) => item.eventType))]
    };
  }, [events]);

  const filtered = events.filter((item) => {
    return (
      (proofPackage === "All" || item.pkg === proofPackage) &&
      (eventType === "All" || item.eventType === eventType)
    );
  });

  const columns = [
    { key: "pkg", label: "Proof Package" },
    { key: "loanId", label: "Loan ID" },
    { key: "eventType", label: "Event Type" },
    { key: "timestamp", label: "Timestamp" },
    { key: "hash", label: "Hash Reference" },
    { key: "actor", label: "Actor" },
    { key: "status", label: "Status", render: (value) => <StatusChip label={value} tone="good" /> }
  ];

  return (
    <section className="screen-layout">
      <FilterBar
        filters={[
          { label: "Proof Package", value: proofPackage, options: options.proofPackage, onChange: setProofPackage },
          { label: "Event Type", value: eventType, options: options.eventType, onChange: setEventType },
          { label: "Date Range", value: dateRange, options: ["Last 24 hours", "Last 7 days", "Last 30 days"], onChange: setDateRange },
          { label: "Export Format", value: exportFormat, options: ["PDF", "CSV", "JSON"], onChange: setExportFormat }
        ]}
      />
      <div className="split-panels">
        <article className="panel">
          <h3>Proof Package Summary</h3>
          <p className="muted">Selected package: {proofPackage === "All" ? "All active packages" : proofPackage}</p>
          <ul className="bullet-list">
            <li>Events in view: {filtered.length}</li>
            <li>Date range: {dateRange}</li>
            <li>Export format: {exportFormat}</li>
          </ul>
        </article>
        <article className="panel">
          <h3>Chain-of-Custody Timeline</h3>
          <p className="muted">Ownership and state transitions are shown in immutable event order.</p>
          <ol className="timeline-list">
            {filtered.slice(0, 4).map((event) => (
              <li key={`${event.pkg}-${event.hash}`}>
                <strong>{event.eventType}</strong> by {event.actor} at {event.timestamp}
              </li>
            ))}
          </ol>
        </article>
      </div>
      <DataTable columns={columns} rows={filtered} />
      <ActionPanel title="Available Functions" actions={["Validate Proof Set", "Export Diligence Evidence", "Approve Eligibility Handoff"]} />
    </section>
  );
}
