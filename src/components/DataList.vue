<template>
  <div class="content-types">
    <CMSHeader />
    <main>
      <div>
        <h1>Data</h1>
        <ol>
          <li v-for="contentType in contentTypes">
            <router-link :to="{ name: 'DataEdit', params: { contentTypeId: contentType['name'].toLowerCase() }}">
              <GridItem :title="contentType.name"></GridItem>
            </router-link>
          </li>
        </ol>
      </div>
    </main>
  </div>
</template>

<script>
  import { db } from '@/firebase.js'
  import CMSHeader from '@/components/CMSHeader.vue'
  import GridItem from '@/components/GridItem'

  export default {
    name: 'DataList',
    components: {
      GridItem,
      CMSHeader
    },
    firebase: function () {
      return {
        contentTypes: db.ref('contentType/')
      }
    },
    data: function () {
      return {
        name: '',
        error: ''
      }
    }
  }
</script>
