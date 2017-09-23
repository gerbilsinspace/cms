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
              :value='controls[control.label]'
              @input='onInputChange(control.label, $event)'
            >
              <el-option
                v-for='image in images'
                :key='image[".key"]'
                :label='image.name'
                :value='image.fullPath'
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
            <el-input-number
              v-if='control.controlType === "number"'
              :id="control.label"
              :data-name="control.label"
              :value="controls[control.label]"
              @input='onInputChange(control.label, $event)'
            />
            <el-date-picker
              v-if='control.controlType === "datetime"'
              :id="control.label"
              :data-name="control.label"
              type='datetime'
              :value="controls[control.label]"
              @input='onInputChange(control.label, $event)'
            />
            <el-color-picker
              v-if='control.controlType === "color"'
              :id="control.label"
              :data-name="control.label"
              :value='controls[control.label]'
              @input='onInputChange(control.label, $event)'
            />
            <el-rate
              v-if='control.controlType === "rate"'
              :id='control.label'
              :data-name='control.label'
              :value='controls[control.label]'
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
        images: [],
        error: '',
        controls: {},
        dataLoaded: 0
      }
    },
    components: {
      Sidebar,
      ImageChoice
    },
    methods: {
      populateData: function () {
        const inputData = this.inputData
        const controls = this.contentType.controls

        let shouldSave = false

        delete inputData['.key']
        delete inputData['.value']

        controls.forEach((control) => {
          let controlFound = false

          Object.keys(inputData).forEach((item) => {
            if (control.label === item) {
              controlFound = true
            }
          })

          if (!controlFound) {
            shouldSave = true
            switch (control.controlType) {
              case 'images':
                inputData[control.label] = []
                break
              case 'number':
              case 'rate':
                inputData[control.label] = 0
                break
              default:
                inputData[control.label] = ''
                break
            }
          }
        })

        if (shouldSave) {
          if (this.$route.params.dataId) {
            db.ref('data/' + this.$route.params.contentTypeId + '/' + this.$route.params.dataId).update(inputData)
          } else {
            db.ref('data/' + this.$route.params.contentTypeId).update(inputData)
          }
        }

        this.controls = inputData
      },
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
      onInputChange: function (label, val) {
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
          asObject: true,
          readyCallback: function () {
            this.dataLoaded = this.dataLoaded + 1
          }
        },
        inputData: {
          source: db.ref(inputDataSource),
          asObject: true,
          readyCallback: function () {
            this.dataLoaded = this.dataLoaded + 1
          }
        },
        images: {
          source: db.ref('images'),
          readyCallback: function () {
            this.dataLoaded = this.dataLoaded + 1
          }
        }
      }
    },
    watch: {
      dataLoaded: function () {
        if (this.dataLoaded === 3) {
          this.populateData()
        }
      }
    }
  }
</script>

<style lang='less'>
.el-select {
  display: block;
}
</style>
