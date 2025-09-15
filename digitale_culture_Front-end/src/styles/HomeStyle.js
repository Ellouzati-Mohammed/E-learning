
const HomeBox={
    flex: 1,
    backgroundColor: "#f8fafc",
    overflowY: 'auto',
    py: "24px",
    px:'10px',
    scrollBehavior: "smooth"
  }
  
  const WelcomCardMotivation={ 
    mb: 4, 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center",
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '16px',
    height: '200px',
    background: '#6D6DFB'
  }
  
  const WelcomCardMotivationBox={ 
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.3)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',
    p: 4
  }

  const WelcomCardMotivationTitle={ fontWeight: 800, mb: 2 }
  
  const WelcomCardMotivationText={ opacity: 0.9 }
  


export {HomeBox,WelcomCardMotivation,WelcomCardMotivationBox,WelcomCardMotivationTitle,WelcomCardMotivationText}