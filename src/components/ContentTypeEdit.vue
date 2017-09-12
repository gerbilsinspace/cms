<template>
  <div>
    <aside>
      <el-menu theme="dark" class="content-type-sidebar">
        <el-radio-group class="buttons" v-model="editing" size="small">
          <el-radio-button label="Add" key="Add">Add</el-radio-button>
          <el-radio-button label="Edit" :disabled="!editingControl.label" key="Edit">Edit</el-radio-button>
        </el-radio-group>
        <el-menu-item-group v-if='editing === "Edit"' :title='editingControlType'>
          <el-menu-item index="1">
            <label :for="editingControlLabel">Name</label>
            <el-input :id="editingControlLabel" v-model="editingControl.label"></el-input>
          </el-menu-item>

          <el-menu-item v-if="!editingControl.locked" index="3">
            <button v-on:click="onEditingControlDeleteClick">Delete</button>
          </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group v-else title='Add'>
          <el-menu-item index="4">
            <div v-on:click="onSingleTextClick">Text</div>
          </el-menu-item>
          <el-menu-item index="5">
            <div v-on:click="onSwitchClick">Switch</div>
          </el-menu-item>
          <el-menu-item index="6">
            <div v-on:click="onImageClick">Image</div>
          </el-menu-item>
        </el-menu-item-group>
      </el-menu>
    </aside>
    <main>
      <div v-if='contentType.name'>
    	  <h1>
          <span>{{ contentType.name }}</span>
          <button v-on:click='onSaveClick'>Save</button>
          <button v-on:click='onDeleteClick'>Delete</button>
        </h1>

        <div v-if='error'>
          <h2>{{error}}</h2>
        </div>
        <ul>
          <li v-for="control in controls">
            <div class="control-container" v-if='control.showInCms'>
              <div class="control-overlay" :data-label="control.label" v-on:click="onControlClick"></div>
              <label :for="control.label">{{ control.label }}</label>
              <el-input v-if='control.controlType === "textfield"' :id="control.label" />
              <el-switch v-if='control.controlType === "switch"' :id="control.label" />
              <ImageChoice
                v-if='control.controlType === "image"'
                :id="control.label"
                :title="control.label"
              />
            </div>
          </li>
        </ul>
      </div>
      <div v-else>
        <h1>Loading</h1>
      </div>
    </main>
  </div>
</template>

<script>
  import { db } from '@/firebase.js'
  import ImageChoice from '@/components/ImageChoice'

  export default {
    name: 'contentTypeEdit',
    data: function () {
      return {
        name: '',
        error: '',
        editing: 'Add',
        editingControl: {},
        controls: []
      }
    },
    components: {
      ImageChoice
    },
    computed: {
      editingName: function () {
        return this.editingControl.label.toLower() || ''
      },
      editingControlLabel: function () {
        return this.editingControl.label + 'ID'
      },
      editingControlType: function () {
        if (this.editingControl.controlType === 'textfield') {
          return 'Text'
        }

        return ''
      }
    },
    mounted: function () {
      var current = this

      db.ref('contentType/' + this.$route.params.contentTypeId)
        .once('value', function (val) {
          const contentType = val.val()

          contentType.controls = contentType.controls || {}
          current.contentType = contentType

          const controlKeys = Object.keys(contentType.controls)
          let controls = []

          for (var i = 0; i < controlKeys.length; i++) {
            controls.push(contentType.controls[controlKeys[i]])
          }

          current.controls = controls
        }
      )
    },
    firebase: function () {
      return {
        contentType: {
          source: db.ref('contentType/' + this.$route.params.contentTypeId),
          asObject: true
        }
      }
    },
    methods: {
      onSaveClick: function () {
        function checkIsMatching (element, id, array) {
          for (var i = 0; i < array.length; i++) {
            if ((id !== i) && (element === array[i].label)) {
              return true
            }
          }

          return false
        }

        for (var i = 0; i < this.controls.length; i++) {
          const isMatching = checkIsMatching(this.controls[i].label, i, this.controls)

          if (isMatching) {
            this.error = 'Please make sure all your Controls are uniquely named'
            return
          }
        }

        db.ref('contentType/' + this.$route.params.contentTypeId + '/controls').set(this.controls)
      },
      onDeleteClick: function () {
        var deleteName = prompt('To make sure you are deleting the correct Content Type, please type "' + this.contentType.name + '".', '')

        if (deleteName === this.contentType.name) {
          db.ref('contentType/' + this.$route.params.contentTypeId).remove()
          this.$router.push('/content-types')
        }
      },
      onControlClick: function (event) {
        const controlKeys = Object.keys(this.controls)

        for (var i = 0; i < controlKeys.length; i++) {
          const control = this.controls[controlKeys[i]]

          if (control.label.toLowerCase() === event.path[0].dataset.label.toLowerCase()) {
            this.editingControl = control
            this.editing = 'Edit'
          }
        }
      },
      onSingleTextClick: function () {
        this.createNewControl('textfield')
      },
      onSwitchClick: function () {
        this.createNewControl('switch')
      },
      onImageClick: function () {
        this.createNewControl('image')
      },
      createNewControl: function (controlType) {
        const newControl = {
          controlType,
          hidden: false,
          label: 'Unnamed',
          locked: false,
          required: false,
          showInCms: true
        }

        this.controls.push(newControl)
        this.editingControl = newControl
        this.editingText = newControl.label
        this.editing = 'Edit'
      },
      onEditingControlDeleteClick: function () {
        console.log('deleting')
      },
      editName: function (event) {
        console.log(event)
      }
    }
  }
</script>

<style lang="less">
  .content-type-sidebar {
    .buttons {
      margin: 20px 30px;
    }
    .el-menu-item-group__title {
      margin-bottom: 5px;
    }

    .el-menu-item {
      height: 32px;
      line-height: 32px;
      margin: 0;

      &:first-child,
      &:last-child {
        margin-left: 0 !important;
        margin-right: 0 !important;
      }
    }
  }
  .control-container {
    position: relative;

    .control-overlay {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 2;
    }
  }
</style>
