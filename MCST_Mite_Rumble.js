//Rumble made with ships in MCST Mite shiptree
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

killAliens = () => {
  for (let alien of game.aliens){
    alien.set({kill:true});
  }
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

// 3티어 
var Spiral_301 = '{"name":"Spiral","level":3,"model":9,"size":1.3,"specs":{"shield":{"capacity":[100,145],"reload":[5,8]},"generator":{"capacity":[70,100],"reload":[20,32]},"ship":{"mass":80,"speed":[140,165],"rotation":[70,85],"acceleration":[90,110]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":-20,"z":0},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-10,-10,10,40,50,70,80,70],"z":[0,0,0,0,0,0,0,0]},"width":[1,25,25,30,30,30,20,10],"height":[1,25,25,30,30,30,20,0],"texture":[4,11,1,2,12,4,17],"propeller":true},"cockpit":{"section_segments":16,"offset":{"x":0,"y":-30,"z":0},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-20,-20,-10,0,30,40],"z":[0,0,0,0,0,0]},"width":[0,10,20,20,20,0],"height":[0,10,20,20,20,0],"texture":[4,9,1],"propeller":false},"Up_cannons":{"section_segments":8,"offset":{"x":25,"y":0,"z":20},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-45,-20,0,20,50,55],"z":[0,0,0,0,0,0,0]},"width":[0,5,10,10,10,10,0],"height":[0,5,10,10,10,10,0],"angle":0,"laser":{"damage":[3,5],"rate":6,"type":1,"speed":[200,250],"number":1,"angle":0,"error":5},"propeller":false,"texture":[6,4,3,10,63,4]},"down_cannons":{"section_segments":8,"offset":{"x":25,"y":0,"z":-20},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-45,-20,0,20,50,55],"z":[0,0,0,0,0,0,0]},"width":[0,5,10,10,10,10,0],"height":[0,5,10,10,10,10,0],"angle":0,"laser":{"damage":[3,5],"rate":6,"type":1,"speed":[200,250],"number":1,"angle":0,"error":5},"propeller":false,"texture":[6,4,3,10,63,4]}},"wings":{"up_wings":{"offset":{"x":0,"y":20,"z":-7.5},"length":[80,30],"width":[70,50,40],"texture":[11,63],"angle":[40,40],"position":[0,-20,20],"bump":{"position":-10,"size":15}},"Down_wings":{"offset":{"x":0,"y":20,"z":0.5},"length":[80,30],"width":[70,50,40],"texture":[11,63],"angle":[-40,-40],"position":[0,-20,20],"bump":{"position":-10,"size":15}}},"typespec":{"name":"Spiral","level":3,"model":9,"code":309,"specs":{"shield":{"capacity":[100,145],"reload":[5,8]},"generator":{"capacity":[70,100],"reload":[20,32]},"ship":{"mass":80,"speed":[140,165],"rotation":[70,85],"acceleration":[90,110]}},"shape":[1.303,1.323,1.326,1.356,1.453,1.413,1.277,1.17,1.146,1.722,1.757,1.823,1.922,2.069,2.262,2.355,2.496,2.684,1.447,1.425,1.587,1.578,1.644,1.64,1.587,1.563,1.587,1.64,1.644,1.578,1.587,1.425,1.447,2.684,2.496,2.355,2.262,2.069,1.922,1.823,1.757,1.722,1.146,1.17,1.277,1.413,1.453,1.356,1.326,1.323],"lasers":[{"x":0.65,"y":-1.3,"z":0.52,"angle":0,"damage":[3,5],"rate":6,"type":1,"speed":[200,250],"number":1,"spread":0,"error":5,"recoil":0},{"x":-0.65,"y":-1.3,"z":0.52,"angle":0,"damage":[3,5],"rate":6,"type":1,"speed":[200,250],"number":1,"spread":0,"error":5,"recoil":0},{"x":0.65,"y":-1.3,"z":-0.52,"angle":0,"damage":[3,5],"rate":6,"type":1,"speed":[200,250],"number":1,"spread":0,"error":5,"recoil":0},{"x":-0.65,"y":-1.3,"z":-0.52,"angle":0,"damage":[3,5],"rate":6,"type":1,"speed":[200,250],"number":1,"spread":0,"error":5,"recoil":0}],"radius":2.684}}';
var Shadow_X_1_302 = '{"name":"Shadow X-1","level":3,"model":10,"size":1,"zoom":0.8,"specs":{"shield":{"capacity":[90,130],"reload":[4,7]},"generator":{"capacity":[50,80],"reload":[25,35]},"ship":{"mass":70,"speed":[120,165],"rotation":[75,100],"acceleration":[130,150]}},"bodies":{"main":{"section_segments":10,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-100,-98,-95,-70,-40,0,40,70,80,90,100],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,10,20,30,40,20,20,40,40,40,20,0],"height":[0,4,4,20,20,10,10,15,15,15,10,10],"texture":[12,5,63,4,4,63,4,4,5]},"back":{"section_segments":10,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0],"y":[90,95,100,105,90],"z":[0,0,0,0,0]},"width":[10,15,18,19,2],"height":[3,5,7,8,2],"texture":[63],"propeller":true},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-25,"z":15},"position":{"x":[0,0,0,0,0,0],"y":[-45,-40,-25,0,5],"z":[0,0,0,0,0,0]},"width":[0,10,15,13,0],"height":[0,10,15,5,0],"texture":[9]},"laser":{"section_segments":10,"offset":{"x":70,"y":10,"z":-20},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-20,-15,0,10,20,25,30,40,70,60],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,10,15,15,15,10,10,15,5,0],"height":[0,10,15,15,15,10,10,15,5,0],"texture":[3,4,10,3],"propeller":true,"laser":{"damage":[4,5],"rate":10,"type":1,"speed":[180,210],"number":1}}},"wings":{"top":{"doudleside":true,"offset":{"x":0,"y":50,"z":5},"length":[30],"width":[70,30],"angle":[90],"position":[0,50],"texture":[4],"bump":{"position":10,"size":15}},"side_joins":{"doubleside":true,"offset":{"x":0,"y":30,"z":-3},"length":[100],"width":[100,40],"angle":[0],"position":[-50,50],"texture":[4],"bump":{"position":10,"size":10}}},"typespec":{"name":"Shadow X-1","level":3,"model":10,"code":310,"specs":{"shield":{"capacity":[90,130],"reload":[4,7]},"generator":{"capacity":[50,80],"reload":[25,35]},"ship":{"mass":70,"speed":[120,165],"rotation":[75,100],"acceleration":[130,150]}},"shape":[2,1.978,1.939,1.641,1.422,1.261,1.149,0.937,0.86,0.885,0.916,1.446,1.622,1.699,1.74,1.789,2.12,2.469,2.739,2.828,2.076,1.786,1.975,2.035,2.131,2.294,2.131,2.035,1.975,1.786,2.076,2.828,2.739,2.469,2.12,1.789,1.74,1.699,1.622,1.446,0.916,0.885,0.86,0.937,1.149,1.261,1.422,1.641,1.939,1.978],"lasers":[{"x":1.4,"y":-0.2,"z":-0.4,"angle":0,"damage":[4,5],"rate":10,"type":1,"speed":[180,210],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.4,"y":-0.2,"z":-0.4,"angle":0,"damage":[4,5],"rate":10,"type":1,"speed":[180,210],"number":1,"spread":0,"error":0,"recoil":0}],"radius":2.828}}';
var Swept_Wing_303= '{"name":"Swept-Wing","level":3,"model":11,"size":1.3,"specs":{"shield":{"capacity":[110,180],"reload":[4,6]},"generator":{"capacity":[60,90],"reload":[20,32]},"ship":{"mass":120,"speed":[115,135],"rotation":[60,80],"acceleration":[80,100]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":0,"z":10},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-130,-115,-90,0,50,105,90],"z":[0,0,0,0,0,0,0]},"width":[0,15,25,30,35,20,0],"height":[0,10,15,25,25,20,0],"propeller":true,"texture":[63,3,2,10,4,12],"laser":{"damage":[12,21],"rate":1.5,"type":2,"speed":[190,225],"number":1,"error":0}},"cockpit":{"section_segments":12,"offset":{"x":0,"y":-20,"z":20},"position":{"x":[0,0,0,0,0,0,0],"y":[-70,-30,-10,20,70,80],"z":[0,0,0,0,0]},"width":[0,12,15,15,10,5],"height":[0,18,25,25,18,5],"propeller":false,"texture":[9,9,9,4]},"spike":{"section_segments":6,"offset":{"x":0,"y":-100,"z":10},"position":{"x":[0,0,0,0,0,0],"y":[-70,-50,-20,0,20,50],"z":[0,0,0,0,0,0]},"width":[0,5,10,10,15,0],"height":[0,5,10,10,15,0],"angle":0,"texture":[63],"laser":{"damage":[8,15],"rate":1.5,"type":2,"speed":[190,225],"number":1,"error":0}},"cannon":{"section_segments":6,"offset":{"x":15,"y":-65,"z":-5},"position":{"x":[0,0,0,-10,-15,-15],"y":[-40,-50,-20,0,20,30],"z":[0,0,0,0,0,20]},"width":[0,5,8,11,7,0],"height":[0,5,8,11,10,0],"angle":0,"laser":{"damage":[5,6],"rate":4,"type":1,"speed":[160,210],"number":1,"error":2.5},"propeller":false,"texture":[4,4,10,3]},"deco":{"section_segments":8,"offset":{"x":30,"y":50,"z":-5},"position":{"x":[0,0,5,5,0,0,0],"y":[-52,-50,-20,0,20,40,30],"z":[12.5,12.5,12.5,0,0,0,0]},"width":[0,5,10,10,15,10,0],"height":[0,5,10,15,10,10,0],"angle":0,"texture":[4,4,4,63,3,17],"propeller":true},"deco2":{"section_segments":8,"offset":{"x":30,"y":50,"z":20},"position":{"x":[0,0,5,5,0,0,0],"y":[-52,-50,-20,0,20,40,30],"z":[-12.5,-12.5,-12.5,0,0,0,0]},"width":[0,5,10,10,15,10,0],"height":[0,5,10,15,10,10,0],"angle":0,"texture":[4,4,4,63,3,17],"propeller":true}},"wings":{"main":{"length":[30,20],"width":[120,50,40],"angle":[-10,20],"position":[100,-50,30],"doubleside":true,"bump":{"position":30,"size":10},"texture":[11,63],"offset":{"x":0,"y":-60,"z":0}},"winglets":{"length":[45],"width":[40,20,30],"angle":[12.5,-10],"position":[-40,-60,-55],"bump":{"position":0,"size":30},"texture":63,"offset":{"x":0,"y":0,"z":-10}},"stab":{"length":[80,10],"width":[60,40,50],"angle":[0,30],"position":[50,75,90],"doubleside":true,"texture":[63,4],"bump":{"position":0,"size":20},"offset":{"x":0,"y":-20,"z":10}}},"typespec":{"name":"Swept-Wing","level":3,"model":11,"code":311,"specs":{"shield":{"capacity":[110,180],"reload":[4,6]},"generator":{"capacity":[60,90],"reload":[20,32]},"ship":{"mass":120,"speed":[115,135],"rotation":[60,80],"acceleration":[80,100]}},"shape":[4.42,3.259,3.593,2.971,2.464,2.131,1.9,1.721,1.549,1.432,1.348,1.297,0.909,0.956,1.024,1.126,2.628,2.843,3.158,3.379,2.389,2.49,2.561,2.766,2.779,2.735,2.779,2.766,2.561,2.49,2.389,3.379,3.158,2.843,2.628,1.126,1.024,0.956,0.91,1.297,1.348,1.432,1.549,1.721,1.9,2.131,2.464,2.971,3.593,3.259],"lasers":[{"x":0,"y":-3.38,"z":0.26,"angle":0,"damage":[12,21],"rate":1.5,"type":2,"speed":[190,225],"number":1,"spread":0,"error":0,"recoil":0},{"x":0,"y":-4.42,"z":0.26,"angle":0,"damage":[8,15],"rate":1.5,"type":2,"speed":[190,225],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.39,"y":-2.99,"z":-0.13,"angle":0,"damage":[5,6],"rate":4,"type":1,"speed":[160,210],"number":1,"spread":0,"error":2.5,"recoil":0},{"x":-0.39,"y":-2.99,"z":-0.13,"angle":0,"damage":[5,6],"rate":4,"type":1,"speed":[160,210],"number":1,"spread":0,"error":2.5,"recoil":0}],"radius":4.42}}';
var Penetrator_304 = '{"name":"Penetrator","level":3,"model":12,"size":1.5,"specs":{"shield":{"capacity":[100,170],"reload":[4,7]},"generator":{"capacity":[50,85],"reload":[20,35]},"ship":{"mass":100,"speed":[120,140],"rotation":[70,90],"acceleration":[90,120]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":0,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-80,-82.5,-75,-50,0,50,105,110],"z":[0,0,0,0,0,0,10,10]},"width":[0,6,12,20,25,25,10,0],"height":[0,3,8,15,25,25,10,0],"propeller":false,"texture":[17,63,4,63,10,3,12],"laser":{"damage":[15,30],"rate":1,"type":2,"speed":[150,180],"number":1,"error":0}},"main_sides":{"section_segments":12,"offset":{"x":0,"y":0,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-55,-55,-65,-50,0,10,90,90],"z":[0,0,0,0,0,0,10,10]},"width":[0,10,15,10,30,45,30,0],"height":[0,5,10,15,15,15,10,0],"propeller":false,"texture":[1,1,1,2,3,18,1]},"cockpit_front":{"section_segments":10,"offset":{"x":0,"y":-30,"z":15},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-30,-10,10,30,35,90],"z":[0,0,0,0,7,10]},"width":[0,12,15,15,5,3],"height":[0,18,25,25,18,5],"propeller":false,"texture":[9,9,4]},"engines":{"section_segments":12,"offset":{"x":20,"y":70,"z":20},"position":{"x":[0,0,0,0,0,0,0],"y":[-25,-30,-20,0,20,30,20],"z":[0,0,0,0,0,0,0]},"width":[0,3,5,5,9,6,0],"height":[0,3,5,5,5,5,0],"texture":[12,6,63,63,13,17],"angle":0,"propeller":true},"cannons":{"section_segments":10,"offset":{"x":23,"y":-10,"z":10},"position":{"x":[0,0,0,0,-3,-13],"y":[-30,-27,-20,0,20,60],"z":[0,0,0,0,0,0,0]},"width":[0,4,8,10,12,3],"height":[0,3,5,15,15,3],"texture":[6,4,2,4],"angle":1,"laser":{"damage":[1,3],"rate":8,"type":1,"speed":[120,165],"number":1,"error":0}},"cannons2":{"section_segments":10,"offset":{"x":60,"y":18,"z":5},"position":{"x":[0,0,0,0,-3,-13],"y":[-30,-26,-10,20],"z":[0,0,0,0,0,0,0]},"width":[0,4,5,7,8,0],"height":[0,3,4,5,6,0],"texture":[6,4,63,4,4],"angle":1.5,"laser":{"damage":[1,3],"rate":8,"type":1,"speed":[120,165],"number":1,"error":0}}},"wings":{"main":{"length":[40,25],"width":[60,50,40],"angle":[-5,-20],"position":[100,70,80],"doubleside":true,"bump":{"position":30,"size":10},"texture":[11,63],"offset":{"x":20,"y":-40,"z":15}},"main2":{"length":[40,25],"width":[60,50,40],"angle":[-5,-20],"position":[100,70,80],"doubleside":true,"bump":{"position":30,"size":10},"texture":[63,63],"offset":{"x":20,"y":-39,"z":15}},"stab":{"length":[40],"width":[50,20,20],"angle":[70,30],"position":[30,75,80],"doubleside":true,"texture":63,"bump":{"position":0,"size":20},"offset":{"x":10,"y":30,"z":15}}},"typespec":{"name":"Penetrator","level":3,"model":12,"code":312,"specs":{"shield":{"capacity":[100,170],"reload":[4,7]},"generator":{"capacity":[50,85],"reload":[20,35]},"ship":{"mass":100,"speed":[120,140],"rotation":[70,90],"acceleration":[90,120]}},"shape":[2.48,2.482,2.146,1.759,1.445,1.368,1.322,1.252,1.153,1.084,1.038,1.909,1.914,1.959,2.58,2.687,2.853,3.084,3.098,2.457,2.476,2.545,2.846,3.522,3.311,3.3,3.311,3.522,2.846,2.545,2.476,2.457,3.098,3.084,2.853,2.687,2.58,1.959,1.914,1.909,1.038,1.084,1.153,1.252,1.322,1.368,1.445,1.759,2.146,2.482],"lasers":[{"x":0,"y":-2.475,"z":0.3,"angle":0,"damage":[15,30],"rate":1,"type":2,"speed":[150,180],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.674,"y":-1.2,"z":0.3,"angle":1,"damage":[1,3],"rate":8,"type":1,"speed":[120,165],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.674,"y":-1.2,"z":0.3,"angle":-1,"damage":[1,3],"rate":8,"type":1,"speed":[120,165],"number":1,"spread":0,"error":0,"recoil":0},{"x":1.776,"y":-0.36,"z":0.15,"angle":1.5,"damage":[1,3],"rate":8,"type":1,"speed":[120,165],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.776,"y":-0.36,"z":0.15,"angle":-1.5,"damage":[1,3],"rate":8,"type":1,"speed":[120,165],"number":1,"spread":0,"error":0,"recoil":0}],"radius":3.522}}';

// 4티어 
var Wolverine_401 = '{"name":"Wolverine","level":4,"model":17,"size":1.7,"specs":{"shield":{"capacity":[130,200],"reload":[5,8]},"generator":{"capacity":[90,150],"reload":[35,55]},"ship":{"mass":125,"speed":[115,140],"rotation":[50,90],"acceleration":[90,110]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":25,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-79,-84,-82,-60,-10,36,30],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,2,5,17,22,14,0],"height":[0,2,5,18,29,15,0],"propeller":true,"texture":[12,5,63,1,10,17]},"cockpit":{"section_segments":8,"offset":{"x":0,"y":15,"z":13.45},"position":{"x":[0,0,0,0],"y":[-50,-40,-25,-10],"z":[0,-2,0,-1.5]},"width":[0,10,12,10,0],"height":[0,10,15,16,0],"texture":[9]},"cannon":{"section_segments":6,"offset":{"x":38,"y":0,"z":-8.75},"position":{"x":[0,0,0,0,0,0],"y":[-50,-56,-20,-10,10,0],"z":[0,0,0,0,5,0]},"width":[0,4,6,10,7,0],"height":[0,4,6,15,5,0],"angle":0,"laser":{"damage":[4,6],"rate":3,"type":1,"speed":[130,160],"number":5,"angle":20,"error":0},"propeller":false,"texture":[3,3,10,3]},"side_propulsors":{"section_segments":12,"offset":{"x":24,"y":-5,"z":0},"position":{"x":[-2,-7,-3,-9,-12,-10],"y":[10,0,20,50,70,60],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,7,8,8,6,0],"height":[0,10,18,10,12,0],"texture":[17,63,4,12,17],"propeller":true}},"wings":{"top_join":{"doubleside":true,"offset":{"x":16,"y":5,"z":0},"length":[20],"width":[40,30],"angle":[40],"position":[0,50],"texture":[63],"bump":{"position":10,"size":10}},"side_joins":{"doubleside":true,"offset":{"x":11,"y":0,"z":0},"length":[38,-4,14],"width":[45,40,100,30],"angle":[-10,0,10],"position":[35,-5,0,0],"texture":[11,63],"bump":{"position":15,"size":23}}},"typespec":{"name":"Wolverine","level":4,"model":17,"code":417,"specs":{"shield":{"capacity":[130,200],"reload":[5,8]},"generator":{"capacity":[90,150],"reload":[35,55]},"ship":{"mass":125,"speed":[115,140],"rotation":[50,90],"acceleration":[90,110]}},"shape":[2.007,1.973,1.692,1.48,2.254,2.369,2.274,2.18,2.093,2.043,2.044,2.041,1.994,1.994,2.041,2.044,2.043,2.093,2.18,2.274,1.986,2.496,2.607,2.293,2.25,2.078,2.25,2.293,2.607,2.496,1.986,2.274,2.18,2.093,2.043,2.044,2.041,1.994,1.994,2.041,2.044,2.043,2.093,2.18,2.274,2.369,2.254,1.48,1.692,1.973],"lasers":[{"x":1.292,"y":-1.904,"z":-0.298,"angle":0,"damage":[4,6],"rate":3,"type":1,"speed":[130,160],"number":5,"spread":20,"error":0,"recoil":0},{"x":-1.292,"y":-1.904,"z":-0.298,"angle":0,"damage":[4,6],"rate":3,"type":1,"speed":[130,160],"number":5,"spread":20,"error":0,"recoil":0}],"radius":2.607}}';
var Boomerang_402 = '{"name":"Boomerang","level":4,"model":18,"size":1.6,"specs":{"shield":{"capacity":[140,205],"reload":[4,6.5]},"generator":{"capacity":[50,80],"reload":[27,45]},"ship":{"mass":180,"speed":[110,135],"rotation":[70,85],"acceleration":[90,110]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-125,-120,-100,-50,0,40,90,120,90],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,5,15,20,25,30,20,20,0],"height":[0,5,15,20,25,30,20,20,0],"texture":[4,63,2,1,4,10,13,17],"propeller":true},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-85,"z":11},"position":{"x":[0,0,0,0,0,0,0],"y":[-20,-10,10,30,60],"z":[-2,0,0,0,10]},"width":[0,6,8,10,0],"height":[0,5,14,14,0],"texture":[3,9,9,4],"propeller":false},"cannons":{"section_segments":12,"offset":{"x":26,"y":40,"z":0},"position":{"x":[0,0,0,0,0,0,0,-5,-10,-10],"y":[-80,-90,-75,-50,-45,-20,0,20,50,55],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,6,8,8,10,10,16,18,15,0],"height":[0,5,7,8,10,10,10,15,15,0],"angle":0,"laser":{"damage":[4.5,7],"rate":1,"type":2,"speed":[130,175],"number":5,"error":0,"recoil":5,"angle":5},"propeller":false,"texture":[13,3,2,3,10,3,63,4,18]},"side_propulsors":{"section_segments":10,"offset":{"x":25,"y":25,"z":15},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-1,6,8,25,30,40,60,50],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,8,9,10,10,8,8,0,0,0],"height":[0,8,9,10,10,8,8,0,0,0],"propeller":true,"texture":[4,2,10,2,63,13,17,17]}},"wings":{"main":{"offset":{"x":0,"y":60,"z":0},"length":[50,30,20],"width":[70,50,50,20],"texture":[4,8,63],"angle":[-10,-10,-10],"position":[10,-20,-50,-80],"bump":{"position":-10,"size":15}}},"typespec":{"name":"Boomerang","level":4,"model":18,"code":418,"specs":{"shield":{"capacity":[140,205],"reload":[4,6.5]},"generator":{"capacity":[50,80],"reload":[27,45]},"ship":{"mass":180,"speed":[110,135],"rotation":[70,85],"acceleration":[90,110]}},"shape":[4,3.7,2.786,1.97,1.895,1.9,1.672,1.489,1.341,1.239,3.294,3.253,3.176,3.006,2.873,2.794,2.76,2.683,2.61,2.595,2.624,2.685,3.046,3.411,3.893,3.847,3.893,3.411,3.046,2.685,2.624,2.595,2.61,2.683,2.76,2.794,2.873,3.006,3.176,3.253,3.294,1.239,1.341,1.489,1.672,1.9,1.895,1.97,2.786,3.7],"lasers":[{"x":0.832,"y":-1.6,"z":0,"angle":0,"damage":[4.5,7],"rate":1,"type":2,"speed":[130,175],"number":5,"spread":5,"error":0,"recoil":5},{"x":-0.832,"y":-1.6,"z":0,"angle":0,"damage":[4.5,7],"rate":1,"type":2,"speed":[130,175],"number":5,"spread":5,"error":0,"recoil":5}],"radius":4}}';
var Shuriken_403 = '{"name":"Shuriken","level":4,"model":19,"size":2.35,"specs":{"shield":{"capacity":[140,200],"reload":[5,7]},"generator":{"capacity":[105,160],"reload":[20,40]},"ship":{"mass":120,"speed":[115,145],"rotation":[80,120],"acceleration":[100,130]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":10,"z":-4},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-60,-56,-45,-20,-10,30,35,29],"z":[-7,-7,-7,-4,0,0,0,0]},"width":[0,7,13,9,13,9,8,0],"height":[0,7,14,10,14,8,6,0],"propeller":true,"texture":[6,3,1,10,8,4,17],"laser":{"damage":[8,11],"rate":1,"type":2,"speed":[100,200],"number":5,"error":0,"angle":7}},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-35,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[-9,0,18,30,34],"z":[0,0,0,-8,0]},"width":[0,6,7,2,0],"height":[0,8,7,6,5],"propeller":false,"texture":[9,9,9,3,4]},"cannon":{"section_segments":8,"offset":{"x":17,"y":29,"z":5},"position":{"x":[0,0,0,0,0,0],"y":[-40,-50,-20,0,0,-1],"z":[0,0,0,0,0,0]},"width":[0,3,4,4,4,0],"height":[0,3,9,4,4,0],"angle":0,"laser":{"damage":[2.5,4],"rate":5,"type":1,"speed":[90,150],"number":1,"error":0},"propeller":false,"texture":[12,3,10,17]},"boosters":{"section_segments":8,"offset":{"x":36,"y":34,"z":14},"position":{"x":[0,0,0,0,0,1,0,0],"y":[-52.5,-48,-33,-22.5,-15,-6,9,0,null],"z":[0,0,0,0,0,0,0,0]},"width":[0,6,10.5,4.5,6,9,6,0,null],"height":[0,7.5,12,6,7.5,9,6,0,null],"angle":0,"propeller":true,"texture":[1,10,4,5,63,12,17]}},"wings":{"main":{"length":[21,22,18],"width":[20,30,20,10],"angle":[20,50,10,0],"position":[0,-10,0,0],"doubleside":true,"offset":{"x":0,"y":30,"z":0},"bump":{"position":10,"size":13},"texture":[63,11,63]}},"typespec":{"name":"Shuriken","level":4,"model":19,"code":419,"specs":{"shield":{"capacity":[140,200],"reload":[5,7]},"generator":{"capacity":[105,160],"reload":[20,40]},"ship":{"mass":120,"speed":[115,145],"rotation":[80,120],"acceleration":[100,130]}},"shape":[2.35,2.272,2.085,1.822,1.234,1.281,1.363,1.286,1.167,2.006,2.081,2.108,2.171,2.186,2.078,2.096,2.766,2.931,2.854,2.825,2.622,2.008,1.856,2.081,2.148,2.119,2.148,2.081,1.856,2.008,2.622,2.825,2.854,2.931,2.766,2.096,2.078,2.186,2.171,2.108,2.081,2.006,1.167,1.286,1.363,1.281,1.234,1.822,2.085,2.272],"lasers":[{"x":0,"y":-2.35,"z":-0.188,"angle":0,"damage":[8,11],"rate":1,"type":2,"speed":[100,200],"number":5,"spread":7,"error":0,"recoil":0},{"x":0.799,"y":-0.987,"z":0.235,"angle":0,"damage":[2.5,4],"rate":5,"type":1,"speed":[90,150],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.799,"y":-0.987,"z":0.235,"angle":0,"damage":[2.5,4],"rate":5,"type":1,"speed":[90,150],"number":1,"spread":0,"error":0,"recoil":0}],"radius":2.931}}';
var Robin_404 = '{"name":"Robin","level":4,"model":20,"size":1.5,"specs":{"shield":{"capacity":[150,215],"reload":[5,7]},"generator":{"capacity":[80,110],"reload":[40,60]},"ship":{"mass":135,"speed":[100,125],"rotation":[60,80],"acceleration":[80,100]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":-30,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-70,-75,-50,0,50,105,120,110],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,10,20,30,35,25,20,0],"height":[0,7.5,13,17.5,17.5,17.5,13,0],"propeller":1,"texture":[6,63,4,8,11,4],"laser":{"damage":[15,30],"rate":1,"type":2,"speed":[140,205],"number":1,"angle":0,"error":0}},"cockpit":{"section_segments":10,"offset":{"x":0,"y":-50,"z":20},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-30,-10,10,25,65,130],"z":[0,0,0,0,0,0]},"width":[5,10,15,18,15,0],"height":[0,15,20,18,15,0],"propeller":false,"texture":[9,9,4,63,4]},"cannons":{"section_segments":12,"offset":{"x":25,"y":-20,"z":5},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-45,-20,0,20,50,55],"z":[0,0,0,0,0,0,0]},"width":[0,5,10,10,10,10,0],"height":[0,5,15,15,10,5,0],"angle":0,"texture":[6,4,10,4,63,2],"laser":{"damage":[4,7],"rate":8,"type":1,"speed":[100,150],"number":1,"error":0}},"winglets":{"section_segments":12,"offset":{"x":60,"y":30,"z":10},"position":{"x":[-5,-5,0,0,0,0,0],"y":[-52,-50,-20,15,40,50,51],"z":[0,0,0,0,0,0,0]},"width":[0,5,10,10,8,2,0],"height":[0,2,15,15,15,2,0],"angle":-5,"propeller":false,"texture":[4,4,63,3,4,3]}},"wings":{"main":{"length":[50],"width":[110,50],"angle":[0,20],"position":[30,60,30],"doubleside":true,"bump":{"position":10,"size":10},"texture":[11,63],"offset":{"x":10,"y":-20,"z":10}},"stab2":{"length":[45],"width":[65,20],"angle":[30],"position":[70,135],"doubleside":true,"texture":63,"bump":{"position":0,"size":5},"offset":{"x":-5,"y":-45,"z":10}}},"typespec":{"name":"Robin","level":4,"model":20,"code":420,"specs":{"shield":{"capacity":[150,215],"reload":[5,7]},"generator":{"capacity":[80,110],"reload":[40,60]},"ship":{"mass":135,"speed":[100,125],"rotation":[60,80],"acceleration":[80,100]}},"shape":[3.156,3.164,2.688,2.23,2.123,1.83,1.628,1.439,1.297,1.198,2.02,2.027,2.072,2.152,2.2,2.265,2.37,2.521,2.713,2.9,2.958,2.306,3.168,3.074,2.748,2.705,2.748,3.074,3.168,2.306,2.958,2.9,2.713,2.521,2.37,2.265,2.2,2.152,2.072,2.027,2.02,1.198,1.297,1.439,1.628,1.83,2.123,2.23,2.688,3.164],"lasers":[{"x":0,"y":-3.15,"z":0.3,"angle":0,"damage":[15,30],"rate":1,"type":2,"speed":[140,205],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.75,"y":-2.1,"z":0.15,"angle":0,"damage":[4,7],"rate":8,"type":1,"speed":[100,150],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.75,"y":-2.1,"z":0.15,"angle":0,"damage":[4,7],"rate":8,"type":1,"speed":[100,150],"number":1,"spread":0,"error":0,"recoil":0}],"radius":3.168}}';
var Optimus_405 = '{"name":"Optimus","level":4,"model":21,"size":1.4,"specs":{"shield":{"capacity":[155,205],"reload":[6,9]},"generator":{"capacity":[80,120],"reload":[23,35]},"ship":{"mass":130,"speed":[115,140],"rotation":[30,50],"acceleration":[50,70]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":0,"z":10},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-125,-110,-50,0,50,105,90],"z":[0,0,0,0,0,0,0]},"width":[0,20,25,30,35,20,0],"height":[0,20,25,30,35,20,0],"propeller":true,"texture":[63,10,2,63,3,12]},"cockpit":{"section_segments":12,"offset":{"x":0,"y":-30,"z":30},"position":{"x":[0,0,0,0,0,0,0],"y":[-30,-10,10,30,90],"z":[0,0,0,0,12]},"width":[0,10,13,10,0],"height":[0,18,22,18,0],"propeller":false,"texture":[9,9,9,4]},"cannon":{"section_segments":8,"offset":{"x":40,"y":-70,"z":0},"position":{"x":[0,0,0,0,0,5],"y":[-40,-50,-20,10,35,60],"z":[0,0,0,0,0,0]},"width":[0,5,10,10,10,0],"height":[0,5,15,15,10,0],"angle":0,"laser":{"damage":[15,25],"rate":1,"type":2,"speed":[150,200],"number":1,"error":0},"propeller":false,"texture":[17,4,63,10,3]},"propulsors1":{"section_segments":10,"offset":{"x":75,"y":65,"z":-15},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-50,-30,-35,-20,5,15,30,50,60,50],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,10,13,18,20,20,20,20,15,0],"height":[0,10,13,18,20,20,20,20,15,0],"texture":[4,4,63,3,2,63,4,12,17],"propeller":true},"propulsors2":{"section_segments":10,"offset":{"x":35,"y":50,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-50,-30,-35,-20,5,15,30,50,60,50],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,10,13,18,20,20,20,20,15,0],"height":[0,10,13,18,20,20,20,20,15,0],"texture":[4,4,63,3,2,63,4,12,17],"propeller":true}},"wings":{"main":{"length":[70,30],"width":[80,50,50],"angle":[-30,20],"position":[30,-30,30],"doubleside":true,"bump":{"position":30,"size":10},"texture":[11,63],"offset":{"x":0,"y":-60,"z":0}},"main2":{"length":[90,30],"width":[50,50,30],"angle":[-10,20],"position":[-20,40,0],"doubleside":true,"bump":{"position":30,"size":10},"texture":[11,63],"offset":{"x":0,"y":50,"z":0}},"winglets":{"length":[40],"width":[80,40,100],"angle":[10,-10],"position":[-40,-60,-55],"bump":{"position":0,"size":30},"texture":63,"offset":{"x":0,"y":0,"z":-5}},"stab":{"length":[50,30],"width":[80,50,50],"angle":[40,30],"position":[70,75,100],"doubleside":true,"texture":[63,4],"bump":{"position":0,"size":20},"offset":{"x":0,"y":-12,"z":0}}},"typespec":{"name":"Optimus","level":4,"model":21,"code":421,"specs":{"shield":{"capacity":[155,205],"reload":[6,9]},"generator":{"capacity":[80,120],"reload":[23,35]},"ship":{"mass":130,"speed":[115,140],"rotation":[30,50],"acceleration":[50,70]}},"shape":[3.5,3.347,3.533,3.588,3.64,3.439,3.207,3.051,2.955,2.833,2.673,2.565,2.506,1.049,2.234,3.517,3.731,3.768,3.852,4.129,4.301,4.145,3.375,3.238,3.135,2.946,3.135,3.238,3.375,4.145,4.301,4.129,3.852,3.768,3.731,3.517,2.234,1.049,2.506,2.565,2.673,2.833,2.955,3.051,3.207,3.439,3.64,3.588,3.533,3.347],"lasers":[{"x":1.12,"y":-3.36,"z":0,"angle":0,"damage":[15,25],"rate":1,"type":2,"speed":[150,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.12,"y":-3.36,"z":0,"angle":0,"damage":[15,25],"rate":1,"type":2,"speed":[150,200],"number":1,"spread":0,"error":0,"recoil":0}],"radius":4.301}}';
var Prototype_T1_406 = '{"name":"Prototype-T1","level":4,"model":22,"size":1.55,"specs":{"shield":{"capacity":[165,215],"reload":[8,10]},"generator":{"capacity":[70,110],"reload":[21,33]},"ship":{"mass":130,"speed":[110,130],"rotation":[80,100],"acceleration":[110,160]}},"bodies":{"front":{"section_segments":8,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0],"y":[-150,-105,-25,0,25],"z":[-5,0,0,0,0]},"width":[7,17,17,17,20],"height":[0,20,30,20,5],"texture":[63,11,2,63],"laser":{"damage":[15,22],"rate":2,"type":1,"speed":[120,180],"number":1,"error":0}},"cockpit":{"section_segments":8,"offset":{"x":0,"y":0,"z":10},"position":{"x":[0,0,0,0,0],"y":[-70,-70,-25,0,100],"z":[0,0,0,0,9]},"width":[0,10,15,15,10],"height":[0,15,25,20,0],"texture":[9,9,9,4]},"side":{"section_segments":8,"offset":{"x":40,"y":90,"z":10},"position":{"x":[-30,-10,-5,0],"y":[-200,-50,0,20],"z":[-5,0,0,0]},"width":[0,10,10,0],"height":[0,10,10,0],"texture":[4,63,3]},"bigpropel":{"section_segments":8,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0],"y":[10,20,30,100,95],"z":[0,0,0,0,0]},"width":[10,20,20,20,0],"height":[10,20,40,30,0],"texture":[63,63,10,4],"propeller":true},"propulsors":{"section_segments":8,"offset":{"x":15,"y":50,"z":10},"position":{"x":[0,0,0,0,0,5,10,10,10,10],"y":[-160,-130,-110,10,20,25,30,40,50,40],"z":[-5,-5,-5,-5,0,0,0,0,0,0]},"width":[0,10,15,15,10,10,10,10,10,0],"height":[0,10,15,15,10,10,10,10,10,0],"texture":[3,63,3,3,3,63,4],"propeller":true}},"wings":{"main":{"doubleside":true,"offset":{"x":15,"y":-30,"z":-3},"length":[20,15],"width":[150,90,10],"angle":[-20,-20,0],"position":[-20,0,70],"texture":[4,63],"bump":{"position":20,"size":5}},"winglets":{"doubleside":true,"offset":{"x":20,"y":60,"z":10},"length":[20,60,20],"width":[20,40,20],"angle":[0,0,0],"position":[0,0,10,0],"texture":[63,3],"bump":{"position":30,"size":10}}},"typespec":{"name":"Prototype-T1","level":4,"model":22,"code":422,"specs":{"shield":{"capacity":[165,215],"reload":[8,10]},"generator":{"capacity":[70,110],"reload":[21,33]},"ship":{"mass":130,"speed":[110,130],"rotation":[80,100],"acceleration":[110,160]}},"shape":[4.655,4.394,3.441,2.871,2.463,2.075,1.825,1.63,1.521,1.433,1.372,1.342,1.345,1.376,1.428,1.514,1.641,3.831,3.97,3.619,3.211,3.208,3.628,3.259,3.156,3.106,3.156,3.259,3.628,3.208,3.211,3.619,3.97,3.831,1.641,1.514,1.428,1.376,1.345,1.342,1.372,1.433,1.521,1.63,1.825,2.075,2.463,2.871,3.441,4.394],"lasers":[{"x":0,"y":-4.65,"z":0,"angle":0,"damage":[15,22],"rate":2,"type":1,"speed":[120,180],"number":1,"spread":0,"error":0,"recoil":0}],"radius":4.655}}';
var Centauri_Warrior_407 = '{"name":"Centauri-Warrior","level":4,"model":23,"size":1.7,"specs":{"shield":{"capacity":[130,200],"reload":[7.5,11]},"generator":{"capacity":[80,115],"reload":[23,36]},"ship":{"mass":130,"speed":[100,130],"rotation":[50,100],"acceleration":[45,95]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":0,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-105,-95,-100,-60,-30,25,50,55,60,50],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,5,10,25,25,25,25,25,15,0],"height":[0,5,7.5,15,15,15,15,15,10,0],"texture":[6,6,10,63,3,63,12,12,17],"propeller":true,"laser":{"damage":[22,31],"rate":1,"type":1,"speed":[200,250],"number":1,"error":0}},"cockpit":{"section_segments":12,"offset":{"x":0,"y":0,"z":15},"position":{"x":[0,0,0,0,0,0],"y":[-100,-70,-45,-20,40,0],"z":[0,0,0,0,-5,0]},"width":[0,10,15,15,10,0],"height":[0,15,20,20,15,0],"texture":[4,9,9,11,4,4]},"tube":{"section_segments":12,"offset":{"x":30,"y":40,"z":5},"position":{"x":[-15,-2,-2,-6,-5,-5,-5],"y":[-120,-90,-50,-20,20,30,25],"z":[0,0,0,0,0,0,0]},"width":[0,5,10,12,15,10,0],"height":[0,5,12.5,12,15,10,0],"texture":[3,63,10,4,12,17],"propeller":true,"angle":0},"cannons":{"section_segments":12,"offset":{"x":80,"y":50,"z":-32},"position":{"x":[0,0,0,0,0,0],"y":[-45,-40,0,20,30,40],"z":[0,0,0,0,0,0]},"width":[0,5,5,7,7,0],"height":[0,5,10,10,7,0],"texture":[6,3,2,4,4],"propeller":false,"angle":0,"laser":{"damage":[3,4],"rate":3,"type":1,"speed":[120,180],"number":1,"error":0}},"cannons2":{"section_segments":12,"offset":{"x":34,"y":-20,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-45,-40,0,20,50,60],"z":[0,0,0,0,0,0]},"width":[0,5,5,7,7,0],"height":[0,5,10,10,7,0],"texture":[6,3,2,4,4],"propeller":false,"angle":0,"laser":{"damage":[3,4],"rate":3,"type":1,"speed":[120,180],"number":1,"error":0}}},"wings":{"xwing1":{"doubleside":true,"offset":{"x":0,"y":65,"z":5},"length":[45,35],"width":[70,40,30],"angle":[50,-20],"position":[-70,-10,-20],"texture":[4,10],"bump":{"position":10,"size":10}},"xwing2":{"doubleside":true,"offset":{"x":0,"y":70,"z":5},"length":[55,35],"width":[70,40,30],"angle":[-10,-50],"position":[-70,-10,-20],"texture":[4,1],"bump":{"position":10,"size":15}}},"typespec":{"name":"Centauri-Warrior","level":4,"model":23,"code":423,"specs":{"shield":{"capacity":[130,200],"reload":[7.5,11]},"generator":{"capacity":[80,115],"reload":[23,36]},"ship":{"mass":130,"speed":[100,130],"rotation":[50,100],"acceleration":[45,95]}},"shape":[3.57,3.417,2.895,2.432,2.494,2.439,2.071,1.814,1.632,1.509,1.442,1.403,1.393,2.912,2.982,3.108,3.293,3.624,4.024,4.094,3.302,2.964,2.733,2.502,2.236,2.044,2.236,2.502,2.733,2.964,3.302,4.094,4.024,3.624,3.293,3.108,2.982,2.912,1.394,1.403,1.442,1.509,1.632,1.814,2.071,2.439,2.494,2.432,2.895,3.417],"lasers":[{"x":0,"y":-3.57,"z":0.34,"angle":0,"damage":[22,31],"rate":1,"type":1,"speed":[200,250],"number":1,"spread":0,"error":0,"recoil":0},{"x":2.72,"y":0.17,"z":-1.088,"angle":0,"damage":[3,4],"rate":3,"type":1,"speed":[120,180],"number":1,"spread":0,"error":0,"recoil":0},{"x":-2.72,"y":0.17,"z":-1.088,"angle":0,"damage":[3,4],"rate":3,"type":1,"speed":[120,180],"number":1,"spread":0,"error":0,"recoil":0},{"x":1.156,"y":-2.21,"z":0,"angle":0,"damage":[3,4],"rate":3,"type":1,"speed":[120,180],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.156,"y":-2.21,"z":0,"angle":0,"damage":[3,4],"rate":3,"type":1,"speed":[120,180],"number":1,"spread":0,"error":0,"recoil":0}],"radius":4.094}}';
var Outrider_408 = '{"name":"Outrider","level":4,"model":24,"size":1.8,"specs":{"shield":{"capacity":[135,205],"reload":[7,10]},"generator":{"capacity":[85,125],"reload":[25,37]},"ship":{"mass":120,"speed":[125,155],"rotation":[60,80],"acceleration":[70,95]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":-10,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-65,-70,-70,-50,-25,-5,40,65,85,65],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,8,16,20,25,27,30,27,16,0],"height":[0,8,10,10,13,17,19,17,12,0],"texture":[12,5,4,63,2,10.24,2,3,17],"propeller":true,"angle":0,"laser":{"damage":[4,6],"rate":8,"type":1,"speed":[150,230],"number":1,"error":0}},"cockpit":{"section_segments":8,"offset":{"x":0,"y":20,"z":18},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-35,-30,-10,15,25,34],"z":[-2,-7,-9,-10,-6,0]},"width":[0,10,13,15,13,0],"height":[0,10,16,17,10,0],"texture":[4,9,9,3,4],"propeller":false},"Systems":{"section_segments":8,"offset":{"x":0,"y":-40,"z":6.5},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-25,-20,0,11,19,29],"z":[3,-4,-2,-1,0,0,0]},"width":[3,7,7,7,7,0],"height":[0,10,10,10,10,0],"texture":[4,8,15,4,3],"propeller":false},"cannon":{"section_segments":6,"offset":{"x":20,"y":-30,"z":0},"position":{"x":[-5,-5,0,3,0,0],"y":[-55,-50,-20,0,20,50],"z":[0,0,0,0,0,0]},"width":[0,5,5,5,5,0],"height":[0,5,5,5,5,0],"angle":0,"laser":{"damage":[5,7],"rate":5,"type":2,"speed":[150,175],"number":1,"error":0},"propeller":false,"texture":[6,3,4]},"propulsors":{"section_segments":12,"offset":{"x":50,"y":60,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-45,-55,-50,-20,0,20,30,40,30],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,7,10,15,15,15,15,10,0],"height":[0,7,10,15,15,15,15,10,0],"texture":[13,11,10,4,3,12,4,17],"angle":0,"propeller":true}},"wings":{"main":{"length":[40,15],"width":[60,40,40],"angle":[0,0],"position":[55,55,55],"texture":[8,15],"doubleside":true,"offset":{"x":0,"y":1,"z":-3},"bump":{"position":30,"size":10}},"FinThings1":{"length":[50],"width":[25,20],"angle":[-8],"position":[2,40],"texture":[63],"doubleside":true,"offset":{"x":10,"y":0,"z":3},"bump":{"position":10,"size":5}},"FinThings2":{"length":[10,15],"width":[50,31,20],"angle":[-22,-22],"position":[12,20,20],"texture":[4,63],"doubleside":true,"offset":{"x":60,"y":40,"z":-4},"bump":{"position":10,"size":5}}},"typespec":{"name":"Outrider","level":4,"model":24,"code":424,"specs":{"shield":{"capacity":[135,205],"reload":[7,10]},"generator":{"capacity":[85,125],"reload":[25,37]},"ship":{"mass":120,"speed":[125,155],"rotation":[60,80],"acceleration":[70,95]}},"shape":[2.886,3.107,3.073,2.507,2.038,1.725,1.518,1.308,1.18,1.105,1.053,1.022,1.008,2.119,2.261,2.418,2.647,3.701,3.914,3.807,4.133,4.198,3.979,3.01,3.052,3.096,3.052,3.01,3.979,4.198,4.133,3.807,3.914,3.701,2.647,2.418,2.261,2.119,1.008,1.022,1.053,1.105,1.18,1.308,1.518,1.725,2.038,2.507,3.073,3.107],"lasers":[{"x":0,"y":-2.88,"z":0,"angle":0,"damage":[4,6],"rate":8,"type":1,"speed":[150,230],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.54,"y":-3.06,"z":0,"angle":0,"damage":[5,7],"rate":5,"type":2,"speed":[150,175],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.54,"y":-3.06,"z":0,"angle":0,"damage":[5,7],"rate":5,"type":2,"speed":[150,175],"number":1,"spread":0,"error":0,"recoil":0}],"radius":4.198}}';

// 5티어 
var Pursuer_501 = '{"name":"Pursuer","level":5,"model":33,"size":1.45,"specs":{"shield":{"capacity":[150,200],"reload":[3,6]},"generator":{"capacity":[90,115],"reload":[25,35]},"ship":{"mass":150,"speed":[115,140],"rotation":[60,80],"acceleration":[80,100]}},"bodies":{"front":{"section_segments":12,"offset":{"x":0,"y":-60,"z":10},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-90,-90,-80,0,40,105,90],"z":[0,0,0,0,0,0,0]},"width":[0,10,15,25,25,20,0],"height":[0,10,15,25,25,20,0],"propeller":false,"texture":[63,63,4,4,1]},"frontsides":{"section_segments":20,"offset":{"x":40,"y":-60,"z":10},"position":{"x":[0,0,0,-10,0,0],"y":[0,0,17,25,20],"z":[0,0,0,0,0,0]},"width":[0,50,90,100,0],"height":[0,10,25,20,0],"texture":[63,1,63,17],"angle":-90},"cockpit":{"section_segments":12,"offset":{"x":0,"y":-35,"z":25},"position":{"x":[0,0,0,0,0,0,0],"y":[-60,-30,0,15,40],"z":[0,0,0,0,0]},"width":[0,12,18,15,0],"height":[0,18,25,15,0],"texture":[9,9,63],"propeller":false},"top_back":{"section_segments":12,"offset":{"x":0,"y":25,"z":20},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-50,-55,-40,-10,17,55,50],"z":[0,15,0,0,0,-5,-5]},"width":[0,15,23,27,25,20,0],"height":[0,13,30,30,30,7.5,0],"propeller":false,"texture":[1,11,10,2,11,3]},"cannon1":{"section_segments":8,"offset":{"x":10,"y":-105,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-40,-50,-20,0,20,50],"z":[0,0,0,0,0,0]},"width":[0,2,5,5,5,0],"height":[0,2,5,5,5,0],"angle":0,"laser":{"damage":[15,25],"rate":1,"type":2,"speed":[150,175],"number":1,"error":0},"propeller":false,"texture":[3,5,4]},"cannon2":{"section_segments":8,"offset":{"x":10,"y":-105,"z":20},"position":{"x":[0,0,0,0,0,0],"y":[-40,-50,-20,0,20,50],"z":[0,0,0,0,0,0]},"width":[0,2,5,5,5,0],"height":[0,2,5,5,5,0],"angle":0,"laser":{"damage":[15,25],"rate":1,"type":2,"speed":[150,175],"number":1,"error":0},"propeller":false,"texture":[3,5,4]},"sidesss":{"section_segments":8,"offset":{"x":22.5,"y":40,"z":15},"position":{"x":[-5,11,15,5,5,2,10,8],"y":[-110,-80,-50,-20,0,22,43,53],"z":[15,10,0,0,0,0,0,0]},"width":[0,10,11,12,13,8,7.5,0],"height":[0,10,15,20,20,20,10,0],"angle":0,"texture":[4,3,63,18,63,4,63]},"propulsors":{"section_segments":16,"offset":{"x":13,"y":45,"z":8},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-20,-15,0,10,20,25,30,40,50,40],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,10,15,12.5,17.5,15,15,17.5,13,0],"height":[0,10,15,12.5,15.5,13,13,15.5,13,0],"texture":[3,4,10,4,63,63,10,4,17],"propeller":true},"cannons":{"section_segments":12,"angle":1.5,"offset":{"x":55,"y":40,"z":5},"position":{"x":[0,0,0,0,0,0,0],"y":[-70,-65,-40,0,20,30,40],"z":[0,0,0,0,0,0,0]},"width":[0,5,7,10,3,5,0],"height":[0,5,7,8,3,5,0],"laser":{"damage":[5,9],"rate":2,"type":1,"speed":[100,130],"number":1,"error":0},"propeller":false,"texture":[6,4,10,4,63,4]},"wingends":{"section_segments":12,"offset":{"x":70,"y":35,"z":7.5},"position":{"x":[0,0,0,0,0],"y":[-30,-20,10,40,50],"z":[0,0,0,0,0]},"width":[0,7,5,7,0],"height":[2,8,10,8,2],"angle":-15,"propeller":false,"texture":[1,63,63,1]}},"wings":{"main":{"length":[45],"width":[90,50,40],"angle":[-5,90],"position":[40,50,50],"doubleside":true,"bump":{"position":20,"size":10},"texture":[3],"offset":{"x":20,"y":-5,"z":15}},"secondary":{"length":[50],"width":[50,30,40],"angle":[-8,90],"position":[40,60,50],"doubleside":true,"bump":{"position":20,"size":10},"texture":[10,12],"offset":{"x":20,"y":-27,"z":22}}},"typespec":{"name":"Pursuer","level":5,"model":33,"code":533,"specs":{"shield":{"capacity":[150,200],"reload":[3,6]},"generator":{"capacity":[90,115],"reload":[25,35]},"ship":{"mass":150,"speed":[115,140],"rotation":[60,80],"acceleration":[80,100]}},"shape":[4.504,4.949,4.157,3.525,2.724,2.164,1.818,1.714,1.776,1.841,1.824,1.776,1.768,2.314,2.43,2.42,2.449,2.548,2.726,2.915,2.928,2.681,2.838,2.856,2.805,2.76,2.805,2.856,2.838,2.681,2.928,2.915,2.726,2.548,2.449,2.42,2.43,2.314,1.768,1.776,1.824,1.841,1.776,1.714,1.818,2.164,2.724,3.525,4.157,4.949],"lasers":[{"x":0.29,"y":-4.495,"z":0,"angle":0,"damage":[15,25],"rate":1,"type":2,"speed":[150,175],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.29,"y":-4.495,"z":0,"angle":0,"damage":[15,25],"rate":1,"type":2,"speed":[150,175],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.29,"y":-4.495,"z":0.58,"angle":0,"damage":[15,25],"rate":1,"type":2,"speed":[150,175],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.29,"y":-4.495,"z":0.58,"angle":0,"damage":[15,25],"rate":1,"type":2,"speed":[150,175],"number":1,"spread":0,"error":0,"recoil":0},{"x":1.542,"y":-0.869,"z":0.145,"angle":1.5,"damage":[5,9],"rate":2,"type":1,"speed":[100,130],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.542,"y":-0.869,"z":0.145,"angle":-1.5,"damage":[5,9],"rate":2,"type":1,"speed":[100,130],"number":1,"spread":0,"error":0,"recoil":0}],"radius":4.949}}';
var Heratic_502 = '{"name":"Heratic","level":5,"model":34,"size":1.75,"specs":{"shield":{"capacity":[180,255],"reload":[4,7]},"generator":{"capacity":[100,150],"reload":[30,40]},"ship":{"mass":120,"speed":[95,125],"rotation":[60,90],"acceleration":[150,180]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":0,"z":5},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-78,-55,0,10,15,95,105,90],"z":[0,0,0,0,0,0,0,0]},"width":[0,15,25,25,25,20,10,0],"height":[0,15,15,15,15,15,10,0],"texture":[2,10,63,4,11,3,17],"propeller":true},"cockpit":{"section_segments":7,"offset":{"x":0,"y":-23,"z":18},"position":{"x":[0,0,0,0,0,0,0],"y":[-28,-4,30],"z":[0,-5,0]},"width":[1,10,9,0],"height":[1,14,2,0],"texture":[9,9,9]},"SmallCannons":{"section_segments":12,"offset":{"x":68,"y":-5,"z":-30},"position":{"x":[0,0,0,0,0],"y":[-30,-23,0,23,30],"z":[0,0,0,0,0]},"width":[0,5,5,5,0],"height":[0,5,5,5,0],"texture":[6,4,4,10],"angle":0,"laser":{"damage":[3,5],"rate":3,"type":1,"speed":[100,125],"number":1,"error":0}},"maincannon":{"section_segments":12,"offset":{"x":25,"y":30,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-40,-50,-20,0,20,30],"z":[0,0,0,0,0,0]},"width":[0,4,8,8,8,0],"height":[0,4,8,8,8,0],"angle":0,"laser":{"damage":[22,30],"rate":1.5,"type":1,"speed":[120,220],"number":1,"error":0,"recoil":25},"propeller":false,"texture":[3,3,12,3]},"top_lasercells":{"section_segments":12,"offset":{"x":25,"y":25,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-20,-15,0,10,25,25,30,40,60,70],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,10,15,15,15,10,10,15,13,0],"height":[0,10,15,15,15,10,10,15,8,0],"propeller":false,"texture":[4,4,63,12,5,16,5,4,3]},"propulsors":{"section_segments":12,"offset":{"x":68,"y":0,"z":-30},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-20,-15,0,10,20,25,30,40,80,70],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,10,15,15,15,10,10,15,10,0],"height":[0,10,15,15,15,10,10,15,9,0],"propeller":true,"texture":[4,3,63,2,5,16,12,8,17]}},"wings":{"bottom":{"doubleside":true,"offset":{"x":10,"y":20,"z":0},"length":[20,20,30],"width":[60,70,50,40],"angle":[-27,-27,-27],"position":[0,20,20,0],"texture":[2],"bump":{"position":-40,"size":3}},"topwinglets":{"doubleside":true,"offset":{"x":13,"y":57,"z":10},"length":[20],"width":[40,30],"angle":[60],"position":[0,10],"texture":[63],"bump":{"position":10,"size":10}}},"typespec":{"name":"Heratic","level":5,"model":34,"code":534,"specs":{"shield":{"capacity":[180,255],"reload":[4,7]},"generator":{"capacity":[100,150],"reload":[30,40]},"ship":{"mass":120,"speed":[95,125],"rotation":[60,90],"acceleration":[150,180]}},"shape":[2.73,2.493,2.149,1.804,1.472,1.26,1.125,1.191,1.233,2.728,2.736,2.809,2.903,2.928,2.988,2.961,3.288,3.487,3.774,3.911,3.633,3.15,3.362,3.439,3.692,3.682,3.692,3.439,3.362,3.15,3.633,3.911,3.774,3.487,3.288,2.961,2.988,2.928,2.905,2.809,2.736,2.728,1.233,1.191,1.125,1.26,1.472,1.804,2.149,2.493],"lasers":[{"x":2.38,"y":-1.225,"z":-1.05,"angle":0,"damage":[3,5],"rate":3,"type":1,"speed":[100,125],"number":1,"spread":0,"error":0,"recoil":0},{"x":-2.38,"y":-1.225,"z":-1.05,"angle":0,"damage":[3,5],"rate":3,"type":1,"speed":[100,125],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.875,"y":-0.7,"z":0,"angle":0,"damage":[22,30],"rate":1.5,"type":1,"speed":[120,220],"number":1,"spread":0,"error":0,"recoil":25},{"x":-0.875,"y":-0.7,"z":0,"angle":0,"damage":[22,30],"rate":1.5,"type":1,"speed":[120,220],"number":1,"spread":0,"error":0,"recoil":25}],"radius":3.911}}';
var Quicksilver_503 = '{"name":"Quicksilver","level":5,"model":35,"size":1.3,"zoom":1,"specs":{"shield":{"capacity":[175,240],"reload":[4,7]},"generator":{"capacity":[80,110],"reload":[35,50]},"ship":{"mass":200,"speed":[115,138],"rotation":[70,95],"acceleration":[90,120]}},"bodies":{"main":{"section_segments":6,"offset":{"x":0,"y":-20,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-125,-105,-115,-100,-55,5,60,80,95,90],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,5,15,25,35,30,35,22,0],"height":[0,5,7,15,20,30,35,30,22,0],"texture":[6,6,2,2,63,8,3,4,16.9],"propeller":true,"laser":{"damage":[20,30],"rate":2,"speed":[160,210],"number":1,"recoil":100,"type":1}},"cockpit":{"section_segments":12,"offset":{"x":0,"y":-80,"z":6},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-10,10,30,60],"z":[0,0,0,8,17]},"width":[0,14,17,14,5],"height":[0,18,25,18,5],"propeller":false,"texture":[9,9,4]},"cannons":{"section_segments":12,"offset":{"x":19,"y":-74,"z":3},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-40,-25,-30,-20,0,20,30,20],"z":[0,0,0,0,0,0,0,0]},"width":[0,2,3,5,5,5,3,0],"height":[0,2,3,5,5,5,3,0],"texture":[6,6,63,4,63,6,12],"angle":0,"laser":{"damage":[5,7],"rate":5,"type":1,"speed":[100,200],"number":1,"error":5}},"side_propulsors":{"section_segments":12,"offset":{"x":40,"y":-20,"z":-7},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-15,-5,-10,0,10,20,25,30,40,80,70],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,10,15,15,15,15,15,15,10,0],"height":[0,5,10,15,15,15,15,15,15,15,0],"texture":[13,15.9,8,4,4,5,63,5,3,16.9],"propeller":true}},"wings":{"main":{"doubleside":true,"offset":{"x":35,"y":30,"z":10},"length":[55,20],"width":[80,40,30],"angle":[-20,-50],"position":[0,-60,-90],"texture":[3,63],"bump":{"position":20,"size":5}},"sides":{"doubleside":true,"offset":{"x":30,"y":-20,"z":4},"length":[-5,-3,0,22,5],"width":[25,25,140,190,100,50],"angle":[-12,5,5,5,5],"position":[40,55,5,5,40,40],"texture":[63,2,2,4,63],"bump":{"position":35,"size":15}},"top":{"doubleside":true,"offset":{"x":5,"y":37,"z":10},"length":[33,30],"width":[70,30,20],"angle":[60,20],"position":[0,30,20],"texture":[63,2],"bump":{"position":10,"size":10}}},"typespec":{"name":"Quicksilver","level":5,"model":35,"code":535,"specs":{"shield":{"capacity":[175,240],"reload":[4,7]},"generator":{"capacity":[80,110],"reload":[35,50]},"ship":{"mass":200,"speed":[115,138],"rotation":[70,95],"acceleration":[90,120]}},"shape":[3.77,3.345,2.917,2.375,2.013,1.765,1.591,3.24,3.199,2.952,2.714,2.457,2.278,2.079,1.935,1.844,1.782,1.755,1.83,2.031,2.169,2.15,2.177,2.204,2.061,1.954,2.061,2.204,2.177,2.15,2.169,2.031,1.83,1.755,1.782,1.844,1.935,2.079,2.278,2.457,2.714,2.952,3.199,3.24,1.591,1.765,2.013,2.375,2.917,3.345],"lasers":[{"x":0,"y":-3.77,"z":0,"angle":0,"damage":[20,30],"rate":2,"type":1,"speed":[160,210],"number":1,"spread":0,"error":0,"recoil":100},{"x":0.494,"y":-2.964,"z":0.078,"angle":0,"damage":[5,7],"rate":5,"type":1,"speed":[100,200],"number":1,"spread":0,"error":5,"recoil":0},{"x":-0.494,"y":-2.964,"z":0.078,"angle":0,"damage":[5,7],"rate":5,"type":1,"speed":[100,200],"number":1,"spread":0,"error":5,"recoil":0}],"radius":3.77}}';
var Zeist_504 = '{"name":"Zeist","level":5,"model":36,"size":1.85,"specs":{"shield":{"capacity":[135,195],"reload":[6,10]},"generator":{"capacity":[110,170],"reload":[30,40]},"ship":{"mass":100,"speed":[100,135],"rotation":[50,65],"acceleration":[110,126]}},"bodies":{"main":{"section_segments":9,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-78,-75,-50,0,30,70,100,90],"z":[0,0,0,0,0,0,0,0]},"width":[0,5,15,15,20,20,20,10],"height":[0,10,20,20,30,30,10,0],"texture":[5.9,10,1,10,2,11,17],"propeller":true},"main2":{"section_segments":8,"offset":{"x":10,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[100,-50,0,30,70,80,80],"z":[0,0,0,0,0,0,0]},"width":[0,10,10,20,10,10,0],"height":[0,10,10,20,10,10,0],"texture":[13,4,2,1,4]},"cockpit":{"section_segments":[40,90,180,270,320],"offset":{"x":0,"y":-30,"z":12},"position":{"x":[0,0,0,0,0,0,0],"y":[-10,-10,0,30,30],"z":[0,0,0,0,0]},"width":[0,10,10,10,0],"height":[0,10,15,12,0],"texture":[3.9,8.975],"propeller":false},"cannons":{"section_segments":12,"offset":{"x":48,"y":40,"z":2},"position":{"x":[0,0,0,0,0,0,0],"y":[-60,-55,-40,0,20,50,55],"z":[0,0,0,0,0,0,0]},"width":[0,3,4,5,8,8,0],"height":[0,3,6,6,8,6,0],"angle":0,"laser":{"damage":[4,6],"rate":6,"type":1,"speed":[190,220],"number":1,"angle":0,"error":0},"propeller":false,"texture":[6,11,2,3,63,4]},"cannons2":{"section_segments":12,"offset":{"x":0,"y":35,"z":45},"position":{"x":[0,0,0,0,0,0,0],"y":[-40,-35,-10,0,20,50,55],"z":[0,0,0,0,0,0,0]},"width":[0,3,4,5,8,8,0],"height":[0,3,6,6,8,6,0],"angle":0,"laser":{"damage":[70,110],"rate":0.5,"type":1,"speed":[170,200],"number":1,"angle":0,"error":0,"recoil":400},"propeller":false,"texture":[6,4,2,10,63,4]},"side_propulsors":{"section_segments":10,"offset":{"x":25,"y":20,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,10,17,40,60,80,60,50],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,8,10,10,10,8,8,0,0,0],"height":[0,8,10,10,10,8,8,0,0,0],"propeller":true,"texture":[4,2,8,2,63,11,17]}},"wings":{"main":{"offset":{"x":20,"y":60,"z":0},"length":[20,20,10],"width":[60,50,40,30],"texture":[18,4,63],"angle":[0,0,0],"position":[0,10,-5,-20],"bump":{"position":-10,"size":13}},"winglets":{"length":[30,20],"width":[10,30,0],"angle":[30,0],"position":[0,0,30],"texture":[4,63],"bump":{"position":10,"size":30},"offset":{"x":0,"y":90,"z":0}},"top_join":{"offset":{"x":0,"y":50,"z":-15},"length":[60],"width":[70,30],"angle":[90],"position":[0,0,0,50],"texture":[11],"bump":{"position":10,"size":20}}},"typespec":{"name":"Zeist","level":5,"model":36,"code":536,"specs":{"shield":{"capacity":[135,195],"reload":[6,10]},"generator":{"capacity":[110,170],"reload":[30,40]},"ship":{"mass":100,"speed":[100,135],"rotation":[50,65],"acceleration":[110,126]}},"shape":[2.886,2.785,2.214,1.993,1.738,1.381,1.156,1.008,0.914,1.929,1.967,1.952,1.924,1.944,1.997,2.785,2.951,3.2,3.366,3.527,3.866,3.938,4.755,4.393,3.86,3.707,3.86,4.393,4.755,3.938,3.866,3.527,3.366,3.2,2.951,2.785,1.997,1.944,1.924,1.952,1.967,1.929,0.914,1.008,1.156,1.381,1.738,1.993,2.214,2.785],"lasers":[{"x":1.776,"y":-0.74,"z":0.074,"angle":0,"damage":[4,6],"rate":6,"type":1,"speed":[190,220],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.776,"y":-0.74,"z":0.074,"angle":0,"damage":[4,6],"rate":6,"type":1,"speed":[190,220],"number":1,"spread":0,"error":0,"recoil":0},{"x":0,"y":-0.185,"z":1.665,"angle":0,"damage":[70,110],"rate":0.5,"type":1,"speed":[170,200],"number":1,"spread":0,"error":0,"recoil":400}],"radius":4.755}}';
var Rigel_505 = '{"name":"Rigel","level":5,"model":37,"size":2,"specs":{"shield":{"capacity":[175,245],"reload":[5,7]},"generator":{"capacity":[85,130],"reload":[32,46]},"ship":{"mass":160,"speed":[103,132],"rotation":[72,94],"acceleration":[92,134]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-75,-70,-60,-30,10,20,50,70,60],"z":[0,0,0,0,4,6,5,1,0]},"width":[0,6,8,11,12,17,11,10,0],"height":[0,4,7,12,12,18,11,8,0],"texture":[63,4,2,10,3,8,13,17,17],"propeller":true,"laser":{"damage":[10,15],"rate":3,"type":2,"speed":[120,190],"number":1,"error":0}},"cockpit":{"section_segments":8,"offset":{"x":0,"y":15,"z":6},"position":{"x":[0,0,0,0,0],"y":[-71,-65,-35,-17.337,-10],"z":[0,0,0,0,0]},"width":[0,5,10,10,0],"height":[0,4,15,10,0],"texture":[1,9,9,3],"propeller":true},"side_prop":{"section_segments":8,"offset":{"x":34,"y":30,"z":-14},"position":{"x":[0,0,0,0,0,0,0],"y":[-43,-40,-25,-5,7,15,10],"z":[0,0,0,5,8,3,0]},"width":[0,8,11,7,10,8,0],"height":[0,5,12,7,10,8,0],"texture":[3,1,10,2,13,17,1,3,1,3],"propeller":true},"gun":{"section_segments":8,"offset":{"x":26,"y":30,"z":-22},"position":{"x":[0,0,0,0,0,0],"y":[-60,-75,-40,-30,-15,-10],"z":[0,0,0,0,0,0]},"width":[0,3,5,6,4,0],"height":[0,3,3,8,8,0],"angle":0,"laser":{"damage":[10,15],"rate":3,"type":1,"speed":[120,190],"number":1,"error":0},"propeller":false,"texture":[6,4,10,63]}},"wings":{"main":{"offset":{"x":0,"y":0,"z":-1},"length":[38.7,8,12,20,20],"width":[30,35,20,35,10],"angle":[-30,40,50,10,0],"position":[10,20,19,20,40],"texture":[11,4,13,63],"doubleside":true,"bump":{"position":0,"size":14}},"front_winglets":{"offset":{"x":6,"y":-45,"z":-1},"length":[14,0],"width":[40,7],"angle":[0,0],"position":[0,10],"texture":[63],"doubleside":true,"bump":{"position":-10,"size":11}},"back_winglets":{"offset":{"x":6,"y":35,"z":10},"length":[20,0],"width":[60,7],"angle":[50,0],"position":[0,15],"texture":[63],"doubleside":true,"bump":{"position":-10,"size":11}}},"typespec":{"name":"Rigel","level":5,"model":37,"code":537,"specs":{"shield":{"capacity":[175,245],"reload":[5,7]},"generator":{"capacity":[85,130],"reload":[32,46]},"ship":{"mass":160,"speed":[103,132],"rotation":[72,94],"acceleration":[92,134]}},"shape":[3,2.856,2.281,1.987,2.132,2.141,1.849,1.637,1.496,1.394,1.682,1.73,1.759,1.996,2.24,2.585,3.06,3.23,2.78,2.462,2.336,2.131,2.291,2.446,2.828,2.806,2.828,2.446,2.291,2.131,2.336,2.462,2.78,3.23,3.06,2.585,2.24,1.996,1.759,1.73,1.682,1.394,1.496,1.637,1.849,2.141,2.132,1.987,2.281,2.856],"lasers":[{"x":0,"y":-3,"z":0,"angle":0,"damage":[10,15],"rate":3,"type":2,"speed":[120,190],"number":1,"spread":0,"error":0,"recoil":0},{"x":1.04,"y":-1.8,"z":-0.88,"angle":0,"damage":[10,15],"rate":3,"type":1,"speed":[120,190],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.04,"y":-1.8,"z":-0.88,"angle":0,"damage":[10,15],"rate":3,"type":1,"speed":[120,190],"number":1,"spread":0,"error":0,"recoil":0}],"radius":3.23}}';
var Skater_506 = '{"name":"Skater","level":5,"model":38,"size":1.25,"specs":{"shield":{"capacity":[130,180],"reload":[4,7]},"generator":{"capacity":[90,150],"reload":[30,48]},"ship":{"mass":100,"speed":[120,160],"rotation":[80,120],"acceleration":[90,110]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-155,-150,-90,-40,10,30,50,80,140,130],"z":[-10,-10,-5,0,0,0,0,0,0,0,0]},"width":[0,5,20,25,25,30,30,25,20,0],"height":[0,5,15,20,25,30,30,25,10,0],"texture":[8,2,3,63,4,4,63,11,17],"propeller":true},"cockpit":{"section_segments":12,"offset":{"x":0,"y":-85,"z":14},"position":{"x":[0,0,0,0,0,0,0],"y":[20,50,70,90,140],"z":[0,0,0,0,-6]},"width":[0,12,15,15,15],"height":[0,15,18,18,18],"texture":[9,9,9,63],"propeller":false},"cannons":{"section_segments":6,"offset":{"x":45,"y":-70,"z":-10},"position":{"x":[0,0,0,0,0],"y":[-40,-55,0,21,31],"z":[0,0,0,0,0]},"width":[0,3,10,8,0],"height":[0,3,10,8,0],"texture":[6,4,63,3],"angle":0,"laser":{"damage":[18,26],"rate":0.5,"type":1,"speed":[120,180],"number":2,"error":0}},"wingendbottom":{"section_segments":12,"offset":{"x":125,"y":125,"z":-29},"position":{"x":[0,0,0,0,0,0,0],"y":[-65,-70,-20,0,20,30,25],"z":[0,0,0,0,0,0,0]},"width":[0,3,5,7,7,5,0],"height":[0,3,5,7,7,5,0],"texture":[12,63,63,11,63,12],"angle":2,"laser":{"damage":[18,26],"rate":0.5,"type":1,"speed":[100,160],"number":1,"error":0}},"propellers":{"section_segments":12,"offset":{"x":85,"y":60,"z":-20},"position":{"x":[0,0,0,0,0,0,0],"y":[-40,-35,-15,0,75,80,70],"z":[0,0,0,0,0,0,0]},"width":[0,10,13,10,15,10,0],"height":[0,10,13,10,15,10,0],"texture":[18,2,4,63,12,17],"angle":0,"propeller":true}},"wings":{"xwing1":{"doubleside":true,"offset":{"x":15,"y":120,"z":10},"length":[30,25],"width":[70,60,30],"angle":[25,5],"position":[-60,-20,20],"texture":[3,2],"bump":{"position":10,"size":5}},"xwing2":{"doubleside":true,"offset":{"x":5,"y":55,"z":-10},"length":[20,60,50],"width":[100,100,50,20],"angle":[10,-10,-10],"position":[0,-10,48,90],"texture":[1,11,4],"bump":{"position":0,"size":5}},"winglets2":{"doubleside":true,"offset":{"x":10,"y":-70,"z":-10},"length":[15,27],"width":[60,30,15],"angle":[-25,22],"position":[30,0,0],"texture":[3,3],"bump":{"position":30,"size":5}}},"typespec":{"name":"Skater","level":5,"model":38,"code":538,"specs":{"shield":{"capacity":[130,180],"reload":[4,7]},"generator":{"capacity":[90,150],"reload":[30,48]},"ship":{"mass":100,"speed":[120,160],"rotation":[80,120],"acceleration":[90,110]}},"shape":[3.875,3.397,2.444,3.344,2.91,2.434,2.083,1.764,0.77,0.71,0.669,0.652,0.706,0.77,2.385,2.608,3.61,3.962,4.521,5.106,5.026,4.145,4.222,3.417,3.536,3.507,3.536,3.417,4.222,4.145,5.026,5.106,4.521,3.962,3.61,2.608,2.385,0.77,0.706,0.652,0.669,0.71,0.77,1.764,2.083,2.434,2.91,3.344,2.444,3.397],"lasers":[{"x":1.125,"y":-3.125,"z":-0.25,"angle":0,"damage":[18,26],"rate":0.5,"type":1,"speed":[120,180],"number":2,"spread":0,"error":0,"recoil":0},{"x":-1.125,"y":-3.125,"z":-0.25,"angle":0,"damage":[18,26],"rate":0.5,"type":1,"speed":[120,180],"number":2,"spread":0,"error":0,"recoil":0},{"x":3.064,"y":1.376,"z":-0.725,"angle":2,"damage":[18,26],"rate":0.5,"type":1,"speed":[100,160],"number":1,"spread":0,"error":0,"recoil":0},{"x":-3.064,"y":1.376,"z":-0.725,"angle":-2,"damage":[18,26],"rate":0.5,"type":1,"speed":[100,160],"number":1,"spread":0,"error":0,"recoil":0}],"radius":5.106}}';
var D_Wing_507 = '{"name":"D-Wing","level":5,"model":39,"size":2.5,"specs":{"shield":{"capacity":[180,250],"reload":[4,8]},"generator":{"capacity":[90,140],"reload":[24,31]},"ship":{"mass":150,"speed":[105,145],"rotation":[60,90],"acceleration":[100,130]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":20,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-103,-80,-60,-40,-10,10,30,40,20],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,10,10,10,15,14,14,13,0],"height":[0,8,10,12,14,14,11,10,0],"texture":[2,3,3,63,10,8,13,13,13],"propeller":true,"laser":{"damage":[40,55],"error":0,"number":1,"speed":[160,200],"rate":1}},"thrusters":{"section_segments":8,"offset":{"x":16,"y":20,"z":5},"position":{"x":[0,0,0,0,0,0,0,-1,-1],"y":[-19,-18,-20,-20,-10,10,30,40,20],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,3,4,5,5,5,5,5,0],"height":[0,3,4,5,5,5,5,5,0],"texture":[3,18,3,3,4,63,13,13,13],"propeller":true},"guns":{"section_segments":8,"angle":2.5,"offset":{"x":25,"y":43,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-57,-45,-50,-45,-22,-19,-3,0,0],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,2,3,5,5,6,6,5,0],"height":[0,3,4,6,6,8,8,6,0],"texture":[6,18,63,13,4,8,4,3,3],"laser":{"damage":[9,15],"angle":2.5,"error":0,"number":1,"speed":[130,150],"rate":1.5}},"cockpit":{"section_segments":8,"offset":{"x":0,"y":9.5,"z":10},"position":{"x":[0,0,0,0,0,0],"y":[-30,-26,-16,-8,-2,0],"z":[0,0,0,1,2,2]},"width":[0,5,7,7,5,0],"height":[0,7,9,9,7,0],"texture":[9,9,4,4,4,4]}},"wings":{"topjoin":{"offset":{"x":8,"y":33,"z":-2},"doubleside":true,"length":[22.5,15.5],"width":[40,30,20],"angle":[-15,5],"position":[-30,-13,-25],"texture":[3,63],"bump":{"position":10,"size":10}},"winglets_1":{"offset":{"x":10,"y":-50,"z":0},"doubleside":true,"length":[8],"width":[17,10],"angle":[-5],"position":[0,-8],"texture":[63],"bump":{"position":-10,"size":20}},"winglets_2":{"offset":{"x":4,"y":33,"z":9},"doubleside":true,"length":[8],"width":[20,10],"angle":[40],"position":[0,8],"texture":[4],"bump":{"position":-10,"size":10}}},"typespec":{"name":"D-Wing","level":5,"model":39,"code":539,"specs":{"shield":{"capacity":[180,250],"reload":[4,8]},"generator":{"capacity":[90,140],"reload":[24,31]},"ship":{"mass":150,"speed":[105,145],"rotation":[60,90],"acceleration":[100,130]}},"shape":[4.15,3.628,3.276,2.907,1.172,0.976,0.885,0.891,1.324,1.301,1.342,1.383,2.261,2.276,2.33,2.428,2.431,2.341,2.29,2.406,2.612,2.541,3.162,3.154,3.054,3.006,3.054,3.154,3.162,2.541,2.612,2.406,2.29,2.341,2.431,2.428,2.33,2.276,2.261,1.383,1.342,1.301,1.324,0.891,0.885,0.976,1.172,2.907,3.276,3.628],"lasers":[{"x":0,"y":-4.15,"z":0,"angle":0,"damage":[40,55],"rate":1,"speed":[160,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":1.126,"y":-0.697,"z":0,"angle":2.5,"damage":[9,15],"rate":1.5,"speed":[130,150],"number":1,"spread":2.5,"error":0,"recoil":0},{"x":-1.126,"y":-0.697,"z":0,"angle":-2.5,"damage":[9,15],"rate":1.5,"speed":[130,150],"number":1,"spread":2.5,"error":0,"recoil":0}],"radius":4.15}}';
var Viper_508 = '{"name":"Viper","level":5,"model":40,"size":1.25,"specs":{"shield":{"capacity":[150,200],"reload":[6,10]},"generator":{"capacity":[150,250],"reload":[25,40]},"ship":{"mass":175,"speed":[130,160],"rotation":[80,100],"acceleration":[80,100]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":30,"z":10},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-100,-105,-99,-90,-70,0,50,70],"z":[0,0,0,0,0,0,0,5,1]},"width":[2,4,10,16,25,35,20,15],"height":[0,2,2,4,8,13,10,3,5],"texture":[4,17,4,2,3,4,5],"propeller":true,"laser":{"damage":[18,28],"rate":2.5,"type":1,"speed":[175,210],"recoil":0,"number":1,"angle":0,"error":0}},"cockpit":{"section_segments":8,"offset":{"x":0,"y":15,"z":15},"position":{"x":[0,0,0,0,0,0],"y":[-55,-40,-25,0,15],"z":[0,0,0,0,6,-5]},"width":[0,10,15,15,0],"height":[0,10,13,12,0],"texture":[9,9,9,63]},"toppropulsors":{"section_segments":12,"offset":{"x":27,"y":50,"z":10},"position":{"x":[-2,-2,-1,0,0,0,0,0,0],"y":[-40,-55,-45,-25,0,20,30,20],"z":[-2,0,0,0,0,0,0,0,0,0,0]},"width":[0,9,12,13,15,15,10,0],"height":[0,9,12,15,15,15,10,0],"texture":[3,4,3,10,63,12,17],"propeller":true},"headlights":{"section_segments":8,"offset":{"x":50,"y":-20,"z":5},"position":{"x":[0,0,0,0,0,0,-1,-6,0],"y":[-15,-20,-10,10,20,30,45,80],"z":[0,-2,-2,-2,-2,-2,0,0,0]},"width":[0,9,10,12,13,13,9,0],"height":[0,6,8,8,8,8,8,0],"texture":[17,4,4,3,63,10,3],"propeller":false,"angle":-3,"laser":{"damage":[10,19],"rate":2,"type":1,"speed":[175,210],"recoil":1,"number":1,"angle":0,"error":0}},"turbine":{"section_segments":12,"offset":{"x":0,"y":60,"z":35},"position":{"x":[0,0,0,0,0,0,0],"y":[-20,-25,-20,0,20,30,40],"z":[0,0,0,0,0,-10,-20]},"width":[0,12,17,17,17,17,10],"height":[0,18,23,23,15,10,5],"angle":0,"texture":[17,5,63,63,63,63,63,63,63]}},"wings":{"outer":{"offset":{"x":34,"y":-85,"z":0},"length":[1,30,20],"width":[0,190,150,50],"angle":[0,-8,-8,-8],"position":[100,57,70,100],"texture":[1,63,3,11],"doubleside":true,"bump":{"position":30,"size":5}},"inner":{"offset":{"x":-36,"y":-60,"z":0},"length":[25],"width":[165,10],"angle":[8],"position":[20,100],"texture":[3,3],"doubleside":true,"bump":{"position":0,"size":5}}},"typespec":{"name":"Viper","level":5,"model":40,"code":540,"specs":{"shield":{"capacity":[150,200],"reload":[6,10]},"generator":{"capacity":[150,250],"reload":[25,40]},"ship":{"mass":175,"speed":[130,160],"rotation":[80,100],"acceleration":[80,100]}},"shape":[1.878,1.861,3.197,3.123,2.935,2.808,2.618,2.417,2.275,2.184,2.128,2.125,2.128,2.129,2.18,2.268,2.338,2.293,2.23,2.193,2.041,2.191,2.204,2.306,2.528,2.505,2.528,2.306,2.204,2.191,2.041,2.193,2.23,2.293,2.338,2.268,2.18,2.129,2.128,2.125,2.128,2.184,2.275,2.417,2.618,2.808,2.935,3.123,3.197,1.861],"lasers":[{"x":0,"y":-1.875,"z":0.25,"angle":0,"damage":[18,28],"rate":2.5,"type":1,"speed":[175,210],"number":1,"spread":0,"error":0,"recoil":0},{"x":1.276,"y":-0.999,"z":0.125,"angle":-3,"damage":[10,19],"rate":2,"type":1,"speed":[175,210],"number":1,"spread":0,"error":0,"recoil":1},{"x":-1.276,"y":-0.999,"z":0.125,"angle":3,"damage":[10,19],"rate":2,"type":1,"speed":[175,210],"number":1,"spread":0,"error":0,"recoil":1}],"radius":3.197}}';
var Shadow_X_2_509 = '{"name":"Shadow X-2","level":5,"model":41,"size":1.1,"specs":{"shield":{"capacity":[150,220],"reload":[5,7]},"generator":{"capacity":[80,145],"reload":[35,50]},"ship":{"mass":125,"speed":[110,155],"rotation":[55,70],"acceleration":[140,160]}},"bodies":{"main":{"section_segments":10,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-100,-98,-95,-70,-40,0,40,70,80,90,100],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,10,20,30,20,20,30,30,30,20,0],"height":[0,4,4,20,20,10,10,15,15,15,10,10],"texture":[12,5,63,4,4,3,4,4,5]},"back":{"section_segments":10,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0],"y":[90,95,100,105,90],"z":[0,0,0,0,0]},"width":[10,15,18,19,2],"height":[3,5,7,8,2],"texture":[63],"propeller":true},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-25,"z":12},"position":{"x":[0,0,0,0,0,0],"y":[-45,-40,-25,0,5],"z":[0,0,0,0,0,0]},"width":[0,10,15,5,0],"height":[0,10,15,5,0],"texture":[9]},"laser":{"section_segments":10,"offset":{"x":50,"y":10,"z":-13},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-30,-25,0,10,20,25,30,40,70,60],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,10,15,15,15,10,10,15,10,0],"height":[0,10,15,15,15,10,10,15,5,0],"texture":[6,4,10,3,4,3,2],"propeller":true,"laser":{"damage":[5,7],"rate":10,"type":1,"speed":[160,190],"number":1}}},"wings":{"top":{"doubleside":true,"offset":{"x":10,"y":60,"z":5},"length":[30],"width":[50,30],"angle":[60],"position":[0,50],"texture":[3],"bump":{"position":10,"size":10}},"side":{"doubleside":true,"offset":{"x":10,"y":70,"z":5},"length":[30],"width":[40,20],"angle":[-13],"position":[0,60],"texture":[63],"bump":{"position":10,"size":10}},"wings":{"offset":{"x":0,"y":35,"z":0},"length":[80],"width":[100,70],"angle":[0],"position":[-80,50],"texture":[4],"bump":{"position":10,"size":15}}},"typespec":{"name":"Shadow X-2","level":5,"model":41,"code":541,"specs":{"shield":{"capacity":[150,220],"reload":[5,7]},"generator":{"capacity":[80,145],"reload":[35,50]},"ship":{"mass":125,"speed":[110,155],"rotation":[55,70],"acceleration":[140,160]}},"shape":[2.2,2.141,1.787,1.481,1.272,1.135,1.076,1.035,1.016,1.188,1.343,1.35,1.371,1.416,1.46,1.564,1.887,2.17,2.405,2.753,3.16,2.084,2.79,3.199,2.656,2.315,2.656,3.199,2.79,2.084,3.16,2.753,2.405,2.17,1.887,1.564,1.46,1.416,1.372,1.35,1.343,1.188,1.016,1.035,1.076,1.135,1.272,1.481,1.787,2.141],"lasers":[{"x":1.1,"y":-0.44,"z":-0.286,"angle":0,"damage":[5,7],"rate":10,"type":1,"speed":[160,190],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.1,"y":-0.44,"z":-0.286,"angle":0,"damage":[5,7],"rate":10,"type":1,"speed":[160,190],"number":1,"spread":0,"error":0,"recoil":0}],"radius":3.199}}';
var Super_Speedster_510 = '{"name":"Super-Speedster","level":5,"model":42,"size":1.6,"specs":{"shield":{"capacity":[165,210],"reload":[5,9]},"generator":{"capacity":[100,150],"reload":[35,53]},"ship":{"mass":140,"speed":[135,165],"rotation":[70,90],"acceleration":[120,160]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-110,-105,-100,-60,-20,30,65,75,60],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,8,10,20,25,30,30,20,0],"height":[0,6,8,12,20,20,18,15,0],"propeller":true,"texture":[4,63,1,1,10,4,12,17],"laser":{"damage":[8,15],"rate":3,"type":1,"speed":[130,180],"number":2,"angle":5,"error":0}},"jet":{"section_segments":12,"offset":{"x":30,"y":5,"z":0},"position":{"x":[-10,-10,-7.5,-5,0,0,0,0,0,0],"y":[-50,-45,-30,-10,50,60,70,75,65],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,8,10,10,15,10,10,7.5,0],"height":[0,6,8,10,10,10,10,7.5,0],"propeller":true,"texture":[3,63,4,10,1,3,12,17]},"cockpit":{"section_segments":12,"offset":{"x":0,"y":-45,"z":10},"position":{"x":[0,0,0,0,0,0,0],"y":[-35,-15,0,20,100],"z":[-2.5,-1,-2,0,0]},"width":[0,10,12,10,5],"height":[0,10,15,15,5],"propeller":false,"texture":[9,9,9,4,4]},"cannon":{"section_segments":6,"offset":{"x":15,"y":-50,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-40,-50,-45,0,20,30],"z":[0,0,0,0,0,0]},"width":[0,3,5,5,5,0],"height":[0,3,5,5,5,0],"angle":0,"laser":{"damage":[6,10],"rate":3,"type":1,"speed":[130,180],"number":1,"error":0},"propeller":false,"texture":[16.9,13,4,3]},"cannon2":{"section_segments":6,"offset":{"x":85,"y":30,"z":-5},"position":{"x":[0,0,0,0,0,-5],"y":[-10,-20,-15,0,20,30],"z":[0,0,0,0,0,0]},"width":[0,3,5,5,5,0],"height":[0,3,5,5,5,0],"angle":5,"laser":{"damage":[1,2],"rate":8,"type":1,"speed":[150,200],"number":1,"error":5},"propeller":false,"texture":[16.9,13,3,3]}},"wings":{"main":{"length":[70,20],"width":[100,30,20],"angle":[-10,10],"position":[0,40,20],"doubleside":true,"offset":{"x":0,"y":10,"z":5},"bump":{"position":30,"size":10},"texture":[11,63]},"main2":{"length":[40],"width":[40,20],"angle":[30,10],"position":[0,40,20],"doubleside":true,"offset":{"x":10,"y":30,"z":15},"bump":{"position":30,"size":10},"texture":[63]}},"typespec":{"name":"Super-Speedster","level":5,"model":42,"code":542,"specs":{"shield":{"capacity":[165,210],"reload":[5,9]},"generator":{"capacity":[100,150],"reload":[35,53]},"ship":{"mass":140,"speed":[135,165],"rotation":[70,90],"acceleration":[120,160]}},"shape":[3.52,3.392,3.167,2.046,1.628,1.562,1.471,1.368,1.29,1.216,1.168,1.14,1.169,2.783,2.931,3.089,3.317,3.314,3.274,3.032,2.662,2.932,2.827,2.692,2.443,2.405,2.443,2.692,2.827,2.932,2.662,3.032,3.274,3.314,3.317,3.089,2.931,2.783,1.169,1.14,1.168,1.216,1.29,1.368,1.471,1.562,1.628,2.046,3.167,3.392],"lasers":[{"x":0,"y":-3.52,"z":0,"angle":0,"damage":[8,15],"rate":3,"type":1,"speed":[130,180],"number":2,"spread":5,"error":0,"recoil":0},{"x":0.48,"y":-3.2,"z":0,"angle":0,"damage":[6,10],"rate":3,"type":1,"speed":[130,180],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.48,"y":-3.2,"z":0,"angle":0,"damage":[6,10],"rate":3,"type":1,"speed":[130,180],"number":1,"spread":0,"error":0,"recoil":0},{"x":2.664,"y":0.322,"z":-0.16,"angle":5,"damage":[1,2],"rate":8,"type":1,"speed":[150,200],"number":1,"spread":0,"error":5,"recoil":0},{"x":-2.664,"y":0.322,"z":-0.16,"angle":-5,"damage":[1,2],"rate":8,"type":1,"speed":[150,200],"number":1,"spread":0,"error":5,"recoil":0}],"radius":3.52}}';
var Phoenix_511 = '{"name":"Phoenix","level":5,"model":43,"size":1.9,"specs":{"shield":{"capacity":[155,220],"reload":[5,8]},"generator":{"capacity":[130,170],"reload":[30,45]},"ship":{"mass":160,"speed":[105,135],"rotation":[66,85],"acceleration":[130,170]}},"bodies":{"main":{"section_segments":10,"offset":{"x":0,"y":20,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-87,-85,-75,-30,-20,20,30,55,60],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,5,10,15,25,25,13,13,0],"height":[0,5,10,12,16,15,13,13,0],"texture":[63,63,10,4,2,63,2,4]},"cockpit":{"section_segments":12,"offset":{"x":0,"y":-15,"z":8},"position":{"x":[0,0,0,0,0],"y":[-10,0,20,40,45],"z":[0,0,0,0,0]},"width":[0,8,12,12,0],"height":[0,10,14,13,0],"propeller":false,"texture":[7,9,63,63]},"cannons":{"section_segments":8,"offset":{"x":25,"y":-10,"z":-5},"position":{"x":[0,0,0,0,0,0],"y":[-50,-60,-10,0,20,35],"z":[0,0,0,0,0,0]},"width":[0,3,5,8,8,0],"height":[0,3,5,8,8,0],"angle":0,"laser":{"damage":[15,25],"rate":2,"type":2,"speed":[190,240],"recoil":20,"number":1,"error":0},"propeller":false,"texture":[1,4,63,4,3,4]},"propulsors":{"section_segments":10,"offset":{"x":55,"y":35,"z":-25},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-18,-15,0,10,20,25,30,40,60,50],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,7,13,13,13,8,8,13,10,0],"height":[0,7,13,13,13,8,8,13,10,0],"texture":[4,4,10,3,3,63,4,4,17],"propeller":true},"propulsors2":{"section_segments":10,"offset":{"x":15,"y":25,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-18,-15,0,10,20,25,30,40,60,50],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,7,13,13,13,8,8,13,10,0],"height":[0,7,13,13,13,8,8,13,10,0],"texture":[4,4,10,3,3,63,4,4,17],"propeller":true}},"wings":{"wing":{"doubleside":true,"offset":{"x":0,"y":22,"z":0},"length":[33,3,30],"width":[25,25,65,55],"angle":[0,0,-45],"position":[10,10,10,30],"texture":[4,1,11.4],"bump":{"position":10,"size":7}},"winglet":{"offset":{"x":0,"y":53,"z":50},"length":[25,20,20,25],"width":[20,50,25,50,20],"angle":[-90,-90,-90,-90],"position":[0,0,0,0,0],"texture":[63],"doubleside":true,"bump":{"position":0,"size":15}}},"typespec":{"name":"Phoenix","level":5,"model":43,"code":543,"specs":{"shield":{"capacity":[155,220],"reload":[5,8]},"generator":{"capacity":[130,170],"reload":[30,45]},"ship":{"mass":160,"speed":[105,135],"rotation":[66,85],"acceleration":[130,170]}},"shape":[2.546,2.485,2.797,2.865,2.523,2.05,1.751,1.538,1.401,1.339,1.315,1.294,1.376,1.557,1.819,2.598,2.921,3.163,3.305,3.967,4.364,4.274,3.125,3.362,3.288,3.168,3.288,3.362,3.125,4.274,4.364,3.967,3.305,3.163,2.921,2.598,1.819,1.557,1.384,1.294,1.315,1.339,1.401,1.538,1.751,2.05,2.523,2.865,2.797,2.485],"lasers":[{"x":0.95,"y":-2.66,"z":-0.19,"angle":0,"damage":[15,25],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":20},{"x":-0.95,"y":-2.66,"z":-0.19,"angle":0,"damage":[15,25],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":20}],"radius":4.364}}';
var Vitrum_512 = '{"name":"Vitrum","level":5,"model":44,"size":2.1,"specs":{"shield":{"capacity":[180,230],"reload":[6,8]},"generator":{"capacity":[110,160],"reload":[30,48]},"ship":{"mass":210,"speed":[115,140],"rotation":[50,90],"acceleration":[90,140]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-94,-96,-100,-85,-62.5,-40,10,20,55,70,60],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,3,3,10,16,19,22,26,23,18,0],"height":[0,3,3,9,14,16,20,22,21,18,0],"texture":[2,4,3,3,63,18,3,2,12,17],"propeller":true},"cockpit":{"section_segments":12,"offset":{"x":0,"y":-60,"z":13},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-12,2,16,30,48,65,85,120],"z":[-1.2,-2,-1,-1,1,1,4,6]},"width":[3,9,11,12,12,12,10,0],"height":[0,7,11,11,10,10,10,0],"texture":[9,9,9,4,3,10,63]},"thrust":{"section_segments":8,"offset":{"x":32,"y":40,"z":0},"position":{"x":[-12,-8,-4.5,-1,0,0,0],"y":[-50,-45,-20,0,20,30,20],"z":[0,0,0,0,0,0,0]},"width":[0,6,9,11,11,8,0],"height":[0,6,9,11,11,8,0],"texture":[4,4,2,63,2,17],"propeller":true},"cannon":{"section_segments":8,"offset":{"x":0,"y":-44,"z":-15},"position":{"x":[0,0,0,0,0,0,0],"y":[-49,-52,-20,0,8,11,14],"z":[0,0,0,0,0,0,0]},"width":[0,3,5,7,6,4,0],"height":[0,3,5,7,6,4,0],"texture":[17,4,63,4,2,4],"laser":{"damage":[2,4],"rate":2,"type":2,"speed":[120,165],"number":30,"error":0,"recoil":5,"angle":0.5}},"cannons":{"section_segments":6,"offset":{"x":30,"y":20,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-40,-50,-45,-20,0,10],"z":[0,0,0,0,0,0]},"width":[0,3,5,5,5,0],"height":[0,3,5,5,5,0],"angle":0,"laser":{"damage":[2,4],"rate":3,"type":1,"speed":[130,180],"number":1,"error":0},"propeller":false,"texture":[16.9,3,63,4]}},"wings":{"top":{"doubleside":true,"offset":{"x":12,"y":34,"z":0},"length":[50],"width":[54,20],"angle":[50],"position":[0,24],"texture":[4],"bump":{"position":10,"size":15}},"main":{"doubleside":true,"offset":{"x":0,"y":-20,"z":5},"length":[55,14],"width":[70,40,20],"angle":[0,0],"position":[30,60,40],"texture":[18,63],"bump":{"position":10,"size":4}}},"typespec":{"name":"Vitrum","level":5,"model":44,"code":544,"specs":{"shield":{"capacity":[180,230],"reload":[6,8]},"generator":{"capacity":[110,160],"reload":[30,48]},"ship":{"mass":210,"speed":[115,140],"rotation":[50,90],"acceleration":[90,140]}},"shape":[4.202,3.943,3.048,2.343,1.868,1.522,1.84,1.861,1.778,1.643,1.549,1.488,1.453,1.512,2.991,3.115,3.166,3.218,3.322,3.419,3.405,3.386,3.249,3.036,2.993,2.946,2.993,3.036,3.249,3.386,3.405,3.419,3.322,3.218,3.166,3.115,2.991,1.512,1.453,1.488,1.549,1.643,1.778,1.861,1.84,1.522,1.868,2.343,3.048,3.943],"lasers":[{"x":0,"y":-4.032,"z":-0.63,"angle":0,"damage":[2,4],"rate":2,"type":2,"speed":[120,165],"number":30,"spread":0.5,"error":0,"recoil":5},{"x":1.26,"y":-1.26,"z":0,"angle":0,"damage":[2,4],"rate":3,"type":1,"speed":[130,180],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.26,"y":-1.26,"z":0,"angle":0,"damage":[2,4],"rate":3,"type":1,"speed":[130,180],"number":1,"spread":0,"error":0,"recoil":0}],"radius":4.202}}';
var Vengar_513 = '{"name":"Vengar","level":5,"model":45,"size":2,"specs":{"shield":{"capacity":[180,260],"reload":[5,8]},"generator":{"capacity":[100,155],"reload":[30,61]},"ship":{"mass":200,"speed":[117,137],"rotation":[90,130],"acceleration":[50,70]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-72,-70,-45,-25,-10,20,30,45,40],"z":[0,0,0,0,0,0,0,0]},"width":[0,5,10,13,15,15,10,7,0],"height":[0,5,10,13,15,15,10,7,0],"texture":[3,3,63,63,3,11,63,3],"propeller":true},"cockpit":{"section_segments":12,"offset":{"x":0,"y":-15,"z":3},"position":{"x":[0,0,0,0,0,0],"y":[-45,-40,-25,20,45],"z":[0,0,0,10,5,10]},"width":[0,5,8,8,0],"height":[0,5,8,8,0],"texture":[3,3,9,3,3]},"cannon":{"section_segments":12,"offset":{"x":0,"y":-15,"z":-20},"position":{"x":[0,0,0,0,0,0],"y":[-75,-80,-20,0,20,60],"z":[0,0,0,-5,0,20]},"width":[0,10,15,40,35,0],"height":[0,7,10,10,10,0],"angle":0,"laser":{"damage":[5,8],"rate":10,"type":1,"speed":[160,180],"number":1,"error":0},"propeller":false,"texture":[6,4,4,3]},"cannons2":{"section_segments":12,"offset":{"x":40,"y":70,"z":0},"position":{"x":[0,0,0,0,0],"y":[-30,-20,0,20,30],"z":[0,0,0,0,0]},"width":[2,5,7,10,3],"height":[2,5,7,10,3],"texture":[6,4,63,4],"propeller":true,"angle":0,"laser":{"damage":[8,13],"rate":2,"type":1,"speed":[120,180],"number":1,"error":0}},"propulsors":{"section_segments":8,"offset":{"x":60,"y":-50,"z":-25},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[30,55,60,80,95,100,90,95],"z":[0,0,0,0,0,0,0,0]},"width":[7,9,9,5,7,5,0],"height":[1,9,9,5,7,5,0],"texture":[4,63,4,11,63,12],"propeller":true}},"wings":{"wings1":{"doubleside":true,"offset":{"x":22,"y":20,"z":-9},"length":[-20,-10,-40],"width":[50,50,130,30],"angle":[0,-20,10],"position":[0,0,-50,0],"texture":[4,4,8,4],"bump":{"position":10,"size":-10}},"join":{"doubleside":true,"offset":{"x":0,"y":10,"z":0},"length":[70],"width":[50,30],"angle":[-20],"position":[0,0,0,50],"texture":63,"bump":{"position":10,"size":15}},"side_joins":{"offset":{"x":0,"y":30,"z":-3},"length":[40],"width":[90,30],"angle":[10],"position":[-50,50],"texture":[4],"bump":{"position":10,"size":10}}},"typespec":{"name":"Vengar","level":5,"model":45,"code":545,"specs":{"shield":{"capacity":[180,260],"reload":[5,8]},"generator":{"capacity":[100,155],"reload":[30,61]},"ship":{"mass":200,"speed":[117,137],"rotation":[90,130],"acceleration":[50,70]}},"shape":[3.807,3.821,3.098,2.611,2.267,2.05,1.891,1.784,1.72,1.689,2.797,2.776,2.743,2.782,2.789,2.83,3.004,3.256,3.28,2.855,3.564,4.267,4.354,2.463,1.831,1.803,1.831,2.463,4.354,4.267,3.564,2.855,3.28,3.256,3.004,2.83,2.789,2.782,2.744,2.776,2.797,1.689,1.72,1.784,1.891,2.05,2.267,2.611,3.098,3.821],"lasers":[{"x":0,"y":-3.8,"z":-0.8,"angle":0,"damage":[5,8],"rate":10,"type":1,"speed":[160,180],"number":1,"spread":0,"error":0,"recoil":0},{"x":1.6,"y":1.6,"z":0,"angle":0,"damage":[8,13],"rate":2,"type":1,"speed":[120,180],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.6,"y":1.6,"z":0,"angle":0,"damage":[8,13],"rate":2,"type":1,"speed":[120,180],"number":1,"spread":0,"error":0,"recoil":0}],"radius":4.354}}';
var Zarion_514 = '{"name":"Zarion","level":5,"model":46,"size":1.5,"zoom":1,"specs":{"shield":{"capacity":[140,220],"reload":[5,8]},"generator":{"capacity":[90,130],"reload":[25,40]},"ship":{"mass":175,"speed":[115,140],"rotation":[60,90],"acceleration":[70,120]}},"tori":{"engineEnd":{"segments":8,"radius":14.5,"section_segments":8,"offset":{"x":0,"y":104,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20],"height":[8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8],"texture":[4]}},"bodies":{"main":{"section_segments":9,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-104,-98,-100,-85,-62.5,-40,20,60,70,100,66],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,2,3,10,17,20,26,23,18,15,0],"height":[0,2,3,11,14,19,24,21,17,14,0],"texture":[4,63,3.9,2.9,2.9,10,3,63,3.9,16.9],"propeller":true},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-60,"z":13},"position":{"x":[0,0,0,0,0,0,0],"y":[-14,-5,22,50,54],"z":[-0.5,-3,0,2,7]},"width":[0,7,11,7,0],"height":[0,7,11,9,0],"texture":[7,9,4,4]},"side":{"section_segments":10,"offset":{"x":45,"y":80,"z":0},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-80,-70,-50,-16,-10,-4,40,35],"z":[0,0,0,0,0,0,0,0]},"width":[0,10,14,19,14,17,11,0],"height":[0,10,16,20,14,19,11,0],"texture":[3,3,63,4,4,8,16.9],"propeller":true,"angle":0},"engineBodyConnect":{"section_segments":[45,135,225,315],"offset":{"x":25,"y":39.8,"z":0},"position":{"x":[0,0,0,0,0],"y":[-2,-2,-2,12,12],"z":[0,0,0,0,0]},"width":[0,8,8,8,0],"height":[0,2,2,2,0],"texture":[3],"propeller":false,"angle":0},"cannonBack":{"section_segments":12,"offset":{"x":30,"y":0,"z":-4},"position":{"x":[0,0,0,0,0],"y":[-12,-12,-12,12,12],"z":[0,0,0,0,0]},"width":[0,3,3,3,0],"height":[0,3,3,3,0],"texture":[17,8,8,3],"propeller":false,"angle":3},"cannonCenter":{"section_segments":8,"offset":{"x":29.1,"y":-16,"z":-4.1},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-18,-20,-16,-16,-12,-12,-10.4,12,12],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,1.5,1.8,2.5,2.5,2,2,2.8,0],"height":[0,1.5,1.8,2.5,2.5,2,2,2.8,0],"texture":[17,3,17,3,17,3,4],"propeller":false,"angle":3},"cannonConnect":{"section_segments":[45,135,225,315],"offset":{"x":26,"y":-2,"z":-4},"position":{"x":[-11,-11,0,0,0],"y":[-12,-12,-2,12,12],"z":[0,0,0,0,0]},"width":[0,8,8,8,0],"height":[0,2,2,2,0],"texture":[63],"propeller":false,"angle":0.8,"laser":{"damage":[8,13],"rate":10,"type":1,"speed":[140,200],"number":1,"error":0}}},"wings":{"front":{"doubleside":true,"offset":{"x":54,"y":40,"z":0},"length":[30],"width":[30,20],"angle":[-20],"position":[0,-25],"texture":[63],"bump":{"position":10,"size":5}},"mid":{"doubleside":true,"offset":{"x":50,"y":36,"z":-4},"length":[30],"width":[30,20],"angle":[-40],"position":[0,-25],"texture":[63],"bump":{"position":10,"size":5}},"main":{"doubleside":true,"offset":{"x":53,"y":125,"z":0},"length":[47,14],"width":[80,45,25],"angle":[20,0],"position":[-50,5,-12],"texture":[10,63],"bump":{"position":-10,"size":8}}},"typespec":{"name":"Zarion","level":5,"model":46,"code":546,"specs":{"shield":{"capacity":[140,220],"reload":[5,8]},"generator":{"capacity":[90,130],"reload":[25,40]},"ship":{"mass":175,"speed":[115,140],"rotation":[60,90],"acceleration":[70,120]}},"shape":[3.12,2.812,2.204,1.723,1.372,1.398,1.392,1.272,1.143,1.072,1.037,1.008,0.991,2.485,2.545,2.577,2.482,2.384,4.572,5.098,5.425,5.392,3.966,3.785,3.745,3.727,3.745,3.785,3.966,5.392,5.425,5.098,4.572,2.384,2.482,2.577,2.545,2.485,1.35,1.008,1.037,1.072,1.143,1.272,1.392,1.398,1.372,1.723,2.204,2.812],"lasers":[{"x":0.445,"y":-0.415,"z":-0.12,"angle":0.8,"damage":[8,13],"rate":10,"type":1,"speed":[140,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.445,"y":-0.415,"z":-0.12,"angle":-0.8,"damage":[8,13],"rate":10,"type":1,"speed":[140,200],"number":1,"spread":0,"error":0,"recoil":0}],"radius":5.425}}';
var Mantis_515 = '{"name":"Mantis","level":5,"model":47,"size":1.4,"zoom":0.8,"specs":{"shield":{"capacity":[165,230],"reload":[6,9]},"generator":{"capacity":[75,115],"reload":[39,54]},"ship":{"mass":135,"speed":[130,170],"rotation":[50,65],"acceleration":[90,100]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-105,-100,-50,0,30,70,100,85],"z":[0,0,0,0,0,0,0,0]},"width":[0,15,25,34,30,40,20,0],"height":[0,10,20,20,20,10,10,0],"texture":[4,10,1,4,63,3,13],"propeller":true},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-40,"z":10},"position":{"x":[0,0,0,0,0,0,0],"y":[-20,-10,0,30,40],"z":[0,0,0,0,0]},"width":[0,10,15,15,10],"height":[0,10,13,12,10],"texture":[3,3,9,4],"propeller":false},"cannons":{"section_segments":12,"offset":{"x":40,"y":-35,"z":2},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-45,-20,0,20,50,55],"z":[0,0,0,0,0,0,0]},"width":[0,4,4,5,8,8,0],"height":[0,4,4,5,8,8,0],"angle":2,"laser":{"damage":[4,7],"rate":6,"type":1,"speed":[150,200],"number":1,"angle":0,"error":0},"propeller":false,"texture":[6,3,13,4,63,4]},"cannons2":{"section_segments":12,"offset":{"x":70,"y":50,"z":4},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-45,-20,0,20,50,55],"z":[0,0,0,0,0,0,0]},"width":[0,4,4,5,8,8,0],"height":[0,4,4,5,8,8,0],"angle":2,"laser":{"damage":[9,13],"rate":1,"type":1,"speed":[130,190],"number":1,"angle":0,"error":0},"propeller":false,"texture":[6,3,13,4,63,4]}},"wings":{"main":{"offset":{"x":0,"y":100,"z":0},"length":[40,0,40,-55,20,0,20],"width":[30,40,60,30,30,30,50,30],"texture":[13,63,11,4,4,63,63],"angle":[0,0,0,0,0,0,0],"position":[-100,-50,-50,-20,-120,-110,-110,-140],"bump":{"position":-10,"size":15}},"Wing_connector":{"doubleside":true,"offset":{"x":10,"y":69,"z":-18},"length":[20,10,10,10],"width":[0,20,60,30,40],"angle":[90,50,100,150],"position":[0,-30,-30,0,0],"texture":[4,4,4,4],"bump":{"position":40,"size":15}},"Wing":{"doubleside":true,"offset":{"x":0,"y":35,"z":15},"length":[30,0,10],"width":[30,20,30,20],"angle":[0,0,0,0],"position":[30,40,40,45],"texture":[10,4],"bump":{"position":0,"size":20}}},"typespec":{"name":"Mantis","level":5,"model":47,"code":547,"specs":{"shield":{"capacity":[165,230],"reload":[6,9]},"generator":{"capacity":[75,115],"reload":[39,54]},"ship":{"mass":135,"speed":[130,170],"rotation":[50,65],"acceleration":[90,100]}},"shape":[2.94,2.884,2.551,2.609,2.589,2.236,1.91,2.384,2.249,2.074,1.956,1.74,1.58,2.048,2.107,2.205,2.369,2.63,3.072,3.494,3.574,2.826,2.758,2.855,2.85,2.805,2.85,2.855,2.758,2.826,3.574,3.494,3.072,2.63,2.369,2.205,2.107,2.048,1.58,1.74,1.956,2.074,2.249,2.384,1.91,2.236,2.589,2.609,2.551,2.884],"lasers":[{"x":1.071,"y":-2.379,"z":0.056,"angle":2,"damage":[4,7],"rate":6,"type":1,"speed":[150,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.071,"y":-2.379,"z":0.056,"angle":-2,"damage":[4,7],"rate":6,"type":1,"speed":[150,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":1.911,"y":0.001,"z":0.112,"angle":2,"damage":[9,13],"rate":1,"type":1,"speed":[130,190],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.911,"y":0.001,"z":0.112,"angle":-2,"damage":[9,13],"rate":1,"type":1,"speed":[130,190],"number":1,"spread":0,"error":0,"recoil":0}],"radius":3.574}}';
var Pest_516 = '{"name":"Pest","level":5,"model":48,"size":1.3,"specs":{"shield":{"capacity":[175,250],"reload":[5,7]},"generator":{"capacity":[70,100],"reload":[20,25]},"ship":{"mass":160,"speed":[106,140],"rotation":[65,80],"acceleration":[90,140]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":-20,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-125,-145,-125,-130,-105,-115,-90,-100,-90,-80,-70,5,60,70,83,90,120,110],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,4,6,8,10,14,18,20,23,27,30,35,35,25,25,30,22,0],"height":[0,4,6,8,12,13,14,15,18,19,20,26,30,25,25,30,22,0],"texture":[17,4,4,3,4,2,4,4,63,4,2,10,4,63,4,8,17],"propeller":true,"laser":{"damage":[40,60],"rate":2,"speed":[160,220],"number":1,"recoil":40,"type":1}},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-70,"z":20},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-20,-16,30,60],"z":[-4,-4,1,0,0,0,0,0,0,0,0,0]},"width":[0,6,16,12],"height":[0,4,16,12],"texture":[2,9]},"propulsors":{"section_segments":12,"offset":{"x":40,"y":30,"z":-5},"position":{"x":[-12,-12,-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-80,-90,-50,-45,10,15,25,30,50,40],"z":[5,5,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,3,10,10,24,28,28,24,14,0],"height":[0,3,10,12.6,28,28,24,24,14,0],"texture":[4,31,4,11,4,63,4,12,17],"propeller":true}},"wings":{"main":{"doubleside":true,"offset":{"x":10,"y":-20,"z":5},"length":[79,0],"width":[130,60],"angle":[-12,-12],"position":[0,80,80],"texture":18,"bump":{"position":20,"size":5}}},"typespec":{"name":"Pest","level":5,"model":48,"code":548,"specs":{"shield":{"capacity":[175,250],"reload":[5,7]},"generator":{"capacity":[70,100],"reload":[20,25]},"ship":{"mass":160,"speed":[106,140],"rotation":[65,80],"acceleration":[90,140]}},"shape":[4.291,3.641,3.02,2.493,1.92,1.64,1.518,1.464,1.453,1.478,1.535,1.619,1.727,1.899,2.177,2.437,2.582,2.799,3.106,3.26,2.529,2.463,2.299,2.662,2.647,2.605,2.647,2.662,2.299,2.463,2.529,3.26,3.106,2.799,2.582,2.437,2.177,1.899,1.727,1.619,1.535,1.478,1.453,1.464,1.518,1.64,1.92,2.493,3.02,3.641],"lasers":[{"x":0,"y":-4.29,"z":0,"angle":0,"damage":[40,60],"rate":2,"type":1,"speed":[160,220],"number":1,"spread":0,"error":0,"recoil":40}],"radius":4.291}}';

// 6티어 
var Star_Drive_601 = '{"name":"Star-Drive","level":6,"model":49,"size":1.55,"zoom":0.85,"next":[721,722],"specs":{"shield":{"capacity":[155,250],"reload":[6,9.3]},"generator":{"capacity":[110,150],"reload":[42,57]},"ship":{"mass":200,"speed":[113,137],"rotation":[65,83],"acceleration":[95,140]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-105,-99,-93,-80,-47,-40,-29,-21,20,26,40,56,70,67],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,9,14,22,23,24,24,24,20,20,20,15,0],"height":[0,4,7,13,22,26,26,26,25,20,20,20,15,0],"texture":[6,4,63,2,2,63,3,10,5,3,4,63,17],"propeller":true,"laser":{"damage":[52,85.5],"rate":1.3,"type":2,"speed":[160,200],"number":1,"angle":0,"error":0}},"Hyperdrives":{"section_segments":12,"offset":{"x":25,"y":10,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[-37,-30,-20,0,20,50,45],"z":[0,0,0,0,0,0,0]},"width":[0,7,10,10,10,8,0],"height":[0,8,15,15,15,12,0],"angle":0,"propeller":true,"texture":[2,13,8,4,63,17]},"cockpit":{"section_segments":7,"offset":{"x":0,"y":-60,"z":14},"position":{"x":[0,0,0,0],"y":[-25,-8,20,35],"z":[-4,-6,0,8]},"width":[0,10,10,0],"height":[0,12,15,5],"texture":[9,9,4]}},"wings":{"front":{"offset":{"x":0,"y":55,"z":10},"length":[50,20],"width":[60,40,40],"angle":[-20,-20],"position":[-50,-30,-20],"texture":[2,3],"doubleside":true,"bump":{"position":50,"size":10}},"front2":{"doubleside":true,"offset":{"x":13,"y":-50,"z":-2},"length":[0,20,15],"width":[0,60,40,70],"angle":[0,-7,-11],"position":[0,0,40,40],"texture":[4,4,63],"bump":{"position":30,"size":8}},"main1":{"doubleside":true,"offset":{"x":65,"y":9,"z":-13},"length":[0,0,0,15],"width":[10,10,10,-85,0],"angle":[20,20,20,61],"position":[20,20,20,40,10],"texture":[0,18,12,63],"bump":{"position":3,"size":15}}},"typespec":{"name":"Star-Drive","level":6,"model":49,"code":649,"specs":{"shield":{"capacity":[155,250],"reload":[6,9.3]},"generator":{"capacity":[110,150],"reload":[42,57]},"ship":{"mass":200,"speed":[113,137],"rotation":[65,83],"acceleration":[95,140]}},"shape":[3.255,3.021,2.431,2.021,1.765,1.585,2.03,2.017,1.822,1.682,1.581,1.522,1.486,2.062,2.301,2.457,2.664,2.843,3.023,3.273,3.479,2.123,2.055,2.219,2.209,2.174,2.209,2.219,2.055,2.123,3.479,3.273,3.023,2.843,2.664,2.457,2.301,2.062,1.486,1.522,1.581,1.682,1.822,2.017,2.03,1.585,1.765,2.021,2.431,3.021],"lasers":[{"x":0,"y":-3.255,"z":0,"angle":0,"damage":[52,85.5],"rate":1.3,"type":2,"speed":[160,200],"number":1,"spread":0,"error":0,"recoil":0}],"radius":3.479,"next":[721,722]}}';
var Solaris_602 = '{"name":"Solaris","level":6,"model":50,"size":1.8,"zoom":0.85,"specs":{"shield":{"capacity":[180,250],"reload":[6,9.5]},"generator":{"capacity":[100,155],"reload":[52,71]},"ship":{"mass":200,"speed":[100,140],"rotation":[45,60],"acceleration":[100,125]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":-5,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-105,-100,-50,-5,20,36,70,70],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,4,20,25,18,18,18,0],"height":[0,4,15,15,15,15,15,0],"texture":[4,2,11,63,3,4,17],"propeller":true,"laser":{"damage":[26,46],"rate":1,"type":2,"speed":[140,210],"number":1,"error":0}},"cockpit":{"section_segments":10,"offset":{"x":0,"y":-45,"z":15},"position":{"x":[0,0,0,0,0,0,0],"y":[-40,-20,0,20,30],"z":[-8.3,-3,-3,0,0]},"width":[0,5,9,9,3,0],"height":[0,5,14.7,12,0],"texture":[9,9,3,3]},"mini_cannons":{"section_segments":10,"offset":{"x":15,"y":-60,"z":0},"position":{"x":[0,0,0,0],"y":[-34,-35,-20,10],"z":[0,0,0,0]},"width":[0,1.5,4.5,4.5,1.5,0],"height":[0,1.5,4.5,4.5,0],"texture":[15.9,4,63,3],"laser":{"damage":[6,9],"rate":6,"type":1,"speed":[130,190],"number":1,"error":1}},"mini_cannons2":{"section_segments":10,"offset":{"x":29,"y":-20,"z":-1},"position":{"x":[2,2,2,2,2,2,-1,-3],"y":[-34,-35,-20,0,20,40,60,85],"z":[0,0,0,0,0,0,0,0]},"width":[0,5,8,12,13,10,9,0],"height":[0,5,8,10,9,9,9,0],"texture":[16.9,4,63,2,3,4,63],"angle":-3,"laser":{"damage":[16,24],"rate":3,"type":1,"speed":[130,190],"number":1,"error":1}},"wing_cannons2":{"angle":190,"section_segments":10,"offset":{"x":-45,"y":12,"z":-12},"position":{"x":[-15,-5,0,1,0,-5,-15],"y":[-60,-40,-20,0,20,40,60],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,5,6,6.5,6,5,0],"height":[0,10,10,10,10,10,0],"texture":[4,3,63,63,3,4]},"Engines_Side":{"section_segments":10,"offset":{"x":19,"y":-5,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[0,0,0,-5,20,35,70,70],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,0,0,4.83,5.83,5,5,0,0],"height":[0,0,0.3,1.7,11.7,10,10,0,0],"texture":[1,1,1,13,13,4,17],"propeller":true}},"wings":{"winglets":{"offset":{"x":7.3,"y":60,"z":8},"doubleside":true,"length":[20],"width":[40,0],"angle":[37],"position":[-20,10],"texture":[63],"bump":{"position":0,"size":10}}},"typespec":{"name":"Solaris","level":6,"model":50,"code":650,"specs":{"shield":{"capacity":[180,250],"reload":[6,9.5]},"generator":{"capacity":[100,155],"reload":[52,71]},"ship":{"mass":200,"speed":[100,140],"rotation":[45,60],"acceleration":[100,125]}},"shape":[3.96,3.535,3.317,2.245,2.334,2.386,2.304,2.198,2.136,2.108,2.03,1.98,1.962,1.923,1.934,1.95,1.998,2.072,2.133,2.234,2.321,2.399,2.656,2.63,2.382,2.345,2.382,2.63,2.656,2.399,2.321,2.234,2.133,2.072,1.998,1.95,1.934,1.923,1.962,1.98,2.03,2.108,2.136,2.198,2.304,2.386,2.334,2.245,3.317,3.535],"lasers":[{"x":0,"y":-3.96,"z":0,"angle":0,"damage":[26,46],"rate":1,"type":2,"speed":[140,210],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.54,"y":-3.42,"z":0,"angle":0,"damage":[6,9],"rate":6,"type":1,"speed":[130,190],"number":1,"spread":0,"error":1,"recoil":0},{"x":-0.54,"y":-3.42,"z":0,"angle":0,"damage":[6,9],"rate":6,"type":1,"speed":[130,190],"number":1,"spread":0,"error":1,"recoil":0},{"x":1.182,"y":-1.975,"z":-0.036,"angle":-3,"damage":[16,24],"rate":3,"type":1,"speed":[130,190],"number":1,"spread":0,"error":1,"recoil":0},{"x":-1.182,"y":-1.975,"z":-0.036,"angle":3,"damage":[16,24],"rate":3,"type":1,"speed":[130,190],"number":1,"spread":0,"error":1,"recoil":0}],"radius":3.96}}';
var Luna_603 = '{"name":"Luna","level":6,"model":51,"size":1.75,"zoom":0.85,"specs":{"shield":{"capacity":[230,330],"reload":[7,10]},"generator":{"capacity":[100,150],"reload":[48,66]},"ship":{"mass":220,"speed":[105,130],"rotation":[50,65],"acceleration":[80,135]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-100,-98,-95,-90,-70,0,10,35,45,70,80,95,90],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,0,0,5,15,25,26,30,30,25,20,15,0,0],"height":[0,0,0,5,10,22,23,24,23,20,18,15,0,0],"texture":[12,5,3,63,11,4,63,4,10,1,5,17],"propeller":true},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-45,"z":5},"position":{"x":[0,0,0,0,0,0,0],"y":[-30,-10,20,30,80],"z":[0,0,0,0,0]},"width":[0,8,12,13,10],"height":[0,15,20,22,0],"texture":[9,9,9,4]},"propulsors":{"section_segments":8,"offset":{"x":20,"y":-15,"z":-11},"position":{"x":[0,0,0,0,0],"y":[75,100,110,105,100],"z":[0,0,0,0,0]},"width":[5,10,5,5,0],"height":[5,5,5,5,0],"texture":[63,63,12,17],"angle":0,"propeller":true},"frontlaser":{"section_segments":8,"offset":{"x":0,"y":-60,"z":-11},"position":{"x":[0,0,0,0,0],"y":[-20,-20,-30,20,70],"z":[0,0,0,0,0]},"width":[0,0,5,12,1],"height":[0,0,4,12,1],"texture":[4,17,4,63],"laser":{"damage":[18,28],"rate":1.5,"type":2,"speed":[170,200],"number":4,"recoil":10,"angle":3,"error":0}},"wing_laser":{"section_segments":12,"offset":{"x":50,"y":45,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-35,-50,-25,0,20,35,45,40],"z":[0,0,0,0,0,0,0,0]},"width":[0,5,6,10,13,13,9,0],"height":[0,5,6,10,13,13,9,0],"texture":[17,4,63,4,10,4,12],"angle":1,"laser":{"damage":[12,21],"rate":2.5,"type":1,"speed":[120,150],"number":1},"propeller":true}},"wings":{"top":{"doubleside":true,"offset":{"x":2.5,"y":50,"z":0},"length":[50],"width":[70,30,50],"angle":[60,-20],"position":[0,30,-5],"texture":[4,63],"bump":{"position":10,"size":10}},"main":{"doubleside":true,"offset":{"x":0,"y":10,"z":-3},"length":[55,25],"width":[120,60,60],"angle":[-10,30],"position":[10,50,20],"texture":[8.07,63],"bump":{"position":5.5,"size":10}}},"typespec":{"name":"Luna","level":6,"model":51,"code":651,"specs":{"shield":{"capacity":[230,330],"reload":[7,10]},"generator":{"capacity":[100,150],"reload":[48,66]},"ship":{"mass":220,"speed":[105,130],"rotation":[50,65],"acceleration":[80,135]}},"shape":[3.5,3.114,2.573,1.959,1.572,1.315,1.157,1.05,0.974,0.924,0.925,0.994,1.904,2.672,2.737,2.854,3.023,3.27,3.408,3.492,3.777,3.726,3.487,3.462,3.385,3.331,3.385,3.462,3.487,3.726,3.777,3.492,3.408,3.27,3.023,2.854,2.737,2.672,2.654,0.994,0.925,0.924,0.974,1.05,1.157,1.315,1.572,1.959,2.573,3.114],"lasers":[{"x":0,"y":-3.15,"z":-0.385,"angle":0,"damage":[18,28],"rate":1.5,"type":2,"speed":[170,200],"number":4,"spread":3,"error":0,"recoil":10},{"x":1.719,"y":-0.175,"z":-0.35,"angle":1,"damage":[12,21],"rate":2.5,"type":1,"speed":[120,150],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.719,"y":-0.175,"z":-0.35,"angle":-1,"damage":[12,21],"rate":2.5,"type":1,"speed":[120,150],"number":1,"spread":0,"error":0,"recoil":0}],"radius":3.777}}';
var Mercenary_604 = '{"name":"Mercenary","level":6,"model":52,"size":1.6,"zoom":0.85,"specs":{"shield":{"capacity":[210,325],"reload":[5,9]},"generator":{"capacity":[100,165],"reload":[54,73]},"ship":{"mass":220,"speed":[105,125],"rotation":[65,80],"acceleration":[100,130]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":10,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-155,-150,-125,-95,-50,0,40,85,95,85],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[3,6,12,17,25,30,30,30,20,0],"height":[0,2,8,15,20,30,30,25,15,0],"texture":[63,3,4,63,2,4,8,12,17],"propeller":true},"side_cannons":{"section_segments":12,"offset":{"x":35,"y":35,"z":27},"position":{"x":[0,0,0,0,0,0,0],"y":[-5,-10,0,15,40,55],"z":[0,0,0,0,2,2,2]},"width":[0,4,7,7.5,7.5,0],"height":[0,4,7,7.5,7.5,0,0],"angle":0,"laser":{"damage":[23,35],"rate":1.5,"type":1,"speed":[190,240],"recoil":0,"number":1,"error":0},"propeller":false,"texture":[6,6,3,63,10,4]},"cockpit":{"section_segments":12,"offset":{"x":0,"y":-60,"z":10},"position":{"x":[0,0,0,0,0,0],"y":[-70,-50,-20,0,35,85],"z":[-7,-6,-3,-2,10,20]},"width":[0,8,13,12,5,0],"height":[0,12,17,17.5,5,0],"texture":[9,9,9,3,4]},"propulsors":{"section_segments":12,"offset":{"x":55,"y":30,"z":5},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-20,-10,-20,0,15,25,35,65,85,90,85],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,10,13,20,20,20,18,18,15,10,0],"height":[0,10,13,20,20,20,18,18,15,10,0],"texture":[12,3,4,63,12,3,11,10,12,17],"propeller":true},"cannons":{"section_segments":12,"offset":{"x":30,"y":-70,"z":-5},"position":{"x":[0,0,0,-5,-5,-10,-10],"y":[-45,-50,-20,0,20,30,40],"z":[0,0,0,0,0,0,0]},"width":[0,5,8,10,6,5,0],"height":[0,5,6,8,6,5,0],"angle":0,"laser":{"damage":[4,8],"rate":8,"type":1,"speed":[150,180],"number":1,"angle":0,"error":0},"propeller":false,"texture":[17,4,10,4,63,4]}},"wings":{"front":{"doubleside":true,"offset":{"x":8,"y":-54,"z":-2},"length":[0,30,20],"width":[0,80,60,20],"angle":[0,10,-60],"position":[0,-20,0,0],"texture":[1,63,2],"bump":{"position":0,"size":5}},"wing1":{"offset":{"x":10,"y":60,"z":15},"length":[30,45],"width":[60,60,20],"angle":[40,0],"position":[0,10,40,60],"texture":[3,11],"doubleside":true,"bump":{"position":10,"size":5}},"wing2":{"offset":{"x":0,"y":60,"z":-5},"length":[30,30],"width":[70,70,40],"angle":[0,30],"position":[0,0,30,50],"texture":[3,10],"doubleside":true,"bump":{"position":10,"size":5}}},"typespec":{"name":"Mercenary","level":6,"model":52,"code":652,"specs":{"shield":{"capacity":[210,325],"reload":[5,9]},"generator":{"capacity":[100,165],"reload":[54,73]},"ship":{"mass":220,"speed":[105,125],"rotation":[65,80],"acceleration":[100,130]}},"shape":[4.641,4.184,4,3.715,2.895,2.655,2.385,2.086,1.582,1.002,0.96,0.933,0.927,0.946,2.338,2.576,2.737,2.965,3.199,3.913,4.315,4.367,4.244,3.418,3.42,3.367,3.42,3.418,4.244,4.367,4.315,3.913,3.199,2.965,2.737,2.576,2.338,0.946,0.928,0.933,0.96,1.002,1.582,2.086,2.385,2.655,2.895,3.715,4,4.184],"lasers":[{"x":1.12,"y":0.8,"z":0.864,"angle":0,"damage":[23,35],"rate":1.5,"type":1,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.12,"y":0.8,"z":0.864,"angle":0,"damage":[23,35],"rate":1.5,"type":1,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.96,"y":-3.84,"z":-0.16,"angle":0,"damage":[4,8],"rate":8,"type":1,"speed":[150,180],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.96,"y":-3.84,"z":-0.16,"angle":0,"damage":[4,8],"rate":8,"type":1,"speed":[150,180],"number":1,"spread":0,"error":0,"recoil":0}],"radius":4.641}}';
var Victory_605 = '{"name":"Victory","level":6,"model":53,"size":1.85,"zoom":0.85,"specs":{"shield":{"capacity":[180,280],"reload":[6,9]},"generator":{"capacity":[90,155],"reload":[50,73]},"ship":{"mass":200,"speed":[115,155],"rotation":[65,90],"acceleration":[70,90]}},"bodies":{"main":{"section_segments":9,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-60,-50,-20,20,30,40,60,50],"z":[0,0,0,0,0,0,0,0]},"width":[0,15,24,19,14,20,12,0],"height":[0,5,9,10,8,13,8,0],"texture":[3,10,2,63,63,4,17],"propeller":1},"propeller":{"section_segments":12,"offset":{"x":0,"y":10,"z":-25},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-30,-40,-10,20,30,40,60,50],"z":[1,0,0,0,0,0,0,0]},"width":[0,10,18,15,14,22,19,0],"height":[0,10,12,10,8,10,8,0],"texture":[8,63,11,4,4,13,17],"propeller":1,"laser":{"damage":[62,81],"rate":1,"type":2,"speed":[125,175],"number":1,"error":0}},"observe":{"section_segments":8,"offset":{"x":0,"y":-10,"z":5},"position":{"x":[0,0,0,0,0,0],"y":[-40,-30,-10,10,40,61],"z":[0,0,0,0,0,5]},"width":[0,10,15,8,10,0],"height":[0,10,15,10,10,0],"texture":[9,9,9,4],"propeller":false},"gun1":{"section_segments":8,"offset":{"x":37,"y":20,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-40,-50,-30,0,20,25],"z":[0,0,0,0,0,0]},"width":[0,5,6,8,5,0],"height":[0,5,6,8,5,0],"angle":0,"laser":{"damage":[6,11],"rate":3,"type":1,"speed":[170,190],"number":1,"error":0},"propeller":false,"texture":[13,4,10,63,4]},"gun2":{"section_segments":8,"offset":{"x":64,"y":30,"z":-30},"position":{"x":[0,0,0,0,0,0],"y":[-40,-50,-30,0,20,25],"z":[0,0,0,0,0,0]},"width":[0,5,6,8,5,0],"height":[0,5,6,8,5,0],"angle":0,"laser":{"damage":[6,11],"rate":3,"type":1,"speed":[170,190],"number":1,"error":0},"propeller":false,"texture":[13,4,10,63,4]}},"wings":{"main":{"offset":{"x":0,"y":0,"z":-17},"length":[28,10,20,20,35],"width":[60,50,50,45,35,20],"angle":[25,0,-49,-35,0,0],"position":[3,10,0,25,30,20],"texture":[11,4,3,11,63],"doubleside":true,"bump":{"position":20,"size":8}},"connecttop":{"offset":{"x":0,"y":0,"z":-15},"length":[60],"width":[60,30],"angle":[90,0],"position":[0,40],"texture":[63],"doubleside":true,"bump":{"position":0,"size":15}},"tail":{"offset":{"x":0,"y":0,"z":-11},"length":[40],"width":[60,20],"angle":[-20,0],"position":[10,80],"texture":[3],"doubleside":true,"bump":{"position":0,"size":15}},"sensors":{"offset":{"x":6,"y":-20,"z":0},"length":[30],"width":[30,16],"angle":[-30,0],"position":[-10,-20],"texture":[63],"doubleside":true,"bump":{"position":0,"size":15}},"winglets":{"offset":{"x":40,"y":28,"z":0},"length":[20],"width":[25,13],"angle":[30,0],"position":[0,0],"texture":[63],"doubleside":true,"bump":{"position":0,"size":15}}},"typespec":{"name":"Victory","level":6,"model":53,"code":653,"specs":{"shield":{"capacity":[180,280],"reload":[6,9]},"generator":{"capacity":[90,155],"reload":[50,73]},"ship":{"mass":200,"speed":[115,155],"rotation":[65,90],"acceleration":[70,90]}},"shape":[2.22,2.132,2.001,1.912,2.091,2.134,1.854,1.888,1.91,1.786,2.658,2.639,2.594,3.725,3.815,3.859,3.545,3.214,3.152,2.564,2.156,3.264,3.609,2.721,2.637,2.595,2.637,2.721,3.609,3.264,2.156,2.564,3.152,3.214,3.545,3.859,3.815,3.725,2.594,2.639,2.658,1.786,1.91,1.888,1.854,2.134,2.091,1.912,2.001,2.132],"lasers":[{"x":0,"y":-1.11,"z":-0.925,"angle":0,"damage":[62,81],"rate":1,"type":2,"speed":[125,175],"number":1,"spread":0,"error":0,"recoil":0},{"x":1.369,"y":-1.11,"z":0,"angle":0,"damage":[6,11],"rate":3,"type":1,"speed":[170,190],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.369,"y":-1.11,"z":0,"angle":0,"damage":[6,11],"rate":3,"type":1,"speed":[170,190],"number":1,"spread":0,"error":0,"recoil":0},{"x":2.368,"y":-0.74,"z":-1.11,"angle":0,"damage":[6,11],"rate":3,"type":1,"speed":[170,190],"number":1,"spread":0,"error":0,"recoil":0},{"x":-2.368,"y":-0.74,"z":-1.11,"angle":0,"damage":[6,11],"rate":3,"type":1,"speed":[170,190],"number":1,"spread":0,"error":0,"recoil":0}],"radius":3.859}}';
var Space_Dragster_606 = '{"name":"Space-Dragster","level":6,"model":54,"size":2,"zoom":0.9,"specs":{"shield":{"capacity":[200,300],"reload":[5,8]},"generator":{"capacity":[100,155],"reload":[54,64]},"ship":{"mass":230,"speed":[140,175],"rotation":[45,57],"acceleration":[80,130]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":10,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-150,-145,-110,-90,-30,10,50,70,65],"z":[0,0,0,0,0,0,0,0,0]},"width":[5,10,12.5,15,20,20,20,15,0],"height":[0,5,17,20,30,30,20,15,0],"texture":[11,2,3,11,63,4,12,17,17],"propeller":true},"cockpit":{"section_segments":12,"offset":{"x":0,"y":-20,"z":22.5},"position":{"x":[0,0,0,0,0,0,0],"y":[-20,0,20,40,70],"z":[3,0,0,0,-1,4]},"width":[0,10,12,10,0],"height":[0,13,15,12,0],"texture":[9,9,9,2]},"side_propulsors":{"section_segments":12,"offset":{"x":40,"y":10,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-25,-30,-10,0,20,30,50,60,54],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,5,15,15,15,15,15,10,0],"height":[0,5,20,20,20,20,20,10,0],"propeller":true,"texture":[17,3,4,10,2,3,15,17]},"boink":{"section_segments":10,"offset":{"x":20,"y":10,"z":0},"position":{"x":[-10,-5,-2,0,0,0,0,0,0,-6],"y":[-130,-105,-50,-25,-5,5,15,30,60,70],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,5,15,15,15,15,15,15,10,0],"height":[0,5,10,10,10,10,10,10,10,0],"propeller":false,"texture":[4,4,3,2,1,63,4,4,63]},"cannons":{"section_segments":12,"offset":{"x":15,"y":-70,"z":-5},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-50,-45,-20,0,5,20,30,40],"z":[0,0,0,0,0,0,0,0]},"width":[0,5,7,10,9,7,5,0],"height":[0,5,7,10,9,7,5,0],"angle":0,"laser":{"damage":[7,12.5],"rate":10,"type":1,"speed":[200,250],"number":1,"angle":0,"error":0},"propeller":false,"texture":[6,4,10,63,4,63]}},"wings":{"winglets":{"offset":{"x":0,"y":-45,"z":0},"doubleside":true,"length":[45,20],"width":[50,60,50],"angle":[0,0],"position":[90,75,70],"texture":[4],"bump":{"position":10,"size":10}},"space_spoiler":{"offset":{"x":5,"y":30,"z":15},"doubleside":true,"length":[20,30],"width":[40,40,20],"angle":[50,0],"position":[0,40,40],"texture":[63,4],"bump":{"position":10,"size":10}}},"typespec":{"name":"Space-Dragster","level":6,"model":54,"code":654,"specs":{"shield":{"capacity":[200,300],"reload":[5,8]},"generator":{"capacity":[100,155],"reload":[54,64]},"ship":{"mass":230,"speed":[140,175],"rotation":[45,57],"acceleration":[80,130]}},"shape":[5.604,5.467,4.388,3.141,2.619,2.265,2.027,1.804,1.66,1.975,2.012,2.085,2.196,2.62,2.682,2.793,2.962,3.208,3.28,3.324,3.572,3.729,3.666,3.67,3.437,3.206,3.437,3.67,3.666,3.729,3.572,3.324,3.28,3.208,2.962,2.793,2.682,2.62,2.6,2.085,2.012,1.975,1.66,1.804,2.027,2.265,2.619,3.141,4.388,5.467],"lasers":[{"x":0.6,"y":-4.8,"z":-0.2,"angle":0,"damage":[7,12.5],"rate":10,"type":1,"speed":[200,250],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.6,"y":-4.8,"z":-0.2,"angle":0,"damage":[7,12.5],"rate":10,"type":1,"speed":[200,250],"number":1,"spread":0,"error":0,"recoil":0}],"radius":5.604}}';
var Judgement_607 = '{"name":"Judgement","level":6,"model":55,"size":1.72,"zoom":0.85,"specs":{"shield":{"capacity":[225,325],"reload":[5,9]},"generator":{"capacity":[110,185],"reload":[65,82]},"ship":{"mass":230,"speed":[115,142],"rotation":[80,120],"acceleration":[90,120]}},"bodies":{"gary":{"section_segments":8,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-83,-80,-65,-35,0,35,70,90,70],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,10,11.5,15,22,22,15,15,0],"height":[0,5,9,10,20,25,15,15,0],"texture":[4,3,2,3,10,4,13,17],"propeller":true},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-10,"z":15},"position":{"x":[0,0,0,0],"y":[-30,10,40,60],"z":[-12,0,0,-1]},"width":[5,12,15,4],"height":[5,15,20,5],"texture":[9],"propeller":false},"side_propulsors":{"section_segments":12,"offset":{"x":44,"y":25,"z":0},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-49,-55,-30,0,15,40,50,40],"z":[1,0,0,0,5,0,0,0]},"width":[0,5,10,10,12,10,10,0],"height":[0,5,10,17,16,10,10,0],"texture":[6,4,10,63,4,13,17],"propeller":true},"maingun":{"section_segments":8,"offset":{"x":0,"y":-66,"z":-7},"position":{"x":[0,0,0,0,0,0,0],"y":[-35,-40,-10,20,40,70,45],"z":[0,-1,0,0,0,0,0]},"width":[0,4,11,5.5,5,4,0],"height":[0,5,10,5,5,5,0],"angle":0,"laser":{"damage":[17,25],"rate":1,"type":2,"speed":[140,230],"number":5,"error":2,"angle":7,"recoil":0},"propeller":false,"texture":[6,4,1]},"sideguns":{"section_segments":8,"offset":{"x":63,"y":25,"z":-29},"position":{"x":[0,0,0,0,0,0,0],"y":[-35,-40,0,20,40,70,45],"z":[0,-1,0,0,0,0,0]},"width":[0,4,8,5.5,7,7,0],"height":[0,5,10,8,8,8,0],"angle":0,"laser":{"damage":[5,8],"rate":3,"type":1,"speed":[100,190],"number":1,"error":0},"propeller":false,"texture":[6,4,63,4,63,13]}},"wings":{"main":{"offset":{"x":14,"y":0,"z":-5},"length":[11,9,44,15,25,0],"width":[60,80,70,50,45,20],"angle":[0,0,-27,-15,0,0],"position":[0,30,30,40,20,25],"texture":[63,63,11,8,4],"doubleside":false,"bump":{"position":-20,"size":13}},"extension":{"offset":{"x":44,"y":30,"z":-2},"length":[40],"width":[80,30],"angle":[-30,0],"position":[0,60],"texture":[63],"doubleside":false,"bump":{"position":0,"size":15}},"flames":{"offset":{"x":44,"y":30,"z":-17},"length":[64],"width":[70,20],"angle":[-25,0],"position":[0,45],"texture":[4],"doubleside":false,"bump":{"position":0,"size":15}}},"typespec":{"name":"Judgement","level":6,"model":55,"code":655,"specs":{"shield":{"capacity":[225,325],"reload":[5,9]},"generator":{"capacity":[110,185],"reload":[65,82]},"ship":{"mass":230,"speed":[115,142],"rotation":[80,120],"acceleration":[90,120]}},"shape":[3.649,3.333,2.171,1.559,1.24,1.071,0.987,1.755,1.976,1.943,1.884,2.362,3.137,3.855,4.001,4.057,3.653,4.335,4.563,4.237,4.504,3.87,2.851,2.753,3.139,3.102,3.139,2.753,2.851,3.87,4.504,4.237,4.563,4.335,3.653,4.057,4.001,3.855,3.137,2.362,1.884,1.943,1.976,1.755,0.987,1.071,1.24,1.559,2.171,3.333],"lasers":[{"x":0,"y":-3.646,"z":-0.241,"angle":0,"damage":[17,25],"rate":1,"type":2,"speed":[140,230],"number":5,"spread":7,"error":2,"recoil":0},{"x":2.167,"y":-0.516,"z":-0.998,"angle":0,"damage":[5,8],"rate":3,"type":1,"speed":[100,190],"number":1,"spread":0,"error":0,"recoil":0},{"x":-2.167,"y":-0.516,"z":-0.998,"angle":0,"damage":[5,8],"rate":3,"type":1,"speed":[100,190],"number":1,"spread":0,"error":0,"recoil":0}],"radius":4.563}}';
var Typhoon_608 = '{"name":"Typhoon","level":6,"model":56,"size":1.5,"zoom":0.85,"specs":{"shield":{"capacity":[230,310],"reload":[6,9]},"generator":{"capacity":[145,215],"reload":[59,81]},"ship":{"mass":210,"speed":[125,165],"rotation":[70,90],"acceleration":[120,160]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":0,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-128,-125,-90,-50,-20,30,65,75,70],"z":[0,0,0,0,0,0,0,0,0]},"width":[4,7,14,20,25,30,30,20,0],"height":[0,6,10,12,20,20,18,15,0],"propeller":false,"texture":[63,4,63,1,10,3,4,18]},"tongs":{"section_segments":12,"offset":{"x":30,"y":40,"z":10},"position":{"x":[-11,-10,-7.5,-5,0,0,0,0,0,0],"y":[-90,-65,-50,-20,0,10,40,70,80],"z":[0,2.5,0,0,0,0,0,7.5,7.5]},"width":[0,8,15,15,15,10,10,7.5,0],"height":[0,6,8,15,15,15,15,5,0],"propeller":false,"texture":[4,3,4,11,3,10,63,3]},"jet2":{"section_segments":12,"offset":{"x":40,"y":50,"z":10},"position":{"x":[-20,-15,-10,-5,0,0,0,0,0,0],"y":[-100,-75,-40,-10,50,60,70,75,65],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,8,20,20,20,20,20,15,0],"height":[0,6,8,10,10,10,10,7.5,0],"propeller":true,"texture":[3,63,4,10,1,3,12,17]},"cockpit":{"section_segments":12,"offset":{"x":0,"y":-30,"z":20},"position":{"x":[0,0,0,0,0,0,0],"y":[-45,-25,0,20,90],"z":[-2.5,-1,-2,0,2]},"width":[0,10,13,12,5],"height":[0,10,18,15,5],"propeller":false,"texture":[9,9,9,63,4]},"cannon":{"section_segments":6,"offset":{"x":15,"y":-70,"z":10},"position":{"x":[0,0,0,0,0,0],"y":[-40,-50,-45,0,20,30],"z":[0,0,0,0,0,0]},"width":[0,3,5,5,5,0],"height":[0,3,5,5,5,0],"angle":0,"laser":{"damage":[9,13.5],"rate":6,"type":1,"speed":[130,180],"number":1,"error":10},"propeller":false,"texture":[16.9,13,4,3]},"cannon2":{"section_segments":6,"offset":{"x":0,"y":-115,"z":5},"position":{"x":[0,0,0,0,0,0],"y":[-15,-20,-15,0,20,30],"z":[0,0,0,0,0,0]},"width":[0,3,5,5,5,0],"height":[0,3,5,5,5,0],"angle":0,"laser":{"damage":[9,13.5],"rate":6,"type":1,"speed":[130,180],"number":1,"error":10},"propeller":false,"texture":[16.9,13,3,3]}},"wings":{"main":{"length":[50,20],"width":[60,27.5,20],"angle":[0,0],"position":[0,-50,-75],"doubleside":true,"offset":{"x":50,"y":90,"z":10},"bump":{"position":20,"size":5},"texture":[11,63]},"front":{"length":[35,35],"width":[190,40,10],"angle":[-10,-10],"position":[0,20,45],"doubleside":true,"offset":{"x":5,"y":-30,"z":10},"bump":{"position":30,"size":5},"texture":[11,63]},"back":{"length":[50],"width":[40,20],"angle":[35,10],"position":[0,40,20],"doubleside":true,"offset":{"x":25,"y":80,"z":17.5},"bump":{"position":0,"size":5},"texture":[4]}},"typespec":{"name":"Typhoon","level":6,"model":56,"code":656,"specs":{"shield":{"capacity":[230,310],"reload":[6,9]},"generator":{"capacity":[145,215],"reload":[59,81]},"ship":{"mass":210,"speed":[125,165],"rotation":[70,90],"acceleration":[120,160]}},"shape":[4.051,3.652,3.086,2.298,2.003,1.783,1.633,1.539,1.517,1.567,1.652,1.778,1.949,3.628,3.677,3.607,3.474,3.399,3.384,3.454,3.59,4.373,4.131,3.943,3.773,2.254,3.773,3.943,4.131,4.373,3.59,3.454,3.384,3.399,3.474,3.607,3.677,3.628,1.96,1.778,1.652,1.567,1.517,1.539,1.633,1.783,2.003,2.298,3.086,3.652],"lasers":[{"x":0.45,"y":-3.6,"z":0.3,"angle":0,"damage":[9,13.5],"rate":6,"type":1,"speed":[130,180],"number":1,"spread":0,"error":10,"recoil":0},{"x":-0.45,"y":-3.6,"z":0.3,"angle":0,"damage":[9,13.5],"rate":6,"type":1,"speed":[130,180],"number":1,"spread":0,"error":10,"recoil":0},{"x":0,"y":-4.05,"z":0.15,"angle":0,"damage":[9,13.5],"rate":6,"type":1,"speed":[130,180],"number":1,"spread":0,"error":10,"recoil":0}],"radius":4.373}}';
var Prophet_609 = '{"name":"Prophet","level":6,"model":57,"size":2.3,"zoom":0.95,"specs":{"shield":{"capacity":[250,350],"reload":[5,8]},"generator":{"capacity":[90,165],"reload":[55,70]},"ship":{"mass":220,"speed":[95,125],"rotation":[50,70],"acceleration":[80,110]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-96,-92,-80,-60,-36,-26,-20,0,10,40,50,66,50],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,6,10,16,15.4,14,12,20,20,20,20,12,0],"height":[0,3,8,10,12,12,12,16,16,16,16,10,0],"texture":[63,2,2,63,2,3,4,63,11,4,13,13,13],"propeller":true},"guns":{"section_segments":12,"offset":{"x":32,"y":-5,"z":-14},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-40,-50,0,6,10,16,50,50,50],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,6,10,14,12,14,10,8,0],"height":[0,4,8,10,10,10,10,6,0],"texture":[6,3,12,3,63,4,63,2,2],"laser":{"damage":[40,65],"rate":2,"type":2,"speed":[190,240],"recoil":200,"number":1,"error":0,"angle":2}},"engines":{"section_segments":8,"offset":{"x":60,"y":21,"z":0},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-20,-18,-20,-16,0,16,20,10],"z":[0,0,0,0,0,0,0,0]},"width":[0,6,8,10,12,10,8,0],"height":[0,6,8,10,12,10,8,0],"texture":[3,63,3,8,63,13,0,0],"propeller":true},"cockpit":{"section_segments":7,"offset":{"x":0,"y":-62,"z":8},"position":{"x":[0,0,0,0,0,0],"y":[-20,-14,2,8,16,20],"z":[-6,0,0,0,0,0]},"width":[0,4,7,7,5,0],"height":[0,6,8,8,6,0],"texture":[4,9,4,4,4,4]}},"wings":{"main":{"offset":{"x":20,"y":24,"z":-4},"length":[60,10],"width":[30,20,10],"position":[0,-20,-10],"angle":[-30,-26],"texture":[2,63],"bump":{"position":10,"size":10}},"top":{"offset":{"x":38,"y":29,"z":-10},"length":[50,10],"width":[33,23,10],"position":[0,-16,-16],"angle":[20,6],"texture":[11,63],"bump":{"position":10,"size":10}}},"typespec":{"name":"Prophet","level":6,"model":57,"code":657,"specs":{"shield":{"capacity":[250,350],"reload":[5,8]},"generator":{"capacity":[90,165],"reload":[55,70]},"ship":{"mass":220,"speed":[95,125],"rotation":[50,70],"acceleration":[80,110]}},"shape":[4.416,4.246,3.241,2.334,2.996,3.075,2.782,2.488,2.276,2.126,2.03,1.972,3.471,4.401,4.444,4.174,3.653,3.653,3.207,2.844,2.686,2.451,2.636,3.046,3.086,3.042,3.086,3.046,2.636,2.451,2.686,2.844,3.207,3.653,3.653,4.174,4.444,4.401,3.476,1.972,2.03,2.126,2.276,2.488,2.782,3.075,2.996,2.334,3.241,4.246],"lasers":[{"x":1.472,"y":-2.53,"z":-0.644,"angle":0,"damage":[40,65],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":2,"error":0,"recoil":200},{"x":-1.472,"y":-2.53,"z":-0.644,"angle":0,"damage":[40,65],"rate":2,"type":2,"speed":[190,240],"number":1,"spread":2,"error":0,"recoil":200}],"radius":4.444}}';
var Arcane_610 = '{"name":"Arcane","level":6,"model":58,"size":1.6,"zoom":0.85,"specs":{"shield":{"capacity":[190,285],"reload":[5,9]},"generator":{"capacity":[105,180],"reload":[49,78]},"ship":{"mass":200,"speed":[125,155],"rotation":[50,75],"acceleration":[80,100]}},"bodies":{"main":{"section_segments":10,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-90,-100,-50,0,30,70,100,90],"z":[0,0,0,0,0,0,0,0]},"width":[0,13,25,25,30,30,20,0],"height":[0,7,12,20,25,20,10,0],"texture":[13,1,10,4,8,4],"propeller":true},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-40,"z":12},"position":{"x":[0,0,0,0,0,0,0],"y":[-40,-30,0,40,60,80],"z":[-1,-1,0,0,0,0]},"width":[0,10,13,14,10,0],"height":[0,6,10,14,15,0],"texture":[4,9,9,4],"propeller":false},"prop":{"section_segments":12,"offset":{"x":25,"y":50,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[10,20,50,45],"z":[0,0,0,0,0,0,0]},"width":[13,13,13,0],"height":[13,13,13,0],"propeller":true,"texture":[4,63,17]},"not_cannons":{"section_segments":12,"offset":{"x":25,"y":50,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-45,-20,10],"z":[0,0,0,0,0,0,0]},"width":[0,10,15,13,13,13,0],"height":[0,10,15,13,13,13,0],"propeller":false,"texture":[12,2,3,4,63,17],"angle":-3,"laser":{"damage":[29,35],"rate":0.75,"type":1,"speed":[130,170],"number":1,"angle":-3,"error":0}},"cannons2":{"section_segments":12,"offset":{"x":0,"y":-50,"z":-18},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-40,-50,-45,-20,10,20,50,65],"z":[0,0,0,0,0,0,0,10]},"width":[0,4,8,10,13,10,10,10],"height":[0,4,8,10,13,10,10,10],"angle":0,"laser":{"damage":[35,46],"rate":1,"type":1,"speed":[130,170],"number":1,"angle":0,"error":0},"propeller":false,"texture":[12,2,3,4,63,13]}},"wings":{"main":{"doubleside":true,"offset":{"x":0,"y":20,"z":9},"length":[30,15,10,30],"width":[40,40,120,120,30],"angle":[-22,-22,-20,-20],"position":[40,20,-20,-20,0],"texture":[18,63,3,4],"bump":{"position":35,"size":7}},"top":{"doubleside":true,"offset":{"x":0,"y":35,"z":-5},"length":[50],"width":[70,30],"angle":[40],"position":[0,30],"texture":[63],"bump":{"position":10,"size":20}}},"typespec":{"name":"Arcane","level":6,"model":58,"code":658,"specs":{"shield":{"capacity":[190,285],"reload":[5,9]},"generator":{"capacity":[105,180],"reload":[49,78]},"ship":{"mass":200,"speed":[125,155],"rotation":[50,75],"acceleration":[80,100]}},"shape":[3.206,3.224,2.721,2.137,1.772,2.491,2.522,2.4,2.319,2.274,2.29,2.358,2.466,2.557,2.62,2.73,2.774,2.674,2.582,2.532,2.491,2.849,3.423,3.364,3.257,3.206,3.257,3.364,3.423,2.849,2.491,2.532,2.582,2.674,2.774,2.73,2.62,2.557,2.466,2.358,2.29,2.274,2.319,2.4,2.522,2.491,1.772,2.137,2.721,3.224],"lasers":[{"x":0.884,"y":0.002,"z":0,"angle":-3,"damage":[29,35],"rate":0.75,"type":1,"speed":[130,170],"number":1,"spread":-3,"error":0,"recoil":0},{"x":-0.884,"y":0.002,"z":0,"angle":3,"damage":[29,35],"rate":0.75,"type":1,"speed":[130,170],"number":1,"spread":-3,"error":0,"recoil":0},{"x":0,"y":-3.2,"z":-0.576,"angle":0,"damage":[35,46],"rate":1,"type":1,"speed":[130,170],"number":1,"spread":0,"error":0,"recoil":0}],"radius":3.423}}';
var Disruptor_611 = '{"name":"Disruptor","level":6,"model":59,"size":1.7,"zoom":0.85,"specs":{"shield":{"capacity":[225,350],"reload":[4,8]},"generator":{"capacity":[90,145],"reload":[46,67]},"ship":{"mass":220,"speed":[100,132],"rotation":[70,85],"acceleration":[90,110]}},"bodies":{"main":{"section_segments":10,"offset":{"x":0,"y":0,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-40,-50,-40,-20,0,30,50,80,70],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,10,18,25,25,26,20,17,0],"height":[0,10,18,20,20,20,20,17,0],"texture":[12,1,2,3,10,4,8,17],"propeller":true},"cockpit":{"section_segments":8,"offset":{"x":0,"y":10,"z":26},"position":{"x":[0,0,0,0,0,0,0],"y":[-40,-30,0,30,40],"z":[0,0,0,0,0]},"width":[0,10,10,10,0],"height":[0,10,15,7,0],"texture":[9,9,4],"propeller":false},"cannons":{"section_segments":12,"offset":{"x":25,"y":20,"z":10},"position":{"x":[0,0,0,0,-5,-10,-10],"y":[-50,-65,-40,0,20,50,45],"z":[0,0,0,0,0,0,0]},"width":[0,5,10,10,15,10,0],"height":[0,5,15,15,15,10,0],"angle":0,"laser":{"damage":[20,30],"rate":3,"type":1,"speed":[170,220],"number":1,"angle":0,"error":0},"propeller":true,"texture":[17,4,3,4,63,4]}},"wings":{"main":{"doubleside":true,"offset":{"x":0,"y":15,"z":10},"length":[20,15,5,20,0,5,0,10,20],"width":[40,40,120,120,80,20,20,80,80,60],"angle":[0,0,0,0,0,0,0,0,0],"position":[20,30,-10,-10,20,30,40,30,40,0],"texture":[4,4,3,63,4,13,4,3,4],"bump":{"position":35,"size":7}}},"typespec":{"name":"Disruptor","level":6,"model":59,"code":659,"specs":{"shield":{"capacity":[225,350],"reload":[4,8]},"generator":{"capacity":[90,145],"reload":[46,67]},"ship":{"mass":220,"speed":[100,132],"rotation":[70,85],"acceleration":[90,110]}},"shape":[1.703,1.73,1.728,1.691,1.812,2.312,2.229,2.098,2.015,1.97,1.973,3.27,3.256,3.256,3.331,3.469,3.592,3.679,3.829,4.062,4.115,2.653,2.527,2.775,2.769,2.725,2.769,2.775,2.527,2.653,4.115,4.062,3.829,3.679,3.592,3.469,3.331,3.256,3.256,3.27,1.973,1.97,2.015,2.098,2.229,2.312,1.812,1.691,1.728,1.73],"lasers":[{"x":0.85,"y":-1.53,"z":0.34,"angle":0,"damage":[20,30],"rate":3,"type":1,"speed":[170,220],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.85,"y":-1.53,"z":0.34,"angle":0,"damage":[20,30],"rate":3,"type":1,"speed":[170,220],"number":1,"spread":0,"error":0,"recoil":0}],"radius":4.115}}';
var Bolt_612 = '{"name":"Bolt","level":6,"model":60,"size":1.45,"zoom":0.85,"specs":{"shield":{"capacity":[180,250],"reload":[6,8]},"generator":{"capacity":[80,130],"reload":[49,70]},"ship":{"mass":200,"speed":[135,160],"rotation":[70,95],"acceleration":[120,180]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":20,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-115,-125,-115,-100,-55,5,40,60,85,95,90],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,8,12,25,35,30,30,25,17.5,0],"height":[0,3,7,10,15,20,20,20,15,10,0],"texture":[6,6,10,4,3,63,4,11,12,17],"propeller":true,"laser":{"damage":[35,46],"rate":2,"speed":[165,210],"number":1,"recoil":10,"type":1}},"cockpit":{"section_segments":12,"offset":{"x":0,"y":-40,"z":6},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-40,-20,10,35,60,120],"z":[0,0,0,3,8,13]},"width":[0,10,17,17,14,0],"height":[0,15,20,20,15,0],"propeller":false,"texture":[9,9,9,10,4]},"cannons":{"section_segments":12,"offset":{"x":20,"y":-34,"z":-2},"position":{"x":[-5,1,3,0,0,0,0,0],"y":[-70,-55,-40,-20,0,20,30,20],"z":[0,0,0,0,0,0,0,0]},"width":[0,4,5,8,8,8,3,0],"height":[0,4,5,7,7,7,3,0],"texture":[6,2,63,4,63,6,12],"angle":0,"laser":{"damage":[6,8],"rate":5,"type":1,"speed":[130,200],"number":1,"error":5}},"propulsors":{"section_segments":10,"offset":{"x":30,"y":20,"z":-17},"position":{"x":[-10,-7.5,-5,-5,-2.5,0,0,0,0,0,0],"y":[-55,-45,-30,0,10,20,25,50,70,80,70],"z":[10,7.5,6,3,0,0,0,0,0,0,0]},"width":[0,5,10,15,15,15,15,20,20,15,0],"height":[0,5,10,15,15,15,15,15,15,10,0],"texture":[63,4,11,4,2,3,63,2,12,16.9],"propeller":true}},"wings":{"main":{"doubleside":true,"offset":{"x":20,"y":40,"z":10},"length":[40,25],"width":[60,40,30],"angle":[-10,-10],"position":[-10,15,20],"texture":[11,63],"bump":{"position":0,"size":5}},"front":{"doubleside":true,"offset":{"x":5,"y":-90,"z":5},"length":[14,11,20],"width":[25,45,45,25,25,25],"angle":[0,0,0,0,0],"position":[10,25,65,35],"texture":[3,63,4],"bump":{"position":0,"size":5}},"winglets":{"doubleside":true,"offset":{"x":0,"y":67,"z":10},"length":[33,30],"width":[35,30,20],"angle":[35,-15],"position":[0,30,10],"texture":[63,8],"bump":{"position":10,"size":5}}},"typespec":{"name":"Bolt","level":6,"model":60,"code":660,"specs":{"shield":{"capacity":[180,250],"reload":[6,8]},"generator":{"capacity":[80,130],"reload":[49,70]},"ship":{"mass":200,"speed":[135,160],"rotation":[70,95],"acceleration":[120,180]}},"shape":[3.048,3.047,2.902,2.485,1.904,2.436,2.271,1.985,1.61,1.31,1.116,1.038,1.046,1.075,1.125,1.201,2.776,3.009,3.266,3.176,3.002,3.109,3.22,3.341,3.373,3.341,3.373,3.341,3.22,3.109,3.002,3.176,3.266,3.009,2.776,1.201,1.125,1.075,1.046,1.038,1.116,1.31,1.61,1.985,2.271,2.436,1.904,2.485,2.902,3.047],"lasers":[{"x":0,"y":-3.045,"z":0,"angle":0,"damage":[35,46],"rate":2,"type":1,"speed":[165,210],"number":1,"spread":0,"error":0,"recoil":10},{"x":0.435,"y":-3.016,"z":-0.058,"angle":0,"damage":[6,8],"rate":5,"type":1,"speed":[130,200],"number":1,"spread":0,"error":5,"recoil":0},{"x":-0.435,"y":-3.016,"z":-0.058,"angle":0,"damage":[6,8],"rate":5,"type":1,"speed":[130,200],"number":1,"spread":0,"error":5,"recoil":0}],"radius":3.373}}';
var Hallier_613 = '{"name":"Hallier","level":6,"model":61,"size":1.5,"zoom":0.85,"specs":{"shield":{"capacity":[215,295],"reload":[7,10]},"generator":{"capacity":[130,180],"reload":[53,79]},"ship":{"mass":220,"speed":[115,143],"rotation":[70,85],"acceleration":[90,110]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-115,-110,-100,-50,0,30,70,80,80],"z":[0,0,0,0,0,0,0,5,10]},"width":[0,8,14,25,25,30,30,20,0],"height":[0,7,10,20,20,24,24,20,0],"texture":[3,4,2,4,11,2,3,17],"propeller":true},"intake":{"section_segments":12,"offset":{"x":25,"y":-10,"z":7},"position":{"x":[-3,-3,-10,0,-3,4,10,10,10,10],"y":[-10,-20,25,35,60,70,85,100,85],"z":[0,-6,0,0,0,0,0,0,0,0]},"width":[0,5,20,20,25,20,10,5,0],"height":[0,10,10,10,10,10,10,5,0],"texture":[13,4,63,18,2,3,4,17]},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-50,"z":12},"position":{"x":[0,0,0,0,0,0,0],"y":[-45,-40,0,30,70],"z":[-5,-5,0,0,-7]},"width":[0,12,15,15,15],"height":[0,10,15,15,15],"texture":[4,8.978,8.978,4],"propeller":false},"cannons":{"section_segments":12,"offset":{"x":22,"y":-60,"z":-5},"position":{"x":[0,0,0,0,0,-8,-8],"y":[-50,-45,-20,0,20,70,54],"z":[0,0,0,0,0,0,0]},"width":[0,3,5,10,10,10,0],"height":[0,3,5,10,10,5,0],"angle":0,"laser":{"damage":[12,18],"rate":2.5,"type":1,"speed":[140,180],"number":1,"angle":0,"error":0},"propeller":false,"texture":[6,4,10,4,63,4]},"cannons2":{"section_segments":12,"offset":{"x":55,"y":25,"z":-6},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-45,-20,0,20,50,54],"z":[0,0,0,0,2,2,0]},"width":[0,3,5,8,8,8,0],"height":[0,3,5,5,5,5,0],"angle":0,"laser":{"damage":[6,8.5],"rate":5,"type":1,"speed":[160,195],"number":1,"angle":0,"error":0},"propeller":false,"texture":[6,3,3,4,4,4]},"top_propulsor":{"section_segments":10,"offset":{"x":20,"y":48,"z":20},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-25,-24,-18,-15,0,10,20,25,30,40,50,60,45],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,4,10,11,13,13,13,13,13,13,8,8,0],"height":[0,4,10,11,13,13,13,13,13,13,8,8,0],"texture":[3,4,4,63,4,3,12,63,4,3,4,17],"propeller":true}},"wings":{"main":{"doubleside":1,"offset":{"x":0,"y":60,"z":0},"length":[60,0,40],"width":[70,50,90,50],"texture":[18,63,63],"angle":[0,0,0],"position":[-50,-30,-30,0],"bump":{"position":10,"size":15}},"winglets":{"length":[10,20],"width":[50,50,40],"angle":[20,20],"position":[80,80,100],"texture":[4,63],"bump":{"position":10,"size":10},"offset":{"x":25,"y":-20,"z":25}},"winglets2":{"length":[20,10],"width":[30,30,20],"angle":[-20,-20],"position":[90,100,110],"texture":[63],"bump":{"position":10,"size":10},"offset":{"x":10,"y":-140,"z":0}}},"typespec":{"name":"Hallier","level":6,"model":61,"code":661,"specs":{"shield":{"capacity":[215,295],"reload":[7,10]},"generator":{"capacity":[130,180],"reload":[53,79]},"ship":{"mass":220,"speed":[115,143],"rotation":[70,85],"acceleration":[90,110]}},"shape":[3.45,3.325,3.365,2.595,2.162,1.791,1.693,1.57,1.414,1.825,1.841,1.973,2.148,2.419,2.798,3.226,3.417,3.705,3.937,3.576,2.973,3.391,3.051,3.344,3.298,2.405,3.298,3.344,3.051,3.391,2.973,3.576,3.937,3.705,3.417,3.226,2.798,2.419,2.16,1.973,1.841,1.825,1.414,1.57,1.693,1.791,2.162,2.595,3.365,3.325],"lasers":[{"x":0.66,"y":-3.3,"z":-0.15,"angle":0,"damage":[12,18],"rate":2.5,"type":1,"speed":[140,180],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.66,"y":-3.3,"z":-0.15,"angle":0,"damage":[12,18],"rate":2.5,"type":1,"speed":[140,180],"number":1,"spread":0,"error":0,"recoil":0},{"x":1.65,"y":-0.75,"z":-0.18,"angle":0,"damage":[6,8.5],"rate":5,"type":1,"speed":[160,195],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.65,"y":-0.75,"z":-0.18,"angle":0,"damage":[6,8.5],"rate":5,"type":1,"speed":[160,195],"number":1,"spread":0,"error":0,"recoil":0}],"radius":3.937}}';
var Topaz_614 = '{"name":"Topaz","level":6,"model":62,"size":1.8,"zoom":0.85,"specs":{"shield":{"capacity":[200,300],"reload":[5,8]},"generator":{"capacity":[80,130],"reload":[63,99]},"ship":{"mass":220,"speed":[105,140],"rotation":[90,170],"acceleration":[90,110]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":15,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-80,-70,-50,-30,0,15,40,60,50],"z":[0,0,0,0,0,0,0,0]},"width":[0,11,16,21,31,23,20,19,0],"height":[0,6,8,12,16,10,10,10,0],"texture":[4,1,3,10,63,13,8,17],"propeller":true},"cockpit":{"section_segments":8,"offset":{"x":0,"y":15,"z":8},"position":{"x":[0,0,0,0,0,0],"y":[-65,-55,-40,-20,0,10],"z":[-3,-2,0,0,0,0]},"width":[0,5,8,12,10,0],"height":[0,6,9,14,10,0],"texture":[9,9,9,1],"propeller":false},"side_propulsors":{"section_segments":8,"offset":{"x":58,"y":35,"z":30},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-40,-30,-10,5,13,30,50,40],"z":[0,0,0,0,0,0,0,0]},"width":[0,8,14,8,15,12,12,0],"height":[0,8,10,5,12,10,8,0],"texture":[4,10,3,4,63,8,17],"propeller":1},"side_propulsors2":{"section_segments":8,"offset":{"x":0,"y":35,"z":-50},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-40,-30,-10,5,13,30,50,40],"z":[0,0,0,0,0,0,0,0]},"width":[0,8,16,8,15,12,9,0],"height":[0,8,10,5,12,10,8,0],"texture":[4,10,3,4,63,8,17],"propeller":1},"cannon":{"section_segments":8,"offset":{"x":0,"y":-5,"z":-20},"position":{"x":[0,0,0,0,0],"y":[-50,-40,-10,10,30],"z":[0,0,0,0,0]},"width":[0,8,12,10,0],"height":[0,5,8,5,0],"angle":0,"laser":{"damage":[5,8],"rate":5,"type":1,"speed":[140,190],"number":4,"error":0,"angle":10},"propeller":false,"texture":[6,63,4,3]},"cannon2":{"section_segments":8,"offset":{"x":35,"y":50,"z":-5},"position":{"x":[0,0,0,0,0],"y":[-50,-40,-10,10,15],"z":[0,0,0,0,0]},"width":[0,8,12,10,0],"height":[0,5,8,5,0],"angle":0,"laser":{"damage":[5,8],"rate":5,"type":1,"speed":[140,190],"number":4,"error":0,"angle":12},"propeller":false,"texture":[6,63,4,3]}},"wings":{"main":{"offset":{"x":0,"y":-25,"z":0},"length":[30,8,20],"width":[50,25,50,20],"angle":[-50,-30,0,0],"position":[20,-15,-15,-40],"texture":[1,4,8],"doubleside":true,"bump":{"position":0,"size":10}},"top":{"offset":{"x":0,"y":15,"z":0},"length":[80],"width":[70,30],"angle":[90,0],"position":[10,40],"texture":[63],"doubleside":true,"bump":{"position":0,"size":15}},"bot":{"offset":{"x":0,"y":15,"z":0},"length":[80],"width":[70,30],"angle":[-90,0],"position":[10,40],"texture":[63],"doubleside":true,"bump":{"position":0,"size":15}},"sidestop":{"offset":{"x":0,"y":15,"z":-6},"length":[100],"width":[50,20],"angle":[28,0],"position":[10,45],"texture":[63],"doubleside":true,"bump":{"position":0,"size":15}},"sidesbot":{"offset":{"x":0,"y":15,"z":0},"length":[110],"width":[60,20],"angle":[-25,0],"position":[10,45],"texture":[63],"doubleside":true,"bump":{"position":0,"size":15}},"winglets":{"offset":{"x":6,"y":-32,"z":-3},"length":[30],"width":[40,10],"angle":[-5,0],"position":[-5,20],"texture":[63],"doubleside":true,"bump":{"position":0,"size":15}}},"typespec":{"name":"Topaz","level":6,"model":62,"code":662,"specs":{"shield":{"capacity":[200,300],"reload":[5,8]},"generator":{"capacity":[80,130],"reload":[63,99]},"ship":{"mass":220,"speed":[105,140],"rotation":[90,170],"acceleration":[90,110]}},"shape":[2.34,2.215,2.028,2.696,3.171,3.104,2.608,1.737,1.414,1.43,1.389,1.334,2.229,2.432,2.595,2.744,4.095,4.385,4.224,3.953,3.964,3.624,2.47,2.785,3.077,3.066,3.077,2.785,2.47,3.624,3.964,3.953,4.224,4.385,4.095,2.744,2.595,2.432,2.232,1.334,1.389,1.43,1.414,1.737,2.608,3.104,3.171,2.696,2.028,2.215],"lasers":[{"x":0,"y":-1.98,"z":-0.72,"angle":0,"damage":[5,8],"rate":5,"type":1,"speed":[140,190],"number":4,"spread":10,"error":0,"recoil":0},{"x":1.26,"y":0,"z":-0.18,"angle":0,"damage":[5,8],"rate":5,"type":1,"speed":[140,190],"number":4,"spread":12,"error":0,"recoil":0},{"x":-1.26,"y":0,"z":-0.18,"angle":0,"damage":[5,8],"rate":5,"type":1,"speed":[140,190],"number":4,"spread":12,"error":0,"recoil":0}],"radius":4.385}}';
var Contraband_615 = '{"name":"Contraband","level":6,"model":63,"size":1.6,"zoom":0.9,"specs":{"shield":{"capacity":[190,275],"reload":[4,7]},"generator":{"capacity":[120,175],"reload":[28,40]},"ship":{"mass":200,"speed":[100,145],"rotation":[60,80],"acceleration":[90,140]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-75,-80,-20,0,15,20,60,65,80,100,90],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,8,24,26,20,20,20,20,25,12,0],"height":[0,5,25,25,20,15,15,15,20,10,0],"texture":[1,2,4,63,5,10,5,63,4,17],"propeller":true,"laser":{"damage":[80,123],"rate":1,"type":2,"speed":[110,150],"recoil":250,"number":1,"error":0}},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-55,"z":15},"position":{"x":[0,0,0,0,0,0,0],"y":[-10,0,20,40,50],"z":[-7,-5,0,0,0]},"width":[0,5,10,10,0],"height":[0,10,15,12,0],"texture":[9]},"side_propulsors":{"section_segments":8,"offset":{"x":35,"y":25,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-20,-15,-4,6,15,20,35,40,50,85,75],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,15,20,20,20,15,15,18,18,10,0],"height":[0,15,20,20,20,15,15,18,16,10,0],"propeller":true,"texture":[4,4,63,3,5,8,5,63,4,17]},"cannons":{"section_segments":12,"offset":{"x":18,"y":65,"z":20},"position":{"x":[0,0,0,0,0],"y":[-50,-45,-20,-5,5],"z":[0,0,0,0,0]},"width":[0,5,7,8,0],"height":[0,5,7,8,0],"angle":0,"laser":{"damage":[3,6],"rate":4,"type":1,"speed":[150,200],"number":1,"error":0},"propeller":false,"texture":[6,4,63,4,63,4]}},"wings":{"join":{"offset":{"x":0,"y":20,"z":0},"length":[37,0],"width":[20,70],"angle":[0],"position":[-95,0],"texture":[63],"doubleside":true,"bump":{"position":0,"size":0}},"join2":{"offset":{"x":25,"y":52,"z":0},"length":[35],"width":[10,10],"angle":[0],"position":[0,0,0,50],"texture":[8],"doubleside":1,"bump":{"position":0,"size":0}},"wing1":{"doubleside":true,"offset":{"x":50,"y":52,"z":-36},"length":[0,30,20,30],"width":[0,0,100,100,0],"angle":[110,70,90,110],"position":[0,0,0,0,0],"texture":[63],"bump":{"position":0,"size":5}}},"typespec":{"name":"Contraband","level":6,"model":63,"code":663,"specs":{"shield":{"capacity":[190,275],"reload":[4,7]},"generator":{"capacity":[120,175],"reload":[28,40]},"ship":{"mass":200,"speed":[100,145],"rotation":[60,80],"acceleration":[90,140]}},"shape":[2.72,2.573,2.079,1.758,1.578,1.455,1.368,1.312,1.283,1.278,1.269,1.222,1.193,1.961,2.033,2.148,2.313,2.561,2.818,3.145,3.625,3.791,3.803,3.701,3.223,3.206,3.223,3.701,3.803,3.791,3.625,3.145,2.818,2.561,2.313,2.148,2.033,1.961,1.193,1.222,1.269,1.278,1.283,1.312,1.368,1.455,1.578,1.758,2.079,2.573],"lasers":[{"x":0,"y":-2.56,"z":0,"angle":0,"damage":[80,123],"rate":1,"type":2,"speed":[110,150],"number":1,"spread":0,"error":0,"recoil":250},{"x":0.576,"y":0.48,"z":0.64,"angle":0,"damage":[3,6],"rate":4,"type":1,"speed":[150,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.576,"y":0.48,"z":0.64,"angle":0,"damage":[3,6],"rate":4,"type":1,"speed":[150,200],"number":1,"spread":0,"error":0,"recoil":0}],"radius":3.803}}';
var Battalion_616 = '{"name":"Battalion","level":6,"model":64,"size":3.6,"zoom":0.85,"specs":{"shield":{"capacity":[200,270],"reload":[5,9]},"generator":{"capacity":[130,200],"reload":[58,76]},"ship":{"mass":195,"speed":[140,170],"rotation":[60,75],"acceleration":[80,120]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":6,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-60,-52,-35,-9,11,20,34,53,40],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,7,11,13,10,8,11,8,0],"height":[0,4,7,10,13,6,6,6,0],"texture":[4,63,10,4,3,63,13,17],"propeller":true},"cockpit":{"section_segments":8,"offset":{"x":0,"y":6,"z":3},"position":{"x":[0,0,0,0,0],"y":[-50,-40,-25,-7,15],"z":[0,0,0,3,7]},"width":[0,3.5,5,5,0],"height":[0,6,10,13,0],"texture":[7,9,9,4],"propeller":false},"side_propulsors":{"section_segments":12,"offset":{"x":10,"y":51,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-70,-64,-58,-50,-35,-15,-26],"z":[0,0,0,0,0,0,0,0]},"width":[0,4,7,3,10,8,0],"height":[0,2,5,2,7,5,0],"texture":[4,2,10,4,10,17],"propeller":1},"cannons_center":{"section_segments":8,"offset":{"x":10,"y":1,"z":-23},"position":{"x":[0,0,0,0,0],"y":[-50,-42,-25,-10,-4],"z":[0,0,0,0,0]},"width":[0,4.5,6,4,0],"height":[0,4.5,7,5,0],"angle":0,"laser":{"damage":[4,6],"rate":5,"type":1,"speed":[180,230],"number":1,"error":0},"propeller":false,"texture":[6,8,2,4]},"cannons_secondary":{"section_segments":8,"offset":{"x":25,"y":22,"z":-10},"position":{"x":[0,0,0,0,0],"y":[-50,-42,-25,-10,-4],"z":[0,0,0,0,0]},"width":[0,4.5,6,4,0],"height":[0,4.5,7,5,0],"angle":0,"laser":{"damage":[4,6],"rate":5,"type":1,"speed":[180,230],"number":1,"error":0,"angle":-15},"propeller":false,"texture":[6,3,2,4]},"cannons_thirdary":{"section_segments":8,"offset":{"x":17,"y":32,"z":0},"position":{"x":[0,0,-1,-10,-10],"y":[-50,-42,-25,-10,-4],"z":[0,0,0,0,0]},"width":[0,4.5,6,4,0],"height":[0,4.5,7,5,0],"angle":0,"laser":{"damage":[4,6],"rate":5,"type":1,"speed":[180,230],"number":1,"error":0,"angle":-15},"propeller":false,"texture":[6,3,2,4]}},"wings":{"main":{"offset":{"x":-10,"y":-29,"z":-2},"length":[17,40],"width":[20,30,9],"angle":[0,-20,0],"position":[60,43,0],"texture":[3,63],"doubleside":true,"bump":{"position":10,"size":11}},"connect":{"offset":{"x":0,"y":6,"z":0},"length":[30],"width":[20,20],"angle":[-60,0],"position":[0,-40],"texture":[4],"doubleside":true,"bump":{"position":0,"size":15}},"winglets":{"offset":{"x":6,"y":32,"z":0},"length":[13],"width":[20,6],"angle":[20,0],"position":[0,10],"texture":[63],"doubleside":true,"bump":{"position":0,"size":15}}},"typespec":{"name":"Battalion","level":6,"model":64,"code":664,"specs":{"shield":{"capacity":[200,270],"reload":[5,9]},"generator":{"capacity":[130,200],"reload":[58,76]},"ship":{"mass":195,"speed":[140,170],"rotation":[60,75],"acceleration":[80,120]}},"shape":[3.888,3.63,3.601,3.347,2.574,2.135,2.703,4.015,3.965,3.663,2.926,2.474,2.244,2.203,2.199,2.249,2.26,2.224,1.944,2.172,2.507,2.898,3.495,3.629,4.287,4.256,4.287,3.629,3.495,2.898,2.507,2.172,1.944,2.224,2.26,2.249,2.199,2.202,2.244,2.474,2.926,3.663,3.965,4.015,2.703,2.135,2.574,3.347,3.601,3.63],"lasers":[{"x":0.72,"y":-3.528,"z":-1.656,"angle":0,"damage":[4,6],"rate":5,"type":1,"speed":[180,230],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.72,"y":-3.528,"z":-1.656,"angle":0,"damage":[4,6],"rate":5,"type":1,"speed":[180,230],"number":1,"spread":0,"error":0,"recoil":0},{"x":1.8,"y":-2.016,"z":-0.72,"angle":0,"damage":[4,6],"rate":5,"type":1,"speed":[180,230],"number":1,"spread":-15,"error":0,"recoil":0},{"x":-1.8,"y":-2.016,"z":-0.72,"angle":0,"damage":[4,6],"rate":5,"type":1,"speed":[180,230],"number":1,"spread":-15,"error":0,"recoil":0},{"x":1.224,"y":-1.296,"z":0,"angle":0,"damage":[4,6],"rate":5,"type":1,"speed":[180,230],"number":1,"spread":-15,"error":0,"recoil":0},{"x":-1.224,"y":-1.296,"z":0,"angle":0,"damage":[4,6],"rate":5,"type":1,"speed":[180,230],"number":1,"spread":-15,"error":0,"recoil":0}],"radius":4.287}}';
var Calamity_617 = '{"name":"Calamity","level":6,"model":65,"size":1.65,"zoom":0.85,"specs":{"shield":{"capacity":[250,350],"reload":[7,10]},"generator":{"capacity":[100,180],"reload":[49,72]},"ship":{"mass":225,"speed":[108,128],"rotation":[70,100],"acceleration":[100,120]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":-15,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-60,-65,-55,-36,3,30,35,60,90,80],"z":[-7,-7,-7,-5,0,0,0,0,0,0]},"width":[0,11,19,26,30,28,22,22,16,0],"height":[0,7,12,17,18,20,20,20,16,0],"propeller":true,"texture":[12,63,2,3,4,63,8,12,17]},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-55,"z":20},"position":{"x":[0,0,0,0,0,0,0],"y":[-10,0,20,60,90],"z":[-5,-3,0,0,4]},"width":[0,10,14,12,5],"height":[0,10,14,14,5],"propeller":false,"texture":[4,9,9,4,4]},"cannon":{"section_segments":9,"offset":{"x":43,"y":20,"z":22},"position":{"x":[0,0,0,0,0,0,0],"y":[0,-10,0,-5,0,45,50],"z":[0,0,0,0,0,0,0]},"width":[0,8,12,19,22,22,0],"height":[0,8,12,19,24,24,0],"angle":0,"texture":[16.9,3,4,63,3.9,8],"laser":{"damage":[29,46],"rate":1,"type":1,"speed":[160,200],"number":1,"error":0},"propeller":false},"cannon2":{"section_segments":8,"offset":{"x":20,"y":-30,"z":-4},"position":{"x":[0,0,0,0,0,0],"y":[-55,-50,-30,0,45,55],"z":[0,0,0,0,0,0]},"width":[0,3,6,11,10,8],"height":[0,3,6,11,11,9],"angle":0,"laser":{"damage":[5,8],"rate":8,"type":1,"speed":[110,140],"number":1,"error":2.5},"propeller":false,"texture":[6,2,4,63,4]},"Propellers":{"section_segments":12,"offset":{"x":40,"y":15,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-62,-55,-57,-60,-25,-20,0,10,20,30,40,50,80,70],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,4,8,12,24,25,27,27,21,21,27,27,18,0],"height":[0,4,6,9,21,22,24,24,18,18,24,24,13,0],"texture":[6,13,4,11,4,63,4,3,63,3,4,8,17],"propeller":true}},"wings":{"main":{"length":[40],"width":[45,20],"angle":[30],"position":[0,10],"doubleside":true,"offset":{"x":45,"y":40,"z":6},"bump":{"position":20,"size":25},"texture":[63]}},"typespec":{"name":"Calamity","level":6,"model":65,"code":665,"specs":{"shield":{"capacity":[250,350],"reload":[7,10]},"generator":{"capacity":[100,180],"reload":[49,72]},"ship":{"mass":225,"speed":[108,128],"rotation":[70,100],"acceleration":[100,120]}},"shape":[2.645,2.665,2.882,2.554,2.058,1.926,2.169,2.269,2.2,2.135,2.111,2.141,2.161,2.205,2.283,2.36,2.996,3.247,3.291,3.286,3.612,3.673,3.464,3.296,2.52,2.48,2.52,3.296,3.464,3.673,3.612,3.286,3.291,3.247,2.996,2.36,2.283,2.205,2.161,2.141,2.111,2.135,2.2,2.269,2.169,1.926,2.058,2.554,2.882,2.665],"lasers":[{"x":1.419,"y":0.33,"z":0.726,"angle":0,"damage":[29,46],"rate":1,"type":1,"speed":[160,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.419,"y":0.33,"z":0.726,"angle":0,"damage":[29,46],"rate":1,"type":1,"speed":[160,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.66,"y":-2.805,"z":-0.132,"angle":0,"damage":[5,8],"rate":8,"type":1,"speed":[110,140],"number":1,"spread":0,"error":2.5,"recoil":0},{"x":-0.66,"y":-2.805,"z":-0.132,"angle":0,"damage":[5,8],"rate":8,"type":1,"speed":[110,140],"number":1,"spread":0,"error":2.5,"recoil":0}],"radius":3.673}}';
var Armada_618 = '{"name":"Armada","level":6,"model":66,"size":1.55,"zoom":0.85,"specs":{"shield":{"capacity":[190,285],"reload":[6,9.5]},"generator":{"capacity":[110,160],"reload":[56,72]},"ship":{"mass":240,"speed":[130,155],"rotation":[50,75],"acceleration":[100,155]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":-50,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-81,-80,-60,-30,0,40,50,90,140,150,145],"z":[-5,-5,-4,-5,-5,-5,-5,0,0,0,0]},"width":[0,5,13,16,16,25,25,40,25,20,0],"height":[0,2,10,20,20,20,23,25,17,10,0],"texture":[63,2,3,10,63,4,3,63,4,17],"propeller":true},"suck":{"section_segments":12,"offset":{"x":13,"y":80,"z":9},"position":{"x":[-10,0,0],"y":[-165,-90,-30],"z":[-10,0,0]},"width":[0,15,15],"height":[0,10,9],"texture":[2,4,2]},"suck2":{"section_segments":8,"offset":{"x":13,"y":80,"z":-10},"position":{"x":[-10,5,0],"y":[-165,-90,-40],"z":[10,0,0]},"width":[0,15,18],"height":[0,10,9],"texture":[63,4,2]},"top":{"section_segments":12,"offset":{"x":0,"y":120,"z":23},"position":{"x":[0,0,0,0,0],"y":[-125,-105,-80,-40,-25],"z":[2,-4,-5,-7,-12]},"width":[0,11,15,12,0],"height":[0,11,10,9,0],"texture":[4,2,10,63]},"cockpit":{"section_segments":10,"offset":{"x":0,"y":-15,"z":12},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-20,10,30,60],"z":[0,0,0,2,5,0,0]},"width":[0,10,13,15,9],"height":[0,10,14,12,0],"propeller":false,"texture":[9,9,2,2]},"propeller":{"section_segments":8,"offset":{"x":40,"y":50,"z":0},"position":{"x":[-15,-10,-5,0,0,0,0],"y":[-36,-20,0,20,55,70,65],"z":[0,0,0,0,0,0,0]},"width":[5,10,17,20,17,13,0],"height":[5,20,20,20,17,13,0],"texture":[4,63,2,4,12,17],"propeller":true},"cannon":{"section_segments":8,"offset":{"x":0,"y":-70,"z":-20},"position":{"x":[0,0,0,0,0,0],"y":[-40,-50,-45,0,20,80],"z":[0,0,0,2,2,0]},"width":[0,7.5,10,10,10,0],"height":[0,7.5,10,10,10,0],"angle":0,"laser":{"damage":[10,17],"rate":2.5,"type":1,"speed":[130,190],"number":1,"error":0},"propeller":false,"texture":[17,12,4,3]},"angled_cannons_1":{"section_segments":8,"offset":{"x":20,"y":0,"z":-15},"position":{"x":[0,0,0,0,0,0],"y":[-45,-50,-45,0,0,0],"z":[0,0,0,2,2,0]},"width":[0,3,5,5,5,0],"height":[0,3,5,5,5,0],"angle":-5,"laser":{"damage":[6,10],"rate":3,"type":1,"speed":[130,180],"number":1,"error":0},"propeller":false,"texture":[6,6,4,3]},"angled_cannons_2":{"section_segments":8,"offset":{"x":30,"y":20,"z":-15},"position":{"x":[0,0,0,0,0,0],"y":[-45,-50,-45,20,20,30],"z":[0,0,0,2,2,0]},"width":[0,3,5,5,5,0],"height":[0,3,5,5,5,0],"angle":-5,"laser":{"damage":[6,10],"rate":3,"type":1,"speed":[130,180],"number":1,"error":0},"propeller":false,"texture":[6,6,4,3]}},"wings":{"wing":{"offset":{"x":15,"y":-50,"z":-1},"length":[30,9],"width":[100,60,20],"angle":[0,0],"position":[50,80,75],"texture":[2,2],"doubleside":true,"bump":{"position":0,"size":10}},"back":{"doubleside":true,"offset":{"x":10,"y":50,"z":0},"length":[50],"width":[60,20],"angle":[50],"position":[-20,50],"texture":[3],"bump":{"position":10,"size":20}},"wong":{"doubleside":true,"offset":{"x":0,"y":-135,"z":-5},"length":[40],"width":[60,20,10],"angle":[0,20],"position":[40,90,85],"texture":[4],"bump":{"position":0,"size":10}}},"typespec":{"name":"Armada","level":6,"model":66,"code":666,"specs":{"shield":{"capacity":[190,285],"reload":[6,9.5]},"generator":{"capacity":[110,160],"reload":[56,72]},"ship":{"mass":240,"speed":[130,155],"rotation":[50,75],"acceleration":[100,155]}},"shape":[4.061,3.821,2.952,2.593,2.343,2.174,1.942,1.698,1.454,1.365,1.264,1.304,1.386,1.521,1.702,1.798,1.909,2.022,2.139,2.904,3.357,3.948,4.067,3.911,3.156,3.106,3.156,3.911,4.067,3.948,3.357,2.904,2.139,2.022,1.909,1.798,1.702,1.521,1.395,1.304,1.264,1.365,1.454,1.698,1.942,2.174,2.343,2.593,2.952,3.821],"lasers":[{"x":0,"y":-3.72,"z":-0.62,"angle":0,"damage":[10,17],"rate":2.5,"type":1,"speed":[130,190],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.755,"y":-1.544,"z":-0.465,"angle":-5,"damage":[6,10],"rate":3,"type":1,"speed":[130,180],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.755,"y":-1.544,"z":-0.465,"angle":5,"damage":[6,10],"rate":3,"type":1,"speed":[130,180],"number":1,"spread":0,"error":0,"recoil":0},{"x":1.065,"y":-0.924,"z":-0.465,"angle":-5,"damage":[6,10],"rate":3,"type":1,"speed":[130,180],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.065,"y":-0.924,"z":-0.465,"angle":5,"damage":[6,10],"rate":3,"type":1,"speed":[130,180],"number":1,"spread":0,"error":0,"recoil":0}],"radius":4.067}}';
var A_Speedster_619 = '{"name":"A-Speedster","level":6,"model":67,"size":1.55,"zoom":0.9,"specs":{"shield":{"capacity":[200,295],"reload":[6,8]},"generator":{"capacity":[90,150],"reload":[38,62]},"ship":{"mass":210,"speed":[95,135],"rotation":[60,80],"acceleration":[90,140]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-100,-95,0,0,70,65],"z":[0,0,0,0,0,0]},"width":[0,10,40,20,20,0],"height":[0,5,30,30,15,0],"texture":[6,11,5,63,12],"propeller":true,"laser":{"damage":[58,95],"rate":1,"type":2,"speed":[175,220],"recoil":50,"number":1,"error":0}},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-60,"z":15},"position":{"x":[0,0,0,0,0,0,0],"y":[-20,0,20,40,50],"z":[-7,-5,0,0,0]},"width":[0,10,10,10,0],"height":[0,10,15,12,0],"texture":[9]},"side_propulsors":{"section_segments":10,"offset":{"x":50,"y":25,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-20,-15,0,10,20,25,30,40,80,70],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,15,20,20,20,15,15,20,10,0],"height":[0,15,20,20,20,15,15,20,10,0],"propeller":true,"texture":[4,4,2,2,5,63,5,4,12]},"cannons":{"section_segments":12,"offset":{"x":30,"y":40,"z":45},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-45,-20,0,20,30,40],"z":[0,0,0,0,0,0,0]},"width":[0,5,7,10,3,5,0],"height":[0,5,7,8,3,5,0],"angle":-10,"laser":{"damage":[9,12],"rate":2,"type":1,"speed":[100,130],"number":1,"angle":-10,"error":0},"propeller":false,"texture":[6,4,10,4,63,4]}},"wings":{"join":{"offset":{"x":0,"y":0,"z":10},"length":[40,0],"width":[10,20],"angle":[-1],"position":[0,30],"texture":[63],"bump":{"position":0,"size":25}},"winglets":{"offset":{"x":0,"y":-40,"z":10},"doubleside":true,"length":[45,10],"width":[5,20,30],"angle":[50,-10],"position":[90,80,50],"texture":[4],"bump":{"position":10,"size":30}}},"typespec":{"name":"A-Speedster","level":6,"model":67,"code":667,"specs":{"shield":{"capacity":[200,295],"reload":[6,8]},"generator":{"capacity":[90,150],"reload":[38,62]},"ship":{"mass":210,"speed":[95,135],"rotation":[60,80],"acceleration":[90,140]}},"shape":[3.1,3.011,2.489,2.017,1.73,1.539,1.394,1.305,1.238,1.202,1.184,1.296,1.329,1.745,2.128,2.301,2.441,2.554,2.926,3.185,3.55,3.741,3.597,2.563,2.209,2.174,2.209,2.563,3.597,3.741,3.55,3.185,2.926,2.554,2.441,2.301,2.128,1.745,1.329,1.296,1.184,1.202,1.238,1.305,1.394,1.539,1.73,2.017,2.489,3.011],"lasers":[{"x":0,"y":-3.1,"z":0,"angle":0,"damage":[58,95],"rate":1,"type":2,"speed":[175,220],"number":1,"spread":0,"error":0,"recoil":50},{"x":1.199,"y":-0.286,"z":1.395,"angle":-10,"damage":[9,12],"rate":2,"type":1,"speed":[100,130],"number":1,"spread":-10,"error":0,"recoil":0},{"x":-1.199,"y":-0.286,"z":1.395,"angle":10,"damage":[9,12],"rate":2,"type":1,"speed":[100,130],"number":1,"spread":-10,"error":0,"recoil":0}],"radius":3.741}}';
var Eagle_620 = '{"name":"Eagle","level":6,"model":68,"size":1.75,"zoom":0.85,"specs":{"shield":{"capacity":[210,330],"reload":[5,8]},"generator":{"capacity":[140,220],"reload":[57,88]},"ship":{"mass":220,"speed":[115,135],"rotation":[50,75],"acceleration":[140,160]}},"bodies":{"main":{"section_segments":10,"offset":{"x":0,"y":50,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-150,-125,-100,-45,-20,13,25,41,25],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,14,16,22,21,15,15,8,0],"height":[0,10,16,21,20,15,10,10,0],"texture":[3,63,10,3,4,63,13,17],"propeller":true},"cockpit":{"section_segments":6,"offset":{"x":0,"y":-20,"z":28},"position":{"x":[0,0,0,0,0,0,0],"y":[-30,-20,0,18,30],"z":[-3,-4,-3,-2,1]},"width":[0,6,8,7,0],"height":[0,4,6,8,0],"texture":[4,9,9,3,3]},"cannon1":{"section_segments":8,"offset":{"x":18,"y":-40,"z":4},"position":{"x":[0,0,0,0,0,0,0],"y":[-28,-30,10,35,45],"z":[0,0,0,0,0]},"width":[0,5.5,5.5,6.5,0],"height":[0,4,4,5,0],"texture":[17,13,4,63,63],"laser":{"damage":[2.5,3.5],"rate":10,"type":1,"speed":[130,170],"number":1}},"Wing_Cannon":{"section_segments":10,"offset":{"x":39,"y":-5,"z":17},"position":{"x":[-8,-8,0,-1,-1,-1,0],"y":[-18,-25,10,40,50,60,56,60],"z":[0,0,0,0,0,0,0]},"width":[0,4,6,6,6,4,0],"height":[0,3,4,4,4,4,0],"texture":[17,8,10,4,13,63,17],"propeller":true,"laser":{"damage":[2.5,3.5],"rate":10,"type":1,"speed":[130,170],"number":1,"angle":7}}},"wings":{"main":{"doubleside":true,"offset":{"x":13.4,"y":15,"z":10},"length":[13,24,0,15],"width":[140,80,80,90,0],"angle":[-22,-20,15,15],"position":[-21,-5,22,18,10],"texture":[63,3.7,13,63],"bump":{"position":33,"size":5}},"sides":{"doubleside":true,"offset":{"x":19,"y":40,"z":10},"length":[0,20,10,0,0,0],"width":[0,70,60,0,0,0],"angle":[0,0,45,0,0],"position":[0,-60,-30,0,0,0],"texture":[0,3,63,1,11],"bump":{"position":35,"size":15}}},"typespec":{"name":"Eagle","level":6,"model":68,"code":668,"specs":{"shield":{"capacity":[210,330],"reload":[5,8]},"generator":{"capacity":[140,220],"reload":[57,88]},"ship":{"mass":220,"speed":[115,135],"rotation":[50,75],"acceleration":[140,160]}},"shape":[3.5,3.13,2.611,2.584,1.921,1.731,1.633,1.608,1.55,1.534,1.5,1.771,1.842,1.954,2.117,2.346,2.406,2.502,2.644,2.854,3.154,3.206,2.124,2.664,3.196,3.191,3.196,2.664,2.124,3.206,3.154,2.854,2.644,2.502,2.406,2.346,2.117,1.954,1.842,1.771,1.5,1.534,1.55,1.608,1.633,1.731,1.921,2.584,2.611,3.13],"lasers":[{"x":0.63,"y":-2.45,"z":0.14,"angle":0,"damage":[2.5,3.5],"rate":10,"type":1,"speed":[130,170],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.63,"y":-2.45,"z":0.14,"angle":0,"damage":[2.5,3.5],"rate":10,"type":1,"speed":[130,170],"number":1,"spread":0,"error":0,"recoil":0},{"x":1.085,"y":-1.05,"z":0.595,"angle":0,"damage":[2.5,3.5],"rate":10,"type":1,"speed":[130,170],"number":1,"spread":7,"error":0,"recoil":0},{"x":-1.085,"y":-1.05,"z":0.595,"angle":0,"damage":[2.5,3.5],"rate":10,"type":1,"speed":[130,170],"number":1,"spread":7,"error":0,"recoil":0}],"radius":3.5}}';
var Duality_621 = '{"name":"Duality","level":6,"model":69,"size":1.7,"zoom":0.9,"specs":{"shield":{"capacity":[250,325],"reload":[5,9]},"generator":{"capacity":[140,205],"reload":[65,90]},"ship":{"mass":220,"speed":[110,140],"rotation":[40,70],"acceleration":[110,140]}},"bodies":{"main":{"section_segments":10,"offset":{"x":0,"y":-100,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[0,-10,20,90,110,140,155,180,190,210,200],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,4,12,26,19.5,19.5,19.5,19.5,25,15,0],"height":[0,4,12,25,22,25,25,25,25,15,0],"texture":[17,2,10,63,2,63,11,3,12,17],"propeller":1},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-80,"z":10.05},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[0,10,45,75,100,120],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,12,12,7,0],"height":[0,5,20,18,15,0],"texture":[4,9,3,4]},"cannon":{"section_segments":8,"offset":{"x":50,"y":-25,"z":5},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[15,5,20,45,60,100,110,100],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,3,7,7,8,8,5,0],"height":[0,3,7,7,10,15,8,0],"texture":[17,12,4,3,10,63,17],"propeller":1,"laser":{"damage":[5,8],"rate":10,"type":2,"speed":[160,200],"recoil":0,"number":2,"error":0,"angle":10}}},"wings":{"wings":{"doubleside":1,"offset":{"x":0,"y":30,"z":0},"length":[35,10.2,25],"width":[90,50,40,30],"angle":[10,-25,35],"position":[0,25,25,40],"texture":[8,1,63],"bump":{"position":40,"size":10}},"winglets":{"doubleside":1,"offset":{"x":0,"y":55,"z":10},"length":[30],"width":[50,40],"angle":[50],"position":[0,40],"texture":[63],"bump":{"position":40,"size":10}},"join":{"doubleside":1,"offset":{"x":0,"y":45,"z":16},"length":[30,20,30],"width":[50,40,40,20],"angle":[-12,5,-50],"position":[0,20,10,20],"texture":[4,3,12],"bump":{"position":0,"size":10}}},"typespec":{"name":"Duality","level":6,"model":69,"code":669,"specs":{"shield":{"capacity":[250,325],"reload":[5,9]},"generator":{"capacity":[140,205],"reload":[65,90]},"ship":{"mass":220,"speed":[110,140],"rotation":[40,70],"acceleration":[110,140]}},"shape":[3.742,3.41,2.407,1.836,1.509,1.285,1.153,1.053,0.973,1.847,1.926,1.933,1.945,1.953,2,2.09,2.241,2.431,3.193,3.455,3.622,3.423,3.057,3.496,3.965,3.747,3.965,3.496,3.057,3.423,3.622,3.455,3.193,2.431,2.241,2.09,2,1.953,1.945,1.933,1.926,1.847,0.973,1.053,1.153,1.285,1.509,1.836,2.407,3.41],"lasers":[{"x":1.7,"y":-0.68,"z":0.17,"angle":0,"damage":[5,8],"rate":10,"type":2,"speed":[160,200],"number":2,"spread":10,"error":0,"recoil":0},{"x":-1.7,"y":-0.68,"z":0.17,"angle":0,"damage":[5,8],"rate":10,"type":2,"speed":[160,200],"number":2,"spread":10,"error":0,"recoil":0}],"radius":3.965}}';
var Wasp_622 = '{"name":"Wasp","level":6,"model":70,"size":2,"zoom":0.85,"specs":{"shield":{"capacity":[175,275],"reload":[6,10]},"generator":{"capacity":[110,170],"reload":[60,85]},"ship":{"mass":200,"speed":[110,135],"rotation":[50,70],"acceleration":[100,120]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":0,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-55,-60,-50,-20,10,45,75,95,80],"z":[-5,-5,-3,0,0,0,0,0,0]},"width":[0,8,20,24,31,20,28,24,0],"height":[0,5,8,15,20,20,18,14,0],"propeller":true,"texture":[13,63,2,10,11,4,3,17]},"cockpit":{"section_segments":12,"offset":{"x":0,"y":-11,"z":18},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-25,-10,10,30,50,75],"z":[0,0,0,0,0,0]},"width":[0,10,15,13,13,0],"height":[0,12,15,15,13,0],"propeller":false,"texture":[4,9,9,4,4]},"cannon":{"section_segments":8,"offset":{"x":60,"y":20,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-70,-75,-70,-43,-40,-20,0,25,29],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,3,5,5,4,4,8,7,0],"height":[0,3,5,5,4,4,11,7,0],"angle":3,"laser":{"damage":[7.5,13],"rate":5,"type":1,"speed":[160,200],"number":1,"error":2.5},"propeller":false,"texture":[12,4,8,3,63,4,11,4]},"cannon2":{"section_segments":8,"offset":{"x":20,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-70,-75,-70,-43,-40,-20,-15,10,15],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,3,5,5,7,7,10,10,0],"height":[0,3,5,5,7,7,8,8,0],"angle":0,"laser":{"damage":[7.5,13],"rate":5,"type":1,"speed":[160,180],"number":1,"error":2.5},"propeller":false,"texture":[12,6,4,3,63,4,11,4]},"turbine":{"section_segments":12,"offset":{"x":30,"y":60,"z":8},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-78,-75,-68,-40,-35,-20,-15,0,25,20],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,8,10,15,10,15,15,15,15,0],"height":[0,6,10,14,10,13,17,17,13,0],"angle":0,"propeller":true,"texture":[12,4,3,4,3,4,63,8,17]}},"wings":{"main1":{"length":[40],"width":[35,40],"angle":[-5],"position":[0,-20],"doubleside":true,"offset":{"x":20,"y":35,"z":10},"bump":{"position":30,"size":20},"texture":[4]},"main2":{"length":[25],"width":[45,20],"angle":[55],"position":[0,25],"doubleside":true,"offset":{"x":10,"y":65,"z":16},"bump":{"position":30,"size":20},"texture":[63]},"main3":{"doubleside":true,"offset":{"x":18,"y":-33,"z":3},"length":[0,10,0,15],"width":[0,10,10,60,20],"angle":[0,-15,-20,-5],"position":[0,0,0,-20,10],"texture":[0,8,13,63],"bump":{"position":35,"size":10}}},"typespec":{"name":"Wasp","level":6,"model":70,"code":670,"specs":{"shield":{"capacity":[175,275],"reload":[6,10]},"generator":{"capacity":[110,170],"reload":[60,85]},"ship":{"mass":200,"speed":[110,135],"rotation":[50,70],"acceleration":[100,120]}},"shape":[2.405,2.421,3.138,3.499,3.009,2.657,3.215,3.23,3.041,2.834,2.692,2.564,2.521,2.623,2.782,2.927,3.111,3.263,3.194,2.821,3.354,3.847,3.757,4.117,3.868,3.807,3.868,4.117,3.757,3.847,3.354,2.821,3.194,3.263,3.111,2.927,2.782,2.623,2.521,2.564,2.692,2.834,3.041,3.23,3.215,2.657,3.009,3.499,3.138,2.421],"lasers":[{"x":2.243,"y":-2.196,"z":0.4,"angle":3,"damage":[7.5,13],"rate":5,"type":1,"speed":[160,200],"number":1,"spread":0,"error":2.5,"recoil":0},{"x":-2.243,"y":-2.196,"z":0.4,"angle":-3,"damage":[7.5,13],"rate":5,"type":1,"speed":[160,200],"number":1,"spread":0,"error":2.5,"recoil":0},{"x":0.8,"y":-3,"z":0,"angle":0,"damage":[7.5,13],"rate":5,"type":1,"speed":[160,180],"number":1,"spread":0,"error":2.5,"recoil":0},{"x":-0.8,"y":-3,"z":0,"angle":0,"damage":[7.5,13],"rate":5,"type":1,"speed":[160,180],"number":1,"spread":0,"error":2.5,"recoil":0}],"radius":4.117}}';
var Trinity_623 = '{"name":"Trinity","level":6,"model":71,"size":1.7,"zoom":0.875,"specs":{"shield":{"capacity":[250,345],"reload":[6,9]},"generator":{"capacity":[125,225],"reload":[58,76]},"ship":{"mass":230,"speed":[125,150],"rotation":[55,75],"acceleration":[100,120]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":20,"z":0},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-145,-150,-125,-95,-50,0,95,85],"z":[0,0,0,0,0,0,0,0]},"width":[0,5,10,17,25,30,20,0],"height":[0,2,8,15,20,30,25,0],"texture":[17,3,63,10,2,4,17],"propeller":true},"cannon":{"section_segments":6,"offset":{"x":0,"y":-45,"z":-18},"position":{"x":[0,0,0,0,0,0],"y":[-40,-50,-20,0,20,30],"z":[0,0,0,0,0,20]},"width":[0,5,8,11,7,0],"height":[0,5,8,11,10,0],"angle":0,"laser":{"damage":[46,69],"rate":1,"type":2,"speed":[130,180],"number":1,"angle":0,"error":0},"propeller":false,"texture":[3,3,10,3]},"cockpit":{"section_segments":12,"offset":{"x":0,"y":0,"z":23},"position":{"x":[0,0,0,0,0,0],"y":[-70,-50,-20,70,85],"z":[-7,-6,-3,0,3]},"width":[0,12,16,15,5],"height":[0,15,15,15,0],"texture":[9,9,3]},"propulsors":{"section_segments":8,"offset":{"x":30,"y":20,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-10,-15,-10,0,10,20,25,40,75,90,85],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,15,15,20,20,20,18,18,15,10,0],"height":[0,15,15,20,20,20,18,18,15,10,0],"texture":[11,4,63,3,4,4,63,11,12,17],"propeller":true},"propulsors2":{"section_segments":8,"offset":{"x":15,"y":20,"z":27.5},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-10,-15,-7.5,5,15,25,35,45,75,90,85],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,15,17.5,20,20,20,18,18,15,10,0],"height":[0,15,15,20,20,20,18,18,15,10,0],"texture":[11,63,4,3,11,63,2,10,12,17],"propeller":true},"cannons":{"section_segments":12,"offset":{"x":30,"y":40,"z":25},"position":{"x":[0,0,0,0,0,0,0],"y":[-45,-50,-20,0,20,30,40],"z":[0,0,0,0,0,0,0]},"width":[0,5,8,10,6,5,0],"height":[0,5,8,8,6,5,0],"angle":0,"laser":{"damage":[6,9],"rate":1,"type":1,"speed":[145,195],"number":3,"angle":15,"error":0},"propeller":false,"texture":[17,4,10,4,63,4]}},"wings":{"front":{"doubleside":true,"offset":{"x":8,"y":-74,"z":-2},"length":[0,25,20],"width":[0,140,50,10],"angle":[0,0,0],"position":[0,20,40,0],"texture":[1,1,63],"bump":{"position":50,"size":10}},"wing1":{"offset":{"x":0,"y":50,"z":20},"length":[40,45],"width":[70,70,20],"angle":[0,30],"position":[0,0,30,50],"texture":[4,11],"doubleside":true,"bump":{"position":10,"size":5}},"wing2":{"offset":{"x":0,"y":50,"z":-5},"length":[40,55],"width":[70,70,20],"angle":[0,-10],"position":[0,0,30,50],"texture":[4,4],"doubleside":true,"bump":{"position":10,"size":5}}},"typespec":{"name":"Trinity","level":6,"model":71,"code":671,"specs":{"shield":{"capacity":[250,345],"reload":[6,9]},"generator":{"capacity":[125,225],"reload":[58,76]},"ship":{"mass":230,"speed":[125,150],"rotation":[55,75],"acceleration":[100,120]}},"shape":[4.423,4.225,3.347,2.788,2.858,3.234,2.676,2.03,1.647,1.415,1.253,1.231,1.224,1.542,1.609,1.822,2.116,3.704,4.391,4.429,3.942,3.582,3.98,3.932,3.969,3.918,3.969,3.932,3.98,3.582,3.942,4.429,4.391,3.704,2.116,1.822,1.609,1.542,1.224,1.231,1.253,1.415,1.647,2.03,2.676,3.234,2.858,2.788,3.347,4.225],"lasers":[{"x":0,"y":-3.23,"z":-0.612,"angle":0,"damage":[46,69],"rate":1,"type":2,"speed":[130,180],"number":1,"spread":0,"error":0,"recoil":0},{"x":1.02,"y":-0.34,"z":0.85,"angle":0,"damage":[6,9],"rate":1,"type":1,"speed":[145,195],"number":3,"spread":15,"error":0,"recoil":0},{"x":-1.02,"y":-0.34,"z":0.85,"angle":0,"damage":[6,9],"rate":1,"type":1,"speed":[145,195],"number":3,"spread":15,"error":0,"recoil":0}],"radius":4.429}}';
var Crux_624 = '{"name":"Crux","level":6,"model":72,"size":1.6,"zoom":0.85,"specs":{"shield":{"capacity":[250,350],"reload":[6,9]},"generator":{"capacity":[175,250],"reload":[53,79]},"ship":{"mass":230,"speed":[110,140],"rotation":[50,70],"acceleration":[110,150]}},"bodies":{"main":{"section_segments":10,"offset":{"x":0,"y":10,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-80,-105,-50,-15,5.5,25,50,75,60],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,10,30,30,30,35,32.5,20,0],"height":[0,10,20,30,30,30,35,30,0],"texture":[13,2,10,63,63,4,4,12],"propeller":true,"laser":{"damage":[10,15],"rate":2.25,"type":1,"speed":[150,230],"number":1,"error":0}},"cockpit":{"section_segments":7,"offset":{"x":0,"y":12,"z":25},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-60,-60,-30,0,15,25,20],"z":[-5,-5,0,0,0,0,0]},"width":[0,5,15,15,15,10,0],"height":[0,5,10,10,10,10,0],"texture":[4,9,9,3,4],"propeller":false},"arms":{"section_segments":9,"offset":{"x":50,"y":10,"z":0},"position":{"x":[-32,-28,-26,-10,-15,-15,-20,-20],"y":[-100,-115,-100,-10,5,45,77,60,-20],"z":[0,0,0,0,0,0,0,0]},"width":[0,10,15,20,20,20,15,0,10],"height":[0,5,10,20,25,20,10,0,10],"texture":[12,63,3,63,11,4,12],"angle":0,"laser":{"damage":[2,3.5],"rate":5,"type":1,"speed":[150,230],"number":3,"error":10,"angle":5},"propeller":true}},"wings":{"main":{"length":[70,25],"width":[60,20,15],"angle":[-20,30],"position":[10,50,20],"texture":[63,4],"doubleside":true,"offset":{"x":10,"y":20,"z":9},"bump":{"position":30,"size":20}},"winglets":{"length":[35],"width":[20,10],"angle":[45],"position":[-5,10],"texture":63,"doubleside":true,"offset":{"x":20,"y":74,"z":10},"bump":{"position":0,"size":5}}},"typespec":{"name":"Crux","level":6,"model":72,"code":672,"specs":{"shield":{"capacity":[250,350],"reload":[6,9]},"generator":{"capacity":[175,250],"reload":[53,79]},"ship":{"mass":230,"speed":[110,140],"rotation":[50,70],"acceleration":[110,150]}},"shape":[3.046,3.421,3.511,3.433,2.995,2.599,2.329,2.149,2.017,1.93,1.881,1.868,1.904,1.91,1.847,3.352,3.469,3.45,3.485,3.526,3.151,3.188,3.093,2.927,2.834,2.725,2.834,2.927,3.093,3.188,3.151,3.526,3.485,3.45,3.469,3.352,1.847,1.909,1.91,1.868,1.881,1.93,2.017,2.149,2.329,2.599,2.995,3.433,3.511,3.421],"lasers":[{"x":0,"y":-3.04,"z":0,"angle":0,"damage":[10,15],"rate":2.25,"type":1,"speed":[150,230],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.704,"y":-3.36,"z":0,"angle":0,"damage":[2,3.5],"rate":5,"type":1,"speed":[150,230],"number":3,"spread":5,"error":10,"recoil":0},{"x":-0.704,"y":-3.36,"z":0,"angle":0,"damage":[2,3.5],"rate":5,"type":1,"speed":[150,230],"number":3,"spread":5,"error":10,"recoil":0}],"radius":3.526}}';

// 7티어 
var Bayonet_701 = '{"name":"Bayonet","level":7,"model":21,"size":2.9,"specs":{"shield":{"capacity":[410,410],"reload":[11,11]},"generator":{"capacity":[255,255],"reload":[77,77]},"ship":{"mass":375,"speed":[140,140],"rotation":[65,65],"acceleration":[110,110]}},"bodies":{"main":{"section_segments":20,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-125,-128,-105,-60,-30,-10,50,60,90,100,120,100],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,10,15,20,25,25,30,30,30,20,0,0],"height":[0,5,10,15,10,10,15,15,15,10,10,0],"texture":[6,3,4,4,63,63,4,4,3,13,17],"propeller":true,"laser":{"damage":[44,44],"rate":3,"type":1,"speed":[200,200],"number":1,"error":0,"recoil":0}},"side_thusters":{"section_segments":10,"offset":{"x":30,"y":30,"z":15},"position":{"x":[0,0,0,0,0,0,0],"y":[-60,-40,0,20,45,60,40],"z":[0,0,0,0,0,0,0]},"width":[0,10,20,23,20,15,0],"height":[0,10,15,15,15,12,0],"texture":[63,3,11,63,13,16.9],"propeller":true},"cockpit":{"section_segments":12,"offset":{"x":0,"y":-30,"z":18},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-65,-65,-25,0,25,50,90,110,120,130],"z":[-8,-7,-5,-5,0,0,0,-3,-5,-5]},"width":[0,5,10,15,25,25,25,20,10,0],"height":[0,4,15,20,15,15,15,10,5,0],"texture":[63,9,9,3,63,18,10,4,63]},"cannons":{"section_segments":12,"offset":{"x":65,"y":10,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-45,-20,0,20,50,55],"z":[0,0,0,0,0,0,0]},"width":[0,5,10,10,13,10,0],"height":[0,5,15,15,15,5,0],"angle":2,"propeller":false,"texture":[4,4,10,4,63,4],"laser":{"damage":[6.5,6.5],"rate":5,"type":1,"speed":[150,150],"number":1,"error":0}},"laser":{"section_segments":10,"offset":{"x":40,"y":50,"z":0},"position":{"x":[-35,-30,-20,-10,0,0,-5,-8,-15],"y":[-180,-170,-135,-80,-50,-30,0,10,30],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,5,10,15,15,15,10,10,0],"height":[0,5,10,15,15,15,10,10,0],"texture":[6,63,10,3,63,4,3,2,1]}},"wings":{"wings":{"offset":{"x":50,"y":30,"z":-2},"length":[20,10,20],"width":[90,70,60,50],"angle":[0,0,0],"position":[0,-10,-20,0],"texture":[18,63,3],"doubleside":true,"bump":{"position":15,"size":10}},"fins":{"offset":{"x":15,"y":32,"z":27},"length":[25,5],"width":[80,20],"angle":[45],"position":[0,30],"texture":[63],"doubleside":true,"bump":{"position":5,"size":5}}},"typespec":{"name":"Bayonet","level":7,"model":21,"code":721,"specs":{"shield":{"capacity":[410,410],"reload":[11,11]},"generator":{"capacity":[255,255],"reload":[77,77]},"ship":{"mass":375,"speed":[140,140],"rotation":[65,65],"acceleration":[110,110]}},"shape":[7.546,7.375,6.3,5.334,4.534,3.962,3.589,3.312,4.418,4.462,4.377,5.088,5.556,5.845,5.986,6.236,6.605,6.619,5.636,5.437,5.249,5.817,5.768,6.838,7.056,6.974,7.056,6.838,5.768,5.817,5.249,5.437,5.636,6.619,6.605,6.236,5.986,5.845,5.568,5.088,4.377,4.462,4.418,3.312,3.589,3.962,4.534,5.334,6.3,7.375],"lasers":[{"x":0,"y":-7.424,"z":0,"angle":0,"damage":[44,44],"rate":3,"type":1,"speed":[200,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":3.669,"y":-2.318,"z":0,"angle":2,"damage":[6.5,6.5],"rate":5,"type":1,"speed":[150,150],"number":1,"spread":0,"error":0,"recoil":0},{"x":-3.669,"y":-2.318,"z":0,"angle":-2,"damage":[6.5,6.5],"rate":5,"type":1,"speed":[150,150],"number":1,"spread":0,"error":0,"recoil":0}],"radius":7.546}}';
var Shadow_X_3_702 = '{"name":"Shadow X-3","level":7,"model":22,"size":2.9,"specs":{"shield":{"capacity":[400,400],"reload":[12,12]},"generator":{"capacity":[280,280],"reload":[62,62]},"ship":{"mass":375,"speed":[140,140],"rotation":[55,55],"acceleration":[90,90]}},"bodies":{"main":{"section_segments":20,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-125,-123,-110,-65,-40,0,40,70,80,90],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,5,10,18,20,20,20,25,25,20,0],"height":[0,5,10,25,20,10,10,15,15,10,10],"texture":[12,63,15,4,63,63,4,63,5,17],"laser":{"damage":[250,250],"rate":1,"type":1,"speed":[200,200],"number":1,"error":0,"recoil":250}},"air":{"section_segments":10,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,-80,-30,-10,10,30,50],"z":[0,0,0,0,0,0,0]},"width":[0,25,35,30,30,32,20],"height":[0,15,10,10,10,10,10,15,15,15,10,10],"texture":[4,3,2,2,2,3]},"back":{"section_segments":10,"offset":{"x":0,"y":-10,"z":0},"position":{"x":[0,0,0,0,0],"y":[90,95,100,105,90],"z":[0,0,0,0,0]},"width":[10,15,18,22,2],"height":[3,5,7,8,2],"texture":[63],"propeller":true},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-30,"z":18},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-45,-25,0,25,60,90,100],"z":[0,0,0,0,-10,-8,-10]},"width":[0,5,10,12,15,10,10],"height":[0,10,15,10,15,10,10],"texture":[63,9,9,10,63,3]},"laser":{"section_segments":10,"offset":{"x":70,"y":10,"z":-19},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-30,-25,0,10,20,25,30,40,70,60],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,10,15,15,15,10,10,15,10,0],"height":[0,10,15,15,15,10,10,15,5,0],"texture":[6,4,10,3,4,3,2],"propeller":true,"laser":{"damage":[4,4],"rate":3,"type":1,"speed":[150,150],"number":1}},"laser2":{"section_segments":10,"offset":{"x":40,"y":-20,"z":-20},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-30,-25,0,10,20,25,30,40,70,60],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,10,15,15,15,10,10,15,12,0],"height":[0,10,15,15,15,10,10,15,5,0],"texture":[6,4,10,3,4,3,2],"propeller":true,"laser":{"damage":[4,4],"rate":4,"type":1,"speed":[150,150],"number":1}}},"wings":{"wings":{"offset":{"x":10,"y":0,"z":0},"length":[30,10,25,20],"width":[100,50,60,40,35],"angle":[0,0,0,0],"position":[0,0,10,30,-10],"texture":[4,63,4,3],"bump":{"position":-20,"size":15}}},"typespec":{"name":"Shadow X-3","level":7,"model":22,"code":722,"specs":{"shield":{"capacity":[400,400],"reload":[12,12]},"generator":{"capacity":[280,280],"reload":[62,62]},"ship":{"mass":375,"speed":[140,140],"rotation":[55,55],"acceleration":[90,90]}},"shape":[7.25,6.786,4.841,4.606,3.782,3.725,3.858,3.88,3.656,3.477,5.736,5.688,5.552,5.526,5.437,5.261,5.419,5.922,6.38,6.542,6.022,3.435,4.69,5.642,5.609,5.521,5.609,5.642,4.69,3.435,6.022,6.542,6.38,5.922,5.419,5.261,5.437,5.526,5.552,5.688,5.736,3.477,3.656,3.88,3.858,3.725,3.782,4.606,4.841,6.786],"lasers":[{"x":0,"y":-7.25,"z":0,"angle":0,"damage":[250,250],"rate":1,"type":1,"speed":[200,200],"number":1,"spread":0,"error":0,"recoil":250},{"x":4.06,"y":-1.16,"z":-1.102,"angle":0,"damage":[4,4],"rate":3,"type":1,"speed":[150,150],"number":1,"spread":0,"error":0,"recoil":0},{"x":-4.06,"y":-1.16,"z":-1.102,"angle":0,"damage":[4,4],"rate":3,"type":1,"speed":[150,150],"number":1,"spread":0,"error":0,"recoil":0},{"x":2.32,"y":-2.9,"z":-1.16,"angle":0,"damage":[4,4],"rate":4,"type":1,"speed":[150,150],"number":1,"spread":0,"error":0,"recoil":0},{"x":-2.32,"y":-2.9,"z":-1.16,"angle":0,"damage":[4,4],"rate":4,"type":1,"speed":[150,150],"number":1,"spread":0,"error":0,"recoil":0}],"radius":7.25}}';
var Saturnia_703 = '{"name":"Saturnia","level":7,"model":23,"size":1.9,"specs":{"shield":{"capacity":[280,280],"reload":[18,18]},"generator":{"capacity":[265,265],"reload":[88,88]},"ship":{"mass":375,"speed":[130,130],"rotation":[75,75],"acceleration":[115,115]}},"bodies":{"mein":{"section_segments":8,"offset":{"x":0,"y":13,"z":5},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-90,-80,-55,-10,40,60,90,80],"z":[-10,-10,-6,0,0,0,0,0]},"width":[0,16,28,35,30,23,23,0],"height":[0,8,12,20,18,13,10,0],"texture":[4,63,2,10,4,13,17],"propeller":true},"cockpit":{"section_segments":12,"offset":{"x":0,"y":-10,"z":5},"position":{"x":[0,0,0,0,0],"y":[-50,-40,-20,20,30],"z":[-1,0,4,7,0]},"width":[0,14,19,10,0],"height":[0,9,20,10,0],"texture":[4,9],"propeller":false},"pointless_body":{"section_segments":8,"offset":{"x":30,"y":15,"z":-45},"position":{"x":[0,0,0,0,0,0],"y":[-29,-20,0,50,80,70],"z":[10,8,9,10,10,10]},"width":[0,11,17,24,10,0],"height":[0,8,15,22,12,0],"texture":[3,63,8,2,4],"propeller":false},"propeller":{"section_segments":12,"offset":{"x":90,"y":105,"z":-5},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-65,-55,-18,0,15,30,80,60,60],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,25,35,21,20,30,22,10,0],"height":[0,20,30,15,15,25,15,5,0],"texture":[2,10,3,63,3,8,13,17],"propeller":true},"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA":{"section_segments":8,"offset":{"x":0,"y":-25,"z":-30},"position":{"x":[0,0,0,0,0,0],"y":[-90,-80,-50,0,40,50],"z":[0,0,0,20,25,25]},"width":[0,10,14,17,10,0],"height":[0,12,20,15,10,0],"texture":[6,4,10,63],"propeller":true,"angle":0,"laser":{"damage":[170,170],"rate":1,"type":2,"speed":[125,125],"number":1,"error":0,"angle":0,"recoil":100}},"PEWPEWPEWPEW":{"section_segments":8,"offset":{"x":115,"y":125,"z":-35},"position":{"x":[0,0,0,-10,-20,-20],"y":[-90,-80,-50,0,40,50],"z":[0,0,0,20,25,25]},"width":[0,10,14,17,10,0],"height":[0,10,20,17,10,0],"texture":[6,4,10,1],"propeller":true,"angle":-3,"laser":{"damage":[7,7],"rate":8,"type":1,"speed":[250,250],"number":1,"error":2,"angle":0,"recoil":0}},"POW":{"section_segments":8,"offset":{"x":0,"y":85,"z":50},"position":{"x":[0,0,0,0,0,0],"y":[-90,-80,-50,0,40,50],"z":[0,0,0,15,20,20]},"width":[0,10,14,17,10,0],"height":[0,10,20,17,10,0],"texture":[6,4,10,63],"propeller":true,"angle":0,"laser":{"damage":[20,20],"rate":1,"type":1,"speed":[150,150],"number":1,"error":0,"angle":0,"recoil":0}}},"wings":{"main":{"offset":{"x":25,"y":-5,"z":-6},"length":[45,-20,40,40],"width":[60,30,170,50,20],"angle":[-30,-30,-30,-10],"position":[0,-30,-50,0,20],"texture":[11,13,63,4],"doubleside":true,"bump":{"position":15,"size":8}},"backdownjoin":{"offset":{"x":10,"y":5,"z":0},"length":[90],"width":[80,30],"angle":[-65],"position":[0,80],"texture":[63],"doubleside":true,"bump":{"position":0,"size":15}},"backupjoin":{"offset":{"x":35,"y":55,"z":-35},"length":[70,40],"width":[80,40,20],"angle":[20,10],"position":[-5,70,90],"texture":[2,4],"doubleside":true,"bump":{"position":0,"size":5}},"winglets":{"offset":{"x":0,"y":5,"z":0},"length":[120],"width":[80,30],"angle":[90],"position":[0,100],"texture":[63],"doubleside":true,"bump":{"position":0,"size":20}}},"typespec":{"name":"Saturnia","level":7,"model":23,"code":723,"specs":{"shield":{"capacity":[280,280],"reload":[18,18]},"generator":{"capacity":[265,265],"reload":[88,88]},"ship":{"mass":375,"speed":[130,130],"rotation":[75,75],"acceleration":[115,115]}},"shape":[4.37,4.116,2.844,5.608,4.828,4.284,3.896,3.641,3.462,3.351,3.499,3.854,4.361,4.622,4.683,5.294,5.694,6.023,6.446,7.941,8.014,8.218,7.769,4.01,4.836,5.13,4.836,4.01,7.769,8.218,8.014,7.941,6.446,6.023,5.694,5.294,4.683,4.622,4.361,3.854,3.499,3.351,3.462,3.641,3.896,4.284,4.828,5.608,2.844,4.116],"lasers":[{"x":0,"y":-4.37,"z":-1.14,"angle":0,"damage":[170,170],"rate":1,"type":2,"speed":[125,125],"number":1,"spread":0,"error":0,"recoil":100},{"x":4.549,"y":1.335,"z":-1.33,"angle":-3,"damage":[7,7],"rate":8,"type":1,"speed":[250,250],"number":1,"spread":0,"error":2,"recoil":0},{"x":-4.549,"y":1.335,"z":-1.33,"angle":3,"damage":[7,7],"rate":8,"type":1,"speed":[250,250],"number":1,"spread":0,"error":2,"recoil":0},{"x":0,"y":-0.19,"z":1.9,"angle":0,"damage":[20,20],"rate":1,"type":1,"speed":[150,150],"number":1,"spread":0,"error":0,"recoil":0}],"radius":8.218}}';
var Huxian_704 = '{"name":"Huxian","level":7,"model":24,"size":2.5,"specs":{"shield":{"capacity":[350,350],"reload":[15,15]},"generator":{"capacity":[255,255],"reload":[135,135]},"ship":{"mass":375,"speed":[160,160],"rotation":[70,70],"acceleration":[130,130]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":50,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-160,-140,-100,-60,10,65,80,70],"z":[0,5,15,20,10,0,0,0]},"width":[5,12,20,25,25,20,15,0],"height":[0,10,20,20,30,20,15,0],"texture":[4,11,63,2,10,12,17],"propeller":true},"cockpit":{"section_segments":12,"offset":{"x":0,"y":-27,"z":23},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-55,-25,0,30,50,100],"z":[-15,-3,-3,-1,-2,0,0,0,0,0,0,0]},"width":[0,12,16,13,10,0],"height":[0,10,20,16,16,0],"texture":[9,9,9,10,4]},"side":{"section_segments":12,"offset":{"x":95,"y":90,"z":-25},"position":{"x":[-47,-38,-27,-25,-24,-30,-35],"y":[-100,-80,-50,-30,-10,30,45],"z":[-9,-11,-15,-15,-5,0,0]},"width":[0,10,15,15,15,10,0],"height":[5,10,20,25,25,13,8],"texture":[63,10,63,3,11,13],"propeller":false,"angle":-5,"laser":{"damage":[6.5,6.5],"rate":6,"type":1,"speed":[100,150],"number":1,"error":4}},"side_propulsors":{"section_segments":12,"offset":{"x":30,"y":40,"z":0},"position":{"x":[-5,-5,-5,-5,-5,-5,0,0,0,0],"y":[-15,-20,-15,0,20,45,70,90,100,90],"z":[10,10,10,10,5,5,0,0,0,0]},"width":[0,15,18,20,20,15,15,15,10,0],"height":[0,15,18,20,20,15,15,15,10,0],"texture":[18,63,4,11,2,3,63,12,17],"propeller":true},"Inner_Nails":{"section_segments":10,"offset":{"x":25,"y":10,"z":-15},"position":{"x":[-48,-35,-20,8,10,0,0],"y":[-135,-110,-80,-20,20,70,100],"z":[2,2,2,-6,-5,5,10]},"width":[0,9,15,15,15,15,5],"height":[0,10,15,15,15,15,5],"texture":[63,3,10,63,4,1],"angle":-12},"propellers":{"section_segments":12,"offset":{"x":-30,"y":5,"z":-3},"position":{"x":[20,14,5,2,0,7.3,5],"y":[-90,-80,-50,0,30,80,90],"z":[0,1,-4,-4,-3,-15,-15]},"width":[0,5,10,16,16,10,0],"height":[0,5,15,20,20,10,0],"texture":[4,63,2,3,10,63],"angle":0,"propeller":false},"laser":{"section_segments":8,"offset":{"x":0,"y":-74,"z":-20},"position":{"x":[0,0,0,0,0,0,0],"y":[-17,-22,-10,20,40,80,100],"z":[0,0,0,10,10,10,0]},"width":[0,5,10,15,15,15,0],"height":[0,5,10,5,5,5,0],"angle":0,"texture":[17,4,3,3,3],"laser":{"damage":[17,17],"rate":2,"type":2,"speed":[250,250],"recoil":50,"number":4,"error":0,"angle":5}},"Cannons2":{"section_segments":8,"offset":{"x":55,"y":60,"z":-20},"position":{"x":[0,0,5,5,0,0,0],"y":[-47,-52,-20,0,20,40,42],"z":[0,0,0,0,0,0,0]},"width":[0,5,10,10,10,5,0],"height":[0,5,10,15,10,5,0],"angle":0,"laser":{"damage":[6.5,6.5],"rate":6,"type":1,"speed":[100,150],"number":1,"error":4},"propeller":false,"texture":[17,4,10,63,4]}},"wings":{"Canards":{"doubleside":true,"offset":{"x":40,"y":-130,"z":-15},"length":[25,0],"width":[50,20,20],"angle":[-30,0],"position":[90,60,60,60],"texture":[63],"bump":{"position":10,"size":5}},"Wings":{"doubleside":true,"offset":{"x":20,"y":30,"z":-10},"length":[70,20],"width":[120,40,20],"angle":[-15,30],"position":[0,56,60],"texture":[11,63],"bump":{"position":10,"size":10}},"join1":{"doubleside":true,"offset":{"x":30,"y":37,"z":5},"length":[55,0],"width":[40,15,20],"angle":[23,0],"position":[60,100,100,100],"texture":[4],"bump":{"position":10,"size":5}}},"typespec":{"name":"Huxian","level":7,"model":24,"code":724,"specs":{"shield":{"capacity":[350,350],"reload":[15,15]},"generator":{"capacity":[255,255],"reload":[135,135]},"ship":{"mass":375,"speed":[160,160],"rotation":[70,70],"acceleration":[130,130]}},"shape":[6.609,6.426,5.397,4.592,4.043,5.05,4.834,4.091,3.114,2.63,2.563,3.102,3.386,3.767,4.099,4.569,4.99,5.404,7.193,7.248,7.523,8.383,7.464,7.28,7.126,6.513,7.126,7.28,7.464,8.383,7.523,7.248,7.193,5.404,4.99,4.569,4.099,3.767,3.386,3.102,2.563,2.63,3.114,4.091,4.834,5.05,4.043,4.592,5.397,6.426],"lasers":[{"x":2.845,"y":-0.686,"z":-1.25,"angle":-5,"damage":[6.5,6.5],"rate":6,"type":1,"speed":[100,150],"number":1,"spread":0,"error":4,"recoil":0},{"x":-2.845,"y":-0.686,"z":-1.25,"angle":5,"damage":[6.5,6.5],"rate":6,"type":1,"speed":[100,150],"number":1,"spread":0,"error":4,"recoil":0},{"x":0,"y":-4.8,"z":-1,"angle":0,"damage":[17,17],"rate":2,"type":2,"speed":[250,250],"number":4,"spread":5,"error":0,"recoil":50},{"x":2.75,"y":0.4,"z":-1,"angle":0,"damage":[6.5,6.5],"rate":6,"type":1,"speed":[100,150],"number":1,"spread":0,"error":4,"recoil":0},{"x":-2.75,"y":0.4,"z":-1,"angle":0,"damage":[6.5,6.5],"rate":6,"type":1,"speed":[100,150],"number":1,"spread":0,"error":4,"recoil":0}],"radius":8.383}}';
var Seeker_705 = '{"name":"Seeker","level":7,"model":25,"size":3,"specs":{"shield":{"capacity":[380,380],"reload":[13,13]},"generator":{"capacity":[275,275],"reload":[105,105]},"ship":{"mass":365,"speed":[150,150],"rotation":[40,40],"acceleration":[100,100]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-115,-120,-70,-40,0,30,90,100,95],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,10,25,20,23,30,20,10,0],"height":[0,7,20,25,27,30,25,15,0],"texture":[13,10,63,11,3,2,4,17],"propeller":true,"laser":{"damage":[6.5,6.5],"rate":5,"type":1,"speed":[200,200],"number":1,"angle":0,"error":0,"recoil":5}},"front_sides":{"section_segments":12,"offset":{"x":30,"y":-35,"z":0},"position":{"x":[-1,-1,0,0,1,3,0,18,16,0,0,0,0],"y":[-40,-45,-35,-20,0,15,39,58,85,100],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,6,8,10,11,15,5,5,0],"height":[0,7,10,12,14,18,18,18,10,10],"texture":[13,12,4,2,13,63,4,3,4],"angle":0,"laser":{"damage":[33,33],"rate":2,"type":1,"speed":[200,200],"number":1,"angle":0,"error":0,"recoil":10}},"cannon":{"section_segments":8,"offset":{"x":20,"y":-45,"z":-15},"position":{"x":[0,0,0,0,0,0],"y":[-40,-50,-20,0,70,80],"z":[0,0,0,0,0,0]},"width":[0,5,8,11,7,0],"height":[0,5,8,11,10,0],"angle":0,"laser":{"damage":[22,22],"rate":2,"type":1,"speed":[160,160],"number":1,"angle":0,"error":0,"recoil":75},"propeller":false,"texture":[13,3]},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-50,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-50,-40,-25,0,5,30,50,60,80,100,120,135],"z":[0,0,0,4,5,7,7,13,13,10,10,10,10,10,20,20]},"width":[0,10,15,12,10,12,16,14,7,14,12,0],"height":[0,10,15,16,15,15,15,15,15,15,15,0],"texture":[9,9,9,4,3,63,4,3,4,10,63]},"side_propulsors":{"section_segments":12,"offset":{"x":25,"y":30,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-20,-7,1.5,10,20,25,30,40,80,70],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,18,20,20,18,15,15,18,10,0],"height":[0,15,20,20,20,15,15,20,10,0],"texture":[63,4,63,2,4,63,4,2,17],"propeller":true}},"wings":{"top_join":{"doubleside":true,"offset":{"x":0,"y":40,"z":-10},"length":[0,60],"width":[0,70,30],"angle":[0,65],"position":[0,0,60,50],"texture":[63],"bump":{"position":10,"size":10}},"side_joins":{"doubleside":true,"offset":{"x":0,"y":30,"z":10},"length":[80],"width":[70,30],"angle":[-20],"position":[0,70,0,0],"texture":[18],"bump":{"position":10,"size":20}},"side_front":{"doubleside":true,"offset":{"x":25,"y":-50,"z":-15},"length":[35],"width":[70,30],"angle":[-10],"position":[0,50,0,0],"texture":[3],"bump":{"position":10,"size":10}}},"typespec":{"name":"Seeker","level":7,"model":25,"code":725,"specs":{"shield":{"capacity":[380,380],"reload":[13,13]},"generator":{"capacity":[275,275],"reload":[105,105]},"ship":{"mass":365,"speed":[150,150],"rotation":[40,40],"acceleration":[100,100]}},"shape":[7.214,7.225,5.894,5.216,4.941,4.208,3.927,3.751,3.647,3.608,3.67,3.68,3.596,3.596,3.68,3.352,3.593,3.846,4.203,7.068,8.243,7.946,6.841,7.066,6.719,6.012,6.719,7.066,6.841,7.946,8.243,7.068,4.203,3.846,3.593,3.352,3.68,3.596,3.596,3.68,3.67,3.608,3.647,3.751,3.927,4.208,4.941,5.216,5.894,7.225],"lasers":[{"x":0,"y":-7.2,"z":0,"angle":0,"damage":[6.5,6.5],"rate":5,"type":1,"speed":[200,200],"number":1,"spread":0,"error":0,"recoil":5},{"x":1.74,"y":-4.8,"z":0,"angle":0,"damage":[33,33],"rate":2,"type":1,"speed":[200,200],"number":1,"spread":0,"error":0,"recoil":10},{"x":-1.74,"y":-4.8,"z":0,"angle":0,"damage":[33,33],"rate":2,"type":1,"speed":[200,200],"number":1,"spread":0,"error":0,"recoil":10},{"x":1.2,"y":-5.7,"z":-0.9,"angle":0,"damage":[22,22],"rate":2,"type":1,"speed":[160,160],"number":1,"spread":0,"error":0,"recoil":75},{"x":-1.2,"y":-5.7,"z":-0.9,"angle":0,"damage":[22,22],"rate":2,"type":1,"speed":[160,160],"number":1,"spread":0,"error":0,"recoil":75}],"radius":8.243}}';
var Parate_706 = '{"name":"Parate","level":7,"model":26,"size":3.35,"specs":{"shield":{"capacity":[400,400],"reload":[17,17]},"generator":{"capacity":[400,400],"reload":[100,100]},"ship":{"mass":375,"speed":[150,150],"rotation":[55,55],"acceleration":[100,100]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":-17,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-97,-100,-95,-85,-70,-50,5,50,100,110,105],"z":[-1,0,2,4,5,10,12,15,15,15,15,0,0,0]},"width":[4,7,10,15,18,20,30,30,25,20,0],"height":[0,2,4,10,13,15,19,20,15,10,0],"texture":[3,4,63,3,11,4,3,4,63,18],"propeller":false},"cannon1":{"section_segments":[30,90,150,210,270,330],"offset":{"x":17,"y":13,"z":48.5},"position":{"x":[0,0,0,0,0,0,-9,0],"y":[-45,-50,-45,-30,-20,0,60],"z":[0,0,0,0,0,0,-8.5,0,0,-2,-2]},"width":[0,5,10,11,11,11,0,0,11,8,0],"height":[0,5,10,11,11,10,0,10,10,8,0],"angle":0,"laser":{"damage":[10,10],"rate":5,"type":1,"speed":[170,170],"number":1,"angle":0,"error":10},"propeller":false,"texture":[16.9,2.9,63,2.9,3.9,3.9,2.9,13]},"cannon2":{"section_segments":[30,90,150,210,270,330],"offset":{"x":31.9,"y":13,"z":40},"position":{"x":[0,0,0,0,0,-3,-23.9,0],"y":[-45,-50,-45,-33,-20,0,60],"z":[0,0,0,0,0,0,0,0,0,-2,-2]},"width":[0,5,10,11,11,11,0,0,11,8,0],"height":[0,5,10,11,11,10,0,10,10,8,0],"angle":0,"laser":{"damage":[20,20],"rate":2.5,"type":1,"speed":[190,190],"number":1,"angle":0,"error":10},"propeller":false,"texture":[16.9,3.9,3.9,63,10.9,2.9,13]},"cannon3":{"section_segments":[30,90,150,210,270,330],"offset":{"x":17,"y":13,"z":31.5},"position":{"x":[0,0,0,0,0,0,-9,0],"y":[-45,-50,-45,-30,-20,0,60],"z":[0,0,0,0,0,0,8.5,0,0,-2,-2]},"width":[0,5,10,11,11,11,0,0,11,8,0],"height":[0,5,10,11,11,10,0,10,10,8,0],"angle":0,"laser":{"damage":[9.5,9.5],"rate":5,"type":1,"speed":[170,170],"number":1,"angle":0,"error":10},"propeller":false,"texture":[16.9,4,15,63,11,3,13]},"cockpit":{"section_segments":[40,90,180,270,320],"offset":{"x":0,"y":-27,"z":25},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-80,-60,-40,-15,10,30,60,100,95],"z":[-15,-9,-3,0,0,0,0,-3,-4,0]},"width":[5,10,13,14,14,18,18,11,0],"height":[0,15,15,13,13,13,13,7,0],"texture":[8.98,8.98,8.99,11,3,4,11,63]},"side":{"section_segments":8,"offset":{"x":26,"y":-17,"z":0},"position":{"x":[-14,-6,-1,0,0,0,0,0,0,0,0],"y":[-90,-60,-30,-5,5,20,35,55,75,90,85],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,10,12,15,15,15,15,15,15,10,0],"height":[0,5,7,10,10,10,10,10,10,7,0],"texture":[3,4,63,3,10,4,11,63,3,4],"propeller":false},"side2":{"section_segments":12,"offset":{"x":23,"y":33,"z":10},"position":{"x":[-3,0,0,0,0,0,0,0,0,0,0],"y":[-120,-100,-85,-70,-40,-15,5,20,50,45],"z":[-5,0,0,0,0,0,0,0,0,0,0]},"width":[0,7,11,14,15,20,18,15,13,0],"height":[0,7,11,14,15,15,15,15,13,0],"angle":1,"propeller":true,"texture":[4,63,4,10,63,4,63,15,17]},"side3":{"section_segments":12,"offset":{"x":15,"y":53,"z":40},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[0,-10,5,10,20,25,35,45,50,45],"z":[-5,0,0,0,0,0,0,0,0,0,0]},"width":[0,11,12,12,12,13,12,11,7,0],"height":[0,10,15,15,15,15,15,15,10,0],"angle":1,"propeller":true,"texture":[4,4,63,10,63,3,4,4,17]},"prop":{"section_segments":8,"offset":{"x":0,"y":68,"z":35},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-110,-95,-85,-70,-30,0,20,40,30],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[9,12,15,15,15,15,15,10,0],"height":[0,15,19,22,23,23,23,16,0],"angle":0,"propeller":true,"texture":[3,2,4,63,10,63,15,17]}},"wings":{"main":{"doubleside":true,"offset":{"x":12,"y":63,"z":32},"length":[30,10],"width":[60,30,20],"angle":[12,-12],"position":[0,30,20],"texture":[4,63],"bump":{"position":20,"size":1}},"winglets":{"doubleside":true,"offset":{"x":33,"y":3,"z":0},"length":[25,15],"width":[135,70,40],"angle":[0,-12],"position":[0,10,-15],"texture":[3.5,63],"bump":{"position":20,"size":5}}},"typespec":{"name":"Parate","level":7,"model":26,"code":726,"specs":{"shield":{"capacity":[400,400],"reload":[17,17]},"generator":{"capacity":[400,400],"reload":[100,100]},"ship":{"mass":375,"speed":[150,150],"rotation":[55,55],"acceleration":[100,100]}},"shape":[7.853,7.818,6.563,5.789,5.038,4.592,4.356,4.199,4.115,5.32,5.228,5.023,4.905,4.898,4.879,4.778,4.809,4.941,5.044,5.006,6.384,7.367,7.748,7.331,7.267,7.25,7.267,7.331,7.748,7.367,6.384,5.006,5.044,4.941,4.809,4.778,4.879,4.898,4.905,5.023,5.228,5.32,4.115,4.199,4.356,4.592,5.038,5.789,6.563,7.818],"lasers":[{"x":1.139,"y":-2.479,"z":3.249,"angle":0,"damage":[10,10],"rate":5,"type":1,"speed":[170,170],"number":1,"spread":0,"error":10,"recoil":0},{"x":-1.139,"y":-2.479,"z":3.249,"angle":0,"damage":[10,10],"rate":5,"type":1,"speed":[170,170],"number":1,"spread":0,"error":10,"recoil":0},{"x":2.137,"y":-2.479,"z":2.68,"angle":0,"damage":[20,20],"rate":2.5,"type":1,"speed":[190,190],"number":1,"spread":0,"error":10,"recoil":0},{"x":-2.137,"y":-2.479,"z":2.68,"angle":0,"damage":[20,20],"rate":2.5,"type":1,"speed":[190,190],"number":1,"spread":0,"error":10,"recoil":0},{"x":1.139,"y":-2.479,"z":2.111,"angle":0,"damage":[9.5,9.5],"rate":5,"type":1,"speed":[170,170],"number":1,"spread":0,"error":10,"recoil":0},{"x":-1.139,"y":-2.479,"z":2.111,"angle":0,"damage":[9.5,9.5],"rate":5,"type":1,"speed":[170,170],"number":1,"spread":0,"error":10,"recoil":0}],"radius":7.853}}';
var Turbo_707 = '{"name":"Turbo","level":7,"model":27,"size":2.5,"specs":{"shield":{"capacity":[320,320],"reload":[14,14]},"generator":{"capacity":[265,265],"reload":[82,82]},"ship":{"mass":350,"speed":[145,145],"rotation":[85,85],"acceleration":[100,100]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-157,-150,-130,-90,-50,0,40,90,110,120,115],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[10,10,15,20,30,35,40,35,30,20,0],"height":[0,5,15,20,25,25,30,20,20,15,0],"texture":[4,63,2,1,4,3,10,63,3,18],"propeller":false},"cockpit":{"section_segments":12,"offset":{"x":0,"y":-85,"z":18},"position":{"x":[0,0,0,0,0,0,0],"y":[-20,-10,10,40,90],"z":[-2,-2,-2,0,0]},"width":[0,9,13,15,0],"height":[0,9,18,18,0],"texture":[9,9,9,4],"propeller":false},"propulsors":{"section_segments":10,"offset":{"x":30,"y":0,"z":-5},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-10,-15,-10,0,10,20,25,45,80,115,130,125],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,20,25,30,30,30,28,28,25,18,15,0],"height":[0,20,25,30,30,30,28,28,25,19,15,0],"texture":[11,4,63,3,4,4,63,10,4,12,17],"propeller":true},"propulsor":{"section_segments":12,"offset":{"x":0,"y":0,"z":30},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-10,-15,-10,20,50,60,95,110,145,155,150],"z":[10,10,10,7.5,5,5,0,0,0,0,0]},"width":[0,15,20,25,25,25,23,23,20,15,0],"height":[0,15,20,25,25,25,23,23,20,15,0],"texture":[18,4,63,4,2,3,63,11,12,17],"propeller":true},"cannons":{"section_segments":12,"offset":{"x":30,"y":-40,"z":-5},"position":{"x":[0,0,0,0,0,0,0,-5,-10,-10],"y":[-80,-90,-75,-55,-45,-20,0,20,50,55],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,6,8,8,10,10,16,18,15,0],"height":[0,5,7,8,10,10,10,15,15,0],"angle":0,"laser":{"damage":[82,82],"rate":1,"type":2,"speed":[175,175],"recoil":0,"number":1,"error":0},"propeller":false,"texture":[13,3,2,4,10,3,63,4,18]},"cannons2":{"section_segments":12,"offset":{"x":10,"y":-80,"z":0},"position":{"x":[0,0,0,0,0,0,0,-5,-10,-10],"y":[-80,-90,-75,-50,-45,-20,0,20,50,55],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,6,8,8,10,10,16,18,15,0],"height":[0,5,7,8,10,10,10,15,15,0],"angle":0,"laser":{"damage":[82,82],"rate":1,"type":2,"speed":[175,175],"recoil":0,"number":1,"error":0},"propeller":false,"texture":[13,4,3,2,4,63,3,4,18]},"side":{"section_segments":12,"offset":{"x":25,"y":25,"z":15},"position":{"x":[-10,-5,0,0,0,0,0,-5,-11],"y":[-40,0,10,25,35,45,65,80,100],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,15,15,15,15,15,10,8,0,0],"height":[0,15,15,15,15,15,15,10,0,0],"propeller":true,"texture":[63,2,10,4,63,11,3,63]}},"wings":{"main":{"doubleside":true,"offset":{"x":0,"y":80,"z":0},"length":[65,30],"width":[50,70,40],"texture":[63,11],"angle":[-10,-10,-10],"position":[10,-20,30],"bump":{"position":-10,"size":15}}},"typespec":{"name":"Turbo","level":7,"model":27,"code":727,"specs":{"shield":{"capacity":[320,320],"reload":[14,14]},"generator":{"capacity":[265,265],"reload":[82,82]},"ship":{"mass":350,"speed":[145,145],"rotation":[85,85],"acceleration":[100,100]}},"shape":[8.517,8.538,6.745,6.117,4.697,3.731,3.337,3.102,2.774,2.482,2.624,2.782,2.924,2.949,3.021,3.442,3.979,4.846,6.292,7.327,8.008,5.759,6.866,6.834,7.786,7.765,7.786,6.834,6.866,5.759,8.008,7.327,6.292,4.846,3.979,3.442,3.021,2.949,2.927,2.782,2.624,2.482,2.774,3.102,3.337,3.731,4.697,6.117,6.745,8.538],"lasers":[{"x":1.5,"y":-6.5,"z":-0.25,"angle":0,"damage":[82,82],"rate":1,"type":2,"speed":[175,175],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.5,"y":-6.5,"z":-0.25,"angle":0,"damage":[82,82],"rate":1,"type":2,"speed":[175,175],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.5,"y":-8.5,"z":0,"angle":0,"damage":[82,82],"rate":1,"type":2,"speed":[175,175],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.5,"y":-8.5,"z":0,"angle":0,"damage":[82,82],"rate":1,"type":2,"speed":[175,175],"number":1,"spread":0,"error":0,"recoil":0}],"radius":8.538}}';
var Psychosis_708 = '{"name":"Psychosis","level":7,"model":28,"size":3,"specs":{"shield":{"capacity":[420,420],"reload":[13,13]},"generator":{"capacity":[300,300],"reload":[120,120]},"ship":{"mass":425,"speed":[145,145],"rotation":[55,55],"acceleration":[100,100]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":10,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-165,-170,-145,-125,-90,-50,0,85,95,85],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,5,10,16,25,30,30,25,20,0],"height":[0,2,9,15,20,25,30,25,20,0],"texture":[17,3,63,10,2,3,4,12,17],"propeller":true},"cannon":{"section_segments":8,"offset":{"x":0,"y":-95,"z":-18},"position":{"x":[0,0,0,0,0,0],"y":[-40,-50,-20,0,20,30],"z":[0,0,0,0,0,20]},"width":[0,5,8,11,7,0],"height":[0,5,8,11,10,0],"angle":0,"laser":{"damage":[51,51],"rate":2,"type":1,"speed":[200,200],"number":3,"angle":10,"error":0},"propeller":false,"texture":[6,4,10,3]},"cannon2":{"section_segments":6,"offset":{"x":5,"y":-45,"z":-15},"position":{"x":[0,0,0,0,0,0],"y":[-40,-50,-20,0,0,0],"z":[0,0,0,0,0,20]},"width":[0,5,8,8,7,0],"height":[0,5,8,8,8,0],"angle":-5,"laser":{"damage":[10,10],"rate":4,"type":1,"speed":[180,180],"number":5,"angle":10,"error":0},"propeller":false,"texture":[3,3,10,3]},"cannon3":{"section_segments":6,"offset":{"x":10,"y":-35,"z":-15},"position":{"x":[0,0,0,0,0,0],"y":[-40,-50,-20,0,0,0],"z":[0,0,0,0,0,20]},"width":[0,5,8,8,7,0],"height":[0,5,8,8,8,0],"angle":-10,"laser":{"damage":[10,10],"rate":4,"type":1,"speed":[180,180],"number":5,"angle":10,"error":0},"propeller":false,"texture":[3,3,10,3]},"cockpit":{"section_segments":12,"offset":{"x":0,"y":-20,"z":23},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-70,-50,-30,-10,10,30,60,100,115],"z":[-7,-6,-3,0,0,0,0,0,0,3]},"width":[0,10,12,12,14,16,15,10,0],"height":[0,15,17,15,15,15,15,10,0],"texture":[9,9,9,3,4,10,63,3]},"side":{"section_segments":8,"offset":{"x":30,"y":30,"z":0},"position":{"x":[-2,0,0,0,0,0,0,0,0,0,0],"y":[-50,-45,-30,0,10,20,25,40,75,90,85],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,10,15,20,20,20,18,18,15,10,0],"height":[0,25,27,30,30,30,28,28,25,20,0],"texture":[3,4,63,3,4,4,63,11,12,17],"propeller":true},"propulsors2":{"section_segments":8,"offset":{"x":50,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-10,-15,-7.5,5,15,25,35,45,75,95,100],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,15,17.5,20,20,20,18,18,15,10,0],"height":[0,15,15,20,20,20,18,18,15,10,0],"texture":[11,63,4,3,11,63,2,10,63,4],"propeller":false},"propulsors3":{"section_segments":8,"offset":{"x":70,"y":30,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-10,-15,-10,0,10,20,25,40,75,90,85],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,15,15,20,20,20,18,18,15,10,0],"height":[0,15,15,20,20,20,18,18,15,10,0],"texture":[18,2,63,3,4,4,63,11,12,17],"propeller":true},"caps":{"section_segments":12,"offset":{"x":30,"y":50,"z":25},"position":{"x":[0,0,0,0,0,0,0],"y":[-60,-50,-30,0,20,40,50],"z":[0,0,0,0,0,0,0]},"width":[0,5,8,10,6,5,0],"height":[0,5,8,8,6,5,0],"angle":0,"propeller":false,"texture":[3,4,10,4,63,4]},"detail":{"section_segments":12,"offset":{"x":30,"y":-70,"z":5},"position":{"x":[-25,-20,-12,-8,-4,-5,-5],"y":[-70,-50,-20,0,20,60,60],"z":[-2,0,0,0,0,0,0]},"width":[0,5,8,10,10,5,0],"height":[0,5,8,10,10,10,0],"angle":0,"propeller":false,"texture":[4,4,63,10,4,4]}},"wings":{"front":{"doubleside":true,"offset":{"x":8,"y":-64,"z":-2},"length":[0,25,20],"width":[0,180,50,10],"angle":[-10,-10,-10],"position":[0,10,0,-20],"texture":[1,1,63],"bump":{"position":50,"size":10}},"wing1":{"offset":{"x":0,"y":60,"z":20},"length":[40,45],"width":[70,70,20],"angle":[0,30],"position":[0,0,30,50],"texture":[4,11],"doubleside":true,"bump":{"position":10,"size":5}},"wing3":{"offset":{"x":10,"y":60,"z":20},"length":[10,45],"width":[70,70,20],"angle":[60,50],"position":[0,0,30,50],"texture":[4,2],"doubleside":true,"bump":{"position":10,"size":5}},"wing2":{"offset":{"x":0,"y":60,"z":-5},"length":[40,55],"width":[70,70,20],"angle":[0,-10],"position":[0,0,30,50],"texture":[4,4],"doubleside":true,"bump":{"position":10,"size":5}}},"typespec":{"name":"Psychosis","level":7,"model":28,"code":728,"specs":{"shield":{"capacity":[420,420],"reload":[13,13]},"generator":{"capacity":[300,300],"reload":[120,120]},"ship":{"mass":425,"speed":[145,145],"rotation":[55,55],"acceleration":[100,100]}},"shape":[9.605,8.525,6.917,5.902,6.194,5.856,3.289,2.714,2.371,2.512,3.617,4.062,4.139,4.233,5.326,5.807,6.16,6.523,7.749,8.241,8.653,8.527,7.589,7.57,7.33,6.312,7.33,7.57,7.589,8.527,8.653,8.241,7.749,6.523,6.16,5.807,5.326,4.233,4.14,4.062,3.617,2.512,2.371,2.714,3.289,5.856,6.194,5.902,6.917,8.525],"lasers":[{"x":0,"y":-8.7,"z":-1.08,"angle":0,"damage":[51,51],"rate":2,"type":1,"speed":[200,200],"number":3,"spread":10,"error":0,"recoil":0},{"x":0.561,"y":-5.689,"z":-0.9,"angle":-5,"damage":[10,10],"rate":4,"type":1,"speed":[180,180],"number":5,"spread":10,"error":0,"recoil":0},{"x":-0.561,"y":-5.689,"z":-0.9,"angle":5,"damage":[10,10],"rate":4,"type":1,"speed":[180,180],"number":5,"spread":10,"error":0,"recoil":0},{"x":1.121,"y":-5.054,"z":-0.9,"angle":-10,"damage":[10,10],"rate":4,"type":1,"speed":[180,180],"number":5,"spread":10,"error":0,"recoil":0},{"x":-1.121,"y":-5.054,"z":-0.9,"angle":10,"damage":[10,10],"rate":4,"type":1,"speed":[180,180],"number":5,"spread":10,"error":0,"recoil":0}],"radius":9.605}}';
var Prototype_T2_709 = '{"name":"Prototype-T2","level":7,"model":29,"size":2.6,"specs":{"shield":{"capacity":[410,410],"reload":[15,15]},"generator":{"capacity":[215,215],"reload":[103,103]},"ship":{"mass":400,"speed":[145,145],"rotation":[65,65],"acceleration":[100,100]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":10,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-180,-160,-140,-120,-105,-80,-50,0,85,95,85],"z":[-12,-5,0,0,0,0,0,0,0,0,0]},"width":[9,13,16,19,23,25,30,30,25,20,0],"height":[0,5,10,15,18,20,25,30,25,20,0],"texture":[63,3,4,4,11,3,63,3,12,17],"propeller":true},"cannon":{"section_segments":8,"offset":{"x":0,"y":-95,"z":-18},"position":{"x":[0,0,0,0,0,0],"y":[-40,-50,-20,0,20,30],"z":[0,0,0,0,0,20]},"width":[0,5,8,11,7,0],"height":[0,5,8,11,10,0],"angle":0,"laser":{"damage":[122,122],"rate":2,"type":1,"speed":[170,170],"number":1,"angle":5,"error":0},"propeller":false,"texture":[6,4,10,3]},"cockpit":{"section_segments":12,"offset":{"x":0,"y":-20,"z":22},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-80,-60,-40,-15,10,30,60,100,115],"z":[-7,-6,-3,0,0,0,0,0,0,3]},"width":[2,12,15,15,18,18,18,13,0],"height":[0,12,15,13,13,13,13,10,0],"texture":[9,9,9,3,4,63,10,3]},"side":{"section_segments":8,"offset":{"x":30,"y":30,"z":0},"position":{"x":[-2,0,0,0,0,0,0,0,0,0,0],"y":[-60,-55,-30,-10,0,20,35,55,75,90,85],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,10,15,20,20,20,18,18,15,10,0],"height":[0,25,27,30,30,30,28,28,25,20,0],"texture":[3,4,10,3,63,4,11,63,12,17],"propeller":true},"side2":{"section_segments":10,"offset":{"x":40,"y":60,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[-85,-50,-30,0,20,40,50],"z":[0,0,0,0,0,0,0]},"width":[0,15,18,20,16,15,0],"height":[0,15,18,18,16,15,0],"angle":0,"propeller":false,"texture":[63,4,3,2,4,4]},"detail":{"section_segments":8,"offset":{"x":30,"y":-70,"z":5},"position":{"x":[-18,-12,-10,-8,-6,-5,-5],"y":[-80,-50,-20,0,20,60,60],"z":[-8,-2,0,0,0,0,0]},"width":[0,5,9,10,10,10,0],"height":[0,5,8,10,10,10,0],"angle":0,"propeller":false,"texture":[12,3,2,63,4,4]}},"wings":{"front":{"doubleside":true,"offset":{"x":8,"y":-85,"z":-2},"length":[19,13,19],"width":[100,140,50,10],"angle":[-10,-10,-30],"position":[0,-10,0,40],"texture":[63,4,63],"bump":{"position":50,"size":10}},"wing1":{"offset":{"x":25,"y":40,"z":0},"length":[75,20],"width":[15,10,2],"angle":[0,0],"position":[0,3,10,50],"texture":[4,3],"doubleside":true,"bump":{"position":50,"size":42}},"wing2":{"offset":{"x":25,"y":75,"z":0},"length":[75,20],"width":[55,45,42],"angle":[0,0],"position":[0,-5,-3,50],"texture":[63,3],"doubleside":true,"bump":{"position":-50,"size":10}}},"typespec":{"name":"Prototype-T2","level":7,"model":29,"code":729,"specs":{"shield":{"capacity":[410,410],"reload":[15,15]},"generator":{"capacity":[215,215],"reload":[103,103]},"ship":{"mass":400,"speed":[145,145],"rotation":[65,65],"acceleration":[100,100]}},"shape":[8.852,8.692,8.125,6.377,5.362,4.712,4.267,3.947,3.595,2.431,2.439,2.501,2.607,2.768,2.943,6.163,7.114,7.711,7.895,7.034,6.416,6.006,6.578,6.561,6.352,5.471,6.352,6.561,6.578,6.006,6.416,7.034,7.895,7.711,7.114,6.163,2.943,2.768,2.607,2.501,2.439,2.431,3.595,3.947,4.267,4.712,5.362,6.377,8.125,8.692],"lasers":[{"x":0,"y":-7.54,"z":-0.936,"angle":0,"damage":[122,122],"rate":2,"type":1,"speed":[170,170],"number":1,"spread":5,"error":0,"recoil":0}],"radius":8.852}}';
var Objective_710 = '{"name":"Objective","level":7,"model":30,"size":3.5,"specs":{"shield":{"capacity":[290,290],"reload":[18,18]},"generator":{"capacity":[315,315],"reload":[88,88]},"ship":{"mass":300,"speed":[130,130],"rotation":[90,90],"acceleration":[80,80]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":-25,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-52,-52,-55,-45,-32,0,50,100,90],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,2,5,10,15,22,28,15,0],"height":[0,2,5,10,15,20,15,10,0],"texture":[5,17,4,3,63,11,10,12],"propeller":true,"laser":{"damage":[16,16],"rate":5,"type":2,"speed":[200,200],"number":1,"error":0}},"cockpit":{"section_segments":10,"offset":{"x":0,"y":-20,"z":7},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-40,-20,0,10,15,40,90],"z":[0,0,0,0,0,0,0]},"width":[0,6,10,10,12,12,0],"height":[0,15,20,20,20,15,0],"texture":[4,9,9,4,63,4],"propeller":false},"side_cannons":{"section_segments":8,"offset":{"x":35,"y":-20,"z":0},"position":{"x":[-12,-12,-12,-7,-3,-2,-1,0,0,0,0,0],"y":[-30,-30,-40,-20,0,10,20,36,50,60,70,60],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,1.2,5,10,10,10,10,10,10,10,5,0],"height":[0,1.2,5,10,10,10,10,10,10,10,10,0],"texture":[5,17,4,63,1,2,11,63,1,1,12],"laser":{"damage":[53,53],"rate":1,"type":2,"speed":[150,150],"number":1,"error":0}},"side_propulsors2":{"section_segments":12,"offset":{"x":20,"y":45,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-60,-45,-25,-5,10,20,25,40,30],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,10,15,13,10,11,11,8,0],"height":[0,10,15,15,10,10,10,8,0],"texture":[4,63,10,1,4,63,4,12],"propeller":true},"deco":{"section_segments":8,"offset":{"x":42,"y":-5,"z":0},"position":{"x":[-15,-15,-8,0,0,0,5,-10,-10],"y":[-110,-85,-58,-30,0,20,55,100,90],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,5,10,15,15,15,18,10,0],"height":[0,8,13,18,20,22,20,8,0],"texture":[6,6,4,63,3,11,4,12],"angle":0,"propeller":true},"wingends":{"section_segments":8,"offset":{"x":42,"y":-45,"z":0},"position":{"x":[0,2,4,2,0,0],"y":[-30,-15,0,10,20,15],"z":[0,0,0,0,0,0]},"width":[0,3,6,3,4,0],"height":[0,5,9,12,5,0],"texture":[6,6,4,4,6],"angle":-25}},"typespec":{"name":"Objective","level":7,"model":30,"code":730,"specs":{"shield":{"capacity":[290,290],"reload":[18,18]},"generator":{"capacity":[315,315],"reload":[88,88]},"ship":{"mass":300,"speed":[130,130],"rotation":[90,90],"acceleration":[80,80]}},"shape":[5.611,5.604,8.269,7.011,6.086,6.339,5.907,4.99,4.739,4.545,4.287,4.119,4.021,4.022,4.119,4.424,4.888,5.549,5.87,6.143,6.543,7.117,7.271,6.991,6.057,5.26,6.057,6.991,7.271,7.117,6.543,6.143,5.87,5.549,4.888,4.424,4.119,4.022,4.021,4.119,4.287,4.545,4.739,4.99,5.907,6.339,6.086,7.011,8.269,5.604],"lasers":[{"x":0,"y":-5.6,"z":0,"angle":0,"damage":[16,16],"rate":5,"type":2,"speed":[200,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":1.61,"y":-4.2,"z":0,"angle":0,"damage":[53,53],"rate":1,"type":2,"speed":[150,150],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.61,"y":-4.2,"z":0,"angle":0,"damage":[53,53],"rate":1,"type":2,"speed":[150,150],"number":1,"spread":0,"error":0,"recoil":0}],"radius":8.269}}';
 
var Bomb_798 = '{"name":"Bomb","level":7.9,"model":8,"size":1.05,"teamMarkerSize":0,"specs":{"shield":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"generator":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"ship":{"mass":1e+300,"speed":[800,800],"rotation":[1e+300,1e+300],"acceleration":[1e+300,1e+300]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":0,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-65,-60,-50,-20,10,30,55,75,60],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,8,10,30,25,30,18,15,0],"height":[0,6,8,12,20,20,18,15,0],"propeller":true,"texture":[4,63,10,1,1,1,12,17]},"cockpit":{"section_segments":12,"offset":{"x":0,"y":0,"z":20},"position":{"x":[0,0,0,0,0,0,0],"y":[-15,0,20,30,60],"z":[0,0,0,0,0]},"width":[0,13,17,10,5],"height":[0,18,25,18,5],"propeller":false,"texture":[7,9,9,4,4]},"cannon":{"section_segments":6,"offset":{"x":0,"y":-15,"z":-10},"position":{"x":[0,0,0,0,0,0],"y":[-40,-50,-20,0,20,30],"z":[0,0,0,0,0,20]},"width":[0,5,8,11,7,0],"height":[0,5,8,11,10,0],"angle":0,"laser":{"damage":[10000000000000000000,10000000000000000000],"rate":2,"type":1,"speed":[160,180],"number":360,"angle":360},"propeller":false,"texture":[3,3,10,3]}},"wings":{"main":{"length":[60,20],"width":[100,50,40],"angle":[-10,10],"position":[0,20,10],"doubleside":true,"offset":{"x":0,"y":10,"z":5},"bump":{"position":30,"size":20},"texture":[11,63]}},"typespec":{"name":"Bomb","level":7.9,"model":8,"code":798,"specs":{"shield":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"generator":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"ship":{"mass":1e+300,"speed":[800,800],"rotation":[1e+300,1e+300],"acceleration":[1e+300,1e+300]}},"shape":[1.368,1.368,1.093,0.965,0.883,0.827,0.791,0.767,0.758,0.777,0.847,0.951,1.092,1.667,1.707,1.776,1.856,1.827,1.744,1.687,1.525,1.415,1.335,1.606,1.603,1.578,1.603,1.606,1.335,1.415,1.525,1.687,1.744,1.827,1.856,1.776,1.707,1.667,1.654,0.951,0.847,0.777,0.758,0.767,0.791,0.827,0.883,0.965,1.093,1.368],"lasers":[{"x":0,"y":-1.365,"z":-0.21,"angle":0,"damage":[10000000000000000000,10000000000000000000],"rate":2,"type":1,"speed":[160,180],"number":360,"spread":360,"error":0,"recoil":0}],"radius":1.856}}';
var Harpy_799 = '{"name":"Harpy","level":7.9,"model":9,"size":2.26,"specs":{"shield":{"capacity":[350,350],"reload":[25,25]},"generator":{"capacity":[425,425],"reload":[150,150]},"ship":{"mass":300,"speed":[130,130],"rotation":[125,125],"acceleration":[115,115]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-75,-75,-70,-55,-20,-10,7,30,50,60,80,87,90,80],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,2,6,12,17,17,26,26,20,16,13,12,10,0],"height":[0,2,4,10,12,12,14,14,12,10,7,6,4,0],"propeller":true,"texture":[63,63,63,3.9,8,63,8,18,63,11,15,16.9]},"detail2":{"section_segments":6,"offset":{"x":0,"y":-5,"z":9},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-25,-10,4,20,22,27,33,33],"z":[0,0,0,0,0,0,3,3]},"width":[3,4,10,12,12,12,6,0],"height":[2,4,8,10,10,10,4,0],"propeller":false,"texture":[17,9,9,63,15,3.9]},"detail3":{"section_segments":6,"offset":{"x":0,"y":-36,"z":7},"position":{"x":[0,0,0,0,0],"y":[-19,-19,-13,13,13],"z":[0,0,-2,0,0]},"width":[0,4,8,8,0],"height":[0,3,6,6,0],"propeller":false,"texture":[0.9,0.9,10.245,0.9]},"detail4":{"section_segments":6,"offset":{"x":0,"y":-20,"z":0},"position":{"x":[15,15,15,15,15,15,15,15,15,15],"y":[-40,-50,-47,-45,-5,0,3,20,25,25],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,2,3,3.2,4,6,6,6,4,0],"height":[0,2,3,3.2,4,6,6,6,4,0],"angle":0,"laser":{"damage":[8,8],"rate":8,"type":1,"speed":[230,230],"number":1,"error":0},"propeller":false,"texture":[2.9,63,0.9,8.2,63,3.9,12.9]},"detail5":{"section_segments":6,"offset":{"x":58,"y":20,"z":5},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-35,-40,-35,-33,-18,-20,0,20,24,28,30,22],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,2,3,2,2,8,12,12,10,10,8,0],"height":[0,2,3,2,2,8,12,12,8,8,6,0],"angle":0,"laser":{"damage":[8,8],"rate":8,"type":1,"speed":[230,230],"number":1,"error":0},"propeller":true,"texture":[1,1,63,3.9,3.9,10.245,12,3.9,16.9,63,16.9]},"detail6":{"section_segments":[45,135,225,315],"offset":{"x":55,"y":5,"z":-30},"position":{"x":[0,0,0,0,0],"y":[-5,-5,15,17,17],"z":[0,0,0,0,0]},"width":[0,3,3,2,0],"height":[0,15,15,13,0],"texture":[63,17,63],"angle":90,"vertical":true},"detail7":{"section_segments":4,"offset":{"x":-58.5,"y":20,"z":12},"position":{"x":[-8.5,0,-10],"y":[-10,0,20],"z":[-1.5,-0.2,-0.2]},"width":[0,10,0],"height":[0,6,0],"texture":[4]},"detail8":{"section_segments":4,"offset":{"x":57.5,"y":20,"z":12},"position":{"x":[-8.5,0,-10],"y":[-10,0,20],"z":[-1.5,-0.2,-0.2]},"width":[0,10,0],"height":[0,6,0],"texture":[4]},"detail9":{"section_segments":[45,135,225,315],"offset":{"x":53,"y":2,"z":5},"position":{"x":[1,1,0,0,0],"y":[-10,-10,-4,20,20],"z":[0,0,0,0,0]},"width":[0,1,2,2,0],"height":[0,2,2,2,0],"texture":[63]},"detail10":{"section_segments":[45,135,225,315],"offset":{"x":63,"y":2,"z":5},"position":{"x":[-1,-1,0,0,0],"y":[-10,-10,-4,20,20],"z":[0,0,0,0,0]},"width":[0,1,2,2,0],"height":[0,2,2,2,0],"texture":[63]},"detail11":{"section_segments":10,"offset":{"x":58,"y":-7,"z":5},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[5,6,4,3,5],"height":[5,6,4,3,5],"texture":[17,4]},"detail12":{"section_segments":10,"offset":{"x":58,"y":5,"z":-34},"position":{"x":[0,0,0,0,0,0],"y":[7,13,12,14,14],"z":[0,0,0,0,0,0]},"width":[6,5,4,2,0],"height":[6,5,4,2,0],"texture":[4,17,8,4],"vertical":true},"detail13":{"section_segments":[45,135,225,315],"offset":{"x":-61,"y":5,"z":-30},"position":{"x":[0,0,0,0,0],"y":[-5,-5,15,17,17],"z":[0,0,0,0,0]},"width":[0,3,3,2,0],"height":[0,15,15,13,0],"texture":[63,17,63],"angle":90,"vertical":true},"detail14":{"section_segments":[0,60,120,180],"offset":{"x":-6,"y":5,"z":4},"position":{"x":[3.1,3.1,0,0,0,0,-8,-8],"y":[-28,-28,0,2,18,20,35,35],"z":[4.1,4.1,0,0,0,0,3,3]},"width":[0,5,15,15,15,15,5,0],"height":[0,3.8,14,14,14,14,3,0],"texture":[1,1,63,10,63,1]},"detail15":{"section_segments":6,"offset":{"x":0,"y":-20,"z":0},"position":{"x":[-15,-15,-15,-15,-15,-15,-15,-15,-15,-15],"y":[-40,-50,-47,-45,-5,0,3,20,25,25],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,2,3,3.2,4,6,6,6,4,0],"height":[0,2,3,3.2,4,6,6,6,4,0],"angle":0,"laser":{"damage":[8,8],"rate":8,"type":1,"speed":[230,230],"number":1,"error":0},"propeller":false,"texture":[2.9,63,0.9,8.2,63,3.9,12.9]},"detail16":{"section_segments":6,"offset":{"x":13,"y":21,"z":7},"position":{"x":[0,0,0,0,0,0],"y":[-2,0.7,2,2,-2,-2],"z":[0,0,0,0,0,0]},"width":[10,10,10,8,8,10],"height":[10,10,10,8,8,10],"texture":[3.9,63,3.9]},"detail17":{"section_segments":6,"offset":{"x":13,"y":9,"z":7},"position":{"x":[0,0,0,0,0,0],"y":[-2,0.7,2,2,-2,-2],"z":[0,0,0,0,0,0]},"width":[10,10,10,8,8,10],"height":[10,10,10,8,8,10],"texture":[3.9,63,3.9]},"detail18":{"section_segments":6,"offset":{"x":13,"y":15,"z":7},"position":{"x":[0,0,0,0,0,0],"y":[-2,0.7,2,2,-2,-2],"z":[0,0,0,0,0,0]},"width":[10,10,10,8,8,10],"height":[10,10,10,8,8,10],"texture":[3.9,63,3.9]},"detail19":{"section_segments":6,"offset":{"x":0,"y":-20,"z":0},"position":{"x":[15,15,15,15,15,15,15,15,15,15],"y":[-40,-50,-47,-45,-5,0,3,20,25,25],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,2,3,3.2,4,6,6,6,4,0],"height":[0,2,3,3.2,4,6,6,6,4,0],"angle":0,"laser":{"damage":[0.7,0.7],"rate":10,"type":1,"speed":[250,250],"number":1,"error":0},"propeller":false,"texture":[2.9,63,0.9,8.2,63,3.9,12.9]},"detail20":{"section_segments":6,"offset":{"x":0,"y":-20,"z":0},"position":{"x":[-15,-15,-15,-15,-15,-15,-15,-15,-15,-15],"y":[-40,-50,-47,-45,-5,0,3,20,25,25],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,2,3,3.2,4,6,6,6,4,0],"height":[0,2,3,3.2,4,6,6,6,4,0],"angle":0,"laser":{"damage":[0.7,0.7],"rate":10,"type":1,"speed":[250,250],"number":1,"error":0},"propeller":false,"texture":[2.9,63,0.9,8.2,63,3.9,12.9]}},"wings":{"detail":{"length":[60],"width":[60,15],"angle":[10],"position":[0,-20],"doubleside":true,"offset":{"x":0,"y":37,"z":-5},"bump":{"position":-37,"size":14},"texture":[4]},"detail2":{"length":[30],"width":[50,0],"angle":[45],"position":[0,45],"doubleside":true,"offset":{"x":0,"y":50,"z":0},"bump":{"position":45,"size":17},"texture":[63]},"detail3":{"length":[30],"width":[50,0],"angle":[-45],"position":[0,45],"doubleside":true,"offset":{"x":0,"y":50,"z":0},"bump":{"position":45,"size":17},"texture":[63]},"detail4":{"length":[40,0],"width":[40,15,0],"angle":[6,0],"position":[0,-12.5,-12.5],"doubleside":true,"offset":{"x":0,"y":34.5,"z":0},"bump":{"position":-45,"size":14},"texture":[17,63]},"detail5":{"length":[40,0],"width":[40,15,0],"angle":[6,0],"position":[0,-12.5,-12.5],"doubleside":true,"offset":{"x":0,"y":35.5,"z":0},"bump":{"position":-45,"size":14},"texture":[63]},"detail6":{"length":[10,1,5,0,-3,0],"width":[0,45,37,20,15,17,0],"angle":[90,90,90,90,90,90],"position":[0,0,0,-0.5,0,6,0],"doubleside":true,"offset":{"x":0,"y":53,"z":4},"bump":{"position":14,"size":28},"texture":[4,4,1,63,17,15]},"detail7":{"length":[60],"width":[60,15],"angle":[10],"position":[0,-20],"doubleside":true,"offset":{"x":0,"y":36,"z":-5},"bump":{"position":-37,"size":13},"texture":[1]}},"typespec":{"name":"Harpy","level":7.9,"model":9,"code":799,"specs":{"shield":{"capacity":[350,350],"reload":[25,25]},"generator":{"capacity":[425,425],"reload":[150,150]},"ship":{"mass":300,"speed":[130,130],"rotation":[125,125],"acceleration":[115,115]}},"shape":[3.391,3.221,3.253,2.615,1.929,1.537,1.355,1.252,1.127,1.041,2.847,2.87,2.913,3.022,3.177,3.499,3.705,3.713,3.711,3.301,2.462,2.5,2.58,4.4,4.205,4.076,4.205,4.4,2.58,2.5,2.462,3.301,3.711,3.713,3.705,3.499,3.177,3.022,2.935,2.87,2.847,1.041,1.127,1.252,1.355,1.537,1.929,2.615,3.253,3.221],"lasers":[{"x":0.678,"y":-3.164,"z":0,"angle":0,"damage":[8,8],"rate":8,"type":1,"speed":[230,230],"number":1,"spread":0,"error":0,"recoil":0},{"x":2.622,"y":-0.904,"z":0.226,"angle":0,"damage":[8,8],"rate":8,"type":1,"speed":[230,230],"number":1,"spread":0,"error":0,"recoil":0},{"x":-2.622,"y":-0.904,"z":0.226,"angle":0,"damage":[8,8],"rate":8,"type":1,"speed":[230,230],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.678,"y":-3.164,"z":0,"angle":0,"damage":[8,8],"rate":8,"type":1,"speed":[230,230],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.678,"y":-3.164,"z":0,"angle":0,"damage":[0.7,0.7],"rate":10,"type":1,"speed":[250,250],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.678,"y":-3.164,"z":0,"angle":0,"damage":[0.7,0.7],"rate":10,"type":1,"speed":[250,250],"number":1,"spread":0,"error":0,"recoil":0}],"radius":4.4}}';

var ships = [];
 
ships.push(Spiral_301);
ships.push(Shadow_X_1_302);
ships.push(Swept_Wing_303);
ships.push(Penetrator_304);

ships.push(Wolverine_401);
ships.push(Boomerang_402);
ships.push(Shuriken_403);
ships.push(Robin_404);
ships.push(Optimus_405);
ships.push(Prototype_T1_406);
ships.push(Centauri_Warrior_407);
ships.push(Outrider_408);

ships.push(Pursuer_501);
ships.push(Heratic_502);
ships.push(Quicksilver_503);
ships.push(Zeist_504);
ships.push(Rigel_505);
ships.push(Skater_506);
ships.push(D_Wing_507);
ships.push(Viper_508);
ships.push(Shadow_X_2_509);
ships.push(Super_Speedster_510);
ships.push(Phoenix_511);
ships.push(Vitrum_512);
ships.push(Vengar_513);
ships.push(Zarion_514);
ships.push(Mantis_515);
ships.push(Pest_516);

ships.push(Star_Drive_601);
ships.push(Solaris_602);
ships.push(Luna_603);
ships.push(Mercenary_604);
ships.push(Victory_605);
ships.push(Space_Dragster_606);
ships.push(Judgement_607);
ships.push(Typhoon_608);
ships.push(Prophet_609);
ships.push(Arcane_610);
ships.push(Disruptor_611);
ships.push(Bolt_612);
ships.push(Hallier_613);
ships.push(Topaz_614);
ships.push(Contraband_615);
ships.push(Battalion_616);
ships.push(Calamity_617);
ships.push(Armada_618);
ships.push(A_Speedster_6619);
ships.push(Eagle_620);
ships.push(Duality_621);
ships.push(Wasp_622);
ships.push(Trinity_623);
ships.push(Crux_624);

ships.push(Bayonet_701);
ships.push(Shadow_X_3_702);
ships.push(Saturnia_703);
ships.push(Huxian_704);
ships.push(Seeker_705);
ships.push(Parate_706);
ships.push(Turbo_707);
ships.push(Psychosis_708);
ships.push(Prototype_T2_709);
ships.push(Objective_710);

ships.push(Bomb_798);
ships.push(Harpy_799);
var ships_list = [
  
  ["Spiral","Shadow_X_1","Swept_Wing","Penetrator"],
  ["Wolverine","Boomerang","Shuriken","Robin","Optimus","Prototype_T1","Centauri_Warrior","Outrider"],
  ["Pursuer","Heratic","Quicksilver","Zeist","Rigel","Skater","D_Wing","Viper","Shadow_X_2","Super_Speedster","Phoenix","Vitrum","Vengar","Zarion","Mantis","Pest"],
  ["Star_Drive","Solaris","Luna","Mercenary","Victory","Space_Dragster","Judgement","Typhoon","Prophet","Arcane","Disruptor","Bolt","Hallier","Topaz","Contraband","Battalion","Calamity","Armada","A_Speedster","Eagle","Duality","Wasp","Trinity","Crux"],
  ["Bayonet","Shadow_X_3","Saturnia","Huxian","Seeker","Parate","Turbo","Psychosis","Prototype_T2","Objective"]
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
