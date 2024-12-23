import axios from 'axios';
import LocalService from './localStorageService';
class ApiService {
    constructor(baseURL) {
        this.api = axios.create({
            baseURL: baseURL || 'https://api.icmemployment.net/api/v1',
            timeout: 10000, // Temps limite des requêtes
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Ajouter des intercepteurs pour gérer les erreurs globales
        this.api.interceptors.response.use(
            (response) => response, // Succès
            (error) => {
                console.error('Erreur API:', error.response || error.message);
                return Promise.reject(error);
            }
        );
    }

    // Charger dynamiquement les headers
    setAuthorizationHeader() {
        const token = LocalService.getToken();
        if (token) {
            this.api.defaults.headers.common['Authorization'] = token;
        } else {
            delete this.api.defaults.headers.common['Authorization'];
        }
    }

    // Méthode GET
    async get(endpoint, params = {}) {
        this.setAuthorizationHeader();
        return this.api.get(endpoint, { params });
    }

    // Méthode POST
    async post(endpoint, data = {}) {
        this.setAuthorizationHeader();
        return this.api.post(endpoint, data);
    }

    // Méthode PUT
    async put(endpoint, data = {}) {
        this.setAuthorizationHeader();
        return this.api.put(endpoint, data);
    }

    // Méthode DELETE
    async delete(endpoint) {
        this.setAuthorizationHeader();
        return this.api.delete(endpoint);
    }
}

export default new ApiService('https://api.icmemployment.net/api/v1');
