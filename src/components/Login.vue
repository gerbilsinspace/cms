<template>
  <main>
    <div class="login">
      <h1>Login</h1>
      <div>
        <label for="email">Email: </label>
        <input id='email' type='email' v-model.trim="email" placeholder="Email">
      </div>
      <div>
        <label for="password">Password: </label>
        <input id="password" type='password' v-model.trim="password" placeholder="Password">
      </div>
      <button v-on:click='onLoginClick'>Login</button>
    </div>
  </main>
</template>

<script>
  import { isEmail } from 'validator'
  import { auth } from '@/firebase'

  export default {
    name: 'login',
    data () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      onLoginClick: function () {
        if (!this.email) {
          this.error = 'Please enter an email.'
        } else if (!isEmail(this.email)) {
          this.error = 'Please enter a valid email.'
        } else if (!this.password) {
          this.error = 'Please enter a password.'
        } else {
          this.error = ''
        }

        if (this.error === '') {
          auth.signInWithEmailAndPassword(this.email, this.password).catch(function (error) {
            this.error = error.message
          })
        }
      }
    }
  }
</script>
