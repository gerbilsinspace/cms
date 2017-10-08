<template>
  <v-layout column>
    <v-flex xs12 class='text-xs-center' mt-5>
      <h3>Data</h3>
    </v-flex>
    <v-flex mt3 v-for='contentType in contentTypes' :key='contentType.name'>
      <div v-if='contentType.oneOff === "Yes"'>
        <v-btn
          primary
          v-on:click='onOneOffClick'
          :data-name='contentType.name'
        >{{ contentType.name }}</v-btn>
      </div>
      <div v-else>
        <v-btn
          primary
          v-on:click='onMultipleClick'
          :data-name='contentType.name'
        >{{ contentType.name }}</v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from 'firebase'
import router from '@/router'

export default {
  computed: {
    contentTypes () {
      return this.$store.getters.getContentTypes || {}
    },
    data () {
      return this.$store.getters.getData || []
    }
  },
  methods: {
    onOneOffClick (event) {
      const name = event.path[1].dataset.name
      let dataset = this.data[name] || {}
      const controls = this.contentTypes[name].controls

      for (let control of controls) {
        if (dataset[control.name] === undefined) {
          dataset[control.name] = {
            type: control.type,
            value: control.defaultValue
          }
        }
      }

      firebase.database().ref('data/' + name).set(dataset)
      router.push('/data/edit/' + name)
    },

    onMultipleClick (event) {
      const name = event.path[1].dataset.name
      const data = this.data[name]

      if (!data) {
        firebase.database().ref('data/' + name).set({
          name
        }).then(() => {
          router.push('/data/' + name)
        })
      } else {
        router.push('/data/' + event.path[1].dataset.name)
      }
    }
  }
}
</script>

