import axios from 'axios';

const STUDENTS_URL = 'http://localhost:3000/students';

export default {
  getStudents(searchName = '', offset = 1, limit = 5) {
    console.log(`${STUDENTS_URL}?limit=${limit}&offset=${limit *
      (offset - 1)}&searchByName=${searchName}`);
    const students = axios.get(`${STUDENTS_URL}?limit=${limit}&offset=${limit * (offset -1)}&searchByName=${searchName}`).then((response) => response);

    students.then((students) => {
      students.data.rows.map((student) => {
        student.createdAt = new Date(student.createdAt).toLocaleString('pt');
        student.updatedAt = new Date(student.updatedAt).toLocaleString('pt');
      });
    });

    return students;
  },
  saveStudent(student) {
    return axios.post(STUDENTS_URL, student);
  },
};
