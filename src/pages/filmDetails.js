import React from "react";
import { Card, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { colors } from "../colors";
import "./filmDetails.scss";

function FilmDetails() {
  const location = useLocation();
  const card = location.state.item;
  const [infoTrailer, setInfoTrailer] = useState([]);
  const [actors, setActors] = useState([]);

  const goBack = () => {
    window.history.back();
  };

  console.log(card);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNWJhNjMxNmVkYWE3ZjZjODEzOGIxYzA0YTBmNjFmYiIsInN1YiI6IjY0YTk2NzNjM2UyZWM4MDE0ZjQ3Y2FmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6irhl0Ymy8rvMJ-HYLbPmnV11vEylLp545X3rqDQ7So",
    },
  };

  const fetchAct = (id) => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, options)
      .then((response) => response.json())
      .then((response) => {
        setActors(response.cast.slice(0, 6));
        console.log(response);
      })
      .catch((err) => console.error(err));
  };

  const fetchTrailer = (id) => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos`, options)
      .then((response) => response.json())
      .then((response) => setInfoTrailer(response.results))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchTrailer(card.id);
    fetchAct(card.id);
  }, []);

  const handleClickLink = (info) => {
    window.open("https://www.youtube.com/watch?v=" + info.key);
  };
  const trailer = infoTrailer.find((trail) => trail.type === "Trailer");

  return (
    <div>
      <Card className="my-3 p-3 border, cards">
        <div>
          <Button
            variant="secondary"
            className="additionalRemoveTwo"
            style={{
              color: colors.red,
              backgroundColor: colors.black,
              position: "absolute",
              left: "30px",
            }}
            onClick={() => goBack()}
          >
            Back
          </Button>
        </div>
        <Card.Img
          variant="top"
          src={`https://image.tmdb.org/t/p/original/${card.backdrop_path}`}
          style={{ height: "30%", width: "60%" }}
        />
        <Card.Body>
          <Card.Title>{card.original_title}</Card.Title>
          <Card.Text>{card.overview}</Card.Text>
          <Card.Text
            style={{
              color: card.vote_average > 6.5 ? colors.green : colors.red,
            }}
          >
            {card.vote_average}
          </Card.Text>

          <Button
            variant="secondary"
            className="goBackButton"
            style={{ color: colors.red, backgroundColor: colors.black }}
            onClick={() => handleClickLink(trailer)}
          >
            Watch trailer
          </Button>
        </Card.Body>
      </Card>
      <div className="cards">
        {actors.map((item) => (
          <Card
            style={{ width: "300px", height: "400px", marginBottom: "15px" }}
            className="cardUp"
            key={item.id}
            id={item.id}
          >
            <div className="imgCard">
              <Card.Img
                variant="top"
                src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
                style={{
                  width: "250px",
                  height: "300px",
                  marginTop: "15px",
                }}
              />
            </div>
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}
export default FilmDetails;
