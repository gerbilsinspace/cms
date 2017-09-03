<template>
  <div>
    <Sidebar />
    <main>
      <div v-if='contentType.name'>
        <h1>{{contentType.name}} <el-button v-on:click='onSaveClick'>Save</el-button></h1>

        <div v-if='contentType.oneOff'>
          <ul>
            <li v-for='control in contentType.controls'>
              <div v-if="!control.hidden">
                <div v-if='control.controlType === "textfield"'>
                  <label :for="control.label">{{control.label}}</label>
                  <el-input :id="control.label" v-on:change='onInputChange' v-on:focus='onInputFocus' v-on:blur='onInputBlur' :data-name='control.label'></el-input>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div v-else>
          Multiple
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
  import Sidebar from '@/components/Sidebar.vue'

  export default {
    name: 'dataEdit',
    data: function () {
      return {
        error: '',
        inputData: {}
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
    },
    methods: {
      onSaveClick: function () {
        const keys = Object.keys(this.inputData)
        let data = {}

        for (var i = 0; i < keys.length; i++) {
          const key = keys[i]
          data[key] = this.inputData[key]
        }

        db.ref('data/' + location.pathname.replace('/data/', '')).update(data)
      },
      onInputChange: function (val) {
        this.$set(this.inputData, this.focus, val)
      },
      onInputBlur: function () {
        this.focus = ''
      },
      onInputFocus: function (e) {
        this.focus = e.path[1].dataset.name
      }
    }
  }
</script>
