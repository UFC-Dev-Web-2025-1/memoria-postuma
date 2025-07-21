
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
  register: async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!email || !password) {
          resolve({ success: false, message: "Email e senha são obrigatórios" });
          return;
        }

        if (password.length < 6) {
          resolve({ success: false, message: "Senha deve ter pelo menos 6 caracteres" });
          return;
        }

        const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        
        if (users.find((user: any) => user.email === email)) {
          resolve({ success: false, message: "Usuário já existe com este email" });
          return;
        }

        users.push({ email, password, registeredAt: new Date().toISOString() });
        localStorage.setItem('registeredUsers', JSON.stringify(users));

        resolve({ success: true, message: "Usuário registrado com sucesso!" });
      }, 1000); 
    });
  },

  login: async (email: string, password: string): Promise<{ success: boolean; message: string; user?: any }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!email || !password) {
          resolve({ success: false, message: "Email e senha são obrigatórios" });
          return;
        }

        const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const user = users.find((u: any) => u.email === email && u.password === password);

        if (!user) {
          resolve({ success: false, message: "Email ou senha incorretos" });
          return;
        }

        const sessionData = {
          email: user.email,
          loginTime: new Date().toISOString(),
          sessionId: Math.random().toString(36).substr(2, 9)
        };

        cookieUtils.setCookie('userSession', JSON.stringify(sessionData), 7);

        resolve({ success: true, message: "Login realizado com sucesso!", user: sessionData });
      }, 1000);
    });
  },

  loginWithGoogle: async (): Promise<{ success: boolean; message: string; user?: any }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const googleUser = {
          email: "usuario@gmail.com",
          name: "Usuário Google",
          loginTime: new Date().toISOString(),
          sessionId: Math.random().toString(36).substr(2, 9),
          provider: 'google'
        };

        cookieUtils.setCookie('userSession', JSON.stringify(googleUser), 7);

        resolve({ success: true, message: "Login com Google realizado com sucesso!", user: googleUser });
      }, 1500);
    });
  },

  logout: () => {
    cookieUtils.deleteCookie('userSession');
  }
};
