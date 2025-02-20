import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import lotusFlower from "../../assets/lotus-flower.png"; // Import the new image

const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <Link to={"/"}>
        <img
          src={lotusFlower} // Use the new imported image
          alt="Lotus Flower"
          width="50px"
          height="50px"
          style={{
            filter: "unset", // Ensures no unwanted effects
          }}
        />
      </Link>{" "}
      <Typography
        sx={{
          display: { md: "block", sm: "none", xs: "none" },
          mr: "auto",
          fontWeight: "900",
          textShadow: "2px 2px 20px #000",
        }}
      >
        <span style={{ fontSize: "30px" }}>Aura</span>-Haven
      </Typography>
    </div>
  );
};

export default Logo;
