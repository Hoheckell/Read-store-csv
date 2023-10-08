 
import { ILoadingProps } from "../../interfaces/loading.interface";
import style from "./Loading.module.scss";
import { CircularProgress, Grid, ThemeProvider } from "@mui/material";

const Loading: React.FC<ILoadingProps> = ({ loading, theme }) => {
  return (
    <Grid
      item
      xs={12}
      md={12}
      mt={2}
      className={loading ? style["show__loading"] : style["hide__loading"]}
    >
      <ThemeProvider theme={theme}>
        <CircularProgress />
      </ThemeProvider>
    </Grid>
  );
};

export default Loading;
