import { useState, useCallback } from 'react'; // Ajouter useCallback
import {getActivities,createActivity,updateActivity,deleteActivity} from '../services/ActivityService';

const useActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchActivities = useCallback(async (CoursId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getActivities(CoursId);
      setActivities(response.data);
    } catch (err) {
      setError(err.message || 'Erreur lors de la récupération des activities');
    } finally {
      setLoading(false);
    }
  }, []); // Aucune dépendance nécessaire

  const createNewActivity = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createActivity(data);
    } catch (err) {
      setError(err.message || 'Erreur lors de la création du cours');
    } finally {
      setLoading(false);
    }
  }, []);
  

  
  const updateExistingActivity = useCallback(async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateActivity(id, data);
    } catch (err) {
      console.error("Erreur attrapée :", err); // Affiche l'erreur brute
    if (err.response) {
      // Si l'erreur contient une réponse (erreur HTTP)
      console.error("Détails de la réponse du serveur :", err.response);
      console.error("Données de la réponse :", err.response.data);
      console.error("Code de statut :", err.response.status);
      setError(err.response.data.message || 'Erreur lors de la mise à jour du cours');
    } else {
      setError(err.message || 'Erreur lors de la mise à jour du cours');
    }
    } finally {
      setLoading(false);
    }
  }, []);


  const deleteExistingActivity = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteActivity(id);
      
    } catch (err) {
      if (err.response) {
        // La réponse a été reçue mais le serveur a renvoyé une erreur
        console.error("Erreur serveur :", {
          status: err.response.status,
          data: err.response.data,
          message: err.response.data.message,
        });
        setError(err.response.data.message || 'Erreur serveur inconnue');
      }
      setError(err.message || 'Erreur lors de la suppression du cours');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    activities,
    loading,
    error,
    fetchActivities,
    createNewActivity,
    updateExistingActivity,
    deleteExistingActivity,
  };
};

export default useActivities;