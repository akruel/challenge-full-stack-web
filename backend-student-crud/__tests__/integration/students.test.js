const request = require('supertest');
const server = require('../../src/server');
const faker = require('faker');
const truncate = require('../utils/truncate');

const fakerName = faker.name.findName();
const fakerEmail = faker.internet.email();
const validCpf = '56597470001';
let response = null;

describe('Students', () => {
  beforeEach(async () => {
    await truncate();

    response = await request(server).post('/students').send({
      name: fakerName,
      email: fakerEmail,
      cpf: validCpf,
    });
  });

  it('should be able create new student', async () => {
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(fakerName);
    expect(response.body.email).toBe(fakerEmail);
    expect(response.body.cpf).toBe(validCpf);
  });

  it('should be able search students by case insentive name', async () => {
    const responseLower = await request(server).get(
      `/students?limit=5&offset=0&searchByName=${fakerName.toLowerCase()}`,
    );

    expect(responseLower.status).toBe(200);
    expect(responseLower.body.rows[0].name).toBe(fakerName);
    expect(responseLower.body.rows[0].email).toBe(fakerEmail);
    expect(responseLower.body.rows[0].cpf).toBe(validCpf);

    const responseUpper = await request(server).get(
      `/students?limit=5&offset=0&searchByName=${fakerName.toUpperCase()}`,
    );

    expect(responseUpper.status).toBe(200);
    expect(responseLower.body.rows[0].name).toBe(fakerName);
    expect(responseLower.body.rows[0].email).toBe(fakerEmail);
    expect(responseLower.body.rows[0].cpf).toBe(validCpf);
  });

  it('should be not return a student when search by nonexistent name', async () => {
    const nonexistentName = 'Nonexistent';

    const response = await request(server).get(
      `/students?limit=5&offset=0&searchByName=${nonexistentName}`,
    );

    expect(response.status).toBe(200);
    expect(response.body.rows).toEqual([]);
  });
});
