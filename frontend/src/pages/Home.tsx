import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import TypingAnim from "../components/typer/TypingAnim";
import Footer from "../components/footer/Footer";
import AI_background from "../assets/AI_background.jpeg";

const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      width={"100%"}
      minHeight={"100vh"} 
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"} 
      sx={{
        backgroundImage: `url(${AI_background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        "::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.1)", 
        },
      }}
    >
      {/* Main Content Section */}
      <Box sx={{ paddingTop: "64px", flex: 1 }}> 
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%", 
            zIndex: 1,
          }}
        >
          <Box>
            <TypingAnim />
          </Box>
        </Box>
      </Box>

     
      <Footer />
    </Box>
  );
};

export default Home;
