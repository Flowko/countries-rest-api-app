<template>
  <div class="container">
    <button @click="goBack()" class="backBtn">
      <i class="fas fa-angle-left icon"></i>
      Back
    </button>
    <div class="row country-details">
      <div class="column flag-img">
        <img :src="country.flag" :alt="country.name + '-flag'" />
      </div>
      <div class="column country-info">
        <h2>{{ country.name }}</h2>
        <div class="row">
          <div class="column">
            <p><strong>Native Name:</strong> {{ country.nativeName }}</p>
            <p><strong>Population:</strong> {{ numberWithCommas(country.population) }}</p>
            <p><strong>Region:</strong> {{ country.region }}</p>
            <p><strong>Sub Region:</strong> {{ country.subregion }}</p>
            <p><strong>Capital:</strong> {{ country.capital }}</p>
          </div>
          <div class="column">
            <p>
              <strong>Top Level Domain:</strong>
              {{
                country.topLevelDomain && country.topLevelDomain.length > 0
                  ? country.topLevelDomain[0]
                  : ""
              }}
            </p>
            <p>
              <strong>Currencies:</strong>
              {{
                country.currencies && country.currencies.length > 0
                  ? country.currencies.map((cur) => cur.name).join(",")
                  : ""
              }}
            </p>
            <p>
              <strong>Languages:</strong>
              {{
                country.languages && country.languages.length > 0
                  ? country.languages.map((lang) => lang.name).join(",")
                  : ""
              }}
            </p>
          </div>
        </div>
        <div
          v-if="country.borders && country.borders.length > 0"
          class="border-countries"
        >
          <strong> Border Countries: </strong>

          <a
            v-for="(border, index) in borders"
            v-bind:key="index"
            class="country-border"
          >
            {{ border }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    country() {
      return this.$store.state.country;
    },
    borders() {
      return this.$store.state.borders;
    },
  },
  methods: {
    goBack() {
      this.$router.push(`/`);
    },
    numberWithCommas(x) {
      if(x)
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  mounted() {
    this.$store.dispatch("getCountrybyCode", {
      code: this.$route.params.country,
    });
    // setTimeout(() => {
    //   this.$store.dispatch("getCountryName", {
    //     borders: this.country.borders,
    //   });
    // }, 500);
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.backBtn {
  margin: 40px 50px;
  padding: 10px 40px;
  color: var(--app-text-color);
  background-color: var(--app-elements-background-color);
  border: 0;
  border-radius: 4px;
  box-shadow: 1px 1px 14px 2px #0000000f;
  cursor: pointer;
  font-size: 16px;
  font-family: "Nunito Sans", sans-serif;
  font-weight: 600;

  @media (max-width: 768px) {
    margin: 40px 0px;
  }

  .icon {
    margin-right: 10px;
  }
}
.row {
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: start;
  }
  .column {
    flex: 50%;

    @media (max-width: 768px) {
      flex: 100%;
    }
  }
}
.country-details {
  .flag-img {
    padding: 20px 50px;
    @media (max-width: 768px) {
      padding: 20px 0;
    }
    img {
      width: 100%;
    }
  }

  .country-info {
    color: var(--app-text-color);
    padding: 20px 50px;
    @media (max-width: 768px) {
      padding: 20px 0;
    }

    h2 {
      font-size: 24px;
    }

    p {
      font-size: 15px;
    }

    strong {
      font-weight: 600;
    }

    .border-countries {
      .country-border {
        margin: 5px 10px 5px 5px;
        background-color: var(--app-elements-background-color);
        color: var(--app-text-color);
        padding: 2px 25px;
        border-radius: 2px;
        box-shadow: 1px 1px 14px 2px #0000000f;
        display: inline-block;
      }
    }
  }
}
</style>