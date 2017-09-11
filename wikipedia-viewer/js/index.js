
  

  
let searchForm = document.forms.searchForm;
let randomSearch = document.getElementById("randomSearch");
let searchField = searchForm.elements.wikiSearch;
let submitSearch = document.getElementById("searchButton");
searchField.value = "sharks";
let baseURL = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts%7Cpageimages&titles=Title&generator=search&redirects=1&exsentences=2&exlimit=10&exintro=1&piprop=thumbnail%7Cname&pilimit=50&gsrsearch="

//submitSearch.onclick 
submitSearch.onclick = function () {
  searchTerm = searchField.value;
  searchURL = baseURL+searchTerm;
  $.ajax({
    url: searchURL,
    type: 'GET',
    dataType: 'jsonp',
    success: function (data) {
      displayResults(data); 
    }
});    
}

function displayResults(data){
  //clear old search results
  document.getElementById("results").innerHTML="";
  pages = data["query"]["pages"];
  for (pageNumber in pages){
        var result = new Result(pageNumber);
        result.addEntry();
      }
}

function Result( x){
  this.title = pages[x]["title"];
  this.extract = pages[x]["extract"];
  this.link = "https://en.wikipedia.org/?curid="+[x];
  
  this.addEntry = function() {
    document.getElementById("results").innerHTML+="<a href="+this.link+"><div class="+"flexElement"+"><h2>"+this.title+"</h2>"+"<p>"+this.extract+"</p></div></a>";
  }
}