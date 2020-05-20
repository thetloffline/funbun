<template>

  <div class="card">
    <div class="field">
      <ul
        :class="{open : openSuggestion, hide : !openSuggestion}"
        class="dropdown-menu">

        <li
          v-for="(suggestion, index) in matches"
          :key="index"
          :class="{'active': isActive(index)}"
          @click="suggestionClick(index)"
          @mousedown.prevent>
          <span class="suggestion">
            {{ suggestion }}
          </span>
        </li>

      </ul>

      <div
        id="error"
        :class="isValid ? '' : 'error'">
        {{ error }}
      </div>

      <input
        v-model="selection"
        :type="type"
        :id="label"
        :name="label"
        :placeholder="label"
        required
        class="input"
        @keydown.enter="enter()"
        @keydown.down="down()"
        @keydown.up="up()"
        @keydown.esc="blur()"
        @input="change()"
        @blur="blur()"
        @focus="disableValidationError()"/>

      <label 
        :for="label">
        {{ label }}
      </label>

    </div>
  </div>
</template>

<script>
export default {
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
    suggestions: {
      type: Array,
      value: ''
    },
    value: {
      type: String,
      value: ''
    }
  },

  data () {
    return {
      open: false,
      startedSelecting: false,
      current: -1,
      isValid: true,
      error: ''
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
      if (this.suggestions !== undefined && this.selection !== '') {
        return this.suggestions.filter(str => {
          if (this.selection.length >= 3) {
            try {
              if (typeof str !== 'string') { return }
              return str.toLowerCase().indexOf(this.selection.toLowerCase()) >= 0
            } catch (error) {
              console.log(error)
            }
          }
        })
      }
    },

    openSuggestion () {
      return (
        this.selection !== '' && this.matches.length !== 0 && this.open === true
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

    disableValidationError () {
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
      if (this.open === true) {
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
      if (this.open === false) {
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
  background-color: midnightblue !important;
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


</style>
