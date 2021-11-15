<template>
  <v-text-field
    class="field-add-task pa-3"
    outlined
    placeholder="Append"
    hide-details
    clearable
    v-model="newTaskTitle"
    @keyup.enter="addTask"
  >
    <template v-slot:append>
      <v-icon :disabled="newTaskTitleInvalid">
        mdi-plus
      </v-icon>
    </template>
  </v-text-field>
</template>

<script>
export default {
  data() {
    return {
      newTaskTitle: "",
    };
  },
  computed: {
    newTaskTitleInvalid() {
      return !this.newTaskTitle;
    },
  },
  methods: {
    addTask() {
      if (!this.newTaskTitleInvalid) {
        this.$store.dispatch("addTask", this.newTaskTitle);
        this.newTaskTitle = "";
      }
    },
  },
};
</script>

<style lang="sass">
.field-add-task.v-input--is-focused
  .v-input__slot
    background: rgba(32,99,134,0.5) !important
</style>
