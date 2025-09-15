import { height, maxHeight, minHeight } from "@mui/system"

const adminDeleteButton={
    backgroundColor: "#D32F2F",
    color: "white",
    height:'0',
    fontSize: "0.8rem",
    minHeight:'100%',
    textTransform: "none"
  }
const adminAddButton={
    backgroundColor: "#0F1629",
    color: "white",
    height:'0',
    fontSize: "0.8rem",
    textTransform: "none"
  }
const adminAnnulerButton={
  backgroundColor: "#FFFFFF",
  border:'solid 1px black',
  color:'black',
  height:'0',
  fontSize: "0.8rem",
  textTransform: "none",
  mr:2
  }
const adminModifyButton={
    backgroundColor: "#1446C1",
    color: "white",
    height:'0',
    fontSize: "0.8rem",
    textTransform: "none",
    minHeight:'100%',
    mr:2
}

const headerManagementTitle={display:'flex',flexDirection:'row',fontFamily:'ui-sans-serif, system-ui, sans-serif',my:3,justifyContent:'space-between',mx:1,alignItems:'center'}

const adminButtonContainer={ mt: 1, display: "flex", justifyContent: "flex-end",maxWidth: "100%" }

const titleManagementtxt={fontSize:'1.5rem',fontWeight: 700,fontFamily:'inherit'}

const addButton={
  textTransform: 'none',
  py:1,
  margin: '4px',
  backgroundColor: '#0F1629',
}


const GlobaladminFormContainer= {
  display: "flex",
  position: "fixed", 
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.84)",
  backdropFilter:'blur(5px)',
  justifyContent: "center",
  alignItems: "center",
  zIndex: 99,
}
const boxadminForm={backgroundColor:'#FFFFFF',borderRadius:2,p:'1.5rem',width:'30%',overflow: 'auto',position: 'relative',maxHeight:'90%',}

const formadminTitle={fontFamily:'inherit',fontWeight:'600',fontSize:'1.125rem',mb:2,maxWidth: "100%"}

export {formadminTitle,boxadminForm,GlobaladminFormContainer,adminDeleteButton,adminButtonContainer,adminModifyButton,headerManagementTitle,titleManagementtxt,addButton,adminAddButton,adminAnnulerButton}