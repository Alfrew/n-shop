import { ActionContext } from "vuex";
import { GameProductStore } from "../models/GameProductStore";
import { GameProduct } from "../models/GameProduct";
import { GameProductFormData } from "../models/GameProductFormData";

export default {
  namespaced: true,
  state: {
    lastFetch: null,
    gameProductList: [],
  },
  mutations: {
    setGameProductList(state: GameProductStore, payload: GameProduct[]) {
      state.gameProductList = payload;
    },
    setFetchTimestamp(state: GameProductStore) {
      state.lastFetch = new Date().getTime();
    },
  },
  actions: {
    async saveGameProduct(context: ActionContext<GameProductStore, GameProductStore>, payload: GameProductFormData) {
      const token = context.rootGetters.token;
      let requestUrl = `https://n-shop-b6c92-default-rtdb.europe-west1.firebasedatabase.app/gameProductList.json?auth=${token}`;
      let requestMethod = "POST";

      if (payload.id) {
        requestUrl = `https://n-shop-b6c92-default-rtdb.europe-west1.firebasedatabase.app/gameProductList/${payload.id}.json?auth=${token}`;
        requestMethod = "PUT";
      }

      const response = await fetch(requestUrl, {
        method: requestMethod,
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (!response.ok) {
        //... error
      }

      console.log(responseData);
    },

    async deleteGameProduct(context: ActionContext<GameProductStore, GameProductStore>, payload: string) {
      const token = context.rootGetters.token;
      const requestUrl = `https://n-shop-b6c92-default-rtdb.europe-west1.firebasedatabase.app/gameProductList/${payload}.json?auth=${token}`;
      const requestMethod = "DELETE";

      const response = await fetch(requestUrl, {
        method: requestMethod,
      });

      const responseData = await response.json();

      if (!response.ok) {
        //... error
      }

      console.log(responseData);
    },

    async loadGameProductList(context: ActionContext<GameProductStore, GameProductStore>, payload: any) {
      const shouldNotUpdate = !payload.forceRefresh && !context.getters.shouldUpdate;
      if (shouldNotUpdate) return;

      const response = await fetch(`https://n-shop-b6c92-default-rtdb.europe-west1.firebasedatabase.app/gameProductList.json`);
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message || "Failed to fetch, try again later!");
        throw error;
      }

      const gameProductList = [];

      for (const key in responseData) {
        const gameProduct: GameProduct = {
          id: key,
          coverUrl: responseData[key].coverUrl,
          description: responseData[key].description,
          imageUrl: responseData[key].imageUrl,
          name: responseData[key].name,
          price: responseData[key].price,
          type: responseData[key].type,
          inStock: responseData[key].inStock ?? null,
        };

        gameProductList.push(gameProduct);
      }

      context.commit("setGameProductList", gameProductList);
      context.commit("setFetchTimestamp");
    },
  },
  getters: {
    gameProductList(state: GameProductStore) {
      return state.gameProductList;
    },
    gameProductById: (state: GameProductStore) => (productId: string) => {
      return state.gameProductList.find((product) => product.id == productId);
    },
    shouldUpdate(state: GameProductStore) {
      const lastFetch = state.lastFetch;
      if (!lastFetch) {
        return true;
      }
      const currentTimeStamp = new Date().getTime();
      const isMoreThanFiveMinutesAgo = (currentTimeStamp - lastFetch) / 1000 > 60 * 5;
      return isMoreThanFiveMinutesAgo;
    },
  },
};
