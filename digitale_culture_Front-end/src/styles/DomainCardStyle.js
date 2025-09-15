

const CardContainerStyle={
    backgroundColor: "white",
    borderRadius:2,
    overflow: 'hidden',
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer",
    boxShadow: 3,
    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: 6
    }
  }
  
  const HeaderSecCard= (domainImageUrl) => ({
    height: '200px',
    background: `url(${domainImageUrl}) center/cover`,
    position: 'relative',
  });
  const HeaderSecCardContainer={
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
    p: 3
  }
  
  const DomainTitle={ 
    fontWeight: 700, 
    color: 'white',
    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
  }
  
  const MainDomainCard={ p: 3 }
  const MainDomaineCardBox={ 
    display: 'flex', 
    alignItems: 'center', 
    mb: 2,
    gap: 1
  }
  
  const NbrCoursChip={ 
    backgroundColor: '#fff3e0',
    color: '#f59e0b',
    fontWeight: 600
  }
  const LevelCoursChip={ 
    backgroundColor: '#eef2ff',
    color: '#6366f1',
    fontWeight: 600
  }
  const DomainDecriptionCard={ 
    color: "#64748b", 
    height: "60px",
    overflow: "hidden",
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  }
  const AllDomainBox={ 
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "24px"
  }
  const LinkCardDomain={ textDecoration: "none" }
  

export { 
    CardContainerStyle, 
    HeaderSecCard, 
    HeaderSecCardContainer, 
    DomainTitle, 
    MainDomainCard, 
    MainDomaineCardBox, 
    NbrCoursChip, 
    LevelCoursChip, 
    DomainDecriptionCard, 
    AllDomainBox, 
    LinkCardDomain 
  };
  