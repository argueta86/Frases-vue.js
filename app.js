const app = Vue.createApp({
  data() {
    return {
      frases: [], // Lista de frases, cada una con un campo id
      newFrase: {
        id: null,
        texto: '',
        autor: ''
      },
      editFrase: {
        id: null,
        texto: '',
        autor: ''
      },
      alertMessage: '',
      alertClass: ''
    };
  },
  methods: {
    showAddModal() {
      // Mostrar el modal para añadir frase
      this.newFrase = { id: null, texto: '', autor: '' };
      const addModal = new bootstrap.Modal(document.getElementById('addModal'));
      addModal.show();
    },
    closeAddModal() {
      // Cerrar el modal para añadir frase
      const addModal = bootstrap.Modal.getInstance(document.getElementById('addModal'));
      addModal.hide();
    },
    addFrase() {
      if (this.newFrase.texto && this.newFrase.autor) {
        this.newFrase.id = Date.now(); // Genera un ID único basado en la fecha y hora actual
        this.frases.push({...this.newFrase});
        this.closeAddModal();
        this.alertMessage = 'Frase añadida con éxito!';
        this.alertClass = 'alert-success';
      } else {
        this.alertMessage = 'Por favor, completa todos los campos.';
        this.alertClass = 'alert-danger';
      }
    },
    openEditModal(frase) {
      this.editFrase = { ...frase };
      const editModal = new bootstrap.Modal(document.getElementById('editModal'));
      editModal.show();
    },
    closeEditModal() {
      const editModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
      editModal.hide();
    },
    saveEdit() {
      const index = this.frases.findIndex(f => f.id === this.editFrase.id);
      if (index !== -1) {
        this.frases[index] = { ...this.editFrase };
        this.closeEditModal();
        this.alertMessage = 'Frase actualizada con éxito!';
        this.alertClass = 'alert-success';
      }
    },
    deleteFrase(id) {
      this.frases = this.frases.filter(frase => frase.id !== id);
      this.alertMessage = 'Frase eliminada con éxito!';
      this.alertClass = 'alert-success';
    }
  }
});

app.mount('#app');
