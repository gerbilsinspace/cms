<template>
  <div>
    <Sidebar />
    <main>
      <ImageCreate />
      <div>
        <h2>List of Images</h2>
        <ul>
          <li v-for="image in images">
            <img style="max-width: 150px; max-height: 150px" :src="image.downloadURLs[0]" />
            <span>{{ image.name }}</span>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
  import { db } from '@/firebase.js'
  import ImageCreate from '@/components/ImageCreate'
  import Sidebar from '@/components/Sidebar'

  export default {
    name: 'ImageList',
    components: {
      Sidebar,
      ImageCreate
    },
    firebase: function () {
      return {
        images: db.ref('images/')
      }
    }
  }
</script>
