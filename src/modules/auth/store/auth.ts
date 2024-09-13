import { ActionContext } from "vuex";
import { AuthStore } from "../models/AuthStore";
import { AuthFormData } from "../models/AuthFormData";
import router from "@/router";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/firestore";

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
      return context.dispatch("auth", {
        ...payload,
        mode: "login",
      });
    },
    async signup(context: ActionContext<AuthStore, AuthStore>, payload: AuthFormData) {
      return context.dispatch("auth", {
        ...payload,
        mode: "signup",
      });
    },

    async auth(context: ActionContext<AuthStore, AuthStore>, payload: AuthFormData) {
      await signInWithEmailAndPassword(auth, payload.email, payload.password)
        .then((useCredential: any) => {
          const expiresIn = +useCredential._tokenResponse.expiresIn * 1000;
          const expirationDate = new Date().getTime() + expiresIn;

          const userResponse = {
            token: useCredential._tokenResponse.idToken,
            userId: useCredential._tokenResponse.localId,
            tokenExpiration: expirationDate,
          };
          localStorage.setItem("user", JSON.stringify(userResponse));

          timer = setTimeout(() => {
            context.dispatch("autoLogout");
          }, expiresIn);

          context.commit("setUser", { ...userResponse, didAutoLogout: false });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = new Error(error.message || "Failed to authenticate");
          throw errorMessage;
        });
    },

    logout(context: ActionContext<AuthStore, AuthStore>) {
      signOut(auth)
        .then(() => {
          localStorage.removeItem("user");

          clearTimeout(timer);

          context.commit("setUser", {
            token: null,
            userId: null,
            didAutoLogout: false,
          });

          router.push({ name: "userAuth" });
        })
        .catch((error) => {
          // An error happened.
        });
    },

    tryLogin(context: ActionContext<AuthStore, AuthStore>) {
      const userJson = localStorage.getItem("user");
      if (!userJson) return;

      const user = JSON.parse(userJson);

      const expiresIn = +user.tokenExpiration - new Date().getTime();

      if (expiresIn < 10000) {
        return;
      }

      timer = setTimeout(() => {
        context.dispatch("autoLogout");
      }, expiresIn);

      if (user.token && user.userId) {
        context.commit("setUser", { ...user, didAutoLogout: false });
      }
    },

    autoLogout(context: ActionContext<AuthStore, AuthStore>) {
      context.dispatch("logout");
      context.commit("setAutoLogout");
    },

    /**
     * Firebase realtime db to signin
     * @deprecated Moved on firestore db, use auth instead
     */
    async authOLD(context: ActionContext<AuthStore, AuthStore>, payload: AuthFormData) {
      const API_KEY = "AIzaSyCwClQf_tZvKk51wU6AoTpqgfjEuJQ8gAk";
      const mode = payload.mode;
      let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

      if (mode === "signup") {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
      }
      const userAuth = {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      };
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(userAuth),
      });

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message || "Failed to authenticate");
        throw error;
      }

      const expiresIn = +responseData.expiresIn * 1000;
      const expirationDate = new Date().getTime() + expiresIn;

      const userResponse = {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: expirationDate,
      };
      localStorage.setItem("user", JSON.stringify(userResponse));

      timer = setTimeout(() => {
        context.dispatch("autoLogout");
      }, expiresIn);

      context.commit("setUser", { ...userResponse, didAutoLogout: false });
    },
    /**
     * Firebase realtime db to logout
     * @deprecated Moved on firestore db, use logout instead
     */
    logoutOLD(context: ActionContext<AuthStore, AuthStore>) {
      localStorage.removeItem("user");

      clearTimeout(timer);

      context.commit("setUser", {
        token: null,
        userId: null,
        didAutoLogout: false,
      });

      router.push({ name: "userAuth" });
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
