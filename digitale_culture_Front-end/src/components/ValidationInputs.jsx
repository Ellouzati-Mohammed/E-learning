import React, { useState } from "react";
import { Container,Card,CardMedia,Box, CardContent, ButtonGroup,Button, Select, MenuItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import { ArrowForward, ArrowBack } from "@mui/icons-material";
import { CloudDownload } from "@mui/icons-material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Radio, RadioGroup, FormControlLabel, FormControl } from "@mui/material";
import { TextField, InputAdornment } from "@mui/material";
import { Email } from "@mui/icons-material";
import { Lock } from "@mui/icons-material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import {InputBox,txtIcon, formContainerStyle, titleStyle, subtitleStyle, textFieldStyle, submitButtonStyle, linkStyle,inputLabel,inputIcon,inputStyle,MotivationLabel,AuthContainer} from "../styles/AuthStyle"

import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

const PasswordInput = ({ password, setPassword, error }) => {
    return (
      <Box sx={InputBox}>
        <Typography component="span" sx={inputLabel}>Password</Typography>
        <TextField
          fullWidth
          variant="outlined"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!error}
          helperText={error}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon sx={inputIcon} />
              </InputAdornment>
            ),
            sx: inputStyle,
          }}
          sx={textFieldStyle}
        />
      </Box>
    );
  };
  
  const EmailInput = ({ email, setEmail, error }) => {
    return (
      <Box sx={InputBox}>
        <Typography variant="span" sx={inputLabel}>Email</Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!error}
          helperText={error}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlinedIcon sx={inputIcon} />
              </InputAdornment>
            ),
            sx: inputStyle,
          }}
          sx={textFieldStyle}
        />
      </Box>
    );
  };
  const NormalInput = ({ 
    label,
    placeholder,
    value, 
    setValue, 
    error,
    icon,
    multiline = false,
    rows = 4,
    name // Le nom est maintenant disponible via les props
  }) => {
    const handleChange = (e) => {
      // On envoie un objet { name, value } à la fonction `setValue`
      setValue({ target: { name, value: e.target.value } });
    };
    return (
      <Box sx={InputBox}>
        <Typography variant="span" sx={inputLabel}>{label}</Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={placeholder}
          value={value}
          onChange={handleChange }
          error={!!error}
          helperText={error}
          multiline={multiline}
          name={name} // Important pour l'association HTML
          rows={rows}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {icon && (
                  typeof icon === "string" ? (
                    <Typography sx={txtIcon}>{icon}</Typography>
                  ) : (
                    icon
                  )
                )}
              </InputAdornment>
            ),
            sx: inputStyle,
          }}
          sx={textFieldStyle}
        />
      </Box>
    );
  };
 
  const SelectInput = ({ 
    label, 
    placeholder,
    value, 
    setValue, 
    options = [],
    name,  
    error, 
  }) => {

    const handleChange = (e) => {
      // On envoie un objet { name, value } à la fonction `setValue`
      setValue({ target: { name, value: e.target.value } });
    };

    return (
      <Box sx={{ marginBottom: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="span" sx={inputLabel}>{label}</Typography>
        <Select
          value={value || ""}
          onChange={handleChange}
          displayEmpty
          renderValue={(selected) => {
            if (!selected) {
              return <span style={{ color: '#a9a9a9' }}>{placeholder}</span>;
            }
            const selectedOption = options.find(opt => opt.value === selected);
            return selectedOption?.label || selected;
          }}
          sx={{
            ...inputStyle,
            width: '100%',
            '& .MuiSelect-select': { 
              display: 'flex', 
              alignItems: 'center',
              py:1,
              
            }
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                zIndex: 9999,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                maxHeight:'15%',
                borderRadius:2
              }
            }
          }}
        >
          <MenuItem disabled value="" sx={{ display: 'none' }}>
            {placeholder}
          </MenuItem>
          {options.map((option) => (
            <MenuItem 
              key={option.value} 
              value={option.value}
              sx={{ 
                fontSize:'0.875rem',
                mx:1,
                px:2,
                '&:hover': { backgroundColor: '#f5f5f5' } ,
                borderRadius:2
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
        
        {/* Affichage de l'erreur si elle existe */}
        {error && <Typography variant="body2" color="error" sx={{ mt: 0.5 }}>{error}</Typography>}
      </Box>
    );
};




export  {EmailInput,PasswordInput,NormalInput,SelectInput}