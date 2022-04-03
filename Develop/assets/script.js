var hrsInDay = 24;
var hrs = {}
var now = DateTime.now();



var saveApts = function() {
  localStorage.setItem("apts", JSON.stringify(apts));
};

{/* <div class="row">
<div class="col-2">
  1 of 3
</div>
<div class="col-8">
  2 of 3
</div>
<div class="col-2">
  3 of 3
</div>
</div> */}
