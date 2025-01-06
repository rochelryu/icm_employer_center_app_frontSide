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

    static async signup({email, password, fullName, phoneNumber, role}) {
        try {
            const response = await apiService.post(`${this.baseURL}/signup`, {email, password, fullName, phoneNumber, role});
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
}

export default UserService;
