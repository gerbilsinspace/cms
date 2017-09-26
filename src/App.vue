<template>
  <v-app>
    <v-navigation-drawer temporary v-model='sidebar'>
      <v-list>
        <v-list-tile
          v-for='item in menuItems'
          :key='item.title'
          :to='item.path'
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click='userSignOut' v-if='isAuthenticated'>
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Sign Out</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed class='pink lighten-3 text--lighten-1'>
      <span class='hidden-sm-and-up'>
        <v-toolbar-side-icon @click.stop='sidebar = !sidebar' />
      </span>
      <v-toolbar-title>
        <router-link v-if='!isAuthenticated' to='/' tag='span' style='cursor: pointer'>
          {{ appTitle }}
        </router-link>
        <router-link v-else to='/home' tag='span' style='cursor: pointer'>
          {{ appTitle }}
        </router-link>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items class='hidden-xs-only'>
        <v-btn
          flat
          v-for='item in menuItems'
          :key='item.title'
          :to='item.path'
        >
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn flat @click='userSignOut' v-if='isAuthenticated'>
          <v-icon left>exit_to_app</v-icon>
          Sign Out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <main>
      <v-container fluid>
        <router-view />
      </v-container>
    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sidebar: false
      }
    },
    computed: {
      appTitle () {
        return this.$store.getters.appTitle
      },
      isAuthenticated () {
        return (
          (this.$store.getters.getUser !== null) &&
          (this.$store.getters.getUser !== undefined)
        )
      },
      menuItems () {
        if (this.isAuthenticated) {
          return [
            { title: 'Data', path: '/data', icon: 'view_list' },
            { title: 'Images', path: '/images', icon: 'image' },
            { title: 'Content Types', path: '/content-types', icon: 'format_list_bulleted' }
          ]
        } else {
          return [
            { title: 'Sign Up', path: '/signup', icon: 'face' },
            { title: 'Sign In', path: '/signin', icon: 'lock_open' }
          ]
        }
      }
    },
    methods: {
      userSignOut () {
        this.$store.dispatch('userSignOut')
      }
    }
  }
</script>

<style lang='stylus'>
  @import './stylus/main'

  h1 {
    font-size: 40px;
    font-weight: 400;
  }

  h2 {
    font-size: 30px;
  }
</style>
