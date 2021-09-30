<template>
  <div>
    <button :type="type">{{ text }}</button>
  </div>
</template>

<style lang="scss" scoped>
button {
  :hover {
    background-color: grey;
  }
}
</style>
