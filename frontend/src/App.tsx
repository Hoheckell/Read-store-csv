import React, { ChangeEvent, useEffect, useState } from "react";
import style from "./App.module.scss";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  OutlinedInput,
  createTheme,
  styled,
} from "@mui/material";
import { IUser } from "./interfaces/user.interface";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { userService } from "./services/user.service";
import DataCard from "./components/DataCard";
import { fileService } from "./services/file.service";
import SearchIcon from "@mui/icons-material/Search";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./components/Loading";
import { ISearch } from "./interfaces/search.Interface";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#ffdd59",
    },
    secondary: {
      main: "#1B9CFC",
    },
    text: {
      primary: "#000000",
    },
  },
});

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const App = () => {
  const [file, setFile] = useState<File>();
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [favoriteSport, setFavoriteSport] = useState("");
  const [q, setQ] = useState("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      if (e.target.files[0] && e.target.files[0].type === "text/csv") {
        submitFile(e.target.files[0]);
        console.log(e.target.files[0].type);
      } else {
        toast.error("Invalid file");
      }
    }
  };

  const cleanSearch = async () =>{
    setLoading(true);
    setName("")
    setCity("")
    setCountry("")
    setFavoriteSport("")
    setQ("")
    const users = await userService.getUsers();
      setUsers(users);
      setLoading(false);
  }

  const search = async () => {
    setLoading(true);
    const data: ISearch = {
      name,
      city,
      country,
      favorite_sport: favoriteSport,
      q
    }
    const users = await userService.search(data);
    if(users?.length > 0) setUsers(users);
    setLoading(false);
  };

  const submitFile = async (file: File) => {
    setLoading(true);
    const form = new FormData();
    form.append("file", file);
    const success = await fileService.upload(form);
    toast.success(success.message);
    const users = await userService.getUsers();
      setUsers(users);
      setLoading(false);
  };

  useEffect(() => {
    const getUsers = async () => {
      const users = await userService.getUsers();
      setUsers(users);
    };  
      getUsers(); 
  }, []);

  return (
    <div className={style.main}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover
        theme="light"
      />
      <div className={style.container}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              sx={{ m: 1 }}
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Upload .CSV file
              <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </Button>
          </Grid>
          <Grid item xs={1}>
            <Loading loading={loading} theme={defaultTheme} />
          </Grid>
        </Grid>
        <div>{file && `${file.name} - ${file.size} bytes`}</div>
        {users?.length > 0 && (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl sx={{ m: 1 }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  endAdornment={
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  }
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <FormHelperText id="outlined-weight-helper-text">
                  filter by name
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ m: 1 }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  endAdornment={
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  }
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <FormHelperText id="outlined-weight-helper-text">
                  filter by city
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ m: 1 }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  endAdornment={
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  }
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}
                  name="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
                <FormHelperText id="outlined-weight-helper-text">
                  filter by country
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ m: 1 }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  endAdornment={
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  }
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}
                  name="favoriteSport"
                  value={favoriteSport}
                  onChange={(e) => setFavoriteSport(e.target.value)}
                />
                <FormHelperText id="outlined-weight-helper-text">
                  filter by favorite sport
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ m: 1 }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  endAdornment={
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  }
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}
                  name="q"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
                <FormHelperText id="outlined-weight-helper-text">
                  filter by term
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <Button variant="contained" sx={{ m:1}} onClick={search}><SearchIcon/></Button>
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" sx={{ m:1}} onClick={cleanSearch}><DeleteForeverIcon /></Button>
            </Grid>
          </Grid>
        )}
        {users?.length > 0 &&
          users.map((user) => <DataCard key={user.id} {...user} />)}
      </div>
    </div>
  );
};

export default App;
