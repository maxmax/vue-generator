import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  fetching: false,
  error: false,
  beers: [],
};

export default {
  state,
  getters,
  actions,
  mutations
};
