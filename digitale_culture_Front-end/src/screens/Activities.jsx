import React, { useCallback, useEffect, useState } from "react";
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';

import { Container,Card,CardMedia,Box, CardContent, ButtonGroup,Button,Link,Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import Typography from "@mui/material/Typography";
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import { ArrowForward, ArrowBack } from "@mui/icons-material";
import { CloudDownload } from "@mui/icons-material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Radio, RadioGroup, FormControlLabel, FormControl } from "@mui/material";
import{ vidioBoxStyle,
  quizBoxStyle,
  questionBoxStyle, 
  formControlLabelStyle,
  submitButtonStyle,
  activitieContainerStyle,
  cardBoxStyle,
  cardHeaderStyle,
  cardBodyStyle,
  buttonGroupStyle,
  resourceBoxHeaderStyle,
  pdfLinkBoxStyle,
  SelctedResponse,submitButtonStyleBox,NavButton,resourceBoxContainer,resourceIcon,pdfResource,QuizQuestion,disabledStyleQuiz} from "../styles/ActivitiesStyle"
  import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
  import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { adminDeleteButton, adminButtonContainer,adminModifyButton } from '../styles/ManagementStyle.js';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import {headerManagementTitle,titleManagementtxt,addButton} from '../styles/ManagementStyle'
import ActivityManagement from "../components/admin/ActivityManagement/ActivitiesManagement.jsx";
import { useAuth } from '../hooks/useAuth';
import useActivities from "../hooks/useActivites.js";
import { useParams } from "react-router-dom";


const getEmbedUrl = (url) => {
  try {
    const urlObj = new URL(url);

    // Cas normal avec ?v=xxxxx
    const videoIdFromParams = urlObj.searchParams.get("v");
    if (videoIdFromParams) {
      return `https://www.youtube.com/embed/${videoIdFromParams}`;
    }

    // Cas des liens raccourcis https://youtu.be/xxxxx
    if (urlObj.hostname === "youtu.be") {
      const videoIdFromPath = urlObj.pathname.split("/")[1];
      return `https://www.youtube.com/embed/${videoIdFromPath}`;
    }

    return null;
  } catch (error) {
    console.error("URL invalide :", url);
    return null;
  }
};



const Video = ({ videoId,videoUrl,setShowNewActivityForm,onType,handleDelete,handleModify,onEdit }) => {
  
  const { role } = useAuth();
  return (<>
    <Box sx={vidioBoxStyle}>
      <iframe
        width="100%"
        height="100%"
        src={getEmbedUrl(videoUrl)} // Le lien de la vidéo est dynamique maintenant
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ borderRadius: "12px" }}
      ></iframe>
      {role === 'admin' &&<Box sx={adminButtonContainer}>
        <Button onClick={(e) => handleModify(e, "video")} sx={adminModifyButton} startIcon={<EditOutlinedIcon />}>
          Modify
        </Button>
        <Button onClick={(e) => handleDelete(e, "video")} sx={adminDeleteButton} startIcon={<DeleteOutlinedIcon />}>
          Delete
        </Button>
      </Box>}
    </Box>
    
    </>
  );
};

