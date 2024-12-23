import apiService from './apiService';

// Service pour les utilisateurs
class CompanyService {
    static baseURL = '/company';

    static async createCompany({name, logo, website, industry, logoName, location}) {
        try {
            const response = await apiService.post(this.baseURL, {name, logo, website, industry, logoName, location});
            return response.data;
        } catch (error) {
            throw error; // Laisser l'erreur remonter
        }
    }
}

export default CompanyService;
