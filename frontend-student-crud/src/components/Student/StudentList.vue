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
        <v-icon small @click="deleteItem(item)">
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
    deleteItem(student) {
      console.log(student);
      this.loading = true;
      service.deleteStudent(student.id).then(() => {
        this.read();
      });
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
