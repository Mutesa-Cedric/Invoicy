import { createStore } from 'vuex'

export default createStore({
  state: {
    showInvoiceModal:null
  },
  mutations: {
    TOGGLE_INVOICE_MODAL(state){
      state.showInvoiceModal=!state.showInvoiceModal;
    }
  },
  actions: {
  },
  modules: {
  }
})
