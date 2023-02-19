import { FormControlLabel, Switch } from "@mui/material";

const styles = {
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: 'white',
        '&hover': {
            backgroundColor: 'white'
        }
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: 'white',
    },
}

export default function SwitchField({ id, label, onChange }) {
    return (
        <FormControlLabel
            className="form-control-label"
            control={
                <Switch
                    id={id}
                    sx={styles}
                    onChange={() => onChange(id)}
                    defaultChecked
                />
            }
            label={label}
        />
    )
}