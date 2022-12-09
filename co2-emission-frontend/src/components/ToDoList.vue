<template>
    <div v-for="todo in items" v-bind:key="todo.id" :class="{'finished':todo.done}">
        <TodoListItem :item="todo" @toggle="toggleListItem" />
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
  },
  methods: {
    toggleListItem(el){
      el.done = !el.done;
    }
  }
}
</script>

<style>

</style>