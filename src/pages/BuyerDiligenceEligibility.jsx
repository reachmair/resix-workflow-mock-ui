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
  const [distributionPath, setDistributionPath] = useState("All");
  const [tokenizationStatus, setTokenizationStatus] = useState("All");

  const options = useMemo(() => {
    return {
      eligibility: ["All", ...new Set(assets.map((item) => item.eligibility))],
      assetClass: ["All", ...new Set(assets.map((item) => item.assetClass))],
      geography: ["All", ...new Set(assets.map((item) => item.geography))],
      riskProfile: ["All", ...new Set(assets.map((item) => item.riskProfile))],
      distributionPath: ["All", ...new Set(assets.map((item) => item.distributionPath))],
      tokenizationStatus: ["All", ...new Set(assets.map((item) => item.tokenizationStatus))]
    };
  }, [assets]);

  const filtered = assets.filter((item) => {
    return (
      (eligibility === "All" || item.eligibility === eligibility) &&
      (assetClass === "All" || item.assetClass === assetClass) &&
      (geography === "All" || item.geography === geography) &&
      (riskProfile === "All" || item.riskProfile === riskProfile) &&
      (distributionPath === "All" || item.distributionPath === distributionPath) &&
      (tokenizationStatus === "All" || item.tokenizationStatus === tokenizationStatus)
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
          tone={
            value === "WholeLoanReady" || value === "MBSReady"
              ? "good"
              : value === "NotReady"
                ? "warn"
                : "neutral"
          }
        />
      )
    },
    { key: "distributionPath", label: "Distribution Path" },
    { key: "tokenizationStatus", label: "Tokenization Status" },
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
          { label: "Risk Profile", value: riskProfile, options: options.riskProfile, onChange: setRiskProfile },
          { label: "Distribution Path", value: distributionPath, options: options.distributionPath, onChange: setDistributionPath },
          { label: "Tokenization Status", value: tokenizationStatus, options: options.tokenizationStatus, onChange: setTokenizationStatus }
        ]}
      />
      <DataTable columns={columns} rows={filtered} />
      <ActionPanel title="Available Functions" actions={["Grant Diligence Access", "Select Distribution Path", "Queue Optional Tokenization", "Log Diligence Event"]} />
    </section>
  );
}
