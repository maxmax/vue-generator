const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const modulesPath = 'src/components';
const args = process.argv.slice(2);

const error = (...args) => {
  console.log(chalk.red(...args));
};

const success = (...args) => {
  console.log(chalk.green(...args));
};

if (!args.length) {
  error('You must provide a name for the component!');
  return;
}

const moduleName = args[0];
const modulePath = path.join(__dirname, '../', modulesPath, moduleName);

if (fs.existsSync(modulePath)) {
  error(`${moduleName} directory already exists!`);
  return;
}

const stateContent = `<template>
  <div>
    <div v-if="fetching" class="loader text-center">Loading...</div>
    <div v-if="beers[0]">
      <h2>Beers:</h2>
      <div class="item" v-for="beer in beers" :key="beer.id">
        <strong>{{beer.name}}</strong>
      </div>
    </div>
  </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex';
  const { mapState, mapActions } = createNamespacedHelpers('beersMod');
  export default {
    name: "${moduleName}",
    components: {},
    computed: {
      ...mapState({
        beers: state => state.beers,
        fetching: state => state.fetching,
      })
    },
    methods: {
      ...mapActions(['fetchBeers']),
    },
    props: {
      msg: String
    },
    data: function(){
      return {
        snackbar: false,
      }
    },
    mounted() {
      console.log('Mounted ${moduleName}');
    },
    created() {
      this.fetchBeers();
    },
    watch: {
      'beers.error': function (newVal) {
        this.snackbar = newVal
      },
    },
  }
</script>
`;

const statePath = `${path.join(modulePath, `index.vue`)}`

fs.mkdirSync(modulePath);
fs.appendFileSync(statePath, stateContent);

success('Component', moduleName, 'generated!');
