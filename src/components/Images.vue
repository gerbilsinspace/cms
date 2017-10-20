<template>
  <v-layout row wrap md6 flex xs12 offset-md3>
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

    <v-flex v-for='image in images' :key='image' xs3>
      <div style='margin: 10px;'>
        <img :src='image' style='
          width: 100%;
          display: block;
        ' />
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      multiple: true,
      fileList: []
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
    }
  }
}
</script>

</style></style>