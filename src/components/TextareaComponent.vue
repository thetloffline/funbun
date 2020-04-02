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
  name: "textareaComponent",
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
    updateValue: function(value) {
      this.$emit("input", value);
    }
  }
};
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
textarea:placeholder-shown + label {
  cursor: text;
  max-width: 66.66%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transform-origin: left bottom;
  transform: translate(0, 2.5rem);
}
textarea::placeholder {
  opacity: 0;
  transition: inherit;
}
textarea:focus {
  background-color: #F7F7FA;
}
textarea:focus::-webkit-textarea-placeholder {
  opacity: 0;
  color: rgba(0, 0, 0, 0);
}
textarea {
  cursor: text;
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
  margin-top: 4px;
  padding: 4px;
  border: 0;
  border-bottom: 2px solid #ABABCB;
  outline: none;
  resize: vertical;
  font-size: 18px;
  color: midnightblue;
}
textarea:not(:placeholder-shown) + label,
textarea:focus + label {
  transform: translate(0, 0) scale(1);
  font-size: 14px;
  cursor: pointer;
}
</style>
