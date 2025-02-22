import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";

const Header = () => {
  const auth = useAuth();

  return (
    <AppBar
      sx={{
        bgcolor: "rgba(0, 0, 0, 0.2)", 
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        color: "#ffffff",
        backdropFilter: "blur(15px)", 
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)", 
        zIndex: 1100,
        height: "60px",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)", 
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 5px",
          minHeight: "40px",
        }}
      >
        {/* Logo Section (Reduced Size) */}
        <div style={{ transform: "scale(0.85)" }}>
          <Logo />
        </div>

        {/* Navigation Links */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
            height: "40px",
          }}
        >
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                bg="#00796B" 
                to="/chat"
                text="Go To Chat"
                textColor="white"
                sx={{
                  borderRadius: "12px",
                  padding: "4px 10px",
                  fontSize: "13px",
                  minHeight: "30px",
                  transition: "all 0.3s ease",
                  boxShadow: "0px 3px 10px rgba(100, 100, 100, 0.3)", 
                  "&:hover": {
                    backgroundColor: "rgba(80, 80, 80, 0.9)", 
                    transform: "scale(1.05)",
                    boxShadow: "0px 5px 15px rgba(100, 100, 100, 0.5)",
                  },
                }}
              />
              <NavigationLink
                bg="#00796B" 
                textColor="white"
                to="/"
                text="Logout"
                onClick={auth.logout}
                sx={{
                  borderRadius: "12px",
                  padding: "4px 10px",
                  fontSize: "13px",
                  minHeight: "30px",
                  transition: "all 0.3s ease",
                  boxShadow: "0px 3px 10px rgba(100, 100, 100, 0.3)",
                  "&:hover": {
                    backgroundColor: "rgba(80, 80, 80, 0.9)",
                    transform: "scale(1.05)",
                    boxShadow: "0px 5px 15px rgba(100, 100, 100, 0.5)",
                  },
                }}
              />
            </>
          ) : (
            <>
              <NavigationLink
                bg="rgba(128, 128, 128, 0.7)" 
                to="/login"
                text="Login"
                textColor="white"
                sx={{
                  borderRadius: "12px",
                  padding: "6px 12px",
                  fontSize: "14px",
                  transition: "all 0.3s ease",
                  boxShadow: "0px 3px 10px rgba(128, 128, 128, 0.3)", 
                  "&:hover": {
                    backgroundColor: "rgba(90, 90, 90, 0.9)", 
                    transform: "scale(1.05)", 
                    boxShadow: "0px 5px 15px rgba(128, 128, 128, 0.5)",
                  },
                }}
              />
              <NavigationLink
                bg="rgba(128, 128, 128, 0.7)"
                textColor="white"
                to="/signup"
                text="Signup"
                sx={{
                  borderRadius: "12px",
                  padding: "6px 12px",
                  fontSize: "14px",
                  transition: "all 0.3s ease",
                  boxShadow: "0px 3px 10px rgba(128, 128, 128, 0.3)",
                  "&:hover": {
                    backgroundColor: "rgba(90, 90, 90, 0.9)",
                    transform: "scale(1.05)",
                    boxShadow: "0px 5px 15px rgba(128, 128, 128, 0.5)",
                  },
                }}
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
