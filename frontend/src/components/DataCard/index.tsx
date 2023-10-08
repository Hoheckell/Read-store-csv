import { Card, CardContent, Typography } from "@mui/material";
import { IUser } from "../../interfaces/user.interface"; 
import style from "./DataCard.module.scss";
type User = IUser
const DataCard = ({ id, name, city, country, favorite_sport} : User) =>{
    return (
        <Card className={style.card}> 
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            User {id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          <strong>Name:</strong> {name}<br/>
          <strong>City:</strong> {city}<br/>
          <strong>Country:</strong> {country}<br/>
          <strong>Favorite Sport:</strong> {favorite_sport}<br/> 
          </Typography>
        </CardContent> 
    </Card>
    );
}

export default DataCard;