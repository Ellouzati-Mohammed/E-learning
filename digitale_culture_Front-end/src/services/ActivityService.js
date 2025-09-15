import axios from "axios";
import { API_ENDPOINTS } from "../api/api";
import axiosInstance from "../api/axiosInstance";

   

const Activities_URL = API_ENDPOINTS.activities;
const getActivities = (coursId) => axiosInstance.get(`${Activities_URL}/${coursId}/course`);
const createActivity = (data) => axiosInstance.post(Activities_URL, data);
const updateActivity = (id, data) => axiosInstance.put(`${Activities_URL}/${id}`, data);
const deleteActivity = (id) => axiosInstance.delete(`${Activities_URL}/${id}`);

export {getActivities,createActivity,updateActivity,deleteActivity};