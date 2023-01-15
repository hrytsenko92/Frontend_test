import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CardType } from "../../assets/types/cardType";
import Filter from "../filter/Filter";
import * as dayjs from 'dayjs'
import axios from "axios";
import style from "./home.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { RootState } from "../../redux/store";
import {
  // add,
  getAllByScore,
  getCardsList,
  selectors,
} from "../../redux/cardSlice";

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

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => getAllByScore(state, ""));

  const getDate = (item: CardType) => {
    const temp = new Date(item.publishedAt);
    const result = `${temp.toString().slice(4, 8)} ${temp
      .toString()
      .slice(8, 10)}th, ${temp.toString().slice(11, 15)}`;
    return result;
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    await dispatch(getCardsList(21));
  };

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
            <Filter />
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
                        {getDate(item)}
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
