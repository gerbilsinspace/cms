<template>
  <button v-on:click='onLogoutClick'>Logout</button>
</template>

<script>
  import { auth } from '@/firebase'

  export default {
    name: 'logout',
    data () {
      return {
        title: 'Logout',
        email: '',
        password: ''
      }
    },
    methods: {
      onLogoutClick: function () {
        auth.signOut()
      }
    }
  }
</script>
