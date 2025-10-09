import axios from "axios";

const api = axios.create({
    baseURL: "https://api.escuelajs.co/api/v1",
    timeout: 8000,
});


api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response) {
            console.error("API Error:", error.response.status, error.response.data);
        } else if (error.request) {
            console.error("Network Error: No response from server");
        } else {
            console.error("Error:", error.message);
        }
        return Promise.reject(error);
    }
);

export const getProducts = () => api.get("/products");

export const getCategories = () => api.get("/categories");

// export default api;
