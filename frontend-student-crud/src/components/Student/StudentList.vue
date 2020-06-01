<template>
  <v-container>
    <h1>{{ name }}</h1>
    <v-text-field
      v-show="paginationLength > 0"
      v-model="searchName"
      label="PESQUISAR POR NOME"
      @input="read(1, searchName)"
    ></v-text-field>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="students"
      :items-per-page="5"
      :single-select="singleSelect"
      item-key="id"
      class="elevation-1"
      hide-default-footer
      :loading="loading"
      no-data-text="Não há alunos cadastrados."
      loading-text="Carregando..."
    >
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="openConfirmDelete(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <div class="text-center">
      <v-pagination
        v-model="page"
        v-show="paginationLength > 0"
        :length="paginationLength"
        circle
        @input="read(page)"
      ></v-pagination>
    </div>
    <v-dialog v-model="dialog" persistent max-width="490">
      <v-card>
        <v-card-title class="headline"
          >Atenção:</v-card-title
        >
        <v-card-text class="headline"
          >Deseja realmente excluir este aluno?</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false"
            >Cancelar</v-btn
          >
          <v-btn color="green darken-1" text @click="deleteItem()"
            >Confirmar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import service from '@/services/students-service';

export default {
  mounted() {
    this.read();
  },

  methods: {
    read(page = 1, searchName = '') {
      this.loading = true;
      service.getStudents(searchName, page).then((students) => {
        this.students = students.data.rows;
        this.paginationLength = students.data.count / this.studentsLimit;
        if (!Number.isInteger(this.paginationLength)) {
          this.paginationLength =
            Number.parseInt(this.paginationLength.toPrecision(1)) + 1;
        }
        this.loading = false;
      });
    },
    editItem(student) {
      this.$router.push({ path: `/estudante/${student.id}` });
    },
    deleteItem() {
      this.dialog = false;
      this.loading = true;
      service.deleteStudent(this.idToDelete).then(() => {
        this.read();
      });
    },
    openConfirmDelete(student) {
      this.dialog = true;
      this.idToDelete = student.id;
    },
  },

  data: () => ({
    name: 'Lista de Alunos',
    searchName: null,
    singleSelect: false,
    selected: [],
    loading: null,
    page: 1,
    studentsLimit: 5,
    paginationLength: null,
    dialog: false,
    idToDelete: null,
    headers: [
      { text: 'RA', value: 'id' },
      { text: 'NOME', value: 'name' },
      { text: 'EMAIL', value: 'email' },
      { text: 'CPF', value: 'cpf' },
      { text: 'DATA CRIAÇÃO', value: 'createdAt' },
      { text: 'DATA ATUALIZAÇÃO', value: 'updatedAt' },
      { text: 'AÇÕES', value: 'actions', sortable: false },
    ],
    students: [],
  }),
};
</script>
<style>
.text-center {
  margin-top: 2em;
}
</style>
