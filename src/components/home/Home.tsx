import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CardType } from "../../assets/types/cardType";
import Filter from "../filter/Filter";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";
import style from "./home.module.scss";

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
  const [data, setData] = useState<CardType[]>();

  const getDate = (item: CardType) => {
    const temp = new Date(item.publishedAt);
    let result = `${temp.toString().slice(4, 8)} ${temp
      .toString()
      .slice(8, 10)}th, ${temp.toString().slice(11, 15)}`;
    return result;
  };

  useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios.get<CardType[]>(
          "https://api.spaceflightnewsapi.net/v3/articles?_limit=21",
          {
            headers: { Accept: "application/json" },
          }
        );
        setData(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("error message: ", error.message);
          return error.message;
        } else {
          console.log("unexpected error: ", error);
          return "An unexpected error occurred";
        }
      }
    }
    getData();
  }, []);
  console.log(data);
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
          {data !== undefined
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
                        <Link className={style.link} state={{ from: item }} to={`/${item.id}`}>
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
