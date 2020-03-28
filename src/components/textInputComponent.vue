<template>
  <div class="card">
    <div class="field">
      <input
        class="input"
        type='text'
        required
        :name="label"
        :id="label"
        :placeholder="label"
        :value='value'
        v-on:input="updateValue($event.target.value)"
      />
      <label :for="label">
          {{ label }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'textInputComponent',
  props: {
    id: {
      type: String
    },
    label: {
      type: String,
      required: true
    },
    value: {
      type: String
    }
  },
  methods: {
    updateValue: function (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style scoped>
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
input:placeholder-shown+label {
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
  color: rgba(0, 0, 0, 0)
}
input[type='text']{
  cursor: text;
  width: 100%;
  height: 40px;
  margin: 4px auto 10px;
  padding: 4px;
  border: 0;
  border-bottom: 2px solid midnightblue;
  outline: none;
  font-size: 18px;
  color: midnightblue;
  transition: all 0.2s;
}
input:not(:placeholder-shown) + label, input:focus + label {
  transform: translate(0, 0) scale(1);
  font-size: 14px;
  cursor: pointer;
}
</style>
