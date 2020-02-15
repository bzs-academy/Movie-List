function showDetail(imdbID){
    const url = `http://www.omdbapi.com/?i=${imdbID}&type=movie&apikey=50587b6`;
    //alert(url);
    fetch(url)
    .then(response => response.json())
    .then(data=>{
        $('#filmInfoLabel').html(data.Title);
        $('#filmPoster').attr('src',(data.Poster=="N/A")?"https://m.media-amazon.com/images/I/81h0WjbhYDL._SS500_.jpg":data.Poster);
        $('#releaseTime').html(data.Released);
        $('#runTime').html(data.Runtime);
        $('#category').html(data.Genre);
        $('#director').html(data.Director);
        $('#writer').html(data.Writer);
        $('#actors').html(data.Actors);
        $('#plot').html(data.Plot);
    })
    .catch(err=>{
        console.log(err);
    })
}

function searcMovie() {
    let keyword=document.getElementById('keyword').value;
    const url = `http://www.omdbapi.com/?s=${keyword}&type=movie&apikey=50587b6`;
    console.log(url);
    fetch(url)
    //if use like this we can not use return.
    //if we use {} after arrow we have to use return
        .then(response=>response.json()
        )
        .then(data=>{
            $('#movieList').html('');
            data.Search.map(value=>{
                $('#movieList').append(`<div class="card" style="width: 18rem;">
                    <img src='${(value.Poster=="N/A")?"https://m.media-amazon.com/images/I/81h0WjbhYDL._SS500_.jpg":value.Poster}' class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 id='title' class="card-title">${value.Title}</h5>
                    <p id="date" class="card-text">${value.Year}</p>
                    <button data-toggle="modal" data-target="#filmInfo" onclick='showDetail("${value.imdbID}")' class="btn btn-primary">Go somewhere</button>
                    
                    </div>
                </div>`);
            })

            
            

          //document.getElementById('poster').setAttribute('src',data.Search[0].Poster)
            
        })
        .catch(err=>{
            console.log(err);
        });
}

//$('#keyword').keyup(function) is the shorthand of $('#keyword').on("keyup", function)
$('#keyword').on("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      searcMovie();
    }
  });