<template>
  <v-layout column>
    <v-flex xs12 mt-5 class='text-xs-center'>
      <h1>Content Types</h1>
    </v-flex>
    <v-flex xs12 sm6 offset-sm3 mt-3>
      <form @submit.prevent='createContentType' id='createContentTypeForm'>
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
              v-model='name'
              required
              :rules='[isNameUnique]'
            />
          </v-flex>
          <v-flex>
            <v-select
              v-bind:items='oneOffItems'
              v-model='oneOff'
              label='One Off'
              item-value='text'
              single-line
              bottom
              :rules='[requireOneOff]'
            />
          </v-flex>
          <v-flex>
            <v-btn primary id='createButton' type='submit' :disabled='loading'>Create</v-btn>
          </v-flex>
        </v-layout>
      </form>
    </v-flex>
    <v-flex xs12 sm6 offset-sm3 mt-3>
      <h2>List</h2>
    </v-flex>
    <v-flex xs12 sm6 offset-sm3 mt-3>
      <div v-for='key in Object.keys(contentTypes)' :key='key'>
        <v-btn primary :to='"/content-types/" + key'>{{ key }}</v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      oneOffItems: [
        { text: 'Yes' },
        { text: 'No' }
      ],
      oneOff: null,
      alert: false
    }
  },
  computed: {
    error () {
      return this.$store.getters.getError
    },
    loading () {
      return this.$store.getters.getLoading
    },
    contentTypes () {
      return this.$store.getters.getContentTypes || {}
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
    requireOneOff () {
      if (this.oneOff === null) {
        return 'Please choose whether the content type is one off.'
      } else {
        return true
      }
    },
    isNameUnique () {
      // TODO: we need to make sure we are not overwriting content types that
      // already exist
      return true
    },
    createContentType () {
      if (this.requireOneOff() !== true) {
        return
      }

      if (this.isNameUnique() !== true) {
        return
      }

      this.$store.dispatch('createContentType', {
        name: this.name,
        oneOff: this.oneOff
      })
    }
  }
}
</script>

