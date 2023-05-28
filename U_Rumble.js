//Rumble made with ships in U-Series
var modifier = {
  map_size: 60,
  crystal_value: 0,
  max_players: 20,
  kills_to_win: 100,
  yeet_gems: true,
  healer_button: false,
  round_timer: 30, // in minutes
  game_delay: 60, // in seconds
  round_ship_tier: "6",//choose from 3-7 or "random"
  gems_upon_spawning: 0,//removed
  laggy_objs: false
};

var modUtils = {
  setTimeout: function(f,time) {
    this.jobs.push({f: f,time: game.step+time}) ;
  },
  jobs: [],
  tick: function() {
    var t = game.step;
    for (var i=this.jobs.length-1;i>=0;i--) {
      var job = this.jobs[i] ;
      if (t>=job.time) {
        try {
          job.f() ;
        }
        catch (err) {
        }
        this.jobs.splice(i,1) ;
      }
    }
  }
};

var sendUI = function(ship, UI) {
  if (ship != null && typeof ship.setUIComponent == "function") {
    if (UI.visible || UI.visible == null) ship.setUIComponent(UI);
    else ship.setUIComponent({id: UI.id, position: [0,0,0,0], visible: false});
  }
};

var vocabulary = [
  {text: "Yes", icon:"\u004c", key:"Y"},
  {text: "No", icon:"\u004d", key:"N"},
  {text: "Defend", icon:"\u0025", key:"D"},
  {text: "Kill", icon:"\u007f", key:"K"},
  {text: "Sorry", icon:"\u00a1", key:"S"},
  {text: "Thanks", icon:"\u0041", key:"X"},
  {text: "You", icon:"\u004e", key:"O"},
  {text: "Me", icon:"\u004f", key:"E"},
  {text: "No Problem", icon:"\u0047", key:"P"},
  {text: "Attack", icon:"\u0049", key:"A"},
  {text: "Help", icon:"\u004a", key:"H"},
  {text: "Hmmm?", icon:"\u004b", key:"Q"},
  {text: "GoodGame", icon:"\u00a3", key:"G"},
  {text: "Wait", icon:"\u0048", key:"T"},
  {text: "Base", icon:"\u0034", key:"B"},
  {text: "Follow", icon:"\u0050", key:"F"},
  {text: "Why?", icon:"KK", key:"I"},
  {text: "Love", icon:"\u0024", key:"L"},
  {text: "Bruh", icon:"˙ ͜ʟ˙", key:"M"},
  {text: "WTF", icon:"ಠ_ಠ", key:"W"}
];

//Tier 3
var U_Penta_301 = '{"name":"U-Penta","level":3,"model":1,"size":1.8,"specs":{"shield":{"capacity":[250,350],"reload":[4,6]},"generator":{"capacity":[300,450],"reload":[150,300]},"ship":{"mass":400,"speed":[90,120],"rotation":[40,60],"acceleration":[80,110]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[0,-10,40,90,70,80],"z":[0,0,0,0,0,0]},"width":[0,10,30,10,0],"height":[0,10,23,10,0],"texture":[12,2,10,12],"propeller":true},"cockpit":{"section_segments":[40,90,180,270,320],"offset":{"x":0,"y":-10,"z":15},"position":{"x":[0,0,0,0],"y":[20,40,60,85],"z":[0,0,0,0]},"width":[5,13,15,5],"height":[0,12,15,0],"texture":[8.98,8.98,4]},"uwingfront":{"section_segments":8,"offset":{"x":0,"y":-95,"z":-10},"position":{"x":[0,0,0,0,0],"y":[-90,-100,40,80,155],"z":[0,0,0,0,0]},"width":[0,10,25,20,0],"height":[0,5,25,20,5],"texture":[12,3,63,4]},"cannonfront":{"section_segments":12,"offset":{"x":0,"y":-70,"z":10},"position":{"x":[0,0,0,0,0,0,0],"y":[-60,-70,-20,0,20,50,45],"z":[0,0,0,0,0,0,0]},"width":[0,5,6,10,15,5,0],"height":[0,5,5,10,10,5,0],"angle":0,"laser":{"damage":[30,50],"rate":3,"type":2,"speed":[190,240],"recoil":50,"number":1,"error":0},"propeller":false,"texture":[4,12,63,4,18,4]},"uwingsfrontside":{"section_segments":8,"offset":{"x":45,"y":-50,"z":-10},"position":{"x":[0,0,0,0,0,0],"y":[-90,-100,40,80,115],"z":[0,0,0,0,0,0]},"width":[0,10,25,20,0],"height":[0,5,25,20,0],"texture":[12,3,63,4],"angle":-10},"cannonfrontside":{"section_segments":12,"offset":{"x":40,"y":-18,"z":10},"position":{"x":[0,0,0,0,0,0,0],"y":[-60,-70,-20,0,20,50,45],"z":[0,0,0,0,0,0,0]},"width":[0,5,6,10,15,5,0],"height":[0,5,5,10,10,5,0],"angle":-10,"laser":{"damage":[40,60],"rate":2,"type":2,"speed":[190,240],"recoil":50,"number":1,"error":0},"propeller":false,"texture":[4,12,63,4,18,4]},"uwingsbackside":{"section_segments":8,"offset":{"x":85,"y":5,"z":-10},"position":{"x":[0,0,0,0,0,0],"y":[-90,-100,40,80,115],"z":[0,0,0,0,0,0]},"width":[0,10,25,20,0],"height":[0,5,25,20,0],"texture":[12,3,63,4],"angle":-30},"cannonbackside":{"section_segments":12,"offset":{"x":85,"y":5,"z":10},"position":{"x":[0,0,0,0,0,0,0],"y":[-40,-50,-10,20,40,70,65],"z":[0,0,0,0,0,0,0]},"width":[0,5,6,10,15,5,0],"height":[0,5,5,10,10,5,0],"angle":-30,"laser":{"damage":[50,70],"rate":2,"type":2,"speed":[190,240],"recoil":50,"number":1,"error":0},"propeller":false,"texture":[4,12,63,4,18,4]},"side_propulsors1":{"section_segments":12,"offset":{"x":25,"y":60,"z":-10},"position":{"x":[0,0,0,0,0,0,0],"y":[-15,-20,10,40,51,56,48],"z":[0,0,0,0,0,0,0]},"width":[0,5,15,16,15,13,0],"height":[0,20,25,26,25,23,0],"texture":[6,2,13,18,17,18],"propeller":true},"side_propulsors2":{"section_segments":12,"offset":{"x":50,"y":50,"z":-10},"position":{"x":[0,0,0,0,0],"y":[0,40,51,56,48],"z":[0,0,0,0,0]},"width":[8,9,8,8,0],"height":[8,9,8,8,0],"texture":[13,18,17,18],"propeller":true},"wire1":{"section_segments":8,"angle":5,"offset":{"x":15,"y":22,"z":5},"position":{"x":[0,0,1,2,3,4,4,3,0,-2,-2],"y":[-65,-64,-51.5,-40,-28,-18,-8,2,12,11],"z":[-3,-3,1,3,6,9,10,12,10,10,10]},"width":[4,4,4,4,4,4,4,4,3,0],"height":[0,3,3,3,3,3,3,3,3,0],"propeller":false,"texture":[13,13,17,13,17,13,17,13,17]},"wire2":{"section_segments":8,"angle":-15,"offset":{"x":20,"y":62,"z":5},"position":{"x":[-4,-4,1,2,3,4,4,3,0,-2,-2],"y":[-65,-64,-51.5,-40,-28,-18,-8,2,12,11],"z":[-3,-3,1,3,6,9,10,8,4,2,2]},"width":[4,4,4,4,4,4,4,4,3,0],"height":[0,3,3,3,3,3,3,3,3,0],"propeller":false,"texture":[13,13,17,13,17,13,17,13,17]},"wire3":{"section_segments":8,"angle":-70,"offset":{"x":20,"y":72,"z":5},"position":{"x":[-10,-10,-5,2,3,4,4,3,0,-2,-2],"y":[-65,-64,-51.5,-40,-28,-18,-8,2,12,11],"z":[-3,-3,1,3,6,9,10,8,4,2,2]},"width":[4,4,4,4,4,4,4,4,3,0],"height":[0,3,3,3,3,3,3,3,3,0],"propeller":false,"texture":[13,13,17,13,17,13,17,13,17]}},"wings":{"main":{"length":[75],"width":[105,70],"angle":[0],"position":[30,80],"texture":18,"doubleside":true,"offset":{"x":0,"y":-60,"z":-5},"bump":{"position":50,"size":10}}},"typespec":{"name":"U-Penta","level":3,"model":1,"code":301,"specs":{"shield":{"capacity":[250,350],"reload":[4,6]},"generator":{"capacity":[300,450],"reload":[150,300]},"ship":{"mass":400,"speed":[90,120],"rotation":[40,60],"acceleration":[80,110]}},"shape":[7.029,6.529,3.762,5.859,5.888,4.651,3.793,3.247,5.815,5.861,5.137,4.596,4.194,3.94,3.767,3.656,3.625,3.641,3.64,3.718,3.946,4.35,4.394,4.391,4.251,3.246,4.251,4.391,4.394,4.35,3.946,3.718,3.64,3.641,3.625,3.656,3.767,3.94,4.194,4.596,5.137,5.861,5.815,3.247,3.793,4.651,5.888,5.859,3.762,6.529],"lasers":[{"x":0,"y":-5.04,"z":0.36,"angle":0,"damage":[30,50],"rate":3,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":50},{"x":1.878,"y":-3.13,"z":0.36,"angle":-10,"damage":[40,60],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":50},{"x":-1.878,"y":-3.13,"z":0.36,"angle":10,"damage":[40,60],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":50},{"x":3.96,"y":-1.379,"z":0.36,"angle":-30,"damage":[50,70],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":50},{"x":-3.96,"y":-1.379,"z":0.36,"angle":30,"damage":[50,70],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":50}],"radius":7.029}}';
var U_Spread_302 = '{"name":"U-Spread","level":3,"model":2,"size":1.8,"specs":{"shield":{"capacity":[350,500],"reload":[4,6]},"generator":{"capacity":[400,600],"reload":[250,400]},"ship":{"mass":400,"speed":[100,120],"rotation":[60,80],"acceleration":[40,60]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[0,-30,15,55,80,70,80],"z":[0,0,0,0,0,0]},"width":[0,10,35,30,10,0],"height":[0,15,23,20,10,0],"texture":[12,13,63,10,12],"propeller":true},"base":{"section_segments":[0,50,120,-120,-50],"vertical":true,"offset":{"x":0,"y":-20,"z":-20},"position":{"x":[0,0,0,0,0,0,0],"y":[-10,0,5,10,30,40,80],"z":[0,0,0,0,0,0,0]},"width":[0,110,100,90,10,0],"height":[0,100,90,80,10,0],"texture":[18,4,17,18,12]},"cockpit":{"section_segments":[40,90,180,270,320],"offset":{"x":0,"y":-25,"z":20},"position":{"x":[0,0,0,0],"y":[10,40,70,100],"z":[-2,0,0,-7]},"width":[5,16,13,5],"height":[0,12,15,0],"texture":[8.98,8.98,3.98]},"uwingfront":{"section_segments":8,"offset":{"x":0,"y":-95,"z":-10},"position":{"x":[0,0,0,0,0],"y":[-60,-70,40,80,115],"z":[0,0,0,0,0]},"width":[0,10,25,20,0],"height":[0,5,25,20,0],"texture":[12,3,63,4]},"cannonfront":{"section_segments":12,"offset":{"x":0,"y":-75,"z":10},"position":{"x":[0,0,0,0,0,0,0],"y":[-60,-70,-20,0,20,50,65],"z":[0,0,0,0,0,3,3]},"width":[0,5,6,10,15,5,5],"height":[0,5,5,10,10,5,5],"angle":0,"laser":{"damage":[40,60],"rate":4,"type":2,"speed":[190,240],"recoil":50,"number":1,"error":0},"propeller":false,"texture":[4,12,63,4,18,17]},"uwingsfrontside":{"section_segments":8,"offset":{"x":100,"y":-40,"z":-10},"position":{"x":[0,0,0,0,0,0],"y":[-60,-70,40,80,115],"z":[0,0,0,0,0,0]},"width":[0,10,25,20,0],"height":[0,5,25,20,0],"texture":[12,3,63,4],"angle":-60},"cannonfrontside":{"section_segments":12,"offset":{"x":80,"y":-28,"z":10},"position":{"x":[0,0,0,0,0,0,0],"y":[-60,-70,-20,0,20,50,65],"z":[0,0,0,0,0,0,0]},"width":[0,5,6,10,15,5,5],"height":[0,5,5,10,10,5,5],"angle":-60,"laser":{"damage":[70,100],"rate":2,"type":2,"speed":[190,240],"recoil":100,"number":1,"error":0},"propeller":false,"texture":[4,12,63,4,18,17]},"uwingsbackside":{"section_segments":8,"offset":{"x":100,"y":75,"z":-10},"position":{"x":[0,0,0,0,0,0],"y":[-60,-70,40,80,115],"z":[0,0,0,0,0,0]},"width":[0,10,25,20,0],"height":[0,5,25,20,0],"texture":[12,3,63,4],"angle":-120},"cannonbackside":{"section_segments":12,"offset":{"x":80,"y":62,"z":10},"position":{"x":[0,0,0,0,0,0,0],"y":[-60,-70,-20,0,20,50,45],"z":[0,0,0,0,0,0,0]},"width":[0,5,6,10,15,5,0],"height":[0,5,5,10,10,5,0],"angle":-120,"laser":{"damage":[70,100],"rate":2,"type":2,"speed":[190,240],"recoil":100,"number":1,"error":0},"propeller":false,"texture":[4,12,63,4,18,4]},"side_propulsors":{"section_segments":12,"offset":{"x":30,"y":35,"z":0},"position":{"x":[-15,-15,0,0,0,0,0],"y":[-40,-50,-20,30,50,55,50],"z":[0,0,0,0,0,0,0]},"width":[0,5,10,11,10,9,0],"height":[0,15,25,26,25,23,0],"texture":[6,2,10,3,17,18],"propeller":true}},"typespec":{"name":"U-Spread","level":3,"model":2,"code":302,"specs":{"shield":{"capacity":[350,500],"reload":[4,6]},"generator":{"capacity":[400,600],"reload":[250,400]},"ship":{"mass":400,"speed":[100,120],"rotation":[60,80],"acceleration":[40,60]}},"shape":[5.951,5.873,3.629,2.665,2.685,2.766,2.89,3.085,5.804,6.423,6.308,4.424,3.462,3.246,3.372,3.552,4.89,7.026,7.045,5.105,3.868,3.382,3.531,3.407,2.902,2.886,2.902,3.407,3.531,3.382,3.868,5.105,7.045,7.026,4.89,3.552,3.372,3.246,3.462,4.424,6.308,6.423,5.804,3.085,2.89,2.766,2.685,2.665,3.629,5.873],"lasers":[{"x":0,"y":-5.22,"z":0.36,"angle":0,"damage":[40,60],"rate":4,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":50},{"x":5.062,"y":-2.268,"z":0.36,"angle":-60,"damage":[70,100],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":100},{"x":-5.062,"y":-2.268,"z":0.36,"angle":60,"damage":[70,100],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":100},{"x":5.062,"y":3.492,"z":0.36,"angle":-120,"damage":[70,100],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":100},{"x":-5.062,"y":3.492,"z":0.36,"angle":120,"damage":[70,100],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":100}],"radius":7.045}}';
var H_Warrior_303 = '{"name":"H-Warrior","level":3,"model":3,"size":1.8,"specs":{"shield":{"capacity":[220,320],"reload":[8,12]},"generator":{"capacity":[180,250],"reload":[90,140]},"ship":{"mass":220,"speed":[110,130],"rotation":[50,65],"acceleration":[90,110]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":-20,"z":5},"position":{"x":[0,0,0,0,0,0,0],"y":[0,-40,10,50,90,85],"z":[0,0,0,0,0,0,0]},"width":[0,10,20,20,10,0],"height":[0,5,23,20,15,0],"texture":[12,3,4,10,17],"propeller":true},"cockpit":{"section_segments":[40,90,180,270,320],"offset":{"x":0,"y":-50,"z":25},"position":{"x":[0,0,0,0],"y":[20,50,70,100],"z":[-4,0,0,-2]},"width":[5,10,10,5],"height":[0,10,10,0],"texture":[8.98,8.98,63]},"uwings":{"section_segments":8,"offset":{"x":50,"y":-20,"z":-10},"position":{"x":[0,0,0,0,0,0],"y":[-90,-100,40,80,90,100],"z":[0,0,0,0,0,0]},"width":[0,10,25,20,0],"height":[0,5,25,20,0],"texture":[12,2,3,4]},"cannons_front":{"section_segments":12,"offset":{"x":50,"y":-5,"z":10},"position":{"x":[0,0,0,0,0,0,0],"y":[-60,-70,-20,0,20,50,45],"z":[0,0,0,0,0,-3,-3]},"width":[0,5,6,10,15,5,0],"height":[0,5,5,10,10,5,0],"laser":{"damage":[70,90],"rate":2,"type":2,"speed":[190,240],"recoil":500,"number":1,"error":0},"propeller":false,"texture":[4,4,10,4,63,4]},"cannons_rear":{"section_segments":12,"offset":{"x":50,"y":90,"z":-10},"position":{"x":[0,0,0,0,0,0,0],"y":[-20,-50,-40,0,80,115,125],"z":[0,0,0,0,0,0,0]},"width":[0,10,10,10,25,20,0],"height":[0,10,10,10,25,20,0],"angle":180,"laser":{"damage":[20,20],"rate":4,"type":2,"speed":[190,240],"recoil":100,"number":1,"error":0},"propeller":true,"texture":[3,17,18,13,3,4]},"side_propulsors":{"section_segments":10,"offset":{"x":20,"y":30,"z":5},"position":{"x":[-7,-7,-2,0,0,0,0,0,0,0],"y":[-50,-70,-15,35,40,50,55,60,55],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,5,10,10,10,5,5,5,0],"height":[0,10,10,10,10,5,5,5,0],"propeller":true,"texture":[6,2,18,4,63,18,17,12]},"wire":{"section_segments":8,"angle":-45,"offset":{"x":9,"y":40,"z":5},"position":{"x":[5,5,5,5,5,5,6,8,9,10,10],"y":[-65,-64,-51.5,-40,-28,-18,-8,2,12,11],"z":[-3,-3,1,3,6,9,10,10,10,10,10]},"width":[4,4,4,4,4,4,4,4,3,0],"height":[0,3,3,3,3,3,3,3,3,0],"propeller":false,"texture":[13,13,17,13,17,13,17,13,17]}},"wings":{"main":{"doubleside":true,"offset":{"x":10,"y":0,"z":10},"length":[40],"width":[60,120],"angle":[-30],"position":[0,20],"texture":[18],"bump":{"position":10,"size":15}}},"typespec":{"name":"H-Warrior","level":3,"model":3,"code":303,"specs":{"shield":{"capacity":[220,320],"reload":[8,12]},"generator":{"capacity":[180,250],"reload":[90,140]},"ship":{"mass":220,"speed":[110,130],"rotation":[50,65],"acceleration":[90,110]}},"shape":[2.164,2.19,2.053,4.774,4.83,4.17,3.608,3.248,2.999,2.821,2.705,2.637,2.648,2.717,2.777,2.859,2.976,3.161,3.319,3.536,4.027,5.063,5.483,5.299,3.298,2.525,3.298,5.299,5.483,5.063,4.027,3.536,3.319,3.161,2.976,2.859,2.777,2.717,2.648,2.637,2.705,2.821,2.999,3.248,3.608,4.17,4.83,4.774,2.053,2.19],"lasers":[{"x":1.8,"y":-2.7,"z":0.36,"angle":0,"damage":[70,90],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":500},{"x":-1.8,"y":-2.7,"z":0.36,"angle":0,"damage":[70,90],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":500},{"x":1.8,"y":5.04,"z":-0.36,"angle":180,"damage":[20,20],"rate":4,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":100},{"x":-1.8,"y":5.04,"z":-0.36,"angle":-180,"damage":[20,20],"rate":4,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":100}],"radius":5.483}}';
var U_Sentry_304 = '{"name":"U-Sentry","level":3,"model":4,"size":1.8,"specs":{"shield":{"capacity":[200,300],"reload":[3,5]},"generator":{"capacity":[300,500],"reload":[100,150]},"ship":{"mass":240,"speed":[90,110],"rotation":[30,50],"acceleration":[70,120]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":5,"z":20},"position":{"x":[0,0,0,0,0,0],"y":[0,-10,40,100,90,100],"z":[0,0,0,0,0,0]},"width":[0,10,25,10,0],"height":[0,5,15,10,0],"texture":[2,1,10,12],"propeller":true},"cockpit":{"section_segments":[40,90,180,270,320],"offset":{"x":0,"y":-5,"z":31},"position":{"x":[0,0,0,0],"y":[25,50,70,85],"z":[-1,0,0,1]},"width":[5,12,10,5],"height":[0,12,15,0],"texture":[8.98,8.98,4]},"uwing1":{"section_segments":[60,180,-60],"offset":{"x":0,"y":-30,"z":0},"position":{"x":[50,50,50,50,50,50,50,50],"y":[-65,-65,-65,10,40,80,90,100],"z":[0,0,0,0,0,0,0,0]},"width":[0,16,18,18,18,18,0],"height":[0,16,18,18,18,18,0],"texture":[4.1,4.1,4.1,4.1,63,18]},"uwing2":{"section_segments":[60,180,-60],"offset":{"x":0,"y":-30,"z":0},"position":{"x":[-50,-50,-50,-50,-50,-50,-50,-50],"y":[-65,-65,-65,10,40,80,90,100],"z":[0,0,0,0,0,0,0,0]},"width":[0,16,18,18,18,18,0],"height":[0,16,18,18,18,18,0],"texture":[4.1,4.1,4.1,4.1,63,18]},"uwing_covers":{"section_segments":16,"offset":{"x":50,"y":10,"z":-3},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[20,20,-5,0,40,80,85,80,90,95],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,20,23,28,30,28,24,18,18,0],"height":[0,20,23,24,30,24,20,14,14,0],"texture":[12,4,2,63,3,4,18,17,18]},"cannons1":{"section_segments":12,"offset":{"x":50,"y":-70,"z":-13},"position":{"x":[0,0,0,0,0,0],"y":[-60,-70,-25,70,80,100],"z":[0,0,0,0,0,0]},"width":[0,8,8,8,8,0],"height":[0,8,8,8,8,0],"texture":[13,4,13,18],"laser":{"damage":[40,60],"rate":3,"type":2,"speed":[190,240],"recoil":150,"number":1,"error":0}},"cannons2":{"section_segments":12,"offset":{"x":61,"y":-70,"z":6},"position":{"x":[0,0,0,0,0,0],"y":[-60,-70,-25,70,80,100],"z":[0,0,0,0,0,0]},"width":[0,8,8,8,8,0],"height":[0,8,8,8,8,0],"texture":[13,4,13,18]},"cannons3":{"section_segments":12,"offset":{"x":39,"y":-70,"z":6},"position":{"x":[0,0,0,0,0,0],"y":[-60,-70,-25,70,80,100],"z":[0,0,0,0,0,0]},"width":[0,8,8,8,8,0],"height":[0,8,8,8,8,0],"texture":[13,4,13,18]},"cannon_detail1":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":50,"y":45,"z":15},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-110,-110,-90,-90,-40,5,50,60],"z":[0,0,0,0,0,0,0,-15]},"width":[0,5,5,3,3,3,3,3],"height":[0,5,5,5,10,20,10,0],"texture":[4,4,4,4,17,4]},"ide_propulsors":{"section_segments":10,"offset":{"x":20,"y":35,"z":20},"position":{"x":[-10,-10,0,0,0,0,0,0,0,0],"y":[-20,-30,15,35,40,50,55,60,55],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,5,10,10,10,5,5,5,0],"height":[0,5,10,10,10,5,5,5,0],"propeller":true,"texture":[6,2,18,4,63,18,17,12]}},"wings":{"main":{"doubleside":true,"offset":{"x":10,"y":55,"z":15},"length":[50],"width":[60,30],"angle":[-10],"position":[0,-30],"texture":[18],"bump":{"position":10,"size":15}},"cannon_cover1":{"offset":{"x":50,"y":-35,"z":17},"length":[15,5,5,15,55,0],"width":[145,140,50,35,20],"angle":[-15,-25,-70,-105],"position":[44,42,0,-7,-10],"texture":[2],"doubleside":true,"bump":{"position":30,"size":3}},"cannon_cover2":{"offset":{"x":-50,"y":-35,"z":17},"length":[15,5,5,15,55,0],"width":[145,140,50,35,20],"angle":[-15,-25,-70,-105],"position":[44,42,0,-7,-10],"texture":[2],"doubleside":true,"bump":{"position":30,"size":3}}},"typespec":{"name":"U-Sentry","level":3,"model":4,"code":304,"specs":{"shield":{"capacity":[200,300],"reload":[3,5]},"generator":{"capacity":[300,500],"reload":[100,150]},"ship":{"mass":240,"speed":[90,110],"rotation":[30,50],"acceleration":[70,120]}},"shape":[0.18,0.183,5.299,5.57,5.619,4.629,3.876,3.403,3.156,2.932,2.762,2.612,2.528,2.823,2.916,3.06,3.27,3.538,3.882,4.307,4.353,4.308,4.177,3.791,3.797,3.787,3.797,3.791,4.177,4.308,4.353,4.307,3.882,3.538,3.27,3.06,2.916,2.823,2.528,2.612,2.762,2.932,3.156,3.403,3.876,4.629,5.619,5.57,5.299,0.183],"lasers":[{"x":1.8,"y":-5.04,"z":-0.468,"angle":0,"damage":[40,60],"rate":3,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":150},{"x":-1.8,"y":-5.04,"z":-0.468,"angle":0,"damage":[40,60],"rate":3,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":150}],"radius":5.619}}';
//Tier 4
var U_Arsenal_401 = '{"name":"U-Arsenal","level":4,"model":1,"size":2,"specs":{"shield":{"capacity":[250,400],"reload":[10,20]},"generator":{"capacity":[350,600],"reload":[150,200]},"ship":{"mass":450,"speed":[90,110],"rotation":[30,50],"acceleration":[60,110]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":-60,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[0,-55,-10,100,110,80],"z":[0,0,0,0,0,0,0]},"width":[0,10,30,25,10,0],"height":[0,10,20,20,15,0],"texture":[12,10,1,13,17],"propeller":true},"cockpit":{"section_segments":[40,90,180,270,320],"offset":{"x":0,"y":-90,"z":20},"position":{"x":[0,0,0,0],"y":[20,45,90,115],"z":[0,0,0,0]},"width":[5,13,13,5],"height":[0,12,15,0],"texture":[8.98,8.98,4]},"uwings1":{"angle":60,"section_segments":8,"offset":{"x":5,"y":-40,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[0,10,50,170,160],"z":[0,0,0,0,0,0]},"width":[0,10,20,5,0],"height":[0,5,15,5,0],"texture":[4,3,2,13]},"uwings2":{"angle":60,"section_segments":8,"offset":{"x":-5,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[0,10,50,170,160],"z":[0,0,0,0,0,0]},"width":[0,10,20,5,0],"height":[0,5,15,5,0],"texture":[4,3,2,13]},"uwings3":{"section_segments":[0,45,90,135,180],"offset":{"x":-145,"y":50,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-90,-100,40,80,90,100],"z":[0,0,0,0,0,0]},"width":[0,5,25,20,0],"height":[0,5,25,20,0],"texture":[12,63,4,4]},"cannons1":{"section_segments":12,"offset":{"x":0,"y":-80,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[-60,-70,-20,0,20,70,45],"z":[0,0,0,0,0,-3,-3]},"width":[0,5,6,6,10,5,0],"height":[0,5,5,6,10,5,0],"angle":0,"laser":{"damage":[40,60],"rate":2,"type":2,"speed":[190,240],"recoil":50,"number":1,"error":0},"propeller":false,"texture":[4,4,10,4,63,4]},"cannons2":{"section_segments":12,"offset":{"x":50,"y":-50,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-50,-60,-15,0,10,40,65,100,115,110,120,125],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,6,6,15,15,15,15,15,10,10,0],"height":[0,5,5,6,15,25,25,25,25,20,20,0],"angle":0,"laser":{"damage":[40,60],"rate":2,"type":2,"speed":[190,240],"recoil":50,"number":1,"error":0},"propeller":false,"texture":[4,4,10,13,3,18,8,13,18,17,18]},"cannons3":{"section_segments":12,"offset":{"x":90,"y":-30,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-50,-60,-15,0,10,40,65,100,105,110,105,125],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,6,6,15,15,15,15,10,10,0],"height":[0,5,5,6,15,25,25,15,10,10,0],"angle":0,"laser":{"damage":[40,60],"rate":2,"type":2,"speed":[190,240],"recoil":50,"number":1,"error":0},"propeller":true,"texture":[4,4,10,13,63,13,63,13,18,17,18]},"cannons4":{"section_segments":12,"offset":{"x":130,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-50,-60,-15,0,10,40,65,100,115,110,120,125],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,6,6,15,15,15,15,15,10,10,0],"height":[0,5,5,6,15,25,25,25,25,20,20,0],"angle":0,"laser":{"damage":[40,60],"rate":2,"type":2,"speed":[190,240],"recoil":50,"number":1,"error":0},"propeller":false,"texture":[4,4,10,13,3,18,8,13,18,17,18]},"engines1":{"section_segments":12,"offset":{"x":20,"y":-60,"z":0},"position":{"x":[5,5,5,0,0,0,0,0],"y":[-5,-15,50,70,110,115,110],"z":[0,0,0,0,0,0,0,0]},"width":[0,7,15,15,13,13,0],"height":[0,17,30,40,38,38,0],"texture":[13,2,3,63,13,18],"propeller":true},"wire1":{"section_segments":8,"angle":-120,"offset":{"x":35,"y":25,"z":15},"position":{"x":[0,0,0,1,2,3,3,3,3,3,3],"y":[-65,-64,-51.5,-40,-28,-18,-8,2,12,11],"z":[-3,-3,1,8,12,13,12,9,0,0,0]},"width":[4,4,4,4,4,4,4,4,3,0],"height":[0,3,3,3,3,3,3,3,3,0],"propeller":false,"texture":[13,13,17,13,17,13,17,13,17]},"wire2":{"section_segments":8,"angle":-120,"offset":{"x":100,"y":56,"z":15},"position":{"x":[0,0,0,1,2,3,3,3,3,3,3],"y":[-65,-64,-51.5,-40,-28,-18,-8,2,12,11],"z":[-3,-3,1,8,12,13,12,9,0,0,0]},"width":[4,4,4,4,4,4,4,4,3,0],"height":[0,3,3,3,3,3,3,3,3,0],"propeller":false,"texture":[13,13,17,13,17,13,17,13,17]},"wire3":{"section_segments":8,"angle":-125,"offset":{"x":40,"y":-22,"z":15},"position":{"x":[0,0,0,1,2,3,3,3,3,3,3],"y":[-65,-64,-51.5,-40,-28,-18,-8,2,12,11],"z":[-3,-3,1,8,12,13,12,9,0,0,0]},"width":[4,4,4,4,4,4,4,4,3,0],"height":[0,3,3,3,3,3,3,3,3,0],"propeller":false,"texture":[13,13,17,13,17,13,17,13,17]},"wire4":{"section_segments":8,"angle":-125,"offset":{"x":100,"y":12,"z":15},"position":{"x":[0,0,0,1,2,3,3,3,3,3,3],"y":[-65,-64,-51.5,-40,-28,-18,-8,2,12,11],"z":[-6,-6,1,8,12,13,12,9,0,0,0]},"width":[4,4,4,4,4,4,4,4,3,0],"height":[0,3,3,3,3,3,3,3,3,0],"propeller":false,"texture":[13,13,17,13,17,13,17,13,17]}},"typespec":{"name":"U-Arsenal","level":4,"model":1,"code":401,"specs":{"shield":{"capacity":[250,400],"reload":[10,20]},"generator":{"capacity":[350,600],"reload":[150,200]},"ship":{"mass":450,"speed":[90,110],"rotation":[30,50],"acceleration":[60,110]}},"shape":[6.003,4.617,3.914,4.863,4.919,4.13,5.235,5.21,4.718,5.909,6.325,6.259,6.28,6.45,6.723,7.143,7.741,8.209,8.402,8.102,3.672,3.467,2.431,2.313,2.239,2.004,2.239,2.313,2.431,3.467,3.672,8.102,8.402,8.209,7.741,7.143,6.723,6.45,6.28,6.259,6.325,5.909,4.718,5.21,5.235,4.13,4.919,4.863,3.914,4.617],"lasers":[{"x":0,"y":-6,"z":0,"angle":0,"damage":[40,60],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":50},{"x":2,"y":-4.4,"z":0,"angle":0,"damage":[40,60],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":50},{"x":-2,"y":-4.4,"z":0,"angle":0,"damage":[40,60],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":50},{"x":3.6,"y":-3.6,"z":0,"angle":0,"damage":[40,60],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":50},{"x":-3.6,"y":-3.6,"z":0,"angle":0,"damage":[40,60],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":50},{"x":5.2,"y":-2.4,"z":0,"angle":0,"damage":[40,60],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":50},{"x":-5.2,"y":-2.4,"z":0,"angle":0,"damage":[40,60],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":50}],"radius":8.402}}';
var U_Center_402 = '{"name":"U-Center","level":4,"model":2,"size":2,"specs":{"shield":{"capacity":[400,700],"reload":[10,20]},"generator":{"capacity":[400,600],"reload":[250,350]},"ship":{"mass":500,"speed":[70,90],"rotation":[20,40],"acceleration":[100,150]}},"bodies":{"base":{"section_segments":6,"vertical":true,"offset":{"x":0,"y":-30,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[0,10,15,20,35,50,50,57,62],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,115,110,100,40,30,20,15,0],"height":[0,115,110,100,40,30,20,15,0],"texture":[4,4,16.9,17.98,17.9,2.9,9]},"ring":{"section_segments":6,"vertical":true,"offset":{"x":0,"y":-15,"z":0},"position":{"x":[0,0,0,0,0],"y":[0,0,5,5,0],"z":[0,0,0,0,0]},"width":[130,145,145,130,130],"height":[130,145,145,130,130],"texture":[3.9,16.9,3.9,16.9,17.9,2.9,9]},"ring2":{"section_segments":[30,90,150,210,270,330],"vertical":true,"offset":{"x":0,"y":5,"z":0},"position":{"x":[0,0,0,0,0],"y":[-20,-20,5,5,20],"z":[0,0,0,0,0]},"width":[40,55,55,40,0],"height":[40,55,55,40,0],"texture":[3.9,3.9,16.9,3.9,17.9,2.9,9]},"cockpit":{"section_segments":16,"offset":{"x":0,"y":0,"z":7},"position":{"x":[0,0,0,0,0,0,0],"y":[-30,-10,0,10,30],"z":[0,0,0,0,0]},"width":[0,16,20,15,0],"height":[0,20,22,18,0],"texture":[9]},"uwingsfront":{"section_segments":8,"offset":{"x":0,"y":0,"z":-10},"position":{"x":[0,0,0,0,0],"y":[-175,-185,-75,-35,0],"z":[0,0,0,0,0]},"width":[0,10,25,20,0],"height":[0,5,25,20,0],"texture":[12,4,63,4],"angle":0},"cannonfront":{"section_segments":12,"offset":{"x":0,"y":0,"z":10},"position":{"x":[0,0,0,0,0,0,0],"y":[-150,-160,-110,-90,-70,-40,-30],"z":[0,0,0,0,0,0,0]},"width":[0,5,6,10,15,5,5],"height":[0,5,5,10,10,5,5],"angle":0,"laser":{"damage":[40,60],"rate":4,"type":2,"speed":[190,240],"recoil":50,"number":1,"error":0},"propeller":false,"texture":[4,12,63,4,18,17]},"uwingsfrontside":{"section_segments":8,"offset":{"x":0.01,"y":0,"z":-10},"position":{"x":[0,0,0,0,0],"y":[-175,-185,-75,-35,0],"z":[0,0,0,0,0]},"width":[0,10,25,20,0],"height":[0,5,25,20,0],"texture":[12,3,63,4],"angle":-60},"cannonfrontside":{"section_segments":12,"offset":{"x":0.01,"y":0,"z":10},"position":{"x":[0,0,0,0,0,0,0],"y":[-150,-160,-110,-90,-70,-40,-30],"z":[0,0,0,0,0,0,0]},"width":[0,5,6,10,15,5,5],"height":[0,5,5,10,10,5,5],"angle":-60,"laser":{"damage":[80,100],"rate":2,"type":2,"speed":[190,240],"recoil":150,"number":1,"error":0},"propeller":false,"texture":[4,12,63,4,18,17]},"uwingsrearside":{"section_segments":8,"offset":{"x":0.01,"y":0,"z":-10},"position":{"x":[0,0,0,0,0],"y":[-175,-185,-75,-35,0],"z":[0,0,0,0,0]},"width":[0,10,25,20,0],"height":[0,5,25,20,0],"texture":[12,3,63,4],"angle":-120},"cannonrearside":{"section_segments":12,"offset":{"x":0.01,"y":0,"z":10},"position":{"x":[0,0,0,0,0,0,0],"y":[-150,-160,-110,-90,-70,-40,-30],"z":[0,0,0,0,0,0,0]},"width":[0,5,6,10,15,5,5],"height":[0,5,5,10,10,5,5],"angle":-120,"laser":{"damage":[80,100],"rate":2,"type":2,"speed":[190,240],"recoil":150,"number":1,"error":0},"propeller":false,"texture":[4,12,63,4,18,17]},"uwingsrear":{"section_segments":8,"offset":{"x":0.01,"y":0,"z":-10},"position":{"x":[0,0,0,0,0],"y":[0,35,75,185,175],"z":[0,0,0,0,0]},"width":[0,20,25,10,0],"height":[0,20,25,5,0],"texture":[4,63,3,12],"propeller":true},"cannonrear":{"section_segments":12,"offset":{"x":0.01,"y":0,"z":10},"position":{"x":[0,0,0,0,0,0,0],"y":[-150,-160,-110,-90,-70,-40,-30],"z":[0,0,0,0,0,0,0]},"width":[0,5,6,10,15,5,5],"height":[0,5,5,10,10,5,5],"angle":-180,"laser":{"damage":[80,100],"rate":1,"type":2,"speed":[190,240],"recoil":150,"number":1,"error":0},"propeller":false,"texture":[4,12,63,4,18,17]},"side_propulsors":{"section_segments":12,"offset":{"x":50,"y":60,"z":-5},"position":{"x":[0,0,0,0,0,0,0],"y":[-35,-20,0,40,60,65,55],"z":[0,0,0,0,0,0,0]},"width":[0,10,15,15,15,15,0],"height":[0,10,15,15,15,15,0],"texture":[13,13,63,8,17,18],"propeller":true}},"typespec":{"name":"U-Center","level":4,"model":2,"code":402,"specs":{"shield":{"capacity":[400,700],"reload":[10,20]},"generator":{"capacity":[400,600],"reload":[250,350]},"ship":{"mass":500,"speed":[70,90],"rotation":[20,40],"acceleration":[100,150]}},"shape":[7.411,7.062,5.316,5.13,5.039,5.088,5.244,5.849,7.411,7.411,5.396,5.182,5.056,5.056,5.182,5.396,7.411,7.411,5.849,5.244,5.088,5.636,5.526,5.316,7.062,7.411,7.062,5.316,5.526,5.636,5.088,5.244,5.849,7.411,7.411,5.396,5.182,5.056,5.056,5.182,5.396,7.411,7.411,5.849,5.244,5.088,5.039,5.13,5.316,7.062],"lasers":[{"x":0,"y":-6.4,"z":0.4,"angle":0,"damage":[40,60],"rate":4,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":50},{"x":5.543,"y":-3.2,"z":0.4,"angle":-60,"damage":[80,100],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":150},{"x":-5.543,"y":-3.2,"z":0.4,"angle":60,"damage":[80,100],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":150},{"x":5.543,"y":3.2,"z":0.4,"angle":-120,"damage":[80,100],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":150},{"x":-5.543,"y":3.2,"z":0.4,"angle":120,"damage":[80,100],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":150},{"x":0,"y":6.4,"z":0.4,"angle":-180,"damage":[80,100],"rate":1,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":150},{"x":0,"y":6.4,"z":0.4,"angle":180,"damage":[80,100],"rate":1,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":150}],"radius":7.411}}';
var U_Interceptor_403 = '{"name":"U-Interceptor","level":4,"model":3,"size":2,"specs":{"shield":{"capacity":[250,400],"reload":[10,20]},"generator":{"capacity":[350,600],"reload":[125,300]},"ship":{"mass":300,"speed":[110,125],"rotation":[35,45],"acceleration":[55,90]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":-40,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[0,-70,0,50,90,85],"z":[0,5,0,0,0,0,0]},"width":[0,10,20,20,10,0],"height":[0,15,27,30,20,0],"texture":[12,3,4,13,17],"propeller":true},"cockpit":{"section_segments":[40,90,180,270,320],"offset":{"x":0,"y":-75,"z":25},"position":{"x":[0,0,0,0],"y":[5,30,85,115],"z":[-1,0,0,-2]},"width":[5,10,12,5],"height":[0,12,15,0],"texture":[8.98,8.98,3]},"uwings1":{"section_segments":10,"offset":{"x":0,"y":-80,"z":-5},"position":{"x":[0,0,0,0,0,0],"y":[-90,-100,40,115,125],"z":[0,0,0,0,0,0]},"width":[0,10,30,20,0],"height":[0,5,25,20,0],"texture":[12,63,3,4]},"uwings_rear1":{"angle":180,"section_segments":12,"offset":{"x":45,"y":90,"z":-10},"position":{"x":[0,0,0,0,-12.5,-12.5,-12.5],"y":[-20,-50,10,30,80,115,125],"z":[0,0,0,0,0,0,0]},"width":[0,8,8,10,25,20,0],"height":[0,8,8,10,25,20,0],"texture":[3,18,10,13,3,4],"laser":{"damage":[30,50],"rate":5,"type":2,"speed":[200,280],"recoil":75,"number":1,"error":0}},"uwings_rear2":{"angle":180,"section_segments":12,"offset":{"x":70,"y":90,"z":-10},"position":{"x":[0,0,0,0,12.5,12.5,12.5],"y":[-20,-50,10,30,80,115,125],"z":[0,0,0,0,0,0,0]},"width":[0,8,8,10,25,20,0],"height":[0,8,8,10,25,20,0],"texture":[3,18,10,13,3,4],"laser":{"damage":[30,50],"rate":5,"type":2,"speed":[200,280],"recoil":75,"number":1,"error":0}},"discs":{"angle":180,"section_segments":12,"offset":{"x":57.5,"y":100,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-10,-10,-5,-5,15,15,20,20,40,40,45,45,80,80,90,90],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,25,25,20,20,25,25,20,20,25,25,20,20,25,25,0],"height":[0,15,15,10,10,20,20,15,15,25,25,20,25,25,25,0],"texture":[4,4,4,11,4,4,4,17,4,4,4,17,4]},"cannon_detail":{"angle":180,"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":57.5,"y":25,"z":5},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-110,-110,-90,-90,-40,5,50,60],"z":[0,0,0,0,0,0,0,-15]},"width":[0,5,5,3,3,3,3,3],"height":[0,5,5,5,10,20,10,0],"texture":[2,63,2,4,4,63]},"cannon_front":{"section_segments":12,"offset":{"x":0,"y":-80,"z":12},"position":{"x":[0,0,0,0,0,0,0],"y":[-60,-70,-20,0,20,70,45],"z":[0,0,0,0,0,-3,-3]},"width":[0,5,6,6,10,5,0],"height":[0,5,5,6,10,5,0],"angle":0,"laser":{"damage":[20,40],"rate":5,"type":2,"speed":[190,240],"recoil":15,"number":1,"error":0},"propeller":false,"texture":[4,4,10,4,63,4]},"engines1":{"section_segments":12,"offset":{"x":20,"y":-50,"z":-5},"position":{"x":[7,7,10,10,0,0,0,0],"y":[15,10,20,60,90,95,85],"z":[0,0,0,0,0,0,0,0]},"width":[0,7,10,11,8,8,0],"height":[0,17,19,20,18,18,0],"texture":[18,13,63,8,17,18],"propeller":true},"wire":{"section_segments":8,"angle":25,"offset":{"x":40,"y":2,"z":25},"position":{"x":[2,2,4,5,6,7,8,9,9,10,10],"y":[-65,-64,-51.5,-40,-28,-18,-8,2,12,11],"z":[-15,-15,-9,-6,-6,-8,-11,-15,-18,-18,-18]},"width":[4,4,4,4,4,4,4,4,3,0],"height":[0,3,3,3,3,3,3,3,3,0],"propeller":false,"texture":[13,13,17,13,17,13,17,13,17]}},"wings":{"front":{"doubleside":true,"offset":{"x":10,"y":-125,"z":-5},"length":[58],"width":[50,0],"angle":[-5],"position":[0,110],"texture":[63],"bump":{"position":10,"size":10}},"front2":{"doubleside":true,"offset":{"x":10,"y":-95,"z":0},"length":[60],"width":[60,0],"angle":[0],"position":[0,110],"texture":[4],"bump":{"position":10,"size":10}},"main":{"doubleside":true,"offset":{"x":60,"y":20,"z":-10},"length":[25,0,15],"width":[40,20,100,0],"angle":[0,0,0],"position":[0,20,0,50],"texture":[4,13,63],"bump":{"position":60,"size":13}}},"typespec":{"name":"U-Interceptor","level":4,"model":3,"code":403,"specs":{"shield":{"capacity":[250,400],"reload":[10,20]},"generator":{"capacity":[350,600],"reload":[125,300]},"ship":{"mass":300,"speed":[110,125],"rotation":[35,45],"acceleration":[55,90]}},"shape":[7.21,6.822,4.848,4.106,3.648,3.288,3.051,2.89,2.794,3.06,3.606,3.559,3.574,3.672,3.83,4.08,4.437,4.883,4.849,4.88,5.812,6.41,6.189,5.888,2.036,2.004,2.036,5.888,6.189,6.41,5.812,4.88,4.849,4.883,4.437,4.08,3.83,3.672,3.58,3.559,3.606,3.06,2.794,2.89,3.051,3.288,3.648,4.106,4.848,6.822],"lasers":[{"x":1.8,"y":5.6,"z":-0.4,"angle":180,"damage":[30,50],"rate":5,"type":2,"speed":[200,280],"number":1,"spread":0,"error":0,"recoil":75},{"x":-1.8,"y":5.6,"z":-0.4,"angle":-180,"damage":[30,50],"rate":5,"type":2,"speed":[200,280],"number":1,"spread":0,"error":0,"recoil":75},{"x":2.8,"y":5.6,"z":-0.4,"angle":180,"damage":[30,50],"rate":5,"type":2,"speed":[200,280],"number":1,"spread":0,"error":0,"recoil":75},{"x":-2.8,"y":5.6,"z":-0.4,"angle":-180,"damage":[30,50],"rate":5,"type":2,"speed":[200,280],"number":1,"spread":0,"error":0,"recoil":75},{"x":0,"y":-6,"z":0.48,"angle":0,"damage":[20,40],"rate":5,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":15}],"radius":7.21}}';
var U_Speeder_404 = '{"name":"U-Speeder","level":4,"model":4,"size":2,"specs":{"shield":{"capacity":[300,400],"reload":[10,20]},"generator":{"capacity":[200,400],"reload":[100,200]},"ship":{"mass":250,"speed":[100,120],"rotation":[45,55],"acceleration":[90,110]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":-50,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[0,-10,30,70,120,100],"z":[0,0,0,0,0,0,0]},"width":[0,10,25,30,20,0],"height":[0,5,20,25,20,0],"texture":[15,4,3,8,17],"propeller":true},"cockpit":{"section_segments":[40,90,180,270,320],"offset":{"x":0,"y":-35,"z":15},"position":{"x":[0,0,0,0],"y":[0,30,60,95],"z":[0,2,8,6]},"width":[5,13,13,5],"height":[0,12,12,0],"texture":[8.98,8.98,63]},"uwings":{"section_segments":[0,45,90,135,180],"offset":{"x":-55,"y":-50,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-90,-100,40,80,90,100],"z":[0,0,0,0,0,0]},"width":[0,10,25,20,0],"height":[0,5,25,20,0],"texture":[12,2,18,4]},"cannons_front":{"section_segments":12,"offset":{"x":45,"y":-30,"z":0},"position":{"x":[0,0,0,5,5,10,10],"y":[-60,-70,-20,0,20,50,45],"z":[0,0,0,0,0,-1,-1]},"width":[0,5,6,15,15,5,0],"height":[0,5,5,15,15,5,0],"laser":{"damage":[60,80],"rate":2,"type":2,"speed":[190,240],"recoil":100,"number":1,"error":0},"propeller":false,"texture":[4,13,18,4,63,4]},"cannon_rear":{"section_segments":12,"offset":{"x":0,"y":60,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-60,-75,-60,-62,-63,-60,-45,-47,-49,-45,-30,-33,-35,-30,-15,-18,-20,-15,0],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,2,3,4,6,3,4,6,8,5,6,7,11,7,8,12,15,8,10],"height":[0,2,3,4,6,3,4,6,8,5,6,7,11,7,8,12,15,8,10],"angle":180,"laser":{"damage":[20,20],"rate":10,"type":2,"speed":[150,200],"recoil":100,"number":1,"error":0},"propeller":false,"texture":[4,4,8,13,17,4,2,2,17,4,2,2,17,4,2,2,17,4]},"engines":{"section_segments":12,"offset":{"x":25,"y":-30,"z":0},"position":{"x":[-7,-7,-2,0,0,0,0,0],"y":[15,0,20,50,75,80,65],"z":[0,0,0,0,0,0,0,0]},"width":[0,7,10,11,10,8,0],"height":[0,15,18,19,18,15,0],"texture":[3,8,63,13,17,18],"propeller":true},"tube1":{"section_segments":4,"offset":{"x":20,"y":20,"z":14},"position":{"x":[-4,0,0,0],"y":[-40,-25,125,128],"z":[-4,0,0,0]},"width":[0,2,2,0],"height":[0,2,2,2],"texture":[13,4,13]},"tube2":{"section_segments":4,"offset":{"x":20,"y":20,"z":-14},"position":{"x":[-4,0,0,0],"y":[-40,-25,125,128],"z":[4,0,0,0]},"width":[0,2,2,0],"height":[0,2,2,2],"texture":[13,4,13]},"disc5":{"section_segments":12,"offset":{"x":0,"y":145,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,0,0,0,0,5,5,5,0,0],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[22,22,22,25,25,25,25,22,22,22],"height":[22,22,22,25,25,25,25,22,22,22],"texture":[4],"propeller":false},"wire":{"section_segments":8,"angle":-45,"offset":{"x":9,"y":30,"z":30},"position":{"x":[5,5,5,5,5,5,6,8,9,10,10],"y":[-65,-64,-51.5,-40,-28,-18,-8,2,12,11],"z":[-15,-15,-9,-8,-8,-9,-12,-15,-18,-18,-18]},"width":[4,4,4,4,4,4,4,4,3,0],"height":[0,3,3,3,3,3,3,3,3,0],"propeller":false,"texture":[13,13,17,13,17,13,17,13,17]}},"wings":{"main":{"doubleside":true,"offset":{"x":10,"y":25,"z":0},"length":[50],"width":[80,50],"angle":[0],"position":[0,-50],"texture":[18],"bump":{"position":10,"size":20}},"inner":{"offset":{"x":-57,"y":-85,"z":0},"length":[5],"width":[165,112],"angle":[0],"position":[20,0],"texture":[17,63],"doubleside":true,"bump":{"position":30,"size":4}}},"typespec":{"name":"U-Speeder","level":4,"model":4,"code":404,"specs":{"shield":{"capacity":[300,400],"reload":[10,20]},"generator":{"capacity":[200,400],"reload":[100,200]},"ship":{"mass":250,"speed":[100,120],"rotation":[45,55],"acceleration":[90,110]}},"shape":[2.405,2.433,2.33,6.539,6.199,5.137,4.472,4.033,3.694,3.475,3.333,3.256,3.225,3.15,3.149,3.227,3.231,2.933,2.72,2.197,2.396,2.369,2.821,4.683,6.083,6.012,6.083,4.683,2.821,2.369,2.396,2.197,2.72,2.933,3.231,3.227,3.149,3.148,3.225,3.256,3.333,3.475,3.694,4.033,4.472,5.137,6.199,6.539,2.33,2.433],"lasers":[{"x":1.8,"y":-4,"z":0,"angle":0,"damage":[60,80],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":100},{"x":-1.8,"y":-4,"z":0,"angle":0,"damage":[60,80],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":100},{"x":0,"y":5.4,"z":0,"angle":180,"damage":[20,20],"rate":10,"type":2,"speed":[150,200],"number":1,"spread":0,"error":0,"recoil":100}],"radius":6.539}}';
var U_Siege_405 = '{"name":"U-Siege","level":4,"model":5,"size":2,"specs":{"shield":{"capacity":[220,350],"reload":[4,6]},"generator":{"capacity":[450,650],"reload":[75,150]},"ship":{"mass":250,"speed":[75,100],"rotation":[50,70],"acceleration":[80,100]}},"bodies":{"main":{"section_segments":10,"offset":{"x":0,"y":0,"z":10},"position":{"x":[0,0,0,0,0,0,0],"y":[-5,-10,20,60,90,85],"z":[-4,-4,0,0,0,0,0]},"width":[0,5,15,20,10,0],"height":[7.5,7.5,10,10,5,0],"texture":[13,2,10,2,17],"propeller":true},"cockpit":{"section_segments":12,"offset":{"x":0,"y":-10,"z":17},"position":{"x":[0,0,0,0],"y":[20,40,70,80],"z":[1,0,0,2]},"width":[2.5,7,8,4],"height":[0,8,8,0],"texture":[9,9,4]},"cannon1":{"section_segments":12,"offset":{"x":0,"y":30,"z":3},"position":{"x":[0,0,0,0],"y":[-50,-60,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[4,15,11],"laser":{"damage":[10,20],"rate":5,"type":1,"speed":[100,200],"number":1,"error":5}},"cannon2":{"section_segments":12,"offset":{"x":0,"y":10,"z":10},"position":{"x":[0,0,0,0],"y":[-20,-30,0,0],"z":[0,0,0,0]},"width":[0,2,2,0],"height":[0,2,2,0],"texture":[4,12,11],"laser":{"damage":[15,30],"rate":10,"type":1,"speed":[150,240],"number":1,"error":20}},"discs":{"section_segments":20,"offset":{"x":68,"y":30,"z":-10},"position":{"x":[0,0,0,0,0,0,0],"y":[0,10,5,5,10,13],"z":[0,0,0,0,0,0,0]},"width":[18,18,14,14,14,0],"height":[18,18,14,14,14,0],"texture":[13,17,17,18],"angle":90},"ulights":{"section_segments":12,"offset":{"x":50,"y":-20,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-90,-90,40,76,75,85,87],"z":[0,0,0,0,0,0,0,0]},"width":[0,9,25,20,15,15,0],"height":[5,5,5,5,15,15,10],"texture":[17,17,17,15,18]},"uwing_bottom":{"section_segments":12,"offset":{"x":50,"y":-20,"z":-15},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-90,-100,-60,50,70,80,75],"z":[5,5,2,0,2,5,5]},"width":[0,10,12,25,20,20,15],"height":[0,5,5,20,15,20,15],"texture":[12,63,3,4,4,17]},"uwing_top":{"section_segments":12,"offset":{"x":50,"y":-20,"z":-5},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-90,-100,-60,50,70,80,75],"z":[-5,-5,-2,0,-2,-5,-5]},"width":[0,10,12,25,20,20,15],"height":[0,5,5,20,15,20,15],"texture":[12,63,3,4,4,17]},"charger":{"section_segments":4,"offset":{"x":50,"y":25,"z":15},"position":{"x":[0,0,0,0,0],"y":[-20,-15,20,25,27],"z":[0,0,0,0,0]},"width":[5,12,12,5,0],"height":[5,8,8,5,0],"texture":[63,18,63],"angle":0},"barrels":{"section_segments":14,"offset":{"x":50,"y":30,"z":15},"position":{"x":[0,0,0,0,0],"y":[-70,-90,-70,-70,-20],"z":[0,0,0,0,0]},"width":[0,5,5,4,4],"height":[0,5,5,4,4],"angle":0,"laser":{"damage":[40,60],"rate":10,"type":2,"speed":[190,240],"recoil":50,"number":1,"error":0},"propeller":false,"texture":[4,13,11,4]},"buttress1":{"section_segments":8,"angle":90,"offset":{"x":50,"y":40,"z":18},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-15,-14,-11.5,-10,-8,0,8,10,11.5,14,15],"z":[-20,-10,-1,1,2,0,2,1,-1,-10,-20]},"width":[4,4,4,4,4,5,4,4,4,4,4],"height":[0,10,4,3,2,3,2,3,4,10,0],"propeller":false,"texture":[13]},"buttress2":{"section_segments":8,"angle":90,"offset":{"x":50,"y":15,"z":18},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-15,-14,-11.5,-10,-8,0,8,10,11.5,14,15],"z":[-20,-10,-1,1,2,0,2,1,-1,-10,-20]},"width":[4,4,4,4,4,5,4,4,4,4,4],"height":[0,10,4,3,2,3,2,3,4,10,0],"propeller":false,"texture":[13]},"wire1":{"section_segments":8,"angle":-70,"offset":{"x":10,"y":22,"z":0},"position":{"x":[-10,-10,-5,2,3,4,4,3,0,-2,-2],"y":[-45,-44,-41.5,-40,-28,-18,-8,2,12,11],"z":[-3,-3,1,3,6,9,10,8,4,2,2]},"width":[4,4,4,4,4,4,4,4,3,0],"height":[0,3,3,3,3,3,3,3,3,0],"propeller":false,"texture":[13,13,17,13,17,13,17,13,17]},"wire2":{"section_segments":8,"angle":-70,"offset":{"x":10,"y":33,"z":0},"position":{"x":[-10,-10,-5,2,3,4,4,3,0,-2,-2],"y":[-45,-44,-41.5,-40,-28,-18,-8,2,12,11],"z":[-3,-3,1,3,6,9,10,8,4,2,2]},"width":[4,4,4,4,4,4,4,4,3,0],"height":[0,3,3,3,3,3,3,3,3,0],"propeller":false,"texture":[13,13,17,13,17,13,17,13,17]},"wire3":{"section_segments":8,"angle":-70,"offset":{"x":10,"y":44,"z":0},"position":{"x":[-10,-10,-5,2,3,4,4,3,0,-2,-2],"y":[-45,-44,-41.5,-40,-28,-18,-8,2,12,11],"z":[-3,-3,1,3,6,9,10,8,4,2,2]},"width":[4,4,4,4,4,4,4,4,3,0],"height":[0,3,3,3,3,3,3,3,3,0],"propeller":false,"texture":[13,13,17,13,17,13,17,13,17]},"side_engines":{"section_segments":10,"offset":{"x":24,"y":13,"z":0},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-5,-10,-5,40,50,49,45],"z":[0,0,0,0,0,0,0,0]},"width":[0,4,7,8,7,6,0],"height":[0,4,7,8,7,6,0],"texture":[18,1,3,12,18,17],"propeller":true}},"wings":{"main3":{"doubleside":true,"offset":{"x":0,"y":5,"z":7},"length":[45,5],"width":[40,40,40],"angle":[-20,20],"position":[20,30,0],"texture":[0,8,13,63],"bump":{"position":35,"size":20}}},"typespec":{"name":"U-Siege","level":4,"model":5,"code":405,"specs":{"shield":{"capacity":[220,350],"reload":[4,6]},"generator":{"capacity":[450,650],"reload":[75,150]},"ship":{"mass":250,"speed":[75,100],"rotation":[50,70],"acceleration":[80,100]}},"shape":[1.202,1.206,0.635,5.305,5.367,4.567,3.959,3.557,3.277,3.099,2.97,2.902,2.898,2.961,3.258,3.467,3.569,3.663,3.688,3.677,3.442,3.12,2.785,3.043,3.62,3.607,3.62,3.043,2.785,3.12,3.442,3.677,3.688,3.663,3.569,3.467,3.258,2.961,2.898,2.902,2.97,3.099,3.277,3.557,3.959,4.567,5.367,5.305,0.635,1.206],"lasers":[{"x":0,"y":-1.2,"z":0.12,"angle":0,"damage":[10,20],"rate":5,"type":1,"speed":[100,200],"number":1,"spread":0,"error":5,"recoil":0},{"x":0,"y":-0.8,"z":0.4,"angle":0,"damage":[15,30],"rate":10,"type":1,"speed":[150,240],"number":1,"spread":0,"error":20,"recoil":0},{"x":2,"y":-2.4,"z":0.6,"angle":0,"damage":[40,60],"rate":10,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":50},{"x":-2,"y":-2.4,"z":0.6,"angle":0,"damage":[40,60],"rate":10,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":50}],"radius":5.367}}';
//Tier 5
var U_Punisher_501 = '{"name":"U-Punisher","level":5,"model":1,"size":2.2,"specs":{"shield":{"capacity":[350,500],"reload":[10,20]},"generator":{"capacity":[350,600],"reload":[75,150]},"ship":{"mass":250,"speed":[95,115],"rotation":[30,50],"acceleration":[40,80]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":-40,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-40,-50,0,50,110,120,125,120],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,10,20,25,15,12,12,0],"height":[0,10,23,27,25,22,22,0],"texture":[12,8,3,4,13,17,18],"propeller":true},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-60,"z":25},"position":{"x":[0,0,0,0,0],"y":[0,30,70,100],"z":[3,0,1,5]},"width":[5,10,14,5],"height":[0,15,20,0],"texture":[9]},"uwings1":{"section_segments":8,"offset":{"x":0,"y":-80,"z":-5},"position":{"x":[0,0,0,0,0,0],"y":[-90,-100,40,150,160,100],"z":[0,0,0,0,0,0]},"width":[0,8,20,20,0],"height":[0,5,15,10,0],"texture":[12,63,3,4]},"uwing2_left":{"section_segments":[0,45,90,135,180],"offset":{"x":0,"y":50,"z":-10},"position":{"x":[-110,-110,-110,-110,-110,-110,-110],"y":[-90,-100,40,80,90,100],"z":[0,0,0,0,0,0]},"width":[0,10,25,20,0],"height":[0,5,20,15,0],"texture":[12,63,18,4]},"uwing2_right":{"section_segments":[180,225,270,315,360],"offset":{"x":0,"y":50,"z":-10},"position":{"x":[110,110,110,110,110,110],"y":[-90,-100,40,80,90,100],"z":[0,0,0,0,0,0]},"width":[0,5,20,15,0],"height":[0,10,20,15,0],"texture":[12,63,18,4]},"cannons1":{"section_segments":12,"offset":{"x":0,"y":-100,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-60,-70,-67,-20,0,20,40,35],"z":[0,0,0,0,0,3,3]},"width":[0,5,5,5,6,10,5,0],"height":[0,5,5,5,6,6,5,0],"angle":0,"laser":{"damage":[30,50],"rate":5,"type":2,"speed":[190,240],"recoil":30,"number":1,"error":0},"propeller":false,"texture":[18,17,4,18,4,63,4]},"cannons2":{"section_segments":12,"offset":{"x":20,"y":-50,"z":0},"position":{"x":[0,0,0,0,0,-3,-5,-5],"y":[-60,-70,-67,-20,0,20,40,35],"z":[0,0,0,0,0,3,3]},"width":[0,5,5,5,6,10,5,0],"height":[0,5,5,5,6,10,5,0],"angle":0,"laser":{"damage":[40,60],"rate":2,"type":2,"speed":[190,240],"recoil":125,"number":1,"error":0},"propeller":false,"texture":[18,17,4,18,4,63,4]},"cannons3":{"section_segments":12,"offset":{"x":45,"y":30,"z":43},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-60,-70,-50,-50,0,20,40,45],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,5,5,4,4,10,5,0],"height":[0,5,5,4,4,10,5,0],"angle":0,"laser":{"damage":[40,60],"rate":2,"type":2,"speed":[190,240],"recoil":125,"number":1,"error":0},"texture":[17,18,4,63,4,63,4]},"cannons4":{"section_segments":12,"offset":{"x":65,"y":30,"z":34},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-60,-70,-50,-50,0,20,40,45],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,5,5,4,4,10,5,0],"height":[0,5,5,4,4,10,5,0],"angle":0,"laser":{"damage":[40,60],"rate":2,"type":2,"speed":[190,240],"recoil":125,"number":1,"error":0},"texture":[17,18,4,63,4,63,4]},"cannons5":{"section_segments":12,"offset":{"x":100,"y":60,"z":-10},"position":{"x":[0,0,0,0,0,0,0,5,5,0,0,0,0,0,0],"y":[-60,-70,-68,-65,-50,-50,0,10,40,45,50,50],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,5,5,5,4,4,16,16,10,8,0],"height":[0,5,5,5,5,4,4,10,10,10,8,0],"angle":0,"laser":{"damage":[40,60],"rate":2,"type":2,"speed":[190,240],"recoil":125,"number":1,"error":0},"propeller":true,"texture":[18,4,17,18,4,13,63,8,18,17,18]},"engines1":{"section_segments":12,"offset":{"x":55,"y":-35,"z":39},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[35,30,50,80,110,120,125,115],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,5,8,9,9,9,9,0],"height":[0,5,8,9,9,9,9,0],"texture":[18,13,63,3,15,17,18],"propeller":true},"engines2":{"section_segments":12,"offset":{"x":20,"y":-15,"z":15},"position":{"x":[-5,-5,-5,0,0,0,0,0],"y":[15,-20,-10,80,90,95,85],"z":[-2,-2,-2,0,0,0,0,0]},"width":[0,7,9,10,8,7,0],"height":[0,7,10,11,10,10,0],"texture":[18,4,8,13,17,18],"propeller":true},"disc1":{"section_segments":16,"offset":{"x":0,"y":40,"z":20},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[1,1,-5,-5,-2,-2,-2,1,1,1],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[17,17,17,18,19,19,19,18,17,17],"height":[17,17,17,18,19,19,19,18,17,17],"texture":[63]},"disc2":{"section_segments":16,"offset":{"x":0,"y":50,"z":20},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[1,1,-5,-5,-2,-2,-2,1,1,1],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[17,17,17,18,19,19,19,18,17,17],"height":[17,17,17,18,19,19,19,18,17,17],"texture":[17]},"disc3":{"section_segments":16,"offset":{"x":0,"y":60,"z":20},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[1,1,-5,-5,-2,-2,-2,1,1,1],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[17,17,17,18,19,19,19,18,17,17],"height":[17,17,17,18,19,19,19,18,17,17],"texture":[17]},"disc4":{"section_segments":16,"offset":{"x":0,"y":70,"z":20},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[1,1,-5,-5,-2,-2,-2,1,1,1],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[17,17,17,18,19,19,19,18,17,17],"height":[17,17,17,18,19,19,19,18,17,17],"texture":[63]},"disc5":{"section_segments":16,"offset":{"x":108,"y":92,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[1,1,-5,-5,-2,-2,-2,1,1,1],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[17,17,17,18,19,19,19,18,17,17],"height":[17,17,17,18,19,19,19,18,17,17],"texture":[4]},"disc6":{"section_segments":16,"offset":{"x":107,"y":82,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[1,1,-5,-5,-2,-2,-2,1,1,1],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[17,17,17,18,19,19,19,18,17,17],"height":[17,17,17,18,19,19,19,18,17,17],"texture":[4]},"disc7":{"section_segments":16,"offset":{"x":104,"y":72,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[1,1,-5,-5,-2,-2,-2,1,1,1],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[17,17,17,18,19,19,19,18,17,17],"height":[17,17,17,18,19,19,19,18,17,17],"texture":[4]},"box":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":0,"y":55,"z":35},"position":{"x":[0,0,0,0,0],"y":[-30,-15,15,25],"z":[2,0,0,-3]},"width":[5,10,10,5],"height":[0,8,8,0],"texture":[13,8,4]},"wire1":{"section_segments":8,"angle":-150,"offset":{"x":29,"y":-5,"z":29},"position":{"x":[5,5,5,5,5,5,6,8,9,10,10],"y":[-65,-64,-51.5,-40,-28,-18,-8,2,12,11],"z":[6,6,5,3,-1,-5,-8,-11,-12,-12,-12]},"width":[4,4,4,4,4,4,4,4,3,0],"height":[0,3,3,3,3,3,3,3,3,0],"propeller":false,"texture":[13,13,17,13,17,13,17,13,17]},"wire2":{"section_segments":8,"angle":-150,"offset":{"x":29,"y":15,"z":29},"position":{"x":[5,5,5,5,5,5,6,8,9,10,10],"y":[-65,-64,-51.5,-40,-28,-18,-8,2,12,11],"z":[6,6,5,3,-1,-5,-8,-11,-12,-12,-12]},"width":[4,4,4,4,4,4,4,4,3,0],"height":[0,3,3,3,3,3,3,3,3,0],"propeller":false,"texture":[13,17,13,17,13,17,13,17,13,17]}},"wings":{"front":{"doubleside":true,"offset":{"x":10,"y":-30,"z":0},"length":[20,0,10],"width":[40,50,130,0],"angle":[180,180,180],"position":[10,-30,-50,-20],"texture":[4,63,63],"bump":{"position":40,"size":15}},"main":{"length":[75,30,5],"width":[100,60,35,160],"angle":[-5,-15,-15],"position":[-50,0,30,-25],"texture":[18,18,17],"doubleside":true,"offset":{"x":0,"y":60,"z":5},"bump":{"position":40,"size":10}},"spike":{"doubleside":true,"offset":{"x":10,"y":-30,"z":0},"length":[20,0,10],"width":[40,50,130,0],"angle":[10,20,20],"position":[10,-30,-50,-20],"texture":[4,63,63],"bump":{"position":40,"size":15}},"miniwings":{"doubleside":true,"offset":{"x":10,"y":70,"z":5},"length":[46,15,5,10],"width":[60,50,50,130,20],"angle":[30,71,71,71],"position":[-60,-30,-30,-50,-20],"texture":[3,3,18],"bump":{"position":30,"size":15}}},"typespec":{"name":"U-Punisher","level":5,"model":1,"code":501,"specs":{"shield":{"capacity":[350,500],"reload":[10,20]},"generator":{"capacity":[350,600],"reload":[75,150]},"ship":{"mass":250,"speed":[95,115],"rotation":[30,50],"acceleration":[40,80]}},"shape":[7.928,6.948,6.512,4.779,3.733,3.11,2.668,3.173,3.547,5.518,5.449,5.314,5.291,5.401,5.613,5.941,6.389,7.041,7.622,7.935,7.851,4.69,3.715,3.701,3.777,3.747,3.777,3.701,3.715,4.69,7.876,8.089,7.897,7.287,6.687,6.174,5.848,5.633,5.511,5.536,5.686,5.72,3.547,3.173,2.668,3.11,3.733,4.779,6.512,6.948],"lasers":[{"x":0,"y":-7.48,"z":0.44,"angle":0,"damage":[30,50],"rate":5,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":30},{"x":0.88,"y":-5.28,"z":0,"angle":0,"damage":[40,60],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":125},{"x":-0.88,"y":-5.28,"z":0,"angle":0,"damage":[40,60],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":125},{"x":1.98,"y":-1.76,"z":1.892,"angle":0,"damage":[40,60],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":125},{"x":-1.98,"y":-1.76,"z":1.892,"angle":0,"damage":[40,60],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":125},{"x":2.86,"y":-1.76,"z":1.496,"angle":0,"damage":[40,60],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":125},{"x":-2.86,"y":-1.76,"z":1.496,"angle":0,"damage":[40,60],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":125},{"x":4.4,"y":-0.44,"z":-0.44,"angle":0,"damage":[40,60],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":125},{"x":-4.4,"y":-0.44,"z":-0.44,"angle":0,"damage":[40,60],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":125}],"radius":8.089}}';
var U_Octa_502 = '{"name":"U-Octa","level":5,"model":2,"size":2,"specs":{"shield":{"capacity":[500,750],"reload":[10,20]},"generator":{"capacity":[500,800],"reload":[250,350]},"ship":{"mass":850,"speed":[80,100],"rotation":[30,40],"acceleration":[100,150]}},"bodies":{"base":{"section_segments":8,"vertical":true,"offset":{"x":0,"y":-30,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[0,10,15,20,35,50,50,57,62],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,115,110,100,40,30,20,15,0],"height":[0,115,110,100,40,30,20,15,0],"texture":[4,4,17,18,18,3,9]},"ring":{"section_segments":8,"vertical":true,"offset":{"x":0,"y":-15,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[0,0,5,5,5,5,0],"z":[0,0,0,0,0,0,0]},"width":[130,145,145,140,135,130,130],"height":[130,145,145,140,135,130,130],"texture":[4,17,4,17,4,18,3,9]},"ring2":{"section_segments":[22.5,67.5,112.5,157.5,202.5,247.5,292.5,337.5],"vertical":true,"offset":{"x":0,"y":5,"z":0},"position":{"x":[0,0,0,0,0],"y":[-20,-20,5,5,20],"z":[0,0,0,0,0]},"width":[40,55,55,40,0],"height":[40,55,55,40,0],"texture":[4,4,17,3.9,18,3,9]},"ring3":{"section_segments":[22.5,67.5,112.5,157.5,202.5,247.5,292.5,337.5],"vertical":true,"offset":{"x":0,"y":10,"z":0},"position":{"x":[0,0,0,0,0],"y":[0,0,5,5,0],"z":[0,0,0,0,0]},"width":[70,75,75,70,70],"height":[70,75,75,70,70],"texture":[4,4,17,3.9,18,3,9]},"uwings1":{"section_segments":8,"offset":{"x":0,"y":0,"z":-10},"position":{"x":[0,0,0,0,0],"y":[-175,-185,-75,-35,0],"z":[0,0,0,0,0]},"width":[0,10,25,20,0],"height":[0,5,25,20,0],"texture":[12,4,63,4]},"cannon1":{"section_segments":12,"offset":{"x":0,"y":0,"z":10},"position":{"x":[0,0,0,0,0,0,0],"y":[-150,-160,-110,-90,-70,-40,-30],"z":[0,0,0,0,0,0,0]},"width":[0,5,6,10,15,5,5],"height":[0,5,5,10,10,5,5],"angle":0,"laser":{"damage":[40,60],"rate":4.5,"type":2,"speed":[190,240],"recoil":100,"number":1,"error":0},"propeller":false,"texture":[4,12,63,4,18,17]},"uwings2":{"section_segments":8,"offset":{"x":0.01,"y":0,"z":-10},"position":{"x":[0,0,0,0,0],"y":[-175,-185,-75,-35,0],"z":[0,0,0,0,0]},"width":[0,10,25,20,0],"height":[0,5,25,20,0],"texture":[12,3,63,4],"angle":-45},"cannon2":{"section_segments":12,"offset":{"x":0.01,"y":0,"z":10},"position":{"x":[0,0,0,0,0,0,0],"y":[-150,-160,-110,-90,-70,-40,-30],"z":[0,0,0,0,0,0,0]},"width":[0,5,6,10,15,5,5],"height":[0,5,5,10,10,5,5],"angle":-45,"laser":{"damage":[70,80],"rate":2,"type":2,"speed":[190,240],"recoil":150,"number":1,"error":0},"propeller":false,"texture":[4,12,63,4,18,17]},"uwings3":{"section_segments":8,"offset":{"x":0.01,"y":0,"z":-10},"position":{"x":[0,0,0,0,0],"y":[-175,-185,-75,-35,0],"z":[0,0,0,0,0]},"width":[0,10,25,20,0],"height":[0,5,25,20,0],"texture":[12,4,63,4],"angle":-90},"cannon3":{"section_segments":12,"offset":{"x":0.01,"y":0,"z":10},"position":{"x":[0,0,0,0,0,0,0],"y":[-150,-160,-110,-90,-70,-40,-30],"z":[0,0,0,0,0,0,0]},"width":[0,5,6,10,15,5,5],"height":[0,5,5,10,10,5,5],"angle":-90,"laser":{"damage":[70,80],"rate":2,"type":2,"speed":[190,240],"recoil":150,"number":1,"error":0},"propeller":false,"texture":[4,12,63,4,18,17]},"uwings4":{"section_segments":8,"offset":{"x":0.01,"y":0,"z":-10},"position":{"x":[0,0,0,0,0],"y":[-175,-185,-75,-35,0],"z":[0,0,0,0,0]},"width":[0,10,25,20,0],"height":[0,5,25,20,0],"texture":[12,3,63,4],"angle":-135},"cannon4":{"section_segments":12,"offset":{"x":0.01,"y":0,"z":10},"position":{"x":[0,0,0,0,0,0,0],"y":[-150,-160,-110,-90,-70,-40,-30],"z":[0,0,0,0,0,0,0]},"width":[0,5,6,10,15,5,5],"height":[0,5,5,10,10,5,5],"angle":-135,"laser":{"damage":[70,80],"rate":2,"type":2,"speed":[190,240],"recoil":150,"number":1,"error":0},"propeller":false,"texture":[4,12,63,4,18,17]},"uwings5":{"section_segments":8,"offset":{"x":0.01,"y":0,"z":-10},"position":{"x":[0,0,0,0,0],"y":[0,35,75,185,175],"z":[0,0,0,0,0]},"width":[0,20,25,10,0],"height":[0,20,25,5,0],"texture":[4,63,4,12],"propeller":true},"cannon5":{"section_segments":12,"offset":{"x":0,"y":0,"z":10},"position":{"x":[0,0,0,0,0,0,0],"y":[-150,-160,-110,-90,-70,-40,-30],"z":[0,0,0,0,0,0,0]},"width":[0,5,6,10,15,5,5],"height":[0,5,5,10,10,5,5],"angle":-180,"laser":{"damage":[70,80],"rate":2,"type":2,"speed":[190,240],"recoil":150,"number":1,"error":0},"propeller":false,"texture":[4,12,63,4,18,17]},"wire":{"section_segments":8,"angle":30,"offset":{"x":40,"y":92,"z":20},"position":{"x":[5,5,5,5,5,5,6,8,9,10,10],"y":[-65,-64,-51.5,-40,-28,-18,-8,2,12,11],"z":[-10,-10,-4,-3,-4,-7,-11,-15,-18,-18,-18]},"width":[4,4,4,4,4,4,4,4,3,0],"height":[0,3,3,3,3,3,3,3,3,0],"propeller":false,"texture":[13,13,17,13,17,13,17,13,17]},"side_propulsors":{"section_segments":12,"offset":{"x":50,"y":70,"z":-5},"position":{"x":[0,0,0,0,0,0,0],"y":[-35,-20,0,40,60,65,55],"z":[0,0,0,0,0,0,0]},"width":[0,10,15,15,15,15,0],"height":[0,10,15,15,15,15,0],"texture":[13,13,8,63,17,18],"propeller":true}},"typespec":{"name":"U-Octa","level":5,"model":2,"code":502,"specs":{"shield":{"capacity":[500,750],"reload":[10,20]},"generator":{"capacity":[500,800],"reload":[250,350]},"ship":{"mass":850,"speed":[80,100],"rotation":[30,40],"acceleration":[100,150]}},"shape":[7.411,7.062,5.463,5.373,5.439,6.108,7.411,7.411,5.501,5.389,5.411,5.555,7.411,7.411,5.555,5.411,5.389,5.501,7.411,7.411,6.108,5.993,5.968,5.678,7.062,7.411,7.062,5.678,5.968,5.993,6.108,7.411,7.411,5.501,5.389,5.411,5.555,7.411,7.411,5.555,5.411,5.389,5.501,7.411,7.411,6.108,5.439,5.373,5.463,7.062],"lasers":[{"x":0,"y":-6.4,"z":0.4,"angle":0,"damage":[40,60],"rate":4.5,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":100},{"x":4.526,"y":-4.525,"z":0.4,"angle":-45,"damage":[70,80],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":150},{"x":-4.526,"y":-4.525,"z":0.4,"angle":45,"damage":[70,80],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":150},{"x":6.4,"y":0,"z":0.4,"angle":-90,"damage":[70,80],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":150},{"x":-6.4,"y":0,"z":0.4,"angle":90,"damage":[70,80],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":150},{"x":4.526,"y":4.525,"z":0.4,"angle":-135,"damage":[70,80],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":150},{"x":-4.526,"y":4.525,"z":0.4,"angle":135,"damage":[70,80],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":150},{"x":0,"y":6.4,"z":0.4,"angle":-180,"damage":[70,80],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":150}],"radius":7.411}}';
var H_Destroyer_503 = '{"name":"H-Destroyer","level":5,"model":3,"size":2,"specs":{"shield":{"capacity":[300,450],"reload":[10,20]},"generator":{"capacity":[700,1100],"reload":[90,200]},"ship":{"mass":450,"speed":[90,100],"rotation":[35,55],"acceleration":[85,120]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":-40,"z":10},"position":{"x":[0,0,0,0,0,0,0],"y":[0,-10,0,50,90,80],"z":[0,0,0,0,0,0,0]},"width":[0,10,18,25,10,0],"height":[0,10,13,15,10,0],"texture":[12,2,63,13,17],"propeller":true},"cockpit":{"section_segments":[40,90,180,270,320],"offset":{"x":0,"y":-58,"z":24},"position":{"x":[0,0,0,0],"y":[25,50,70,100],"z":[0,0,0,-3]},"width":[5,10,10,5],"height":[0,10,10,0],"texture":[8.98,4]},"uwings_front1":{"section_segments":12,"offset":{"x":45,"y":-120,"z":-10},"position":{"x":[0,0,0,0,12.5,12.5,12.5],"y":[-20,-50,10,30,80,115,125],"z":[0,0,0,0,0,0,0]},"width":[0,8,8,10,25,20,0],"height":[0,8,8,10,25,20,0],"texture":[3,18,10,4,3,4]},"uwings_front2":{"section_segments":12,"offset":{"x":70,"y":-120,"z":-10},"position":{"x":[0,0,0,0,-12.5,-12.5,-12.5],"y":[-20,-50,10,30,80,115,125],"z":[0,0,0,0,0,0,0]},"width":[0,8,8,10,25,20,0],"height":[0,8,8,10,25,20,0],"texture":[3,18,10,4,18,4]},"uwings_rear1":{"angle":180,"section_segments":12,"offset":{"x":45,"y":120,"z":-10},"position":{"x":[0,0,0,0,-12.5,-12.5,-12.5],"y":[-20,-50,10,30,80,115,125],"z":[0,0,0,0,0,0,0]},"width":[0,8,8,10,25,20,0],"height":[0,8,8,10,25,20,0],"texture":[3,18,10,4,3,4]},"uwings_rear2":{"angle":180,"section_segments":12,"offset":{"x":70,"y":120,"z":-10},"position":{"x":[0,0,0,0,12.5,12.5,12.5],"y":[-20,-50,10,30,80,115,125],"z":[0,0,0,0,0,0,0]},"width":[0,8,8,10,25,20,0],"height":[0,8,8,10,25,20,0],"texture":[3,18,10,4,18,4]},"discs1":{"angle":180,"section_segments":12,"offset":{"x":57.5,"y":130,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-10,-10,-5,-5,15,15,20,20,40,40,45,45,80,80,90,90],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,25,25,20,20,25,25,20,20,25,25,20,20,25,25,0],"height":[0,15,15,10,10,20,20,15,15,25,25,20,25,25,25,0],"texture":[4,17,4,10,4,17,4,18,4,17,4,8,4,17,4]},"discs2":{"section_segments":12,"offset":{"x":57.5,"y":-130,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-10,-10,-5,-5,15,15,20,20,40,40,45,45,80,80,90,90],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,25,25,20,20,25,25,20,20,25,25,20,20,25,25,0],"height":[0,15,15,10,10,20,20,15,15,25,25,20,25,25,25,0],"texture":[4,17,4,10,4,17,4,18,4,17,4,8,4,17,4]},"cannon_front":{"section_segments":12,"offset":{"x":0,"y":-40,"z":10},"position":{"x":[0,0,0,0,0,0,0],"y":[-25,-40,-15,0,20,70,45],"z":[0,0,0,0,0,-3,-3]},"width":[0,5,6,6,10,5,0],"height":[0,5,5,6,10,5,0],"angle":0,"laser":{"damage":[20,40],"rate":2,"type":2,"speed":[190,240],"recoil":50,"number":1,"error":0},"propeller":false,"texture":[4,4,10,4,63,4]},"cannon_detail1":{"angle":180,"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":57.5,"y":55,"z":5},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-110,-110,-90,-90,-40,5,50,60],"z":[0,0,0,0,0,0,0,-15]},"width":[0,5,5,3,3,3,3,3],"height":[0,5,5,5,10,20,10,0],"texture":[2,63,2,4,4,17,4],"laser":{"damage":[40,60],"rate":10,"type":2,"speed":[190,240],"recoil":150,"number":1,"error":5}},"cannon_detail2":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":57.5,"y":-55,"z":5},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-110,-110,-90,-90,-40,5,50,60],"z":[0,0,0,0,0,0,0,-15]},"width":[0,5,5,3,3,3,3,3],"height":[0,5,5,5,10,20,10,0],"texture":[2,63,2,4,4,17,4],"laser":{"damage":[40,60],"rate":10,"type":2,"speed":[190,240],"recoil":150,"number":1,"error":5}},"side_propulsors":{"section_segments":10,"offset":{"x":20,"y":5,"z":10},"position":{"x":[-7,-7,-2,0,0,0,0,0,0,0],"y":[-20,-50,-15,35,40,50,55,60,55],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,5,10,10,10,5,5,5,0],"height":[0,10,10,10,10,5,5,5,0],"propeller":true,"texture":[6,2,18,4,63,18,17,12]}},"wings":{"main":{"doubleside":true,"offset":{"x":10,"y":0,"z":10},"length":[40],"width":[60,120],"angle":[-30],"position":[0,20],"texture":[2],"bump":{"position":10,"size":15}},"point1":{"doubleside":true,"offset":{"x":60,"y":60,"z":-10},"length":[25,0,15],"width":[40,20,100,0],"angle":[0,0,0],"position":[0,20,0,50],"texture":[4,13,63],"bump":{"position":60,"size":13}},"point2":{"doubleside":true,"offset":{"x":60,"y":-60,"z":-10},"length":[25,0,15],"width":[40,20,100,0],"angle":[0,0,0],"position":[0,-20,0,-50],"texture":[4,13,63],"bump":{"position":-60,"size":13}},"point3":{"doubleside":true,"offset":{"x":-55,"y":60,"z":-10},"length":[25,0,15],"width":[40,20,100,0],"angle":[0,0,0],"position":[0,20,0,50],"texture":[4,13,8],"bump":{"position":60,"size":13}},"point4":{"doubleside":true,"offset":{"x":-55,"y":-60,"z":-10},"length":[25,0,15],"width":[40,20,100,0],"angle":[0,0,0],"position":[0,-20,0,-50],"texture":[4,13,63],"bump":{"position":-60,"size":13}},"shields1":{"doubleside":true,"offset":{"x":65,"y":0,"z":-40},"length":[0,25,30,25],"width":[40,40,95,95,40,40],"angle":[40,40,90,140],"position":[0,0,0,0,0],"texture":[4],"bump":{"position":0,"size":3}},"shields2":{"doubleside":true,"offset":{"x":-50,"y":0,"z":-40},"length":[0,25,30,25],"width":[40,40,95,95,40,40],"angle":[40,40,90,140],"position":[0,0,0,0,0],"texture":[4],"bump":{"position":0,"size":3}}},"typespec":{"name":"H-Destroyer","level":5,"model":3,"code":503,"specs":{"shield":{"capacity":[300,450],"reload":[10,20]},"generator":{"capacity":[700,1100],"reload":[90,200]},"ship":{"mass":450,"speed":[90,100],"rotation":[35,55],"acceleration":[85,120]}},"shape":[2.886,4.196,6.411,6.733,6.577,5.32,5.352,4.792,4.168,3.738,3.434,3.224,3.132,3.132,3.224,3.434,3.738,4.168,4.792,5.352,5.32,6.577,6.733,6.411,4.196,1.803,4.196,6.411,6.733,6.577,5.32,5.352,4.792,4.168,3.738,3.434,3.224,3.132,3.132,3.224,3.434,3.738,4.168,4.792,5.352,5.32,6.577,6.733,6.411,4.196],"lasers":[{"x":0,"y":-2.88,"z":0.36,"angle":0,"damage":[20,40],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":50},{"x":2.07,"y":5.94,"z":0.18,"angle":180,"damage":[40,60],"rate":10,"type":2,"speed":[190,240],"number":1,"spread":0,"error":5,"recoil":150},{"x":-2.07,"y":5.94,"z":0.18,"angle":-180,"damage":[40,60],"rate":10,"type":2,"speed":[190,240],"number":1,"spread":0,"error":5,"recoil":150},{"x":2.07,"y":-5.94,"z":0.18,"angle":0,"damage":[40,60],"rate":10,"type":2,"speed":[190,240],"number":1,"spread":0,"error":5,"recoil":150},{"x":-2.07,"y":-5.94,"z":0.18,"angle":0,"damage":[40,60],"rate":10,"type":2,"speed":[190,240],"number":1,"spread":0,"error":5,"recoil":150}],"radius":6.733}}';
var Trailblazer_504 = '{"name":"Trailblazer","level":5,"model":4,"size":1.7,"zoom":0.95,"specs":{"shield":{"capacity":[280,400],"reload":[10,20]},"generator":{"capacity":[440,600],"reload":[100,150]},"ship":{"mass":350,"speed":[100,125],"rotation":[40,55],"acceleration":[40,90]}},"bodies":{"main":{"section_segments":10,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[-70,-100,-60,0,50,40],"z":[0,0,0,0,0,0,0]},"width":[0,10,20,25,20,0],"height":[0,5,20,25,20,0],"texture":[13,3,4,18,17],"propeller":true},"cockpit":{"section_segments":[40,90,180,270,320],"offset":{"x":0,"y":-80,"z":20},"position":{"x":[0,0,0,0,0],"y":[15,45,80,90,120],"z":[-1,0,0,0,1]},"width":[5,12,12,11,5],"height":[0,10,10,10,0],"texture":[8.98,8.98,4,63]},"uwings":{"section_segments":12,"offset":{"x":75,"y":60,"z":-15},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-100,-105,-80,-90,-70,-20,10,20,25,20],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,5,7,15,20,20,10,10,10,0],"height":[0,5,7,15,20,20,10,10,10,0],"texture":[6,18,3,13,18,10,8,17,18],"propeller":true,"laser":{"damage":[100,175],"rate":5,"type":2,"speed":[190,230],"recoil":300,"number":1,"error":0}},"side1":{"angle":180,"section_segments":[45,135,-135,-45],"offset":{"x":65,"y":100,"z":-15},"position":{"x":[-4,5,8,10,8,0,6,6,12],"y":[-6,-2,2,10,15,20,60,130,140],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,3,4,4,4,9,10,10,0],"height":[0,3,4,4,4,5,5,5,0],"texture":[17,4]},"side2":{"angle":180,"section_segments":[45,135,-135,-45],"offset":{"x":-85,"y":100,"z":-15},"position":{"x":[-4,5,8,10,8,0,6,6,12],"y":[-6,-2,2,10,15,20,60,130,140],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,3,4,4,4,9,10,10,0],"height":[0,3,4,4,4,5,5,5,0],"texture":[17,4]},"side3":{"angle":180,"section_segments":[45,135,-135,-45],"offset":{"x":75,"y":100,"z":-5},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-6,-2,2,10,15,20,60,130,140],"z":[-4,5,8,10,8,0,6,6,12]},"width":[0,3,4,4,4,5,5,5,0],"height":[0,3,4,4,4,9,10,10,0],"texture":[17,4]},"side4":{"angle":180,"section_segments":[45,135,-135,-45],"offset":{"x":75,"y":100,"z":-25},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-6,-2,2,10,15,20,60,130,140],"z":[4,-5,-12,-14,-12,0,-6,-6,-12]},"width":[0,3,4,4,4,5,5,5,0],"height":[0,3,4,4,4,9,10,10,0],"texture":[17,4]},"ring1":{"section_segments":12,"offset":{"x":75,"y":10,"z":-15},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,0,0,0,0,5,5,5,0,0],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[22,22,22,25,25,25,25,22,22,22],"height":[22,22,22,25,25,25,25,22,22,22],"texture":[4,4,4,4,3,4]},"ring2":{"section_segments":12,"offset":{"x":75,"y":90,"z":-15},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,0,0,0,0,5,5,5,0,0],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[18,18,18,20,20,20,20,18,18,18],"height":[18,18,18,20,20,20,20,18,18,18],"texture":[4,4,4,4,3,4]},"ring3":{"section_segments":12,"offset":{"x":0,"y":100,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,0,0,0,0,5,5,5,0,0],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[12,12,12,15,15,15,15,12,12,12],"height":[12,12,12,15,15,15,15,12,12,12],"texture":[4,4,4,4,17,4]},"ring4":{"section_segments":12,"offset":{"x":0,"y":55,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,0,0,0,0,5,5,5,0,0],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[12,12,12,15,15,15,15,12,12,12],"height":[12,12,12,15,15,15,15,12,12,12],"texture":[4,4,4,4,17,4]},"side_propulsors":{"section_segments":10,"offset":{"x":25,"y":-10,"z":0},"position":{"x":[-10,-10,-2,0,0,0,0,0,0,0],"y":[-50,-70,-15,35,40,50,55,60,55],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,5,10,10,10,5,5,5,0],"height":[0,10,15,15,15,5,5,5,0],"propeller":true,"texture":[6,63,8,4,63,18,17,12]},"cannons_rear1":{"angle":180,"section_segments":12,"offset":{"x":10,"y":35,"z":-7},"position":{"x":[0,0,0,0,0],"y":[-60,-90,-70,-20,0],"z":[0,0,0,0,0]},"width":[0,5,5,5,8],"height":[0,5,5,5,8],"laser":{"damage":[20,20],"rate":10,"type":2,"speed":[190,240],"recoil":100,"number":1,"error":0},"texture":[4,18,4,8]},"cannon_rear2":{"section_segments":12,"offset":{"x":0,"y":35,"z":12},"position":{"x":[0,0,0,0,0],"y":[-60,-90,-70,-20,0],"z":[0,0,0,0,0]},"width":[0,5,5,5,8],"height":[0,5,5,5,8],"angle":180,"laser":{"damage":[30,30],"rate":10,"type":2,"speed":[190,240],"recoil":100,"number":1,"error":0},"texture":[4,18,4,8]},"wire1":{"section_segments":8,"angle":50,"offset":{"x":45,"y":2,"z":15},"position":{"x":[2,2,4,5,6,7,8,9,9,10,10],"y":[-65,-64,-51.5,-40,-28,-18,-8,2,12,11],"z":[-15,-15,-9,-6,-6,-8,-11,-15,-18,-18,-18]},"width":[4,4,4,4,4,4,4,4,3,0],"height":[0,3,3,3,3,3,3,3,3,0],"propeller":false,"texture":[13,13,17,13,17,13,17,13,17]},"wire2":{"section_segments":8,"angle":50,"offset":{"x":45,"y":22,"z":15},"position":{"x":[2,2,4,5,6,7,8,9,9,10,10],"y":[-65,-64,-51.5,-40,-28,-18,-8,2,12,11],"z":[-15,-15,-9,-6,-6,-8,-11,-15,-18,-18,-18]},"width":[4,4,4,4,4,4,4,4,3,0],"height":[0,3,3,3,3,3,3,3,3,0],"propeller":false,"texture":[13,13,13,17,13,17,13,17,13,17]}},"wings":{"main":{"offset":{"x":0,"y":-5,"z":10},"length":[90,25],"width":[70,25,15],"angle":[-20,20],"position":[-20,30,0],"texture":[3,63],"doubleside":true,"bump":{"position":10,"size":15}}},"typespec":{"name":"Trailblazer","level":5,"model":4,"code":504,"specs":{"shield":{"capacity":[280,400],"reload":[10,20]},"generator":{"capacity":[440,600],"reload":[100,150]},"ship":{"mass":350,"speed":[100,125],"rotation":[40,55],"acceleration":[40,90]}},"shape":[3.407,3.415,2.802,2.449,2.039,1.768,1.592,2.268,3.121,3.567,3.552,3.442,3.699,3.675,3.463,3.583,3.718,3.921,4.544,4.673,4.595,4.233,1.878,2.717,4.28,4.258,4.28,2.717,1.878,4.233,4.595,4.673,4.544,3.921,3.718,3.583,3.463,3.675,3.699,3.442,3.552,3.567,3.121,2.268,1.592,1.768,2.039,2.449,2.802,3.415],"lasers":[{"x":2.55,"y":-1.53,"z":-0.51,"angle":0,"damage":[100,175],"rate":5,"type":2,"speed":[190,230],"number":1,"spread":0,"error":0,"recoil":300},{"x":-2.55,"y":-1.53,"z":-0.51,"angle":0,"damage":[100,175],"rate":5,"type":2,"speed":[190,230],"number":1,"spread":0,"error":0,"recoil":300},{"x":0.34,"y":4.25,"z":-0.238,"angle":180,"damage":[20,20],"rate":10,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":100},{"x":-0.34,"y":4.25,"z":-0.238,"angle":-180,"damage":[20,20],"rate":10,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":100},{"x":0,"y":4.25,"z":0.408,"angle":180,"damage":[30,30],"rate":10,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":100}],"radius":4.673}}';
var U_Demon_505 = '{"name":"U-Demon","level":5,"model":5,"size":2,"specs":{"shield":{"capacity":[280,400],"reload":[10,20]},"generator":{"capacity":[440,700],"reload":[80,120]},"ship":{"mass":325,"speed":[90,115],"rotation":[60,80],"acceleration":[90,140]}},"bodies":{"main":{"section_segments":10,"offset":{"x":0,"y":80,"z":10},"position":{"x":[0,0,0,0,0,0,0],"y":[-100,-125,-70,-40,10,-10],"z":[0,0,0,0,0,0,0]},"width":[0,10,25,25,20,0],"height":[0,5,20,25,15,0],"texture":[15,63,3,8,17],"propeller":true},"cockpit":{"section_segments":[40,90,180,270,320],"offset":{"x":0,"y":-30,"z":25},"position":{"x":[0,0,0,0],"y":[0,30,60,95],"z":[-3,4,5,6]},"width":[5,11,12,5],"height":[0,12,12,0],"texture":[8.98,8.98,63]},"uwings1":{"section_segments":12,"offset":{"x":75,"y":-60,"z":-15},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-80,-90,10,40,80,105,110,95],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,7,7,25,23,18,16,0],"height":[0,7,7,25,23,18,16,0],"texture":[6,13,63,8,18,17,18],"propeller":true,"laser":{"damage":[100,200],"rate":2,"type":2,"speed":[190,240],"recoil":350,"number":1,"error":0}},"triangle1":{"section_segments":[45,135,-135,-45],"offset":{"x":75,"y":-40,"z":-15},"position":{"x":[0,0,0,0,0,0],"y":[-90,-105,20,60,85,85],"z":[0,0,0,0,0,0]},"width":[0,5,36,35,26,0],"height":[0,3,3,3,3,0],"texture":[12,4,4,17]},"triangle2":{"section_segments":[45,135,-135,-45],"offset":{"x":75,"y":-40,"z":-15},"position":{"x":[0,0,0,0,0,0],"y":[-90,-105,20,60,85,85],"z":[0,0,0,0,0,0]},"width":[0,3,3,3,3,0],"height":[0,5,36,35,26,0],"texture":[12,4,4,17]},"cannon_detail1":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":85,"y":-50,"z":-15},"position":{"x":[0,0,-5,-5,0,0,0,0],"y":[-110,-110,-70,-70],"z":[0,0,0,0,0,0,0,0]},"width":[0,5,0,0],"height":[0,5,5,0],"texture":[63]},"cannon_detail2":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":-65,"y":-50,"z":-15},"position":{"x":[0,0,-5,-5,0,0,0,0],"y":[-110,-110,-70,-70],"z":[0,0,0,0,0,0,0,0]},"width":[0,5,0,0],"height":[0,5,5,0],"texture":[63]},"uwings2":{"section_segments":12,"offset":{"x":60,"y":40,"z":40},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-25,-40,-20,-20,25,50,105,110,105],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,7,7,5,5,10,8,8,0],"height":[0,7,7,5,5,10,8,8,0],"texture":[6,18,4,13,4,8,17,18],"propeller":true,"laser":{"damage":[30,60],"rate":5,"type":2,"speed":[190,240],"recoil":350,"number":1,"error":0}},"uwing2detail":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":60,"y":190,"z":40},"position":{"x":[0,0,0,0,0,0],"y":[-130,-110,-70,-40],"z":[0,0,0,0,0,0,0,0]},"width":[0,12,13,0],"height":[0,15,15,0],"texture":[4,8,63]},"cannons_rear":{"angle":180,"section_segments":12,"offset":{"x":7,"y":50,"z":10},"position":{"x":[0,0,0,-8,-13,-6,0],"y":[-60,-80,-20,0,40,75,45],"z":[0,0,0,0,0,-1,-1]},"width":[0,5,5,10,8,8,0],"height":[0,5,5,12,18,10,0],"laser":{"damage":[20,20],"rate":10,"type":2,"speed":[190,240],"recoil":100,"number":1,"error":0},"propeller":false,"texture":[4,13,17,3,13,4]},"rearcannonjoin":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":0,"y":200,"z":10},"position":{"x":[0,0,0,0,0,0],"y":[-150,-150,-70,-70],"z":[0,0,0,0,0,0,0,0]},"width":[0,5,5,0],"height":[0,5,5,0],"texture":[4]},"discs":{"section_segments":12,"offset":{"x":75,"y":-105,"z":-15},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-10,-10,-5,-5,15,15,20,20,40,40,45,45,80,80,90,90],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,10,10,0,0,15,15,0,0,20,20,0,0,27,27,0],"height":[0,10,10,0,0,15,15,0,0,20,20,0,0,27,27,0],"texture":[4,17,4,10,4,17,4,18,4,17,4,8,4,18,4]},"wire1":{"section_segments":8,"angle":-60,"offset":{"x":9,"y":15,"z":3},"position":{"x":[5,5,5,5,5,5,6,8,9,10,10],"y":[-65,-64,-51.5,-40,-28,-18,-8,2,12,11],"z":[-5,-5,1,6,10,11,12,15,18,18,18]},"width":[4,4,4,4,4,4,4,4,3,0],"height":[0,3,3,3,3,3,3,3,3,0],"propeller":false,"texture":[13,13,17,13,17,13,17,13,17]},"wire2":{"section_segments":8,"angle":-60,"offset":{"x":9,"y":30,"z":3},"position":{"x":[5,5,5,5,5,5,6,8,9,10,10],"y":[-65,-64,-51.5,-40,-28,-18,-8,2,12,11],"z":[-5,-5,1,6,10,11,12,15,18,18,18]},"width":[4,4,4,4,4,4,4,4,3,0],"height":[0,3,3,3,3,3,3,3,3,0],"propeller":false,"texture":[13,17,13,17,13,17,13,17,13,17]},"wire3":{"section_segments":8,"angle":-60,"offset":{"x":9,"y":45,"z":3},"position":{"x":[5,5,5,5,5,5,6,8,9,10,10],"y":[-65,-64,-51.5,-40,-28,-18,-8,2,12,11],"z":[-5,-5,1,6,10,11,12,15,18,18,18]},"width":[4,4,4,4,4,4,4,4,3,0],"height":[0,3,3,3,3,3,3,3,3,0],"propeller":false,"texture":[13,13,17,13,17,13,17,13,17]}},"wings":{"main":{"offset":{"x":0,"y":-5,"z":10},"length":[75,30,20],"width":[80,40,40,20],"angle":[-20,0,0],"position":[40,10,10,40],"texture":[4,4,63],"doubleside":true,"bump":{"position":10,"size":20}},"main2":{"offset":{"x":0,"y":-5,"z":10},"length":[60,15,20],"width":[80,40,30,10],"angle":[30,0,0],"position":[40,110,110,90],"texture":[18,4,63],"doubleside":true,"bump":{"position":10,"size":10}},"shields1":{"doubleside":true,"offset":{"x":14,"y":90,"z":1},"length":[0,5,10,5],"width":[40,40,55,55,40,40],"angle":[40,40,90,140],"position":[0,0,0,0,0],"texture":[63],"bump":{"position":0,"size":3}}},"typespec":{"name":"U-Demon","level":5,"model":5,"code":505,"specs":{"shield":{"capacity":[280,400],"reload":[10,20]},"generator":{"capacity":[440,700],"reload":[80,120]},"ship":{"mass":325,"speed":[90,115],"rotation":[60,80],"acceleration":[90,140]}},"shape":[1.804,1.832,1.84,6.967,7.32,6.122,5.352,4.896,4.604,4.317,4.174,4.201,4.315,4.638,4.974,5.144,4.153,4.151,4.77,5.103,5.348,6.387,6.588,4.583,5.222,5.21,5.222,4.583,6.588,6.387,5.348,5.103,4.77,4.151,4.153,5.144,4.974,4.638,4.315,4.201,4.174,4.317,4.604,4.896,5.352,6.122,7.32,6.967,1.84,1.832],"lasers":[{"x":3,"y":-6,"z":-0.6,"angle":0,"damage":[100,200],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":350},{"x":-3,"y":-6,"z":-0.6,"angle":0,"damage":[100,200],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":350},{"x":2.4,"y":0,"z":1.6,"angle":0,"damage":[30,60],"rate":5,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":350},{"x":-2.4,"y":0,"z":1.6,"angle":0,"damage":[30,60],"rate":5,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":350},{"x":0.28,"y":5.2,"z":0.4,"angle":180,"damage":[20,20],"rate":10,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":100},{"x":-0.28,"y":5.2,"z":0.4,"angle":-180,"damage":[20,20],"rate":10,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":100}],"radius":7.32}}';
var U_Pulsar_506 = '{"name":"U-Pulsar","level":5,"model":6,"size":2.2,"specs":{"shield":{"capacity":[250,400],"reload":[6,12]},"generator":{"capacity":[500,750],"reload":[80,160]},"ship":{"mass":300,"speed":[80,100],"rotation":[50,70],"acceleration":[60,110]}},"bodies":{"main":{"section_segments":10,"offset":{"x":0,"y":-20,"z":10},"position":{"x":[0,0,0,0,0,0,0],"y":[0,-5,10,40,90,95,90],"z":[0,0,0,0,0,0,0]},"width":[0,8,12,18,12,11,0],"height":[0,5,10,15,10,8,0],"texture":[12,63,63,8,17,18,0],"propeller":true},"cockpit":{"section_segments":[40,90,180,270,320],"offset":{"x":0,"y":-30,"z":20},"position":{"x":[0,0,0,0],"y":[20,50,75,95],"z":[0,0,0,0]},"width":[5,11,12,5],"height":[0,12,12,0],"texture":[8.98,8.98,3]},"side_propulsors":{"section_segments":10,"offset":{"x":15,"y":20,"z":10},"position":{"x":[-5,-5,0,0,0,0,0,0,0,0],"y":[-20,-30,15,35,40,50,55,60,55],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,5,8,8,8,5,5,5,0],"height":[0,5,10,10,10,5,5,5,0],"propeller":true,"texture":[6,8,18,4,63,18,17,12]},"balls":{"section_segments":16,"offset":{"x":50,"y":-65,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-9.1,-8.75,-7.699999999999999,-5.25,0,5.25,7.699999999999999,8.75,9.1],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,3.5,5.949999999999999,8.399999999999999,9.799999999999999,8.399999999999999,5.949999999999999,3.5,0],"height":[0,3.5,5.949999999999999,8.399999999999999,9.799999999999999,8.399999999999999,5.949999999999999,3.5,0],"texture":[17]},"balls2":{"section_segments":16,"angle":90,"offset":{"x":50,"y":-65,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-9.1,-8.75,-7.699999999999999,-5.25,0,5.25,7.699999999999999,8.75,9.1],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,3.5,5.949999999999999,8.399999999999999,9.799999999999999,8.399999999999999,5.949999999999999,3.5,0],"height":[0,3.5,5.949999999999999,8.399999999999999,9.799999999999999,8.399999999999999,5.949999999999999,3.5,0],"texture":[17]},"balls3":{"section_segments":16,"angle":45,"offset":{"x":50,"y":-65,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-9.1,-8.75,-7.699999999999999,-5.25,0,5.25,7.699999999999999,8.75,9.1],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,3.5,5.949999999999999,8.399999999999999,9.799999999999999,8.399999999999999,5.949999999999999,3.5,0],"height":[0,3.5,5.949999999999999,8.399999999999999,9.799999999999999,8.399999999999999,5.949999999999999,3.5,0],"texture":[17]},"balls4":{"section_segments":16,"angle":135,"offset":{"x":50,"y":-65,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-9.1,-8.75,-7.699999999999999,-5.25,0,5.25,7.699999999999999,8.75,9.1],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,3.5,5.949999999999999,8.399999999999999,9.799999999999999,8.399999999999999,5.949999999999999,3.5,0],"height":[0,3.5,5.949999999999999,8.399999999999999,9.799999999999999,8.399999999999999,5.949999999999999,3.5,0],"texture":[17]},"uwings":{"section_segments":12,"offset":{"x":50,"y":-40,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-60,-65,5,15,18,35,40,70,80,75,83,88],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,2,5,6,10,15,15,15,15,12,12,0],"height":[0,2,5,6,10,15,15,15,15,12,12,0],"texture":[6,4,8,3,18,4,16,8,13,17,11],"laser":{"damage":[5,10],"rate":2,"type":2,"speed":[100,135],"number":30,"error":0,"recoil":10,"angle":0.5}},"disc1":{"section_segments":16,"offset":{"x":50,"y":0,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[1,1,-5,-5,-2,-2,-2,1,1,1],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[17,17,17,18,19,19,19,18,17,17],"height":[17,17,17,18,19,19,19,18,17,17],"texture":[63,17,18,63,18],"propeller":false},"disc2":{"section_segments":16,"offset":{"x":50,"y":10,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[1,1,-5,-5,-2,-2,-2,1,1,1],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[17,17,17,18,19,19,19,18,17,17],"height":[17,17,17,18,19,19,19,18,17,17],"texture":[13],"propeller":false},"disc3":{"section_segments":16,"offset":{"x":50,"y":20,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[1,1,-5,-5,-2,-2,-2,1,1,1],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[17,17,17,18,19,19,19,18,17,17],"height":[17,17,17,18,19,19,19,18,17,17],"texture":[13],"propeller":false},"disc4":{"section_segments":16,"offset":{"x":50,"y":30,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[1,1,-5,-5,-2,-2,-2,1,1,1],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[17,17,17,18,19,19,19,18,17,17],"height":[17,17,17,18,19,19,19,18,17,17],"texture":[63,17,18,18,18,18,63,18],"propeller":false},"disc5":{"section_segments":12,"offset":{"x":50,"y":-95,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,0,0,0,0,2,2,2,0,0],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[8,8,8,10,10,10,10,8,8,8],"height":[8,8,8,10,10,10,10,8,8,8],"texture":[17]},"cannon_detail":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":50,"y":25,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-130,-110,-90,-90,-53,-47,-27,3,15,15],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,4,5,3,3,3,3,3,3,0],"height":[0,4,5,3,3,15,28,28,20,0],"texture":[3,63,2,4,4,63]},"cannon_detail2":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":50,"y":25,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-130,-110,-90,-90,-53,-47,-27,3,15,15],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,4,5,3,3,15,28,28,20,0],"height":[0,4,5,3,3,3,3,3,3,0],"texture":[3,63,2,4,4,11]},"wire1":{"section_segments":8,"angle":-80,"offset":{"x":16,"y":20,"z":0},"position":{"x":[5,5,5,5,5,5,6,8,9,10,10],"y":[-37,-37,-30,-23,-16,-9,-2,5,12,11],"z":[-3,-3,4,9,12,14,15,15,15,15,15]},"width":[4,4,4,4,4,4,4,4,3,0],"height":[0,3,3,3,3,3,3,3,3,0],"propeller":false,"texture":[13,4,17,4,17,4,17,4,17]},"wire2":{"section_segments":8,"angle":-80,"offset":{"x":16,"y":10,"z":-1},"position":{"x":[5,5,5,5,5,5,6,8,9,10,10],"y":[-37,-37,-30,-23,-16,-9,-2,5,12,11],"z":[-3,-3,4,9,12,14,15,15,15,15,15]},"width":[4,4,4,4,4,4,4,4,3,0],"height":[0,3,3,3,3,3,3,3,3,0],"propeller":false,"texture":[13,17,4,17,4,17,4,17,4,17]},"wire3":{"section_segments":8,"angle":-80,"offset":{"x":16,"y":0,"z":-3},"position":{"x":[5,5,5,5,5,5,6,8,9,10,10],"y":[-37,-37,-30,-23,-16,-9,-2,5,12,11],"z":[-3,-3,4,9,12,14,15,15,15,15,15]},"width":[4,4,4,4,4,4,4,4,3,0],"height":[0,3,3,3,3,3,3,3,3,0],"propeller":false,"texture":[13,4,17,4,17,4,17,4,17]}},"wings":{"branches":{"doubleside":true,"offset":{"x":10,"y":5,"z":10},"length":[25,20],"width":[50,35,30],"angle":[-10,-20],"position":[20,5,0],"texture":[18],"bump":{"position":0,"size":10}},"spike1":{"doubleside":true,"offset":{"x":50,"y":0,"z":-10},"length":[20,0,5],"width":[40,20,100,0],"angle":[150,150,150],"position":[10,-30,-50,-20],"texture":[3,63,63],"bump":{"position":40,"size":10}},"spike2":{"doubleside":true,"offset":{"x":-50,"y":0,"z":-10},"length":[20,0,5],"width":[40,20,100,0],"angle":[150,150,150],"position":[10,-30,-50,-20],"texture":[3,63,63],"bump":{"position":40,"size":10}},"spike3":{"doubleside":true,"offset":{"x":50,"y":0,"z":-10},"length":[20,0,5],"width":[40,20,100,0],"angle":[-90,-90,-90],"position":[10,-30,-50,-20],"texture":[3,63,63],"bump":{"position":40,"size":10}}},"typespec":{"name":"U-Pulsar","level":5,"model":6,"code":506,"specs":{"shield":{"capacity":[250,400],"reload":[6,12]},"generator":{"capacity":[500,750],"reload":[80,160]},"ship":{"mass":300,"speed":[80,100],"rotation":[50,70],"acceleration":[60,110]}},"shape":[1.102,1.12,1.15,5.106,5.156,5.304,4.708,4.177,3.8,3.549,3.371,3.261,3.185,3.168,3.243,3.377,3.375,3.37,3.274,3.064,1.95,2.335,3.012,3.626,3.583,3.306,3.583,3.626,3.012,2.335,1.95,3.064,3.274,3.37,3.375,3.377,3.243,3.168,3.185,3.261,3.371,3.549,3.8,4.177,4.708,5.304,5.156,5.106,1.15,1.12],"lasers":[{"x":2.2,"y":-4.62,"z":-0.44,"angle":0,"damage":[5,10],"rate":2,"type":2,"speed":[100,135],"number":30,"spread":0.5,"error":0,"recoil":10},{"x":-2.2,"y":-4.62,"z":-0.44,"angle":0,"damage":[5,10],"rate":2,"type":2,"speed":[100,135],"number":30,"spread":0.5,"error":0,"recoil":10}],"radius":5.304}}';
//Tier 6
var U_Barricade_601 = '{"name":"U-Barricade","level":6,"model":1,"size":2.2,"specs":{"shield":{"capacity":[450,600],"reload":[15,20]},"generator":{"capacity":[500,800],"reload":[100,175]},"ship":{"mass":700,"speed":[100,120],"rotation":[15,30],"acceleration":[20,55]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":-40,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-170,-180,-150,-130,-110,-79,-60,-40,-20,40,50,120,140,145,135],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,10,16,18,14,14,25,25,35,35,45,45,30,30,0],"height":[0,5,10,12,15,15,20,20,20,20,30,30,15,15,0],"texture":[12,3,2,10,11,1,1,63,63,18,8,13,17,18],"propeller":true},"cockpit":{"section_segments":[40,90,180,270,320],"offset":{"x":0,"y":-210,"z":16},"position":{"x":[0,0,0,0,0],"y":[0,20,40,60,100],"z":[1,0,4,4,4]},"width":[5,10,12,5,5],"height":[0,15,10,10,10],"texture":[8.98,8.98,4]},"uwings1":{"section_segments":[0,30,60,90,120,150,180],"offset":{"x":-35,"y":-30,"z":10},"position":{"x":[0,0,0,0,0,0,0],"y":[-60,-70,40,80,110,110],"z":[0,0,0,0,0,0,0]},"width":[0,5,20,20,10,0],"height":[0,5,20,20,20,0],"texture":[12,2,18,10,13]},"uwings2":{"section_segments":12,"offset":{"x":30,"y":50,"z":30},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-65,-60,-70,-60,40,60,65,50],"z":[0,0,0,0,0,0,0,0]},"width":[0,10,11,12,20,15,15,0],"height":[0,10,14,15,20,15,15,0],"texture":[17,12,18,1,13,17,18],"propeller":true},"uwings4":{"section_segments":12,"offset":{"x":30,"y":50,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-65,-60,-70,-60,40,60,65,50],"z":[0,0,0,0,0,0,0,0]},"width":[0,10,11,12,20,15,15,0],"height":[0,10,14,15,20,15,15,0],"texture":[17,12,18,2,13,17,18],"propeller":true},"uwing5":{"section_segments":[0,45,90,135,180],"offset":{"x":-137,"y":40,"z":-10},"position":{"x":[0,0,0,0,0,0],"y":[-70,-80,40,80,90,100],"z":[0,0,0,0,0,0]},"width":[0,5,15,10,0],"height":[0,5,20,15,0],"texture":[12,2,63,4]},"cannons1":{"section_segments":12,"offset":{"x":0,"y":-90,"z":35},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-60,-73,-70,-50,-50,-20,-10,5,30],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,5,5,5,4,4,10,10,10],"height":[0,5,5,5,4,4,7,7,7],"angle":0,"laser":{"damage":[30,50],"rate":4,"type":2,"speed":[200,240],"recoil":20,"number":1,"error":0},"propeller":false,"texture":[4,17,18,4,13,63,10,1]},"box":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":0,"y":0,"z":35},"position":{"x":[0,0,0,0,0],"y":[-60,-60,-15,15],"z":[2,0,0,-7]},"width":[0,20,20,20],"height":[0,10,10,10],"texture":[4,17.95,13]},"box2":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":0,"y":70,"z":35},"position":{"x":[0,0,0,0,0],"y":[-85,-70,10,25],"z":[2,0,0,-9]},"width":[20,30,30,30],"height":[0,20,20,0],"texture":[4,8.18,18]},"box3":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":120,"y":100,"z":-10},"position":{"x":[0,0,0,0,0],"y":[-60,-60,-15,-5],"z":[0,0,0,0]},"width":[0,20,20,20],"height":[0,15,15,0],"texture":[4,17.95,13]},"cannons2":{"section_segments":12,"offset":{"x":32,"y":-70,"z":20},"position":{"x":[0,0,0,0,0,0,-5,-5,0,0],"y":[-60,-70,-67,-50,-50,-20,-10,10,25],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,5,5,4,4,10,10,5,0],"height":[0,5,5,5,4,4,10,10,5,0],"angle":0,"laser":{"damage":[25,45],"rate":3,"type":2,"speed":[190,240],"recoil":20,"number":1,"error":0},"propeller":false,"texture":[4,17,18,4,13,4,10,4]},"cannons3":{"section_segments":12,"offset":{"x":51,"y":50,"z":54},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-60,-70,-67,-50,-50,-10,10,30,50,55,40],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,5,5,4,4,10,10,5,5,0],"height":[0,5,5,5,4,4,10,10,5,5,0],"laser":{"damage":[60,80],"rate":2,"type":2,"speed":[190,240],"recoil":100,"number":1,"error":0},"propeller":true,"texture":[4,17,18,4,13,10,63,13,17,4]},"cannons4":{"section_segments":12,"offset":{"x":70,"y":20,"z":5},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-50,-60,-57,-40,-40,-20,-10,20,50,60,63,55],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,5,5,3,4,8,10,10,5,5,0],"height":[0,5,5,5,3,3,15,15,15,5,5,0],"laser":{"damage":[40,60],"rate":2,"type":2,"speed":[190,240],"recoil":75,"number":1,"error":0},"propeller":true,"texture":[4,17,18,4,13,18,63,8,13,17,18]},"cannons5":{"section_segments":12,"offset":{"x":130,"y":40,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-40,-50,-47,-30,-30,-10,0,20,50,60,63,55],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,5,5,3,4,8,10,10,5,5,0],"height":[0,5,5,5,3,3,15,15,15,5,5,0],"laser":{"damage":[40,60],"rate":2,"type":2,"speed":[190,240],"recoil":75,"number":1,"error":0},"propeller":true,"texture":[4,17,18,4,13,18,63,8,13,17,18]},"cannons6":{"section_segments":12,"offset":{"x":110,"y":40,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-40,-50,-47,-30,-30,-10,0,20,50,60,63,55],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,5,5,3,4,8,10,10,5,5,0],"height":[0,5,5,5,3,3,15,15,15,5,5,0],"laser":{"damage":[40,60],"rate":2,"type":2,"speed":[190,240],"recoil":75,"number":1,"error":0},"propeller":true,"texture":[4,17,18,4,13,18,63,8,13,17,18]},"core_shield":{"angle":180,"section_segments":12,"vertical":true,"offset":{"x":0,"y":30,"z":25},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-10,-5,-5,-4,0,20,25,30,20,0,-10],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[25,35,37,40,45,45,40,25,20,20,25],"height":[50,60,62,65,70,110,65,50,45,45,50],"texture":[11,17,4,13,10,13,11,10,9,63]},"hubs1":{"vertical":true,"section_segments":20,"offset":{"x":0,"y":50,"z":-25},"position":{"x":[0,0,0,0,0,0,0],"y":[0,10,5,5,10,9],"z":[0,0,0,0,0,0,0]},"width":[18,15,13,12,10,0],"height":[18,15,13,12,10,0],"texture":[11,18,17,18,18]},"hubs2":{"vertical":true,"section_segments":20,"offset":{"x":0,"y":50,"z":-60},"position":{"x":[0,0,0,0,0,0,0],"y":[0,10,5,5,10,9],"z":[0,0,0,0,0,0,0]},"width":[18,15,13,12,10,0],"height":[18,15,13,12,10,0],"texture":[11,18,17,18,18]},"hubs3":{"vertical":true,"section_segments":20,"offset":{"x":0,"y":40,"z":36},"position":{"x":[0,0,0,0,0,0,0],"y":[0,10,5,5,10,9],"z":[0,0,0,0,0,0,0]},"width":[15,13,11,10,7,0],"height":[15,13,11,10,7,0],"texture":[11,18,17,18,18]},"disc1":{"section_segments":12,"offset":{"x":30,"y":20,"z":35},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[8,8,0,0,0,0,0,8,8,8],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[16,16,16,18,18,18,18,18,16,16],"height":[16,16,16,18,18,18,18,18,16,16],"texture":[17]},"disc2":{"section_segments":12,"offset":{"x":30,"y":37.5,"z":35},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[8,8,0,0,0,0,0,8,8,8],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[18,18,18,20,20,20,20,20,18,18],"height":[18,18,18,20,20,20,20,20,18,18],"texture":[17]},"disc3":{"section_segments":12,"offset":{"x":30,"y":55,"z":35},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[8,8,0,0,0,0,0,8,8,8],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[20,20,20,22,22,22,22,22,20,20],"height":[20,20,20,22,22,22,22,22,20,20],"texture":[17]},"disc4":{"section_segments":12,"offset":{"x":120,"y":80,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[4,4,0,0,0,0,0,4,4,4],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[15,15,15,18,18,18,18,18,15,15],"height":[15,15,15,18,18,18,18,18,15,15],"texture":[17]},"disc5":{"section_segments":12,"offset":{"x":120,"y":70,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[4,4,0,0,0,0,0,4,4,4],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[15,15,15,18,18,18,18,18,15,15],"height":[15,15,15,18,18,18,18,18,15,15],"texture":[17]},"wire1":{"section_segments":8,"angle":55,"offset":{"x":100,"y":55,"z":15},"position":{"x":[5,5,5,5,5,5,6,8,9,10,10],"y":[-65,-64,-51.5,-40,-28,-18,-8,2,12,11],"z":[0,0,-1,-2,-6,-8,-11,-15,-18,-18,-18]},"width":[4,4,4,4,4,4,4,4,3,0],"height":[0,3,3,3,3,3,3,3,3,0],"propeller":false,"texture":[13,13,17,13,17,13,17,13,17]},"wire2":{"section_segments":8,"angle":55,"offset":{"x":100,"y":75,"z":15},"position":{"x":[5,5,5,5,5,5,6,8,9,10,10],"y":[-65,-64,-51.5,-40,-28,-18,-8,2,12,11],"z":[0,0,-1,-2,-6,-8,-11,-15,-18,-18,-18]},"width":[4,4,4,4,4,4,4,4,3,0],"height":[0,3,3,3,3,3,3,3,3,0],"propeller":false,"texture":[13,13,17,13,17,13,17,13,17]}},"wings":{"front":{"doubleside":true,"offset":{"x":10,"y":-90,"z":10},"length":[0,60],"width":[0,160,0],"angle":[0,0,0,90],"position":[0,-50,120],"texture":[13,63],"bump":{"position":50,"size":5}},"spike1":{"doubleside":true,"offset":{"x":30,"y":100,"z":20},"length":[50,0,5],"width":[40,20,100,10],"angle":[60,60,60],"position":[-50,-30,-50,-20],"texture":[3,63,63],"bump":{"position":40,"size":17}},"main":{"length":[75,55],"width":[100,60,35],"angle":[-10,-15],"position":[-50,-20,10],"texture":[18],"doubleside":true,"offset":{"x":0,"y":60,"z":15},"bump":{"position":-30,"size":15}},"side":{"doubleside":true,"offset":{"x":135,"y":70,"z":-10},"length":[0,50],"width":[0,70,0],"angle":[0,50],"position":[0,0,90],"texture":[63],"bump":{"position":10,"size":10}},"side2":{"doubleside":true,"offset":{"x":135,"y":70,"z":-10},"length":[0,40],"width":[0,40,0],"angle":[0,-30],"position":[0,0,50],"texture":[63],"bump":{"position":10,"size":10}}},"typespec":{"name":"U-Barricade","level":6,"model":1,"code":601,"specs":{"shield":{"capacity":[450,600],"reload":[15,20]},"generator":{"capacity":[500,800],"reload":[100,175]},"ship":{"mass":700,"speed":[100,120],"rotation":[15,30],"acceleration":[20,55]}},"shape":[9.69,9.051,6.498,5.122,4.28,3.686,3.324,3.079,3.653,3.74,6.491,6.463,6.393,6.505,6.745,7.091,7.609,9.143,9.988,10.181,5.009,5.236,5.434,5.32,5.151,4.629,5.151,5.32,5.434,5.236,5.009,10.181,9.988,9.143,7.609,7.091,6.745,6.505,6.393,6.463,6.491,3.74,3.653,3.079,3.324,3.686,4.28,5.122,6.498,9.051],"lasers":[{"x":0,"y":-7.172,"z":1.54,"angle":0,"damage":[30,50],"rate":4,"type":2,"speed":[200,240],"number":1,"spread":0,"error":0,"recoil":20},{"x":1.408,"y":-6.16,"z":0.88,"angle":0,"damage":[25,45],"rate":3,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":20},{"x":-1.408,"y":-6.16,"z":0.88,"angle":0,"damage":[25,45],"rate":3,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":20},{"x":2.244,"y":-0.88,"z":2.376,"angle":0,"damage":[60,80],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":100},{"x":-2.244,"y":-0.88,"z":2.376,"angle":0,"damage":[60,80],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":100},{"x":3.08,"y":-1.76,"z":0.22,"angle":0,"damage":[40,60],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":75},{"x":-3.08,"y":-1.76,"z":0.22,"angle":0,"damage":[40,60],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":75},{"x":5.72,"y":-0.44,"z":-0.44,"angle":0,"damage":[40,60],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":75},{"x":-5.72,"y":-0.44,"z":-0.44,"angle":0,"damage":[40,60],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":75},{"x":4.84,"y":-0.44,"z":-0.44,"angle":0,"damage":[40,60],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":75},{"x":-4.84,"y":-0.44,"z":-0.44,"angle":0,"damage":[40,60],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":75}],"radius":10.181}}';
var U_Monitor_602 = '{"name":"U-Monitor","level":6,"model":2,"size":2.7,"next":[701,702],"specs":{"shield":{"capacity":[350,500],"reload":[10,20]},"generator":{"capacity":[550,700],"reload":[350,450]},"ship":{"mass":700,"speed":[80,100],"rotation":[30,40],"acceleration":[50,90]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":-60,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[0,-15,30,40,110,140,145,140],"z":[-5,-5,5,10,10,0,0,0]},"width":[0,8,15,17,25,10,10,0],"height":[0,5,30,25,25,20,20,0],"texture":[12,63,63,63,18,17,18],"propeller":true},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-60,"z":25},"position":{"x":[0,0,0,0,0],"y":[0,30,70,100],"z":[-13,5,-4,-6]},"width":[3,8,12,12],"height":[0,10,20,20],"texture":[9,9,4]},"uwing1":{"section_segments":[180,240,300,360],"offset":{"x":0,"y":-100,"z":-5},"position":{"x":[35,35,35,35,35,35],"y":[-90,-100,130,200,215],"z":[0,0,0,0,0,0]},"width":[0,5,35,20,0],"height":[0,15,25,20,0],"texture":[12,2,3,4]},"uwing2":{"angle":180,"section_segments":[180,240,300,360],"offset":{"x":0,"y":130,"z":-5},"position":{"x":[35,35,35,35,35,35],"y":[-30,-40,100,140,155],"z":[0,0,0,0,0,0]},"width":[0,10,35,25,0],"height":[0,15,25,20,0],"texture":[12,3,2,4]},"lights1":{"angle":180,"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":0,"y":-100,"z":-5},"position":{"x":[-35,-35,-35,-35,-35,-35],"y":[-100,-100,30,100,100],"z":[0,0,0,0,0,0]},"width":[0,5,5,5,0],"height":[0,5,5,5,0],"texture":[4,17,4,4]},"lights2":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":0,"y":-100,"z":-5},"position":{"x":[-35,-35,-35,-35,-35,-35],"y":[150,150,230,280,280],"z":[0,0,0,0,0,0]},"width":[0,5,5,5,0],"height":[0,5,5,5,0],"texture":[4,17,4]},"frontprong":{"section_segments":[180,240,300,360],"offset":{"x":0,"y":-90,"z":-5},"position":{"x":[34,34,34,34,34,0],"y":[-90,-110,-40,-40],"z":[0,0,0,0,0,0]},"width":[0,10,25,0],"height":[0,20,25,0],"texture":[4,63]},"rearprong":{"section_segments":[180,240,300,360],"offset":{"x":0,"y":190,"z":-5},"position":{"x":[34,34,34,34,34,0],"y":[-110,-110,-60,-70],"z":[0,0,0,0,0,0]},"width":[0,35,10,0],"height":[0,25,20,0],"texture":[4,63]},"frontprong2":{"section_segments":[0,60,120,180],"offset":{"x":0,"y":40,"z":-5},"position":{"x":[-34,-34,-34,-34,-34],"y":[-90,-110,-40,-40],"z":[0,0,0,0,0,0]},"width":[0,10,31,0],"height":[0,10,25,0],"texture":[4,63]},"rearprong2":{"section_segments":[0,60,120,180],"offset":{"x":0,"y":240,"z":-5},"position":{"x":[-34,-34,-34,-34,-34],"y":[-110,-110,-60,-70],"z":[0,0,0,0,0,0]},"width":[0,20,10,0],"height":[0,20,15,0],"texture":[4,63]},"sideconnectors":{"section_segments":[0,60,120,180],"offset":{"x":-33,"y":28.5,"z":-5},"position":{"x":[0,0,0,0,0,0],"y":[0,0,5,5],"z":[0,0,0,0,0,0]},"width":[0,35,35,0],"height":[0,29,29,0],"texture":[4]},"box":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":0,"y":-100,"z":-5},"position":{"x":[44,44,62,53,53],"y":[-30,-30,130,180,180],"z":[0,0,0,0,0,0]},"width":[0,5,5,5,0],"height":[0,15,25,20,0],"texture":[4]},"box2":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":0,"y":-100,"z":-5},"position":{"x":[-54,-54,-62,-46,-46],"y":[90,90,130,230,230],"z":[0,0,0,0,0,0]},"width":[0,5,5,5,0],"height":[0,15,25,20,0],"texture":[4]},"box3":{"vertical":true,"angle":30,"section_segments":[45,135,225,315],"offset":{"x":30,"y":8,"z":-31},"position":{"x":[0,0,0,0,0],"y":[0,15,19,19],"z":[0,0,0,0]},"width":[0,20,20,20],"height":[0,50,35,0],"texture":[4,17.95,8]},"intake":{"section_segments":12,"offset":{"x":0,"y":20,"z":20},"position":{"x":[0,0,0,0,0,0,0],"y":[-30,-40,0,25,50,55],"z":[0,0,0,0,0,0,0]},"width":[20,20,25,30,20,0],"height":[0,8,10,10,10,0],"texture":[4,1,10,11,12]},"engine1":{"section_segments":12,"offset":{"x":25,"y":70,"z":-5},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-90,-100,-80,-70,-30,-20,0,5,0],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,15,15,15,15,10,10,0],"height":[0,15,25,25,25,25,20,20,0],"texture":[12,4,13,8,13,18,17,18],"propeller":true},"cannons1":{"section_segments":12,"offset":{"x":0,"y":-60,"z":-5},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-60,-70,-60,-58,-55,-55,-35,0,20,40,120,130,125],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,5,5,5,4,4,4,30,30,30,10,0],"height":[0,5,5,5,5,4,4,4,15,15,15,4,0],"texture":[4,4,17,4,4,18,13,18,13,8,11,17],"angle":0,"laser":{"damage":[70,90],"rate":0.5,"type":2,"speed":[190,240],"recoil":50,"number":1,"error":0},"propeller":false},"cannons2":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":20,"y":40,"z":35},"position":{"x":[0,0,0,0,0,0,0,0,-3,-20,-20,-20,0],"y":[-60,-70,-60,-58,-55,-55,-35,0,20,20,30,30],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,5,5,5,4,4,4,4,26,10,0],"height":[0,5,5,5,5,4,4,4,4,4,4,0],"texture":[4,4,17,4,4,18,13,8,63],"angle":0,"laser":{"damage":[60,80],"rate":1,"type":2,"speed":[190,240],"recoil":50,"number":1,"error":0},"propeller":false},"cannons12":{"section_segments":12,"offset":{"x":0,"y":-110,"z":-5},"position":{"x":[0,0,0,0,0,0,0],"y":[-54,-64,-62,-59,-53,-44,-39],"z":[0,0,0,0,0,0,0]},"width":[0,5,5,5,5,12,0],"height":[0,5,5,5,5,12,0],"angle":-90,"laser":{"damage":[40,50],"rate":2,"type":2,"speed":[200,270],"recoil":10,"number":1,"error":0},"texture":[4,4,17,18,63,4]},"cannons11":{"section_segments":12,"offset":{"x":0,"y":-90,"z":-5},"position":{"x":[0,0,0,0,0,0,0],"y":[-56,-66,-64,-61,-55,-46,-41],"z":[0,0,0,0,0,0,0]},"width":[0,5,5,5,5,12,0],"height":[0,5,5,5,5,12,0],"angle":-90,"laser":{"damage":[40,50],"rate":2,"type":2,"speed":[200,270],"recoil":10,"number":1,"error":0},"texture":[4,4,17,18,63,4]},"cannons10":{"section_segments":12,"offset":{"x":0,"y":-70,"z":-5},"position":{"x":[0,0,0,0,0,0,0],"y":[-58,-68,-66,-63,-57,-48,-43],"z":[0,0,0,0,0,0,0]},"width":[0,5,5,5,5,12,0],"height":[0,5,5,5,5,12,0],"angle":-90,"laser":{"damage":[40,50],"rate":2,"type":2,"speed":[200,270],"recoil":10,"number":1,"error":0},"texture":[4,4,17,18,63,4]},"cannons9":{"section_segments":12,"offset":{"x":0,"y":-50,"z":-5},"position":{"x":[0,0,0,0,0,0,0],"y":[-60.5,-70.5,-68.5,-65.5,-59.5,-50.5,-45.5],"z":[0,0,0,0,0,0,0]},"width":[0,5,5,5,5,12,0],"height":[0,5,5,5,5,12,0],"angle":-90,"laser":{"damage":[40,50],"rate":2,"type":2,"speed":[200,270],"recoil":10,"number":1,"error":0},"texture":[4,4,17,18,63,4]},"cannons8":{"section_segments":12,"offset":{"x":0,"y":-30,"z":-5},"position":{"x":[0,0,0,0,0,0,0],"y":[-62.5,-72.5,-70.5,-67.5,-61.5,-52.5,-47.5],"z":[0,0,0,0,0,0,0]},"width":[0,5,5,5,5,12,0],"height":[0,5,5,5,5,12,0],"angle":-90,"laser":{"damage":[40,50],"rate":2,"type":2,"speed":[200,270],"recoil":10,"number":1,"error":0},"texture":[4,4,17,18,63,4]},"cannons3":{"section_segments":12,"offset":{"x":0,"y":-10,"z":-5},"position":{"x":[0,0,0,0,0,0,0],"y":[-65,-75,-73,-70,-64,-55,-50],"z":[0,0,0,0,0,0,0]},"width":[0,5,5,5,5,12,0],"height":[0,5,5,5,5,12,0],"angle":-90,"laser":{"damage":[40,50],"rate":2,"type":2,"speed":[200,270],"recoil":10,"number":1,"error":0},"texture":[4,4,17,18,63,4]},"cannons4":{"section_segments":12,"offset":{"x":0,"y":10,"z":-5},"position":{"x":[0,0,0,0,0,0,0],"y":[-67.5,-77.5,-75.5,-72.5,-66.5,-57.5,-52.5],"z":[0,0,0,0,0,0,0]},"width":[0,5,5,5,5,12,0],"height":[0,5,5,5,5,12,0],"angle":-90,"laser":{"damage":[40,50],"rate":2,"type":2,"speed":[200,270],"recoil":10,"number":1,"error":0},"texture":[4,4,17,18,63,4]},"cannons5":{"section_segments":12,"offset":{"x":0,"y":30,"z":-5},"position":{"x":[0,0,0,0,0,0,0],"y":[-69.5,-79.5,-77.5,-74.5,-68.5,-59.5,-54.5],"z":[0,0,0,0,0,0,0]},"width":[0,5,5,5,5,12,0],"height":[0,5,5,5,5,12,0],"angle":-90,"laser":{"damage":[40,50],"rate":2,"type":2,"speed":[200,270],"recoil":10,"number":1,"error":0},"texture":[4,4,17,18,63,4]},"cannons6":{"section_segments":12,"offset":{"x":0,"y":50,"z":-5},"position":{"x":[0,0,0,0,0,0,0],"y":[-65,-75,-73,-70,-64,-55,-50],"z":[0,0,0,0,0,0,0]},"width":[0,5,5,5,5,12,0],"height":[0,5,5,5,5,12,0],"angle":-90,"laser":{"damage":[40,50],"rate":2,"type":2,"speed":[200,270],"recoil":10,"number":1,"error":0},"texture":[4,4,17,18,63,4]},"cannons7":{"section_segments":12,"offset":{"x":0,"y":70,"z":-5},"position":{"x":[0,0,0,0,0,0,0],"y":[-61.5,-71.5,-69.5,-66.5,-60.5,-51.5,-46.5],"z":[0,0,0,0,0,0,0]},"width":[0,5,5,5,5,12,0],"height":[0,5,5,5,5,12,0],"angle":-90,"laser":{"damage":[40,50],"rate":2,"type":2,"speed":[200,270],"recoil":10,"number":1,"error":0},"texture":[4,4,17,18,63,4]},"hub1":{"angle":-80,"section_segments":20,"offset":{"x":0,"y":40,"z":-5},"position":{"x":[0,0,0,0,0,0,0],"y":[63,70,68,68,72,73],"z":[0,0,0,0,0,0,0]},"width":[12,10,8,7,5,0],"height":[12,10,8,7,5,0],"texture":[18,18,17,17,18]},"hub2":{"angle":-80,"section_segments":20,"offset":{"x":0,"y":70,"z":-5},"position":{"x":[0,0,0,0,0,0,0],"y":[58,65,63,63,67,68],"z":[0,0,0,0,0,0,0]},"width":[12,10,8,7,5,0],"height":[12,10,8,7,5,0],"texture":[18,18,17,17,18]},"hub3":{"angle":-80,"section_segments":20,"offset":{"x":0,"y":100,"z":-5},"position":{"x":[0,0,0,0,0,0,0],"y":[53,60,58,58,62,63],"z":[0,0,0,0,0,0,0]},"width":[12,10,8,7,5,0],"height":[12,10,8,7,5,0],"texture":[18,18,17,17,18]},"hub4":{"angle":-105,"section_segments":20,"offset":{"x":0,"y":33,"z":-5},"position":{"x":[0,0,0,0,0,0,0],"y":[64,71,69,69,73,74],"z":[0,0,0,0,0,0,0]},"width":[12,10,8,7,5,0],"height":[12,10,8,7,5,0],"texture":[18,18,17,17,18]},"disc1":{"section_segments":16,"offset":{"x":44,"y":15,"z":15},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[7,7,0,0,0,2,5,7,7,7],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[10,10,10,12,12,12,12,12,10,10],"height":[10,10,10,12,12,12,12,12,10,10],"texture":[4,4,4,4,4,17,4]},"disc2":{"section_segments":16,"offset":{"x":44,"y":40,"z":15},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[7,7,0,0,0,2,5,7,7,7],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[10,10,10,12,12,12,12,12,10,10],"height":[10,10,10,12,12,12,12,12,10,10],"texture":[4,4,4,4,4,17,4]},"turret":{"vertical":true,"section_segments":20,"offset":{"x":0,"y":35,"z":-45},"position":{"x":[0,0,0,0,0,0,0],"y":[-10,6,5,5,10,13],"z":[0,0,0,0,0,0,0]},"width":[25,19,12,10,7,0],"height":[25,19,12,10,7,0],"texture":[11,18,17,9,9]}},"typespec":{"name":"U-Monitor","level":6,"model":2,"code":602,"specs":{"shield":{"capacity":[350,500],"reload":[10,20]},"generator":{"capacity":[550,700],"reload":[350,450]},"ship":{"mass":700,"speed":[80,100],"rotation":[30,40],"acceleration":[50,90]}},"shape":[7.025,10.995,11.043,8.855,7.107,6.247,5.467,4.828,4.705,4.347,4.211,4.13,4.082,4.218,4.263,4.617,4.691,5.006,5.296,5.596,5.922,6.535,7.388,7.381,4.622,4.599,9.895,9.989,8.405,7.195,5.961,5.67,4.937,4.798,3.988,4.061,4.001,3.643,3.286,3.205,3.203,3.273,3.415,3.612,3.901,4.346,4.427,2.863,3.11,4.073],"lasers":[{"x":0,"y":-7.02,"z":-0.27,"angle":0,"damage":[70,90],"rate":0.5,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":50},{"x":1.08,"y":-1.62,"z":1.89,"angle":0,"damage":[60,80],"rate":1,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":50},{"x":-1.08,"y":-1.62,"z":1.89,"angle":0,"damage":[60,80],"rate":1,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":50},{"x":3.456,"y":-5.94,"z":-0.27,"angle":-90,"damage":[40,50],"rate":2,"type":2,"speed":[200,270],"number":1,"spread":0,"error":0,"recoil":10},{"x":3.564,"y":-4.86,"z":-0.27,"angle":-90,"damage":[40,50],"rate":2,"type":2,"speed":[200,270],"number":1,"spread":0,"error":0,"recoil":10},{"x":3.672,"y":-3.78,"z":-0.27,"angle":-90,"damage":[40,50],"rate":2,"type":2,"speed":[200,270],"number":1,"spread":0,"error":0,"recoil":10},{"x":3.807,"y":-2.7,"z":-0.27,"angle":-90,"damage":[40,50],"rate":2,"type":2,"speed":[200,270],"number":1,"spread":0,"error":0,"recoil":10},{"x":3.915,"y":-1.62,"z":-0.27,"angle":-90,"damage":[40,50],"rate":2,"type":2,"speed":[200,270],"number":1,"spread":0,"error":0,"recoil":10},{"x":4.05,"y":-0.54,"z":-0.27,"angle":-90,"damage":[40,50],"rate":2,"type":2,"speed":[200,270],"number":1,"spread":0,"error":0,"recoil":10},{"x":4.185,"y":0.54,"z":-0.27,"angle":-90,"damage":[40,50],"rate":2,"type":2,"speed":[200,270],"number":1,"spread":0,"error":0,"recoil":10},{"x":4.293,"y":1.62,"z":-0.27,"angle":-90,"damage":[40,50],"rate":2,"type":2,"speed":[200,270],"number":1,"spread":0,"error":0,"recoil":10},{"x":4.05,"y":2.7,"z":-0.27,"angle":-90,"damage":[40,50],"rate":2,"type":2,"speed":[200,270],"number":1,"spread":0,"error":0,"recoil":10},{"x":3.861,"y":3.78,"z":-0.27,"angle":-90,"damage":[40,50],"rate":2,"type":2,"speed":[200,270],"number":1,"spread":0,"error":0,"recoil":10}],"radius":11.043,"next":[701,702]}}';
var U_Perimeter_603 = '{"name":"U-Perimeter","level":6,"model":3,"size":2,"specs":{"shield":{"capacity":[650,900],"reload":[10,25]},"generator":{"capacity":[750,1100],"reload":[250,600]},"ship":{"mass":900,"speed":[80,95],"rotation":[20,40],"acceleration":[100,150]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":20,"z":5},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-60,-70,-40,0,40,80,120,125,120],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,15,30,30,25,25,12,12,0],"height":[0,10,15,15,15,15,15,15,0],"texture":[12,3,8,3,11,13,17,18],"propeller":true},"main2":{"section_segments":10,"offset":{"x":0,"y":-20,"z":16},"position":{"x":[0,0,0,0,0,0,0],"y":[-20,-25,10,60,120,85],"z":[-4,-4,0,0,0,0,0]},"width":[0,10,20,22,15,0],"height":[7.5,7.5,10,10,5,0],"texture":[13,63,10,2,17]},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-20,"z":20},"position":{"x":[0,0,0,0,0,0],"y":[-20,10,50,100,135],"z":[0,0,1,1,0]},"width":[5,10,12,12,5],"height":[0,15,20,20,0],"texture":[9,9,4]},"spikes1":{"section_segments":[0,45,90,135,180],"offset":{"x":-10,"y":-10,"z":-5},"position":{"x":[0,0,0,0,0,0],"y":[-90,-180,-60,-20,0,10],"z":[0,0,0,0,0,0]},"width":[0,10,25,20,0],"height":[0,5,20,15,0],"texture":[12,3,18,4]},"spikes2":{"angle":90,"section_segments":[0,45,90,135,180],"offset":{"x":-10,"y":0,"z":-5},"position":{"x":[-10,-10,-10,-10,-10,-10],"y":[-90,-180,-60,-20,0,10],"z":[0,0,0,0,0,0]},"width":[0,10,25,20,0],"height":[0,5,20,15,0],"texture":[12,2,18,4]},"spikes3":{"angle":90,"section_segments":[180,225,270,315,360],"offset":{"x":-10,"y":0,"z":-5},"position":{"x":[10,10,10,10,10,10],"y":[-90,-180,-60,-20,0,10],"z":[0,0,0,0,0,0]},"width":[0,10,25,20,0],"height":[0,5,20,15,0],"texture":[12,2,18,4]},"lights1":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":-10,"y":-10,"z":-5},"position":{"x":[0,0,0,0,0,0],"y":[-90,-180,-60,-20,0,10],"z":[0,0,0,0,0,0]},"width":[0,3,3,3,0],"height":[0,3,3,3,0],"texture":[12,17,18,4]},"lights2":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":-10,"y":0,"z":-5},"position":{"x":[10,10,10,10,10,10],"y":[-90,-180,-60,-20,0,10],"z":[0,0,0,0,0,0]},"width":[0,3,3,3,0],"height":[0,3,3,3,0],"texture":[12,17,18,4],"angle":90},"lights3":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":-10,"y":0,"z":-5},"position":{"x":[-10,-10,-10,-10,-10,-10],"y":[-90,-180,-60,-20,0,10],"z":[0,0,0,0,0,0]},"width":[0,3,3,3,0],"height":[0,3,3,3,0],"texture":[12,17,18,4],"angle":90},"arm45":{"section_segments":6,"angle":45,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-110,-125,-105,-80,-60,-10,10,60,80,105,125,110],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,10,18,20,10,12,12,10,20,18,10,0],"height":[0,5,10,12,8,12,12,8,12,10,5,0],"texture":[12,1,10,2,13,13,13,2,10,1,12]},"arm135":{"section_segments":6,"angle":135,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-110,-125,-105,-80,-60,-10,10,60,80,105,125,110],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,10,18,20,10,12,12,10,20,18,10,0],"height":[0,5,10,12,8,12,12,8,12,10,5,0],"texture":[12,1,10,2,13,13,13,2,10,1,12]},"cannon0":{"section_segments":12,"offset":{"x":0,"y":0,"z":-5},"position":{"x":[0,0,0,0,0,0,0],"y":[-125,-130,-65,-45,-25,-10,0],"z":[0,0,0,0,0,0,0]},"width":[0,5,6,10,13,6,6],"height":[0,5,5,10,13,5,0],"angle":0,"laser":{"damage":[50,70],"rate":4,"type":2,"speed":[190,240],"recoil":50,"number":1,"error":0},"propeller":false,"texture":[4,12,10,2,3,13]},"uwing1":{"section_segments":[180,225,270,315,360],"angle":45,"offset":{"x":0.01,"y":0,"z":-10},"position":{"x":[35,35,35,35,35,35],"y":[-210,-220,-120,-80,-64],"z":[0,0,0,0,0,0]},"width":[0,10,25,15,0],"height":[0,5,20,15,0],"texture":[12,2,63]},"uwing2":{"section_segments":[0,45,90,135,180],"angle":45,"offset":{"x":0.01,"y":0,"z":-10},"position":{"x":[-35,-35,-35,-35,-35,-35],"y":[-210,-220,-120,-80,-64],"z":[0,0,0,0,0,0]},"width":[0,10,25,15,0],"height":[0,5,20,15,0],"texture":[12,2,63]},"uwing3":{"section_segments":[180,225,270,315,360],"angle":135,"offset":{"x":0.01,"y":0,"z":-10},"position":{"x":[35,35,35,35,35,35],"y":[-210,-220,-120,-80,-64],"z":[0,0,0,0,0,0]},"width":[0,10,25,15,0],"height":[0,5,20,15,0],"texture":[12,2,63]},"uwing4":{"section_segments":[0,45,90,135,180],"angle":135,"offset":{"x":0.01,"y":0,"z":-10},"position":{"x":[-35,-35,-35,-35,-35,-35],"y":[-210,-220,-120,-80,-64],"z":[0,0,0,0,0,0]},"width":[0,10,25,15,0],"height":[0,5,20,15,0],"texture":[12,2,63]},"cannon30":{"section_segments":12,"offset":{"x":0.01,"y":0,"z":-10},"position":{"x":[30,30,30,30,30,30,36,36,36],"y":[-190,-200,-180,-180,-130,-110,-90,-85],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,5,5,4,4,12,5,0],"height":[0,5,5,4,4,12,10,0],"angle":45,"laser":{"damage":[60,80],"rate":2,"type":2,"speed":[190,240],"recoil":150,"number":1,"error":0},"texture":[17,18,4,13,4,63,4]},"cannon60":{"section_segments":12,"offset":{"x":0.01,"y":0,"z":-10},"position":{"x":[-30,-30,-30,-30,-30,-30,-36,-36,-36],"y":[-190,-200,-180,-180,-130,-110,-90,-85],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,5,5,4,4,12,5,0],"height":[0,5,5,4,4,12,10,0],"angle":45,"laser":{"damage":[60,80],"rate":2,"type":2,"speed":[190,240],"recoil":150,"number":1,"error":0},"texture":[17,18,4,13,4,63,4]},"cannon120":{"section_segments":12,"offset":{"x":0.01,"y":0,"z":-10},"position":{"x":[-30,-30,-30,-30,-30,-30,-36,-36,-36],"y":[-190,-200,-180,-180,-130,-110,-90,-85],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,5,5,4,4,12,5,0],"height":[0,5,5,4,4,12,10,0],"angle":135,"laser":{"damage":[60,80],"rate":2,"type":2,"speed":[190,240],"recoil":150,"number":1,"error":0},"texture":[17,18,4,13,4,63,4]},"cannon150":{"section_segments":12,"offset":{"x":0.01,"y":0,"z":-10},"position":{"x":[30,30,30,30,30,30,36,36,36],"y":[-190,-200,-180,-180,-130,-110,-90,-85],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,5,5,4,4,12,5,0],"height":[0,5,5,4,4,12,10,0],"angle":135,"laser":{"damage":[60,80],"rate":2,"type":2,"speed":[190,240],"recoil":150,"number":1,"error":0},"texture":[17,18,4,13,4,63,4]},"cockpit1":{"angle":45,"section_segments":[40,90,180,270,320],"offset":{"x":0,"y":0,"z":10},"position":{"x":[0,0,0,0],"y":[-111,-96,-80,-75],"z":[-1,0,0,1]},"width":[3,8,6,2],"height":[0,6,7,0],"texture":[8.98,8.98,4]},"cockpit2":{"angle":-45,"section_segments":[40,90,180,270,320],"offset":{"x":0,"y":0,"z":10},"position":{"x":[0,0,0,0],"y":[-111,-96,-80,-75],"z":[-1,0,0,1]},"width":[3,8,6,2],"height":[0,6,7,0],"texture":[8.98,8.98,4]},"cockpit3":{"angle":135,"section_segments":[40,90,180,270,320],"offset":{"x":0,"y":0,"z":10},"position":{"x":[0,0,0,0],"y":[-111,-96,-80,-75],"z":[-1,0,0,1]},"width":[3,8,6,2],"height":[0,6,7,0],"texture":[8.98,8.98,4]},"cockpit4":{"angle":-135,"section_segments":[40,90,180,270,320],"offset":{"x":0,"y":0,"z":10},"position":{"x":[0,0,0,0],"y":[-111,-96,-80,-75],"z":[-1,0,0,1]},"width":[3,8,6,2],"height":[0,6,7,0],"texture":[8.98,8.98,4]},"cannon90":{"section_segments":12,"offset":{"x":0.01,"y":0,"z":-5},"position":{"x":[0,0,0,0,0,0,0],"y":[-125,-130,-65,-45,-25,-10,0],"z":[0,0,0,0,0,0,0]},"width":[0,5,6,10,13,6,6],"height":[0,5,5,10,13,5,0],"angle":90,"laser":{"damage":[60,80],"rate":2,"type":2,"speed":[190,240],"recoil":150,"number":1,"error":0},"propeller":false,"texture":[4,12,10,2,3,13]},"box":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":0,"y":85,"z":20},"position":{"x":[0,0,0,0,0],"y":[-30,-15,15,25],"z":[2,0,0,-5]},"width":[15,20,20,15],"height":[0,18,18,0],"texture":[13,17.96,4]},"cannon180":{"section_segments":12,"offset":{"x":0,"y":60,"z":20},"position":{"x":[0,0,0,0,0,0,0],"y":[-125,-130,-65,-45,-25,-10,0],"z":[0,0,0,0,0,0,0]},"width":[0,5,6,10,13,6,6],"height":[0,5,5,10,13,5,0],"angle":180,"laser":{"damage":[60,80],"rate":2,"type":2,"speed":[190,240],"recoil":150,"number":1,"error":0},"propeller":false,"texture":[4,12,10,2,3,13]},"ring":{"section_segments":12,"vertical":true,"offset":{"x":0,"y":-10,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[0,0,5,5,5,5,0],"z":[0,0,0,0,0,0,0]},"width":[100,115,115,110,105,100,100],"height":[100,115,115,110,105,100,100],"texture":[4,17,4,17,4,18,3,9]},"brancht":{"angle":45,"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":70,"y":-70,"z":1},"position":{"x":[10,10,-15,10,10],"y":[-40,-40,0,40,40],"z":[-3,-3,0,-3,-3]},"width":[0,8,25,8,0],"height":[0,5,5,5,0],"propeller":false,"texture":[18]},"branchr":{"angle":-45,"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":70,"y":70,"z":1},"position":{"x":[10,10,-15,10,10],"y":[-40,-40,0,40,40],"z":[-3,-3,0,-3,-3]},"width":[0,8,25,8,0],"height":[0,5,5,5,0],"propeller":false,"texture":[18]},"engines1":{"section_segments":12,"offset":{"x":30,"y":109,"z":0},"position":{"x":[-20,0,0,0,0],"y":[-75,20,51,55,48],"z":[-10,0,0,0,0]},"width":[10,15,15,15,0],"height":[15,16,15,15,0],"texture":[11,13,17,18],"propeller":true},"engines2":{"section_segments":12,"offset":{"x":20,"y":15,"z":19},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[35,30,50,80,110,120,125,115],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,5,8,9,9,9,9,0],"height":[0,5,8,9,9,9,9,0],"texture":[18,13,63,3,15,17,18],"propeller":true},"wire1":{"section_segments":8,"angle":45,"offset":{"x":0.02,"y":0,"z":15},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-75,-74,-61.5,-50,-38,-28,-18,2,12,11],"z":[-5,-5,-1,1,-1,-4,-11,-15,-18,-18,-18]},"width":[4,4,4,4,4,4,4,4,3,0],"height":[0,3,3,3,3,3,3,3,3,0],"propeller":false,"texture":[13,13,17,13,17,13,17,13,17]},"wire2":{"section_segments":8,"angle":135,"offset":{"x":0.02,"y":0,"z":15},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-75,-74,-61.5,-50,-38,-28,-18,2,12,11],"z":[-5,-5,-1,1,-1,-4,-11,-15,-18,-18,-18]},"width":[4,4,4,4,4,4,4,4,3,0],"height":[0,3,3,3,3,3,3,3,3,0],"propeller":false,"texture":[13,13,17,13,17,13,17,13,17]},"panels":{"vertical":true,"angle":45,"section_segments":[45,135,225,315],"offset":{"x":15,"y":15,"z":-90},"position":{"x":[0,0,0,0,0,0],"y":[-10,15,15,19,19],"z":[0,0,0,0,0]},"width":[0,10,20,20,20],"height":[0,30,50,35,0],"texture":[4,4,12.96,9.96]},"hubs":{"vertical":true,"section_segments":[45,135,225,315],"offset":{"x":15,"y":15,"z":-90},"position":{"x":[0,0,0,0,0,0,0],"y":[15,25,20,20,25,28],"z":[0,0,0,0,0,0,0]},"width":[13,10,8,8,8,0],"height":[33,30,28,28,28,0],"texture":[11,17,17,18],"angle":45}},"typespec":{"name":"U-Perimeter","level":6,"model":3,"code":603,"specs":{"shield":{"capacity":[650,900],"reload":[10,25]},"generator":{"capacity":[750,1100],"reload":[250,600]},"ship":{"mass":900,"speed":[80,95],"rotation":[20,40],"acceleration":[100,150]}},"shape":[7.615,7.642,5.636,6.468,8.528,8.982,5.012,8.099,8.982,7.373,5.804,6.984,7.642,7.642,6.984,5.804,7.373,8.982,8.099,5.012,8.982,8.528,6.468,6.802,6.678,7.603,6.678,6.802,6.468,8.528,8.982,5.012,8.099,8.982,7.373,5.804,6.984,7.642,7.642,6.984,5.804,7.373,8.982,8.099,5.012,8.982,8.528,6.468,5.636,7.642],"lasers":[{"x":0,"y":-5.2,"z":-0.2,"angle":0,"damage":[50,70],"rate":4,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":50},{"x":-4.808,"y":-6.505,"z":-0.4,"angle":45,"damage":[60,80],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":150},{"x":4.808,"y":-6.505,"z":-0.4,"angle":-45,"damage":[60,80],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":150},{"x":-6.505,"y":-4.808,"z":-0.4,"angle":45,"damage":[60,80],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":150},{"x":6.505,"y":-4.808,"z":-0.4,"angle":-45,"damage":[60,80],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":150},{"x":-4.808,"y":6.505,"z":-0.4,"angle":135,"damage":[60,80],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":150},{"x":4.808,"y":6.505,"z":-0.4,"angle":-135,"damage":[60,80],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":150},{"x":-6.505,"y":4.808,"z":-0.4,"angle":135,"damage":[60,80],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":150},{"x":6.505,"y":4.808,"z":-0.4,"angle":-135,"damage":[60,80],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":150},{"x":-5.2,"y":0,"z":-0.2,"angle":90,"damage":[60,80],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":150},{"x":5.2,"y":0,"z":-0.2,"angle":-90,"damage":[60,80],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":150},{"x":0,"y":7.6,"z":0.8,"angle":180,"damage":[60,80],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":150}],"radius":8.982}}';
var U_Bruiser_604 = '{"name":"U-Bruiser","level":6,"model":4,"size":2.8,"zoom":1.1,"specs":{"shield":{"capacity":[425,700],"reload":[10,20]},"generator":{"capacity":[400,800],"reload":[140,200]},"ship":{"mass":700,"speed":[55,85],"rotation":[25,45],"acceleration":[80,120]}},"bodies":{"main":{"angle":180,"section_segments":16,"vertical":true,"offset":{"x":0,"y":10,"z":25},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-10,-5,-2,0,6,20,25,45,20,0,-10],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[25,35,37,40,49,56,60,25,20,20,25],"height":[50,60,63,65,75,110,115,40,45,45,50],"texture":[3,1,4,4,18,3,18,10,9,17]},"cockpit":{"angle":180,"section_segments":12,"vertical":true,"offset":{"x":0,"y":15,"z":25},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-20,-19,-16,-4,6,20,25,45,20,0,-10],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,13,20,25],"height":[0,10,30,45,50],"texture":[9,9,9,13,10,2,11,10,9,63]},"body1":{"section_segments":12,"offset":{"x":0,"y":50,"z":10},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-75,-75,-55,-35,30,45,50,40],"z":[0,0,0,0,0,0,0,0]},"width":[0,24,26,28,20,15,15,0],"height":[0,26,30,30,30,15,15,0],"texture":[4,4,18,10,13,17,18],"propeller":true},"uwings1":{"section_segments":[0,60,120,180],"offset":{"x":-65,"y":-50,"z":30},"position":{"x":[0,0,0,0,0,0],"y":[-90,-110,40,80,90,100],"z":[0,0,0,0,0,0]},"width":[0,5,20,15,0],"height":[0,10,15,10,0],"texture":[4,15]},"uwings2":{"section_segments":[0,60,120,180],"offset":{"x":45,"y":-50,"z":30},"position":{"x":[0,0,0,0,0,0],"y":[-90,-110,40,80,90,100],"z":[0,0,0,0,0,0]},"width":[0,5,20,15,0],"height":[0,10,15,10,0],"texture":[4,15]},"uwings3":{"section_segments":[0,60,120,180],"offset":{"x":-65,"y":-50,"z":30},"position":{"x":[0,0,0,0,0,0],"y":[-90,-110,-40,-40],"z":[0,0,0,0,0,0]},"width":[0,10,20,15,0],"height":[0,15,15,10,0],"texture":[12,63]},"uwings4":{"section_segments":[0,60,120,180],"offset":{"x":45,"y":-50,"z":30},"position":{"x":[0,0,0,0,0,0],"y":[-90,-110,-40,-40],"z":[0,0,0,0,0,0]},"width":[0,10,20,15,0],"height":[0,15,15,10,0],"texture":[12,63]},"uwings5":{"section_segments":6,"offset":{"x":55,"y":115,"z":30},"position":{"x":[0,0,0,0,0,0],"y":[-90,-100,-40,-40],"z":[0,0,0,0,0,0]},"width":[0,35,17,0],"height":[0,25,15,0],"texture":[12,63]},"cannon_detail1":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":55,"y":-50,"z":30},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-80,-80,42.5,80,90,100],"z":[0,0,0,0,0,0,0,0]},"width":[0,2,2,2,2,2,2],"height":[0,18,32,22,0],"texture":[4]},"box":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":55,"y":50,"z":47},"position":{"x":[0,0,0,0,0],"y":[-30,-30,-5,15],"z":[2,0,0,0]},"width":[0,20,20,10],"height":[0,10,10,0],"texture":[4,17.95,4]},"box2":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":0,"y":75,"z":25},"position":{"x":[0,0,0,0,0],"y":[-70,-70,10,15],"z":[2,0,0,-9]},"width":[20,30,30,10],"height":[0,20,20,0],"texture":[4,8.18,13]},"box3":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":0,"y":-65,"z":-5},"position":{"x":[0,0,0,0,0],"y":[-75,-67,-12,-10],"z":[-8,-7,9,9]},"width":[10,10,10,0],"height":[0,5,20,0],"texture":[3,8.18,13]},"engines":{"section_segments":8,"offset":{"x":22,"y":40,"z":25},"position":{"x":[-5,-5,0,0,0,0,0],"y":[-20,-30,40,55,58,50],"z":[0,0,0,0,0,0,0]},"width":[0,10,15,10,10,0],"height":[0,15,15,10,10,0],"texture":[12,11,13,17],"propeller":true},"cannon_body":{"section_segments":12,"offset":{"x":55,"y":-40,"z":30},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-90,-100,-100,-95,-60,-35,0,25,60,70,110],"z":[0,0,0,0,0,0,0,0,0,-5,-20,0,0]},"width":[0,12,15,15,15,20,20,15,15,15,10],"height":[0,8,10,10,10,10,10,10,10,15,0],"texture":[17,4,63,11,11,17,10,17],"laser":{"damage":[40,65],"rate":2,"type":1,"speed":[170,260],"number":4,"angle":2,"error":0,"recoil":40}},"discs1":{"section_segments":6,"offset":{"x":55,"y":-90,"z":30},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-40,-40,-35,-35,-20,-20,-15,-15,0,0,5,5,20,20,25,25],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,20,21,0,0,23,24,0,0,26,27,0,0,28,29,0],"height":[0,16,16,0,0,16,16,0,0,18,18,0,0,20,20,0],"texture":[1.9,4,1.9,1.9,1.9,4,1.9,1.9,1.9,4,1.9,1.9,1.9,4,1.9,1.9]},"discs2":{"section_segments":6,"offset":{"x":55,"y":-10,"z":30},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-40,-40,-35,-35,-20,-20,-15,-15,0,0,5,5,20,20,25,25],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,30,31,0,0,33,34,0,0,35,34,0,0,32,31,0],"height":[0,22,22,0,0,23,23,0,0,26,25,0,0,23,21,0],"texture":[1.9,4,1.9,1.9,1.9,4,1.9,1.9,1.9,4,1.9,1.9,1.9,4,1.9,1.9]},"discs3":{"section_segments":20,"offset":{"x":55,"y":74,"z":25},"position":{"x":[0,0,0,0,0,0,0],"y":[-5,7,5,5,10,13],"z":[0,0,0,0,0,0,0]},"width":[18,18,14,14,14,0],"height":[18,18,14,14,14,0],"texture":[13,17,17,17,18]},"cannon_base":{"angle":90,"section_segments":10,"offset":{"x":55,"y":50,"z":20},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-40,-25,25,30],"z":[0,0,0,0,0,0,0,0]},"width":[0,30,30,0],"height":[0,20,20,0],"texture":[4,8,4]},"hubs1":{"vertical":true,"section_segments":20,"offset":{"x":0,"y":40,"z":-25},"position":{"x":[0,0,0,0,0,0,0],"y":[0,10,5,5,10,9],"z":[0,0,0,0,0,0,0]},"width":[18,15,13,12,10,0],"height":[18,15,13,12,10,0],"texture":[11,18,17,18,18]},"hubs2":{"vertical":true,"section_segments":20,"offset":{"x":0,"y":40,"z":-60},"position":{"x":[0,0,0,0,0,0,0],"y":[0,10,5,5,10,9],"z":[0,0,0,0,0,0,0]},"width":[18,15,13,12,10,0],"height":[18,15,13,12,10,0],"texture":[11,18,17,18,18]}},"wings":{"main1":{"length":[100,10],"width":[150,50,40],"angle":[-10,-10],"position":[0,-90,-80],"doubleside":true,"bump":{"position":20,"size":10},"texture":[18,63],"offset":{"x":0,"y":-20,"z":-10}},"main2":{"length":[100,10],"width":[150,50,40],"angle":[-10,-10],"position":[0,90,80],"doubleside":true,"bump":{"position":-20,"size":10},"texture":[18,63],"offset":{"x":0,"y":-20,"z":-10}}},"typespec":{"name":"U-Bruiser","level":6,"model":4,"code":604,"specs":{"shield":{"capacity":[425,700],"reload":[10,20]},"generator":{"capacity":[400,800],"reload":[140,200]},"ship":{"mass":700,"speed":[55,85],"rotation":[25,45],"acceleration":[80,120]}},"shape":[7.852,7.669,9.308,9.864,9.73,9.358,9.163,8.317,5.446,5.06,4.973,4.701,4.81,4.666,4.851,6.523,6.913,7.488,7.643,7.663,6.088,5.767,5.773,5.77,5.663,5.611,5.663,5.77,5.773,5.767,6.088,7.663,7.643,7.488,6.913,6.523,4.851,4.666,4.81,4.701,4.973,5.06,5.446,8.317,9.163,9.358,9.73,9.864,9.308,7.669],"lasers":[{"x":3.08,"y":-7.84,"z":1.68,"angle":0,"damage":[40,65],"rate":2,"type":1,"speed":[170,260],"number":4,"spread":2,"error":0,"recoil":40},{"x":-3.08,"y":-7.84,"z":1.68,"angle":0,"damage":[40,65],"rate":2,"type":1,"speed":[170,260],"number":4,"spread":2,"error":0,"recoil":40}],"radius":9.864}}';
var U_Afterburn_605 = '{"name":"U-Afterburn","level":6,"model":5,"size":2.4,"specs":{"shield":{"capacity":[300,500],"reload":[15,30]},"generator":{"capacity":[600,800],"reload":[100,150]},"ship":{"mass":250,"speed":[110,130],"rotation":[45,60],"acceleration":[40,80],"dash":{"rate":4,"burst_speed":[100,120],"speed":[100,120],"acceleration":[100,100],"initial_energy":[0.01,0.03],"energy":[0.01,0.03]}}},"bodies":{"main":{"angle":180,"section_segments":8,"offset":{"x":0,"y":20,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-35,-40,-20,-10,10,40,80,120,100],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,15,15,18,18,28,23,10,0],"height":[0,15,15,18,18,25,20,5,0],"texture":[17,13,8,10,2,63,63,15],"propeller":false,"laser":{"damage":[30,20],"rate":10,"type":1,"speed":[30,40],"recoil":350,"number":1,"error":0}},"cockpit":{"section_segments":[40,90,180,270,320],"offset":{"x":0,"y":-95,"z":10},"position":{"x":[0,0,0,0],"y":[0,35,50,95],"z":[-3,5,6,6]},"width":[5,13,13,13],"height":[0,12,12,12],"texture":[8.98,8.98,4]},"cannons":{"section_segments":12,"offset":{"x":60,"y":-60,"z":-5},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-60,-70,-20,0,5,15,65,85,90,70],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,5,8,10,15,15,10,10,0],"height":[0,5,5,8,20,25,20,10,10,0],"laser":{"damage":[150,200],"rate":1.5,"type":1,"speed":[190,200],"recoil":150,"number":1,"error":0},"propeller":true,"texture":[4,13,18,4,63,18,4,17,18]},"uwings_front":{"section_segments":[0,90,180],"offset":{"x":-65,"y":-80,"z":-5},"position":{"x":[2,-3,-5,-4,0,0,0],"y":[-90,-61,-20,0,35,85,110],"z":[0,0,0,0,0,0,0]},"width":[0,5,13,18,25,20,0],"height":[0,4,15,20,25,20,0],"texture":[63,63,63,63,18,4]},"uwings_rear":{"angle":180,"section_segments":[0,30,60,90,120,150,180],"offset":{"x":0.01,"y":50,"z":0},"position":{"x":[-20,-20,-20,-20,-15,-15,-20,-20,-20],"y":[-60,-70,40,80,120,110],"z":[0,0,0,0,0,0,0]},"width":[0,10,20,15,10,0],"height":[0,10,10,20,15,0],"texture":[12,2,18,10,13]},"box":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":0,"y":0,"z":20},"position":{"x":[0,0,0,0,0],"y":[-50,-30,25,25],"z":[2,0,0,-3]},"width":[0,20,20,0],"height":[0,10,10,0],"texture":[4,8.98,4]},"box2":{"angle":90,"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":0,"y":15,"z":30},"position":{"x":[0,0,0,0,0],"y":[-10,-10,10,10],"z":[2,0,0,-3]},"width":[0,10,10,0],"height":[0,10,10,0],"texture":[4,8,4]},"box3":{"angle":90,"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":0,"y":-20,"z":30},"position":{"x":[0,0,0,0,0],"y":[-10,-10,10,10],"z":[2,0,0,-3]},"width":[0,10,10,0],"height":[0,10,10,0],"texture":[4,8,4]},"box4":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":0,"y":0,"z":-23},"position":{"x":[0,0,0,0,0],"y":[-80,-30,25,25],"z":[10,0,0,-3]},"width":[5,20,20,0],"height":[0,10,10,0],"texture":[4,8.98,4]},"hubs1":{"vertical":true,"section_segments":20,"offset":{"x":25,"y":10,"z":20},"position":{"x":[0,0,0,0,0,0,0],"y":[0,10,5,5,10,13],"z":[0,0,0,0,0,0,0]},"width":[18,15,13,13,13,0],"height":[18,15,13,13,13,0],"texture":[11,17,17,18],"angle":40},"hubs2":{"vertical":true,"section_segments":20,"offset":{"x":25,"y":10,"z":-15},"position":{"x":[0,0,0,0,0,0,0],"y":[0,10,5,5,10,13],"z":[0,0,0,0,0,0,0]},"width":[18,15,13,13,13,0],"height":[18,15,13,13,13,0],"texture":[11,17,17,18],"angle":40},"hubs3":{"vertical":true,"section_segments":20,"offset":{"x":-25,"y":-10,"z":20},"position":{"x":[0,0,0,0,0,0,0],"y":[0,10,5,5,10,13],"z":[0,0,0,0,0,0,0]},"width":[18,15,13,13,13,0],"height":[18,15,13,13,13,0],"texture":[11,17,17,18],"angle":220},"hubs4":{"vertical":true,"section_segments":20,"offset":{"x":-25,"y":-10,"z":-15},"position":{"x":[0,0,0,0,0,0,0],"y":[0,10,5,5,10,13],"z":[0,0,0,0,0,0,0]},"width":[18,15,13,13,13,0],"height":[18,15,13,13,13,0],"texture":[11,17,17,18],"angle":220},"disc1":{"section_segments":12,"offset":{"x":0,"y":35,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,0,-5,-3,-3,3,3,5,0,0],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[22,22,22,25,25,25,25,22,22,22],"height":[22,22,22,25,25,25,25,22,22,22],"texture":[18]},"disc2":{"section_segments":12,"offset":{"x":0,"y":50,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,0,-5,-3,-3,3,3,5,0,0],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[22,22,22,25,25,25,25,22,22,22],"height":[22,22,22,25,25,25,25,22,22,22],"texture":[2]},"disc3":{"section_segments":12,"offset":{"x":0,"y":65,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,0,-5,-3,-3,3,3,5,0,0],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[22,22,22,25,25,25,25,22,22,22],"height":[22,22,22,25,25,25,25,22,22,22],"texture":[2]},"disc4":{"section_segments":12,"offset":{"x":0,"y":80,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,0,-5,-3,-3,3,3,5,0,0],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[22,22,22,25,25,25,25,22,22,22],"height":[22,22,22,25,25,25,25,22,22,22],"texture":[2]},"disc5":{"section_segments":12,"offset":{"x":0,"y":95,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,0,-5,-3,-3,3,3,5,0,0],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[22,22,22,25,25,25,25,22,22,22],"height":[22,22,22,25,25,25,25,22,22,22],"texture":[3]},"disc7":{"section_segments":12,"offset":{"x":0,"y":110,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,0,-5,-3,-3,3,3,5,0,0],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[22,22,22,25,25,25,25,22,22,22],"height":[22,22,22,25,25,25,25,22,22,22],"texture":[3]},"disc6":{"section_segments":12,"offset":{"x":0,"y":115,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,0,-5,-3,-3,3,3,5,0,0],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[22,22,22,25,25,25,25,22,22,22],"height":[22,22,22,25,25,25,25,22,22,22],"texture":[13]},"wire1":{"section_segments":18,"offset":{"x":20,"y":15,"z":20},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,0,-5,-3,-3,3,3,5,0,0],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[12,12,12,15,15,15,15,12,12,12],"height":[12,12,12,15,15,15,15,12,12,12],"texture":[4,4,4,4,17,4]},"wire2":{"section_segments":18,"offset":{"x":20,"y":-20,"z":20},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,0,-5,-3,-3,3,3,5,0,0],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[12,12,12,15,15,15,15,12,12,12],"height":[12,12,12,15,15,15,15,12,12,12],"texture":[4,4,4,4,17,4]},"tube1":{"section_segments":4,"offset":{"x":21,"y":-20,"z":14},"position":{"x":[-4,0,0,0],"y":[-40,-25,140,143],"z":[-4,0,0,0]},"width":[0,2,2,0],"height":[0,2,2,2],"texture":[13,17,13]},"tube2":{"section_segments":4,"offset":{"x":21,"y":-20,"z":-14},"position":{"x":[-4,0,0,0],"y":[-40,-25,140,143],"z":[4,0,0,0]},"width":[0,2,2,0],"height":[0,2,2,2],"texture":[13,17,13]},"tube3":{"section_segments":12,"offset":{"x":4,"y":-10,"z":32},"position":{"x":[0,0,0,0],"y":[-10,-10,20,20],"z":[0,0,0,0]},"width":[0,2,2,0],"height":[0,2,2,2],"texture":[13,17,13]},"flame":{"section_segments":8,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0],"y":[100],"z":[0]},"width":[15],"height":[15],"texture":[17],"propeller":true}},"wings":{"main":{"doubleside":true,"offset":{"x":20,"y":15,"z":0},"length":[35],"width":[80,50],"angle":[0],"position":[0,-43],"texture":[18],"bump":{"position":10,"size":20}},"shields":{"doubleside":true,"offset":{"x":5,"y":10,"z":-28},"length":[0,25,30,25],"width":[40,40,75,75,40,40],"angle":[30,30,90,150],"position":[10,10,0,0,10],"texture":[11],"bump":{"position":40,"size":4}}},"typespec":{"name":"U-Afterburn","level":6,"model":5,"code":605,"specs":{"shield":{"capacity":[300,500],"reload":[15,30]},"generator":{"capacity":[600,800],"reload":[100,150]},"ship":{"mass":250,"speed":[110,130],"rotation":[45,60],"acceleration":[40,80],"dash":{"rate":4,"burst_speed":[100,120],"speed":[100,120],"acceleration":[100,100],"initial_energy":[0.01,0.03],"energy":[0.01,0.03]}}},"shape":[4.809,4.824,4.027,8.702,7.911,6.946,6.238,5.709,5.235,4.908,4.59,4.348,4.185,4.104,3.909,3.658,3.656,2.989,2.479,2.76,3.199,3.859,4.949,5.937,5.989,5.771,5.989,5.937,4.949,3.859,3.199,2.76,2.479,2.989,3.656,3.658,3.909,4.102,4.185,4.348,4.59,4.908,5.235,5.709,6.238,6.946,7.911,8.702,4.027,4.824],"lasers":[{"x":0,"y":2.88,"z":0,"angle":180,"damage":[30,20],"rate":10,"type":1,"speed":[30,40],"number":1,"spread":0,"error":0,"recoil":350},{"x":2.88,"y":-6.24,"z":-0.24,"angle":0,"damage":[150,200],"rate":1.5,"type":1,"speed":[190,200],"number":1,"spread":0,"error":0,"recoil":150},{"x":-2.88,"y":-6.24,"z":-0.24,"angle":0,"damage":[150,200],"rate":1.5,"type":1,"speed":[190,200],"number":1,"spread":0,"error":0,"recoil":150}],"radius":8.702}}';
var U_Smasher_606 = '{"name":"U-Smasher","level":6,"model":6,"size":2.5,"specs":{"shield":{"capacity":[600,800],"reload":[20,35]},"generator":{"capacity":[400,600],"reload":[30,80]},"ship":{"mass":700,"speed":[100,120],"rotation":[15,25],"acceleration":[60,110],"dash":{"rate":4,"burst_speed":[100,120],"speed":[100,120],"acceleration":[100,100],"initial_energy":[0.01,0.03],"energy":[0.01,0.03]}}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":-20,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-90,-100,-20,20,90,120,125,120],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,25,25,30,20,20,20,0],"height":[0,25,25,30,15,15,15,0],"texture":[17,13,4,3,15,17,18],"propeller":true},"main2":{"section_segments":10,"offset":{"x":0,"y":-20,"z":36},"position":{"x":[0,0,0,0,0,0,0],"y":[-20,-25,5,55,100,95],"z":[-2,-2,0,0,0,0,0]},"width":[0,10,25,25,10,0],"height":[0,8,10,10,5,0],"texture":[13,63,10,1,17],"propeller":true},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-20,"z":40},"position":{"x":[0,0,0,0,0,0],"y":[-15,10,50,70,90],"z":[3,0,1,1,1]},"width":[5,10,12,8,5],"height":[0,15,20,15,0],"texture":[9,9,4]},"cannons_rear1":{"angle":180,"section_segments":12,"offset":{"x":15,"y":50,"z":5},"position":{"x":[-8,-8,-8,-5,0,0,0],"y":[-60,-70,-20,0,20,65,45],"z":[0,0,0,0,0,-1,-1]},"width":[0,5,6,10,15,10,0],"height":[0,5,5,14,15,10,0],"laser":{"damage":[30,20],"rate":2,"type":2,"speed":[190,240],"recoil":150,"number":1,"error":0},"propeller":false,"texture":[4,13,10,13,63,4]},"cannon_rear2":{"section_segments":12,"offset":{"x":10,"y":50,"z":20},"position":{"x":[0,0,0,0,0,0,0],"y":[-60,-70,-20,0,20,50,45],"z":[0,0,0,0,0,0,0]},"width":[0,4,4,10,13,9,0],"height":[0,4,4,10,13,9,0],"angle":180,"laser":{"damage":[20,10],"rate":10,"type":2,"speed":[190,240],"recoil":80,"number":1,"error":0},"texture":[4,13,8,13,63,4]},"cannon_rear3":{"section_segments":12,"offset":{"x":70,"y":60,"z":30},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-60,-10,0,20,60,70],"z":[0,0,0,0,-5,-20,-30]},"width":[0,4,4,5,5,5,0],"height":[0,4,4,10,13,5,0],"angle":180,"laser":{"damage":[20,10],"rate":10,"type":2,"speed":[190,240],"recoil":80,"number":1,"error":0},"texture":[4,4,8,3,4,4]},"spring3":{"angle":-20,"section_segments":6,"offset":{"x":71,"y":-97,"z":0},"position":{"x":[0,5.841275134629758,10.760341363492842,13.980586289508397,14.993604045622577,13.639461402385226,10.131947708267264,5.024822252338577,-0.8756121514136946,-6.637806649422781,-11.35203742961892,-14.274031108342736,-14.94246913253761,-13.251819835802298,-9.468999568084813,-4.1912324729838755,1.7482380727574178,7.411700267079146,11.905017957737313,14.518795080472305,14.840373699350723,12.818983621324193,8.773757893376404,3.343348711503663,-2.6149017183447474,-8.160316663340591,-12.417397036284834,-14.714043450997384,-14.687665937269744,-12.342428924530587,-8.048593770006457,-2.484062631724562,3.4726473765231622,8.88110272060843,12.887427222847492,14.859110335423068,14.484866648239136,11.823781010629677],"y":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49],"z":[15,13.815914910043276,10.450600640207481,5.435366317150101,-0.43799283451933224,-6.242202548207136,-11.060905733118682,-14.13333511002987,-14.974421636921297,-13.451376245012208,-9.804654312954185,-4.609993049676302,1.312484751591696,7.0277500695056565,11.633488177653753,14.402554299755494,14.897773781372887,13.040962355247366,9.125269717983796,3.7688976387337974,-2.1825005071292294,-7.7893298117503065,-12.166395210924856,-14.622654321062466,-14.770317836911895,-12.586072936146758,-8.414763861408387,-2.9149485968299698,3.0450729572813344,8.52434444651967,12.657809380987423,14.792884534182969,14.592488485461512,12.088259364606698,7.675559886797144,2.0510582731173983,-3.8972603432064403,-9.230287244320895]},"width":[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],"height":[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],"texture":[3]},"spring4":{"angle":160,"section_segments":6,"offset":{"x":60,"y":-60,"z":0},"position":{"x":[0,5.841275134629758,10.760341363492842,13.980586289508397,14.993604045622577,13.639461402385226,10.131947708267264,5.024822252338577,-0.8756121514136946,-6.637806649422781,-11.35203742961892,-14.274031108342736,-14.94246913253761,-13.251819835802298,-9.468999568084813,-4.1912324729838755,1.7482380727574178,7.411700267079146,11.905017957737313,14.518795080472305,14.840373699350723,12.818983621324193,8.773757893376404,3.343348711503663,-2.6149017183447474,-8.160316663340591,-12.417397036284834,-14.714043450997384,-14.687665937269744,-12.342428924530587,-8.048593770006457,-2.484062631724562,3.4726473765231622,8.88110272060843,12.887427222847492,14.859110335423068,14.484866648239136,11.823781010629677],"y":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49],"z":[15,13.815914910043276,10.450600640207481,5.435366317150101,-0.43799283451933224,-6.242202548207136,-11.060905733118682,-14.13333511002987,-14.974421636921297,-13.451376245012208,-9.804654312954185,-4.609993049676302,1.312484751591696,7.0277500695056565,11.633488177653753,14.402554299755494,14.897773781372887,13.040962355247366,9.125269717983796,3.7688976387337974,-2.1825005071292294,-7.7893298117503065,-12.166395210924856,-14.622654321062466,-14.770317836911895,-12.586072936146758,-8.414763861408387,-2.9149485968299698,3.0450729572813344,8.52434444651967,12.657809380987423,14.792884534182969,14.592488485461512,12.088259364606698,7.675559886797144,2.0510582731173983,-3.8972603432064403,-9.230287244320895]},"width":[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],"height":[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],"texture":[3]},"bludger":{"section_segments":6,"offset":{"x":0.0001,"y":-170,"z":-5},"position":{"x":[0,0,0,0,0,0,0,0,100],"y":[0,10,25,25,15,30,50,60,80],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,115,115,120,120,130,130,125,0],"height":[0,30,30,35,35,40,40,35,10],"texture":[15.9,17,17,18,4,63,4]},"cover":{"section_segments":6,"offset":{"x":0,"y":-50,"z":30},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-105,-105,-90,-70,10,20,60,90,120,150],"z":[-3,-3,0,0,0,0,0,0,-20,-20,0]},"width":[0,17,17,17,17,40,40,40,17,17],"height":[0,0,6,6,6,10,12,12,30,6],"texture":[4,4,63,13,4,18,4,4,13]},"compressionlight":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":0,"y":-50,"z":10},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-105,-105,-90,-70,25],"z":[0,0,0,0,0,0,0,0]},"width":[0,17,17,27,27,17,40,40,17],"height":[0,6,6,15,15,25,25,25,25],"texture":[4,4,63,17]},"sidesprings1":{"section_segments":6,"offset":{"x":25,"y":-125,"z":10},"position":{"x":[0,0,0,0,0,0],"y":[0,20,40,60,80,100],"z":[-10,10,-10,10,-10,10]},"width":[3,3,3,3,3,3],"height":[2,2,2,2,2,2],"texture":[2.9]},"sidesprings2":{"section_segments":6,"offset":{"x":25,"y":-125,"z":10},"position":{"x":[0,0,0,0,0,0],"y":[0,20,40,60,80,100],"z":[10,-10,10,-10,10,-10]},"width":[3,3,3,3,3,3],"height":[2,2,2,2,2,2],"texture":[2.9]},"topsprings1":{"section_segments":6,"offset":{"x":0,"y":-125,"z":23},"position":{"x":[20,-20,20,-20,20,-20],"y":[0,20,40,60,80,100],"z":[0,0,0,0,0,0]},"width":[3,3,3,3,3,3],"height":[2,2,2,2,2,2],"texture":[2.9]},"topsprings2":{"section_segments":6,"offset":{"x":0,"y":-125,"z":23},"position":{"x":[-20,20,-20,20,-20,20],"y":[0,20,40,60,80,100],"z":[0,0,0,0,0,0]},"width":[3,3,3,3,3,3],"height":[2,2,2,2,2,2],"texture":[2.9]},"box2":{"angle":90,"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":0,"y":80,"z":22},"position":{"x":[40,0,0,40],"y":[-30,-15,15,30],"z":[0,0,0,0]},"width":[20,10,10,20],"height":[0,5,5,0],"texture":[2,63,2]},"box3":{"angle":-20,"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":60,"y":-70,"z":0},"position":{"x":[0,0,0,0,0],"y":[-35,-65,-22,-22],"z":[2,0,0,-3]},"width":[0,28,28,0],"height":[0,20,28,0],"texture":[4,17.97,4]},"tube1":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":22.5,"y":-90,"z":20},"position":{"x":[0,0,0,0],"y":[-20,-20,70,70],"z":[0,0,0,0]},"width":[0,4,4,0],"height":[0,4,2,0],"texture":[13,4,13]},"uwings1":{"angle":20,"section_segments":12,"offset":{"x":-30,"y":15,"z":5},"position":{"x":[0,0,0,0,0,20],"y":[-120,-75,-85,-70,-60,20],"z":[0,0,0,0,0,0]},"width":[10,10,20,20,25,25,0],"height":[10,10,20,20,25,25,0],"texture":[17,13,18,4,12]},"u_wings2":{"angle":180,"section_segments":[0,45,90,135,180],"offset":{"x":70,"y":80,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-70,-80,40,80,90,100],"z":[0,0,0,0,0,0]},"width":[0,10,25,15,0],"height":[0,15,35,15,0],"texture":[12,2,63,4]},"side_hubs":{"angle":90,"section_segments":14,"offset":{"x":90,"y":40,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[-5,5,9,12,9,7],"z":[0,0,0,0,0,0,0]},"width":[23,22,20,17,7,0],"height":[23,22,20,17,7,0],"texture":[63,4,17,11,17]},"wire1":{"section_segments":8,"angle":215,"offset":{"x":30,"y":-5,"z":20},"position":{"x":[5,5,5,5,5,5,6,8,9,10,10],"y":[-65,-64,-51.5,-40,-28,-18,-8,2,12,11],"z":[-5,-5,-1,1,2,1,-1,-6,-8,-10,-10]},"width":[4,4,4,4,4,4,4,4,3,0],"height":[0,3,3,3,3,3,3,3,3,0],"propeller":false,"texture":[13,13,17,13,17,13,17,13,17]},"wire2":{"section_segments":8,"angle":215,"offset":{"x":30,"y":15,"z":18},"position":{"x":[5,5,5,5,5,5,6,8,9,10,10],"y":[-65,-64,-51.5,-40,-28,-18,-8,2,12,11],"z":[-5,-5,-1,1,2,1,-1,-6,-8,-10,-10]},"width":[4,4,4,4,4,4,4,4,3,0],"height":[0,3,3,3,3,3,3,3,3,0],"propeller":false,"texture":[13,17,13,17,13,17,13,17,13,17]},"side_engines":{"section_segments":10,"offset":{"x":60,"y":90,"z":0},"position":{"x":[10,5,5,5,0,0,0],"y":[-100,-90,-50,0,5,10,0],"z":[0,0,0,0,0,0,0]},"width":[0,9,13,15,10,10,0],"height":[0,15,35,20,15,15,0],"propeller":true,"texture":[4,63,8,13,17,18]}},"wings":{"main":{"offset":{"x":0,"y":-5,"z":0},"length":[70,0],"width":[120,70,50],"angle":[0,0],"position":[-30,70,70],"texture":[18],"doubleside":true,"bump":{"position":10,"size":20}}},"typespec":{"name":"U-Smasher","level":6,"model":6,"code":606,"specs":{"shield":{"capacity":[600,800],"reload":[20,35]},"generator":{"capacity":[400,600],"reload":[30,80]},"ship":{"mass":700,"speed":[100,120],"rotation":[15,25],"acceleration":[60,110],"dash":{"rate":4,"burst_speed":[100,120],"speed":[100,120],"acceleration":[100,100],"initial_energy":[0.01,0.03],"energy":[0.01,0.03]}}},"shape":[8.5,8.487,8.648,8.959,9.423,9.331,8.828,7.031,4.762,4.173,3.773,3.596,4.243,4.418,5.265,5.485,5.819,5.832,6.114,6.807,7.779,8.944,8.84,6.161,6.108,6.012,6.108,6.161,8.84,8.944,7.779,6.807,6.114,5.832,5.819,5.485,5.265,4.418,4.25,3.596,3.773,4.173,4.762,7.031,8.828,9.331,9.423,8.959,8.648,8.487],"lasers":[{"x":1.15,"y":6,"z":0.25,"angle":180,"damage":[30,20],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":150},{"x":-1.15,"y":6,"z":0.25,"angle":-180,"damage":[30,20],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":150},{"x":0.5,"y":6,"z":1,"angle":180,"damage":[20,10],"rate":10,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":80},{"x":-0.5,"y":6,"z":1,"angle":-180,"damage":[20,10],"rate":10,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":80},{"x":3.5,"y":6,"z":1.5,"angle":180,"damage":[20,10],"rate":10,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":80},{"x":-3.5,"y":6,"z":1.5,"angle":-180,"damage":[20,10],"rate":10,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":80}],"radius":9.423}}';
var Hellfire_607 = '{"name":"Hellfire","level":6,"model":7,"size":2.9,"next":[704,705],"specs":{"shield":{"capacity":[400,550],"reload":[10,15]},"generator":{"capacity":[400,800],"reload":[150,250]},"ship":{"mass":500,"speed":[90,105],"rotation":[30,40],"acceleration":[60,80]}},"bodies":{"main2":{"section_segments":8,"offset":{"x":0,"y":-105,"z":17},"position":{"x":[0,0,0,0,0,0],"y":[0,-5,20,50,45,50],"z":[0,0,0,0,0,0]},"width":[0,5,11.5,15,0],"height":[0,2.5,11.5,5,0],"texture":[12,1,10,12]},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-115,"z":27},"position":{"x":[0,0,0,0],"y":[10,15,30,50],"z":[-5,-5,-1,-1]},"width":[2.5,4,6,4],"height":[0,4,4,4],"texture":[9]},"neck":{"section_segments":16,"offset":{"x":0,"y":-70,"z":20},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-9,-2,5,10,20,28,37,35],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,13,15,16,18,21,15,0],"height":[0,15,18,20,20,19,20,0],"texture":[9,11,3,63,13,11,17]},"uwings_front_left":{"section_segments":[0,45,90,135,180],"offset":{"x":0,"y":-50,"z":15},"position":{"x":[-20,-20,-20,-20,-20,-20],"y":[-30,-40,-15,-10,0,10],"z":[0,0,0,0,0,0]},"width":[0,5,10,11,13,15],"height":[0,5,10,11,12,13],"texture":[12,2,3,63,15]},"uwings_front_right":{"section_segments":[180,225,270,315,360],"offset":{"x":0,"y":-50,"z":15},"position":{"x":[20,20,20,20,20,20],"y":[-30,-40,-15,-10,0,10],"z":[0,0,0,0,0,0]},"width":[0,5,10,11,13,15],"height":[0,5,10,11,12,13],"texture":[12,2,3,63,15]},"bridge":{"angle":90,"section_segments":16,"offset":{"x":-70,"y":0,"z":20},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-5,-2,5,10,20,28,37,35],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,15,22,23,24,28,15,0],"height":[0,15,22,23,24,23,20,0],"texture":[17,18,3,1,13,11,17]},"engine":{"angle":180,"section_segments":16,"offset":{"x":0,"y":70,"z":20},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,-2,3,10,20,28,37,35],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,20,22,23,24,28,15,0],"height":[0,20,22,23,24,23,20,0],"texture":[18,17,3,63,13,11,17],"propeller":true},"cannons":{"section_segments":12,"offset":{"x":70,"y":-40,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-50,-10,-11,-12,-13,-10,-8,0,5,20,25,55,60,75,80,78],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,2,4,6,8,5,3,3,10,10,10,10,10,10,10,0],"height":[0,2,4,6,8,5,3,3,10,20,20,20,20,10,10,0],"texture":[13,4,4,4,17,18,8,13,18,3,8,3,18,17,18],"propeller":true,"laser":{"damage":[10,15],"rate":10,"type":2,"speed":[400,500],"number":1,"recoil":15,"error":0}},"cannons2":{"section_segments":12,"offset":{"x":70,"y":-40,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-50,-10,-11,-12,-13,-10,-8,0,5,20,25,55,60,75,80,78],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,2,4,6,8,5,3,3,10,10,10,10,10,10,10,0],"height":[0,2,4,6,8,5,3,3,10,20,20,20,20,10,10,0],"texture":[13,4,4,4,17,18,8,13,18,3,8,3,18,17,18],"laser":{"damage":[10,15],"rate":10,"type":2,"speed":[350,450],"number":1,"recoil":15,"error":0}},"cannons3":{"section_segments":12,"offset":{"x":70,"y":-40,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-50,-10,-11,-12,-13,-10,-8,0,5,20,25,55,60,75,80,78],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,2,4,6,8,5,3,3,10,10,10,10,10,10,10,0],"height":[0,2,4,6,8,5,3,3,10,20,20,20,20,10,10,0],"texture":[13,4,4,4,17,18,8,13,18,3,8,3,18,17,18],"laser":{"damage":[10,15],"rate":10,"type":2,"speed":[300,400],"number":1,"recoil":15,"error":0}},"discs":{"section_segments":12,"offset":{"x":70,"y":-75,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-6,-6,-4,-4,0,0,2,2,6,6,8,8,12,12,14,14],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,3,3,0,0,4,4,0,0,5,5,0,0,6,6,0],"height":[0,3,3,0,0,4,4,0,0,5,5,0,0,6,6,0],"texture":[4,17,4,4,4,17,4,4,4,17,4,4,4,17,4]},"core_shield":{"angle":180,"section_segments":16,"vertical":true,"offset":{"x":0,"y":30,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-10,-5,-5,-4,0,20,25,30,20,0,-10],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[30,40,42,45,50,50,45,30,25,25,30],"height":[30,40,42,45,50,50,45,30,25,25,30],"texture":[11,17,4,13,63,13,11,10,9,10]},"tube1":{"section_segments":8,"offset":{"x":22,"y":-80,"z":10},"position":{"x":[38,37,20,20],"y":[-18,-15,55,58],"z":[0,0,15,15]},"width":[0,1,2,0],"height":[0,1,2,2],"texture":[63,63,13]},"tube2":{"section_segments":8,"offset":{"x":22,"y":-80,"z":10},"position":{"x":[38,38,20,20],"y":[18,15,55,58],"z":[0,0,15,15]},"width":[0,1,2,0],"height":[0,1,2,2],"texture":[63,63,13]},"tube3":{"section_segments":8,"offset":{"x":22,"y":-80,"z":10},"position":{"x":[38,38,20,20],"y":[38,35,55,58],"z":[0,0,15,15]},"width":[0,1,2,0],"height":[0,1,2,2],"texture":[63,63,13]},"balls":{"section_segments":13,"angle":0,"offset":{"x":0,"y":0,"z":20},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-7.8,-7.5,-6.6,-4.5,0,4.5,6.6,7.5,7.8],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,3,5.1,7.199999999999999,8.4,7.199999999999999,5.1,3,0],"height":[0,3,5.1,7.199999999999999,8.4,7.199999999999999,5.1,3,0],"texture":[17]},"balls2":{"section_segments":13,"angle":90,"offset":{"x":0,"y":0,"z":20},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-7.8,-7.5,-6.6,-4.5,0,4.5,6.6,7.5,7.8],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,3,5.1,7.199999999999999,8.4,7.199999999999999,5.1,3,0],"height":[0,3,5.1,7.199999999999999,8.4,7.199999999999999,5.1,3,0],"texture":[17]},"balls3":{"section_segments":13,"angle":45,"offset":{"x":0,"y":0,"z":20},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-7.8,-7.5,-6.6,-4.5,0,4.5,6.6,7.5,7.8],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,3,5.1,7.199999999999999,8.4,7.199999999999999,5.1,3,0],"height":[0,3,5.1,7.199999999999999,8.4,7.199999999999999,5.1,3,0],"texture":[17]},"balls4":{"section_segments":13,"angle":135,"offset":{"x":0,"y":0,"z":20},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-7.8,-7.5,-6.6,-4.5,0,4.5,6.6,7.5,7.8],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,3,5.1,7.199999999999999,8.4,7.199999999999999,5.1,3,0],"height":[0,3,5.1,7.199999999999999,8.4,7.199999999999999,5.1,3,0],"texture":[17]},"poker1":{"section_segments":12,"offset":{"x":0.01,"y":0,"z":20},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[10,20,21,23,24,49,53,51,55,56],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,1,2,3,6,10,6,4,4,0],"height":[0,1,2,3,6,10,6,4,4,0],"angle":45,"texture":[18,17,4,18,4,18,13,17,18]},"poker2":{"section_segments":12,"offset":{"x":0.01,"y":0,"z":20},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[10,20,21,23,24,49,53,51,55,56],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,1,2,3,6,10,6,4,4,0],"height":[0,1,2,3,6,10,6,4,4,0],"angle":135,"texture":[18,17,4,18,4,18,13,17,18]},"poker3":{"section_segments":12,"offset":{"x":0.01,"y":0,"z":20},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[10,20,21,23,24,49,53,51,55,56],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,1,2,3,6,10,6,4,4,0],"height":[0,1,2,3,6,10,6,4,4,0],"angle":90,"texture":[18,17,4,18,4,18,13,17,18]},"poker4":{"section_segments":12,"offset":{"x":0.01,"y":0,"z":20},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[10,20,21,23,24,49,53,51,55,56],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,1,2,3,6,10,6,4,4,0],"height":[0,1,2,3,6,10,6,4,4,0],"angle":180,"texture":[18,17,4,18,4,18,13,17,18]},"poker5":{"section_segments":12,"offset":{"x":0.01,"y":0,"z":20},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[10,20,21,23,24,49,53,51,55,56],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,1,2,3,6,10,6,4,4,0],"height":[0,1,2,3,6,10,6,4,4,0],"angle":0,"texture":[18,17,4,18,4,18,13,17,18]},"disc1":{"section_segments":16,"angle":22.5,"offset":{"x":0.01,"y":0,"z":20},"position":{"x":[35,35,35,35,35,35,35,35,35,35,35],"y":[0,0,-2.5,-2.5,0,2.5,2.5,0,0,0],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[18,18,18,18,19,19,19,18,18,18],"height":[19,19,19,21,22,22,22,21,19,19],"texture":[63]},"disc2":{"section_segments":16,"angle":67.5,"offset":{"x":0.01,"y":0,"z":20},"position":{"x":[35,35,35,35,35,35,35,35,35,35,35],"y":[0,0,-2.5,-2.5,0,2.5,2.5,0,0,0],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[18,18,18,18,19,19,19,18,18,18],"height":[19,19,19,21,22,22,22,21,19,19],"texture":[63]},"disc3":{"section_segments":16,"angle":-22.5,"offset":{"x":0.01,"y":0,"z":20},"position":{"x":[35,35,35,35,35,35,35,35,35,35,35],"y":[0,0,-2.5,-2.5,0,2.5,2.5,0,0,0],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[18,18,18,18,19,19,19,18,18,18],"height":[19,19,19,21,22,22,22,21,19,19],"texture":[63]},"disc4":{"section_segments":16,"angle":-67.5,"offset":{"x":0.01,"y":0,"z":20},"position":{"x":[35,35,35,35,35,35,35,35,35,35,35],"y":[0,0,-2.5,-2.5,0,2.5,2.5,0,0,0],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[18,18,18,18,19,19,19,18,18,18],"height":[19,19,19,21,22,22,22,21,19,19],"texture":[63]},"disc5":{"section_segments":16,"offset":{"x":60,"y":2,"z":25},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[1,1,-5,-5,-2,-2,-2,1,1,1],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[17,17,17,18,19,19,19,18,17,17],"height":[17,17,17,18,19,19,19,18,17,17],"texture":[4]},"disc6":{"section_segments":16,"offset":{"x":60,"y":12,"z":20},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[1,1,-5,-5,-2,-2,-2,1,1,1],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[17,17,17,18,19,19,19,18,17,17],"height":[17,17,17,18,19,19,19,18,17,17],"texture":[17]},"disc7":{"section_segments":16,"offset":{"x":60,"y":-8,"z":20},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[1,1,-5,-5,-2,-2,-2,1,1,1],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[17,17,17,18,19,19,19,18,17,17],"height":[17,17,17,18,19,19,19,18,17,17],"texture":[17]},"disc8":{"vertical":true,"section_segments":16,"offset":{"x":12,"y":32,"z":-42},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,0,-3,-3,-2,-2,-2,0,0,1],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[17,17,17,18,19,19,19,18,17,17],"height":[17,17,17,18,19,19,19,18,17,17],"texture":[17]},"disc9":{"vertical":true,"section_segments":16,"offset":{"x":11,"y":25,"z":-47},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,0,-3,-3,-2,-2,-2,0,0,1],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[17,17,17,18,19,19,19,18,17,17],"height":[17,17,17,18,19,19,19,18,17,17],"texture":[17]},"disc10":{"vertical":true,"section_segments":16,"offset":{"x":10,"y":18,"z":-52},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,0,-3,-3,-2,-2,-2,0,0,1],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[17,17,17,18,19,19,19,18,17,17],"height":[17,17,17,18,19,19,19,18,17,17],"texture":[17]}},"wings":{"spike1":{"doubleside":true,"offset":{"x":70,"y":-20,"z":10},"length":[10,0,15],"width":[50,20,170,30],"angle":[0,0,0],"position":[30,-30,0,30],"texture":[4,63,63],"bump":{"position":40,"size":15}},"spike2":{"doubleside":true,"offset":{"x":-70,"y":-20,"z":10},"length":[10,0,12],"width":[50,20,120,0],"angle":[0,0,0],"position":[30,-30,-20,20],"texture":[4,1,1],"bump":{"position":40,"size":15}}},"typespec":{"name":"Hellfire","level":6,"model":7,"code":607,"specs":{"shield":{"capacity":[400,550],"reload":[10,15]},"generator":{"capacity":[400,800],"reload":[150,250]},"ship":{"mass":500,"speed":[90,105],"rotation":[30,40],"acceleration":[60,80]}},"shape":[6.387,6.044,5.418,4.987,6.764,7.656,7.337,6.651,6.17,5.842,5.628,5.517,5.518,5.552,5.685,5.698,5.726,5.877,5.979,3.248,3.241,3.767,4.105,4.334,4.251,4.184,4.251,4.334,4.105,3.767,3.241,3.248,5.979,5.877,5.726,5.698,5.685,5.552,5.518,5.517,5.628,5.842,6.17,6.651,7.337,7.656,6.764,4.987,5.418,6.044],"lasers":[{"x":4.06,"y":-5.22,"z":0.58,"angle":0,"damage":[10,15],"rate":10,"type":2,"speed":[400,500],"number":1,"spread":0,"error":0,"recoil":15},{"x":-4.06,"y":-5.22,"z":0.58,"angle":0,"damage":[10,15],"rate":10,"type":2,"speed":[400,500],"number":1,"spread":0,"error":0,"recoil":15},{"x":4.06,"y":-5.22,"z":0.58,"angle":0,"damage":[10,15],"rate":10,"type":2,"speed":[350,450],"number":1,"spread":0,"error":0,"recoil":15},{"x":-4.06,"y":-5.22,"z":0.58,"angle":0,"damage":[10,15],"rate":10,"type":2,"speed":[350,450],"number":1,"spread":0,"error":0,"recoil":15},{"x":4.06,"y":-5.22,"z":0.58,"angle":0,"damage":[10,15],"rate":10,"type":2,"speed":[300,400],"number":1,"spread":0,"error":0,"recoil":15},{"x":-4.06,"y":-5.22,"z":0.58,"angle":0,"damage":[10,15],"rate":10,"type":2,"speed":[300,400],"number":1,"spread":0,"error":0,"recoil":15}],"radius":7.656,"next":[704,705]}}';
var U_10_Thunder_608 = '{"name":"U-10 Thunder","level":6,"model":8,"size":2.2,"specs":{"shield":{"capacity":[300,500],"reload":[10,15]},"generator":{"capacity":[600,950],"reload":[100,200]},"ship":{"mass":400,"speed":[70,90],"rotation":[50,70],"acceleration":[60,110]}},"bodies":{"main":{"section_segments":10,"offset":{"x":0,"y":10,"z":10},"position":{"x":[0,0,0,0,0,0],"y":[0,-5,20,50,100,90,100],"z":[0,0,0,0,0,0]},"width":[0,8,15,20,10,0],"height":[0,5,11,20,10,0],"texture":[12,63,63,10,12],"propeller":true},"cockpit":{"section_segments":[40,90,180,270,320],"offset":{"x":0,"y":-5,"z":26},"position":{"x":[0,0,0,0],"y":[25,50,65,105],"z":[-7,-4,-4,-4]},"width":[5,12,12,5],"height":[0,12,15,0],"texture":[8.98,8.98,4]},"uwings":{"section_segments":12,"offset":{"x":50,"y":0,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[10,10,-10,0,70,80,75,83,80],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,22,22,25,25,22,15,15,0],"height":[0,22,22,25,25,22,15,15,0],"texture":[12,4,4,13,4,13,17,18],"propeller":true},"cannon":{"section_segments":12,"offset":{"x":57,"y":-80,"z":3},"position":{"x":[0,0,0,0,0,0,0],"y":[-71,-70,-75,-50,0,100],"z":[0,0,0,0,0,0,0]},"width":[0,3,5,5,5,5,5],"height":[0,3,5,5,5,5],"texture":[5,4,13,18,3,63,4]},"cannon2":{"section_segments":12,"offset":{"x":43,"y":-80,"z":3},"position":{"x":[0,0,0,0,0,0,0],"y":[-71,-70,-75,-50,0,100],"z":[0,0,0,0,0,0,0]},"width":[0,3,5,5,5,5,5],"height":[0,3,5,5,5,5],"texture":[5,4,13,18,3,63,4]},"cannon3":{"section_segments":12,"offset":{"x":43,"y":-80,"z":-22},"position":{"x":[0,0,0,0,0,0,0],"y":[-71,-70,-75,-50,0,100],"z":[0,0,0,0,0,0,0]},"width":[0,3,5,5,5,5,5],"height":[0,3,5,5,5,5],"texture":[5,4,13,18,3,63,4],"laser":{"damage":[40,60],"rate":10,"type":2,"speed":[190,240],"recoil":100,"number":1,"error":0}},"cannon4":{"section_segments":12,"offset":{"x":57,"y":-80,"z":-22},"position":{"x":[0,0,0,0,0,0,0],"y":[-71,-70,-75,-50,0,100],"z":[0,0,0,0,0,0,0]},"width":[0,3,5,5,5,5,5],"height":[0,3,5,5,5,5],"texture":[5,4,13,18,3,63,4]},"cannon5":{"section_segments":12,"offset":{"x":36,"y":-80,"z":-10},"position":{"x":[0,0,0,0,0,0,0],"y":[-71,-70,-75,-50,0,100],"z":[0,0,0,0,0,0,0]},"width":[0,3,5,5,5,5,5],"height":[0,3,5,5,5,5],"texture":[5,4,13,18,3,63,4]},"cannon6":{"section_segments":12,"offset":{"x":65,"y":-80,"z":-10},"position":{"x":[0,0,0,0,0,0,0],"y":[-71,-70,-75,-50,0,100],"z":[0,0,0,0,0,0,0]},"width":[0,3,5,5,5,5,5],"height":[0,3,5,5,5,5],"texture":[5,4,13,18,3,63,4]},"lights":{"section_segments":12,"offset":{"x":50,"y":-80,"z":-10},"position":{"x":[0,0,0,0,0,0,0],"y":[-45,-45,100],"z":[0,0,0,0,0,0,0]},"width":[0,8,8,5,5,5],"height":[0,8,8,5,5],"texture":[5,17,13,18,3,63,4]},"disc1":{"section_segments":12,"offset":{"x":50,"y":-135,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[8,8,0,0,0,0,0,8,8,8],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,0,0,22,22,22,22,22,0,0],"height":[0,0,0,22,22,22,22,22,0,0],"texture":[11]},"disc2":{"section_segments":12,"offset":{"x":50,"y":-15,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[3,3,-8,-8,-8,-8,-8,3,3,3],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,0,0,24,24,24,24,24,0,0],"height":[0,0,0,24,24,24,24,24,0,0],"texture":[2]},"disc3":{"section_segments":6,"offset":{"x":50,"y":-17,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[3,3,-3,-3,-3,-3,-3,3,3,3],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,0,0,25,25,25,25,25,0,0],"height":[0,0,0,25,25,25,25,25,0,0],"texture":[4]},"engines":{"section_segments":10,"offset":{"x":20,"y":45,"z":10},"position":{"x":[-10,-10,0,0,0,0,0,0,0,0],"y":[-20,-30,15,35,40,50,55,60,55],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,5,10,10,10,5,5,5,0],"height":[0,5,10,10,10,5,5,5,0],"propeller":true,"texture":[6,3,18,4,63,18,17,12]},"engines2":{"section_segments":10,"offset":{"x":65,"y":35,"z":10},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-5,-20,5,40,50,55,45],"z":[0,0,0,0,0,0,0,0]},"width":[0,3,5,5,5,5,0],"height":[0,3,5,5,5,5,0],"texture":[18,63,8,12,17,18],"propeller":true},"engines3":{"section_segments":10,"offset":{"x":35,"y":35,"z":10},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-5,-20,5,40,50,55,45],"z":[0,0,0,0,0,0,0,0]},"width":[0,3,5,5,5,5,0],"height":[0,3,5,5,5,5,0],"texture":[18,63,8,12,17,18],"propeller":true},"engines4":{"section_segments":10,"offset":{"x":65,"y":35,"z":-30},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-5,-20,5,40,50,55,45],"z":[0,0,0,0,0,0,0,0]},"width":[0,3,5,5,5,5,0],"height":[0,3,5,5,5,5,0],"texture":[18,63,8,12,17,18],"propeller":true},"engines5":{"section_segments":10,"offset":{"x":35,"y":35,"z":-30},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-5,-20,5,40,50,55,45],"z":[0,0,0,0,0,0,0,0]},"width":[0,3,5,5,5,5,0],"height":[0,3,5,5,5,5,0],"texture":[18,63,8,12,17,18],"propeller":true},"cannon_detail1":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":80,"y":30,"z":-5},"position":{"x":[-12,0,0,0,-12],"y":[-20,0,20,30,47],"z":[0,0,0,0,0]},"width":[0,15,15,15,0],"height":[10,15,15,15,10],"texture":[63,10,13,3]},"cannon_detail2":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":50,"y":14,"z":15},"position":{"x":[0,0,0,0,0],"y":[-20,-20,10,20,30],"z":[0,0,0,0,0]},"width":[0,5,20,20,10],"height":[0,5,5,5,0],"texture":[2,18,4,3]},"cannon_detail3":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":20,"y":-35,"z":-5},"position":{"x":[0,0,0,10,20],"y":[-20,-20,20,35,50],"z":[0,0,0,0,0]},"width":[0,5,5,15,0],"height":[0,5,5,5,5],"texture":[63,63,13,3]},"energy":{"vertical":true,"angle":0,"section_segments":14,"offset":{"x":50,"y":10,"z":-45},"position":{"x":[0,0,0,0,0,0,0],"y":[0,5,9,10,9,7],"z":[0,0,0,0,0,0,0]},"width":[23,22,20,17,7,0],"height":[23,22,20,17,7,0],"texture":[63,4,17,11,17]}},"wings":{"main":{"doubleside":true,"offset":{"x":10,"y":55,"z":10},"length":[50],"width":[60,30],"angle":[-10],"position":[0,-30],"texture":[18],"bump":{"position":10,"size":10}},"shields1":{"doubleside":true,"offset":{"x":55,"y":40,"z":-40},"length":[0,25,30,15],"width":[50,50,115,115,50,50],"angle":[40,40,90,110],"position":[20,0,0,0,20],"texture":[4],"bump":{"position":0,"size":3}},"shields2":{"doubleside":true,"offset":{"x":-45,"y":45,"z":-40},"length":[0,25,30,15],"width":[40,40,95,95,40,40],"angle":[40,40,90,110],"position":[20,0,0,0,20],"texture":[4],"bump":{"position":0,"size":3}}},"typespec":{"name":"U-10 Thunder","level":6,"model":8,"code":608,"specs":{"shield":{"capacity":[300,500],"reload":[10,15]},"generator":{"capacity":[600,950],"reload":[100,200]},"ship":{"mass":400,"speed":[70,90],"rotation":[50,70],"acceleration":[60,110]}},"shape":[0,0,7.14,7.483,7.233,5.737,4.828,4.203,3.785,3.505,3.41,3.361,3.309,3.36,3.654,4.329,4.592,4.814,4.733,5.144,5.39,4.324,4.329,4.747,4.858,4.849,4.858,4.747,4.329,4.324,5.39,5.144,4.733,4.814,4.592,4.329,3.654,3.36,3.309,3.361,3.41,3.505,3.785,4.203,4.828,5.737,7.233,7.483,7.14,0],"lasers":[{"x":1.892,"y":-6.82,"z":-0.968,"angle":0,"damage":[40,60],"rate":10,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":100},{"x":-1.892,"y":-6.82,"z":-0.968,"angle":0,"damage":[40,60],"rate":10,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":100}],"radius":7.483}}';
 
//Tier 7
var U_Wall_701 = '{"name":"U-Wall","level":7,"model":1,"size":1.8,"specs":{"shield":{"capacity":[800,800],"reload":[20,20]},"generator":{"capacity":[3500,3500],"reload":[700,700]},"ship":{"mass":800,"speed":[110,110],"rotation":[10,10],"acceleration":[110,110]}},"bodies":{"main":{"section_segments":10,"offset":{"x":0,"y":-10,"z":9},"position":{"x":[0,0,0,0,0,0],"y":[0,-15,20,50,100,90,100],"z":[0,0,0,0,0,0]},"width":[0,10,20,20,10,0],"height":[0,5,11,10,10,0],"texture":[12,1,1,10,12],"propeller":true},"cockpit":{"section_segments":[40,90,180,270,320],"offset":{"x":0,"y":-25,"z":19},"position":{"x":[0,0,0,0],"y":[20,50,75,95],"z":[0,0,0,0]},"width":[5,11,12,5],"height":[0,12,12,0],"texture":[8.98,8.98,3]},"line":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":0,"y":-105,"z":-40},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-110,-110,-90,-90,-40,65,120,120],"z":[0,0,0,0,0,20,20,20]},"width":[0,5,5,13,13,13,13,3],"height":[0,5,5,5,35,40,40,0],"texture":[2,63,2,4,4]},"u_wings":{"section_segments":8,"offset":{"x":50,"y":-20,"z":-20},"position":{"x":[0,0,0,0,0,0],"y":[-140,-180,50,90,90,100],"z":[0,0,0,0,0,0]},"width":[0,10,35,20,0],"height":[0,25,35,20,0],"texture":[12,2,3,4]},"c1":{"section_segments":12,"offset":{"x":75,"y":-90,"z":-7},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-60,-70,-67,-65,-50,-50,0,10,15,20,30,80,90],"z":[0,0,0,0,0,0,0,-5,-5,-5,-5,-5,-5,0]},"width":[0,5,5,5,5,4,4,10,10,10,20,20,15,0],"height":[0,5,5,5,5,4,4,10,10,10,10,10,0],"laser":{"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"recoil":20,"number":1,"error":0},"texture":[17,4,17,18,4,13,8,63,18,3,8,3]},"c2":{"section_segments":12,"offset":{"x":95,"y":-90,"z":-7},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-60,-70,-67,-65,-50,-50,0,10,15,20,30,80,90],"z":[0,0,0,0,0,0,0,-5,-5,-5,-5,-5,-5,0]},"width":[0,5,5,5,5,4,4,10,10,10,20,20,15,0],"height":[0,5,5,5,5,4,4,10,10,10,10,10,0],"laser":{"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"recoil":20,"number":1,"error":0},"texture":[17,4,17,18,4,13,8,63,18,3,8,3]},"c3":{"section_segments":12,"offset":{"x":125,"y":-35,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0,10,10,10,0],"y":[-60,-70,-67,-65,-50,-50,0,10,15,20,30,80,90],"z":[0,0,0,0,0,0,0,-5,-5,-5,-5,-5,-5,0]},"width":[0,5,5,5,5,4,4,10,10,10,20,20,15,0],"height":[0,5,5,5,5,4,4,10,10,10,10,10,0],"laser":{"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"recoil":20,"number":1,"error":0},"texture":[17,4,17,18,4,13,8,63,18,3,8,3]},"c4":{"section_segments":12,"offset":{"x":145,"y":-35,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0,-10,-10,-10,0],"y":[-60,-70,-67,-65,-50,-50,0,10,15,20,30,80,90],"z":[0,0,0,0,0,0,0,-5,-5,-5,-5,-5,-5,0]},"width":[0,5,5,5,5,4,4,10,10,10,20,20,15,0],"height":[0,5,5,5,5,4,4,10,10,10,10,10,0],"laser":{"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"recoil":20,"number":1,"error":0},"texture":[17,4,17,18,4,13,8,63,18,3,8,3]},"c5":{"section_segments":12,"offset":{"x":175,"y":-75,"z":-7},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-60,-70,-67,-65,-50,-50,0,10,15,20,30,80,90],"z":[0,0,0,0,0,0,0,-5,-5,-5,-5,-5,-5,0]},"width":[0,5,5,5,5,4,4,10,10,10,20,20,15,0],"height":[0,5,5,5,5,4,4,10,10,10,10,10,0],"laser":{"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"recoil":20,"number":1,"error":0},"texture":[17,4,17,18,4,13,8,63,18,3,8,3]},"c6":{"section_segments":12,"offset":{"x":195,"y":-75,"z":-7},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-60,-70,-67,-65,-50,-50,0,10,15,20,30,80,90],"z":[0,0,0,0,0,0,0,-5,-5,-5,-5,-5,-5,0]},"width":[0,5,5,5,5,4,4,10,10,10,20,20,15,0],"height":[0,5,5,5,5,4,4,10,10,10,10,10,0],"laser":{"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"recoil":20,"number":1,"error":0},"texture":[17,4,17,18,4,13,8,63,18,3,8,3]},"c7":{"section_segments":12,"offset":{"x":225,"y":-30,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0,10,10,10,0],"y":[-60,-70,-67,-65,-50,-50,0,10,15,20,30,80,90],"z":[0,0,0,0,0,0,0,-5,-5,-5,-5,-5,-5,0]},"width":[0,5,5,5,5,4,4,10,10,10,20,20,15,0],"height":[0,5,5,5,5,4,4,10,10,10,10,10,0],"laser":{"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"recoil":20,"number":1,"error":0},"texture":[17,4,17,18,4,13,8,63,18,3,8,3]},"c8":{"section_segments":12,"offset":{"x":245,"y":-30,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0,-10,-10,-10,0],"y":[-60,-70,-67,-65,-50,-50,0,10,15,20,30,80,90],"z":[0,0,0,0,0,0,0,-5,-5,-5,-5,-5,-5,0]},"width":[0,5,5,5,5,4,4,10,10,10,20,20,15,0],"height":[0,5,5,5,5,4,4,10,10,10,10,10,0],"laser":{"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"recoil":20,"number":1,"error":0},"texture":[17,4,17,18,4,13,8,63,18,3,8,3]},"c9":{"section_segments":12,"offset":{"x":275,"y":-55,"z":-7},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-60,-70,-67,-65,-50,-50,0,10,15,20,30,80,90],"z":[0,0,0,0,0,0,0,-5,-5,-5,-5,-5,-5,0]},"width":[0,5,5,5,5,4,4,10,10,10,20,20,15,0],"height":[0,5,5,5,5,4,4,10,10,10,10,10,0],"laser":{"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"recoil":20,"number":1,"error":0},"texture":[17,4,17,18,4,13,8,63,18,3,8,3]},"c10":{"section_segments":12,"offset":{"x":295,"y":-55,"z":-7},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-60,-70,-67,-65,-50,-50,0,10,15,20,30,80,90],"z":[0,0,0,0,0,0,0,-5,-5,-5,-5,-5,-5,0]},"width":[0,5,5,5,5,4,4,10,10,10,20,20,15,0],"height":[0,5,5,5,5,4,4,10,10,10,10,10,0],"laser":{"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"recoil":20,"number":1,"error":0},"texture":[17,4,17,18,4,13,8,63,18,3,8,3]},"c11":{"section_segments":12,"offset":{"x":325,"y":-25,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0,10,10,10,0],"y":[-60,-70,-67,-65,-50,-50,0,10,15,20,30,80,90],"z":[0,0,0,0,0,0,0,-5,-5,-5,-5,-5,-5,0]},"width":[0,5,5,5,5,4,4,10,10,10,20,20,15,0],"height":[0,5,5,5,5,4,4,10,10,10,10,10,0],"laser":{"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"recoil":20,"number":1,"error":0},"texture":[17,4,17,18,4,13,8,63,18,3,8,3]},"c12":{"section_segments":12,"offset":{"x":345,"y":-25,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0,-10,-10,-10,0],"y":[-60,-70,-67,-65,-50,-50,0,10,15,20,30,80,90],"z":[0,0,0,0,0,0,0,-5,-5,-5,-5,-5,-5,0]},"width":[0,5,5,5,5,4,4,10,10,10,20,20,15,0],"height":[0,5,5,5,5,4,4,10,10,10,10,10,0],"laser":{"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"recoil":20,"number":1,"error":0},"texture":[17,4,17,18,4,13,8,63,18,3,8,3]},"c13":{"section_segments":12,"offset":{"x":375,"y":-40,"z":-7},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-60,-70,-67,-65,-50,-50,0,10,15,20,30,80,90],"z":[0,0,0,0,0,0,0,-5,-5,-5,-5,-5,-5,0]},"width":[0,5,5,5,5,4,4,10,10,10,20,20,15,0],"height":[0,5,5,5,5,4,4,10,10,10,10,10,0],"laser":{"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"recoil":20,"number":1,"error":0},"texture":[17,4,17,18,4,13,8,63,18,3,8,3]},"c14":{"section_segments":12,"offset":{"x":395,"y":-40,"z":-7},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-60,-70,-67,-65,-50,-50,0,10,15,20,30,80,90],"z":[0,0,0,0,0,0,0,-5,-5,-5,-5,-5,-5,0]},"width":[0,5,5,5,5,4,4,10,10,10,20,20,15,0],"height":[0,5,5,5,5,4,4,10,10,10,10,10,0],"laser":{"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"recoil":20,"number":1,"error":0},"texture":[17,4,17,18,4,13,8,63,18,3,8,3]},"c15":{"section_segments":12,"offset":{"x":425,"y":-30,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0,10,10,10,0],"y":[-60,-70,-67,-65,-50,-50,0,10,15,20,30,80,90],"z":[0,0,0,0,0,0,0,-5,-5,-5,-5,-5,-5,0]},"width":[0,5,5,5,5,4,4,10,10,10,20,20,15,0],"height":[0,5,5,5,5,4,4,10,10,10,10,10,0],"laser":{"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"recoil":20,"number":1,"error":0},"texture":[17,4,17,18,4,13,8,63,18,3,8,3]},"c16":{"section_segments":12,"offset":{"x":445,"y":-30,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0,-10,-10,-10,0],"y":[-60,-70,-67,-65,-50,-50,0,10,15,20,30,80,90],"z":[0,0,0,0,0,0,0,-5,-5,-5,-5,-5,-5,0]},"width":[0,5,5,5,5,4,4,10,10,10,20,20,15,0],"height":[0,5,5,5,5,4,4,10,10,10,10,10,0],"laser":{"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"recoil":20,"number":1,"error":0},"texture":[17,4,17,18,4,13,8,63,18,3,8,3]},"c17":{"section_segments":12,"offset":{"x":475,"y":-20,"z":-12},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-60,-70,-67,-65,-50,-50,0,10,15,20,30,80,90],"z":[0,0,0,0,0,0,0,-5,-5,-5,-5,-5,-5,0]},"width":[0,5,5,5,5,4,4,10,10,10,20,20,15,0],"height":[0,5,5,5,5,4,4,10,10,10,10,10,0],"laser":{"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"recoil":20,"number":1,"error":0},"texture":[17,4,17,18,4,13,8,63,18,3,8,3]},"c18":{"section_segments":12,"offset":{"x":495,"y":-20,"z":-12},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-60,-70,-67,-65,-50,-50,0,10,15,20,30,80,90],"z":[0,0,0,0,0,0,0,-5,-5,-5,-5,-5,-5,0]},"width":[0,5,5,5,5,4,4,10,10,10,20,20,15,0],"height":[0,5,5,5,5,4,4,10,10,10,10,10,0],"laser":{"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"recoil":20,"number":1,"error":0},"texture":[17,4,17,18,4,13,8,63,18,3,8,3]},"c19":{"section_segments":12,"offset":{"x":525,"y":-15,"z":-12},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-60,-70,-67,-65,-50,-50,0,10,15,20,30,80,90],"z":[0,0,0,0,0,0,0,-5,-5,-5,-5,-5,-5,0]},"width":[0,5,5,5,5,4,4,10,10,10,20,20,15,0],"height":[0,5,5,5,5,4,4,10,10,10,10,10,0],"laser":{"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"recoil":20,"number":1,"error":0},"texture":[17,4,17,18,4,13,8,63,18,3,8,3]},"c20":{"section_segments":12,"offset":{"x":545,"y":-15,"z":-12},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-60,-70,-67,-65,-50,-50,0,10,15,20,30,80,90],"z":[0,0,0,0,0,0,0,-5,-5,-5,-5,-5,-5,0]},"width":[0,5,5,5,5,4,4,10,10,10,20,20,15,0],"height":[0,5,5,5,5,4,4,10,10,10,10,10,0],"laser":{"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"recoil":20,"number":1,"error":0},"texture":[17,4,17,18,4,13,8,63,18,3,8,3]},"c21":{"section_segments":12,"offset":{"x":575,"y":-13,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-60,-70,-67,-65,-50,-50,0,10,15,20,30,80,90],"z":[0,0,0,0,0,0,0,-5,-5,-5,-5,-5,-5,0]},"width":[0,5,5,5,5,4,4,10,10,10,20,20,15,0],"height":[0,5,5,5,5,4,4,10,10,10,10,10,0],"laser":{"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"recoil":20,"number":1,"error":0},"texture":[17,4,17,18,4,13,8,63,18,3,8,3]},"c22":{"section_segments":12,"offset":{"x":595,"y":-13,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-60,-70,-67,-65,-50,-50,0,10,15,20,30,80,90],"z":[0,0,0,0,0,0,0,-5,-5,-5,-5,-5,-5,0]},"width":[0,5,5,5,5,4,4,10,10,10,20,20,15,0],"height":[0,5,5,5,5,4,4,10,10,10,10,10,0],"laser":{"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"recoil":20,"number":1,"error":0},"texture":[17,4,17,18,4,13,8,63,18,3,8,3]},"c23":{"section_segments":12,"offset":{"x":625,"y":-12,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-60,-70,-67,-65,-50,-50,0,10,15,20,30,80,90],"z":[0,0,0,0,0,0,0,-5,-5,-5,-5,-5,-5,0]},"width":[0,5,5,5,5,4,4,10,10,10,20,20,15,0],"height":[0,5,5,5,5,4,4,10,10,10,10,10,0],"laser":{"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"recoil":20,"number":1,"error":0},"texture":[17,4,17,18,4,13,8,63,18,3,8,3]},"c24":{"section_segments":12,"offset":{"x":645,"y":-12,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-60,-70,-67,-65,-50,-50,0,10,15,20,30,80,90],"z":[0,0,0,0,0,0,0,-5,-5,-5,-5,-5,-5,0]},"width":[0,5,5,5,5,4,4,10,10,10,20,20,15,0],"height":[0,5,5,5,5,4,4,10,10,10,10,10,0],"laser":{"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"recoil":20,"number":1,"error":0},"texture":[17,4,17,18,4,13,8,63,18,3,8,3]},"c25":{"section_segments":12,"offset":{"x":675,"y":-11,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-60,-70,-67,-65,-50,-50,0,10,15,20,30,80,90],"z":[0,0,0,0,0,0,0,-5,-5,-5,-5,-5,-5,0]},"width":[0,5,5,5,5,4,4,10,10,10,20,20,15,0],"height":[0,5,5,5,5,4,4,10,10,10,10,10,0],"laser":{"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"recoil":20,"number":1,"error":0},"texture":[17,4,17,18,4,13,8,63,18,3,8,3]},"c26":{"section_segments":12,"offset":{"x":695,"y":-11,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-60,-70,-67,-65,-50,-50,0,10,15,20,30,80,90],"z":[0,0,0,0,0,0,0,-5,-5,-5,-5,-5,-5,0]},"width":[0,5,5,5,5,4,4,10,10,10,20,20,15,0],"height":[0,5,5,5,5,4,4,10,10,10,10,10,0],"laser":{"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"recoil":20,"number":1,"error":0},"texture":[17,4,17,18,4,13,8,63,18,3,8,3]},"c27":{"section_segments":12,"offset":{"x":725,"y":-10,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-60,-70,-67,-65,-50,-50,0,10,15,20,30,80,90],"z":[0,0,0,0,0,0,0,-5,-5,-5,-5,-5,-5,0]},"width":[0,5,5,5,5,4,4,10,10,10,20,20,15,0],"height":[0,5,5,5,5,4,4,10,10,10,10,10,0],"laser":{"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"recoil":20,"number":1,"error":0},"texture":[17,4,17,18,4,13,8,63,18,3,8,3]},"c28":{"section_segments":12,"offset":{"x":745,"y":-10,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-60,-70,-67,-65,-50,-50,0,10,15,20,30,80,90],"z":[0,0,0,0,0,0,0,-5,-5,-5,-5,-5,-5,0]},"width":[0,5,5,5,5,4,4,10,10,10,20,20,15,0],"height":[0,5,5,5,5,4,4,10,10,10,10,10,0],"laser":{"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"recoil":20,"number":1,"error":0},"texture":[17,4,17,18,4,13,8,63,18,3,8,3]},"c29":{"section_segments":12,"offset":{"x":775,"y":-9,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-60,-70,-67,-65,-50,-50,0,10,15,20,30,80,90],"z":[0,0,0,0,0,0,0,-5,-5,-5,-5,-5,-5,0]},"width":[0,5,5,5,5,4,4,10,10,10,20,20,15,0],"height":[0,5,5,5,5,4,4,10,10,10,10,10,0],"laser":{"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"recoil":20,"number":1,"error":0},"texture":[17,4,17,18,4,13,8,63,18,3,8,3]},"c30":{"section_segments":12,"offset":{"x":795,"y":-9,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-60,-70,-67,-65,-50,-50,0,10,15,20,30,80,90],"z":[0,0,0,0,0,0,0,-5,-5,-5,-5,-5,-5,0]},"width":[0,5,5,5,5,4,4,10,10,10,20,20,15,0],"height":[0,5,5,5,5,4,4,10,10,10,10,10,0],"laser":{"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"recoil":20,"number":1,"error":0},"texture":[17,4,17,18,4,13,8,63,18,3,8,3]},"c31":{"section_segments":12,"offset":{"x":825,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,10,10,10,0],"y":[-60,-70,-67,-65,-50,-50,0,10,15,20,30,80,90],"z":[0,0,0,0,0,0,0,-5,-5,-5,-5,-5,-5,0]},"width":[0,5,5,5,5,4,4,10,10,10,20,20,15,0],"height":[0,5,5,5,5,4,4,10,10,10,10,10,0],"laser":{"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"recoil":20,"number":1,"error":0},"texture":[17,4,17,18,4,13,8,63,18,3,8,3]},"c32":{"section_segments":12,"offset":{"x":845,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,-10,-10,-10,0],"y":[-60,-70,-67,-65,-50,-50,0,10,15,20,30,80,90],"z":[0,0,0,0,0,0,0,-5,-5,-5,-5,-5,-5,0]},"width":[0,5,5,5,5,4,4,10,10,10,20,20,15,0],"height":[0,5,5,5,5,4,4,10,10,10,10,10,0],"laser":{"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"recoil":20,"number":1,"error":0},"texture":[17,4,17,18,4,13,8,63,18,3,8,3]},"e1":{"section_segments":12,"offset":{"x":30,"y":30,"z":-40},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-40,-30,10,15,35,40,60,63,60],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,10,10,13,13,10,10,10,0],"height":[0,10,10,13,13,10,10,10,0],"texture":[2,13,2,11,2,12,17],"propeller":true},"e2":{"section_segments":12,"offset":{"x":70,"y":30,"z":-40},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-40,-30,10,15,35,40,60,63,60],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,10,10,13,13,10,10,10,0],"height":[0,10,10,13,13,10,10,10,0],"texture":[2,13,2,11,2,12,17],"propeller":true},"e3":{"section_segments":12,"offset":{"x":130,"y":20,"z":-30},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-40,-30,10,15,35,40,60,63,60],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,10,10,13,13,10,10,10,0],"height":[0,10,10,13,13,10,10,10,0],"texture":[2,13,2,11,2,12,17],"propeller":true},"e4":{"section_segments":12,"offset":{"x":170,"y":20,"z":-30},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-40,-30,10,15,35,40,60,63,60],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,10,10,13,13,10,10,10,0],"height":[0,10,10,13,13,10,10,10,0],"texture":[2,13,2,11,2,12,17],"propeller":true},"e5":{"section_segments":12,"offset":{"x":220,"y":50,"z":-20},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-40,-30,10,15,35,40,60,63,60],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,20,20,25,25,20,20,20,0],"height":[0,20,20,25,25,20,20,20,0],"texture":[2,13,2,11,2,12,17],"propeller":true},"e6":{"section_segments":12,"offset":{"x":280,"y":25,"z":-25},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-40,-30,10,15,35,40,60,63,60],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,10,10,13,13,10,10,10,0],"height":[0,10,10,13,13,10,10,10,0],"texture":[2,13,2,11,2,12,17],"propeller":true},"e7":{"section_segments":12,"offset":{"x":320,"y":25,"z":-25},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-40,-30,10,15,35,40,60,63,60],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,10,10,13,13,10,10,10,0],"height":[0,10,10,13,13,10,10,10,0],"texture":[2,13,2,11,2,12,17],"propeller":true},"e8":{"section_segments":12,"offset":{"x":380,"y":55,"z":-15},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-40,-30,10,15,35,40,60,63,60],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,20,20,25,25,20,20,20,0],"height":[0,20,20,25,25,20,20,20,0],"texture":[2,13,2,11,2,12,17],"propeller":true},"e9":{"section_segments":12,"offset":{"x":430,"y":30,"z":-25},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-40,-30,10,15,35,40,60,63,60],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,10,10,13,13,10,10,10,0],"height":[0,10,10,13,13,10,10,10,0],"texture":[2,13,2,11,2,12,17],"propeller":true},"e10":{"section_segments":12,"offset":{"x":470,"y":30,"z":-25},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-40,-30,10,15,35,40,60,63,60],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,10,10,13,13,10,10,10,0],"height":[0,10,10,13,13,10,10,10,0],"texture":[2,13,2,11,2,12,17],"propeller":true},"e11":{"section_segments":12,"offset":{"x":580,"y":35,"z":-30},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-40,-30,10,15,35,40,60,63,60],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,20,20,25,25,20,20,20,0],"height":[0,20,20,25,25,20,20,20,0],"texture":[2,13,2,11,2,12,17],"propeller":true},"e12":{"section_segments":12,"offset":{"x":610,"y":35,"z":-30},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-40,-30,10,15,35,40,60,63,60],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,10,10,13,13,10,10,10,0],"height":[0,10,10,13,13,10,10,10,0],"texture":[2,13,2,11,2,12,17],"propeller":true},"e13":{"section_segments":12,"offset":{"x":740,"y":35,"z":-15},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-40,-30,10,15,35,40,60,63,60],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,10,10,13,13,10,10,10,0],"height":[0,10,10,13,13,10,10,10,0],"texture":[2,13,2,11,2,12,17],"propeller":true},"e14":{"section_segments":12,"offset":{"x":760,"y":35,"z":-15},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-40,-30,10,15,35,40,60,63,60],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,10,10,13,13,10,10,10,0],"height":[0,10,10,13,13,10,10,10,0],"texture":[2,13,2,11,2,12,17],"propeller":true},"e15":{"section_segments":12,"offset":{"x":835,"y":35,"z":-30},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-40,-30,10,15,35,40,60,63,60],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,20,20,25,25,20,20,20,0],"height":[0,20,20,25,25,20,20,20,0],"texture":[2,13,2,11,2,12,17],"propeller":true},"d1":{"vertical":true,"section_segments":20,"offset":{"x":135,"y":10,"z":-35},"position":{"x":[0,0,0,0,0,0,0],"y":[-10,6,5,5,10,13],"z":[0,0,0,0,0,0,0]},"width":[25,19,12,10,7,0],"height":[25,19,12,10,7,0],"texture":[18,18,17,9,9]},"d2":{"vertical":true,"section_segments":20,"offset":{"x":235,"y":10,"z":-40},"position":{"x":[0,0,0,0,0,0,0],"y":[-10,6,5,5,10,13],"z":[0,0,0,0,0,0,0]},"width":[25,19,12,10,7,0],"height":[25,19,12,10,7,0],"texture":[18,18,17,9,9]},"d3":{"vertical":true,"section_segments":20,"offset":{"x":335,"y":10,"z":-45},"position":{"x":[0,0,0,0,0,0,0],"y":[-10,6,5,5,10,13],"z":[0,0,0,0,0,0,0]},"width":[25,19,12,10,7,0],"height":[25,19,12,10,7,0],"texture":[18,18,17,9,9]},"d4":{"vertical":true,"section_segments":20,"offset":{"x":435,"y":10,"z":-50},"position":{"x":[0,0,0,0,0,0,0],"y":[-10,6,5,5,10,13],"z":[0,0,0,0,0,0,0]},"width":[25,19,12,10,7,0],"height":[25,19,12,10,7,0],"texture":[18,18,17,9,9]},"d5":{"vertical":true,"section_segments":20,"offset":{"x":835,"y":0,"z":-70},"position":{"x":[0,0,0,0,0,0,0],"y":[-10,6,5,5,10,13],"z":[0,0,0,0,0,0,0]},"width":[25,19,12,10,7,0],"height":[25,19,12,10,7,0],"texture":[18,18,17,9,9]},"s1":{"section_segments":10,"offset":{"x":30,"y":30,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[0,10,13,25,30,40,60,50],"z":[0,0,0,0,0,0,0,0]},"width":[0,5,10,10,10,5,5,10,5,0],"height":[0,5,10,10,10,5,5,10,5,0],"propeller":true,"texture":[5,2,11,2,63,11,12]}},"wings":{"main":{"doubleside":true,"offset":{"x":0,"y":-20,"z":-45},"length":[850],"width":[260,90],"angle":[1.5],"position":[-40,50],"texture":[4],"bump":{"position":-35,"size":5}},"main2":{"doubleside":true,"offset":{"x":0,"y":0,"z":-20},"length":[250,585],"width":[200,140,80],"angle":[1.5,1.5,1.5,1.5],"position":[-40,0,40],"texture":[3],"bump":{"position":-35,"size":5}},"main3":{"doubleside":true,"offset":{"x":0,"y":-20,"z":-5},"length":[550],"width":[150,90],"angle":[1.5],"position":[0,40],"texture":[8],"bump":{"position":-35,"size":5}},"main4":{"doubleside":true,"offset":{"x":550,"y":-10,"z":0},"length":[250],"width":[70,50],"angle":[1.5],"position":[30,50],"texture":[18],"bump":{"position":-35,"size":5}}},"typespec":{"name":"U-Wall","level":7,"model":1,"code":701,"specs":{"shield":{"capacity":[800,800],"reload":[20,20]},"generator":{"capacity":[3500,3500],"reload":[700,700]},"ship":{"mass":800,"speed":[110,110],"rotation":[10,10],"acceleration":[110,110]}},"shape":[7.741,6.742,7.517,7.135,7.106,7.47,8.101,8.881,10.189,12.183,15.171,23.553,30.704,31.062,27.944,15.014,9.55,8.444,4.216,4.416,4.344,3.382,3.645,3.52,3.258,3.246,3.258,3.52,3.645,3.382,4.344,4.416,4.216,8.444,9.55,15.014,27.944,31.062,30.704,23.553,15.171,12.183,10.189,8.881,8.101,7.47,7.106,7.135,7.517,6.742],"lasers":[{"x":2.7,"y":-5.76,"z":-0.252,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":-2.7,"y":-5.76,"z":-0.252,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":3.42,"y":-5.76,"z":-0.252,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":-3.42,"y":-5.76,"z":-0.252,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":4.5,"y":-3.78,"z":0.36,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":-4.5,"y":-3.78,"z":0.36,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":5.22,"y":-3.78,"z":0.36,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":-5.22,"y":-3.78,"z":0.36,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":6.3,"y":-5.22,"z":-0.252,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":-6.3,"y":-5.22,"z":-0.252,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":7.02,"y":-5.22,"z":-0.252,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":-7.02,"y":-5.22,"z":-0.252,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":8.1,"y":-3.6,"z":0.36,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":-8.1,"y":-3.6,"z":0.36,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":8.82,"y":-3.6,"z":0.36,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":-8.82,"y":-3.6,"z":0.36,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":9.9,"y":-4.5,"z":-0.252,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":-9.9,"y":-4.5,"z":-0.252,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":10.62,"y":-4.5,"z":-0.252,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":-10.62,"y":-4.5,"z":-0.252,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":11.7,"y":-3.42,"z":0.36,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":-11.7,"y":-3.42,"z":0.36,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":12.42,"y":-3.42,"z":0.36,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":-12.42,"y":-3.42,"z":0.36,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":13.5,"y":-3.96,"z":-0.252,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":-13.5,"y":-3.96,"z":-0.252,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":14.22,"y":-3.96,"z":-0.252,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":-14.22,"y":-3.96,"z":-0.252,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":15.3,"y":-3.6,"z":0.36,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":-15.3,"y":-3.6,"z":0.36,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":16.02,"y":-3.6,"z":0.36,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":-16.02,"y":-3.6,"z":0.36,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":17.1,"y":-3.24,"z":-0.432,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":-17.1,"y":-3.24,"z":-0.432,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":17.82,"y":-3.24,"z":-0.432,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":-17.82,"y":-3.24,"z":-0.432,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":18.9,"y":-3.06,"z":-0.432,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":-18.9,"y":-3.06,"z":-0.432,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":19.62,"y":-3.06,"z":-0.432,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":-19.62,"y":-3.06,"z":-0.432,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":20.7,"y":-2.988,"z":-0.36,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":-20.7,"y":-2.988,"z":-0.36,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":21.42,"y":-2.988,"z":-0.36,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":-21.42,"y":-2.988,"z":-0.36,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":22.5,"y":-2.952,"z":-0.36,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":-22.5,"y":-2.952,"z":-0.36,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":23.22,"y":-2.952,"z":-0.36,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":-23.22,"y":-2.952,"z":-0.36,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":24.3,"y":-2.916,"z":-0.36,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":-24.3,"y":-2.916,"z":-0.36,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":25.02,"y":-2.916,"z":-0.36,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":-25.02,"y":-2.916,"z":-0.36,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":26.1,"y":-2.88,"z":-0.36,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":-26.1,"y":-2.88,"z":-0.36,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":26.82,"y":-2.88,"z":-0.36,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":-26.82,"y":-2.88,"z":-0.36,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":27.9,"y":-2.844,"z":-0.36,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":-27.9,"y":-2.844,"z":-0.36,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":28.62,"y":-2.844,"z":-0.36,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":-28.62,"y":-2.844,"z":-0.36,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":29.7,"y":-2.52,"z":0,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":-29.7,"y":-2.52,"z":0,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":30.42,"y":-2.52,"z":0,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20},{"x":-30.42,"y":-2.52,"z":0,"angle":0,"damage":[40,40],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":20}],"radius":31.062}}';
var Heartbreaker_702 = '{"name":"Heartbreaker","level":7,"model":2,"size":3,"specs":{"shield":{"capacity":[800,800],"reload":[15,15]},"generator":{"capacity":[6000,6000],"reload":[700,700]},"ship":{"mass":600,"speed":[90,90],"rotation":[70,70],"acceleration":[90,90]}},"bodies":{"main":{"section_segments":10,"offset":{"x":0,"y":-50,"z":20},"position":{"x":[0,0,0,0,0,0,0,0],"y":[0,-100,-40,-30,100,170,173,165],"z":[0,0,0,0,0,0,0,0]},"width":[0,0,25,10,10,10,10,0],"height":[0,5,15,10,10,10,10,0],"texture":[15,9,3,3,13,17,18],"propeller":true},"lights1":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":-9,"y":0,"z":23},"position":{"x":[0,0,0,0],"y":[-80,-80,100,100],"z":[0,0,0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[4,63,4]},"strip":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":0,"y":0,"z":28},"position":{"x":[0,0,0,0],"y":[-80,-80,120,120,0,10],"z":[0,0,0,0,0,0]},"width":[0,2,2,0],"height":[0,3,3,0],"texture":[1]},"broke":{"section_segments":[45,135,225,315],"angle":10,"offset":{"x":35,"y":0,"z":20},"position":{"x":[-14,-14,-7,-7,0,0,7,7,14,14,14],"y":[-92,-35,-35,-25,-25,20,20,30,30,80,90],"z":[-5,0,0,0,0,0,0,0,0,-4,-6]},"width":[5,5,15,15,5,5,15,15,5,5,5],"height":[0,8,8,8,8,8,8,8,8,6,0],"texture":[63]},"engines":{"section_segments":12,"offset":{"x":50,"y":10,"z":7},"position":{"x":[-4,-10,-10,0,0,0,0,0],"y":[15,10,20,50,90,95,93],"z":[0,0,0,0,0,0,0,0]},"width":[0,7,10,11,20,20,0],"height":[0,7,10,7,7,7,0],"texture":[3,18,63,13,17,18],"propeller":true},"engine_b1":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":65,"y":90,"z":10},"position":{"x":[0,0,0,0,0],"y":[-10,-5,20,25],"z":[-3,0,0,-3]},"width":[5,7,7,5],"height":[0,5,5,0],"texture":[2]},"engine_b2":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":50,"y":90,"z":15},"position":{"x":[0,0,0,0,0],"y":[-10,-5,20,25],"z":[-3,0,0,-3]},"width":[5,7,7,5],"height":[0,5,5,0],"texture":[3]},"engine_b3":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":35,"y":90,"z":10},"position":{"x":[0,0,0,0,0],"y":[-10,-5,20,25],"z":[-3,0,0,-3]},"width":[5,7,7,5],"height":[0,5,5,0],"texture":[2]},"c1":{"section_segments":12,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-118,-120,-118,-115,-100,-100,-70,-50,-30,0,-5],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,5,5,5,4,4,7,8,9,0],"height":[0,5,5,5,5,4,4,7,8,9,0],"angle":0,"laser":{"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"recoil":200,"number":1,"error":0},"propeller":false,"texture":[17,4,17,18,4,12,63,4,18,4]},"c2":{"section_segments":12,"offset":{"x":0.000001,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-118,-120,-118,-115,-100,-100,-70,-50,-30,0,-5],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,5,5,5,4,4,7,8,9,0],"height":[0,5,5,5,5,4,4,7,8,9,0],"angle":10,"laser":{"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"recoil":200,"number":1,"error":0},"propeller":false,"texture":[17,4,17,18,4,12,63,4,18,4]},"c3":{"section_segments":12,"offset":{"x":0.000001,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-118,-120,-118,-115,-100,-100,-70,-50,-30,0,-5],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,5,5,5,4,4,7,8,9,0],"height":[0,5,5,5,5,4,4,7,8,9,0],"angle":20,"laser":{"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"recoil":200,"number":1,"error":0},"propeller":false,"texture":[17,4,17,18,4,12,63,4,18,4]},"c4":{"section_segments":12,"offset":{"x":0.000001,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-118,-120,-118,-115,-100,-100,-70,-50,-30,0,-5],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,5,5,5,4,4,7,8,9,0],"height":[0,5,5,5,5,4,4,7,8,9,0],"angle":30,"laser":{"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"recoil":200,"number":1,"error":0},"propeller":false,"texture":[17,4,17,18,4,12,63,4,18,4]},"c5":{"section_segments":12,"offset":{"x":0.000001,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-118,-120,-118,-115,-100,-100,-70,-50,-30,0,-5],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,5,5,5,4,4,7,8,9,0],"height":[0,5,5,5,5,4,4,7,8,9,0],"angle":40,"laser":{"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"recoil":200,"number":1,"error":0},"propeller":false,"texture":[17,4,17,18,4,12,63,4,18,4]},"c6":{"section_segments":12,"offset":{"x":0.000001,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-118,-120,-118,-115,-100,-100,-70,-50,-30,0,-5],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,5,5,5,4,4,7,8,9,0],"height":[0,5,5,5,5,4,4,7,8,9,0],"angle":50,"laser":{"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"recoil":200,"number":1,"error":0},"propeller":false,"texture":[17,4,17,18,4,12,63,4,18,4]},"c7":{"section_segments":12,"offset":{"x":0.000001,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-118,-120,-118,-115,-100,-100,-70,-50,-30,0,-5],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,5,5,5,4,4,7,8,9,0],"height":[0,5,5,5,5,4,4,7,8,9,0],"angle":60,"laser":{"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"recoil":200,"number":1,"error":0},"propeller":false,"texture":[17,4,17,18,4,12,63,4,18,4]},"c8":{"section_segments":12,"offset":{"x":0.000001,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-118,-120,-118,-115,-100,-100,-70,-50,-30,0,-5],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,5,5,5,4,4,7,8,9,0],"height":[0,5,5,5,5,4,4,7,8,9,0],"angle":70,"laser":{"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"recoil":200,"number":1,"error":0},"propeller":false,"texture":[17,4,17,18,4,12,63,4,18,4]},"c9":{"section_segments":12,"offset":{"x":0.000001,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-118,-120,-118,-115,-100,-100,-70,-50,-30,0,-5],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,5,5,5,4,4,7,8,9,0],"height":[0,5,5,5,5,4,4,7,8,9,0],"angle":80,"laser":{"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"recoil":200,"number":1,"error":0},"propeller":false,"texture":[17,4,17,18,4,12,63,4,18,4]},"c10":{"section_segments":12,"offset":{"x":0.000001,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-118,-120,-118,-115,-100,-100,-70,-50,-30,0,-5],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,5,5,5,4,4,7,8,9,0],"height":[0,5,5,5,5,4,4,7,8,9,0],"angle":90,"laser":{"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"recoil":200,"number":1,"error":0},"propeller":false,"texture":[17,4,17,18,4,12,63,4,18,4]},"c11":{"section_segments":12,"offset":{"x":0.000001,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-118,-120,-118,-115,-100,-100,-70,-50,-30,0,-5],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,5,5,5,4,4,7,8,9,0],"height":[0,5,5,5,5,4,4,7,8,9,0],"angle":100,"laser":{"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"recoil":200,"number":1,"error":0},"propeller":false,"texture":[17,4,17,18,4,12,63,4,18,4]},"c12":{"section_segments":12,"offset":{"x":0.000001,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-118,-120,-118,-115,-100,-100,-70,-50,-30,0,-5],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,5,5,5,4,4,7,8,9,0],"height":[0,5,5,5,5,4,4,7,8,9,0],"angle":110,"laser":{"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"recoil":200,"number":1,"error":0},"propeller":false,"texture":[17,4,17,18,4,12,63,4,18,4]},"c13":{"section_segments":12,"offset":{"x":0.000001,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-118,-120,-118,-115,-100,-100,-70,-50,-30,0,-5],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,5,5,5,4,4,7,8,9,0],"height":[0,5,5,5,5,4,4,7,8,9,0],"angle":120,"laser":{"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"recoil":200,"number":1,"error":0},"propeller":false,"texture":[17,4,17,18,4,12,63,4,18,4]},"c14":{"section_segments":12,"offset":{"x":0.000001,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-118,-120,-118,-115,-100,-100,-70,-50,-30,0,-5],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,5,5,5,4,4,7,8,9,0],"height":[0,5,5,5,5,4,4,7,8,9,0],"angle":130,"laser":{"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"recoil":200,"number":1,"error":0},"propeller":false,"texture":[17,4,17,18,4,12,63,4,18,4]},"c15":{"section_segments":12,"offset":{"x":0.000001,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-118,-120,-118,-115,-100,-100,-70,-50,-30,0,-5],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,5,5,5,4,4,7,8,9,0],"height":[0,5,5,5,5,4,4,7,8,9,0],"angle":140,"laser":{"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"recoil":200,"number":1,"error":0},"propeller":false,"texture":[17,4,17,18,4,12,63,4,18,4]},"c16":{"section_segments":12,"offset":{"x":0.000001,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-118,-120,-118,-115,-100,-100,-70,-50,-30,0,-5],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,5,5,5,4,4,7,8,9,0],"height":[0,5,5,5,5,4,4,7,8,9,0],"angle":150,"laser":{"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"recoil":200,"number":1,"error":0},"propeller":false,"texture":[17,4,17,18,4,12,63,4,18,4]},"c17":{"section_segments":12,"offset":{"x":0.000001,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-118,-120,-118,-115,-100,-100,-70,-50,-30,0,-5],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,5,5,5,4,4,7,8,9,0],"height":[0,5,5,5,5,4,4,7,8,9,0],"angle":160,"laser":{"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"recoil":200,"number":1,"error":0},"propeller":false,"texture":[17,4,17,18,4,12,63,4,18,4]},"c18":{"section_segments":12,"offset":{"x":0.000001,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-118,-120,-118,-115,-100,-100,-70,-50,-30,0,-5],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,5,5,5,4,4,7,8,9,0],"height":[0,5,5,5,5,4,4,7,8,9,0],"angle":170,"laser":{"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"recoil":200,"number":1,"error":0},"propeller":false,"texture":[17,4,17,18,4,12,63,4,18,4]},"c19":{"section_segments":12,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-118,-120,-118,-115,-100,-100,-70,-50,-30,0,-5],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,5,5,5,4,4,7,8,9,0],"height":[0,5,5,5,5,4,4,7,8,9,0],"angle":180,"laser":{"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"recoil":200,"number":1,"error":0},"propeller":false,"texture":[17,4,17,18,4,12,63,4,18,4]}},"wings":{"main":{"offset":{"x":0,"y":-30,"z":10},"length":[15,15,15,15,15,15,10],"width":[180,195,195,185,165,140,100,20],"angle":[0,0,0,0,0,0,0,0,0,0,0,0],"position":[0,15,25,35,41,46,50,60],"texture":[63],"doubleside":true,"bump":{"position":40,"size":5}},"main2":{"offset":{"x":0,"y":-30,"z":15},"length":[12.75,12.75,12.75,12.75,12.75,12.75,8.5],"width":[153,165.75,165.75,157.25,140.25,119,85,17],"angle":[0,0,0,0,0,0,0,0,0,0,0,0],"position":[0,12.75,21.25,29.75,34.85,39.1,42.5,51],"texture":[4],"doubleside":true,"bump":{"position":40,"size":5}},"tail":{"length":[5,5,5,5,12,12,7],"width":[45,100,30,30,30,10,30,5],"angle":[15,5,5,185,4,184,3],"position":[0,25,5,60,5,50,5,35],"doubleside":true,"bump":{"position":-40,"size":4},"texture":[17],"offset":{"x":10,"y":-65,"z":26}},"fletching1":{"doubleside":true,"offset":{"x":0,"y":55,"z":20},"length":[30],"width":[20,20],"angle":[0],"position":[0,50],"texture":[18],"bump":{"position":10,"size":10}},"fletching2":{"doubleside":true,"offset":{"x":0,"y":80,"z":20},"length":[30],"width":[20,20],"angle":[0],"position":[0,50],"texture":[17],"bump":{"position":10,"size":10}},"fletching3":{"doubleside":true,"offset":{"x":0,"y":105,"z":20},"length":[30],"width":[20,20],"angle":[0],"position":[0,50],"texture":[18],"bump":{"position":10,"size":10}},"fletching4":{"doubleside":true,"offset":{"x":0,"y":55,"z":20},"length":[30],"width":[20,20],"angle":[90],"position":[0,50],"texture":[18],"bump":{"position":10,"size":10}},"fletching5":{"doubleside":true,"offset":{"x":0,"y":80,"z":20},"length":[30],"width":[20,20],"angle":[90],"position":[0,50],"texture":[17],"bump":{"position":10,"size":10}},"fletching6":{"doubleside":true,"offset":{"x":0,"y":105,"z":20},"length":[30],"width":[20,20],"angle":[90],"position":[0,50],"texture":[18],"bump":{"position":10,"size":10}}},"typespec":{"name":"Heartbreaker","level":7,"model":2,"code":702,"specs":{"shield":{"capacity":[800,800],"reload":[15,15]},"generator":{"capacity":[6000,6000],"reload":[700,700]},"ship":{"mass":600,"speed":[90,90],"rotation":[70,70],"acceleration":[90,90]}},"shape":[9,7.756,7.206,7.206,7.206,7.206,7.206,7.206,7.206,7.206,7.206,7.206,7.206,7.206,7.206,7.206,7.206,7.206,7.206,7.206,7.857,8.041,7.619,9.602,10.062,9.9,10.062,9.602,7.619,8.041,7.857,7.206,7.206,7.206,7.206,7.206,7.206,7.206,7.206,7.206,7.206,7.206,7.206,7.206,7.206,7.206,7.206,7.206,7.206,7.756],"lasers":[{"x":0,"y":-7.2,"z":0,"angle":0,"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":200},{"x":-1.25,"y":-7.091,"z":0,"angle":10,"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":200},{"x":1.25,"y":-7.091,"z":0,"angle":-10,"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":200},{"x":-2.463,"y":-6.766,"z":0,"angle":20,"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":200},{"x":2.463,"y":-6.766,"z":0,"angle":-20,"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":200},{"x":-3.6,"y":-6.235,"z":0,"angle":30,"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":200},{"x":3.6,"y":-6.235,"z":0,"angle":-30,"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":200},{"x":-4.628,"y":-5.516,"z":0,"angle":40,"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":200},{"x":4.628,"y":-5.516,"z":0,"angle":-40,"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":200},{"x":-5.516,"y":-4.628,"z":0,"angle":50,"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":200},{"x":5.516,"y":-4.628,"z":0,"angle":-50,"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":200},{"x":-6.235,"y":-3.6,"z":0,"angle":60,"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":200},{"x":6.235,"y":-3.6,"z":0,"angle":-60,"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":200},{"x":-6.766,"y":-2.463,"z":0,"angle":70,"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":200},{"x":6.766,"y":-2.463,"z":0,"angle":-70,"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":200},{"x":-7.091,"y":-1.25,"z":0,"angle":80,"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":200},{"x":7.091,"y":-1.25,"z":0,"angle":-80,"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":200},{"x":-7.2,"y":0,"z":0,"angle":90,"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":200},{"x":7.2,"y":0,"z":0,"angle":-90,"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":200},{"x":-7.091,"y":1.25,"z":0,"angle":100,"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":200},{"x":7.091,"y":1.25,"z":0,"angle":-100,"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":200},{"x":-6.766,"y":2.463,"z":0,"angle":110,"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":200},{"x":6.766,"y":2.463,"z":0,"angle":-110,"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":200},{"x":-6.235,"y":3.6,"z":0,"angle":120,"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":200},{"x":6.235,"y":3.6,"z":0,"angle":-120,"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":200},{"x":-5.516,"y":4.628,"z":0,"angle":130,"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":200},{"x":5.516,"y":4.628,"z":0,"angle":-130,"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":200},{"x":-4.628,"y":5.516,"z":0,"angle":140,"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":200},{"x":4.628,"y":5.516,"z":0,"angle":-140,"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":200},{"x":-3.6,"y":6.235,"z":0,"angle":150,"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":200},{"x":3.6,"y":6.235,"z":0,"angle":-150,"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":200},{"x":-2.463,"y":6.766,"z":0,"angle":160,"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":200},{"x":2.463,"y":6.766,"z":0,"angle":-160,"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":200},{"x":-1.25,"y":7.091,"z":0,"angle":170,"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":200},{"x":1.25,"y":7.091,"z":0,"angle":-170,"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":200},{"x":0,"y":7.2,"z":0,"angle":180,"damage":[80,80],"rate":2,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":200}],"radius":10.062}}';
var U_Fusion_703 = '{"name":"U-Fusion","level":7,"model":3,"size":3.6,"specs":{"shield":{"capacity":[800,800],"reload":[15,15]},"generator":{"capacity":[1600,1600],"reload":[175,175]},"ship":{"mass":1200,"speed":[50,50],"rotation":[10,10],"acceleration":[150,150]}},"tori":{"ring1":{"segments":20,"radius":95,"section_segments":6,"offset":{"x":0,"y":-100,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,10,0,0,0,0,0,0,0]},"width":[20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,null],"height":[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,null],"texture":[63,63,10,2,2,2,2,10,63,63,63,63,10,1,1,1,1,10,63]},"ring2":{"segments":20,"radius":95,"section_segments":6,"offset":{"x":0,"y":100,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,10,0,0,0,0,0,0,0]},"width":[20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,null],"height":[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,null],"texture":[63,63,10,2,2,2,2,10,63,63,63,63,10,1,1,1,1,10,63]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":-70,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-45,-50,-7.5,35,15,20,25,30,35,50,40,60,70,120,150,155,158,150],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,20,20,20,18,18,18,18,20,20,30,40,42,45,35,30,30,0],"height":[0,20,20,20,18,18,18,20,20,20,30,30,30,30,25,20,20,0],"texture":[6,16,16,17,4,4,17,4,18,17,4,63,10,2,13,17],"propeller":true,"laser":{"damage":[40,40],"rate":5,"type":2,"speed":[240,240],"recoil":50,"number":1,"error":0}},"tru_cockpit":{"section_segments":8,"offset":{"x":0,"y":-20,"z":30},"position":{"x":[0,0,0,0,0,0],"y":[-5,15,45,70],"z":[4,0,1,1,1]},"width":[3,10,12,5],"height":[0,15,15,0],"texture":[9,9,4]},"tubes":{"angle":90,"section_segments":6,"offset":{"x":60,"y":25,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-25,-15,-13,10,12,22],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[15,15,10,10,15,15],"height":[15,15,10,10,15,15],"texture":[3.9,17.9,16.9,17.9,3.9,null]},"lattice":{"section_segments":10,"offset":{"x":90,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-120,-120,-60,-45,-5,45,60,120,120],"z":[0,0,0,0,0,0,0,0]},"width":[0,5,5,15,15,15,5,5,0],"height":[0,5,5,25,25,25,5,5,0],"texture":[11,2,63,10,1,63,2,11]},"front_bumpers":{"vertical":true,"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":95,"y":0,"z":100},"position":{"x":[-12,-12,-5,0,0,-5,-12,-12],"y":[-45,-45,-30,-10,10,30,45,45],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,7,8,10,10,8,7,0],"height":[0,23,27,30,30,27,23,0],"texture":[4,4,3,8,3,4]},"rear_bumpers":{"vertical":true,"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":95,"y":0,"z":-100},"position":{"x":[-12,-12,-5,0,0,-5,-12,-12],"y":[-45,-45,-30,-10,10,30,45,45],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,7,8,10,10,8,7,0],"height":[0,23,27,30,30,27,23,0],"texture":[4,4,3,8,3,4]},"ports":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":100,"y":0,"z":0},"position":{"x":[0,0,0,0,0],"y":[-5,-5,-10,0,10],"z":[-2,0,0,0]},"width":[0,50,55,60,0],"height":[0,10,15,20,0],"texture":[5,17,4],"angle":-90},"ring1":{"section_segments":12,"offset":{"x":0,"y":-80,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[2,5,10,13],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[20,30,30,20],"height":[20,30,30,20],"texture":[4,17,4]},"ring2":{"section_segments":12,"offset":{"x":0,"y":-95,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[2,5,10,13],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[20,30,30,20],"height":[20,30,30,20],"texture":[4,17,4]},"ring3":{"section_segments":12,"offset":{"x":0,"y":-110,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[2,5,10,13],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[20,30,30,20],"height":[20,30,30,20],"texture":[4,17,4]},"ring4":{"section_segments":12,"offset":{"x":0,"y":-65,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[2,5,10,13],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[20,30,30,20],"height":[20,30,30,20],"texture":[4,17,4]},"ring5":{"section_segments":12,"offset":{"x":0,"y":-50,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[2,5,10,13],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[20,30,30,20],"height":[20,30,30,20],"texture":[4,17,4]},"focuser":{"section_segments":12,"offset":{"x":0,"y":-110,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-60,-75,-60,-62,-63,-60,-45,-47,-49,-45,-30,-33,-35,-30,-15,-18,-20,-15,0],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,2,3,4,6,3,4,6,8,5,6,7,11,7,8,12,15,8,10],"height":[0,2,3,4,6,3,4,6,8,5,6,7,11,7,8,12,15,8,10],"texture":[4,4,6,13,17,4,6,6,17,4,6,6,17,4,6,6,17,4]},"laser1":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":100,"y":-120,"z":0},"position":{"x":[0,0,0,1,1,0,0],"y":[-15,-20,-10,0,40,50,50],"z":[0,0,0,0,0,0,0]},"width":[0,1,1,5,5,3,3,0],"height":[0,3,3,15,15,3,0],"texture":[17,13,4,10,4,17]},"laser2":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":100,"y":120,"z":0},"position":{"x":[0,0,0,1,1,0,0],"y":[-15,-20,-10,0,40,50,50],"z":[0,0,0,0,0,0,0]},"width":[0,1,1,5,5,3,3,0],"height":[0,3,3,15,15,3,0],"texture":[17,13,4,10,4,17],"angle":180},"cover":{"section_segments":6,"offset":{"x":0,"y":-40,"z":25},"position":{"x":[0,0,0,0,0,0],"y":[-78,-65,10,35,90,120],"z":[-10,0,0,0,0,-5]},"height":[0,10,10,10,10,5],"width":[10,10,10,25,25,17],"texture":[3,4,63,63,13]},"under":{"section_segments":6,"offset":{"x":0,"y":-40,"z":-25},"position":{"x":[0,0,0,0,0,0,0],"y":[-78,-65,10,35,90,120,120],"z":[10,0,0,0,0,5,5]},"height":[0,10,10,10,10,5,0],"width":[10,10,10,25,25,17,0],"texture":[3,4,3,18]},"sides":{"section_segments":6,"offset":{"x":25,"y":-40,"z":0},"position":{"x":[-10,0,0,0,0,-5],"y":[-78,-65,10,35,90,120],"z":[0,0,0,0,0,0]},"width":[0,10,10,10,10,5],"height":[10,10,10,25,25,17],"texture":[2.9,3.9,2.9,18]},"uwings1":{"section_segments":8,"offset":{"x":45,"y":-60,"z":-25},"position":{"x":[0,0,0,0,0,0],"y":[-45,-50,20,40,45,50],"z":[0,0,0,0,0,0]},"width":[0,2.5,12.5,10,0],"height":[0,5,12.5,10,0],"texture":[12,2,3,4]},"uwings2":{"section_segments":8,"offset":{"x":45,"y":-60,"z":25},"position":{"x":[0,0,0,0,0,0],"y":[-45,-50,20,40,45,50],"z":[0,0,0,0,0,0]},"width":[0,2.5,12.5,10,0],"height":[0,5,12.5,10,0],"texture":[12,2,3,4]},"uwings3":{"section_segments":8,"offset":{"x":25,"y":30,"z":27},"position":{"x":[0,0,0,0,0,0],"y":[-45,-50,20,40,45,50],"z":[0,0,0,0,0,0]},"width":[0,5,12.5,10,0],"height":[0,2.5,12.5,10,0],"texture":[12,2,3,4]},"uwings4":{"angle":180,"section_segments":8,"offset":{"x":45,"y":115,"z":-25},"position":{"x":[0,0,0,0,0,0],"y":[-45,-50,20,40,45,50],"z":[0,0,0,0,0,0]},"width":[0,2.5,12.5,10,0],"height":[0,5,12.5,10,0],"texture":[12,2,3,4]},"uwings5":{"angle":180,"section_segments":8,"offset":{"x":45,"y":115,"z":25},"position":{"x":[0,0,0,0,0,0],"y":[-45,-50,20,40,45,50],"z":[0,0,0,0,0,0]},"width":[0,2.5,12.5,10,0],"height":[0,5,12.5,10,0],"texture":[12,2,3,4]},"cannons1":{"section_segments":12,"offset":{"x":50,"y":-45,"z":35},"position":{"x":[0,0,0,0,0,0,0],"y":[-30,-35,-10,0,10,25,22.5],"z":[0,0,0,0,0,0,0]},"width":[0,2.5,2.5,5,5,2.5,0],"height":[0,2.5,3,5,7.5,2.5,0],"laser":{"damage":[20,20],"rate":1,"type":2,"speed":[190,190],"recoil":0,"number":1,"error":0},"propeller":false,"texture":[4,4,10,4,63,4]},"cannons2":{"section_segments":12,"offset":{"x":50,"y":-45,"z":-35},"position":{"x":[0,0,0,0,0,0,0],"y":[-30,-35,-10,0,10,25,22.5],"z":[0,0,0,0,0,0,0]},"width":[0,2.5,2.5,5,5,2.5,0],"height":[0,2.5,3,5,7.5,2.5,0],"laser":{"damage":[20,20],"rate":1,"type":2,"speed":[190,190],"recoil":0,"number":1,"error":0},"propeller":false,"texture":[4,4,10,4,63,4]},"side_main1":{"section_segments":8,"offset":{"x":57.5,"y":-45,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[0,-5,20,50,45,50],"z":[0,0,0,0,0,0]},"width":[0,2.5,11.5,5,0],"height":[0,5,11.5,5,0],"texture":[12,1,10,12]},"side_main2":{"angle":180,"section_segments":8,"offset":{"x":57.5,"y":100,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[0,-5,20,50,45,50],"z":[0,0,0,0,0,0]},"width":[0,2.5,11.5,5,0],"height":[0,5,11.5,5,0],"texture":[12,1,10,12]},"side_propulsors1":{"section_segments":10,"offset":{"x":50,"y":-35,"z":12.5},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[0,5,6.5,12.5,15,20,30,25],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,2.5,5,5,5,2.5,2.5,0],"height":[0,2.5,5,5,5,2.5,2.5,0],"propeller":true,"texture":[5,2,11,2,63,11,12]},"side_propulsors2":{"section_segments":10,"offset":{"x":50,"y":-35,"z":-12.5},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[0,5,6.5,12.5,15,20,30,25],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,2.5,5,5,5,2.5,2.5,0],"height":[0,2.5,5,5,5,2.5,2.5,0],"propeller":true,"texture":[5,2,11,2,63,11,12]},"side_propulsors4":{"angle":180,"section_segments":10,"offset":{"x":50,"y":90,"z":12.5},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[0,5,6.5,12.5,15,20,30,25],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,2.5,5,5,5,2.5,2.5,0],"height":[0,2.5,5,5,5,2.5,2.5,0],"texture":[5,2,11,2,63,11,12]},"side_propulsors5":{"angle":180,"section_segments":10,"offset":{"x":50,"y":90,"z":-12.5},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[0,5,6.5,12.5,15,20,30,25],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,2.5,5,5,5,2.5,2.5,0],"height":[0,2.5,5,5,5,2.5,2.5,0],"texture":[5,2,11,2,63,11,12]},"side_propulsors3":{"section_segments":10,"offset":{"x":15,"y":55,"z":37},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[0,5,6.5,12.5,15,20,30,25],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,2.5,5,5,5,2.5,2.5,0],"height":[0,2.5,5,5,5,2.5,2.5,0],"propeller":true,"texture":[5,2,11,2,63,11,12]},"side_cockpit":{"section_segments":8,"offset":{"x":67.5,"y":-45,"z":0},"position":{"x":[-2,0,-4],"y":[10,20,40],"z":[0,0,0,0]},"width":[0,4,0],"height":[2.5,5,2.5],"texture":[9]},"side_cockpit2":{"angle":180,"section_segments":8,"offset":{"x":-67.5,"y":100,"z":0},"position":{"x":[-2,0,-4],"y":[10,20,40],"z":[0,0,0,0]},"width":[0,4,0],"height":[2.5,5,2.5],"texture":[9]},"cockpit":{"section_segments":8,"offset":{"x":0,"y":45,"z":52},"position":{"x":[0,0,0,0],"y":[10,20,40],"z":[-2,0,-4]},"width":[2.5,5,2.5],"height":[0,4,0],"texture":[9]},"main2":{"section_segments":8,"offset":{"x":0,"y":45,"z":42},"position":{"x":[0,0,0,0,0,0],"y":[0,-5,20,50,45,50],"z":[0,0,0,0,0,0]},"width":[0,5,11.5,5,0],"height":[0,2.5,11.5,5,0],"texture":[12,1,10,12],"propeller":true},"propulsors1":{"section_segments":10,"offset":{"x":34,"y":19,"z":10},"position":{"x":[3,3,3,0,0,0,0,0],"y":[-40,-30,0,40,65,68,58],"z":[0,0,0,0,0,0,0,0]},"width":[0,5,5,8,8,6,0],"height":[0,5,5,8,8,6,0],"texture":[4,13,4,13,17,18],"propeller":true},"propulsors2":{"section_segments":10,"offset":{"x":34,"y":19,"z":-10},"position":{"x":[3,3,3,0,0,0,0,0],"y":[-40,-30,0,40,65,68,58],"z":[0,0,0,0,0,0,0,0]},"width":[0,5,5,8,8,6,0],"height":[0,5,5,8,8,6,0],"texture":[4,13,4,13,17,18],"propeller":true},"wire1":{"section_segments":8,"angle":90,"offset":{"x":40,"y":32,"z":30},"position":{"x":[5,5,5,5,5,4,3,2,1,0,0],"y":[-35,-34,-21.5,-10,-8,-1,4,7,9,11],"z":[-5,-5,-1,1,2,3,1,-2,-10,-10,-10]},"width":[4,4,4,4,5,4,4,3,2,0],"height":[0,3,3,3,2,2,2,2,8,0],"propeller":false,"texture":[13,13,13,13,17,13,17,13,17]},"wire2":{"section_segments":8,"angle":90,"offset":{"x":40,"y":32,"z":10},"position":{"x":[-5,-5,-5,-5,-4,-3,-2,-1,0,0,0],"y":[-35,-34,-21.5,-10,-8,-1,4,7,9,11],"z":[5,5,1,-1,-2,-3,-1,2,10,10,10]},"width":[4,2,2,2,2,2,2,3,2,0],"height":[0,2,2,3,2,2,2,2,8,0],"propeller":false,"texture":[17,13,17,13,17,13,17,13,17,13]},"wire3":{"section_segments":8,"angle":90,"offset":{"x":42,"y":45,"z":33},"position":{"x":[5,5,5,5,5,4,3,2,1,0,0],"y":[-35,-34,-21.5,-10,-8,-1,4,7,9,11],"z":[-5,-5,-1,1,2,3,1,-2,-10,-10,-10]},"width":[4,4,4,4,5,4,4,3,2,0],"height":[0,3,3,3,2,2,2,2,8,0],"propeller":false,"texture":[13,13,13,13,17,13,17,13,17]},"wire4":{"section_segments":8,"angle":90,"offset":{"x":42,"y":45,"z":13},"position":{"x":[-5,-5,-5,-5,-4,-3,-2,-1,0,0,0],"y":[-35,-34,-21.5,-10,-8,-1,4,7,9,11],"z":[5,5,1,-1,-2,-3,-1,2,10,10,10]},"width":[4,2,2,2,2,2,2,3,2,0],"height":[0,2,2,3,2,2,2,2,8,0],"propeller":false,"texture":[17,13,17,13,17,13,17,13,17,13]},"wire5":{"section_segments":8,"angle":90,"offset":{"x":45,"y":58,"z":35},"position":{"x":[5,5,5,5,5,4,3,2,1,0,0],"y":[-35,-34,-21.5,-10,-8,-1,4,7,9,11],"z":[-5,-5,-1,1,2,3,1,-2,-10,-10,-10]},"width":[4,4,4,4,5,4,4,3,2,0],"height":[0,3,3,3,2,2,2,2,8,0],"propeller":false,"texture":[13,13,13,13,17,13,17,13,17]},"wire6":{"section_segments":8,"angle":90,"offset":{"x":45,"y":58,"z":15},"position":{"x":[-5,-5,-5,-5,-4,-3,-2,-1,0,0,0],"y":[-35,-34,-21.5,-10,-8,-1,4,7,9,11],"z":[5,5,1,-1,-2,-3,-1,2,10,10,10]},"width":[4,2,2,2,2,2,2,3,2,0],"height":[0,2,2,3,2,2,2,2,8,0],"propeller":false,"texture":[17,13,17,13,17,13,17,13,17,13]},"wire7":{"section_segments":8,"offset":{"x":10,"y":36,"z":42},"position":{"x":[0,1.5,2,2,2.5,2,0,-1,-2,-6,-6],"y":[-15,-14,-11.5,-10,-8,0,8,10,11.5,14,15],"z":[-12,-12,-11,-10,-9,-7,-6,-5,-4,0,0]},"width":[0,2,2,2,2,2,2,3,4,4,0],"height":[0,2,2,2,2,2,2,3,4,4,0],"propeller":false,"texture":[13,17,13,17,13,17,13,17]},"emitter0":{"section_segments":0,"offset":{"x":0,"y":-260,"z":0},"position":{"x":[0],"y":[0],"z":[0]},"width":[1],"height":[1],"laser":{"damage":[40,40],"rate":0.25,"speed":[80,80],"number":16,"recoil":50,"type":1}}},"wings":{"join1":{"doubleside":true,"offset":{"x":10,"y":25,"z":0},"length":[45],"width":[80,50],"angle":[0],"position":[0,-50],"texture":[18],"bump":{"position":10,"size":10}},"join2":{"doubleside":true,"offset":{"x":10,"y":25,"z":0},"length":[45],"width":[80,50],"angle":[0],"position":[0,50],"texture":[18],"bump":{"position":10,"size":10}}},"typespec":{"name":"U-Fusion","level":7,"model":3,"code":703,"specs":{"shield":{"capacity":[800,800],"reload":[15,15]},"generator":{"capacity":[1600,1600],"reload":[175,175]},"ship":{"mass":1200,"speed":[50,50],"rotation":[10,10],"acceleration":[150,150]}},"shape":[13.321,10.47,8.881,9.335,10.003,12.419,11.634,10.352,9.218,8.373,8.481,8.165,7.979,7.979,8.165,8.481,8.373,9.121,10.148,11.533,12.419,10.003,11.487,12.362,8.598,8.463,8.598,12.362,11.487,10.003,12.419,11.533,10.148,9.121,8.373,8.481,8.165,7.979,7.979,8.165,8.481,8.373,9.218,10.352,11.634,12.419,10.003,9.335,8.881,10.47],"lasers":[{"x":0,"y":-8.64,"z":0,"angle":0,"damage":[40,40],"rate":5,"type":2,"speed":[240,240],"number":1,"spread":0,"error":0,"recoil":50},{"x":3.6,"y":-5.76,"z":2.52,"angle":0,"damage":[20,20],"rate":1,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":0},{"x":-3.6,"y":-5.76,"z":2.52,"angle":0,"damage":[20,20],"rate":1,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":0},{"x":3.6,"y":-5.76,"z":-2.52,"angle":0,"damage":[20,20],"rate":1,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":0},{"x":-3.6,"y":-5.76,"z":-2.52,"angle":0,"damage":[20,20],"rate":1,"type":2,"speed":[190,190],"number":1,"spread":0,"error":0,"recoil":0},{"x":0,"y":-18.72,"z":0,"angle":0,"damage":[40,40],"rate":0.25,"type":1,"speed":[80,80],"number":16,"spread":0,"error":0,"recoil":50}],"radius":13.321}}';
var U_Marksman_704 = '{"name":"U-Marksman","level":7,"model":4,"size":2.3,"zoom":0.95,"specs":{"shield":{"capacity":[500,500],"reload":[12,12]},"generator":{"capacity":[800,800],"reload":[95,95]},"ship":{"mass":800,"speed":[125,125],"rotation":[20,20],"acceleration":[60,60]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":-87,"z":0},"position":{"x":[-65,-65,-65,-65,-65,-65,-65,-65,-65,-65,-65,-65,-65,-65,-65,-65,-65,-65,-65,-65,-65,-65],"y":[-10,-5,0,5,10,10,30,30,35,35,40,40,45,45,50,55,130,135,170,190,180,170],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,15,20,23,24,25,25,27,27,25,25,27,27,25,25,28,28,25,25,20,15,0],"height":[0,15,20,23,24,25,25,27,27,25,25,27,27,25,25,28,28,25,25,20,15,0],"texture":[9,9,9,9,2,2,4,4,4,2,2,4,4,2,3,18,3,15,4,18,17],"propeller":true},"bottom":{"section_segments":12,"offset":{"x":0,"y":-230,"z":-40},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-105,-130,40,100],"z":[-20,-20,-10,40,40]},"width":[0,20,30,30],"height":[0,7,20,70],"texture":[12,2,3,8]},"top":{"section_segments":12,"offset":{"x":0,"y":-200,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-135,-160,10,70,70,100,100,150,150,180,180,190,190,220,220,230,230,260,260,310,310,340,340,345,360,363,338],"z":[60,60,50,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,20,30,30,35,35,30,30,35,35,30,30,35,35,30,30,35,35,30,30,35,35,30,30,20,20,0],"height":[0,7,20,70,75,75,70,70,75,75,70,70,75,75,70,70,75,75,70,70,75,75,70,70,40,40,0],"texture":[12,2,3,63,63,63,8,63,63,63,13,63,63,63,13,63,63,63,8,63,63,63,13,11,17,17],"propeller":true},"laser":{"section_segments":6,"offset":{"x":0,"y":-210,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[0,17,13,25,55,50],"z":[0,0,0,0,0,0]},"width":[0,6,20,15,25,0],"height":[0,6,20,14,14,0],"texture":[3,18,2,3,8],"laser":{"damage":[25,25],"rate":1,"type":1,"speed":[400,400],"number":24,"error":0,"recoil":50}},"sights":{"section_segments":6,"offset":{"x":0,"y":-40,"z":0},"position":{"x":[50,50,50,50,50,50,35,35,35,35,20,50],"y":[-290,-280,-265,-255,-10,-20,-10,0,90,100,180,90],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,5,2,2,12,30,30,30,30,12,0],"height":[0,5,5,2,2,20,45,50,50,50,20,0],"texture":[3.9,17,3.9,3.9,3.9,3.9,13,9.89,13,3.9,16.9],"laser":{"damage":[1,1],"rate":10,"type":1,"speed":[700,700],"number":1,"error":0,"recoil":0}},"mount":{"section_segments":6,"offset":{"x":0,"y":-40,"z":0},"position":{"x":[-50,-50,-50,-50,-50,-50,-35,-35,-35,-35,-20,50],"y":[-10,-10,-10,-10,-10,-20,-10,0,90,100,180,90],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,5,2,2,12,30,30,30,30,12,0],"height":[0,5,5,2,2,20,45,50,50,50,20,0],"texture":[3.9,17,3.9,3.9,3.9,3.9,13,9.64,13,3.9,16.9]},"sidedisc1":{"section_segments":20,"offset":{"x":0,"y":31,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[20,73,70,70,75,78],"z":[0,0,0,0,0,0,0]},"width":[25,23,23,23,21,0],"height":[25,23,23,23,21,0],"texture":[13,17,17,17,18],"angle":90},"sidedisc2":{"section_segments":20,"offset":{"x":0,"y":-21,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[20,73,70,70,75,78],"z":[0,0,0,0,0,0,0]},"width":[25,23,23,23,21,0],"height":[25,23,23,23,21,0],"texture":[13,17,17,17,18],"angle":90},"cannon_detail1":{"section_segments":6,"offset":{"x":0,"y":0,"z":66},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-350,-350,-190,-130,-130,-100,-100,120,120],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,10,15,15,0,0,5,5,0],"height":[0,5,5,5,0,0,5,5,0],"texture":[4,3,4,5,4,4,4,4]},"cannon_detail2":{"section_segments":6,"offset":{"x":0,"y":0,"z":-66},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-350,-350,-190,-130,-130,-100,-100,120,120],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,10,15,15,0,0,5,5,0],"height":[0,5,5,5,0,0,5,5,0],"texture":[4,3,4,5,4,4,4,4]},"disc1":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":0,"y":-190,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,0,-10,-7,-7,7,7,10,0,0],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[36,36,36,40,40,40,40,36,36,36],"height":[71,71,71,75,75,75,75,71,71,71],"texture":[1,1,1,1,16.9,1]},"disc2":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":0,"y":-230,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,0,-10,-7,-7,7,7,10,0,0],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[36,36,36,40,40,40,40,36,36,36],"height":[71,71,71,75,75,75,75,71,71,71],"texture":[1,1,1,1,16.9,1]},"disc3":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":0,"y":-270,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,0,-10,-7,-7,7,7,10,0,0],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[36,36,36,40,40,40,40,36,36,36],"height":[71,71,71,75,75,75,75,71,71,71],"texture":[1,1,1,1,16.9,1]},"disc4":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":0,"y":-310,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,0,-10,-7,-7,7,7,10,0,0],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[36,36,36,40,40,40,40,36,36,36],"height":[71,71,71,75,75,75,75,71,71,71],"texture":[1,1,1,1,16.9,1]},"box1":{"vertical":true,"angle":50,"section_segments":[45,135,225,315],"offset":{"x":30,"y":40,"z":90},"position":{"x":[0,0,0,0,0],"y":[-10,15,15,19,19],"z":[0,0,0,0,0]},"width":[10,10,20,20,20],"height":[30,30,50,35,0],"texture":[4,4,17.95,14.035]},"box2":{"vertical":true,"angle":50,"section_segments":[45,135,225,315],"offset":{"x":30,"y":40,"z":-100},"position":{"x":[0,0,0,0,0],"y":[-10,15,15,19,19],"z":[0,0,0,0,0]},"width":[10,10,20,20,20],"height":[30,30,50,35,0],"texture":[4,4,17.95,14.035]},"box3":{"vertical":true,"angle":140,"section_segments":[45,135,225,315],"offset":{"x":30,"y":-40,"z":90},"position":{"x":[0,0,0,0,0],"y":[-10,15,15,19,19],"z":[0,0,0,0,0]},"width":[10,10,20,20,20],"height":[30,30,50,35,0],"texture":[4,4,17.95,14.035]},"box4":{"vertical":true,"angle":140,"section_segments":[45,135,225,315],"offset":{"x":30,"y":-40,"z":-100},"position":{"x":[0,0,0,0,0],"y":[-10,15,15,19,19],"z":[0,0,0,0,0]},"width":[10,10,20,20,20],"height":[30,30,50,35,0],"texture":[4,4,17.95,14.035]},"propulsors1":{"section_segments":10,"offset":{"x":25,"y":50,"z":40},"position":{"x":[-2,0,0,0,0,0,0,0],"y":[-170,-90,0,95,110,113,100],"z":[0,0,0,0,0,0,0,0]},"width":[0,10,10,12,12,10,0],"height":[0,10,10,12,12,10,0],"texture":[4,13,4,13,17,17],"propeller":true},"propulsors2":{"section_segments":10,"offset":{"x":25,"y":50,"z":-40},"position":{"x":[-2,0,0,0,0,0,0,0],"y":[-170,-90,0,95,110,113,100],"z":[0,0,0,0,0,0,0,0]},"width":[0,10,10,12,12,10,0],"height":[0,10,10,12,12,10,0],"texture":[4,13,4,13,17,17],"propeller":true}},"typespec":{"name":"U-Marksman","level":7,"model":4,"code":704,"specs":{"shield":{"capacity":[500,500],"reload":[12,12]},"generator":{"capacity":[800,800],"reload":[95,95]},"ship":{"mass":800,"speed":[125,125],"rotation":[20,20],"acceleration":[60,60]}},"shape":[16.586,15.574,12.669,7.639,5.786,4.597,3.916,3.82,3.954,3.94,3.792,3.697,3.539,3.45,3.624,3.857,4.01,4.198,4.177,4.128,4.601,5.79,6.647,7.664,7.633,7.513,7.633,7.664,6.647,5.79,6.143,6.137,5.659,5.111,4.723,4.591,4.412,4.311,4.308,4.415,4.524,4.752,5.112,5.538,5.608,5.551,5.786,6.218,7.353,15.574],"lasers":[{"x":0,"y":-9.66,"z":0,"angle":0,"damage":[25,25],"rate":1,"type":1,"speed":[400,400],"number":24,"spread":0,"error":0,"recoil":50},{"x":2.3,"y":-15.18,"z":0,"angle":0,"damage":[1,1],"rate":10,"type":1,"speed":[700,700],"number":1,"spread":0,"error":0,"recoil":0}],"radius":16.586}}';
var Shadow_X_27_705 = '{"name":"Shadow X-27","level":7,"model":5,"size":3,"specs":{"shield":{"capacity":[600,600],"reload":[10,10]},"generator":{"capacity":[1000,1000],"reload":[200,200]},"ship":{"mass":400,"speed":[90,90],"rotation":[50,50],"acceleration":[110,110]}},"bodies":{"main":{"section_segments":10,"offset":{"x":0,"y":20,"z":-5},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-30,-40,0,40,70,75,80,70],"z":[0,0,0,0,0,0,0,0]},"width":[0,7,20,20,10,10,10,0],"height":[0,10,30,30,20,20,20,0],"texture":[13,1,2,10,13,17,18],"propeller":true},"main_shell":{"section_segments":[0,60,120,180],"offset":{"x":-6,"y":20,"z":-5},"position":{"x":[0,0,0,0,-10,-10],"y":[-50,-60,0,30,70,60],"z":[0,0,0,0,0,0]},"width":[0,5,20,20,5,0],"height":[0,10,35,35,20,0],"texture":[17,4,4,63]},"cockpit":{"section_segments":8,"offset":{"x":0,"y":0,"z":10},"position":{"x":[0,0,0,0],"y":[-20,20,50],"z":[-13,10,10]},"width":[8,8,8],"height":[10,8,8],"texture":[9,9,4]},"cannons":{"section_segments":12,"offset":{"x":50,"y":-40,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-15,0,-3,0,3,3,5,5,8,8,10,10,13,13,15,15,18,18,20,20,23,23,25,25,40,80,100,95,105,100],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,3,7,4,4,5,5,4,4,5,5,4,4,5,5,4,4,5,5,4,4,5,5,4,25,23,20,10,10,0],"height":[0,3,7,4,4,5,5,4,4,5,5,4,4,5,5,4,4,5,5,4,4,5,5,4,15,25,20,15,15,0],"texture":[6,18,17,4,4,17,4,4,4,17,4,4,4,17,4,4,4,17,4,4,4,17,4,4,63,13,11,17,18],"propeller":true,"laser":{"damage":[10,10],"rate":2,"type":2,"speed":[280,280],"recoil":15,"number":45,"error":0}},"cannon_detail1":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":50,"y":65,"z":15},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-110,-110,-90,-90,-80,-60,-60,-30,-20,-20],"z":[0,0,0,2,2,-10,0,0,-3,-3]},"width":[0,3,3,2,3,3,10,10,10,0],"height":[0,5,5,2,2,20,10,10,10,0],"texture":[4,63,2,4,4,4,17.96,4]},"cannon_detail2":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":50,"y":65,"z":-35},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-110,-110,-90,-90,-80,-60,-60,-30,-20,-20],"z":[0,0,0,-2,-2,10,0,0,3,3]},"width":[0,3,3,2,3,3,10,10,10,0],"height":[0,5,5,2,2,20,10,10,10,0],"texture":[4,63,2,4,4,4,17.96,4]},"tip_disc":{"section_segments":6,"offset":{"x":50,"y":-140,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,0,0,0,0,2,2,2,0,0],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[13,13,13,15,15,15,10,13,13,13],"height":[8,8,8,10,10,10,10,8,8,8],"texture":[4]},"gun_disc":{"section_segments":6,"offset":{"x":50,"y":-10,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,0,0,0,0,2,2,2,0,0],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[13,13,13,15,15,15,10,13,13,13],"height":[13,13,13,15,15,15,10,13,13,13],"texture":[4]},"balla":{"angle":90,"section_segments":16,"offset":{"x":50,"y":-45,"z":16},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-5.2,-5,-4.4,-3,0,3,4.4,5,5.2],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,2,3.4000000000000004,4.800000000000001,5.6000000000000005,4.800000000000001,3.4000000000000004,2,0],"height":[0,2,3.4000000000000004,4.800000000000001,5.6000000000000005,4.800000000000001,3.4000000000000004,2,0],"texture":[6]},"ballb":{"angle":90,"section_segments":16,"offset":{"x":50,"y":-45,"z":-36},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-5.2,-5,-4.4,-3,0,3,4.4,5,5.2],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,2,3.4000000000000004,4.800000000000001,5.6000000000000005,4.800000000000001,3.4000000000000004,2,0],"height":[0,2,3.4000000000000004,4.800000000000001,5.6000000000000005,4.800000000000001,3.4000000000000004,2,0],"texture":[6]},"uwings1":{"section_segments":[0,60,120,180],"offset":{"x":-60,"y":-50,"z":-10},"position":{"x":[0,0,0,0,0,0],"y":[-90,-110,60,120,100],"z":[0,0,0,0,0,0]},"width":[0,5,25,15,0],"height":[0,10,25,20,0],"texture":[17,4]},"uwings2":{"section_segments":[0,60,120,180],"offset":{"x":40,"y":-50,"z":-10},"position":{"x":[0,0,0,0,0,0],"y":[-90,-110,60,120,100],"z":[0,0,0,0,0,0]},"width":[0,5,25,15,0],"height":[0,10,25,20,0],"texture":[17,4]},"uwings3":{"section_segments":6,"offset":{"x":50,"y":-50,"z":4},"position":{"x":[0,0,0,0,0,0,0],"y":[40,40,60,60,100,100],"z":[-13,-13,0,0,0,0,0]},"width":[0,10,10,25,15,0],"height":[0,10,15,15,15,0],"texture":[4,13,63]},"uwings4":{"section_segments":6,"offset":{"x":50,"y":-50,"z":-24},"position":{"x":[0,0,0,0,0,0,0],"y":[40,40,60,60,100,100],"z":[13,13,0,0,0,0,0]},"width":[0,10,10,25,15,0],"height":[0,10,15,15,15,0],"texture":[4,13,63]},"wire":{"section_segments":8,"angle":-60,"offset":{"x":15,"y":40,"z":39},"position":{"x":[5,5,5,10,21,23,24,20,10,10,10],"y":[-40,-40,-40,-40,-28,-18,-8,2,12,11],"z":[-30,-30,-30,-29,-16,-10,-7,-10,-20,-20,-20]},"width":[4,4,4,4,4,4,4,4,4,0],"height":[0,3,3,3,3,3,3,3,4,0],"propeller":false,"texture":[13,13,17,4,17,4,17,4,17]},"side_engines":{"section_segments":10,"offset":{"x":30,"y":90,"z":15},"position":{"x":[0,0,0,0,0,0,0],"y":[-55,-60,-50,-20,-15,-10,-20],"z":[0,0,0,0,0,0,0]},"width":[0,6,10,10,5,5,0],"height":[0,9,13,13,10,10,0],"propeller":true,"texture":[13,3,8,13,17,18]},"lights1":{"angle":180,"section_segments":[45,135,225,315],"offset":{"x":40,"y":0,"z":-10},"position":{"x":[-4,0,0,0],"y":[-40,-25,140,160],"z":[-4,0,0,0]},"width":[0,2,2,0],"height":[7,7,7,7],"texture":[13,17,13]},"lights2":{"angle":180,"section_segments":[45,135,225,315],"offset":{"x":60,"y":0,"z":-10},"position":{"x":[-4,0,0,0],"y":[-40,-25,140,160],"z":[4,0,0,0]},"width":[0,2,2,0],"height":[7,7,7,7],"texture":[13,17,13]},"x_disc":{"vertical":true,"section_segments":20,"offset":{"x":0,"y":22,"z":-52},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-10,-5,10,8,8,10,13],"z":[0,0,0,0,0,0,0,0]},"width":[22,22,19,17,17,16,0],"height":[25,25,19,17,17,16,0],"texture":[4,18,17,17,18,4]},"x_1":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":60,"z":30},"position":{"x":[-8,-8,8,8],"y":[-16,-16,0,0],"z":[0,0,0,0]},"width":[0,6.4,6.4,0],"height":[0,10,10,0],"texture":[63]},"x_2":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":60,"z":28},"position":{"x":[0,0,-8,-8],"y":[-8,-8,0,0],"z":[0,0,0,0]},"width":[0,6.4,6.4,0],"height":[0,10,10,0],"texture":[63]},"x_3":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":60,"z":28},"position":{"x":[8,8,5.44,5.920000000000001],"y":[-16,-16,-13.600000000000001,-9.28],"z":[0,0,0,0]},"width":[0,6.4,6.4,0],"height":[0,10,10,10],"texture":[63]},"hub1":{"angle":-80,"section_segments":20,"offset":{"x":-10,"y":42,"z":-10},"position":{"x":[0,0,0,0,0,0,0],"y":[63,70,68,68,72,73],"z":[0,0,0,0,0,0,0]},"width":[12,10,8,7,5,0],"height":[12,10,8,7,5,0],"texture":[18,18,17,17,18]},"hub2":{"angle":-80,"section_segments":20,"offset":{"x":-10,"y":15,"z":-10},"position":{"x":[0,0,0,0,0,0,0],"y":[67,74,72,72,76,77],"z":[0,0,0,0,0,0,0]},"width":[12,10,8,7,5,0],"height":[12,10,8,7,5,0],"texture":[18,18,17,17,18]}},"typespec":{"name":"Shadow X-27","level":7,"model":5,"code":705,"specs":{"shield":{"capacity":[600,600],"reload":[10,10]},"generator":{"capacity":[1000,1000],"reload":[200,200]},"ship":{"mass":400,"speed":[90,90],"rotation":[50,50],"acceleration":[110,110]}},"shape":[1.202,2.443,9.895,10.347,9.275,7.757,6.691,6.024,5.519,5.205,4.976,4.857,4.837,4.936,5.202,5.424,5.523,5.965,6.017,6.068,5.061,4.948,5.233,5.536,6.027,6.012,6.027,5.536,5.233,4.948,5.061,6.068,6.017,5.965,5.523,5.424,5.202,4.936,4.837,4.857,4.976,5.205,5.519,6.024,6.691,7.757,9.275,10.347,9.895,2.443],"lasers":[{"x":3,"y":-3.3,"z":-0.6,"angle":0,"damage":[10,10],"rate":2,"type":2,"speed":[280,280],"number":45,"spread":0,"error":0,"recoil":15},{"x":-3,"y":-3.3,"z":-0.6,"angle":0,"damage":[10,10],"rate":2,"type":2,"speed":[280,280],"number":45,"spread":0,"error":0,"recoil":15}],"radius":10.347}}';

var Bomb_799 = '{"name":"Bomb","level":7.9,"model":9,"size":1.05,"teamMarkerSize":0,"specs":{"shield":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"generator":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"ship":{"mass":1e+300,"speed":[800,800],"rotation":[1e+300,1e+300],"acceleration":[1e+300,1e+300]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":0,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-65,-60,-50,-20,10,30,55,75,60],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,8,10,30,25,30,18,15,0],"height":[0,6,8,12,20,20,18,15,0],"propeller":true,"texture":[4,63,10,1,1,1,12,17]},"cockpit":{"section_segments":12,"offset":{"x":0,"y":0,"z":20},"position":{"x":[0,0,0,0,0,0,0],"y":[-15,0,20,30,60],"z":[0,0,0,0,0]},"width":[0,13,17,10,5],"height":[0,18,25,18,5],"propeller":false,"texture":[7,9,9,4,4]},"cannon":{"section_segments":6,"offset":{"x":0,"y":-15,"z":-10},"position":{"x":[0,0,0,0,0,0],"y":[-40,-50,-20,0,20,30],"z":[0,0,0,0,0,20]},"width":[0,5,8,11,7,0],"height":[0,5,8,11,10,0],"angle":0,"laser":{"damage":[10000000000000000000,10000000000000000000],"rate":2,"type":1,"speed":[160,180],"number":360,"angle":360},"propeller":false,"texture":[3,3,10,3]}},"wings":{"main":{"length":[60,20],"width":[100,50,40],"angle":[-10,10],"position":[0,20,10],"doubleside":true,"offset":{"x":0,"y":10,"z":5},"bump":{"position":30,"size":20},"texture":[11,63]}},"typespec":{"name":"Bomb","level":7.9,"model":9,"code":799,"specs":{"shield":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"generator":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"ship":{"mass":1e+300,"speed":[800,800],"rotation":[1e+300,1e+300],"acceleration":[1e+300,1e+300]}},"shape":[1.368,1.368,1.093,0.965,0.883,0.827,0.791,0.767,0.758,0.777,0.847,0.951,1.092,1.667,1.707,1.776,1.856,1.827,1.744,1.687,1.525,1.415,1.335,1.606,1.603,1.578,1.603,1.606,1.335,1.415,1.525,1.687,1.744,1.827,1.856,1.776,1.707,1.667,1.654,0.951,0.847,0.777,0.758,0.767,0.791,0.827,0.883,0.965,1.093,1.368],"lasers":[{"x":0,"y":-1.365,"z":-0.21,"angle":0,"damage":[10000000000000000000,10000000000000000000],"rate":2,"type":1,"speed":[160,180],"number":360,"spread":360,"error":0,"recoil":0}],"radius":1.856}}';

var ships = [];
 
ships.push(U_Penta_301);
ships.push(U_Spread_302);
ships.push(H_Warrior_303);
ships.push(U_Sentry_304);
 
ships.push(U_Arsenal_401);
ships.push(U_Center_402);
ships.push(U_Interceptor_403);
ships.push(U_Speeder_404);
ships.push(U_Siege_405);
 
ships.push(U_Punisher_501);
ships.push(U_Octa_502);
ships.push(H_Destroyer_503);
ships.push(Trailblazer_504);
ships.push(U_Demon_505);
ships.push(U_Pulsar_506);
 
ships.push(U_Barricade_601);
ships.push(U_Monitor_602); 
ships.push(U_Perimeter_603);
ships.push(U_Bruiser_604);
ships.push(U_Afterburn_605);
ships.push(U_Smasher_606); 
ships.push(Hellfire_607); 
ships.push(U_10_Thunder_608);
 
ships.push(U_Wall_701);
ships.push(Heartbreaker_702);
ships.push(U_Fusion_703);
ships.push(U_Marksman_704);
ships.push(Shadow_X_27_705);

ships.push(Bomb_799);

var ships_list = [
  ["U-Penta","U-Spread","H-Warrior","U-Sentry"],
  ["U-Arsenal","U-Center","U-Interceptor","U-Speeder","U-Siege"],
  ["U-Punisher","U-Octa","H-Destroyer","Trailblazer","U-Demon","U-Pulsar"],
  ["U-Barricade","U-Monitor","U-Perimeter","U-Bruiser","U-Afterburn","U-Smasher","Hellfire","U-10 Thunder"],
  ["U-Wall","Heartbreaker","U-Fusion","U-Marksman","Shadow X-27"]
];

function findShipCode(name){
  for (let i=0;i<ships_list.length;i++)
  for (let j=0;j<ships_list[i].length;j++)
  if (ships_list[i][j] == name) return (i+3)*100+j+1;
  return null;
}

function shuffle(array,yeetus){
  var tmp, current, top = array.length;
  if (top) while(--top){
    current = Math.floor(Math.random()*(top+1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
  }
  if (yeetus) return array.slice(0,yeetus);
  return array;
}

function getRandByRatio(tierratio){
  let idx = Math.floor(Math.random()*101);
  for (let item of tierratio){
    if (idx >= item.r[0] && idx <= item.r[1]) return item.t;
  }
}

var chooseships,maps = [1761,1749,77,45,4360,3604,5575,4990],music = ["warp_drive.mp3","crystals.mp3","argon.mp3"],
tierratio = [{t:3,r:[0,6]},{t:4,r:[7,16]},{t:5,r:[17,41]},{t:6,r:[42,74]},{t:7,r:[75,100]}/*6,17,25,33,17*/];
var colors = [
  {team:"Red",hue:0,team2:"Blue",hue2:240},
  {team:"Yellow",hue:60,team2:"Pink",hue2:300},
  {team:"Green",hue:120,team2:"Purple",hue2:270},
  {team:"Aqua",hue:150,team2:"Orange",hue2:30}
];
if (!game.custom.ship_name){
  game.custom.ship_name = true;
  if (modifier.round_ship_tier === "random")
  modifier.round_ship_tier = getRandByRatio(tierratio);
  var tier = modifier.round_ship_tier,ship_name,rand_ships,ship_choices = 4;
  switch (modifier.round_ship_tier){
    case 3:
    case 4:
      ship_choices = 3;
      break;
    case 5:
      ship_choices = 3;
      break;
    case 7:
      ship_choices = false;
    break;
  }
  ship_name = JSON.parse(JSON.stringify(ships_list[tier-3]));
  rand_ships = JSON.parse(JSON.stringify(ships_list[tier-3])).map((n,p) => tier*100+p+1);
  chooseships = shuffle(rand_ships,ship_choices);
  shuffle(colors,false);
  colors = colors[0];
  game.custom.colors = colors;
  game.custom.ship_name = ship_name;
  game.custom.modifier = modifier;
}
colors = game.custom.colors;
modifier = game.custom.modifier;
var ship_name = game.custom.ship_name;
var teams = {
  names: [colors.team,colors.team2],
  points: [0,0],
  count: [0,0],
  ships: [[],[]],
  hues: [colors.hue,colors.hue2]
};

var maps = [
  {name: "Dimension", author: "Liberal", map:
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "99                                                        99\n"+
    "99                                                        99\n"+
    "99  9999999999999999999999999999999999999999999999999999  99\n"+
    "99  9999999999999999999999999999999999999999999999999999  99\n"+
    "99  9999999999999999999999999999999999999999999999999999  99\n"+
    "99  99999999999999999999999      99999999999999999999999  99\n"+
    "99  9999999999999999999999        9999999999999999999999  99\n"+
    "99  999999999999999999999          999999999999999999999  99\n"+
    "99  99999999999999999999            99999999999999999999  99\n"+
    "99  9999999999999999999     9999     9999999999999999999  99\n"+
    "99  99999999999999999                  99999999999999999  99\n"+
    "99  9999999999999999                    9999999999999999  99\n"+
    "99  99999 999999999                      999999999 99999  99\n"+
    "99  9999   9999999                        9999999   9999  99\n"+
    "99  999     99999        7997  7997        99999     999  99\n"+
    "99  99       999                            999       99  99\n"+
    "99  99        9    7                    7    9        99  99\n"+
    "99  99             9                    9             99  99\n"+
    "99  99             9                    9             99  99\n"+
    "99  99   7         7   99997    79999   7         7   99  99\n"+
    "99  99   99           99            99           99   99  99\n"+
    "99  99    99          7              7          99    99  99\n"+
    "99  99     99                                  99     99  99\n"+
    "99  99      99                                99      99  99\n"+
    "99  99      999   97                    79   999      99  99\n"+
    "99  99      9799 99        7    7        99 9979      99  99\n"+
    "99  99      977999        99    99        999779      99  99\n"+
    "99  99      97779        99      99        97779      99  99\n"+
    "99  99      97779        99      99        97779      99  99\n"+
    "99  99      977999        99    99        999779      99  99\n"+
    "99  99      9799 99        7    7        99 9979      99  99\n"+
    "99  99      999   97                    79   999      99  99\n"+
    "99  99      99                                99      99  99\n"+
    "99  99     99                                  99     99  99\n"+
    "99  99    99          7              7          99    99  99\n"+
    "99  99   99           99            99           99   99  99\n"+
    "99  99   7         7   99997    79999   7         7   99  99\n"+
    "99  99             9                    9             99  99\n"+
    "99  99             9                    9             99  99\n"+
    "99  99        9    7                    7    9        99  99\n"+
    "99  99       999                            999       99  99\n"+
    "99  999     99999        7997  7997        99999     999  99\n"+
    "99  9999   9999999                        9999999   9999  99\n"+
    "99  99999 999999999                      999999999 99999  99\n"+
    "99  9999999999999999                    9999999999999999  99\n"+
    "99  99999999999999999                  99999999999999999  99\n"+
    "99  9999999999999999999     9999     9999999999999999999  99\n"+
    "99  99999999999999999999            99999999999999999999  99\n"+
    "99  999999999999999999999          999999999999999999999  99\n"+
    "99  9999999999999999999999        9999999999999999999999  99\n"+
    "99  99999999999999999999999      99999999999999999999999  99\n"+
    "99  9999999999999999999999999999999999999999999999999999  99\n"+
    "99  9999999999999999999999999999999999999999999999999999  99\n"+
    "99  9999999999999999999999999999999999999999999999999999  99\n"+
    "99                                                        99\n"+
    "99                                                        99\n"+
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999999999999999999999999999999999999999999999999999999999999",
  shipspawn: [{x:-210,y:0},{x:210,y:0}],
  radar: {type:"box",width:10,height:18},
  basedmg: [{x:-185,x2:-230,y:40,y2:-40},{x:185,x2:230,y:40,y2:-40}]
  },
  {name: "Waves", author: "Kirito", map:
    "9999    99999        99999        99999        99999    9999\n"+
    "9999    99999        99999        99999        99999    9999\n"+
    "9999    99999       99999997    79999999       99999    9999\n"+
    "9999    99999     66999999        99999966     99999    9999\n"+
    "9999    99999        99999        99999        99999    9999\n"+
    "9999   9999999       99999        99999       9999999   9999\n"+
    "9999  699999996      9999          9999      699999996  9999\n"+
    "9999    99999        9999          9999        99999    9999\n"+
    "99999   99999        9999          9999        99999   99999\n"+
    "999996  99999       99999          99999       99999  699999\n"+
    "999     9999        99999          99999        9999     999\n"+
    "999     9999        9999            9999        9999     999\n"+
    "99     9999         9999            9999         9999     99\n"+
    "99     9999        799997  6    6  799997        9999     99\n"+
    "99    799997        9999   6    6   9999        799997    99\n"+
    "99     9999         9999   6    6   9999         9999     99\n"+
    "99     9999         999   99    99   999         9999     99\n"+
    "99      9999         99  699    996  99         9999      99\n"+
    "99      9999             699    996             9999      99\n"+
    "99      9999             999    999             9999      99\n"+
    "99      9999             999    999             9999      99\n"+
    "99      99999            999    999            99999      99\n"+
    "99      99999            999    999            99999      99\n"+
    "99       9999           6999    9996           9999       99\n"+
    "99       9999           9999    9999           9999       99\n"+
    "99      799997         6999      9996         799997      99\n"+
    "99       9999          6999      9996          9999       99\n"+
    "99        99          6999        9996          99        99\n"+
    "99                    999          999                    99\n"+
    "99                    999          999                    99\n"+
    "99                    999          999                    99\n"+
    "99                    999          999                    99\n"+
    "99        99          6999        9996          99        99\n"+
    "99       9999          6999      9996          9999       99\n"+
    "99      799997         6999      9996         799997      99\n"+
    "99       9999           9999    9999           9999       99\n"+
    "99       9999           6999    9996           9999       99\n"+
    "99      99999            999    999            99999      99\n"+
    "99      99999            999    999            99999      99\n"+
    "99      9999             999    999             9999      99\n"+
    "99      9999             999    999             9999      99\n"+
    "99      9999             699    996             9999      99\n"+
    "99      9999         99  699    996  99         9999      99\n"+
    "99     9999         999   99    99   999         9999     99\n"+
    "99     9999         9999   6    6   9999         9999     99\n"+
    "99    799997        9999   6    6   9999        799997    99\n"+
    "99     9999        799997  6    6  799997        9999     99\n"+
    "99     9999         9999            9999         9999     99\n"+
    "999     9999        9999            9999        9999     999\n"+
    "999     9999        99999          99999        9999     999\n"+
    "999996  99999       99999          99999       99999  699999\n"+
    "99999   99999        9999          9999        99999   99999\n"+
    "9999    99999        9999          9999        99999    9999\n"+
    "9999  699999996      9999          9999      699999996  9999\n"+
    "9999   9999999       99999        99999       9999999   9999\n"+
    "9999    99999        99999        99999        99999    9999\n"+
    "9999    99999     66999999        99999966     99999    9999\n"+
    "9999    99999       99999997    79999999       99999    9999\n"+
    "9999    99999        99999        99999        99999    9999\n"+
    "9999    99999        99999        99999        99999    9999",
  shipspawn: [{x:-120,y:0},{x:120,y:0}],
  radar: {type:"box",width:10,height:20},
  basedmg: [{x:-140,x2:-100,y:-50,y2:50},{x:100,x2:140,y:-50,y2:50}]
  },
  {name: "Slides", author: "Healer", map:
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "9          999999999999999999  999999999999999999          9\n"+
    "9  9999999999              99  999     999     999   999   9\n"+
    "9 99999999                  9  9999     999     999   999  9\n"+
    "9 999                       9  99999     999     999   999 9\n"+
    "9 99                    9   9  9 9999     999     999   99 9\n"+
    "9 99          9        99   9  9  9999     999     999   9 9\n"+
    "9 99         99       999   9  9   9999     999     999    9\n"+
    "9 99        99       999    9  9    9999     999     999   9\n"+
    "9 99       999      999     9  9     9999     999     999  9\n"+
    "9 9       999      999      9  9      9999     999     999 9\n"+
    "9 9      999      999       9  9       9999     999     99 9\n"+
    "999     999      999         9 99       9999     999     999\n"+
    "99     999                    9999       9999     999     99\n"+
    "99    99      99               9999       9999     999    99\n"+
    "99            99                9999       9999     999   99\n"+
    "99                               9999       9999     999  99\n"+
    "99          9                     9999       9999     999 99\n"+
    "99         99        9999          9999       9999     99999\n"+
    "99        999       9999            9999       9999     9999\n"+
    "99       999       9999              9999       9999     999\n"+
    "99      999       9999                9999       9999     99\n"+
    "99     999        999                  9999       9999    99\n"+
    "99    999         99        9999        9999       9999   99\n"+
    "99   999          9                      9999       9999  99\n"+
    "99                                        9999       9999 99\n"+
    "99                                         9999       999999\n"+
    "999                        9    9           9999       99999\n"+
    "999999999999           9    9  9    9        999999999999999\n"+
    "          999          9     99     9         9999          \n"+
    "           999         9     99     9          999          \n"+
    "999999999999999        9    9  9    9           999999999999\n"+
    "99999       9999           9    9                        999\n"+
    "999999       9999                                         99\n"+
    "99 9999       9999                                        99\n"+
    "99  9999       9999                      9          999   99\n"+
    "99   9999       9999        9999        99         999    99\n"+
    "99    9999       9999                  999        999     99\n"+
    "999    9999       9999                9999       999      99\n"+
    "9999    9999       9999              9999       999       99\n"+
    "99999    9999       9999            9999       999        99\n"+
    "999999    9999       9999          9999        99         99\n"+
    "99 9999    9999       9999                     9          99\n"+
    "99  9999    9999       9999                               99\n"+
    "99   9999    9999       9999                99            99\n"+
    "99    9999    9999       9999               99      99    99\n"+
    "999    9999    9999       9999                    999     99\n"+
    "9999    9999    9999       9999         999      999     999\n"+
    "99999    9999    9999       9999       999      999      9 9\n"+
    "9 9999    9999    9999      9999      999      999       9 9\n"+
    "9  9999    9999    9999     9 99     999      999       99 9\n"+
    "9   9999    9999    9999    9  9    999       99        99 9\n"+
    "9    9999    9999    9999   9  9   999       99         99 9\n"+
    "9 9   9999    9999    9999  9  9   99        9          99 9\n"+
    "9 99   9999    9999    9999 9  9   9                    99 9\n"+
    "9 999   9999    9999    99999  9                       999 9\n"+
    "9  999   9999    9999    9999  9                  99999999 9\n"+
    "9   999   9999    9999    999  99              9999999999  9\n"+
    "9          999999999999999999  999999999999999999          9\n"+
    "999999999999999999999999999999999999999999999999999999999999",
  shipspawn: [{x:-220,y:220},{x:220,y:-220}],
  radar: {type:"box",width:8,height:8},
  basedmg: [{x:-200,x2:-235,y:200,y2:240},{x:200,x2:235,y:-200,y2:-240}]
  },
  {name: "Rammer's Paradise", author: "Destroy", map:
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999999999999999999999                 9999999999999999999999\n"+
    "999999999999999999999                 9999999999999999999999\n"+
    "999999999999999999999                 9999999999999999999999\n"+
    "999999999999999999999                 9999999999999999999999\n"+
    "999999999999999999999                 9999999999999999999999\n"+
    "999999999999999999999    9       9    9999999999999999999999\n"+
    "9999999999999999999     999     999     99999999999999999999\n"+
    "99999999999               999  99              9999999999999\n"+
    "9999999999                  9  9                999999999999\n"+
    "99999                     999  999                     99999\n"+
    "9999                   9999      9999                   9999\n"+
    "999                    9            9                    999\n"+
    "999             9     99            99     9             999\n"+
    "999             99999999            99999999             999\n"+
    "999             9      9999      9999      9             999\n"+
    "9999            9         9      9         9            9999\n"+
    "99999           9         9      9         9           99999\n"+
    "99999999999     9         9      9         9      9999999999\n"+
    "99999999999     9         9      9         9      9999999999\n"+
    "99999999999     9         9      9        99      9999999999\n"+
    "99999999999     99        9      9                9999999999\n"+
    "99999999999               9      9                9999999999\n"+
    "99999999999               9      9                8888899999\n"+
    "9999999                   9      9                   9899999\n"+
    "999999                  999      999                  899999\n"+
    "999999                 99          99                 899999\n"+
    "999999                 9            9                 899999\n"+
    "999999          99     9            9     99          899999\n"+
    "999999          9      9            9      9          899999\n"+
    "999999          9      9            9      9          899999\n"+
    "999999          9      99          99      9          899999\n"+
    "999999          9                          9          899999\n"+
    "9999999         9                          9         9899999\n"+
    "9999999999      9                          9     99889999999\n"+
    "9999999999      999999999          999999999     99999999999\n"+
    "9999999999      9      9            9      9     99999999999\n"+
    "9999999999             9            9            99999999999\n"+
    "9999999999             9            9            99999999999\n"+
    "9999999999             9            9            99999999999\n"+
    "99999                  9            9                  99999\n"+
    "999                    99          99                    999\n"+
    "999                    99999    99999                    999\n"+
    "999             9      9            9      9             999\n"+
    "999             99999999            99999999             999\n"+
    "999             9      9            9      9             999\n"+
    "999                    9            9                    999\n"+
    "9999                   99999    99999                   9999\n"+
    "99999999999              999    999             999999999999\n"+
    "99999999999              999    999            9999999999999\n"+
    "9999999999999999999       99    99      99999999999999999999\n"+
    "999999999999999999999      9    9     9999999999999999999999\n"+
    "999999999999999999999                 9999999999999999999999\n"+
    "999999999999999999999                 9999999999999999999999\n"+
    "999999999999999999999                 9999999999999999999999\n"+
    "999999999999999999999                 9999999999999999999999\n"+
    "999999999999999999999                 9999999999999999999999\n"+
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999999999999999999999999999999999999999999999999999999999999",
  shipspawn: [{x:0,y:-255},{x:0,y:255}],
  radar: {type:"box",width:13,height:7},
  basedmg: [{x:-30,x2:30,y:-240,y2:-270},{x:-30,x2:30,y:240,y2:270}]
  },
  {name: "Barriers", author: "Healer", map:
    "9999999999       9999999999      9999999999       9999999999\n"+
    "99999999999                                      99999999999\n"+
    "9         99                                    99         9\n"+
    "9 9999999999   9999999999999    9999999999999   9999999999 9\n"+
    "9 9       99                                    99       9 9\n"+
    "9 9        9                                    9        9 9\n"+
    "9 9                                                      9 9\n"+
    "9 9                                                      9 9\n"+
    "9 9                                                      9 9\n"+
    "9 9      99       999999            999999       99      9 9\n"+
    "9 9     999         99                99         999     9 9\n"+
    "9 9   99999                                      99999   9 9\n"+
    "9 9   999                                          999   9 9\n"+
    "999   999                                          999   999\n"+
    "9     999                                          999     9\n"+
    "9      99                                          99      9\n"+
    "9      99                                          99      9\n"+
    "9     999                                          999     9\n"+
    "9    9999                                          9999    9\n"+
    "9     99                                            99     9\n"+
    "9  9   9                                            9   9  9\n"+
    "9 999       9999999                      9999999       999 9\n"+
    "9 999                                                  999 9\n"+
    "9999                        9  9                        9999\n"+
    "999                        99  99                        999\n"+
    "99         99                                  99         99\n"+
    "99         9                                    9         99\n"+
    "99         9      9                      9      9         99\n"+
    "99         9      9                      9      9         99\n"+
    "99         9      9                      9      9         99\n"+
    "99         9      9                      9      9         99\n"+
    "99         9      9                      9      9         99\n"+
    "99         9      9                      9      9         99\n"+
    "99         9                                    9         99\n"+
    "99         99                                  99         99\n"+
    "999                        99  99                        999\n"+
    "9999                        9  9                        9999\n"+
    "9 999                                                  999 9\n"+
    "9 999       9999999                      9999999       999 9\n"+
    "9  9   9                                            9   9  9\n"+
    "9     99                                            99     9\n"+
    "9    9999                                          9999    9\n"+
    "9     999                                          999     9\n"+
    "9      99                                          99      9\n"+
    "9      99                                          99      9\n"+
    "9     999                                          999     9\n"+
    "999   999                                          999   999\n"+
    "9 9   999                                          999   9 9\n"+
    "9 9   99999                                      99999   9 9\n"+
    "9 9     999         99                99         999     9 9\n"+
    "9 9      99       999999            999999       99      9 9\n"+
    "9 9                                                      9 9\n"+
    "9 9                                                      9 9\n"+
    "9 9                                                      9 9\n"+
    "9 9        9                                    9        9 9\n"+
    "9 9       99                                    99       9 9\n"+
    "9 9999999999   9999999999999    9999999999999   9999999999 9\n"+
    "9         99                                    99         9\n"+
    "99999999999                                      99999999999\n"+
    "9999999999       9999999999      9999999999       9999999999",
  shipspawn: [{x:-235,y:0},{x:235,y:0}],
  radar: {type:"box",width:10,height:14},
  basedmg: [{x:-210,x2:-253,y:35,y2:-35},{x:210,x2:253,y:35,y2:-35}]
  },
  {name: "Heartache", author: "GumZ", map:
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999   99999999999      99999999999999      99999999999   999\n"+
    "99   9999999999999    9999  9999  9999    9999999999999   99\n"+
    "99  999999999999999  9999    99    9999  999999999999999  99\n"+
    "99 99999999999999999 999     99     999 99999999999999999 99\n"+
    "9999999 9999999999999999            9999999999999999 9999999\n"+
    "999999      999999999999            999999999999      999999\n"+
    "99999   899     99999999            99999999     998   99999\n"+
    "99999    99        999999          999999        99    99999\n"+
    "99999         899    9999          9999    998         99999\n"+
    "99999          99      999        999      99          99999\n"+
    "99999             899   999      999   998             99999\n"+
    "99999              99   9999    9999   99              99999\n"+
    "99999                    9999  9999                    99999\n"+
    "99999                     99999999                     99999\n"+
    "99999                899  99999999  998                99999\n"+
    "99999                 99  99999999  99                 99999\n"+
    "99999     9                999999                9     99999\n"+
    "99999     99               999999               99     99999\n"+
    "99999     999              999999              999     99999\n"+
    "99999     999              999999              999     99999\n"+
    "99999     9999              9999              9999     99999\n"+
    "99999     9999              9999              9999     99999\n"+
    "99999      999              9999              999      99999\n"+
    "99999      9999             8998             9999      99999\n"+
    "99999      9999              88              9999      99999\n"+
    "99999       999                              999       99999\n"+
    "99999       999                              999       99999\n"+
    "99999       999                              999       99999\n"+
    "99999       999                              999       99999\n"+
    "99999       999                              999       99999\n"+
    "99999       999                              999       99999\n"+
    "99999      9999              88              9999      99999\n"+
    "99999      9999             8998             9999      99999\n"+
    "99999      999              9999              999      99999\n"+
    "99999     9999              9999              9999     99999\n"+
    "99999     9999              9999              9999     99999\n"+
    "99999     999              999999              999     99999\n"+
    "99999     999              999999              999     99999\n"+
    "99999     99               999999               99     99999\n"+
    "99999     9                999999                9     99999\n"+
    "99999                 99  99999999  99                 99999\n"+
    "99999                899  99999999  998                99999\n"+
    "99999                     99999999                     99999\n"+
    "99999                    9999  9999                    99999\n"+
    "99999              99   9999    9999   99              99999\n"+
    "99999             899   999      999   998             99999\n"+
    "99999          99      999        999      99          99999\n"+
    "99999         899    9999          9999    998         99999\n"+
    "99999    99        999999          999999        99    99999\n"+
    "99999   899     99999999            99999999     998   99999\n"+
    "999999      999999999999            999999999999      999999\n"+
    "9999999 9999999999999999            9999999999999999 9999999\n"+
    "99 99999999999999999 999     99     999 99999999999999999 99\n"+
    "99  999999999999999  9999    99    9999  999999999999999  99\n"+
    "99   9999999999999    9999  9999  9999    9999999999999   99\n"+
    "999   99999999999      99999999999999      99999999999   999\n"+
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999999999999999999999999999999999999999999999999999999999999",
  shipspawn: [{x:-215,y:0},{x:215,y:0}],
  radar: {type:"box",width:10,height:14},
  basedmg: [{x:-190,x2:-235,y:30,y2:-30},{x:190,x2:235,y:30,y2:-30}]
  },
  {name: "Angles", author: "Paindemic", map:
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "99999999999 555555 599    99999999    595 555555 99999999999\n"+
    "999      99 59995 599    999    999    595 59995 995 5 5 999\n"+
    "999      99 5995 599    999      999    595 5995 9955 5 5999\n"+
    "999      99 595 599    999        999    595 595 9999995 999\n"+
    "999       99 5 599    999          999    595 555999999 5999\n"+
    "999        99 599    999            999    595 595   995 999\n"+
    "999         9999    999              999999999595 5  9955999\n"+
    "999999       9      99                9999999995 595 9999999\n"+
    "9999999             9                  9999999995 5 59999999\n"+
    "99    99                                       595 595    99\n"+
    "995555 99                                       595955555599\n"+
    "9959995 99                                       995 5999599\n"+
    "995995 59                                        9995 599599\n"+
    "99595 599                                        99995 59599\n"+
    "9955 599                                         999595 5599\n"+
    "995 599                   999999999              999 595 599\n"+
    "99 599                     99999999              999  595 99\n"+
    "99599                       9999999              999   59599\n"+
    "9999    999                      99              999    5999\n"+
    "999    999                       99               999    599\n"+
    "99    999                        99                999    99\n"+
    "99   999         9999999         9999999            999   99\n"+
    "99  999           9999999         999999             999  99\n"+
    "99 999               9999          9999               999 99\n"+
    "99999                 99            99                 99999\n"+
    "9999                  99            99                  9999\n"+
    "999                   99            99                   999\n"+
    "999999999      999999999            999999999      999999999\n"+
    "9999999999     999999999            999999999     9999999999\n"+
    "999                   99            99                   999\n"+
    "9999                  99            99                  9999\n"+
    "99999                 99            99                 99999\n"+
    "99 999               9999          9999               999 99\n"+
    "99  999             999999         9999999           999  99\n"+
    "99   999            9999999         9999999         999   99\n"+
    "99    999                99                        999    99\n"+
    "995    999               99                       999    999\n"+
    "9995    999              99                      999    9999\n"+
    "99595   999              9999999                       99599\n"+
    "99 595  999              99999999                     995 99\n"+
    "995 595 999              999999999                   995 599\n"+
    "9955 595999                                         995 5599\n"+
    "99595 59999                                        995 59599\n"+
    "995995 5999                                        95 599599\n"+
    "9959995 595                                       99 5999599\n"+
    "995555559595                                       99 555599\n"+
    "99    595 595                                       99    99\n"+
    "99999995 5 5959999999                  9             9999999\n"+
    "9999999 595 5999999999                99      9       999999\n"+
    "9995599  5 599999999999              999    9999         999\n"+
    "999 599   595 595    999            999    995 99        999\n"+
    "9995 999999555 595    999          999    995 5 99       999\n"+
    "999 5999999 595 595    999        999    995 595 99      999\n"+
    "9995 5 5599 5995 595    999      999    995 5995 99      999\n"+
    "999 5 5 599 59995 595    999    999    995 59995 99      999\n"+
    "99999999999 555555 595    99999999    995 555555 99999999999\n"+
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999999999999999999999999999999999999999999999999999999999999",
  shipspawn: [{x:-240,y:240},{x:240,y:-240}],
  radar: {type:"box",width:8,height:8},
  basedmg: [{x:-220,x2:-260,y:220,y2:260},{x:220,x2:260,y:-220,y2:-260}]
  },
  {name: "Butterfly", author: "Healer", map:
    "   99999  9999999     999999    999999     9999999  99999   \n"+
    "    9999999999  999999   9999999999   999999  9999999999    \n"+
    "           99    999      9      9      999    99           \n"+
    "9           9     99      9      9      99     9           9\n"+
    "99                                                        99\n"+
    "99                                                        99\n"+
    "99                     99          99                     99\n"+
    "99                     999        999                     99\n"+
    " 9        999          999        999          999        9 \n"+
    " 9        99            99        99            99        9 \n"+
    "99      999             99        99             999      99\n"+
    "999     99              99        99              99     999\n"+
    "9999    9              99          99              9    9999\n"+
    "99                    99            99                    99\n"+
    "9                    99              99                    9\n"+
    "9                   99                99                   9\n"+
    "9                  99                  99                  9\n"+
    " 9                99                    99                9 \n"+
    " 9                9                      9                9 \n"+
    " 9                                                        9 \n"+
    " 9                                                        9 \n"+
    " 99                                                      99 \n"+
    "  99                                                    99  \n"+
    "   99   999999                                999999   99   \n"+
    "    999999999                                  999999999    \n"+
    " 9999  9                                            9  9999 \n"+
    "9999  9                                              9  9999\n"+
    "9    9                      9  9                      9    9\n"+
    "99  9                      99  99                      9  99\n"+
    " 999                                                    999 \n"+
    " 999                                                    999 \n"+
    "99  9                      99  99                      9  99\n"+
    "9    9                      9  9                      9    9\n"+
    "9999  9                                              9  9999\n"+
    " 9999  9                                            9  9999 \n"+
    "    999999999                                  999999999    \n"+
    "   99   999999                                999999   99   \n"+
    "  99                                                    99  \n"+
    " 99                                                      99 \n"+
    " 9                                                        9 \n"+
    " 9                                                        9 \n"+
    " 9                9                      9                9 \n"+
    " 9                99                    99                9 \n"+
    "9                  99                  99                  9\n"+
    "9                   99                99                   9\n"+
    "9                    99              99                    9\n"+
    "99                    99            99                    99\n"+
    "9999    9              99          99              9    9999\n"+
    "999     99              99        99              99     999\n"+
    "99      999             99        99             999      99\n"+
    " 9        99            99        99            99        9 \n"+
    " 9        999          999        999          999        9 \n"+
    "99                     999        999                     99\n"+
    "99                     99          99                     99\n"+
    "99                                                        99\n"+
    "99                                                        99\n"+
    "9           9     99      9      9      99     9           9\n"+
    "           99    999      9      9      999    99           \n"+
    "    9999999999  999999   9999999999   999999  9999999999    \n"+
    "   99999  9999999     999999    999999     9999999  99999   ",
  shipspawn: [{x:0,y:-250},{x:0,y:250}],
  radar: {type:"box",width:10,height:10},
  basedmg: [{x:25,x2:-25,y:-215,y2:-255},{x:25,x2:-25,y:215,y2:255}]
  },
  {name: "Duality", author: "crispybreads", map:
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "99                 99999                                  99\n"+
    "99                99999                                   99\n"+
    "99                999                                     99\n"+
    "99                99                                      99\n"+
    "99                88                                      99\n"+
    "99                99                                      99\n"+
    "99            999999                                      99\n"+
    "99         99999999           99999989  9999              99\n"+
    "99        999999             99999999   9999999           99\n"+
    "99       9999                 9999999   999999999         99\n"+
    "99       999                             99999999         99\n"+
    "99       99                                9999999        99\n"+
    "99      999                                  99999        99\n"+
    "99      999                                   9999        99\n"+
    "99      99                                    99999       99\n"+
    "99     999                   9999999           9999       99\n"+
    "99 9999999                  99999999999        9999       99\n"+
    "999999999                   9999988888899       999       99\n"+
    "99999                       9999887777889                 99\n"+
    "9999                        99988776677889                99\n"+
    "9999                       999987766667789      9         99\n"+
    "999                        999987665566789      999       99\n"+
    "99                         9999876655667899     999       99\n"+
    "99                        99999877666677899     999       99\n"+
    "99                       999999887766778899     999       99\n"+
    "99                    999999999988777788999     999       99\n"+
    "99                9999999999999998888889999     999       99\n"+
    "99        9      99999999999999999999999999     999       99\n"+
    "99       999     99999999999999999999999999      9        99\n"+
    "99       999     9999888888999999999999999                99\n"+
    "99       999     999887777889999999999                    99\n"+
    "99       999     998877667788999999                       99\n"+
    "99       999     99877666677899999                        99\n"+
    "99       999     9987665566789999                         99\n"+
    "99       999      987665566789999                        999\n"+
    "99         9      987766667789999                       9999\n"+
    "99                98877667788999                        9999\n"+
    "99                 9887777889999                       99999\n"+
    "99       999       9988888899999                   998999999\n"+
    "99       9999        99999999999                  9988999 99\n"+
    "99       8999           9999999                   998     99\n"+
    "99       99999                                    98      99\n"+
    "99        9999                                   998      99\n"+
    "99        99999                                  999      99\n"+
    "99        9999999                                99       99\n"+
    "99         99999999                             999       99\n"+
    "99         999999999   9999999                 9999       99\n"+
    "99           9999999   99999999             999999        99\n"+
    "99              9999  99999999           99999999         99\n"+
    "99                                      999889            99\n"+
    "99                                      99                99\n"+
    "99                                      88                99\n"+
    "99                                      99                99\n"+
    "99                                     999                99\n"+
    "99                                   99999                99\n"+
    "99                                  99999                 99\n"+
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999999999999999999999999999999999999999999999999999999999999",
  shipspawn: [{x:-220,y:-220},{x:220,y:220}],
  radar: {type:"box",width:12,height:12},
  basedmg: [{x:-190,x2:-250,y:-190,y2:-250},{x:190,x2:250,y:190,y2:250}]
  },
  {name: "Dominus", author: "SChickenMan", map:
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "9     999999999999999999999999999999                       9\n"+
    "9 999999                          999                      9\n"+
    "9 9  99                            9999999999999999999999  9\n"+
    "9 9 99                              999999999999999999999  9\n"+
    "9 999                                99                99  9\n"+
    "9999        9999999999999999999       99               99  9\n"+
    "999          9999999999999999999       99999999999999  99  9\n"+
    "99                        999999             99     9  99  9\n"+
    "99                         99999              9     9  99  9\n"+
    "99                          9999              9999  9  99  9\n"+
    "99                           999              99 9  9  99  9\n"+
    "99    9                       999999999999     999  9  99  9\n"+
    "99    99     99999             9999999999       99999  99  9\n"+
    "99    99     99  99                  999           99  99  9\n"+
    "99    99     9 99 99                999             9  99  9\n"+
    "99    99     9 999 99              999              9  99  9\n"+
    "99    99     99 999 99            999               9  99  9\n"+
    "99    99      99 999 99          999 9         9    9  99  9\n"+
    "99    99       99 999 99        99999         99    9  99  9\n"+
    "99    99        99 999 9       99999         999    99 99  9\n"+
    "99    99         99 99 9       9999         9999     9999  9\n"+
    "99    99          99  999      999       9 99999      999  9\n"+
    "99    99           9999999              9 999 99       999 9\n"+
    "99    99              9999             99999  99        9999\n"+
    "99    99               9999           99999   99         999\n"+
    "99    999                99          99999    99          99\n"+
    "99    9999                 9         9999     99          99\n"+
    "99    99999                          999      9999999     99\n"+
    "99    999999                                   9999999    99\n"+
    "99    9999999                                   999999    99\n"+
    "99     9999999      999                          99999    99\n"+
    "99          99     9999         9                 9999    99\n"+
    "99          99    99999          99                999    99\n"+
    "999         99   99999           9999               99    99\n"+
    "9999        99  99999             999999            99    99\n"+
    "9 999       99 999 9              9999999           99    99\n"+
    "9  999      99999 9       999      999  99          99    99\n"+
    "9  9999     9999         9999      99 99 99         99    99\n"+
    "9  99 99    999         99999      99 999 99        99    99\n"+
    "9  99  9    99         99999        99 999 99       99    99\n"+
    "9  99  9    9         9 999          99 999 99      99    99\n"+
    "9  99  9               999            99 999 99     99    99\n"+
    "9  99  9              999              99 999 9     99    99\n"+
    "9  99  9             999                99 99 9     99    99\n"+
    "9  99  99           999                  99  99     99    99\n"+
    "9  99  99999       9999999999             99999     99    99\n"+
    "9  99  9  999     999999999999                       9    99\n"+
    "9  99  9  9 99              999                           99\n"+
    "9  99  9  9999              9999                          99\n"+
    "9  99  9     9              99999                         99\n"+
    "9  99  9     99             999999                        99\n"+
    "9  99  99999999999999       9999999999999999999          999\n"+
    "9  99               99       9999999999999999999        9999\n"+
    "9  99                99                                999 9\n"+
    "9  999999999999999999999                              99 9 9\n"+
    "9  9999999999999999999999                            99  9 9\n"+
    "9                       99                          999999 9\n"+
    "9                       999999999999999999999999999999     9\n"+
    "999999999999999999999999999999999999999999999999999999999999",
  shipspawn: [{x:-220,y:220},{x:220,y:-220}],
  radar: {type:"box",width:8,height:8},
  basedmg: [{x:-200,x2:-235,y:200,y2:240},{x:200,x2:235,y:-200,y2:-240}]
  },
  {name: "Speeder's Paradise", author: "little-dino123", map:
    "999999999999999999999999999      999999999999999999999999999\n"+
    "9999999999999999999999999999    9999999999999999999999999999\n"+
    "99999999999999999999999999999  99999999999999999999999999999\n"+
    "99999999999999           9999  9999           99999999999999\n"+
    "9999999999999             99    99             9999999999999\n"+
    "9999999999999              9    9              9999999999999\n"+
    "9999999999999                                  9999999999999\n"+
    "9999999999999                                  9999999999999\n"+
    "999999999999                                    999999999999\n"+
    "99999999999                                      99999999999\n"+
    "9999999999          999999        999999          9999999999\n"+
    "9999999            99999999      99999999            9999999\n"+
    "9999999 999       9999                9999       999 9999999\n"+
    "9999999 9999     9999                  9999     9999 9999999\n"+
    "9999999  9999                                  9999  9999999\n"+
    "999999    999                                  999    999999\n"+
    " 9999                                                  9999 \n"+
    "  99                      9      9                      99  \n"+
    "                         99      99                         \n"+
    "  99                    9999    9999                    99  \n"+
    " 9999      9           999999  999999           9      9999 \n"+
    "999999     99     9     99999  99999     9     99     999999\n"+
    "9999999    999   999     999    999     999   999    9999999\n"+
    "9999999    999           99      99           999    9999999\n"+
    "999999     999           9        9           999     999999\n"+
    "99999      99                                  99      99999\n"+
    "9999       9                                    9       9999\n"+
    " 999                                                    999 \n"+
    " 999               9                    9               999 \n"+
    " 999               99                  99               999 \n"+
    " 999               99                  99               999 \n"+
    " 999               9                    9               999 \n"+
    " 999                                                    999 \n"+
    "9999       9                                    9       9999\n"+
    "99999      99                                  99      99999\n"+
    "999999     999           9        9           999     999999\n"+
    "9999999    999           99      99           999    9999999\n"+
    "9999999    999   999     999    999     999   999    9999999\n"+
    "999999     99     9     99999  99999     9     99     999999\n"+
    " 9999      9           999999  999999           9      9999 \n"+
    "  99                    9999    9999                    99  \n"+
    "                         99      99                         \n"+
    "  99                      9      9                      99  \n"+
    " 9999                                                  9999 \n"+
    "999999    999                                  999    999999\n"+
    "9999999  9999                                  9999  9999999\n"+
    "9999999 9999     9999                  9999     9999 9999999\n"+
    "9999999 999       9999                9999       999 9999999\n"+
    "9999999            99999999      99999999            9999999\n"+
    "9999999999          999999        999999          9999999999\n"+
    "99999999999                                      99999999999\n"+
    "999999999999                                    999999999999\n"+
    "9999999999999                                  9999999999999\n"+
    "9999999999999                                  9999999999999\n"+
    "9999999999999              9    9              9999999999999\n"+
    "9999999999999             99    99             9999999999999\n"+
    "99999999999999           9999  9999           99999999999999\n"+
    "99999999999999999999999999999  99999999999999999999999999999\n"+
    "9999999999999999999999999999    9999999999999999999999999999\n"+
    "999999999999999999999999999      999999999999999999999999999",
  shipspawn: [{x:-220,y:0},{x:220,y:0}],
  radar: {type:"box",width:8,height:8},
  basedmg: [{x:-200,x2:-240,y:-20,y2:20},{x:200,x2:240,y:-20,y2:20}]
  },
  {name: "Branches", author: "Healer", map:
    "    99   999 9999    9999          9999    9999 999   99   9\n"+
    "     99999999   99999  999        999  99999   99999999 999 \n"+
    "      99  9             999      999             9  9  99 9 \n"+
    "       999               99      99               99999 999 \n"+
    "9                         9      9                     9 9 9\n"+
    "99                        9      9                      9 99\n"+
    " 99                       9      9                      9 9 \n"+
    " 999                                                    999 \n"+
    " 9 9        9                                  9        9 9 \n"+
    "99 9       99                                  99       9 99\n"+
    "999       99                 99                 99       999\n"+
    "99       99                 9999                 99       99\n"+
    " 9      99                                        99      9 \n"+
    "9                                                          9\n"+
    "9                                                          9\n"+
    "9                                                          9\n"+
    "99                                                        99\n"+
    " 9                                                        9 \n"+
    " 9                                                        9 \n"+
    " 9                                                        9 \n"+
    " 9                                                        9 \n"+
    "9                                                          9\n"+
    "9                                                          9\n"+
    "99                                                        99\n"+
    "999                                                      999\n"+
    " 999                                                    999 \n"+
    "  99999                                              99999  \n"+
    "                            9                               \n"+
    "           9               99                   9           \n"+
    "          99                                    99          \n"+
    "          99                                    99          \n"+
    "           9                   99               9           \n"+
    "                               9                            \n"+
    "  99999                                              99999  \n"+
    " 999                                                    999 \n"+
    "999                                                      999\n"+
    "99                                                        99\n"+
    "9                                                          9\n"+
    "9                                                          9\n"+
    " 9                                                        9 \n"+
    " 9                                                        9 \n"+
    " 9                                                        9 \n"+
    " 9                                                        9 \n"+
    "99                                                        99\n"+
    "9                                                          9\n"+
    "9                                                          9\n"+
    "9                                                          9\n"+
    " 9      99                                        99      9 \n"+
    "99       99                 9999                 99       99\n"+
    "999       99                 99                 99       999\n"+
    "99 9       99                                  99       9 99\n"+
    " 9 9        9                                  9        9 9 \n"+
    " 999                                                    999 \n"+
    " 9 9                      9      9                       99 \n"+
    "99 9                      9      9                        99\n"+
    "9 9 9                     9      9                         9\n"+
    " 999 99999               99      99               999       \n"+
    " 9 99  9  9             999      999             9  99      \n"+
    " 999 99999999   99999  999        999  99999   99999999     \n"+
    "9   99   999 9999    9999          9999    9999 999   99    ",
  shipspawn: [{x:-220,y:-220},{x:220,y:220}],
  radar: {type:"box",width:8,height:8},
  basedmg: [{x:-200,x2:-235,y:-200,y2:-240},{x:200,x2:235,y:200,y2:240}]
  },
  {name: "Passages", author: "Healer", map:
    "9   99   99999999     999999    999999     99999999   99   9\n"+
    " 999 9999999    9999999     9999     9999999    9999999 999 \n"+
    " 9 99  9  9                                      9  9  99 9 \n"+
    " 999 99999                                        99999 999 \n"+
    "9 9 9                   99        99                   9 9 9\n"+
    "99 9                     999    999                     9 99\n"+
    " 9 9                      99    99                      9 9 \n"+
    " 999                       9    9                       999 \n"+
    " 9 9                       9    9                       9 9 \n"+
    "99 9                                                    9 99\n"+
    "999                                                      999\n"+
    "99                                                        99\n"+
    "9                           9  9                           9\n"+
    "9                          99  99                          9\n"+
    "9           99  99                        99  99           9\n"+
    "9            9  9                          9  9            9\n"+
    "9                                                          9\n"+
    "9                                                          9\n"+
    "9                                                          9\n"+
    "9                                                          9\n"+
    "9                                                          9\n"+
    "9                                                          9\n"+
    "9                                                          9\n"+
    "99                                                        99\n"+
    "999                                                      999\n"+
    " 9999                                                  9999 \n"+
    "  99999       999                          999       99999  \n"+
    "             99999         9    9         99999             \n"+
    "                            9  9                            \n"+
    "                                                            \n"+
    "                                                            \n"+
    "                            9  9                            \n"+
    "             99999         9    9         99999             \n"+
    "  99999       999                          999       99999  \n"+
    " 9999                                                  9999 \n"+
    "999                                                      999\n"+
    "99                                                        99\n"+
    "9                                                          9\n"+
    "9                                                          9\n"+
    "9                                                          9\n"+
    "9                                                          9\n"+
    "9                                                          9\n"+
    "9                                                          9\n"+
    "9                                                          9\n"+
    "9            9  9                          9  9            9\n"+
    "9           99  99                        99  99           9\n"+
    "9                          99  99                          9\n"+
    "9                           9  9                           9\n"+
    "99                                                        99\n"+
    "999                                                      999\n"+
    "99 9                                                    9 99\n"+
    " 9 9                       9    9                       9 9 \n"+
    " 999                       9    9                       999 \n"+
    " 9 9                      99    99                      9 9 \n"+
    "99 9                     999    999                     9 99\n"+
    "9 9 9                   99        99                   9 9 9\n"+
    " 999 99999                                        99999 999 \n"+
    " 9 99  9  9                                      9  9  99 9 \n"+
    " 999 9999999    9999999     9999     9999999    9999999 999 \n"+
    "9   99   99999999     999999    999999     99999999   99   9",
  shipspawn: [{x:0,y:-250},{x:0,y:250}],
  radar: {type:"box",width:5,height:5},
  basedmg: [{x:-15,x2:15,y:-235,y2:-265},{x:-15,x2:15,y:235,y2:265}]
  },
  {name: "Parenthesis", author: "EDEN", map:
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999999                                                999999\n"+
    "99999                                                  99999\n"+
    "99999                                                  99999\n"+
    "99999            999                    999            99999\n"+
    "99   9            999                  999            9   99\n"+
    "9     9             999              999             9     9\n"+
    "9        9            999          999            9        9\n"+
    "9       99              999      999              99       9\n"+
    "9      999                                        999      9\n"+
    "9                                                          9\n"+
    "9                                                          9\n"+
    "9                     99            99                     9\n"+
    "9                      99          99                      9\n"+
    "9              9        99        99        9              9\n"+
    "9              99        99      99        99              9\n"+
    "9              99         99    99         99              9\n"+
    "9               99        99    99        99               9\n"+
    "9                9        99    99        9                9\n"+
    "9                99       99    99       99                9\n"+
    "9                 9       99    99       9                 9\n"+
    "9                 99      99    99      99                 9\n"+
    "9                  9      99    99      9                  9\n"+
    "9     999999       9      99    99      9       999999     9\n"+
    "9    999999               99    99                   99    9\n"+
    "9   99                   99      99                   99   9\n"+
    "99999                   99        99                   99999\n"+
    "9999                                                    9999\n"+
    "                                                            \n"+
    "                                                            \n"+
    "                                                            \n"+
    "                                                            \n"+
    "9999                                                    9999\n"+
    "99999                   99        99                   99999\n"+
    "9   99                   99      99                   99   9\n"+
    "9    999999               99    99                   99    9\n"+
    "9     999999       9      99    99      9       999999     9\n"+
    "9                  9      99    99      9                  9\n"+
    "9                 99      99    99      99                 9\n"+
    "9                 9       99    99       9                 9\n"+
    "9                99       99    99       99                9\n"+
    "9                9        99    99        9                9\n"+
    "9               99        99    99        99               9\n"+
    "9              99         99    99         99              9\n"+
    "9              99        99      99        99              9\n"+
    "9              9        99        99        9              9\n"+
    "9                      99          99                      9\n"+
    "9                     99            99                     9\n"+
    "9                                                          9\n"+
    "9                                                          9\n"+
    "9      999                                        999      9\n"+
    "9       99              999      999              99       9\n"+
    "9        9            999          999            9        9\n"+
    "9     9             999              999             9     9\n"+
    "99   9            999                  999            9   99\n"+
    "99999            999                    999            99999\n"+
    "99999                                                  99999\n"+
    "99999                                                  99999\n"+
    "999999                                                999999\n"+
    "999999999999999999999999999999999999999999999999999999999999",
  shipspawn: [{x:0,y:-250},{x:0,y:250}],
  radar: {type:"box",width:10,height:10},
  basedmg: [{x:-25,x2:25,y:-225,y2:-275},{x:-25,x2:25,y:225,y2:275}]
  },
  {name: "Mothership", author: "EDEN", map:
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999999999999999999999999            999999999999999999999999\n"+
    "9999999999999999999                      9999999999999999999\n"+
    "9999999999999999                            9999999999999999\n"+
    "99999999999999                                99999999999999\n"+
    "999999999999                                    999999999999\n"+
    "99999999999                                      99999999999\n"+
    "9999999999               9999  9999               9999999999\n"+
    "999999999             999 9      9 999             999999999\n"+
    "99999999            999    99  99    999            99999999\n"+
    "9999999           999  9999      9999  999           9999999\n"+
    "999999           99  99   9      9   99  99           999999\n"+
    "99999          999 99     9      9     99 999          99999\n"+
    "9999          99  9       7      7       9  99          9999\n"+
    "9999         99 99       7        7       99 99         9999\n"+
    "999          9 9         9        9         9 9          999\n"+
    "999         99 9         9        9         9 99         999\n"+
    "99         99 9          9        9          9 99         99\n"+
    "99         9 9           9        9           9 9         99\n"+
    "99        99 9           9        9           9 99        99\n"+
    "9         9 9            99      99            9 9         9\n"+
    "9         9 9             9      9             9 9         9\n"+
    "9        999     66  66   99    99   66  66     999        9\n"+
    "         5         88      9    9      88         5         \n"+
    "        5        66  66     9  9     66  66        5        \n"+
    "   99   9                                          9   99   \n"+
    "     99 9  5                                    5  9 99     \n"+
    "       99   7                44                7   99       \n"+
    "999          9              4884              9          999\n"+
    "999          9              4884              9          999\n"+
    "       99   7                44                7   99       \n"+
    "     99 9  5                                    5  9 99     \n"+
    "   99   9                                          9   99   \n"+
    "        5        66  66     9  9     66  66        5        \n"+
    "         5         88      9    9      88         5         \n"+
    "9        999     66  66   99    99   66  66     999        9\n"+
    "9         9 9             9      9             9 9         9\n"+
    "9         9 9            99      99            9 9         9\n"+
    "99        99 9           9        9           9 99        99\n"+
    "99         9 9           9        9           9 9         99\n"+
    "99         99 9          9        9          9 99         99\n"+
    "999         99 9         9        9         9 99         999\n"+
    "999          9 9         9        9         9 9          999\n"+
    "9999         99 99       7        7       99 99         9999\n"+
    "9999          99  9       7      7       9  99          9999\n"+
    "99999          999 99     9      9     99 999          99999\n"+
    "999999           99  99   9      9   99  99           999999\n"+
    "9999999           999  9999      9999  999           9999999\n"+
    "99999999            999    99  99    999            99999999\n"+
    "999999999             999 9      9 999             999999999\n"+
    "9999999999               9999  9999               9999999999\n"+
    "99999999999                                      99999999999\n"+
    "999999999999                                    999999999999\n"+
    "99999999999999                                99999999999999\n"+
    "9999999999999999                            9999999999999999\n"+
    "9999999999999999999                      9999999999999999999\n"+
    "999999999999999999999999            999999999999999999999999\n"+
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999999999999999999999999999999999999999999999999999999999999",
  shipspawn: [{x:0,y:-250},{x:0,y:250}],
  radar: {type:"box",width:20,height:10},
  basedmg: [{x:-40,x2:40,y:-225,y2:-275},{x:-40,x2:40,y:225,y2:275}]
  },
  {name: "Crystalized", author: "EDEN", map:
    "9999    99999999999999999999999999999999999999999999    9999\n"+
    "    9999999999999999999999999999999999999999999999999999    \n"+
    "                                                            \n"+
    "                                                            \n"+
    "                    9                  9                    \n"+
    "                    9                  9                    \n"+
    "                      9              9                      \n"+
    "                      9              9                      \n"+
    "                       99          99                       \n"+
    "                      9 8          8 9                      \n"+
    "                    99 8  8  99  8  8 99                    \n"+
    "9                  9  8   9  99  9   8  9                  9\n"+
    "9                  9  8  8  8  8  8  8  9                  9\n"+
    "9                  998  89        98  899                  9\n"+
    " 9                     8  9  99  9  8                     9 \n"+
    " 9                     9  9  99  9  9                     9 \n"+
    " 9                     999        999                     9 \n"+
    " 9          99                                99          9 \n"+
    "9 9         99                                99         9 9\n"+
    "9 9        9  9              99              9  9        9 9\n"+
    "9 9        9  9              99              9  9        9 9\n"+
    "9 9        9  9             9  9             9  9        9 9\n"+
    " 9 9      9 99 9            9  9            9 99 9      9 9 \n"+
    " 9 9      9 99 9            9  9            9 99 9      9 9 \n"+
    " 9 9      9 99 9           9 99 9           9 99 9      9 9 \n"+
    " 9 9     9 9  9 9          9 99 9          9 9  9 9     9 9 \n"+
    "9 9 9    9 9  9 9          9 99 9          9 9  9 9    9 9 9\n"+
    "9 9 9    9 9  9 9         9  99  9         9 9  9 9    9 9 9\n"+
    "9 9 9   9 9 99 9 9         99  99         9 9 99 9 9   9 9 9\n"+
    "9 9 9   9 9 99 9 9                        9 9 99 9 9   9 9 9\n"+
    "9 9 9   9 9 99 9 9                        9 9 99 9 9   9 9 9\n"+
    "9 9 9   9 9 99 9 9         99  99         9 9 99 9 9   9 9 9\n"+
    "9 9 9    9 9  9 9         9  99  9         9 9  9 9    9 9 9\n"+
    "9 9 9    9 9  9 9          9 99 9          9 9  9 9    9 9 9\n"+
    " 9 9     9 9  9 9          9 99 9          9 9  9 9     9 9 \n"+
    " 9 9      9 99 9           9 99 9           9 99 9      9 9 \n"+
    " 9 9      9 99 9            9  9            9 99 9      9 9 \n"+
    " 9 9      9 99 9            9  9            9 99 9      9 9 \n"+
    "9 9        9  9             9  9             9  9        9 9\n"+
    "9 9        9  9              99              9  9        9 9\n"+
    "9 9        9  9              99              9  9        9 9\n"+
    "9 9         99                                99         9 9\n"+
    " 9          99                                99          9 \n"+
    " 9                     999        999                     9 \n"+
    " 9                     9  9  99  9  9                     9 \n"+
    " 9                     8  9  99  9  8                     9 \n"+
    "9                  998  89        98  899                  9\n"+
    "9                  9  8  8  8  8  8  8  9                  9\n"+
    "9                  9  8   9  99  9   8  9                  9\n"+
    "                    99 8  8  99  8  8 99                    \n"+
    "                      9 8          8 9                      \n"+
    "                       99          99                       \n"+
    "                      9              9                      \n"+
    "                      9              9                      \n"+
    "                    9                  9                    \n"+
    "                    9                  9                    \n"+
    "                                                            \n"+
    "                                                            \n"+
    "    9999999999999999999999999999999999999999999999999999    \n"+
    "9999    99999999999999999999999999999999999999999999    9999",
  shipspawn: [{x:0,y:-250},{x:0,y:250}],
  radar: {type:"box",width:20,height:10},
  basedmg: [{x:-40,x2:40,y:-225,y2:-275},{x:-40,x2:40,y:225,y2:275}]
  },  
];

game.custom.radar_background = {
  id: "radar_background",
  components: [],
};

var scale_pos = 100 / (modifier.map_size * 10);
var scale_size = 50 / modifier.map_size;
function addRadarSpot (x, y, type, width, height, alpha, color){
  game.custom.radar_background.components.push({
    type: type,
    position: [
      50+x*scale_pos-width*scale_size/2,
      50-y*scale_pos-height*scale_size/2,
      width*scale_size, height*scale_size,
    ],
    fill:`hsla(${color},100%,50%,${alpha})`
  });
}

var update = 1;
var delay = modifier.game_delay * 60;
if (!game.custom.map) game.custom.map = maps[Math.trunc(Math.random()*maps.length)];
var map = game.custom.map; // for debugging
for (let i=0; i<map.shipspawn.length; i++){
  addRadarSpot(map.shipspawn[i].x,map.shipspawn[i].y,map.radar.type,map.radar.width,map.radar.height,0.3,teams.hues[i]);
  addRadarSpot(map.shipspawn[i].x,map.shipspawn[i].y,map.radar.type,map.radar.width-2,map.radar.height-2,0.2,teams.hues[i]);
}

this.options = {
  vocabulary: vocabulary,
  custom_map: map.map,
  soundtrack: music[~~(Math.random()*music.length)],
  weapons_store: false,
  friendly_colors: 2,
  radar_zoom: 1,
  map_size: modifier.map_size,
  starting_ship: 801,
  crystal_value: modifier.crystal_value,
  speed_mod: 1.2,
  max_players: modifier.max_players,
  ships: ships,
  choose_ship: chooseships,
  release_crystal: modifier.yeet_gems,
  hues: [colors.hue,colors.hue2],
  asteroids_strength: 1e6,
  crystal_drop: 0,
  max_level: 1
};

var check = function(game, isWaiting, isGameOver) {
  modUtils.tick();
  if (game.step % 30 === 0) {
    teams.count = [0,0];
    for (let ship of game.ships) {
      if (!ship.custom.init){
        ship.custom.init = true;
        ship.custom.frags = 0;
        ship.custom.deaths = 0;
        setteam(ship);
        setup(ship);
        sendUI(ship, {
          id: "buy_lifes_blocker",
          visible: true,
          clickable: true,
          shortcut: String.fromCharCode(187),
          position: [65,0,10,10],
          components: []
        });
        sendUI(ship, game.custom.radar_background);
        echo(`${ship.name} spawned`);
        ship.custom.rand = ["","",""];
        ship.custom.buttons = false;
        if (isGameOver) gameover(ship);
      }
      else if (isGameOver && !ship.custom.exited) {
        ship.custom.exited = true;
        modUtils.setTimeout(function(){gameover(ship)},300);
      }
      if (!ship.custom.joined && !isWaiting && !isGameOver) {
        joinmessage(ship);
        ship.custom.joined = true;
      }
      ship.set({idle: !!isWaiting, collider: !(isWaiting || isGameOver)})
      checkButtons(ship);
      teams.count[ship.custom.team]++;
      (ship.score != ship.custom.frags) && ship.set({score:ship.custom.frags});
      ship.emptyWeapons();
    }
  }
}, FormatTime = function(tick, forced, forceAll) {
  var array = Array(3).fill(0).map((i,j) => Math.floor((tick%(60**(j+2)))/(60**(j+1)))).reverse();
  while (array.length > forceAll && array[0] == 0) array.splice(0,1);
  forced = forced.reverse().slice(0,array.length).reverse();
  return array.map((i,j) => (i<10&&(j==0?forced[j]:!0))?"0"+i.toString():i).join(":");
}

var endgametext = ["Unknown", "Unknown"], endgamestatus = {};
var gameover = function (ship){
  ship.gameover({
    "Match status": endgametext[0],
    "Match results": endgametext[1],
    "Frags": ship.custom.frags,
    "Deaths": ship.custom.deaths,
    " ": " ",
    "#. Best killers":"Frags",
    ...endgamestatus
  });
  ship.custom.exited = true;
}

var waiting = function (game) {
  check(game, true);
  if (game.step % 30 === 0) for (let ship of game.ships){
    sendUI(ship, {
      id: "delay",
      position: [39,18,42,40],
      visible: true,
      components: [
        {type: "text",position:[2,5,80/1.5,33/1.5],value:"Waiting for more players...",color:"#cde"},
      ]
    });
    sendUI(ship, {
      id: "scoreboard",
      visible: true,
      components: [
        {type: "text",position:[15,0,70,10],value:"Waiting for more players...",color:"#cde"},
      ]
    });
  }
  if (game.step >= delay){
    checkscores(game);
    updatescoreboard(game);
    sendUI(game, {id:"delay time",visible:false});
    sendUI(game, {id:"delay",visible:false});
    this.tick = main_game;
  }
  else {
    sendUI(game, {
      id: "delay time",
      position: [45.7,26,10,7],
      visible: true,
      components: [
        {type: "text",position:[0,0,100,50],value:`${FormatTime(delay - game.step, [], 1)}`,color:"#cde"},
      ]
    });
  }
}, main_game = function(game){
  check(game);
  if (Math.min(...teams.count) == 0) finishgame(game, 2);
  else if (Math.max(...teams.points) >= modifier.kills_to_win) finishgame(game, 1);
  else if (game.step % 30 === 0){
    let time = delay+modifier.round_timer*3600;
    if (game.step < time){
      if (game.step > delay){
        sendUI(game, {
          id: "timer",
          position: [2.5,28,15,10],
          visible: true,
          components: [
            {type: "text",position:[0,0,100,50],value:`Time left: ${FormatTime(time - game.step, [false, true, true], 2)}`,color:"#cde"},
          ]
        });
      }
    } else finishgame(game, 0);
  }
  if (update){
    checkscores(game);
    updatescoreboard(game);
    update = 0;
  }
  if (game.step % 60 === 0){
    checkteambase(game)
    updatescoreboard(game);
  }
}, finishgame = function(game, condition) {
  // conditions: 0 (time's up), 1 (reach enough kills), 2 (all one team left)
  let win;
  if (condition != 2) {
    if (teams.points[0] != teams.points[1]){
      win = teams.points.indexOf(Math.max(...teams.points));
      endgametext = `${teams.names[win]} team wins!`;
    } else endgametext = "It's a draw!";
    endgametext = [condition?`${teams.names[win]} team reaches ${modifier.kills_to_win} kills`:"Time's up!", endgametext];
  }
  else {
    win = teams.count.indexOf(0);
    if (win == -1) return;
    win = 1 - win;
    endgametext = [`All ${teams.names[1-win]} players left`, `${teams.names[win]} team wins!`];
  }
  game.ships.sort((a,b) => (b.custom.frags || 0) - (a.custom.frags || 0)).slice(0,3).forEach((ship,i) => {
    endgamestatus[(i+1)+". "+ship.name] = ship.custom.frags
  });
  game.custom.ended = true;
  game.setOpen(false);
  sendUI(game, {
    id: "timer",
    position: [2.5,28,15,10],
    visible: true,
    components: [
      {type: "text",position:[0,0,100,50],value:"Game finished!",color:"#cde"},
    ]
  });
  sendUI(game, {
    id: "end",
    position: [35,20,30,15],
    visible: true,
    components: [
      {type:"text",position:[0,0,100,50],value:endgametext[0],color:"#cde"},
      {type:"text",position:[0,50,100,50],value:endgametext[1],color:"#cde"}
    ]
  });
  echo(endgametext);
  this.tick = endgame;
}.bind(this), endgame = function (game) {
  check(game, false, true);
};

this.tick = waiting;

function setup(ship){
  let t = ship.custom.team;
  let level = Math.trunc(ship.type/100); //level = (level<4)?4:level;
  let gems = ((modifier.round_ship_tier**2)*20)/1.5;
  let x = map.shipspawn[t].x,
  y = map.shipspawn[t].y,r=0;
  ship.set({x:x,y:y,stats:88888888,invulnerable:300,shield:999,crystals:gems});
}

function setteam(ship){
  let t;
  if ([...new Set(teams.count)].length == 1) t=teams.points.indexOf(Math.min(...teams.points));
  else t = teams.count.indexOf(Math.min(...teams.count));
  ship.custom.team = t;
  configship(ship, t);
  echo(teams.count);
}

function configship(ship,t){
  ship.set({hue:teams.hues[t],team:t,invulnerable:300,stats:88888888});
}

function rekt(ship,num){
  if (ship.shield<num){
    let val=ship.crystals + ship.shield;
    if (val < num) ship.set({kill:true});
    else ship.set({crystals:val-num,shield:0});
  }
  else ship.set({shield:ship.shield-num});
}

function isRange(a,b,c){
  return Math.min(a,b) <= c && c <= Math.max(a,b)
}

function checkteambase(game){
  for (let ship of game.ships){
    let u = 1 - ship.custom.team;
    let x = map.basedmg[u];
    let y = map.basedmg[u];
    if (isRange(x.x,x.x2,ship.x) && isRange(y.y,y.y2,ship.y)){
      rekt(ship,10*Math.trunc(ship.type/100));
      sendUI(ship, {
        id: "dang",
        position: [34,20,40,40],
        visible: true,
        components: [{type:"text",position:[0,0,80,33],value:"You are in the emeny's base - your ship will take damage!",color:"#f99e9e"}]
      });
    } else sendUI(ship, {id:"dang",visible:true});
  }
}

var scoreboard = {
  id:"scoreboard",
  visible: true,
  components: []
};

function getcolor(color){
  return `hsla(${color},100%,50%,1)`;
}

function PlayerBox(posx,posy){
  return {type:"box",position:[posx,posy-1.8,50,7],fill:"hsla(210,24.3%,29%,0.5)",width:2};
}

function Tag(indtext,param,posx,posy,hex,al,size) {
  let obj= {type: indtext,position: [posx,posy-0.5,50-(size||0),5],color: hex,align:al};
  switch(indtext) {
    case "text":
      obj.value=param;
      break;
    case "player":
      obj.id=param;
    break;
  }
  return obj;
}

function sort(arr){
  let array=[...arr],i=0;
  while (i<array.length-1) {
    if (array[i].custom.frags<array[i+1].custom.frags) {
      array[i+1]=[array[i],array[i]=array[i+1]][0];
      if (i>0) i-=2;
    }
    i++;
  }
  return array;
}

function updatescoreboard(game){
  if (game.step >= delay){
    let t=[[],[]];
    for (let ship of game.ships) t[ship.custom.team].push(ship);
    scoreboard.components = [
      { type:"box",position:[0,0,50,8],fill:getcolor(teams.hues[0])},
      { type: "text",position: [0,0,50,8],color:"#e5e5e5",value: teams.names[0]},
      { type:"box",position:[50,0,50,8],fill:getcolor(teams.hues[1])},
      { type: "text",position: [50,0,50,8],color:"#e5e5e5",value: teams.names[1]}
    ];
    let sc=[sort(t[0]),sort(t[1])],line=1;
    sc[0].slice(10);sc[1].slice(10);
    for (let i=0;i<10;i++){
      for (let j=0;j<2;j++){
        if (sc[j][i]) scoreboard.components.push(
          new Tag("text",sc[j][i].custom.frags,j*50,line*10,"#cde","right",2),
          new Tag("player",sc[j][i].id,j*50,line*10,"#cde","left")
        );
        else scoreboard.components.push({},{});
      }
      line++;
    }
    outputscoreboard(game,sc);
  }
}

function outputscoreboard(game,tm){
  let origin =[...scoreboard.components];
  for (let ship of game.ships){
    let j=0,team=tm[ship.custom.team];
    for (j=0;j<team.length;j++){
      if (ship.id === team[j].id){
        scoreboard.components.splice((j*2+ship.custom.team)*2+4,0,
          new PlayerBox(ship.custom.team*50,(j+1)*10)
        );
        break;
      }
    }
    if (j == team.length) scoreboard.components.splice((20+ship.custom.team)*2,2,
      new PlayerBox(ship.custom.team*50,90),
      new Tag("text",ship.custom.frags,ship.custom.team*50,90,ship.custom.team,"right",2),
      new Tag("player",ship.id,ship.custom.team*50,90,ship.custom.team,"left")
    );
    sendUI(ship, scoreboard);
    scoreboard.components = [...origin];
  }
}

function checkscores(game){
  if (game.step >= delay)
  sendUI(game, {
    id: "scores",
    position: [33,10,42,40],
    visible: true,
    components: [
      {type: "text",position:[2-((Math.log(teams.points[0])*Math.LOG10E+1|0)*5)/2,5,80/1.5,33/1.5],value:teams.points[0],color:getcolor(teams.hues[0])},
      {type: "text",position:[0,0,80,33],value:"-",color:"#CDE"},
      {type: "text",position:[25+((Math.log(teams.points[1])*Math.LOG10E+1|0)*5)/2,5,80/1.5,33/1.5],value:teams.points[1],color:getcolor(teams.hues[1])},
    ]
  });
}

function joinmessage(ship){
  sendUI(ship, {
    id: "join",
    position: [36,16,34,32],
    visible: true,
    components: [
      {type: "text",position:[0,0,85+3,38+3],value:`First team to reach ${modifier.kills_to_win} kills wins`,color:"#cde"},
      {type: "text",position:[5.5,20,80-4,33-4],value:"Good luck and have fun!",color:"#cde"},
    ]
  });
  sendUI(ship, {
    id: "map info",
    position: [2,88,24,22],
    visible: true,
    components: [
      {type: "text",position:[0,0,100,50],value:`Map: ${map.name} by ${map.author}`,color:"#cde"},
    ]
  });
  modUtils.setTimeout(function(){
    sendUI(ship, {id:"join",visible:false});
    sendUI(ship, {
      id: "tips",
      position: [36,16,34,32],
      visible: true,
      components: [
        {type: "text",position:[5.5,20,76,33-4],value:"Please DO NOT try to mine the asteroids",color:"#cde"},
        {type: "text",position:[0,30,90,33],value:"Mining is pointless! Asteroids are unbreakable",color:"#cde"},
      ]
    });
    modUtils.setTimeout(function(){
      sendUI(ship, {id:"tips",visible:false});
    },300);
  },480);
}

function checkButtons(ship){
  let shortcut = ["5","6","7"];
  for (let i=0; i<3; i++){
    sendUI(ship, {
      id: "ship_selection_"+i,
      position: [36,26+i*7,34,18/2],
      visible: ship.custom.buttons&&ship.custom.opened,
      clickable: ship.custom.buttons&&ship.custom.opened,
      shortcut: shortcut[i],
      components: [
        {type: "box",position:[0,0,88,40*2],stroke:"#191919",fill:"#333333",width:5},
        {type: "text",position:[0,4,88/1.2,40/1.2*2],value:`     ${ship.custom.rand[i]} [${shortcut[i]}]`,color:"#cde"},
      ]
    });
  }
  sendUI(ship, {
    id: "close",
    position: [43,26+4*7,34/2,18/2],
    visible: ship.custom.buttons&&ship.custom.opened,
    clickable: ship.custom.buttons&&ship.custom.opened,
    shortcut: "4",
    components: [
      {type: "box",position:[0,0,88,40*2],stroke:"#191919",fill:"#333333",width:5},
      {type: "text",position:[0,4,88/1.2,40/1.2*2],value:"    Close [4]",color:"#cde"},
    ]
  });
  sendUI(ship, {
    id: "open",
    position: [3,33,16,20/2],
    visible: ship.custom.buttons&&!ship.custom.opened,
    clickable: ship.custom.buttons&&!ship.custom.opened,
    shortcut: "4",
    components: [
      {type: "box",position:[0,0,88,40*2],stroke:"#191919",fill:"#333333",width:5},
      {type: "text",position:[6,4,88/1.2,40/1.2*2],value:"Select ship [4]",color:"#cde"},
    ]
  });
  sendUI(ship, {
    id: "heal",
    position: [3,42,16,20/2],
    visible: ship.custom.buttons&&modifier.healer_button,
    clickable: ship.custom.buttons&&modifier.healer_button,
    shortcut: "J",
    components: [
      {type: "box",position:[0,0,88,40*2],stroke:"#191919",fill:"#333333",width:5},
      {type: "text",position:[6,4,88/1.2,40/1.2*2],value:`${(ship.healing)?"Offensive":"Healing"} [J]`,color:"#cde"},
    ]
  });
}

this.event = function(event, game){
  let ship = event.ship;
  if (ship != null) switch (event.name){
    case "ship_destroyed":
      let killer = event.killer;
      if (killer != null) {
        ship.set({collider:true});
        teams.points[killer.custom.team]++;
        killer.custom.frags++;
        echo(`${killer.name} killed ${ship.name}`);
      } else {
        echo(ship.name + " killed themselves");
        //teams.points[Math.abs(ship.team-1)]++;
      }
      ship.custom.deaths++;
      update = 1;
      ship.custom.hasbeenkilled = true;
      echo(`${teams.names[0]}:${teams.points[0]},${teams.names[1]}:${teams.points[1]}`);
      break;
    case "ship_spawned":
      if (ship.custom.hasbeenkilled === true){
        ship.custom.rand = shuffle(ship_name);
        ship.custom.buttons = true;
        ship.custom.opened = false;
        modUtils.setTimeout(function(){
          ship.custom.buttons = false;
        },540);
        ship.custom.hasbeenkilled = false;
      }
      if (ship.custom.team != null) setup(ship);
      update = 1;
      break;
    case "ui_component_clicked":
      if (ship.custom.buttons) {
        let component = event.id;
        switch (component){
          case "open": ship.custom.opened = true; break;
          case "heal": ship.set({healing:!ship.healing}); break;
          case "close": ship.custom.opened = false; break;
          default:
            if (component.startsWith("ship_selection_") && ship.custom.opened){
              let ship_code = findShipCode(ship.custom.rand[parseInt(component.replace(/^ship_selection_/,"")) || 0]);
              if (ship_code){
                if (ship.type != ship_code) ship.set({type:ship_code,stats:88888888,shield:999,collider:true});
              }
              ship.custom.opened = false;
              ship.custom.buttons = false;
            }
          break;
        }
      }
    break;
  }
};

var tree = {
  id: "tree",
  obj: "https://raw.githubusercontent.com/45rfew/Starblast-mods-n-objs/master/Tree.obj",
  diffuse: "https://raw.githubusercontent.com/45rfew/Starblast-mods-n-objs/master/Img/green.png",
};

var present = {
  id: "present",
  obj: "https://starblast.data.neuronality.com/models/xmas/gift/model.obj",
  diffuse: "https://starblast.data.neuronality.com/models/xmas/gift/lambert.jpg",
  emissive: "https://starblast.data.neuronality.com/models/xmas/gift/emissive.jpg",
  specular: "https://starblast.data.neuronality.com/models/xmas/gift/specular.jpg"
};

var pumpkin = {
  id: "pumpkin",
  obj: "https://starblast.data.neuronality.com/models/halloween/pumpkin/model.obj",
  diffuse: "https://raw.githubusercontent.com/45rfew/Starblast-mods-n-objs/master/Img/pumpkin%20lambert.jpg",
  emissive: "https://starblast.data.neuronality.com/models/halloween/pumpkin/emissive.jpg",
};

var alien = {
  id: "alien",
  obj: "https://starblast.data.neuronality.com/models/aliens/10/model.obj",
  diffuse: "https://starblast.data.neuronality.com/models/aliens/10/lambert.jpg",
  emissive: "https://starblast.data.neuronality.com/models/aliens/10/emissive.jpg",
  emissiveColor: 0xff0000,
  transparent: false,
};

/*if (map_id === 0 && modifier.laggy_objs){
  game.setObject({
    id: "tree",
    type: tree,
    position: {x:0,y:0,z:-13},
    rotation: {x:Math.PI/2,y:0,z:0},
    scale: {x:5,y:5,z:5}
  });
  for (let i=0; i<6; i++){
    let th = (i/6)*Math.PI*2;
    let rd = 13;
    game.setObject({
      id: "present"+i,
      type: present,
      position: {x:Math.cos(th)*rd,y:Math.sin(th)*rd,z:-10},
      rotation: {x:0,y:0,z:Math.random()*Math.PI/2},
      scale: {x:2,y:2,z:2}
    });
  }
} else if (map_id === 1 && modifier.laggy_objs){
  let objx = [0,20,-16,-2,13,3,-11], objy = [0,5,-6,-22,-14,15,11], scale = [0,1.5,1.5,1.6,1.8,2,2];
  for (let i=0; i<7; i++){
    game.setObject({
      id: "pumpkin"+i,
      type: pumpkin,
      position: {x:objx[i],y:objy[i],z:-10/scale[i]},
      rotation: {x:Math.PI/2,y:Math.random()*Math.PI*2,z:(Math.random()*Math.PI)/8},
      scale: {x:6/scale[i],y:5/scale[i],z:6/scale[i]}
    });
  }
  game.setObject({
    id: "pumpkin",
    type: pumpkin,
    position: {x:0,y:0,z:-10},
    rotation: {x:Math.PI/2,y:Math.random()*Math.PI*2,z:0},
    scale: {x:6,y:5,z:6}
  });
  let alienx = [-18,11,18,-11], alieny = [5,11,-7,-16];
  for (let i=0; i<4; i++){
    game.setObject({
      id: "alien"+i,
      type: alien,
      position: {x:alienx[i],y:alieny[i],z:-10},
      rotation: {x:0,y:0,z:Math.PI/2+((Math.random() - 0.5)*2)/4},
      scale: {x:.4,y:.4,z:.4}
    });
  }
}*/

var removed_maps = [
  {name: "Boxes 2.0", author: "EDEN", map:
    "                                                            \n"+
    "                                                            \n"+
    "                                                            \n"+
    " 9999999999999999999999999999999999999999999999999999999999 \n"+
    " 9999999999999999999999999999999999999999999999999999999999 \n"+
    " 99999999999                                    99999999999 \n"+
    " 9999999999                                      9999999999 \n"+
    " 9999999999    999999999999      999999999999    9999999999 \n"+
    " 9999999999   99999999999999    99999999999999   9999999999 \n"+
    " 9999999999  9999999999999999  9999999999999999  9999999999 \n"+
    " 9999999999  9999999999999999  9999999999999999  9999999999 \n"+
    " 9999999999  9999999999999999  9999999999999999  9999999999 \n"+
    " 9999999999  9999999999999999  9999999999999999  9999999999 \n"+
    " 999999999    999999999999999  999999999999999    999999999 \n"+
    " 999999999     99999999999999  99999999999999     999999999 \n"+
    " 999                       99  99                       999 \n"+
    " 99                       999  999                       99 \n"+
    " 99                      999    999                      99 \n"+
    " 99                     999      999                     99 \n"+
    " 99                    999        999                    99 \n"+
    " 99                    999        999                    99 \n"+
    " 99                    9999      9999                    99 \n"+
    " 99                   999999    999999                   99 \n"+
    " 99                9999999999  9999999999                99 \n"+
    " 99               99999999999  99999999999               99 \n"+
    " 99              999999999999  999999999999              99 \n"+
    " 99             999  99999999  99999999  999             99 \n"+
    " 99      9     999    999999    999999    999     9      99 \n"+
    " 99      99   999      9999      9999      999   99      99 \n"+
    " 99      99                  99                  99      99 \n"+
    " 99      99                  99                  99      99 \n"+
    " 99      99   999      9999      9999      999   99      99 \n"+
    " 99      9     999    999999    999999    999     9      99 \n"+
    " 99             999  99999999  99999999  999             99 \n"+
    " 99              999999999999  999999999999              99 \n"+
    " 99               99999999999  99999999999               99 \n"+
    " 99                9999999999  9999999999                99 \n"+
    " 99                   999999    999999                   99 \n"+
    " 99                    9999      9999                    99 \n"+
    " 99                    999        999                    99 \n"+
    " 99                    999        999                    99 \n"+
    " 99                     999      999                     99 \n"+
    " 99                      999    999                      99 \n"+
    " 99                       999  999                       99 \n"+
    " 999                       99  99                       999 \n"+
    " 999999999     99999999999999  99999999999999     999999999 \n"+
    " 999999999    999999999999999  999999999999999    999999999 \n"+
    " 9999999999  9999999999999999  9999999999999999  9999999999 \n"+
    " 9999999999  9999999999999999  9999999999999999  9999999999 \n"+
    " 9999999999  9999999999999999  9999999999999999  9999999999 \n"+
    " 9999999999  9999999999999999  9999999999999999  9999999999 \n"+
    " 9999999999   99999999999999    99999999999999   9999999999 \n"+
    " 9999999999    999999999999      999999999999    9999999999 \n"+
    " 9999999999                                      9999999999 \n"+
    " 99999999999                                    99999999999 \n"+
    " 9999999999999999999999999999999999999999999999999999999999 \n"+
    " 9999999999999999999999999999999999999999999999999999999999 \n"+
    "                                                            \n"+
    "                                                            \n"+
    "                                                            ",
  shipspawn: [{x:-235,y:0},{x:235,y:0}],
  radar: {type:"box",width:8,height:12}},
  {name: "Alleyway", author: "Healer", map:
    "999999989899998888989899998888898899998888888899998988889999\n"+
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999                999                999                999\n"+
    "99                  999              999                  99\n"+
    "99                  99999999999999999999                  99\n"+
    "99                   999999999999999999                   99\n"+
    "999999                                                999999\n"+
    "999                                                      999\n"+
    "99      89998888    8888899  999999    88888   88999      99\n"+
    "99     899               99     99                998     99\n"+
    "99  9  8999              99      99              9998  9  99\n"+
    "99 8   88999            99        99            99988   9 99\n"+
    "9988   889999           9          9           999988   9999\n"+
    "9988   88999999        999                   99999988   9989\n"+
    "9988     9999 9        9999                  9 9999     9999\n"+
    "998       99   9      9999       99999      9   99       899\n"+
    "99                    999           99                    99\n"+
    "99                    99             9                    99\n"+
    "99                    9             99                    99\n"+
    "99                    99           999                    99\n"+
    "998       99   9      99999       9999      9   99       899\n"+
    "9988     9999 9                  9999        9 9999     9999\n"+
    "9988   88999998                   999        99999988   9989\n"+
    "9998   889999           9          9           999988   9999\n"+
    "99 9   88899            99        99            99988   9 99\n"+
    "99  9  8899              99      99              9998  9  99\n"+
    "99     999                99     99               999     99\n"+
    "99      99998   88888    999999  8888888    88888889      99\n"+
    "999                                                      999\n"+
    "999999                                                999999\n"+
    "99                   999999999999999999                   99\n"+
    "99                  99999999999999999999                  99\n"+
    "99                  999              999                  99\n"+
    "999                999                999                999\n"+
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999999999999999999999999999999999999999999999999999999999999\n"+
    "999988889899989888999899998888888899998999888989998988889999",
  shipspawn: [{x:-235,y:0},{x:235,y:0}],
  radar: {type:"box",width:8,height:12}},
  {name: "Atoms", author: "45rfew", map:
    "                                                            \n"+
    "                                                            \n"+
    "                                                            \n"+
    "                                               99999        \n"+
    "                                             9999999999     \n"+
    "                                            9999999999999   \n"+
    "                                            99999999999999  \n"+
    "                                            999      99999  \n"+
    "                                           9999       9999  \n"+
    "                                          9999         999  \n"+
    "                                          9999         999  \n"+
    "                                         99999         999  \n"+
    "                                        999999         999  \n"+
    "                                       999999          999  \n"+
    "                                      999999          9999  \n"+
    "                       99  9    99  9999999    9     9999   \n"+
    "                      99  99999999  999999    99999999999   \n"+
    "                     99   999999999999999    9999999999     \n"+
    "                    999  999999999999999    9999999         \n"+
    "                    9999999999999999999    999999           \n"+
    "                   9999999999999999999    9999999           \n"+
    "                   999999999999999999    999999             \n"+
    "                  999999999      999    9999999             \n"+
    "                  999999               999999               \n"+
    "                  99999               999999                \n"+
    "                  99999              9999999                \n"+
    "                  99999              999999                 \n"+
    "                 99999                99999                 \n"+
    "                 99999                99999                 \n"+
    "                 99999                99999                 \n"+
    "                 99999                9999                  \n"+
    "                 99999                9999                  \n"+
    "                 99999                9999                  \n"+
    "                 999999               9999                  \n"+
    "                 999999              99999                  \n"+
    "            9   999999               99999                  \n"+
    "           9  9999999               999999                  \n"+
    "         999 9999999    999       9999999                   \n"+
    "        999 9999999    9999999999999999                     \n"+
    "        9999999999    9999999999999999                      \n"+
    "    9999999999999    99999999999999                         \n"+
    "    999999999999    99999999999999                          \n"+
    "   999999999999    99999999                                 \n"+
    "   99999999999    99999                                     \n"+
    "  99999     9    99999                                      \n"+
    "  9999          99999                                       \n"+
    "  999          999999                                       \n"+
    "  999         999999                                        \n"+
    "  999         999999                                        \n"+
    "  999         99999                                         \n"+
    "  999         99999                                         \n"+
    "  9999       999999                                         \n"+
    "  99999      999999                                         \n"+
    "   9999999999999999                                         \n"+
    "    9999999999999                                           \n"+
    "     999999999999                                           \n"+
    "        999999                                              \n"+
    "                                                            \n"+
    "                                                            \n"+
    "                                                            ",
    shipspawn: [{x:-204,y:-185},{x:204,y:185}],
    radar: {type:"round",width:15,height:15},
    basedmg: [{x:-175,x2:-230,y:-150,y2:-215},{x:175,x2:230,y:150,y2:215}]
  },
  {name: "Stadium 2.0", author: "Liberal", map:
    "99       99999999999999999999999999999    999    999       9\n"+
    "999       99999999999999999999999999999    999    999       \n"+
    " 999                                 999    999    999      \n"+
    "  999                                 999    999    999     \n"+
    "   999                                 999    999    999    \n"+
    "    99                                  999    999    999   \n"+
    "            99999999999999999999999      999    999    999  \n"+
    "             999999999999999999999        999    999    999 \n"+
    "              999             999          9999999999    999\n"+
    "9              999           999            9999999999    99\n"+
    "99              999999999999999                     999    9\n"+
    "99               9999999999999                      9999    \n"+
    "99    9                            9999             99999   \n"+
    "99    99                          999999            99 999  \n"+
    "99    999                        999  999           99  999 \n"+
    "99    9999                      999    999           9   999\n"+
    "99    99999                    999      9999999           99\n"+
    "99    99 999                  999        999999           99\n"+
    "99    99  99                 999             99           99\n"+
    "99    99  99                999              99           99\n"+
    "99    99  99               999               99     9     99\n"+
    "99    99  99               99                99     99    99\n"+
    "99    99  99               99                99     99    99\n"+
    "99    99  99               99               999     99    99\n"+
    "99    99  99              999              999      99    99\n"+
    "99    99  99             999              999       99    99\n"+
    "99    99  99            999              999       9999   99\n"+
    "99    99  99        999999              999       999999  99\n"+
    "99    99 999       999999              999       999  999 99\n"+
    "99    99999       999                 999       999    99999\n"+
    "99    9999       999                 999       999      9999\n"+
    "99    999       999                 999       999        999\n"+
    "99    99       999                 999       999          99\n"+
    "99    9       999                 999       999           99\n"+
    "99           999                 999       999            99\n"+
    "99          999                 99999       999           99\n"+
    "99          99                 999 999       999          99\n"+
    "99          99                999   999       999         99\n"+
    "999         999              999     999       999        99\n"+
    " 999         999            999       999       999       99\n"+
    "  999         999          999         999       999      99\n"+
    "   999         999        999           999       999     99\n"+
    "9   999         99       999             999       999    99\n"+
    "99   999        99      999       9       999       999   99\n"+
    "999   999       99     999       999       999       999  99\n"+
    " 999   999      999999999       99999       999       999 99\n"+
    "  999   99      99999999       999 999       999       99999\n"+
    "   999  99                    999   999       999       9999\n"+
    "    999 99                   999     999       999       999\n"+
    "     99999                  999       999       999       99\n"+
    "9     9999                 999         999       999       9\n"+
    "99     999                999           999       999       \n"+
    "999     9999999     99999999             999       999      \n"+
    " 999     9999999     9999999              999       999     \n"+
    "  999     999             999              999       999    \n"+
    "   999     999             999              999       999   \n"+
    "    999     999             999              999       999  \n"+
    "     999     999             999              999       999 \n"+
    "      999     999999999999999999999999999999999999       999\n"+
    "9      999     999999999999999999999999999999999999       99",
  shipspawn: [{x:-90,y:-260},{x:260,y:90}],
  radar: {type:"box",width:10,height:10},
  basedmg: [{x:-110,x2:-70,y:-280,y2:-240},{x:240,x2:280,y:70,y2:110}]
  }
];
