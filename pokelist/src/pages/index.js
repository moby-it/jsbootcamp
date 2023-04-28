import { useState } from "react";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  if (typeof window !== 'undefined') {
    if (loggedIn) {
      window.location.href = "http://localhost:3000/landingPage";
    } else {
      window.location.href = "http://localhost:3000/login";
    }
  }
}