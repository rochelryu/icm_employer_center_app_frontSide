import apiService from './apiService';
import LocalService from './localStorageService';

// Service pour les utilisateurs
class UserService {
    static baseURL = '/user';

    static async getInfoUser() {
        try {
            const response = await apiService.get(this.baseURL);
            const {data} = response;
            if(data.etat) {
                const {access_token, company, candidatures, jobs, trainings, ...rest} = data.result.client;
                LocalService.saveToken(access_token)
                LocalService.saveUser(rest)
            }
            return data;
        } catch (error) {
            throw error; // Laisser l'erreur remonter
        }
    }

    static async updateUser(items) {
        try {
            const response = await apiService.put(this.baseURL, items);
            const {data} = response;
            if(data.etat) {
                const {access_token, company, ...rest} = data.result.client;
                LocalService.saveToken(access_token)
                LocalService.saveUser(rest)
            }
            return data;
        } catch (error) {
            throw error; // Laisser l'erreur remonter
        }
    }

    static async signup({email, password, fullName, phoneNumber, role, logo, logoName}) {
        try {
            const response = await apiService.post(`${this.baseURL}/signup`, {email, password, fullName, phoneNumber, role, logo, logoName});
            const {data} = response;
            if(data.etat) {
                const {access_token, company, ...rest} = data.result.client;
                LocalService.saveToken(access_token)
                LocalService.saveUser(rest)
            }
            return data;
        } catch (error) {
            throw error; // Laisser l'erreur remonter
        }
    }

    static async signin({email, password}) {
        try {
            const response = await apiService.post(`${this.baseURL}/signin`, {email, password});
            const {data} = response;
            if(data.etat) {
                const {access_token, ...rest} = data.result.client;
                LocalService.saveToken(access_token)
                LocalService.saveUser(rest)
            }
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async addVisite() {
        try {
            const response = await apiService.get(`${this.baseURL}/visite`);
            const {data} = response;
    
            return data;
        } catch (error) {
            throw error; // Laisser l'erreur remonter
        }
    }
}

export default UserService;
