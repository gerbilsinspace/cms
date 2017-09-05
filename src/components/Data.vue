<template>
  <div>
    <Sidebar />
    <main>
      <div v-if='contentType.name'>
        <DataEdit
          v-if='contentType.oneOff'
          :title='contentType.name'
          :onSaveClick='onEditSaveClick'
          :onInputChange='onEditInputChange'
          :onInputFocus='onEditInputFocus'
          :onInputBlur='onEditInputBlur'
          :contentType='contentType'
          :inputData='firebaseData'
        />
        <div v-else>
          <h1>{{ contentType.name }}</h1>
          <div>
            <h2>Create</h2>
            <el-input v-model="createInputData"></el-input>
            <el-button type="primary" v-on:click="onCreateSaveClick">Save</el-button>
          </div>
          <ul>
            <li v-for='dataItem in dataList'>
              <el-button type='text' v-on:click='onLinkClick' :data-id='dataItem.id'>{{ dataItem.id }}</el-button>
            </li>
          </ul>
        </div>
      </div>
      <div v-else>
        <h1>Loading</h1>
      </div>
    </main>
  </div>
</template>

<script>
  import { db } from '@/firebase.js'
  import { router } from '@/router/index.js'

  import Sidebar from '@/components/Sidebar'
  import DataEdit from '@/components/DataEdit'
  export default {
    name: 'Data',
    data: function () {
      return {
        error: '',
        focussedElement: '',
        inputData: {},
        createInputData: ''
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
          source: db.ref('data/' + this.$route.params.contentTypeId),
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

        db.ref('data/' + this.$route.params.contentTypeId).update(data)
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
      },
      onLinkClick: function (element) {
        router.push('/data/' + this.$route.params.contentTypeId + '/' + element.path[1].dataset.id)
      }
    }
  }
</script>
