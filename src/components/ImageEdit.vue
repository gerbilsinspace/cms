<template>
  <div>
    <Header />
    <div v-if='contentType.name'>
      <h1>{{contentType.name}}</h1>
    </div>
    <div v-else>
      <h1>Loading</h1>
    </div>
  </div>
</template>

<script>
  import { db } from '@/firebase.js'
  import Header from '@/components/Header.vue'

  export default {
    name: 'ImageEdit',
    data: function () {
      return {
        error: ''
      }
    },
    firebase: function () {
      return {
        contentType: {
          source: db.ref('contentType/' + location.pathname.replace('/data/', '')),
          asObject: true
        }
      }
    },
    components: {
      Header
    }
  }
</script>
