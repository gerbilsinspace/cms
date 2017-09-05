<template>
  <div>
    <h1>{{title}} <el-button v-on:click='onSaveClick'>Save</el-button></h1>
    <ul>
      <li v-for='control in contentType.controls'>
        <div v-if="!control.hidden">
          <div v-if='control.controlType === "textfield"'>
            <label :for="control.label">{{control.label}}</label>
            <el-input
              :id="control.label"
              :value='inputData[control.label]'
              v-on:change='onInputChange'
              v-on:focus='onInputFocus'
              v-on:blur='onInputBlur'
              :data-name='control.label'
            />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'DataEdit',
    data: function () {
      return {
        error: ''
      }
    },
    props: [
      'onInputChange',
      'onInputBlur',
      'onInputFocus',
      'onSaveClick',
      'contentType',
      'inputData',
      'title'
    ]
  }
</script>
