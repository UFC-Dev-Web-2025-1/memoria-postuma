import axios from 'axios';
import { API_URL } from './texts';

export const cookieUtils = {
  setCookie: (name: string, value: string, days: number = 7) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  },

  getCookie: (name: string): string | null => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },

  deleteCookie: (name: string) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  },

  isLoggedIn: (): boolean => {
    return cookieUtils.getCookie('userSession') !== null;
  },

  getUserData: () => {
    const userData = cookieUtils.getCookie('userSession');
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch {
        return null;
      }
    }
    return null;
  }
};

export const authService = {
  async register(username: string, email: string, password: string) {
    try {
      const res = await axios.post(`${API_URL}/api/auth/local/register`, {
        username,
        email,
        password
      });

      if (res.data && res.data.user) {
        return { success: true, message: "Usuário registrado com sucesso!" };
      } else {
        return { success: false, message: "Erro inesperado ao registrar." };
      }
    } catch (error: any) {
      const message = error.response?.data?.error?.message || "Erro ao registrar usuário.";
      return { success: false, message };
    }
  },

  async login(identifier: string, password: string) {
    try {
      const res = await axios.post(`${API_URL}/api/auth/local`, {
        identifier,
        password
      });

      const { jwt, user } = res.data;

      // salvar no localStorage
      localStorage.setItem('token', jwt);
      localStorage.setItem('user', JSON.stringify(user));

      return { success: true, message: 'Login realizado com sucesso!', user };
    } catch (error: any) {
      const message = error.response?.data?.error?.message || 'Erro ao fazer login.';
      return { success: false, message };
    }
  },

  async loginWithGoogle(): Promise<{ success: boolean; message: string }> {
    try {
      const googleAuthUrl = `${API_URL}/api/connect/google`;
      const width = 500;
      const height = 600;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;

      const authWindow = window.open(
        googleAuthUrl,
        'Google Login',
        `width=${width},height=${height},left=${left},top=${top}`
      );

      return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
          try {
            const url = authWindow?.location.href;

            if (url && url.includes('access_token')) {
              // Fechar popup
              authWindow?.close();
              clearInterval(interval);
              resolve({ success: true, message: 'Login com Google realizado com sucesso!' });
            }
          } catch (err) {
            // Ignorado devido ao CORS até redirecionar
          }

          if (authWindow?.closed) {
            clearInterval(interval);
            resolve({ success: false, message: 'Login cancelado.' });
          }
        }, 1000);
      });
    } catch (err) {
      console.error('Erro no login com Google:', err);
      return { success: false, message: 'Erro ao autenticar com o Google' };
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  
};