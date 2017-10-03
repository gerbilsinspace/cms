<template>
  <v-layout column>
    <v-flex xs12 class='text-xs-center' mt-5>
      <h3>Edit</h3>
    </v-flex>
    <v-flex>
      <v-btn primary v-on:click='onSaveClick'>Save</v-btn>
    </v-flex>
    <v-flex v-for='item in dataset' :key='item.name'>
      <label v-if='item.type !== "images"'>{{item.name}}</label>
      <br />
      <el-input
        v-if='item.type === "text"'
        :name='item.name'
        v-model='item.value'
      />
      <el-input
        v-if='item.type === "paragraph"'
        :name='item.name'
        v-model='item.value'
        type='textarea'
      />
      <el-input-number
        v-if='item.type === "number"'
        v-model='item.value'
      />
      <el-switch
        v-if='item.type === "switch"'
        v-model='item.value'
      />
      <el-date-picker
        v-if='item.type === "date-time"'
        :value='item.value'
        @input='onDateTimeChange(item, $event)'
        type='datetime'
      />
      <el-color-picker
        v-if='item.type === "color"'
        v-model='item.value'
      />
      <v-select
        v-if='item.type === "images"'
        :items='images'
        v-model='item.value'
        :label='item.name'
        multiple
      />
      <el-rate
        v-if='item.type === "rate"'
        v-model='item.value'
      />
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  computed: {
    name () {
      return this.$route.params.dataId
    },
    itemName () {
      return this.$route.params.dataItemId
    },
    items () {
      return this.$store.getters.getData[this.name] || {
        items: {}
      }
    },
    item () {
      return this.items.items[this.$route.params.dataItemId] || {
        dataset: {}
      }
    },
    dataset () {
      return this.item.dataset
    },
    images () {
      const imageData = this.$store.getters.getImageData
      let images = []

      for (let key in imageData) {
        const image = imageData[key]
        images.push({ text: image })
      }

      return images
    }
  },
  methods: {
    onSaveClick () {
      this.$store.dispatch('setMultipleItemData', {
        name: this.name,
        itemName: this.itemName,
        dataset: this.dataset
      })
    },
    onDateTimeChange (item, event) {
      item.value = event.getTime()
    }
  }
}
</script>

