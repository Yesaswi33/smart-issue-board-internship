import { useState } from "react";
import { updateIssueStatus } from "../lib/issues";

export default function IssueItem({ issue, onRefresh }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setError("");

    // Friendly UI block
    if (issue.status === "Open" && newStatus === "Done") {
      setError("Please move issue to 'In Progress' first 🙂");
      return;
    }

    try {
      setLoading(true);
      await updateIssueStatus(issue.id, newStatus);
      onRefresh(); // reload issue list
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: 12, marginBottom: 10 }}>
      <h4>{issue.title}</h4>
      <p>{issue.description}</p>

      <label>
        Status:
        <select
          value={issue.status}
          onChange={handleStatusChange}
          disabled={loading}
        >
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>

          {/* ❌ Disabled Done when Open */}
          <option
            value="Done"
            disabled={issue.status === "Open"}
          >
            Done
          </option>
        </select>
      </label>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
