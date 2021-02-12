/*
 * Name: Ajaz Syed
 * This is the index.js script. By accessing the Lyrics API, this file
 * grabs the lyrics to any song by providing the song name and artist name.
 */

"use strict";
(function() {

  window.addEventListener("load", init);
  const BASE_URL = "https://api.lyrics.ovh/v1";

  /**
   * Initializes the page at load event
   */
  function init() {
    qs("#get-lyrics").addEventListener("click", makeRequest);
  }

  /**
   * Makes request to api and grabs song lyrics data
   */
  function makeRequest() {
    let artistName = id("artist-search").value;
    let songName = id("song-search").value;
    let url = BASE_URL + "/" + artistName + "/" + songName;
    fetch(url)
      .then(checkStatus)
      .then(response => response.json())
      .then(processData)
      .catch(handleError);
  }

  /**
   * Gets lyrics of song and displays onto page
   * @param {object} data - JSON object from the cities API
   */
  function processData(data) {
    id("lyric-list").innerHTML = "";
    let songLyrics = document.createElement("p");
    songLyrics.innerText = data.lyrics;
    id("lyric-list").appendChild(songLyrics);
  }

  /**
   * Displays an error message to the user, if an error occurs when fetching from the cities API.
   */
  function handleError() {
    id("lyric-list").innerHTML = "";
    let errorMessage = document.createElement("article");
    let message = document.createElement("p");
    errorMessage.classList.add("error");

    message.textContent = "No lyrics found, try something else.";
    errorMessage.appendChild(message);
    id("lyric-list").appendChild(errorMessage);
  }

  /**
   * Return the response's result text if successful, otherwise
   * throw an Error if the fetch response status is not ok before processing the data
   * Checks status of....
   * @param {object} response - response to check for success/error
   * @return {object} if response is ok, then returns reponse otherwise throws error
   */
  function checkStatus(response) {
    if (response.ok) {
      return response;
    } else {
      throw Error("Error in request: " + response.statusText);
    }
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID.
   * @returns {object} - DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Returns first element matching selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} - DOM object associated selector.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }
})();