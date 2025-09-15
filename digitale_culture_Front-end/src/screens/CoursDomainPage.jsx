import React, { useCallback, useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Container,
  CssBaseline,
  Typography,
  Chip,
  LinearProgress,
  Card,
  CardContent,
  Grid,
  IconButton,
  useTheme,
  Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@mui/material';
import {
  Home as HomeIcon,
  VideoLibrary as VideoIcon,
  Article as ArticleIcon,
  Quiz as QuizIcon,
  CheckCircle,
  RadioButtonUnchecked
} from '@mui/icons-material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import TimeDifference from '../services/TimeDifference';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { Link, useParams } from "react-router-dom";
import {CoursboxStyle,CoursContainer,CoursTime,CoursTimeTxt,CoursTiltleTxt,CoursSubTiltleTxt,TaskIcon,RadioBut,CoursDomainContainer
  ,SelectedDomainContainer,SelectedDomainGlobalInfoText,SelectedDomainGlobalInfoItem,SelectedDomainchildrenContainer,SelectedDomainLevel,SelectedDomainnbrCours,
  SelectedDomainTitle,SelectedDomainDescription,SelectedDomainGlobalInfoContainer,CoursDomainSecContainer,AllCoursContainer,AllCoursSecContainer,HeaderTitle
  } from '../styles/CoursDomainPageStyle'
  import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
  import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { adminDeleteButton, adminButtonContainer,adminModifyButton } from '../styles/ManagementStyle.js';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import {headerManagementTitle,titleManagementtxt,addButton} from '../styles/ManagementStyle'
import CoursMangement from '../components/admin/CoursManagement/CoursManagement.jsx';
import { useAuth } from '../hooks/useAuth';
import useDomaines from "../hooks/useDomains.js";
import useCourses from "../hooks/useCourses.js";
import { getDomainCourses } from "../services/CoursesService.js";


const SelctedDomainInfo = ({ nbrCours, domain_Title, domain_Description, last_Update, publiched_Date, nbr_Enroll }) => {

  const timeDifference = TimeDifference(last_Update);

  return (
    <Box sx={SelectedDomainContainer}>
      <Box sx={SelectedDomainchildrenContainer}>
        <Chip label="Intermediate" sx={SelectedDomainLevel} />
        <Typography component="span" sx={SelectedDomainnbrCours}>
          {nbrCours} Cours
        </Typography>
      </Box>
      <Box sx={SelectedDomainchildrenContainer}>
        <Typography variant="h1" sx={SelectedDomainTitle}>
          {domain_Title}
        </Typography>
      </Box>
      <Box sx={SelectedDomainchildrenContainer}>
        <Typography variant="body1" component="p" sx={SelectedDomainDescription}>
          {domain_Description}
        </Typography>
      </Box>
      <Box sx={SelectedDomainGlobalInfoContainer}>
        
      </Box>
    </Box>
  );
}

const Cours = ({ id, duration, cours_title, cours_description , setShowNewCoursForm , onEdit,onDelete}) => {

    const { role } = useAuth();
    const handleDelete = useCallback((e) => {
      e.preventDefault();
      e.stopPropagation();
      onDelete(id, cours_title);
    }, [id, onDelete,cours_title]);
  
    const handleModify = useCallback((e) => {
      e.preventDefault();
      e.stopPropagation();
      setShowNewCoursForm(true);
      onEdit({ id: id , cours_title: cours_title , cours_description : cours_description , duration :duration});
      
    }, []);

  return (
    <Link to={`/DomainsCours/Activities/${id}`} style={{ textDecoration: 'none' }}>
      <Box sx={CoursboxStyle}>
        <Box sx={CoursContainer}>
          <Box sx={CoursTime}>
            <Typography variant="span" sx={CoursTimeTxt}>
              {duration}min
            </Typography>
          </Box>
          <Typography variant="h3" sx={CoursTiltleTxt}>
            {cours_title}
          </Typography>
          <Typography variant="p" sx={CoursSubTiltleTxt}>
            {cours_description}
          </Typography>
        </Box>
        {role === 'admin' && <Box sx={adminButtonContainer}>
          <Button onClick={handleModify} sx={adminModifyButton} startIcon={<EditOutlinedIcon />}>
            Modify
          </Button>
          <Button onClick={handleDelete} sx={adminDeleteButton} startIcon={<DeleteOutlinedIcon />}>
            Delete
          </Button>
        </Box>}
      </Box>
    </Link>
  );
};
function AllCoursCard({deleteExistingCours,updateExistingCours,fetchCourses,courses,DomainId,loading}) {
  const [showNewCoursForm, setShowNewCoursForm] = useState(false);
  const [selectedCours, setSelectedCours] = useState(null); // Pour modification
  const { role } = useAuth();
  const [deleteConfirmation,setDeleteConfirmation] = useState({
    isOpen: false,
    CoursId: null,
    CoursTitle:''
  }); 

  const courseList = courses?.courses || [];


 
  useEffect(() => {
    fetchCourses(DomainId);
  }, [DomainId, fetchCourses]);

  const handleModifyCours = async (formData) => {
    try {
      await updateExistingCours(formData.id,formData); 
      fetchCourses(DomainId);
      setShowNewCoursForm(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du domaine : ", error);
    }
  };

    const handleDeleteRequest = useCallback((CoursId, CoursTitle) => {
        setDeleteConfirmation({
          isOpen: true,
          CoursId,
          CoursTitle
        });
    }, []);

    const handleConfirmDelete = useCallback(async () => {
        if (deleteConfirmation.CoursId) {
          try {
            await deleteExistingCours(deleteConfirmation.CoursId);
            await fetchCourses(DomainId);
          } finally {
            setDeleteConfirmation({ isOpen: false, CoursId: null,CoursTitle:'' });
          }
        }
      }, [deleteConfirmation]);
      const handleCancelDelete = useCallback(() => {
        setDeleteConfirmation({ isOpen: false, CoursId: null ,CoursTitle:''});
      }, []);


  return (
    <Box sx={AllCoursContainer}>
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
      <Box sx={AllCoursSecContainer}>
        <Typography variant="h2" sx={HeaderTitle}>
          Course Content
        </Typography>

       { loading ? (
          <Typography>Chargement des cours...</Typography>
        ) : courseList.length === 0 ? (
          <Typography>Aucun cours trouvé.</Typography>
        ) : (
          courseList.map((cours) => (
            <Cours
              key={cours.id}
              id={cours.id}
              duration={cours.duration}
              cours_title={cours.cours_title}
              cours_description={cours.cours_description}
              onEdit={setSelectedCours}
              setShowNewCoursForm={setShowNewCoursForm}
              onDelete={handleDeleteRequest}
            />
          ))
        )}
      </Box>

      {role === "admin" && showNewCoursForm && (
        <CoursMangement 
          setShowNewCoursForm={setShowNewCoursForm} 
          onSubmit={handleModifyCours}
          CoursData={selectedCours}
        />
      )}
    </Box>
  );
}
export default function CoursDomain() {
 
  const [showNewCoursForm, setShowNewCoursForm] = useState(false);
  const { DomainId } = useParams(); //pour recuuprer l'id depuis l'url
  const {courses,loading,fetchCourses,createNewCours,deleteExistingCours,updateExistingCours} = useCourses();
  const { role } = useAuth();


  const handleAddCours = async (formData) => {
    try {
      formData.domain_id = DomainId;//ajouter le champs domain id qiu est dans lurl
      await createNewCours(formData,DomainId); 
      await fetchCourses(DomainId);
      setShowNewCoursForm(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du domaine : ", error);
    }
  };

 
  

  return (
    <Container maxWidth="lg" disableGutters sx={CoursDomainContainer}>
      <Box sx={CoursDomainSecContainer}>
        {role === 'admin' && <Box sx={headerManagementTitle}>
          <Typography variant="h3" sx={titleManagementtxt}>
            Gestion des Cours
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineOutlinedIcon />}
            sx={addButton}
            onClick={() => setShowNewCoursForm(true)}
          >
            Nouveau Cours
          </Button>
        </Box>
        }
        {role === "admin" && showNewCoursForm && (
          <CoursMangement setShowNewCoursForm={setShowNewCoursForm}
          onSubmit={handleAddCours}
          />
        )}
        <SelctedDomainInfo
          nbrCours={courses.courses?.length || 0}
          domain_Title={courses.domain_title}
          domain_Description={courses.domain_description}
          last_Update={courses.updated_at}
          publiched_Date={courses.created_at}
          nbr_Enroll={1500}
        />
        {console.log(courses)}
       <AllCoursCard courses={courses} DomainId={DomainId} fetchCourses={fetchCourses} deleteExistingCours={deleteExistingCours} updateExistingCours={updateExistingCours}loading={loading} />
      </Box>
    </Container>
  );
}
