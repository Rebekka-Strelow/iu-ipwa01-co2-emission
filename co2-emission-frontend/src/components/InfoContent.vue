<template>
  <div>
    <h1>Informationen über CO²</h1>
    <el-collapse>
      <div v-for="faq_elem in faq_data" v-bind:key="faq_elem.id">
        <FaqElement :question="faq_elem.question" :answer="faq_elem.answer" />
      </div>
    </el-collapse>
  </div>
</template>

<script>
import FaqElement from './FaqElement.vue'

export default {
  name: "InfoContent",
  props: ['faq_data'],
  components: {
    FaqElement
  }
}
</script>

<style>

</style>