function getBathValue()
{
   var uiBathrooms=document.getElementsByName("uiBathrooms")
   for(var i in uiBathrooms)
   {
     if(uiBathrooms[i].checked)
     {
        return parseInt(i)+1;
     }
   }
   return -1;
}
function getBHKvalue()
{
    var uiBHK=document.getElementsByName("uiBHHK");
    for(var i in uiBHK)
    {
        if(uiBHK[i].checked)
        {
            return parseInt(i)+1;
        }
    }
    return -1;
}
function onClickedEstimatePrice()
{
    console.log("Estimate price button clicked");
    var sqft=document.getElementById("sqft");
    var bhk=getBHKvalue();
    var bathrooms=getBathValue();
    var location=document.getElementById('locality1');
    var estprice=document.getElementById('uiEstimatedPrice');

    var url="http://ec2-16-171-196-118.eu-north-1.compute.amazonaws.com:8080/predict_home_price";
    $.post(url,{
        total_sqft:parseFloat(sqft.value),
        bhk:bhk,
        bath:bathrooms,
        location:location.value},
        function(data,status)
        {
            console.log(data.esttimated_price);
            estprice.innerHTML="<h3>" + data.estimated_price.toString() + " Lakhs</h3>";
            console.log(status);
        }
    );

}

function onPageLoad() {
    console.log( "document loaded" );
    var url = "http://ec2-16-171-196-118.eu-north-1.compute.amazonaws.com:8080/get_location_names"; 
    $.get(url,function(data, status) {
        console.log("got response for get_location_names request");
        if(data) {
            var locations = data.location;
            var locality = document.getElementById("locality1");
            for(var i in locations) {
                var opt = new Option(locations[i]);
                $('#locality1').append(opt);
            }
        }
    });
  }
window.onload=onPageLoad;