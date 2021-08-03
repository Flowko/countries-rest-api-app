<template>
  <div class="countries">
    <h3 class="countries-count">{{ countries.length }} Countries</h3>
    <div class="country-items">
      <div
        class="country-item"
        v-for="(country, index) in paginatedCountries"
        v-bind:key="index"
        @click="openCountry(country.alpha3Code)"
      >
        <img
          :src="country.flag"
          class="country-img"
          :alt="country.name + '-flag'"
        />
        <div class="country-details">
          <h2>{{ country.name }}</h2>
          <p><strong>Population:</strong> {{ numberWithCommas(country.population) }}</p>
          <p><strong>Region:</strong> {{ country.region }}</p>
          <p><strong>Capital:</strong> {{ country.capital }}</p>
        </div>
      </div>
    </div>
    <button
      @click="loadMore"
      class="loadMoreBtn"
      v-if="currentPage * maxPerPage < countries.length"
    >
      load more
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      maxPerPage: 12,
      showReadMore: true,
    };
  },
  created() {},
  computed: {
    countries() {
      return this.$store.state.countries;
    },
    loading() {
      return this.$store.state.isloading;
    },
    totalResults() {
      return Object.keys(this.countries).length;
    },
    pageCount() {
      return Math.ceil(this.totalResults / this.maxPerPage);
    },
    pageOffest() {
      return this.maxPerPage * this.currentPage;
    },
    paginatedCountries() {
      return this.countries.slice(0, this.currentPage * this.maxPerPage);
    },
  },
  methods: {
    loadMore() {
      this.currentPage += 1;
    },
    openCountry(id){
      this.$router.push(`/country/${id}`);
    },
    numberWithCommas(x) {
      if(x)
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  mounted() {
    this.$store.dispatch("getCountries");
  },
};
</script>

<style lang="scss" scoped>
.countries {
  display: flex;
  flex-direction: column;
  .countries-count {
    color: var(--app-text-color);
  }

  .loadMoreBtn {
    width: 400px;
    padding: 20px;
    align-self: center;
    font-size: 16px;
    font-family: "Nunito Sans", sans-serif;
    font-weight: 600;
    cursor: pointer;
    background-color: var(--app-elements-background-color);
    color: var(--app-text-color);
    border: none;
    border-radius: 4px;
    box-shadow: 1px 1px 14px 2px #0000000f;
    text-transform: uppercase;
  }
  .country-items {
    margin: 40px 0;
    display: grid;
    align-items: center;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    grid-gap: 3rem;

    .country-item {
      cursor: pointer;
      background: var(--app-elements-background-color);
      margin: 10px 0 0 2%;
      border-radius: 6px;
      overflow: hidden;
      width: 100%;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(2, 300px);
      box-shadow: 1px 1px 14px 2px #0000000f;
      height: 100%;

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
  }
}
</style>