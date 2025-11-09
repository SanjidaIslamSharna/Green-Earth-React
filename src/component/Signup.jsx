import React, { useState } from "react";
import { auth } from "../firebase.config.js";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // send verification link
      await sendEmailVerification(user);

      setMessage(
        "✅ Verification link sent to your email. Please verify before logging in."
      );

      // Don't navigate automatically — wait for user to verify manually
      // So we just clear form and show message
      setEmail("");
      setPassword("");
    } catch (error) {
      setMessage("❌ " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSignup} className="flex flex-col gap-3 w-64">
        <input
          type="email"
          placeholder="Enter Email"
          className="border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          className="border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-green-600 text-white py-2 rounded">
          Sign Up
        </button>
        <p className="text-center">
          Already have an account?{" "}
          <a href="/login" className="text-green-600">
            Login
          </a>
        </p>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default Signup;
