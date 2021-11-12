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
          console.log("click edit");
        },
      },
      {
        title: "Pick Date",
        icon: "mdi-calendar",
        click() {
          console.log("click pick date");
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
      delete: false,
    },
  }),
  methods: {
    handleClick(index) {
      this.items[index].click.call(this);
    },
  },
  components: {
    "delete-dialog": require("@/components/Todo/Dialogs/DeleteDialog.vue")
      .default,
  },
};
</script>

<style>
</style>