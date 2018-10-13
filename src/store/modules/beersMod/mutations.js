// import * as types from '@/store/types';

export default {
  FETCH_BEERS_SUCCESS (state, beers) {
    state.fetching = false
    state.beers = beers
  },

  FETCH_BEERS_PENDING (state) {
    state.error = false
    state.fetching = true
  },

  FETCH_BEERS_FAIL (state) {
    state.error = true
    state.fetching = false
  },
};
