import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    seminari: [],
    partecipanti: [],
    guestFaculties: [],
    staffFaculties: []
  },
  mutations: {
    setSeminari(state, seminari) {
      state.seminari = seminari;
    },
    setPartecipanti(state, partecipanti) {
      state.partecipanti = partecipanti;
    },
    setGuestFaculties(state, faculties) {
      state.guestFaculties = faculties;
    },
    setStaffFaculties(state, faculties) {
      state.staffFaculties = faculties;
    }
  },

  actions: {
    async fetchSeminari({ commit, state }) {
      if (state.seminari.length === 0) {
        try {
          const response = await axios.get('https://www.aperto-crt.it/core/wp-json/wp/v2/seminario?per_page=50');
          commit('setSeminari', response.data);
        } catch (error) {
          console.error('Errore durante il recupero dei dati dei seminari', error);
        }
      }
    },
    async fetchPartecipanti({ commit, state }) {
      if (state.partecipanti.length === 0) {
        try {
          const response = await axios.get('https://www.aperto-crt.it/core/wp-json/wp/v2/alumni?per_page=50');
          commit('setPartecipanti', response.data);
        } catch (error) {
          console.error('Errore durante il recupero dei dati dei partecipanti', error);
        }
      }
    },

    async fetchFaculties({ commit, state }) {
      if (state.guestFaculties.length === 0 && state.staffFaculties.length === 0) {
        try {
          const response = await axios.get('https://www.aperto-crt.it/core/wp-json/wp/v2/faculty?per_page=50');
          const guestFaculties = [];
          const staffFaculties = [];

          response.data.forEach(faculty => {
            const types = faculty['faculty_member_type'].map(type => type.name);
            console.log('Faculty types:', types);
            if (types.includes('Guest')) {
              guestFaculties.push(faculty);
            }
            if (types.includes('Staff')) {
              staffFaculties.push(faculty);
            }
          });
          commit('setGuestFaculties', guestFaculties);
          commit('setStaffFaculties', staffFaculties);
        } catch (error) {
          console.error('Errore durante il recupero dei dati dei docenti', error);
        }
      }
    }

  },
  getters: {
    allSeminari(state) {
      return state.seminari;
    },
    seminariCorrenti(state) {
      const currentDate = new Date();
      return state.seminari
        .filter(seminario => seminario.stato[0].name === 'Corrente' || seminario.stato[0].name === 'Futuro')
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    },
    seminariArchiviati(state) {
      return state.seminari.filter(seminario => seminario.stato[0].name === 'Archiviato');
    },
    partecipanti(state) {
      return state.partecipanti;
    },
    guestFaculties(state) {
      return state.guestFaculties;
    },
    staffFaculties(state) {
      return state.staffFaculties;
    }
  }
});
