
const SelectedDomainContainer={
  px:'32px',py:'24px',display:'flex',flexDirection:'column',backgroundColor:'#FFFFFF',boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",position: "relative",zIndex: 1,borderRadius:3
}
const SelectedDomainchildrenContainer={mb:'17px'}
const SelectedDomainLevel={border:'none',color:'#1E40AF',backgroundColor:'#63B3ED',fontWeight:'500',py:'0px',pb:'2px',px:'4px',fontSize: '.875rem',fontFamily: 'inherit'}
const SelectedDomainnbrCours={ color: '#64748B',pl:2,fontSize:'16px',fontFamily: 'inherit' }
const SelectedDomainTitle={fontWeight: '700',fontFamily: 'inherit',fontSize: '1.875rem'}
const SelectedDomainDescription={color:'rgb(75,85,99)',fontFamily:'inherit'}
const SelectedDomainGlobalInfoContainer={display:'flex',flexDirection:'row',color:'#64748B'}
const SelectedDomainGlobalInfoItem={mr:3}
const SelectedDomainGlobalInfoText={ display: "flex", alignItems: "center",fontSize:'0.9rem',fontFamily:'inherit' }
const CoursboxStyle = {
  padding: '1rem',
  border: '1px solid rgb(229,231,235)',
  color: '#64748B',
  backgroundColor:  '#FFFFFF',
  borderRadius: 3,
  display: 'flex',
  flexDirection: 'column',

  marginBottom: '1rem',
  cursor: 'pointer',
  transition: 'all 0.2s',
  '&:hover': {
    boxShadow: '0px 2px 10px rgba(86, 86, 86, 0.14)',
    '& h3': {
      color: '#8B5CF6'
    }
  }
};

const CoursContainer ={display:'flex',flexDirection:'column',pl:2,flexGrow: 1}
const CoursTime={fontSize:'17px',display:'flex',flexDirection:'row',justifyContent:'space-between',mb:1}
const CoursTimeTxt={fontFamily: 'inherit'}
const CoursTiltleTxt={fontFamily: 'inherit',fontSize:' 1.125rem',fontWeight:'500',mb:1}
const CoursSubTiltleTxt={fontFamily: 'inherit',fontSize:'.875rem'}
const TaskIcon={fontSize:'27px',color:'#22C55E'}
const RadioBut={fontSize:'27px'}


const CoursDomainContainer={
  display:'flex',
  flex: 1,
  height: '100%',
  p: 0,
  overflow: 'auto',
  py:3,
}


const CoursDomainSecContainer={width:'100%',display:'flex',flexDirection:'column',fontFamily:'ui-sans-serif, system-ui, sans-serif'}
const AllCoursContainer={py:'32px',display:'flex',flexDirection:'column',backgroundColor:'#F9FAFB',flexGrow: 1}
const AllCoursSecContainer={backgroundColor:'#FFFFFF',p:'24px',display:'flex',flexDirection:'column',borderRadius:3,boxShadow: "0px 1px 3px rgba(86, 86, 86, 0.1)",}
const HeaderTitle={fontWeight: '600',fontFamily: 'inherit',fontSize: '1.25rem',mb:'24px'}

export {CoursboxStyle,CoursContainer,CoursTime,CoursTimeTxt,CoursTiltleTxt,CoursSubTiltleTxt,
  TaskIcon,RadioBut,CoursDomainContainer,SelectedDomainContainer,SelectedDomainGlobalInfoText,SelectedDomainGlobalInfoItem,
  SelectedDomainchildrenContainer,SelectedDomainLevel,SelectedDomainnbrCours,SelectedDomainTitle,SelectedDomainDescription,
  SelectedDomainGlobalInfoContainer,CoursDomainSecContainer,AllCoursContainer,AllCoursSecContainer,HeaderTitle
}