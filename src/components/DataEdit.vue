<template>
  <div>
    <Sidebar v-if='$route.params.dataId' />
    <main>
      <h1>{{ $route.params.dataId || $route.params.contentTypeId }} <el-button v-on:click='onSaveClick'>Save</el-button></h1>
      <ul>
        <li v-for='control in contentType.controls'>
          <div v-if="!control.hidden">
            <label :for="control.label">{{control.label}}</label>

            <el-input
              v-if='control.controlType === "textfield"'
              :id="control.label"
              :data-name='control.label'
              :value='controls[control.label]'
              @input='onInputChange(control.label, $event)'
            />
            <el-switch
              v-if='control.controlType === "switch"'
              :name='control.label'
              :id='control.label'
              on-text='Yes'
              off-text='No'
              :value='controls[control.label]'
              @input='onInputChange(control.label, $event)'
            />
            <el-select
              v-if='control.controlType === "images"'
              :id='control.label'
              multiple
              :placeholder='control.label'
              :value='controls[control.label]'
              @input='onInputChange(control.label, $event)'
            >
              <el-option
                v-for='image in images'
                :key='image.name'
                :label='image.name'
                :value='image.downloadURLs[0]'
              />
            </el-select>
            <el-input
              type="textarea"
              autosize
              v-if='control.controlType === "paragraph"'
              :id="control.label"
              :data-name="control.label"
              :value="controls[control.label]"
              @input='onInputChange(control.label, $event)'
            />
          </div>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
  import { db, auth } from '@/firebase'
  import Sidebar from '@/components/Sidebar'
  import ImageChoice from '@/components/ImageChoice'

  export default {
    name: 'DataEdit',
    data: function () {
      return {
        error: '',
        controls: {}
      }
    },
    components: {
      Sidebar,
      ImageChoice
    },
    methods: {
      onSaveClick: function () {
        let controls = this.controls
        delete controls['.key']

        if (this.$route.params.dataId) {
          db.ref('data/' + this.$route.params.contentTypeId + '/' + this.$route.params.dataId).update(this.controls)
          this.$router.push('/data/' + this.$route.params.contentTypeId)
          db.ref('draft/' + auth.currentUser.uid).remove()
        } else {
          db.ref('data/' + this.$route.params.contentTypeId).update(this.controls)
          this.$router.push('/')
          db.ref('draft/' + auth.currentUser.uid).remove()
        }
      },
      inputDataReady: function (val) {
        let values = val.val()

        if (!values) {
          values = {}
          console.log(values)
          const controls = this.contentType.controls

          for (var i = 0; i < controls.length; i++) {
            const control = controls[i]
            let draftValue = ''

            if (control.controlType === 'switch') {
              draftValue = false
            }

            values[control.label] = (draftValue)
          }
        }
        const draft = db.ref('/draft/' + auth.currentUser.uid)

        draft.set(values)

        this.$bindAsObject('controls', db.ref('draft').child(auth.currentUser.uid))
      },
      onInputChange: function (label, val) {
        console.log(val)
        this.controls[label] = val
      }
    },
    firebase: function () {
      let inputDataSource = 'data/' + this.$route.params.contentTypeId

      if (this.$route.params.dataId) {
        inputDataSource = 'data/' + this.$route.params.contentTypeId + '/' + this.$route.params.dataId
      }

      return {
        contentType: {
          source: db.ref('contentType/' + this.$route.params.contentTypeId),
          asObject: true
        },
        inputData: {
          source: db.ref(inputDataSource),
          asObject: true,
          readyCallback: this.inputDataReady
        },
        images: {
          source: db.ref('images')
        }
      }
    }
  }
</script>
