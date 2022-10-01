"use strict";

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

// function fetchFavoriteMovies() {
//     fetch('https://www.omdbapi.com/?t=${title}&apikey=${OMDB_KEY}')
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


//CALLING THE DOM: SEARCH BOX AND THE DIV WHERE WE WILL DISPLAY THE DATA
let searchBox = $('.search-input');
console.log(searchBox);
let searchMovieContent = $('#cardSearchMovie');
console.log(searchMovieContent);



//CALLING THE OMDb API USING THE S FOR SEARCH PARAMETER TO CALL EVERY POSSIBLE MOVIE WITH THE SAME KEYWORD AS THE USER INPUTS.
async function fetchSearch(searchTitle) {
    const URL = `https://www.omdbapi.com/?s=${searchTitle}&apikey=${OMDB_KEY}`;
    let res = await fetch(`${URL}`);
    let data = await res.json();
    if(data.Response == "True") console.log(data.Search);
    // displaySearchContent(data.Search);
}

//TESTING FUNCTION OUT
fetchSearch("avengers");
fetchSearch("Fast and Furious");
fetchSearch("STAR WARS");


//ADDING CLICK EVENT: THE INPUT FORM #search-input
function searchMovie() {
    //NOT CASE SENSITIVE AND ALSO TRIMS WHITESPACE
    let searchTitle = searchBox.val().toLowerCase().trim();
    console.log(searchTitle);

    //DISPLAY HIDDEN DEFAULT TO NOT SHOW ANYTHING UNTIL THE USER INPUTS A VALUE
    if(searchTitle.length > 0) {
        searchMovieContent.removeClass('hide-search-card');
        fetchSearch(searchTitle);
    } else {
        searchMovieContent.addClass('hide-search-card');

    }

}


//DISPLAY EVERY MOVIE WITH THE SAME KEYWORD
function displaySearchContent(movies) {
    searchMovieContent.innerHTML= '';

    //BASED ON THE INDEX GIVEN FROM THE JSON RESPONSE OBJECT, WE WILL SORT THRU
    for(let i = 0; i < movies.length; i++) {

        //CHECKING THE FORM INPUT WORKS; THIS CREATES A DIV TAG EACH TIME I TYPE
        // let movieSelection = document.createElement('div');
        // console.log(movieSelection);


        //FETCHING THE MOVIE ID
        // movieSelection.dataset.id = movies[i].imdbID;

        //WE CAN ADD ANOTHER POSTER TO THOSE THAT HAVE A N/A VALUE
        // if(movies[i].Poster != "N/A") {
        //     searchPoster = movies[i].Poster;
        // } else {
        //     searchPoster = ":("; //SRC HERE
        // }

        //RENDERING THE NEW HTML
        // movieSelection.innerHTML += `<div class="cardBody">
        //         <h3>${movies[i].Title}</h3>
        //         <img src= "${searchPoster}" class="search-poster">
        //         <p class="search-year">${movies[i].Year}</p>
        //         <button type="submit" id="add">Add Movie</button>
        //     </div>`;

    }
}



