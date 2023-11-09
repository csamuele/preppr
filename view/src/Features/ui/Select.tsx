import { FormControl, InputLabel, MenuItem, Select as MuiSelect, SxProps } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
interface SelectProps {
    label?: string;
    options: { label: string; value: string }[];
    value: string;
    onChange: (event: SelectChangeEvent<string>) => void;
    variant?: 'standard' | 'outlined' | 'filled';
    fontSize?: string;
    fullWidth?: boolean;
}

export const Select: React.FC<SelectProps> = ({ label, options, value, onChange, variant, fontSize, fullWidth }) => {
    return (
        <FormControl fullWidth={fullWidth} variant={variant} >
            {label && <InputLabel id={`${label}-label`}>{label}</InputLabel>}
            <MuiSelect
                labelId={label ? `${label}-label` : undefined}
                id={label ? `${label}-select` : undefined}
                value={value}
                label={label}
                onChange={onChange}
                sx={{ '& .MuiSelect-select': {
                    fontSize: fontSize || '1rem',
                }}}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value} sx={{fontSize: fontSize || '1rem'}}>
                        {option.label}
                    </MenuItem>
                ))}
            </MuiSelect>
        </FormControl>
    );
};