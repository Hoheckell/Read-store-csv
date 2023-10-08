import {IUser} from '../../api/interfaces/user.interface' 
import { UserOuput } from '../../models/user'

export const toUser = (ingredient: UserOuput): IUser => {
    return {
        id: ingredient.id,
        name: ingredient.name, 
        city: ingredient.city,
        country: ingredient.country,
        favorite_sport: ingredient.favorite_sport, 
    }
}