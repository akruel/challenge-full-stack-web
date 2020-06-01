<template>
  <v-container>
    <div>
      <h1>{{ title }}</h1>
      <v-progress-circular
        :size="30"
        v-show="showGetProgress"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>

    <ValidationObserver ref="studentObserver" v-slot="{ handleSubmit, reset }">
      <v-form
        ref="studentForm"
        @submit.prevent="handleSubmit(submit)"
        @reset.prevent="reset"
      >
        <v-text-field
          v-model="student.id"
          label="RA"
          disabled
          v-show="student.id"
        ></v-text-field>
        <ValidationProvider v-slot="{ errors }" name="Nome" rules="required">
          <v-text-field
            v-model="student.name"
            label="NOME"
            :error-messages="errors"
            required
          ></v-text-field>
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="Email"
          rules="required|email"
        >
          <v-text-field
            v-model="student.email"
            label="EMAIL"
            :error-messages="errors"
            required
          ></v-text-field>
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors }" name="CPF" rules="required|cpf">
          <v-text-field
            v-model="student.cpf"
            label="CPF"
            :error-messages="errors"
            required
          ></v-text-field>
        </ValidationProvider>
        <div class="buttonsForm">
          <v-btn color="primary" type="submit" class="mr-4">{{
            submitBtnText
          }}</v-btn>
          <v-btn v-show="showClearBtn" @click="clear" class="mr-4"
            >Limpar</v-btn
          >
          <v-btn to="/estudante/lista" class="mr-4"
            >Cancelar</v-btn
          >
          <v-progress-circular
            :size="30"
            v-show="showProgress"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </div>
      </v-form>
    </ValidationObserver>
    <v-alert type="success" v-show="showSuccessAlert">
      {{ successMessage }}
    </v-alert>
  </v-container>
</template>

<script>
import service from '@/services/students-service';
import { required, email } from 'vee-validate/dist/rules';
import cpfValidator from '@/utils/cpf-validator.js';
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from 'vee-validate';

setInteractionMode('eager');

extend('required', {
  ...required,
  message: '{_field_} não pode ser vazio.',
});

extend('email', {
  ...email,
  message: 'Email inválido.',
});

extend('cpf', {
  message: 'CPF inválido.',
  validate: (value) => cpfValidator(value),
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  mounted() {
    if (this.$route.params.id) {
      this.onEdit(this.$route.params.id);
      this.showClearBtn = false;
      this.title = 'Atualizar Aluno';
      this.successMessage = 'Atualizado com sucesso!';
      this.submitBtnText = 'Atualizar';
    } else {
      this.title = 'Cadastro de Alunos';
      this.successMessage = 'Cadastrado com sucesso!';
      this.submitBtnText = 'Cadastrar';
    }
  },
  data: () => ({
    title: '',
    showSuccessAlert: false,
    showProgress: false,
    showGetProgress: false,
    successMessage: null,
    submitBtnText: '',
    showClearBtn: true,
    student: {
      id: null,
      name: '',
      cpf: '',
      email: '',
    },
  }),
  methods: {
    submit() {
      this.showProgress = true;
      if (!this.student.id) {
        service.saveStudent(this.student).then(() => {
          this.clear();
          this.showSuccessAlert = true;
          this.showProgress = false;
          setTimeout(() => {
            this.showSuccessAlert = false;
          }, 1500);
        });
      } else {
        service.updateStudent(this.student, this.student.id).then(() => {
          this.showSuccessAlert = true;
          this.showProgress = false;
          setTimeout(() => {
            this.showSuccessAlert = false;
          }, 1500);
        });
      }
    },

    onEdit(id) {
      this.showGetProgress = true;
      service.getStudentById(id).then((student) => {
        this.student = student.data;
        this.showGetProgress = false;
      });
    },

    clear() {
      this.$refs.studentForm.reset();
      this.$refs.studentObserver.reset();
    },
  },
};
</script>

<style>
.buttonsForm {
  margin-top: 1em;
  margin-bottom: 2em;
}
</style>
