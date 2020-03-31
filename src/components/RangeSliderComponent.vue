<template>
  <div class="card range">
    <div class="label-for">
      <label>{{ label }}</label>
    </div>
    <input
      type="range"
      :id="id"
      :value="value"
      :placeholder="label"
      min="0"
      max="100"
      step="1"
      v-on:input="getValue($event)"
      v-on:change="change($event)"
    />
  </div>
</template>

<script>
export default {
  name: "rangeSliderComponent",
  props: {
    id: {
      type: String
    },
    label: {
      type: String
    },
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      rangeValue: {
        type: Number
      },
      error: ""
    };
  },

  methods: {
    
    getValue(event) {
      let value = Number(event.target.value);
      this.$emit("input", value);
      this.rangeValue = value;
    },
    
    change(event) {
      let value = Number(event.target.value);
      this.$emit("change", value);
      this.rangeValue = value;

    }
  }
};
</script>

<style scoped>
label {
  display: flex;
}
input[type="range"] {
  width: 100%;
  padding: 10px 0;
  outline: none;
}
input[type="range"] {
  -webkit-appearance: none;
  margin: 18px 0;
  width: 100%;
  background-color: transparent;
}
input[type="range"]:focus {
  outline: none;
}
input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 2px;
  cursor: pointer;
  animate: 0.2s;
  /*   box-shadow: 1px 1px 1px #000000, 0 0 1px #0d0d0d; */
  background: midnightblue;
}
input[type="range"]::-webkit-slider-thumb {
  /*   box-shadow: 1px 1px 1px #000000, 0 0 1px #0d0d0d; */
  border: 1px solid #ffffff;
  height: 18px;
  width: 18px;
  border-radius: 9px;
  background: midnightblue;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -8px;
}
input[type="range"]:focus::-webkit-slider-runnable-track {
  background: midnightblue;
  border-color: midnightblue;
}
input[type="range"]::-moz-range-track {
  width: 100%;
  height: 2px;
  cursor: pointer;
  animate: 0.2s;
  /*   box-shadow: 1px 1px 1px #000000, 0 0 1px #0d0d0d; */
  background: midnightblue;
}
input[type="range"]::-moz-range-thumb {
  /*   box-shadow: 1px 1px 1px #000000, 0 0 1px #0d0d0d; */
  border: 1px solid #ffffff;
  height: 18px;
  width: 18px;
  border-radius: 9px;
  background: midnightblue;
  cursor: pointer;
}
input[type="range"]::-ms-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  animate: 0.2s;
  background: transparent;
  border-color: transparent;
  border-width: 16px 0;
  color: transparent;
}
input[type="range"]::-ms-fill-lower {
  background: #2a6495;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  /*   box-shadow: 1px 1px 1px #000000, 0 0 1px #0d0d0d; */
}
input[type="range"]::-ms-fill-upper {
  background: darkgrey;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  /*   box-shadow: 1px 1px 1px #000000, 0 0 1px #0d0d0d; */
}
input[type="range"]::-ms-thumb {
  /*   box-shadow: 1px 1px 1px #000000, 0 0 1px #0d0d0d; */
  border: 1px solid #ffffff;
  height: 18px;
  width: 18px;
  border-radius: 9px;
  background: midnightblue;
  cursor: pointer;
}
input[type="range"]:focus::-ms-fill-lower {
  background: midnightblue;
}
input[type="range"]:focus::-ms-fill-upper {
  background: midnightblue;
}
</style>