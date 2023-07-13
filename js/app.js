// IIFE = immediate Invoked Function Expression

(async function () {
    const response = await fetch("data.json")
    const movies = await response.json();
    console.log(movies);

    const genreid = document.getElementById("genreid");
    const years = document.getElementById("years");
    const languages = document.getElementById("languages");
    const rating = document.getElementById("rating");
    const searchBtn = document.getElementById("searchBtn");



    function search() {
    
        const results = movies.filter(function (movie) {
            return (String(movie.vote_average).includes(rating.value)
            || movie.release_date.includes(years.value)
            && String(movie.genres).includes(genreid.value)
            || movie.original_language.includes(languages.value)
            || (rating.value === "all") 
            || (genreid.value === "all") 
            || (years.value === "all") 
            || (languages.value === "all")
             )

        })
        console.log(results)
        const moviebox = document.querySelector("#mainMovieList");
        moviebox.innerHTML = "";
        function showData(result) {
            results.forEach(
                (item) => {
                    const movieList = document.createElement("tr");
                    movieList.setAttribute("id", "moviebox");
                    movieList.innerHTML = `
                        <td id="rank">${item.vote_count}</td>
                        <td id="main_info">
                            <img src="${"https://image.tmdb.org/t/p/w45" + item.poster_path}" alt="image one">
                            <h3 id="title">${item.title}</h3>
                            <p><span class="certification">${item.certification}</span><span class="genres">${item.genres}</span> <span class="time"><span class="dot"></span>${Math.floor(item.runtime/60)} hr and ${item.runtime%60} min</span></p>
                        </td>
                        <td id="year">${item.release_date.slice(0, -6)}</td>
            `;
                    moviebox.appendChild(movieList);
                })
        }
        showData(results);
    }


searchBtn.addEventListener("click", search)
   

  
    
    

     // Render Genre Script here

    const showgenre = (movie) => {

        

        movies.forEach((item) => {
            const genreid = document.getElementById("genreid");
            const option = document.createElement("option");
            option.innerHTML = `
            <option value="${item.genres}">${item.genres}</option>
            `;
            genreid.appendChild(option)
        })
    }

    showgenre(movies)

     // Render Years Script here

    const showyears = (movies) => {
        const years = new Set(movies.map(movie => movie.release_date.slice(0, -6)));
        const sortedYear = Array.from(years).sort((a, b) => b - a)
        const select = document.getElementById("years");
        // select.innerHTML = '';

        sortedYear.forEach(
            (year) => {
                const option = document.createElement("option");
                option.value = year;
                option.textContent = year
                select.appendChild(option)
            })

    }
    showyears(movies);

     // Render Language Script here

    const showlang = (movies) => {

        const languages = new Set(movies.map(movie => movie.original_language));

        const select = document.getElementById("languages");
        // select.innerHTML = "";

        languages.forEach(
            (lang) => {
                const option = document.createElement("option");
                option.value = lang;
                option.textContent = lang;
                select.appendChild(option);
            })
    }

    showlang(movies);

    // Render Rating Script here

    const showRating = (movies) => {
        const rating = new Set(movies.map(movie => movie.vote_average));
        const sortedRating = Array.from(rating).sort((a, b) => b - a)
        const sortedJustNumber = sortedRating.map(Number);
        const uniqueArr = [...new Set(sortedJustNumber)];
        const select = document.getElementById("rating");
        // select.innerHTML = "";

        uniqueArr.forEach(
            (rate) => {
                const option = document.createElement("option");
                option.value = rate;
                option.textContent = rate;
                select.appendChild(option);
            })
    }
    showRating(movies);

})()


document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  });

  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.keyCode == 85) {
      e.preventDefault();
    }
  });