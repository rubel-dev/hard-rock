  document.getElementById('search-btn').addEventListener('click',handleSearchResult)
  
 
 function handleSearchResult(){
   document.getElementById('result').innerHTML =''
  const song_name = document.getElementById('song-input').value; 
  console.log(song_name)
 fetch(`https://api.lyrics.ovh/suggest/${song_name}`)
 .then(response => response.json())
 .then(data =>{
      console.log(data)
      for(let i =0;i < data.data.length; i++){
        const title =data.data[i].title
        const duration = data.data[i].duration
        const name = data.data[i].artist.name
        if(i == 10){
          break;
        }
        document.getElementById('result').innerHTML += `
        
        <div class="search-result col-md-8 mx-auto py-4">
        <!-- single result -->
        <div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name">${title} </h3>
                <p class="author lead">Album by <span>${name}</span></p>
                <p><small>${duration}s</small></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick ="handleLyrics(${i})" class="btn btn-success">Get Lyrics</button>
            </div>
        </div> 
        
        ` 
      }
  })
 
}

function handleLyrics(i){
  const song_name = document.getElementById('song-input').value; 
   
 fetch(`https://api.lyrics.ovh/suggest/${song_name}`)
 .then(response => response.json())
 .then(data =>{
   console.log(i)
        const artist = data.data[i].artist.name
        const title = data.data[i].title

        console.log(artist,title)
        fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then(res => res.json())
        .then(result =>{
            const lyrics = result.lyrics;
            console.log(lyrics)
            document.getElementById('search-result').innerHTML = ` <pre class="lyric text-white">${lyrics} </pre>`
         
        })
 })

  
 
}