<template>
  <div class="card">
    <div class="field">
      <textarea
        rows="4"
        class="textarea"
        type="text"
        :name="label"
        :id="label"
        :placeholder="label"
        :value="value"
        v-on:input="updateValue($event.target.value)"
      />
      <label :for="label">{{ label }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'textareaComponent',
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
textarea:placeholder-shown + label {
  cursor: text;
  max-width: 66.66%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transform-origin: left bottom;
  transform: translate(0, 2.6rem);
}
textarea::placeholder {
  opacity: 0;
  transition: inherit;
}
textarea:focus {
  
  background-color: #FE727D;
  color: white;
}
textarea:focus::-webkit-textarea-placeholder {
  opacity: 0;
  color: rgba(0, 0, 0, 0);
}
textarea {
  cursor: text;
  height: 1.2rem;
  margin: 4px 0 10px 0;
  padding: 4px;
  border: 0;
  border-radius: 2rem !important;
  background: #E6E6F0;
  padding: 14px  18px 18px 18px;
  outline: none;
  resize: vertical;
  font-size: 18px;
  font-weight: 500;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  border-radius: .2rem;
}
textarea:not(:placeholder-shown) + label,
textarea:focus + label {
  transform: translate(0, 0) scale(1);
  font-size: 14px;
  pointer-events: none;
}
</style>
