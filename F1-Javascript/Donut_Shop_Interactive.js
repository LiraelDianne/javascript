function DonutShop(name, minc, maxc, donuts, hours) {

  this.name = name;
  this.customers = function() {
    var avgCust = Math.floor(Math.random() * (maxc - minc + 1)) + minc;
    return avgCust;
  };

  this.donutsPerCustomer = donuts;
  this.hoursOpen = hours;

  //I put this in a variable so I could retrieve the same number when I calculate the donuts per day
  this.donutsPerHour = Math.ceil(this.customers() * this.donutsPerCustomer);
  this.getDonutsPerHour = function() {
    return this.donutsPerHour;
  };

  this.getDonutsPerDay = function() {
    return Math.ceil(this.getDonutsPerHour() * hours)
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

  this.generateReport = function(shopList) {
    for (var i = 0; i < this.shopList.length; i++) {
      $('tbody').append("<tr><th>"+this.shopList[i].name+"</th><td>"+this.shopList[i].donutsPerHour+"</td><td>"+this.shopList[i].getDonutsPerDay()+"</td></tr>");
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
$('#perHour').hide();
$('#perDay').hide();
$('td').hide();
$("th").on("click", function(e) {
  $('#perHour').fadeIn('slow');
  $('#perDay').fadeIn('slow');
  $(this).siblings('td').fadeToggle();
});
