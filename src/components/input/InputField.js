import React from 'react';
import { TextField } from "@mui/material";

const styles = {
    notchedOutline: {
        border: "2px solid",
        borderColor: "white",
    },
    focusedNotchedOutline: {
        borderColor: "#38ef7d",
    },
    inputLabel: {
        fontFamily: 'monospace',
        color: 'white',
        '&.Mui-focused': {
            color: '#38ef7d',
        }
    },
    inputBase: {
        color: 'white',
    },
    notchedOutlineHover: {
        borderColor: "#38ef7d",
    }
};

export default function InputField({ input, onChange }) {
    return (
        <TextField
            id={input.id}
            label={input.title}
            sx={{
                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': styles.notchedOutline,
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': styles.focusedNotchedOutline,
                '& .MuiInputLabel-root': styles.inputLabel,
                '& .MuiInputBase-input': styles.inputBase,
                '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': styles.notchedOutlineHover,
            }}
            inputProps={{
                style: {
                    textAlign: 'center',
                    fontFamily: 'monospace'
                }
            }}
            onChange={() => onChange(input)}
            maxLength="8"
            defaultValue={ input.defaultValue ?? null }
        />
    )
}
