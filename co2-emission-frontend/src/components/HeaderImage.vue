<template>
  <div class="container">
    <img class="image" src=".././assets/logo-white.png" alt="Logo der Website">
  </div>
</template>

<script>
export default {
  name: "HeaderImage"
}

</script>

<style scoped>
.image {
  margin-left: 2vw;
  margin-right: 2vw;
  margin-top: 1vh;
  margin-bottom: 1vh;
  width: 50vw;
  max-height: 15vh;
  object-fit: contain;
  object-position: left;
}
</style>