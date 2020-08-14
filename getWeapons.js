var weapons = []

function addWeapon() {
  var name = document.getElementById('name');
  var cost = document.getElementById('cost');
  var stats = document.getElementById('stats');
  var weapon_list = document.getElementById('weapons')

  weapons.push([name.value, parseInt(cost.value), parseInt(stats.value)])
  var new_weapon = document.createElement('li')
  new_weapon.setAttribute("id", name.value)
  new_weapon.innerHTML = name.value + " &nbsp;&nbsp;&nbsp;&nbsp; cost: " + cost.value + " &nbsp;&nbsp;&nbsp;&nbsp; stats: " + stats.value
  var close_symbol = document.createElement('SPAN')
  close_symbol.innerHTML = "<span class=\"close\">x</span>"
  new_weapon.appendChild(close_symbol)
  function compareID(id) {
    return function(value) {
      return value[0] !== id
    }
  }
  close_symbol.addEventListener("click", function() {
    weapons = weapons.filter(compareID(this.parentElement.id))
    this.parentElement.remove()
  })
  weapon_list.appendChild(new_weapon)
}

function returnWeapons() {
  var max_cost = document.getElementById('max_cost');

  console.log("got here")
  console.log(weapons)

  data = {
      "max_cost": parseInt(max_cost.value),
      "weapons": weapons
  };

  const url = "https://j3jdr5p36a.execute-api.us-east-1.amazonaws.com/prod/sinoalice-weapon-chooser"
  $.ajax({
    url: url,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: JSON.stringify(data),
    type: "POST",
    success: function(data, status){
      result = data["body"]
      console.log("got result " + JSON.stringify(result))
      var output = document.getElementById('output')
      result_json = JSON.parse(result)
      output.textContent = "Total Stats: " + result_json["total_stats"] + "\r\n" + "Weapons: " + result_json["weapons"]
      console.log("success")
    }
  });
}

var calculate = document.getElementById('calculateButton');
calculate.addEventListener('click', function() {
  console.log("got here")
  returnWeapons();
});
var add_weapon = document.getElementById('addWeapon');
add_weapon.addEventListener('click', function() {
  addWeapon();
});