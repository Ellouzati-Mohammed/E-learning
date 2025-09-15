export const RESOURCE_TYPES = {
    VIDEO: 'video',
    PDF: 'pdf',
    QUIZ: 'quiz'
  };
  
  export const INITIAL_ACTIVITIES_RESOURCE_STATE = {
    activity_type: RESOURCE_TYPES.VIDEO,
    video: { video_url: '' },
    pdf: { pdf_title: '', pdf_url: '' },
    quiz: { 
      question: '', 
      answers: Array(4).fill(''),  
    }
  };

  export const INITIAL_COURS_STATE = {
    id:null,
    cours_title: "",
    cours_description: "",
    duration: ""
  };
  
