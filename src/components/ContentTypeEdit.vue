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
      style='margin-left: 300px;'
      v-for='control in controlsToAdd'
      :key='control.id'
    >
      <v-btn
        v-on:click='controlClick'
        :data-id='control.id'
        :data-name='control.name'
      >
        {{ control.name }}
      </v-btn>
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
        { type: 'text', label: 'Text' },
        { type: 'paragraph', label: 'Paragraph' },
        { type: 'number', label: 'Number' },
        { type: 'switch', label: 'Switch' },
        { type: 'date-time', label: 'Date / Time' },
        { type: 'color', label: 'Colour' },
        { type: 'images', label: 'Images' },
        { type: 'rate', label: 'Rating' }
      ],
      text: '',
      alert: false
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
        this.$store.commit('setError', 'Please make each control has a unique name')
        return
      }

      this.$store.dispatch('saveContentType', {
        ref: firebase.database().ref('contentType/' + this.$route.params.contentTypeId),
        controls: this.controlsToAdd
      })
    },
    addControl (event) {
      const id = this.controlsToAdd.length

      this.controlsToAdd.push({
        name: 'Unnamed',
        type: event.path[1].dataset.type,
        id
      })

      this.text = 'Unnamed'
      this.controlId = id
      this.tabMode = 'Edit'
    },
    controlClick (event) {
      this.controlId = event.path[1].dataset.id
      this.tabMode = 'Edit'
      this.text = event.path[1].dataset.name
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
</style>
