
const formContainerStyle = {
    maxWidth: '28rem',
    backgroundColor: 'white',
    width: '25%',
    boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.09)',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 2,
    padding: 3
  };
  const InputBox={ marginBottom: 1,display:'flex',flexDirection:'column' }

  const titleStyle = {
    fontFamily: 'inherit',
    fontWeight: '700',
    marginBottom: 1,
    textAlign: 'center'
  };
  
  const subtitleStyle = {
    fontFamily: 'inherit',
    fontWeight: '400',
    color: '#64748B',
    marginBottom: 2,
    textAlign: 'center'
  };
  
  const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      "& fieldset": {
        borderColor: "#CBD5E1",
      },
      "&:hover fieldset": {
        borderColor: "#94A3B8",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#1E90FF",
      },
      "& .MuiOutlinedInput-input": {
        py: "10px",
        fontSize: "14px",
        ml:1
      },
    },
  };
  
  const submitButtonStyle = {
    backgroundColor: '#8B5CF6',
    width: '100%',
    color: 'white',
    fontFamily: 'inherit',
    fontWeight: '500',
    fontSize: '.875rem',
    py: '.5rem',
    borderRadius: 2,
    marginTop: 1,
    marginBottom: 1,
    textTransform: "none"
  };
  
  const linkStyle = {
    color: '#8B5CF6',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    marginLeft: '7px'
  };
  const inputLabel={ 
    fontFamily: 'inherit',
    fontWeight: 500,
    fontSize: '14px' 
  };
  const inputIcon={ 
   color: "#64748B",
   fontSize: "20px", 
   ml: '10px' ,
 };
  const inputStyle={
    fontSize:'0.875rem',
    borderRadius: 2,
   padding: 0,
   my: 1 
  };
  const MotivationLabel={
   display: 'flex',
   flexDirection: 'row',
   justifyContent: 'center', 
   alignItems: 'center', 
   marginTop: 2
  };
  const AuthContainer={ 
   backgroundColor: '#DEE3FB', 
   margin: 0, display: 'flex', 
   justifyContent: 'center', 
   alignItems: 'center', 
   fontFamily: 'ui-sans-serif, system-ui, sans-serif' 
  };
  const txtIcon={ml:2}
  
export { InputBox,txtIcon,formContainerStyle, titleStyle, subtitleStyle, textFieldStyle, submitButtonStyle, linkStyle,inputLabel,inputIcon,inputStyle,MotivationLabel,AuthContainer};
