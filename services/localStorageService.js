class LocalService {
    static isBrowser() {
        return typeof window !== 'undefined'; // Vérifie si le code s'exécute côté client
    }

    static saveToken(token) {
        if (this.isBrowser()) {
            localStorage.setItem('access_token_ejob', token);
        }
    }

    static getToken() {
        if (this.isBrowser()) {
            return localStorage.getItem('access_token_ejob');
        }
        return null; // Retourne `null` si on est côté serveur
    }

    static saveUser(user) {
        if (this.isBrowser()) {
            localStorage.setItem('user', JSON.stringify(user));
        }
    }

    static getUser() {
        if (this.isBrowser()) {
            const user = localStorage.getItem('user');
            return user ? JSON.parse(user) : null;
        }
        return null; // Retourne `null` si on est côté serveur
    }

    static clear() {
        if (this.isBrowser()) {
            localStorage.clear();
        }
    }
}

export default LocalService;
