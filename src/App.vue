<script setup>
import { inject } from 'vue';
import { RouterLink, RouterView } from 'vue-router'

const GStore = inject('GStore')
</script>

<template>
  <div id="layout">
    <div id="flashMessage" v-if="GStore.flashMessage">
      {{ GStore.flashMessage }}
    </div>
    <header>
    <div class="wrapper">
      <nav>
        <RouterLink :to="{ name: 'event-list' }">Events</RouterLink> |
        <RouterLink :to="{ name: 'about' }">About</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
  </div>
</template>

<style>
@keyframes yellowfade {
  from {
    background: greenyellow;
  }
  to {
    background: transparent;
  }
}

#flashMessage {
  animation-name: yellowfade;
  animation-duration: 3s;
  display: inline-block;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
}

#layout {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 30px;
}
nav a {
  font-weight: bold;
}
nav a.router-link-exact-active {
  color: #42b983;
}
h2 {
  font-size: 20px;
}
</style>
