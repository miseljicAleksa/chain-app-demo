import React, { useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { getUser, resetUserSession } from "../service/AuthService";
import axios from "axios";
import { RapidApiContext } from "../RapidApiContext";
import Link from "@mui/material/Link";
import CircularProgress from "@mui/material/CircularProgress";
import styled from 'styled-components'

const StyledCircularProgress = styled(CircularProgress)`
  background-color: 'red';
  margin-top: 25%;
  margin-left: 50%;
`

const options = {
  method: 'GET',
  url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/TrendingNewsAPI',
  params: {pageNumber: '1', pageSize: '10', withThumbnails: 'true', location: 'us'},
  headers: {
    'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com',
    'X-RapidAPI-Key': 'c066f48bd1msh1d2d2c38fc23799p1060bbjsn5dc9e0bb85d5'
  }
};

export const RapidApiContent = (props) => {
  const [rapidContent, setRapidContent] = useContext(RapidApiContext);

  useEffect(() => {
    axios
      .request(options)
      .then((response) => {
        setRapidContent(response.data.value);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const user = getUser();
  const name = user !== "undefined" && user ? user.name : "";

  const logoutHandler = () => {
    resetUserSession();
  };

  return (
    <main>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Typography margin="30px">
          Hello {name}! If you are bored with this demo news app you can always 
          <a style={{textDecoration: "none", color: 'blue'}}href="/login" onClick={logoutHandler}> Log out </a>
          :D
        </Typography>

        <Grid container spacing={4}>
          {rapidContent ? (
            rapidContent.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                    }}
                    image={
                      card.image.url || "https://source.unsplash.com/random"
                    }
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.title || "No title"}
                    </Typography>
                    <Typography>
                      {card.description || "No description"}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link href={card.url} >
                      View Full Article
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <StyledCircularProgress />
          )}
        </Grid>
      </Container>
    </main>
  );
};
