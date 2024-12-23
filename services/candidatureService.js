import apiService from './apiService';

// Service pour les utilisateurs
class CandidatureService {
    static baseURL = '/candidature';

    static async createCandidature({jobOffer}) {
        try {
            const response = await apiService.post(this.baseURL, {jobOffer});
            return response.data;
        } catch (error) {
            throw error; // Laisser l'erreur remonter
        }
    }

    static async validateCandidature({candidatureId, status}) {
        try {
            const response = await apiService.put(this.baseURL, {candidatureId, status});
            return response.data;
        } catch (error) {
            throw error; // Laisser l'erreur remonter
        }
    }
}

export default CandidatureService;
