import { keyframes } from '@mui/system';

const floating = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(25, 118, 210, 0.4); }
  70% { box-shadow: 0 0 0 15px rgba(25, 118, 210, 0); }
  100% { box-shadow: 0 0 0 0 rgba(25, 118, 210, 0); }
`;

const typing = keyframes`
  0% { transform: translateY(0px); }
  30% { transform: translateY(-4px); }
  60% { transform: translateY(0px); }
  100% { transform: translateY(0px); }
`;

export const styles = {
  root: {
    position: "fixed",
    bottom: 24,
    right: 24,
    zIndex: 1300,
    animation: `${floating} 3s ease-in-out infinite`
  },
  
  chatButton: {
    bgcolor: 'primary.main',
    color: "white",
    width: 60,
    height: 60,
    boxShadow: 6,
    '&:hover': { 
      bgcolor: 'primary.dark',
      transform: 'scale(1.1)'
    }
  },

  chatContainer: {
    position: 'absolute',
    bottom: 'calc(100% + 16px)',
    right: 0,
    width: 340,
    height: 500,
    display: "flex",
    flexDirection: "column",
    bgcolor: 'background.default',
    borderRadius: 4,
    overflow: "hidden"
  },

  header: {
    bgcolor: 'primary.main',
    p: 2,
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  messagesContainer: {
    flex: 1, 
    p: 2, 
    overflowY: 'auto',
    bgcolor: 'background.paper'
  },

  messageBubble: {
    p: 1.5,
    maxWidth: '85%',
    color: 'text.primary',
    borderRadius: 4,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },

  userMessage: {
    bgcolor: 'primary.main',
    color: 'white'
  },

  botMessage: {
    bgcolor: 'grey.100'
  },

  typingIndicator: {
    display: "flex",
    justifyContent: "flex-start",
    mb: 2,
    alignItems: "center",
    minHeight: 40
  },

  typingBubble: {
    bgcolor: 'background.paper',
    px: 2,
    py: 1.5,
    borderRadius: 4,
    maxWidth: "85%",
    display: 'flex',
    gap: 0.8,
    alignItems: 'center'
  },

  typingDot: (index) => ({
    width: 6,
    height: 6,
    borderRadius: '50%',
    animation: `${typing} 1.2s infinite ${index * 0.2}s`,
    transformOrigin: 'bottom',
    '&:nth-of-type(1)': { bgcolor: 'primary.dark' },
    '&:nth-of-type(2)': { bgcolor: 'primary.main' },
    '&:nth-of-type(3)': { bgcolor: 'primary.light' }
  }),

  inputArea: {
    p: 2, 
    borderTop: 1, 
    borderColor: 'divider', 
    display: "flex", 
    gap: 1,
    bgcolor: 'background.default',
    alignItems: 'center',
    flexDirection: 'row'
  },

  textField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 20,
      bgcolor: 'background.paper'
    },
    flex: 1
  },

  sendButton: {
    borderRadius: 20,
    minWidth: 40,
    height: 40,
    flexShrink: 0
  }
};

export const animations = {
  floating,
  pulse,
  typing
};