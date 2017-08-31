<template>
  <div class="content-types">
    <Header />
    <main>
      <h1>Content Types</h1>

      <div v-if="error">
        {{error}}
      </div>

      <div>
        <h2>Add Content Type</h2>
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
      </div>

      <div>
        <h2>List Content Types</h2>
        <ol>
          <li v-for="contentType in contentTypes">
            <div>
              {{ contentType.name }}
              <router-link :to="{ path: `/content-types/${contentType['.key']}` }">Edit</router-link>
            </div>
          </li>
        </ol>
      </div>
    </main>
  </div>
</template>

<script>
  import { db } from '@/firebase.js'
  import Header from '@/components/Header.vue'

  export default {
    name: 'ContentTypes',
    firebase: function () {
      return {
        contentTypes: db.ref('contentType/')
      }
    },
    data: function () {
      return {
        name: '',
        oneOff: '',
        error: ''
      }
    },
    components: {
      Header
    },
    methods: {
      onAddContentTypeClick: function () {
        const contentTypes = this.contentTypes

        let matchedContentType = false

        for (var i = 0; i < contentTypes.length; i++) {
          if (contentTypes[i].name.toLowerCase() === this.name.toLowerCase().replace(' ', '')) {
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
          this.$firebaseRefs.contentTypes.child(this.name.toLowerCase().replace(' ', '')).update({
            name: this.name,
            oneOff: this.oneOff === 'true'
          }).catch(err => {
            this.error = err.message
          }).then(() => {
            this.name = ''
            this.oneOff = ''
          })
        }
      }
    }
  }
</script>
