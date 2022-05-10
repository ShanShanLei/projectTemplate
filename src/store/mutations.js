const mutations = {
  UPDATE_MENU_TOGGLE(state, payload) {
    state.menuToggle = payload
  },
  UPDATE_USER_MESSAGE(state, payload) {
    state.user = payload
  },
  CLEAR_USER_MESSAGE(state) {
    state.user = {}
  },
}

export default mutations
