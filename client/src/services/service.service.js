import api from "./api";

const getAllServices = async () => {
    const response = await api.get("/services");
    return response.data;
};

const getServiceById = async (id) => {
    const response = await api.get(`/services/${id}`);
    return response.data;
};

const createService = async (serviceData) => {
    const response = await api.post("/services", serviceData);
    return response.data;
};

const updateService = async (id, serviceData) => {
    const response = await api.put(`/services/${id}`, serviceData);
    return response.data;
};

const deleteService = async (id) => {
    const response = await api.delete(`/services/${id}`);
    return response.data;
};

export {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService
};
