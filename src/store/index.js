import { createStore } from 'vuex'

export default createStore({
  state: {
    showInvoiceModal:null,
    modalActive:null
  },
  mutations: {
    TOGGLE_INVOICE_MODAL(state){
      state.showInvoiceModal=!state.showInvoiceModal;
    },
    TOGGLE_MODAL_ACTIVE(state){
      state.modalActive=!state.modalActive;
    }
  },
  actions: {

  },
  modules: {
    
  }
})
