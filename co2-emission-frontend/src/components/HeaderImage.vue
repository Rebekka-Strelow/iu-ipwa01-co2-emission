<template>
  <div class="container">
    <!-- LTR Alignment-->
    <img v-if="this.alignment == 'ltr'" class="image ltr" src=".././assets/logo-white.png" alt="Logo der Website">

    <!--RTL Alignment -->
    <img v-if="this.alignment == 'rtl'" class="image rtl" src=".././assets/logo-white-rtl.png" alt="Logo der Website">
  </div>
</template>

<script>
export default {
  name: "HeaderImage",
  props: [
    'alignment'
  ]
}

</script>

<style scoped>
.image {
  margin-left: 2vw;
  margin-right: 2vw;
  margin-top: 1vh;
  margin-bottom: 1vh;
  width: calc(100% - 4vw);
  max-height: 15vh;
  object-fit: contain;
}

.ltr {
  object-position: left;
}

.rtl{
  object-position: right;
}


.flex-grow{
  flex-grow: 1;
}
</style>