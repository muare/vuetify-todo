import Vue from 'vue'
import Vuex from 'vuex'
import Localbase from 'localbase'

let db = new Localbase('db')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTitle: process.env.VUE_APP_TITLE,
    search: null,
    tasks: [],
    snackbar: {
      show: false,
      text: ""
    },
    sorting: false
  },
  mutations: {
    setSearch(state, event) {
      state.search = event
    },
    addTask(state, task) {
      state.tasks.push(task);
    },
    doneTask(state, task) {
      task.done = !task.done;
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    setTasks(state, tasks) {
      state.tasks = tasks
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
    },
    toggleSorting(state) {
      state.sorting = !state.sorting
    }
  },
  actions: {
    addTask({ commit }, newTaskTitle) {
      let task = {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
        dueDate: null,
      };
      db.collection('tasks').add(task).then(() => {
        commit('addTask', task)
        commit('showSnackbar', 'Task Added!')
      })
    },
    deleteTask({ commit }, id) {
      db.collection('tasks').doc({ id: id }).delete().then(()=>{
        commit('deleteTask', id)
        commit('showSnackbar', 'Task Deleted!')
      })
    },
    updateTaskTitle({ commit }, payload) {
      db.collection('tasks').doc({ id: payload.id }).update({
        title: payload.title
      }).then(() => {
        commit('updateTaskTitle', payload)
        commit('showSnackbar', 'Task Deleted!')
      })
    },
    updateDueDate({ commit }, payload) {
      db.collection('tasks').doc({ id: payload.id }).update({
        dueDate: payload.dueDate
      }).then(() => {
        commit('updateDueDate', payload)
        commit('showSnackbar', 'Due Date Updated!')
      })
    },
    doneTask({ state, commit }, id) {
      let task = state.tasks.filter((task) => task.id === id)[0];
      db.collection('tasks').doc({ id: id }).update({
        done: !task.done
      }).then(() => {
        commit('doneTask', task)
      })
    },
    loadTasks({ commit }) {
      db.collection('tasks').get().then(tasks => {
        commit('setTasks', tasks)
      })
    },
    setTasks({ commit }, tasks) {
      db.collection('tasks').set(tasks)
      commit('setTasks', tasks)
    },
  },
  getters: {
    taskFiltered(state) {
      if (!state.search) {
        return state.tasks
      }
      else {
        return state.tasks.filter(
          task => task.title.toLowerCase().includes(state.search.toLowerCase()))
      }
    }
  }
})
