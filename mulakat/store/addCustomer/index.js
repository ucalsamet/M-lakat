export default {
  state: {},
  mutations: {},
  actions: {
    addMusteri(vuexContext, data) {
      this.$axios.post("/text-verisi-olustur", data).then(response => {});
    },
    SehirBazliAnalizYap(vuexContext) {
      this.$axios.post("/sehir-bazli-analiz-yap").then(response => {
        console.log(response);
      });
    }
  },
  getters: {}
};
