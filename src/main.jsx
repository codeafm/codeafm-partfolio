import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

function ScrollAnimationWrapper({ children }) {
  useEffect(() => {
    const els = document.querySelectorAll(".scroll-fade");
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add("show")),
      { threshold: 0.2 }
    );
    els.forEach(el => io.observe(el));
    return () => els.forEach(el => io.unobserve(el));
  }, []);
  return children;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ScrollAnimationWrapper>
      <App />
    </ScrollAnimationWrapper>
  </React.StrictMode>
);
