<template>
  <div>
    <Sidebar />
    <main>
      <h1>{{ $route.params.dataId }} <el-button v-on:click='onSaveClick'>Save</el-button></h1>
      <ul>
        <li v-for='control in contentType.controls'>
          <div v-if="!control.hidden">
            <label :for="control.label">{{control.label}}</label>
            <el-input
              v-if='control.controlType === "textfield"'
              :id="control.label"
              :data-name='control.label'
              :value='controls[control.label]'
              @input='onTextChange(control.label, $event)'
            />
            <el-switch
              v-if='control.controlType === "switch"'
              :name='control.label'
              :id='control.label'
              on-text='Yes'
              off-text='No'
              :value='controls[control.label]'
              @input='onSwitchChange(control.label, $event)'
            />
          </div>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
  import { db, auth } from '@/firebase'
  import Sidebar from '@/components/Sidebar'

  export default {
    name: 'DataEdit',
    data: function () {
      return {
        error: ''
      }
    },
    components: {
      Sidebar
    },
    methods: {
      onSaveClick: function () {
        let controls = this.controls
        delete controls['.key']

        db.ref('data/' + this.$route.params.contentTypeId + '/' + this.$route.params.dataId).update(this.controls)
        this.$router.push('/data/' + this.$route.params.contentTypeId)
        db.ref('draft/' + auth.currentUser.uid).remove()
      },
      inputDataReady: function (val) {
        const values = val.val()
        const draft = db.ref('/draft/' + auth.currentUser.uid)

        draft.set(values)

        this.$bindAsObject('controls', db.ref('draft').child(auth.currentUser.uid))
      },
      onTextChange: function (label, val) {
        this.controls[label] = val
      },
      onSwitchChange: function (label, val) {
        this.controls[label] = val
      }
    },
    firebase: function () {
      return {
        contentType: {
          source: db.ref('contentType/' + this.$route.params.contentTypeId),
          asObject: true
        },
        inputData: {
          source: db.ref('data/' + this.$route.params.contentTypeId + '/' + this.$route.params.dataId),
          asObject: true,
          readyCallback: this.inputDataReady
        }
      }
    }
  }
</script>
