$(document).ready(function () {
  google.charts.load('current', { 'packages': ['gauge'] });
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['Current', 0],
      ['Required', 0]
    ]);
    var latitude;
    var longitude;
    var speed;

    function getdata() {
      $.ajax({
        url: 'https://api.mlab.com/api/1/databases/stmvc/collections/stmvcs?apiKey=KFh49jZrqiSMN3sFk42_9BmrZp212X1z'
      }).done(function (data) {
        latitude = data[data.length - 1].latitude;
        longitude = data[data.length - 1].longitude;
        speed = data[data.length - 1].speed;
      });
    }

    function myMap() {
      var myCenter = new google.maps.LatLng(latitude, longitude);
      var mapOptions = {
        center: myCenter,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.MAP,
        disableDefaultUI: true
      };
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);

      var marker = new google.maps.Marker({
        position: myCenter
      });
      marker.setMap(map);
    };

    var options = {
      width: 530, height: 300,
      redFrom: 90, redTo: 100,
      yellowFrom: 75, yellowTo: 90,
      minorTicks: 5
    };

    var chart = new google.visualization.Gauge(document.getElementById('chart_div'));

    chart.draw(data, options);

    setInterval(getdata, 1000);
    setInterval(myMap, 5000);

    setInterval(function () {
      data.setValue(0, 1, speed);
      chart.draw(data, options);
    }, 1500);
    setInterval(function () {
      data.setValue(1, 1, 85);
      chart.draw(data, options);
    }, 1000);
  }
});