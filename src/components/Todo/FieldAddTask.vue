<template>
  <v-text-field
    class="pa-3"
    outlined
    label="Append"
    append-icon="mdi-plus"
    hide-details
    clearable
    v-model="newTaskTitle"
    @click:append="addTask"
    @keyup.enter="addTask"
  ></v-text-field>
</template>

<script>
export default {
  data() {
    return {
      newTaskTitle: "",
    };
  },
  methods: {
    addTask() {
      this.$store.dispatch("addTask", this.newTaskTitle);
      this.newTaskTitle = "";
    },
  },
};
</script>
