const accessKey = "34wQEvXcPo_60ysiZR0X5dRgOdAiwkHpnsjO6O3XVdI"
const url = `https://api.unsplash.com/search/photos?per_page=24&query=`
const formTag = document.querySelector("form")
const inputTag = formTag.querySelector("input")
const resultsTag = document.querySelector("section.results")
const searchUnsplash = function (query) {
  return fetch(url + query, {
      method: "GET",
      headers: {
			"Authorization": "Client-ID " + accessKey
      }
  })
  .then(response => response.json())
  .then(data => {
    return data.results.map(result => {
      return {
        imageSource: result.urls.regular,
        width: result.width,
        height: result.height,
        name: result.user.name,
        title: (result.description || "Untitled"),
        backgroundColor: (result.color || "#cccccc") + "33"
      }
    })
  })
}
const addResults = function (results) {
  resultsTag.innerHTML = ""
  results.forEach(result => {
    console.log(result)
    resultsTag.innerHTML = resultsTag.innerHTML + `
			<div class="single-result">
				<div class="image" style="background-color: ${result.backgroundColor};">
					<img src="${result.imageSource}">
				</div>
				<h2>${result.title}</h2>
				<p>by ${result.name} ${result.width} * ${result.height}</p>
			</div>
		`
  })
}
formTag.addEventListener("submit", function (event) {
  
  const searchTerm = inputTag.value
  
  searchUnsplash(searchTerm)
    .then(results => {
    	addResults(results)
  	})
  
  event.preventDefault()
  
})