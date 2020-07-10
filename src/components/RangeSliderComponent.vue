<template>
  <div class="card range">
    <div class="label-for">
      <label>{{ label }}</label>
    </div>
    <input
      :id="id"
      :value="value"
      :placeholder="label"
      type="range"
      min="0"
      max="100"
      step="1"
      @input="getValue($event)"
      @change="change($event)"/>
  </div>
</template>

<script>
export default {
  name: 'rangeSliderComponent',
  props: {
    id: {
      type: String,
      value: ''
    },
    label: {
      type: String,
      value: ''
    },
    value: {
      type: Number,
      value: 0,
      required: true
    }
  },
  data () {
    return {
      rangeValue: 0,
      error: ''
    }
  },

  methods: {

    getValue (event) {
      let value = Number(event.target.value)
      this.$emit('input', value)
      this.rangeValue = value
    },

    change (event) {
      let value = Number(event.target.value)
      this.$emit('change', value)
      this.rangeValue = value
    }
  }
}
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
  background: lavender;

}
input[type="range"]::-webkit-slider-thumb {
  border: 4px solid #ffffff;
  height: 26px;
  width: 26px;
  border-radius: 13px;
  background: #fe515c;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -13px;
}
input[type="range"]:focus::-webkit-slider-runnable-track {
  background: lavender;
  border-color: #fe515c;
}
input[type="range"]::-moz-range-track {
  width: 100%;
  height: 2px;
  cursor: pointer;
  animate: 0.2s;
  background: lavender;
}
input[type="range"]::-moz-range-thumb {
  border: 4px solid #ffffff;
  height: 18px;
  width: 18px;
  border-radius: 15px;
  background: #fe515c;
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
  background: #fe515c;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
}
input[type="range"]::-ms-fill-upper {
  background: darkgrey;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
}
input[type="range"]::-ms-thumb {
  border: 1px solid #ffffff;
  height: 18px;
  width: 18px;
  border-radius: 9px;
  background: #fe515c;
  cursor: pointer;
}
input[type="range"]:focus::-ms-fill-lower {
  background: #fe515c;
}
input[type="range"]:focus::-ms-fill-upper {
  background: #fe515c;
}
</style>
