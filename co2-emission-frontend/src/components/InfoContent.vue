<template>
  <div>
    <h1>Informationen über CO²</h1>
    <SearchBar @search="search" @reset="reset" :alignment=alignment type="faq"/>
      <div v-for="faq_elem in faq_data" v-bind:key="faq_elem.id">
        <FaqElement :question="faq_elem.question" :answer="faq_elem.answer" />
      </div>
  </div>
</template>

<script>
import FaqElement from './FaqElement.vue'
import SearchBar from './SearchBar.vue';

export default {
  name: "InfoContent",
  props: ['faq_data', 'alignment'],
  components: {
    FaqElement,
    SearchBar
  },
  methods:{
    reset(target){
      this.$emit('reset', target);
    },
    search(target, text){
      this.$emit('search', target, text);
    }
  }
}
</script>

<style>

</style>