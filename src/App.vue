<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Poppins:800&display=swap");
</style>

<style>
html {
  background: #f6f9fc;
  margin: auto;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-weight: 500;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: midnightblue;
}
h1,
h2 {
  font-family: "Poppins";
  font-size: 2.8rem;
  line-height: 3rem;
}
h2 {
  font-size: 2.4rem;
}
h3 {
  display: flex;
  font-size: 1.5em;
  font-weight: 700;
  color: midnightblue;
  margin: 0;
}
h5 {
  font-size: .9rem;
  font-weight: 400;
  margin: 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #ff715b;
}
p {
}
.section-header {
  width: 260px;
  margin: 0 auto 30px;
}
button {
  border-style: none;
  border-radius: 3rem;
  padding: 18px;
  color: white;
  font-size: 1.4rem;
  font-weight: 500;
  transition: 0.1s all;
  cursor: pointer;
  outline: 0;
}
.btn-container {
  display: flex;
  margin: 10px 0 10px 0;
}
.btn-form {
  margin: 0;
  height: 60px;
  width: 100%;
}
.btn-primary {
  background-color: midnightblue;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  outline: 0;
}
.btn-primary:hover {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}
.btn-primary:active {
  background-color: #42428a;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0.3);
}
.btn-transparent {
  background-color: rgba(0, 0, 0, 0);
  color: midnightblue;
  border: none !important;
}
.btn-transparent:active,
.btn-sort:active,
.btn-card:active {
  outline: 0;
}
.btn-transparent:hover {
  background-color: white;
}
.btn-round {
  display: flex;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  margin: auto;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: midnightblue;
  color: white;
  font-size: 3rem;
  font-weight: 400;
}
.btn-round:active {
  background-color: #42428a;
}
.container-card-btns {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 16px 0;
}
.btn-card {
  padding: 12px 18px;
  color: midnightblue;
  background-color: white;
  border: solid 1px midnightblue;
  font-size: 1rem;
}
.btn-card:hover {
  border: solid 1px #5063F7;
  color: #5063F7;
}
.btn-card:active {
  /* box-shadow: -1px 2px 0 midnightblue; */
  transition: 0.2s all;
  outline: none;
}
.error {
  color: #746216;
  /* margin-top: -4px; */
  background-color: #FFE47B;
  animation: slide-right 0.2s ease;
  transition: all 0.2s;
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
  pointer-events: none;
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

/* ANIMATION */
@keyframes slide-right {
  0% {
    opacity: 0;
    transform: translateX(-90px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

/* FADE TRANSITION */
.fade-enter-active {
  transition: opacity .75s;
}
.fade-leave-active {
  transition: opacity 0.0s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
