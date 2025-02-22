import React from "react";
import TextField from "@mui/material/TextField";

type Props = {
  name: string;
  type: string;
  label: string;
};

const CustomizedInput = (props: Props) => {
  return (
    <TextField
      margin="normal"
      InputLabelProps={{
        style: { color: "#00796B" }, 
      }}
      name={props.name}
      label={props.label}
      type={props.type}
      InputProps={{
        style: {
          width: "400px",
          borderRadius: 10,
          fontSize: 20,
          color: "#00796B", 
          backgroundColor: "#E0F7FA",
        },
      }}
    />
  );
};

export default CustomizedInput;
