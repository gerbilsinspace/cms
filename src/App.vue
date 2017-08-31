<template>
  <div id="app">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue'

  export default {
    name: 'app',
    components: {
      Header
    }
  }
</script>

<style>
  body {
    margin: 0;
  }

  h1, h2 {
    font-weight: normal;
    margin: 0 0 10px;
  }

  ul, ol {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin: 0 10px;
    display: block;
  }

  a {
    color: #35495E;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  main {
    text-align: center;
  }

  aside {
    float: left;
    width: 200px;
    background-color: #324157;
    height: calc(100vh - 60px);
  }

  aside a {
    color: #FFF;
    text-decoration: none;
  }
</style>
