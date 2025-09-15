import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { NormalInput, SelectInput } from "../../ValidationInputs.jsx";
import { formadminTitle, boxadminForm, adminButtonContainer, adminAnnulerButton, adminAddButton, GlobaladminFormContainer } from '../../../styles/ManagementStyle.js';

function DomainMangement({ setShowNewDomainForm , domainData , onSubmit}) {
  
  const [formData, setFormData] = useState({
    id : null,
    domain_title: "",
    domain_description: "",
    level: "",
    domain_image_url: "",
  });

  const [errors, setErrors] = useState({
    domain_title: "",
    domain_description: "",
    level: "",
    domain_image_url: ""
  });

  useEffect(() => {
    if (domainData) {
      setFormData({
        id: domainData.id || null,
        domain_title: domainData.domain_title || "",
        domain_description: domainData.domain_description || "",
        level: domainData.level || "",
        domain_image_url: domainData.domain_image_url || "",
      });
    }
  }, [domainData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = () => {
    setShowNewDomainForm(false);
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!formData.domain_title) {
      formErrors.domain_title = "Le nom du domaine est requis";
      isValid = false;
    }

    if (!formData.domain_description) {
      formErrors.domain_description = "La domain_description est requise";
      isValid = false;
    }

    if (!formData.level) {
      formErrors.level = "Le level est requis";
      isValid = false;
    }

    if (!formData.domain_image_url) {
      formErrors.domain_image_url = "L'URL de l'image est requise";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return createPortal(
    <Container maxWidth={false} disableGutters sx={GlobaladminFormContainer}>
      <Box component='form' sx={boxadminForm}>
        <Typography component='h2' sx={formadminTitle}>
          Ajouter un Domaine
        </Typography>
        <NormalInput
          label='Nom du Domaine'
          placeholder='Ex : Machine Learning'
          name='domain_title'
          value={formData.domain_title}
          setValue={handleChange}
          error={errors.domain_title}
        />
        <NormalInput
          label='domain_description'
          placeholder='Ex : Machine Learning'
          name='domain_description'
          value={formData.domain_description}
          setValue={handleChange}
          error={errors.domain_description}
          multiline={true}
        />
        <SelectInput
          label='Choisir un level'
          placeholder='coisir un level'
          name='level'
          value={formData.level}
          setValue={handleChange}
          options={[
            { value: 'beginner', label: 'beginner' },
            { value: 'intermediate', label: 'intermediate' },
            { value: 'advanced', label: 'advanced' }
          ]}
          error={errors.level}
        />
        <NormalInput
          label="URL de l'image"
          placeholder='Ex : https://example.com/image.jpg'
          name='domain_image_url'
          value={formData.domain_image_url}
          setValue={handleChange}
          error={errors.domain_image_url}
        />
        <Box sx={adminButtonContainer}>
          <Button sx={adminAnnulerButton} onClick={handleCancel}>
            Annuler
          </Button>
          <Button sx={adminAddButton} onClick={handleSubmit}>
            Ajouter
          </Button>
        </Box>
      </Box>
    </Container>,
    document.body
  );
}

export default DomainMangement;
