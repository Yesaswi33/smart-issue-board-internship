# Smart Issue Board – Internship Assignment

This project was developed as part of an internship hiring assignment.  
The goal of the assignment is to evaluate real-world problem-solving ability, practical technical decisions, Firestore data modeling, and understanding of the implemented code — without over-engineering.

The application allows users to create, manage, and track issues with authentication, validation rules, and a clean UI.

---

## 1. Why did you choose the frontend stack you used?

I chose **React with Vite** as the frontend stack for the following reasons:

- **Fast development experience**: Vite provides very fast startup time and hot module reloading, which is ideal for a limited-time assignment.
- **Component-based architecture**: React allows clear separation of concerns (Authentication, Issue List, Issue Item, etc.).
- **Industry relevance**: React is widely used in real-world production systems, making it a practical and relevant choice.
- **Minimal configuration**: The stack avoids unnecessary complexity and keeps the project easy to understand and maintain.

For styling, I used **plain CSS** instead of a heavy UI framework to keep the application lightweight and avoid over-engineering.

---

## 2. Firestore Data Structure

I used a **flat Firestore collection** for issues to ensure simplicity, fast queries, and easy filtering.

### Collection: `issues`

```json
{
  "title": "Login Bug",
  "description": "Login button not responding",
  "priority": "High",
  "status": "Open",
  "assignedTo": "test@gmail.com",
  "createdBy": "admin@gmail.com",
  "createdAt": Timestamp
}
Reasoning:

A flat structure avoids nested reads and improves performance.

Filtering by status and priority is straightforward.

Sorting by createdAt (newest first) works efficiently using Firestore indexes.

Document size remains small and scalable.

If additional features like comments or activity history are added later, they can be stored as subcollections (e.g., issues/{id}/comments) rather than embedding large arrays inside the document.

3. How similar issues were handled

When creating a new issue, the app checks for potentially similar issues already present in Firestore.

Approach used:

Existing issue titles are fetched in a small batch.

Titles are normalized (converted to lowercase).

A basic substring comparison is performed between the new title and existing titles.

If a similar issue is detected, the user is warned before proceeding.

Why this approach:

Simple and fast to implement.

Sufficient for an internship-level project.

Avoids unnecessary complexity such as external search engines or machine learning models.

The user is still allowed to proceed after confirmation, ensuring flexibility and usability.

4. What was confusing or challenging

Some challenges faced during this assignment:

Firestore Security Rules: Writing rules that enforce business logic (such as preventing Open → Done) while keeping them simple and readable.

Client-side vs server-side validation: Deciding what logic should be handled in the UI versus what must be enforced at the database level.

Deployment configuration: Understanding Vercel environment variables and Firebase authorized domains for authentication.

Ambiguous requirements: The assignment intentionally leaves design decisions open, requiring practical judgment instead of following strict instructions.

These challenges closely resemble real-world development scenarios and helped strengthen my understanding of production-ready systems.

5. What I would improve next

If given more time, I would improve the project by:

Adding role-based access control (Admin / User).

Implementing issue comments and activity history.

Improving similar issue detection using fuzzy matching or cosine similarity.

Adding pagination or infinite scrolling for large issue lists.

Enhancing UI accessibility and keyboard navigation.

Writing unit tests for core logic.

Tech Stack Summary

Frontend: React + Vite

Backend / Database: Firebase Firestore

Authentication: Firebase Auth (Email/Password)

Hosting: Vercel

Code Hosting: GitHub

Deployment Notes

The application is deployed on Vercel.

Firebase configuration is handled using environment variables.

Firebase Authentication authorized domains include the deployed Vercel URL.

Firestore security rules enforce authentication and prevent invalid status transitions.