<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
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
  font-size: 1rem;
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
.error {
  color: #746216;
  /* margin-top: -4px; */
  background-color: #FFE47B;
  animation: slide-right 0.2s ease;
  transition: all 0.2s;
}

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

</style>
