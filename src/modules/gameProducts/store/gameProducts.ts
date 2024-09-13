import { ActionContext } from "vuex";
import { collection, deleteDoc, doc, DocumentData, getDocs, limit, orderBy, query, QueryConstraint, setDoc, where } from "firebase/firestore";
import { db } from "@/firestore";

import { GameProductStore } from "../models/GameProductStore";
import { GameProduct } from "../models/GameProduct";
import { GameProductFormData } from "../models/GameProductFormData";
import { GameProductFilters } from "../models/GameProductFilters";

const collectionName = "gameProductList";

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
    pushGameProducts(state: GameProductStore, payload: GameProduct[]) {
      state.gameProductList.push(...payload);
    },
    setFetchTimestamp(state: GameProductStore) {
      state.lastFetch = new Date().getTime();
    },
  },
  actions: {
    async saveGameProduct(context: ActionContext<GameProductStore, GameProductStore>, payload: GameProductFormData) {
      if (payload.id) {
        const elementRef = doc(db, collectionName, payload.id);
        await setDoc(elementRef, payload);
      } else {
        const newElementRef = doc(collection(db, collectionName));
        await setDoc(newElementRef, payload);
      }
    },

    async deleteGameProduct(context: ActionContext<GameProductStore, GameProductStore>, payload: string) {
      const elementRef = doc(db, collectionName, payload);
      await deleteDoc(elementRef);
    },

    async loadGameProductList(context: ActionContext<GameProductStore, GameProductStore>, payload: GameProductFilters) {
      const shouldNotUpdate = !payload.forceRefresh && !context.getters.shouldUpdate;
      if (shouldNotUpdate) return;

      const queryOptions: QueryConstraint[] = generateQueryOptions(payload);

      const q = query(collection(db, collectionName), ...queryOptions);

      const gameProductList: GameProduct[] = [];

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc: DocumentData) => {
        gameProductList.push({ id: doc.id, ...doc.data() });
      });

      context.commit("setGameProductList", gameProductList);
      context.commit("setFetchTimestamp");
    },

    async loadMoreProducts(context: ActionContext<GameProductStore, GameProductStore>, payload: GameProductFilters) {
      if (!payload.take || !payload.skip) {
        throw "Can't load more elements";
      }

      const queryOptions: QueryConstraint[] = generateQueryOptions(payload);

      const q = query(collection(db, collectionName), ...queryOptions);

      const gameProductList: GameProduct[] = [];

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc: DocumentData) => {
        gameProductList.push({ id: doc.id, ...doc.data() });
      });

      const newLoaded = gameProductList.splice(payload.skip, payload.take);

      context.commit("pushGameProducts", newLoaded);
      context.commit("setFetchTimestamp");
    },

    /**
     * Firebase realtime db save request for gameProduct
     * @deprecated Moved on firestore db, use saveGameProduct instead
     */
    async uploadGameProduct(context: ActionContext<GameProductStore, GameProductStore>, payload: GameProductFormData) {
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

    /**
     * Firebase realtime db delete request for gameProduct
     * @deprecated Moved on firestore db, use deleteGameProduct instead
     */
    async removeGameProduct(context: ActionContext<GameProductStore, GameProductStore>, payload: string) {
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

    /**
     * Firebase realtime db get request for all gameProducts
     * @deprecated Moved on firestore db, use loadGameProductList instead
     */
    async loadGameProducts(context: ActionContext<GameProductStore, GameProductStore>, payload: any) {
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
          coverUrl: responseData[key].coverUrl,
          description: responseData[key].description,
          id: key,
          imageUrl: responseData[key].imageUrl,
          inStock: responseData[key].inStock ?? null,
          name: responseData[key].name,
          price: responseData[key].price,
          releaseDate: responseData[key].releaseDate,
          type: responseData[key].type,
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

function generateQueryOptions(filters: GameProductFilters) {
  const queryOptions: QueryConstraint[] = [];
  // Base Filters
  if (filters.take) {
    queryOptions.push(limit(filters.take));
  }
  if (filters.orderProperty) {
    queryOptions.push(orderBy(filters.orderProperty, filters.orderDirection ?? "asc"));
  }

  // Custom Filters
  if (filters.types) {
    queryOptions.push(where("type", "in", filters.types));
  }
  if (filters.minPrice) {
    queryOptions.push(where("price", ">=", filters.minPrice));
  }
  if (filters.maxPrice) {
    queryOptions.push(where("price", "<=", filters.maxPrice));
  }

  return queryOptions;
}
