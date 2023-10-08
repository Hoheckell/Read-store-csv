import { GetAllUsersFilters } from '../../src/api/interfaces/filters';
import User from '../../src/models/user'
import * as UserRepository from '../../src/repositories/user.repository'
import { getAll } from '../../src/services/user.service';


describe('User Repository', () => {
    let UserId: number
    beforeAll(async () => {
        ;({id: UserId} = await User.create({
            name: "test name",
            city: "test city",
            country: "test country",
            favorite_sport: "tst sport",
          }))
    })

const filter: GetAllUsersFilters = {
    q: "usa",
  };

    describe('Create method', () => {
        it('should create and return an object of User details', async () => {
            const payload = {
                name: "test name",
                city: "test city",
                country: "test country",
                favorite_sport: "tst sport",
              }
            
            const user = await UserRepository.create(payload)

            expect(user).not.toBeNull()
        })
    })

    describe('Update method', () => {
        it('should update a specific existing User entry', async () => {
            await UserRepository.update(UserId, {
                name: 'tester'
            })

            const user = await User.findByPk(UserId)

            expect(user?.name).toEqual('tester')
        })
    })

    describe('getById method', () => {
        it('should get by id a specific existing User', async () => {
            await UserRepository.getById(UserId)

            const user = await User.findByPk(UserId)

            expect(user).toBeInstanceOf(User)
        })
    })

    describe('deleteById method', () => {
        it('should delete by id a specific existing User entry', async () => {
            await UserRepository.deleteById(UserId)

            const user = await User.findByPk(UserId)

            expect(user).toBeNull()
        })
    })

    describe('getAll method', () => {
        it('should list or filter Users', async () => {
            await UserRepository.getAll(filter)
            const usersFound = await User.findAll({where: {country: 'USA'}})
            expect(usersFound[0].country).toEqual('USA')
        })
    })
})