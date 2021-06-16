<template>
  <b-container>
    <div>
      <b-button @click="addmusteri">Ekle</b-button>
      <b-form-input tpye="number" v-model="musteriAdet"> </b-form-input>
      <b-form-input tpye="number" v-model="sepetAdet"> </b-form-input>

      <b-button class="mt-5" @click="SehirBazliAnalizYap">SehirBazliAnalizYap</b-button>
    </div>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      musteriAdet: 0,
      sepetAdet: 0
    };
  },
  methods: {
    addmusteri() {
      this.$store.dispatch("addMusteri", {
        musteriAdet: this.musteriAdet,
        sepetAdet: this.sepetAdet
      });
    },
    SehirBazliAnalizYap() {
      this.$store.dispatch("SehirBazliAnalizYap");
    }
  }
};
</script>

<style>
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 30px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
