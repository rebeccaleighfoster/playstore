const express = require('express');

const app = express();

const data = require('./data.js');

const filterByGenre = (genres) => {
  const filteredData = data.filter((currentElem) => currentElem.Genres === genres);
  return filteredData;
}

const filterByRating = (filteredData, sortBy) => {
  if (sortBy) {
    return filteredData.sort((currentElem, prevElem) => {
      if (sortBy === "rating") {
        return parseFloat(prevElem.Rating) - parseFloat(currentElem.Rating);
      } else {
        return currentElem.App.localeCompare(prevElem.App);
      }
    });
  } else {
    return data;
  }
}

app.get("/apps", (req, res) => {
  const { genres, sort } = req.query;
  let initialData = filterByRating(data, sort);
  if (genres) {
    initialData = filterByGenre(genres);
  }
  res.json(initialData);
});

app.listen(8000, () => {
  console.log(`Running at 8000`)
});
