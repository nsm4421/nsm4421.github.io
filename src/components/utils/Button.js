import { Button as MuiButton } from "@mui/material";

const Button = ({label, onClick})=>{
    return (
        <MuiButton onClick={onClick}>{label}</MuiButton>
    )
}

export default Button;