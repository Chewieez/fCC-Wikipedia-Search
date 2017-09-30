$("document").ready(function() {
  var searchQuery;
  var wikiAPI;

  
  $("#user-search").submit(function() {
    event.preventDefault();
    searchQuery = document.getElementById("search-query").value;
    wikiAPI =
      "https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=" + searchQuery + "&limit=10&namespace=0&format=json";

    getSearchResults();
  });

  // removes focus from search field right after search is sent.
 /*  $('#user-search').submit(function() {
        $('#search-query').blur();
}); */
  
  
  function getSearchResults() {
    $.getJSON(wikiAPI, function(data) {
   
 
      $("#search-results").empty();  //removes div of previous search results.

// if statement to check if search has results.      
      if (data[1][0]) {        
        
      // iterating through json to gather 3 parts of each result, title, desc, link
      for (var i = 0; i < data[1].length; i++) {
        $("#search-results").append(
          "<a href='" + data[3][i] + "' target='_blank'>" + "<div class='results ind-results" + i + "'>" + "<p><strong>" + data[1][i] + "</strong></p><p>" + data[2][i] + "</p></div>" + "</a>" + "<br>");
        }
      }
        else {
          $("#search-results").html("<div class='error-msg'><br><p><strong>Your search returned no results. Try a different search.</strong></p></div>");
        }
      
    });
  }

 
  
}); // End of document.ready function
