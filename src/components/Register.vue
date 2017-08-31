<template>
  <div>
    <Header />
    <main>
      <div class="register">
        <h1>Register</h1>
        <div>{{error}}</div>
        <div>
          <label for="email">Email: </label>
          <input id='email' type='email' v-model.trim="email" placeholder="Email">
        </div>
        <div>
          <label for="password">Password: </label>
          <input id="password" type='password' v-model.trim="password" placeholder="Password">
        </div>
        <div>
          <label for="confirmPassword">Confirm Password: </label>
          <input id="confirmPassword" type='password' v-model.trim="confirmPassword" placeholder="Confirm Password">
        </div>
        <button v-on:click='onRegisterClick'>Register</button>
      </div>
    </main>
  </div>
</template>

<script>
  import { isEmail } from 'validator'
  import { auth } from '@/firebase'
  import Header from '@/components/Header'

  export default {
    name: 'register',
    components: {
      Header
    },
    data () {
      return {
        email: '',
        password: '',
        confirmPassword: '',
        error: ''
      }
    },
    methods: {
      onRegisterClick: function () {
        if (!this.email) {
          this.error = 'Please enter an email.'
        } else if (!isEmail(this.email)) {
          this.error = 'Please enter a valid email.'
        } else if (!this.password) {
          this.error = 'Please enter a password.'
        } else if (!this.confirmPassword) {
          this.error = 'Please enter your password a second time.'
        } else if (this.password !== this.confirmPassword) {
          this.error = 'Your passwords do not match'
        } else {
          this.error = ''
        }

        if (this.error === '') {
          auth.createUserWithEmailAndPassword(this.email, this.password).catch(function (error) {
            this.error = error.message
          })
        }
      }
    }
  }
</script>

