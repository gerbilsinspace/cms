<template>
  <v-layout column>
    <v-navigation-drawer permanent clipped light>
      <v-tabs dark v-model="tabMode">
        <v-tabs-bar class="pink lighten-1">
          <v-tabs-item
            href="#Create"
          >
            Create
          </v-tabs-item>
          <v-tabs-item
            href='#Edit'
            :disabled='tabMode === "Create"'
          >
            Edit
          </v-tabs-item>
          <v-tabs-slider class="yellow"></v-tabs-slider>
        </v-tabs-bar>
        <v-tabs-items>
          <v-tabs-content id="Create">
            <h2 class='small'>Create</h2>
            <v-list>
              <v-list-tile v-for='control in controls' :key='control.title'>
                <v-list-tile-content
                  v-on:click='addControl'
                  :data-type='control.type'
                  :data-default='control.defaultValue'
                  style='cursor: pointer'
                >
                  <v-list-tile-title>{{ control.label }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-tabs-content>
          <v-tabs-content id="Edit">
            <h2 class='small'>Edit</h2>
            <v-text-field v-model='text' label='Name' />
          </v-tabs-content>
        </v-tabs-items>
      </v-tabs>
    </v-navigation-drawer>

    <v-flex mt-5 style='margin-left: 300px;'>
      <h3>Edit {{ contentTypeId }}</h3>
      <v-btn primary v-on:click='onSave'>Save</v-btn>
    </v-flex>
    <v-flex v-if='alert' mt-5 style='margin-left: 300px;'>
      <v-alert error dismissible v-model='alert'>
        {{ error }}
      </v-alert>
    </v-flex>
    <v-flex
      mt-3
      xs12
      sm6
      style='margin-left: 300px; position: relative'
      v-for='item in controlsToAdd'
      :key='item.id'
    >
      <div
        class='item-overlay'
        v-on:click='controlClick'
        :data-name='item.name'
        :data-id='item.id'
      ></div>
      <label>{{ item.name }}</label>
      <el-input
        v-if='item.type === "text"'
        :name='item.name'
        v-model='item.value'
      />
      <el-input
        v-if='item.type === "paragraph"'
        :name='item.name'
        v-model='item.value'
        type='textarea'
      />
      <el-input-number
        v-if='item.type === "number"'
        v-model='item.value'
      />
      <el-switch
        v-if='item.type === "switch"'
        v-model='item.value'
      />
      <el-date-picker
        v-if='item.type === "date-time"'
        :value='item.value'
        type='datetime'
      />
      <el-color-picker
        v-if='item.type === "color"'
        v-model='item.value'
      />
      <v-select
        v-if='item.type === "images"'
        :items='images'
        v-model='item.value'
        :label='item.name'
        multiple
      />
      <el-rate
        v-if='item.type === "rate"'
        v-model='item.value'
      />
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from 'firebase'

export default {
  data: function () {
    return {
      tabMode: 'Create',
      controlId: null,
      controls: [
        { type: 'text', label: 'Text', defaultValue: '' },
        { type: 'paragraph', label: 'Paragraph', defaultValue: '' },
        { type: 'number', label: 'Number', defaultValue: 0 },
        { type: 'switch', label: 'Switch', defaultValue: true },
        { type: 'date-time', label: 'Date / Time', defaultValue: 0 },
        { type: 'color', label: 'Colour', defaultValue: 0 },
        { type: 'images', label: 'Images', defaultValue: [] },
        { type: 'rate', label: 'Rating', defaultValue: 0 }
      ],
      text: '',
      alert: false,
      firebase
    }
  },
  computed: {
    contentTypeId () {
      return this.$route.params.contentTypeId
    },
    contentType () {
      return this.$store.getters.getContentTypes[this.contentTypeId]
    },
    controlsToAdd () {
      if (this.contentType && this.contentType.controls) {
        return this.contentType.controls
      } else {
        return []
      }
    },
    error () {
      return this.$store.getters.getError
    }
  },
  methods: {
    onSave () {
      let names = []

      for (var control of this.controlsToAdd) {
        names.push(control.name)
      }

      if ([...new Set(names)].length < this.controlsToAdd.length) {
        this.$store.commit('setError', 'Each control needs to have a unique name')
        return
      }

      this.$store.dispatch('saveContentType', {
        ref: this.firebase.database().ref('contentType/' + this.$route.params.contentTypeId),
        controls: this.controlsToAdd
      })
    },
    addControl (event) {
      const id = this.controlsToAdd.length

      this.controlsToAdd.push({
        name: 'Unnamed',
        type: event.path[1].dataset.type,
        defaultValue: event.path[1].dataset.default,
        id
      })

      this.text = 'Unnamed'
      this.controlId = id
      this.tabMode = 'Edit'
    },
    controlClick (event) {
      this.controlId = event.path[0].dataset.id
      this.tabMode = 'Edit'
      this.text = event.path[0].dataset.name
    }
  },
  watch: {
    text: function (val) {
      if (this.text !== 'Unnamed') {
        this.controlsToAdd[this.controlId].name = val
      }
    },
    error (value) {
      if (value) {
        this.alert = true
      }
    },
    alert (value) {
      if (!value) {
        this.$store.dispatch('setError', false)
      }
    }
  }
}
</script>

<style>
  .small {
    font-size: 25px;
    padding: 10px 10px 0;
  }
  .item-overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
</style>
