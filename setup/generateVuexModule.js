const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const modulesPath = 'src/store/modules';
const args = process.argv.slice(2);

const error = (...args) => {
  console.log(chalk.red(...args));
};

const success = (...args) => {
  console.log(chalk.green(...args));
};

if (!args.length) {
  error('You must provide a name for the module!');
  return;
}

const moduleName = args[0];
const modulePath = path.join(__dirname, '../', modulesPath, moduleName);

if (fs.existsSync(modulePath)) {
  error(`${moduleName} directory already exists!`);
  return;
}

const stateContent = `import getters from './getters';
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
`;

const actionContent = `import beerapi from '@/api/beer'

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
`;

const mutationsContent = `// import * as types from '@/store/types';

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
`;

const exportFileContent = `import * as types from '@/store/types';

export default {

};
`;

const statePath = `${path.join(modulePath, `${moduleName}.js`)}`
const gettersPath = `${path.join(modulePath, 'getters.js')}`
const actionsPath = `${path.join(modulePath, 'actions.js')}`
const mutationsPath = `${path.join(modulePath, 'mutations.js')}`

fs.mkdirSync(modulePath);
fs.appendFileSync(statePath, stateContent);
fs.appendFileSync(gettersPath, exportFileContent);
fs.appendFileSync(actionsPath, actionContent);
fs.appendFileSync(mutationsPath, mutationsContent);

success('Module', moduleName, 'generated!');
