function DonutShop(name, minc, maxc, donuts, hours) {
  this.minCust = minc;
  this.maxCust = maxc;
  this.name = name;
  this.customers = function() {
    var avgCust = Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
    return avgCust;
  };

  this.donutsPerCustomer = donuts;
  this.hoursOpen = hours;

  //I put this in a variable so I could retrieve the same number when I calculate the donuts per day
  this.donutsPerHour = 0;
  this.getDonutsPerHour = function() {
    this.donutsPerHour = Math.ceil(this.customers() * this.donutsPerCustomer);
  };
  this.getDonutsPerHour();

  this.getDonutsPerDay = function() {
    return Math.ceil(this.donutsPerHour * hours)
  };

  this.message = this.name + " should bake " + this.donutsPerHour + " donuts per hour and " + this.getDonutsPerDay() + " donuts per day.";
}

function DonutMaster() {
  this.shopList = [];
  this.addShop = function(varName, name, minc, maxc, donuts, hours) {
    var varName = new DonutShop(name, minc, maxc, donuts, hours);
    this.shopList.push(varName);
  };
  //Trying another function for fun
  this.removeShop = function(varName) {
    for (var i = 0; i < this.shopList.length; i++) {
      if (this.shopList[i] == varName) {
        this.shopList.splice(i, 1);
      }
    }
  }
  var that = this;
  this.generateReport = function() {
    for (var i = 0; i < this.shopList.length; i++) {
      $('tbody').append("<tr id='"+i+"'><th>"+this.shopList[i].name
        +"</th><td class='edit'>Edit</td><td class='perHour'>"
        +this.shopList[i].donutsPerHour+"</td><td class='perDay'>"
        +this.shopList[i].getDonutsPerDay()+"</td></tr>");
      var inputMinC = "<input type='text' name='minc' placeholder='minCustomers' />";
      var inputMaxC = "<input type='text' name='maxc' placeholder='maxCustomers' />";
      var inputAvgDonuts = "<input type='text' name='donutsPerC' placeholder='donutsPerCustomer' />";
      var inputHours = "<input type='text' name='hours' placeholder='hours' />";
      $('#'+i).append("<td class='form'><form>"+inputMinC+inputMaxC+inputAvgDonuts+inputHours+"<button id='btn"+i+"'>Update</button></form></td>");
      $('#btn'+i).on("click", function(e) {
        e.preventDefault();
        var j = ($(this).attr("id").slice(3));
        that.shopList[j].minCust = $(this).siblings("[name='minc']").val();
        that.shopList[j].maxCust = $(this).siblings("[name='maxc']").val();
        that.shopList[j].hoursOpen = $(that).siblings("[name='hours']").val();
        that.shopList[j].donutsPerCustomer = $(this).siblings("[name='donutsPerC']").val();
        that.shopList[j].getDonutsPerHour();
        $('#'+j+' > .perHour').text(that.shopList[j].donutsPerHour);
        $('#'+j+' > .perDay').text(that.shopList[j].getDonutsPerDay());
      });
    }
  }
}
var master = new DonutMaster;

master.addShop("downtown", "Downtown", 8, 43, 4.5, 12);
master.addShop("capHill", "Capitol Hill", 4, 37, 2, 12);
master.addShop("slu", "South Lake Union", 9, 23, 6.33, 12);
master.addShop("wedgewood", "Wedgewood", 2, 28, 1.25, 12);
master.addShop("ballard", "Ballard", 8, 58, 3.75, 12);
master.generateReport();
$('#perHour', '#perDay').addClass("invisible");
$('td').hide();
$("th").on("click", function(e) {
  $('#perHour', '#perDay').removeClass("invisible");
  $(this).siblings('.edit').fadeToggle();
  $(this).siblings('.perDay').fadeToggle();
  $(this).siblings('.perHour').fadeToggle();
});
$('.edit').on("click", function(e) {
  $(this).siblings('.form').fadeToggle();
});
