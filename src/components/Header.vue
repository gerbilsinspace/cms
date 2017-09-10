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

<style>
  header li.el-menu-item.is-active {
    padding: 0;
  }
	header li a {
	  text-decoration: none;
    display: block;
    padding: 0 20px;
	}
</style>
