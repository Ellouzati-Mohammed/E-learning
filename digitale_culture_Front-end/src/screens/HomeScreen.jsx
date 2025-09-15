import React, { useState, useEffect, useCallback } from "react";
import AllDomainsCard from "../components/DomainCard";
import { Box, Typography, Button } from "@mui/material";
import {
  HomeBox,
  WelcomCardMotivation,
  WelcomCardMotivationBox,
  WelcomCardMotivationTitle
} from '../styles/HomeStyle';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { headerManagementTitle, titleManagementtxt, addButton } from '../styles/ManagementStyle';
import DomainManagement from "../components/admin/DomainManagement/DomainManagement";
import { useAuth } from '../hooks/useAuth';
import useDomaines from "../hooks/useDomains";
import Skeleton from '@mui/material/Skeleton';

function HomeScreen() {
  const { role } = useAuth();
  const [showNewDomainForm, setShowNewDomainForm] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { 
    domaines, 
    fetchDomaines, 
    createNewDomaine, 
    updateExistingDomaine, 
    deleteExistingDomaine 
  } = useDomaines();

  // Chargement initial avec gestion d'état de chargement
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await fetchDomaines();
      } catch (error) {
        console.error("Erreur de chargement des domaines", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [fetchDomaines]);

  const handleAddDomain = useCallback(async (formData) => {
    try {
      setIsLoading(true);
      await createNewDomaine(formData);
      await fetchDomaines();
      setShowNewDomainForm(false);
    } catch (error) {
      console.error("Erreur lors de la création du domaine : ", error);
    } finally {
      setIsLoading(false);
    }
  }, [createNewDomaine, fetchDomaines]);

  const handleUpdateDomain = useCallback(async (formData) => {
    try {
      setIsLoading(true);
      await updateExistingDomaine(formData.id, formData);
      await fetchDomaines();
      setShowNewDomainForm(false);
      setSelectedDomain(null);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du domaine : ", error);
    } finally {
      setIsLoading(false);
    }
  }, [updateExistingDomaine, fetchDomaines]);

  const handleDeleteDomain = useCallback(async (domainId) => {
    try {
      setIsLoading(true);
      await deleteExistingDomaine(domainId);
      await fetchDomaines();
    } catch (error) {
      console.error("Erreur lors de la suppression du domaine : ", error);
    } finally {
      setIsLoading(false);
    }
  }, [deleteExistingDomaine, fetchDomaines]);

  return (
    <Box sx={HomeBox}>
  {role && !(role.toLowerCase() === 'admin') && (
        <Box sx={WelcomCardMotivation}>
          <Box sx={WelcomCardMotivationBox}>
            <Typography variant="h2" sx={WelcomCardMotivationTitle}>
              Explorez le Monde Numérique
            </Typography>
          </Box>
        </Box>
      )}
      
      {role === "admin" && (
        <Box sx={headerManagementTitle}> 
          <Typography variant="h3" sx={titleManagementtxt}>
            Gestion des Domaines
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineOutlinedIcon />}
            sx={addButton}
            onClick={() => {
              setSelectedDomain(null);
              setShowNewDomainForm(true);
            }}
            disabled={isLoading}
          >
            Nouveau Domaine
          </Button>
        </Box>
      )}

      {showNewDomainForm && (
        <DomainManagement 
          setShowNewDomainForm={setShowNewDomainForm} 
          onSubmit={selectedDomain ? handleUpdateDomain : handleAddDomain} 
          domainData={selectedDomain}
        />
      )}
      
      <AllDomainsCard 
        domaines={domaines}
        isLoading={isLoading}
        onEditDomain={setSelectedDomain}
        onDeleteDomain={handleDeleteDomain}
        onShowForm={() => setShowNewDomainForm(true)}
      />
    </Box>
  );
}

export default HomeScreen;