import axios from 'axios';
type Message = {
    message:string
}
export const fileService = {
    async upload(form: FormData): Promise<Message> { 
        return await axios
        .post(`${process.env.REACT_APP_API_URL}/files/upload`,form)
        .then(async (response) => {
          if (response.status === 200) { 
            return response.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
      },
}