import { createStore } from "vuex";
import axios from 'axios'

export default createStore({
  state: {
    countries: [],
    isloading: true
  },
  mutations: {
    SET_COUNTRIES(state,countries){
      state.countries = countries
    },
    SET_LOADING(state,loading){
      state.isloading = loading
    },
    
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
    }
  },
  modules: {},
});
