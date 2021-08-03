<template>
  <div
    class="country-item"
    v-for="(country, index) in countries"
    v-bind:key="index"
  >
    <img
      :src="country.flag"
      class="country-img"
      :alt="country.name + '-flag'"
    />
    <div class="country-details">
      <h2>{{ country.name }}</h2>
      <p><strong>Population:</strong> {{ country.population }}</p>
      <p><strong>Region:</strong> {{ country.region }}</p>
      <p><strong>Capital:</strong> {{ country.capital }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {
    countries() {
      return this.$store.state.countries;
    },
    loading() {
      return this.$store.state.isloading;
    },
  },
  mounted() {
    this.$store.dispatch("getCountries");
  },
};
</script>

<style lang="scss" scoped>
.country-item {
  background: var(--app-elements-background-color);
  margin: 10px 0 0 2%;
  border-radius: 6px;
  overflow: hidden;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 300px);
  box-shadow: 1px 1px 14px 2px #0000000f;

  .country-img {
    width: 100%;
    max-width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .country-details {
    padding: 20px;
    color: var(--app-text-color);

    h2 {
      font-size: 18px;
    }

    p {
      font-size: 15px;
    }

    strong {
      font-weight: 600;
    }
  }
}
</style>