import { ActionContext } from 'vuex';
import { AuthStore } from '../models/AuthStore';
import { AuthFormData } from '../models/AuthFormData';

let timer: any;

export default {
  state: {
    userId: null,
    token: null,
    didAutoLogout: false,
  },
  mutations: {
    setUser(state: AuthStore, payload: any) {
      state.token = payload.token;
      state.userId = payload.userId;
      state.didAutoLogout = payload.didAutoLogout;
    },
    setAutoLogout(state: AuthStore) {
      state.didAutoLogout = true;
    },
  },
  actions: {
    async login(context: ActionContext<AuthStore, AuthStore>, payload: AuthFormData) {
      return context.dispatch('auth', {
        ...payload,
        mode: 'login',
      });
    },
    async signup(context: ActionContext<AuthStore, AuthStore>, payload: AuthFormData) {
      return context.dispatch('auth', {
        ...payload,
        mode: 'signup',
      });
    },

    async auth(context: ActionContext<AuthStore, AuthStore>, payload: AuthFormData) {
      const API_KEY = 'AIzaSyCwClQf_tZvKk51wU6AoTpqgfjEuJQ8gAk';
      const mode = payload.mode;
      let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

      if (mode === 'signup') {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
      }
      const userAuth = {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      };
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(userAuth),
      });

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to authenticate');
        throw error;
      }

      const expiresIn = +responseData.expiresIn * 1000;
      const expirationDate = new Date().getTime() + expiresIn;

      const userResponse = {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: expirationDate,
      };
      localStorage.setItem('user', JSON.stringify(userResponse));

      timer = setTimeout(() => {
        context.dispatch('autoLogout');
      }, expiresIn);

      context.commit('setUser', { ...userResponse, didAutoLogout: false });
    },
    tryLogin(context: ActionContext<AuthStore, AuthStore>) {
      const userJson = localStorage.getItem('user');
      if (!userJson) return;

      const user = JSON.parse(userJson);

      const expiresIn = +user.tokenExpiration - new Date().getTime();

      if (expiresIn < 10000) {
        return;
      }

      timer = setTimeout(() => {
        context.dispatch('autoLogout');
      }, expiresIn);

      if (user.token && user.userId) {
        context.commit('setUser', { ...user, didAutoLogout: false });
      }
    },
    logout(context: ActionContext<AuthStore, AuthStore>) {
      localStorage.removeItem('user');

      clearTimeout(timer);

      context.commit('setUser', {
        token: null,
        userId: null,
        didAutoLogout: false,
      });
    },
    autoLogout(context: ActionContext<AuthStore, AuthStore>) {
      context.dispatch('logout');
      context.commit('setAutoLogout');
    },
  },
  getters: {
    userId(state: AuthStore): string | null {
      return state.userId;
    },
    token(state: AuthStore): string | null {
      return state.token;
    },
    isAuthenticated(state: AuthStore): boolean {
      return !!state.token;
    },
    didAutoLogout(state: AuthStore): boolean {
      return state.didAutoLogout;
    },
  },
};
