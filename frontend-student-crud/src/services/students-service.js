import axios from 'axios';

const API_STUDENTS_URL = process.env.VUE_APP_API_STUDENTS_URL;

export default {
  getStudents(searchName = '', offset = 1, limit = 5) {
    const students = axios
      .get(
        `${API_STUDENTS_URL}?limit=${limit}&offset=${limit *
          (offset - 1)}&searchByName=${searchName}`,
      )
      .then((response) => response);

    students.then((students) => {
      students.data.rows.map((student) => {
        student.createdAt = new Date(student.createdAt).toLocaleString('pt');
        student.updatedAt = new Date(student.updatedAt).toLocaleString('pt');
      });
    });

    return students;
  },
  saveStudent(student) {
    return axios.post(API_STUDENTS_URL, student);
  },
};
