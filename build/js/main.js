'use strict';

$(document).ready(function (event) {
  //declare all the variables
  var url, articleType, articleList, articleItem, articleImage, articleImageUrl, counter, loading;

  //Calling the onChange function for the heapbox
  $('#category').heapbox({
    "onChange": function onChange() {
      var articleType = $('select option:selected').val();
      var url = "http://api.nytimes.com/svc/topstories/v2/"; // url where we will do the API call

      url += articleType + '.json?api-key=af6711761ae74ed8854f709bfd046869';

      loading = '../../assets/images/ajax-loader.gif';

      //Preparing the website to load the articles
      $('.article-list').empty();
      $('.articles').prepend('<div class="loading"><img src="' + loading + '"/></div>');
      $('header').addClass('new-header');
      $('.logo').addClass('new-logo');

      $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json'
      }) //Accessing NYT API Key
      .done(function (article) {

        articleList = article.results;

        //Checking for articles in the array
        if (articleList.length !== 0) {

          articleItem = "";
          articleImageUrl = "";
          articleImage = "";
          counter = 0;

          //Entering each loop over the articles array
          $.each(articleList, function (index, item) {
            if (item.multimedia.length) {

              articleImageUrl = item.multimedia[4].url;
              articleItem += '<div class="each-article">';
              articleItem += '<a style="background-image: url(\'' + articleImageUrl + '\');" href="' + item.url + '" target="_blank">';
              articleItem += '<p class="abstract">' + item.abstract + '</p>';
              articleItem += '</a>' + '</div>';

              counter++;
              if (counter === 12) {
                return false;
              } //Closing the counter to keep articles to 12
            } //  Closing the for each loop
          }); //Closing array checking if function
          $('.article-list').append(articleItem);
        } else {
          $('.article-list').append('<p>Sorry, there are no stories in this category.</p>');
        } //Output if there are no articles
      }) //Entering fail function if loading is not working
      .fail(function () {
        $('.article-list').append('<p>Oops! Something went wrong. :(</p>');
      }) //Closing fail function
      .always(function () {
        $('.loading').remove();
      }); //Closing always function to remove the loading gif
    } }); //Closing document ready function
});