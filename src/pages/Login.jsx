import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const login = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(
      auth,
      e.target.email.value,
      e.target.password.value
    );
  };

  return (
    <form onSubmit={login}>
      <h2>Login</h2>
      <input name="email" required />
      <input name="password" type="password" required />
      <button>Login</button>
    </form>
  );
}
