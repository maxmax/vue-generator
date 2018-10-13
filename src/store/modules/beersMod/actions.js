import beerapi from '@/api/beer'

// Empty as helper
const stripEmpty = obj => Object
  .entries(obj)
  .reduce((stripped, [key, value]) => {
    if (!!value) {
      stripped[key] = value
    }
    return stripped
  }, {})

export default {
  fetchBeers ({ commit, state }, params = {}) {
    commit('FETCH_BEERS_PENDING')
    beerapi.beers(stripEmpty(params)).then(beers => {
      commit('FETCH_BEERS_SUCCESS', beers.body)
    }).catch(() => {
      commit('FETCH_BEERS_FAIL')
    })
  },
};
