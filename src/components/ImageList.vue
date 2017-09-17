<template>
  <div>
    <Sidebar />
    <main>
      <ImageCreate />
      <div>
        <h2>List of Images</h2>
        <ul class="image-list">
          <li v-for='url in imageURLs'>
            <img :src='url' />
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
  import { db, storage } from '@/firebase.js'
  import ImageCreate from '@/components/ImageCreate'
  import Sidebar from '@/components/Sidebar'

  export default {
    name: 'ImageList',
    data: function () {
      return {
        imageURLs: [],
        imagesReady: false
      }
    },
    components: {
      Sidebar,
      ImageCreate
    },
    firebase: function () {
      return {
        images: {
          source: db.ref('images/'),
          readyCallback: function () {
            this.imagesReady = true
          }
        }
      }
    },
    watch: {
      imagesReady: function () {
        let urls = []
        for (var i = 0; i < this.images.length; i++) {
          const fullPath = this.images[i].fullPath

          storage.ref(fullPath).getDownloadURL().then((url) => {
            urls.push(url)

            if (i === this.images.length) {
              this.imageURLs = urls
            }
          })
        }
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

    img {
      width: 100%;
    }
  }
}

</style>
