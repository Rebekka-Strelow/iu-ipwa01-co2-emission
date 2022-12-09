<template>
    <el-checkbox :checked="item.done" :label="item.desc" :id="item.id" @change="toggleItem"/>
</template>

<script>
export default {
  name: "ToDoListItem",
  props: [
    'item'
  ],
  methods: {
    toggleItem(){
      this.$emit('toggle', this.item)
    }
  }
}
</script>

<style>

</style>