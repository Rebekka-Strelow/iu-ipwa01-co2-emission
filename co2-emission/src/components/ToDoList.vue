<template>
    <div v-for="todo in items" v-bind:key="todo.id" :class="{'finished':todo.done}">
        <TodoListItem :item="todo" />
    </div>
</template>

<script>
import TodoListItem from "./ToDoListItem"

export default {
  name: "ToDoList",
  props: [
    'items'
  ],
  components: {
    TodoListItem
  }
}
</script>

<style>

</style>