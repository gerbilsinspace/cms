<template>
  <div>
    <Sidebar />
    <main>
      <div v-if='contentType && contentType.name'>
        <DataEdit
          v-if='contentType.oneOff'
          :title='contentType.name'
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
  import { mapState } from 'vuex'
  import { db } from '@/firebase'
  import { router } from '@/router/index'
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
    computed: mapState({
      contentType: function (state) {
        return (state.contentTypes[this.$route.params.contentTypeId])
      },
      dataList: function (state) {
        return (state.data[this.$route.params.contentTypeId])
      }
    }),
    methods: {
      onCreateSaveClick: function () {
        let data = {
          id: this.createInputData
        }

        for (var control of this.contentType.controls) {
          switch (control.controlType) {
            case 'images':
              data[control.label] = ['']
              break
            case 'number':
            case 'rate':
              data[control.label] = 0
              break
            default:
              data[control.label] = ''
              break
          }
        }

        db.ref('/data/' + this.$route.params.contentTypeId + '/' + this.createInputData)
          .update(data).then(() => {
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
