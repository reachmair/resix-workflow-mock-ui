import FilterBar from "./FilterBar";

export default function AppShell({
  pages,
  activePage,
  onPageChange,
  role,
  onRoleChange,
  globalState,
  onGlobalStateChange,
  roles,
  globalStates,
  children
}) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-head">
          <p className="logo-kicker">Resi-X</p>
          <h1>Operations Console</h1>
        </div>
        <nav className="side-nav" aria-label="Workflow pages">
          {pages.map((page) => (
            <button
              key={page.key}
              type="button"
              className={page.key === activePage ? "nav-btn active" : "nav-btn"}
              onClick={() => onPageChange(page.key)}
            >
              <span className="nav-step">{page.step}</span>
              <span>{page.label}</span>
            </button>
          ))}
        </nav>
      </aside>
      <div className="main-layout">
        <header className="top-header">
          <div>
            <p className="kicker">Proof-First Workflow App Mock</p>
            <h2>{pages.find((page) => page.key === activePage)?.label}</h2>
          </div>
          <FilterBar
            filters={[
              {
                label: "Role",
                value: role,
                options: roles,
                onChange: onRoleChange
              },
              {
                label: "Global State",
                value: globalState,
                options: globalStates,
                onChange: onGlobalStateChange
              }
            ]}
          />
        </header>
        <main className="page-content">{children}</main>
      </div>
    </div>
  );
}
