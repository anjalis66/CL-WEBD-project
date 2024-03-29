// this is the api key, base url and image url
const APIKEY = 'api_key=96c05c6f53c2f9b20b3e42af4887dc76';
const BASEURL = 'https://api.themoviedb.org/3';
const IMAGEURL = 'https://image.tmdb.org/t/p/w500';

// geting the movie id and details
let id = '';
const urlParams = new URLSearchParams(location.search);
for(const [key, value]of urlParams){
    id = value;
}

let link = `/movie/${id}?language=en-US&append_to_response=videos&`;
let f_url = BASEURL+link+APIKEY;

apiCall(f_url);

// function to create element 
function apiCall(url){
    const x = new XMLHttpRequest();
    x.open('get',url);
    x.send();
    x.onload = function(){
        document.getElementById('movie-display').innerHTML='';
        var res=x.response;
        var Json = JSON.parse(res);
        getMovies(Json);
    }
    x.onerror =function(){
        window.alert('cannot get')
    }
}

// this function take the json data and display it on the movies details page 
function getMovies(myJson){
    // get the movie youtube link 
    var MovieTrailer = myJson.videos.results.filter(filterArray);
    // get the background image for the page 
    document.body.style.backgroundImage = `url(${IMAGEURL+myJson.backdrop_path}), linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0) 250%)`;
    var movieDiv = document.createElement('div');
    movieDiv.classList.add('each-movie-page');

  

    // html for the movie details page 
    movieDiv.innerHTML = `
        <div class="movie-poster">
            <img src=${IMAGEURL+myJson.poster_path} alt="Poster">
        </div>
        <div class="movie-details">
            <div class="title">
                ${myJson.title}
            </div>

            <div class="tagline">${myJson.tagline}</div>

            <div style="display: flex;"> 
                <div class="movie-duration">
                    <b><i class="fas fa-clock"></i></b> ${myJson.runtime}
                </div>
                <div class="release-date">
                    <b>Raleased</b>: ${myJson.release_date}
                </div>
            </div>

            <div class="rating">
                <b>IMDb Rating</b>: ${myJson.vote_average}
            </div>

           

          
            <div class="plot">
                ${myJson.overview}
            </div>
        </div>
    `;

    document.getElementById('movie-display').appendChild(movieDiv);  
}

// filter array for video 
function filterArray(obj){
    var vtitle = obj.name 
    var rg = /Official Trailer/i;
    if(vtitle.match(rg)){
        return obj;
    }
}