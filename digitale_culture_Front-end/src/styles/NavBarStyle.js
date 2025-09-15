
const AppBareStyle={
    zIndex:2,
    elevation:0,
    position:'sticky',
    borderBottom: "1px solid #e0e0e0",
    backgroundColor :"#FFFFFF",
    px:" 2rem",
    fontFamily:'ui-sans-serif, system-ui, sans-serif',
     boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.07)"
  }
  
  const FirstSec={ flexGrow: 1,display:'flex',alignItems:'center' }
  const Logo={ color: "#4285F4",mr:1 }
  const LogoTitle={ fontWeight: "600", color: "#333",fontFamily: 'inherit',fontSize:'1.125rem' }
  const Navigation={ display: "flex", gap: 3, ml: 5,fontweight: '500',fontSize:'.875rem' }
  const SelectedButtonNavigation={ fontWeight: "bold", color: "#333",fontFamily: 'inherit' }
  const ButtonNavigation={ color: "#666",fontFamily: 'inherit' }
  const BoxLogo={display:'flex',flexDirection:'row',alignItems:'center',cursor:'pointer'}
  const SecondSec={ display: "flex", alignItems: "center", gap: 2, }
  const PersonalInfo={display: "flex",flexDirection:'row',alignItems: "center",p:1,borderRadius:3 ,cursor: 'pointer', 
    '&:hover': {
      backgroundColor: '#E1EEFF' 
    }}
  const AvatarStyle={
    width: '2rem',
    fontweight: 500,
    fontSize:'.875rem',
    height: '2rem',
    mr:1
  }
  const FullName={ color: "#333",fontFamily: 'inherit',fontSize:'.875rem',fontWeight:500 }
  const LogOutButton={
    color: "gray",
    borderColor: "gray",
    textTransform: "none",
  }
  const LogOutIcon={fontSize:18,mr:1}
  
  export {
    AppBareStyle,
    FirstSec,
    Logo,
    LogoTitle,
    Navigation,
    SelectedButtonNavigation,
    ButtonNavigation,
    SecondSec,
    PersonalInfo,
    AvatarStyle,
    FullName,
    LogOutButton,
    LogOutIcon,
    BoxLogo
  };
    