import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import style from "./home.module.scss";
import Highlighter from "react-highlight-words";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { getAllByScore, getCardsList } from "../../redux/cardSlice";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
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
    desktop: true;
    laptop: true;
    tablet: true;
    mobile: true;
    xl: false;
    lg: false;
    md: false;
    sm: false;
    xs: false;
  }
}
const advancedFormat = require("dayjs/plugin/advancedFormat");
dayjs.extend(advancedFormat);

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState<string>("");
  const data = useAppSelector((state) => getAllByScore(state, query));
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const fetchInitialData = async () => {
    await dispatch(getCardsList(21));
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  return (
    <ThemeProvider
      theme={createTheme({
        breakpoints: {
          values: {
            mobile: 480,
            tablet: 960,
            laptop: 1366,
            desktop: 1440,
          },
        },
      })}
    >
      <Box className={style.containerHome}>
        <Grid container columns={12} justifyContent="start">
          <Grid item mobile={8} tablet={6} laptop={6}>
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
                placeholder="Case sensitivity"
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
          <Typography variant="subtitle2" gutterBottom>
            Results: {data?.length}
          </Typography>
          <Divider />
        </Box>
        <Grid
          container
          columns={{ mobile: 12, tablet: 12, laptop: 12 }}
          justifyContent="space-between"
          spacing={3}
        >
          {!!data?.length
            ? data.map((item) => (
                <Grid
                  item
                  justifySelf={{ mobile: "center", tablet: "space-between" }}
                  mobile={12}
                  tablet={6}
                  laptop={4}
                  key={item.id}
                >
                  <Card className={style.cardWrapper}>
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
                      <Highlighter
                        className={style.cardTitle}
                        searchWords={[query]}
                        textToHighlight={item.title}
                      />
                      <Highlighter
                        className={style.cardSummary}
                        searchWords={[query]}
                        textToHighlight={item.summary}
                      />
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
