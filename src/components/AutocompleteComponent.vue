<template>
  <div class="card">
    <div class="field">
      <ul class="dropdown-menu" v-bind:class="{open : openSuggestion, hide : !openSuggestion}">
        <li
          v-for="(suggestion, index) in matches"
          :key="index"
          v-bind:class="{'active': isActive(index)}"
          @click="suggestionClick(index)"
        >
          <span class="suggestion">{{ suggestion }}</span>
        </li>
      </ul>
      <input
        class="input"
        type="text"
        required
        :name="label"
        :id="label"
        :placeholder="label"
        v-model="selection"
        @keydown.enter="enter"
        @keydown.down="down"
        @keydown.up="up"
        @input="change"
      />
      <label :for="label">{{ label }}</label>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {
      open: false,
      current: 0
    };
  },

  props: {
    id: {
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

    value: ""
  },

  computed: {
    selection: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },
    matches() {
      return this.suggestions.filter(str => {
        return str.indexOf(this.selection) >= 0;
      });
    },

    openSuggestion() {
      return (
        this.selection !== "" && this.matches.length != 0 && this.open === true
      );
    }
  },

  methods: {
  
    enter() {
      this.selection = this.matches[this.current];
      this.open = false;
    },

    up() {
      if (this.current > 0) this.current--;
    },

    down() {
      if (this.current < this.matches.length - 1) this.current++;
    },

    isActive(index) {
      return index === this.current;
    },

    change() {
      if (this.open == false) {
        this.open = true;
        this.current = 0;
      }
    },

    suggestionClick(index) {
      this.selection = this.matches[index];
      this.open = false;
    }
  }
};
</script>

<style scoped>
.open {
  display: flex;
  flex-direction: column;
}
.hide {
  display: none;
}
.dropdown-menu {
}
li {
  cursor: pointer;
}
li:hover, li:focus, li:active {
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
input[type="text"] {
  cursor: text;
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
  margin-top: 4px;
  padding: 4px;
  border: 0;
  border-bottom: 2px solid midnightblue;
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
</style>