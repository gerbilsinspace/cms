<template>
  <v-layout column>
    <v-flex xs12 class='text-xs-center' mt-5>
      <h3>{{ name }}</h3>
    </v-flex>
    <v-flex xs12 sm6 offset-sm3 mt-3>
      <form @submit.prevent='createItem'>
        <v-layout column>
          <v-flex>
            <h2>Create</h2>
          </v-flex>
          <v-flex>
            <v-alert error dismissible v-model='alert'>
              {{ error }}
            </v-alert>
          </v-flex>
          <v-flex>
            <v-text-field
              name='name'
              label='Name'
              id='name'
              type='text'
              v-model='itemName'
              required
              :rules='[isNameUnique]'
            />
          </v-flex>
          <v-flex>
            <v-btn primary type='submit' :disabled='loading'>Create</v-btn>
          </v-flex>
        </v-layout>
      </form>
    </v-flex>
    <v-flex v-for='key in Object.keys(items)' :key='key'>
      <v-btn
        primary
        v-on:click='onButtonClick'
        :data-name='key'
      >{{key}}</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from 'firebase'
import router from '@/router'

export default {
  data () {
    return {
      itemName: '',
      alert: false
    }
  },
  computed: {
    name () {
      return this.$route.params.dataId
    },
    data () {
      return this.$store.getters.getData[this.name] || {items: {}}
    },
    items () {
      return this.data.items
    },
    contentType () {
      return this.$store.getters.getContentTypes[this.name]
    },
    error () {
      return this.$store.getters.getError
    },
    loading () {
      return this.$store.getters.getLoading
    }
  },
  watch: {
    error (value) {
      if (value) {
        this.alert = true
      }
    },
    alert (value) {
      if (!value) {
        this.$store.commit('setError', false)
      }
    }
  },
  methods: {
    isNameUnique () {
      // TODO: we need to make sure we are not overwriting data that
      // already exists
      return true
    },
    createItem () {
      if (this.isNameUnique() !== true) {
        return
      }

      const controls = this.contentType.controls
      let items = this.data.items || {}
      let item = items[this.itemName] || {}

      for (let control of controls) {
        item[control.name] = item[control.name] || {}
        item[control.name] = {
          type: item[control.name].type || control.type,
          value: item[control.name].value || control.defaultValue
        }
      }

      firebase.database().ref('/data/' + this.name + '/items/' + this.itemName).update(item)
    },
    onButtonClick (event) {
      const name = event.path[1].dataset.name
      router.push('/data/' + this.name + '/' + name)
    }
  }
}
</script>

