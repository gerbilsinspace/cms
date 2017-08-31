<template>
  <div class="profile">
  	<Header />
    <main>
    	<h1>Profile</h1>
    	<Logout />
    </main>
  </div>
</template>

<script>
	import Header from '@/components/Header.vue'
	import Logout from '@/components/Logout.vue'

	export default {
	  name: 'profile',
	  components: {
	    Header,
	    Logout
	  }
	}
</script>
