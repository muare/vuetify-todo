<template>
  <v-list class="pa-0" flat>
    <task
      v-for="task in $store.getters.taskFiltered"
      :key="task.id"
      :task="task"
    >
    </task>
  </v-list>
</template>

<script>
export default {
  components: {
    task: require("@/components/Todo/Task.vue").default,
  },
};
</script>
