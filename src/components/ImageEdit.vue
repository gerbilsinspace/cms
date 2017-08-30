<template>
  <div>
    <CMSHeader />
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
  import CMSHeader from '@/components/CMSHeader.vue'

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
      CMSHeader
    }
  }
</script>
