const ProfileContainer={
    display: "flex",
    flexDirection: "column",
    flex:1,
    my: 3,
    borderRadius: 3,
    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
    backgroundColor:'#FFFFFF'
 }
 const ProfileBox={display:'flex',flexDirection:'column',justifyContent:'center',p:'3.5rem'}
 
 const HeaderProfiletop={display:'flex',flexDirection:'row',alignItems: 'center'}
 const HeaderProfilebot={display:'flex',flexDirection:'row',alignItems: 'stretch',maxWidth:'80%'}
 const HeaderProfileIcon={fontSize:'3rem',color:'#6366F1',mr:2}
 const HeaderTextProfile={display:'flex',flexDirection:'column',justifyContent:'center'}
 const HeaderH2={fontFamily:'inherit', fontSize:'1.875rem',fontWeight:'700',}
 const HeaderSpan={fontFamily:'inherit', fontSize:'1rem',fontWeight:'500',color:'#6B7B90'}
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
      },
    },
  };
  const inputStyle={
    padding: 0,
    my: 1 ,
    backgroundColor: 'transparent'
   };
   const inputIcon={ 
    color: "#64748B",
    fontSize: "20px", 
    ml: '15px' 
  };
 const AvatarBox={display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',border:'solid 2px #E2E8F0',borderRadius:2,p:2,mt:4}
 const AvatarStyle={ 
    width: '6rem',
    height: '6rem',
    fontweight: 500,
    fontSize:'2rem',
    m:2
 }
 
 const FullNameSpan={fontSize:'1.15rem',fontWeight:'500',fontFamily:'inherit'}
 const EmailSpan={fontSize:'.875rem',fontWeight:'500',color:'#6B7B90',fontFamily:'inherit'}
 const ModificationBox={display:'flex',flexDirection:'column',justifyContent:'center',border:'solid 2px #E2E8F0',borderRadius:2,flex:1,p:2,ml:3,mt:4}
 const InputLabel={fontFamily:'inherit',fontWeight:'500',fontSize:'0.875rem'}
 const ButtonBox={width:'100%',display:'flex',justifyContent:'end'}
 const ButtonSubmit={backgroundColor:'#6366F1',color:'#FFFFFF'}


 export { 
    ProfileContainer, 
    ProfileBox, 
    HeaderProfiletop,
    HeaderProfilebot, 
    HeaderProfileIcon, 
    HeaderTextProfile, 
    HeaderH2, 
    HeaderSpan, 
    textFieldStyle, 
    inputStyle, 
    inputIcon, 
    AvatarBox, 
    AvatarStyle, 
    FullNameSpan, 
    EmailSpan, 
    ModificationBox, 
    InputLabel, 
    ButtonBox, 
    ButtonSubmit 
  };
  