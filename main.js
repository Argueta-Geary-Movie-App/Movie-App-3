"use strict";

/* FETCH GLITCH API */
function fetchMovies() {
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
            const html = data.map(movie => {
                return `
                        <!-- Movie Card -->
                    <div id="card" class="card-deck" style="margin: 4rem;">
                        <div class="card">
                        <h5 class="card-title">${movie.title}</h5>
                            <div class="card-body">
                                <img class="card-img-top" src="${movie.poster}" alt="Movie Title" style="width: 250px; height: 30vh;">
                                <p class="director">Director: ${movie.director}</p>
                                <p class="rated">Rated: ${movie.rated}</p>
                                <p class="genre">Genre: ${movie.genre}</p>
                                 <p class="rating">Rating: ${movie.rating}</p>
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
            $('#favoriteWatchlist').html(html);
        });
}
fetchMovies();

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

/* EVENT LISTENERS */
$('#find-movie').on('click', function () {
    alert("Search button works.");
});