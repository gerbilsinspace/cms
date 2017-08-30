<template>
  <div>
    <CMSHeader />
    <div v-if='contentType.name'>
    	<h1>
        <span>{{ contentType.name }}</span>
        <button v-on:click='onSaveClick'>Save</button>
        <button v-on:click='onDeleteClick'>Delete</button>
      </h1>

      <div v-if='error'>
        <h2>{{error}}</h2>
      </div>

      <div>
        <label for='name'>Name:</label>
        <input type='text' id='name' v-model='name' />
      </div>
    </div>
    <div v-else>
      <h1>Loading</h1>
    </div>
  </div>
</template>

<script>
  import { db } from '@/firebase.js'
  import CMSHeader from '@/components/CMSHeader.vue'

  export default {
    name: 'contentTypeEdit',
    data: function () {
      return {
        name: '',
        error: ''
      }
    },
    mounted: function () {
      var current = this

      db.ref('contentType/' + location.pathname.replace('/content-types/', ''))
        .once('value', function (val) {
          current.contentType = val.val()
        }
      )
    },
    firebase: {
      contentType: {
        source: db.ref('contentType/' + location.pathname.replace('/content-types/', '')),
        asObject: true
      },
      contentTypes: {
        source: db.ref('contentTypes/')
      }
    },
    components: {
      CMSHeader
    },
    methods: {
      onSaveClick: function () {
        if (this.name === this.contentType.name) {
          this.name = ''
          return
        }

        for (var i = 0; i < this.contentTypes.length; i++) {
          if (this.contentTypes[i].name === this.name) {
            this.error = 'Name has already been taken. Please choose another.'
            this.name = ''
            return
          }
        }

        if (this.name) {
          this.error = ''
          this.$firebaseRefs.contentType.update({
            name: this.name
          })
          this.name = ''
        }
      },
      onDeleteClick: function () {
        var deleteName = prompt('To make sure you are deleting the correct Content Type, please type "' + this.contentType.name + '".', '')

        if (deleteName === this.contentType.name) {
          db.ref('contentType/' + location.pathname.replace('/content-types/', '')).remove()
          this.$router.push('/content-types')
        }
      }
    }
  }
</script>
