//Rumble made with ships in Nautic Series
var modifier = {
  map_size: 60,
  crystal_value: 0,
  max_players: 20,
  kills_to_win: 100,
  yeet_gems: true,
  healer_button: false,
  round_timer: 30, // in minutes
  game_delay: 60, // in seconds
  round_ship_tier: "random",//choose from 3-7 or "random"
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

var Squid_301 = '{"name":"Squid","level":3,"model":1,"size":1.09,"zoom":1.25,"specs":{"shield":{"capacity":[200,275],"reload":[6,8]},"generator":{"capacity":[125,175],"reload":[45,55]},"ship":{"mass":330,"speed":[40,55],"rotation":[70,85],"acceleration":[90,105],"dash":{"rate":3,"burst_speed":[150,185],"speed":[125,160],"acceleration":[70,70],"initial_energy":[45,65],"energy":[15,25]}}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":-90,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[-25,-25,-30,0,20,60,60],"z":[0,0,0,0,0,0,0,0]},"width":[0,4,10,17,20,22,0],"height":[0,2,6,10,12,13,0],"texture":[3.9,3.9,2.9,0.9,10.245],"propeller":false},"detail2":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":-10,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-20,-20,5,18,75,70],"z":[0,0,0,0,0,0]},"width":[0,27,27,15,15,0],"height":[0,9.3,9.3,8,8,0],"texture":[3.9,8.19,3.9,16.9],"propeller":true},"detail3":{"section_segments":[0,175,-125],"offset":{"x":0,"y":-20,"z":8.8},"position":{"x":[0,0,20],"y":[-10,-10,30],"z":[0,0,-2]},"width":[0,23.3,0],"height":[0,4.1,0],"texture":[1.1]},"detail4":{"section_segments":[0,125,-175],"offset":{"x":0,"y":-20,"z":8.8},"position":{"x":[0,0,-20],"y":[-10,-10,30],"z":[0,0,-2]},"width":[0,23.3,0],"height":[0,4.1,0],"texture":[0.9]},"detail5":{"section_segments":6,"offset":{"x":0,"y":34,"z":0},"position":{"x":[0,0,0,0],"y":[-11,-11,11,11],"z":[0,0,0,0]},"width":[0,30,30,0],"height":[0,13,13,0],"texture":[3.9,8,3.9],"angle":90},"detail6":{"section_segments":6,"offset":{"x":0,"y":40,"z":10},"position":{"x":[0,0,0,0,0,0],"y":[-30,-30,-20,10,15,15],"z":[-1,-1,0,0,-3,-3]},"width":[0,6,11,11,6,0],"height":[0,3,8,8,4,0],"propeller":false,"texture":[7,7,9,3.9,3.9]},"detail7":{"section_segments":12,"offset":{"x":0,"y":-2,"z":3},"position":{"x":[0,0,0,0,0,0,0,0],"y":[0,0,10,12,10,13,13,13],"z":[0,0,0,0,0,0,0,0]},"width":[0,10,10,9,6,4,3,0],"height":[0,10,10,9,6,4,3,0],"vertical":true,"texture":[4,4,4,17,4,63,18]},"detail8":{"section_segments":6,"offset":{"x":0,"y":-45,"z":6},"position":{"x":[0,0,0,0,0,0],"y":[-30,-30,-25,25,30,30],"z":[0,0,0,0,0,0]},"width":[0,5,9,9,5,0],"height":[0,3,4,4,3,0],"texture":[63,63,15,63,63]},"detail9":{"section_segments":6,"offset":{"x":0,"y":-55,"z":0},"position":{"x":[0,0,0,40,0,0,0],"y":[-35,-35,-28,0,28,35,35],"z":[0,0,0,0,0,0,0]},"width":[0,6,15,25,15,6,0],"height":[0,2,4,5,4,2,0],"texture":[63,63,3.9,3.9,63,63],"angle":90},"detail10":{"section_segments":6,"offset":{"x":-1.5,"y":34,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-15,-15,-11,11,15,15],"z":[0,0,0,0,0,0]},"width":[0,14,29,29,14,0],"height":[0,3,8,8,3,0],"texture":[3.9,16.9,15,3.9,3.9],"angle":90},"detail11":{"section_segments":6,"offset":{"x":0,"y":-55,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[-35,-35,-28,0,28,35,35],"z":[0,0,0,0,0,0,0]},"width":[0,6,15,35,15,6,0],"height":[0,2,4,5,4,2,0],"texture":[63,63,3.9,3.9,63,63],"angle":90},"detail12":{"section_segments":[45,135,225,315],"offset":{"x":8,"y":-55,"z":3},"position":{"x":[15,15,0,0],"y":[0,0,20,20],"z":[1,1,0,0]},"width":[0,20,0,0],"height":[0,2,2,0],"texture":[17],"angle":90},"detail13":{"section_segments":[45,135,225,315],"offset":{"x":5,"y":75,"z":6},"position":{"x":[0,0,5,0,0],"y":[-20,-20,0,30,30],"z":[0,0,0,0,0]},"width":[0,8,6,2,0],"height":[0,6,6,2,0],"texture":[4,18,15,4]},"detail14":{"section_segments":[45,135,225,315],"offset":{"x":4,"y":75,"z":-10},"position":{"x":[0,0,5,-1,-1],"y":[-40,-40,0,27,27],"z":[0,0,-5,-5,-5]},"width":[0,8,6,2,0],"height":[0,6,6,2,0],"texture":[4,63,11,4]},"detail15":{"section_segments":[45,135,225,315],"offset":{"x":15,"y":75,"z":5},"position":{"x":[-5,-5,8,8,3,3],"y":[-30,-30,-10,10,40,40],"z":[0,0,0,0,0,0]},"width":[0,8,6,6,1.2,0],"height":[0,6,6,6,1.2,0],"texture":[11,11,8,63]},"detail16":{"section_segments":6,"offset":{"x":17,"y":75,"z":-10},"position":{"x":[-10,-10,8,10,5,-5,-5],"y":[-30,-30,0,25,55,75,75],"z":[5,5,2,0,0,0,0]},"width":[0,6,8,12,8,2,0],"height":[0,4,6,7,6,1.2,0],"texture":[1.9,1.9,0.9,10.245,3.9]},"detail17":{"section_segments":6,"offset":{"x":20,"y":35,"z":-6},"position":{"x":[0,0,-8,-3,-3,-5,3,3],"y":[-30,-30,0,20,35,50,65,65],"z":[5,5,2,0,0,0,0,0]},"width":[0,6,8,10,10,8,2,0],"height":[0,4,6,7,7,6,1.2,0],"texture":[3.9,17,3.9,10.245,2.9,63],"angle":45},"detail18":{"section_segments":6,"offset":{"x":17,"y":75,"z":-11},"position":{"x":[-10,-10,8,10,5,-5,-5],"y":[-32,-32,0,25,55,77,77],"z":[5,5,2,0,0,0,0]},"width":[0,8,10,14,10,4,0],"height":[0,4,6,7,6,1.2,0],"texture":[63]},"detail19":{"section_segments":4,"offset":{"x":0,"y":-135,"z":0},"position":{"x":[0,0,0],"y":[-15,10,30],"z":[0,0,0]},"width":[0,7,0],"height":[0,5,0],"texture":[63],"propeller":false},"detail20":{"section_segments":4,"offset":{"x":0,"y":-110,"z":5},"position":{"x":[0,0,0],"y":[-10,20,20],"z":[2,0,0]},"width":[0,15,0],"height":[0,5,0],"texture":[1],"propeller":false},"detail21":{"section_segments":6,"offset":{"x":0,"y":-85,"z":-7},"position":{"x":[0,0,0,0,0],"y":[-40,-45,-15,10,30,30],"z":[0,0,0,0,0,0]},"width":[0,4,13,15,12,0],"height":[0,3,8,10,10,0],"angle":0,"laser":{"damage":[15,20],"rate":3,"type":2,"speed":[175,210],"number":1,"error":0},"propeller":false,"texture":[3.9,1.9]}},"typespec":{"name":"Squid","level":3,"model":1,"code":301,"specs":{"shield":{"capacity":[200,275],"reload":[6,8]},"generator":{"capacity":[125,175],"reload":[45,55]},"ship":{"mass":330,"speed":[40,55],"rotation":[70,85],"acceleration":[90,105],"dash":{"rate":3,"burst_speed":[150,185],"speed":[125,160],"acceleration":[70,70],"initial_energy":[45,65],"energy":[15,25]}}},"shape":[3.27,2.623,1.941,1.705,1.567,1.423,0.657,0.576,0.522,0.482,0.458,0.441,0.433,0.435,0.446,0.465,0.487,0.337,0.408,2.274,2.262,2.039,2.54,3.032,3.331,3.32,3.331,3.032,2.54,2.039,2.262,2.274,0.408,0.337,0.487,0.465,0.446,0.435,0.433,0.441,0.458,0.482,0.522,0.576,0.657,1.423,1.567,1.705,1.941,2.623],"lasers":[{"x":0,"y":-2.834,"z":-0.153,"angle":0,"damage":[15,20],"rate":3,"type":2,"speed":[175,210],"number":1,"spread":0,"error":0,"recoil":0}],"radius":3.331}}';
var Archerfish_302 = '{"name":"Archerfish","level":3,"model":2,"size":1.6,"zoom":1.2,"specs":{"shield":{"capacity":[150,200],"reload":[5,7]},"generator":{"capacity":[150,200],"reload":[35,55]},"ship":{"mass":135,"speed":[110,125],"rotation":[110,130],"acceleration":[75,90]}},"bodies":{"detail":{"section_segments":8,"offset":{"x":0,"y":40,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-125,-125,-130,-105,-65,-30,0,30,35,55,60,60],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,4,4,13,19,20,18,5,5,6,3,0],"height":[0,3,3,20,38,45,35,12,12,40,35,0],"texture":[63,1,4,11,2,1,4,63,15,63,17]},"detail2":{"section_segments":8,"angle":90,"offset":{"x":1,"y":40,"z":-22},"position":{"x":[0,0,0,0,0],"y":[-1,-1,1,1,1],"z":[0,0,0,0,0]},"width":[0,30,30,28,0],"height":[0,30,30,28,0],"texture":[4,4,17,4]},"detail3":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":40,"z":33},"position":{"x":[0,0,0,0,0,0],"y":[-50,-50,-20,20,25,25],"z":[0,0,0,0,0,0]},"width":[0,2,2,2,2,0],"height":[0,12,20,30,25,0],"texture":[4,4,4,17,4]},"detail4":{"section_segments":6,"offset":{"x":0,"y":-30,"z":21.5},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-50,-50,-40,-28,-7,6,6],"z":[-15,-15,-15,-10,-4,1,1]},"width":[0,5,10,13,15,15,0],"height":[0,5,14,16,19,18,0],"propeller":false,"texture":[7,9,9,9,10.245,1]},"detail5":{"section_segments":6,"offset":{"x":0,"y":-30,"z":20.5},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-52,-52,-40,-28,-7,8,8],"z":[-17,-17,-11,-5,1,1,1]},"width":[0,7,12,15,17,17,0],"height":[0,7,7,7,9,18,0],"propeller":false,"texture":[4]},"detail6":{"section_segments":7,"offset":{"x":0,"y":-10,"z":25},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[20,20,17,17,20],"height":[20,20,17,17,20],"texture":[63]},"detail7":{"section_segments":6,"offset":{"x":13,"y":-20,"z":15},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-25,-25,-20,-15,15,20,25,25],"z":[0,0,0,0,0,0,0,0]},"width":[0,5,8,8,8,8,5,0],"height":[0,5,8,8,8,8,5,0],"texture":[63,63,8,15,8,63,63]},"detail8":{"section_segments":7,"offset":{"x":14,"y":-20,"z":-7},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[10,10,7,7,10],"height":[15,15,13,13,15],"texture":[4,63,4,16.9,4]},"detail9":{"section_segments":7,"offset":{"x":14,"y":-14,"z":-7},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[10,10,7,7,10],"height":[15,15,13,13,15],"texture":[4,63,4,16.9,4]},"detail10":{"section_segments":7,"offset":{"x":14,"y":-8,"z":-7},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[10,10,7,7,10],"height":[15,15,13,13,15],"texture":[4,63,4,16.9,4]},"detail11":{"section_segments":8,"offset":{"x":5,"y":20,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[0,15,18,15,15,15],"z":[0,0,0,0,0,0]},"width":[17,17,14,14,11,0],"height":[17,17,14,14,11,0],"texture":[4,63,4,17,4],"angle":90},"detail12":{"section_segments":4,"offset":{"x":0,"y":58,"z":15},"position":{"x":[0,0,0,0,0],"y":[-2,3,3,-2,-2],"z":[0,0,0,0,0]},"width":[7,7,5,5,7],"height":[30,30,28,28,30],"texture":[3]},"detail13":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":-69,"z":-13},"position":{"x":[0,0,0,0,0,0],"y":[-27,-27,-25,-10,25,25],"z":[10,10,10,0,0,0]},"width":[0,2,3,3,3,0],"height":[0,2,3,3,3,0],"texture":[4,17,4],"laser":{"damage":[5,7],"rate":7,"type":1,"speed":[160,190],"number":3,"angle":5,"error":0}},"detail14":{"section_segments":6,"offset":{"x":0,"y":28,"z":10},"position":{"x":[0,0,0,0,0,0],"y":[-25,-25,-20,15,17,17],"z":[0,0,0,0,0,0]},"width":[0,5,8,8,5,0],"height":[0,5,8,8,5,0],"texture":[3.9,3.9,15,16.9,3.9],"vertical":true},"detail15":{"section_segments":8,"offset":{"x":0,"y":40,"z":-1},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-125,-125,-130,-105,-65,-30,0,30,35,55,60,60],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,4,4,13,19,20,18,5,5,6,3,0],"height":[0,3,3,20,38,45,35,12,12,40,35,0],"texture":[63,1,63,3,3,3,3,63,15,63,17]},"detail16":{"section_segments":6,"offset":{"x":0,"y":25,"z":16},"position":{"x":[-0.5,-0.5,-0.5,-0.5],"y":[-15,-15,15,15],"z":[3,3,-5,-5]},"width":[0,16,14,0],"height":[0,26,30,0],"texture":[3.9,10.08,3.9]},"detail17":{"section_segments":6,"offset":{"x":0,"y":25,"z":16},"position":{"x":[0.5,0.5,0.5,0.5],"y":[-15,-15,15,15],"z":[3,3,-5,-5]},"width":[0,16,14,0],"height":[0,26,30,0],"texture":[3.9,10.392,3.9]},"detail18":{"section_segments":6,"offset":{"x":13,"y":30,"z":0},"position":{"x":[0,0,0,0,0],"y":[-20,-20,15,20,15],"z":[0,0,0,0,0]},"width":[0,7,7,6,0],"height":[0,17,17,16,0],"texture":[3.9,3.9,63,16.9],"propeller":true}},"typespec":{"name":"Archerfish","level":3,"model":2,"code":302,"specs":{"shield":{"capacity":[150,200],"reload":[5,7]},"generator":{"capacity":[150,200],"reload":[35,55]},"ship":{"mass":135,"speed":[110,125],"rotation":[110,130],"acceleration":[75,90]}},"shape":[3.072,2.758,2.15,1.609,1.454,1.19,1.028,1.036,0.916,0.867,0.817,0.784,0.643,0.638,0.755,0.791,0.839,0.908,1.009,1.153,1.322,1.431,1.703,1.841,3.046,3.201,3.046,1.841,1.703,1.431,1.322,1.153,1.009,0.908,0.839,0.791,0.755,0.637,0.643,0.784,0.817,0.867,0.916,1.036,1.028,1.19,1.454,1.609,2.15,2.758],"lasers":[{"x":0,"y":-3.072,"z":-0.416,"angle":0,"damage":[5,7],"rate":7,"type":1,"speed":[160,190],"number":3,"spread":5,"error":0,"recoil":0}],"radius":3.201}}';
var Guitarfish_303 = '{"name":"Guitarfish","level":3,"model":3,"size":1.26,"zoom":1.2,"specs":{"shield":{"capacity":[175,225],"reload":[6,8]},"generator":{"capacity":[100,150],"reload":[30,40]},"ship":{"mass":190,"speed":[95,110],"rotation":[70,90],"acceleration":[70,90]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":-20,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-111,-110,-90,-70,-28,0,25,55,125,150,150],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,4,12,25,31,28,18,15,5,1,0],"height":[0,3,7,13,15,13,9,6,5,2,0],"texture":[63,63,3.9,10,1.9,17,11,12.9,11]},"detail2":{"section_segments":6,"offset":{"x":0,"y":-80,"z":12},"position":{"x":[0,0,0,0,0,0],"y":[-15,-15,10,40,70,70],"z":[-1,-1,-1,0,0,0]},"width":[0,8,15,15,10,0],"height":[0,4,8,5,5,0],"propeller":false,"texture":[7,9,8.2,4]},"detail7":{"section_segments":6,"offset":{"x":34,"y":-5,"z":4},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-85,-85,-30,0,10,40,45,45],"z":[0,0,0,0,0,0,0,0]},"width":[0,3,3,3,5,5,3,0],"height":[0,3,3,3,5,5,3,0],"angle":0,"propeller":false,"texture":[2.9,16.9,3.9,63,3.9,63]},"detail8":{"section_segments":6,"offset":{"x":13,"y":5,"z":-6},"position":{"x":[0,0,0,0,0],"y":[-15,-15,-10,30,20],"z":[0,0,0,0,0]},"width":[0,10,15,15,0],"height":[0,4,7,7,0],"angle":0,"propeller":true,"texture":[63,63,0.9,16.9]},"detail9":{"section_segments":6,"offset":{"x":34,"y":-75,"z":4},"position":{"x":[0,0,0,0,0,0],"y":[-15,-25,-20,10,15,15],"z":[0,0,0,0,0,0]},"width":[0,3,5,5,3,0],"height":[0,3,5,5,3,0],"angle":0,"laser":{"damage":[17,22],"rate":1.3,"type":1,"speed":[160,185],"number":1,"error":0},"propeller":false,"texture":[63,63,15,63]},"detail10":{"section_segments":6,"offset":{"x":0,"y":-22,"z":8},"position":{"x":[-47,0,0,0,0,-47],"y":[-35,-14,-11,11,14,35],"z":[-3,3,3.5,3.5,3,-3]},"width":[15,25,25,25,25,15],"height":[2,9,12,12,9,2],"angle":90,"propeller":false,"texture":[4.1,63,10.245,63,4.1]},"detail11":{"section_segments":6,"offset":{"x":0,"y":-80,"z":10},"position":{"x":[0,0,0,0,0,0],"y":[-18,-18,10,40,70,70],"z":[-1,-1,-1,0,0,0]},"width":[0,11,19,19,14,0],"height":[0,4,8,5,5,0],"propeller":false,"texture":[4]}},"wings":{"detail":{"length":[15,20,15],"width":[0,75,50,25],"angle":[-5,-5,-5],"position":[-10,-10,5,25],"doubleside":true,"texture":[1,1,63],"bump":{"position":0,"size":10},"offset":{"x":6,"y":-45,"z":0}},"detail2":{"length":[5,22,8],"width":[70,60,50,25],"angle":[5,5,5],"position":[0,-10,0,5],"doubleside":true,"texture":[4,4,63],"bump":{"position":0,"size":5},"offset":{"x":0,"y":18,"z":0}},"detail3":{"length":[0,15,15,15],"width":[20,20,16,12,4],"angle":[90,90,90,90],"position":[-15,-15,-12,-6,5],"doubleside":true,"texture":[1,1,63],"bump":{"position":-35,"size":25},"offset":{"x":0,"y":141,"z":0}},"detail4":{"length":[0,8,8,8],"width":[20,20,16,11,4],"angle":[-90,-90,-90,-90],"position":[-15,-15,-14,-10,-4],"doubleside":true,"texture":[1,1,63],"bump":{"position":-35,"size":25},"offset":{"x":0,"y":141,"z":0}},"detail5":{"length":[0,23,7],"width":[60,40,10,5],"angle":[90,90,90],"position":[-26,-26,-5,2],"doubleside":true,"texture":[1,1,1],"bump":{"position":30,"size":15},"offset":{"x":0,"y":95,"z":0}},"detail6":{"length":[0,23,7],"width":[60,40,10,5],"angle":[90,90,90],"position":[-26,-26,-5,2],"doubleside":true,"texture":[8,8,4],"bump":{"position":30,"size":15},"offset":{"x":0,"y":50,"z":0}},"detail7":{"length":[0,23,5],"width":[60,40,10,5],"angle":[90,90,90],"position":[-26,-26,-5,2],"doubleside":true,"texture":[4,17,1],"bump":{"position":30,"size":15},"offset":{"x":0,"y":94,"z":0}}},"typespec":{"name":"Guitarfish","level":3,"model":3,"code":303,"specs":{"shield":{"capacity":[175,225],"reload":[6,8]},"generator":{"capacity":[100,150],"reload":[30,40]},"ship":{"mass":190,"speed":[95,110],"rotation":[70,90],"acceleration":[70,90]}},"shape":[3.301,2.99,2.649,2.683,2.263,1.925,1.797,1.706,1.651,1.603,1.512,1.452,0.944,0.973,0.997,1.036,1.1,1.193,1.316,1.366,1.308,1.278,1.147,1.401,2.333,3.73,2.333,1.401,1.147,1.278,1.308,1.366,1.316,1.193,1.1,1.036,0.997,0.973,0.944,1.452,1.512,1.603,1.651,1.706,1.797,1.925,2.263,2.683,2.649,2.99],"lasers":[{"x":0.857,"y":-2.52,"z":0.101,"angle":0,"damage":[17,22],"rate":1.3,"type":1,"speed":[160,185],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.857,"y":-2.52,"z":0.101,"angle":0,"damage":[17,22],"rate":1.3,"type":1,"speed":[160,185],"number":1,"spread":0,"error":0,"recoil":0}],"radius":3.73}}';
var Turtle_304 = '{"name":"Turtle","level":3,"model":4,"size":1.4,"zoom":1.25,"specs":{"shield":{"capacity":[150,200],"reload":[5,7]},"generator":{"capacity":[125,175],"reload":[45,60]},"ship":{"mass":165,"speed":[85,100],"rotation":[75,95],"acceleration":[75,100]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":-20,"z":-3},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-97,-103,-100,-97,-84,-55,-30,-10,30,70,100,110,135,136],"z":[-2,-2,-2,-2,-2,0,0,0,0,0,0,1,1,1]},"width":[0,3,5,15,22,27,27,57,67,57,30,8,2,0],"height":[0,3,5,8,13,16,16,20,25,25,15,11,2,0],"texture":[3.9,63,2.9,2.9,10,15,2.9,2.9,2.9,2.9,16.9,3.9],"laser":{"damage":[30,35],"rate":2,"type":1,"speed":[120,155],"number":1,"error":0}},"detail2":{"section_segments":6,"offset":{"x":0,"y":10,"z":17},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-70,-70,-60,-40,-20,0,20,40,60,70,70],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,35,48,62,72,75,70,58,37,22,0],"height":[0,5,8,10,11,12,11,10,8,5,0],"texture":[63]},"detail3":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":10,"z":14},"position":{"x":[15,15,35,47,56,59,54,46,32,5,0],"y":[-75,-75,-63,-42,-21,0,21,38,56,75,75],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,35,25,25,25,25,25,25,25,25,0],"height":[0,5,5,5,5,5,5,5,5,5,0],"texture":[4,4,18,18,18,18,18,18,4]},"detail4":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":10,"z":25},"position":{"x":[0,0,0,0,0],"y":[-12,-12,0,12,12],"z":[0,0,0,0,0]},"width":[0,22,40,22,0],"height":[0,5,7,5,0],"texture":[4]},"detail5":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":37,"z":25},"position":{"x":[0,0,0,0,0],"y":[-12,-12,0,12,12],"z":[0,0,0,0,0]},"width":[0,22,40,22,0],"height":[0,5,7,5,0],"texture":[4]},"detail6":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":64,"z":23.5},"position":{"x":[0,0,0,0,0],"y":[-12,-12,1,12,12],"z":[0,0,0,0,0]},"width":[0,22,41,22,0],"height":[0,5,7,5,0],"texture":[4]},"detail7":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":-17,"z":25},"position":{"x":[0,0,0,0,0],"y":[-12,-12,0,12,12],"z":[0,0,0,0,0]},"width":[0,22,40,22,0],"height":[0,5,7,5,0],"texture":[4]},"detail8":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":-44,"z":23.5},"position":{"x":[0,0,0,0,0],"y":[-12,-12,0,12,12],"z":[0,0,0,0,0]},"width":[0,22,40,22,0],"height":[0,5,7,5,0],"texture":[4]},"detail9":{"section_segments":[45,135,225,315],"offset":{"x":42,"y":23.5,"z":23},"position":{"x":[3,3,-4,0,0],"y":[-12,-12,0,12,12],"z":[0,0,0,0,0]},"width":[0,20,27,15,0],"height":[0,5,7,5,0],"texture":[4]},"detail10":{"section_segments":[45,135,225,315],"offset":{"x":42,"y":-3.5,"z":23},"position":{"x":[1,1,-3,3,3],"y":[-12,-12,0,12,12],"z":[0,0,0,0,0]},"width":[0,16,28,20,0],"height":[0,5,7,5,0],"texture":[4]},"detail11":{"section_segments":[45,135,225,315],"offset":{"x":40,"y":50,"z":22},"position":{"x":[1,1,-8,-8],"y":[-12,-12,0,13],"z":[0,0,0,0]},"width":[0,13,18,0],"height":[0,5,7,5],"texture":[4]},"detail12":{"section_segments":[45,135,225,315],"offset":{"x":42,"y":-31,"z":22},"position":{"x":[-7,-7,-9,0,0],"y":[-12,-12,0,12,12],"z":[0,0,0,0,0]},"width":[0,5,19,15,0],"height":[0,5,7,5,0],"texture":[4]},"detail13":{"section_segments":[45,135,225,315],"offset":{"x":28.5,"y":-51.5,"z":22},"position":{"x":[-5,-5,5.5,5.5],"y":[-5,-5,5,5],"z":[0,0,0,0]},"width":[0,5,5,0],"height":[0,5,5,0],"texture":[4]},"detail14":{"section_segments":6,"offset":{"x":0,"y":-40,"z":5},"position":{"x":[0,0,0,0,0,0],"y":[-15,-15,5,40,60,70],"z":[0,0,0,0,-1,-1]},"width":[0,10,13,13,8,0],"height":[0,5,5,8,6,0],"propeller":false,"texture":[3.9,12.9,16.9,9,7],"angle":180},"detail15":{"section_segments":6,"offset":{"x":47,"y":50,"z":-11},"position":{"x":[0,0,0,0,0,0],"y":[-50,-55,-10,0,20,25],"z":[0,0,0,0,0,0]},"width":[0,3,8,11,9,0],"height":[0,3,8,11,9,0],"angle":180,"laser":{"damage":[6,9],"rate":4,"type":1,"speed":[150,175],"recoil":70,"number":1,"error":0},"propeller":false,"texture":[3.9,63,63,3.9]},"detail16":{"section_segments":6,"offset":{"x":20,"y":55,"z":-3},"position":{"x":[0,0,0,0,0,0,0],"y":[-70,-65,-20,-10,35,25],"z":[0,0,0,0,0,0,0]},"width":[0,20,20,15,13,0],"height":[0,10,10,7,7,0],"angle":0,"propeller":true,"texture":[63,63,63,3.9,16.9]},"detail17":{"section_segments":[45,135,225,315],"angle":-40,"offset":{"x":38,"y":-50,"z":3},"position":{"x":[12,12,0,0,0],"y":[-50,-50,-15,25,25],"z":[-5,-5,0,0,0]},"width":[0,10,15,15,0],"height":[0,4,6,8,0],"texture":[3.9,8,63]},"detail18":{"section_segments":6,"angle":-150,"offset":{"x":35,"y":48,"z":3},"position":{"x":[12,12,0,0,0],"y":[-50,-50,-30,25,25],"z":[-10,-10,-3,0,0]},"width":[0,10,15,15,0],"height":[0,4,6,8,0],"texture":[3.9,15,11]},"detail19":{"section_segments":[0,175,-125],"offset":{"x":0,"y":10,"z":20},"position":{"x":[39.5,44.5,58,66.5,69,64.5,55.5,39.5,22.5],"y":[-75,-63,-40,-20,0,20,40,60,75],"z":[-2,0,0,0,0,0,0,0,-2]},"width":[0,10,10,10,10,10,10,10,0],"height":[0,4,4,4,4,4,4,4,0],"propeller":false,"texture":[4.1]},"detail20":{"section_segments":[0,125,-175],"offset":{"x":0,"y":10,"z":20},"position":{"x":[-39.5,-44.5,-58,-66.5,-69,-64.5,-55.5,-39.5,-22.5],"y":[-75,-63,-40,-20,0,20,40,60,75],"z":[-2,0,0,0,0,0,0,0,-2]},"width":[0,10,10,10,10,10,10,10,0],"height":[0,4,4,4,4,4,4,4,0],"propeller":false,"texture":[3.9]},"detail21":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":10,"z":14},"position":{"x":[-15,-15,-35,-47,-56,-59,-54,-46,-32,-5,0],"y":[-75,-75,-63,-42,-21,0,21,38,56,75,75],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,35,25,25,25,25,25,25,25,25,0],"height":[0,5,5,5,5,5,5,5,5,5,0],"texture":[4,4,18,18,18,18,18,18,4]}},"typespec":{"name":"Turtle","level":3,"model":4,"code":304,"specs":{"shield":{"capacity":[150,200],"reload":[5,7]},"generator":{"capacity":[125,175],"reload":[45,60]},"ship":{"mass":165,"speed":[85,100],"rotation":[75,95],"acceleration":[75,100]}},"shape":[3.445,3.336,2.898,2.113,2.354,2.98,3.179,3.188,2.033,2.035,2.057,2.11,2.126,2.177,2.179,2.196,2.207,2.247,2.274,2.649,3.001,3.251,3.249,2.65,2.651,3.248,2.651,2.65,3.249,3.251,3.001,2.649,2.274,2.247,2.207,2.196,2.179,2.177,2.126,2.11,2.057,2.035,2.033,3.188,3.179,2.98,2.354,2.113,2.898,3.336],"lasers":[{"x":0,"y":-3.444,"z":-0.084,"angle":0,"damage":[30,35],"rate":2,"type":1,"speed":[120,155],"number":1,"spread":0,"error":0,"recoil":0},{"x":1.316,"y":2.94,"z":-0.308,"angle":180,"damage":[6,9],"rate":4,"type":1,"speed":[150,175],"number":1,"spread":0,"error":0,"recoil":70},{"x":-1.316,"y":2.94,"z":-0.308,"angle":-180,"damage":[6,9],"rate":4,"type":1,"speed":[150,175],"number":1,"spread":0,"error":0,"recoil":70}],"radius":3.445}}';
 
var Cuttlefish_401 = '{"name":"Cuttlefish","level":4,"model":1,"size":1.3,"zoom":1.1,"specs":{"shield":{"capacity":[350,450],"reload":[8,10]},"generator":{"capacity":[0.1,0.1],"reload":[1,1]},"ship":{"mass":450,"speed":[165,175],"rotation":[85,120],"acceleration":[100,120],"dash":{"rate":1,"burst_speed":[1,1],"speed":[1,1],"acceleration":[1,1],"initial_energy":[1,1],"energy":[1,1]}}},"bodies":{"detail":{"section_segments":8,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-137,-136,-125,-100,-60,-60,-30,-55,-45,-10,0,-25,-25],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,10,25,45,55,45,45,50,55,53,48,30,0],"height":[0,10,25,45,55,45,45,50,55,53,48,30,0],"texture":[63,63,3,11,4,18,4,63,15,63,4]},"detail2":{"section_segments":6,"offset":{"x":0,"y":-80,"z":54},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-51,-50,-40,-28,-6,0,-6,5,55,90,95,95],"z":[-32,-32,-21,-13,-6,-6,-6,-4,-1,-3,-3,-3]},"width":[0,10,15,18,20,19,17,17,17,13,8,0],"height":[0,5,4,6,8,8,5,5,5,5,3,0],"texture":[6.9,9,9,9,3.9,3.9,16.9,3.9,10.24,63]},"detail3":{"section_segments":6,"offset":{"x":0,"y":-80,"z":-50},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-51,-50,-40,-28,-13,10,35,80,85,85],"z":[32,32,21,13,6,-1,-2,-3,-3,-3]},"width":[0,10,15,18,20,20,17,13,8,0],"height":[0,5,4,6,8,8,5,5,3,0],"texture":[3.9]},"detail4":{"section_segments":6,"offset":{"x":0,"y":35,"z":-40},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-51,-50,-40,-23,10,50,90,90],"z":[32,32,21,7,-1,1,5,5]},"width":[0,5,8,10,10,9,4,0],"height":[0,5,8,10,10,9,4,0],"texture":[63,63,63,3.9,15,63]},"detail5":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":35,"z":40},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-51,-50,-40,-23,10,50,90,90],"z":[-32,-32,-21,-7,1,-1,-5,-5]},"width":[0,5,8,10,10,9,4,0],"height":[0,5,8,10,10,9,4,0],"texture":[63,63,63,3.9,15,63]},"detail6":{"section_segments":6,"offset":{"x":-30,"y":35,"z":-30},"position":{"x":[32,32,21,7,1,1,5,5],"y":[-51,-50,-40,-23,10,40,75,75],"z":[32,32,21,7,-1,1,5,5]},"width":[0,5,8,10,10,9,4,0],"height":[0,5,8,10,10,9,4,0],"texture":[63,63,63,3.9,3.9,63]},"detail7":{"section_segments":6,"offset":{"x":-30,"y":35,"z":30},"position":{"x":[32,32,21,7,1,1,5,5],"y":[-51,-50,-40,-23,10,40,75,75],"z":[-32,-32,-21,-7,1,-1,-5,-5]},"width":[0,5,8,10,10,9,4,0],"height":[0,5,8,10,10,9,4,0],"texture":[63,63,63,3.9,3.9,63]},"detail8":{"section_segments":6,"offset":{"x":25,"y":35,"z":0},"position":{"x":[-10,-10,15,10,5,-5,-5],"y":[-60,-60,0,35,65,95,95],"z":[0,0,0,0,0,0,0]},"width":[0,6,7,19,14,5,0],"height":[0,5,7,8,7,2,0],"texture":[3.9,3.9,0.9,10,3.9],"angle":5},"detail9":{"section_segments":6,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-140,-140,-125,-100,-60,-45,-15,-12,-12,-12],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,10,32,54,65,65,63,58,40,0],"height":[0,7,7,7,7,7,7,7,7,0],"texture":[3.9,3.9,3.9,3.9,3.9,8,3.9]},"detail10":{"section_segments":10,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-35,-35,5,30,45,35],"z":[0,0,0,0,0,0]},"width":[0,40,40,35,20,0],"height":[0,40,40,35,20,0],"texture":[4,17,18,1,17],"propeller":true},"detail11":{"section_segments":10,"offset":{"x":0,"y":10,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-5,-5,5,5],"z":[0,0,0,0,0,0]},"width":[0,48,45,0],"height":[0,48,45,0],"texture":[4]},"detail12":{"section_segments":8,"offset":{"x":30,"y":-26,"z":30},"position":{"x":[0,0,0,0,0],"y":[-5,5,5,-5,-5],"z":[0,0,0,0,0]},"width":[20,20,15,15,20],"height":[20,20,15,15,20],"texture":[2]},"detail13":{"section_segments":8,"offset":{"x":30,"y":-26,"z":-30},"position":{"x":[0,0,0,0,0],"y":[-5,5,5,-5,-5],"z":[0,0,0,0,0]},"width":[20,20,15,15,20],"height":[20,20,15,15,20],"texture":[2]},"detail14":{"section_segments":6,"offset":{"x":24,"y":35,"z":0},"position":{"x":[-10,-10,15,10,5,-5,-5],"y":[-60,-60,0,35,65,95,95],"z":[0,0,0,0,0,0,0]},"width":[0,6,7,19,14,5,0],"height":[0,5,7,8,7,2,0],"texture":[3.9,3.9,63,63,3.9],"angle":5}},"wings":{"main":{"length":[10],"width":[50,40],"angle":[-10],"position":[0,15],"doubleside":true,"offset":{"x":0,"y":-46,"z":58},"bump":{"position":40,"size":4},"texture":[63]}},"typespec":{"name":"Cuttlefish","level":4,"model":1,"code":401,"specs":{"shield":{"capacity":[350,450],"reload":[8,10]},"generator":{"capacity":[0.1,0.1],"reload":[1,1]},"ship":{"mass":450,"speed":[165,175],"rotation":[85,120],"acceleration":[100,120],"dash":{"rate":1,"burst_speed":[1,1],"speed":[1,1],"acceleration":[1,1],"initial_energy":[1,1],"energy":[1,1]}}},"shape":[3.647,3.643,3.377,3.09,2.854,2.489,2.231,2.007,1.798,1.643,1.535,1.427,1.342,1.248,1.191,1.179,1.178,1.474,1.747,2.189,2.497,2.863,3.22,3.477,3.451,3.251,3.451,3.477,3.22,2.863,2.497,2.189,1.747,1.474,1.178,1.179,1.191,1.194,1.342,1.427,1.535,1.643,1.798,2.007,2.231,2.489,2.854,3.09,3.377,3.643],"lasers":[],"radius":3.647}}';
var Lionfish_402 = '{"name":"Lionfish","level":4,"model":2,"size":1.35,"zoom":1.25,"specs":{"shield":{"capacity":[175,225],"reload":[5,7]},"generator":{"capacity":[150,200],"reload":[40,65]},"ship":{"mass":165,"speed":[110,120],"rotation":[80,95],"acceleration":[80,100]}},"bodies":{"detail":{"section_segments":10,"offset":{"x":0,"y":-30,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-106,-106,-99,-90,-85,-60,-50,-30,-20,0,10,30,40,60,75,85,90,0],"z":[6,6,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,3,8,13,15,17,21,21,22,22,21,21,19,17,15,5,5,0],"height":[0,1,10,27,30,40,40,40,40,40,40,40,40,35,26,12,12,0],"texture":[3,3,3,4,63,8,4,8,63,8,4,8,3,4,4,17,4]},"detail2":{"section_segments":4,"offset":{"x":0,"y":-85,"z":30},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[0,0,4,8,12,16,20,24,28,32,36,40,44,48,48],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,1,2,2,1,2,2,1,2,2,1,2,2,2,2,0],"height":[0,1,50,52,1,55,57,1,60,62,1,65,67,1,0],"propeller":false,"texture":[17,17,15,17,17,15,17,17,15,17,17,15,17,17]},"detail3":{"section_segments":4,"angle":180,"offset":{"x":0,"y":11,"z":30},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[0,0,4,8,12,16,20,24,28,32,36,40,44,48,48],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,1,2,2,1,2,2,1,2,2,1,2,2,2,2,0],"height":[0,1,50,52,1,55,57,1,60,62,1,65,67,1,0],"propeller":false,"texture":[17,17,15,17,17,15,17,17,15,17,17,15,17,17]},"detail4":{"section_segments":10,"angle":90,"offset":{"x":2,"y":-65,"z":-5},"position":{"x":[0,0,0,0,0,0],"y":[0,20,23,23,22,22],"z":[0,0,0,0,0,0]},"width":[15,15,10,6,4,0],"height":[15,15,10,6,4,0],"propeller":false,"texture":[4,63,4,17,4]},"detail5":{"section_segments":6,"angle":10,"offset":{"x":28,"y":-20,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-45,-45,-25,25,30,30],"z":[0,0,5,19,20,21]},"width":[0,1,2,2,2,0],"height":[0,1,2,5,5,0],"propeller":false,"texture":[3.9,3.9,8,63,3.9]},"detail6":{"section_segments":6,"angle":15,"offset":{"x":30,"y":-20,"z":-3},"position":{"x":[0,0,0,0,0,0],"y":[-45,-45,-25,20,25,25],"z":[0,0,2,8,9,9]},"width":[0,1,2,2,2,0],"height":[0,1,2,5,5,0],"propeller":false,"texture":[3.9,3.9,8,63,3.9]},"detail7":{"section_segments":6,"angle":20,"offset":{"x":32,"y":-20,"z":-6},"position":{"x":[0,0,0,0,0,0],"y":[-45,-45,-25,15,20,20],"z":[0,0,-1,-2.5,-3,-3]},"width":[0,1,2,2,2,0],"height":[0,1,2,5,5,0],"propeller":false,"texture":[3.9,3.9,8,63,3.9]},"detail8":{"section_segments":6,"angle":25,"offset":{"x":34,"y":-20,"z":-9},"position":{"x":[0,0,0,0,0,0],"y":[-45,-45,-25,10,15,15],"z":[0,0,-4,-12,-13,-13]},"width":[0,1,2,2,2,0],"height":[0,1,2,5,5,0],"propeller":false,"texture":[3.9,3.9,8,63,3.9]},"detail9":{"section_segments":6,"angle":30,"offset":{"x":36,"y":-22,"z":-10},"position":{"x":[0,0,0,0,0,0],"y":[-45,-45,-25,5,10,10],"z":[0,0,-10,-25,-27,-27]},"width":[0,1,2,2,2,0],"height":[0,1,2,5,5,0],"propeller":false,"texture":[3.9,3.9,8,63,3.9]},"detail10":{"section_segments":6,"angle":11.5,"offset":{"x":28,"y":-20,"z":-2.5},"position":{"x":[0,0,0,0,0,0],"y":[-45,-45,-25,20,25,25],"z":[0,0,3.5,13.5,14.5,15]},"width":[0,1,1,1,1,0],"height":[0,3,3,5,5,0],"propeller":false,"texture":[3.9,3.9,16.9,63]},"detail11":{"section_segments":6,"angle":23,"offset":{"x":29,"y":-20,"z":-6},"position":{"x":[0,0,0,0,0,0],"y":[-45,-45,-25,15,20,20],"z":[0,0,0.5,2.75,3,3]},"width":[0,1,1,1,1,0],"height":[0,3,3,5,5,0],"propeller":false,"texture":[3.9,3.9,16.9,63]},"detail12":{"section_segments":6,"angle":28,"offset":{"x":31,"y":-20,"z":-8},"position":{"x":[0,0,0,0,0,0],"y":[-45,-45,-25,10,15,15],"z":[0,0,-2.5,-7.75,-8,-8]},"width":[0,1,1,1,1,0],"height":[0,3,3,5,5,0],"propeller":false,"texture":[3.9,3.9,16.9,63]},"detail13":{"section_segments":6,"angle":31,"offset":{"x":33.5,"y":-25,"z":-8},"position":{"x":[0,0,0,0,0,0],"y":[-45,-45,-25,5,10,10],"z":[0,0,-7,-18.5,-20,-20]},"width":[0,1,1,1,1,0],"height":[0,3,3,5,5,0],"propeller":false,"texture":[3.9,3.9,16.9,63]},"detail14":{"section_segments":4,"angle":0,"offset":{"x":0,"y":80,"z":0},"position":{"x":[0,0,0,0],"y":[-30,-30,30,30],"z":[0,0,0,0]},"width":[0,1,1,0],"height":[0,3,35,0],"propeller":false,"texture":[63]},"detail15":{"section_segments":6,"angle":0,"offset":{"x":0,"y":-37,"z":30},"position":{"x":[0,0,0,0,0,0],"y":[-78,-78,-65,-53,47,47],"z":[0,0,0,0,0,0]},"width":[0,4,9,10,10,0],"height":[0,4,9,10,10,0],"propeller":false,"texture":[3.9,3.9,3.9,12.9,3.9]},"detail16":{"section_segments":6,"angle":0,"offset":{"x":0,"y":80,"z":0},"position":{"x":[0,0,0,0],"y":[-31,-31,31,31],"z":[0,0,34,34]},"width":[0,4,2,0],"height":[0,4,2,0],"propeller":false,"texture":[8,8,3.9]},"detail17":{"section_segments":6,"angle":0,"offset":{"x":0,"y":80,"z":0},"position":{"x":[0,0,0,0],"y":[-31,-31,31,31],"z":[0,0,-34,-34]},"width":[0,4,2,0],"height":[0,4,2,0],"propeller":false,"texture":[8,8,3.9]},"detail18":{"section_segments":6,"angle":0,"offset":{"x":0,"y":80,"z":0},"position":{"x":[0,0,0,0],"y":[-31,-31,31,31],"z":[0,0,0,0]},"width":[0,4,2,0],"height":[0,4,2,0],"propeller":false,"texture":[8,8,3.9]},"detail19":{"section_segments":6,"angle":0,"offset":{"x":0,"y":80,"z":0},"position":{"x":[0,0,0,0],"y":[-31,-31,15.5,15.5],"z":[0,0,8.5,8.5]},"width":[0,4,2,0],"height":[0,4,2,0],"propeller":false,"texture":[3.9]},"detail20":{"section_segments":6,"angle":0,"offset":{"x":0,"y":80,"z":0},"position":{"x":[0,0,0,0],"y":[-31,-31,15.5,15.5],"z":[0,0,-8.5,-8.5]},"width":[0,4,2,0],"height":[0,4,2,0],"propeller":false,"texture":[3.9]},"detail21":{"section_segments":6,"angle":0,"offset":{"x":0,"y":30,"z":20},"position":{"x":[0,0,0,0],"y":[-20,-20,20,20],"z":[0,0,40,40]},"width":[0,4,2,0],"height":[0,4,2,0],"propeller":false,"texture":[63]},"detail22":{"section_segments":6,"angle":0,"offset":{"x":0,"y":45,"z":20},"position":{"x":[0,0,0,0],"y":[-20,-20,20,20],"z":[0,0,40,40]},"width":[0,4,2,0],"height":[0,4,2,0],"propeller":false,"texture":[63]},"detail23":{"section_segments":6,"angle":0,"offset":{"x":0,"y":60,"z":20},"position":{"x":[0,0,0,0],"y":[-20,-20,20,20],"z":[0,0,40,40]},"width":[0,4,2,0],"height":[0,4,2,0],"propeller":false,"texture":[63]},"detail24":{"section_segments":6,"angle":0,"offset":{"x":0,"y":30,"z":-20},"position":{"x":[0,0,0,0],"y":[-20,-20,20,20],"z":[0,0,-40,-40]},"width":[0,4,2,0],"height":[0,4,2,0],"propeller":false,"texture":[63]},"detail25":{"section_segments":6,"angle":0,"offset":{"x":0,"y":45,"z":-20},"position":{"x":[0,0,0,0],"y":[-20,-20,20,20],"z":[0,0,-40,-40]},"width":[0,4,2,0],"height":[0,4,2,0],"propeller":false,"texture":[63]},"detail26":{"section_segments":6,"angle":0,"offset":{"x":0,"y":60,"z":-20},"position":{"x":[0,0,0,0],"y":[-20,-20,20,20],"z":[0,0,-40,-40]},"width":[0,4,2,0],"height":[0,4,2,0],"propeller":false,"texture":[63]},"detail27":{"section_segments":6,"offset":{"x":0,"y":-75,"z":23},"position":{"x":[0,0,0,0,0,0,0],"y":[-51,-50,-40,-28,-13,0],"z":[-3,-3,0,2,3,3]},"width":[0,6,13,18,20,0],"height":[0,7,9,9,10,0],"propeller":false,"texture":[7,9,9,9,4]},"detail29":{"section_segments":6,"offset":{"x":15,"y":-110,"z":17},"position":{"x":[0,0,0,0,0,0,0],"y":[-30,-40,-10,0,35,40,40],"z":[0,0,0,0,0,0,0]},"width":[0,2,5,8,8,5,0],"height":[0,2,5,8,8,5,0],"angle":0,"laser":{"damage":[5,7],"rate":7.5,"type":1,"speed":[175,200],"number":1,"error":0},"propeller":false,"texture":[2.9,3.9,63,15,3.9]},"detail30":{"section_segments":6,"offset":{"x":15,"y":15,"z":-5},"position":{"x":[0,0,0,0,0,0,0],"y":[-45,-40,-10,5,28,35,25],"z":[0,0,0,0,0,0,0]},"width":[0,11,11,8,8,6,0],"height":[0,15,15,10,10,8,0],"angle":0,"propeller":true,"texture":[63,63,3.9,8,16.9]},"detail31":{"section_segments":6,"offset":{"x":0,"y":-125,"z":-15},"position":{"x":[0,0,0,0,0],"y":[-10,-10,-5,10,10],"z":[10,10,3,0,0]},"width":[0,5,8,8,0],"height":[0,3,5,15,0],"texture":[2.9]},"detail32":{"section_segments":6,"offset":{"x":0,"y":-126,"z":5},"position":{"x":[0,0,0,0,0],"y":[-10,-10,0,5,5],"z":[0,0,-5,5,5]},"width":[0,3,8,8,0],"height":[0,3,8,15,0],"texture":[2.9]},"detail33":{"section_segments":6,"offset":{"x":0,"y":-126,"z":3},"position":{"x":[0,0,0,0,0],"y":[-9,-9,0,5,5],"z":[0,0,-4,5,5]},"width":[0,2,7,7,0],"height":[0,3,8,15,0],"texture":[63]},"detail34":{"section_segments":6,"offset":{"x":0,"y":-125,"z":-14},"position":{"x":[0,0,0,0,0],"y":[-9,-9,-5,10,10],"z":[10,10,3,0,0]},"width":[0,4,7,7,0],"height":[0,3,5,15,0],"texture":[63]}},"wings":{"detail":{"length":[0,40],"width":[0,30,30],"angle":[90,90],"position":[0,0,40],"doubleside":true,"texture":[8,15,4],"bump":{"position":0,"size":5},"offset":{"x":0,"y":20,"z":16}},"detail2":{"length":[0,40],"width":[0,30,30],"angle":[-90,-90],"position":[0,0,40],"doubleside":true,"texture":[8,15,4],"bump":{"position":0,"size":5},"offset":{"x":0,"y":20,"z":-16}}},"typespec":{"name":"Lionfish","level":4,"model":2,"code":402,"specs":{"shield":{"capacity":[175,225],"reload":[5,7]},"generator":{"capacity":[150,200],"reload":[40,65]},"ship":{"mass":165,"speed":[110,120],"rotation":[80,95],"acceleration":[80,100]}},"shape":[3.673,4.075,3.079,2.138,1.522,1.335,1.263,1.217,1.192,1.198,1.21,1.148,1.094,1.035,0.972,0.975,0.713,0.751,0.81,0.927,1.104,1.352,1.456,1.419,1.625,2.997,1.625,1.419,1.456,1.352,1.104,0.927,0.81,0.751,0.713,0.975,0.972,1.035,1.094,1.148,1.21,1.198,1.192,1.217,1.263,1.335,1.522,2.138,3.079,4.075],"lasers":[{"x":0.405,"y":-4.05,"z":0.459,"angle":0,"damage":[5,7],"rate":7.5,"type":1,"speed":[175,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.405,"y":-4.05,"z":0.459,"angle":0,"damage":[5,7],"rate":7.5,"type":1,"speed":[175,200],"number":1,"spread":0,"error":0,"recoil":0}],"radius":4.075}}';
var Lobster_403 = '{"name":"Lobster","level":4,"model":3,"size":0.75,"zoom":1.35,"specs":{"shield":{"capacity":[175,225],"reload":[5,7]},"generator":{"capacity":[175,225],"reload":[55,70]},"ship":{"mass":175,"speed":[95,110],"rotation":[80,100],"acceleration":[65,80]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":50,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-125,-130,-125,-115,-90,-70,-45,-20,10,30,50,150,155],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,4,6,6,30,40,50,55,55,45,20,15,0],"height":[0,3,5,6,13,17,19,20,20,15,4,4,0],"texture":[6,1,63,3,2,2,10,8,4,63],"laser":{"damage":[20,35],"rate":1,"type":1,"speed":[140,160],"recoil":10,"number":1,"error":0}},"detail2":{"section_segments":6,"angle":90,"offset":{"x":0,"y":110,"z":2},"position":{"x":[0,0,0,0,0,0],"y":[-41,-40,-25,25,40,41],"z":[0,0,0,0,0,0]},"width":[0,7,15,15,7,0],"height":[0,7,15,15,7,0],"texture":[3.9,3.9,8.25,3.9,3.9]},"detail3":{"section_segments":6,"angle":90,"offset":{"x":0,"y":140,"z":2},"position":{"x":[0,0,0,0,0,0],"y":[-41,-40,-25,25,40,41],"z":[0,0,0,0,0,0]},"width":[0,7,15,15,7,0],"height":[0,7,15,15,7,0],"texture":[3.9,3.9,8.25,3.9,3.9]},"detail4":{"section_segments":6,"angle":90,"offset":{"x":0,"y":170,"z":2},"position":{"x":[0,0,0,0,0,0],"y":[-41,-40,-25,25,40,41],"z":[0,0,0,0,0,0]},"width":[0,7,15,15,7,0],"height":[0,7,15,15,7,0],"texture":[3.9,3.9,8.25,3.9,3.9]},"detail5":{"section_segments":6,"angle":0,"offset":{"x":0,"y":125,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-37,-37,-35,35,37,37],"z":[0,0,0,0,0,0]},"width":[0,15,25,25,15,0],"height":[0,4,5,5,4,0],"texture":[3.9,3.9,16.9,3.9]},"detail6":{"section_segments":6,"angle":15,"offset":{"x":82,"y":-150,"z":-2},"position":{"x":[5,5,5,0,0,0,0],"y":[-132,-130,-40,-25,35,50,51],"z":[6,6,10,0,0,0,0]},"width":[0,6,10,21,21,15,0],"height":[0,4,7,20,20,13,0],"texture":[2.9,3.9,3.9,8,3.9]},"detail7":{"section_segments":[45,135,225,315],"angle":10,"offset":{"x":60,"y":-210,"z":-7},"position":{"x":[0,0,0,0,0],"y":[-70,-75,-70,45,45],"z":[4,4,4,0,0]},"width":[0,3,6,10,0],"height":[0,2,4,7,0],"texture":[2,63,17],"laser":{"damage":[3,6],"rate":6,"type":1,"speed":[170,190],"recoil":0,"number":1,"error":0}},"detail8":{"section_segments":6,"angle":0,"offset":{"x":95,"y":-80,"z":-2},"position":{"x":[-5,-5,6,5,3,3],"y":[-50,-50,-5,10,25,28],"z":[0,0,0,0,0,0]},"width":[0,12,15,10,5,0],"height":[0,10,12,10,5,0],"texture":[16.9,16.9,2.9,63]},"detail9":{"section_segments":6,"angle":-30,"offset":{"x":85,"y":-37,"z":-2},"position":{"x":[0,0,0,-5,-15,-30],"y":[-28,-25,10,20,45,58],"z":[0,0,0,0,0,0]},"width":[0,12,16,13,10,10],"height":[0,10,12,12,11,10],"texture":[3.9,3.9,63,8,63]},"detail10":{"section_segments":6,"angle":-45,"offset":{"x":75,"y":6,"z":-8},"position":{"x":[-4,-4,0,-4,-15,-30],"y":[-45,-44,-20,20,45,58],"z":[-15,-15,-5,0,0,0]},"width":[0,3,5,6,6,0],"height":[0,3,5,6,6,0],"texture":[63]},"detail11":{"section_segments":6,"angle":-60,"offset":{"x":75,"y":30,"z":-8},"position":{"x":[-25,-25,0,-4,-15,-30],"y":[-65,-64,-25,20,45,58],"z":[-15,-15,-5,0,0,0]},"width":[0,3,5,6,6,0],"height":[0,3,5,6,6,0],"texture":[63]},"detail12":{"section_segments":6,"angle":100,"offset":{"x":-65,"y":50,"z":-8},"position":{"x":[-27,-27,-3,-5,-15,-30],"y":[-61,-60,-23,20,45,58],"z":[-15,-15,-5,0,0,0]},"width":[0,3,5,6,6,0],"height":[0,3,5,6,6,0],"texture":[63]},"detail13":{"section_segments":6,"angle":110,"offset":{"x":-70,"y":70,"z":-7},"position":{"x":[-15,-15,-3,-4,-15,-30],"y":[-45,-44,-20,20,45,58],"z":[-15,-15,-5,0,0,0]},"width":[0,3,5,6,6,0],"height":[0,3,5,6,6,0],"texture":[63]},"detail14":{"section_segments":4,"angle":0,"offset":{"x":20,"y":-140,"z":-5},"position":{"x":[-10,-10,1,2,-8,-8],"y":[-100,-100,-23,20,105,108],"z":[-15,-15,-5,0,0,0]},"width":[0,2,3,4,5,0],"height":[0,2,3,4,5,0],"texture":[3.9]},"detail15":{"section_segments":6,"angle":0,"offset":{"x":0,"y":190,"z":0},"position":{"x":[0,0,0,0,0],"y":[-20,-20,15,25,25],"z":[0,0,0,0,0]},"width":[0,20,20,15,0],"height":[0,6,6,3,0],"texture":[15,15,1.9]},"detail16":{"section_segments":6,"angle":30,"offset":{"x":30,"y":185,"z":-5},"position":{"x":[0,0,0,0,0],"y":[-40,-40,15,25,25],"z":[0,0,0,0,0]},"width":[0,20,20,15,0],"height":[0,6,6,3,0],"texture":[15,15,1.9]},"detail17":{"section_segments":6,"offset":{"x":0,"y":-5,"z":9},"position":{"x":[0,0,0,0,0],"y":[-30,-20,25,65,65],"z":[-1,-1,4,4,4]},"width":[0,17,26,26,0],"height":[0,12,16,10,0],"propeller":false,"texture":[7,9,15]},"detail18":{"section_segments":6,"offset":{"x":45,"y":40,"z":-7},"position":{"x":[-22,-22,-7,0,0,-7,-22,-22],"y":[-60,-60,-45,-30,30,45,60,60],"z":[0,0,0,0,0,0,0,0]},"width":[0,10,13,16,16,13,10,0],"height":[0,4,10,12,12,11,10,0],"propeller":false,"texture":[3.9,3.9,3.9,18,3.9]},"detail19":{"section_segments":6,"offset":{"x":0,"y":150,"z":-15},"position":{"x":[0,0,0,0,0,0],"y":[-60,-60,-40,45,60,50],"z":[0,0,0,0,0,0]},"width":[0,15,28,28,20,0],"height":[0,10,20,20,15,0],"propeller":true,"texture":[3.9,3.9,8,63,16.9]},"detail20":{"section_segments":6,"offset":{"x":0,"y":40,"z":26},"position":{"x":[0,0,0,0,0,0],"y":[-20,-20,-20,20,20,20],"z":[0,0,0,0,0,0]},"width":[0,10,12,12,10,0],"height":[0,3,3,3,3,0],"texture":[3.9,3.9,10.25,3.9,3.9]}},"typespec":{"name":"Lobster","level":4,"model":3,"code":403,"specs":{"shield":{"capacity":[175,225],"reload":[5,7]},"generator":{"capacity":[175,225],"reload":[55,70]},"ship":{"mass":175,"speed":[95,110],"rotation":[80,100],"acceleration":[65,80]}},"shape":[3.604,4.326,4.263,3.587,3.1,2.77,2.504,2.238,2.093,1.787,1.622,1.818,1.753,1.632,1.553,1.443,1.267,2.23,2.233,2.195,1.486,1.502,1.845,3.18,3.231,3.231,3.231,3.18,1.845,1.502,1.486,2.195,2.233,2.23,1.267,1.443,1.553,1.632,1.753,1.818,1.622,1.787,2.093,2.238,2.504,2.77,3.1,3.587,4.263,4.326],"lasers":[{"x":0,"y":-1.2,"z":0,"angle":0,"damage":[20,35],"rate":1,"type":1,"speed":[140,160],"number":1,"spread":0,"error":0,"recoil":10},{"x":0.705,"y":-4.258,"z":-0.105,"angle":10,"damage":[3,6],"rate":6,"type":1,"speed":[170,190],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.705,"y":-4.258,"z":-0.105,"angle":-10,"damage":[3,6],"rate":6,"type":1,"speed":[170,190],"number":1,"spread":0,"error":0,"recoil":0}],"radius":4.326}}';
var Scad_fish_404 = '{"name":"Scad fish","level":4,"model":4,"size":1.35,"zoom":1.2,"specs":{"shield":{"capacity":[150,200],"reload":[4,6]},"generator":{"capacity":[95,125],"reload":[27,37]},"ship":{"mass":160,"speed":[135,145],"rotation":[110,130],"acceleration":[70,90]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-143,-143,-135,-110,-80,-40,20,40,70,85,100,105,105],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,3,9,18,25,27,22,16,6,6,2.5,1.5,0],"height":[0,3,11,25,35,40,37,30,16,16,25,20,0],"texture":[4,4,63,4,11,1,18,63,4]},"detail2":{"section_segments":[0,60,120,180],"offset":{"x":-27,"y":-50,"z":10},"position":{"x":[-1,-1,0,2,2],"y":[-30,-30,10,30,30],"z":[-10,-10,0,5,5]},"width":[0,5.6,6,3,0],"height":[0,6,15,12,0],"texture":[0.9,0.9,63],"angle":-15},"detail3":{"section_segments":6,"offset":{"x":0,"y":-80,"z":35},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-51,-51,-40,-28,-13,25,30,30],"z":[-23,-23,-15,-10,-6,1,1,1]},"width":[0,5,12,15,17,17,15,0],"height":[0,5,4,6,8,8,7,0],"propeller":false,"texture":[6.9,9,9,9,10,3.9]},"detail4":{"section_segments":4,"offset":{"x":0,"y":50,"z":0},"position":{"x":[0,0,0,0,0],"y":[-80,-30,0,30,30],"z":[0,0,0,0,0]},"width":[0,12,8,2,0],"height":[0,55,35,20,0],"texture":[3.9]},"detail5":{"section_segments":6,"offset":{"x":0,"y":-80,"z":33},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-53,-53,-40,-28,-13,25,33,33],"z":[-23,-23,-15,-10,-6,1,1,1]},"width":[0,7,14,17,20,20,18,0],"height":[0,5,4,6,8,8,7,0],"propeller":false,"texture":[1.9]},"detail6":{"section_segments":6,"offset":{"x":0,"y":-95,"z":43},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-10,-15,7,10,35,40,50,70],"z":[0,0,0,0,0,0,0,-25]},"width":[0,3,5,8,8,4,4,4],"height":[0,3,5,8,8,4,4,4],"angle":0,"laser":{"damage":[17,21],"rate":4,"type":1,"speed":[280,330],"number":1,"error":0},"propeller":false,"texture":[2.9,3.9,16.9,15,63,3.9]},"detail7":{"section_segments":6,"offset":{"x":17,"y":20,"z":-8},"position":{"x":[0,0,0,0,0,0],"y":[-45,-40,-10,5,35,25],"z":[0,0,0,0,0,0]},"width":[0,11,11,8,8,0],"height":[0,15,15,10,10,0],"angle":0,"propeller":true,"texture":[63,63,3.9,8,16.9]},"detail8":{"section_segments":4,"angle":-4,"offset":{"x":12,"y":0,"z":20},"position":{"x":[0,0,0,0,0,0],"y":[-7,-7,-5,10,12,12],"z":[0,0,0,0,0,0]},"width":[0,8,8,8,8,0],"height":[0,8,8,8,8,0],"texture":[4,17,4,17,4]},"detail9":{"section_segments":5,"offset":{"x":0,"y":0,"z":-74},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[13,13,9,9,13],"height":[30,30,36,36,30],"texture":[3.85,16.85,3.85],"vertical":true},"detail10":{"section_segments":8,"offset":{"x":10,"y":-35,"z":28},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[10,10,8,8,10],"height":[10,10,8,8,10],"texture":[63]},"detail11":{"section_segments":8,"offset":{"x":10,"y":-25,"z":28},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[10,10,8,8,10],"height":[10,10,8,8,10],"texture":[63]},"detail12":{"section_segments":6,"offset":{"x":0,"y":-15,"z":20},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[15,15,13,15,15],"height":[20,20,18,18,20],"texture":[4]},"detail13":{"section_segments":6,"offset":{"x":0,"y":-15,"z":35},"position":{"x":[0,0,0,0,0,0,0],"y":[-30,-30,-25,-20,25,30,30],"z":[0,0,0,0,0,0,0]},"width":[0,6,10,10,10,6,0],"height":[0,6,10,10,10,6,0],"texture":[3.9,3.9,8,12.9,3.9]},"detail14":{"section_segments":8,"angle":220,"offset":{"x":1,"y":7,"z":-2},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-25,-26,-26,-23,-20,-10,-10],"z":[0,0,0,0,0,0,0,0]},"width":[0,3,5,7,7,7,0],"height":[0,3,5,7,7,7,0],"texture":[63,16.9,3.9,8,12.9,3.9],"vertical":true}},"wings":{"detail":{"length":[0,30,10],"width":[0,35,20,8],"angle":[90,90,90],"position":[0,0,25,35],"doubleside":true,"texture":[15,15,63],"bump":{"position":-30,"size":15},"offset":{"x":0,"y":95,"z":0}},"detail2":{"length":[0,30,10],"width":[0,35,20,8],"angle":[-90,-90,-90],"position":[0,0,25,35],"doubleside":true,"texture":[15,15,63],"bump":{"position":-30,"size":15},"offset":{"x":0,"y":95,"z":0}},"detail3":{"length":[0,20,10],"width":[0,45,25,16],"angle":[90,90,90],"position":[-10,-10,5,7],"doubleside":true,"texture":[4,4,63],"bump":{"position":30,"size":10},"offset":{"x":0,"y":-10,"z":34}}},"typespec":{"name":"Scad fish","level":4,"model":4,"code":404,"specs":{"shield":{"capacity":[150,200],"reload":[4,6]},"generator":{"capacity":[95,125],"reload":[27,37]},"ship":{"mass":160,"speed":[135,145],"rotation":[110,130],"acceleration":[70,90]}},"shape":[3.862,3.598,2.644,2.22,1.859,1.622,1.463,1.291,1.173,0.814,0.769,0.739,0.721,0.721,0.739,0.768,0.794,0.836,0.899,1.013,1.203,1.516,1.619,1.779,2.73,3.618,2.73,1.779,1.619,1.516,1.203,1.013,0.899,0.836,0.794,0.768,0.739,0.721,0.721,0.739,0.769,0.814,1.173,1.291,1.463,1.622,1.859,2.22,2.644,3.598],"lasers":[{"x":0,"y":-2.97,"z":1.161,"angle":0,"damage":[17,21],"rate":4,"type":1,"speed":[280,330],"number":1,"spread":0,"error":0,"recoil":0}],"radius":3.862}}';
var Stingray_405 = '{"name":"Stingray","level":4,"model":5,"size":1.35,"zoom":1.28,"specs":{"shield":{"capacity":[200,250],"reload":[6,8]},"generator":{"capacity":[150,200],"reload":[40,55]},"ship":{"mass":230,"speed":[90,105],"rotation":[65,80],"acceleration":[70,90]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":-20,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-106,-105,-87,-75,-40,10,35,75,145,160,175],"z":[-7,-7,-7,-6,-2,-2,0,0,0,0,0,0]},"width":[0,5,16,20,28,28,15,8,3,6,0],"height":[0,2,6,9,12,18,12,5,3,6,0],"texture":[63,63,15,18,1,10.24,63,11,63,63]},"detail2":{"section_segments":8,"offset":{"x":0,"y":-75,"z":5},"position":{"x":[0,0,0,0,0,0],"y":[-27,-27,0,52,55,55],"z":[-12,-10,-5,0,0,0]},"width":[3,12,20,20,5,0],"height":[10,10,12,13,5,0],"propeller":false,"texture":[4,9,8.2,1]},"detail3":{"section_segments":6,"offset":{"x":13,"y":15,"z":-20},"position":{"x":[0,0,0,0,0,0],"y":[-30,-30,-20,0,35,25],"z":[0,0,0,0,0,0]},"width":[0,4,14,18,15,0],"height":[0,4,7,12,10,0],"propeller":true,"texture":[63,63,3.9,1.9,16.9]},"detail4":{"section_segments":6,"offset":{"x":40,"y":-15,"z":-12},"position":{"x":[0,0,0,0,0,0],"y":[-30,-30,-20,0,35,25],"z":[0,0,0,0,0,0]},"width":[0,4,14,12,10,0],"height":[0,4,7,10,7,0],"propeller":true,"texture":[63,63,3.9,1.9,16.9]},"detail5":{"section_segments":6,"offset":{"x":30,"y":-57,"z":-11},"position":{"x":[0,0,0,0,0,0],"y":[-35,-40,-10,0,20,25],"z":[0,0,0,0,0,0]},"width":[0,3,8,11,9,0],"height":[0,3,8,11,9,0],"angle":0,"laser":{"damage":[13,17],"rate":1.6,"type":1,"speed":[140,175],"number":1,"error":0},"propeller":false,"texture":[2.9,1.9,3.9,3.9]},"detail6":{"section_segments":6,"offset":{"x":60,"y":-24,"z":-11},"position":{"x":[0,0,0,0,0,0],"y":[-35,-40,-10,0,20,25],"z":[0,0,0,0,0,0]},"width":[0,3,8,11,9,0],"height":[0,3,8,11,9,0],"angle":0,"laser":{"damage":[13,17],"rate":1.6,"type":1,"speed":[140,175],"number":1,"error":0},"propeller":false,"texture":[2.9,1.9,3.9,3.9]},"detail7":{"section_segments":6,"offset":{"x":10,"y":8,"z":-10},"position":{"x":[0,0,0,0],"y":[-40,-40,40,40],"z":[0,0,0,0]},"width":[0,15,15,0],"height":[0,4,4,0],"angle":0,"texture":[3.9,16.9,3.9]},"detail8":{"section_segments":10,"offset":{"x":0,"y":7,"z":25},"position":{"x":[0,0,0,0,0,0,0],"y":[0,12,12,10,12,12],"z":[0,0,0,0,0,0,0]},"width":[12,12,10,7,4,0],"height":[12,12,10,7,4,0],"texture":[4,4,17,4,18],"vertical":true}},"wings":{"detail":{"length":[-5,3,45.5,35.5],"width":[40,156,150,70,20],"angle":[0,0,0,0],"position":[40,0,0,10,0],"doubleside":true,"texture":[1,17,4,8.1],"bump":{"position":10,"size":15},"offset":{"x":20,"y":-32,"z":-2}},"detail2":{"length":[-5,45.5,35.5],"width":[40,150,70,20],"angle":[0,0,0],"position":[40,0,10,0],"doubleside":true,"texture":[15],"bump":{"position":10,"size":10},"offset":{"x":20,"y":-23,"z":-4}},"detail3":{"length":[0,30],"width":[0,52,11],"angle":[0,0],"position":[10,10,0],"doubleside":true,"texture":[63],"bump":{"position":10,"size":17},"offset":{"x":65,"y":-28,"z":2}},"detail4":{"length":[5,15],"width":[55,71,55],"angle":[0,0],"position":[0,0,0],"doubleside":true,"texture":[4,2],"bump":{"position":10,"size":16},"offset":{"x":10,"y":20,"z":-5}},"detail5":{"length":[0,12,0],"width":[0,70,70,0],"angle":[0,0,0],"position":[0,0,-30,-30],"doubleside":true,"texture":[63],"bump":{"position":10,"size":7},"offset":{"x":50,"y":10,"z":-7}},"detail6":{"length":[-5,3,45,35],"width":[40,156,150,70,20],"angle":[0,0,0,0],"position":[40,0,0,10,1],"doubleside":true,"texture":[1,4,4,18],"bump":{"position":10,"size":15},"offset":{"x":20,"y":-31,"z":-2}},"detail7":{"length":[-10,20,0],"width":[0,50,40,0],"angle":[0,-10,-10],"position":[0,0,3,3],"doubleside":true,"texture":[3,2,1],"bump":{"position":10,"size":25},"offset":{"x":30,"y":-28,"z":10}}},"typespec":{"name":"Stingray","level":4,"model":5,"code":405,"specs":{"shield":{"capacity":[200,250],"reload":[6,8]},"generator":{"capacity":[150,200],"reload":[40,55]},"ship":{"mass":230,"speed":[90,105],"rotation":[65,80],"acceleration":[70,90]}},"shape":[3.402,3.216,2.874,2.763,2.493,2.387,2.417,2.431,2.657,2.904,2.873,2.76,2.583,2.228,1.995,1.827,1.717,1.757,1.816,1.434,1.504,1.521,1.536,1.552,2.227,4.185,2.227,1.552,1.536,1.521,1.504,1.434,1.816,1.757,1.717,1.827,1.995,2.228,2.583,2.76,2.873,2.904,2.657,2.431,2.417,2.387,2.493,2.763,2.874,3.216],"lasers":[{"x":0.81,"y":-2.619,"z":-0.297,"angle":0,"damage":[13,17],"rate":1.6,"type":1,"speed":[140,175],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.81,"y":-2.619,"z":-0.297,"angle":0,"damage":[13,17],"rate":1.6,"type":1,"speed":[140,175],"number":1,"spread":0,"error":0,"recoil":0},{"x":1.62,"y":-1.728,"z":-0.297,"angle":0,"damage":[13,17],"rate":1.6,"type":1,"speed":[140,175],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.62,"y":-1.728,"z":-0.297,"angle":0,"damage":[13,17],"rate":1.6,"type":1,"speed":[140,175],"number":1,"spread":0,"error":0,"recoil":0}],"radius":4.185}}';
var Flying_fish_406 = '{"name":"Flying fish","level":4,"model":6,"size":1.28,"zoom":1.15,"specs":{"shield":{"capacity":[175,225],"reload":[4,6]},"generator":{"capacity":[275,325],"reload":[100,125]},"ship":{"mass":165,"speed":[90,110],"rotation":[85,105],"acceleration":[110,130]}},"bodies":{"detail":{"section_segments":8,"offset":{"x":0,"y":-20,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-106,-105,-99,-65,-30,20,20,75,85,115,120,120],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,6,10,19,22,22,22,17,10,5,5,2,0],"height":[0,6,12,23,22,18,25,15,9,9,10,0],"texture":[63,63,1,1,11,4,4,63,11,17,4]},"detail2":{"section_segments":4,"offset":{"x":0,"y":75,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[5,20,25,60,79,80],"z":[0,0,0,20,36,36]},"width":[0,3,3,3,2,0],"height":[0,5,10,10,5,0],"texture":[4]},"detail3":{"section_segments":4,"offset":{"x":0,"y":75,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[5,20,25,60,79,80],"z":[0,0,0,-20,-36,-36]},"width":[0,3,3,3,2,0],"height":[0,5,10,10,5,0],"texture":[4]},"detail4":{"section_segments":6,"offset":{"x":0,"y":-40,"z":18},"position":{"x":[0,0,0,0],"y":[-25,-15,15,55],"z":[0,10,10,-10]},"width":[3,3,3,3],"height":[3,3,3,3],"texture":[3.9,16.9,3.9]},"detail5":{"section_segments":8,"offset":{"x":10,"y":50,"z":1},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[15,15,12,12,15],"height":[15,15,12,12,15],"propeller":false,"texture":[63]},"cockpit":{"section_segments":6,"offset":{"x":0,"y":-80,"z":20.2},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-45,-45,-40,-10,10,13,20,30,37,40,40],"z":[-18,-18,-12,-4,0,0,0,0,0,0,0]},"width":[0,5,7,14,18.5,18.5,18.5,18.5,18.5,18.5,0],"height":[0,5,4,8,8,8,8,8,8,8,0],"propeller":false,"texture":[63,63,9,9,63,3.9,8.2,3.9,63,3.9]},"propulsors":{"section_segments":6,"offset":{"x":20,"y":-30,"z":-4},"position":{"x":[-10,-10,0,0,0,0,0],"y":[-45,-40,-10,5,30,35,25],"z":[0,0,0,0,0,0,0]},"width":[0,15,15,10,10,8,0],"height":[0,15,15,10,10,8,0],"angle":0,"propeller":true,"texture":[63,63,3.9,8,16.9]},"canons":{"section_segments":6,"offset":{"x":20,"y":-65,"z":12},"position":{"x":[0,0,0,0,0,0,0],"y":[-35,-40,-10,0,20,25,25],"z":[0,0,0,0,0,0,0]},"width":[0,3,7,11,9,5,0],"height":[0,3,7,11,9,5,0],"angle":0,"laser":{"damage":[25,35],"rate":1,"type":1,"speed":[190,240],"number":1,"error":0},"propeller":false,"texture":[2.9,0.9,3.9,3.9,16.9]},"canons2":{"section_segments":6,"offset":{"x":58,"y":-40,"z":2},"position":{"x":[0,0,0,0,0,0],"y":[-15,-20,-10,5,15,15],"z":[0,0,0,0,0,0]},"width":[0,2,5,7,5,0],"height":[0,2,5,7,5,0],"angle":185,"laser":{"damage":[10,15],"rate":6,"type":1,"speed":[100,150],"number":1,"error":15,"recoil":50},"propeller":false,"texture":[2.9,63,3.9,3.9]},"detail6":{"section_segments":6,"offset":{"x":0,"y":10,"z":14},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[15,15,12,12,15],"height":[16,15,12,12,16],"propeller":false,"texture":[63]},"detail7":{"section_segments":[45,135,195,345],"offset":{"x":0,"y":-20,"z":15.5},"position":{"x":[-4,-4,-15.5],"y":[-20,-20,22],"z":[0,0,-3]},"width":[0,16,0],"height":[0,12,0],"propeller":false,"texture":[3.9]},"detail8":{"section_segments":[15,165,225,315],"offset":{"x":0,"y":-20,"z":15.5},"position":{"x":[4,4,15.5],"y":[-20,-20,22],"z":[0,0,-3]},"width":[0,16,0],"height":[0,12,0],"propeller":false,"texture":[3.8]},"detail9":{"section_segments":6,"offset":{"x":0,"y":40,"z":16},"position":{"x":[0,0,0,0,0,0],"y":[-20,-20,15,20,60,60],"z":[0,0,-6,-6,-6,-6]},"width":[0,8,8,4,2,0],"height":[0,8,8,4,2,0],"propeller":false,"texture":[1.9,8.185,3.9]}},"wings":{"wings":{"length":[35,26,32,12,3,0],"width":[10,22,30,35,36,30,0],"angle":[-10,-15,-20,-25,-25,-25],"position":[-10,-2,5,17,24,27,27],"doubleside":true,"texture":[63,4,10.23,4,63],"bump":{"position":30,"size":10},"offset":{"x":0,"y":-50,"z":19}},"wings2":{"length":[25,15,5],"width":[15,25,16,6],"angle":[5,10,10],"position":[-10,0,10,15],"doubleside":true,"texture":[4,4,17,4],"bump":{"position":30,"size":10},"offset":{"x":0,"y":58,"z":5}},"wings3":{"length":[10,5,3],"width":[15,25,16,7],"angle":[5,10,10],"position":[-10,0,5,5],"doubleside":true,"texture":[63],"bump":{"position":30,"size":10},"offset":{"x":0,"y":85,"z":3}},"wings4":{"length":[15,15,0],"width":[45,25,10,6],"angle":[90,90,90],"position":[-10,0,10,10],"doubleside":true,"texture":[63],"bump":{"position":30,"size":10},"offset":{"x":0,"y":35,"z":5}}},"typespec":{"name":"Flying fish","level":4,"model":6,"code":406,"specs":{"shield":{"capacity":[175,225],"reload":[4,6]},"generator":{"capacity":[275,325],"reload":[100,125]},"ship":{"mass":165,"speed":[90,110],"rotation":[85,105],"acceleration":[110,130]}},"shape":[3.226,3.14,2.75,2.117,1.89,2.026,2.203,2.391,2.649,2.812,2.816,2.744,2.692,0.734,0.708,0.584,0.607,0.651,0.707,0.79,2.13,2.256,2.098,2.437,2.538,3.968,2.538,2.437,2.098,2.256,2.13,0.79,0.707,0.651,0.607,0.584,0.708,0.733,2.692,2.744,2.816,2.812,2.649,2.391,2.203,2.026,1.89,2.117,2.75,3.14],"lasers":[{"x":0.512,"y":-2.688,"z":0.307,"angle":0,"damage":[25,35],"rate":1,"type":1,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.512,"y":-2.688,"z":0.307,"angle":0,"damage":[25,35],"rate":1,"type":1,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":0},{"x":1.529,"y":-0.514,"z":0.051,"angle":185,"damage":[10,15],"rate":6,"type":1,"speed":[100,150],"number":1,"spread":0,"error":15,"recoil":50},{"x":-1.529,"y":-0.514,"z":0.051,"angle":-185,"damage":[10,15],"rate":6,"type":1,"speed":[100,150],"number":1,"spread":0,"error":15,"recoil":50}],"radius":3.968}}';
var Starfish_407 = '{"name":"Starfish","level":4,"model":7,"size":1.5,"zoom":1.2,"specs":{"shield":{"capacity":[200,250],"reload":[6,8]},"generator":{"capacity":[250,300],"reload":[365,425]},"ship":{"mass":220,"speed":[100,115],"rotation":[95,110],"acceleration":[100,115]}},"bodies":{"detail1":{"section_segments":6,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-100,-110,-105,-95,0,0],"z":[0,0,0,0,0,0]},"width":[0,5,9,10,20,0],"height":[0,4,6,6,9,0],"texture":[3.9,63,12.9,3.9]},"detail2":{"section_segments":6,"angle":72,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-100,-110,-105,-95,0,0],"z":[0,0,0,0,0,0]},"width":[0,5,9,10,20,0],"height":[0,4,6,6,9,0],"texture":[3.9,63,12.9,3.9]},"detail3":{"section_segments":6,"angle":-72,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-100,-110,-105,-95,0,0],"z":[0,0,0,0,0,0]},"width":[0,5,9,10,20,0],"height":[0,4,6,6,9,0],"texture":[3.9,63,12.9,3.9]},"detail4":{"section_segments":6,"angle":144,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-100,-110,-105,-95,0,0],"z":[0,0,0,0,0,0]},"width":[0,5,9,10,20,0],"height":[0,4,6,6,9,0],"texture":[3.9,63,12.9,3.9]},"detail5":{"section_segments":6,"angle":-144,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-100,-110,-105,-95,0,0],"z":[0,0,0,0,0,0]},"width":[0,5,9,10,20,0],"height":[0,4,6,6,9,0],"texture":[3.9,63,12.9,3.9]},"detail6":{"section_segments":[35,65,105,145,215,325],"offset":{"x":-10,"y":-12,"z":0},"position":{"x":[0,0,0,0,0],"y":[-70,-70,-65,0,0],"z":[0,0,0,0,0]},"width":[0,4,7,20,0],"height":[0,6,10,16,0],"texture":[4,63,11]},"detail7":{"section_segments":[35,65,105,145,215,325],"angle":144,"offset":{"x":1,"y":16,"z":0},"position":{"x":[0,0,0,0,0],"y":[-70,-70,-65,0,0],"z":[0,0,0,0,0]},"width":[0,4,7,20,0],"height":[0,6,10,16,0],"texture":[4,63,11]},"detail8":{"section_segments":[35,145,215,245,295,325],"angle":144,"offset":{"x":-15,"y":4,"z":0},"position":{"x":[0,0,0,0,0],"y":[-70,-70,-65,0,0],"z":[0,0,0,0,0]},"width":[0,4,7,20,0],"height":[0,6,10,16,0],"texture":[4,63,11]},"detail9":{"section_segments":[35,65,105,145,215,325],"angle":72,"offset":{"x":-15,"y":4,"z":0},"position":{"x":[0,0,0,0,0],"y":[-70,-70,-65,0,0],"z":[0,0,0,0,0]},"width":[0,4,7,20,0],"height":[0,6,10,16,0],"texture":[4,63,11]},"detail10":{"section_segments":[35,145,215,245,295,325],"angle":72,"offset":{"x":-10,"y":-14,"z":0},"position":{"x":[0,0,0,0,0],"y":[-70,-70,-65,0,0],"z":[0,0,0,0,0]},"width":[0,4,7,20,0],"height":[0,6,10,16,0],"texture":[4,63,10.99]},"detail11":{"section_segments":5,"angle":0,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-15,-15,15,15],"z":[0,0,0,0]},"width":[0,40,40,0],"height":[0,40,40,0],"texture":[3.85,3.85,3.85],"vertical":true},"detail12":{"section_segments":6,"angle":0,"offset":{"x":0,"y":0,"z":15},"position":{"x":[0,0,0,0,0],"y":[-16,-16,0,16,16],"z":[0,0,0,0,0]},"width":[0,11,17,11,0],"height":[0,4,10,4,0],"texture":[7,9,9,7]},"detail13":{"section_segments":6,"offset":{"x":23,"y":7,"z":0},"position":{"x":[0,0,0,0],"y":[10,26,30,30],"z":[0,0,0,0]},"width":[16,16,6,0],"height":[4,4,2,0],"texture":[16.9,3.9,3.9],"angle":72},"detail14":{"section_segments":6,"offset":{"x":0,"y":26,"z":0},"position":{"x":[0,0,0,0],"y":[-30,26,30,30],"z":[0,0,0,0]},"width":[16,16,6,0],"height":[4,4,2,0],"texture":[16.9,3.9,3.9],"angle":0},"detail15":{"section_segments":6,"offset":{"x":14,"y":-19,"z":0},"position":{"x":[0,0,0,0],"y":[-30,26,30,30],"z":[0,0,0,0]},"width":[16,16,6,0],"height":[4,4,2,0],"texture":[16.9,3.9,3.9],"angle":144},"detail16":{"section_segments":6,"angle":0,"offset":{"x":0,"y":30,"z":-5},"position":{"x":[0,0,0,0,0],"y":[-20,-20,15,20,10],"z":[0,0,0,0,0]},"width":[0,19,19,17,0],"height":[0,7,7,5,0],"texture":[3.9,3.9,63,16.9],"propeller":true},"detail17":{"section_segments":6,"angle":0,"offset":{"x":45,"y":8,"z":5.5},"position":{"x":[0,0,0,0],"y":[-5,-5,5,5],"z":[0,0,0,0]},"width":[0,5,5,0],"height":[0,5,5,0],"texture":[63],"vertical":true},"detail18":{"section_segments":6,"angle":0,"offset":{"x":39,"y":8,"z":22},"position":{"x":[0,0,0,0],"y":[-5,-5,5,5],"z":[0,0,0,0]},"width":[0,5,5,0],"height":[0,5,5,0],"texture":[63],"vertical":true},"detail19":{"section_segments":6,"angle":0,"offset":{"x":9,"y":8,"z":45},"position":{"x":[0,0,0,0],"y":[-5,-5,5,5],"z":[0,0,0,0]},"width":[0,5,5,0],"height":[0,5,5,0],"texture":[63],"vertical":true},"detail20":{"section_segments":6,"angle":0,"offset":{"x":20,"y":8,"z":-42},"position":{"x":[0,0,0,0],"y":[-5,-5,5,5],"z":[0,0,0,0]},"width":[0,5,5,0],"height":[0,5,5,0],"texture":[63],"vertical":true},"detail21":{"section_segments":6,"angle":0,"offset":{"x":34,"y":8,"z":-33},"position":{"x":[0,0,0,0],"y":[-5,-5,5,5],"z":[0,0,0,0]},"width":[0,5,5,0],"height":[0,5,5,0],"texture":[63],"vertical":true},"detail22":{"section_segments":8,"angle":0,"offset":{"x":0,"y":12,"z":26},"position":{"x":[0,0,0,0,0,0],"y":[-5,-5,5,5,4,4],"z":[0,0,0,0,0,0]},"width":[0,7,7,5,3,0],"height":[0,7,7,5,3,0],"texture":[1.9,1.9,1.9,17,3.9],"vertical":true},"detail23":{"section_segments":8,"angle":0,"offset":{"x":25,"y":12,"z":7},"position":{"x":[0,0,0,0,0,0],"y":[-5,-5,5,5,4,4],"z":[0,0,0,0,0,0]},"width":[0,7,7,5,3,0],"height":[0,7,7,5,3,0],"texture":[1.9,1.9,1.9,17,3.9],"vertical":true},"detail24":{"section_segments":8,"angle":0,"offset":{"x":15,"y":12,"z":-22},"position":{"x":[0,0,0,0,0,0],"y":[-5,-5,5,5,4,4],"z":[0,0,0,0,0,0]},"width":[0,7,7,5,3,0],"height":[0,7,7,5,3,0],"texture":[1.9,1.9,1.9,17,3.9],"vertical":true},"detail25":{"section_segments":6,"offset":{"x":15,"y":6,"z":10},"position":{"x":[0,0,0,0],"y":[0,26,30,30],"z":[0,0,0,0]},"width":[16,16,6,0],"height":[4,4,2,0],"texture":[10.24,3.9,3.9],"angle":72},"detail26":{"section_segments":6,"offset":{"x":0,"y":16,"z":10},"position":{"x":[0,0,0,0],"y":[0,26,30,30],"z":[0,0,0,0]},"width":[16,16,6,0],"height":[4,4,2,0],"texture":[10.24,3.9,3.9],"angle":0},"detail27":{"section_segments":6,"offset":{"x":9,"y":-13,"z":10},"position":{"x":[0,0,0,0],"y":[0,26,30,30],"z":[0,0,0,0]},"width":[16,16,6,0],"height":[4,4,2,0],"texture":[10.24,3.9,3.9],"angle":144},"detail28":{"section_segments":6,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0],"y":[650],"z":[0]},"width":[0],"height":[0],"texture":[0],"angle":180,"laser":{"damage":[27,35],"rate":1.2,"type":1,"speed":[45,60],"number":1,"error":0}},"detail29":{"section_segments":6,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0],"y":[650],"z":[0]},"width":[0],"height":[0],"texture":[0],"angle":252,"laser":{"damage":[27,35],"rate":1.2,"type":1,"speed":[45,60],"number":1,"error":0}},"detail30":{"section_segments":6,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0],"y":[650],"z":[0]},"width":[0],"height":[0],"texture":[0],"angle":-252,"laser":{"damage":[27,35],"rate":1.2,"type":1,"speed":[45,60],"number":1,"error":0}},"detail31":{"section_segments":6,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0],"y":[650],"z":[0]},"width":[0],"height":[0],"texture":[0],"angle":-324,"laser":{"damage":[27,35],"rate":1.2,"type":1,"speed":[45,60],"number":1,"error":0}},"detail32":{"section_segments":6,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0],"y":[650],"z":[0]},"width":[0],"height":[0],"texture":[0],"angle":324,"laser":{"damage":[27,35],"rate":1.2,"type":1,"speed":[45,60],"number":1,"error":0}}},"typespec":{"name":"Starfish","level":4,"model":7,"code":407,"specs":{"shield":{"capacity":[200,250],"reload":[6,8]},"generator":{"capacity":[250,300],"reload":[365,425]},"ship":{"mass":220,"speed":[100,115],"rotation":[95,110],"acceleration":[100,115]}},"shape":[3.303,3.203,2.433,1.918,1.615,1.611,1.616,1.914,2.47,3.203,3.303,3.203,2.395,1.828,1.63,1.624,1.627,1.859,2.411,3.203,3.303,3.203,2.45,1.93,1.687,1.683,1.687,1.93,2.45,3.203,3.303,3.203,2.411,1.859,1.627,1.624,1.63,1.828,2.395,3.203,3.303,3.203,2.47,1.914,1.616,1.611,1.615,1.918,2.433,3.203],"lasers":[{"x":0,"y":-19.5,"z":0,"angle":180,"damage":[27,35],"rate":1.2,"type":1,"speed":[45,60],"number":1,"spread":0,"error":0,"recoil":0},{"x":-18.546,"y":-6.026,"z":0,"angle":252,"damage":[27,35],"rate":1.2,"type":1,"speed":[45,60],"number":1,"spread":0,"error":0,"recoil":0},{"x":18.546,"y":-6.026,"z":0,"angle":-252,"damage":[27,35],"rate":1.2,"type":1,"speed":[45,60],"number":1,"spread":0,"error":0,"recoil":0},{"x":11.462,"y":15.776,"z":0,"angle":-324,"damage":[27,35],"rate":1.2,"type":1,"speed":[45,60],"number":1,"spread":0,"error":0,"recoil":0},{"x":-11.462,"y":15.776,"z":0,"angle":324,"damage":[27,35],"rate":1.2,"type":1,"speed":[45,60],"number":1,"spread":0,"error":0,"recoil":0}],"radius":3.303}}';
 
var Swordfish_501 = '{"name":"Swordfish","level":5,"model":1,"size":2.23,"zoom":1.3,"specs":{"shield":{"capacity":[275,350],"reload":[11,13]},"generator":{"capacity":[175,225],"reload":[45,65]},"ship":{"mass":350,"speed":[90,105],"rotation":[90,115],"acceleration":[100,115],"dash":{"rate":3,"burst_speed":[140,190],"speed":[175,225],"acceleration":[95,110],"initial_energy":[75,100],"energy":[75,100]}}},"bodies":{"detail":{"section_segments":7,"offset":{"x":0,"y":50,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-170,-160,-155,-105,-90,-70,-45,-20,10,30,50,55,65,65],"z":[6,6,6,5,3,0,0,0,0,0,0,0,0,0]},"width":[0,1.5,1,4,10,15,21,21,21,15,7,3,1,0],"height":[0,1.5,1,5,10,20,25,25,25,23,12,9,8,0],"texture":[63,16.9,0.9,3.9,11,0.9,12,11,3.9,10.245,63,3.9]},"detail2":{"section_segments":6,"offset":{"x":0,"y":-30,"z":20},"position":{"x":[0,0,0,0,0,0,0],"y":[-10,-10,12,35,60,90,110],"z":[-12,-10,-3,1,1,2,3]},"width":[0,4,9,7,7,7,0],"height":[0,6,8,5,4,4,0],"propeller":false,"texture":[7,9,3.9,15,3.9,63]},"detail3":{"section_segments":6,"offset":{"x":0,"y":-45,"z":-10},"position":{"x":[0,0,0,0],"y":[-35,-30,40,40],"z":[7,6.5,-4,-5]},"width":[0,6,12,0],"height":[1,2,5,0],"texture":[2.9]},"detail4":{"section_segments":6,"offset":{"x":0,"y":-44,"z":-9},"position":{"x":[0,0,0,0],"y":[-35,-30,40,40],"z":[7,6.5,-4,-5]},"width":[0,5,10,0],"height":[1,2,5,0],"texture":[63]},"detail5":{"section_segments":6,"offset":{"x":2,"y":29,"z":20},"position":{"x":[0,9,9,0],"y":[-40,-30,30,45],"z":[0,0,1,1]},"width":[2,2,2,2],"height":[2,2,2,2],"texture":[63]},"detail6":{"section_segments":6,"offset":{"x":0,"y":43,"z":24},"position":{"x":[0,0,0,0],"y":[-10,-10,10,10],"z":[0,0,0,0]},"width":[0,5,5,0],"height":[0,2,2,0],"texture":[8.2]},"detail7":{"section_segments":4,"offset":{"x":17,"y":35,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-7,-7,-5,5,7,7],"z":[0,0,0,0,0,0]},"width":[0,3,3,3,3,0],"height":[0,15,15,15,15,0],"texture":[4,17,4,17,4]},"detail8":{"section_segments":4,"offset":{"x":17,"y":53,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-7,-7,-5,5,7,7],"z":[0,0,0,0,0,0]},"width":[0,3,3,3,3,0],"height":[0,15,15,15,15,0],"texture":[4,17,4,17,4]},"detail9":{"section_segments":4,"offset":{"x":17,"y":17,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-7,-7,-5,5,7,7],"z":[0,0,0,0,0,0]},"width":[0,3,3,3,3,0],"height":[0,15,15,15,15,0],"texture":[4,17,4,17,4]},"detail10":{"section_segments":6,"offset":{"x":13,"y":25,"z":-10},"position":{"x":[0,0,0,0,0,0],"y":[-20,-20,-5,25,40,30],"z":[0,0,0,0,0,0]},"width":[0,8,12,12,9,0],"height":[0,8,12,12,9,0],"propeller":true,"texture":[3.9,3.9,3.9,63,16.9]},"detail11":{"section_segments":6,"offset":{"x":0,"y":17,"z":25},"position":{"x":[0,0,0,0],"y":[-34,-34,17,17],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,2,2,0],"texture":[4,16.9,4]},"detail12":{"section_segments":[45,135,225,315],"angle":90,"offset":{"x":0,"y":-9,"z":20},"position":{"x":[11,0,0,0,15],"y":[-15,-13,0,13,15],"z":[-19,-5,0,-5,-19]},"width":[0,12,12,12,0],"height":[0,10,10,10,0],"texture":[3.9]},"detail13":{"section_segments":10,"angle":21,"offset":{"x":5,"y":20,"z":10},"position":{"x":[0,0,0,0,0,0],"y":[-7,-7,6,7,5,5],"z":[0,0,0,0,0,0]},"width":[0,6,6,4,3,0],"height":[0,6,6,4,3,0],"texture":[4,4,1,17,18],"vertical":true},"detail14":{"section_segments":6,"offset":{"x":0,"y":72,"z":16},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[10,10,8,8,10],"height":[10,10,8,8,10],"texture":[0.9],"angle":0},"detail15":{"section_segments":7,"offset":{"x":0,"y":0,"z":-108},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[8,8,6,6,8],"height":[12,12,10,10,12],"texture":[3.9,16.9,3.9],"vertical":true},"detail16":{"section_segments":6,"offset":{"x":0,"y":-30,"z":19},"position":{"x":[0,0,0,0,0],"y":[-15,-10,12,15,15],"z":[-12,-10,-3,-3,-3]},"width":[0,6,11,11,0],"height":[0,6,8,8,0],"propeller":false,"texture":[63]}},"wings":{"detail":{"length":[0,15,8,8,8],"width":[40,40,20,17,12,4],"angle":[90,90,90,90,90],"position":[0,0,-12,-11,-7,6],"doubleside":true,"texture":[3],"bump":{"position":30,"size":8},"offset":{"x":0,"y":26,"z":17}},"detail2":{"length":[0,18,7,4,7],"width":[25,25,20,17,12,4],"angle":[-45,-25,-25,-25,345],"position":[-5,-5,-8,-6,-2,7],"doubleside":true,"texture":[63,63,63,4,11],"bump":{"position":40,"size":15},"offset":{"x":0,"y":5,"z":10}},"detail3":{"length":[0,30,7,7,7],"width":[25,25,20,17,12,4],"angle":[-90,-90,-90,-90,-90],"position":[-5,-5,-7,-6,-2,3],"doubleside":true,"texture":[3],"bump":{"position":0,"size":5},"offset":{"x":0,"y":35,"z":5}},"detail4":{"length":[0,23,3,3,3],"width":[12,12,10,8,6,2],"angle":[90,90,90,90,90],"position":[-3,-3,-5,-3,-1,3],"doubleside":true,"texture":[3],"bump":{"position":20,"size":20},"offset":{"x":0,"y":65,"z":5}},"detail5":{"length":[0,23,3,3,3],"width":[12,12,10,8,6,2],"angle":[-90,-90,-90,-90,-90],"position":[-3,-3,-5,-3,-1,3],"doubleside":true,"texture":[3],"bump":{"position":0,"size":10},"offset":{"x":0,"y":65,"z":-5}},"detail6":{"length":[0,10,10,10,10],"width":[25,25,20,17,12,4],"angle":[90,90,90,90,90],"position":[-15,-15,-12,-9,-2,6],"doubleside":true,"texture":[4,4,18],"bump":{"position":-30,"size":20},"offset":{"x":0,"y":135,"z":0}},"detail7":{"length":[0,10,10,10,10],"width":[25,25,20,17,12,4],"angle":[-90,-90,-90,-90,-90],"position":[-15,-15,-12,-9,-2,6],"doubleside":true,"texture":[4,4,18],"bump":{"position":-30,"size":20},"offset":{"x":0,"y":135,"z":0}},"detail8":{"length":[0,10,10,10,10],"width":[25,25,20,17,12,4],"angle":[90,90,90,90,90],"position":[-15,-15,-12,-9,-2,6],"doubleside":true,"texture":[4,4,17],"bump":{"position":-30,"size":10},"offset":{"x":0,"y":134,"z":0}},"detail9":{"length":[0,10,10,10,10],"width":[25,25,20,17,12,4],"angle":[-90,-90,-90,-90,-90],"position":[-15,-15,-12,-9,-2,6],"doubleside":true,"texture":[4,4,17],"bump":{"position":-30,"size":10},"offset":{"x":0,"y":134,"z":0}}},"typespec":{"name":"Swordfish","level":5,"model":1,"code":501,"specs":{"shield":{"capacity":[275,350],"reload":[11,13]},"generator":{"capacity":[175,225],"reload":[45,65]},"ship":{"mass":350,"speed":[90,105],"rotation":[90,115],"acceleration":[100,115],"dash":{"rate":3,"burst_speed":[140,190],"speed":[175,225],"acceleration":[95,110],"initial_energy":[75,100],"energy":[75,100]}}},"shape":[5.352,3.37,1.98,1.605,1.342,1.244,1.048,0.966,1.015,1.098,1.126,1.174,1.242,1.34,1.477,1.585,1.601,1.239,1.426,1.631,1.945,2.45,3.014,3.569,5.008,6.378,5.008,3.569,3.014,2.45,1.945,1.631,1.426,1.239,1.601,1.585,1.477,1.34,1.242,1.174,1.126,1.098,1.015,0.966,1.048,1.166,1.342,1.605,1.98,3.37],"lasers":[],"radius":6.378}}';
var Giant_squid_502 = '{"name":"Giant squid","level":5,"model":2,"size":1.3,"zoom":1.3,"specs":{"shield":{"capacity":[225,300],"reload":[7,9]},"generator":{"capacity":[225,300],"reload":[100,150]},"ship":{"mass":295,"speed":[160,170],"rotation":[85,100],"acceleration":[50,70],"dash":{"rate":10,"burst_speed":[160,170],"speed":[25,25],"acceleration":[75,100],"initial_energy":[80,80],"energy":[0.1,0.1]}}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":-60,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-100,-105,-95,-80,-35,15,40,65,55,60,90,105,95],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,2,5,15,22,22,20,32,18,20,20,16,0],"height":[0,2,5,15,22,22,20,28,18,20,20,16,0],"texture":[3.9,3.9,63,0.9,10.235,3.9,63,3.9,15,2.9,1.9,16.9],"propeller":true,"laser":{"damage":[4.5,7],"rate":9.5,"type":1,"speed":[90,110],"number":1,"error":0}},"detail2":{"section_segments":6,"offset":{"x":5,"y":50,"z":20},"position":{"x":[-5,-5,1,6,8,8,8],"y":[-60,-50,-20,-5,65,70,70],"z":[-10,-10,2,5,5,5,5]},"width":[0,12,12,10,4,2,0],"height":[0,8,7,6,3,1,0],"texture":[3.9,15,4,63,3.9,3.9],"angle":0,"propeller":false},"detail3":{"section_segments":6,"offset":{"x":5,"y":50,"z":-20},"position":{"x":[-5,-5,1,6,8,8,8],"y":[-60,-50,-20,-5,65,70,70],"z":[10,10,-2,-5,-5,-5,-5]},"width":[0,12,12,10,4,2,0],"height":[0,8,7,6,3,1,0],"texture":[3.9,3.9,3.9,63,3.9,3.9],"angle":0,"propeller":false},"detail4":{"section_segments":6,"offset":{"x":15,"y":50,"z":3},"position":{"x":[-11,-11,5,14,12,12,12],"y":[-60,-60,-20,-5,50,55,55],"z":[4,4,2,12,12,12,12]},"width":[0,12,12,10,4,2,0],"height":[0,8,7,6,3,1,0],"texture":[3.9,11,2.9,63,3.9],"angle":0,"propeller":false},"detail5":{"section_segments":6,"offset":{"x":15,"y":50,"z":-3},"position":{"x":[-11,-11,5,14,12,12,12],"y":[-60,-60,-20,-5,50,55,55],"z":[-4,-4,-2,-12,-12,-12,-12]},"width":[0,12,12,10,4,2,0],"height":[0,8,7,6,3,1,0],"texture":[3.9,3.9,3.9,63,3.9,3.9],"angle":0,"propeller":false},"detail6":{"section_segments":6,"offset":{"x":-29,"y":50,"z":0},"position":{"x":[10,10,-2,-12,-16,-16,-16,-16],"y":[-60,-50,-20,-5,80,100,120,120],"z":[0,0,0,0,0,0,0,0]},"width":[0,6,6,5,3,5,3,0],"height":[0,10,10,8,6,10,6,0],"texture":[1.9,0.9,0.9,63,3.9,3.9],"angle":0,"propeller":false},"detail7":{"section_segments":6,"offset":{"x":0,"y":-55,"z":15},"position":{"x":[0,0,0,0,0],"y":[-20,-10,20,35,59],"z":[-5,-1,0,2,10]},"width":[0,8,10,10,1,0],"height":[0,8,8,5,5,0],"propeller":false,"texture":[7,9,15,18]},"detail8":{"section_segments":6,"offset":{"x":22,"y":-70,"z":5},"position":{"x":[0,0,0,0,0,0],"y":[-65,-70,-5,0,30,33],"z":[0,0,0,0,0,0]},"width":[0,2,4,7,7,0],"height":[0,2,4,7,7,0],"angle":0,"propeller":false,"texture":[2.9,16.9,63,8.2,3.9]},"detail9":{"section_segments":[0,175,-125],"offset":{"x":0,"y":-55,"z":18},"position":{"x":[19,7,5,0],"y":[-40,10,35,60],"z":[-7,-1,-2,10]},"width":[0,15,15,0],"height":[0,10,10,0],"propeller":false,"texture":[4.1]},"detail10":{"section_segments":[0,125,-175],"offset":{"x":0,"y":-55,"z":18},"position":{"x":[-19,-7,-5,0],"y":[-40,10,35,60],"z":[-7,-1,-2,10]},"width":[0,15,15,0],"height":[0,10,10,0],"propeller":false,"texture":[3.9]},"detail11":{"section_segments":[45,135,225,315],"offset":{"x":22,"y":-120,"z":5},"position":{"x":[0,0,0,0,0,0,0],"y":[-15,-22,-15,-10,15,20,15],"z":[0,0,0,0,0,0,0]},"width":[0,3,7,7,7,5,0],"height":[0,3,7,7,7,5,0],"angle":0,"laser":{"damage":[45,60],"rate":0.4,"type":1,"speed":[220,250],"number":1,"error":0},"propeller":false,"texture":[1.9,0.9,63,12.9,3.9,1.9]},"detail12":{"section_segments":4,"offset":{"x":0,"y":-15,"z":21.6},"position":{"x":[0,0,0,0],"y":[-20,-20,20,20],"z":[0,0,0,0]},"width":[0,1,4.5,0],"height":[0,2,2,0],"angle":180,"texture":[1.9,17,1.9]},"detail13":{"section_segments":6,"offset":{"x":0,"y":-18,"z":19},"position":{"x":[0,0,0,0],"y":[-3,-3,3,3],"z":[0,0,0,0]},"width":[0,7,7,0],"height":[0,6,6,0],"angle":180,"texture":[3.9]},"detail14":{"section_segments":6,"offset":{"x":-28,"y":50,"z":0},"position":{"x":[10,10,-2,-12,-16,-16,-16,-16],"y":[-60,-50,-20,-5,80,100,121,121],"z":[0,0,0,0,0,0,0,0]},"width":[0,6,6,5,3,5,3,0],"height":[0,10,10,8,6,10,6,0],"texture":[3.9,3.9,3.9,15,0.9,0.9],"angle":0,"propeller":false},"detail15":{"section_segments":6,"offset":{"x":4,"y":50,"z":20},"position":{"x":[-5,-5,1,6,8,8,8],"y":[-60,-50,-20,-5,65,70,70],"z":[-10,-10,2,5,5,5,5]},"width":[0,12,12,10,4,2,0],"height":[0,8,7,6,3,1,0],"texture":[3.9,3.9,3.9,63,3.9,3.9],"angle":0,"propeller":false}},"wings":{"detail":{"offset":{"x":10,"y":-115,"z":1},"length":[0,5,35],"width":[0,35,35,11],"angle":[-20,-20,-20],"position":[0,0,0,30],"texture":[1],"doubleside":true,"bump":{"position":15,"size":15}},"detail2":{"offset":{"x":0,"y":-125,"z":17},"length":[20],"width":[45,0],"angle":[-21],"position":[10,30],"texture":[4],"doubleside":true,"bump":{"position":45,"size":15}},"detail3":{"offset":{"x":10,"y":-114,"z":1},"length":[0,5,36],"width":[0,35,35,10],"angle":[-20,-20,-20],"position":[0,0,0,30],"texture":[63],"doubleside":true,"bump":{"position":15,"size":15}}},"typespec":{"name":"Giant squid","level":5,"model":2,"code":502,"specs":{"shield":{"capacity":[225,300],"reload":[7,9]},"generator":{"capacity":[225,300],"reload":[100,150]},"ship":{"mass":295,"speed":[160,170],"rotation":[85,100],"acceleration":[50,70],"dash":{"rate":10,"burst_speed":[160,170],"speed":[25,25],"acceleration":[75,100],"initial_energy":[80,80],"energy":[0.1,0.1]}}},"shape":[4.29,3.815,3.625,2.922,2.712,1.361,0.709,0.657,0.632,0.618,0.622,0.637,0.664,0.707,0.732,0.799,0.915,1.092,1.493,1.844,2.227,2.856,4.139,4.608,3.143,2.139,3.143,4.608,4.139,2.856,2.227,1.844,1.493,1.092,0.915,0.799,0.732,0.707,0.666,0.637,0.622,0.618,0.632,0.657,0.709,1.361,2.712,2.922,3.625,3.815],"lasers":[{"x":0,"y":-4.29,"z":0,"angle":0,"damage":[4.5,7],"rate":9.5,"type":1,"speed":[90,110],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.572,"y":-3.692,"z":0.13,"angle":0,"damage":[45,60],"rate":0.4,"type":1,"speed":[220,250],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.572,"y":-3.692,"z":0.13,"angle":0,"damage":[45,60],"rate":0.4,"type":1,"speed":[220,250],"number":1,"spread":0,"error":0,"recoil":0}],"radius":4.608}}';
var Catfish_503 = '{"name":"Catfish","level":5,"model":3,"size":1.52,"zoom":1.32,"specs":{"shield":{"capacity":[200,275],"reload":[6,8]},"generator":{"capacity":[225,275],"reload":[120,145]},"ship":{"mass":175,"speed":[100,115],"rotation":[80,100],"acceleration":[75,100]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-90,-90,-99,-96,-84,-65,-20,0,20,85,105,119,125,150,159,160],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,10,12,17,24,29,32,32,25,12,7,4,4,4,4,0],"height":[0,1,2,3.5,13,14,15,15,16,17,19,19,20,30,20,0],"texture":[63,63,63,3.9,1.9,8,10,3,10.245,63,3.9,16.9,12.9,3.9]},"detail2":{"section_segments":6,"offset":{"x":0,"y":-60,"z":11},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-20,-15,5,40,70,80,145,145],"z":[-2,-2,-2,0,0,4,4,4]},"width":[0,8,15,15,11,3,3,0],"height":[0,8,12,10,10,3,3,0],"propeller":false,"texture":[7,9,15,4]},"detail3":{"section_segments":6,"offset":{"x":15,"y":-42,"z":0},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[15,15,12,12,15],"height":[15,15,12,12,15],"propeller":false,"texture":[63]},"detail4":{"section_segments":6,"offset":{"x":15,"y":-32,"z":0},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[15,15,12,12,15],"height":[15,15,12,12,15],"propeller":false,"texture":[63]},"detail5":{"section_segments":4,"offset":{"x":18,"y":-120,"z":5},"position":{"x":[-1,-1,0,-5,-5,-5],"y":[-60,-60,-5,5,60,60],"z":[0,0,0,0,0,0]},"width":[0,1,2,2,2,0],"height":[0,1,2,2,2,0],"propeller":false,"texture":[4]},"detail6":{"section_segments":6,"offset":{"x":13,"y":20,"z":-5},"position":{"x":[-3,-3,-3,0,3,3],"y":[-10,-20,-20,0,35,25],"z":[0,0,0,0,0,0]},"width":[0,4,14,18,10,0],"height":[0,4,7,12,10,0],"propeller":true,"texture":[63,63,16.9,3.9,16.9]},"detail7":{"section_segments":6,"offset":{"x":5,"y":15,"z":9},"position":{"x":[0,0,0,0],"y":[-25,-15,15,25],"z":[0,10,10,0]},"width":[3,3,3,3],"height":[3,3,3,3],"texture":[2]},"detail8":{"section_segments":4,"angle":5,"offset":{"x":20,"y":-90,"z":-5},"position":{"x":[0,0,0],"y":[-30,-30,30],"z":[0,0,5]},"width":[0,1,2],"height":[0,1,2],"propeller":false,"texture":[3]},"detail9":{"section_segments":4,"angle":5,"offset":{"x":15,"y":-85,"z":-10},"position":{"x":[0,0,0],"y":[-30,-30,30],"z":[0,0,5]},"width":[0,1,2],"height":[0,1,2],"propeller":false,"texture":[3]},"detail10":{"section_segments":6,"offset":{"x":30,"y":-40,"z":-10},"position":{"x":[0,0,0,0,0,0,0],"y":[-35,-40,-10,0,20,25,25],"z":[0,0,0,0,0,0,0]},"width":[0,2,5,8,7,4,0],"height":[0,2,5,8,7,4,0],"angle":0,"laser":{"damage":[6,9],"rate":0.5,"type":1,"speed":[220,260],"number":1,"error":0},"propeller":false,"texture":[2.9,0.9,3.9,16.9,3.9]},"detail11":{"section_segments":6,"offset":{"x":30,"y":-40,"z":-10},"position":{"x":[0,0,0,0,0,0,0],"y":[-35,-40,-10,0,20,25,25],"z":[0,0,0,0,0,0,0]},"width":[0,2,5,8,7,4,0],"height":[0,2,5,8,7,4,0],"angle":0,"laser":{"damage":[6,9],"rate":0.5,"type":1,"speed":[210,250],"number":1,"error":0},"propeller":false,"texture":[2.9,0.9,3.9,16.9,3.9]},"detail12":{"section_segments":6,"offset":{"x":30,"y":-40,"z":-10},"position":{"x":[0,0,0,0,0,0,0],"y":[-35,-40,-10,0,20,25,25],"z":[0,0,0,0,0,0,0]},"width":[0,2,5,8,7,4,0],"height":[0,2,5,8,7,4,0],"angle":0,"laser":{"damage":[6,9],"rate":0.5,"type":1,"speed":[200,240],"number":1,"error":0},"propeller":false,"texture":[2.9,0.9,3.9,16.9,3.9]},"detail13":{"section_segments":6,"offset":{"x":30,"y":-40,"z":-10},"position":{"x":[0,0,0,0,0,0,0],"y":[-35,-40,-10,0,20,25,25],"z":[0,0,0,0,0,0,0]},"width":[0,2,5,8,7,4,0],"height":[0,2,5,8,7,4,0],"angle":0,"laser":{"damage":[6,9],"rate":0.5,"type":1,"speed":[190,230],"number":1,"error":0},"propeller":false,"texture":[2.9,0.9,3.9,16.9,3.9]},"detail14":{"section_segments":6,"offset":{"x":30,"y":-40,"z":-10},"position":{"x":[0,0,0,0,0,0,0],"y":[-35,-40,-10,0,20,25,25],"z":[0,0,0,0,0,0,0]},"width":[0,2,5,8,7,4,0],"height":[0,2,5,8,7,4,0],"angle":0,"laser":{"damage":[6,9],"rate":0.5,"type":1,"speed":[180,220],"number":1,"error":0},"propeller":false,"texture":[2.9,0.9,3.9,16.9,3.9]},"detail15":{"section_segments":6,"offset":{"x":30,"y":-40,"z":-10},"position":{"x":[0,0,0,0,0,0,0],"y":[-35,-40,-10,0,20,25,25],"z":[0,0,0,0,0,0,0]},"width":[0,2,5,8,7,4,0],"height":[0,2,5,8,7,4,0],"angle":0,"laser":{"damage":[6,9],"rate":0.5,"type":1,"speed":[170,210],"number":1,"error":0},"propeller":false,"texture":[2.9,0.9,3.9,16.9,3.9]},"detail16":{"section_segments":6,"offset":{"x":30,"y":-40,"z":-10},"position":{"x":[0,0,0,0,0,0,0],"y":[-35,-40,-10,0,20,25,25],"z":[0,0,0,0,0,0,0]},"width":[0,2,5,8,7,4,0],"height":[0,2,5,8,7,4,0],"angle":0,"laser":{"damage":[6,9],"rate":0.5,"type":1,"speed":[160,200],"number":1,"error":0},"propeller":false,"texture":[2.9,0.9,3.9,16.9,3.9]},"detail17":{"section_segments":6,"offset":{"x":30,"y":-40,"z":-10},"position":{"x":[0,0,0,0,0,0,0],"y":[-35,-40,-10,0,20,25,25],"z":[0,0,0,0,0,0,0]},"width":[0,2,5,8,7,4,0],"height":[0,2,5,8,7,4,0],"angle":0,"laser":{"damage":[6,9],"rate":0.5,"type":1,"speed":[150,190],"number":1,"error":0},"propeller":false,"texture":[2.9,0.9,3.9,16.9,3.9]},"detail18":{"section_segments":6,"offset":{"x":30,"y":-40,"z":-10},"position":{"x":[0,0,0,0,0,0,0],"y":[-35,-40,-10,0,20,25,25],"z":[0,0,0,0,0,0,0]},"width":[0,2,5,8,7,4,0],"height":[0,2,5,8,7,4,0],"angle":0,"laser":{"damage":[6,9],"rate":0.5,"type":1,"speed":[140,180],"number":1,"error":0},"propeller":false,"texture":[2.9,0.9,3.9,16.9,3.9]},"detail19":{"section_segments":6,"offset":{"x":30,"y":-40,"z":-10},"position":{"x":[0,0,0,0,0,0,0],"y":[-35,-40,-10,0,20,25,25],"z":[0,0,0,0,0,0,0]},"width":[0,2,5,8,7,4,0],"height":[0,2,5,8,7,4,0],"angle":0,"laser":{"damage":[6,9],"rate":0.5,"type":1,"speed":[130,170],"number":1,"error":0},"propeller":false,"texture":[2.9,0.9,3.9,16.9,3.9]},"detail20":{"section_segments":6,"offset":{"x":30,"y":-40,"z":-10},"position":{"x":[0,0,0,0,0,0,0],"y":[-35,-40,-10,0,20,25,25],"z":[0,0,0,0,0,0,0]},"width":[0,2,5,8,7,4,0],"height":[0,2,5,8,7,4,0],"angle":0,"laser":{"damage":[6,9],"rate":0.5,"type":1,"speed":[120,160],"number":1,"error":0},"propeller":false,"texture":[2.9,0.9,3.9,16.9,3.9]},"detail21":{"section_segments":6,"offset":{"x":0,"y":75,"z":12},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[10,10,7,7,10],"height":[10,10,7,7,10],"propeller":false,"texture":[63]},"detail22":{"section_segments":6,"offset":{"x":0,"y":65,"z":12},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[10,10,7,7,10],"height":[10,10,7,7,10],"propeller":false,"texture":[63]},"detail23":{"section_segments":6,"offset":{"x":0,"y":55,"z":12},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[10,10,7,7,10],"height":[10,10,7,7,10],"propeller":false,"texture":[63]}},"wings":{"detail":{"length":[15,15,10],"width":[20,35,33,10],"angle":[-15,-20,-35],"position":[-9,-6,-2,6],"doubleside":true,"texture":[4,11,63],"bump":{"position":35,"size":10},"offset":{"x":25,"y":-29,"z":0}},"detail2":{"length":[0,25,15],"width":[30,30,25,10],"angle":[90,90,90,90],"position":[-5,-5,5,10],"doubleside":true,"texture":[63],"bump":{"position":40,"size":15},"offset":{"x":0,"y":-29,"z":0}},"detail3":{"length":[0,25],"width":[100,100,100],"angle":[-90,-90,-90],"position":[-10,-10,20],"doubleside":true,"texture":[15],"bump":{"position":40,"size":6},"offset":{"x":0,"y":70,"z":-5}},"detail4":{"length":[0,25],"width":[15,15,15],"angle":[-90,-90,-90],"position":[-10,-10,20],"doubleside":true,"texture":[4],"bump":{"position":40,"size":15},"offset":{"x":0,"y":10,"z":-5}},"detail5":{"length":[15,15,11],"width":[20,35,33,10],"angle":[-15,-20,-35],"position":[-9,-6,-2,6],"doubleside":true,"texture":[63,18,4],"bump":{"position":35,"size":10},"offset":{"x":25,"y":-28,"z":0}}},"typespec":{"name":"Catfish","level":5,"model":3,"code":503,"specs":{"shield":{"capacity":[200,275],"reload":[6,8]},"generator":{"capacity":[225,275],"reload":[120,145]},"ship":{"mass":175,"speed":[100,115],"rotation":[80,100],"acceleration":[75,100]}},"shape":[3.015,5.499,3.233,2.616,2.326,2.028,2.143,2.177,2.117,2.077,2.046,1.741,0.849,0.842,0.818,0.829,0.929,1.071,1.159,1.29,1.48,1.777,1.832,2.128,3.137,4.864,3.137,2.128,1.832,1.777,1.48,1.29,1.159,1.071,0.929,0.829,0.818,0.841,0.849,1.741,2.046,2.077,2.117,2.177,2.143,2.028,2.326,2.616,3.233,5.499],"lasers":[{"x":0.912,"y":-2.432,"z":-0.304,"angle":0,"damage":[6,9],"rate":0.5,"type":1,"speed":[220,260],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.912,"y":-2.432,"z":-0.304,"angle":0,"damage":[6,9],"rate":0.5,"type":1,"speed":[220,260],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.912,"y":-2.432,"z":-0.304,"angle":0,"damage":[6,9],"rate":0.5,"type":1,"speed":[210,250],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.912,"y":-2.432,"z":-0.304,"angle":0,"damage":[6,9],"rate":0.5,"type":1,"speed":[210,250],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.912,"y":-2.432,"z":-0.304,"angle":0,"damage":[6,9],"rate":0.5,"type":1,"speed":[200,240],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.912,"y":-2.432,"z":-0.304,"angle":0,"damage":[6,9],"rate":0.5,"type":1,"speed":[200,240],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.912,"y":-2.432,"z":-0.304,"angle":0,"damage":[6,9],"rate":0.5,"type":1,"speed":[190,230],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.912,"y":-2.432,"z":-0.304,"angle":0,"damage":[6,9],"rate":0.5,"type":1,"speed":[190,230],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.912,"y":-2.432,"z":-0.304,"angle":0,"damage":[6,9],"rate":0.5,"type":1,"speed":[180,220],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.912,"y":-2.432,"z":-0.304,"angle":0,"damage":[6,9],"rate":0.5,"type":1,"speed":[180,220],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.912,"y":-2.432,"z":-0.304,"angle":0,"damage":[6,9],"rate":0.5,"type":1,"speed":[170,210],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.912,"y":-2.432,"z":-0.304,"angle":0,"damage":[6,9],"rate":0.5,"type":1,"speed":[170,210],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.912,"y":-2.432,"z":-0.304,"angle":0,"damage":[6,9],"rate":0.5,"type":1,"speed":[160,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.912,"y":-2.432,"z":-0.304,"angle":0,"damage":[6,9],"rate":0.5,"type":1,"speed":[160,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.912,"y":-2.432,"z":-0.304,"angle":0,"damage":[6,9],"rate":0.5,"type":1,"speed":[150,190],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.912,"y":-2.432,"z":-0.304,"angle":0,"damage":[6,9],"rate":0.5,"type":1,"speed":[150,190],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.912,"y":-2.432,"z":-0.304,"angle":0,"damage":[6,9],"rate":0.5,"type":1,"speed":[140,180],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.912,"y":-2.432,"z":-0.304,"angle":0,"damage":[6,9],"rate":0.5,"type":1,"speed":[140,180],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.912,"y":-2.432,"z":-0.304,"angle":0,"damage":[6,9],"rate":0.5,"type":1,"speed":[130,170],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.912,"y":-2.432,"z":-0.304,"angle":0,"damage":[6,9],"rate":0.5,"type":1,"speed":[130,170],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.912,"y":-2.432,"z":-0.304,"angle":0,"damage":[6,9],"rate":0.5,"type":1,"speed":[120,160],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.912,"y":-2.432,"z":-0.304,"angle":0,"damage":[6,9],"rate":0.5,"type":1,"speed":[120,160],"number":1,"spread":0,"error":0,"recoil":0}],"radius":5.499}}';
var Dolphin_504 = '{"name":"Dolphin","level":5,"model":4,"size":2,"zoom":1.3,"specs":{"shield":{"capacity":[250,325],"reload":[6,8]},"generator":{"capacity":[225,275],"reload":[75,100]},"ship":{"mass":210,"speed":[80,90],"rotation":[80,100],"acceleration":[80,95]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":-20,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-100,-100,-108,-106,-88,-74,-55,-30,0,25,65,95,110,110],"z":[-9,-9,-9,-9,-3,0,0,0,-3,-8,-26,-42,-50,-50]},"width":[0,1,3,6,12,19,23,24,21,18,14,9,8,0],"height":[0,1,2,4,8,22,27,30,28,24,14,4,2,0],"texture":[0,4,63,2,2,10,4,15,8.2,63],"laser":{"damage":[100,125],"rate":0.5,"type":2,"speed":[175,225],"recoil":100,"number":1,"error":0}},"detail2":{"section_segments":6,"offset":{"x":0,"y":-20,"z":0},"position":{"x":[0,0,0,0,0],"y":[-101,-100,-96,-88,-74,-55,-30],"z":[-15,-15,-15,-11,0,0,0]},"width":[0,3,6,12,16,16,0],"height":[0,2,5,8,22,27,0],"texture":[1.9]},"detail3":{"section_segments":6,"angle":90,"offset":{"x":0,"y":90,"z":-50},"position":{"x":[-5,-5,0,0,1,1],"y":[-42,-40,-30,-11,0,0],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,6,10,15,10,0],"height":[0,1,2,3,2,0],"texture":[3.9,3.9,10.25,63]},"detail14":{"section_segments":6,"offset":{"x":0,"y":-80,"z":19},"position":{"x":[0,0,0,0,0,0,0],"y":[-23,-23,-15,5,35,50,50],"z":[-10,-10,-4,0,3,0,0]},"width":[0,4,10,13,13,10,0],"height":[0,4,8,9,9,9,0],"propeller":false,"texture":[7,7,9,8.2,4]},"detail15":{"section_segments":6,"offset":{"x":0,"y":50,"z":-17},"position":{"x":[0,0,0,0,0],"y":[-45,-45,0,25,25],"z":[29,29,0,-22,-22]},"width":[0,10,10,5,0],"height":[0,4,4,4,0],"propeller":false,"texture":[3.9,3.9,8.2]},"detail16":{"section_segments":6,"offset":{"x":0,"y":50,"z":-16},"position":{"x":[0,0,0,0,0],"y":[-44,-44,0,24,24],"z":[29,29,0,-21.5,-21.5]},"width":[0,5,5,2.5,0],"height":[0,4,4,4,0],"propeller":false,"texture":[63]},"detail7":{"section_segments":6,"offset":{"x":16,"y":-40,"z":-20},"position":{"x":[0,0,0,0,0,0,0],"y":[-20,-20,-17,-5,5,30,20],"z":[0,0,0,0,0,0,0]},"width":[0,10,12,12,12,10,0],"height":[0,8,10,10,7,7,0],"angle":0,"propeller":true,"texture":[63,63,63,3.9,11,16.9]},"detail8":{"section_segments":6,"offset":{"x":0,"y":15,"z":-5},"position":{"x":[0,0,0,0,0,0,0],"y":[-42,-40,-10,-5,5,30,20],"z":[0,0,0,0,0,0,0]},"width":[0,15,15,12,9,8,0],"height":[0,12,12,10,6,5,0],"angle":0,"propeller":true,"texture":[2.9,2.9,3,1.9,1.9,16.9]},"detail9":{"section_segments":6,"offset":{"x":23,"y":-55,"z":-18},"position":{"x":[0,0,0,0,0,0,0],"y":[-25,-30,-25,-8,-5,20,22],"z":[0,0,0,0,0,0,0]},"width":[0,2,3,4,6,6,0],"height":[0,2,3,4,6,6,0],"angle":0,"laser":{"damage":[10,15],"rate":2.8,"type":2,"speed":[145,180],"number":1,"error":0},"propeller":false,"texture":[2.9,63,3.9,17,3.9]},"detail10":{"section_segments":4,"angle":0,"offset":{"x":11,"y":-63,"z":18},"position":{"x":[0,0,0,0,0,0],"y":[-7,-7,-5,5,7,7],"z":[0,0,0,0,0,0]},"width":[0,7,7,7,7,0],"height":[0,6,6,6,6,0],"texture":[4,17,15,17,4]},"detail11":{"section_segments":6,"angle":0,"offset":{"x":12,"y":-22,"z":8},"position":{"x":[2,2,-1,-3,-3,-7,-7],"y":[-28,-28,2,27,71,97,97],"z":[0,0,-2,-10,-28,-48,-48]},"width":[0,9,10,9,6,3,0],"height":[0,17,18,17,6,1,0],"texture":[1,1,1,10.23,1]},"detail12":{"section_segments":6,"angle":-90,"offset":{"x":0,"y":90,"z":-50},"position":{"x":[5,5,0,0,-1,-1],"y":[-42,-40,-30,-11,0,0],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,6,10,15,10,0],"height":[0,1,2,3,2,0],"texture":[3.9,3.9,10.25,63]}},"wings":{"detail":{"length":[5,18,3,8],"width":[35,45,27,25,10],"angle":[-30,-30,-30,-30],"position":[-10,-9,-1,2,13],"doubleside":true,"texture":[11,11.2,17,63],"bump":{"position":40,"size":5},"offset":{"x":15,"y":-35,"z":-3}},"detail2":{"length":[5,18,8],"width":[35,45,25,10],"angle":[90,90,90],"position":[-10,-9,2,13],"doubleside":true,"texture":[2,2,63],"bump":{"position":30,"size":7},"offset":{"x":0,"y":-10,"z":10}},"detail3":{"length":[5,18,3,9],"width":[35,45,27,25,9],"angle":[-30,-30,-30,-30],"position":[-10,-9,-1,2,13],"doubleside":true,"texture":[4],"bump":{"position":40,"size":5},"offset":{"x":15,"y":-34,"z":-3}}},"typespec":{"name":"Dolphin","level":5,"model":4,"code":504,"specs":{"shield":{"capacity":[250,325],"reload":[6,8]},"generator":{"capacity":[225,275],"reload":[75,100]},"ship":{"mass":210,"speed":[80,90],"rotation":[80,100],"acceleration":[80,95]}},"shape":[5.121,4.733,3.665,3.315,2.643,2.451,2.355,2.212,2.124,2.067,1.948,0.738,0.708,0.695,0.696,0.715,0.753,0.804,0.886,0.995,1.158,1.411,4.315,4.162,4.143,4.036,4.143,4.162,4.315,1.411,1.158,0.995,0.886,0.804,0.753,0.715,0.696,0.694,0.708,0.738,1.948,2.067,2.124,2.212,2.355,2.451,2.643,3.315,3.665,4.733],"lasers":[{"x":0,"y":-5.12,"z":0,"angle":0,"damage":[100,125],"rate":0.5,"type":2,"speed":[175,225],"number":1,"spread":0,"error":0,"recoil":100},{"x":0.92,"y":-3.4,"z":-0.72,"angle":0,"damage":[10,15],"rate":2.8,"type":2,"speed":[145,180],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.92,"y":-3.4,"z":-0.72,"angle":0,"damage":[10,15],"rate":2.8,"type":2,"speed":[145,180],"number":1,"spread":0,"error":0,"recoil":0}],"radius":5.121}}';
var Reef_shark_505 = '{"name":"Reef shark","level":5,"model":5,"size":1.9,"zoom":1.2,"specs":{"shield":{"capacity":[225,300],"reload":[6,8]},"generator":{"capacity":[250,300],"reload":[50,80]},"ship":{"mass":200,"speed":[115,135],"rotation":[90,110],"acceleration":[90,120]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":0,"z":5},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-140,-140,-135,-99,-55,0,50,85,115,110],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,5,12,22,25,22,13,6,4,0],"height":[0,1,4,17,22,22,16,6,4,0],"texture":[63,63,10.245,11,8.21,0.9,0.9,15,16.9],"propeller":true},"detail2":{"section_segments":6,"offset":{"x":0,"y":-20,"z":-5},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-95,-95,-82,-67,-35,20,70,85,100,100],"z":[-5,-5,-5,0,0,0,2,3,5,5]},"width":[0,8,13,20,23,20,11,2,1,0],"height":[0,2,8,15,20,20,15,10,4,0],"texture":[1.9]},"detail3":{"section_segments":6,"offset":{"x":0,"y":-20,"z":-3},"position":{"x":[0,0,0,0,0,0],"y":[-94,-94,-82,-67,-35,-35],"z":[-5,-5,-5,0,0,0]},"width":[0,7,12,19,22,0],"height":[0,2,8,15,20,0],"texture":[63]},"detail4":{"section_segments":6,"offset":{"x":0,"y":-87,"z":20},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-25,-25,-15,5,25,31,90,93,93],"z":[-5,-5,-5,-2,-2,2,1,2,2]},"width":[0,4,10,13,13,8,8,5,0],"height":[0,4,8,9,9,6,6,5,0],"propeller":false,"texture":[7,7,9,13,4,63]},"detail5":{"section_segments":6,"offset":{"x":0,"y":-60,"z":27},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-30,-35,-30,0,5,20,25,25],"z":[0,0,0,0,0,0,0,0]},"width":[0,3,5,5,8,8,5,0],"height":[0,3,5,5,8,8,5,0],"angle":0,"laser":{"damage":[50,65],"rate":2,"type":1,"speed":[330,400],"number":1,"error":0},"propeller":false,"texture":[2.9,63,15,3.9,8,3.9]},"detail6":{"section_segments":6,"offset":{"x":0,"y":-77,"z":13},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[30,30,27,27,30],"height":[10,10,7,7,10],"propeller":false,"texture":[63]},"detail7":{"section_segments":6,"offset":{"x":0,"y":-70,"z":13},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[30,30,27,27,30],"height":[10,10,7,7,10],"propeller":false,"texture":[63]},"detail8":{"section_segments":6,"offset":{"x":0,"y":-63,"z":13},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[30,30,27,27,30],"height":[10,10,7,7,10],"propeller":false,"texture":[63]},"detail9":{"section_segments":6,"offset":{"x":0,"y":-47,"z":13},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[20,20,17,17,20],"height":[20,20,17,17,20],"propeller":false,"texture":[3.9]},"detail10":{"section_segments":6,"offset":{"x":20,"y":-62,"z":5},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-25,-25,-20,-15,15,20,25,25],"z":[0,0,0,0,0,0,0,0]},"width":[0,5,8,8,8,8,5,0],"height":[0,5,8,8,8,8,5,0],"texture":[63,63,8,15,8,63,63]},"detail11":{"section_segments":6,"offset":{"x":21,"y":-45,"z":-22},"position":{"x":[0,0,0,0,0,0],"y":[-15,-15,-10,-5,20,10],"z":[0,0,0,0,0,0]},"width":[0,9,10,9,8,0],"height":[0,9,10,9,8,0],"angle":0,"propeller":true,"texture":[63,63,63,16.9,16.9]},"detail12":{"section_segments":6,"offset":{"x":1,"y":25,"z":10},"position":{"x":[16,16,-1,-1,-1],"y":[-25,-25,25,65,65],"z":[5,5,0,0,0]},"width":[0,3,14,5,0],"height":[0,4,15,4,0],"texture":[3.9]},"detail13":{"section_segments":6,"offset":{"x":13,"y":-20,"z":18},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-23,-23,-20,-5,5,20,23,23],"z":[0,0,0,0,0,0,0,0]},"width":[0,3,7,7,7,7,3,0],"height":[0,3,7,7,7,7,3,0],"texture":[63,63,15,8.2,15,63,63]},"detail14":{"section_segments":6,"offset":{"x":0,"y":25,"z":6},"position":{"x":[0,0,0,0],"y":[-20,-20,25,25],"z":[0,0,1,1]},"width":[0,20,12,0],"height":[0,21,15,0],"texture":[10.245]}},"wings":{"detail":{"length":[0,35,5],"width":[0,45,15,10],"angle":[90,90,90],"position":[-15,-15,0,3],"doubleside":true,"texture":[1,1,63],"bump":{"position":-30,"size":15},"offset":{"x":0,"y":-5,"z":15}},"detail2":{"length":[0,25,6],"width":[0,35,10,5],"angle":[90,90,90],"position":[-15,-15,0,3],"doubleside":true,"texture":[63],"bump":{"position":-30,"size":15},"offset":{"x":0,"y":55,"z":10}},"detail3":{"length":[0,5,10,10],"width":[0,30,25,15,5],"angle":[-90,-90,-90,-90],"position":[-18,-18,-15,-8,0],"doubleside":true,"texture":[63,63,1],"bump":{"position":-30,"size":15},"offset":{"x":0,"y":116,"z":10}},"detail4":{"length":[0,5,20,15],"width":[0,30,25,15,5],"angle":[90,90,90,90],"position":[-18,-18,-15,0,13],"doubleside":true,"texture":[63,63,1],"bump":{"position":-30,"size":15},"offset":{"x":0,"y":116,"z":10}},"detail5":{"length":[0,40,15],"width":[0,45,20,10],"angle":[-30,-30,-30],"position":[-15,-15,10,23],"doubleside":true,"texture":[4,4,63],"bump":{"position":30,"size":10},"offset":{"x":0,"y":-60,"z":-1}},"detail6":{"length":[0,25,7],"width":[0,35,15,5],"angle":[-30,-30,-30],"position":[-15,-15,10,19],"doubleside":true,"texture":[1,1,63],"bump":{"position":30,"size":10},"offset":{"x":0,"y":25,"z":-1}},"detail7":{"length":[0,5,10,10],"width":[0,30,25,15,5],"angle":[-90,-90,-90,-90],"position":[-18,-18,-15,-8,0],"doubleside":true,"texture":[17],"bump":{"position":-30,"size":15},"offset":{"x":0,"y":115,"z":10}},"detail8":{"length":[0,5,20,15],"width":[0,30,25,15,5],"angle":[90,90,90,90],"position":[-18,-18,-15,0,13],"doubleside":true,"texture":[17],"bump":{"position":-30,"size":15},"offset":{"x":0,"y":115,"z":10}},"detail9":{"length":[0,35,5],"width":[0,45,15,10],"angle":[90,90,90],"position":[-15,-15,0,3],"doubleside":true,"texture":[17,17,63],"bump":{"position":-30,"size":15},"offset":{"x":0,"y":-6,"z":15}}},"typespec":{"name":"Reef shark","level":5,"model":5,"code":505,"specs":{"shield":{"capacity":[225,300],"reload":[6,8]},"generator":{"capacity":[250,300],"reload":[50,80]},"ship":{"mass":200,"speed":[115,135],"rotation":[90,110],"acceleration":[90,120]}},"shape":[5.323,5.195,3.844,3.289,2.711,2.583,2.481,2.422,2.237,0.842,0.785,0.757,0.733,0.745,0.739,0.753,0.779,0.824,0.893,1.082,1.965,2.057,1.708,2.183,3.229,4.997,3.229,2.183,1.708,2.057,1.965,1.082,0.893,0.824,0.779,0.753,0.739,0.742,0.745,0.757,0.785,0.842,2.237,2.422,2.481,2.583,2.711,3.289,3.844,5.195],"lasers":[{"x":0,"y":-3.61,"z":1.026,"angle":0,"damage":[50,65],"rate":2,"type":1,"speed":[330,400],"number":1,"spread":0,"error":0,"recoil":0}],"radius":5.323}}';
var Piranha_506 = '{"name":"Piranha","level":5,"model":6,"size":1.4,"zoom":1.25,"specs":{"shield":{"capacity":[200,275],"reload":[5,8]},"generator":{"capacity":[200,250],"reload":[50,70]},"ship":{"mass":100,"speed":[105,125],"rotation":[20,30],"acceleration":[80,100]}},"bodies":{"detail":{"section_segments":8,"offset":{"x":0,"y":-20,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-106,-105,-99,-65,-30,10,50,85,105,140,140],"z":[3,0,4,0,0,0,0,0,0,0,0]},"width":[0,6,10,19,22,22,17,10,2,1,0],"height":[0,4,7,29,35,35,25,12,7,1,0],"texture":[63,63,63,4,8,4,1,63,4]},"detail3":{"section_segments":6,"offset":{"x":0,"y":-80,"z":40.2},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-46,-45,-40,-28,-13,28,28],"z":[-27,-25,-17,-10,-6,2,2]},"width":[0,5,9,13,17,17,0],"height":[0,5,5,6,8,5,0],"propeller":false,"texture":[6.9,9,9,9,10.24,3.9]},"detail4":{"section_segments":6,"offset":{"x":0,"y":-80,"z":39},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-45,-44,-40,-28,-13,30,30],"z":[-27,-25,-17,-10,-6,2,2]},"width":[0,7,11,15,19,19,0],"height":[0,5,5,6,8,5,0],"propeller":false,"texture":[3.9]},"detail5":{"section_segments":6,"offset":{"x":18,"y":-70,"z":20},"position":{"x":[0,0,0,0,0,0],"y":[-40,-55,-5,0,25,28],"z":[0,0,0,0,0,0]},"width":[0,2,5,8,8,0],"height":[0,2,5,8,8,0],"angle":0,"laser":{"damage":[16,20],"rate":1,"type":1,"speed":[100,120],"number":1,"recoil":0},"propeller":false,"texture":[2.9,3.9,16.9,8,3.9]},"detail6":{"section_segments":6,"offset":{"x":14,"y":15,"z":-10},"position":{"x":[0,0,0,0,0,0],"y":[-45,-40,-5,5,35,25],"z":[0,0,0,0,0,0]},"width":[0,11,11,8,8,0],"height":[0,15,15,10,10,0],"angle":0,"propeller":true,"texture":[4,4,63,12.9,16.9]},"detail7":{"section_segments":6,"offset":{"x":0,"y":-20,"z":-13},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-105,-103,-99,-65,-30,0,50,85,85],"z":[0,-1,-4,-3,0,0,5,20,20]},"width":[0,8,10,19,22,22,14,5,0],"height":[0,3,8,23,32,32,25,11,0],"texture":[3.9]},"detail8":{"section_segments":6,"offset":{"x":0,"y":-101,"z":-10},"position":{"x":[0,0,0,0,0],"y":[-22,-20,-7,2,2],"z":[0,0,4,5,5]},"width":[0,6,10,12,0],"height":[0,3,3,3,0],"texture":[63]},"detail9":{"section_segments":4,"angle":10,"offset":{"x":6,"y":-111,"z":-7},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-12,-10,-8,-6,-4,-2,0,2,4,6,8,10,12],"z":[0,0,0,0,0,0,1,2,3,4,4,4,4,4]},"width":[0,1,0.5,1,0.5,1,0.5,1,0.5,1,0.5,1,0],"height":[0,5,1,5,1,5,1,5,1,5,1,5,0],"texture":[2]},"detail10":{"section_segments":4,"angle":10,"offset":{"x":6,"y":-112,"z":5},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-12,-10,-8,-6,-4,-2,0,2,4,6,8,10,12],"z":[2,2,1,1,0,0,-1,-2,-3,-4,-4,-4,-4,-4]},"width":[0,1,0.5,1,0.5,1,0.5,1,0.5,1,0.5,1,0],"height":[0,5,1,5,1,5,1,5,1,5,1,5,0],"texture":[2]},"detail11":{"section_segments":4,"angle":90,"offset":{"x":0,"y":-124,"z":5},"position":{"x":[0,0,0,0,0],"y":[-4,-2,0,2,4],"z":[0,0,0,0,0]},"width":[0,1,0.5,1,0.5,0],"height":[0,7,1,7,1,0],"texture":[2]},"detail12":{"section_segments":4,"angle":90,"offset":{"x":0,"y":-121,"z":-10},"position":{"x":[0,0,0,0,0],"y":[-4,-2,0,2,4],"z":[0,0,0,0,0]},"width":[0,1,0.5,1,0.5,0],"height":[0,7,1,7,1,0],"texture":[2]},"detail13":{"section_segments":4,"offset":{"x":16.3,"y":-25,"z":12},"position":{"x":[0,0,0,0,0,0],"y":[-10,-10,-7,7,10,10],"z":[0,0,0,0,0,0]},"width":[0,5.2,5.2,5.2,5.2,0],"height":[0,20,20,20,20,0],"texture":[63,63,12.9,63,63]},"detail14":{"section_segments":[45,135,225,315],"offset":{"x":6,"y":31,"z":30},"position":{"x":[0,0,0,0,0,0],"y":[-10,-10,10,10,9,9],"z":[0,0,0,0,0,0]},"width":[0,6,6,3,3,0],"height":[0,24,24,21,21,0],"texture":[4,4,63,4,17],"vertical":true,"angle":30},"detail15":{"section_segments":6,"offset":{"x":0,"y":10,"z":35},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[10,10,7,7,10],"height":[10,10,7,7,10],"texture":[2]},"detail16":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":-75,"z":13},"position":{"x":[0,0,0,0,0,0],"y":[-50,-52,-46,0,25,28],"z":[0,0,0,0,0,0]},"width":[0,2,7,8,8,0],"height":[0,2,7,8,8,0],"angle":0,"laser":{"damage":[10,13],"rate":9.5,"type":1,"speed":[200,220],"number":1,"recoil":20},"propeller":false,"texture":[2.9,1,63,8,3.9]},"detail17":{"section_segments":6,"offset":{"x":8,"y":25,"z":15},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[13,13,10,10,10],"height":[10,10,7,7,10],"texture":[63],"angle":-15},"detail18":{"section_segments":6,"offset":{"x":5,"y":40,"z":15},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[13,13,10,10,10],"height":[7,7,4,4,7],"texture":[63],"angle":-15},"detail19":{"section_segments":6,"offset":{"x":1,"y":55,"z":15},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[13,13,10,10,10],"height":[4,4,1,1,4],"texture":[63],"angle":-15},"detail20":{"section_segments":8,"offset":{"x":19,"y":-58,"z":15},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[10,10,7,7,10],"height":[10,10,7,7,10],"texture":[63]}},"wings":{"detail":{"length":[15,15,15],"width":[50,45,43,16],"angle":[90,90,90],"position":[-20,-10,0,15],"doubleside":true,"texture":[4,3,63],"bump":{"position":-30,"size":6},"offset":{"x":0,"y":20,"z":20}},"detail2":{"length":[12,12,12],"width":[70,68,63,40],"angle":[-90,-90,-90],"position":[0,0,0,-10],"doubleside":true,"texture":[63,63,63],"bump":{"position":-30,"size":6},"offset":{"x":0,"y":35,"z":0}},"detail3":{"length":[18,18,18],"width":[30,40,37,15],"angle":[90,90,90],"position":[-15,-5,0,10],"doubleside":true,"texture":[4,4,63],"bump":{"position":-5,"size":6},"offset":{"x":0,"y":120,"z":10}},"detail4":{"length":[18,18,18],"width":[30,40,37,15],"angle":[-90,-90,-90],"position":[-15,-5,0,10],"doubleside":true,"texture":[4,4,63],"bump":{"position":-5,"size":6},"offset":{"x":0,"y":120,"z":10}},"detail5":{"length":[15,5],"width":[20,15,10],"angle":[90,90],"position":[-4,0,6],"doubleside":true,"texture":[4],"bump":{"position":-30,"size":6},"offset":{"x":0,"y":60,"z":20}},"detail6":{"length":[15,5],"width":[30,25,16],"angle":[-90,-90],"position":[-4,0,3],"doubleside":true,"texture":[2],"bump":{"position":-30,"size":6},"offset":{"x":0,"y":-15,"z":-35}},"detail7":{"length":[15,15,15],"width":[50,45,43,16],"angle":[90,90,90],"position":[-20,-10,0,15],"doubleside":true,"texture":[4,17,63],"bump":{"position":-30,"size":6},"offset":{"x":0,"y":19,"z":20}}},"typespec":{"name":"Piranha","level":5,"model":6,"code":506,"specs":{"shield":{"capacity":[200,275],"reload":[5,8]},"generator":{"capacity":[200,250],"reload":[50,70]},"ship":{"mass":100,"speed":[105,125],"rotation":[20,30],"acceleration":[80,100]}},"shape":[3.556,3.543,3.079,2.136,1.891,1.143,0.962,0.899,0.812,0.749,0.708,0.678,0.664,0.663,0.678,0.708,0.73,0.76,0.806,0.915,1.092,1.372,1.518,1.702,2.177,3.878,2.177,1.702,1.518,1.372,1.092,0.915,0.806,0.76,0.73,0.708,0.678,0.663,0.664,0.678,0.708,0.749,0.812,0.899,0.962,1.143,1.891,2.136,3.079,3.543],"lasers":[{"x":0.504,"y":-3.5,"z":0.56,"angle":0,"damage":[16,20],"rate":1,"type":1,"speed":[100,120],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.504,"y":-3.5,"z":0.56,"angle":0,"damage":[16,20],"rate":1,"type":1,"speed":[100,120],"number":1,"spread":0,"error":0,"recoil":0},{"x":0,"y":-3.556,"z":0.364,"angle":0,"damage":[10,13],"rate":9.5,"type":1,"speed":[200,220],"number":1,"spread":0,"error":0,"recoil":20}],"radius":3.878}}';
var Sawfish_507 = '{"name":"Sawfish","level":5,"model":7,"size":1.45,"zoom":1.3,"specs":{"shield":{"capacity":[250,325],"reload":[7,9]},"generator":{"capacity":[250,300],"reload":[100,125]},"ship":{"mass":200,"speed":[85,95],"rotation":[60,75],"acceleration":[80,95]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":10,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-205,-205,-192,-170,-122,-100,-84,-65,-30,0,35,75,135,150,150],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,7,14,14,14,14,16,32,34,30,15,10,10,2,0],"height":[0,1,2,2,2,2,15,15,15,15,15,9,7,5,0],"texture":[63,63,13,11,13,3.9,63,1.9,16.9,11,63,3.9,3.9]},"detail2":{"section_segments":6,"offset":{"x":0,"y":-60,"z":13},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-15,-15,5,40,70,100,150,150],"z":[-3,-4,-2,0,0,-1,-7,-7]},"width":[0,10,15,15,6,6,6,0],"height":[0,6,8,5,5,5,5,0],"propeller":false,"texture":[7,9,10.235,3.9]},"detail3":{"section_segments":4,"offset":{"x":0,"y":-180,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[0,3,6,9,12,15,18,21,24,27,30,30],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,25,8,25,8,25,8,25,8,25,8,0],"height":[0,1,1,1,1,1,1,1,1,1,1,0],"propeller":false,"texture":[17,18,17,18,17,18,17,18,17,18]},"detail4":{"section_segments":4,"offset":{"x":0,"y":-150,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[0,3,6,9,12,15,18,21,24,27,30,30],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,25,8,25,8,25,8,25,8,25,8,0],"height":[0,1,1,1,1,1,1,1,1,1,1,0],"propeller":false,"texture":[17,18,17,18,17,18,17,18,17,18]},"detail5":{"section_segments":4,"offset":{"x":0,"y":-120,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[0,3,6,9,12,15,18,21,24,27,30,30],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,25,8,25,8,25,8,25,8,25,8,0],"height":[0,1,1,1,1,1,1,1,1,1,1,0],"propeller":false,"texture":[17,18,17,18,17,18,17,18,17,18]},"detail6":{"section_segments":6,"offset":{"x":0,"y":110,"z":8},"position":{"x":[0,0,0,0,0,0],"y":[-65,-70,-30,-25,35,25],"z":[0,0,0,0,0,0]},"width":[0,3,6,11,11,0],"height":[0,3,6,5,5,0],"angle":180,"laser":{"damage":[10,13],"rate":3.5,"type":1,"speed":[140,160],"number":1,"error":0,"recoil":400},"propeller":false,"texture":[2.9,63,16.9,8.2,3.9]},"detail7":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":-124,"z":1.7},"position":{"x":[0,0,0,0,0],"y":[-58,-58,34,34],"z":[0,0,0,0,0]},"width":[0,4,4,0],"height":[0,1,1,0],"propeller":false,"texture":[63]},"detail8":{"section_segments":6,"offset":{"x":0,"y":-30,"z":3},"position":{"x":[-35,-35,-35,-35,-35,-35,-35],"y":[-45,-50,-10,0,30,35,35],"z":[0,0,0,0,0,0,0]},"width":[0,3,8,11,11,5,0],"height":[0,3,8,11,11,5,0],"angle":0,"laser":{"damage":[10,13],"rate":7,"type":1,"speed":[140,160],"number":1,"error":0,"recoil":0},"propeller":false,"texture":[2.9,1.9,63,10.25,3.9]},"detail9":{"section_segments":6,"offset":{"x":15,"y":52,"z":-12},"position":{"x":[0,0,0,0,0,0,0],"y":[-10,-20,-14,0,21,25,15],"z":[0,0,0,0,0,0,0]},"width":[0,4,14,18,14,14,0],"height":[0,4,7,12,10,10,0],"propeller":true,"texture":[63,63,10.9,16.9,3.9,16.9]},"detail10":{"section_segments":[0,125,-175],"offset":{"x":0,"y":-30,"z":13.9},"position":{"x":[-21,-12,-7,-11.5,-17.5],"y":[-46,-25,10,40,77],"z":[-8,-3,0,-4,-7]},"width":[0,20,30,20,0],"height":[0,5,10,5,0],"propeller":false,"texture":[3.9]},"detail11":{"section_segments":[0,175,-125],"offset":{"x":0,"y":-30,"z":13.9},"position":{"x":[21,12,7,11.5,17.5],"y":[-46,-25,10,40,77],"z":[-8,-3,0,-4,-7]},"width":[0,20,30,20,0],"height":[0,5,10,5,0],"propeller":false,"texture":[4.1]},"detail12":{"section_segments":6,"offset":{"x":0,"y":10,"z":-1},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-208,-208,-192,-170,-122,-100,-84,-65,-30,0,35,75,135,153,153],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,8,15,15,15,15,25,33,35,31,21,15,11,3,0],"height":[0,1,2,2,2,2,12,15,15,15,13,9,7,5,0],"texture":[3.9]},"detail13":{"section_segments":6,"offset":{"x":0,"y":88,"z":8},"position":{"x":[0,0,0,0,0],"y":[-5,-5,5,5],"z":[0,0,0,0,0]},"width":[0,12,12,0],"height":[0,7,7,0],"propeller":false,"texture":[4]},"detail14":{"section_segments":6,"offset":{"x":0,"y":122,"z":8},"position":{"x":[0,0,0,0,0],"y":[-5,-5,5,5],"z":[0,0,0,0,0]},"width":[0,12,12,0],"height":[0,7,7,0],"propeller":false,"texture":[4]},"detail15":{"section_segments":[0,125,-175],"offset":{"x":0,"y":-124,"z":2},"position":{"x":[-6,-5,-5,-5],"y":[-76,-59,54,54],"z":[-2,0,0,0]},"width":[0,10.5,10.5,0],"height":[0,4,4,0],"propeller":false,"texture":[3.9]},"detail16":{"section_segments":[0,175,-125],"offset":{"x":0,"y":-124,"z":2},"position":{"x":[6,5,5,5],"y":[-76,-59,54,54],"z":[-2,0,0,0]},"width":[0,10.5,10.5,0],"height":[0,4,4,0],"propeller":false,"texture":[4.1]},"detail17":{"section_segments":6,"offset":{"x":0,"y":-30,"z":3},"position":{"x":[35,35,35,35,35,35,35],"y":[-45,-50,-10,0,30,35,35],"z":[0,0,0,0,0,0,0]},"width":[0,3,8,11,11,5,0],"height":[0,3,8,11,11,5,0],"angle":0,"laser":{"damage":[10,13],"rate":7,"type":1,"speed":[140,160],"number":1,"error":0,"recoil":200},"propeller":false,"texture":[2.9,1.9,63,10.25,3.9]}},"wings":{"detail":{"length":[10,35,13],"width":[60,50,20,5],"angle":[-20,-20,0],"position":[-9,-6,-2,2],"doubleside":true,"texture":[8,15,4],"bump":{"position":30,"size":5},"offset":{"x":25,"y":-20,"z":5}},"detail2":{"length":[0,15,15,15],"width":[20,19,16,12,4],"angle":[90,90,90,90],"position":[-15,-15,-12,-6,5],"doubleside":true,"texture":[8],"bump":{"position":-30,"size":15},"offset":{"x":0,"y":170,"z":0}},"detail3":{"length":[0,8,8,8],"width":[20,20,16,11,4],"angle":[-90,-90,-90,-90],"position":[-15,-15,-14,-10,-4],"doubleside":true,"texture":[8],"bump":{"position":-35,"size":16},"offset":{"x":0,"y":170,"z":0}},"detail4":{"length":[5,30,10],"width":[60,60,20,5],"angle":[0,0,0],"position":[-26,-26,-5,2],"doubleside":true,"texture":[3,8.05,63],"bump":{"position":0,"size":15},"offset":{"x":0,"y":65,"z":-1}},"detail5":{"length":[5,30,13],"width":[60,50,20,5],"angle":[90,90,90],"position":[-26,-26,-5,2],"doubleside":true,"texture":[3],"bump":{"position":0,"size":5},"offset":{"x":0,"y":125,"z":0}},"detail6":{"length":[10,35,13],"width":[60,50,20,5],"angle":[90,90,90],"position":[-26,-26,-5,2],"doubleside":true,"texture":[3],"bump":{"position":0,"size":5},"offset":{"x":0,"y":65,"z":0}},"detail7":{"length":[10,35,13],"width":[60,50,20,5],"angle":[-20,-20,0],"position":[-9,-6,-2,2],"doubleside":true,"texture":[8,63,4],"bump":{"position":30,"size":5},"offset":{"x":25,"y":-19,"z":5}}},"typespec":{"name":"Sawfish","level":5,"model":7,"code":507,"specs":{"shield":{"capacity":[250,325],"reload":[7,9]},"generator":{"capacity":[250,300],"reload":[100,125]},"ship":{"mass":200,"speed":[85,95],"rotation":[60,75],"acceleration":[80,95]}},"shape":[5.803,5.436,3.811,2.563,2.553,2.133,1.857,1.945,2.077,2.229,2.4,2.403,1.611,1.291,1.15,0.861,0.879,0.914,0.963,1.037,2.401,2.388,2.367,2.347,4.239,5.221,4.239,2.347,2.367,2.388,2.401,1.037,0.963,0.914,0.879,0.861,1.15,1.29,1.611,2.403,2.4,2.229,2.077,1.945,1.857,2.133,2.553,2.563,3.811,5.436],"lasers":[{"x":0,"y":5.22,"z":0.232,"angle":180,"damage":[10,13],"rate":3.5,"type":1,"speed":[140,160],"number":1,"spread":0,"error":0,"recoil":400},{"x":-1.015,"y":-2.32,"z":0.087,"angle":0,"damage":[10,13],"rate":7,"type":1,"speed":[140,160],"number":1,"spread":0,"error":0,"recoil":0},{"x":1.015,"y":-2.32,"z":0.087,"angle":0,"damage":[10,13],"rate":7,"type":1,"speed":[140,160],"number":1,"spread":0,"error":0,"recoil":200}],"radius":5.803}}';
var Leatherback_turtle_508 = '{"name":"Leatherback turtle","level":5,"model":8,"size":1.75,"zoom":1.1,"specs":{"shield":{"capacity":[275,350],"reload":[7,9]},"generator":{"capacity":[375,450],"reload":[125,150]},"ship":{"mass":250,"speed":[70,80],"rotation":[45,55],"acceleration":[75,90]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":-20,"z":-3},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-80,-80,-65,-60,-44,-10,20,70,100,110,145,146],"z":[-10,-10,-2,0,0,0,0,0,0,1,1,1]},"width":[0,12,25,27,27,60,67,52,25,9,2,0],"height":[0,5,18,15,15,20,25,25,15,6,2,0],"texture":[3.9,8,63,18,63,3.9,3.9,3.9,3.9,63]},"detail2":{"section_segments":8,"angle":90,"offset":{"x":0,"y":15,"z":19.8},"position":{"x":[17,17,15,5,0,5,15,17,17],"y":[-65,-65,-60,-30,0,30,60,65,65],"z":[-10,-10,-5,0,0,0,-5,-10,-10]},"width":[0,25,40,70,80,70,40,25,0],"height":[0,3,5,10,12,10,5,3,0],"texture":[4,4,11,4,4,11,4,4]},"detail3":{"section_segments":8,"angle":90,"offset":{"x":0,"y":15,"z":16},"position":{"x":[17,17,15,5,0,5,15,17,17],"y":[-70,-70,-60,-30,0,30,60,70,70],"z":[-10,-10,-5,0,0,0,-5,-10,-10]},"width":[0,30,45,75,85,75,45,30,0],"height":[0,3,5,10,12,10,5,3,0],"texture":[63]},"detail4":{"section_segments":4,"offset":{"x":0,"y":10,"z":31},"position":{"x":[0,0,0,0,0],"y":[-75,-50,6,60,85],"z":[-11,-3,0,-3,-11]},"width":[0,6,9,6,0],"height":[0,6,10,6,0],"texture":[63]},"detail5":{"section_segments":4,"offset":{"x":30,"y":10,"z":31},"position":{"x":[0,3,7,3,0],"y":[-70,-48,0,50,70],"z":[-11,-6,-6,-6,-11]},"width":[0,5,8,5,0],"height":[0,6,10,6,0],"texture":[63]},"detail6":{"section_segments":4,"offset":{"x":55,"y":0,"z":16},"position":{"x":[5,7,7,9,5],"y":[-40,-30,0,25,40],"z":[0,0,0,0,0]},"width":[0,3,5,3,0],"height":[0,6,10,6,0],"texture":[63]},"detail7":{"section_segments":6,"angle":-70,"offset":{"x":48,"y":-52,"z":-9},"position":{"x":[8,8,0,0,0,0],"y":[-40,-40,-18,-15,25,25],"z":[-5,-5,3,3,6,6]},"width":[0,10,17,17,17,0],"height":[0,5,9,9,9,0],"texture":[1.9,10,4,12.9]},"detail8":{"section_segments":6,"angle":-140,"offset":{"x":48,"y":51,"z":-9},"position":{"x":[8,8,0,0,0,0],"y":[-40,-40,-18,-15,25,25],"z":[-5,-5,3,3,6,6]},"width":[0,10,17,17,17,0],"height":[0,5,9,9,9,0],"texture":[1.9,2,4,18]},"detail9":{"section_segments":6,"angle":-70,"offset":{"x":48.2,"y":-51,"z":-9},"position":{"x":[8,8,0,0,0,0],"y":[-40,-40,-18,-15,25,25],"z":[-5,-5,3,3,6,6]},"width":[0,10,17,17,17,0],"height":[0,5,9,9,9,0],"texture":[63,63,4,4]},"detail10":{"section_segments":6,"angle":-140,"offset":{"x":47,"y":52,"z":-9},"position":{"x":[8,8,0,0,0,0],"y":[-40,-40,-18,-15,25,25],"z":[-5,-5,3,3,6,6]},"width":[0,10,17,17,17,0],"height":[0,5,9,9,9,0],"texture":[63,63,4,4]},"detail11":{"section_segments":8,"offset":{"x":52,"y":5,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-40,-40,-30,30,40,40],"z":[0,0,0,0,0,0]},"width":[0,17,22,22,17,0],"height":[0,7,12,12,7,0],"texture":[4,4,15,4,4]},"detail12":{"section_segments":6,"offset":{"x":47,"y":5,"z":0},"position":{"x":[0,0,0,0],"y":[-30,28,30,30],"z":[0,0,0,0]},"width":[30,30,25,0],"height":[4,4,2,0],"texture":[17,4,4],"angle":90},"detail13":{"section_segments":8,"offset":{"x":0,"y":-70,"z":-3.5},"position":{"x":[0,0,0,0,0,0,0],"y":[-27,-27,-15,15,30,70,70],"z":[-4,-4,0,0,0,0,0]},"width":[0,8,18,19,19,14,0],"height":[0,6,17,16,16,14,0],"propeller":false,"texture":[7,7,9,63,63]},"detail14":{"section_segments":6,"offset":{"x":0,"y":-35,"z":-17},"position":{"x":[0,0,0,0,0,0,0],"y":[-60,-70,-40,-30,-10,0,0],"z":[0,0,0,2,2,2,2]},"width":[0,5,18,13,13,8,0],"height":[0,5,8,13,13,8,0],"angle":0,"laser":{"damage":[13,16],"rate":9,"type":1,"speed":[120,150],"number":1,"error":0},"propeller":false,"texture":[1.9,0.9,3.9,10,3.9]},"detail15":{"section_segments":6,"offset":{"x":0,"y":35,"z":7},"position":{"x":[0,0,0,0,0,0,0],"y":[-60,-70,-40,-30,-10,0,0],"z":[0,0,0,2,2,2,2]},"width":[0,5,8,13,13,8,0],"height":[0,5,8,13,13,8,0],"angle":180,"laser":{"damage":[13,16],"rate":9,"type":1,"speed":[120,150],"number":1,"error":0,"recoil":70},"propeller":false,"texture":[1.9,1.9,3.9,10,3.9]},"detail16":{"section_segments":6,"offset":{"x":0,"y":0,"z":-22},"position":{"x":[0,0,0,0],"y":[0,0,10,10],"z":[0,0,0,0]},"width":[0,10,10,0],"height":[0,10,10,0],"laser":{"damage":[50,60],"rate":1,"type":1,"speed":[170,210],"number":4,"error":0,"angle":270},"propeller":false,"texture":[0.9]},"detail17":{"section_segments":6,"offset":{"x":26,"y":-17,"z":-5},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-20,-15,0,10,20,25,30,80,100,90],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,15,20,20,20,15,15,20,15,0],"height":[0,10,15,15,15,10,10,15,10,0],"texture":[3.9,63,0.9,0.9,0.9,63,15,16.9,16.9],"propeller":true},"detail18":{"section_segments":[45,135,225,315],"offset":{"x":20,"y":-70,"z":-5},"position":{"x":[0,0],"y":[-30,30],"z":[0,0]},"width":[6,6],"height":[5,5],"texture":[16.9],"angle":50},"detail19":{"section_segments":4,"offset":{"x":0,"y":10,"z":33},"position":{"x":[0,0,0,0,0],"y":[-75,-50,6,60,85],"z":[-11,-3,0,-3,-11]},"width":[0,4,7,4,0],"height":[0,6,10,6,0],"texture":[11]},"detail20":{"section_segments":4,"offset":{"x":30,"y":10,"z":32},"position":{"x":[0,3,7,3,0],"y":[-70,-48,0,50,70],"z":[-11,-6,-6,-6,-11]},"width":[0,4,7,4,0],"height":[0,6,10,6,0],"texture":[11]},"detail21":{"section_segments":4,"offset":{"x":55,"y":0,"z":18},"position":{"x":[5,7,7,9,5],"y":[-40,-30,0,25,40],"z":[0,0,0,0,0]},"width":[0,2,4,2,0],"height":[0,6,10,6,0],"texture":[11]},"detail22":{"section_segments":6,"offset":{"x":0,"y":-10,"z":-85},"position":{"x":[0,0,0,0,0],"y":[-5,5,5,-5,-5],"z":[0,0,0,0,0]},"width":[15,15,10,10,15],"height":[30,30,25,25,30],"texture":[3.9],"vertical":true},"detail23":{"section_segments":8,"angle":90,"offset":{"x":0,"y":15,"z":20},"position":{"x":[17,17,15,5,0,5,15,17,17],"y":[-65,-65,-60,-30,0,30,60,65,65],"z":[-10,-10,-5,0,0,0,-5,-10,-10]},"width":[0,24,39,69,79,69,39,24,0],"height":[0,3,5,10,12,10,5,3,0],"texture":[4]}},"typespec":{"name":"Leatherback turtle","level":5,"model":8,"code":508,"specs":{"shield":{"capacity":[275,350],"reload":[7,9]},"generator":{"capacity":[375,450],"reload":[125,150]},"ship":{"mass":250,"speed":[70,80],"rotation":[45,55],"acceleration":[75,90]}},"shape":[3.678,3.519,3.232,2.668,2.701,3.262,3.525,3.783,3.746,3.644,2.736,2.757,2.716,2.716,2.782,2.852,2.866,2.883,3.479,3.853,3.883,3.412,3.21,3.25,3.759,4.41,3.759,3.25,3.21,3.412,3.883,3.853,3.479,2.883,2.866,2.852,2.782,2.716,2.716,2.757,2.736,3.644,3.746,3.783,3.525,3.262,2.701,2.668,3.232,3.519],"lasers":[{"x":0,"y":-3.675,"z":-0.595,"angle":0,"damage":[13,16],"rate":9,"type":1,"speed":[120,150],"number":1,"spread":0,"error":0,"recoil":0},{"x":0,"y":3.675,"z":0.245,"angle":180,"damage":[13,16],"rate":9,"type":1,"speed":[120,150],"number":1,"spread":0,"error":0,"recoil":70},{"x":0,"y":0,"z":-0.77,"angle":0,"damage":[50,60],"rate":1,"type":1,"speed":[170,210],"number":4,"spread":270,"error":0,"recoil":0}],"radius":4.41}}';
var Spider_crab_509 = '{"name":"Spider crab","level":5,"model":9,"size":1.45,"zoom":1.15,"specs":{"shield":{"capacity":[300,375],"reload":[8,10]},"generator":{"capacity":[475,575],"reload":[225,275]},"ship":{"mass":250,"speed":[65,75],"rotation":[55,75],"acceleration":[90,110]}},"bodies":{"main":{"section_segments":6,"offset":{"x":0,"y":50,"z":10},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-45,-45,-20,10,50,45,60,50],"z":[0,0,0,0,0,0,0,0]},"width":[0,14,30,30,20,15,11,0],"height":[0,12,16,16,16,13,9,0],"propeller":true,"texture":[0.9,0.9,0.9,10.24,0.9,16.9,16.9]},"main2":{"section_segments":6,"offset":{"x":0,"y":50,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-45,-45,-20,10,49,49],"z":[5,5,0,0,0,0]},"width":[0,14,30,30,20,0],"height":[0,12,16,16,16,0],"texture":[0.9]},"main3":{"section_segments":10,"offset":{"x":25,"y":5,"z":-37},"position":{"x":[0,0,0,0,0,0],"y":[-4,-4,4,4,4,4],"z":[0,0,0,0,0,0]},"width":[0,30,30,28,20,0],"height":[0,30,30,28,20,0],"texture":[3.9,3.9,63,16.9,4],"vertical":true},"cockpit":{"section_segments":6,"offset":{"x":0,"y":25,"z":16},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-25,-25,-20,-5,15,32,37,37],"z":[-7,-7,-1,0,0,0,0,0]},"width":[0,5,12,21,21,21,21,0],"height":[0,5,5,12,12,12,12,0],"texture":[3.9,3.9,8,8,16.9,3.9]},"cockpit2":{"section_segments":6,"offset":{"x":0,"y":25,"z":18},"position":{"x":[0,0,0,0,0,0,0],"y":[-24,-24,-20,-5,15,32,32],"z":[-7,-7,-1,0,0,0,0]},"width":[0,1,8,17,17,17,0],"height":[0,5,5,12,12,12,0],"texture":[7,7,9,9,9,0.9]},"detail":{"section_segments":6,"offset":{"x":22,"y":40,"z":-3},"position":{"x":[0,0,0,0,0,0,0],"y":[-45,-45,-40,0,45,60,50],"z":[0,0,0,0,0,0,0]},"width":[0,10,15,15,15,10,0],"height":[0,10,15,15,15,10,0],"texture":[3.9,3.9,15,11,63,16.9],"propeller":true},"detail2":{"section_segments":4,"offset":{"x":22,"y":-6,"z":0},"position":{"x":[0,0,0],"y":[-10,-10,10],"z":[0,0,0]},"width":[0,8,0],"height":[0,5,0],"texture":[17],"angle":180},"detail3":{"section_segments":[45,90,135,225,-90,315],"offset":{"x":115,"y":5,"z":0},"position":{"x":[-10,-10,-15,-15,-11,-10,-5,-5],"y":[10,10,25,35,50,60,110,110],"z":[-20,-20,-5,0,0,0,0,0]},"width":[0,3,6,6,6,8,8,0],"height":[0,3,6,6,6,8,8,0],"texture":[0.9,0.9,63,3.9,3.9,18],"angle":-65},"detail4":{"section_segments":[45,90,135,225,-90,315],"offset":{"x":120,"y":45,"z":1},"position":{"x":[-18,-18,-18,-17,-11,-10,-5,-5],"y":[-5,-5,10,20,50,60,110,110],"z":[-20,-20,-5,0,0,0,0,0]},"width":[0,3,6,6,6,8,8,0],"height":[0,3,6,6,6,8,8,0],"texture":[0.9,0.9,63,3.9,3.9,18],"angle":-90},"detail5":{"section_segments":[45,90,135,225,-90,315],"offset":{"x":110,"y":80,"z":2},"position":{"x":[-18,-18,-18,-17,-11,-10,-5,-5],"y":[-5,-5,10,20,50,60,110,110],"z":[-20,-20,-5,0,0,0,0,0]},"width":[0,3,6,6,6,8,8,0],"height":[0,3,6,6,6,8,8,0],"texture":[0.9,0.9,63,3.9,3.9,18],"angle":-110},"detail6":{"section_segments":[45,90,135,225,-90,315],"offset":{"x":86,"y":110,"z":3},"position":{"x":[-20,-20,-15,-14,-11,-10,-5,-5],"y":[10,10,25,35,50,60,110,110],"z":[-20,-20,-5,0,0,0,0,0]},"width":[0,3,6,6,6,8,8,0],"height":[0,3,6,6,6,8,8,0],"texture":[0.9,0.9,63,3.9,3.9,18],"angle":-130},"detail7":{"section_segments":6,"offset":{"x":60,"y":-100,"z":0},"position":{"x":[-1,-1,-1,-8,0,0,0,0],"y":[-35,-35,-10,10,50,60,110,110],"z":[0,0,0,0,0,0,0,0]},"width":[0,1.5,9,6,6,8,8,0],"height":[0,2,3,4,4,6,6,0],"texture":[3.9,3.9,3.9,8.24,63,3.9],"angle":-10},"detail8":{"section_segments":[45,135,225,315],"offset":{"x":60,"y":-100,"z":-2},"position":{"x":[-17,-17,-17,-8,0,0,0,0],"y":[-35,-35,-10,10,50,60,109,109],"z":[0,0,0,0,0,0,0,0]},"width":[0,1.5,9,6,6,8,8,0],"height":[0,2,3,4,4,6,6,0],"texture":[63,63,63,1],"angle":-10},"cannon":{"section_segments":6,"offset":{"x":-10,"y":62,"z":9},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-55,-10,0,20,30,30],"z":[0,0,0,0,0,0,0]},"width":[0,3,7,8,8,5,0],"height":[0,2,9,8,8,5,0],"angle":120,"propeller":false,"texture":[3.9,63]},"cannon2":{"section_segments":6,"offset":{"x":0,"y":40,"z":9},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-55,-10,0,20,30,30],"z":[0,0,0,0,0,0,0]},"width":[0,3,7,8,8,5,0],"height":[0,2,9,8,8,5,0],"propeller":false,"texture":[3.9,63]},"cannon_1":{"section_segments":6,"offset":{"x":0,"y":55,"z":0},"position":{"x":[0,0],"y":[-3,3],"z":[0,0]},"width":[3,3],"height":[3,3],"laser":{"damage":[20,25],"rate":1.8,"type":1,"speed":[170,190],"number":3,"error":0,"angle":240},"propeller":false,"texture":63},"cannon_2":{"section_segments":6,"angle":4,"offset":{"x":0,"y":55,"z":0},"position":{"x":[0,0],"y":[-3,3],"z":[0,0]},"width":[3,3],"height":[3,3],"laser":{"damage":[20,25],"rate":1.8,"type":1,"speed":[170,190],"number":3,"error":0,"angle":240},"propeller":false,"texture":63},"cannon_3":{"section_segments":6,"angle":-4,"offset":{"x":0,"y":55,"z":0},"position":{"x":[0,0],"y":[-3,3],"z":[0,0]},"width":[3,3],"height":[3,3],"laser":{"damage":[20,25],"rate":1.8,"type":1,"speed":[170,190],"number":3,"error":0,"angle":240},"propeller":false,"texture":63},"detail21":{"section_segments":10,"angle":0,"offset":{"x":0,"y":25,"z":-65},"position":{"x":[0,0,0,0,0],"y":[-7,-7,6,7,5],"z":[0,0,0,0,0]},"width":[0,12,12,10,0],"height":[0,12,12,10,0],"texture":[4,4,17,18],"vertical":true}},"wings":{"main":{"length":[0,17,0],"width":[0,70,40,0],"angle":[0,-10,-10],"position":[5,5,-10,-10],"doubleside":true,"offset":{"x":20,"y":30,"z":20},"bump":{"position":30,"size":10},"texture":[4]},"main2":{"length":[0,20,0],"width":[0,80,20,0],"angle":[0,-10,-10],"position":[0,0,-10,-10],"doubleside":true,"offset":{"x":37,"y":0,"z":17},"bump":{"position":39.8,"size":5},"texture":[63]},"main3":{"length":[0,17,0],"width":[0,70,40,0],"angle":[0,0,0],"position":[5,5,-10,-10],"doubleside":true,"offset":{"x":15,"y":30,"z":7},"bump":{"position":30,"size":10},"texture":[15]},"main4":{"length":[0,20,0],"width":[0,80,20,0],"angle":[0,0,0],"position":[0,0,-10,-10],"doubleside":true,"offset":{"x":32,"y":0,"z":7},"bump":{"position":39.8,"size":5},"texture":[15]},"main5":{"length":[0,30],"width":[0,45,23],"angle":[0,0],"position":[0,0,21],"doubleside":true,"offset":{"x":16,"y":50,"z":11},"bump":{"position":39.8,"size":15},"texture":[8.1]}},"typespec":{"name":"Spider crab","level":5,"model":9,"code":509,"specs":{"shield":{"capacity":[300,375],"reload":[8,10]},"generator":{"capacity":[475,575],"reload":[225,275]},"ship":{"mass":250,"speed":[65,75],"rotation":[55,75],"acceleration":[90,110]}},"shape":[0.436,0.441,0.404,4.24,4.347,3.003,2.542,2.238,2.021,1.806,1.743,1.698,2.947,2.988,3.728,3.604,3.983,3.99,3.677,3.687,3.237,3.122,2.958,3.033,3.202,3.196,3.202,3.033,2.958,3.122,3.237,3.687,3.677,3.99,3.983,3.604,3.728,2.988,2.947,1.698,1.743,1.806,2.021,2.238,2.542,3.003,4.347,4.24,0.404,0.441],"lasers":[{"x":0,"y":1.508,"z":0,"angle":0,"damage":[20,25],"rate":1.8,"type":1,"speed":[170,190],"number":3,"spread":240,"error":0,"recoil":0},{"x":-0.006,"y":1.508,"z":0,"angle":4,"damage":[20,25],"rate":1.8,"type":1,"speed":[170,190],"number":3,"spread":240,"error":0,"recoil":0},{"x":0.006,"y":1.508,"z":0,"angle":-4,"damage":[20,25],"rate":1.8,"type":1,"speed":[170,190],"number":3,"spread":240,"error":0,"recoil":0}],"radius":4.347}}';
 
var Narwhal_601 = '{"name":"Narwhal","level":6,"model":1,"size":1.85,"zoom":1.25,"specs":{"shield":{"capacity":[425,500],"reload":[12,14]},"generator":{"capacity":[225,275],"reload":[45,60]},"ship":{"mass":500,"speed":[85,100],"rotation":[80,105],"acceleration":[90,100],"dash":{"rate":3,"burst_speed":[185,230],"speed":[175,225],"acceleration":[95,110],"initial_energy":[75,100],"energy":[100,125]}}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":-20,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-86,-86,-78,-55,-30,0,48,80,110,150,170,172],"z":[3,3,0,0,0,3,3,0,-2,-7,-14,-14]},"width":[0,11,18,24,25,30,31,25,22,20,16,0],"height":[0,8,21,27,30,30,31,24,16,6,4,0],"texture":[3.9,3.9,3.9,12.9,11,10,63,3.9,8.2,3.9]},"detail2":{"section_segments":6,"offset":{"x":0,"y":-20,"z":-2},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-83,-83,-78,-55,-30,0,48,80,110,150,170,172],"z":[-12,-12,-11,0,0,3,3,0,-2,-7,-14,-14]},"width":[0,8,18,23,24,29,30,24,21,19,15,0],"height":[0,3,11,27,30,30,31,24,16,6,4,0],"texture":[1.9,1.9,1.9,1.9,15,15,2.9,2.9,63,2.9]},"detail3":{"section_segments":6,"offset":{"x":0,"y":-20,"z":-1},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-90,-90,-78,-55,-30,0,48,80,110,150,150],"z":[0,0,0,0,0,3,3,0,-2,-7,-7]},"width":[0,13,22,28,29,35,36,29,25,22,0],"height":[0,2,5,5,5,5,5,5,5,5,0],"texture":[63,63,63,8,63]},"detail4":{"section_segments":6,"angle":90,"offset":{"x":0,"y":150,"z":-15},"position":{"x":[-5,-5,0,0,1,0,0,-5,-5],"y":[-52,-50,-40,-25,0,25,40,51,51],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,6,10,15,10,15,10,6,0],"height":[0,1,2,3,2,3,2,1,0],"texture":[3.9,3.9,63,3.9,3.9,63,3.9,3.9]},"detail5":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":-70,"z":5},"position":{"x":[0,0,0,0,0],"y":[-160,-145,-140,-50,0],"z":[0,0,0,0,0]},"width":[0,3,2,5,6],"height":[0,3,2,5,6],"texture":[16.9,3.9,8.2,63]},"detail6":{"section_segments":6,"offset":{"x":0,"y":-67,"z":21},"position":{"x":[0,0,0,0,0,0,0],"y":[-30,-30,-12,25,30,70],"z":[-7,-7,2,2,3,10]},"width":[0,8,15,15,10,9],"height":[0,8,9,9,9,4],"propeller":false,"texture":[7,9,15,4,63]},"detail7":{"section_segments":6,"offset":{"x":0,"y":35,"z":25},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-50,-45,-10,5,50,40],"z":[0,0,0,0,0,0,0]},"width":[0,17,17,17,15,15,0],"height":[0,15,15,15,10,10,0],"angle":0,"propeller":true,"texture":[3.9,17,18,1.9,11.9,16.9]},"detail8":{"section_segments":6,"offset":{"x":0,"y":35,"z":28},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[25,25,20,20,25],"height":[20,20,15,15,20],"angle":0,"texture":[3.9]},"detail9":{"section_segments":6,"offset":{"x":0,"y":50,"z":28},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[25,25,20,20,25],"height":[20,20,15,15,20],"angle":0,"texture":[3.9]},"detail10":{"section_segments":6,"offset":{"x":0,"y":65,"z":28},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[25,25,20,20,25],"height":[20,20,15,15,20],"angle":0,"texture":[3.9]},"detail11":{"section_segments":6,"offset":{"x":15,"y":50,"z":40},"position":{"x":[-10,-10,-10,0,0,0,0],"y":[-60,-60,-40,-20,35,30],"z":[-5,-5,-5,0,0,0,0]},"width":[0,3,3,3,3,0],"height":[0,3,3,3,3,0],"angle":0,"texture":[0.9,0.9,0.9,0.9,16.9],"propeller":true},"detail12":{"section_segments":6,"offset":{"x":20,"y":40,"z":-25},"position":{"x":[0,0,0,0,0,0,0],"y":[-49,-49,-10,5,37,40,30],"z":[5,5,0,0,0,0,0]},"width":[0,20,20,15,15,13,0],"height":[0,15,15,10,10,8,0],"angle":0,"propeller":true,"texture":[63,16.9,3.9,18,63,16.9]},"detail13":{"section_segments":8,"offset":{"x":25,"y":3,"z":5},"position":{"x":[0,0,0,0,0,0],"y":[-30,-30,-25,25,30,30],"z":[0,0,0,0,0,0]},"width":[0,5,10,10,5,0],"height":[0,5,10,10,5,0],"texture":[63,63,15,63,63]},"detail14":{"section_segments":6,"offset":{"x":5,"y":-33,"z":17},"position":{"x":[0,0,0,0,0,0],"y":[-3,1,3,3,-3,-3],"z":[0,0,0,0,0,0]},"width":[15,15,15,12,12,15],"height":[15,15,15,12,12,15],"texture":[3.9,63,3.9]},"detail15":{"section_segments":10,"offset":{"x":0,"y":30,"z":-5},"position":{"x":[0,0,0,0,0,0,0],"y":[0,12,12,10,12,12],"z":[0,0,0,0,0,0,0]},"width":[12,12,10,7,4,0],"height":[12,12,10,7,4,0],"texture":[4,4,17,4,18],"vertical":true},"detail16":{"section_segments":[45,135,225,315],"offset":{"x":2,"y":20,"z":60},"position":{"x":[0,0,0,0,0],"y":[-5,-5,14,16,16],"z":[0,0,0,0,0]},"width":[0,3,3,2,0],"height":[0,24,24,21,0],"texture":[63,17,63],"angle":30,"vertical":true},"detail17":{"section_segments":6,"offset":{"x":5,"y":-25,"z":17},"position":{"x":[0,0,0,0,0,0],"y":[-3,1,3,3,-3,-3],"z":[0,0,0,0,0,0]},"width":[15,15,15,12,12,15],"height":[15,15,15,12,12,15],"texture":[3.9,63,3.9]},"detail18":{"section_segments":6,"offset":{"x":0,"y":5,"z":110},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[13,13,9,9,13],"height":[35,35,28,28,35],"texture":[3.9,16.9,3.9],"vertical":true},"detail19":{"section_segments":6,"angle":90,"offset":{"x":1,"y":151,"z":-15},"position":{"x":[1,1,0,0,-5,-5],"y":[-1,-1,24,39,50,50],"z":[0,0,0,0,0,0]},"width":[0,10,15,10,6,0],"height":[0,2,3,2,1,0],"texture":[3.9,11,63,3.9]},"detail20":{"section_segments":10,"offset":{"x":0,"y":-14,"z":-145},"position":{"x":[0,0,0,0,0,0,0],"y":[0,12,12,10,12,12],"z":[0,0,0,0,0,0,0]},"width":[10,10,8,5,3,0],"height":[10,10,8,5,3,0],"texture":[4,63,17,4,4],"vertical":true}},"wings":{"detail":{"length":[5,18,8],"width":[35,30,25,10],"angle":[-20,-20,-20],"position":[-10,-9,2,13],"doubleside":true,"texture":[3,3.25,63],"bump":{"position":0,"size":5},"offset":{"x":20,"y":0,"z":-3}}},"typespec":{"name":"Narwhal","level":6,"model":1,"code":601,"specs":{"shield":{"capacity":[425,500],"reload":[12,14]},"generator":{"capacity":[225,275],"reload":[45,60]},"ship":{"mass":500,"speed":[85,100],"rotation":[80,105],"acceleration":[90,100],"dash":{"rate":3,"burst_speed":[185,230],"speed":[175,225],"acceleration":[95,110],"initial_energy":[75,100],"energy":[100,125]}}},"shape":[8.51,4.896,3.705,2.899,2.168,1.826,1.615,1.51,1.53,1.474,1.578,1.626,1.695,1.801,1.877,1.936,1.571,1.702,1.835,1.976,2.27,2.862,6.106,6.256,6.138,5.961,6.138,6.256,6.119,2.862,2.27,1.976,1.835,1.702,1.571,1.936,1.877,1.801,1.695,1.626,1.578,1.474,1.53,1.51,1.615,1.826,2.168,2.899,3.705,4.896],"lasers":[],"radius":8.51}}';
var Orca_602 = '{"name":"Orca","level":6,"model":2,"size":1.65,"zoom":1.2,"specs":{"shield":{"capacity":[350,450],"reload":[11,14]},"generator":{"capacity":[375,450],"reload":[75,100]},"ship":{"mass":420,"speed":[70,85],"rotation":[40,65],"acceleration":[130,150],"dash":{"rate":7,"burst_speed":[175,225],"speed":[140,180],"acceleration":[95,110],"initial_energy":[75,100],"energy":[75,125]}}},"bodies":{"detail":{"section_segments":8,"offset":{"x":0,"y":-50,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-120,-118,-114,-75,-30,10,70,100,140,190,225,240,240],"z":[3,3,7,10,7,5,0,0,-5,-15,-20,-30,-30]},"width":[0,14,21,38,40,41,39,35,28,20,12,10,0],"height":[0,5,10,25,40,40,41,40,33,20,7,5,0],"texture":[4,4,4,4,4,4,4,4,10.24,4,4]},"detail2":{"section_segments":[45,135,225,-90,315],"offset":{"x":30,"y":-50,"z":-8},"position":{"x":[-30,-30,-30,-30,-30,-30,0,-7,-11,-12],"y":[-127,-115,-80,-30,0,20,50,90,130,130],"z":[-6,-10,-10,-15,0,0,-6,9,5,5]},"width":[8,20,27,26,30,35,15,15,12,0],"height":[0,7,13,15,40,40,20,23,14,0],"texture":[-10]},"detail3":{"section_segments":10,"angle":65,"offset":{"x":29.5,"y":20,"z":105},"position":{"x":[0,0,0,0],"y":[-5,-5,5,5],"z":[0,0,0,0]},"width":[0,5,5,0],"height":[0,15,15,0],"texture":[3.9,3.9,-10],"vertical":true},"detail4":{"section_segments":6,"offset":{"x":0,"y":-30,"z":48},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-70,-78,-75,-65,-65,-15,-15,41,41],"z":[10,10,10,10,0,0,-5,-5,-5]},"width":[0,8,10,10,0,0,18,18,0],"height":[0,8,10,10,0,0,14,14,0],"texture":[12.9,17,63,2.9,0,2.9,10,18],"laser":{"damage":[37,50],"rate":7,"type":2,"speed":[130,180],"number":1,"error":0}},"detail5":{"section_segments":6,"offset":{"x":0,"y":-110,"z":39},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-51,-50,-40,-28,-13,27,27],"z":[-22,-20,-13,-10,-6,4,4]},"width":[0,7,15,18,18,18,0],"height":[0,5,4,6,8,5,0],"propeller":false,"texture":[6.9,9,9,9,8,3.9]},"detail6":{"section_segments":6,"offset":{"x":0,"y":-110,"z":38},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-54,-50,-40,-28,-13,30,30],"z":[-22,-20,-13,-10,-6,4,4]},"width":[0,11,18,21,21,21,0],"height":[0,5,4,6,8,5,0],"propeller":false,"texture":[1.9]},"detail7":{"section_segments":4,"offset":{"x":0,"y":120,"z":16},"position":{"x":[0,0,0,0],"y":[-30.5,-30.5,20.5,20.5],"z":[6,6,-15,-15]},"width":[0,14,10,0],"height":[0,7,4,0],"propeller":false,"texture":[3.9]},"detail8":{"section_segments":6,"offset":{"x":0,"y":-147,"z":-12},"position":{"x":[0,0,0,0,0],"y":[-27,-22,7,12,12],"z":[0,0,5,15,15]},"width":[0,13,20,20,0],"height":[0,3,3,3,0],"texture":[63]},"detail9":{"section_segments":12,"offset":{"x":0,"y":-80,"z":58},"position":{"x":[0,0,0,0],"y":[-88,-88,20,20],"z":[0,0,0,0]},"width":[0,5,5,0],"height":[0,5,5,0],"texture":[17],"angle":180},"detail10":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":-9,"z":40.5},"position":{"x":[20,-10,-20,-10,20],"y":[-41,-28.5,0,28.5,41],"z":[-36,-11,0.7,-11,-36]},"width":[0,20,35,20,0],"height":[0,3,5,3,0],"texture":[63],"angle":90},"detail11":{"section_segments":6,"offset":{"x":0,"y":-5,"z":52},"position":{"x":[0,0,0,0,0,0],"y":[-39,-39,-29,5,15,15],"z":[0,0,0,0,0,0]},"width":[0,9,9,9,9,0],"height":[0,15,15,15,15,0],"texture":[3.9,12.9,3.9,12.9,3.9]},"detail12":{"section_segments":8,"offset":{"x":12,"y":-32,"z":31},"position":{"x":[0,0,0,0,0],"y":[-2,2,4,-4,-2],"z":[0,0,0,0,0]},"width":[15,15,12,12,15],"height":[15,15,12,12,15],"texture":[4,17]},"detail13":{"section_segments":8,"offset":{"x":11,"y":-17,"z":31},"position":{"x":[0,0,0,0,0],"y":[-2,2,4,-4,-2],"z":[0,0,0,0,0]},"width":[15,15,12,12,15],"height":[15,15,12,12,15],"texture":[4,17]},"detail14":{"section_segments":8,"offset":{"x":11,"y":-2,"z":31},"position":{"x":[0,0,0,0,0],"y":[-2,2,4,-4,-2],"z":[0,0,0,0,0]},"width":[15,15,12,12,15],"height":[15,15,12,12,15],"texture":[4,17]},"detail15":{"section_segments":[45,135,225,315],"offset":{"x":17,"y":35,"z":62},"position":{"x":[0,0,0,0,0,0],"y":[-7,-7,6,5,5,5],"z":[0,0,0,0,-9,-9]},"width":[0,10,10,7,7,0],"height":[0,20,20,16,4,0],"texture":[4,4,63,15,17],"vertical":true,"angle":20},"detail16":{"section_segments":[45,135,225,315],"offset":{"x":4,"y":25,"z":45},"position":{"x":[0,0,0,0,0],"y":[-30,-30,10,30,30],"z":[0,0,0,-20,-20]},"width":[0,3,3,3,0],"height":[0,3,3,3,0],"texture":[4,8,1]},"detail17":{"section_segments":6,"offset":{"x":0,"y":173,"z":-30},"position":{"x":[0,0,0,0],"y":[-10,-10,25,15],"z":[0,0,0,0]},"width":[0,30,20,0],"height":[0,6,6,0],"angle":0,"propeller":true,"texture":[63,16.9,16.9]}},"wings":{"detail":{"doubleside":true,"offset":{"x":0,"y":-85,"z":30},"length":[75,10],"width":[50,25,15],"angle":[-30,0],"position":[0,40,50],"texture":[3.35,63],"bump":{"position":25,"size":20}},"detail2":{"doubleside":true,"offset":{"x":0,"y":-35,"z":20},"length":[0,75,20],"width":[50,70,20,0],"angle":[90,90,90],"position":[0,0,30,45],"texture":[63],"bump":{"position":0,"size":15}},"detail3":{"doubleside":true,"offset":{"x":0,"y":10,"z":40},"length":[15],"width":[80,30],"angle":[-16],"position":[30,-5],"texture":[4],"bump":{"position":-30,"size":4}},"detail4":{"doubleside":true,"offset":{"x":0,"y":10,"z":39.5},"length":[20],"width":[100,30],"angle":[-16],"position":[30,-5],"texture":[63],"bump":{"position":0,"size":1}},"detail5":{"doubleside":true,"offset":{"x":0,"y":165,"z":-25},"length":[42,7,8],"width":[50,22,20,10],"angle":[0,0,0],"position":[0,20,25,33],"texture":[3.5,63],"bump":{"position":30,"size":25}},"detail6":{"doubleside":true,"offset":{"x":0,"y":-36,"z":20},"length":[0,75,20],"width":[50,70,20,0],"angle":[90,90,90],"position":[0,0,30,45],"texture":[4],"bump":{"position":0,"size":15}},"detail7":{"doubleside":true,"offset":{"x":0,"y":-84,"z":30},"length":[75,10],"width":[50,25,15],"angle":[-30,0],"position":[0,40,50],"texture":[0.9,63],"bump":{"position":25,"size":20}},"detail8":{"doubleside":true,"offset":{"x":0,"y":166,"z":-25},"length":[42,7,8],"width":[50,22,20,10],"angle":[0,0,0],"position":[0,20,25,33],"texture":[63],"bump":{"position":30,"size":25}}},"typespec":{"name":"Orca","level":6,"model":2,"code":602,"specs":{"shield":{"capacity":[350,450],"reload":[11,14]},"generator":{"capacity":[375,450],"reload":[75,100]},"ship":{"mass":420,"speed":[70,85],"rotation":[40,65],"acceleration":[130,150],"dash":{"rate":7,"burst_speed":[175,225],"speed":[140,180],"acceleration":[95,110],"initial_energy":[75,100],"energy":[75,125]}}},"shape":[5.847,5.753,4.948,4.088,3.082,2.839,2.846,2.863,2.843,2.822,2.66,1.435,1.482,1.485,1.467,1.492,1.544,1.625,1.744,1.921,2.163,2.539,3.027,6.99,6.596,6.547,6.596,6.99,3.027,2.539,2.163,1.921,1.744,1.625,1.544,1.492,1.467,1.483,1.485,1.435,2.66,2.822,2.843,2.863,2.846,2.839,3.082,4.088,4.948,5.753],"lasers":[{"x":0,"y":-3.564,"z":1.584,"angle":0,"damage":[37,50],"rate":7,"type":2,"speed":[130,180],"number":1,"spread":0,"error":0,"recoil":0}],"radius":6.99}}';
var Octopus_603 = '{"name":"Octopus","level":6,"model":3,"size":1.22,"zoom":1.2,"specs":{"shield":{"capacity":[300,400],"reload":[8,10]},"generator":{"capacity":[275,350],"reload":[75,125]},"ship":{"mass":450,"speed":[85,95],"rotation":[50,70],"acceleration":[55,75]}},"bodies":{"detail":{"section_segments":8,"offset":{"x":0,"y":-160,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-83,-86,-82,-72,-75,-55,-30,20,50,68,105,125,170,175,165],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,7,7,13,29,40,40,33,22,22,28,28,25,0],"height":[0,5,7,7,13,29,40,40,33,22,22,28,28,25,0],"texture":[3,17,4,63,63,4,2,3,4,63,4,15,4,17],"propeller":true,"laser":{"damage":[8,11],"rate":1.5,"type":1,"speed":[90,120],"number":20,"recoil":20,"error":0}},"detail2":{"section_segments":12,"offset":{"x":0,"y":-77,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[-20,-15,10,60,65,-5,-15],"z":[0,0,0,0,0,0,0]},"width":[0,35,50,65,57,45,0],"height":[0,35,50,65,57,45,0],"propeller":false,"texture":[4,4,1,63,4]},"detail3":{"section_segments":6,"offset":{"x":56,"y":52,"z":0},"position":{"x":[-22,-18,5,27,31,31,31],"y":[-140,-120,-40,-10,120,150,155],"z":[0,0,0,0,0,0,0,0]},"width":[2,25,20,16,10,7,0],"height":[2,25,20,16,10,7,0],"texture":[3.9,12.9,3.9,63,3.9,3.9],"angle":0,"propeller":false},"detail4":{"section_segments":6,"offset":{"x":0,"y":52,"z":56},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-140,-120,-40,-10,120,150,155],"z":[-22,-18,5,27,31,31,31]},"width":[2,24,19,15,9,6,0],"height":[2,25,20,16,10,7,0],"texture":[3.9,12.9,3.9,63,3.9,3.9],"angle":0,"propeller":false},"detail5":{"section_segments":6,"offset":{"x":0,"y":52,"z":-56},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-140,-120,-40,-10,120,150,155],"z":[22,18,-5,-27,-31,-31,-31]},"width":[2,24,19,15,9,6,0],"height":[2,25,20,16,10,7,0],"texture":[3.9,12.9,3.9,63,3.9,3.9],"angle":0,"propeller":false},"detail6":{"section_segments":[45,135,225,315],"offset":{"x":33,"y":52,"z":-25},"position":{"x":[-20,-20,-9,-7,-5,-5,-5],"y":[-110,-120,-40,-10,80,110,115],"z":[8,8,-2.5,-13.5,-15.5,-15.5,-15.5]},"width":[2,25,20,16,10,7,0],"height":[2,25,20,16,10,7,0],"texture":[2.9,10,3.9,8,2.9,2.9],"angle":0,"propeller":false},"detail7":{"section_segments":[45,135,225,315],"offset":{"x":33,"y":52,"z":25},"position":{"x":[-20,-20,-9,-7,-5,-5,-5],"y":[-110,-120,-40,-10,80,110,115],"z":[-8,-8,2.5,13.5,15.5,15.5,15.5]},"width":[2,25,20,16,10,7,0],"height":[2,25,20,16,10,7,0],"texture":[2.9,10,3.9,8,2.9,2.9],"angle":0,"propeller":false},"detail8":{"section_segments":6,"offset":{"x":0,"y":-90,"z":50},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-51,-50,-40,-28,-13,35,35],"z":[-25,-23,-10,-5,0,0,0]},"width":[0,2,8,14,17,17,0],"height":[0,5,4,6,7,7,0],"propeller":false,"texture":[6.9,9,9,9,8,3.9]},"detail9":{"section_segments":6,"offset":{"x":0,"y":-90,"z":49},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-51,-50,-40,-28,-13,35,35],"z":[-25,-23,-10,-5,0,0,0]},"width":[0,5,13,17,20,20,0],"height":[0,5,4,6,7,7,0],"propeller":false,"texture":[2]},"detail10":{"section_segments":4,"offset":{"x":31,"y":-165,"z":8},"position":{"x":[0,0,0,0,0,0],"y":[-17,-17,-12,12,17,17],"z":[0,0,0,0,0,0]},"width":[0,7,7,7,7,0],"height":[0,17,17,17,17,0],"texture":[4,63,4,63,4]},"detail11":{"section_segments":8,"offset":{"x":10,"y":-165,"z":17},"position":{"x":[0,0,0,0,0,0],"y":[-17,-17,-12,12,17,17],"z":[0,0,0,0,0,0]},"width":[0,20,20,20,20,0],"height":[0,20,20,20,20,0],"texture":[3.9,63,4,63,3.9]},"detail12":{"section_segments":4,"offset":{"x":31,"y":-165,"z":-8},"position":{"x":[0,0,0,0,0,0],"y":[-17,-17,-12,12,17,17],"z":[0,0,0,0,0,0]},"width":[0,7,7,7,7,0],"height":[0,17,17,17,17,0],"texture":[4,63,4,63,4]},"detail13":{"section_segments":8,"offset":{"x":10,"y":-165,"z":-17},"position":{"x":[0,0,0,0,0,0],"y":[-17,-17,-12,12,17,17],"z":[0,0,0,0,0,0]},"width":[0,20,20,20,20,0],"height":[0,20,20,20,20,0],"texture":[4,63,4,63,4]},"detail14":{"section_segments":6,"offset":{"x":0,"y":52,"z":55},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-140,-120,-40,-10,120,150,155],"z":[-22,-18,5,27,31,31,31]},"width":[2,25,20,16,10,7,0],"height":[2,25,20,16,10,7,0],"texture":[12.9],"angle":0,"propeller":false},"detail15":{"section_segments":6,"offset":{"x":0,"y":52,"z":-55},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-140,-120,-40,-10,120,150,155],"z":[22,18,-5,-27,-31,-31,-31]},"width":[2,25,20,16,10,7,0],"height":[2,25,20,16,10,7,0],"texture":[12.9],"angle":0,"propeller":false},"detail16":{"section_segments":[45,135,225,315],"offset":{"x":32,"y":52,"z":-24},"position":{"x":[-20,-20,-9,-7,-5,-5,-5],"y":[-110,-120,-40,-10,80,110,115],"z":[8,8,-2.5,-13.5,-15.5,-15.5,-15.5]},"width":[2,25,20,16,10,7,0],"height":[2,25,20,16,10,7,0],"texture":[12.9],"angle":0,"propeller":false},"detail17":{"section_segments":[45,135,225,315],"offset":{"x":32,"y":52,"z":24},"position":{"x":[-20,-20,-9,-7,-5,-5,-5],"y":[-110,-120,-40,-10,80,110,115],"z":[-8,-8,2.5,13.5,15.5,15.5,15.5]},"width":[2,25,20,16,10,7,0],"height":[2,25,20,16,10,7,0],"texture":[12.9],"angle":0,"propeller":false},"detail18":{"section_segments":6,"offset":{"x":55,"y":52,"z":0},"position":{"x":[-22,-18,5,27,31,31,31],"y":[-140,-120,-40,-10,120,150,155],"z":[0,0,0,0,0,0,0,0]},"width":[2,25,20,16,10,7,0],"height":[2,25,20,16,10,7,0],"texture":[12.9],"angle":0,"propeller":false},"detail19":{"section_segments":12,"offset":{"x":0,"y":-30,"z":0},"position":{"x":[0,0,0,0,0],"y":[-10,10,10,-10,-10],"z":[0,0,0,0,0]},"width":[70,75,60,60,70],"height":[70,75,60,60,70],"texture":[4],"angle":0,"propeller":false},"detail20":{"section_segments":8,"offset":{"x":0,"y":0,"z":100},"position":{"x":[0,0,0,0,0],"y":[-5,5,5,-5,-5],"z":[0,0,0,0,0]},"width":[55,55,47,47,55],"height":[100,100,92,92,100],"texture":[63],"vertical":true,"propeller":false},"detail21":{"section_segments":6,"offset":{"x":0,"y":0,"z":100},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[52,52,44,44,52],"height":[80,80,72,72,80],"texture":[16.9,3.9],"vertical":true,"angle":45},"detail22":{"section_segments":6,"offset":{"x":0,"y":0,"z":100},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[52,52,44,44,52],"height":[80,80,72,72,80],"texture":[16.9,3.9],"vertical":true,"angle":-45},"detail23":{"section_segments":10,"offset":{"x":0,"y":-10,"z":0},"position":{"x":[0,0,0,0,0],"y":[-10,10,10,-10,-10],"z":[0,0,0,0,0]},"width":[80,85,70,70,80],"height":[80,85,70,70,80],"texture":[11]},"detail24":{"section_segments":6,"offset":{"x":0,"y":-164,"z":25},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[25,25,20,20,25],"height":[20,20,15,15,20],"texture":[63]}},"wings":{"detail":{"length":[0,45],"width":[0,60,40],"angle":[45,45,45],"position":[0,0,0],"doubleside":true,"texture":[63],"bump":{"position":0,"size":25},"offset":{"x":0,"y":-100,"z":0}},"detail2":{"length":[0,45],"width":[0,60,40],"angle":[-45,-45,-45],"position":[0,0,0],"doubleside":true,"texture":[63],"bump":{"position":0,"size":25},"offset":{"x":0,"y":-100,"z":0}}},"typespec":{"name":"Octopus","level":6,"model":3,"code":603,"specs":{"shield":{"capacity":[300,400],"reload":[8,10]},"generator":{"capacity":[275,350],"reload":[75,125]},"ship":{"mass":450,"speed":[85,95],"rotation":[50,70],"acceleration":[55,75]}},"shape":[6.004,5.692,4.863,3.601,3.002,2.279,2.207,2.066,1.967,1.958,1.92,1.93,1.971,1.972,2.122,2.457,2.685,2.901,3.22,3.679,4.342,5.35,5.479,4.066,4.132,5.051,4.132,4.066,5.479,5.35,4.342,3.679,3.22,2.901,2.685,2.457,2.122,1.912,1.972,1.93,1.92,1.958,1.967,2.066,2.207,2.279,3.002,3.601,4.863,5.692],"lasers":[{"x":0,"y":-6.002,"z":0,"angle":0,"damage":[8,11],"rate":1.5,"type":1,"speed":[90,120],"number":20,"spread":0,"error":0,"recoil":20}],"radius":6.004}}';
var Beaked_whale_604 = '{"name":"Beaked whale","level":6,"model":4,"size":2.25,"zoom":1.15,"specs":{"shield":{"capacity":[275,325],"reload":[8,10]},"generator":{"capacity":[400,475],"reload":[85,120]},"ship":{"mass":240,"speed":[70,80],"rotation":[50,70],"acceleration":[90,105]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":20,"z":5},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-150,-150,-145,-120,-108,-81,-55,-30,0,15,45,45,35],"z":[-5,-5,-5,-2,0,0,0,0,0,-2,-5,-5,-5,-5]},"width":[0,3,5,10,16,22,23,23,22,19,12,11,0],"height":[0,2,4,8,12,18,22,25,23,20,8,7,0],"texture":[63,63,10.245,9,9,8.2,4,10.245,15,11,4]},"detail2":{"section_segments":6,"offset":{"x":0,"y":80,"z":-9},"position":{"x":[0,0,0,0,0],"y":[-20,-20,-10,15,5],"z":[0,0,0,0,0]},"width":[0,5,12,12,0],"height":[0,3,6,5,0],"angle":0,"propeller":true,"texture":[3.9,63,18,16.9]},"detail3":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":80,"z":0},"position":{"x":[0,0,0,0],"y":[-22,-22,15,15],"z":[2,2,-10,-10]},"width":[0,10,2,0],"height":[0,6,5,0],"angle":0,"texture":[3.9,18.2]},"detail4":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":-100,"z":-2},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-33,-33,-20,13,35,60,100,120,140,150,150],"z":[-2,-2,-2,0,0,0,0,0,0,0,0]},"width":[0,4,10,21,27,29,25,20,10,3,0],"height":[0,2,4,14,20,22,27,25,20,16,0],"angle":0,"texture":[3.9]},"detail5":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":-55,"z":26},"position":{"x":[0,0,0,0,0],"y":[-32,-32,-5,20,20],"z":[-10,-10,-4.5,-1,-1]},"width":[0,1,4,4,0],"height":[0,3,3,3,0],"angle":0,"texture":[63]},"detail6":{"section_segments":8,"angle":0,"offset":{"x":0,"y":-25,"z":25},"position":{"x":[0,0,0,0,0,0],"y":[-15,-15,-12,12,15,15],"z":[0,0,0,0,0,0]},"width":[0,5,7,7,5,0],"height":[0,5,7,7,5,0],"texture":[63,63,4,63,63]},"detail7":{"section_segments":6,"angle":0,"offset":{"x":5,"y":-30,"z":20},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[10,10,7,7,10],"height":[10,10,7,7,10],"texture":[63]},"detail8":{"section_segments":6,"angle":0,"offset":{"x":5,"y":-20,"z":20},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[10,10,7,7,10],"height":[10,10,7,7,10],"texture":[63]},"detail9":{"section_segments":6,"angle":0,"offset":{"x":17,"y":-45,"z":18},"position":{"x":[0,0,0,0,0,0],"y":[-25,-25,-17,17,25,25],"z":[0,0,0,0,0,0]},"width":[0,5,7,7,5,0],"height":[0,5,7,7,5,0],"texture":[3.9,3.9,12.9,3.9,3.9]},"detail10":{"section_segments":[45,135,225,315],"offset":{"x":15,"y":-65,"z":15},"position":{"x":[0,0,0,0,0],"y":[-10,-25,-20,20,20],"z":[0,0,0,0,0]},"width":[0,2,3,3,0],"height":[0,3,4,4,0],"angle":-8,"texture":[3,17,2,63]},"detail11":{"section_segments":6,"angle":0,"offset":{"x":20,"y":-60,"z":14},"position":{"x":[0,0,0,0,0,0],"y":[-12,-12,-7,7,12,12],"z":[0,0,0,0,0,0]},"width":[0,3,7,7,3,0],"height":[0,2,3,3,2,0],"texture":[63,63,10,63]},"detail15":{"section_segments":[0,175,-125],"offset":{"x":0,"y":20,"z":15},"position":{"x":[20.5,10,7,10],"y":[-30,0,15,45],"z":[3,7,2,-11]},"width":[0,12,12,0],"height":[0,8,8,0],"texture":[3.1]},"detail16":{"section_segments":[0,175,-125],"offset":{"x":0,"y":20,"z":15},"position":{"x":[10,7,10,20.5],"y":[-45,-15,0,30],"z":[-11,2,7,3]},"width":[0,12,12,0],"height":[0,8,8,0],"texture":[3.1],"angle":180},"detail17":{"section_segments":6,"offset":{"x":20,"y":-25,"z":-14},"position":{"x":[0,0,0,0,0],"y":[-10,-10,0,25,20],"z":[0,0,0,0,0]},"width":[0,5,12,12,0],"height":[0,3,6,5,0],"angle":0,"propeller":true,"texture":[3.9,63,3.9,16.9]},"detail18":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":-100,"z":-3},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-33,-33,-20,13,35,60,100,120,140,150,150],"z":[-12,-12,-12,0,0,0,0,0,0,0,0]},"width":[0,2,8,19,25,27,23,18,8,1,0],"height":[0,2,4,14,20,22,27,25,20,16,0],"angle":0,"texture":[2.9]},"detail19":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":-100,"z":-2},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-31,-31,-20,13,35,60,100,120,140,145,145],"z":[-12,-12,-12,0,0,0,0,0,0,0,0]},"width":[0,2,6,17,23,25,21,16,6,1,0],"height":[0,2,4,14,20,22,27,25,20,16,0],"angle":0,"texture":[63]},"detail20":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":40,"z":15},"position":{"x":[0,0],"y":[-2,2],"z":[0,0]},"width":[2,2],"height":[2,2],"angle":0,"texture":[5],"laser":{"damage":[100,125],"rate":0.9,"type":1,"speed":[220,260],"number":2,"angle":8,"error":0}}},"wings":{"detail":{"length":[8,0,10,18,5],"width":[20,20,35,35,20,7],"angle":[0,0,-10,-30,-30],"position":[-18,-18,-18,-10,10,15],"doubleside":true,"texture":[4,4,17,63,63],"bump":{"position":-25,"size":12},"offset":{"x":0,"y":105,"z":-3}},"detail2":{"length":[8,0,10,18,5],"width":[20,20,35,35,20,7],"angle":[0,0,-10,-30,-30],"position":[-18,-18,-18,-10,10,15],"doubleside":true,"texture":[1,4,4,11,63],"bump":{"position":-25,"size":12},"offset":{"x":0,"y":106,"z":-3}},"detail3":{"length":[0,10,14,5],"width":[0,15,30,25,15],"angle":[-30,-30,-40,-40],"position":[-15,-15,-10,0,5],"doubleside":true,"texture":[63,63,2,17],"bump":{"position":40,"size":15},"offset":{"x":15,"y":-15,"z":5}},"detail4":{"length":[0,10,14,8],"width":[0,18,33,28,15],"angle":[-30,-30,-40,-42],"position":[-15,-15,-10,0,8],"doubleside":true,"texture":[4],"bump":{"position":40,"size":15},"offset":{"x":15,"y":-15,"z":4}},"detail5":{"length":[5,18,8],"width":[35,45,25,10],"angle":[90,90,90],"position":[-10,-9,2,13],"doubleside":true,"texture":[4,4,63],"bump":{"position":30,"size":12},"offset":{"x":0,"y":30,"z":10}},"detail6":{"length":[0,1,18],"width":[0,29,29,0],"angle":[0,2,-7],"position":[0,0,0,11.5],"doubleside":true,"texture":[1],"bump":{"position":40,"size":19},"offset":{"x":0,"y":-72,"z":17}}},"typespec":{"name":"Beaked whale","level":6,"model":4,"code":604,"specs":{"shield":{"capacity":[275,325],"reload":[8,10]},"generator":{"capacity":[400,475],"reload":[85,120]},"ship":{"mass":240,"speed":[70,80],"rotation":[50,70],"acceleration":[90,105]}},"shape":[5.853,5.218,4.037,3.294,2.693,2.068,2.008,1.981,1.938,1.896,1.886,1.831,1.788,1.775,0.914,0.947,1.006,1.08,1.194,1.323,1.488,1.719,2.065,5.736,5.24,4.321,5.24,5.736,2.065,1.719,1.488,1.323,1.194,1.08,1.006,0.947,0.914,1.775,1.788,1.831,1.886,1.896,1.938,1.981,2.008,2.068,2.693,3.294,4.037,5.218],"lasers":[{"x":0,"y":1.672,"z":0.66,"angle":0,"damage":[100,125],"rate":0.9,"type":1,"speed":[220,260],"number":2,"spread":8,"error":0,"recoil":0}],"radius":5.853}}';
var Shark_605 = '{"name":"Shark","level":6,"model":5,"size":2.2,"zoom":1.3,"specs":{"shield":{"capacity":[275,375],"reload":[7,10]},"generator":{"capacity":[250,325],"reload":[75,100]},"ship":{"mass":300,"speed":[85,100],"rotation":[80,95],"acceleration":[65,85]}},"bodies":{"detail":{"section_segments":8,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-106,-105,-89,-75,-30,0,50,85,100,100],"z":[-10,-10,-13,0,0,0,0,0,5,5]},"width":[0,8,13,19,24,17,13,2,1,0],"height":[0,4,8,25,30,30,25,12,4,0],"texture":[2]},"detail2":{"section_segments":6,"offset":{"x":0,"y":0,"z":5},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-130,-130,-120,-99,-65,-30,0,50,85,105,105],"z":[7,7,7,11,6,0,0,0,0,0,0]},"width":[0,5,12,22,27,28,22,16,3,2,0],"height":[0,4,7,12,22,27,27,21,7,7,0],"texture":[63,63,10.24,11,1.9,8.2,11,63,16.9,3.9]},"detail3":{"section_segments":6,"offset":{"x":0,"y":-82,"z":-7},"position":{"x":[0,0,0,0,0],"y":[-22,-20,-7,2,2],"z":[0,0,0,15,15]},"width":[0,8,12,14,0],"height":[0,3,3,3,0],"texture":[63]},"detail4":{"section_segments":6,"offset":{"x":0,"y":-82,"z":8},"position":{"x":[0,0,0,0],"y":[-22,-20,20,20],"z":[0,0,-12,-12]},"width":[0,8,20,0],"height":[0,4,4,0],"texture":[63]},"detail5":{"section_segments":4,"angle":10,"offset":{"x":7,"y":-95.5,"z":-5},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,1,0.5,1,0.5,1,0.5,1,0.5,1,0.5,1,0],"height":[0,3,1,3,1,3,1,3,1,3,1,3,0],"texture":[2]},"detail6":{"section_segments":4,"angle":90,"offset":{"x":0,"y":-101,"z":-5},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,1,0.5,1,0.5,1,0.5,1,0.5,1,0.5,1,0],"height":[0,3,1,3,1,3,1,3,1,3,1,3,0],"texture":[2]},"detail7":{"section_segments":4,"angle":10,"offset":{"x":7,"y":-95.5,"z":1.5},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6],"z":[3,2.8,2.5,2.3,2,1.8,1.5,1.2,1,0.7,0.5,0.2,0,-0.3]},"width":[0,1,0.5,1,0.5,1,0.5,1,0.5,1,0.5,1,0],"height":[0,3,1,3,1,3,1,3,1,3,1,3,0],"texture":[2]},"detail8":{"section_segments":4,"angle":90,"offset":{"x":0,"y":-101,"z":3.5},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,1,0.5,1,0.5,1,0.5,1,0.5,1,0.5,1,0],"height":[0,3,1,3,1,3,1,3,1,3,1,3,0],"texture":[2]},"detail19":{"section_segments":6,"offset":{"x":0,"y":-60,"z":25},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-28,-28,-15,5,25,31,70,73,73],"z":[2,2,0,0,-1,2,1,1,1]},"width":[0,4,10,13,13,8,8,6,0],"height":[0,4,8,9,9,6,6,5,0],"propeller":false,"texture":[7,7,9,13,4,63]},"detail10":{"section_segments":6,"offset":{"x":0,"y":0,"z":4},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-129,-129,-120,-99,-65,-30,0,50,85,104,104],"z":[7,7,7,11,6,0,0,0,0,0,0]},"width":[0,4,11,21,26,27,21,15,2,1,0],"height":[0,4,7,12,22,27,27,21,7,7,0],"texture":[1.9]},"detail11":{"section_segments":6,"offset":{"x":25,"y":-15,"z":-28},"position":{"x":[0,0,0,0,0,0],"y":[-20,-20,-15,-15,10,0],"z":[0,0,0,0,0,0]},"width":[0,9,10,9,8,0],"height":[0,6,7,6,5,0],"angle":0,"propeller":true,"texture":[63,63,63,16.9,16.9]},"detail12":{"section_segments":6,"offset":{"x":32,"y":-25,"z":-20},"position":{"x":[0,0,0,0,0,0,0],"y":[-20,-25,-20,-8,5,20,22],"z":[0,0,0,0,0,0,0]},"width":[0,3,4,5,7,6,0],"height":[0,3,4,5,7,6,0],"angle":0,"laser":{"damage":[32,42],"rate":2.5,"type":1,"speed":[400,500],"number":1,"error":0,"recoil":150},"propeller":false,"texture":[2.9,63,15,3.9,8,3.9]},"detail13":{"section_segments":[0,125,-175],"offset":{"x":0,"y":-50,"z":26},"position":{"x":[-16,-11,-8.5,-8,-19],"y":[-60,-49,-15,20,50],"z":[-7,-0.6,0.65,-3,-7.4]},"width":[0,10,18,20,0],"height":[0,6,8,8,0],"texture":[3.9,3.9,10,3.9]},"detail14":{"section_segments":[0,175,-125],"offset":{"x":0,"y":-50,"z":26},"position":{"x":[16,11,8.5,8,19],"y":[-60,-49,-15,20,50],"z":[-7,-0.6,0.65,-3,-7.4]},"width":[0,10,18,20,0],"height":[0,6,8,8,0],"texture":[4.1,4.1,10,4.1]},"detail15":{"section_segments":6,"angle":0,"offset":{"x":12,"y":30,"z":5},"position":{"x":[0,0,-3,-8,-8],"y":[-30,-30,20,60,60],"z":[4,4,2,0,0]},"width":[0,10,8,2,0],"height":[0,16,14,5,0],"texture":[0.9]},"detail16":{"section_segments":6,"angle":0,"offset":{"x":11,"y":30,"z":5},"position":{"x":[0,0,-3,-8,-8],"y":[-30,-30,20,60,60],"z":[4,4,2,0,0]},"width":[0,10,8,2,0],"height":[0,16,14,5,0],"texture":[0.9,3.9,3.9,0.9]},"detail17":{"section_segments":10,"angle":0,"offset":{"x":0,"y":30,"z":45},"position":{"x":[0,0,0,0,0],"y":[-7,-7,6,7,5],"z":[0,0,0,0,0]},"width":[0,7,7,5,0],"height":[0,7,7,5,0],"texture":[4,4,17,18],"vertical":true},"detail18":{"section_segments":6,"offset":{"x":0,"y":27,"z":25},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-30,-30,-25,-10,0,15,20,20],"z":[0,0,0,0,0,0,0,0]},"width":[0,4,6,6,6,6,4,0],"height":[0,4,6,6,6,6,4,0],"texture":[3.9,3.9,16.9,8.2,15,3.9,3.9]}},"wings":{"detail":{"length":[0,40,15],"width":[0,45,20,10],"angle":[-30,-30,-30],"position":[-15,-15,10,23],"doubleside":true,"texture":[2,2,63],"bump":{"position":-30,"size":10},"offset":{"x":0,"y":-30,"z":-5}},"detail2":{"length":[0,45,5],"width":[0,45,15,10],"angle":[90,90,90],"position":[-15,-15,10,13],"doubleside":true,"texture":[2,2,63],"bump":{"position":-30,"size":10},"offset":{"x":0,"y":-5,"z":15}},"detail3":{"length":[0,10,10,10,10],"width":[0,25,20,17,12,4],"angle":[90,90,90,90,90],"position":[-15,-15,-12,-9,-2,6],"doubleside":true,"texture":[63,63,2,4],"bump":{"position":-30,"size":25},"offset":{"x":0,"y":125,"z":5}},"detail4":{"length":[0,10,10,10,10],"width":[25,25,20,17,12,4],"angle":[-90,-90,-90,-90,-90],"position":[-15,-15,-12,-9,-2,6],"doubleside":true,"texture":[63,63,2,4],"bump":{"position":-30,"size":15},"offset":{"x":0,"y":125,"z":5}},"detail5":{"length":[0,10,10,10,10],"width":[25,25,20,17,12,4],"angle":[90,90,90,90,90],"position":[-15,-15,-12,-9,-2,6],"doubleside":true,"texture":[4],"bump":{"position":-30,"size":20},"offset":{"x":0,"y":123,"z":5}},"detail6":{"length":[0,10,10,10,10],"width":[25,25,20,17,12,4],"angle":[-90,-90,-90,-90,-90],"position":[-15,-15,-12,-9,-2,6],"doubleside":true,"texture":[4],"bump":{"position":-30,"size":15},"offset":{"x":0,"y":123,"z":5}},"detail7":{"length":[25,5],"width":[15,10,7],"angle":[-90,-90],"position":[15,0,1],"doubleside":true,"texture":[4],"bump":{"position":-30,"size":10},"offset":{"x":0,"y":50,"z":-5}},"detail8":{"length":[25,5],"width":[15,10,7],"angle":[90,90],"position":[15,0,1],"doubleside":true,"texture":[4],"bump":{"position":-30,"size":10},"offset":{"x":0,"y":50,"z":5}},"detail9":{"length":[25,5],"width":[15,10,7],"angle":[-50,-50],"position":[5,12,15],"doubleside":true,"texture":[63],"bump":{"position":-30,"size":10},"offset":{"x":0,"y":30,"z":-5}},"detail10":{"length":[0,45,5],"width":[0,45,15,10],"angle":[90,90,90],"position":[-15,-15,10,13],"doubleside":true,"texture":[17,17,63],"bump":{"position":-30,"size":10},"offset":{"x":0,"y":-6,"z":15}}},"typespec":{"name":"Shark","level":6,"model":5,"code":605,"specs":{"shield":{"capacity":[275,375],"reload":[7,10]},"generator":{"capacity":[250,325],"reload":[75,100]},"ship":{"mass":300,"speed":[85,100],"rotation":[80,95],"acceleration":[65,85]}},"shape":[5.723,5.476,4.46,3.229,2.605,2.675,2.455,2.186,2.023,2.071,2.154,2.161,2.112,0.909,0.915,0.938,0.981,1.05,1.137,1.267,1.465,1.775,2.296,2.868,3.968,5.852,3.968,2.868,2.296,1.775,1.465,1.267,1.137,1.05,0.981,0.938,0.915,0.907,2.112,2.161,2.154,2.071,2.023,2.186,2.455,2.675,2.605,3.229,4.46,5.476],"lasers":[{"x":1.408,"y":-2.2,"z":-0.88,"angle":0,"damage":[32,42],"rate":2.5,"type":1,"speed":[400,500],"number":1,"spread":0,"error":0,"recoil":150},{"x":-1.408,"y":-2.2,"z":-0.88,"angle":0,"damage":[32,42],"rate":2.5,"type":1,"speed":[400,500],"number":1,"spread":0,"error":0,"recoil":150}],"radius":5.852}}';
var Grouper_fish_606 = '{"name":"Grouper fish","level":6,"model":6,"size":1.8,"zoom":1.2,"specs":{"shield":{"capacity":[225,325],"reload":[8,11]},"generator":{"capacity":[400,475],"reload":[95,115]},"ship":{"mass":215,"speed":[75,90],"rotation":[70,95],"acceleration":[100,120]}},"bodies":{"detail":{"section_segments":5,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-143,-143,-135,-120,-80,-40,20,40,70,85,100,115,115],"z":[8,8,8,10,0,0,0,0,0,0,0,0,0]},"width":[0,2,9,20,30,32,27,20,6,6,4,2,0],"height":[0,2,6,13,35,40,37,30,16,16,25,29,0],"texture":[3.85,3.85,11,0.85,1.85,0.85,18,10.245,63]},"detail2":{"section_segments":5,"offset":{"x":0,"y":5,"z":-8},"position":{"x":[0,0,0,0,0,0],"y":[-147,-147,-135,-110,-80,-80],"z":[-3,-3,-6,-10,-5,-5]},"width":[0,3,10,20,21,0],"height":[0,2,7,12,18,0],"texture":[1.85]},"detail3":{"section_segments":5,"offset":{"x":0,"y":5,"z":-5},"position":{"x":[0,0,0,0,0,0],"y":[-145,-145,-135,-110,-80,-80],"z":[-4,-4,-6,-10,-5,-5]},"width":[0,1,9,19,20,0],"height":[0,1,6,11,17,0],"texture":[63]},"detail4":{"section_segments":6,"offset":{"x":0,"y":-70,"z":20},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-50,-50,-37,-13,6,10,10],"z":[0,0,0,1,2,3,3]},"width":[0,3,12,15,15,14,0],"height":[0,6,14,18,18,17,0],"propeller":false,"texture":[7,9,9,10.245,3.9]},"detail5":{"section_segments":6,"offset":{"x":27,"y":-65,"z":2},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-25,-30,-24,0,5,45,50,50],"z":[0,0,0,0,0,0,0,0]},"width":[0,3,4,5,8,8,4,0],"height":[0,3,4,5,8,8,4,0],"angle":0,"laser":{"damage":[65,80],"rate":0.8,"type":1,"speed":[210,240],"number":1,"error":0},"propeller":false,"texture":[2.9,63,2.9,3.9,12.9,3.9,3.9]},"detail6":{"section_segments":6,"offset":{"x":0,"y":-26,"z":11},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[30,30,27,27,30],"height":[30,30,27,27,30],"angle":0,"propeller":false,"texture":[63]},"detail7":{"section_segments":6,"offset":{"x":0,"y":-11,"z":10},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[30,30,27,27,30],"height":[30,30,27,27,30],"angle":0,"propeller":false,"texture":[63]},"detail8":{"section_segments":6,"offset":{"x":0,"y":4,"z":9},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[30,30,27,27,30],"height":[30,30,27,27,30],"angle":0,"propeller":false,"texture":[63]},"detail9":{"section_segments":6,"offset":{"x":1,"y":25,"z":5},"position":{"x":[23,23,-1,-1,-1],"y":[-5,-5,35,65,65],"z":[5,5,0,6,6]},"width":[0,2,16,5,0],"height":[0,4,15,4,0],"texture":[3.9]},"detail10":{"section_segments":[45,135,225,315],"offset":{"x":12,"y":-112,"z":-11},"position":{"x":[-12,-12,-12,-5,5,7],"y":[-33,-33,-32,-22,0,30],"z":[1,1,1,1,-2,0]},"width":[0,2,3,3,4,4],"height":[0,2,3,3,6,10],"texture":[2]},"detail11":{"section_segments":6,"offset":{"x":12,"y":-6,"z":30},"position":{"x":[-7,0,0,0,0,0,0,0,0],"y":[-43,-34,-30,-25,-10,0,15,20,20],"z":[5,1,0,0,0,0,0,0,0]},"width":[4,4,4,7,7,7,7,4,0],"height":[4,4,4,7,7,7,7,4,0],"texture":[3.9,3.9,3.9,15,8.2,15,3.9,3.9]},"detail12":{"section_segments":10,"angle":0,"offset":{"x":0,"y":35,"z":48},"position":{"x":[0,0,0,0,0],"y":[-7,-7,6,7,5],"z":[0,0,0,0,0]},"width":[0,9,9,7,0],"height":[0,9,9,7,0],"texture":[4,4,17,18],"vertical":true},"detail15":{"section_segments":6,"offset":{"x":14,"y":20,"z":-5},"position":{"x":[0,0,0,0,0,0],"y":[-20,-20,0,10,35,25],"z":[0,0,0,0,0,0]},"width":[0,12,12,10,9,0],"height":[0,17,17,15,13,0],"angle":0,"propeller":true,"texture":[3.9,3.9,3.9,1.9,16.9]},"detail16":{"section_segments":6,"offset":{"x":29,"y":-30,"z":-19},"position":{"x":[0,0,0,0,0,0],"y":[-20,-20,-10,0,18,8],"z":[0,0,0,0,0,0]},"width":[0,10,12,10,8,0],"height":[0,10,12,10,8,0],"angle":0,"propeller":true,"texture":[3.9,3.9,3.9,16.9,16.9]},"detail17":{"section_segments":6,"offset":{"x":0,"y":-70,"z":17},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-53,-53,-37,-13,36,43,43],"z":[0,0,-3,-1,2,4,4]},"width":[0,5,15,18,18,17,0],"height":[0,7,16,22,22,19,0],"propeller":false,"texture":[63]},"detail23":{"section_segments":[45,135,225,315],"offset":{"x":18,"y":18,"z":10},"position":{"x":[0,0,0,0,0,0],"y":[-7,-7,6,7,5,5],"z":[0,0,0,0,0,0]},"width":[0,10,10,6,4,0],"height":[0,30,30,26,24,0],"texture":[15,15,4,4,17],"vertical":true,"angle":40},"detail24":{"section_segments":[45,135,225,315],"offset":{"x":12,"y":-112,"z":-11},"position":{"x":[-12,-12,-12,-4,5,7],"y":[-32,-32,-31,-22,0,30],"z":[18,18,18,16,10,0]},"width":[0,2,3,3,4,4],"height":[0,2,3,3,8,10],"texture":[2]},"detail25":{"section_segments":[0,175,-125],"offset":{"x":0,"y":-105,"z":20},"position":{"x":[19,19,17,21,30],"y":[-15,-15,25,65,75],"z":[-3,-3,0,-4,-8]},"width":[0,3,15,12,0],"height":[0,4,15,6,0],"texture":[4.1]},"detail26":{"section_segments":[0,175,-125],"offset":{"x":0,"y":-105,"z":20},"position":{"x":[30,21,17,19,19],"y":[-75,-65,-25,15,15],"z":[-8,-4,0,-3,-3]},"width":[0,12,15,3,0],"height":[0,6,15,4,0],"texture":[4.1],"angle":180},"detail27":{"section_segments":6,"offset":{"x":0,"y":-97,"z":11},"position":{"x":[0,0,0,0,0,0,0],"y":[-43,-45,-40,-8,5,20,22],"z":[0,0,0,0,0,0,0]},"width":[0,3,6,6,7,6,0],"height":[0,3,6,6,7,6,0],"angle":0,"laser":{"damage":[10,15],"rate":4,"type":1,"speed":[160,180],"number":1,"error":0},"propeller":false,"texture":[2.9,63,18,2.9,2.9]}},"wings":{"detail":{"length":[0,15,15,15],"width":[0,48,45,35,11],"angle":[90,90,90,90],"position":[-9,-9,-5,0,10],"doubleside":true,"texture":[4,17,17,63],"bump":{"position":-30,"size":15},"offset":{"x":0,"y":110,"z":0}},"detail2":{"length":[0,15,15,15],"width":[0,50,45,35,11],"angle":[-90,-90,-90,-90],"position":[-9,-9,-5,0,10],"doubleside":true,"texture":[11,1,1,63],"bump":{"position":-30,"size":15},"offset":{"x":0,"y":110,"z":0}},"detail3":{"length":[0,15,15,18],"width":[0,53,50,40,16],"angle":[90,90,90,90],"position":[-10,-10,-10,0,10],"doubleside":true,"texture":[4],"bump":{"position":-30,"size":10},"offset":{"x":0,"y":40,"z":5}},"detail4":{"length":[0,15,15,18],"width":[0,55,55,35,10],"angle":[-90,-90,-90,-90],"position":[-15,-15,-15,5,15],"doubleside":true,"texture":[1],"bump":{"position":-30,"size":10},"offset":{"x":0,"y":44,"z":0}},"detail5":{"length":[0,30,10,10],"width":[0,5,30,30,10],"angle":[-55,-55,-45,-45],"position":[-10,-10,-5,0,10],"doubleside":true,"texture":[1,10,1,63],"bump":{"position":30,"size":15},"offset":{"x":20,"y":-35,"z":12}},"detail6":{"length":[10,5,-3],"width":[0,25,13,0],"angle":[90,90,90],"position":[0,0,0,6],"doubleside":true,"offset":{"x":0,"y":-25,"z":28},"bump":{"position":-15,"size":20},"texture":[4,4,17,63]},"detail7":{"length":[10,5,-3],"width":[0,25,13,0],"angle":[90,90,90],"position":[0,0,0,6],"doubleside":true,"offset":{"x":0,"y":-10,"z":27},"bump":{"position":-15,"size":22},"texture":[4,4,17,63]},"detail8":{"length":[10,5,-3],"width":[0,25,13,0],"angle":[90,90,90],"position":[0,0,0,6],"doubleside":true,"offset":{"x":0,"y":5,"z":26},"bump":{"position":-15,"size":24},"texture":[4,4,17,63]},"detail9":{"length":[10,5,-3],"width":[0,25,13,0],"angle":[90,90,90],"position":[0,0,0,6],"doubleside":true,"offset":{"x":0,"y":20,"z":25},"bump":{"position":-15,"size":26},"texture":[4,4,17,63]},"detail10":{"length":[0,15,15,17.5],"width":[0,53,50,40,4],"angle":[90,90,90,90],"position":[-10,-10,-10,0,3],"doubleside":true,"texture":[17],"bump":{"position":-30,"size":10},"offset":{"x":0,"y":39,"z":5}},"detail11":{"length":[0,15,15,15],"width":[0,48,45,35,11],"angle":[90,90,90,90],"position":[-9,-9,-5,0,10],"doubleside":true,"texture":[1,11,1,63],"bump":{"position":-30,"size":15},"offset":{"x":0,"y":111,"z":0}}},"typespec":{"name":"Grouper fish","level":6,"model":6,"code":606,"specs":{"shield":{"capacity":[225,325],"reload":[8,11]},"generator":{"capacity":[400,475],"reload":[95,115]},"ship":{"mass":215,"speed":[75,90],"rotation":[70,95],"acceleration":[100,120]}},"shape":[5.22,4.895,4.252,3.492,2.644,2.397,2.404,2.296,2.193,2.109,1.988,1.033,0.999,0.988,1.013,1.056,1.068,1.137,1.222,1.313,1.505,1.861,2.13,2.365,3.469,4.626,3.469,2.365,2.13,1.861,1.505,1.313,1.222,1.137,1.068,1.056,1.013,0.988,0.999,1.033,1.988,2.109,2.193,2.296,2.404,2.397,2.644,3.492,4.252,4.895],"lasers":[{"x":0.972,"y":-3.42,"z":0.072,"angle":0,"damage":[65,80],"rate":0.8,"type":1,"speed":[210,240],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.972,"y":-3.42,"z":0.072,"angle":0,"damage":[65,80],"rate":0.8,"type":1,"speed":[210,240],"number":1,"spread":0,"error":0,"recoil":0},{"x":0,"y":-5.112,"z":0.396,"angle":0,"damage":[10,15],"rate":4,"type":1,"speed":[160,180],"number":1,"spread":0,"error":0,"recoil":0}],"radius":5.22}}';
var Angler_607 = '{"name":"Angler","level":6,"model":7,"size":1.3,"zoom":1.3,"specs":{"shield":{"capacity":[250,350],"reload":[7,10]},"generator":{"capacity":[225,300],"reload":[75,125]},"ship":{"mass":200,"speed":[100,115],"rotation":[100,115],"acceleration":[100,115]}},"bodies":{"detail":{"section_segments":8,"offset":{"x":0,"y":-20,"z":15},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-95,-95,-87,-65,-30,0,20,50,150,150],"z":[10,10,10,12,5,5,0,0,0,0]},"width":[0,20,37,50,57,53,28,10,1,0],"height":[0,3,8,12,22,22,23,20,10,0],"texture":[3,3,4,4,4,0.9,63,4]},"detail2":{"section_segments":6,"offset":{"x":0,"y":-20,"z":-20},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-101,-100,-95,-65,-30,5,35,35],"z":[-10,-10,-10,-15,5,20,35,35]},"width":[0,20,40,47,50,45,15,0],"height":[0,3,5,13,30,30,5,0],"texture":[2.9]},"detail3":{"section_segments":6,"offset":{"x":0,"y":-93,"z":-26},"position":{"x":[0,0,0,0,0],"y":[-20,-20,7,45,45],"z":[0,0,-4,27,27]},"width":[0,33,40,40,0],"height":[0,3,9,15.5,0],"texture":[63]},"detail4":{"section_segments":6,"offset":{"x":0,"y":-93,"z":17},"position":{"x":[0,0,0,0,0],"y":[-13,-13,7,50,50],"z":[1,1,4,-11,-11]},"width":[0,33,40,40,0],"height":[0,3,9,15.5,0],"texture":[63]},"detail5":{"section_segments":4,"angle":0,"offset":{"x":29,"y":-82,"z":20},"position":{"x":[-8,-8,-6,-4,-2,-1,-1,0,0,0,0,0,0],"y":[-18,-15,-12,-9,-6,-3,0,3,6,9,12,15,18],"z":[-10,-10,-2,-3,-4,-5,-6,-7,-8,-9,-10,-11,-12]},"width":[0,2,1,2,1,2,1,2,1,2,1,2,0],"height":[0,10,2,15,2,20,2,15,2,20,2,15,0],"texture":[2]},"detail6":{"section_segments":4,"angle":0,"offset":{"x":29,"y":-86,"z":-20},"position":{"x":[-8,-8,-6,-4,-2,-1,-1,0,0,0,0,0,0],"y":[-18,-15,-12,-9,-6,-3,0,3,6,9,12,15,18],"z":[-10,0,-5,-5,-2.5,-2.5,0,0,0,0,0,0,0]},"width":[0,2,1,2,1,2,1,2,1,2,1,2,0],"height":[0,10,2,15,2,20,2,15,2,20,2,15,0],"texture":[2]},"detail7":{"section_segments":4,"angle":90,"offset":{"x":0,"y":-102,"z":-30},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-18,-15,-12,-9,-6,-3,0,3,6,9,12,15,18],"z":[0,10,0,10,0,10,0,10,0,10,0,10,0]},"width":[0,2,1,2,1,2,1,2,1,2,1,2,0],"height":[0,15,2,15,2,15,2,15,2,15,2,15,0],"texture":[2]},"detail8":{"section_segments":4,"angle":90,"offset":{"x":3,"y":-100,"z":20},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-18,-15,-12,-9,-6,-3,0,3,6,9,12,15,18],"z":[0,-10,0,-10,0,-10,0,-10,0,-10,0,-10,0]},"width":[0,2,1,2,1,2,1,2,1,2,1,2,0],"height":[0,15,2,15,2,15,2,15,2,15,2,15,0],"texture":[2]},"detail9":{"section_segments":6,"offset":{"x":0,"y":-85,"z":32},"position":{"x":[0,0,0,0,0,0],"y":[-20,-15,10,40,55,55],"z":[-3,-3,0,0,8,8]},"width":[0,10,17,17,8,0],"height":[0,11,15,15,4,0],"propeller":false,"texture":[7,9,8,63]},"detail10":{"section_segments":6,"offset":{"x":55,"y":-60,"z":6},"position":{"x":[0,0,0,0,0,0],"y":[-50,-65,-5,10,45,50],"z":[0,0,0,0,0,0]},"width":[0,4,5,8,8,0],"height":[0,4,5,8,8,0],"angle":0,"laser":{"damage":[8,11],"rate":4.5,"type":1,"speed":[180,200],"number":1,"error":0},"propeller":false,"texture":[2.9,8,63,0.9,3.9]},"detail11":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":-115,"z":70},"position":{"x":[0,0,0,0,0,0],"y":[-45,-45,30,60,60],"z":[0,0,0,-30,-30]},"width":[0,4,4,4,0],"height":[0,4,4,4,0],"angle":0,"texture":[3.9]},"detail12":{"section_segments":3,"offset":{"x":0,"y":-55,"z":37},"position":{"x":[30,30,30,30,30,30,30,30],"y":[-30,-30,-20,20,30,30],"z":[0,0,0,0,0,0,0,0]},"width":[0,7,15,15,7,0],"height":[0,3,5,5,3,0],"propeller":false,"texture":[63,63,10.1,63,63]},"detail13":{"section_segments":6,"offset":{"x":15,"y":-80,"z":36},"position":{"x":[0,0,0,0,0,0],"y":[-20,-35,-5,10,45,50],"z":[0,0,0,0,0,0]},"width":[0,4,5,8,8,0],"height":[0,4,5,8,8,0],"angle":0,"laser":{"damage":[8,11],"rate":4.5,"type":1,"speed":[180,200],"number":1,"error":0},"propeller":false,"texture":[2.9,0.9,63,12.9,3.9]},"detail14":{"section_segments":6,"offset":{"x":15,"y":15,"z":-5},"position":{"x":[0,0,0,0,0,0],"y":[-45,-40,-5,5,35,25],"z":[0,0,0,0,0,0]},"width":[0,17,17,12,12,0],"height":[0,20,20,15,15,0],"angle":0,"propeller":true,"texture":[63,16.9,3.9,12.9,16.9]},"detail15":{"section_segments":6,"offset":{"x":45,"y":-26,"z":-5},"position":{"x":[0,0,0,0,0,0],"y":[-25,-20,0,10,35,25],"z":[0,0,0,0,0,0]},"width":[0,15,15,10,10,0],"height":[0,20,20,15,15,0],"angle":0,"propeller":true,"texture":[3.9,3.9,3.9,63,16.9]},"detail16":{"section_segments":3,"offset":{"x":0,"y":-55,"z":37},"position":{"x":[30,30,30,30,30,30,30,30],"y":[-30,-30,-20,20,30,30],"z":[0,0,0,0,0,0,0,0]},"width":[0,7,15,15,7,0],"height":[0,3,5,5,3,0],"propeller":false,"texture":[63,63,10.1,63,63],"angle":180},"detail17":{"section_segments":3,"offset":{"x":0,"y":-55,"z":37},"position":{"x":[31,31,31,31,31,31],"y":[-20,-20,20,20],"z":[0,0,0,0,0,0]},"width":[0,15,15,0],"height":[0,5,5,0],"propeller":false,"texture":[0.6],"angle":180},"detail18":{"section_segments":3,"offset":{"x":0,"y":-55,"z":37},"position":{"x":[31,31,31,31,31,31],"y":[-20,-20,20,20],"z":[0,0,0,0,0,0]},"width":[0,15,15,0],"height":[0,5,5,0],"propeller":false,"texture":[0.6]},"detail19":{"section_segments":12,"angle":25,"offset":{"x":36,"y":37,"z":68},"position":{"x":[0,0,0,0,0],"y":[-7,-7,6,7,5],"z":[0,0,0,0,0]},"width":[0,6,6,4,0],"height":[0,6,6,4,0],"texture":[4,4,17,18],"vertical":true},"detail20":{"section_segments":12,"angle":25,"offset":{"x":36,"y":37,"z":42},"position":{"x":[0,0,0,0,0],"y":[-7,-7,6,7,5],"z":[0,0,0,0,0]},"width":[0,6,6,4,0],"height":[0,6,6,4,0],"texture":[4,4,17,18],"vertical":true},"detail21":{"section_segments":12,"angle":25,"offset":{"x":36,"y":37,"z":55},"position":{"x":[0,0,0,0,0],"y":[-7,-7,6,7,5],"z":[0,0,0,0,0]},"width":[0,6,6,4,0],"height":[0,6,6,4,0],"texture":[4,4,17,18],"vertical":true},"detail22":{"section_segments":12,"angle":0,"offset":{"x":0,"y":43,"z":64},"position":{"x":[0,0,0,0,0],"y":[-7,-7,6,7,5],"z":[0,0,0,0,0]},"width":[0,8,8,6,0],"height":[0,8,8,6,0],"texture":[4,4,17,18],"vertical":true},"detail23":{"section_segments":7,"angle":0,"offset":{"x":0,"y":70,"z":164},"position":{"x":[0,0,0,0,0,0,0],"y":[-7,-7,-5,0,5,7,7],"z":[0,0,0,0,0,0,0]},"width":[0,3,9,10,9,3,0],"height":[0,8,14,15,14,8,0],"texture":[63,16.9,3.9,3.9,16.9,63],"vertical":true}},"wings":{"detail":{"length":[0,15,15,15],"width":[0,50,45,43,16],"angle":[90,90,90,90],"position":[-10,-10,-5,0,10],"doubleside":true,"texture":[4,4,3,63],"bump":{"position":-30,"size":10},"offset":{"x":0,"y":140,"z":15}},"detail2":{"length":[0,15,15,15],"width":[0,50,45,43,16],"angle":[-90,-90,-90,-90],"position":[-10,-10,-5,0,10],"doubleside":true,"texture":[4,4,3,63],"bump":{"position":-30,"size":10},"offset":{"x":0,"y":140,"z":15}},"detail3":{"length":[0,10,20],"width":[0,60,60,15],"angle":[90,90,90],"position":[0,0,0,25],"doubleside":true,"texture":[63,63,15],"bump":{"position":-30,"size":5},"offset":{"x":0,"y":70,"z":25}},"detail4":{"length":[0,15,20],"width":[0,60,60,35],"angle":[-90,-90,-90],"position":[0,0,0,-25],"doubleside":true,"texture":[4],"bump":{"position":-30,"size":5},"offset":{"x":0,"y":15,"z":15}},"detail5":{"length":[0,40,15,15],"width":[0,20,45,50,20],"angle":[0,0,0,0],"position":[-20,-20,-10,-5,5],"doubleside":true,"texture":[4,4,8,63],"bump":{"position":-30,"size":10},"offset":{"x":20,"y":-5,"z":15}}},"typespec":{"name":"Angler","level":6,"model":7,"code":607,"specs":{"shield":{"capacity":[250,350],"reload":[7,10]},"generator":{"capacity":[225,300],"reload":[75,125]},"ship":{"mass":200,"speed":[100,115],"rotation":[100,115],"acceleration":[100,115]}},"shape":[4.654,3.152,3.136,3.588,3.56,2.854,2.416,2.164,1.987,2.169,2.232,2.336,2.354,2.354,2.28,0.815,0.816,0.832,0.901,1.032,1.227,1.458,1.437,1.366,2.162,4.199,2.162,1.366,1.437,1.458,1.227,1.032,0.901,0.832,0.816,0.815,2.28,2.354,2.354,2.336,2.232,2.169,1.987,2.164,2.416,2.854,3.56,3.588,3.136,3.152],"lasers":[{"x":1.43,"y":-3.25,"z":0.156,"angle":0,"damage":[8,11],"rate":4.5,"type":1,"speed":[180,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.43,"y":-3.25,"z":0.156,"angle":0,"damage":[8,11],"rate":4.5,"type":1,"speed":[180,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.39,"y":-2.99,"z":0.936,"angle":0,"damage":[8,11],"rate":4.5,"type":1,"speed":[180,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.39,"y":-2.99,"z":0.936,"angle":0,"damage":[8,11],"rate":4.5,"type":1,"speed":[180,200],"number":1,"spread":0,"error":0,"recoil":0}],"radius":4.654}}';
var Hammerhead_shark_608 = '{"name":"Hammerhead shark","level":6,"model":8,"size":2.34,"zoom":1.3,"specs":{"shield":{"capacity":[250,350],"reload":[8,11]},"generator":{"capacity":[425,500],"reload":[125,165]},"ship":{"mass":250,"speed":[60,75],"rotation":[70,95],"acceleration":[110,135]}},"bodies":{"detail":{"section_segments":8,"offset":{"x":0,"y":10,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-108,-107,-89,-75,-30,0,50,85,100,100],"z":[-10,-10,-13,0,0,0,0,0,5,5]},"width":[0,8,13,19,24,17,13,2,1,0],"height":[0,4,8,25,30,30,25,12,4,0],"texture":[2]},"detail2":{"section_segments":6,"offset":{"x":0,"y":10,"z":7},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-145,-145,-142,-139,-125,-125,-140,-115,-99,-65,-30,0,50,85,105,105],"z":[4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0]},"width":[0,10,25,42,45,13,13,13,24,28,30,30,19,5,4,0],"height":[0,2,4.5,6,6,4,4,4,12,22,27,30,27,7,7,0],"texture":[3.9,16.9,3.9,63,3.9,3.9,16.9,63,18,1.9,10.24,8.2,63,3.9]},"detail3":{"section_segments":6,"offset":{"x":0,"y":-74,"z":-8},"position":{"x":[0,0,0,0,0],"y":[-22,-20,-7,2,2],"z":[0,0,0,15,15]},"width":[0,8,12,14,0],"height":[0,3,3,3,0],"texture":[63]},"detail4":{"section_segments":6,"offset":{"x":0,"y":-72,"z":4},"position":{"x":[0,0,0,0],"y":[-22,-20,20,20],"z":[0,0,-16,-16]},"width":[0,8,15,0],"height":[0,4,4,0],"texture":[63]},"detail5":{"section_segments":6,"offset":{"x":0,"y":-65,"z":20},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-22,-22,-14,7,10,32,35,50,50],"z":[-3,-3,-1,2,6,6,6,6,6]},"width":[0,6,10,12,12,12,12,10,0],"height":[0,4,8,9,9,9,9,9,0],"propeller":false,"texture":[7,7,9,16.9,8.201,16.9,4]},"detail6":{"section_segments":6,"offset":{"x":9,"y":-8,"z":12},"position":{"x":[0,0,0,0,0,0],"y":[-10,-10,-7,7,10,10],"z":[0,0,0,0,0,0]},"width":[0,20,20,20,20,0],"height":[0,10,10,10,10,0],"texture":[63,63,12.9,63,63]},"detail7":{"section_segments":6,"offset":{"x":9,"y":-8,"z":3},"position":{"x":[0,0,0,0,0,0],"y":[-10,-10,-7,7,10,10],"z":[0,0,0,0,0,0]},"width":[0,20,20,20,20,0],"height":[0,10,10,10,10,0],"texture":[63,63,12.9,63,63]},"detail8":{"section_segments":8,"angle":0,"offset":{"x":24,"y":-35,"z":3},"position":{"x":[0,0,0,0,0,0],"y":[-15,-15,-12,12,15,15],"z":[0,0,0,0,0,0]},"width":[0,5,7,7,5,0],"height":[0,5,7,7,5,0],"texture":[63,63,3,63,63]},"detail9":{"section_segments":10,"angle":0,"offset":{"x":24,"y":-30,"z":-9},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[15,15,12,12,15],"height":[15,15,12,12,15],"texture":[63]},"detail10":{"section_segments":10,"angle":0,"offset":{"x":24,"y":-40,"z":-9},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[15,15,12,12,15],"height":[15,15,12,12,15],"texture":[63]},"detail11":{"section_segments":6,"offset":{"x":37,"y":-45,"z":-15},"position":{"x":[0,0,0,0,0,0],"y":[-40,-45,-5,0,20,23],"z":[0,0,0,0,0,0]},"width":[0,2,3,6,6,0],"height":[0,2,3,5,5,0],"angle":0,"laser":{"damage":[10,14],"rate":12,"type":1,"speed":[200,220],"number":1,"error":0},"propeller":false,"texture":[2.9,3.9,63,8,3.9]},"detail12":{"section_segments":6,"offset":{"x":12,"y":45,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-45,-40,-10,5,35,25],"z":[0,0,0,0,0,0]},"width":[0,11,11,8,8,0],"height":[0,15,15,10,10,0],"angle":0,"propeller":true,"texture":[63,63,3.9,12.9,16.9]},"detail13":{"section_segments":10,"angle":0,"offset":{"x":0,"y":5,"z":25},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[15,15,12,12,15],"height":[15,15,12,12,15],"texture":[63]},"detail14":{"section_segments":8,"angle":180,"offset":{"x":0,"y":105,"z":5},"position":{"x":[0,0,0,0,0,0],"y":[-35,-40,-25,5,35,35],"z":[0,0,0,0,0,0]},"width":[0,2,5,7,7,0],"height":[0,2,5,7,7,0],"texture":[3,63,17,4],"laser":{"damage":[17,25],"rate":5,"type":1,"speed":[200,220],"number":1,"error":0,"recoil":160}},"detail15":{"section_segments":[0,175,-125],"offset":{"x":0,"y":-40,"z":25},"position":{"x":[10.5,12.5,9.5,11,11,17],"y":[-66,-49,-18,20,50,100],"z":[-11,-7.5,-2,0.6,2,-4]},"width":[0,10.5,18.5,18.5,18.5,0],"height":[0,8,8,8,8,0],"texture":[1.1,1.1,4.1,4.1,1.1]},"detail16":{"section_segments":[0,125,-175],"offset":{"x":0,"y":-40,"z":25},"position":{"x":[-10.5,-12.5,-9.5,-11,-11,-17],"y":[-66,-49,-18,20,50,100],"z":[-11,-7.5,-2,0.6,2,-4]},"width":[0,10.5,18.5,18.5,18.5,0],"height":[0,8,8,8,8,0],"texture":[0.9,0.9,3.9,3.9,0.9]},"detail17":{"section_segments":10,"angle":0,"offset":{"x":0,"y":25,"z":27},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[10,10,7,7,10],"height":[10,10,7,7,10],"texture":[4]},"detail18":{"section_segments":10,"angle":0,"offset":{"x":0,"y":35,"z":27},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[10,10,7,7,10],"height":[10,10,7,7,10],"texture":[4]},"detail19":{"section_segments":10,"angle":0,"offset":{"x":0,"y":45,"z":27},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[10,10,7,7,10],"height":[10,10,7,7,10],"texture":[4]},"detail20":{"section_segments":6,"offset":{"x":24.5,"y":-10,"z":-24.5},"position":{"x":[0,0,0,0,0,0],"y":[-25,-15,0,10,25,15],"z":[0,0,0,0,0,0]},"width":[0,11,11,8,6,0],"height":[0,6,6,4,4,0],"angle":0,"propeller":true,"texture":[2.9,2.9,2.9,11,16.9]},"detail21":{"section_segments":10,"angle":0,"offset":{"x":0,"y":29,"z":-65},"position":{"x":[0,0,0,0,0],"y":[-7,-7,6,7,5],"z":[0,0,0,0,0]},"width":[0,9,9,7,0],"height":[0,9,9,7,0],"texture":[4,4,17,18],"vertical":true},"detail22":{"section_segments":6,"offset":{"x":25,"y":-26,"z":10},"position":{"x":[-7,0,0,0,0,0,0,0,0],"y":[-43,-34,-30,-25,-10,0,15,20,20],"z":[0,0,0,0,0,0,0,0,0]},"width":[4,4,4,7,7,7,7,4,0],"height":[4,4,4,7,7,7,7,4,0],"texture":[3.9,3.9,3.9,15,8.2,15,3.9,3.9]},"detail23":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":32,"z":-35},"position":{"x":[0,0,0,0,0,0,0],"y":[-7,-7,6,7,5,5,5],"z":[0,0,0,0,0,0,0]},"width":[0,10,10,6,4,2,0],"height":[0,25,25,21,19,17,0],"texture":[15,15,4,4,17,63],"vertical":true,"angle":0},"detail24":{"section_segments":4,"offset":{"x":0,"y":-123,"z":14},"position":{"x":[0,0,0,0,0],"y":[-4,-4,10,15,15],"z":[5,5,1,-5,-5]},"width":[0,8,20,10,0],"height":[0,2,5,5,0],"texture":[4],"angle":0},"detail25":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":-121,"z":14},"position":{"x":[0,0,0,0,0],"y":[-4,-4,10,15,15],"z":[5,5,1,-15,-15]},"width":[0,10,10,10,0],"height":[0,3,8,6,0],"texture":[4,12,4],"angle":0}},"wings":{"detail":{"length":[45,15],"width":[45,20,10],"angle":[-30,-30],"position":[-15,10,23],"doubleside":true,"texture":[11,63],"bump":{"position":-30,"size":10},"offset":{"x":0,"y":-30,"z":-2}},"detail2":{"length":[0,20,20],"width":[0,25,17,5],"angle":[90,90,90],"position":[-12,-12,-9,0],"doubleside":true,"texture":[2,2,63],"bump":{"position":-30,"size":20},"offset":{"x":0,"y":15,"z":20}},"detail3":{"length":[0,10,10,10,10],"width":[25,25,20,17,12,4],"angle":[90,90,90,90,90],"position":[-15,-15,-12,-9,-2,6],"doubleside":true,"texture":[63,63,2,4],"bump":{"position":-30,"size":15},"offset":{"x":0,"y":135,"z":5}},"detail4":{"length":[0,10,10,10,10],"width":[25,25,20,17,12,4],"angle":[-90,-90,-90,-90,-90],"position":[-15,-15,-12,-9,-2,6],"doubleside":true,"texture":[63,63,2,4],"bump":{"position":-30,"size":15},"offset":{"x":0,"y":135,"z":5}},"detail5":{"length":[25,5],"width":[15,10,7],"angle":[-90,-90],"position":[15,0,1],"doubleside":true,"texture":[4],"bump":{"position":-60,"size":10},"offset":{"x":0,"y":60,"z":-5}},"detail6":{"length":[25,5],"width":[15,10,7],"angle":[90,90],"position":[15,0,1],"doubleside":true,"texture":[4],"bump":{"position":-60,"size":10},"offset":{"x":0,"y":100,"z":-5}},"detail7":{"length":[25,5],"width":[15,10,7],"angle":[-50,-50],"position":[5,12,15],"doubleside":true,"texture":[63],"bump":{"position":-60,"size":10},"offset":{"x":0,"y":40,"z":-5}},"detail8":{"length":[0,10,10,10,10],"width":[25,25,20,17,12,4],"angle":[90,90,90,90,90],"position":[-15,-15,-12,-9,-2,6],"doubleside":true,"texture":[4,4,4,17],"bump":{"position":-30,"size":20},"offset":{"x":0,"y":134,"z":5}},"detail9":{"length":[0,10,10,10,10],"width":[25,25,20,17,12,4],"angle":[-90,-90,-90,-90,-90],"position":[-15,-15,-12,-9,-2,6],"doubleside":true,"texture":[4,4,4,17],"bump":{"position":-30,"size":20},"offset":{"x":0,"y":134,"z":5}}},"typespec":{"name":"Hammerhead shark","level":6,"model":8,"code":608,"specs":{"shield":{"capacity":[250,350],"reload":[8,11]},"generator":{"capacity":[425,500],"reload":[125,165]},"ship":{"mass":250,"speed":[60,75],"rotation":[70,95],"acceleration":[110,135]}},"shape":[6.33,6.331,6.273,5.811,4.264,3.421,2.957,2.708,2.439,2.371,2.469,2.496,2.451,1.471,1.475,1.512,1.557,1.456,1.522,1.676,1.889,2.214,2.883,3.847,4.942,6.787,4.942,3.847,2.883,2.214,1.889,1.676,1.522,1.456,1.557,1.512,1.475,1.47,2.451,2.496,2.469,2.371,2.439,2.708,2.957,3.421,4.264,5.811,6.273,6.331],"lasers":[{"x":1.732,"y":-4.212,"z":-0.702,"angle":0,"damage":[10,14],"rate":12,"type":1,"speed":[200,220],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.732,"y":-4.212,"z":-0.702,"angle":0,"damage":[10,14],"rate":12,"type":1,"speed":[200,220],"number":1,"spread":0,"error":0,"recoil":0},{"x":0,"y":6.786,"z":0.234,"angle":180,"damage":[17,25],"rate":5,"type":1,"speed":[200,220],"number":1,"spread":0,"error":0,"recoil":160}],"radius":6.787}}';
var Manta_609 = '{"name":"Manta","level":6,"model":9,"size":1.72,"zoom":1.15,"specs":{"shield":{"capacity":[400,475],"reload":[10,13]},"generator":{"capacity":[325,400],"reload":[100,145]},"ship":{"mass":300,"speed":[65,80],"rotation":[45,60],"acceleration":[85,100]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":5,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-90,-100,-95,-77,-40,10,35,35,75,140,145,150,170,165],"z":[0,0,0,0,0,0,2,0,0,0,0,0,0,0,0]},"width":[0,5,17,30,30,24,12,12,7,3,3,8,3,0],"height":[0,3,6,10,15,15,12,12,5,3,3,8,3,0],"texture":[1.9,3.9,63,10,8,63,3.9,3.9,11,3.9,17,63,0.9],"laser":{"damage":[90,115],"rate":1.2,"type":1,"speed":[150,175],"number":1,"error":0}},"detail2":{"section_segments":6,"offset":{"x":30,"y":-130,"z":0},"position":{"x":[-16,-12,0,1,-2,-22],"y":[-9,-7,13,30,45,80],"z":[0,0,0,0,0,0]},"width":[0,3,8,10,10,10],"height":[0,2.5,4.5,5.5,5.5,5.5],"propeller":false,"texture":[63,63,3.9,3.9,3.9]},"detail3":{"section_segments":6,"offset":{"x":0,"y":-37,"z":9},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-50,-50,-40,-28,-13,0,55,65],"z":[0,0,0,0,2,2,2,2]},"width":[0,8,13,16,16,16,16,8],"height":[0,4,6,8,8,8,8,5],"propeller":false,"texture":[6.9,9,9,9,0.9,10.25,3.9]},"detail4":{"section_segments":6,"offset":{"x":30,"y":-130,"z":0},"position":{"x":[-16,-12,0,0,1,12,12,0],"y":[-11,-9,13,40,65,70,120,120],"z":[0,0,0,0,0,0,0,0]},"width":[0,5,10,13,22,21,21,0],"height":[0,1,3,3,4,4,4,0],"propeller":false,"texture":[0.9]},"detail5":{"section_segments":6,"offset":{"x":70,"y":-35,"z":4},"position":{"x":[0,0,0,0,0,0,0],"y":[-35,-40,-10,0,40,45,45],"z":[0,0,0,0,0,0,0]},"width":[0,4,8,11,11,5,0],"height":[0,4,8,11,11,5,0],"angle":10,"laser":{"damage":[17,20],"rate":1.2,"type":1,"speed":[145,160],"number":1,"error":0},"propeller":false,"texture":[2.9,63,3.9,3.9]},"detail6":{"section_segments":6,"offset":{"x":22,"y":35,"z":-15},"position":{"x":[0,0,0,0,0,0],"y":[-30,-30,-20,0,30,25],"z":[0,0,0,0,0,0]},"width":[0,4,14,18,14,0],"height":[0,4,7,12,10,0],"propeller":true,"texture":[63,63,3.9,12.9,16.9]},"detail7":{"section_segments":6,"offset":{"x":0,"y":40,"z":-10},"position":{"x":[0,0,0,0,0,0],"y":[-30,-30,-20,20,30,30],"z":[0,0,0,0,0,0]},"width":[0,10,17,17,10,0],"height":[0,5,12,12,5,0],"texture":[3.9,3.9,17,0.9]},"detail8":{"section_segments":8,"offset":{"x":0,"y":165,"z":0},"position":{"x":[0,0,0,0],"y":[0,-5,5,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[1],"angle":180,"laser":{"damage":[17,20],"rate":4,"type":1,"speed":[70,90],"number":1,"error":0}},"detail9":{"section_segments":10,"angle":0,"offset":{"x":0,"y":13,"z":-25},"position":{"x":[0,0,0,0,0],"y":[-7,-7,6,7,5],"z":[0,0,0,0,0]},"width":[0,12,12,10,0],"height":[0,12,12,10,0],"texture":[4,4,17,18],"vertical":true},"detail10":{"section_segments":3,"offset":{"x":0,"y":65,"z":2},"position":{"x":[0,0,0,0],"y":[-25,-25,15,15],"z":[6,6,0,0]},"width":[0,12,2,0],"height":[0,4,3,0],"texture":[63]}},"wings":{"detail":{"length":[-10,5,33,45,32],"width":[0,150,150,90,50,20],"angle":[10,10,10,15,25],"position":[0,0,0,-10,0,20],"doubleside":true,"texture":[3,17,4,3.7,15],"bump":{"position":20,"size":15},"offset":{"x":31,"y":-12,"z":6}},"detail2":{"length":[-10,5,33,45,30],"width":[0,150,150,90,50,20],"angle":[10,10,10,15,25],"position":[0,0,0,-10,0,20],"doubleside":true,"texture":[3,4,18,8.09,1],"bump":{"position":20,"size":15},"offset":{"x":31,"y":-11,"z":6}},"detail3":{"length":[20,5,33,45,32],"width":[100,150,150,90,50,20],"angle":[10,10,10,15,25],"position":[0,0,0,-10,0,20],"doubleside":true,"texture":[1,4],"bump":{"position":20,"size":3},"offset":{"x":0,"y":-12,"z":0}},"detail4":{"length":[0,33,45,0],"width":[0,25,15,10,0],"angle":[0,10,15,0],"position":[20,20,-15,-27,-27],"doubleside":true,"texture":[63],"bump":{"position":50,"size":10},"offset":{"x":24,"y":38,"z":5}},"detail5":{"length":[8,8],"width":[0,45,0],"angle":[90,90],"position":[0,30,0],"doubleside":true,"texture":[1],"bump":{"position":-50,"size":30},"offset":{"x":23,"y":35,"z":-13}},"detail6":{"length":[0,7,7,7,7,0],"width":[0,10,22,25,24,15,0],"angle":[0,-25,-15,-10,10,10],"position":[0,0,-17,-27,-31,-28,-28],"doubleside":true,"texture":[1,1,1,1,63],"bump":{"position":50,"size":20},"offset":{"x":27,"y":-18,"z":20}}},"typespec":{"name":"Manta","level":6,"model":9,"code":609,"specs":{"shield":{"capacity":[400,475],"reload":[10,13]},"generator":{"capacity":[325,400],"reload":[100,145]},"ship":{"mass":300,"speed":[65,80],"rotation":[45,60],"acceleration":[85,100]}},"shape":[3.271,4.874,4.707,4.25,3.367,3.307,3.447,3.274,3.396,3.651,3.883,4.162,4.508,4.543,4.55,2.969,2.504,2.214,2.186,2.223,2.295,2.525,2.841,3.112,3.049,6.021,3.049,3.112,2.841,2.525,2.295,2.223,2.186,2.214,2.504,2.969,4.55,4.543,4.508,4.162,3.883,3.651,3.396,3.274,3.447,3.307,3.367,4.25,4.707,4.874],"lasers":[{"x":0,"y":-3.268,"z":0,"angle":0,"damage":[90,115],"rate":1.2,"type":1,"speed":[150,175],"number":1,"spread":0,"error":0,"recoil":0},{"x":2.169,"y":-2.559,"z":0.138,"angle":10,"damage":[17,20],"rate":1.2,"type":1,"speed":[145,160],"number":1,"spread":0,"error":0,"recoil":0},{"x":-2.169,"y":-2.559,"z":0.138,"angle":-10,"damage":[17,20],"rate":1.2,"type":1,"speed":[145,160],"number":1,"spread":0,"error":0,"recoil":0},{"x":0,"y":5.848,"z":0,"angle":180,"damage":[17,20],"rate":4,"type":1,"speed":[70,90],"number":1,"spread":0,"error":0,"recoil":0}],"radius":6.021}}';
var Beluga_610 = '{"name":"Beluga","level":6,"model":10,"size":2.4,"zoom":1.15,"specs":{"shield":{"capacity":[325,425],"reload":[9,12]},"generator":{"capacity":[225,300],"reload":[100,140]},"ship":{"mass":280,"speed":[70,85],"rotation":[65,90],"acceleration":[90,105]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":-20,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-105,-105,-98,-88,-71,-55,-30,0,25,65,95,110,110],"z":[5,5,5,4,0,0,0,0,0,0,0,0]},"width":[0,6,16,22,23,24,25,22,19,15,11,9,0],"height":[0,6,12,15,23,27,30,28,24,14,4,2,0],"texture":[63,63,1,10,63,8,10.243,1,8.21,11,4]},"detail2":{"section_segments":4,"offset":{"x":0,"y":-100,"z":-5},"position":{"x":[0,0,0,0,0],"y":[-26,-26,-20,20,20],"z":[6,6,1,0,0]},"width":[0,4,11,15,0],"height":[0,2,4,5,0],"texture":[1.9]},"detail3":{"section_segments":4,"offset":{"x":0,"y":-100,"z":-11},"position":{"x":[0,0,0,0,0],"y":[-25,-25,-20,20,20],"z":[0,0,0,-3,-3]},"width":[0,4,8,13,0],"height":[0,2,4,5,0],"texture":[1.9]},"detail4":{"section_segments":6,"offset":{"x":0,"y":-76,"z":22},"position":{"x":[0,0,0,0,0,0],"y":[-15,-15,5,35,40,40],"z":[-4,-4,0,0,0,0]},"width":[0,7,13,13,10,0],"height":[0,8,9,9,9,0],"propeller":false,"texture":[7,9,15,4]},"detail5":{"section_segments":4,"offset":{"x":0,"y":-110,"z":12},"position":{"x":[0,0,0,0,0,0],"y":[-15,-20,-10,15,20,20],"z":[0,0,4,10,10.5,10.5]},"width":[0,4,5,5,5,0],"height":[0,3,3,2,2,0],"propeller":false,"texture":[17,3]},"detail6":{"section_segments":6,"offset":{"x":0,"y":-95,"z":5},"position":{"x":[0,0,0,0,0],"y":[-40,-45,-40,15,15],"z":[0,0,0,0,0]},"width":[0,1.5,3,3,0],"height":[0,1.5,3,3,0],"angle":0,"laser":{"damage":[90,110],"rate":2,"type":2,"speed":[130,140],"number":1,"error":15,"recoil":300},"propeller":false,"texture":[2.9,63,3.9,2.9,2.9]},"detail7":{"section_segments":6,"offset":{"x":0,"y":5,"z":92},"position":{"x":[0,0,0,0,0],"y":[-1,1,1,-1,-1],"z":[0,0,0,0,0]},"width":[30,30,27,27,30],"height":[45,45,42,43,45],"propeller":false,"texture":[3.9,16.9,3.9],"vertical":true},"detail8":{"section_segments":6,"offset":{"x":0,"y":-98,"z":-9},"position":{"x":[0,0,0,0,0],"y":[-25,-25,-20,20,20],"z":[0,0,0,0,0]},"width":[0,2,7,12,0],"height":[0,2,4,5,0],"texture":[63]},"detail9":{"section_segments":8,"angle":0,"offset":{"x":0,"y":75,"z":5},"position":{"x":[0,0,0,0,0,0],"y":[-15,-15,-12,12,15,15],"z":[0,0,0,0,0,0]},"width":[0,5,7,7,5,0],"height":[0,5,7,7,5,0],"texture":[63,63,15,63,63]},"detail10":{"section_segments":7,"angle":90,"offset":{"x":0,"y":60,"z":10},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[10,10,7,7,10],"height":[10,10,7,7,10],"texture":[63]},"detail11":{"section_segments":6,"angle":0,"offset":{"x":25,"y":-54,"z":-5},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[10,10,7,7,10],"height":[10,10,7,7,10],"texture":[4]},"detail12":{"section_segments":6,"angle":0,"offset":{"x":25,"y":-47,"z":-5},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[10,10,7,7,10],"height":[10,10,7,7,10],"texture":[4]},"detail13":{"section_segments":6,"angle":0,"offset":{"x":25,"y":-40,"z":-5},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[10,10,7,7,10],"height":[10,10,7,7,10],"texture":[4]},"detail14":{"section_segments":6,"angle":0,"offset":{"x":22,"y":-50,"z":5},"position":{"x":[0,0,0,0,0,0],"y":[-25,-25,-22,22,25,25],"z":[0,0,0,0,0,0]},"width":[0,5,7,7,5,0],"height":[0,5,7,7,5,0],"texture":[63,63,8,63,63]},"detail15":{"section_segments":6,"angle":90,"offset":{"x":0.5,"y":-5,"z":0},"position":{"x":[0,0,0,0,0],"y":[0,20,23,20,20],"z":[0,0,0,0,0]},"width":[7,7,5,4,0],"height":[11,11,9,8,0],"texture":[11,3.9,2.9]},"detail16":{"section_segments":6,"offset":{"x":25,"y":-42,"z":-16},"position":{"x":[0,0,0,0,0,0],"y":[-10,-10,-5,0,25,15],"z":[0,0,0,0,0,0]},"width":[0,9,10,9,8,0],"height":[0,6,7,6,5,0],"angle":0,"propeller":true,"texture":[63,63,63,16.9,16.9]},"detail17":{"section_segments":6,"offset":{"x":0,"y":90,"z":-5},"position":{"x":[0,0,0,0,0,0],"y":[-10,-10,-5,0,25,15],"z":[0,0,0,0,0,0]},"width":[0,9,10,9,8,0],"height":[0,6,7,6,5,0],"angle":0,"propeller":true,"texture":[3.9,3.9,3.9,16.9]},"detail18":{"section_segments":6,"offset":{"x":0,"y":30,"z":12},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[10,9,6,7,10],"height":[10,9,6,7,10],"texture":[0.9]},"detail19":{"section_segments":6,"offset":{"x":0,"y":22,"z":12},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[10,9,6,7,10],"height":[10,9,6,7,10],"texture":[0.9],"angle":180}},"wings":{"detail":{"length":[15,18,5],"width":[30,45,25,10],"angle":[-30,-30,-30],"position":[-15,-10,0,5],"doubleside":true,"texture":[4,1,63],"bump":{"position":0,"size":10},"offset":{"x":15,"y":-35,"z":-3}},"detail2":{"length":[5,20,7],"width":[30,45,25,5],"angle":[90,90,90],"position":[-15,-10,0,15],"doubleside":true,"texture":[63],"bump":{"position":40,"size":10},"offset":{"x":0,"y":-10,"z":5}},"detail3":{"length":[15,18,5],"width":[40,45,25,10],"angle":[0,0,0],"position":[-20,-10,0,5],"doubleside":true,"texture":[3,10.21,63],"bump":{"position":40,"size":10},"offset":{"x":0,"y":110,"z":0}},"detail4":{"length":[15],"width":[20,0],"angle":[5],"position":[-10,10],"doubleside":true,"texture":[4],"bump":{"position":40,"size":20},"offset":{"x":0,"y":96,"z":2}},"detail5":{"length":[25],"width":[20,0],"angle":[-47],"doubleside":true,"position":[-10,16],"texture":[4],"bump":{"position":40,"size":20},"offset":{"x":0,"y":-10,"z":29}}},"typespec":{"name":"Beluga","level":6,"model":10,"code":610,"specs":{"shield":{"capacity":[325,425],"reload":[9,12]},"generator":{"capacity":[225,300],"reload":[100,140]},"ship":{"mass":280,"speed":[70,85],"rotation":[65,90],"acceleration":[90,105]}},"shape":[6.72,6.243,5.74,4.031,3.416,3.238,3.124,2.982,2.842,2.623,1.213,1.164,1.137,1.072,0.818,0.868,0.878,0.939,1.026,1.142,1.331,1.603,5.9,6.09,5.985,5.579,5.985,6.09,5.9,1.603,1.331,1.142,1.026,0.939,0.878,0.868,0.818,1.072,1.137,1.164,1.213,2.623,2.842,2.982,3.124,3.238,3.416,4.031,5.74,6.243],"lasers":[{"x":0,"y":-6.72,"z":0.24,"angle":0,"damage":[90,110],"rate":2,"type":2,"speed":[130,140],"number":1,"spread":0,"error":15,"recoil":300}],"radius":6.72}}';
 
var Colossal_squid_701 = '{"name":"Colossal squid","level":7,"model":1,"size":2,"zoom":1.4,"specs":{"shield":{"capacity":[550,550],"reload":[13,13]},"generator":{"capacity":[550,550],"reload":[175,175]},"ship":{"mass":415,"speed":[60,60],"rotation":[30,30],"acceleration":[75,75]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":-80,"z":0},"position":{"x":[0,0,0,0,0,0,0,0],"y":[39,39,70,110,135,140,130],"z":[0,0,0,0,0,0,0,0]},"width":[0,11,20,20,17,15,0],"height":[0,10,20,20,17,15,0],"texture":[3.9,8,15,8.21,16.9,16.9],"propeller":true},"detail2":{"section_segments":6,"offset":{"x":0,"y":-80,"z":7},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-100,-95,-80,-60,-35,15,40,50,50],"z":[-7,-5,-3,0,0,0,0,0,0,0]},"width":[0,6,13,18,22,22,19,19,0],"height":[0,4,5,5,5,5,5,5,0],"texture":[63,63,3.9,3.9,10,3.9,3.9]},"detail3":{"section_segments":6,"offset":{"x":0,"y":-80,"z":-7},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-100,-95,-80,-60,-35,15,40,50,50],"z":[7,5,3,0,0,0,0,0,0,0]},"width":[0,6,13,18,22,22,19,19,0],"height":[0,4,5,5,5,5,5,5,0],"texture":[63,63,3.9,3.9,10,3.9,3.9]},"detail4":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":-80,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-95,-95,-80,-60,-35,15,40,50,50],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,3,13,18,22,22,19,19,0],"height":[0,7,7,7,7,7,7,7,0],"texture":[4]},"detail5":{"section_segments":6,"offset":{"x":0,"y":-10,"z":25},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-30,-30,-20,-10,0,30,30],"z":[-25,-25,-13,-5,0,0,0]},"width":[0,2,4,7,10,10,0],"height":[0,3,2,3,4,4,0],"propeller":false,"texture":[6.9,9,9,9,10.235,3.9]},"detail6":{"section_segments":6,"offset":{"x":40,"y":105,"z":0},"position":{"x":[-30,-20,5,15,15,18,25,37,37],"y":[-110,-100,-55,-15,60,105,133,155,157],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[6,8,6,5,4,3,4,3,0],"height":[6,8,7,6,5,4,9,4,0],"texture":[1.9,1.9,1.9,63,63,3.9,3.9],"angle":0,"propeller":false},"detail7":{"section_segments":6,"offset":{"x":10,"y":70,"z":28},"position":{"x":[-10,-5,5,7,5,5],"y":[-50,-50,-15,10,90,95],"z":[-15,-10,5,15,17,17,17]},"width":[8,10,9,8,5,0],"height":[8,10,9,8,5,0],"texture":[3.9,3.9,63,63,3.9],"angle":0,"propeller":false},"detail8":{"section_segments":6,"offset":{"x":21,"y":70,"z":14},"position":{"x":[-25,-15,15,20,13,10],"y":[-70,-60,-15,10,80,85],"z":[-20,-10,10,14,18,16]},"width":[8,10,9,8,5,0],"height":[8,10,9,8,5,0],"texture":[3.9,3.9,63,63,3.9],"angle":0,"propeller":false},"detail9":{"section_segments":6,"offset":{"x":10,"y":70,"z":-28},"position":{"x":[-10,-5,5,7,5,5],"y":[-70,-60,-15,10,90,95],"z":[15,10,-5,-15,-17,-17,-17]},"width":[8,10,9,8,5,0],"height":[8,10,9,8,5,0],"texture":[3.9,3.9,63,63,3.9],"angle":0,"propeller":false},"detail10":{"section_segments":6,"offset":{"x":21,"y":70,"z":-14},"position":{"x":[-25,-15,15,20,13,10],"y":[-70,-60,-15,10,80,85],"z":[20,10,-10,-14,-18,-16]},"width":[8,10,9,8,5,0],"height":[8,10,9,8,5,0],"texture":[3.9,3.9,63,63,3.9],"angle":0,"propeller":false},"detail11":{"section_segments":6,"offset":{"x":0,"y":-10,"z":24},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-30,-30,-20,-10,0,30,30],"z":[-25,-25,-13,-5,0,0,0]},"width":[0,4,6,9,12,12,0],"height":[0,3,2,3,4,4,0],"propeller":false,"texture":[63]},"detail12":{"section_segments":12,"offset":{"x":0,"y":25,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-10,5,10,10,-10,-10],"z":[0,0,0,0,0,0]},"width":[35,45,47,35,25,35],"height":[35,45,47,35,25,35],"texture":[4,63,4],"angle":0,"propeller":false},"detail13":{"section_segments":6,"offset":{"x":10,"y":70,"z":-27},"position":{"x":[-10,-5,5,7,5,5],"y":[-70,-60,-15,10,90,95],"z":[15,10,-5,-15,-17,-17,-17]},"width":[7,9,8,7,4,0],"height":[8,10,9,8,5,0],"texture":[12.9],"angle":0,"propeller":false},"detail14":{"section_segments":6,"offset":{"x":20,"y":70,"z":-13},"position":{"x":[-25,-15,15,20,13,10],"y":[-70,-60,-15,10,80,85],"z":[20,10,-10,-14,-18,-16]},"width":[8,10,9,8,5,0],"height":[8,10,9,8,5,0],"texture":[12.9],"angle":0,"propeller":false},"detail15":{"section_segments":6,"offset":{"x":10,"y":70,"z":27},"position":{"x":[-10,-5,5,7,5,5],"y":[-50,-50,-15,10,90,95],"z":[-15,-10,5,15,17,17,17]},"width":[7,9,8,7,4,0],"height":[8,10,9,8,5,0],"texture":[12.9],"angle":0,"propeller":false},"detail16":{"section_segments":6,"offset":{"x":20,"y":70,"z":13},"position":{"x":[-25,-15,15,20,13,10],"y":[-70,-60,-15,10,80,85],"z":[-20,-10,10,14,18,16]},"width":[8,10,9,8,5,0],"height":[8,10,9,8,5,0],"texture":[12.9],"angle":0,"propeller":false},"detail17":{"section_segments":6,"offset":{"x":39,"y":105,"z":0},"position":{"x":[-30,-20,5,15,15,18,25,37,37],"y":[-110,-100,-55,-15,60,105,133,155,157],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[6,8,6,5,4,3,4,3,0],"height":[6,8,7,6,5,4,9,4,0],"texture":[3.9,3.9,12.9,12.9,12.9,3.9],"angle":0,"propeller":false},"detail18":{"section_segments":6,"offset":{"x":0,"y":-35,"z":0},"position":{"x":[0,0,0,0,0],"y":[-6,-6,6,6,0],"z":[0,0,0,0,0]},"width":[0,20,23,18,0],"height":[0,20,23,18,0],"texture":[63],"angle":0,"propeller":false},"detail19":{"section_segments":6,"offset":{"x":12,"y":-132,"z":9},"position":{"x":[0,0,0,0,0,0],"y":[-35,-40,-5,0,20,23],"z":[0,0,0,0,0,0]},"width":[0,3,5,7,7,0],"height":[0,3,5,7,7,0],"angle":0,"laser":{"damage":[50,50],"rate":2,"type":1,"speed":[200,200],"number":1,"error":0},"propeller":false,"texture":[2.9,2,17,8,3.9]},"detail20":{"section_segments":8,"angle":0,"offset":{"x":15,"y":-80,"z":-10},"position":{"x":[0,0,0,0,0,0],"y":[-35,-35,-32,32,35,35],"z":[0,0,0,0,0,0]},"width":[0,7,10,10,7,0],"height":[0,7,10,10,7,0],"texture":[63,63,15,63,63]},"detail21":{"section_segments":6,"offset":{"x":19,"y":-55,"z":-2},"position":{"x":[0,0,0,0,0],"y":[-5,5,1,-5,-5],"z":[0,0,0,0,0]},"width":[10,10,7,7,10],"height":[10,10,7,7,10],"texture":[63],"angle":0,"propeller":false},"detail22":{"section_segments":8,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0],"y":[-4,4,4,-4,-4],"z":[0,0,0,0,0]},"width":[30,30,25,25,30],"height":[40,40,35,35,40],"texture":[63],"vertical":true},"detail23":{"section_segments":6,"offset":{"x":15,"y":-65,"z":0},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[15,15,12,12,15],"height":[8,8,5,5,8],"texture":[3,4],"angle":0,"propeller":false},"detail24":{"section_segments":6,"offset":{"x":15,"y":-72,"z":0},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[15,15,12,12,15],"height":[8,8,5,5,8],"texture":[3,4],"angle":0,"propeller":false},"detail25":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":15,"z":45},"position":{"x":[0,0,0,0,0,0],"y":[-7,-7,6,7,5,5],"z":[0,0,0,0,0,0]},"width":[0,15,15,14,12,0],"height":[0,6,6,5,3,0],"texture":[15,15,63,18,63],"vertical":true},"detail26":{"section_segments":[45,135,225,315],"offset":{"x":14,"y":15,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-7,-7,6,7,5,5],"z":[0,0,0,0,0,0]},"width":[0,6,6,5,3,0],"height":[0,15,15,14,12,0],"texture":[15,15,63,18,17],"vertical":true},"detail27":{"section_segments":6,"offset":{"x":30,"y":25,"z":30},"position":{"x":[0,0,0,0,0,0],"y":[-15,-15,-10,10,15,15],"z":[0,0,0,0,0,0]},"width":[0,4,10,10,4,0],"height":[0,2,10,10,2,0],"texture":[3.9,3.9,11,3.9,3.9]},"detail28":{"section_segments":6,"offset":{"x":30,"y":25,"z":-30},"position":{"x":[0,0,0,0,0,0],"y":[-15,-15,-10,10,15,15],"z":[0,0,0,0,0,0]},"width":[0,4,10,10,4,0],"height":[0,2,10,10,2,0],"texture":[3.9,3.9,11,3.9,3.9]},"detail29":{"section_segments":6,"offset":{"x":0,"y":22,"z":22},"position":{"x":[0,0,0,0,0],"y":[-4,4,4,-4,-4],"z":[0,0,0,0,0]},"width":[20,20,14,14,20],"height":[20,20,14,14,20],"texture":[3],"angle":90,"propeller":false},"detail30":{"section_segments":8,"angle":0,"offset":{"x":15,"y":-135,"z":5},"position":{"x":[0,0,0,0,0,0,0],"y":[-25,-25,-22,5,22,25,25],"z":[0,0,0,0,0,0,0]},"width":[0,5,7,7,7,5,0],"height":[0,5,7,7,7,5,0],"texture":[4,17,15,4,63,63]},"detail31":{"section_segments":6,"angle":0,"offset":{"x":25,"y":-125,"z":-3},"position":{"x":[0,0,0,0,0,0],"y":[-15,-15,-12,12,15,15],"z":[0,0,0,0,0,0]},"width":[0,15,17,17,15,0],"height":[0,2,3,3,2,0],"texture":[63,63,4,17,4]},"detail32":{"section_segments":6,"offset":{"x":0,"y":20,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-35,-40,-5,0,20,23],"z":[0,0,0,0,0,0]},"width":[0,3,5,7,7,0],"height":[0,3,5,7,7,0],"angle":180,"texture":[2.9,2,17,8,3.9],"laser":{"damage":[12,12],"rate":0.5,"type":1,"speed":[130,130],"number":20,"error":0,"recoil":60}}},"wings":{"detail":{"offset":{"x":0,"y":-150,"z":0},"length":[45,10],"width":[55,25,17],"angle":[0,0],"position":[0,30,40],"texture":[3.15,63],"doubleside":true,"bump":{"position":5,"size":10}},"detail2":{"offset":{"x":0,"y":-74,"z":16},"length":[7,0],"width":[85,65,0],"angle":[-20,0],"position":[0,10,10],"texture":[15],"doubleside":true,"bump":{"position":50,"size":5}},"detail3":{"offset":{"x":0,"y":-77,"z":15.9},"length":[10,0],"width":[90,65,0],"angle":[-30,0],"position":[0,10,10],"texture":[63],"doubleside":true,"bump":{"position":50,"size":3}},"detail4":{"offset":{"x":30,"y":20,"z":30},"length":[0,30],"width":[0,20,5],"angle":[45,45],"position":[0,0,20],"texture":[63],"doubleside":true,"bump":{"position":50,"size":45}},"detail5":{"offset":{"x":30,"y":20,"z":-30},"length":[0,30],"width":[0,20,5],"angle":[-45,-45],"position":[0,0,20],"texture":[63],"doubleside":true,"bump":{"position":50,"size":45}}},"typespec":{"name":"Colossal squid","level":7,"model":1,"code":701,"specs":{"shield":{"capacity":[550,550],"reload":[13,13]},"generator":{"capacity":[550,550],"reload":[175,175]},"ship":{"mass":415,"speed":[60,60],"rotation":[30,30],"acceleration":[75,75]}},"shape":[7.2,6.905,6.059,5.632,5.164,1.455,1.367,1.274,1.207,1.168,1.149,1.164,1.197,1.2,1.164,1.662,1.797,2.499,2.662,3.349,4.412,5.51,7.66,10.923,6.627,2.405,6.627,10.923,7.66,5.51,4.412,3.349,2.662,2.499,1.797,1.662,1.164,1.197,1.2,1.164,1.149,1.168,1.207,1.274,1.367,1.455,5.164,5.632,6.059,6.905],"lasers":[{"x":0.48,"y":-6.88,"z":0.36,"angle":0,"damage":[50,50],"rate":2,"type":1,"speed":[200,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.48,"y":-6.88,"z":0.36,"angle":0,"damage":[50,50],"rate":2,"type":1,"speed":[200,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":0,"y":2.4,"z":0,"angle":180,"damage":[12,12],"rate":0.5,"type":1,"speed":[130,130],"number":20,"spread":0,"error":0,"recoil":60}],"radius":10.923}}';
var Fin_whale_702 = '{"name":"Fin whale","level":7,"model":2,"size":3.4,"zoom":1.4,"specs":{"shield":{"capacity":[750,750],"reload":[17,17]},"generator":{"capacity":[600,600],"reload":[100,100]},"ship":{"mass":535,"speed":[70,70],"rotation":[35,35],"acceleration":[90,90]}},"bodies":{"detail":{"section_segments":4,"angle":90,"offset":{"x":1,"y":145,"z":18},"position":{"x":[-5,-5,0,0,0],"y":[-50,-50,-40,-15,0,0],"z":[0,0,0,0,0,0]},"width":[0,4,10,15,10,15,0],"height":[0,1,2,3,2,0],"texture":[63,63,3.9,3.9]},"detail2":{"section_segments":6,"offset":{"x":0,"y":-50,"z":-2},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-99,-99,-90,-40,-15,35,100,158,180,195,195],"z":[-3,-3,-5,-7,0,0,0,2,9,18,18]},"width":[0,9,17,31,32,32,26,16,8,8,0],"height":[0,2,6,13,25,25,25,18,6,2,0],"texture":[3.9,12.9,12.9,12.9,12.9,1.9,1.9]},"detail3":{"section_segments":6,"offset":{"x":0,"y":-50,"z":5},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-107,-107,-93,-50,-15,35,52,60,100,158,180,180],"z":[13,13,13,11,0,0,7,7,7,0,4,4]},"width":[0,5,15,31,36,34,24,24,24,18,10,0],"height":[0,1.5,5,14,30,30,20,20,20,20,6,0],"texture":[63,18,11,10,8,11,18,0.9,10.241,0.9]},"detail4":{"section_segments":8,"offset":{"x":0,"y":7,"z":108},"position":{"x":[0,0,0,0],"y":[-15,-15,10,10],"z":[0,0,0,0]},"width":[0,22,22,0],"height":[0,40,40,0],"texture":[12],"vertical":true},"detail5":{"section_segments":8,"offset":{"x":6,"y":7,"z":93},"position":{"x":[0,0,0,0],"y":[-15,-15,10,10],"z":[0,0,0,0]},"width":[0,20,20,0],"height":[0,30,30,0],"texture":[12],"vertical":true},"detail6":{"section_segments":6,"offset":{"x":0,"y":-100,"z":30},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-40,-45,-40,-20,-11,11,25,40,85,90,90],"z":[-7,-7,-7,-7,-6,-4,0,0,0,0,0,0]},"width":[0,3,5,7,14,14,10,10,10,7,0],"height":[0,3,5,7,10,10,6,6,6,6,0],"propeller":false,"texture":[0.9,63,3.9,7,9,4,15,10.24,63,4],"laser":{"damage":[160,160],"rate":0.5,"type":1,"speed":[250,250],"number":1,"error":0,"recoil":300}},"detail7":{"section_segments":6,"offset":{"x":0,"y":-50,"z":-1},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-100,-100,-90,-40,-15,0,100,158,180,195,195],"z":[-3,-3,-5,-7,0,0,0,2,9,18,18]},"width":[0,10,18,32,33,33,27,17,9,9,0],"height":[0,2,6,13,25,25,25,18,6,2,0],"texture":[3.9,3.9,3.9,3.9,3.9,16.9,3.9]},"detail8":{"section_segments":8,"offset":{"x":0.9,"y":7,"z":133.3},"position":{"x":[0,0,0,0],"y":[-15,-15,10,10],"z":[0,0,0,0]},"width":[0,16,16,0],"height":[0,15,15,0],"texture":[12],"vertical":true},"detail9":{"section_segments":4,"angle":90,"offset":{"x":1,"y":146,"z":18},"position":{"x":[-5,-5,0,0,0],"y":[-50,-50,-40,-15,0,0],"z":[0,0,0,0,0,0]},"width":[0,4,10,15,10,15,0],"height":[0,1,2,3,2,0],"texture":[63,63,11,3.9]},"detail10":{"section_segments":6,"offset":{"x":0,"y":134,"z":10},"position":{"x":[0,0,0,0],"y":[2,2,30,25],"z":[0,0,0,0]},"width":[0,12,12,0],"height":[0,7,7,0],"angle":0,"propeller":true,"texture":[16.9,16.9]},"detail11":{"section_segments":6,"offset":{"x":40,"y":-55,"z":-6},"position":{"x":[0,0,0,0,0,0,0],"y":[-25,-30,-5,0,20,22],"z":[0,0,0,0,0,0,0]},"width":[0,2,4,6,6,4,0],"height":[0,2,4,6,6,4,0],"laser":{"damage":[20,20],"rate":3,"type":1,"speed":[200,200],"number":1,"error":0},"propeller":false,"texture":[2.9,0.9,63,8,3.9]},"detail12":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":31,"z":60},"position":{"x":[0,0,0,0,0,0],"y":[-15,-15,6,7,5,5],"z":[0,0,0,0,0,0]},"width":[0,15,15,13,12,12],"height":[0,8,8,6,5,0],"texture":[15,15,63,18,17],"vertical":true},"detail13":{"section_segments":6,"offset":{"x":0,"y":110,"z":17},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[15,15,12,12,15],"height":[10,10,7,7,10],"angle":0,"texture":[63]},"detail16":{"section_segments":6,"offset":{"x":0,"y":130,"z":14},"position":{"x":[0,0,0,0],"y":[-10,-10,10,10],"z":[0,0,2,2]},"width":[0,10,10,0],"height":[0,8,8,0],"angle":0,"texture":[2.9,8.2,2.9]},"detail17":{"section_segments":6,"offset":{"x":20,"y":145,"z":16},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[10,10,8,8,10],"height":[7,7,5,5,7],"angle":90,"texture":[63]},"detail18":{"section_segments":6,"offset":{"x":28,"y":145,"z":16},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[10,10,8,8,10],"height":[7,7,5,5,7],"angle":90,"texture":[63]},"detail19":{"section_segments":[45,135,225,315],"offset":{"x":26.5,"y":-30,"z":-1},"position":{"x":[-10,5,5,-10],"y":[-25,-15,15,25],"z":[0,0,0,0]},"width":[5,5,5,5],"height":[5,5,5,5],"angle":0,"texture":[3.9,8,3.9]},"detail20":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":-60,"z":30},"position":{"x":[0,0,0,0],"y":[-25,-15,15,25],"z":[-15,0,0,-15]},"width":[5,5,5,5],"height":[4,4,4,4],"angle":90,"texture":[3.9,15,3.9]},"detail21":{"section_segments":6,"offset":{"x":18,"y":55,"z":-5},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-55,-55,-50,-10,5,35,40,30],"z":[0,0,0,0,0,0,0,0]},"width":[0,10,15,15,10,10,8,0],"height":[0,10,15,15,7,7,5,0],"propeller":true,"texture":[63,63,63,3.9,12.9,16.9]},"detail22":{"section_segments":4,"offset":{"x":15,"y":-45,"z":25},"position":{"x":[0,0,0,0,0,0],"y":[-7,-7,-5,5,7,7],"z":[0,0,0,0,0,0]},"width":[0,7,7,7,7,0],"height":[0,4,4,4,4,0],"texture":[4,17,4,17,4]},"detail23":{"section_segments":4,"offset":{"x":15,"y":-25,"z":25},"position":{"x":[0,0,0,0,0,0],"y":[-7,-7,-5,5,7,7],"z":[0,0,0,0,0,0]},"width":[0,7,7,7,7,0],"height":[0,4,4,4,4,0],"texture":[4,17,4,17,4]},"detail24":{"section_segments":6,"angle":0,"offset":{"x":21,"y":-40,"z":20},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-22,-22,-20,-5,5,20,22,22],"z":[0,0,0,0,0,0,0,0]},"width":[0,5,7,7,7,7,5,0],"height":[0,5,7,7,7,7,5,0],"texture":[63,63,10.241,15,10.241,63,63]},"detail25":{"section_segments":6,"offset":{"x":24,"y":-95,"z":24},"position":{"x":[0,0,0,0,0,0,0],"y":[-25,-30,-5,0,20,22],"z":[0,0,0,0,0,0,0]},"width":[0,2,4,6,6,4,0],"height":[0,2,4,6,6,4,0],"angle":0,"laser":{"damage":[20,20],"rate":3,"type":1,"speed":[200,200],"number":1,"error":0},"propeller":false,"texture":[2.9,0.9,63,8,3.9]},"detail26":{"section_segments":6,"offset":{"x":22,"y":-84,"z":26},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[7,7,5,5,7],"height":[7,7,5,5,7],"texture":[0.9,3.9]},"detail27":{"section_segments":6,"offset":{"x":0,"y":-126,"z":20},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[10,10,7,7,10],"height":[10,10,7,7,10],"texture":[63,4]},"detail28":{"section_segments":[0,60,120,180],"offset":{"x":-8,"y":60,"z":12},"position":{"x":[-20,-3,0,0,0],"y":[-40,-10,50,69,69],"z":[6,0,0,-2,-2]},"width":[0,17,8,4,0],"height":[0,17,8,4,0],"texture":[3.8]},"detail29":{"section_segments":12,"angle":0,"offset":{"x":0,"y":31,"z":16},"position":{"x":[0,0,0,0,0,0],"y":[-7,-7,6,7,5,5],"z":[0,0,0,0,0,0]},"width":[0,8,8,7,5,0],"height":[0,8,8,7,5,0],"texture":[15,15,63,18,17],"vertical":true},"detai30":{"section_segments":4,"offset":{"x":0,"y":-52,"z":31},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[0,3,6,9,12,15,18,21,24,27,30,30],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,20,8,20,8,20,8,20,8,20,8,0],"height":[0,4,4,4,4,4,4,4,4,4,4,0],"propeller":false,"texture":[63,4,63,4,63,4,63,4,63,4]},"detail31":{"section_segments":6,"angle":0,"offset":{"x":16,"y":-95,"z":25},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-25,-25,-20,-5,5,20,25,25],"z":[0,0,0,0,0,0,0]},"width":[0,5,7,7,7,7,5,0],"height":[0,5,7,7,7,7,5,0],"texture":[63,63,15,3.9,15,63,63]},"detail32":{"section_segments":10,"offset":{"x":0,"y":31,"z":-25},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-15,-15,3,3,1,1,3,3],"z":[0,0,0,0,0,0,0,0]},"width":[0,12,12,11,8,5,3,0],"height":[0,12,12,11,8,5,3,0],"texture":[4,4,13,17,18,63],"vertical":true},"detail33":{"section_segments":8,"offset":{"x":0,"y":33,"z":27},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[10,10,8,8,10],"height":[10,10,8,8,10],"texture":[4],"angle":90},"detail34":{"section_segments":8,"offset":{"x":6,"y":25,"z":27},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[10,10,8,8,10],"height":[10,10,8,8,10],"texture":[4],"angle":0},"detail35":{"section_segments":8,"offset":{"x":0,"y":17,"z":27},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[10,10,8,8,10],"height":[10,10,8,8,10],"texture":[4],"angle":90},"detail36":{"section_segments":6,"offset":{"x":15,"y":10,"z":20},"position":{"x":[0,0,0,0,0,0],"y":[-20,-20,-15,15,20,20],"z":[0,0,0,0,0,0]},"width":[0,5,8,8,5,0],"height":[0,5,8,8,5,0],"propeller":false,"texture":[3.9,3.9,15,3.9,3.9]}},"wings":{"detail":{"length":[20,18,10],"width":[70,30,20,10],"angle":[0,0,0],"position":[-15,5,10,10],"doubleside":true,"texture":[15,4,63],"bump":{"position":30,"size":15},"offset":{"x":15,"y":-50,"z":0}},"detail2":{"length":[0,30,13],"width":[40,30,20,5],"angle":[90,90,90],"position":[0,0,10,10],"doubleside":true,"texture":[63],"bump":{"position":30,"size":15},"offset":{"x":0,"y":50,"z":0}},"detail3":{"length":[20,18,11],"width":[70,30,20,11],"angle":[0,-1,0],"position":[-15,5,10,10],"doubleside":true,"texture":[1],"bump":{"position":30,"size":15},"offset":{"x":15,"y":-49,"z":0}}},"typespec":{"name":"Fin whale","level":7,"model":2,"code":702,"specs":{"shield":{"capacity":[750,750],"reload":[17,17]},"generator":{"capacity":[600,600],"reload":[100,100]},"ship":{"mass":535,"speed":[70,70],"rotation":[35,35],"acceleration":[90,90]}},"shape":[10.68,10.145,8.678,6.421,6.439,5.44,4.957,5.24,5.3,4.965,2.255,1.892,1.835,2.05,2.173,2.265,2.404,2.592,2.886,3.303,3.832,4.352,10.782,11.054,11.174,11.174,11.174,11.054,10.782,4.352,3.832,3.303,2.886,2.592,2.404,2.265,2.173,2.05,1.835,1.892,2.255,4.965,5.3,5.24,4.957,5.44,6.439,6.421,8.678,10.145],"lasers":[{"x":0,"y":-9.86,"z":2.04,"angle":0,"damage":[160,160],"rate":0.5,"type":1,"speed":[250,250],"number":1,"spread":0,"error":0,"recoil":300},{"x":2.72,"y":-5.78,"z":-0.408,"angle":0,"damage":[20,20],"rate":3,"type":1,"speed":[200,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":-2.72,"y":-5.78,"z":-0.408,"angle":0,"damage":[20,20],"rate":3,"type":1,"speed":[200,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":1.632,"y":-8.5,"z":1.632,"angle":0,"damage":[20,20],"rate":3,"type":1,"speed":[200,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.632,"y":-8.5,"z":1.632,"angle":0,"damage":[20,20],"rate":3,"type":1,"speed":[200,200],"number":1,"spread":0,"error":0,"recoil":0}],"radius":11.174}}';
var Whale_shark_703 = '{"name":"Whale shark","level":7,"model":3,"size":4.2,"zoom":1.3,"specs":{"shield":{"capacity":[600,600],"reload":[15,15]},"generator":{"capacity":[550,550],"reload":[110,110]},"ship":{"mass":500,"speed":[80,80],"rotation":[40,40],"acceleration":[60,60]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":-20,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-85,-85,-97,-95,-84,-65,-30,5,30,85,105,105],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,12,13,15,22,27,30,25,20,5,2,0],"height":[0,1,2,4,13,14,15,14,13,12,10,0],"texture":[4,4,63,4,8,3,4,15,18,3]},"detail2":{"section_segments":6,"offset":{"x":0,"y":-80,"z":12},"position":{"x":[0,0,0,0,0,0,0],"y":[-27,-27,-24,-18,-6,34,34],"z":[0,0,0,0,2,2,2]},"width":[0,4,8,10,10,10,0],"height":[0,1,2,5,5,3,0],"propeller":false,"texture":[6.9,9,9,9,11,3.9]},"detail3":{"section_segments":6,"offset":{"x":0,"y":57,"z":15},"position":{"x":[10,0,0,10],"y":[-6,-3,3,6],"z":[-15,0,0,-15]},"width":[3,3,3,3],"height":[2,2,2,2],"angle":90,"texture":[63]},"detail4":{"section_segments":6,"offset":{"x":0,"y":25,"z":11},"position":{"x":[0,0,0,0],"y":[-10,-10,10,10],"z":[0,0,0,0]},"width":[0,10,5,0],"height":[0,5,5,0],"angle":0,"texture":[2.9,10.24,2.9]},"detail5":{"section_segments":6,"offset":{"x":0,"y":89,"z":0},"position":{"x":[0,0,0,0,0],"y":[-5,5,5,-5,-5],"z":[0,0,0,0,0]},"width":[15,15,12,12,15],"height":[10,10,7,7,10],"angle":90,"texture":[12.9]},"detail6":{"section_segments":4,"offset":{"x":0,"y":-20,"z":16},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[12,12,8,8,12],"height":[12,12,8,8,12],"angle":90,"texture":[63]},"detail7":{"section_segments":6,"offset":{"x":0,"y":57,"z":-15},"position":{"x":[10,0,0,10],"y":[-6,-3,3,6],"z":[15,0,0,15]},"width":[3,3,3,3],"height":[2,2,2,2],"angle":90,"texture":[63]},"detai8":{"section_segments":4,"offset":{"x":0,"y":-81,"z":15},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[0,3,6,9,12,15,18,21,24,27,30,30],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,15,8,15,8,15,8,15,8,15,8,0],"height":[0,1,1,1,1,1,1,1,1,1,1,0],"propeller":false,"texture":[63,4,63,4,63,4,63,4,63,4]},"detail9":{"section_segments":6,"offset":{"x":0,"y":-67,"z":16},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[12,12,8,8,12],"height":[8,8,4,4,8],"angle":90,"texture":[3.9]},"detail10":{"section_segments":6,"offset":{"x":0,"y":25,"z":10},"position":{"x":[0,0,0,0],"y":[-12,-12,12,12],"z":[0,0,0,0]},"width":[0,12,7,0],"height":[0,5,5,0],"angle":0,"texture":[63]},"detail11":{"section_segments":6,"offset":{"x":0,"y":-80,"z":11},"position":{"x":[0,0,0,0,0,0,0],"y":[-29,-29,-24,-18,-6,36,36],"z":[0,0,0,0,2,2,2]},"width":[0,6,10,12,12,12,0],"height":[0,1,3,5,5,3,0],"propeller":false,"texture":[63]},"detail12":{"section_segments":6,"offset":{"x":6,"y":-75,"z":20},"position":{"x":[0,0,0,0,0,0],"y":[-30,-35,-4,0,20,24],"z":[0,0,0,-5,-5,-5]},"width":[0,1,1.5,4,4,0],"height":[0,1,1.5,10,10,0],"angle":0,"laser":{"damage":[10,10],"rate":9,"type":1,"speed":[300,300],"number":1,"error":0},"propeller":false,"texture":[2.9,15,3.9,8,3.9]},"detail13":{"section_segments":6,"offset":{"x":30,"y":-60,"z":0},"position":{"x":[0,0,0,0,0,0,0,-20],"y":[-30,-35,-4,0,20,24,30,70],"z":[0,0,0,0,0,0,0,0]},"width":[0,2,3,6,6,2,2,2],"height":[0,2,3,6,6,2,2,2],"angle":0,"laser":{"damage":[30,30],"rate":6,"type":1,"speed":[180,180],"number":1,"error":0},"propeller":false,"texture":[2.9,1.9,63,10,63]},"detail14":{"section_segments":6,"offset":{"x":15,"y":10,"z":-10},"position":{"x":[0,0,0,0,0,0],"y":[-40,-39,-5,0,20,10],"z":[0,0,0,0,0,0]},"width":[0,10,10,8,8,0],"height":[0,5,5,3,3,0],"angle":0,"propeller":true,"texture":[1.9,1.9,63,3.9,16.9]},"detail15":{"section_segments":8,"angle":0,"offset":{"x":15,"y":-60,"z":8},"position":{"x":[0,0,0,0,0,0],"y":[-25,-25,-20,20,25,25],"z":[0,0,0,0,0,0]},"width":[0,5,7,7,5,0],"height":[0,5,7,7,5,0],"texture":[63,63,15,63,63]},"detail16":{"section_segments":8,"offset":{"x":20,"y":-55,"z":7},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[10,10,7,7,10],"height":[10,10,7,7,10],"texture":[4],"angle":0,"propeller":false},"detail17":{"section_segments":8,"offset":{"x":20,"y":-45,"z":7},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[10,10,7,7,10],"height":[10,10,7,7,10],"texture":[4],"angle":0,"propeller":false},"detail8":{"section_segments":6,"offset":{"x":0,"y":-20,"z":17},"position":{"x":[10,0,0,10],"y":[-10,-5,5,10],"z":[-15,0,0,-15]},"width":[3,3,3,3],"height":[2,2,2,2],"angle":90,"texture":[4]},"detail19":{"section_segments":8,"angle":90,"offset":{"x":0,"y":5,"z":8},"position":{"x":[0,0,0,0,0,0],"y":[-15,-15,-10,10,15,15],"z":[0,0,0,0,0,0]},"width":[0,7,10,10,7,0],"height":[0,7,10,10,7,0],"texture":[63,63,8,63,63]},"detail20":{"section_segments":12,"angle":21,"offset":{"x":13,"y":6,"z":25},"position":{"x":[0,0,0,0,0,0],"y":[-7,-7,6,7,5,5],"z":[0,0,0,0,0,0]},"width":[0,6,6,5,3,0],"height":[0,6,6,5,3,0],"texture":[15,15,63,18,17],"vertical":true},"detail21":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":10,"z":35},"position":{"x":[0,0,0,0,0,0],"y":[-7,-7,6,7,5,5],"z":[0,0,0,0,0,0]},"width":[0,10,10,9,7,0],"height":[0,5,5,4,2,0],"texture":[15,15,63,18,17],"vertical":true},"detail22":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":12,"z":40},"position":{"x":[0,0,0,0,0,0],"y":[-7,-7,6,7,5,5],"z":[0,0,0,0,0,0]},"width":[0,10,10,9,7,0],"height":[0,5,5,4,2,0],"texture":[15,15,63,18,17],"vertical":true},"detail23":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":14,"z":45},"position":{"x":[0,0,0,0,0,0],"y":[-7,-7,6,7,5,5],"z":[0,0,0,0,0,0]},"width":[0,10,10,9,7,0],"height":[0,5,5,4,2,0],"texture":[15,15,63,18,17],"vertical":true},"detail24":{"section_segments":12,"angle":21,"offset":{"x":8,"y":7,"z":13},"position":{"x":[0,0,0,0,0,0],"y":[-7,-7,6,7,5,5],"z":[0,0,0,0,0,0]},"width":[0,5,5,4,2,0],"height":[0,5,5,4,2,0],"texture":[15,15,63,18,17],"vertical":true},"detail25":{"section_segments":8,"offset":{"x":5,"y":45,"z":0},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[10,10,7,7,10],"height":[6,6,3,3,6],"texture":[63,4],"angle":0,"propeller":false},"detail26":{"section_segments":8,"offset":{"x":7,"y":35,"z":0},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[10,10,7,7,10],"height":[6,6,3,3,6],"texture":[63,4],"angle":0,"propeller":false},"detail27":{"section_segments":8,"offset":{"x":10,"y":25,"z":0},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[10,10,7,7,10],"height":[6,6,3,3,6],"texture":[63,4],"angle":0,"propeller":false}},"wings":{"detail":{"length":[0,7,10,10,10],"width":[25,25,20,17,12,4],"angle":[90,90,90,90,90],"position":[-15,-15,-12,-9,-2,6],"doubleside":true,"texture":[4,4,2,2,63],"bump":{"position":-30,"size":15},"offset":{"x":0,"y":100,"z":0}},"detail2":{"length":[0,7,10,10,10],"width":[25,25,20,17,12,4],"angle":[-90,-90,-90,-90,-90],"position":[-15,-15,-12,-9,-2,6],"doubleside":true,"texture":[4,4,2,2,63],"bump":{"position":-30,"size":15},"offset":{"x":0,"y":100,"z":0}},"detail3":{"length":[40,15],"width":[45,20,10],"angle":[-30,-30],"position":[-15,10,23],"doubleside":true,"texture":[2.6,4],"bump":{"position":-30,"size":10},"offset":{"x":0,"y":-60,"z":9}},"detail4":{"length":[0,28,7],"width":[0,35,20,10],"angle":[90,90,90],"position":[0,0,15,20],"doubleside":true,"texture":[15,15,2],"bump":{"position":-50,"size":5},"offset":{"x":0,"y":-25,"z":0}},"detail5":{"length":[0,28,7],"width":[0,35,20,10],"angle":[-60,-60,-60],"position":[0,0,15,20],"doubleside":true,"texture":[15,15,63],"bump":{"position":-50,"size":5},"offset":{"x":0,"y":-25,"z":10}},"detail6":{"length":[0,20,5],"width":[0,25,10,6],"angle":[90,90,90],"position":[0,0,15,20],"doubleside":true,"texture":[1,1,4],"bump":{"position":-50,"size":5},"offset":{"x":0,"y":45,"z":0}},"detail7":{"length":[0,20,5],"width":[0,25,10,6],"angle":[-90,-90,-90],"position":[0,0,15,20],"doubleside":true,"texture":[1,1,4],"bump":{"position":-50,"size":5},"offset":{"x":0,"y":45,"z":0}},"detail8":{"length":[0,7,10,10,10],"width":[25,25,20,17,12,4],"angle":[90,90,90,90,90],"position":[-15,-15,-12,-9,-2,6],"doubleside":true,"texture":[4,4,4,17],"bump":{"position":-30,"size":15},"offset":{"x":0,"y":99,"z":0}},"detail9":{"length":[0,7,10,10,10],"width":[25,25,20,17,12,4],"angle":[-90,-90,-90,-90,-90],"position":[-15,-15,-12,-9,-2,6],"doubleside":true,"texture":[4,4,4,17],"bump":{"position":-30,"size":15},"offset":{"x":0,"y":99,"z":0}}},"typespec":{"name":"Whale shark","level":7,"model":3,"code":703,"specs":{"shield":{"capacity":[600,600],"reload":[15,15]},"generator":{"capacity":[550,550],"reload":[110,110]},"ship":{"mass":500,"speed":[80,80],"rotation":[40,40],"acceleration":[60,60]}},"shape":[9.847,9.873,8.731,8.413,6.402,5.711,5.485,5.353,4.945,2.255,2.135,2.048,2.002,2.003,2.031,2.022,2.1,2.27,2.516,2.883,3.121,3.353,4.077,4.144,6.686,9.072,6.686,4.144,4.077,3.353,3.121,2.883,2.516,2.27,2.1,2.022,2.031,2.003,2.002,2.048,2.135,2.255,4.945,5.353,5.485,5.711,6.402,8.413,8.731,9.873],"lasers":[{"x":0.504,"y":-9.24,"z":1.68,"angle":0,"damage":[10,10],"rate":9,"type":1,"speed":[300,300],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.504,"y":-9.24,"z":1.68,"angle":0,"damage":[10,10],"rate":9,"type":1,"speed":[300,300],"number":1,"spread":0,"error":0,"recoil":0},{"x":2.52,"y":-7.98,"z":0,"angle":0,"damage":[30,30],"rate":6,"type":1,"speed":[180,180],"number":1,"spread":0,"error":0,"recoil":0},{"x":-2.52,"y":-7.98,"z":0,"angle":0,"damage":[30,30],"rate":6,"type":1,"speed":[180,180],"number":1,"spread":0,"error":0,"recoil":0}],"radius":9.873}}';
var Cachalot_704 = '{"name":"Cachalot","level":7,"model":4,"size":3.3,"zoom":1.4,"specs":{"shield":{"capacity":[850,850],"reload":[18,18]},"generator":{"capacity":[300,300],"reload":[150,150]},"ship":{"mass":575,"speed":[45,45],"rotation":[25,25],"acceleration":[80,80]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":-50,"z":20},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-92,-92,-65,-35,0,60,75,80,128,160,200,200],"z":[13,13,-3,-2,-2,-2,-2,-2,10,20,20,20]},"width":[0,20,30,29,29,29,29,29,20,16,13,0],"height":[0,14,30,29,29,29,29,29,25,15,7,0],"texture":[2.9,3.9,3,4,11,3.9,63,10,8,3.9]},"detail2":{"section_segments":8,"offset":{"x":0,"y":-50,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-97,-97,-92,-65,80,128,160,180],"z":[25,25,25,0,0,20,35,40]},"width":[0,12,25,29,29,20,10,5],"height":[0,12,22,29,29,25,10,5],"texture":[3]},"detail3":{"section_segments":6,"offset":{"x":0,"y":-80,"z":-35},"position":{"x":[0,0,0,0,0,0,0],"y":[-38,-36,-20,30,80,100,100],"z":[-10,-10,-10,9,18,33,33]},"width":[0,5,10,20,20,20,0],"height":[0,3,5,6,16,19,0],"texture":[3.9]},"detail4":{"section_segments":8,"offset":{"x":18,"y":-40,"z":13},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-70,-70,-60,-10,10,60,70,70],"z":[0,0,0,0,0,0,0,0]},"width":[0,10,15,15,15,15,10,0],"height":[0,10,15,15,15,15,10,0],"texture":[3.9,3.9,15,3.9,15,3.9]},"detail6":{"section_segments":8,"offset":{"x":0,"y":-50,"z":1},"position":{"x":[0,0,0,0,0],"y":[-65,-65,80,128,128],"z":[0,0,0,20,20]},"width":[0,32,32,23,0],"height":[0,29,29,25,0],"texture":[4]},"detail7":{"section_segments":6,"offset":{"x":0,"y":-50,"z":17},"position":{"x":[0,0,0,0,0,0,0],"y":[-94,-91,-65,-15,80,128],"z":[14,14,-3,-2,-2,10]},"width":[0,21,31,30,30,0],"height":[0,15,31,30,30,0],"texture":[63]},"detail8":{"section_segments":6,"offset":{"x":0,"y":-80,"z":-34},"position":{"x":[0,0,0,0,0,0,0],"y":[-36,-36,-20,30,80,100,100],"z":[-10,-10,-10,9,18,33,33]},"width":[0,4,9,19,19,19,0],"height":[0,3,5,6,16,19,0],"texture":[63]},"detail9":{"section_segments":[45,135,225,315],"angle":90,"offset":{"x":1,"y":133,"z":40},"position":{"x":[-15,-15,-10,0,5,5],"y":[-42,-40,-30,-20,0,0],"z":[0,0,0,0,0]},"width":[0,7,14,22,27,27],"height":[0,1,2,3,6,3],"texture":[63,63,11,18,4]},"detail10":{"section_segments":6,"offset":{"x":0,"y":-60,"z":44},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-25,-25,-15,10,25,55,55],"z":[1.5,1.5,-2,-2,-2,-2,2]},"width":[0,6,12,13,8,8,0],"height":[0,3,10,10,6,6,0],"propeller":false,"texture":[7,7,9,4,10.25,3]},"detail11":{"section_segments":6,"offset":{"x":30,"y":-105,"z":14},"position":{"x":[0,0,0,0,0,0,0],"y":[-30,-35,-5,0,35,40,40],"z":[0,0,0,0,0,0,0]},"width":[0,2,5,8,8,5,0],"height":[0,2,5,8,8,5,0],"angle":0,"laser":{"damage":[10,10],"rate":10,"type":1,"speed":[200,200],"number":1,"error":0},"propeller":false,"texture":[2.9,1.9,3.9,8,3.9]},"detail12":{"section_segments":6,"offset":{"x":22,"y":5,"z":22},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[15,15,12,12,15],"height":[15,15,12,12,15],"angle":0,"texture":[3.9]},"detail13":{"section_segments":6,"offset":{"x":22,"y":-10,"z":22},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[15,15,12,12,15],"height":[15,15,12,12,15],"angle":0,"texture":[3.9]},"detail14":{"section_segments":6,"offset":{"x":22,"y":-25,"z":22},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[15,15,12,12,15],"height":[15,15,12,12,15],"angle":0,"texture":[3.9]},"detail15":{"section_segments":4,"offset":{"x":6,"y":-100,"z":36},"position":{"x":[0,0,0,0,0,0],"y":[-8,-8,-4.5,4.5,8,8],"z":[0,0,0,0,0,0]},"width":[0,15,15,15,15,0],"height":[0,9,9,9,9,0],"texture":[4,17,4,17,4]},"detail16":{"section_segments":6,"offset":{"x":21,"y":-50,"z":34},"position":{"x":[-18,-18,-5,-5,0,0,0],"y":[-80,-80,-60,-30,-20,58,58],"z":[9,9,0,0,-3,-3,-3]},"width":[0,4,4,4,4,4,0],"height":[0,4,4,4,4,4,0],"texture":[63]},"detail17":{"section_segments":4,"offset":{"x":0,"y":70,"z":54},"position":{"x":[0,0,0,0,0],"y":[-40,-40,5,40,40],"z":[-18,-18,-5,-4,-4]},"width":[0,20,10,10,0],"height":[0,12,6,6,0],"texture":[63]},"detail18":{"section_segments":4,"offset":{"x":0,"y":70,"z":56},"position":{"x":[0,0,0,0,0],"y":[-40,-40,5,38,38],"z":[-18,-18,-5,-4,-4]},"width":[0,18,8,8,0],"height":[0,11,5,5,0],"texture":[4,4,18,4]},"detail19":{"section_segments":6,"offset":{"x":10,"y":115,"z":35},"position":{"x":[0,0,0,0,0,0],"y":[-40,-40,-5,5,40,30],"z":[0,0,0,0,0,0]},"width":[0,10,10,10,8,0],"height":[0,15,15,7,7,0],"propeller":true,"texture":[3.9,8,3.9,16.9,16.9]},"detail20":{"section_segments":6,"offset":{"x":30,"y":-13,"z":-3},"position":{"x":[-15,-5,0,0,0,0],"y":[-50,-37,-10,5,40,30],"z":[0,0,0,0,0,0]},"width":[0,15,15,10,10,0],"height":[0,10,10,7,7,0],"angle":0,"propeller":true,"texture":[63,63,3.9,15,16.9]},"detail21":{"section_segments":6,"offset":{"x":0,"y":-85,"z":25},"position":{"x":[0,0,0,0,0,0],"y":[-60,-65,-55,0,35,40],"z":[0,0,0,0,0,0]},"width":[0,3,15,8,8,0],"height":[0,3,15,8,8,0],"angle":0,"laser":{"damage":[253,253],"rate":0.5,"type":1,"speed":[35,35],"number":1,"error":0},"propeller":false,"texture":[2.9,63,3.9,8,3.9]},"detail22":{"section_segments":6,"offset":{"x":0,"y":-80,"z":-34},"position":{"x":[0,0,0,0,0,0,0],"y":[-36,-34,-28,30,80,100,100],"z":[9,9,9,9,18,33,33]},"width":[0,4,9,19,19,19,0],"height":[0,3,5,6,16,19,0],"texture":[63]},"detail23":{"section_segments":4,"offset":{"x":0,"y":-10,"z":36},"position":{"x":[0,0,0,0,0],"y":[-20,-20,0,35,35],"z":[6,6,0,0,0]},"width":[0,10,20,20,0],"height":[0,5,12,12,0],"texture":[4]},"detail24":{"section_segments":6,"offset":{"x":0,"y":-130,"z":46},"position":{"x":[0,0,0,0],"y":[-10,-10,10,10],"z":[0,0,0,0]},"width":[0,6,6,0],"height":[0,3,3,0],"texture":[1.9,10.25,1.9]},"detail25":{"section_segments":12,"angle":23,"offset":{"x":8,"y":33,"z":5},"position":{"x":[0,0,0,0,0,0],"y":[-14,-14,12,14,10,10],"z":[0,0,0,0,0,0]},"width":[0,10,8,8,4,0],"height":[0,10,8,8,4,0],"texture":[15,3,63,18,17],"vertical":true},"detail26":{"section_segments":12,"angle":23,"offset":{"x":8,"y":33,"z":-15},"position":{"x":[0,0,0,0,0,0],"y":[-14,-14,12,14,10,10],"z":[0,0,0,0,0,0]},"width":[0,10,8,8,4,0],"height":[0,10,8,8,4,0],"texture":[15,3,63,18,17],"vertical":true},"detail27":{"section_segments":8,"offset":{"x":0,"y":15,"z":40},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[10,10,7,7,10],"height":[10,10,7,7,10],"texture":[63,4]},"detail28":{"section_segments":8,"offset":{"x":0,"y":-5,"z":40},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[10,10,7,7,10],"height":[10,10,7,7,10],"texture":[63,4]},"detail29":{"section_segments":8,"offset":{"x":20,"y":-25,"z":36},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[10,10,7,7,10],"height":[10,10,7,7,10],"texture":[63,4]},"detail30":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":55,"z":60},"position":{"x":[10,0,0,10],"y":[-20,-5,5,20],"z":[-25,0,0,-25]},"width":[5,5,5,5],"height":[2,2,2,2],"angle":90,"texture":[1]},"detail31":{"section_segments":6,"angle":0,"offset":{"x":15,"y":-60,"z":34},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-25,-25,-20,-5,5,20,25,25],"z":[0,0,0,0,0,0,0]},"width":[0,5,7,7,7,7,5,0],"height":[0,5,7,7,7,7,5,0],"texture":[63,63,15,3.9,15,63,63]},"detail32":{"section_segments":6,"offset":{"x":20,"y":-100,"z":30},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[10,10,7,7,10],"height":[10,10,7,7,10],"texture":[11]},"detail33":{"section_segments":6,"offset":{"x":0,"y":130,"z":52},"position":{"x":[0,0,0,0],"y":[-18,-18,17,17],"z":[0,0,-7,-7]},"width":[0,6,6,0],"height":[0,3,3,0],"texture":[1.9,15,1.9]}},"wings":{"detail":{"length":[10,35,13],"width":[40,25,35,15],"angle":[-30,-30,-35],"position":[-10,-10,5,10],"doubleside":true,"texture":[17,17,4],"bump":{"position":40,"size":5},"offset":{"x":10,"y":-30,"z":20}},"detail2":{"length":[10,30,13],"width":[40,30,35,15],"angle":[90,90,90],"position":[-10,-10,5,10],"doubleside":true,"texture":[2,2,4],"bump":{"position":30,"size":10},"offset":{"x":0,"y":50,"z":20}},"detail3":{"length":[10,30,5],"width":[20,15,15,5],"angle":[90,90,90],"position":[-10,-10,5,10],"doubleside":true,"texture":[3,3,63],"bump":{"position":0,"size":10},"offset":{"x":0,"y":75,"z":21}},"detail4":{"length":[10,30,5],"width":[20,15,15,5],"angle":[90,90,90],"position":[-10,-10,5,10],"doubleside":true,"texture":[3,3,63],"bump":{"position":0,"size":10},"offset":{"x":0,"y":93,"z":27}},"detail5":{"length":[10,30,5],"width":[20,15,15,5],"angle":[90,90,90],"position":[-10,-10,5,10],"doubleside":true,"texture":[3,3,63],"bump":{"position":0,"size":10},"offset":{"x":0,"y":110,"z":29}},"detail6":{"length":[10,30,5],"width":[20,15,15,5],"angle":[90,90,90],"position":[-10,-10,5,10],"doubleside":true,"texture":[3,3,63],"bump":{"position":0,"size":10},"offset":{"x":0,"y":123,"z":22}},"detail7":{"length":[10,35,12],"width":[40,25,35,15],"angle":[-30,-30,-32],"position":[-10,-10,5,10],"doubleside":true,"texture":[3,11.22,63],"bump":{"position":40,"size":6},"offset":{"x":10,"y":-29,"z":20}}},"typespec":{"name":"Cachalot","level":7,"model":4,"code":704,"specs":{"shield":{"capacity":[850,850],"reload":[18,18]},"generator":{"capacity":[300,300],"reload":[150,150]},"ship":{"mass":575,"speed":[45,45],"rotation":[25,25],"acceleration":[80,80]}},"shape":[9.901,9.734,9.474,7.516,5.72,4.144,4.176,4.28,4.286,4.333,4.232,4.061,2.572,2.57,2.633,2.739,2.905,3.112,3.028,3.161,3.558,4.154,5.082,10.418,10.291,10.25,10.291,10.418,5.082,4.154,3.558,3.161,3.028,3.112,2.905,2.739,2.633,2.57,2.572,4.061,4.232,4.333,4.286,4.28,4.176,4.144,5.72,7.516,9.474,9.734],"lasers":[{"x":1.98,"y":-9.24,"z":0.924,"angle":0,"damage":[10,10],"rate":10,"type":1,"speed":[200,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.98,"y":-9.24,"z":0.924,"angle":0,"damage":[10,10],"rate":10,"type":1,"speed":[200,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":0,"y":-9.9,"z":1.65,"angle":0,"damage":[253,253],"rate":0.5,"type":1,"speed":[35,35],"number":1,"spread":0,"error":0,"recoil":0}],"radius":10.418}}';
 
var Bomb_799 = '{"name":"Bomb","level":7.9,"model":9,"size":1.05,"teamMarkerSize":0,"specs":{"shield":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"generator":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"ship":{"mass":1e+300,"speed":[800,800],"rotation":[1e+300,1e+300],"acceleration":[1e+300,1e+300]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":0,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-65,-60,-50,-20,10,30,55,75,60],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,8,10,30,25,30,18,15,0],"height":[0,6,8,12,20,20,18,15,0],"propeller":true,"texture":[4,63,10,1,1,1,12,17]},"cockpit":{"section_segments":12,"offset":{"x":0,"y":0,"z":20},"position":{"x":[0,0,0,0,0,0,0],"y":[-15,0,20,30,60],"z":[0,0,0,0,0]},"width":[0,13,17,10,5],"height":[0,18,25,18,5],"propeller":false,"texture":[7,9,9,4,4]},"cannon":{"section_segments":6,"offset":{"x":0,"y":-15,"z":-10},"position":{"x":[0,0,0,0,0,0],"y":[-40,-50,-20,0,20,30],"z":[0,0,0,0,0,20]},"width":[0,5,8,11,7,0],"height":[0,5,8,11,10,0],"angle":0,"laser":{"damage":[10000000000000000000,10000000000000000000],"rate":2,"type":1,"speed":[160,180],"number":360,"angle":360},"propeller":false,"texture":[3,3,10,3]}},"wings":{"main":{"length":[60,20],"width":[100,50,40],"angle":[-10,10],"position":[0,20,10],"doubleside":true,"offset":{"x":0,"y":10,"z":5},"bump":{"position":30,"size":20},"texture":[11,63]}},"typespec":{"name":"Bomb","level":7.9,"model":9,"code":799,"specs":{"shield":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"generator":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"ship":{"mass":1e+300,"speed":[800,800],"rotation":[1e+300,1e+300],"acceleration":[1e+300,1e+300]}},"shape":[1.368,1.368,1.093,0.965,0.883,0.827,0.791,0.767,0.758,0.777,0.847,0.951,1.092,1.667,1.707,1.776,1.856,1.827,1.744,1.687,1.525,1.415,1.335,1.606,1.603,1.578,1.603,1.606,1.335,1.415,1.525,1.687,1.744,1.827,1.856,1.776,1.707,1.667,1.654,0.951,0.847,0.777,0.758,0.767,0.791,0.827,0.883,0.965,1.093,1.368],"lasers":[{"x":0,"y":-1.365,"z":-0.21,"angle":0,"damage":[10000000000000000000,10000000000000000000],"rate":2,"type":1,"speed":[160,180],"number":360,"spread":360,"error":0,"recoil":0}],"radius":1.856}}';

var ships = [];
 
ships.push(Squid_301);
ships.push(Archerfish_302);
ships.push(Guitarfish_303);
ships.push(Turtle_304);

ships.push(Cuttlefish_401);
ships.push(Lionfish_402);
ships.push(Lobster_403);
ships.push(Scad_fish_404);
ships.push(Stingray_405);
ships.push(Flying_fish_406);
ships.push(Starfish_407);

ships.push(Swordfish_501);
ships.push(Giant_squid_502);
ships.push(Catfish_503);
ships.push(Dolphin_504);
ships.push(Reef_shark_505);
ships.push(Piranha_506);
ships.push(Sawfish_507);
ships.push(Leatherback_turtle_508);
ships.push(Spider_crab_509);

ships.push(Narwhal_601);
ships.push(Orca_602);
ships.push(Octopus_603);
ships.push(Beaked_whale_604);
ships.push(Shark_605);
ships.push(Grouper_fish_606);
ships.push(Angler_607);
ships.push(Hammerhead_shark_608);
ships.push(Manta_609);
ships.push(Beluga_610);

ships.push(Colossal_squid_701);
ships.push(Fin_whale_702);
ships.push(Whale_shark_703);
ships.push(Cachalot_704);

ships.push(Bomb_799);

var ships_list = [
  ["Squid","Archerfish","Guitarfish","Turtle"],
  ["Cuttlefish","Lionfish","Lobster","Scad_fish","Stingray","Flying_fish","Starfish"],
  ["Swordfish","Giant_squid","Catfish","Dolphin","Reef_shark","Piranha","Sawfish","Leatherback_turtle","Spider_crab"],
  ["Narwhal","Orca","Octopus","Beaked_whale","Shark","Grouper_fish","Angler","Hammerhead_shark","Manta","Beluga"],
  ["Crolossal_sqeid","Fin_Whale","Whale_shark","Cachalot"]
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
