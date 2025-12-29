import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp
} from "firebase/firestore";

import { db, auth } from "../firebase";

const issuesRef = collection(db, "issues");

/* ---------------- CREATE ISSUE ---------------- */
export async function createIssue({
  title,
  description,
  priority,
  assignedTo
}) {
  if (!auth.currentUser) throw new Error("User not logged in");

  await addDoc(issuesRef, {
    title,
    description,
    priority,
    status: "Open",                // DEFAULT STATUS
    assignedTo: assignedTo || null,
    createdBy: auth.currentUser.email,
    createdAt: serverTimestamp()
  });
}

/* ---------------- FETCH ISSUES ---------------- */
export async function fetchIssues() {
  const q = query(issuesRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

/* ---------------- UPDATE STATUS (PHASE 7) ---------------- */
export async function updateIssueStatus(issueId, newStatus) {
  const issueRef = doc(db, "issues", issueId);
  const snapshot = await getDoc(issueRef);

  if (!snapshot.exists()) {
    throw new Error("Issue not found");
  }

  const currentStatus = snapshot.data().status;

  // 🚫 RULE: Open → Done NOT allowed
  if (currentStatus === "Open" && newStatus === "Done") {
    throw new Error(
      "Issue must go through 'In Progress' before moving to Done."
    );
  }

  await updateDoc(issueRef, {
    status: newStatus
  });
}
