<template>
    <el-checkbox :checked="item.done" :label="item.desc"/>
</template>

<script>
export default {
  name: "ToDoListItem",
  props: [
    'item'
  ]
}
</script>

<style>

</style>