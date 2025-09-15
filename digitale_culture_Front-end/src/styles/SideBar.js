const listItemStyle = {
  borderRadius: '8px',
  cursor:'pointer',
  mb: '4px',
  '&:hover': {
    backgroundColor: '#f8fafc',
    borderLeft: '3px solid #e2e8f0'
  },
  '&.Mui-selected': {
    backgroundColor: '#f1f5f9',
    borderLeft: '3px solid #6366f1',
    '&:hover': { backgroundColor: '#f1f5f9' }
  }
};

const iconStyle = { 
  fontSize: 20, 
  color: '#64748b' 
};

const primaryTextStyle = { 
  fontSize: 14, 
  fontWeight: 600,
  color: '#1e293b'
};

const nestedItemStyle = {
  borderRadius: '6px',
  mb: '2px',
  pl: '24px',
  color : '#1E293BD9',
  position: 'relative',
  '&:before': {
    content: '""',
    position: 'absolute',
    left: '12px',
    height: '60%',
    width: '2px',
    bgcolor: '#cbd5e1'
  }
};

const SideBarContainer={
  width: "18%",
  maxWidth:280,
  borderRight: '1px solid #f0f0f0',
  backgroundColor: 'white',
  padding: '24px 16px',
  overflowY: 'auto',
  m:3,
  borderRadius:'16px',
  boxShadow:'1px 1px 5px rgba(98, 98, 98, 0.1)'
}

const SideBarBoxTitle={ padding: '0 12px 24px 12px' }
const SideBarTitle={ 
  fontWeight: 700, 
  letterSpacing: '-0.5px',
  color: '#6366f1',
  mb:2,
}

const IconSideStyle={ minWidth: '36px' }
const FetchIcon={ color: '#94a3b8', fontSize: 20 }

const DomainList={ pl: 3 }

const ListItemMap={
  ...nestedItemStyle,
  '&:hover': {
    backgroundColor: '#f8fafc',
    borderLeft: '2px solid #e2e8f0'
  }
}
const listItemTextStyle = {
  primaryTypographyProps: {
    fontSize: 13.5,
    fontWeight: 500,
    color: '#475569',
  },
  sx: {
    pl: 2.5
  }
};



const DividerStyle={ my: 2, borderColor: '#f1f5f9' }



export { 
    listItemStyle, 
    iconStyle, 
    primaryTextStyle, 
    nestedItemStyle, 
    SideBarContainer, 
    SideBarBoxTitle, 
    SideBarTitle, 
    IconSideStyle, 
    FetchIcon, 
    DomainList, 
    ListItemMap, 
    listItemTextStyle, 
    DividerStyle 
  };
  