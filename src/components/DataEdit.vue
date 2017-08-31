<template>
  <div>
    <Sidebar />
    <main>
      <div v-if='contentType.name'>
        <h1>{{contentType.name}}</h1>
      </div>
      <div v-else>
        <h1>Loading</h1>
      </div>
    </main>
  </div>
</template>

<script>
  import { db } from '@/firebase.js'
  import Sidebar from '@/components/Sidebar.vue'

  export default {
    name: 'dataEdit',
    data: function () {
      return {
        error: ''
      }
    },
    components: {
      Sidebar
    },
    firebase: function () {
      return {
        contentType: {
          source: db.ref('contentType/' + location.pathname.replace('/data/', '')),
          asObject: true
        }
      }
    }
  }
</script>
