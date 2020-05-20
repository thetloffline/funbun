<template>
  <div class="card">
    <div class="field">
       <div id="error"
        v-bind:class="isValid ? '' : 'error'">
        {{error}}
      </div>

      <input
        :id="label"
        v-model="updatedValue"
        :value="value"
        :placeholder="label"
        :name="label"
        :type="type"
        required
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

    validateField () {
      setTimeout(() => {
        if (this.updatedValue === '') {
          this.isValid = false
          this.error = `Please enter ${this.label}`
        } else {
          this.isValid = true
        }
      }, 50)
    },

    blur () {
      this.validateField()
    },

    disableValidationError () {
      this.error = ''
      this.isValid = true
    }
  }
}
</script>

<style scoped>
/* INPUT */
.field {
  display: flex;
  flex-direction: column-reverse;
}
label {
  display: flex;
  height: 1.4rem;
  transition: all 0.2s;
  touch-action: manipulation;
}
input:placeholder-shown + label {
  cursor: text;
  max-width: 66.66%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transform-origin: left bottom;
  transform: translate(0, 2.5rem);
}
input::placeholder {
  opacity: 0;
  transition: inherit;
}
input:focus::-webkit-input-placeholder {
  opacity: 0;
  color: rgba(0, 0, 0, 0);
}
input[type="text"]:focus,
input[type="number"]:focus {
  background-color: #F7F7FA;
}
input[type="text"],
input[type="number"] {
  cursor: text;
  width: 96%;
  height: 40px;
  margin-bottom: 10px;
  margin-top: 4px;
  padding: 4px 0 4px 4%;
  border: 0;
  border-bottom: 2px solid #ABABCB;
  outline: none;
  font-size: 18px;
  color: midnightblue;
  transition: all 0.2s;
}
input:not(:placeholder-shown) + label,
input:focus + label {
  transform: translate(0, 0) scale(1);
  font-size: 14px;
  cursor: pointer;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
