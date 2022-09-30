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
                    <div id="card" class="card-deck">
                        <div class="card">
                            <img class="card-img-top" src=".../100px180/" alt="Movie Title">
                            <div class="card-body">
                                <h5 class="card-title">${movie.title}</h5>
                                <p class="director">Director: ${movie.director}</p>
                                <p class="rating">Rating: ${movie.rating}</p>
                                <p class="genre">Genre: ${movie.genre}</p>
                                <p class="plot">Plot: ${movie.plot}</p>
                            </div>
                            <div class="card-footer">
                                <small class="text-muted">Add buttons here soon</small>
                            </div>
                        </div>
                    </div>
                `;
            })
                .join("");
            // console.log(html);
            $('#app').html(html);
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