const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const userOne = {
    name: 'Mike',
    email: 'mike@example.com',
    password: 'reiuqhfi1!'
}

beforeEach(async() => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should signup a new user', async() => {
    await request(app).post('/users').send({
        name: 'Abhishek',
        email: 'abhistark7@gmail.com',
        password: '1234567'
    }).expect(201)
})

test('Should login existing user', async() => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('Should not login nonexistent user', async() => {
    await request(app).post('users/login').send({
        email: 'slfdl@gmail.com',
        password: 'guhiuwr23'
    }).expect(404)
})