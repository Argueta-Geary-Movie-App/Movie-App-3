"use strict";

/* FETCH GLITCH API */
function fetchFavoriteMovies() {
    fetch('https://aluminum-coral-comic.glitch.me/movies')
        .then(response => {
            console.log(response);
            // const data = response.json();
            if (!response.ok) {
                throw Error('ERROR');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            const favoriteHTML = data.map(favMovie => {
                return `
                        <!-- Movie Card -->
                    <div id="card" class="card-deck" style="margin: 4rem;">
                        <div class="card">
                        <h5 class="card-title">${favMovie.title}</h5>
                            <div class="card-body">
                                <img class="card-img-top" src="${favMovie.poster}" alt="Movie Title" style="width: 250px; height: 30vh;">
                                <p class="director">Director: ${favMovie.director}</p>
                                <p class="rated">Rated: ${favMovie.rated}</p>
                                <p class="genre">Genre: ${favMovie.genre}</p>
                                 <p class="rating">Rating: ${favMovie.rating}</p>
                            </div>
                            <div class="card-footer">
                                <button type="button" id="edit">Edit</button>
                                <button type="button" id="delete">Delete</button>
                            </div>
                        </div>
                    </div>
                `;
            })
                .join("");
            // console.log(html);
            $('#favoriteWatchlist').html(favoriteHTML);
        });
}
fetchFavoriteMovies();

/* LOADER */
document.onreadystatechange = function () {
    if (document.readyState !== "complete") {
        document.querySelector("body").style.visibility = "hidden";
        document.querySelector("#loader").style.visibility = "visible";
    } else {
        setTimeout(() => {
            document.querySelector("#loader").style.display = "none";
            document.querySelector("body").style.visibility = "visible";}, 1000);

    }
};


//CALLING DOM WITH #searchText (input) and .find-movie (button)
$(document).ready(() => {
    $('.find-movie').on('click', (e) => {
        let title = $('#searchText').val();
        searchMovies(title);
        e.preventDefault();
    });
});


//FETCH OMDb API TO SEARCH NEW MOVIES
function searchMovies(title) {
    fetch(`https://www.omdbapi.com/?t=${title}&apikey=${OMDB_KEY}`)
        .then(response => {
            console.log(response);
            // const data = response.json();
            if (!response.ok) {
                throw Error('ERROR');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            const searchData = data;
            let searchOutput = '';
            $.each(searchData, (index, newMovie) => {
                searchOutput =+ `<div id="card" class="card-deck" style="margin: 4rem;">
                        <div class="card">
                        <h5 class="card-title">${newMovie.title}</h5>
                            <div class="card-body">
                                <img class="card-img-top" src="${newMovie.poster}" alt="Movie Title" style="width: 250px; height: 30vh;">
                                <p class="director">Director: ${newMovie.director}</p>
                                <p class="rated">Rated: ${newMovie.rated}</p>
                                <p class="genre">Genre: ${newMovie.genre}</p>
                                 <p class="rating">Rating: ${newMovie.rating}</p>
                            </div>
                            <div class="card-footer">
                                <button type="button" id="edit">Edit</button>
                                <button type="button" id="delete">Delete</button>
                            </div>
                        </div>
                    </div>`;
            });

            $('#searchMovies').html(searchOutput);

        }).catch((err) => {
            console.log(err);
    });
}

// searchMovies("toy story");
// searchMovies("300");
// searchMovies("crazy, stupid, love");


// /* EVENT LISTENERS */
// $('#find-movie').on('click', function () {
//     alert("Search button works.");
// });