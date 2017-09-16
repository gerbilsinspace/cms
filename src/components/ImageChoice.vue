<template>
  <ul class="image-choice">
    {{ images }}
    <li
      v-for="image in images"
      :value='image.name'
      :class='{selected: image.name === selected}'
      @click='handleClick'
      :data-value='image.name'
    >
      {{ image.name }}
    </li>
  </ul>
</template>

<script>
  import { db } from '@/firebase.js'

  export default {
    name: 'ImageChoice',
    firebase: function () {
      return {
        images: db.ref('images/')
      }
    },
    props: [
      'title',
      'selected'
    ],
    methods: {
      handleClick: function (e) {
        this.$emit('click', e.path[0].dataset.value)
      }
    }
  }
</script>

<style lang='less'>
  .image-choice {
    border: 1px solid #ddd;
    padding: 10px;

    li {
      margin: 0;
      padding: 0;
      cursor: pointer;

      &.selected {
        color: #20a0ff;
      }
    }
  }
</style>
