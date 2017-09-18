<template>
  <div id="app">
    <CMSHeader />
    <router-view></router-view>
  </div>
</template>

<script>
  import CMSHeader from '@/components/Header.vue'

  export default {
    name: 'app',
    components: {
      CMSHeader
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
    padding: 20px;
    float: left;
    width: calc(100vw - 260px);
  }

  aside {
    float: left;
    width: 200px;
    background-color: #324157;
    height: calc(100vh - 60px);
    overflow-y: scroll;
    overflow-x: hidden;
  }

  aside a {
    color: #FFF;
    text-decoration: none;
  }
</style>
