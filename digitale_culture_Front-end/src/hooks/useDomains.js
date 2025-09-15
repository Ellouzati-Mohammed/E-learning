import { useState, useCallback } from 'react'; // Ajouter useCallback
import { getDomains, createDomain, updateDomain, deleteDomain } from '../services/DomainService';

const useDomaines = () => {
  const [domaines, setDomaines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mémoiser fetchDomaines
  const fetchDomaines = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getDomains();
      setDomaines(response.data);
    } catch (err) {
      setError(err.message || 'Erreur lors de la récupération des domaines');
    } finally {
      setLoading(false);
    }
  }, []); // Aucune dépendance nécessaire

  // Mémoiser createNewDomaine
  const createNewDomaine = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createDomain(data);
      setDomaines((prev) => [...prev, response.data]);
    } catch (err) {
      setError(err.message || 'Erreur lors de la création du domaine');
    } finally {
      setLoading(false);
    }
  }, []);

  // Mémoiser updateExistingDomaine
  const updateExistingDomaine = useCallback(async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateDomain(id, data);
      setDomaines((prev) => 
        prev.map(domaine => 
          domaine.id === id ? { ...domaine, ...response.data } : domaine
        )
      );
    } catch (err) {
      setError(err.message || 'Erreur lors de la mise à jour du domaine');
    } finally {
      setLoading(false);
    }
  }, []);

  // Mémoiser deleteExistingDomaine
  const deleteExistingDomaine = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteDomain(id);
      setDomaines((prev) => prev.filter(domaine => domaine.id !== id));
    } catch (err) {
      console.error('Erreur lors de la suppression :', err);
      setError(err.message || 'Erreur lors de la suppression du domaine');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    domaines,
    loading,
    error,
    fetchDomaines,
    createNewDomaine,
    updateExistingDomaine,
    deleteExistingDomaine,
  };
};

export default useDomaines;