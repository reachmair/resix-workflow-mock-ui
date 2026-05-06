import { useMemo, useState } from "react";
import FilterBar from "../components/FilterBar";
import DataTable from "../components/DataTable";
import ActionPanel from "../components/ActionPanel";
import StatusChip from "../components/StatusChip";

export default function IntakeControlTower({ pools }) {
  const [sourceType, setSourceType] = useState("All");
  const [schemaProfile, setSchemaProfile] = useState("All");
  const [status, setStatus] = useState("All");
  const [dateRange, setDateRange] = useState("Last 7 days");

  const options = useMemo(() => {
    return {
      sourceType: ["All", ...new Set(pools.map((pool) => pool.sourceType))],
      schemaProfile: ["All", ...new Set(pools.map((pool) => pool.schemaProfile))],
      status: ["All", ...new Set(pools.map((pool) => pool.status))]
    };
  }, [pools]);

  const filtered = pools.filter((pool) => {
    return (
      (sourceType === "All" || pool.sourceType === sourceType) &&
      (schemaProfile === "All" || pool.schemaProfile === schemaProfile) &&
      (status === "All" || pool.status === status)
    );
  });

  const columns = [
    { key: "id", label: "Pool ID" },
    { key: "seller", label: "Seller" },
    { key: "sourceType", label: "Source Type" },
    { key: "schemaProfile", label: "Schema Profile" },
    {
      key: "status",
      label: "Ingestion Status",
      render: (value) => <StatusChip label={value} tone={value === "Routed" ? "good" : "neutral"} />
    },
    { key: "missingArtifacts", label: "Missing Artifacts" },
    { key: "schemaErrors", label: "Schema Errors" },
    {
      key: "integrity",
      label: "Integrity",
      render: (value) => <StatusChip label={value} tone={value === "Hash Confirmed" ? "good" : "warn"} />
    }
  ];

  return (
    <section className="screen-layout">
      <FilterBar
        filters={[
          { label: "Source Type", value: sourceType, options: options.sourceType, onChange: setSourceType },
          { label: "Schema Profile", value: schemaProfile, options: options.schemaProfile, onChange: setSchemaProfile },
          { label: "Status", value: status, options: options.status, onChange: setStatus },
          { label: "Date Range", value: dateRange, options: ["Last 24 hours", "Last 7 days", "Last 30 days"], onChange: setDateRange }
        ]}
      />

      <div className="stats-grid">
        <article className="stat-card"><span>Total Pools</span><strong>{filtered.length}</strong></article>
        <article className="stat-card"><span>Missing Artifacts</span><strong>{filtered.reduce((sum, row) => sum + row.missingArtifacts, 0)}</strong></article>
        <article className="stat-card"><span>Schema Errors</span><strong>{filtered.reduce((sum, row) => sum + row.schemaErrors, 0)}</strong></article>
        <article className="stat-card"><span>Date Window</span><strong>{dateRange}</strong></article>
      </div>

      <DataTable columns={columns} rows={filtered} />

      <ActionPanel title="Available Functions" actions={["Accept Batch", "Request Missing Docs", "Route to Reconstruction"]} />
    </section>
  );
}
