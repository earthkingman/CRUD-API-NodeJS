import request from 'supertest'
import { Application } from '../app/app'
const application = new Application();
const app = application.getServer();
describe("test users endpoints", () => {
    // it("test get all users", async () => {

    //     const res = await request(app)
    //         .get('/api/users')
    //     expect(res.status).toBe(200)
    // })
    it("post user", async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                email: "1255",
                password: "123"
            })
        expect(res.status).toBe(200)

    })
    // it("post user gives error for unique email", async () => {
    //     const res = await request(app)
    //         .post('/api/users')
    //         .send({
    //             name: "puneeth",
    //             email: "puneeth@gmail.com"
    //         })
    //     expect(res.status).toBe(400)

    // })
    // it("test get single user", async () => {
    //     const res = await request(app)
    //         .get('/api/users/user')
    //         .send({
    //             userId: 1
    //         })
    //     expect(res.status).toBe(200)

    // })
    // it("fail test get single user", async () => {
    //     const res = await request(app)
    //         .get('/api/users/user')
    //         .send({
    //             userId: 100
    //         })
    //     expect(res.status).toBe(404)
    // })

})