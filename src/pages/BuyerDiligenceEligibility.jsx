import { useMemo, useState } from "react";
import FilterBar from "../components/FilterBar";
import DataTable from "../components/DataTable";
import ActionPanel from "../components/ActionPanel";
import StatusChip from "../components/StatusChip";

export default function BuyerDiligenceEligibility({ assets }) {
  const [eligibility, setEligibility] = useState("All");
  const [assetClass, setAssetClass] = useState("All");
  const [geography, setGeography] = useState("All");
  const [riskProfile, setRiskProfile] = useState("All");

  const options = useMemo(() => {
    return {
      eligibility: ["All", ...new Set(assets.map((item) => item.eligibility))],
      assetClass: ["All", ...new Set(assets.map((item) => item.assetClass))],
      geography: ["All", ...new Set(assets.map((item) => item.geography))],
      riskProfile: ["All", ...new Set(assets.map((item) => item.riskProfile))]
    };
  }, [assets]);

  const filtered = assets.filter((item) => {
    return (
      (eligibility === "All" || item.eligibility === eligibility) &&
      (assetClass === "All" || item.assetClass === assetClass) &&
      (geography === "All" || item.geography === geography) &&
      (riskProfile === "All" || item.riskProfile === riskProfile)
    );
  });

  const columns = [
    { key: "assetId", label: "Asset ID" },
    { key: "assetClass", label: "Asset Class" },
    { key: "geography", label: "Geography" },
    { key: "riskProfile", label: "Risk Profile" },
    {
      key: "eligibility",
      label: "Eligibility",
      render: (value) => (
        <StatusChip
          label={value}
          tone={value === "TokenEligible" ? "good" : value === "NotReady" ? "warn" : "neutral"}
        />
      )
    },
    { key: "disclosure", label: "Defect Disclosure" },
    { key: "servicing", label: "Servicing Status" }
  ];

  return (
    <section className="screen-layout">
      <FilterBar
        filters={[
          { label: "Eligibility State", value: eligibility, options: options.eligibility, onChange: setEligibility },
          { label: "Asset Class", value: assetClass, options: options.assetClass, onChange: setAssetClass },
          { label: "Geography", value: geography, options: options.geography, onChange: setGeography },
          { label: "Risk Profile", value: riskProfile, options: options.riskProfile, onChange: setRiskProfile }
        ]}
      />
      <DataTable columns={columns} rows={filtered} />
      <ActionPanel title="Available Functions" actions={["Grant Diligence Access", "Trigger Token or Transfer Path", "Log Diligence Event"]} />
    </section>
  );
}
