<template>
  <div>
    <Sidebar />
    <main>
      <DataEdit
        :title='this.$route.params.dataId'
        :onSaveClick='onEditSaveClick'
        :onInputChange='onEditInputChange'
        :onInputFocus='onEditInputFocus'
        :onInputBlur='onEditInputBlur'
        :contentType='contentType'
        :inputData='firebaseData'
      />

    </main>
  </div>
</template>

<script>
  import { db } from '@/firebase.js'
  import { router } from '@/router/index.js'

  import Sidebar from '@/components/Sidebar'
  import DataEdit from '@/components/DataEdit'

  export default {
    name: 'DataSingle',
    data: function () {
      return {
        error: '',
        inputData: {}
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
        firebaseData: {
          source: db.ref('data/' + this.$route.params.contentTypeId + '/' + this.$route.params.dataId),
          asObject: true
        },
        dataList: {
          source: db.ref('data/' + this.$route.params.contentTypeId)
        }
      }
    },
    methods: {
      onEditSaveClick: function () {
        const keys = Object.keys(this.inputData)
        let data = {}

        for (var i = 0; i < keys.length; i++) {
          const key = keys[i]
          data[key] = this.inputData[key]
        }

        db.ref('data/' + this.$route.params.contentTypeId + '/' + this.$route.params.dataId).update(data)
      },
      onEditInputChange: function (val) {
        this.$set(this.inputData, this.focussedElement, val)
      },
      onEditInputBlur: function () {
        this.focussedElement = ''
      },
      onEditInputFocus: function (e) {
        this.focussedElement = e.path[1].dataset.name
      },
      onCreateSaveClick: function () {
        db.ref('data/' + this.$route.params.contentTypeId + '/' + this.createInputData).update({
          id: this.createInputData
        }).catch((e) => {
          this.error = e
        }).then(() => {
          router.push('/data/' + this.$route.params.contentTypeId + '/' + this.createInputData)

          this.createInputData = ''
        })
      }
    }
  }
</script>
