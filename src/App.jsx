import { useMemo, useState } from "react";
import AppShell from "./components/AppShell";
import IntakeControlTower from "./pages/IntakeControlTower";
import LoanReconstructionWorkspace from "./pages/LoanReconstructionWorkspace";
import DefectAndCureConsole from "./pages/DefectAndCureConsole";
import ProofChainViewer from "./pages/ProofChainViewer";
import BuyerDiligenceEligibility from "./pages/BuyerDiligenceEligibility";
import {
  roles,
  globalStates,
  intakePools,
  reconstructionLoans,
  defectQueue,
  proofPackages,
  diligenceAssets
} from "./data/mockData";
import "./styles/app.css";

const pages = [
  { key: "intake", label: "Intake Control Tower", step: "01" },
  { key: "reconstruction", label: "Loan Reconstruction Workspace", step: "02" },
  { key: "defect", label: "Defect and Cure Console", step: "03" },
  { key: "proof", label: "Proof and Chain-of-Custody Viewer", step: "04" },
  { key: "buyer", label: "Buyer Diligence and Eligibility", step: "05" }
];

function App() {
  const [activePage, setActivePage] = useState("intake");
  const [activeRole, setActiveRole] = useState(roles[0]);
  const [globalState, setGlobalState] = useState(globalStates[0]);

  const scopedData = useMemo(() => {
    if (globalState === "All States") {
      return {
        intakePools,
        reconstructionLoans,
        defectQueue,
        proofPackages,
        diligenceAssets
      };
    }

    return {
      intakePools: intakePools.filter((row) => row.status === globalState || globalState === "Ingested"),
      reconstructionLoans,
      defectQueue,
      proofPackages,
      diligenceAssets: diligenceAssets.filter((row) => row.eligibility === globalState || globalState === "DiligenceOpen")
    };
  }, [globalState]);

  return (
    <AppShell
      pages={pages}
      activePage={activePage}
      onPageChange={setActivePage}
      role={activeRole}
      onRoleChange={setActiveRole}
      globalState={globalState}
      onGlobalStateChange={setGlobalState}
      roles={roles}
      globalStates={globalStates}
    >
      {activePage === "intake" && <IntakeControlTower pools={scopedData.intakePools} />}
      {activePage === "reconstruction" && <LoanReconstructionWorkspace loans={scopedData.reconstructionLoans} />}
      {activePage === "defect" && <DefectAndCureConsole defects={scopedData.defectQueue} />}
      {activePage === "proof" && <ProofChainViewer events={scopedData.proofPackages} />}
      {activePage === "buyer" && <BuyerDiligenceEligibility assets={scopedData.diligenceAssets} />}
    </AppShell>
  );
}

export default App;
