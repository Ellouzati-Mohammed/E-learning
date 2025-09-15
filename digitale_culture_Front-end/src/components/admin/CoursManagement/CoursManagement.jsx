import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { NormalInput } from "../../ValidationInputs";
import { 
  formadminTitle, 
  boxadminForm, 
  adminButtonContainer, 
  adminAnnulerButton, 
  adminAddButton, 
  GlobaladminFormContainer 
} from '../../../styles/ManagementStyle';
import { INITIAL_COURS_STATE } from "../../../utils/constants.js";

function CoursManagement({ setShowNewCoursForm, CoursData, onSubmit }) {
  const [formData, setFormData] = useState(INITIAL_COURS_STATE);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (CoursData) {
      setFormData({
        ...INITIAL_COURS_STATE,
        ...CoursData
      });
    }
  }, [CoursData]);

  // Modification de la gestion du changement
  const handleChange = (eventOrValue) => {
    const { name, value } = eventOrValue.target ? 
      eventOrValue.target : 
      { name: eventOrValue.target?.name, value: eventOrValue.target?.value };
    
    setFormData(prev => ({ 
      ...prev, 
      [name]: value 
    }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.cours_title.trim()) {
      newErrors.cours_title = "Le nom du cours est requis";
      isValid = false;
    }

    if (!formData.cours_description.trim()) {
      newErrors.cours_description = "La description est requise";
      isValid = false;
    }
    
    const duration = Number(formData.duration);
    if (!duration) {
      newErrors.duration = "La durée estimée est requise";
      isValid = false;
    } else if (duration < 1) {
      newErrors.duration = "La durée doit être supérieure à 0";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    onSubmit({
      ...formData,
      duration: Number(formData.duration)
    });
    //ici on ajout se qu'on veuut si
  };

  const handleCancel = () => {
   
      setShowNewCoursForm(false);
    
  };

  return createPortal(
    <Container maxWidth={false} disableGutters sx={GlobaladminFormContainer}>
      <Box component='form' sx={boxadminForm} onSubmit={handleSubmit}>
        <Typography component='h2' sx={formadminTitle}>
          {CoursData ? 'Modifier le Cours' : 'Ajouter un Cours'}
        </Typography>

        {/* Modification des props passés à NormalInput */}
        <NormalInput
          label='Nom du Cours'
          placeholder='Ex : Machine Learning'
          name='cours_title'
          value={formData.cours_title}
          setValue={handleChange} // Changé de onChange à setValue
          error={errors.cours_title}
        />

        <NormalInput
          label='Description du cours'
          placeholder='Ex : Cours complet sur le Machine Learning'
          name='cours_description'
          value={formData.cours_description}
          setValue={handleChange} // Changé de onChange à setValue
          error={errors.cours_description}
          multiline
          minRows={3}
        />

        <NormalInput
          label='Durée estimée (minutes)'
          placeholder='Ex : 120'
          name='duration'
          value={formData.duration}
          setValue={handleChange} // Changé de onChange à setValue
          error={errors.duration}
          type="number"
          inputProps={{ min: 1 }}
        />

        <Box sx={adminButtonContainer}>
          <Button 
            type="button"
            sx={adminAnnulerButton} 
            onClick={handleCancel}
          >
            Annuler
          </Button>
          <Button 
            type="submit"
            sx={adminAddButton}
          >
            {CoursData ? 'Modifier' : 'Ajouter'}
          </Button>
        </Box>
      </Box>
    </Container>,
    document.body
  );
}

export default CoursManagement;