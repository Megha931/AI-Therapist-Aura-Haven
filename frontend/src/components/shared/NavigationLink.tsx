import { Link } from "react-router-dom";

type Props = {
  to: string;
  bg: string;
  text: string;
  textColor: string;
  onClick?: () => Promise<void>;
};

const NavigationLink = (props: Props) => {
  return (
    <Link
      onClick={props.onClick}
      className="nav-link"
      to={props.to}
      style={{
        background: props.bg, // Background color (could be semi-transparent)
        color: props.textColor, // Text color
        padding: "12px 20px", // Padding for a larger clickable area
        borderRadius: "10px", // Smooth rounded corners
        textDecoration: "none", // No underline
        fontWeight: "600", // Bold text for better visibility
        marginRight: "15px", // Space between the links
        display: "inline-block", // Display as an inline-block for alignment
        transition: "all 0.3s ease", // Smooth transition for hover effect
      }}
      onMouseEnter={(e) => {
        // Change background and text color on hover
        e.currentTarget.style.backgroundColor = "#00796B"; // Change background color
        e.currentTarget.style.color = "#FFFFFF"; // Change text color to white
      }}
      onMouseLeave={(e) => {
        // Reset to original colors when mouse leaves
        e.currentTarget.style.backgroundColor = props.bg; // Reset background
        e.currentTarget.style.color = props.textColor; // Reset text color
      }}
    >
      {props.text}
    </Link>
  );
};

export default NavigationLink;