const Quiz = ({ quizId,question, options,quiznumber, correctAnswer,setShowNewActivityForm,onType,handleDelete,handleModify,onEdit }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { role } = useAuth();
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <Box sx={quizBoxStyle} component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" sx={QuizQuestion} gutterBottom>
        <Box sx={questionBoxStyle}>
          {quiznumber}
        </Box>
        {question}
      </Typography>
      
      <FormControl component="fieldset" fullWidth>
        <RadioGroup value={selectedValue} onChange={handleChange}>
          {options.map((option,index) => (
            <Box key={`${quizId}-option-${index}`} sx={SelctedResponse(selectedValue, option, isSubmitted, correctAnswer)}>
              <FormControlLabel
                value={option}
                control={<Radio />}
                label={option.charAt(0).toUpperCase() + option.slice(1)}
                componentsProps={{ typography: formControlLabelStyle }}
                sx={{ width: "100%" }}
              />
            </Box>
          ))}
        </RadioGroup>
        <Box sx={submitButtonStyleBox}>
          <Button type="submit" sx={submitButtonStyle}>Submit</Button>
         
          { role === 'admin' && <><Button onClick={(e) => handleModify(e, "quiz")} sx={adminModifyButton} startIcon={<EditOutlinedIcon />}>
              Modify
            </Button>
            <Button onClick={(e) => handleDelete(e, "quiz")} sx={adminDeleteButton} startIcon={<DeleteOutlinedIcon />}>
              Delete
            </Button></>}
          
        </Box>
        
      </FormControl>
    </Box>
  );
};
const Pdf=({pdfId,link,setShowNewActivityForm,onType,handleDelete,handleModify,onEdit})=>{
  const { role } = useAuth();
  return (
      <Box sx={pdfResource}>
          <Typography fontSize={16} fontWeight={500}>
            Support de cours :
          </Typography>
          <Link href={link} download sx={pdfLinkBoxStyle}>
            <CloudDownload sx={{ mr: 1 }} /> Télécharger le PDF
          </Link>
         {role === 'admin' && <Box sx={adminButtonContainer}>
            <Button onClick={(e) => handleModify(e, "pdf")} sx={adminModifyButton} startIcon={<EditOutlinedIcon />}>
              Modify
            </Button>
            <Button onClick={(e) => handleDelete(e, "pdf")} sx={adminDeleteButton} startIcon={<DeleteOutlinedIcon />}>
              Delete
            </Button>
        </Box>}
      </Box>
  )
}



