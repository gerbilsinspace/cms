<template>
  <div>
    <Sidebar />
    <main>
      <DataEdit
        :title='this.$route.params.dataId'
        :contentType='contentType'
        :inputData='inputData'
      />
    </main>
  </div>
</template>

<script>
  import { db } from '@/firebase.js'

  import Sidebar from '@/components/Sidebar'
  import DataEdit from '@/components/DataEdit'

  export default {
    name: 'DataSingle',
    data: function () {
      return {
        error: ''
      }
    },
    components: {
      Sidebar,
      DataEdit
    },
    firebase: function () {
      return {
        contentType: {
          source: db.ref('contentType/' + this.$route.params.contentTypeId),
          asObject: true
        },
        inputData: {
          source: db.ref('data/' + this.$route.params.contentTypeId + '/' + this.$route.params.dataId),
          asObject: true
        }
      }
    }
  }
</script>
