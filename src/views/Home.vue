<template>
  <div class="container">
    <div class="searchSection">
      <div class="customInput">
        <i class="fas fa-search icon"></i>
        <input type="text" placeholder="Search for a country..." />
      </div>
      <div class="customSelect" :class="selectOpen ? 'open' : ''">
        <div class="selectedValue" @click="selectOpen = !selectOpen">
          <span class="selectedText">
            {{ selectedRegion ? selectedRegion : "Filter by Region" }}
          </span>
          <i class="fas fa-angle-down icon"></i>
        </div>
        <div class="select-dropdown">
          <span
            v-for="(region, index) in regions"
            v-bind:key="index"
            class="select-dropdown-item"
            @click="setRegion(region.id)"
          >
            {{ region.text }}
          </span>
        </div>
      </div>
    </div>
    <div class="country-items">
      <country-item></country-item>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.country-items {
  margin: 40px 0;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-gap: 3rem;
}
.searchSection {
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  .customSelect {
    position: relative;

    @media (max-width: 768px) {
      margin-top: 20px;
    }

    .selectedValue {
      padding: 10px 20px;
      box-shadow: 1px 1px 14px 2px #0000000f;
      display: flex;
      align-items: center;
      background-color: var(--app-elements-background-color);
      color: var(--app-text-color);
      text-align: left;
      border-radius: 7px;
      cursor: pointer;

      @media (max-width: 768px) {
        justify-content: space-between;
      }

      .icon {
        transition: 0.3s all ease-in;
      }

      .selectedText {
        margin-right: 40px;
        width: 150px;
      }
    }

    &.open {
      .icon {
        transform: rotate(180deg);
      }

      .select-dropdown {
        visibility: visible;
        opacity: 1;
      }
    }

    .select-dropdown {
      visibility: hidden;
      box-shadow: 1px 1px 14px 2px #0000000f;
      font-size: 15px;
      font-weight: 300;
      opacity: 0;
      transition: 0.3s all linear;
      margin: 5px 0px;
      position: absolute;
      padding: 10px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: var(--app-elements-background-color);
      color: var(--app-text-color);
      text-align: left;
      border-radius: 7px;
      cursor: pointer;
      align-items: flex-start;
      width: 100%;

      .select-dropdown-item {
        padding: 5px 20px;
        width: 100%;
        &:hover {
          background-color: var(--app-background-color);
        }
      }
    }
  }

  .customInput {
    display: flex;
    position: relative;

    .icon {
      position: absolute;
      z-index: 10;
      left: 20px;
      top: 50%;
      transform: translate(0, -50%);
      color: var(--app-text-color);
    }

    input {
      height: 30px;
      padding: 5px 60px;
      width: 300px;
      box-shadow: 1px 1px 14px 2px #0000000f;
      border-radius: 4px;
      color: var(--app-text-color);
      background-color: var(--app-elements-background-color);
      font-family: "Nunito Sans", sans-serif;
      font-size: 14px;
      font-weight: 300;
      outline: none;
      border: none;

      @media (max-width: 768px) {
        width: 100%;
      }

      &:focus,
      &:focus-visible {
        outline: none;
        border: none;
      }

      &::placeholder {
        color: var(--app-text-color);
      }
    }
  }
}
</style>

<script>
import CountryItem from "../components/CountryItem.vue";
export default {
  name: "Home",
  components: {
    CountryItem,
  },
  data() {
    return {
      selectedRegion: null,
      selectOpen: false,
      regions: [
        {
          id: 1,
          text: "Africa",
        },
        {
          id: 2,
          text: "America",
        },
        {
          id: 3,
          text: "Asia",
        },
        {
          id: 4,
          text: "Europe",
        },
        {
          id: 5,
          text: "Oceania",
        },
      ],
    };
  },
  created() {},
  methods: {
    setRegion(id) {
      if (id != null) {
        this.selectedRegion = this.regions.filter((r) => r.id == id)[0].text;
        this.selectOpen = !this.selectOpen;
      }
    },
  },
};
</script>
