<template>
  <div>
    <h1>{{title}} <el-button v-on:click='onSaveClick'>Save</el-button></h1>
    <ul>
      <li v-for='control in contentType.controls'>
        <div v-if="!control.hidden">
          <label :for="control.label">{{control.label}}</label>
          <el-input
            v-if='control.controlType === "textfield"'
            :id="control.label"
            :value='inputData[control.label]'
            :data-name='control.label'
            v-model='controls[control.label]'
          />
          <el-switch
            v-if='control.controlType === "switch"'
            :name='control.label'
            :id='control.label'
            :value='inputData[control.label]'
            on-text='Yes'
            off-text='No'
            v-model='controls[control.label]'
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { db } from '@/firebase'
  export default {
    name: 'DataEdit',
    data: function () {
      return {
        error: '',
        controls: {}
      }
    },
    props: [
      'contentType',
      'inputData',
      'title'
    ],
    methods: {
      onSaveClick: function () {
        db.ref('data/' + this.$route.params.contentTypeId + '/' + this.$route.params.dataId).update(this.controls)
      }
    }
  }
</script>
