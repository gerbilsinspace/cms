<template>
  <div>
    <Sidebar />
    <main>
      <h1>Create Content Type</h1>

      <div v-if="error">
        {{error}}
      </div>

      <div>
        <label for="name">Name: </label>
        <input id="name" type="text" v-model.trim="name" placeholder="Name" />
      </div>

      <div v-if='name'>
        <h3>How many {{name}} are there?</h3>
        <input type="radio" id="one" value="true" v-model="oneOff" />
        <label for="true">One</label>
        <br />
        <input type="radio" id="many" value="false" v-model="oneOff" />
        <label for="false">Many</label>
      </div>

      <div>
        <button v-on:click="onAddContentTypeClick">Add {{name || "Content Type"}}</button>
      </div>
    </main>
  </div>
</template>

<script>
  import { router } from '@/router/index.js'
  import { db } from '@/firebase.js'
  import Sidebar from '@/components/Sidebar.vue'

  export default {
    name: 'ContentTypes',
    firebase: function () {
      return {
        contentTypes: db.ref('contentType/')
      }
    },
    components: {
      Sidebar
    },
    data: function () {
      return {
        name: '',
        oneOff: '',
        error: ''
      }
    },
    methods: {
      onAddContentTypeClick: function () {
        const contentTypes = this.contentTypes

        let matchedContentType = false

        for (var i = 0; i < contentTypes.length; i++) {
          if (contentTypes[i].name.toLowerCase() === this.name.toLowerCase()) {
            matchedContentType = true
          }
        }

        if (this.name === '') {
          this.error = 'Please add a name to your Content Type.'
        } else if (matchedContentType) {
          this.error = 'Name has been used before, please choose another name.'
        } else if (this.amount === '') {
          this.error = 'Please choose your Content Type amount.'
        } else {
          this.error = ''
        }

        if (this.error === '') {
          const nameCleaned = this.name.toLowerCase()
          console.log(this.name, nameCleaned)
          this.$firebaseRefs.contentTypes.child(nameCleaned).update({
            name: this.name,
            oneOff: this.oneOff === 'true'
          }).catch(err => {
            this.error = err.message
          }).then(() => {
            this.name = ''
            this.oneOff = ''
            router.push('/content-types/' + nameCleaned)
          })
        }
      }
    }
  }
</script>
