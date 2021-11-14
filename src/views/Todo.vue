<template>
  <div class="home">
    <field-add-task></field-add-task>
    <list-tasks v-if="$store.state.tasks.length"></list-tasks>
    <no-tasks v-else></no-tasks>
    <done-sorting v-if="$store.state.sorting"></done-sorting>
  </div>
</template>

<script>
export default {
  name: "Todo",

  components: {
    "field-add-task": require("@/components/Todo/FieldAddTask.vue").default,
    "list-tasks": require("@/components/Todo/ListTasks.vue").default,
    "no-tasks": require("@/components/Todo/NoTasks.vue").default,
    "done-sorting": require("@/components/Todo/DoneSorting.vue").default,
  },
};
</script>

