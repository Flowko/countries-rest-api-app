import { createStore } from "vuex";
import axios from 'axios'

export default createStore({
  state: {
    countries: [],
    isloading: true,
    country: {},
    borders: [],
  },
  mutations: {
    SET_COUNTRIES(state,countries){
      state.country = {};
      state.borders = [];
      state.countries = countries;
    },
    SET_COUNTRY(state,country){
      state.country = country;
      state.borders = [];
    },
    SET_COUNTRY_BORDER(state,borderName){
      state.borders.push(borderName);
    },
    SET_LOADING(state,loading){
      state.isloading = loading;
    },
    SEARCH_RESULTS(state,result){
      state.countries = result;
    }
  },
  getters: {
    getCountryBorders: (state) => {
      return state
    },
    searchResult: (state) => state.countries,
  },
  actions: {
    getCountries({commit}){
      axios.get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          commit('SET_COUNTRIES',response.data)
          if(response.data){
            commit('SET_LOADING',false)
          }
          else {
            commit('SET_LOADING',true)
          }
        })
    },
    async getCountrybyCode({commit,dispatch},data){
      if(data.code && data.code.length != 0){
        const res = await axios.get(`https://restcountries.eu/rest/v2/alpha/${data.code}`);
        commit('SET_COUNTRY',res.data)
        dispatch('getCountryName',res.data)
      }
    },
    async getCountryName({commit},data){
      if(data.borders){
        for(var borders in data.borders){
          const res = await axios.get(`https://restcountries.eu/rest/v2/alpha/${data.borders[borders]}`);
          commit('SET_COUNTRY_BORDER',res.data)
        }
      }
    },
    async getSearchResults({commit},query){
      if(query && query.length != 0){
        const res = await axios.get(`https://restcountries.eu/rest/v2/name/${query}`);
        commit('SEARCH_RESULTS',res.data) 
      }
      else {
        const res = await axios.get(`https://restcountries.eu/rest/v2/all`);
        commit('SEARCH_RESULTS',res.data) 
      }
    },
    async getCountriesByRegion({commit},region){
      if(region && region.length != 0){
        const res = await axios.get(`https://restcountries.eu/rest/v2/region/${region}`);
        commit('SEARCH_RESULTS',res.data) 
      }
      else {
        const res = await axios.get(`https://restcountries.eu/rest/v2/all`);
        commit('SEARCH_RESULTS',res.data) 
      }
    }
  },
  modules: {},
});
