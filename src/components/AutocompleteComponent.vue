<template>
  <div class="card">
    <div class="field">
      <ul class="dropdown-menu" v-bind:class="{open : openSuggestion, hide : !openSuggestion}">
        <li
          v-for="(suggestion, index) in matches"
          :key="index"
          v-bind:class="{'active': isActive(index)}"
          @click="suggestionClick(index)"
          @mousedown.prevent
        >
          <span class="suggestion">{{ suggestion }}</span>
        </li>
      </ul>

      <div id="error"
        v-bind:class="isValid ? '' : 'error'">
        {{error}}
      </div>

      <input
        class="input"
        :type="type"
        required
        :name="label"
        :id="label"
        :placeholder="label"
        v-model="selection"
        @keydown.enter="enter()"
        @keydown.down="down"
        @keydown.up="up"
        @keydown.esc="blur"
        @input="change"
        @blur="blur()"
        @focus="disableError()"

      />
      <label :for="label">{{ label }}</label>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  data () {
    return {
      open: false,
      startedSelecting: false,
      current: -1,
      isValid: true,
      error: ''
    }
  },

  props: {
    id: {
      type: String
    },

    type: {
      type: String
    },

    label: {
      type: String,
      required: true
    },

    suggestions: {
      type: Array,
      required: true
    },

    value: {
      type: String
    }
  },

  computed: {
    selection: {
      get () {
        return this.value
      },

      set (value) {
        this.$emit('input', value)
      }
    },

    matches () {
      return this.suggestions.filter(str => {
        if (this.selection === '' || this.selection === undefined) {
          return
        }

        if (this.selection.length >= 3) {
          return str.toLowerCase().indexOf(this.selection.toLowerCase()) >= 0
        }
      })
    },

    openSuggestion () {
      return (
        this.selection !== '' && this.matches.length != 0 && this.open === true
      )
    }
  },

  methods: {

    validateField () {
      setTimeout(() => {
        if (this.selection === '') {
          this.isValid = false
          this.error = `Please enter ${this.label}`
        } else {
          this.isValid = true
        }
      }, 50)
    },

    disableError () {
      this.error = ''
      this.isValid = true
    },

    blur () {
      this.open = false
      this.startedSelecting = false
      this.validateField()
    },

    enter () {
      if (this.matches.length === 0) {
        this.focusInput()
        return
      }

      if (this.startedSelecting) {
        this.selection = this.matches[this.current]
      }

      this.focusInput()
      this.open = false
    },

    up () {
      if (this.current > 0) this.current--
    },

    down () {
      if (this.open == true) {
        this.startedSelecting = true
      }

      if (this.current < this.matches.length - 1) {
        this.current++
      }
    },

    isActive (index) {
      if (this.startedSelecting === true) {
        return index === this.current
      }
    },

    change () {
      if (this.open == false) {
        this.open = true
        this.current = -1
      }
    },

    suggestionClick (index) {
      this.selection = this.matches[index]
      this.open = false
      this.focusInput()
    }
  }
}
</script>

<style scoped>
.open {
  display: flex;
  flex-direction: column;
}
.hide {
  display: none;
}
li {
  cursor: pointer;
  margin: 3px 0;
}
li:nth-child(even) {
  background-color: #F7F7FA;
}
li:hover,
li:focus,
li:active {
  background-color: midnightblue;
  color: white;
}
.active {
  background-color: midnightblue;
  color: white;
}
.suggestion {
  font-size: 1.2rem;
  font-weight: 500;
  display: flex;
}
ul {
  margin: 0;
  color: midnightblue;
}

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
