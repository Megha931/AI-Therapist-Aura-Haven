import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        height: "50px", // ✅ Fixed height instead of minHeight: 100vh
        backgroundColor: "rgba(0, 0, 0, 0.3)", // ✅ Transparent effect
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative", // ✅ Ensures it stays at the bottom
        zIndex: 1000,
      }}
    >
      <p style={{ fontSize: "18px", color: "white", textAlign: "center" }}>
        © Copyright - Megha
      </p>
    </footer>
  );
};

export default Footer;
