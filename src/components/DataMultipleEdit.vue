<template>
  <v-layout column>
    <v-flex xs12 class='text-xs-center' mt-5>
      <h3>Edit</h3>
    </v-flex>
    <v-flex>
      <v-btn primary v-on:click='onSaveClick'>Save</v-btn>
    </v-flex>
    <v-flex v-for='item in dataset' :key='item.name'>
      <v-text-field
        v-if='item.type === "text"'
        :label='item.name'
        :name='item.name'
        v-model='item.value'
      />
      <v-text-field
        v-if='item.type === "paragraph"'
        :label='item.name'
        :name='item.name'
        v-model='item.value'
        multi-line
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

