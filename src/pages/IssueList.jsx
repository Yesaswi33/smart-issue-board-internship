import { useEffect, useState } from "react";
import { fetchIssues } from "../lib/issues";
import IssueItem from "../components/IssueItem";

export default function IssueList() {
  const [issues, setIssues] = useState([]);

  const loadIssues = async () => {
    const data = await fetchIssues();
    setIssues(data);
  };

  useEffect(() => {
    loadIssues();
  }, []);

  return (
    <>
      {issues.map(issue => (
        <IssueItem
          key={issue.id}
          issue={issue}
          onRefresh={loadIssues}
        />
      ))}
    </>
  );
}


