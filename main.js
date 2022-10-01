"use strict";

/* FETCH GLITCH API */
// function fetchFavoriteMovies() {
//     fetch('https://aluminum-coral-comic.glitch.me/movies')
//         .then(response => {
//             console.log(response);
//             // const data = response.json();
//             if (!response.ok) {
//                 throw Error('ERROR');
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log(data);
//             const favoriteHTML = data.map(favMovie => {
//                 return `
//                         <!-- Movie Card -->
//                     <div id="favCard" class="card" style="margin: 4rem;">
//                         <div class="fav-card-content">
//                         <h5 class="fav-title">${favMovie.title}</h5>
//                             <div class="fav-body">
//                                 <img class="fav-poster" src="${favMovie.poster}" alt="Movie Title" style="width: 250px; height: 30vh;">
//                                 <p class="fav-director">Director: ${favMovie.director}</p>
//                                 <p class="fav-rated">Rated: ${favMovie.rated}</p>
//                                 <p class="fav-genre">Genre: ${favMovie.genre}</p>
//                                  <p class="fav-rating">Rating: ${favMovie.rating}</p>
//                             </div>
//                             <div class=" card-footer fav-footer">
//                                 <button type="button" id="edit">Edit</button>
//                                 <button type="button" id="delete">Delete</button>
//                             </div>
//                         </div>
//                     </div>
//                 `;
//             })
//                 .join("");
//             // console.log(html);
//             $('#favoriteWatchlist').html(favoriteHTML);
//         });
// }
// fetchFavoriteMovies();

function fetchFavoriteMovies() {
    fetch('https://www.omdbapi.com/?t=${title}&apikey=${OMDB_KEY}')
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
                    <div id="favCard" class="card" style="margin: 4rem;">
                        <div class="fav-card-content">
                        <h5 class="fav-title">${favMovie.title}</h5>
                            <div class="fav-body">
                                <img class="fav-poster" src="${favMovie.poster}" alt="Movie Title" style="width: 250px; height: 30vh;">
                                <p class="fav-director">Director: ${favMovie.director}</p>
                                <p class="fav-rated">Rated: ${favMovie.rated}</p>
                                <p class="fav-genre">Genre: ${favMovie.genre}</p>
                                 <p class="fav-rating">Rating: ${favMovie.rating}</p>
                            </div>
                            <div class=" card-footer fav-footer">
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
            const searchData = data.Search;
            let searchOutput = '';
            $(this).each(searchData, (index, newMovie) => {
                searchOutput =+ `<div id="searchCard" class="card" style="margin: 4rem;">
                        <div class="search-card-content">
                        <h5 class="search-title">${newMovie.title}</h5>
                            <div class="search-body">
                                <img class="search-poster" src="${newMovie.poster}" alt="Movie Title" style="width: 250px; height: 30vh;">
                                <p class="search-director">Director: ${newMovie.director}</p>
                                <p class="search-rated">Rated: ${newMovie.rated}</p>
                                <p class="search-genre">Genre: ${newMovie.genre}</p>
                                 <p class="search-rating">Rating: ${newMovie.rating}</p>
                            </div>
                            <div class="card-footer search-footer">
                                <button type="button" id="add">ADD</button>
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