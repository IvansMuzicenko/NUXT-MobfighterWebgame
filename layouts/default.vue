<template>
  <div class="background">
    <layouts-the-header></layouts-the-header>
    <nuxt />
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');
* {
  font-family: 'Permanent Marker', cursive;
  padding: 0;
  margin: 0;
  text-decoration: none;
  color: black;
}
.background {
  background: url('/background.jpg');
  background-size: cover;
  opacity: 0.9;
  width: auto;
  overflow: hidden;
  height: 100vh;
}
html {
  background: black;
}
</style>
