import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";

export default function CreateIssue() {

  const submitIssue = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;

    // Similar issue check
    const snapshot = await getDocs(collection(db, "issues"));
    const similar = snapshot.docs.find(doc =>
      doc.data().title.toLowerCase().includes(title.toLowerCase())
    );

    if (similar && !window.confirm("Similar issue exists. Create anyway?")) {
      return;
    }

    await addDoc(collection(db, "issues"), {
      title,
      description: e.target.description.value,
      priority: e.target.priority.value,
      status: "Open",
      assignedTo: e.target.assignedTo.value,
      createdBy: auth.currentUser.email,
      createdAt: new Date()
    });
  };

  return (
    <form onSubmit={submitIssue}>
      <input name="title" placeholder="Title" required />
      <textarea name="description" />
      <select name="priority">
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <input name="assignedTo" placeholder="Assign To Email" />
      <button>Create Issue</button>
    </form>
  );
}
