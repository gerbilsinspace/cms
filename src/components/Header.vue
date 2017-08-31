<template>
  <header>
    <el-menu mode="horizontal">
      <el-menu-item index="1">
        <router-link to="/">Abell Design</router-link>
      </el-menu-item>
    </el-menu>
  </header>
</template>

<script>
	export default {
	  name: 'Header'
	}
</script>

<style scoped>
	a {
	  text-decoration: none;
	}
</style>
