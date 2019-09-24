document.addEventListener('click', event => {
    if (event.target.className === 'motorcycle') {
      let motorcycle = event.target.dataset.motorcycle

      let url = `https://api.giphy.com/v1/gifs/search?q=${motorcycle}&api_key=dc6zaTOxFJmzC&limit=10`

      fetch(url)
        .then(r => r.json())
        .then(gifs => {
          console.log(gifs)
          document.getElementById('gifDisp').innerHTML = ''
          gifs.data.forEach(gif => {
            let gifElem = document.createElement('img')
            
            gifElem.src = gif.images.original_still.url
           
            gifElem.dataset.still = gif.images.original_still.url
            
            gifElem.dataset.animated = gif.images.original.url
            
            gifElem.dataset.isanimated = false
            
            gifElem.className = 'gif'

            document.getElementById('gifDisp').append(gifElem)
          })
        })
    } else if (event.target.className === 'gif') {
      if (event.target.isanimated === 'true') {
        event.target.src = event.target.dataset.still
        event.target.isanimated = 'false'
      } else {
        event.target.src = event.target.dataset.animated
        event.target.isanimated = 'true'
      }
    }
  })

  document.getElementById('addMotorcycle').addEventListener('click', event => {
    event.preventDefault()
    let btnElem = document.createElement('button')
    btnElem.textContent = document.getElementById('newMotorcycle').value
    btnElem.dataset.motorcycle = document.getElementById('newMotorcycle').value
    btnElem.className = 'motorcycle'
    document.getElementById('buttons').append(btnElem)
    document.getElementById('newMotorcycle').value = ''
  })