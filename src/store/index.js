import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [],
    snackbar: {
      show: false,
      text: ""
    }
  },
  mutations: {
    addTask(state, newTaskTitle) {
      let task = {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
        dueDate: null,
      };
      state.tasks.push(task);
    },
    doneTask(state, id) {
      let task = state.tasks.filter((task) => task.id === id)[0];
      task.done = !task.done;
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    updateTaskTitle(state, payload) {      
      let task = state.tasks.filter((task) => task.id === payload.id)[0];
      task.title = payload.title
    },
    updateDueDate(state, payload) {
      let task = state.tasks.filter((task) => task.id === payload.id)[0];
      task.dueDate = payload.dueDate
    },
    showSnackbar(state, text) {
      let timeout = 0
      if (state.snackbar.show) {
        state.snackbar.show = false
        timeout = 300
      }
      setTimeout(() => {
        state.snackbar.show = true
        state.snackbar.text = text
      }, timeout);
    },
    hideSnackbar(state) {
      state.snackbar.show = false
    }
  },
  actions: {
    addTask({ commit }, newTaskTitle) {
      commit('addTask', newTaskTitle)
      commit('showSnackbar', 'Task Added!')
    },
    deleteTask({ commit }, id) {
      commit('deleteTask', id)
      commit('showSnackbar', 'Task Deleted!')
    },
    updateTaskTitle({ commit }, payload) {
      commit('updateTaskTitle', payload) 
      commit('showSnackbar', 'Task Updated!')
    },
    updateDueDate({ commit }, payload) {
      commit('updateDueDate', payload)
      commit('showSnackbar', 'Due Date Updated!')
    }


  },
})
