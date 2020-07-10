<template>
  <div class="card">
    <div class="field">
       <div id="error"
        v-bind:class="isValid ? '' : 'error'">
        {{error}}
      </div>

      <input
        :id="id"
        v-model="updatedValue"
        :value="value"
        :placeholder="label"
        :name="label"
        :type="type"
        class="input"
        @blur="blur()"
        @focus="disableValidationError()"/>
      <label :for="label">{{ label }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextInputComponent',
  props: {
    id: {
      type: String,
      value: ''
    },
    type: {
      type: String,
      value: ''
    },
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      value: ''
    },
    inputValidation: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      isValid: true,
      error: ''
    }
  },

  computed: {
    updatedValue: {
      get () {
        return this.value
      },

      set (value) {
        this.$emit('input', value)
      }
    }
  },

  methods: {

    checkValidation() {
      if (this.inputValidation === true) {
        this.validateField()
      } else {
        return
      }
    },

    validateField () {
      setTimeout(() => {
        if (this.updatedValue === '') {
          this.isValid = false
          this.error = `Please enter valid ${this.label}`
        } else {
          this.isValid = true
        }
      }, 50)
    },

    blur () {
      this.checkValidation()
    },

    disableValidationError () {
      this.error = ''
      this.isValid = true
    }
  }
}
</script>

<style scoped>
</style>
