<template>
  <div>
    <Sidebar />
    <main>
      <h1>Images</h1>

      <div>
        <h2>Upload Image</h2>
        <el-upload
          class="upload-demo"
          action=""
          list-type="picture"
          :multiple="multiple"
          :http-request="handleUpload"
          :file-list="fileList">
          <el-button size="small" type="primary">Click to upload</el-button>
        </el-upload>
      </div>

      <div>
        <h2>List of Images</h2>
        <ul>
          <li v-for="image in images">
            <img style="max-width: 150px; max-height: 150px" v-bind:src="image.downloadURLs[0]" />
            <span>{{ image.name }}</span>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
  import { db, storage } from '@/firebase.js'
  import Sidebar from '@/components/Sidebar.vue'

  export default {
    name: 'ImageList',
    components: {
      Sidebar
    },
    firebase: function () {
      return {
        contentTypes: db.ref('contentType/'),
        images: db.ref('images/')
      }
    },
    data: function () {
      return {
        name: '',
        error: '',
        multiple: true,
        fileList: []
      }
    },
    methods: {
      handleUpload: function (data) {
        data.onProgress(10)
        const storageRef = storage.ref()
        const imageRef = storageRef.child('images/' + data.file.name)
        const cleanName = data.file.name.replace('.', '')
        const referenceRef = db.ref('images/' + cleanName)

        imageRef.put(data.file).then(function (snapshot) {
          const metadataKeys = Object.keys(snapshot.metadata)
          let metadata = {}

          data.onProgress(80)

          for (var i = 0; i < metadataKeys.length; i++) {
            metadata[metadataKeys[i]] = snapshot.metadata[metadataKeys[i]] || ''
          }

          referenceRef.update(metadata).then(function () {
            data.onSuccess()
          })
        })
      }
    }
  }
</script>
