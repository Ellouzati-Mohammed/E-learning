
const vidioBoxStyle = {
    display: "flex",
    flexDirection:'column',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E222A",
    minHeight: "400px",
    borderRadius: 3,
    overflow: "hidden",
    my: 2,
    p:1,
    width: '70%'
  };
  
  const QuizQuestion={fontSize:'1rem'}
  
  const disabledStyleQuiz = {
    pointerEvents: "none", 
    opacity: 0.5, 
    userSelect: "none", 
  };


  const quizBoxStyle = {
    border: 'solid 2px #E5E7EB',
    borderRadius: 2,
    padding: 2,
    margin: 1,
     };
  
  const questionBoxStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "27px",
    height: "27px",
    borderRadius: 3,
    backgroundColor: "#1E90FF",
    color: "white",
    fontSize: '1rem',
    marginRight: "8px",
  };

  const SelctedResponse = (selectedValue, option, isSubmitted, trueValue) => ({
    border: "1px solid #E5E7EB",
    borderRadius: 2,
    px: 2,
    my: 1,
    backgroundColor: isSubmitted
      ? option === trueValue
        ? "#4CAF50A3" // Vert pour la bonne réponse
        : selectedValue === option
        ? "#EF5350A3" // Rouge pour une mauvaise réponse sélectionnée
        : "white"
      : selectedValue === option
      ? "#E0F7FA" // Bleu clair pour la sélection avant soumission
      : "white",
    transition: "background-color 0.3s",
  });

  
  const formControlLabelStyle = {
    fontSize: "15px"
  };
  
  const submitButtonStyle = {
    backgroundColor: "#8B5CF6",
    color: "white",
    height:'0',
    fontSize: "0.8rem",
    minHeight:'100%',
    textTransform: "none",
    mx:2
  };
  const submitButtonStyleBox={
    display:'flex',
    justifyContent:'end',
    mx:2
   };
  
  const activitieContainerStyle = {
    overflow: 'scroll',
    display: "flex",
    flexDirection: "column",
    width: "100%",
    my: 3,
    borderRadius: 3,
    fontFamily: 'ui-sans-serif, system-ui, sans-serif'
  };
  
  const cardBoxStyle = {
    backgroundColor: "#FFFFFF",
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 2,
    boxShadow: "2px 2px 5px #47474721",
    borderRadius: 2,
    padding: 2
  };
  
  const cardHeaderStyle = {
    fontFamily: 'inherit',
    fontWeight: '700',
    fontSize: '1.875rem'
  };
  
  const cardBodyStyle = {
    fontFamily: 'inherit',
    fontWeight: '400',
    fontSize: '1rem',
    color: 'rgb(75, 85, 99)',
    paddingY: 1
  };
  
  const buttonGroupStyle = {
    marginTop: 1
  };
  
  const NavButton={ 
    fontSize: '12px',
    fontWeight:'500',
    color:'black',
    fontFamily:'ui-sans-serif, system-ui, sans-serif',
    border:'solid 2px #E2E8F0',
    p:'5px'
  }

  const resourceBoxContainer={
    backgroundColor: "#FFFFFF",
    display:'flex',
    flexDirection:'column',
    boxShadow:"0px 0px 5px #47474721",
    borderRadius:2,p:2
  }

  const resourceBoxHeaderStyle = {
    display: "inline-flex",
    alignItems: "center",
    color: "#64748B",
    backgroundColor: "#F1F5F9",
    width: "fit-content",
    padding: 1,
    marginY: 1,
    borderRadius: 1,
  };
  
  const pdfLinkBoxStyle = { 
    display: "flex",
    mx:1, 
    textDecoration: "none", 
    color: "primary.main", 
    fontSize: "18px" 
  };
  
  

  const resourceIcon = (color) => ({ 
    fontSize: 20, 
    marginRight: 1, 
    color: color 
  })

  const pdfResource={
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    my:2,
    mx:1
  }
  export{ 
    vidioBoxStyle,
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
    SelctedResponse,
    submitButtonStyleBox,
    NavButton,
    resourceBoxContainer,
    resourceIcon,
    pdfResource,
    QuizQuestion,
    disabledStyleQuiz
  };
    