
import {Op} from 'sequelize' 
import {GetAllUsersFilters} from '../api/interfaces/filters'
import User, {UserInput, UserOuput} from '../models/user'

export const create = async (payload: UserInput): Promise<UserOuput> => {
    const user = await User.create(payload)
    return user
}

export const update = async (id: number, payload: Partial<UserInput>): Promise<UserOuput> => {
    const user = await User.findByPk(id)
    if (!user) { 
        throw new Error('not found')
    }
    const updatedUser = await (user as User).update(payload)
    return updatedUser
}

export const getById = async (id: number): Promise<UserOuput> => {
    const user = await User.findByPk(id)
    if (!user) { 
        throw new Error('not found')
    }
    return user
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedUserCount = await User.destroy({
        where: {id}
    })
    return !!deletedUserCount
}

export const getAll = async (filters?: GetAllUsersFilters): Promise<UserOuput[]> => { 
    return User.findAll({
        where: {
            ...(filters?.name && {name: {[Op.like]: '%' + filters?.name + '%'} }),
            ...(filters?.city && {city: {[Op.like]: '%' + filters?.city + '%'}}),
            ...(filters?.country && {country: {[Op.like]: '%' + filters?.country + '%'}}),
            ...(filters?.favorite_sport  && {favorite_sport: {[Op.like]: '%' + filters?.favorite_sport + '%'}}),   
            ...(filters?.q && { [Op.or]:[ 
                {name: {[Op.like]: '%' + filters?.q + '%'}},
                {city: {[Op.like]: '%' + filters?.q + '%'}},
                {country: {[Op.like]: '%' + filters?.q + '%'}},
                {favorite_sport: {[Op.like]: '%' + filters?.q + '%'}}
            ]}),
        },
    })
}
