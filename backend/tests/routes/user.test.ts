import User from "../../src/models/user";
import {agent as _request} from 'supertest'
import {get as getApplication} from '../../src/index' 
export const request = _request(getApplication())

 
describe('Recipe routes', () => {
    let userId: number
    let user: User

    beforeAll(async () => {
        [user] = await Promise.all([
            User.create({name: 'Blaster', city: 'Detroit', country:"USA", favorite_sport:"blast"}),
            User.create({name: 'Cyclop', city: 'New York', country:"USA", favorite_sport:"karate"}), 
        ])

        ;({id: userId} = user)
    })  

    describe('Get All', () => {
        it('should return an array of existing users', async () => {
            const {body: data} = await request.get('/api/users').expect(200);

            expect(data?.length).toBeGreaterThan(2)
        })
    })

    describe('Get single user', () => {
        it('should return a single recipe with specified id', async () => {
            const {body: data} = await request.get(`/api/users/${userId}`).expect(200)
                
            expect(data.id).toEqual(userId)
            expect(data.name).toEqual(user.name)
        })
    })
})