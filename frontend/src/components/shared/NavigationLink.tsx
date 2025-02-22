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
        background: props.bg, 
        color: props.textColor, 
        padding: "12px 20px", 
        borderRadius: "10px", 
        textDecoration: "none", 
        fontWeight: "600",
        marginRight: "15px", 
        display: "inline-block", 
        transition: "all 0.3s ease", 
      }}
      onMouseEnter={(e) => {
       
        e.currentTarget.style.backgroundColor = "#00796B"; 
        e.currentTarget.style.color = "#FFFFFF";
      }}
      onMouseLeave={(e) => {
      
        e.currentTarget.style.backgroundColor = props.bg; 
        e.currentTarget.style.color = props.textColor; 
      }}
    >
      {props.text}
    </Link>
  );
};

export default NavigationLink;
