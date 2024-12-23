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

    static async createJob({title, description, location, contractType, salaryRange, skills}) {
            try {
                const response = await apiService.post(this.baseURL, {title, description, location, contractType, salaryRange, skills});
                return response.data;
            } catch (error) {
                throw error; // Laisser l'erreur remonter
            }
        }

    static async getDetailsJob({_id, authenticate}) {
        try {
            const authUrl = authenticate ? '/authenticate' : ''
            const response = await apiService.get(`${this.baseURL}/${_id}${authUrl}`);
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
}

export default JobOfferService;
