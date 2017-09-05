<template>
  <div>
    <h1>Images</h1>
    <el-upload
      class="upload-demo"
      action=""
      list-type="picture"
      :multiple="multiple"
      :http-request="handleUpload"
      :file-list="fileList">
      <el-button type="primary">Click to upload</el-button>
    </el-upload>
  </div>
</template>

<script>
  import { db, storage } from '@/firebase.js'

  export default {
    name: 'ImageCreate',
    firebase: function () {
      return {
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
        const storageRef = storage.ref()
        const imageRef = storageRef.child('images/' + data.file.name)
        const cleanName = data.file.name.replace('.', '')
        const referenceRef = db.ref('images/' + cleanName)

        imageRef.put(data.file).then(function (snapshot) {
          const metadataKeys = Object.keys(snapshot.metadata)
          let metadata = {}

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

<style scoped>
  .upload-demo {
    display: inline;
  }
</style>
