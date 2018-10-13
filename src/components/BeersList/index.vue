<template>
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
    name: "BeersList",
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
    mounted() {},
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
