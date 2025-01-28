import apiService from './apiService';
// import LocalService from './localStorageService';

// Service pour les utilisateurs
class JobOfferService {
    static baseURL = '/job-offer';

    static async getJobOfferAvailable(items) {
        try {
            const queryString = items ? `${this.baseURL}?${new URLSearchParams(items).toString()}`: this.baseURL
            const response = await apiService.get(queryString);
            return response.data;
        } catch (error) {
            throw error; // Laisser l'erreur remonter
        }
    }

    static async createJob({title, description, location, contractType, salaryRange, skills, onShore}) {
            try {
                const response = await apiService.post(this.baseURL, {title, description, location, contractType, salaryRange, skills, onShore});
                return response.data;
            } catch (error) {
                throw error; // Laisser l'erreur remonter
            }
        }

    static async getDetailsJob({_id, authenticate, overview}) {
        try {
            const authUrl = authenticate ? '/authenticate' : ''
            const response = await apiService.get(`${this.baseURL}/${_id}${authUrl}?overview=${overview}`);
            return response.data;
        } catch (error) {
            throw error; // Laisser l'erreur remonter
        }
    }

    static async getMyJob() {
        try {
            const response = await apiService.get(`${this.baseURL}/myJobs`);
            return response.data;
        } catch (error) {
            throw error; // Laisser l'erreur remonter
        }
    }

    static async getAllDomaine() {
        try {
            const response = await apiService.get(`${this.baseURL}/domaine`);
            return response.data;
        } catch (error) {
            throw error; // Laisser l'erreur remonter
        }
    }

    static async getAllCertifications() {
        try {
            const response = await apiService.get(`${this.baseURL}/certification`);
            return response.data;
        } catch (error) {
            throw error; // Laisser l'erreur remonter
        }
    }
}

export default JobOfferService;
