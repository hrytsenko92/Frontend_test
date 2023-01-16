import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CardType } from "../../assets/types/cardType";
import dayjs from "dayjs";
import style from "./home.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { RootState } from "../../redux/store";
import { getAllByScore, getCardsList, selectors } from "../../redux/cardSlice";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

declare module "@mui/system" {
  interface BreakpointOverrides {
    laptop: true;
    tablet: true;
    mobile: true;
    desktop: true;
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
  }
}
const advancedFormat = require("dayjs/plugin/advancedFormat");
dayjs.extend(advancedFormat);

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => getAllByScore(state, ""));
  const [query, setQuery] = useState<string>("");

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    console.log(event.target.value);
  };
  const fetchInitialData = async () => {
    await dispatch(getCardsList(21));
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  // console.warn({data})

  return (
    <ThemeProvider
      theme={createTheme({
        breakpoints: {
          values: {
            mobile: 360,
            tablet: 840,
            laptop: 1366,
            desktop: 1440,
          },
        },
      })}
    >
      <Box className={style.containerHome} maxWidth={1440}>
        <Grid container columns={12} justifyContent="start" spacing={3}>
          <Grid mobile={8} tablet={6} laptop={6}>
            <Box
              className={style.filter}
              sx={{
                maxWidth: "100%",
                padding: 0,
              }}
            >
              <Typography className={style.title} variant="h6" gutterBottom>
                Filter by keywords
              </Typography>
              <TextField
                className={style.textField}
                onChange={changeHandler}
                value={query}
                fullWidth
                id="fullWidth"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.7832 14.3911L20 18.6069L18.6069 20L14.3911 15.7832C12.8224 17.0407 10.8713 17.7246 8.86088 17.7218C3.96968 17.7218 0 13.7521 0 8.86088C0 3.96968 3.96968 0 8.86088 0C13.7521 0 17.7218 3.96968 17.7218 8.86088C17.7246 10.8713 17.0407 12.8224 15.7832 14.3911ZM13.8082 13.6605C15.0577 12.3756 15.7555 10.6532 15.7527 8.86088C15.7527 5.05267 12.6681 1.96909 8.86088 1.96909C5.05267 1.96909 1.96909 5.05267 1.96909 8.86088C1.96909 12.6681 5.05267 15.7527 8.86088 15.7527C10.6532 15.7555 12.3756 15.0577 13.6605 13.8082L13.8082 13.6605Z"
                          fill="#575757"
                        />
                      </svg>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Grid>
        </Grid>
        <Box className={style.divider}>
          <div>Results: {data?.length}</div>
          <Divider />
        </Box>
        <Grid container columns={12} justifyContent="space-between" spacing={3}>
          {!!data?.length
            ? data.map((item) => (
                <Grid mobile={8} tablet={6} laptop={4} key={item.id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="320px"
                      width="100%"
                      image={item.imageUrl}
                      alt={item.title}
                    />
                    <CardContent className={style.cardContent}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        color="text.secondary"
                        component="div"
                        className={style.cardDate}
                      >
                        {dayjs(item.publishedAt).format("MM Do YYYY")}
                      </Typography>
                      <Typography
                        className={style.cardTitle}
                        gutterBottom
                        variant="h5"
                        component="div"
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        className={style.cardSummary}
                        variant="body2"
                        color="text.secondary"
                      >
                        {item.summary}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">
                        <Link
                          className={style.link}
                          state={{ from: item }}
                          to={`/${item.id}`}
                        >
                          Read more
                        </Link>
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            : null}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
