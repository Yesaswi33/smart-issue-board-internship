import IssueList from "./pages/IssueList";
import "./index.css";

function App() {
  return (
    <div className="app-container">
      <h1>Smart Issue Board</h1>
      <p className="subtitle">
        Track, manage, and resolve issues efficiently
      </p>

      <IssueList />

      <div className="footer">
        Built with React, Firebase & Vercel
      </div>
    </div>
  );
}

export default App;
