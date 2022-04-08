var apts = JSON.parse(localStorage.getItem("apts")) || [];
var aptHolder = [];


//set the date at the top of the page
var getDate = function() {
  var now = moment().format('dddd, MMMM Do YYYY');
  var present =$("#currentDay").text(now);
};



//save to local storage
var saveApts = function(text, id) {
  var object = {
    id:id,
    text:text
  }
  console.log(apts);
  if(apts.length) {
    var index = apts.findIndex(apt => apt.id === id);
    console.log(index);
    if(index===-1){
      apts.push(object);
      localStorage.setItem("apts", JSON.stringify(apts));
    }else{
      apts[index].text=text;
      localStorage.setItem("apts", JSON.stringify(apts));
    }

  }else{
    apts.push(object);
    localStorage.setItem("apts", JSON.stringify(apts));
  };


};





//retrieve from local storage   
var loadApts = function() {

  // loop through inputs and if data pair matches id from apts array, then put in text from apts 
  $(".col-8").each(function(index) {
    var loadHourAttr = $(this).attr("data-pair");
    console.log(loadHourAttr);

    var loadIndex = apts.findIndex(apt => apt.id === loadHourAttr);
    console.log(loadIndex);

    if(loadIndex==loadHourAttr){
      $(this).val(apts[loadIndex].text);
    };


  });
  
  colorCode();

};



//change color if time slot has passed, is present, or upcoming
var colorCode = function() {
  console.log("starting");
  // for each timeStamp slot:
  $(".hour").each(function(index) {

    var hour = this.textContent;
    hour = hour.replace(':00', " ").trim();
    console.log("Hour: " + hour);

    var now = moment().format("HH").toString();
    console.log("Now: "+ now);

    if (hour > now) {
        //if slot is after/later than current time
        $(this).siblings("input").addClass("future");
        $("input.future").each(function(index){
          this.style.backgroundColor = 'green';
        });

    } else if (hour === now ){
         //if slot is the same as current time 
        $(this).siblings("input").addClass("present");
        $("input.present").each(function(index){
          this.style.backgroundColor = 'orange';
        });

    } else {
      //if slot is before/past current time 
      $(this).siblings("input").addClass("past");
      $("input.past").each(function(index){
        this.style.backgroundColor = 'red';
      });
    };
  });
};



//editable field un-focused
$(".col-8").on("blur", (event) => {

  if (event.target != $(".col-8")){

    $(".col-8").each(function(index){
      console.log("happened");

      var hourText = $(this).val();
      var hourAttr = $(this).attr("data-pair");
      saveApts(hourText, hourAttr); 
    });
 
  };
});



// save button clicked
$(".saveBtn").on("click", function (event){
  event.preventDefault();
  var hourText = $(this).parent().siblings("input").val();
  var hourAttr = $(this).parent().siblings("input").attr("data-pair");
  
  saveApts(hourText, hourAttr);
});



// calling functions
console.log("first thing: " + localStorage.getItem("apts"));
loadApts();
setInterval(colorCode, 30000);
getDate();