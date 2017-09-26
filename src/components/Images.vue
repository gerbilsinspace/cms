<template>
  <v-layout column>
    <v-flex xs12 class='text-xs-center' mt-5>
      <h3>Images</h3>
    </v-flex>
    <v-flex xs12 class='text-xs-center' mt-3>
      <el-upload
        action=''
        list-type='picture'
        :multiple='multiple'
        :http-request='uploadFile'
        :file-list="fileList"
      >
        <v-btn primary>Click to upload</v-btn>
      </el-upload>
    </v-flex>

    <v-flex v-for='url in urls' :key='url'>
      <img :src='url' style='height: 200px; display: block; margin: 0 auto;' />
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from 'firebase'

export default {
  data () {
    return {
      multiple: true,
      fileList: [],
      urls: []
    }
  },
  created () {
    if (this.images.length !== this.urls.length) {
      this.downloadImages()
    }
  },
  computed: {
    images () {
      const images = []
      const imageData = this.$store.state.imageData

      if (imageData) {
        for (var key in imageData) {
          images.push(imageData[key])
        }

        return images
      } else {
        return []
      }
    }
  },
  methods: {
    uploadFile (data) {
      this.$store.dispatch('uploadImage', data)
    },
    downloadImages () {
      let urls = []

      for (var i = 0; i < this.images.length; i++) {
        const fullPath = this.images[i].fullPath

        firebase.storage().ref(fullPath).getDownloadURL().then((url) => {
          urls.push(url)

          if (i === this.images.length) {
            this.urls = urls
          }
        })
      }
    }
  },
  watch: {
    images () {
      this.downloadImages()
    }
  }
}
</script>

