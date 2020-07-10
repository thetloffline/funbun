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
  background-image: linear-gradient(to right, #f6f9fc , #f6f3fc);
  /* background-image: linear-gradient(#2828B8, #3E3EAD); */
  margin: auto;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-weight: 500;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: darkslategray;
  /* color: midnightblue; */
}
h1 {
  font-family: "Poppins";
  font-size: 2.8rem;
  line-height: 3.4rem;
}
h2 {
  font-family: "Poppins";
  font-size: 2rem;
  line-height: 2.8rem;
}
h3 {
  display: flex;
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0;
}
h5 {
  font-size: .7rem;
  font-weight: 700;
  margin: 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 1rem;
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
  font-size: 1.1rem;
  font-weight: 500;
  transition: 0.1s all;
  cursor: pointer;
  outline: 0;
}
.btn-container {
  display: flex;
  margin: .4rem 0;
  transition: .5s all;
  width: 100%;
  justify-content: center;
}
.btn-form {
  margin: 0;
  height: 60px;
  width: 100%;
}
.btn-primary {
  background-image: linear-gradient(#fd5088, #fe515c);
  /* background-image: linear-gradient(#2828B8, #3E3EAD); */
  box-shadow: 0 10px 20px rgba(254, 81, 9, 0.3);
  color: white;
  outline: 0;
}
.btn-primary:hover {
  box-shadow: 0 1px 2px rgba(254, 81, 9, 0.3);
}
.btn-primary:active {
  background-color: #42428a;
  box-shadow: 0 0 0 rgba(254, 81, 9, 0.3);
}
.btn-transparent {
  font-size: 1.1rem;
  background-color: rgba(0, 0, 0, 0);
  color: darkslategray;
  border: none !important;
}
.btn-transparent:hover {
  background-image: none !important;
  /* color: #42428a !important; */
}
button:active,
.btn-transparent:active,
.btn-sort:active,
.btn-card:active {
  outline: none;
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
  background-image: linear-gradient(#fd505d);
  /* background-image: linear-gradient(#2828B8, #3E3EAD); */
  color: white;
  font-size: 3rem;
  font-weight: 400;
}
.btn-round:active {
  background-color: #fd505d;
}
.container-card-btns {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: -.6rem 0 1rem ;
}
.btn-card {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0 1.6rem;
  justify-content: center;
}
.btn-card:hover {
  color: white !important;
  background-image: linear-gradient(#fe515c);
}
.error {
  /* color: midnightblue; */
  /* color: #746216; */
  margin: 0 8px;
  border-radius: 2rem;
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
  padding-left: 12px;
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
  background-image: linear-gradient( #fe515c);
  color: white;
}
input[type="text"],
input[type="number"] {
  cursor: text;
  width: 96%;
  height: 40px;
  margin: 4px auto 10px;
  padding: 4px 0 4px 5%;
  border: 0;
  background: #E6E6F0;
  border-radius: 2rem;
  outline: none;
  font-size: 18px;
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
  transition: opacity 1.75s;
  /* transition-delay: .25s; */
}
.fade-leave-active {
  transition: opacity 0.0s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

/* SLIDE TRANSITION*/
.slide-enter {
  opacity: 0;
  transform: scale3d(.8, 1, 1) translate3d(100px, 0, 0);
}

.slide-enter-to { transform: scale3d(1, 1, 1); }
.slide-enter-active { 
  transition: 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55); 
  transition-delay: .15s;
   }
.slide-leave-active {
  transition: 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transition-delay: .15s;

}
.slide-leave { transform: scale3d(1, 1, 1); }

.slide-leave-to {
  opacity: 0;
  transform: scale3d(1, 1, 1) translate3d(-180px, 0, 0);
}

</style>
