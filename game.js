$(document).ready(function() {
  
  
  
  $(".billy-turn").hide();
  $(".enemy-turn").hide();
  //Kanye  
  var Kanye = function() {
    this.health = 100;
    this.maxAttack = 20;
    this.minAttack = 5;
  }

  Kanye.prototype.showHealth = function(health) {
    $("#kanyeHealth").text("Billy Health: " + health);
    return health;
  }

  Kanye.prototype.attack = function (maxAtk, minAtk)  {
      $("#Kanye").animate({right: '20%'}, 500, function() {
        $("#Kanye").animate({right: '60%'}, 3000, function() {});
       });
    var kanyeDamage = Math.floor((Math.random() * maxAtk) + minAtk);
    $("#moveMessage").css("visibility", "showing").delay(2000);
    $("#moveMessage").text("Billy Uses HeadButt!");
    return kanyeDamage;
  }
  
  Kanye.prototype.specialAttack = function() {
    console.log("special")
    var hitOrMiss = Math.floor((Math.random() * 4) + 1); 
    if (hitOrMiss === 1) {
      $("#overlay").fadeTo(1000, 1);
      $("#Kanye").animate({right: '80%'}, 3000, function() {
        $("#Kanye").animate({right: '60%'}, 500, function() {});
       });
      var monsterDamage = Math.floor((Math.random() * 10) + 6);
      console.log("Hit");
      $("#moveMessage").text("Billy Uses Ice Blast!!!");
      return monsterDamage;
    }
    else {
      console.log("Miss");
      var monsterDamage = 0;
      $("#moveMessage").text("Billy Uses Ice Beam...");
      setTimeout(function(){
        $("#moveMessage").text("...But Misses!");
      }, 1000);
      return monsterDamage;      
    }
//     return monsterDamage;   
  }

  Kanye.prototype.getHurt = function(health, damage)  {
      $("#Kanye").animate({right: '70%'}, 500, function() {
        $("#Kanye").animate({right: '60%'}, 3000);
      });
    health = health - damage;
    $("#kanyeHealth").text("Billy Health: " + health);
    return health;
  }

  Kanye.prototype.die = function() {
  }
  
  Kanye.prototype.checkHealth = function(health) {
    if(health <= 0) {
      health = 0;
      $("#kanyeHealth").text("Billy Health: " + health);
      return health;
    }
    return health;
  }
  
  
  

  
  var kanyeInstance = new Kanye();
  
  //monster
  var Monster = function() {
    this.health = 20;
    this.maxAttack = 5;
    this.minAttack = 1;
  }


  Monster.prototype.showHealth = function(health) {
    $("#monsterHealth").text("Monster Health: " + health);
    return health;
  }
  var n = -360;

  Monster.prototype.attack = function (maxAtk, minAtk)  {
    $("#moveMessage").css("visibility", "showing")
    $("#enemy").animate({left: '15%'}, 500, function() {
        $("#enemy").animate({left: '55%'}, 2000);
      });
    $("#enemy").css({"transition": "transform 1s ease", "transform": "rotate(" + n + "deg)"});
    n = n - 360;
    var monsterDamage = Math.floor((Math.random() * maxAtk) + minAtk);
    $("#moveMessage").text("Starfish Uses StarSpin!");
    
    setTimeout(function() {
      $("#moveMessage").text("Billy's Turn");
    }, 2500);
    
    
    return monsterDamage;
  }
  
  
  
  Monster.prototype.getHurt = function(health, damage)  {
    if (damage != 0){
      $("#enemy").animate({left: '65%'}, 500, function() {
        $("#enemy").animate({left: '55%'}, 2000);
      });
    health = health - damage;
    
    $("#monsterHealth").text("Monster Health: " + health);
    return health;
    }
    else {
      health = health;
    }
     return health;
  }
  
  Monster.prototype.getHurtSpecial = function(health, damage)  {
    if (damage != 0){
      health = health - damage;
      setTimeout(function() {
        
          $("#enemy").animate({left: '65%'}, 500, function() {
            $("#enemy").animate({left: '55%'}, 2000); 
          });
        $("#Glacier").css("opacity", "1"); 
        $("#Glacier").animate({left: '65%'}, 500, function() {
          $("#Glacier").animate({left: '55%'}, 2000);
        });
      }, 3300);
      setTimeout(function() {
        $("#monsterHealth").text("Monster Health: " + health);
      });
    return health;
    }
    else {
      health = health;
    }
//      return health;
  }
  
  Monster.prototype.die = function() {
    $("#enemy").fadeOut(3000);
  }
  
  Monster.prototype.checkHealth = function(health, timewait) {
    if(health <= 0) {
      health = 0;
      $("#monsterHealth").text("Monster Health: " + health);
      return health;
    }
    return health;
  }

  
  var monsterInstance = new Monster();
  
 
  
  
  
    var kanyeHealth = kanyeInstance.showHealth(20);
    var monsterHealth = monsterInstance.showHealth(20);
  
  

    var kanyeMaxAtk = 5;
    var kanyeMinAtk = 1;
    var monsterMaxAtk = 5;
    var monsterMinAtk = 1;
  
  var monsterDamaged = function() {
    monsterHealth = monsterInstance.showHealth(monsterInstance.getHurt(
      monsterInstance.showHealth(monsterHealth), kanyeInstance.attack(kanyeMaxAtk, kanyeMinAtk)));
    monsterHealth = monsterInstance.checkHealth(monsterHealth, 500);
  }
  
  var kanyeDamaged = function() {
    kanyeHealth = kanyeInstance.showHealth(kanyeInstance.getHurt(
      kanyeInstance.showHealth(kanyeHealth), monsterInstance.attack(monsterMaxAtk, monsterMinAtk)));
    kanyeHealth = kanyeInstance.checkHealth(kanyeHealth, 500);
  }
  
  var monsterSpecialDamaged = function() {
    monsterHealth = monsterInstance.showHealth(monsterInstance.getHurtSpecial(
      monsterInstance.showHealth(monsterHealth), kanyeInstance.specialAttack()));
    monsterHealth = monsterInstance.checkHealth(monsterHealth, 3500);
  } 
  
    $("#Start").click(function() {
      $("#cover").css({"opacity": "0", "z-index": "-100"});
    });
  
    $("#mainAttack").click(function(){
      console.log("Main");
      monsterDamaged();
   //   $("#p2").css("left", "700px");
    
    
      setTimeout(function(){ 
        kanyeDamaged();
      }, 5000);
 
      if(monsterHealth === 0) {
        monsterInstance.die();
      }
    });
      
    $("#secondaryAttack").click(function(){
      console.log("Clicked");
      monsterSpecialDamaged();
      //$("#p1").css("left", "700px");
      setTimeout(function(){
        $("#Glacier").fadeTo(500, 0);
        $("#overlay").fadeTo(1000, .46);
        setTimeout(function() {
          kanyeDamaged();
        }, 500);
        
      }, 7000);
 
      if(monsterHealth === 0) {
        monsterInstance.die();
        kanyeHealth = 99;
        setTimeout(function() {
          $("#cover").fadeTo(1000, 1);
          $("#cover").css("z-index", "1000");
        }, 5000)
        
      }
      
      if(kanyeHealth === 0) {
        kanyeInstance.die();
        setTimeout(function() {
          $("#cover").fadeTo(1000, 1);
          $("#cover").css("z-index", "1000");
        }, 5000)
      }
    });
 
});