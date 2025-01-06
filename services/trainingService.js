import apiService from './apiService';
// import LocalService from './localStorageService';

// Service pour les utilisateurs
class TrainingService {
    static baseURL = '/training';

    static async getTrainings(items) {
        try {
            const queryString = items ? `${this.baseURL}?${new URLSearchParams(items).toString()}`: this.baseURL
            const response = await apiService.get(queryString);
            return response.data;
        } catch (error) {
            throw error; // Laisser l'erreur remonter
        }
    }

    static async createParticipation({trainingId}) {
            try {
                const response = await apiService.put(this.baseURL, {trainingId});
                return response.data;
            } catch (error) {
                throw error; // Laisser l'erreur remonter
            }
        }

    static async getDetailsTraining({_id}) {
        try {
            const response = await apiService.get(`${this.baseURL}/${_id}`);
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

export default TrainingService;
