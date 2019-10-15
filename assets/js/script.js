if (navigator.geolocation) {
  //Return the user's longitude and latitude on page load using HTML5 geolocation API
  window.onload = function() {
    navigator.geolocation.getCurrentPosition(getCurrentLocation);
  };
}



function getCurrentLocation(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;

  // console.log(latitude);
  // console.log(longitude);

  $.getJSON(
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&APPID=ec7fc681247b5f8ffd9e18f7848f1465&units=metric&lang=tr",
      function(data) {


        // console.log(data.city.name);

        $(".widget--location p")[0].append(data.city.name + " , " + data.city.country);
        $(".widget--degree h1")[0].prepend(parseInt(data.list[0].main.temp));
        $(".widget--status p")[0].prepend(data.list[0].weather[0].description);
        let last_time_convert = data.list[0].dt_txt;
        let last_time = last_time_convert.substring(11,16);
        $(".widget--status--time p")[0].prepend("Son Güncelleme : " + last_time);
        $("#max--temp p")[0].prepend(data.list[0].main.temp_max);
        $("#min--temp p")[0].prepend(data.list[0].main.temp_min);
        $("#wind p")[0].prepend(data.list[0].wind.speed + " km/hr");
        $("#humidity p")[0].prepend(data.list[0].main.humidity + " %");

        for (var i = 1; i < 8; i++) {
          $(data.list[i]).each(function(index, main) {
            let time = main.dt_txt;
            let sub_time = time.substring(11,16);

                let times_status = main.weather[0].main;
                const times_icon = main.weather[0].icon;
                console.log(times_icon);
                $('.widget--third--block').append('<div class="time--block"><p>'+sub_time +'</p><h6>'+ parseInt(main.main.temp)+'</h6><img src="http://openweathermap.org/img/w/'+times_icon +'.png"></div>');
            });
        }


        
      // main status icon
      let status  = data.list[0].weather[0].main;

      if (status === "Clouds") {
        $(".widget--status--block img").attr("src","assets/img/cloudy.svg")
      }else if (status === "Rain") {
        $(".widget--status--block img").attr("src","assets/img/rain.svg")
      }else if (status === "Sunny") {
        $(".widget--status--block img").attr("src","assets/img/sunny.svg")
      }else if (status === "Wind") {
        $(".widget--status--block img").attr("src","assets/img/wind.svg")
      }else if (status === "Clear") {
        $(".widget--status--block img").attr("src","assets/img/cloudy.svg")
      }

      // response return
      let status_code = data.cod;

      if (status_code === "200") {
        $(".container").css("opacity","1");
      }else {
        $(".container").css("opacity","0");
      }
    }
  );
}
