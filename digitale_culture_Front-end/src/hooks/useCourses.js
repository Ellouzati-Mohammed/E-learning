import { useState, useCallback } from 'react'; // Ajouter useCallback
import { getDomainCourses, createDomainCourse, updateDomainCourse, deleteDomainCourse } from '../services/CoursesService';

const useCourses = () => {
  const [courses, setCours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchCourses = useCallback(async (domainId) => {//aficher les cours d'uun domain selectioner
    setLoading(true);
    setError(null);
    try {
      const response = await getDomainCourses(domainId);
      setCours(response.data);
    } catch (err) {
      setError(err.message || 'Erreur lors de la récupération des courses');
    } finally {
      setLoading(false);
    }
  }, []); // Aucune dépendance nécessaire

  const createNewCours = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createDomainCourse(data);
      setCours((prev) => ({
        ...prev,
        courses: [...(prev.courses || []), response.data]
      }));
    } catch (err) {
      console.error("Erreur serveur lors de la création du cours :", err);
      setError(err.message || 'Erreur lors de la création du cours');
    } finally {
      setLoading(false);
    }
  }, []);
  

  
  const updateExistingCours = useCallback(async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateDomainCourse(id, data);
     
      setCours((prev) => ({
        ...prev, 
        courses: prev.courses.map(course => 
          course.id === id ? { ...course, ...response.data } : course // Remplace le cours par ses nouvelles données
        ),
      }));
    } catch (err) {
      setError(err.message || 'Erreur lors de la mise à jour du cours');
    } finally {
      setLoading(false);
    }
  }, []);


  const deleteExistingCours = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteDomainCourse(id);
      setCours(prev => ({
        ...prev,
        courses: prev.courses.filter(course => course.id !== id)
      }));
    } catch (err) {
      setError(err.message || 'Erreur lors de la suppression du cours');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    courses,
    loading,
    error,
    fetchCourses,
    createNewCours,
    updateExistingCours,
    deleteExistingCours,
  };
};

export default useCourses;