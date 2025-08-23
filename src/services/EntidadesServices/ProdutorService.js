import api from "../api";

export const ProdutorService = {
    update: (id) => api.put(`/produtores/${id}`),
    delete: (id) => api.delete(`/produtores/${id}`)
}