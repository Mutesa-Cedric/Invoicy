import { createStore } from 'vuex'
import { db } from "../firebase/firebaseinit";
import { auth } from "../firebase/firebaseinit"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth"
export default createStore({
  state: {
    showInvoiceModal: null,
    modalActive: null,
    invoiceData: [],
    invoicesLoaded: null,
    currentInvoiceArray: null,
    editInvoice: null,
    user: {
      isLoggedIn: false,
      data: null
    }
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.isLoggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    TOGGLE_INVOICE_MODAL(state) {
      state.showInvoiceModal = !state.showInvoiceModal;
    },
    TOGGLE_MODAL_ACTIVE(state) {
      state.modalActive = !state.modalActive;
    },
    SET_INVOICE_DATA(state, payload) {
      state.invoiceData.push(payload);
    },
    TOGGLE_EDIT_INVOICE(state) {
      state.editInvoice = !state.editInvoice
    },
    INVOICES_LOADED(state) {
      state.invoicesLoaded = true;
    },
    SET_CURRENT_INVOICE(state, payload) {
      state.currentInvoiceArray = state.invoiceData.filter(invoice => invoice.invoiceId === payload)
    },
    DELETE_INVOICE(state, payload) {
      state.invoiceData = state.invoiceData.filter(invoice => invoice.invoiceId !== payload)
    },
    UPDATE_STATUS_TO_PAID(state, payload) {
      state.invoiceData.foreach(invoice => {
        if (invoice.docId === payload) {
          invoice.invoicePaid = true;
          invoice.invoicePending = false;
        }
      })
    },
    UPDATE_STATUS_TO_PENDING(state, payload) {
      state.invoiceData.foreach(invoice => {
        if (invoice.docId === payload) {
          invoice.invoicePaid = false;
          invoice.invoicePending = true;
          invoice.invoiceDraft = false;
        }
      })
    }
  },
  actions: {
    async register({ commit }, { email, password, name }) {
      const response = await createUserWithEmailAndPassword(auth, email, password)
      if (response) {
        commit('SET_USER', response.user)
        response.user.updateProfile({ displayName: name })
      } else {
        throw new Error('Unable to register user')
      }
    },
    async logIn(context, { email, password }) {
      const response = await signInWithEmailAndPassword(auth, email, password)
      if (response) {
        context.commit('SET_USER', response.user)
      } else {
        throw new Error('login failed')
      }
    },

    async logOut(context) {
      await signOut(auth)
      context.commit('SET_USER', null)
    },

    async fetchUser(context, user) {
      context.commit("SET_LOGGED_IN", user !== null);
      if (user) {
        context.commit("SET_USER", {
          displayName: user.displayName,
          email: user.email
        });
      } else {
        context.commit("SET_USER", null);
      }
    },
    async GET_INVOICES({ commit, state }) {
      const getData = db.collection("invoices");
      const results = await getData.get();
      results.forEach(doc => {
        if (!state.invoiceData.some(invoice => invoice.docId === doc.id)) {
          const data = {
            docId: doc.id,
            invoiceId: doc.data().invoiceId,
            billerStreetAddress: doc.data().billerStreetAddress,
            billerCity: doc.data().billerCity,
            billerZipCode: doc.data().billerZipCode,
            billerCountry: doc.data().billerCountry,
            clientName: doc.data().clientName,
            clientEmail: doc.data().clientEmail,
            clientStreetAddress: doc.data().clientStreetAddress,
            clientCity: doc.data().clientCity,
            clientZipCode: doc.data().clientZipCode,
            clientCountry: doc.data().clientCountry,
            invoiceDateUnix: doc.data().invoiceDateUnix,
            invoiceDate: doc.data().invoiceDate,
            paymentTerms: doc.data().paymentTerms,
            paymentDueDateUnix: doc.data().paymentDueDateUnix,
            paymentDueDate: doc.data().paymentDueDate,
            productDescription: doc.data().productDescription,
            invoiceItemList: doc.data().invoiceItemList,
            invoiceTotal: doc.data().invoiceTotal,
            invoicePending: doc.data().invoicePending,
            invoiceDraft: doc.data().invoiceDraft,
            invoicePaid: doc.data().invoicePaid,
          };
          // you pass in a mutation name and payload
          commit('SET_INVOICE_DATA', data)
        }
      });
      commit("INVOICES_LOADED");
    },
    async UPDATE_INVOICE({ commit, dispatch }, { docId, routeId }) {
      commit('DELETE_INVOICE', docId);
      await dispatch('GET_INVOICES');
      commit('TOGGLE_INVOICE');
      commit('TOGGLE_EDIT_INVOICE');
      commit('SET_CURRENT_INVOICE', routeId);
    },
    async DELETE_INVOICE({ commit }, docId) {
      const getInvoice = db.collection("invoices").doc(docId);
      await getInvoice.delete();
      commit("DELETE_INVOICE", docId)
    },
    async UPDATE_STATUS_TO_PAID({ commit }, docId) {
      const getInvoice = db.collection("invoices").doc(docId);
      await getInvoice.update({
        invoicePaid: true,
        invoicePending: false,
      })
      commit("UPDATE_STATUS_TO_PAID", docId);
    },
    async UPDATE_STATUS_TO_PENDING({ commit }, docId) {
      const getInvoice = db.collection("invoices").doc(docId);
      await getInvoice.update({
        invoicePaid: false,
        invoicePending: true,
        invoiceDraft: false
      })
      commit("UPDATE_STATUS_TO_PENDING", docId);
    }
  },
})
