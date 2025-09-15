import axios from "axios";
import { API_ENDPOINTS } from "../api/api";
import axiosInstance from "../api/axiosInstance";

   
const DomainCours_URL = API_ENDPOINTS.courses;
const getDomainCourses = (domainId) => axiosInstance.get(`${DomainCours_URL}/${domainId}/domain`);
const createDomainCourse = (data) => axiosInstance.post(DomainCours_URL, data);
const updateDomainCourse = (id, data) => axiosInstance.put(`${DomainCours_URL}/${id}`, data);
const deleteDomainCourse = (id) => axiosInstance.delete(`${DomainCours_URL}/${id}`);

  export {getDomainCourses,createDomainCourse,updateDomainCourse,deleteDomainCourse};