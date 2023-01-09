import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

import BannerWallpaper from './static/images/banner-wallpaper.jpg';

const currencies = [
    {
        value: 'MET',
        label: 'Meta',
    },
    {
        value: 'AMA',
        label: 'Amazon',
    },
    {
        value: 'JAA',
        label: 'Jamboo',
    },
    {
        value: 'GOO',
        label: 'Google',
    },
    {
        value: 'APP',
        label: 'Apple',
    },
    {
        value: 'MIC',
        label: 'Microsoft',
    },
    {
        value: 'TWI',
        label: 'Twitter',
    },
];

export default function Banner() {
    const [currency, setCurrency] = React.useState('EUR');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrency(event.target.value);
    };

    return (
        <>
            <Box
                sx={{
                    marginTop: 5,
                }}
            >
                <Paper sx={{ backgroundImage: `url(${BannerWallpaper})`, height: 147, width: "100%" }} />
            </Box>
            <Box
                sx={{
                    width: "80vw",
                    margin: "0 auto",
                    marginTop: -10,
                }}
            >
                <Paper
                    sx={{
                        px: 25,
                        py: 5
                    }}>
                    <TextField
                        helperText=" "
                        id="search-text-aligned"
                        label="Procure por uma vaga de emprego"
                        sx={{
                            width: "30vw",
                            "& .MuiInputLabel-root": { color: '#F4552B' },
                            "& .MuiInputLabel-root.Mui-focused": { color: '#F4552B' },
                            "& .MuiOutlinedInput-root": {
                                "& > fieldset": { borderColor: "#F4552B" },
                            },
                            "& .MuiOutlinedInput-root.Mui-focused": {
                                "& > fieldset": { borderColor: "#F4552B" },
                            },
                            "& .MuiOutlinedInput-root:hover": {
                                "& > fieldset": { borderColor: "#F4552B" },
                            },
                        }}
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    type="button"
                                    aria-label="search"
                                    sx={{
                                        p: '10px',
                                        color: '#F4552B',
                                    }}>
                                    <SearchIcon />
                                </IconButton>
                            ),
                        }}
                    />
                    <TextField
                        helperText=" "
                        id="select-text-aligned"
                        label="Selecione uma empresa"
                        value={currency}
                        onChange={handleChange}
                        sx={{
                            width: "15vw",
                            marginLeft: 1,
                            "& .MuiInputLabel-root": { color: '#F4552B' },
                            "& .MuiInputLabel-root.Mui-focused": { color: '#F4552B' },
                            "& .MuiOutlinedInput-root": {
                                "& > fieldset": { borderColor: "#F4552B" },
                            },
                            "& .MuiOutlinedInput-root.Mui-focused": {
                                "& > fieldset": { borderColor: "#F4552B" },
                            },
                            "& .MuiOutlinedInput-root:hover": {
                                "& > fieldset": { borderColor: "#F4552B" },
                            },
                        }}
                        select
                    >
                        {currencies.map((option) => (
                            <MenuItem
                                key={option.value}
                                value={option.value}
                                sx={{
                                    color: '#F4552B',
                                }}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Paper>
            </Box>
        </>
    );
}