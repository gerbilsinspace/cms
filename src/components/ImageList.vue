<template>
  <div class="content-types">
    <CMSHeader />
    <main>
      <div>
        <h1>Images</h1>

        <div>
          <h2>Upload Image</h2>
          <el-upload
            class="upload-demo"
            action=""
            :multiple="multiple"
            :http-request="handleUpload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList">
            <el-button size="small" type="primary">Click to upload</el-button>
            <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
          </el-upload>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import { db } from '@/firebase.js'
  import CMSHeader from '@/components/CMSHeader.vue'
  import GridItem from '@/components/GridItem'

  export default {
    name: 'ImageList',
    components: {
      GridItem,
      CMSHeader
    },
    firebase: function () {
      return {
        contentTypes: db.ref('contentType/')
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
        console.log(data)
      },
      handlePreview: function (file) {
        console.log(file)
      },
      handleRemove: function (file, fileList) {
        console.log(file, fileList)
      }
    }
  }
</script>
