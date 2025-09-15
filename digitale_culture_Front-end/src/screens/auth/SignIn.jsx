import React, { useState } from "react";
import { Container,Card,CardMedia,Box, CardContent, ButtonGroup,Button } from "@mui/material";
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
import { Link, useNavigate } from 'react-router-dom';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { formContainerStyle, titleStyle, subtitleStyle, textFieldStyle, submitButtonStyle, linkStyle,inputLabel,inputIcon,inputStyle,MotivationLabel,AuthContainer} from "../../styles/AuthStyle"
import CircularProgress from '@mui/material/CircularProgress';
import {EmailInput,PasswordInput} from '../../components/ValidationInputs'
import { API_ENDPOINTS } from "../../api/api";
import { useAuth } from "../../hooks/useAuth";


const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({password:"",email:""});
  const [errors, setErrors] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) newErrors.email = "L'email est requis";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Veuillez entrer une adresse email valide";

    if (!formData.password) newErrors.password = "Le mot de passe est requis";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      setLoading(true);
      try {
        const response = await fetch(API_ENDPOINTS.login, {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Spécifie qu'on envoie du JSON
          },
          body: JSON.stringify(formData), // Utilisation directe de formData
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          console.error("Erreur de connexion :", data);
          setErrors(prev => ({
            ...prev,
            email: "Incorrect email or password.",
            password: "Incorrect email or password."
          }));
        } else {
          console.log("Connecté avec succès :", data);
          login(data);
          navigate("/"); // s'il est connecté avec succès
        }
      } catch (error) {
        console.error("Erreur réseau :", error);
        setErrors(prev => ({
          ...prev,
          email: "Impossible de se connecter au serveur.",
          password: "Impossible de se connecter au serveur."
        }));
      }
      setLoading(false);
    }
  };

  return (
    <Box sx={formContainerStyle} component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" sx={titleStyle}>Sign In</Typography>
      <Typography variant="span" sx={subtitleStyle}>Log in to access your courses</Typography>

      <EmailInput 
         email={formData.email} 
         setEmail={(newEmail) => 
          setFormData(prev => ({ ...prev, email: newEmail }))
         } 
        error={errors.email} />

      <PasswordInput 
         password={formData.password} 
         setPassword={(newPassword) => 
          setFormData(prev => ({ ...prev, password: newPassword }))
        } error={errors.password} />

      <Button type="submit" sx={submitButtonStyle}   disabled={loading} >{loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}</Button>

      <Box sx={MotivationLabel}>
        <Typography variant="span" fontSize="1rem">
          Don't have an account yet?
        </Typography>
        <Link to={'/SignUp'} style={linkStyle}>Sign Up</Link>
      </Box>
    </Box>
  );
};


export default function SignIn() {
  return (
    <Container disableGutters maxWidth={false} sx={AuthContainer}>
      <SignInForm />
    </Container>
  );
}