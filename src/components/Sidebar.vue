<template>
  <aside>
    <el-menu theme="dark">
      <el-menu-item-group title="Data">
        <el-menu-item v-for="contentType in contentTypes" :key="contentType['.key']">
          <router-link :to="{ path: `/data/${contentType['.key']}` }">{{ contentType.name }}</router-link>
        </el-menu-item>
      </el-menu-item-group>

      <el-menu-item-group title="Media">
        <el-menu-item>
          <router-link to="/images">Images</router-link>
        </el-menu-item>
      </el-menu-item-group>

      <el-menu-item-group title="Content Types">
        <el-menu-item>
          <router-link to="/content-types">Create Content Type</router-link>
        </el-menu-item>
        <el-menu-item v-for="contentType in contentTypes" :key="contentType['.key']">
          <router-link :to="{ path: `/content-types/${contentType['.key']}` }">{{ contentType.name }}</router-link>
        </el-menu-item>
      </el-menu-item-group>

      <el-menu-item-group title="Other">
        <el-menu-item>
          <router-link to="/profile">Profile</router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-menu>
  </aside>
</template>

<script>
import { db } from '@/firebase.js'

export default {
  name: 'Sidebar',
  firebase: function () {
    return {
      contentTypes: db.ref('contentType/')
    }
  }
}
</script>

<style>
  aside {
  }
</style>
