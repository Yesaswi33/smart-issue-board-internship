import { useState } from "react";
import { updateIssueStatus } from "../lib/issues";

export default function IssueItem({ issue, onRefresh }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getBadgeClass = (status) => {
    if (status === "Open") return "badge badge-open";
    if (status === "In Progress") return "badge badge-progress";
    return "badge badge-done";
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setError("");

    if (issue.status === "Open" && newStatus === "Done") {
      setError("Move issue to In Progress before Done 🙂");
      return;
    }

    try {
      setLoading(true);
      await updateIssueStatus(issue.id, newStatus);
      onRefresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h4>{issue.title}</h4>
      <p>{issue.description}</p>

      <span className={getBadgeClass(issue.status)}>
        {issue.status}
      </span>

      <div style={{ marginTop: 10 }}>
        <label>
          Change Status:
          <select
            value={issue.status}
            onChange={handleStatusChange}
            disabled={loading}
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Done" disabled={issue.status === "Open"}>
              Done
            </option>
          </select>
        </label>
      </div>

      {error && <div className="error">{error}</div>}
    </div>
  );
}
