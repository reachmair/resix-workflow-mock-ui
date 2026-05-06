export default function ActionPanel({ title, actions }) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      <div className="actions-grid">
        {actions.map((action) => (
          <button key={action} type="button" className="secondary-btn">
            {action}
          </button>
        ))}
      </div>
    </section>
  );
}
