import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const views = ["customers", "policies", "claims"];
function App() {
  const [view, setView] = useState("customers");
  const [rows, setRows] = useState([]);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    Promise.all([
      fetch(`/api/${view}`).then((r) => {
        if (!r.ok) throw new Error(`API returned ${r.status}`);
        return r.json();
      }),
      fetch("/api/summary").then((r) => {
        if (!r.ok) throw new Error(`API returned ${r.status}`);
        return r.json();
      }),
    ])
      .then(([items, counts]) => {
        if (active) {
          setRows(items);
          setSummary(counts);
        }
      })
      .catch((e) => {
        if (active) setError(e.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [view, refresh]);
  const columns = rows.length ? Object.keys(rows[0]) : [];
  return (
    <main>
      <header>
        <div className="brand">
          FOX <span>INSURANCE</span>
        </div>
        <div className="tag">Full-stack Docker classroom demo</div>
      </header>
      <section className="hero">
        <h1>Insurance Operations Dashboard</h1>
        <p>
          React + Express + MongoDB, running as three separate Docker
          containers.
        </p>
        <button className="refresh" onClick={() => setRefresh((n) => n + 1)}>
          ↻ Refresh data
        </button>
      </section>
      <section className="cards">
        {views.map((key) => (
          <div className="metric" key={key}>
            <span>{key}</span>
            <strong>{summary?.[key] ?? "—"}</strong>
            <small>MongoDB records</small>
          </div>
        ))}
      </section>
      <section className="panel">
        <nav aria-label="Data views">
          {views.map((key) => (
            <button
              key={key}
              aria-pressed={view === key}
              className={view === key ? "selected" : ""}
              onClick={() => setView(key)}
            >
              {key}
            </button>
          ))}
        </nav>
        {loading ? (
          <p>Loading from Express API...</p>
        ) : error ? (
          <p className="error">
            Cannot load API data: {error}. Check <code>docker compose ps</code>{" "}
            and <code>docker compose logs api</code>.
          </p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  {columns.map((c) => (
                    <th key={c}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((item, i) => (
                  <tr key={i}>
                    {columns.map((c) => (
                      <td key={c}>{String(item[c] ?? "")}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      <footer>
        Demo data only · No real customer information · Frontend → API → MongoDB
      </footer>
    </main>
  );
}
createRoot(document.getElementById("root")).render(<App />);
