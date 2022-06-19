
import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';
import { Messages } from '../model/users';
import { app } from '../server';


describe('first scenario', () => {
  let mockUser = {
    username: 'ilya',
    age: 55,
    hobbies: ['dancing']
  }

  let mockId = '';

  test('should return empty array users', async () => {
    const response = await request(app.server).get('/api/users');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);

  });

  test('should return object new user', async () => {
    const response = await request(app.server).post('/api/users').send(mockUser);

    mockId = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ ...mockUser, id: mockId });
  });

  test('should return the user object with the requested id', async () => {
    const response = await request(app.server).get(`/api/users/${mockId}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ ...mockUser, id: mockId });
  });

  test('should return an updated object of user with the specified id', async () => {
    mockUser = {
      username: 'Ilay',
      age: 80,
      hobbies: ['programming'],
    }

    const response = await request(app.server).put(`/api/users/${mockId}`).send(mockUser);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ ...mockUser, id: mockId });
  });

  test('should return confirmation of successful deletion of user', async () => {

    const response = await request(app.server).delete(`/api/users/${mockId}`);

    expect(response.statusCode).toEqual(204);
    expect(response.body).toBeFalsy();
  });

  test('should return a 404 error because there is no such user (it has been deleted)', async () => {

    const response = await request(app.server).get(`/api/users/${mockId}`);

    expect(response.statusCode).toEqual(404);
    expect(response.body.message).toBeTruthy();
  });
})

describe('second scenario', () => {

  let mockUser = {
    username: 'ilya',
    age: 55,
  }

  let mockUserFull = {
    username: 'ilya',
    age: 55,
    hobbies: ['dancing']
  }

  const uuid = uuidv4();
  const notUuid = '123';
  let mockId = '';

  test('should return 400 error and message when id of user is not uuid for method get', async () => {
    const response = await request(app.server).get(`/api/users/${notUuid}`);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: Messages.NotUuid });
  });

  test('should return 404 error and a message if a user with such an ID does not exist', async () => {
    const response = await request(app.server).get(`/api/users/${uuid}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: Messages.UserNotFound });
  });

  test('should return error 400 and a message when trying to create a user without required fields', async () => {
    const response = await request(app.server).post('/api/users').send(mockUser);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: Messages.RequiredFieldNotFound });
  });

  test('should return error 500 and a message if you execute a post request without body', async () => {
    const response = await request(app.server).post('/api/users');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: Messages.ServerIternalError });
  });

  test('should return array users with lenght === 1', async () => {
    const responsePost = await request(app.server).post('/api/users').send(mockUserFull);
    mockId = responsePost.body.id;

    const response = await request(app.server).get('/api/users');

    expect(response.status).toBe(200);
    expect(response.body).toContainEqual({ ...mockUserFull, id: mockId });
    expect(response.body).toHaveLength(1);
  });

});

describe('third scenario', () => {

  let mockUserUpdated = {
    username: 'Valera',
  }

  let mockUserFull = {
    username: 'ilya',
    age: 55,
    hobbies: ['dancing']
  }

  const uuid = uuidv4();
  const notUuid = '123';
  let mockId = '';

  test('should return an object with updated defaults if we have not passed all required fields (PATCH === PUT)', async () => {
    const responsePost = await request(app.server).post('/api/users').send(mockUserFull);

    mockId = responsePost.body.id;

    expect(responsePost.status).toBe(201);
    expect(responsePost.body).toEqual({ ...mockUserFull, id: mockId });

    const responsePut = await request(app.server).put(`/api/users/${mockId}`).send(mockUserUpdated);

    expect(responsePut.status).toBe(200);
    expect(responsePut.body).toEqual({ ...mockUserFull, ...mockUserUpdated, id: mockId });
  });

  test('should return error 400 when user id is not uuid on method put', async () => {

    const responsePut = await request(app.server).put(`/api/users/${notUuid}`).send(mockUserUpdated);

    expect(responsePut.status).toBe(400);
    expect(responsePut.body).toEqual({ message: Messages.NotUuid });
  });

  test('should return error 404 when user with id does not exist on method put', async () => {

    const responsePut = await request(app.server).put(`/api/users/${uuid}`).send(mockUserUpdated);

    expect(responsePut.status).toBe(404);
    expect(responsePut.body).toEqual({ message: Messages.UserNotFound });
  });

  test('should return error 404 when user with id does not exist on delete method', async () => {

    const responsePut = await request(app.server).delete(`/api/users/${notUuid}`).send(mockUserUpdated);

    expect(responsePut.status).toBe(400);
    expect(responsePut.body).toEqual({ message: Messages.NotUuid });
  });

  test('should return error 404 when user with id does not exist on delete method', async () => {

    const responsePut = await request(app.server).delete(`/api/users/${uuid}`).send(mockUserUpdated);

    expect(responsePut.status).toBe(404);
    expect(responsePut.body).toEqual({ message: Messages.UserNotFound });
  });

});