import React, { memo, useState } from "react";
import { 
  Box, 
  Typography, 
  Chip, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText, 
  DialogActions,
  Skeleton
} from "@mui/material";
import { EmojiEvents } from "@mui/icons-material";
import { Link } from "react-router-dom";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { 
  CardContainerStyle, 
  HeaderSecCard, 
  HeaderSecCardContainer, 
  DomainTitle, 
  MainDomainCard, 
  MainDomaineCardBox, 
  LevelCoursChip, 
  DomainDecriptionCard, 
  AllDomainBox, 
  LinkCardDomain 
} from "../styles/DomainCardStyle.js";
import { 
  adminDeleteButton, 
  adminButtonContainer, 
  adminModifyButton 
} from "../styles/ManagementStyle.js";
import { useAuth } from '../hooks/useAuth';

// Composant optimisé pour éviter les re-renders inutiles
const DomainCard = memo(({
  domainId,
  domain_title,
  domain_description,
  level,
  domain_image_url,
  onEdit,
  onDelete,
  isLoading
}) => {
  const { role } = useAuth();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(domainId, domain_title);
  };

  const handleModify = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit({
      id: domainId,
      domain_title: domain_title,
      domain_description: domain_description,
      level: level,
      domain_image_url: domain_image_url,
    });
  };
  const [imageError, setImageError] = useState(false);

  return (
   <Box key={domainId} sx={CardContainerStyle}>
      <Box sx={HeaderSecCard}>
        {isLoading ? (
          <Skeleton variant="rectangular" width="100%" height="100%" />
        ) : (
          <>
            {!imageLoaded && !imageError && (
              <Skeleton variant="rectangular" width="100%" height="100%" />
            )}

            {!imageError ? (
              <img
                src={domain_image_url}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  position: 'absolute',
                  top: 0,
                  left: 0
                }}
                onLoad={() => {
                  setImageLoaded(true);
                }}
                onError={() => {
                  console.error("Erreur chargement image :", domain_image_url);
                  setImageError(true); // Cacher l’image cassée
                }}
                loading="lazy"
              />
            ) : (
              // Fallback visuel si image cassée (peut être remplacé par une image par défaut)
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#ccc',
                  position: 'absolute',
                  top: 0,
                  left: 0
                }}
              />
            )}

            <Box sx={HeaderSecCardContainer}>
              <Typography variant="h5" sx={DomainTitle}>
                {domain_title.split("(")[0].trim()}
              </Typography>
            </Box>
          </>
        )}
      </Box>

      <Box sx={MainDomainCard}>
        <Box sx={MainDomaineCardBox}>
          {isLoading ? (
            <Skeleton variant="rectangular" width={60} height={24} />
          ) : (
            <Chip label={level} size="small" sx={LevelCoursChip} />
          )}
        </Box>

        <Typography variant="body2" sx={DomainDecriptionCard}>
          {isLoading ? (
            <>
              <Skeleton />
              <Skeleton width="80%" />
            </>
          ) : (
            domain_description
          )}
        </Typography>

        {role.toLowerCase() === "admin" && !isLoading && (
          <Box sx={adminButtonContainer}>
            <Button
              onClick={handleModify}
              sx={adminModifyButton}
              startIcon={<EditOutlinedIcon />}
            >
              Modifier
            </Button>
            <Button
              onClick={handleDelete}
              sx={adminDeleteButton}
              startIcon={<DeleteOutlinedIcon />}
            >
              Supprimer
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}, (prevProps, nextProps) => {
  // Optimisation: éviter les re-renders inutiles
  return (
    prevProps.domainId === nextProps.domainId &&
    prevProps.domain_title === nextProps.domain_title &&
    prevProps.domain_description === nextProps.domain_description &&
    prevProps.level === nextProps.level &&
    prevProps.domain_image_url === nextProps.domain_image_url &&
    prevProps.isLoading === nextProps.isLoading
  );
});

// Composant principal
function AllDomainsCard({ 
  domaines, 
  isLoading,
  onEditDomain,
  onDeleteDomain,
  onShowForm
}) {
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    domainId: null,
    domainTitle: ''
  });

  const handleDeleteRequest = (domainId, domainTitle) => {
    setDeleteConfirmation({
      isOpen: true,
      domainId,
      domainTitle
    });
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmation.domainId) {
      onDeleteDomain(deleteConfirmation.domainId);
      setDeleteConfirmation({ 
        isOpen: false, 
        domainId: null, 
        domainTitle: '' 
      });
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation({ 
      isOpen: false, 
      domainId: null, 
      domainTitle: '' 
    });
  };

  // Affichage des squelettes pendant le chargement
  if (isLoading) {
    return (
      <Box sx={AllDomainBox}>
        {[...Array(6)].map((_, index) => (
          <Box key={index} sx={CardContainerStyle}>
            <Skeleton variant="rectangular" width="100%" height={140} />
            <Box sx={{ p: 2 }}>
              <Skeleton width="60%" height={24} />
              <Skeleton width="40%" height={20} sx={{ mt: 1 }} />
              <Box sx={{ display: 'flex', mt: 2 }}>
                <Skeleton width={80} height={36} sx={{ mr: 1 }} />
                <Skeleton width={80} height={36} />
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <Box sx={AllDomainBox}>
      <Dialog 
        open={deleteConfirmation.isOpen} 
        onClose={handleCancelDelete}
      >
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer le domaine "{deleteConfirmation.domainTitle}" ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Annuler</Button>
          <Button 
            onClick={handleConfirmDelete} 
            color="error"
          >
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
      
      {domaines.length === 0 && !isLoading ? (
        <Typography variant="h6" sx={{ width: '100%', textAlign: 'center', py: 4 }}>
          Aucun domaine n'existe pour le moment.
        </Typography>
      ) : (
        domaines.map((domainItem) => (
          <Link
            key={domainItem.id}
            to={`/DomainsCours/${domainItem.id}`}
            style={LinkCardDomain}
          >
            <DomainCard
              domainId={domainItem.id}
              domain_title={domainItem.domain_title}
              level={domainItem.level}
              domain_image_url={domainItem.domain_image_url}
              domain_description={domainItem.domain_description}
              onEdit={(domain) => {
                onEditDomain(domain);
                onShowForm();
              }}
              onDelete={handleDeleteRequest}
              isLoading={isLoading}
            />
          </Link>
        ))
      )}
    </Box>
  );
}

export default AllDomainsCard;