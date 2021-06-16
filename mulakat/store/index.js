import Vuex from "vuex";
import addCustomer from "./addCustomer";

const createStore = () => {
  return new Vuex.Store({
    modules: {
      addCustomer,
    }
  });
};

export default createStore;
