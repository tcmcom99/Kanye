$(document).ready(function(){
  var k = new Kanye.html();
  var maxattack = 5;

  var minattack = 1;

  var health = 100;
  
  var damage = 5;
  
  
  
  var enemyspawn = Math.floor((Math.random() * 10) + 1);
  console.log(enemyspawn);
  function die() {
    if (health < 0) {
     console.log("Death test");
     }
    else {
    console.log("death test");
    };
    };
  function volley()  {
    health - damage;
    return volley;
  }


  function turn()  {
    k.attack(maxattack, minattack);
    k.getHurt(health, damage);
    k.die(health);
  };
  


  var maxattack = 5;

  var minattack = 1;

  var health = 100;


  $("button").click(function(){
  turn();
  volley();
  console.log(health)
  });
    
});

  
  