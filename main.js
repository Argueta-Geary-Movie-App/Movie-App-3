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
                    <div id="card">
                        <div class="movie">
                            <p class="title">Title: ${movie.title}</p>
                            <p class="director">Director: ${movie.director}</p>
                            <p class="rating">Rating: ${movie.rating}</p>
                            <p class="genre">Genre: ${movie.genre}</p>
                            <p class="plot">Plot: ${movie.plot}</p>
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