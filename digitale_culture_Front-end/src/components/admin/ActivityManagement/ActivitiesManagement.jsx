import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { formadminTitle, boxadminForm, adminButtonContainer, adminAnnulerButton, adminAddButton, GlobaladminFormContainer } from '../../../styles/ManagementStyle';
import ResourceTypeSelector from './ResourceTypeSelector';
import VideoResource from './Resources/VideoResource';
import PdfResource from './Resources/PdfResource';
import QuizResource from './Resources/QuizResource';
import { RESOURCE_TYPES, INITIAL_ACTIVITIES_RESOURCE_STATE } from '../../../utils/constants';

function ActivityManagement({ setShowNewActivityForm, ActivitiesData, onSubmit,onCancel }) {
  const [formData, setFormData] = useState(INITIAL_ACTIVITIES_RESOURCE_STATE);
  const [errors, setErrors] = useState({});
  
  const isEditMode = !!ActivitiesData;

  useEffect(() => {
    if (isEditMode && ActivitiesData) {
      setFormData({
        activity_type: ActivitiesData.activity_type,
        [ActivitiesData.activity_type]: { ...ActivitiesData }
      });
      
    } else {
      // Réinitialisation quand on n'est plus en mode édition
      setFormData(INITIAL_ACTIVITIES_RESOURCE_STATE);
    }
  }, [ActivitiesData, isEditMode]);

  const handleResourceChange = (activity_type) => {
    setFormData(prev => ({ ...prev, activity_type }));
    setErrors({});
  };

  const validateForm = () => {
    const currentType = formData.activity_type;
    const currentData = formData[currentType];
    const newErrors = {};
    let isValid = true;

    switch(currentType) {
      case RESOURCE_TYPES.VIDEO:
        if (!currentData.video_url?.trim()) {
          newErrors.video_url = "L'URL de la vidéo est requise";
          isValid = false;
        }
        break;

      case RESOURCE_TYPES.PDF:
        if (!currentData.pdf_title?.trim()) {
          newErrors.pdf_title = "Le titre du PDF est requis";
          isValid = false;
        }
        if (!currentData.pdf_url?.trim()) {
          newErrors.pdf_url = "L'URL du PDF est requise";
          isValid = false;
        }
        break;

      case RESOURCE_TYPES.QUIZ:
        if (!currentData.question?.trim()) {
          newErrors.question = "La question est requise";
          isValid = false;
        }
        
        currentData.answers.forEach((option, index) => {
          if (!option.trim()) {
            newErrors[`option${index}`] = `Option ${index + 1} requise`;
            isValid = false;
          }
        });

        if (!currentData.correct?.trim()) {
          newErrors.correctAnswer = "Réponse correcte requise";
          isValid = false;
        } else if (!currentData.answers.includes(currentData.correct)) {
          newErrors.correctAnswer = "La réponse doit correspondre à une option";
          isValid = false;
        }
        break;

      default:
        isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    const activityType = formData.activity_type;
    let submissionData = { activity_type: activityType };
  
    if (activityType === RESOURCE_TYPES.QUIZ) {
      const quizData = formData.quiz;
  
      submissionData = {  //changer le format des donner pour la modification backend du quiz
        ...submissionData,
        question: quizData.question,
        id:quizData.id,// trs important a ajouter
        answers: quizData.answers.map((ans) => ({
          reponse: ans,
          correct: ans === quizData.correct
        }))
      };
    } else {
      submissionData = {
        ...submissionData,
        ...formData[activityType]
      };
    }
  
    onSubmit(submissionData);
  
    setFormData({
      ...INITIAL_ACTIVITIES_RESOURCE_STATE,
      activity_type: formData.activity_type, 
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [prev.activity_type]: {
        ...prev[prev.activity_type],
        [name]: value
      }
    }));
    
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleQuizOptionChange = (e, index) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      quiz: {
        ...prev.quiz,
        answers: prev.quiz.answers.map((opt, i) => 
          i === index ? value : opt
        )
      }
    }));
    
    if (errors[`option${index}`]) setErrors(prev => ({ ...prev, [`option${index}`]: undefined }));
  };

  const handleCancel = () => {
    setFormData(INITIAL_ACTIVITIES_RESOURCE_STATE);
    setErrors({});
    setShowNewActivityForm(false);
    onCancel();//il est uutiliser pour initialiser la formuulaire
  };

  const renderResourceForm = () => {
    switch(formData.activity_type) {
      case RESOURCE_TYPES.VIDEO:
        return <VideoResource data={formData.video} errors={errors} onChange={handleChange} />;

      case RESOURCE_TYPES.PDF:
        return <PdfResource data={formData.pdf} errors={errors} onChange={handleChange} />;

      case RESOURCE_TYPES.QUIZ:
        return <QuizResource 
                 data={formData.quiz} 
                 errors={errors} 
                 onChange={handleChange}
                 onOptionChange={handleQuizOptionChange} />;

      default:
        return null;
    }
  };

  return createPortal(
    <Container maxWidth={false} disableGutters sx={GlobaladminFormContainer}>
      <Box component="form" sx={boxadminForm} onSubmit={handleSubmit}>
        <Typography component="h2" sx={formadminTitle}>
          {isEditMode ? 'Modifier la Ressource' : 'Ajouter une Ressource'}
        </Typography>

        {!isEditMode && <ResourceTypeSelector  //aficher le nav seulement si on veus ajouter l'un des resources
          currentType={formData.activity_type}
          onTypeChange={handleResourceChange}
        />}

        {renderResourceForm()}

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
            {isEditMode ? 'Modifier' : 'Ajouter'}
          </Button>
        </Box>
      </Box>
    </Container>,
    document.body
  );
}

export default ActivityManagement;