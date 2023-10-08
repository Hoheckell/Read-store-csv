import { Optional } from "sequelize/types"

export type CreateUserDTO = {
    name: string;
    city: string;
    country: string;
    favorite_sport: string;
}

export type UpdateUserDTO = Optional<CreateUserDTO, 'name'>

export type FilterUserDTO = {
    q?:string
    name?: string
    city?: string
    country?: string
    namfavorite_sporte?: string
}