<template>
  <aside>
    <el-menu theme="dark">
      <el-menu-item-group title="Data">
        <el-menu-item index="1" v-for="contentType in contentTypes" :key="contentType['.key']">
          <router-link :to="{ path: `/data/${contentType['.key']}` }">{{ contentType.name }}</router-link>
        </el-menu-item>
      </el-menu-item-group>

      <el-menu-item-group title="Media">
        <el-menu-item index="1">
          <router-link to="/images">Images</router-link>
        </el-menu-item>
      </el-menu-item-group>

      <el-menu-item-group title="Content Types">
        <el-menu-item index="1">
          <router-link to="/content-types">Create Content Type</router-link>
        </el-menu-item>
        <el-menu-item index="1" v-for="contentType in contentTypes" :key="contentType['.key']">
          <router-link :to="{ path: `/content-types/${contentType['.key']}` }">Edit {{ contentType.name }}</router-link>
        </el-menu-item>
      </el-menu-item-group>

      <el-menu-item-group title="Other">
        <el-menu-item index="1">
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

<style lang="less">
  .el-menu.el-menu--dark {
    li {
      margin: 0;
    }

    .el-menu-item-group__title {
      padding: 20px 10px 5px;
    }

    .el-menu-item,
    .el-menu-item:first-child,
    .el-menu-item:last-child {
      margin: 0;
      height: 30px;
      line-height: 30px;
    }

    .el-menu-item a {
      display: block;
    }
  }
</style>
