<template>
  <div>
    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          @click="handleClick(i)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <edit-dialog
      v-if="dialogs.edit"
      :task="task"
      @close="dialogs.edit = false"
    ></edit-dialog>
    <duedate-dialog
      v-if="dialogs.duedate"
      :task="task"
      @close="dialogs.duedate = false"
    ></duedate-dialog>
    <delete-dialog
      v-if="dialogs.delete"
      :task="task"
      @close="dialogs.delete = false"
    ></delete-dialog>
  </div>
</template>

<script>
export default {
  props: ["task"],
  data: () => ({
    items: [
      {
        title: "Edit",
        icon: "mdi-pencil",
        click() {
          this.dialogs.edit = true;
        },
      },
      {
        title: "Pick Date",
        icon: "mdi-calendar",
        click() {
          this.dialogs.duedate = true;
        },
      },
      {
        title: "Delete",
        icon: "mdi-delete",
        click() {
          this.dialogs.delete = true;
        },
      },
    ],
    dialogs: {
      edit: false,
      duedate: false,
      delete: false,
    },
  }),
  methods: {
    handleClick(index) {
      this.items[index].click.call(this);
    },
  },
  components: {
    "edit-dialog": require("@/components/Todo/Dialogs/EditDialog.vue")
      .default,
    "duedate-dialog": require("@/components/Todo/Dialogs/DueDateDialog.vue")
      .default,
    "delete-dialog": require("@/components/Todo/Dialogs/DeleteDialog.vue")
      .default,
  },
};
</script>

<style>
</style>