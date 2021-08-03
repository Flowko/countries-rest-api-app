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
      
    },
    SET_COUNTRY_BORDER(state,borderName){
      state.borders.push(borderName);
    },
    SET_LOADING(state,loading){
      state.isloading = loading;
    },
  },
  getters: {
    getCountryBorders: (state) => {
      return state
    }
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
    getCountrybyCode({commit},data){
      if(data.code){
        axios.get(`https://restcountries.eu/rest/v2/alpha/${data.code}`)
        .then(response => {
          commit('SET_COUNTRY',response.data)
          if(response.data){
            commit('SET_LOADING',false)
          }
          else {
            commit('SET_LOADING',true)
          }
        })
      }
    },
    getCountryName({commit},data){
      if(data.borders){
        for(var borders in data.borders){
          axios.get(`https://restcountries.eu/rest/v2/alpha/${data.borders[borders]}`)
          .then(response => {
            commit('SET_COUNTRY_BORDER',response.data.name)
          })
        }
        
      }
    }
  },
  modules: {},
});
