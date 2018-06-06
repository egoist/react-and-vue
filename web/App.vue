<template>
  <transition name="fade" mode="out-in">
    <div v-if="stats" key="stats">
      At this rate<br>
      <span class="vue">Vue</span> ({{ stats.vue.rate }} stars/day) will take <span class="vue">{{ stats.vue.remainingDays }} days</span><br>
      <span class="react">React</span> ({{ stats.react.rate }} stars/day) will take <span class="react">{{ stats.react.remainingDays }} days</span><br>
      To reach <span class="target">100K stars</span> on GitHub.
      <div class="source">
        - Source: <a target="_blank" href="https://github.com/egoist/react-vs-vue">EGOIST</a><br>
        - Just for fun.
      </div>
    </div>
    <div v-else key="loading">Loading...</div>
  </transition>
</template>

<script>
import getStats from '../lib'

export default {
  data() {
    return {
      stats: null
    }
  },

  async created() {
    const stats = await getStats()
    this.stats = stats
  }
}
</script>

<style>
body {
  background: #5f5bd4;
  margin: 0;
  padding: 40px;
  color: white;
  font-family: 'Source Sans Pro', Avenir, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 4rem;
  line-height: 1.4;
}

a {
  color: white;
}
</style>

<style scoped>
.vue {
  color: #4fc08d;
}

.react {
  color: #61dafb;
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
</style>
