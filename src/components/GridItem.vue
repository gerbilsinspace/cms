<template>
  <div class="dashboard-grid-item">
    <h2>{{title}}</h2>
  </div>
</template>

<script>
	export default {
	  name: 'dashboard-grid-item',
	  props: [
	    'title'
	  ],
	  data () {
	    return {}
	  }
	}
</script>

<style scoped>
	.dashboard-grid-item {
		width: 200px;
		height: 150px;
		border: 2px solid #35495E;
		margin: 20px;
		float: left;
	}
</style>