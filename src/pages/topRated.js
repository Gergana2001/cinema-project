import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import "./popular.scss";
import { colors } from "../colors";

function TopRatedMovies() {
  const MAX_CLICKS = 3;
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterButton, setFilteredButton] = useState(false);
  const [filteredInfo, setFilteredInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);
  const [genre, setGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("Filter by genre");
  const [sortingOption, setSortingOption] = useState("Sort");
  const navigate = useNavigate();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNWJhNjMxNmVkYWE3ZjZjODEzOGIxYzA0YTBmNjFmYiIsInN1YiI6IjY0YTk2NzNjM2UyZWM4MDE0ZjQ3Y2FmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6irhl0Ymy8rvMJ-HYLbPmnV11vEylLp545X3rqDQ7So",
    },
  };

  let fetchData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${currentPage}`,
      options
    )
      .then((response) => {
        setIsLoading(false);
        return response.json();
      })
      .then((info) => {
        const newData = info.results;
        setProducts((prevData) => [...prevData, ...newData]);
      })
      .catch((error) => console.log(error));
  };

  let fetchGenre = () => {
    fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options)
      .then((response) => response.json())
      .then((response) => {
        setGenre(response);
        console.log(response);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    fetchGenre();
  }, []);

  const onClickGenre = (id) => {
    const result = products.map((element) =>
      element.genre_ids.includes(id) ? element : null
    );
    const filteredResult = result.filter((element) => element !== null);
    setFilteredInfo(filteredResult);
    setFilteredButton(true);
    const genreId = genre.genres.find((element) =>
      element.id === id ? element.name : null
    );
    setSelectedGenre(genreId.name);
  };

  const generateRandomPrice = (min, max) => {
    return (Math.random() * (max - min) + min).toFixed(2);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      FetchSearch(searchQuery);
      setFilteredButton(true);
    }
  };
  const onClickSearchButton = (event) => {
    event.preventDefault();
    FetchSearch(searchQuery);
    setFilteredButton(true);
  };

  const FetchSearch = (param) => {
    fetch(`https://api.themoviedb.org/3/search/movie?query=${param}`, options)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        setFilteredInfo(response.results);
      })
      .catch((error) => console.log(error));
  };
  const clearFilter = () => {
    setFilteredInfo(products);
    setFilteredButton(false);
    setSearchQuery("");
    setSortingOption("Sort");
    setSelectedGenre("Filter by genre");
  };

  useEffect(() => {
    setFilteredInfo(products);
  }, [products]);

  const handleLoadMore = () => {
    if (count < MAX_CLICKS) {
      setCurrentPage((prevPage) => prevPage + 1);
      setCount((prevCount) => prevCount + 1);
    }
  };

  const handleAscending = () => {
    const numAscending = [...products].sort((a, b) =>
      a.original_title.localeCompare(b.original_title)
    );
    setFilteredInfo(numAscending);
    setFilteredButton(true);
    setSortingOption("Alphabetical a-z");
  };

  const handleDescending = () => {
    const numAscending = [...products].sort((b, a) =>
      a.original_title.localeCompare(b.original_title)
    );
    setFilteredInfo(numAscending);
    setFilteredButton(true);
    setSortingOption("Alphabetical z-a");
  };

  const handleVoteDescending = () => {
    const numAscending = [...products].sort((a, b) => {
      const voteA = parseFloat(a.vote_average);
      const voteB = parseFloat(b.vote_average);
      return voteA - voteB;
    });
    setFilteredInfo(numAscending);
    setFilteredButton(true);
    setSortingOption("Vote descending");
  };

  const handleVoteAscending = () => {
    const numAscending = [...products].sort((a, b) => {
      const voteA = parseFloat(a.vote_average);
      const voteB = parseFloat(b.vote_average);
      return voteB - voteA;
    });
    setFilteredInfo(numAscending);
    setFilteredButton(true);
    setSortingOption("Vote ascending");
  };
  const handleInputValue = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    if (show) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [show]);

  return (
    <div>
      <div className="headers">
        <h4>
          Discover the hottest blockbusters in our category, featuring a wide
          selection of movie discs for sale to keep you entertained for hours.
        </h4>
      </div>
      <div className="searchInput">
        <DropdownButton
          id="dropdown-basic-button"
          title={selectedGenre}
          variant="secondary"
          className="genreSearch"
        >
          {genre.genres &&
            genre.genres.map((item) => (
              <Dropdown.Item
                key={`topRated/${item.id}`}
                variant="secondary"
                onClick={() => onClickGenre(item.id)}
              >
                {item.name}
              </Dropdown.Item>
            ))}
        </DropdownButton>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search Film"
            className="me-2"
            aria-label="Search"
            onChange={handleInputValue}
            onKeyDown={handleKeyDown}
            value={searchQuery}
          />
          <Button
            type="submit"
            onClick={onClickSearchButton}
            variant="secondary"
          >
            Search
          </Button>
        </Form>
        <div className="sortingContainer">
          <DropdownButton
            id="dropdown-basic-button"
            title={sortingOption}
            variant="secondary"
          >
            <Dropdown.Item onClick={handleAscending}>
              Alphabetical a-z
            </Dropdown.Item>
            <Dropdown.Item onClick={handleDescending}>
              Alphabetical z-a
            </Dropdown.Item>
            <Dropdown.Item onClick={handleVoteAscending}>
              Vote ascending
            </Dropdown.Item>
            <Dropdown.Item onClick={handleVoteDescending}>
              Vote descending
            </Dropdown.Item>
          </DropdownButton>
          {filterButton ? (
            <Button
              variant="secondary"
              className="additionalRemove"
              onClick={() => clearFilter()}
              style={{
                color: colors.red,
                backgroundColor: colors.black,
                marginLeft: "10px",
              }}
            >
              Clear Filters
            </Button>
          ) : null}
        </div>
      </div>
      {show ? (
        <div>
          <Alert variant="success" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Successfully added to the card!</Alert.Heading>
          </Alert>
        </div>
      ) : null}

      <div className="product-container">
        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : filteredInfo ? (
          filteredInfo.map((item) => (
            <Card className="everyCard" key={`topRated-${item.id}`}>
              <Card.Img
                variant="top"
                src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                style={{
                  width: "95px",
                  height: "150px",
                  marginTop: "10px",
                }}
              />
              <Card.Body>
                <Card.Title>{item.original_title}</Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  Price: ${generateRandomPrice(45, 60)}
                </ListGroup.Item>
                <ListGroup.Item>{item.overview}</ListGroup.Item>
                <ListGroup.Item
                  style={{
                    color: item.vote_average > 6.5 ? colors.green : colors.red,
                  }}
                >
                  {item.vote_average}
                </ListGroup.Item>
                <ListGroup.Item>
                  <div
                    style={{
                      justifyContent: "space-evenly",
                      display: "flex",
                    }}
                  >
                    <Button
                      onClick={() => setShow(true)}
                      variant="secondary"
                      style={{
                        color: colors.red,
                        backgroundColor: colors.black,
                      }}
                    >
                      Add to cartd
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        navigate(`/topRated/${item.id}`, {
                          state: { item },
                        });
                      }}
                      style={{
                        color: colors.red,
                        backgroundColor: colors.black,
                      }}
                    >
                      More details
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
      <div className="loadMore">
        <p>{filteredInfo.length} out of 80 </p>
      </div>
      {count < MAX_CLICKS ? (
        <Button
          variant="secondary"
          onClick={() => handleLoadMore()}
          style={{
            color: colors.red,
            backgroundColor: colors.black,
          }}
        >
          Load more
        </Button>
      ) : null}
    </div>
  );
}

export default TopRatedMovies;
