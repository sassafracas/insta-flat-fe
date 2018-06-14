//<div class="image-container">
//    <img src="https://scontent-lga3-1.cdninstagram.com/vp/bd9b15079ec27c52c076e9c7792bdc04/5B992309/t51.2885-15/s640x640/sh0.08/e35/c180.0.719.719/31449135_2115995735352355_6317812590797914112_n.jpg">
//    <p>
//        <img data-action="like-image" data-image-id="1" class="like-button" src="./images/like.png"><br>
//        <span id="likes-count-for-image-1">41</span>
//    </p>
//</div>

document.addEventListener("DOMContentLoaded", function (){
  const imagesURL = "http://localhost:3000/api/v1/images"
  const likesURL = "http://localhost:3000/api/v1/likes"
  const likeButton = document.getElementById("like-button")
  const inputForm = document.getElementById("post-image-form")
  const inputFormInput = document.getElementById("post-image-form-url")

  inputForm.addEventListener("submit", function (event){
    event.preventDefault()
    const config = {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: {
        url : JSON.stringify({url:inputFormInput.value})
      }
    }
    console.log(inputFormInput.value)
    fetch(imagesURL, config).then(response => response.json()).then(response => console.log(response))
  })

  function getAllImages () {
    fetch(imagesURL).then(response => response.json()).then(getOneImage)
  }

  function getOneImage(imageObjArray) {
    imageObjArray.forEach(generateImageHTML)
  }

  function generateImageHTML(imageObj) {
    const div = document.createElement('div')
    const img = document.createElement('img')
    const p = document.createElement("p")
    const outerDiv = document.getElementById("container")



    const like = `
    <img data-action="like-image" data-image-id=${imageObj.id} class="like-button" id="like-button" src="./images/like.png"><br>
    //        <span id="likes-count-for-image-1">${imageObj.likes_count}</span>
    `

    div.setAttribute("class", "image-container")
    img.setAttribute("src", `${imageObj.url}`)
    outerDiv.appendChild(div)
    div.appendChild(img)
    div.appendChild(p)
    p.innerHTML = like
    div.addEventListener("click", function (event){
      if (event.target.id === "like-button"){
        const config = {
          method: "POST",
          headers: {
            "Content-type" : "application/json"
          },
          body: JSON.stringify({image_id:event.target.dataset.imageId})
        }
        debugger
        fetch(likesURL, config).then(response => response.json()).then(response => console.log(response))
      }
    })
  }


  function startApp () {
    getAllImages()
  }


  startApp()
})
