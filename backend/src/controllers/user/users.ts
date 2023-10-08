import * as service from '../../services/user.service'; 
import {IUser} from '../../api/interfaces/user.interface';
import * as mapper from './mapper';
import { CreateUserDTO, UpdateUserDTO, FilterUserDTO } from '../../api/dto/user.dto';

export const create = async(payload: CreateUserDTO): Promise<IUser> => {
    return mapper.toUser(await service.create(payload))
}
export const update = async (id: number, payload: UpdateUserDTO): Promise<IUser> => {
    return mapper.toUser(await service.update(id, payload))
}
export const getById = async (id: number): Promise<IUser> => {
    return mapper.toUser(await service.getById(id))
}
export const deleteById = async(id: number): Promise<Boolean> => {
    const isDeleted = await service.deleteById(id)
    return isDeleted
}
export const getAll = async(filters: FilterUserDTO): Promise<IUser[]> => {
    return (await service.getAll(filters)).map(mapper.toUser)
}