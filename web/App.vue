<template>
  <div class="app">
    <transition name="fade" mode="out-in">
      <div v-if="stats" key="stats">
        At this rate<br>
        <a href="https://github.com/vuejs/vue" 
          target="_blank" 
          class="vue"
          :data-balloon="currentLogo('vue') + ' ' + stats.vue.total + ' stars'"
          data-balloon-pos="up"
        >
          Vue
        </a>
        ({{ stats.vue.rate }} stars/day) will take <span class="vue">{{ stats.vue.remainingDays }} days</span>
        <br>
        <a href="https://github.com/facebook/react"
        target="_blank"
        class="react"
        :data-balloon="currentLogo('react') + ' ' + stats.react.total + ' stars'"
        data-balloon-pos="down"
        >
        React</a>
        ({{ stats.react.rate }} stars/day) will take <span class="react">{{ stats.react.remainingDays }} days</span><br>
        To reach <span class="target">100K stars</span> on GitHub.
        <div class="source">
          - Source: <a target="_blank" href="https://github.com/egoist/react-and-vue">EGOIST</a><br>
          - Just for fun.
        </div>
      </div>
      <div v-else key="loading">Loading...</div>
  </transition>
  </div>
</template>

<script>
import getStats from '../lib'

export default {
  data() {
    return {
      stats: null,
    }
  },

  async created() {
    this.setStats()
  },
  computed: {
    currentWinner() {
      return this.stats.vue.total > this.stats.react.total ? "vue" : "react"
    }
  },
  methods: {
    async setStats() {
      this.stats = await getStats()
      setInterval(async () => {
        this.stats = await getStats()
      }, 60000) // 1 minute
    },
     currentLogo(lang) {
       if (this.currentWinner) {
         return this.currentWinner === lang ? "🏆" : "🥈"
       }
    }
  }
}
</script>

<style>
body {
  background: #5f5bd4;
  margin: 0;
  color: white;
  font-family: 'Source Sans Pro', Avenir, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  line-height: 1.4;
}

a {
  color: white;
}
</style>

<style scoped>
.app {
  padding: 40px;
  font-size: 4rem;
}

.vue {
  color: #4fc08d;
  display: inline-block;
  line-height: 0.8;
}

.react {
  color: #61dafb;
  display: inline-block;
  line-height: 0.8;
}

a.vue,a.react {
  text-decoration: none;
}


.target {
  color: yellow;
}

.source {
  margin: 20px 0;
  font-size: 2rem;
  opacity: .5;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

@media screen and (max-width: 768px) {
  .app {
    font-size: 2rem;
    padding: 10px;
  }

  .source {
    font-size: 1rem;
  }
}
</style>
