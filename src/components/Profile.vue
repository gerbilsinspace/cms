<template>
  <div class="profile">
  	<CMSHeader />
    <main>
    	<h1>Profile</h1>
    	<Logout />
    </main>
  </div>
</template>

<script>
	import CMSHeader from '@/components/CMSHeader.vue'
	import Logout from '@/components/Logout.vue'

	export default {
	  name: 'profile',
	  components: {
	    CMSHeader,
	    Logout
	  }
	}
</script>
