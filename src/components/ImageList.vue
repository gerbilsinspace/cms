<template>
  <div>
    <Sidebar />
    <main>
      <ImageCreate />
      <div>
        <h2>List of Images</h2>
        <ul class="image-list">
          <li v-for="image in images">
            <img style="max-width: 150px; max-height: 150px" :src="image.downloadURLs[0]" />
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

<style lang="less">
.image-list {
  &:after {
    display: block;
    content: " ";
    clear: both;
  }
  li {
    float: left;
    height: 150px;
    width: 150px;
    vertical-align: middle;
    text-align: center;
  }
}

</style>
