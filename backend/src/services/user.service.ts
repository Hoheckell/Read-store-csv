
import * as UserRepository from '../repositories/user.repository';
import {GetAllUsersFilters} from '../api/interfaces/filters';
import {UserInput, UserOuput} from '../models/user';

export const create = async (payload: UserInput): Promise<UserOuput> => {
    return await UserRepository.create(payload)
}
export const update = async (id: number, payload: Partial<UserInput>): Promise<UserOuput> => {
    return await UserRepository.update(id, payload)
}
export const getById = async (id: number): Promise<UserOuput> => {
    return await UserRepository.getById(id)
}
export const deleteById = async (id: number): Promise<boolean> => {
    return await UserRepository.deleteById(id)
}
export const getAll = async (filters: GetAllUsersFilters): Promise<UserOuput[]> => {
    return await UserRepository.getAll(filters)
}