function Activitie() {
  const { role } = useAuth();
  const [showNewActivityForm, setShowNewActivityForm] = useState(false); // État pour afficher le formulaire
  const [selectedResourceData, setselectedResourceData] = useState(null);
  const { CoursId } = useParams(); //recupere le id du cours depuuuuit l'url
  const {activities,loading,fetchActivities,createNewActivity,deleteExistingActivity,updateExistingActivity} = useActivities();
   const [deleteConfirmation,setDeleteConfirmation] = useState({
      isOpen: false,
      ActivityId: null,
      ActivityType:''
    }); 



   useEffect(() => {
      fetchActivities(CoursId);
    },[CoursId, fetchActivities]);
    

    function extractQuizData(answers) {
      const data = {
        answers: [],
        correct: null
      };
    
      for (const answer of answers) {
        data.answers.push(answer.reponse);
        if (answer.correct === 1) {
          data.correct = answer.reponse;
        }
      }
    
      return data;
    }

  const handleAddResource = async (resourceData) => {
    
    try {
      resourceData.course_id = CoursId;//ajouter le champs cours id qui est dans lurl
      await createNewActivity(resourceData,CoursId); 
      await fetchActivities(CoursId);
      setShowNewActivityForm(false);
      setselectedResourceData(null);
    } catch (error) {
      console.error("Erreur lors de l'ajout du cours : ", error);
    }
    
  };

  

  const handleDelete = (e,activity_type,id) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('delet  : '+activity_type+' id : '+id)
    setDeleteConfirmation({
      isOpen: true,
      ActivityId : id,
      ActivityType : activity_type
    });
     
   };


  const handleConfirmDelete = useCallback(async () => {
          if (deleteConfirmation.ActivityId) {
            try {
              await deleteExistingActivity(deleteConfirmation.ActivityId);
              await fetchActivities(CoursId);
            } finally {
              setDeleteConfirmation({ isOpen: false, ActivityId: null,ActivityType:'' });
            }
          }
        }, [deleteConfirmation]);

    const handleCancelDelete = useCallback(() => {
            setDeleteConfirmation({ isOpen: false, ActivityId: null ,ActivityType:''});
      }, []);

    const handleCancel = () => {
      setShowNewActivityForm(false);
      setselectedResourceData(null); // Réinitialiser les données de la ressource modifiée
    };


  const handleModify = (e,resourceData) => {
    setShowNewActivityForm(true);
    setselectedResourceData(resourceData);
  };
  const handleUpdateResource = async (formData) => {
    try {
      console.log(formData)
      await updateExistingActivity(formData.id,formData);
      await fetchActivities(CoursId);
      setShowNewActivityForm(false);
      setselectedResourceData(null);
    } catch (error) {
      console.error("Erreur lors de la modification de la ressource :", error);
    }
  };

 
  

  return (
    <Container disableGutters={true} sx={activitieContainerStyle}>

      <Dialog open={deleteConfirmation.isOpen} onClose={handleCancelDelete} >
                    <DialogTitle>Confirmer la suppression</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Êtes-vous sûr de vouloir supprimer le domaine "{deleteConfirmation.CoursTitle}" ?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCancelDelete}>Annuler</Button>
                      <Button 
                        onClick={handleConfirmDelete} 
                        color="error"
                        disabled={loading}
                      >
                        Confirmer
                      </Button>
                    </DialogActions>
      </Dialog>

      {role === 'admin' && <Box sx={headerManagementTitle}>
        <Typography variant="h3" sx={titleManagementtxt}>
          Gestion des Ressources
        </Typography>
        <Button variant="contained" startIcon={<AddCircleOutlineOutlinedIcon />} onClick={() => setShowNewActivityForm(true)} sx={addButton}>
          Nouveau Ressource
        </Button>
      </Box>}
     

      <Box sx={cardBoxStyle}>
        <Typography variant="h2" sx={cardHeaderStyle}>
          {activities.cours_title}
        </Typography>
        <Typography variant="p" sx={cardBodyStyle}>
          {activities.cours_description}
        </Typography>
       
      </Box>

      {/* Titre "Video Lecture" */}
      <Box sx={resourceBoxContainer}>
        <Box sx={resourceBoxHeaderStyle}>
          <OndemandVideoIcon sx={resourceIcon('#60A5FA')} />
          <Typography fontSize={16} fontWeight={500}>
            Video Lecture
          </Typography>
        </Box>

        {/* Intégration de la vidéo YouTube */}
        {activities?.activities?.videos.map((videoItem, index) =>
          <Video 
          key={`video-${videoItem.id}`}
            videoId={videoItem.id} 
            videoUrl={videoItem.video.video_url}
            handleDelete={(e)=>handleDelete(e,'video',videoItem.id)}
            handleModify={(e) => handleModify(e, {
              id: videoItem.id, // Ajouter un ID unique
              activity_type: videoItem.activity_type,
              video_url: videoItem.video.video_url
            })}
          />
        )}
        <Box sx={resourceBoxHeaderStyle}>
          <PictureAsPdfOutlinedIcon sx={resourceIcon('#EF4444')} />
          <Typography fontSize={16} fontWeight={500}>
            PDF and Article
          </Typography>
        </Box>

        {activities?.activities?.pdfs.map((pdfItem, index) => 
            <Pdf
            key={`pdf-${pdfItem.id}`} 
              pdfId={pdfItem.id}
              link={pdfItem.pdf.pdf_url}
              handleDelete={(e) => handleDelete(e, 'pdf', pdfItem.id)}
              handleModify={(e) =>
                handleModify(e, {
                  id: pdfItem.id,
                  activity_type: pdfItem.activity_type,
                  pdf_url: pdfItem.pdf.pdf_url,
                })
              }
            />
          )}

        <Box sx={resourceBoxHeaderStyle}>
          <HelpOutlineIcon sx={resourceIcon('#22C55E')} />
          <Typography fontSize={16} fontWeight={500}>
            Quiz
          </Typography>
        </Box>

        {activities?.activities?.quizzes.map((quizItem, index) => {

          const { answers, correct } = extractQuizData(quizItem.quiz.answers);
          return  <Quiz key={`quiz-${quizItem.id}`} quizId={quizItem.id} quiznumber={index+1} question={quizItem.quiz.question} options={answers} correctAnswer={correct} handleDelete={(e)=>handleDelete(e,'quiz',quizItem.id) } 
            handleModify={(e) =>  handleModify(e ,{
              id: quizItem.id,
              activity_type: quizItem.activity_type,
              question : quizItem.quiz.question,
              answers:answers,
              correct : correct,

          })} />
          }
        )}
       
        {role === 'admin' && showNewActivityForm && (
          <ActivityManagement 
            setShowNewActivityForm={setShowNewActivityForm} 
            onSubmit={selectedResourceData ? handleUpdateResource : handleAddResource}
            ActivitiesData={selectedResourceData}
            onCancel={handleCancel}
          />
)}
      </Box>
    </Container>
  );
}

export default Activitie;

