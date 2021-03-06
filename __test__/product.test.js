const request = require('supertest')
const app = require('../app')
const { generateToken, verifyJWT } = require('../helper/jwt')


const admin = {
    email: 'admin@mail.com',
    password: '123456',
    role: 'admin'
}
const customers = {
    email: 'test@mail.com',
    password: '1234',
    role: 'customer'
}
var admin_token
var customer_token

beforeAll((done) => {
    admin_token = generateToken(admin)
    customer_token = generateToken(customers)
    done()    
}),
describe('POST /product', ()=> {
    it('should send response (201) status code', (done) => {
        //setup
        const body = {
            name: 'Shoes',
            image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2F',
            price: 250000,
            stock: 50
        }
        //excute
        request(app)
        .post('/products')
        .set('access_token', admin_token)
        .send(body)
        .end((err, res) => {
            if (err) done(err)

            //asert
            expect(res.statusCode).toEqual(201)
            expect(typeof res.body).toEqual('object')
            expect(verifyJWT(admin_token).role).toEqual('admin')
            done()
        })
    })
    it('should send response (500) when access_token is undefined', (done) => {
        //setup
        const body = {
            name: 'Shoes',
            image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.esquire.com%2Fstyle%2Fmens-fashion%2Fg27435559%2Fcoolest-best-sneakers-2019%2F&psig=AOvVaw09PhLmr5BKdqJ3g7l3TRf3&ust=1611063592302000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMD8oNzNpe4CFQAAAAAdAAAAABAD',
            price: 250000,
            stock: 50
        }
        //excute
        request(app)
        .post('/product')
        .send(body)
        .end((err, res) => {
            if (err) done(err)
            
            //asert
            expect(res.statusCode).toEqual(500)
            expect(typeof res.body).toEqual('object')
            done()
        })
    })
    it('should send response (400) when access_token is customer', (done) => {
        //setup
        const body = {
            name: 'Shoes',
            image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.esquire.com%2Fstyle%2Fmens-fashion%2Fg27435559%2Fcoolest-best-sneakers-2019%2F&psig=AOvVaw09PhLmr5BKdqJ3g7l3TRf3&ust=1611063592302000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMD8oNzNpe4CFQAAAAAdAAAAABAD',
            price: 250000,
            stock: 50
        }
        //excute
        request(app)
        .post('/product')
        .set('access_token', customer_token)
        .send(body)
        .end((err, res) => {
            if (err) done(err)
            
            //asert
            expect(res.statusCode).toEqual(403)
            expect(typeof res.body).toEqual('object')
            expect(verifyJWT(customer_token).role).toEqual('customer')
            done()
        })
    })
    it('should send response (400) when name is empty', (done) => {
        //setup
        const body = {
            name: '',
            image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.esquire.com%2Fstyle%2Fmens-fashion%2Fg27435559%2Fcoolest-best-sneakers-2019%2F&psig=AOvVaw09PhLmr5BKdqJ3g7l3TRf3&ust=1611063592302000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMD8oNzNpe4CFQAAAAAdAAAAABAD',
            price: 250000,
            stock: 50
        }
        //excute
        request(app)
        .post('/product')
        .set('access_token', admin_token)
        .send(body)
        .end((err, res) => {
            if (err) done(err)
            
            //asert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(verifyJWT(admin_token).role).toEqual('admin')
            done()
        })
    })
})
describe('DELETE /products', function () {
    afterAll(function(done) {
      clearProducts()
        .then(function() {
          return clearAuth()
        })
        .then(function() {
          models.sequelize.close()
          done()
        })
        .catch(console.log)
    })
})