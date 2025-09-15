import { Box, Button } from "@mui/material";
import { RESOURCE_TYPES } from "../../../utils/constants";

const ResourceTypeSelector = ({ currentType, onTypeChange }) => {
  return (
    <Box sx={{
      display: 'flex',
      gap: 1,
      backgroundColor: '#F1F5F9',
      padding: 1,
      borderRadius: 1
    }}>
      {Object.values(RESOURCE_TYPES).map(activity_type => (
        <Button
          key={activity_type}
          variant={currentType === activity_type ? 'contained' : 'text'}
          onClick={() => onTypeChange(activity_type)}
          sx={{
            flexGrow: 1,
            textTransform: 'capitalize',
            backgroundColor: currentType === activity_type ? '#FFFFFF' : 'transparent',
            color: '#000000',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: currentType === activity_type ? '#F0F0F0' : '#E8E8E8'
            }
          }}
        >
          {activity_type}
        </Button>
      ))}
    </Box>
  );
};

export default ResourceTypeSelector;