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

var Pegasus_301 = '{"name":"Pegasus","level":3,"model":1,"size":1.8,"specs":{"shield":{"capacity":[150,225],"reload":[4,6]},"generator":{"capacity":[90,125],"reload":[30,45]},"ship":{"mass":170,"speed":[100,110],"rotation":[35,55],"acceleration":[50,80]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":-10,"z":0},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-60,-60,-50,-40,-15,0,35,35],"z":[0,0,0,0,0,0,0,0]},"width":[0,4,15,17,17,25,25,0],"height":[0,4,10,15,15,20,20,0],"texture":[3.9,3.9,4,10.245,63,10,1.9]},"detail2":{"section_segments":6,"offset":{"x":0,"y":-18,"z":11},"position":{"x":[0,0,0,0,0,0],"y":[-10,-10,0,25,35,35],"z":[0,0,0,0,0,0]},"width":[0,6,12,12,12,0],"height":[0,4,10,12,12,0],"texture":[7,9,9,3.9],"propeller":false},"detail3":{"section_segments":6,"offset":{"x":62,"y":30,"z":-3},"position":{"x":[-4,-4,-1,0,0,0,-2,-2,-2],"y":[-45,-45,-30,-5,0,5,30,33,10],"z":[0,0,0,0,0,0,0,0]},"width":[0,2,8,10,14,12,8,6,0],"height":[0,1,5,8,10,8,4,3,0],"texture":[63,63,10.245,63,63,8,3.9,16.9],"propeller":true},"detail4":{"section_segments":6,"offset":{"x":38,"y":20,"z":-2},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-40,-45,-35,-10,0,28,32,32],"z":[0,0,0,0,0,0,0,0]},"width":[0,1.5,3,3,6,6,3,0],"height":[0,1.5,3,3,6,6,3,0],"texture":[1.9,16.9,12.9,3.9],"propeller":false,"angle":0,"laser":{"damage":[4,8],"rate":4,"type":1,"speed":[125,160],"number":1,"error":0}},"detail5":{"section_segments":6,"offset":{"x":0,"y":-40,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-35,-40,-35,-10,0,18],"z":[0,0,0,0,0,0]},"width":[0,1.5,3,3,2,0],"height":[0,1.5,3,3,2,0],"texture":[1.9,1,18],"propeller":false,"angle":0,"laser":{"damage":[28,42],"rate":1,"type":2,"speed":[175,225],"number":1,"error":0}},"detail6":{"section_segments":[0,60,120,180],"offset":{"x":1,"y":50,"z":0},"position":{"x":[-1,-1,-6,-4,-4],"y":[-25,-25,-3,15,15],"z":[0,0,0,5,5]},"width":[0,25,15,7,0],"height":[0,20,15,3,0],"texture":[11,11,63]},"detail7":{"section_segments":6,"offset":{"x":0,"y":41,"z":-7},"position":{"x":[0,0,0,0,0,0,0],"y":[-25,-25,3,20,30,20],"z":[0,0,0,0,0,0,0]},"width":[0,10,16,16,8,8,0],"height":[0,10,10,10,6,0],"texture":[3.9,16.9,12.9,3.9,16.9],"propeller":true},"detail8":{"section_segments":[0,60,120,180],"offset":{"x":61.7,"y":30,"z":-3},"position":{"x":[-4,-4,-1,0,0,0,0],"y":[-45,-45,-30,-5,0,5,5],"z":[0,0,0,0,0,0,0]},"width":[0,2.5,8.5,10.5,14.5,12.5,0],"height":[0,1.5,5.5,8.5,10.5,8.5,0],"texture":[3.9,3.9,15,3.9]},"detail19":{"section_segments":6,"offset":{"x":61.5,"y":-6,"z":-30},"position":{"x":[0,0,0,0,0,0],"y":[7,13,12,14,14],"z":[0,0,0,0,0,0]},"width":[9,7,5,2,0],"height":[9,7,5,2,0],"texture":[3.9,16.9,0.9,0.9],"vertical":true},"detail20":{"section_segments":4,"offset":{"x":62,"y":44,"z":1.5},"position":{"x":[0,0,5],"y":[-10,-10,15],"z":[-0.2,-0.2,-2]},"width":[0,10.5,0],"height":[0,4,0],"texture":[1]},"detail10":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":12,"z":-25},"position":{"x":[0,0,0,0,0,0,0],"y":[-15,-15,-5,11,11,9,9],"z":[0,0,0,0,0,0,0]},"width":[0,40,40,15,12,12,0],"height":[0,15,15,15,12,12,0],"texture":[4,4,8,63,4,4],"vertical":true},"detail11":{"section_segments":10,"offset":{"x":0,"y":10,"z":-25},"position":{"x":[0,0,0,0,0,0],"y":[7,13,12,14,14],"z":[0,0,0,0,0,0]},"width":[10,7,5,3,0],"height":[10,7,5,3,0],"texture":[4,17,8,4],"vertical":true},"detail12":{"section_segments":[0,60,120,180],"offset":{"x":-7,"y":20,"z":5},"position":{"x":[5,5,1,1,-9,-9],"y":[-60,-60,-32,0,5,5],"z":[5,5,0,0,-2,-2]},"width":[0,5,13,13,5,0],"height":[0,5,16,16,5,0],"texture":[16.9,3.9,12,1]}},"wings":{"detail":{"doubleside":true,"length":[40,25],"width":[50,30,20],"angle":[-10,20],"position":[20,35,25],"texture":[63,2],"bump":{"position":30,"size":15},"offset":{"x":0,"y":-4,"z":0}},"detail2":{"doubleside":true,"length":[18],"width":[30,10],"angle":[0,0],"position":[0,20],"texture":[63],"bump":{"position":30,"size":15},"offset":{"x":5,"y":-50,"z":0}}},"typespec":{"name":"Pegasus","level":3,"model":1,"code":301,"specs":{"shield":{"capacity":[150,225],"reload":[4,6]},"generator":{"capacity":[90,125],"reload":[30,45]},"ship":{"mass":170,"speed":[100,110],"rotation":[35,55],"acceleration":[50,80]}},"shape":[2.72,2.351,2.122,1.694,1.542,1.434,1.227,0.855,1.584,1.54,2.051,2.177,2.307,2.359,2.451,2.688,2.772,2.9,3.072,3.082,2.243,1.788,1.797,2.198,2.425,2.419,2.425,2.198,1.797,1.788,2.243,3.082,3.072,2.9,2.772,2.688,2.451,2.359,2.31,2.177,2.051,1.54,1.584,0.855,1.227,1.434,1.542,1.694,2.122,2.351],"lasers":[{"x":1.292,"y":-0.85,"z":-0.068,"angle":0,"damage":[4,8],"rate":4,"type":1,"speed":[125,160],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.292,"y":-0.85,"z":-0.068,"angle":0,"damage":[4,8],"rate":4,"type":1,"speed":[125,160],"number":1,"spread":0,"error":0,"recoil":0},{"x":0,"y":-2.72,"z":0,"angle":0,"damage":[28,42],"rate":1,"type":2,"speed":[175,225],"number":1,"spread":0,"error":0,"recoil":0}],"radius":3.082}}';
var Angel_Wing_302 = '{"name":"Angel Wing","level":3,"model":2,"size":1.7,"specs":{"shield":{"capacity":[125,200],"reload":[3,5]},"generator":{"capacity":[100,150],"reload":[35,50]},"ship":{"mass":150,"speed":[120,135],"rotation":[65,90],"acceleration":[100,120]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":-25,"z":-5},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-55,-55,-53,-43,0,4,55,60],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,7,11,20,20,25,25,0],"height":[0,4,7,16,16,18,14,0],"propeller":false,"texture":[63,16.9,3.9,10,3.9,63,63]},"detail2":{"section_segments":6,"offset":{"x":0,"y":-47.5,"z":7},"position":{"x":[0,0,0,0,0,0,0],"y":[-17,-17,-12,12,17,17],"z":[0,0,0,0,0,0,0]},"width":[0,7,11,11,7,0],"height":[0,7,10,10,7,0],"propeller":false,"texture":[7,9,9,9,7]},"detail3":{"section_segments":6,"offset":{"x":38,"y":15,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-53,-50,-43,-38,10,12],"z":[0,0,0,0,0,0,0]},"width":[0,4,7,7,7,7,0],"height":[0,4,7,7,7,7,0],"angle":0,"laser":{"damage":[5,9],"rate":6.5,"type":1,"speed":[175,210],"number":1,"error":0},"propeller":false,"texture":[63,0.9,3.9,63,12.9,1.9]},"detail4":{"section_segments":6,"offset":{"x":15,"y":55,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-15,-13,-2,15,20,10],"z":[0,0,0,0,0,0]},"width":[0,10,16,16,12,0],"height":[0,10,16,16,12,0],"texture":[3.9,3.9,12.9,3.9,16.9],"propeller":true},"detail5":{"section_segments":[0,60,120,180],"offset":{"x":-37,"y":-3,"z":1},"position":{"x":[0,0,0,0],"y":[-20,-20,20,20],"z":[0,0,0,0]},"width":[0,7,7,0],"height":[0,7,7,0],"angle":180,"propeller":false,"texture":[3.9,16.9,3.9]},"detail6":{"section_segments":6,"offset":{"x":0,"y":7,"z":-9},"position":{"x":[0,0,0,0,0,0],"y":[7,13,12,14,14],"z":[0,0,0,0,0,0]},"width":[11,9,7,4,0],"height":[11,9,7,4,0],"texture":[3.9,16.9,0.9,0.9],"vertical":true},"detail7":{"section_segments":5,"offset":{"x":0,"y":13,"z":-50},"position":{"x":[0,0,0,0,0,0],"y":[-15,-5,0,5,2,2],"z":[0,0,0,0,0,0]},"width":[5,5,11,5,2,0],"height":[7,7,15,9,6,0],"texture":[0.85,0.85,0.85,16.84,63],"vertical":true},"detail8":{"section_segments":6,"offset":{"x":0,"y":-47.5,"z":3},"position":{"x":[0,0,0,0,0],"y":[-30,-30,-20,25,25],"z":[-3,-3,0,0,0]},"width":[0,5,10,10],"height":[0,3,10,10,0],"texture":[63,63,15,3.9]}},"wings":{"detail":{"length":[7,30,20,8],"width":[46,57,57,15,10],"angle":[0,0,-1,-8],"position":[18,13,13,37,48],"doubleside":true,"offset":{"x":0,"y":-4,"z":12},"bump":{"position":0,"size":10},"texture":[4,8,1,1]},"detail2":{"length":[13,35],"width":[70,70,10],"angle":[0,-4],"position":[40,40,86],"doubleside":true,"bump":{"position":-20,"size":17},"texture":[11,4],"offset":{"x":0,"y":-11,"z":0}},"detail3":{"length":[13,35],"width":[70,70,10],"angle":[0,-5],"position":[40,40,90],"doubleside":true,"bump":{"position":-20,"size":17},"texture":[11,17,4],"offset":{"x":0,"y":-16,"z":0}},"detail4":{"doubleside":true,"offset":{"x":15,"y":27,"z":1},"length":[0,33],"width":[0,55,0],"angle":[0,35],"position":[0,0,46],"texture":[63],"bump":{"position":20,"size":20}},"detail5":{"doubleside":true,"offset":{"x":63,"y":37,"z":9.8},"length":[-1,14],"width":[0,28,5],"angle":[0,-1],"position":[0,0,21],"texture":[63],"bump":{"position":20,"size":22}},"detail6":{"length":[7,30,32],"width":[6,6,6,6],"angle":[0,0,-13],"position":[18,13,13,52],"doubleside":true,"offset":{"x":0,"y":-4,"z":18},"bump":{"position":0,"size":15},"texture":[18]},"detail7":{"length":[7,30,20,8],"width":[46,57,57,15,10],"angle":[0,0,-1,-8],"position":[18,13,13,37,48],"doubleside":true,"offset":{"x":0,"y":-3,"z":12},"bump":{"position":0,"size":10},"texture":[4,8,11,1]}},"typespec":{"name":"Angel Wing","level":3,"model":2,"code":302,"specs":{"shield":{"capacity":[125,200],"reload":[3,5]},"generator":{"capacity":[100,150],"reload":[35,50]},"ship":{"mass":150,"speed":[120,135],"rotation":[65,90],"acceleration":[100,120]}},"shape":[2.725,2.728,2.506,1.894,1.377,1.095,1.887,1.913,1.851,1.709,1.609,1.544,1.55,1.65,1.802,2.29,2.642,3.179,3.303,1.99,3.04,3.171,2.776,2.681,2.596,2.555,2.596,2.681,2.776,3.171,3.04,1.99,3.303,3.179,2.642,2.29,1.802,1.65,1.55,1.544,1.609,1.709,1.851,1.913,1.887,1.095,1.377,1.894,2.506,2.728],"lasers":[{"x":1.292,"y":-1.292,"z":0,"angle":0,"damage":[5,9],"rate":6.5,"type":1,"speed":[175,210],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.292,"y":-1.292,"z":0,"angle":0,"damage":[5,9],"rate":6.5,"type":1,"speed":[175,210],"number":1,"spread":0,"error":0,"recoil":0}],"radius":3.303}}';
var Cayman_303 = '{"name":"Cayman","level":3,"model":3,"size":1.75,"specs":{"shield":{"capacity":[150,225],"reload":[4,6]},"generator":{"capacity":[100,135],"reload":[33,43]},"ship":{"mass":200,"speed":[75,90],"rotation":[65,80],"acceleration":[80,100]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":0,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-80,-80,-75,-60,-55,-40,0,10,75,80,75],"z":[-10,-10,-10,-10,-10,-10,-10,-5,0,0,0]},"width":[0,2,5,10,12,22,22,22,20,15,0],"height":[0,2,5,10,11,13,15,15,16,15,0],"texture":[3.9,16.9,8.2,3.9,3.9,10,0.9,3.9,63,16.9],"propeller":true,"laser":{"damage":[13,18],"rate":3,"type":1,"speed":[160,190],"number":1,"error":0}},"detail2":{"section_segments":6,"offset":{"x":0,"y":-20,"z":7},"position":{"x":[0,0,0,0,0,0,0],"y":[-20,-20,-10,13,20,20],"z":[-5,0,0,0,0,0]},"width":[0,9,12,12,9,0],"height":[0,10,13,13,10,0],"texture":[7,9,9,4],"propeller":false},"detail3":{"section_segments":5,"offset":{"x":0,"y":35,"z":-15},"position":{"x":[71,70,75,75,72,72],"y":[-33,-30,0,10,40,30],"z":[0,0,0,0,0,0,0]},"width":[0,2,9,10,7,0],"height":[0,3,15,17,8,0],"texture":[3.85,3.85,3.85,3.85,16.85],"propeller":true},"detail4":{"section_segments":5,"offset":{"x":0,"y":35,"z":-15},"position":{"x":[-71,-70,-75,-75,-72,-72],"y":[-30,-30,0,10,40,30],"z":[0,0,0,0,0,0,0]},"width":[0,2,9,10,7,0],"height":[0,3,15,17,8,0],"texture":[3.85,3.85,3.85,3.85,16.85],"propeller":true},"detail5":{"section_segments":6,"offset":{"x":20,"y":-5,"z":-5},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-50,-50,-45,-20,-10,0,10,10],"z":[0,0,0,0,0,0,0,0]},"width":[0,2,4,4,6,6,3,0],"height":[0,2,5,5,9,9,5,0],"angle":-5,"laser":{"damage":[8,11],"rate":1.5,"type":1,"speed":[145,175],"number":1,"error":0},"propeller":false,"texture":[3.9,16.9,3.9,3.9,3.9]},"detail6":{"section_segments":6,"offset":{"x":1,"y":5,"z":-28},"position":{"x":[0,0,0,0,0,0],"y":[-10,-10,7,20,15,15],"z":[0,0,0,-10,-10,-10]},"width":[0,30,30,13,13,0],"height":[0,45,35,23,23,0],"texture":[2.9,2.9,3.9],"vertical":true},"detail7":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":17,"z":-55},"position":{"x":[0,0,0,0,0],"y":[-25,-25,-5,10,10],"z":[0,0,0,0,0]},"width":[0,43,43,15,0],"height":[0,15,15,15,0],"texture":[4,4,12,4],"vertical":true},"detail8":{"section_segments":[45,135,225,315],"offset":{"x":8,"y":-41,"z":0},"position":{"x":[-4,-4,0,0,0],"y":[-33,-33,-16,25,25],"z":[0,0,0,0,0]},"width":[0,3,6,6,0],"height":[0,1,2.6,10,0],"texture":[63]},"detail9":{"section_segments":4,"offset":{"x":0,"y":-40,"z":12},"position":{"x":[0,0,0,0],"y":[-20,-20,20,20],"z":[3,3,-3,-3]},"width":[0,7,2,0],"height":[0,5,1.5,0],"texture":[3.9,63,3.9],"angle":180},"detail10":{"section_segments":6,"offset":{"x":0,"y":6,"z":-28},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-10,-10,7,20,20,17,17,17],"z":[2,2,2,-10,-10,-10,-10,-10]},"width":[0,29,29,13,10,10,7,0],"height":[0,42,32,23,18,18,14,0],"texture":[2.9,2.9,2.9,8,3.9,63,3.9],"vertical":true},"detail11":{"section_segments":6,"offset":{"x":0,"y":8,"z":4},"position":{"x":[0,0,0,0,0,0],"y":[4,14,12,14,14],"z":[0,0,0,0,0,0]},"width":[14,12,10,4,0],"height":[10,8,6,2,0],"texture":[3.9,16.9,0.9,0.9],"vertical":true},"detail12":{"section_segments":10,"offset":{"x":0,"y":18,"z":-55},"position":{"x":[0,0,0,0,0,0],"y":[4,14,12,14,14],"z":[0,0,0,0,0,0]},"width":[10,6,4,2,0],"height":[10,6,4,2,0],"texture":[63,16.9,3.9,0.9],"vertical":true}},"wings":{"main":{"doubleside":true,"offset":{"x":2,"y":10,"z":0},"length":[30,0,3,25,22],"width":[30,30,80,80,50,30],"angle":[0,-20,-20,-32,-10],"position":[20,20,20,20,35,30],"texture":[18,3.9,17,11.22,8.4],"bump":{"position":30,"size":15}},"font":{"doubleside":true,"offset":{"x":0,"y":-40,"z":5},"length":[40],"width":[50,15],"angle":[-10],"position":[40,0],"texture":[63],"bump":{"position":50,"size":20}},"font2":{"doubleside":true,"offset":{"x":0,"y":-39,"z":5},"length":[40.1],"width":[50,15],"angle":[-10],"position":[40,0],"texture":[3.9],"bump":{"position":50,"size":20.1}},"main2":{"doubleside":true,"offset":{"x":2,"y":13,"z":0},"length":[30,0,3,25,22],"width":[30,30,80,80,50,30],"angle":[0,-20,-20,-31,-10],"position":[19,19,20,20,35,30],"texture":[63,3.9,3.9,3.9,63],"bump":{"position":30,"size":15}}},"typespec":{"name":"Cayman","level":3,"model":3,"code":303,"specs":{"shield":{"capacity":[150,225],"reload":[4,6]},"generator":{"capacity":[100,135],"reload":[33,43]},"ship":{"mass":200,"speed":[75,90],"rotation":[65,80],"acceleration":[80,100]}},"shape":[2.801,2.599,2.116,2.115,2.12,2.145,2.16,1.895,1.536,1.132,1.277,1.356,1.464,2.594,2.803,3.109,3.364,3.531,3.781,3.804,3.233,3.023,2.824,2.774,2.837,2.805,2.837,2.774,2.824,3.023,3.233,3.804,3.781,3.531,3.364,3.109,2.803,2.594,1.464,1.356,1.277,1.132,1.536,1.895,2.16,2.145,2.12,2.115,2.116,2.599],"lasers":[{"x":0,"y":-2.8,"z":0.35,"angle":0,"damage":[13,18],"rate":3,"type":1,"speed":[160,190],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.853,"y":-1.918,"z":-0.175,"angle":-5,"damage":[8,11],"rate":1.5,"type":1,"speed":[145,175],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.853,"y":-1.918,"z":-0.175,"angle":5,"damage":[8,11],"rate":1.5,"type":1,"speed":[145,175],"number":1,"spread":0,"error":0,"recoil":0}],"radius":3.804}}';
var Hammer_304 = '{"name":"Hammer","level":3,"model":4,"size":1.5,"specs":{"shield":{"capacity":[175,250],"reload":[5,7]},"generator":{"capacity":[75,120],"reload":[20,25]},"ship":{"mass":235,"speed":[95,110],"rotation":[40,55],"acceleration":[95,125],"dash":{"rate":1.5,"burst_speed":[150,175],"speed":[115,140],"acceleration":[60,60],"initial_energy":[35,55],"energy":[35,55]}}},"bodies":{"main":{"section_segments":6,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-100,-100,-45,-20,-5,5,55,80,100,90],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,10,10,23,21,21,45,40,20,0],"height":[0,10,10,23,21,21,45,40,15,0],"texture":[3.9,15,10.245,63,8,3.9,63,3.9,16.9],"propeller":true},"cockpit":{"section_segments":6,"offset":{"x":0,"y":5,"z":18},"position":{"x":[0,0,0,0,0,0],"y":[-30,-30,-10,10,40,50],"z":[0,0,0,0,0,0]},"width":[0,5,15,20,20,0],"height":[0,4,10,15,20,0],"texture":[7,9,9,9,4]},"uwings":{"section_segments":6,"offset":{"x":0,"y":-20,"z":-10},"position":{"x":[25,33,35,30,27,50],"y":[-60,0,40,80,90,100],"z":[10,9,0,0,0,0]},"width":[5,8,17,10,0],"height":[10,10,20,10,0],"texture":[63,10.245,8,4]},"uwings2":{"section_segments":6,"offset":{"x":0,"y":-20,"z":-10},"position":{"x":[-25,-33,-35,-30,-27,-50],"y":[-60,0,40,80,90,100],"z":[10,9,0,0,0,0]},"width":[5,8,17,10,0],"height":[10,10,20,10,0],"texture":[63,10.245,8,4]},"arm":{"section_segments":6,"angle":90,"offset":{"x":-1,"y":-84,"z":0},"position":{"x":[-15,-15,-5,-1,0,0,0],"y":[-62,-62,-50,-40,-13,-6,1],"z":[0,0,0,0,0,0,0]},"width":[0,6,13,14,20,20,20],"height":[0,4,13,14,25,25,25],"texture":[3.9,63,3.9,0.9,63,11]},"side_propulsors":{"section_segments":6,"offset":{"x":25,"y":35,"z":5},"position":{"x":[-5,-5,0,0,0,0,0,0,0,0],"y":[-15,-15,0,10,20,25,30,40,55,45],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,11,15,15,15,10,10,20,15,0],"height":[0,11,15,15,15,10,10,20,15,0],"texture":[63,63,63,2.9,2.9,63,3.9,16.9,16.9],"propeller":true},"detail":{"section_segments":6,"offset":{"x":20,"y":-5,"z":-25},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[28,28,22,22,28],"height":[28,28,22,22,28],"texture":[4,17,4],"vertical":true},"detail2":{"section_segments":6,"offset":{"x":20,"y":-5,"z":-15},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[28,28,22,22,28],"height":[28,28,22,22,28],"texture":[4,17,4],"vertical":true},"arm2":{"section_segments":7,"offset":{"x":0,"y":0,"z":88},"position":{"x":[0,0,0,0,0,0],"y":[-5,-5,-5,5,5,5],"z":[-10,0,0,0,0,0]},"width":[0,40,45,45,40,0],"height":[0,20,25,25,20,0],"texture":[16.9,3.9],"vertical":true,"angle":180},"detail3":{"section_segments":5,"offset":{"x":0,"y":48,"z":-60},"position":{"x":[0,0,0,0,0,0],"y":[-30,-7,2,2,-2,-2],"z":[0,0,0,0,0,10]},"width":[35,35,25,15,14,14],"height":[22,22,12,7,7,0],"texture":[3.84,3.84,16.84,3.84,12.84],"vertical":true},"arm3":{"section_segments":4,"offset":{"x":0,"y":-78,"z":18},"position":{"x":[0,0,0,0,0],"y":[-8,-8,10,15,15],"z":[10,10,0,-15,-15]},"width":[0,12,25,15,0],"height":[0,2,5,5,0],"texture":[4],"angle":0},"arm4":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":-76,"z":18},"position":{"x":[0,0,0,0,0],"y":[-8,-8,10,15,15],"z":[10,10,0,-15,-15]},"width":[0,12,12,12,0],"height":[0,3,8,6,0],"texture":[4,12,4],"angle":0},"arm5":{"section_segments":6,"angle":90,"offset":{"x":-1,"y":-83,"z":0},"position":{"x":[-1,-1,0,0,0],"y":[-40,-40,-13,-6,1],"z":[0,0,0,0,0]},"width":[0,14,20,20,20],"height":[0,14,25,25,25],"texture":[3.9,18,63,11]},"detail4":{"section_segments":5,"offset":{"x":0,"y":48,"z":-59},"position":{"x":[0,0,0,0],"y":[-30,-7,1,1],"z":[0,0,0,0]},"width":[35,35,26,25],"height":[22,22,13,12],"texture":[2.84],"vertical":true},"detail5":{"section_segments":[45,135,225,315],"offset":{"x":25,"y":10,"z":21},"position":{"x":[5,5,0,0,0],"y":[-30,-30,10,40,40],"z":[-18,-18,0,0,0]},"width":[0,3,5,5,0],"height":[0,7,7,7,0],"texture":[4,4,8]},"detail6":{"section_segments":[45,135,225,315],"offset":{"x":42,"y":-20,"z":-5},"position":{"x":[-10,-10,0,0,0],"y":[-30,-30,0,30,30],"z":[0,0,0,0,0]},"width":[0,5,7,7,0],"height":[0,7,7,7,0],"texture":[3.9]},"detail7":{"section_segments":6,"offset":{"x":28,"y":43,"z":5},"position":{"x":[-3,-3,0,0,0,0],"y":[-26,-26,-20,20,25,25],"z":[0,0,0,0,0,0]},"width":[0,10,10,10,5,0],"height":[0,7,10,10,5,0],"texture":[3.9,3.9,15,3.9,3.9]},"detail8":{"section_segments":8,"offset":{"x":0,"y":8,"z":60},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-5,-7,-4,-4,-6,-6,8,8],"z":[0,0,0,0,0,0,0,0]},"width":[-5,5,5,6,6,7,7,0],"height":[-5,5,5,6,6,7,7,0],"vertical":true,"texture":[17,6,4,4,63,4],"angle":180},"detail9":{"section_segments":6,"offset":{"x":0,"y":32,"z":25},"position":{"x":[0,0,0,0,0,0],"y":[-5,2,5,5,-5,-5],"z":[0,0,0,0,0,0]},"width":[15,15,15,13,13,15],"height":[15,15,15,13,13,15],"texture":[11,63,1]}},"wings":{"side":{"doubleside":true,"offset":{"x":30,"y":60,"z":-16},"length":[0,40],"width":[0,50,0],"angle":[0,-30],"position":[0,0,50],"texture":[63],"bump":{"position":40,"size":20}},"side2":{"doubleside":true,"offset":{"x":30,"y":60,"z":16},"length":[0,40],"width":[0,50,0],"angle":[0,30],"position":[0,0,50],"texture":[63],"bump":{"position":40,"size":20}},"side3":{"doubleside":true,"offset":{"x":5,"y":-60,"z":0},"length":[0,15],"width":[0,50,0],"angle":[0,0],"position":[0,-10,40],"texture":[63],"bump":{"position":10,"size":27}}},"typespec":{"name":"Hammer","level":3,"model":4,"code":304,"specs":{"shield":{"capacity":[175,250],"reload":[5,7]},"generator":{"capacity":[75,120],"reload":[20,25]},"ship":{"mass":235,"speed":[95,110],"rotation":[40,55],"acceleration":[95,125],"dash":{"rate":1.5,"burst_speed":[150,175],"speed":[115,140],"acceleration":[60,60],"initial_energy":[35,55],"energy":[35,55]}}},"shape":[3.503,3.452,3.392,3.391,3.214,3.145,3.026,1.709,1.636,1.596,1.564,1.501,1.467,1.467,1.527,1.654,1.694,1.76,1.859,2.013,2.937,3.955,3.278,3.1,3.146,3.106,3.146,3.1,3.278,3.955,2.937,2.013,1.859,1.76,1.694,1.654,1.527,1.467,1.467,1.501,1.564,1.596,1.636,1.709,3.026,3.145,3.214,3.391,3.392,3.452],"lasers":[],"radius":3.955}}';
 
var Dragonfly_401 = '{"name":"Dragonfly","level":4,"model":1,"size":1.88,"specs":{"shield":{"capacity":[175,250],"reload":[4,7]},"generator":{"capacity":[100,150],"reload":[45,60]},"ship":{"mass":180,"speed":[85,100],"rotation":[65,80],"acceleration":[90,115]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-52,-52,-50,-30,-30,0,40,60,50],"z":[-5,-5,-5,-5,0,0,0,0,0]},"width":[0,5,7,13,16,25,25,15,0],"height":[0,2,3,5,10,15,10,10,0],"texture":[3.9,3.9,63,3.9,8,10,3.9,16.9],"propeller":true},"detail2":{"section_segments":6,"offset":{"x":0,"y":5,"z":13},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-17,-17,12,25,38,45,45,45],"z":[0,0,0,2,2,2,2,2]},"width":[0,6,14,14,14,10,8,0],"height":[0,4,14,14,14,10,8,0],"propeller":false,"texture":[7,9,9,15,3.9,3.9,16.9]},"detail3":{"section_segments":4,"offset":{"x":25,"y":0,"z":-5},"position":{"x":[-18,-11,0,0,0,-2],"y":[-65,-45,0,20,30,35],"z":[0,0,0,0,0,0]},"width":[0,3,7,5,2,0],"height":[0,2,3,4,3,0],"texture":[1.9]},"detail4":{"section_segments":4,"offset":{"x":24,"y":0,"z":-5},"position":{"x":[-17,-11,0,0,0,-2],"y":[-65,-45,0,20,30,35],"z":[0,0,0,0,0,0]},"width":[0,3,7,5,2,0],"height":[0,2,3,4,3,0],"texture":[16.9,3.9]},"detail5":{"section_segments":6,"offset":{"x":0,"y":-75,"z":3},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-15,-20,-5,25,30,55,60,60],"z":[0,0,0,0,0,0,0,0]},"width":[0,2,4,4,10,10,4,0],"height":[0,2,4,4,7,7,4,0],"texture":[1.9,63,1.9,3.9,18,3.9],"laser":{"damage":[45,60],"rate":1,"type":1,"speed":[185,210],"number":1,"error":0}},"detail6":{"section_segments":6,"offset":{"x":31,"y":30,"z":-5},"position":{"x":[0,0,0,-5,-5,-7,-7,-7],"y":[-60,-65,-45,-20,0,20,40,30],"z":[0,0,0,0,0,0,0,0]},"width":[0,1,5,8,8,11,7,0],"height":[0,1,5,8,8,11,7,0],"angle":0,"propeller":true,"texture":[3.9,63,3.9,15,3.9,3.9,16.9],"laser":{"damage":[7,11],"rate":2,"type":1,"speed":[165,185],"number":1,"error":0}},"detail7":{"section_segments":6,"offset":{"x":30,"y":40,"z":-7},"position":{"x":[0,0,0,0,0,0],"y":[-2,0.7,2,2,-2,-2],"z":[0,0,0,0,0,0]},"width":[10,10,10,8,8,10],"height":[10,10,10,8,8,10],"texture":[0.9,63,3.9]},"detail8":{"section_segments":6,"offset":{"x":30,"y":33,"z":-7},"position":{"x":[0,0,0,0,0,0],"y":[-2,0.7,2,2,-2,-2],"z":[0,0,0,0,0,0]},"width":[10,10,10,8,8,10],"height":[10,10,10,8,8,10],"texture":[0.9,63,3.9]},"detail10":{"section_segments":10,"offset":{"x":0,"y":17,"z":-36.5},"position":{"x":[0,0,0,0,0,0],"y":[5,13,12,14,14],"z":[0,0,0,0,0,0]},"width":[6,6,4,3,0],"height":[6,6,4,3,0],"texture":[4,8,17,4],"vertical":true}},"wings":{"detail":{"length":[45,-2,2,16,30],"width":[20,20,70,70,30,5],"angle":[-20,-20,-20,-20,-20],"position":[10,10,0,0,20,55],"doubleside":true,"bump":{"position":20,"size":15},"texture":[18,4,17,8,63],"offset":{"x":0,"y":25,"z":5}},"detail2":{"length":[45,-2,2,16,30],"width":[20,20,70,70,30,5],"angle":[-20,-20,-20,-20,-21],"position":[9,9,-1,0,20,55],"doubleside":true,"bump":{"position":20,"size":15},"texture":[18,4,17,4,1],"offset":{"x":0,"y":26,"z":5}},"detail3":{"length":[2,29],"width":[109,109,1],"angle":[0,0],"position":[-20,-20,50],"doubleside":true,"offset":{"x":0,"y":15,"z":10},"bump":{"position":45,"size":10},"texture":[17,63]},"detail4":{"length":[2,29],"width":[109,109,1],"angle":[0,0],"position":[-20,-20,50],"doubleside":true,"offset":{"x":0,"y":16,"z":10},"bump":{"position":45,"size":10},"texture":[4]}},"typespec":{"name":"Dragonfly","level":4,"model":1,"code":401,"specs":{"shield":{"capacity":[175,250],"reload":[4,7]},"generator":{"capacity":[100,150],"reload":[45,60]},"ship":{"mass":180,"speed":[85,100],"rotation":[65,80],"acceleration":[90,115]}},"shape":[3.801,2.615,2.322,2.011,1.753,1.561,1.893,1.789,1.664,1.58,1.512,1.772,1.836,1.947,2.098,2.321,2.663,3.433,4.692,4.775,3.165,2.912,3.047,2.944,2.443,2.405,2.443,2.944,3.047,2.912,3.165,4.775,4.692,3.433,2.663,2.321,2.098,1.947,1.842,1.772,1.512,1.58,1.664,1.789,1.893,1.561,1.753,2.011,2.322,2.615],"lasers":[{"x":0,"y":-3.8,"z":0.12,"angle":0,"damage":[45,60],"rate":1,"type":1,"speed":[185,210],"number":1,"spread":0,"error":0,"recoil":0},{"x":1.24,"y":-1.4,"z":-0.2,"angle":0,"damage":[7,11],"rate":2,"type":1,"speed":[165,185],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.24,"y":-1.4,"z":-0.2,"angle":0,"damage":[7,11],"rate":2,"type":1,"speed":[165,185],"number":1,"spread":0,"error":0,"recoil":0}],"radius":4.775}}';
var Stingray_402 = '{"name":"Stingray","level":4,"model":2,"size":1.6,"specs":{"shield":{"capacity":[175,250],"reload":[4,7]},"generator":{"capacity":[125,175],"reload":[45,60]},"ship":{"mass":200,"speed":[95,110],"rotation":[65,80],"acceleration":[90,130]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":-20,"z":-15},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-70,-70,-57,-40,0,40,80,95,115,125,115],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,3,10,20,30,25,25,25,15,13,0],"height":[0,3,10,15,25,25,25,20,15,13,0],"texture":[3.9,3.9,63,1.9,0.9,10.245,63,3.9,12,16.9],"propeller":true},"detail2":{"section_segments":6,"offset":{"x":0,"y":-45,"z":-25},"position":{"x":[22,22,22,22,22,22],"y":[-65,-75,-25,0,25,35],"z":[0,0,0,0,5,10]},"width":[0,5,8,14,10,0],"height":[0,7,11,14,13,0],"angle":0,"laser":{"damage":[22,27],"rate":2,"type":1,"speed":[185,210],"recoil":0,"number":1,"error":0},"texture":[3,4,10.245,4]},"detail3":{"section_segments":6,"offset":{"x":0,"y":-45,"z":-25},"position":{"x":[-22,-22,-22,-22,-22,-22],"y":[-65,-75,-25,0,25,35],"z":[0,0,0,0,5,10]},"width":[0,5,8,14,10,0],"height":[0,7,11,14,13,0],"angle":0,"laser":{"damage":[22,27],"rate":2,"type":1,"speed":[185,210],"recoil":0,"number":1,"error":0},"texture":[3,4,10.245,4]},"detail4":{"section_segments":6,"offset":{"x":0,"y":-30,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-25,-25,10,25,35,35],"z":[0,0,0,0,3,3]},"width":[0,5,15,15,10,0],"height":[0,5,15,15,10,0],"texture":[7,9,9,4]},"detail5":{"section_segments":6,"offset":{"x":64,"y":-30,"z":-10},"position":{"x":[-20,-20,-2,0,0,0,0,0,0],"y":[-50,-50,-15,0,60,70,75,90,80],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,3,15,15,15,12,11,10,0],"height":[0,3,10,15,15,12,11,10,0],"texture":[3.9,63,11,3.9,3.9,8,12,16.9],"propeller":true},"detail6":{"section_segments":[0,60,120,180],"offset":{"x":-9,"y":20,"z":-5},"position":{"x":[5,5,0,0,-9,-9],"y":[-80,-80,-20,0,55,55],"z":[0,0,0,0,-2,-2]},"width":[0,5,20,20,5,0],"height":[0,10,25,25,5,0],"texture":[16.9,3.9,12.9,3.9]},"detail7":{"section_segments":10,"offset":{"x":0,"y":5,"z":-5},"position":{"x":[0,0,0,0,0,0],"y":[-7,14,12,16,16],"z":[0,0,0,0,0,0]},"width":[12,8,6,4,0],"height":[12,8,6,4,0],"texture":[4,8,17,4],"vertical":true},"detail8":{"vertical":true,"angle":30,"section_segments":[45,135,225,315],"offset":{"x":-66,"y":-13,"z":-2},"position":{"x":[0,0,0,0,0],"y":[16,16,19,19],"z":[0,0,0,0]},"width":[0,10,10,10],"height":[0,40,25,0],"texture":[4,17.95,15]},"detail9":{"section_segments":10,"offset":{"x":63,"y":-9,"z":-10},"position":{"x":[0,0,0,0,0,0],"y":[7,14,14,13,13],"z":[0,0,0,0,0,0]},"width":[6,6,5,3,0],"height":[6,6,5,3,0],"texture":[63,63,17,4],"vertical":true,"angle":30},"detail10":{"section_segments":10,"offset":{"x":63,"y":-9,"z":5},"position":{"x":[0,0,0,0,0,0],"y":[7,14,14,13,13],"z":[0,0,0,0,0,0]},"width":[6,6,5,3,0],"height":[6,6,5,3,0],"texture":[63,63,17,4],"vertical":true,"angle":30}},"wings":{"wings":{"doubleside":true,"offset":{"x":0,"y":-10,"z":-15},"length":[30,10,22,0,23,0,15],"width":[80,80,90,63,20,20,50,50],"angle":[0,-5,20,0,0,0,0],"position":[20,20,10,10,20,20,20,10],"texture":[17,63,4,4,17,4,63],"bump":{"position":25,"size":10}},"wings2":{"doubleside":true,"offset":{"x":0,"y":-9,"z":-15},"length":[30,10,22,0,23,0,15],"width":[80,80,90,63,20,20,50,50],"angle":[0,-5,20,0,-1,0,-1],"position":[20,20,10,10,20,20,21,11],"texture":[4,4,1,1,1,1,18],"bump":{"position":25,"size":10}},"top":{"doubleside":true,"offset":{"x":0,"y":75,"z":-5},"length":[5,30],"width":[0,60,40],"angle":[90,90,90],"position":[-30,-30,0],"texture":63,"bump":{"position":10,"size":15}},"side2":{"length":[35,10],"width":[60,20,15],"angle":[10,60],"position":[10,40,45],"doubleside":true,"texture":63,"bump":{"position":10,"size":10},"offset":{"x":0,"y":25,"z":-15}},"top2":{"doubleside":true,"offset":{"x":0,"y":74,"z":-5},"length":[5,30],"width":[0,60,40],"angle":[90,90,90],"position":[-30,-30,0],"texture":17,"bump":{"position":10,"size":14}}},"typespec":{"name":"Stingray","level":4,"model":2,"code":402,"specs":{"shield":{"capacity":[175,250],"reload":[4,7]},"generator":{"capacity":[125,175],"reload":[45,60]},"ship":{"mass":200,"speed":[95,110],"rotation":[65,80],"acceleration":[90,130]}},"shape":[3.061,4.153,4.177,3.076,3.148,3.102,3,2.951,2.974,2.927,2.813,3.46,3.378,3.378,3.46,3.477,3.191,3.068,3.204,2.978,2.059,2.957,2.838,2.998,3.59,3.577,3.59,2.998,2.838,2.957,2.059,2.978,3.204,3.068,3.191,3.477,3.46,3.378,3.378,3.46,2.813,2.927,2.974,2.951,3,3.102,3.148,3.076,4.177,4.153],"lasers":[{"x":0.748,"y":-4.08,"z":-0.85,"angle":0,"damage":[22,27],"rate":2,"type":1,"speed":[185,210],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.748,"y":-4.08,"z":-0.85,"angle":0,"damage":[22,27],"rate":2,"type":1,"speed":[185,210],"number":1,"spread":0,"error":0,"recoil":0}],"radius":4.177}}';
var Azimuth_403 = '{"name":"Azimuth","level":4,"model":3,"size":2.3,"specs":{"shield":{"capacity":[200,275],"reload":[4,7]},"generator":{"capacity":[125,150],"reload":[35,50]},"ship":{"mass":200,"speed":[85,100],"rotation":[65,80],"acceleration":[65,85]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":0,"z":5},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-80,-80,-85,-80,-60,-40,-15,-10,0,12,38,55,59,75,65],"z":[0,0,0,0,0,0,0,0,0,0,0,3,0,0,0]},"width":[0,5,8,15,15,15,15,15,25,30,30,18,17,12,0],"height":[0,5,8,14,14,14,14,14,18,24,23,18,18,8,0],"propeller":true,"texture":[4.9,3.9,63,0.9,11,0.9,63,3.9,10,11,4,63,8.2,16.9],"laser":{"damage":[14,21],"rate":5,"type":1,"speed":[230,265],"recoil":50,"number":1,"error":5}},"detail2":{"section_segments":4,"offset":{"x":0,"y":-50,"z":18},"position":{"x":[0,0,0,0],"y":[-30,-30,35,35],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,1.5,1.5,0],"angle":0,"propeller":false,"texture":[4]},"detail3":{"section_segments":6,"offset":{"x":8,"y":-50,"z":10.5},"position":{"x":[0,0,0,0],"y":[-30,-30,35,35],"z":[0,0,0,0]},"width":[0,6,6,0],"height":[0,4,4,0],"angle":0,"propeller":false,"texture":[4]},"detail4":{"section_segments":6,"offset":{"x":8,"y":-50,"z":-0.5},"position":{"x":[0,0,0,0],"y":[-30,-30,35,35],"z":[0,0,0,0]},"width":[0,6,6,0],"height":[0,4,4,0],"angle":0,"propeller":false,"texture":[4]},"detail5":{"section_segments":4,"offset":{"x":0,"y":-50,"z":-8},"position":{"x":[0,0,0,0],"y":[-30,-30,35,35],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,1.5,1.5,0],"angle":0,"propeller":false,"texture":[4]},"detail6":{"section_segments":6,"offset":{"x":0,"y":15,"z":20},"position":{"x":[0,0,0,0,0],"y":[-15,-15,10,20,20],"z":[0,0,0,1,1]},"width":[0,7,14,10,0],"height":[0,7,15,8,0],"propeller":false,"texture":[7,9,9,7]},"detail7":{"section_segments":7,"offset":{"x":0,"y":40,"z":0},"position":{"x":[18,18,18,18,18,18],"y":[-20,-20,20,26,30,20],"z":[0,0,0,0,0,0]},"width":[0,10,10,10,7,0],"height":[0,10,10,10,7,0],"texture":[2.9,17,12.9,63,16.9],"propeller":true},"detail8":{"section_segments":7,"offset":{"x":0,"y":40,"z":0},"position":{"x":[-18,-18,-18,-18,-18,-18],"y":[-20,-20,20,26,30,20],"z":[0,0,0,0,0,0]},"width":[0,10,10,10,7,0],"height":[0,10,10,10,7,0],"texture":[2.9,17,12.9,63,16.9],"propeller":true},"detail9":{"section_segments":6,"offset":{"x":30,"y":30,"z":5},"position":{"x":[21,21,21,1,0,-10,-10],"y":[-35,-13,-10,0,3,7,7],"z":[0,0,0,0,0,0,0]},"width":[15,15,34,34,32,25,0],"height":[7,7,10,10,10,3,0],"texture":[3.9,3.9,10,16.9,3.9],"angle":90,"propeller":false},"detail10":{"section_segments":6,"offset":{"x":30,"y":30,"z":4},"position":{"x":[25,25,25,5,0,-10,-10],"y":[-35,-13,-10,0,3,7,7],"z":[0,0,0,0,0,0,0]},"width":[15,15,34,34,32,25,0],"height":[7,7,10,10,10,3,0],"texture":[3.9,3.9,63,63,3.9],"angle":90,"propeller":false},"detail11":{"section_segments":6,"offset":{"x":0,"y":-12,"z":5},"position":{"x":[0,0,0,0,0,0],"y":[-4,-4,-2,4,6,6],"z":[0,0,0,0,0,0]},"width":[0,20,20,20,20,0],"height":[0,20,20,20,20,0],"texture":[3.9,3.9,63,3.9]},"detail12":{"vertical":true,"angle":28,"section_segments":[45,135,225,315],"offset":{"x":-2,"y":1,"z":27},"position":{"x":[0,0,0,0,0],"y":[13,16,19,19.1,19.1],"z":[0,0,0,-6,-6]},"width":[0,3,3,3,3],"height":[0,40,25,9,0],"texture":[4,4,15,17]},"detail13":{"section_segments":4,"offset":{"x":1,"y":-70,"z":14.4},"position":{"x":[0,0,0,0],"y":[-10,-10,9,9],"z":[0,0,0,0]},"width":[0,8,8,0],"height":[0,4,4,0],"texture":[0.9,10,0.9]},"detail14":{"section_segments":[0,60,120,180],"offset":{"x":-6,"y":30,"z":19},"position":{"x":[3,3,0,0,2,2],"y":[-35,-35,0,15,25,25],"z":[0,0,0,0,3,3]},"width":[0,5,15,15,5,0],"height":[0,5,14,14,3,0],"texture":[16.9,4,15,1]},"detail15":{"section_segments":10,"offset":{"x":0,"y":15,"z":-41},"position":{"x":[0,0,0,0,0,0],"y":[7,13,12,14,14],"z":[0,0,0,0,0,0]},"width":[10,7,5,3,0],"height":[10,7,5,3,0],"texture":[4,8,17,4],"vertical":true},"detail16":{"section_segments":6,"offset":{"x":14,"y":17,"z":-27},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-5,-7,-4,-4,-6,-6,8,8],"z":[0,0,0,0,0,0,0,0]},"width":[-6,6,6,7,7,9,9,0],"height":[-6,6,6,7,7,9,9,0],"vertical":true,"texture":[16.9,0.9,3.9,3.9,63,3.9],"angle":190}},"wings":{"side":{"doubleside":true,"offset":{"x":20,"y":26,"z":12},"length":[0,35],"width":[0,55,0],"angle":[0,30],"position":[0,0,50],"texture":[4],"bump":{"position":23,"size":20}},"side2":{"doubleside":true,"offset":{"x":20,"y":26,"z":-7},"length":[0,35],"width":[0,55,0],"angle":[0,-30],"position":[0,0,50],"texture":[4],"bump":{"position":23,"size":20}},"side3":{"doubleside":true,"offset":{"x":0,"y":-5,"z":7},"length":[0,13],"width":[0,120,120],"angle":[0,90],"position":[0,0,0],"texture":[17],"bump":{"position":-50,"size":10}},"side4":{"doubleside":true,"offset":{"x":0,"y":-5,"z":7},"length":[0,14.5],"width":[0,120,120],"angle":[0,25],"position":[0,0,0],"texture":[17],"bump":{"position":-50,"size":5}},"side5":{"doubleside":true,"offset":{"x":0,"y":-5,"z":3},"length":[0,14.5],"width":[0,120,120],"angle":[0,-25],"position":[0,0,0],"texture":[17],"bump":{"position":-50,"size":5}},"side6":{"doubleside":true,"offset":{"x":0,"y":-5,"z":3},"length":[0,13],"width":[0,120,120],"angle":[0,-90],"position":[0,0,0],"texture":[17],"bump":{"position":-50,"size":10}},"side7":{"doubleside":true,"offset":{"x":19,"y":27,"z":12.25},"length":[0,33],"width":[0,55,0],"angle":[0,30],"position":[0,0,46],"texture":[63],"bump":{"position":20,"size":20}},"side8":{"doubleside":true,"offset":{"x":19,"y":27,"z":-7.25},"length":[0,33],"width":[0,55,0],"angle":[0,-30],"position":[0,0,46],"texture":[63],"bump":{"position":20,"size":20}}},"typespec":{"name":"Azimuth","level":4,"model":3,"code":403,"specs":{"shield":{"capacity":[200,275],"reload":[4,7]},"generator":{"capacity":[125,150],"reload":[35,50]},"ship":{"mass":200,"speed":[85,100],"rotation":[65,80],"acceleration":[65,85]}},"shape":[3.918,3.923,3.229,1.953,1.424,1.453,1.449,1.382,1.343,1.33,1.355,1.404,1.471,1.552,1.645,1.778,1.941,2.101,2.33,2.787,4.193,3.981,3.416,3.386,3.483,3.457,3.483,3.386,3.416,3.981,4.193,2.787,2.33,2.101,1.941,1.778,1.645,1.552,1.471,1.404,1.355,1.33,1.343,1.382,1.449,1.453,1.424,1.953,3.229,3.923],"lasers":[{"x":0,"y":-3.91,"z":0.23,"angle":0,"damage":[14,21],"rate":5,"type":1,"speed":[230,265],"number":1,"spread":0,"error":5,"recoil":50}],"radius":4.193}}';
var Flash_Star_404 = '{"name":"Flash Star","level":4,"model":4,"size":1.6,"specs":{"shield":{"capacity":[175,250],"reload":[4,6]},"generator":{"capacity":[150,225],"reload":[55,75]},"ship":{"mass":185,"speed":[90,105],"rotation":[50,70],"acceleration":[80,125]}},"bodies":{"main":{"section_segments":6,"offset":{"x":0,"y":-30,"z":10},"position":{"x":[35,35,33,25,20,0,0,0,0,0],"y":[-35,-35,-30,-10,0,50,95,102,95],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,5,9,14,17,25,17,15,0],"height":[0,2,8,10,15,15,8,6,0],"texture":[0.9,0.9,10.1,63,11,11,63,16.9],"propeller":true},"main2":{"section_segments":6,"offset":{"x":0,"y":-30,"z":10},"position":{"x":[-35,-35,-33,-25,-20,0,0,0,0,0],"y":[-35,-35,-30,-10,0,50,95,102,95],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,5,9,14,17,25,17,16,0],"height":[0,2,8,10,15,15,8,6,0],"texture":[0.9,0.9,9.9,63,11,11,63,16.9]},"main3":{"section_segments":[0,60,120,180],"offset":{"x":-1,"y":-30,"z":10},"position":{"x":[-35,-35,-33,-25,-20,1,1,1],"y":[-36,-36,-30,-10,0,50,95,95],"z":[0,0,0,0,0,0,0,0]},"width":[0,5,10,14,17,28,18,0],"height":[0,2,8,10,15,15,9,0],"texture":[3.9,3.9,3.9,63,3.9,3.9]},"cockpit":{"section_segments":6,"offset":{"x":0,"y":-20,"z":33},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-28,-28,-25,0,13,16,25,25],"z":[0,0,0,0,0,0,0,0]},"width":[0,5,9,17,17,17,12,0],"height":[0,2,4,7,9,9,5,0],"texture":[7,7,9,9,63,8.2,3.9]},"cannon":{"section_segments":6,"offset":{"x":0,"y":-45,"z":-5},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-50,-56,-50,-45,-20,0,20,30],"z":[0,0,0,0,0,0,10,20]},"width":[0,2,3,7,7,11,7,0],"height":[0,2,3,7,7,11,10,0],"angle":0,"laser":{"damage":[7,10],"rate":6,"type":1,"speed":[155,180],"number":1,"error":0},"propeller":false,"texture":[0.9,16.9,0.9,8.2,63,4]},"cannons":{"section_segments":6,"offset":{"x":24,"y":0,"z":20},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-60,-75,-70,12,20,50,53,53],"z":[0,0,0,0,0,0,0,0]},"width":[0,3,4,5,9,9,6,0],"height":[0,3,4,5,9,9,6,0],"angle":-15,"laser":{"damage":[9,13],"rate":1,"type":2,"speed":[150,200],"number":1,"error":0},"propeller":false,"texture":[0.9,16.9,8.2,4,10.25,3.9,3.9]},"cannons2":{"section_segments":[45,135,225,315],"offset":{"x":55,"y":20,"z":20},"position":{"x":[0,0,0,0,0],"y":[-20,-25,-13,0,0],"z":[0,0,0,0,0]},"width":[0,3,6,6,0],"height":[0,3,6,6,0],"laser":{"damage":[5,8],"rate":3,"type":2,"speed":[150,200],"number":1,"error":0},"propeller":false,"texture":[0.9,0.9,4]},"deco":{"section_segments":6,"offset":{"x":0,"y":-30,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-50,-50,-40,-30,0,30,68,78,78],"z":[0,0,0,0,4,9,6,4]},"width":[0,4,10,15,15,10,8,6,0],"height":[0,4,10,15,17,19,11,8,0],"texture":[3.9,3.9,63,15,63,12,4],"angle":0,"propeller":false},"deco2":{"section_segments":6,"offset":{"x":55,"y":20,"z":-60},"position":{"x":[0,0,0,0,0,0],"y":[-7,-4,4,7,-7],"z":[0,0,0,0,0,0]},"width":[12,23,20,12,10],"height":[35,53,50,35,35],"texture":[3.9,16.9,3.9],"vertical":true},"deco3":{"section_segments":[45,135,225,315],"offset":{"x":55,"y":60,"z":20},"position":{"x":[0,0,0,0,0,0],"y":[-10,-10,-5,5,10,10],"z":[0,0,0,0,0,0]},"width":[0,20,10,10,20,0],"height":[0,7,4,4,7,0],"texture":[63,63,15,63,63],"angle":90},"detaild10":{"section_segments":10,"offset":{"x":55,"y":11,"z":-60},"position":{"x":[0,0,0,0,0,0],"y":[7,14,14,13,13],"z":[0,0,0,0,0,0]},"width":[6,6,5,3,0],"height":[6,6,5,3,0],"texture":[4,4,17,63],"vertical":true,"angle":0}},"wings":{"font":{"length":[40,0],"width":[30,30,0],"angle":[10,0],"position":[-50,0,0],"texture":[63],"doubleside":true,"bump":{"position":30,"size":10},"offset":{"x":0,"y":60,"z":13}},"fonst":{"length":[40,0],"width":[30,30,0],"angle":[10,0],"position":[-50,0,0],"texture":[18],"doubleside":true,"bump":{"position":30,"size":10},"offset":{"x":0,"y":61,"z":13}},"top":{"doubleside":true,"offset":{"x":0,"y":55,"z":-5},"length":[0,40],"width":[0,60,20],"angle":[90,90,90],"position":[-30,-30,10],"texture":[4,63],"bump":{"position":10,"size":25}},"hu":{"doubleside":true,"offset":{"x":0,"y":54,"z":-5},"length":[0,39],"width":[0,60,21],"angle":[90,90,90],"position":[-30,-30,10],"texture":[4,17],"bump":{"position":10,"size":25}}},"typespec":{"name":"Flash Star","level":4,"model":4,"code":404,"specs":{"shield":{"capacity":[175,250],"reload":[4,6]},"generator":{"capacity":[150,225],"reload":[55,75]},"ship":{"mass":185,"speed":[90,105],"rotation":[50,70],"acceleration":[80,125]}},"shape":[3.333,2.992,2.097,2.365,2.808,2.812,2.114,1.687,1.408,1.24,1.125,1.038,1.914,1.97,2.097,2.51,2.817,3.051,3.385,3.796,3.943,4.147,3.879,2.42,2.419,2.475,2.419,2.42,3.879,4.147,3.943,3.796,3.385,3.051,2.817,2.51,2.097,1.97,1.914,1.038,1.125,1.24,1.408,1.687,2.114,2.812,2.808,2.365,2.097,2.992],"lasers":[{"x":0,"y":-3.333,"z":-0.165,"angle":0,"damage":[7,10],"rate":6,"type":1,"speed":[155,180],"number":1,"spread":0,"error":0,"recoil":0},{"x":1.433,"y":-2.391,"z":0.66,"angle":-15,"damage":[9,13],"rate":1,"type":2,"speed":[150,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.433,"y":-2.391,"z":0.66,"angle":15,"damage":[9,13],"rate":1,"type":2,"speed":[150,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":1.815,"y":-0.165,"z":0.66,"angle":0,"damage":[5,8],"rate":3,"type":2,"speed":[150,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.815,"y":-0.165,"z":0.66,"angle":0,"damage":[5,8],"rate":3,"type":2,"speed":[150,200],"number":1,"spread":0,"error":0,"recoil":0}],"radius":4.147}}';
var T_Rex_405 = '{"name":"T-Rex","level":4,"model":5,"size":1.83,"specs":{"shield":{"capacity":[200,250],"reload":[5,7]},"generator":{"capacity":[150,200],"reload":[50,65]},"ship":{"mass":190,"speed":[80,90],"rotation":[55,75],"acceleration":[100,130]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":30,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-105,-115,-105,-100,-25,5,20,40,45,45],"z":[0,0,0,0,0,0,0,10,10,10]},"width":[0,3,6,8,23,25,23,16,10,0],"height":[0,3,6,8,30,30,30,5,2,0],"texture":[0.9,63,3.9,0.9,0.9,2.9,63,63],"laser":{"damage":[18,25],"rate":2.5,"type":2,"speed":[145,175],"number":1,"error":0}},"detail2":{"section_segments":6,"offset":{"x":0,"y":-5,"z":18},"position":{"x":[0,0,0,0,0,0,0],"y":[-35,-35,-30,-10,20,15,15],"z":[-4,-4,-4,-2,0,0,0]},"width":[0,6,9,13,13,10,0],"height":[0,4,11,13,13,12,0],"texture":[7,7,9,10.245,3.9]},"detail3":{"section_segments":6,"angle":-7,"offset":{"x":13,"y":-40,"z":-1},"position":{"x":[0,0,0,0,0],"y":[-10,-13,-8,10,11],"z":[0,0,0,0,0]},"width":[0,2,4,4,0],"height":[0,2,4,4,0],"texture":[3.9,16.9,4],"laser":{"damage":[5,7],"rate":3,"type":1,"speed":[145,175],"number":1,"error":0}},"detail4":{"section_segments":6,"offset":{"x":0,"y":-45,"z":-3},"position":{"x":[13,13,13,13,13,13,13,13,13],"y":[10,10,20,30,50,100,115,125,115],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,5,10,15,15,15,15,12,0],"height":[0,5,10,15,15,15,15,12,0],"texture":[63,63,63,8.3,15,15,63,16.9],"propeller":true},"detail5":{"section_segments":6,"offset":{"x":0,"y":-45,"z":-3},"position":{"x":[-13,-13,-13,-13,-13,-13,-13,-13,-13],"y":[10,10,20,30,50,100,115,125,115],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,5,10,15,15,15,15,12,0],"height":[0,5,10,15,15,15,15,12,0],"texture":[63,63,63,8.1,15,15,63,16.9],"propeller":true},"detail6":{"section_segments":6,"offset":{"x":28,"y":30,"z":-10},"position":{"x":[0,0,0,0,0,0],"y":[-15,-15,-10,30,45,35],"z":[0,0,0,0,0,0]},"width":[0,7,10,10,7,0],"height":[0,7,10,10,7,0],"propeller":true,"texture":[3.9,3.9,16.9,3.9,16.9]},"detail7":{"section_segments":6,"offset":{"x":0,"y":14,"z":-20},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-10,-10,9,20,20,17,17,17],"z":[0,0,0,-10,-10,-10,-10,-10]},"width":[0,26,26,10,7,7,4,0],"height":[0,45,35,23,18,18,14,0],"texture":[2.9,2.9,3.9,16.9,3.9,63,3.9],"vertical":true},"detail8":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":27,"z":-45},"position":{"x":[0,0,0,0,0],"y":[-25,-25,-4,10,10],"z":[0,0,0,0,0]},"width":[0,40,40,15,0],"height":[0,15,15,15,0],"texture":[4,4,8,4],"vertical":true},"detail9":{"section_segments":10,"offset":{"x":13,"y":23,"z":-45},"position":{"x":[0,0,0,0,0,0],"y":[7,12,11,12,12],"z":[0,0,0,0,0,0]},"width":[8,7,4,3,0],"height":[8,7,4,3,0],"texture":[4,17,4,1],"vertical":true,"angle":38},"detail11":{"section_segments":6,"offset":{"x":0,"y":-25,"z":18},"position":{"x":[0,0,0,0],"y":[-50,-50,45,45],"z":[13,13,-12,-12]},"width":[0,5,3.5,0],"height":[0,5,2,0],"texture":[3.9,16.9,3.9],"angle":180}},"wings":{"detail":{"doubleside":true,"offset":{"x":20,"y":45,"z":-6},"length":[40,0,10,-5,4,15],"width":[80,25,15,15,45,37,5],"angle":[0,0,0,0,0,0],"position":[-30,-2,-2,3,-7,-3,22],"texture":[11,4,4,4,17,63],"bump":{"position":35,"size":15}},"detail2":{"doubleside":true,"offset":{"x":20,"y":46,"z":-6},"length":[40,0,10,-5,4,16],"width":[80,25,15,15,45,37,5],"angle":[0,0,0,0,0,0],"position":[-30,-2,-2,3,-7,-3,22],"texture":[4,4,18,4,4],"bump":{"position":35,"size":15}},"detail3":{"doubleside":true,"offset":{"x":28,"y":-5,"z":-15},"length":[10,10,10],"width":[0,20,100],"angle":[90,90,90],"position":[0,0,0,0],"texture":[63],"bump":{"position":10,"size":40}},"detail4":{"doubleside":true,"offset":{"x":25,"y":40,"z":-3},"length":[0,10,7,7,10,0],"width":[0,12,30,60,30,12,0],"angle":[0,0,0,0,-3,-3],"position":[-5,-5,-2,-15,0,9,9],"texture":[63,63,63,63,15],"bump":{"position":35,"size":15}},"detail5":{"doubleside":true,"offset":{"x":0,"y":75,"z":20},"length":[0,20,0,10,-2,0],"width":[30,30,30,70,50,35,0],"angle":[90,90,90,90,90,90],"position":[-30,-30,-30,-20,-10,-14,-14],"texture":[4,4,4,15,17,4],"bump":{"position":-35,"size":15}}},"typespec":{"name":"T-Rex","level":4,"model":5,"code":405,"specs":{"shield":{"capacity":[200,250],"reload":[5,7]},"generator":{"capacity":[150,200],"reload":[50,65]},"ship":{"mass":190,"speed":[80,90],"rotation":[55,75],"acceleration":[100,130]}},"shape":[3.112,2.802,2.019,1.968,2.259,2.002,1.756,1.591,1.483,1.399,1.351,1.324,1.578,1.639,2.482,2.771,3.157,3.75,4.042,3.288,2.671,2.955,3.015,3.051,2.98,3.294,2.98,3.051,3.015,2.955,2.671,3.288,4.042,3.75,3.157,2.771,2.482,1.639,1.578,1.324,1.351,1.399,1.483,1.591,1.756,2.002,2.259,1.968,2.019,2.802],"lasers":[{"x":0,"y":-3.111,"z":0,"angle":0,"damage":[18,25],"rate":2.5,"type":2,"speed":[145,175],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.534,"y":-1.936,"z":-0.037,"angle":-7,"damage":[5,7],"rate":3,"type":1,"speed":[145,175],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.534,"y":-1.936,"z":-0.037,"angle":7,"damage":[5,7],"rate":3,"type":1,"speed":[145,175],"number":1,"spread":0,"error":0,"recoil":0}],"radius":4.042}}';
var H_Conqueror_406 = '{"name":"H-Conqueror","level":4,"model":6,"size":1.7,"specs":{"shield":{"capacity":[200,275],"reload":[4,6]},"generator":{"capacity":[150,200],"reload":[45,60]},"ship":{"mass":200,"speed":[80,90],"rotation":[35,50],"acceleration":[70,90]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-75,-75,-65,-40,0,40,70,63],"z":[0,0,0,0,0,0,0,0]},"width":[0,5,10,20,30,27,17,0],"height":[0,3,10,15,25,25,17,0],"propeller":true,"texture":[63,63,0.9,10,2.9,3.9,16.9]},"detail2":{"section_segments":6,"offset":{"x":0,"y":-20,"z":16},"position":{"x":[0,0,0,0,0,0,0],"y":[-30,-30,0,10,22,33],"z":[-5,-5,0,0,0,0,0]},"width":[0,6,14,15,11,0],"height":[0,3,7,10,9,0],"propeller":false,"texture":[7,9,9,63,63]},"detail3":{"section_segments":6,"offset":{"x":25,"y":40,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[-40,-40,-25,0,20,45,35],"z":[3,3,1,0,0,0,0]},"width":[0,7,15,15,18,12,0],"height":[0,10,15,15,18,12,0],"propeller":true,"texture":[3.9,3.9,10,3.9,63,16.9]},"detail4":{"section_segments":6,"offset":{"x":0,"y":-40,"z":-10},"position":{"x":[0,0,0,0,0,0],"y":[-40,-50,-20,0,20,50],"z":[0,0,0,0,0,0]},"width":[0,3,15,10,15,0],"height":[0,3,12,10,10,0],"angle":0,"laser":{"damage":[35,45],"rate":1.5,"type":1,"speed":[150,180],"number":1,"error":0},"propeller":false,"texture":[3.9,2.9]},"detail5":{"section_segments":6,"offset":{"x":92,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[-25,-30,-20,0,20,30,25],"z":[0,0,0,0,0,0,0]},"width":[0,3,6,9,6,3,0],"height":[0,3,5,7,5,3,0],"texture":[0.9,3.9,63,63,3.9,0.9],"angle":0,"laser":{"damage":[6,9],"rate":2,"type":1,"speed":[100,160],"number":1,"error":0}},"detail6":{"section_segments":6,"offset":{"x":78,"y":0,"z":0},"position":{"x":[-12,-12,-10,0,0,0,-10,-14,-14],"y":[-80,-80,-75,-10,0,10,75,80,80],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,5,12,16,18,16,12,5,0],"height":[0,2,10,15,16,16,10,2,0],"texture":[63,63,10,63,63,15,63],"angle":0,"propeller":false},"detail7":{"section_segments":6,"offset":{"x":77,"y":0,"z":0},"position":{"x":[-10,-10,0,0,0,-10,-10],"y":[-75,-75,-10,0,10,75,75],"z":[0,0,0,0,0,0,0]},"width":[0,12,16,18,16,12,0],"height":[0,10,15,16,16,10,0],"texture":[3.9,8,3.9,3.9,8,3.9],"angle":0,"propeller":false},"detail8":{"section_segments":4,"offset":{"x":72,"y":-45,"z":9.6},"position":{"x":[-6,-6,4,4],"y":[-35,-35,30,30],"z":[6,6,0,0]},"width":[0,2,2,0],"height":[0,1,1,0],"texture":[17],"angle":180,"propeller":false},"detail9":{"section_segments":6,"offset":{"x":0,"y":6,"z":-18},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-10,-10,7,22,22,20,20,20],"z":[0,0,0,-10,-10,-10,-10,-10]},"width":[0,30,30,13,10,10,7,0],"height":[0,45,35,23,18,18,14,0],"texture":[2.9,2.9,3.9,8,3.9,63,3.9],"vertical":true},"detail10":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":20,"z":-45},"position":{"x":[0,0,0,0,0,0,0],"y":[-25,-25,-5,11,11,9,9],"z":[0,0,0,0,0,0,0]},"width":[0,40,40,15,12,12,0],"height":[0,15,15,15,12,12,0],"texture":[4,4,12,63,4,4],"vertical":true},"detail11":{"section_segments":10,"offset":{"x":0,"y":20,"z":-45},"position":{"x":[0,0,0,0,0,0],"y":[7,13,12,14,14],"z":[0,0,0,0,0,0]},"width":[10,7,5,3,0],"height":[10,7,5,3,0],"texture":[4,17,8,4],"vertical":true},"detail12":{"section_segments":[45,135,225,315],"offset":{"x":-20,"y":53,"z":23},"position":{"x":[0,0,0,0],"y":[-7.3,-7.3,10,10],"z":[-7.7,-7.7,1,1]},"width":[0,2,2,0],"height":[0,2,12,0],"texture":[4,17,4],"angle":90},"detail13":{"section_segments":[45,135,225,315],"offset":{"x":-20,"y":37,"z":23},"position":{"x":[0,0,0,0],"y":[-7.3,-7.3,10,10],"z":[-7.7,-7.7,1,1]},"width":[0,2,2,0],"height":[0,2,12,0],"texture":[4,17,4],"angle":90},"detail14":{"section_segments":[45,135,225,315],"offset":{"x":-18,"y":33,"z":18.5},"position":{"x":[0,0,0,0],"y":[-4,-4,4,4],"z":[-1,-1,0,0]},"width":[0,23,8,0],"height":[0,2,12,0],"texture":[1],"angle":90},"detail15":{"section_segments":4,"offset":{"x":78,"y":30,"z":8},"position":{"x":[0.2,0.2,0],"y":[-20,-20,45],"z":[-0.2,-0.2,-2]},"width":[0,14,0],"height":[0,9,0],"texture":[1]},"detail16":{"section_segments":4,"offset":{"x":68,"y":13,"z":0},"position":{"x":[0,0,0],"y":[-5,0,5],"z":[0,0,0]},"width":[0,8,0],"height":[0,20,0],"texture":[1,1],"vertical":true,"angle":-30},"detail17":{"section_segments":6,"offset":{"x":62,"y":-6,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[7,13,12,14,14],"z":[0,0,0,0,0,0]},"width":[9,7,5,2,0],"height":[9,7,5,2,0],"texture":[3.9,16.9,0.9,0.9],"vertical":true}},"wings":{"main":{"length":[80],"width":[40,40],"angle":[0,0],"position":[0,0],"doubleside":true,"bump":{"position":0,"size":20},"texture":63,"offset":{"x":0,"y":0,"z":-0.5}},"main2":{"length":[80],"width":[27,34],"angle":[0,0],"position":[0,0],"doubleside":true,"bump":{"position":0,"size":30},"texture":4,"offset":{"x":0,"y":0,"z":0}},"font2":{"doubleside":true,"offset":{"x":0,"y":-30,"z":0},"length":[40],"width":[50,15],"angle":[-10],"position":[-18,30],"texture":[17],"bump":{"position":50,"size":18}}},"typespec":{"name":"H-Conqueror","level":4,"model":6,"code":406,"specs":{"shield":{"capacity":[200,275],"reload":[4,6]},"generator":{"capacity":[150,200],"reload":[45,60]},"ship":{"mass":200,"speed":[80,90],"rotation":[35,50],"acceleration":[70,90]}},"shape":[3.061,2.811,2.171,1.679,1.538,3.53,3.689,3.665,3.423,3.266,3.374,3.374,3.392,3.393,3.374,3.374,3.266,3.423,3.665,3.689,3.53,2.933,3.131,3.039,2.942,2.384,2.942,3.039,3.131,2.933,3.53,3.689,3.665,3.423,3.266,3.374,3.374,3.392,3.393,3.374,3.374,3.266,3.423,3.665,3.689,3.53,1.538,1.679,2.171,2.811],"lasers":[{"x":0,"y":-3.06,"z":-0.34,"angle":0,"damage":[35,45],"rate":1.5,"type":1,"speed":[150,180],"number":1,"spread":0,"error":0,"recoil":0},{"x":3.128,"y":-1.02,"z":0,"angle":0,"damage":[6,9],"rate":2,"type":1,"speed":[100,160],"number":1,"spread":0,"error":0,"recoil":0},{"x":-3.128,"y":-1.02,"z":0,"angle":0,"damage":[6,9],"rate":2,"type":1,"speed":[100,160],"number":1,"spread":0,"error":0,"recoil":0}],"radius":3.689}}';
var M_Defender_407 = '{"name":"M-Defender","level":4,"model":7,"size":1.6,"specs":{"shield":{"capacity":[225,300],"reload":[5,7]},"generator":{"capacity":[125,175],"reload":[35,48]},"ship":{"mass":225,"speed":[80,90],"rotation":[40,55],"acceleration":[70,90]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":50,"y":0,"z":0},"position":{"x":[-10,-10,-50],"y":[-80,-80,0],"z":[0,0,0,0]},"width":[0,6,25],"height":[0,6,10],"texture":[18]},"detail2":{"section_segments":6,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[-45,-50,-30,20,65,75,75],"z":[0,0,0,0,0,0,0]},"width":[0,7,15,25,15,7,0],"height":[0,7,15,20,15,7,0],"texture":[12.9,63,18,8.2,3.9]},"detail3":{"section_segments":6,"offset":{"x":0,"y":-5,"z":9},"position":{"x":[0,0,0,0,0],"y":[-10,-10,20,32,32],"z":[0,0,0,4,4]},"width":[0,8,15,10,0],"height":[0,8,16,5,0],"texture":[7,9,63,63]},"detail4":{"section_segments":6,"offset":{"x":70,"y":-28,"z":0},"position":{"x":[0,0,0,0,0],"y":[50,50,90,95,85],"z":[0,0,0,0,0]},"width":[0,20,13,10,0],"height":[0,19,8,7,0],"texture":[3.9,63,3.9,16.9],"propeller":true},"detail5":{"section_segments":6,"offset":{"x":47,"y":-33,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-80,-83,-63,-55,-50,-50],"z":[0,0,0,0,0,0]},"width":[0,3,8,20,20,0],"height":[0,3,8,11,11,0],"texture":[3.9,3.9,16.9,63],"laser":{"damage":[25,35],"rate":1.75,"type":2,"speed":[120,160],"number":1,"angle":0,"error":0}},"detail6":{"section_segments":[0,60,120,180],"offset":{"x":-57,"y":-28,"z":0},"position":{"x":[0,0,-13,-13],"y":[-47,-47,-8,-8],"z":[0,0,0,0]},"width":[0,20,20,0],"height":[0,15,15,0],"texture":[3.9]},"detail7":{"section_segments":[0,60,120,180],"offset":{"x":47,"y":-28,"z":0},"position":{"x":[0,0,17,23,23],"y":[-55,-55,0,50,50],"z":[0,0,0,0,0,0]},"width":[0,20,20,20,0],"height":[0,11,19,19,0],"texture":[11]},"detail8":{"section_segments":[0,60,120,180],"offset":{"x":-72,"y":25,"z":0},"position":{"x":[0,0,-4,-4],"y":[-50,-50,-11,-11],"z":[0,0,0,0]},"width":[0,20,20,0],"height":[0,15,15,0],"texture":[3.9,3.9]},"detail9":{"section_segments":6,"offset":{"x":22,"y":30,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[-25,-25,-20,0,40,50,40],"z":[0,0,0,0,0,0,0]},"width":[0,10,15,15,15,12,0],"height":[0,10,15,15,15,12,0],"propeller":true,"texture":[3.9,3.9,12.9,0.9,63,16.9]},"detail10":{"section_segments":[45,135,225,315],"angle":-60,"offset":{"x":35,"y":20,"z":0},"position":{"x":[0,0,0,0],"y":[-36,-36,3,3],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,2,2,0],"texture":[17]},"detail11":{"section_segments":6,"offset":{"x":50,"y":1,"z":0},"position":{"x":[-10,-10,-50],"y":[-80,-80,0],"z":[0,0,0,0]},"width":[0,6,25],"height":[0,6,10],"texture":[3]},"detail12":{"section_segments":[0,60,120,180],"offset":{"x":-7,"y":20,"z":0},"position":{"x":[5,5,0,0,-12,-12],"y":[-73,-73,-10,30,45,45],"z":[0,0,0,0,2,2]},"width":[0,5,20,20,5,0],"height":[0,11,25,25,15,0],"texture":[16.9,3.9,10,3.9]},"detail13":{"section_segments":10,"offset":{"x":0,"y":10,"z":-26},"position":{"x":[0,0,0,0,0,0],"y":[7,14,14,13,13],"z":[0,0,0,0,0,0]},"width":[7,7,5.5,3,0],"height":[7,7,5.5,3,0],"texture":[63,63,17,4],"vertical":true},"detail14":{"section_segments":10,"offset":{"x":0,"y":10,"z":-41},"position":{"x":[0,0,0,0,0,0],"y":[7,14,14,13,13],"z":[0,0,0,0,0,0]},"width":[7,7,5.5,3,0],"height":[7,7,5.5,3,0],"texture":[63,63,17,4],"vertical":true},"detail15":{"vertical":true,"angle":30,"section_segments":[45,135,225,315],"offset":{"x":19.5,"y":0,"z":-38},"position":{"x":[0,0,0,0,0],"y":[14,14,19,19],"z":[0,0,0,0]},"width":[0,8,8,8],"height":[0,40,25,0],"texture":[4,17.95,15]},"detail16":{"section_segments":6,"offset":{"x":71,"y":-28,"z":0},"position":{"x":[0,0,0,-1],"y":[50,50,90,90],"z":[0,0,0,0]},"width":[0,20,13,13],"height":[0,19,8,8],"texture":[3.9,12.9]},"detail17":{"section_segments":6,"offset":{"x":54,"y":1,"z":-14},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-12,-12,6,6,5,5,7,7],"z":[0,0,0,0,0,0,0,0]},"width":[0,14,14,12,12,10,10,0],"height":[0,14,14,12,12,10,10,0],"vertical":true,"texture":[0.9,0.9,3.9,3.9,1.9,3.9,63]},"detail18":{"section_segments":[0,60,120,180],"offset":{"x":-61,"y":-28,"z":0},"position":{"x":[0,0,-13,-13],"y":[-47,-47,-8,-8],"z":[0,0,0,0]},"width":[0,20,20,0],"height":[0,12,12,0],"texture":[3.9,63,3.9]},"detail19":{"section_segments":[0,60,120,180],"offset":{"x":-76,"y":25,"z":0},"position":{"x":[0,0,-4,-4],"y":[-50,-50,-11,-11],"z":[0,0,0,0]},"width":[0,20,20,0],"height":[0,12,12,0],"texture":[3.9,63,3.9]}},"wings":{"detail":{"doubleside":true,"offset":{"x":0,"y":5,"z":0},"length":[51,0],"width":[60,75],"angle":[0],"position":[0,-30],"texture":[1],"bump":{"position":-50,"size":14}},"detail2":{"doubleside":true,"offset":{"x":30,"y":52,"z":0},"length":[0,20],"width":[0,50,0],"angle":[0,0],"position":[0,0,50],"texture":[63],"bump":{"position":40,"size":16}},"detail3":{"doubleside":true,"offset":{"x":81,"y":40,"z":0},"length":[0,15],"width":[0,40,10],"angle":[0,0],"position":[2,2,25],"texture":[1],"bump":{"position":40,"size":9}},"detail4":{"doubleside":true,"offset":{"x":50,"y":-55,"z":5},"length":[15,0],"width":[15,15,0],"angle":[0,0],"position":[0,0],"texture":[15],"bump":{"position":20,"size":55}},"detail5":{"doubleside":true,"offset":{"x":65,"y":-5,"z":5},"length":[15,0],"width":[15,15,0],"angle":[0,0],"position":[0,0],"texture":[15],"bump":{"position":20,"size":55}},"detail6":{"doubleside":true,"offset":{"x":50,"y":-55,"z":-5},"length":[15,0],"width":[15,15,0],"angle":[0,0],"position":[0,0],"texture":[15],"bump":{"position":20,"size":55}},"detail7":{"doubleside":true,"offset":{"x":65,"y":-5,"z":-5},"length":[15,0],"width":[15,15,0],"angle":[0,0],"position":[0,0],"texture":[15],"bump":{"position":20,"size":55}},"detail8":{"doubleside":true,"offset":{"x":50,"y":-56,"z":5},"length":[15,0],"width":[15,15,0],"angle":[0,0],"position":[0,0],"texture":[17],"bump":{"position":20,"size":47}},"detail9":{"doubleside":true,"offset":{"x":65,"y":-6,"z":5},"length":[15,0],"width":[15,15,0],"angle":[0,0],"position":[0,0],"texture":[17],"bump":{"position":20,"size":49}}},"typespec":{"name":"M-Defender","level":4,"model":7,"code":407,"specs":{"shield":{"capacity":[225,300],"reload":[5,7]},"generator":{"capacity":[125,175],"reload":[35,48]},"ship":{"mass":225,"speed":[80,90],"rotation":[40,55],"acceleration":[70,90]}},"shape":[1.699,1.708,1.911,4.037,3.842,3.501,3.47,3.453,3.287,3.187,3.141,3.086,3.068,3.132,3.146,2.974,3.365,3.796,3.802,3.131,2.334,3.635,3.386,2.691,2.606,2.405,2.606,2.691,3.386,3.635,2.334,3.131,3.802,3.796,3.365,2.974,3.146,3.132,3.068,3.086,3.141,3.187,3.287,3.453,3.47,3.501,3.842,4.037,1.911,1.708],"lasers":[{"x":1.504,"y":-3.712,"z":0,"angle":0,"damage":[25,35],"rate":1.75,"type":2,"speed":[120,160],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.504,"y":-3.712,"z":0,"angle":0,"damage":[25,35],"rate":1.75,"type":2,"speed":[120,160],"number":1,"spread":0,"error":0,"recoil":0}],"radius":4.037}}';
var Simuran_408 = '{"name":"Simuran","level":4,"model":8,"size":2.18,"specs":{"shield":{"capacity":[225,300],"reload":[5,7]},"generator":{"capacity":[125,175],"reload":[40,55]},"ship":{"mass":225,"speed":[75,85],"rotation":[40,50],"acceleration":[80,110]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":-20,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-47,-47,-45,-30,-30,0,40,60,60],"z":[5,5,5,5,0,0,0,0,0]},"width":[0,8,12,12,17,25,25,15,0],"height":[0,2,5,5,10,15,15,15,0],"texture":[3.9,16.9,8,0.9,3.9,11,63]},"detail2":{"section_segments":6,"offset":{"x":0,"y":-35,"z":7},"position":{"x":[0,0,0,0,0,0,0],"y":[-10,-10,0,20,35,40,40],"z":[0,0,0,0,0,5,5]},"width":[0,6,10,13,10,7,0],"height":[0,5,10,17,17,7,0],"propeller":false,"texture":[7,9,9,4]},"detail3":{"section_segments":6,"offset":{"x":0,"y":-50,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-35,-40,-38,-26,25,35],"z":[0,0,0,0,0,0]},"width":[0,2,3,7,7,3],"height":[0,2,3,7,7,3],"texture":[1.9,63,3.9,18,3.9],"laser":{"damage":[35,45],"rate":2.75,"type":1,"speed":[120,150],"number":1,"error":2}},"detail4":{"section_segments":6,"offset":{"x":20,"y":-20,"z":-4},"position":{"x":[-20,0,0,0,0,0],"y":[-65,-40,-30,-25,25,35],"z":[4,1,0,0,0,0]},"width":[3,3,3,7,7,3],"height":[3,3,3,7,7,3],"texture":[63,63,63,15,2.9]},"detail5":{"section_segments":6,"offset":{"x":0,"y":20,"z":12},"position":{"x":[0,0,0,0,0,0,0],"y":[-25,-25,-20,0,20,40,30],"z":[0,0,0,0,0,0,0]},"width":[0,5,10,10,15,10,0],"height":[0,5,10,10,15,10,0],"angle":0,"propeller":true,"texture":[3,3,10.245,4,63,16.9]},"detail6":{"section_segments":6,"offset":{"x":15,"y":-20,"z":-10},"position":{"x":[0,0,0,0,0,0,0],"y":[20,20,25,30,40,60,50],"z":[0,0,0,0,0,0,0]},"width":[0,5,8,8,13,10,0],"height":[0,5,8,8,13,10,0],"texture":[3.9,3.9,63,3.9,3.9,16.9],"propeller":true},"detail7":{"section_segments":[0,60,120,180],"offset":{"x":-6,"y":-20,"z":7},"position":{"x":[3,3,0,0,-8,-8],"y":[-28,-28,0,20,35,35],"z":[0,0,0,0,3,3]},"width":[0,5,15,15,5,0],"height":[0,5,14,14,3,0],"texture":[16.9,1,18,4]},"detail8":{"section_segments":[0,60,120,180],"offset":{"x":-7,"y":-10,"z":10},"position":{"x":[0,0,0,0],"y":[-10,-10,10,10],"z":[0,0,0,0]},"width":[0,12,12,0],"height":[0,11,11,0],"texture":[10]},"detail9":{"section_segments":10,"offset":{"x":0,"y":27,"z":-36},"position":{"x":[0,0,0,0,0,0],"y":[7,13,12,14,14],"z":[0,0,0,0,0,0]},"width":[5,4,3,2,0],"height":[5,4,3,2,0],"texture":[4,8,17,4],"vertical":true},"detail10":{"section_segments":10,"offset":{"x":0,"y":13,"z":9},"position":{"x":[0,0,0,0,0,0],"y":[7,12,11,12,12],"z":[0,0,0,0,0,0]},"width":[6,5,3,2,0],"height":[6,5,3,2,0],"texture":[4,17,4,1],"vertical":true},"detail11":{"section_segments":6,"offset":{"x":15,"y":-3,"z":9},"position":{"x":[0,0,0,0,0,0],"y":[-2,0.7,2,2,-2,-2],"z":[0,0,0,0,0,0]},"width":[10,10,10,8,8,10],"height":[10,10,10,8,8,10],"texture":[3.9,63,3.9]},"detail12":{"section_segments":6,"offset":{"x":15,"y":-17,"z":9},"position":{"x":[0,0,0,0,0,0],"y":[-2,0.7,2,2,-2,-2],"z":[0,0,0,0,0,0]},"width":[10,10,10,8,8,10],"height":[10,10,10,8,8,10],"texture":[3.9,63,3.9]},"detail13":{"section_segments":6,"offset":{"x":15,"y":-10,"z":9},"position":{"x":[0,0,0,0,0,0],"y":[-2,0.7,2,2,-2,-2],"z":[0,0,0,0,0,0]},"width":[10,10,10,8,8,10],"height":[10,10,10,8,8,10],"texture":[3.9,63,3.9]},"detail14":{"section_segments":6,"offset":{"x":22,"y":-20,"z":-2},"position":{"x":[0,0,0,0],"y":[-25,-25,25,25],"z":[0,0,0,0]},"width":[0,4,4,0],"height":[0,4,4,0],"texture":[3.9,17,2.9],"angle":180}},"wings":{"detail":{"doubleside":true,"offset":{"x":20,"y":20,"z":0},"length":[15,15,-5,15,-4,10],"width":[35,35,35,85,50,40,20],"angle":[40,40,0,0,0,0],"position":[-20,-20,-10,5,-10,-10,10],"texture":[4,18.2,3,63,10.1],"bump":{"position":-45,"size":10}},"detail2":{"doubleside":true,"offset":{"x":0,"y":60,"z":10},"length":[0,20,0,10,-2,0],"width":[35,35,35,70,50,35,0],"angle":[90,90,90,90,90,90],"position":[-40,-40,-20,-20,-10,-14,-14],"texture":[4,4,4,15,17,4],"bump":{"position":-35,"size":15}},"detail3":{"doubleside":true,"offset":{"x":20,"y":19,"z":0},"length":[15,15,0],"width":[35,35,35,0],"angle":[40,40,0],"position":[-20,-20,-10,5],"texture":[17],"bump":{"position":-45,"size":10}}},"typespec":{"name":"Simuran","level":4,"model":8,"code":408,"specs":{"shield":{"capacity":[225,300],"reload":[5,7]},"generator":{"capacity":[125,175],"reload":[40,55]},"ship":{"mass":225,"speed":[75,85],"rotation":[40,50],"acceleration":[80,110]}},"shape":[3.691,3.359,2.974,2.705,2.229,1.992,1.676,1.453,1.515,1.867,2.258,2.243,2.188,2.255,2.42,2.599,2.759,2.922,2.71,2.852,3.06,3.176,1.812,2.213,2.485,3.075,2.485,2.213,1.812,3.176,3.06,2.852,2.71,2.922,2.759,2.599,2.42,2.255,2.188,2.243,2.258,1.867,1.515,1.453,1.676,1.992,2.229,2.705,2.974,3.359],"lasers":[{"x":0,"y":-3.69,"z":0,"angle":0,"damage":[35,45],"rate":2.75,"type":1,"speed":[120,150],"number":1,"spread":0,"error":2,"recoil":0}],"radius":3.691}}';
 
var Atlant_501 = '{"name":"Atlant","level":5,"model":1,"size":2.63,"specs":{"shield":{"capacity":[275,325],"reload":[6,9]},"generator":{"capacity":[150,200],"reload":[65,80]},"ship":{"mass":250,"speed":[75,85],"rotation":[60,75],"acceleration":[105,135]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":20,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-45,-40,-2,2,40,40],"z":[0,0,0,0,0,0]},"width":[0,15.5,15.5,19,19,0],"height":[0,21,21,21,21,0],"texture":[0.9,8.2,3.9,10.245,0.9]},"detail2":{"section_segments":6,"offset":{"x":0,"y":-36,"z":0},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-40,-40,-31,-25,-15,15,20,20],"z":[-5,-5,-5,-5,-5,0,0,0]},"width":[0,2,4,12,16,22,22,0],"height":[0,2,4,10,16,24,24,0],"propeller":false,"texture":[3.9,17,63,3.9,12.9,3.9],"laser":{"damage":[70,90],"rate":1.25,"type":2,"speed":[210,245],"number":1,"error":0,"recoil":125}},"detail3":{"section_segments":6,"offset":{"x":0,"y":-53,"z":17},"position":{"x":[0,0,0,0,0,0,0],"y":[12,12,20,35,50,53,53],"z":[-5,-5,-3,0,0,0,0]},"width":[0,5,10,14,13,10,0],"height":[0,4,5,6,6,4,0],"propeller":false,"texture":[63]},"detail4":{"section_segments":6,"offset":{"x":15,"y":40,"z":0},"position":{"x":[0,0,0,0,0],"y":[-20,-20,-15,15,18],"z":[0,0,0,0,0]},"width":[0,5,7,7,0],"height":[0,8,10,10,0],"propeller":false,"texture":[63,63,11,63]},"detail5":{"section_segments":6,"offset":{"x":30,"y":40,"z":-20},"position":{"x":[0,0,0,0,0,0],"y":[-32,-32,-26,26,32,32],"z":[0,0,0,0,0,0]},"width":[0,3,6,6,3,0],"height":[0,3,9,9,3,0],"propeller":false,"texture":[63]},"detail6":{"section_segments":6,"offset":{"x":10,"y":52,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-18,-15,11,15,18,10],"z":[0,0,0,0,0,0]},"width":[0,10,10,10,7,0],"height":[0,10,10,10,7,0],"propeller":true,"texture":[3.9,12.9,16.9,63,16.9]},"detail7":{"section_segments":6,"angle":0,"offset":{"x":0,"y":-15,"z":20},"position":{"x":[0,0,0,0,0,0],"y":[-20,-20,-5,5,10,10],"z":[-3,-4,0,0,0,0]},"width":[0,5,10,10,8,0],"height":[0,3,8,8,5,0],"propeller":false,"texture":[7,9,9,3.9]},"detail8":{"section_segments":6,"offset":{"x":50,"y":35,"z":-20},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-65,-67,-61,-55,-28,-20,0,25,30,30],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,1.5,2.5,2.5,3,3,7,7,5,0],"height":[0,1.5,2.5,2.5,3,3,7,7,5,0],"texture":[3.9,0.9,16.9,3.9,10.25,63,11,3.9,3.9],"angle":0,"laser":{"damage":[7,11],"rate":4,"type":1,"speed":[100,150],"number":1,"error":0}},"detail9":{"section_segments":6,"offset":{"x":29,"y":40,"z":-20},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-30,-30,-26,-10,10,26,30,30],"z":[0,0,0,0,0,0,0,0]},"width":[0,3,6,6,6,6,3,0],"height":[0,5,9,9,9,9,5,0],"propeller":false,"texture":[3.9,3.9,10.245,15,10.245,3.9]},"detail10":{"section_segments":[45,135,225,315],"offset":{"x":30,"y":40,"z":-16},"position":{"x":[0,0,0,0],"y":[-6,-6,6,6],"z":[0,0,0,0]},"width":[0,36,36,0],"height":[0,2,2,0],"angle":90,"texture":[3.9,17,3.9]},"detail11":{"section_segments":[45,135,225,315],"offset":{"x":30,"y":40,"z":-16},"position":{"x":[0,0,0,0],"y":[-6,-6,6,6],"z":[0,0,0,0]},"width":[0,36,36,0],"height":[0,2,2,0],"angle":90,"texture":[3.9,17,3.9]},"detail12":{"section_segments":6,"offset":{"x":50,"y":35,"z":-20},"position":{"x":[0,0,0,0,0,0],"y":[-20,-20,0,20,23,23],"z":[0,0,4,4,4,4,4]},"width":[0,3,4,4,3,0],"height":[0,3,4,4,3,0],"texture":[3.9,3.9,15,63]},"detail13":{"section_segments":6,"offset":{"x":0,"y":-74,"z":-5},"position":{"x":[0,0,0,0],"y":[-2,-3,2,2],"z":[0,0,0,0]},"width":[0,2,3.3,0],"height":[0,2,3.3,0],"texture":[3.9]},"detail14":{"section_segments":[45,135,225,315],"offset":{"x":16,"y":40,"z":-16},"position":{"x":[0,0,0,0],"y":[-10,-10,15,15],"z":[20,20,-5,-5]},"width":[0,18,18,0],"height":[0,5,5,0],"angle":90,"texture":[18]},"detail15":{"section_segments":[45,135,225,315],"offset":{"x":2,"y":-7,"z":0},"position":{"x":[0,0,0,0,0],"y":[-10,-10,14,16,16],"z":[0,0,0,0,0]},"width":[0,18,18,15,0],"height":[0,10,10,10,0],"texture":[63,17,63],"angle":90},"detail16":{"section_segments":10,"offset":{"x":0,"y":11,"z":-15},"position":{"x":[0,0,0,0,0,0,0],"y":[0,12,12,10,12,12],"z":[0,0,0,0,0,0,0]},"width":[9,9,8,6,4,0],"height":[9,9,8,6,4,0],"texture":[4,4,17,4,18],"vertical":true},"detail17":{"section_segments":6,"offset":{"x":10,"y":30,"z":5},"position":{"x":[0,0,0,0,0,0],"y":[-2,0.7,2,2,-2,-2],"z":[0,0,0,0,0,0]},"width":[10,10,10,8,8,10],"height":[10,10,10,8,8,10],"texture":[3.9,63,3.9]},"detail18":{"section_segments":6,"offset":{"x":10,"y":37,"z":5},"position":{"x":[0,0,0,0,0,0],"y":[-2,0.7,2,2,-2,-2],"z":[0,0,0,0,0,0]},"width":[10,10,10,8,8,10],"height":[10,10,10,8,8,10],"texture":[3.9,63,3.9]},"detail19":{"section_segments":6,"offset":{"x":10,"y":44,"z":5},"position":{"x":[0,0,0,0,0,0],"y":[-2,0.7,2,2,-2,-2],"z":[0,0,0,0,0,0]},"width":[10,10,10,8,8,10],"height":[10,10,10,8,8,10],"texture":[3.9,63,3.9]},"detail20":{"section_segments":6,"offset":{"x":10,"y":51,"z":5},"position":{"x":[0,0,0,0,0,0],"y":[-2,0.7,2,2,-2,-2],"z":[0,0,0,0,0,0]},"width":[10,10,10,8,8,10],"height":[10,10,10,8,8,10],"texture":[3.9,63,3.9]},"detail21":{"section_segments":[45,135,225,315],"offset":{"x":1,"y":7,"z":-40},"position":{"x":[0,0,0,0,0],"y":[-5,-5,15,16,16],"z":[0,0,0,0,0]},"width":[0,3,3,2,0],"height":[0,20,20,18,0],"texture":[63,17,63],"angle":50,"vertical":true}},"wings":{"detail":{"length":[5,4,8],"width":[50,46,20,16],"angle":[0,0,0],"position":[0,0,6,4],"doubleside":true,"offset":{"x":33,"y":40,"z":-20},"bump":{"position":35,"size":9},"texture":[8,4,17]},"detail2":{"doubleside":true,"offset":{"x":48,"y":47,"z":-20},"length":[0,10,0,2,4.5,0],"width":[0,10,10,35,35,30,0],"angle":[0,0,0,0,0,0],"position":[0,0,0,-5,-5,-3,-3],"texture":[4,4,4,17,63],"bump":{"position":35,"size":15}},"detail3":{"length":[5,4,9],"width":[50,46,20,16],"angle":[0,0,0],"position":[0,0,6,4],"doubleside":true,"offset":{"x":33,"y":41,"z":-20},"bump":{"position":35,"size":9},"texture":[4]}},"typespec":{"name":"Atlant","level":5,"model":1,"code":501,"specs":{"shield":{"capacity":[275,325],"reload":[6,9]},"generator":{"capacity":[150,200],"reload":[65,80]},"ship":{"mass":250,"speed":[75,85],"rotation":[60,75],"acceleration":[105,135]}},"shape":[4.051,3.497,3.138,2.507,2.043,1.742,1.542,1.373,3.18,3.109,2.95,2.837,2.776,2.787,2.856,3.035,3.871,4.193,4.598,4.545,4.437,4.102,4.157,3.778,3.748,3.689,3.748,3.778,4.157,4.102,4.437,4.545,4.598,4.193,3.871,3.035,2.856,2.787,2.776,2.837,2.95,3.109,3.18,1.373,1.542,1.742,2.043,2.507,3.138,3.497],"lasers":[{"x":0,"y":-3.998,"z":0,"angle":0,"damage":[70,90],"rate":1.25,"type":2,"speed":[210,245],"number":1,"spread":0,"error":0,"recoil":125},{"x":2.63,"y":-1.683,"z":-1.052,"angle":0,"damage":[7,11],"rate":4,"type":1,"speed":[100,150],"number":1,"spread":0,"error":0,"recoil":0},{"x":-2.63,"y":-1.683,"z":-1.052,"angle":0,"damage":[7,11],"rate":4,"type":1,"speed":[100,150],"number":1,"spread":0,"error":0,"recoil":0}],"radius":4.598}}';
var Vortex_502 = '{"name":"Vortex","level":5,"model":2,"size":1.85,"specs":{"shield":{"capacity":[250,300],"reload":[5,8]},"generator":{"capacity":[200,250],"reload":[65,90]},"ship":{"mass":265,"speed":[70,80],"rotation":[55,70],"acceleration":[90,125]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-90,-95,-85,-45,-10,0,30,65,55],"z":[2,2,2,0,0,0,0,0,0,0]},"width":[0,4,6,17,20,20,20,12,0],"height":[0,2,7,15,17,17,17,10,0],"propeller":true,"texture":[3.9,63,8,3,63,10,3,17]},"detail2":{"section_segments":6,"offset":{"x":0,"y":-34,"z":12},"position":{"x":[0,0,0,0,0,0],"y":[-25,-25,0,15,37,37],"z":[1,1,-1,0,9.5,9.5]},"width":[0,4,11,11,6,0],"height":[0,3,12,12,4,0],"propeller":false,"texture":[7,9,9,3.9]},"detail3":{"section_segments":6,"offset":{"x":15,"y":10,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[5,5,10,40,70,60],"z":[0,0,0,0,0,0]},"width":[0,4,8,12,7,0],"height":[0,4,8,12,7,0],"texture":[3.9,3.9,11,3.9,16.9],"propeller":true},"detail4":{"section_segments":[45,135,225,315],"offset":{"x":22,"y":-50,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,40,40],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[4]},"detail5":{"section_segments":10,"offset":{"x":0,"y":14,"z":10},"position":{"x":[0,0,0,0,0,0],"y":[7,12,11,12,12],"z":[0,0,0,0,0,0]},"width":[7,6,4,3,0],"height":[7,6,4,3,0],"texture":[4,17,4,1],"vertical":true},"detail6":{"section_segments":6,"offset":{"x":55,"y":10,"z":-17},"position":{"x":[0,0,0,0,0],"y":[0,0,5,25,25],"z":[0,0,0,0,0]},"width":[0,8,11,11,0],"height":[0,8,11,11,0],"texture":[3.9,16.9,3.9],"angle":2},"detail7":{"section_segments":[0,60,120,180],"offset":{"x":-55,"y":10,"z":-17},"position":{"x":[0,0,0,0,0],"y":[-45,-45,-40,0,0],"z":[0,0,0,0,0]},"width":[0,2,6,8,0],"height":[0,5,6,8,0],"texture":[63,63,1,3.9],"angle":-2},"detail8":{"section_segments":6,"offset":{"x":51.3,"y":15,"z":-17},"position":{"x":[0,0,0,0],"y":[-20,-20,30,30],"z":[0,0,0,0]},"width":[0,1,1,0],"height":[0,1,1,0],"texture":[17],"angle":182},"detail9":{"section_segments":6,"offset":{"x":50.25,"y":-14,"z":-17},"position":{"x":[0,0,0,0,0,0],"y":[-4,-6,-4,4,6,6],"z":[0,0,0,0,0,0]},"width":[0,1.7,2.5,2.5,1.7,0],"height":[0,1.7,2.5,2.5,1.7,0],"texture":[3.9,17,63,3.9],"angle":2,"laser":{"damage":[35,50],"rate":2.15,"type":1,"speed":[210,260],"recoil":200,"number":1}},"detail10":{"section_segments":6,"offset":{"x":0,"y":5,"z":13},"position":{"x":[0,0,0,0,0,0,0],"y":[-5,-3,3,5,5,-5,-5],"z":[0,0,0,0,0,0,0]},"width":[15,15,15,15,13,13,15],"height":[10,10,10,10,8,8,10],"texture":[63,10.1,63,3.9],"angle":90}},"wings":{"detail":{"length":[0,27,33],"width":[90,60,39,4],"angle":[0,0,0],"position":[-7,0,30,60],"doubleside":true,"offset":{"x":30,"y":10,"z":-6},"bump":{"position":30,"size":15},"texture":[4,11.2,63]},"detail2":{"length":[2,29],"width":[109,109,1],"angle":[0,0],"position":[-20,-20,50],"doubleside":true,"offset":{"x":0,"y":-11,"z":11},"bump":{"position":20,"size":11},"texture":[63]},"detail3":{"length":[30,25],"width":[60,40,10],"angle":[-10,-10],"position":[0,30,70],"doubleside":true,"offset":{"x":0,"y":14,"z":-5},"bump":{"position":30,"size":10},"texture":[4,63]},"detail4":{"length":[0,12,0],"width":[0,30,30,0],"angle":[0,0,0],"position":[0,0,10,10],"doubleside":true,"offset":{"x":16,"y":-100,"z":0},"bump":{"position":30,"size":20},"texture":[4]},"detail5":{"length":[0,10,0],"width":[0,20,20,0],"angle":[0,0,0],"position":[0,0,9,9],"doubleside":true,"offset":{"x":17,"y":-106,"z":0.3},"bump":{"position":30,"size":10},"texture":[17]},"detail6":{"length":[0,15,0],"width":[0,97,92,0],"angle":[0,0,0],"position":[-18.5,-18.5,-7,-7],"doubleside":true,"offset":{"x":20.5,"y":15,"z":-6},"bump":{"position":30,"size":15},"texture":[15]},"detail7":{"length":[30,0,27,33.5],"width":[100,90,60,40,8],"angle":[0,0,0,0],"position":[-30,-7,0,30,60],"doubleside":true,"offset":{"x":0,"y":13,"z":-6},"bump":{"position":30,"size":15},"texture":[10.16,4]},"detail8":{"length":[0,3,0],"width":[0,100,100,0],"angle":[0,0,0],"position":[0,0,3,3],"doubleside":true,"offset":{"x":34,"y":8,"z":-6},"bump":{"position":30,"size":15},"texture":[4,17,4]},"detail9":{"length":[0,15,0],"width":[0,97,92,0],"angle":[0,0,0],"position":[-18.5,-18.5,-7,-7],"doubleside":true,"offset":{"x":20.5,"y":16,"z":-6},"bump":{"position":30,"size":15},"texture":[4]},"detail10":{"length":[2,29],"width":[109,109,1],"angle":[0,0],"position":[-20,-20,50],"doubleside":true,"offset":{"x":0,"y":-10,"z":11},"bump":{"position":20,"size":11},"texture":[4]},"detail11":{"length":[-2,2,18],"width":[0,33,33,12],"angle":[0,0,0],"position":[-10,-10,-8.5,10],"doubleside":true,"offset":{"x":74,"y":64,"z":-6},"bump":{"position":20,"size":20},"texture":[1,4,1]},"detail12":{"doubleside":true,"offset":{"x":0,"y":70,"z":0},"length":[0,20,0,10,-2,0],"width":[35,35,35,70,50,35,0],"angle":[90,90,90,90,90,90],"position":[-40,-40,-20,-20,-10,-14,-14],"texture":[4,4,4,12,17,4],"bump":{"position":-35,"size":15}}},"typespec":{"name":"Vortex","level":5,"model":2,"code":502,"specs":{"shield":{"capacity":[250,300],"reload":[5,8]},"generator":{"capacity":[200,250],"reload":[65,90]},"ship":{"mass":265,"speed":[70,80],"rotation":[55,70],"acceleration":[90,125]}},"shape":[3.517,4.338,4.22,3.351,2.081,1.999,1.997,1.872,2.434,2.445,2.359,2.29,2.262,2.303,2.472,2.588,3.183,4.139,4.511,4.012,3.739,3.855,2.694,3.061,3.013,3.145,3.013,3.061,2.694,3.855,3.739,4.012,4.511,4.139,3.183,2.588,2.472,2.303,2.262,2.29,2.359,2.445,2.434,1.872,1.997,1.999,2.081,3.351,4.22,4.338],"lasers":[{"x":1.852,"y":-0.74,"z":-0.629,"angle":2,"damage":[35,50],"rate":2.15,"type":1,"speed":[210,260],"number":1,"spread":0,"error":0,"recoil":200},{"x":-1.852,"y":-0.74,"z":-0.629,"angle":-2,"damage":[35,50],"rate":2.15,"type":1,"speed":[210,260],"number":1,"spread":0,"error":0,"recoil":200}],"radius":4.511}}';
var Delta_Speedster_503 = '{"name":"Delta-Speedster","level":5,"model":3,"size":2.3,"specs":{"shield":{"capacity":[275,350],"reload":[6,8]},"generator":{"capacity":[175,250],"reload":[50,75]},"ship":{"mass":185,"speed":[105,120],"rotation":[85,110],"acceleration":[100,125]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-27,-27,-30,-27,-20,35,40,55,60,50],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[5,5,7,10,16,19,15,14,12,0],"height":[0,2,3,5,11,13,11,10,8,0],"propeller":true,"texture":[15,3.9,63,3.9,3.9,3.9,15,63,16.9]},"detail2":{"section_segments":6,"offset":{"x":0,"y":-14,"z":9},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-10,-10,5,15,28,30,35,35],"z":[-4,-4,0,0,0,0,0,0]},"width":[0,6,12,12,12,12,9,0],"height":[0,4,8,10,10,10,5,0],"propeller":false,"texture":[7,9,9,10.241,16.9,63]},"detail3":{"section_segments":5,"offset":{"x":0,"y":20,"z":2},"position":{"x":[0,0,9,9,-7,-20,-20],"y":[10,10,12,15,25,35,35],"z":[0,0,0,0,0,0,0]},"width":[0,30,55,55,45,30,0],"height":[0,10,15,15,15,10,0],"angle":90,"texture":[0.85,0.85,63,10.3,18,3.85]},"detail4":{"section_segments":5,"offset":{"x":0,"y":20,"z":2},"position":{"x":[-20,-20,-7,9,9,0,0,0],"y":[-35,-35,-25,-15,-12,-10,-10],"z":[0,0,0,0,0,0,0,0]},"width":[0,30,45,55,55,30,0],"height":[0,10,15,15,15,10,0],"angle":90,"texture":[3.85,18,10.3,63,0.85,0.85]},"detail5":{"section_segments":6,"offset":{"x":35,"y":30,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-95,-98,-95,-91,-70,-55,-50,-25,-5,0,20,25,25],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,1.8,2.5,2.5,4,6,3.5,5,6,8,8,5,0],"height":[0,1.8,2.5,2.5,4,6,3.5,5,6,8,8,5,0],"laser":{"damage":[40,55],"rate":0.9,"type":2,"speed":[100,130],"recoil":50,"number":1,"error":0},"propeller":false,"texture":[3.9,63,17,15,10.25,63,0.9,11,63,8,3.9]},"detail6":{"section_segments":6,"offset":{"x":0,"y":-10,"z":-3},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-23,-27,-24,0,5,20,25,25],"z":[0,0,0,0,0,0,0,0]},"width":[0,3,4,8,6,6,6,0],"height":[0,2,3,4,6,6,4,0],"laser":{"damage":[11,15],"rate":3.5,"type":1,"speed":[240,260],"number":1,"error":0},"texture":[3.9,16.9,8.2,63,15,3.9]},"detail7":{"section_segments":10,"offset":{"x":0,"y":9,"z":-29},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,0,6,6,4,4,7,7,9,9],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,7,7,6,6,5,5,4,2,0],"height":[0,7,7,6,6,5,5,4,2,0],"vertical":true,"texture":[1,4,63,4,17,17,4,18,63]},"detail8":{"section_segments":5,"offset":{"x":0,"y":21,"z":2},"position":{"x":[0,0,9,9,-7,-20,-20],"y":[10,10,12,15,25,35,35],"z":[0,0,0,0,0,0,0]},"width":[0,30,55,55,45,30,0],"height":[0,10,15,15,15,10,0],"angle":90,"texture":[0.85,0.85,63,11,18,3.85]},"detail9":{"section_segments":5,"offset":{"x":0,"y":21,"z":2},"position":{"x":[-20,-20,-7,9,9,0,0,0],"y":[-35,-35,-25,-15,-12,-10,-10],"z":[0,0,0,0,0,0,0,0]},"width":[0,30,45,55,55,30,0],"height":[0,10,15,15,15,10,0],"angle":90,"texture":[3.85,18,11,63,0.85,0.85]},"detail10":{"section_segments":6,"offset":{"x":15,"y":20,"z":-3},"position":{"x":[0,0,0,0,0,0,0],"y":[-15,-15,-10,30,35,50,40],"z":[0,0,0,0,0,0,0]},"width":[0,7,15,15,13,6,0],"height":[0,3,10,10,6,4,0],"texture":[63,63,12.9,3.9,16.9,16.9],"propeller":true},"detail11":{"section_segments":6,"offset":{"x":41,"y":39,"z":0},"position":{"x":[0,0,0,0,0],"y":[-1,2,2,-1,-1],"z":[0,0,0,0,0]},"width":[7,7,5,5,7],"height":[5,5,3,3,5],"texture":[1]},"detail12":{"section_segments":6,"offset":{"x":41,"y":45,"z":0},"position":{"x":[0,0,0,0,0],"y":[-1,2,2,-1,-1],"z":[0,0,0,0,0]},"width":[7,7,5,5,7],"height":[5,5,3,3,5],"texture":[1]},"detail13":{"section_segments":[45,135,225,315],"offset":{"x":32,"y":-5,"z":-40},"position":{"x":[0,0,0,0,0],"y":[-5,-5,15,16,16],"z":[0,0,0,0,0]},"width":[0,3,3,2,0],"height":[0,10,10,8,0],"texture":[63,17,63],"angle":30,"vertical":true}},"wings":{"detail":{"length":[25,3],"width":[42,15,10],"angle":[0,0],"position":[0,20,22],"doubleside":true,"offset":{"x":35,"y":40,"z":-2},"bump":{"position":30,"size":13},"texture":[3.8,63]},"detail2":{"length":[25,4],"width":[42,15,10],"angle":[-1,0],"position":[0,20,22],"doubleside":true,"offset":{"x":35,"y":41,"z":-2},"bump":{"position":30,"size":13},"texture":[1]},"detail3":{"length":[0,15,5],"width":[0,42,17,10],"angle":[90,90,90],"position":[0,0,18,22],"doubleside":true,"offset":{"x":12,"y":30,"z":5},"bump":{"position":20,"size":12},"texture":[4,17,63]},"detail4":{"length":[0,15,6],"width":[0,42,17,10],"angle":[90,90,90],"position":[0,0,18,22],"doubleside":true,"offset":{"x":12,"y":31,"z":5},"bump":{"position":20,"size":14},"texture":[1,1,63]}},"typespec":{"name":"Delta-Speedster","level":5,"model":3,"code":503,"specs":{"shield":{"capacity":[275,350],"reload":[6,8]},"generator":{"capacity":[175,250],"reload":[50,75]},"ship":{"mass":185,"speed":[105,120],"rotation":[85,110],"acceleration":[100,125]}},"shape":[1.705,1.706,1.998,2.022,3.551,3.199,2.743,2.45,2.257,2.022,1.892,1.83,1.799,1.822,1.876,1.966,2.103,2.569,4.035,4.295,4.023,3.581,3.548,3.351,3.278,2.765,3.278,3.351,3.548,3.581,4.023,4.295,4.035,2.569,2.103,1.966,1.876,1.822,1.799,1.83,1.892,2.022,2.257,2.45,2.743,3.199,3.551,2.022,1.998,1.706],"lasers":[{"x":1.61,"y":-3.128,"z":0,"angle":0,"damage":[40,55],"rate":0.9,"type":2,"speed":[100,130],"number":1,"spread":0,"error":0,"recoil":50},{"x":-1.61,"y":-3.128,"z":0,"angle":0,"damage":[40,55],"rate":0.9,"type":2,"speed":[100,130],"number":1,"spread":0,"error":0,"recoil":50},{"x":0,"y":-1.702,"z":-0.138,"angle":0,"damage":[11,15],"rate":3.5,"type":1,"speed":[240,260],"number":1,"spread":0,"error":0,"recoil":0}],"radius":4.295}}';
var Hawk_504 = '{"name":"Hawk","level":5,"model":4,"size":1.8,"specs":{"shield":{"capacity":[275,350],"reload":[6,8]},"generator":{"capacity":[225,300],"reload":[65,90]},"ship":{"mass":210,"speed":[100,115],"rotation":[75,100],"acceleration":[100,125]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-110,-110,-95,-100,-97,-40,-35,-25,-23,20,55,70,75,65],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,1,4,8,10,25,26,26,23,23,20,17,15,0],"height":[0,1,4,8,10,25,26,26,23,23,23,17,15,0],"texture":[3.9,16.9,3.9,63,0.9,8,63,63,10,0.9,3.9,16.9,16.9],"propeller":true,"laser":{"damage":[20,30],"rate":4,"type":2,"speed":[125,175],"number":1,"angle":0,"error":0}},"detail2":{"section_segments":6,"offset":{"x":64,"y":25,"z":-2},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-40,-50,-45,-20,0,10,35,40,40],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,2,5,8,8,11,11,8,0],"height":[0,2,4,8,6,8,8,5,0],"angle":0,"laser":{"damage":[3,6],"rate":4,"type":2,"speed":[125,175],"number":1,"angle":0,"error":0},"propeller":false,"texture":[0.9,0.9,3.9,10,63,3.9,63]},"detail3":{"section_segments":6,"offset":{"x":33,"y":2,"z":19},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-30,-35,-20,10,20,40,45,45],"z":[0,0,0,0,0,0,0,0]},"width":[0,2,5,5,8,8,5,0],"height":[0,2,5,5,8,8,5,0],"angle":0,"laser":{"damage":[3,6],"rate":4,"type":2,"speed":[125,175],"number":1,"angle":0,"error":0},"propeller":false,"texture":[16.9,0.9,63,3.9,15,3.9]},"detail4":{"section_segments":6,"offset":{"x":20,"y":-10,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-20,-20,0,20,25,30,40,70,75,70],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,4,12,12,8,10,15,11,9,0],"height":[0,7,12,12,8,10,11,7,9,0],"propeller":true,"texture":[3.9,3.9,12,3.9,63,3.9,3.9,63,16.9]},"detail5":{"section_segments":6,"offset":{"x":0,"y":-63,"z":13},"position":{"x":[0,0,0,0,0],"y":[-20,-20,-8,12,12],"z":[0,0,0,2,2]},"width":[0,3,9.5,11,0],"height":[0,3,8,10,0],"texture":[7,7,9,7]},"detail6":{"section_segments":6,"offset":{"x":33,"y":2,"z":19.5},"position":{"x":[0,0,0,0,0,0,0],"y":[-20,-20,10,20,40,43,43],"z":[0,0,0,5,5,5,5]},"width":[0,5,5,4,4,2,0],"height":[0,5,5,4,4,2,0],"texture":[3.9,63,0.9]},"detail7":{"section_segments":[45,135,225,315],"offset":{"x":0.1,"y":7,"z":-25},"position":{"x":[0,0,0,0,0],"y":[-5,-5,15,16,16],"z":[0,0,0,0,0]},"width":[0,5,5,3,0],"height":[0,35,35,32,0],"texture":[63,17,4],"angle":55,"vertical":true},"detail8":{"section_segments":10,"offset":{"x":0,"y":16,"z":35},"position":{"x":[0,0,0,0,0,0,0],"y":[0,12,12,10,12,12],"z":[0,0,0,0,0,0,0]},"width":[9,9,8,6,3,0],"height":[9,9,8,6,3,0],"texture":[4,4,17,4,63],"vertical":true},"detail9":{"section_segments":6,"offset":{"x":10,"y":39,"z":8},"position":{"x":[0,0,0,0,0,0],"y":[-3,1,3,3,-3,-3],"z":[0,0,0,0,0,0]},"width":[10,10,10,8,8,10],"height":[10,10,10,8,8,10],"texture":[3.9,63,3.9]},"detail10":{"section_segments":6,"offset":{"x":10,"y":30,"z":8},"position":{"x":[0,0,0,0,0,0],"y":[-3,1,3,3,-3,-3],"z":[0,0,0,0,0,0]},"width":[10,10,10,8,8,10],"height":[10,10,10,8,8,10],"texture":[3.9,63,3.9]},"detail11":{"section_segments":6,"offset":{"x":10,"y":21,"z":8},"position":{"x":[0,0,0,0,0,0],"y":[-3,1,3,3,-3,-3],"z":[0,0,0,0,0,0]},"width":[10,10,10,8,8,10],"height":[10,10,10,8,8,10],"texture":[3.9,63,3.9]},"detail12":{"section_segments":6,"offset":{"x":13,"y":-15,"z":-5},"position":{"x":[0,0,0,0,0,0],"y":[-35,-35,-26,26,45,45],"z":[0,0,0,0,0,0]},"width":[0,10,16,16,10,0],"height":[0,3,9,9,3,0],"propeller":false,"texture":[3.9,3.9,16.9,3.9],"angle":180},"detail13":{"section_segments":6,"offset":{"x":0,"y":-63,"z":18},"position":{"x":[0,0,0,0,0,0],"y":[-22,-22,-8,12,17,17],"z":[-7,-7,-4,-1,0]},"width":[0,5,12,14,8,0],"height":[0,3,4,5,6,0],"texture":[63]},"detail14":{"section_segments":6,"offset":{"x":64,"y":45,"z":2},"position":{"x":[0,0,0,0,0,0],"y":[-10,-10,-8,13,15,15],"z":[0,0,0,0,0,0]},"width":[0,6,6,6,6,0],"height":[0,4.3,4.3,4.3,4.3,0],"texture":[0.9,0.9,15,0.9,0.9]}},"wings":{"detail":{"offset":{"x":0,"y":10,"z":5},"length":[80,17,5],"width":[73,45,40,30],"angle":[-10,20,0],"position":[0,30,20,20],"texture":[11.2,63,1],"doubleside":true,"bump":{"position":-40,"size":10}},"detail2":{"offset":{"x":0,"y":9,"z":5},"length":[80,17,0],"width":[73,45,40,0],"angle":[-10,20,0],"position":[0,30,20,0],"texture":[17,17,63],"doubleside":true,"bump":{"position":-39,"size":10}},"detail3":{"offset":{"x":3,"y":15,"z":1},"length":[35],"width":[50,20],"angle":[30],"position":[0,20],"texture":[63],"doubleside":true,"bump":{"position":40,"size":10}},"detail4":{"offset":{"x":0,"y":15,"z":23},"length":[10,0],"width":[50,50,0],"angle":[-30,0],"position":[0,10,10],"texture":[63],"doubleside":true,"bump":{"position":40,"size":1}}},"typespec":{"name":"Hawk","level":5,"model":4,"code":504,"specs":{"shield":{"capacity":[275,350],"reload":[6,8]},"generator":{"capacity":[225,300],"reload":[65,90]},"ship":{"mass":210,"speed":[100,115],"rotation":[75,100],"acceleration":[100,125]}},"shape":[3.96,3.609,2.679,2.296,2.033,1.783,1.725,1.716,1.599,2.445,2.563,2.548,2.534,3.52,3.707,3.86,3.94,3.828,3.659,3.418,2.596,2.449,2.545,2.657,2.74,2.705,2.74,2.657,2.545,2.449,2.596,3.418,3.659,3.828,3.94,3.86,3.707,3.52,2.535,2.548,2.563,2.445,1.599,1.716,1.725,1.783,2.033,2.296,2.679,3.609],"lasers":[{"x":0,"y":-3.96,"z":0,"angle":0,"damage":[20,30],"rate":4,"type":2,"speed":[125,175],"number":1,"spread":0,"error":0,"recoil":0},{"x":2.304,"y":-0.9,"z":-0.072,"angle":0,"damage":[3,6],"rate":4,"type":2,"speed":[125,175],"number":1,"spread":0,"error":0,"recoil":0},{"x":-2.304,"y":-0.9,"z":-0.072,"angle":0,"damage":[3,6],"rate":4,"type":2,"speed":[125,175],"number":1,"spread":0,"error":0,"recoil":0},{"x":1.188,"y":-1.188,"z":0.684,"angle":0,"damage":[3,6],"rate":4,"type":2,"speed":[125,175],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.188,"y":-1.188,"z":0.684,"angle":0,"damage":[3,6],"rate":4,"type":2,"speed":[125,175],"number":1,"spread":0,"error":0,"recoil":0}],"radius":3.96}}';
var Photon_505 = '{"name":"Photon","level":5,"model":5,"size":2.1,"specs":{"shield":{"capacity":[250,325],"reload":[6,8]},"generator":{"capacity":[175,250],"reload":[65,90]},"ship":{"mass":190,"speed":[125,140],"rotation":[35,50],"acceleration":[60,80]}},"bodies":{"deatil":{"section_segments":6,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-80,-77,-62,-52,-20,-20,-10,15,50,50],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,2,4,9,9,11,15,15,15,0],"height":[0,2,4,9,9,11,15,15,15,0],"texture":[16.9,3.9,63,10.24,3.9,0.9,0.9,0.9,3.9],"laser":{"damage":[13,16],"rate":3.5,"type":1,"speed":[130,160],"number":1,"error":0}},"deatil2":{"section_segments":6,"offset":{"x":20,"y":10,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-15,-15,-10,0,20,25,30,40,55,60,50],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,10,15,15,10,10,13,13,10,0],"height":[0,5,10,15,15,10,10,13,13,10,0],"texture":[3.9,3.9,63,10.245,3.9,2.9,3.9,12.9,3.9,16.9],"propeller":true},"deatil3":{"section_segments":4,"offset":{"x":20,"y":20,"z":0},"position":{"x":[0,0,0,0],"y":[-20,-20,20,20],"z":[0,0,0,0]},"width":[0,5,5,0],"height":[0,5,5,0],"angle":0,"laser":{"damage":[7,9],"rate":7,"type":1,"speed":[135,170],"number":1,"error":0},"propeller":false,"texture":[2.9]},"deatil4":{"section_segments":6,"angle":180,"offset":{"x":0,"y":28,"z":15},"position":{"x":[0,0,0,0],"y":[-13,-13,8,8],"z":[0,0,0,0]},"width":[0,15,15,0],"height":[10,10,10,0],"texture":[3.9,11,3.9]},"deatil5":{"section_segments":6,"offset":{"x":0,"y":25,"z":25},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-10,-10,-7,0,10,12,20,25,50,40],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,3,7,10,10,7,7,10,7,0],"height":[0,3,7,10,10,7,7,10,7,0],"texture":[3.9,3.9,63,8,3.9,12,63,0.9,16.9],"propeller":true},"deatil6":{"section_segments":6,"offset":{"x":0,"y":0,"z":10},"position":{"x":[0,0,0,0,0,0],"y":[-15,-15,-5,13,40,40],"z":[2,2,0,0,0,0]},"width":[0,3,8,10,10,0],"height":[0,3,10,11,11,0],"propeller":false,"texture":[7,7,9,18]},"deatil7":{"section_segments":[0,60,120,180],"offset":{"x":-2,"y":0,"z":0},"position":{"x":[0,0,0,0,0],"y":[-62,-62,-52,-23,-23],"z":[0,0,0,0,0]},"width":[0,3,8,10,0],"height":[0,4,9,11,0],"texture":[3.9]},"detail8":{"section_segments":[0,60,120,180],"offset":{"x":-5,"y":1,"z":10},"position":{"x":[3,3,0,0,0,0],"y":[-20,-20,-3,0,25,25],"z":[-2,-2,0,0,0,0]},"width":[0,3,8,8,8,0],"height":[0,3,10,10,10,0],"texture":[16.9,4,17,3.9]},"deatil9":{"section_segments":6,"offset":{"x":-3.1,"y":0,"z":0},"position":{"x":[0,0,0,0,0],"y":[-62,-62,-52,-23,-23],"z":[0,0,0,0,0]},"width":[0,3,8,10,0],"height":[0,1,6,8,0],"texture":[4,63,63,4]},"detail16":{"section_segments":6,"offset":{"x":27,"y":12,"z":-20},"position":{"x":[0,0,0,0,0,0],"y":[-5,0,3,3,1,1],"z":[0,0,0,0,0,0]},"width":[0,7,4,2,2,0],"height":[0,14,11,6,6,0],"texture":[3.9,3.9,16.9,63,0.9],"vertical":true,"angle":30},"detail17":{"section_segments":4,"offset":{"x":1,"y":60,"z":30},"position":{"x":[-1,-1,5.2],"y":[-10,-10,15],"z":[0,0,-1.6]},"width":[0,9,0],"height":[0,6,0],"texture":[4]},"deatil18":{"section_segments":4,"offset":{"x":20,"y":20,"z":0},"position":{"x":[0,0,0,0,0],"y":[-20,-20,20,30,26],"z":[0,0,0,0,0]},"width":[0,6,6,2,0],"height":[0,6,6,2,0],"texture":[3.9,3.9,17,3.9],"angle":180},"detail19":{"section_segments":10,"offset":{"x":0,"y":23,"z":-28},"position":{"x":[0,0,0,0,0,0],"y":[7,12,12,14,14],"z":[0,0,0,0,0,0]},"width":[7,5,3.5,2,0],"height":[7,5,3.5,2,0],"texture":[4,17,8,4],"vertical":true},"detail20":{"section_segments":6,"offset":{"x":8,"y":15,"z":12},"position":{"x":[0,0,0,0,0,0],"y":[-2,0.7,2,2,-2,-2],"z":[0,0,0,0,0,0]},"width":[7,7,7,5,5,7],"height":[7,7,7,5,5,7],"texture":[0.9,63,3.9]},"detail21":{"section_segments":6,"offset":{"x":8,"y":10,"z":12},"position":{"x":[0,0,0,0,0,0],"y":[-2,0.7,2,2,-2,-2],"z":[0,0,0,0,0,0]},"width":[7,7,7,5,5,7],"height":[7,7,7,5,5,7],"texture":[0.9,63,3.9]}},"wings":{"deatil":{"length":[50,10],"width":[50,19,12],"angle":[0,-1],"position":[0,25,31],"doubleside":true,"offset":{"x":0,"y":15,"z":0},"bump":{"position":35,"size":10},"texture":[4,63]},"deatil2":{"length":[50,10.2],"width":[50,19,13],"angle":[0,-1],"position":[0,25,31],"doubleside":true,"offset":{"x":0,"y":16,"z":0},"bump":{"position":35,"size":10},"texture":[1]}},"typespec":{"name":"Photon","level":5,"model":5,"code":505,"specs":{"shield":{"capacity":[250,325],"reload":[6,8]},"generator":{"capacity":[175,250],"reload":[65,90]},"ship":{"mass":190,"speed":[125,140],"rotation":[35,50],"acceleration":[60,80]}},"shape":[3.36,2.615,2.228,1.503,1.149,0.832,0.764,0.714,0.871,1.015,1.022,1.093,1.202,1.283,1.396,1.489,1.819,3.122,3.383,3.194,2.644,3.048,3.177,3.091,3.161,3.156,3.161,3.091,3.177,3.048,2.644,3.194,3.383,3.122,1.819,1.489,1.396,1.283,1.204,1.093,1.022,1.015,0.871,0.714,0.764,0.832,1.149,1.503,2.228,2.615],"lasers":[{"x":0,"y":-3.36,"z":0,"angle":0,"damage":[13,16],"rate":3.5,"type":1,"speed":[130,160],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.84,"y":0,"z":0,"angle":0,"damage":[7,9],"rate":7,"type":1,"speed":[135,170],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.84,"y":0,"z":0,"angle":0,"damage":[7,9],"rate":7,"type":1,"speed":[135,170],"number":1,"spread":0,"error":0,"recoil":0}],"radius":3.383}}';
var Varan_506 = '{"name":"Varan","level":5,"model":6,"size":2.25,"specs":{"shield":{"capacity":[250,350],"reload":[5,8]},"generator":{"capacity":[225,300],"reload":[90,115]},"ship":{"mass":220,"speed":[83,93],"rotation":[60,80],"acceleration":[75,100]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":-10,"z":3},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-90,-90,-85,-70,-35,5,5,65,80,60],"z":[-3,-3,-3,-3,-3,-3,3,0,0,0,0]},"width":[0,2,7,15,23,23,23,17,15,0],"height":[0,2,7,15,23,23,23,20,16,0],"propeller":true,"texture":[63,63,63,10.244,11,0.9,0.9,12,16.9]},"detail2":{"section_segments":6,"offset":{"x":0,"y":-40,"z":17},"position":{"x":[0,0,0,0,0,0,0],"y":[-25,-25,-10,10,25,25],"z":[-3,-3,0,0,0,0,0]},"width":[0,6,12,12,6,0],"height":[0,6,12,12,6,0],"propeller":false,"texture":[7,9,9,9,7]},"detail3":{"section_segments":6,"offset":{"x":21,"y":-25,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-25,-35,-20,0,5,5],"z":[0,0,0,0,0,0]},"width":[0,2,5,5,3,0],"height":[0,2,5,5,3,0],"angle":0,"laser":{"damage":[7,11],"rate":4,"type":1,"speed":[100,160],"number":1,"error":0},"propeller":false,"texture":[3.9,0.9,8,63]},"detail4":{"section_segments":6,"offset":{"x":70,"y":30,"z":1},"position":{"x":[0,0,0,0,0],"y":[-25,-35,-20,-5,-5],"z":[0,0,0,0,0]},"width":[0,2,5,5,0],"height":[0,2,5,5,0],"angle":0,"laser":{"damage":[7,11],"rate":4,"type":1,"speed":[100,160],"number":1,"error":0},"propeller":false,"texture":[6,1.9,63]},"detail5":{"section_segments":6,"offset":{"x":48,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-10,-10,0,10,13,15,25,55,45],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,7,10,10,7,7,10,7,0],"height":[0,7,10,10,7,7,10,7,0],"texture":[63,63,10.241,0.9,63,0.9,0.9,16.9],"propeller":true},"detail6":{"section_segments":6,"offset":{"x":47,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,1],"y":[-10,-10,0,10,13,15,25,55,55],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,7,10,10,7,7,10,7,7],"height":[0,7,10,10,7,7,10,7,7],"texture":[63,63,15,63]},"detail7":{"section_segments":6,"offset":{"x":70,"y":15,"z":-5},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-13,-10,-5,10,15,22,28,35,25],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,7,10,10,7,9,10,8,0],"height":[0,7,10,10,7,9,10,8,0],"texture":[63,63,10,0.9,63,3.9,3.9,16.9],"propeller":true},"detail8":{"section_segments":6,"offset":{"x":0,"y":10,"z":20},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-5,-5,5,12,13,20,25,40,43,35],"z":[2,2,0,0,0,0,0,0,0,0]},"width":[0,7,10,10,7,7,10,9,7,0],"height":[0,7,10,10,7,7,10,9,7,0],"texture":[3.9,3.9,3.9,3.9,63,3.9,8.2,3.9,1.9]},"detail9":{"section_segments":10,"offset":{"x":0,"y":24,"z":15},"position":{"x":[0,0,0,0,0,0],"y":[7,12,10,12,12],"z":[0,0,0,0,0,0]},"width":[8,7,5,3,0],"height":[8,7,5,3,0],"texture":[4,17,4,18],"vertical":true},"detail10":{"section_segments":[0,60,120,180],"offset":{"x":-7,"y":-40,"z":15},"position":{"x":[0,0,0,0,0,0],"y":[-30,-30,-10,20,30,30],"z":[-3.5,-3.5,0,0,1,1]},"width":[0,3,12,12,3,0],"height":[0,3,11,11,3,0],"texture":[3.9,3.9,3.9,3.9,3.9]},"detail11":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":20,"z":15},"position":{"x":[0,0,0,0,0,0,0],"y":[-25,-25,-5,15,15,13,13],"z":[0,0,0,0,0,0,0]},"width":[0,35,35,15,12,12,0],"height":[0,15,15,15,12,12,0],"texture":[4,4,4,63,4,4],"vertical":true},"detail12":{"vertical":true,"angle":-27.2,"section_segments":[45,135,225,315],"offset":{"x":-11,"y":23.8,"z":34},"position":{"x":[0,0,0,0,0],"y":[-2,0,2,2],"z":[0,0,0,0]},"width":[0,5,5,5],"height":[0,22,14,0],"texture":[4,10.95,12]},"detail13":{"section_segments":6,"offset":{"x":0,"y":-5,"z":26},"position":{"x":[0,0,0,0,0,0,0],"y":[-7,-4,4,7,7,-7,-7],"z":[0,0,0,0,0,0,0]},"width":[15,15,15,15,10,10,15],"height":[7,7,7,7,2,2,7],"texture":[63,10.1,63,3.9],"angle":90},"detail14":{"section_segments":10,"offset":{"x":9,"y":12,"z":-2},"position":{"x":[0,0,0,0,0,0],"y":[0,12,11,12,12],"z":[0,0,0,0,0,0]},"width":[6,4,3,2,0],"height":[6,4,3,2,0],"texture":[4,17,4,4],"vertical":true,"angle":25},"detail15":{"section_segments":10,"offset":{"x":0,"y":19,"z":-15},"position":{"x":[0,0,0,0,0,0],"y":[7,12,11,12,12],"z":[0,0,0,0,0,0]},"width":[7,6,4,3,0],"height":[7,6,4,3,0],"texture":[4,17,4,1],"vertical":true}},"wings":{"detail":{"length":[25,0,4,25,20],"width":[25,25,65,65,35,25],"angle":[-10,-10,-10,-10,-12],"position":[10,10,5,5,20,20],"doubleside":true,"bump":{"position":30,"size":10},"texture":[15,4,17,11,11],"offset":{"x":0,"y":10,"z":5}},"detail2":{"length":[25,0,4,25,20],"width":[25,25,65,65,35,25],"angle":[-10,-10,-10,-10,-13],"position":[10,10,5,5,20,20],"doubleside":true,"bump":{"position":30,"size":10},"texture":[18,4],"offset":{"x":0,"y":11,"z":5}},"detail3":{"length":[40],"width":[55,10],"angle":[60],"position":[-20,20],"doubleside":true,"bump":{"position":45,"size":20},"texture":63,"offset":{"x":5,"y":30,"z":3}}},"typespec":{"name":"Varan","level":5,"model":6,"code":506,"specs":{"shield":{"capacity":[250,350],"reload":[5,8]},"generator":{"capacity":[225,300],"reload":[90,115]},"ship":{"mass":220,"speed":[83,93],"rotation":[60,80],"acceleration":[75,100]}},"shape":[4.501,4.286,3.393,2.887,2.559,2.123,1.788,1.525,1.518,1.565,1.64,2.488,3.267,3.565,3.653,3.714,4.037,4.129,3.826,3.47,3.212,2.641,2.719,3.152,3.204,3.156,3.204,3.152,2.719,2.641,3.212,3.47,3.826,4.129,4.037,3.714,3.653,3.565,3.267,2.488,1.64,1.565,1.518,1.525,1.788,2.123,2.559,2.887,3.393,4.286],"lasers":[{"x":0.945,"y":-2.7,"z":0,"angle":0,"damage":[7,11],"rate":4,"type":1,"speed":[100,160],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.945,"y":-2.7,"z":0,"angle":0,"damage":[7,11],"rate":4,"type":1,"speed":[100,160],"number":1,"spread":0,"error":0,"recoil":0},{"x":3.15,"y":-0.225,"z":0.045,"angle":0,"damage":[7,11],"rate":4,"type":1,"speed":[100,160],"number":1,"spread":0,"error":0,"recoil":0},{"x":-3.15,"y":-0.225,"z":0.045,"angle":0,"damage":[7,11],"rate":4,"type":1,"speed":[100,160],"number":1,"spread":0,"error":0,"recoil":0}],"radius":4.501}}';
var Spark_507 = '{"name":"Spark","level":5,"model":7,"size":1.95,"specs":{"shield":{"capacity":[275,375],"reload":[6,9]},"generator":{"capacity":[250,325],"reload":[70,95]},"ship":{"mass":250,"speed":[85,95],"rotation":[60,80],"acceleration":[65,90]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-100,-100,-95,-75,-65,-20,-10,55,55],"z":[5,5,5,5,5,0,0,0,0,0]},"width":[0,3,6,12,17,20,25,25,0],"height":[0,2,4,11,15,17,23,23,0],"propeller":false,"texture":[63,63,63,4,11,63,3.9]},"detail2":{"section_segments":6,"offset":{"x":0,"y":-25,"z":13},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-28,-28,-18,5,15,30,65,85,90,80],"z":[3,3,6,6,6,0,0,0,0,0]},"width":[0,5,10,10,13,15,15,15,12,0],"height":[0,4,8,10,11,15,15,15,10,0],"propeller":true,"texture":[7,7,9,3.9,3.9,10,8.2,63,16.9]},"detail3":{"section_segments":6,"offset":{"x":18,"y":30,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-44,-43,-40,28,40,30],"z":[0,0,0,0,0,0]},"width":[0,5,8,10,8,0],"height":[0,7,12,12,9,0],"texture":[63,63,15,3.9,16.9],"propeller":true},"detail4":{"section_segments":6,"offset":{"x":13,"y":-50,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[-25,-30,-20,10,20,20],"z":[0,0,0,0,0,0,0]},"width":[0,3,7,7,6,0],"height":[0,3,7,7,6,0],"texture":[1.9,3.9,8,4],"angle":0,"laser":{"damage":[4,7],"rate":7.5,"type":1,"speed":[190,220],"number":1,"angle":0,"error":0}},"detail5":{"section_segments":6,"offset":{"x":65,"y":25,"z":-5},"position":{"x":[0,0,0,0,0,0,0],"y":[-35,-40,-25,-20,15,30,30],"z":[0,0,0,0,0,0,0]},"width":[0,1.5,4,10,10,5,0],"height":[0,1.5,4,10,10,5,0],"texture":[1.9,63,0.9,12.9,3.9],"angle":0,"laser":{"damage":[13,25],"rate":2,"type":2,"speed":[175,225],"number":1,"error":0}},"detail6":{"section_segments":6,"offset":{"x":65,"y":50,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[-45,-45,-35,5,15,20,10],"z":[0,0,0,0,0,0,0]},"width":[0,5,12,12,10,9,0],"height":[0,5,12,12,10,9,0],"texture":[63,63,10.245,12,16.9],"propeller":true,"angle":0},"detail7":{"section_segments":6,"offset":{"x":14,"y":30,"z":10},"position":{"x":[0,0,0,0,0,0],"y":[-2,0.7,2,2,-2,-2],"z":[0,0,0,0,0,0]},"width":[10,10,10,8,8,10],"height":[10,10,10,8,8,10],"texture":[0.9,63,3.9]},"detail8":{"section_segments":6,"offset":{"x":14,"y":23,"z":10},"position":{"x":[0,0,0,0,0,0],"y":[-2,0.7,2,2,-2,-2],"z":[0,0,0,0,0,0]},"width":[10,10,10,8,8,10],"height":[10,10,10,8,8,10],"texture":[0.9,63,3.9]},"detail9":{"section_segments":6,"offset":{"x":14,"y":16,"z":10},"position":{"x":[0,0,0,0,0,0],"y":[-2,0.7,2,2,-2,-2],"z":[0,0,0,0,0,0]},"width":[10,10,10,8,8,10],"height":[10,10,10,8,8,10],"texture":[0.9,63,3.9]},"detail10":{"section_segments":10,"offset":{"x":0,"y":19.5,"z":8},"position":{"x":[0,0,0,0,0,0,0],"y":[0,12,12,10,12,12],"z":[0,0,0,0,0,0,0]},"width":[9,9,8,6,4,0],"height":[9,9,8,6,4,0],"texture":[1,1,17,4,18],"vertical":true},"detail11":{"section_segments":[45,135,225,315],"offset":{"x":1,"y":17,"z":-22},"position":{"x":[0,0,0,0,0],"y":[-5,-5,15,16,16],"z":[0,0,0,0,0]},"width":[0,3,3,2,0],"height":[0,20,20,18,0],"texture":[63,17,63],"angle":20,"vertical":true},"detail12":{"section_segments":4,"offset":{"x":65,"y":20,"z":6.5},"position":{"x":[0.4,0.4,10.5],"y":[-5,-5,35],"z":[-0.2,-0.2,0]},"width":[0,10,0],"height":[0,6,0],"texture":[4]},"detail13":{"section_segments":4,"offset":{"x":65,"y":20,"z":6.5},"position":{"x":[-0.4,-0.4,-10.5],"y":[-5,-5,35],"z":[-0.2,-0.2,0]},"width":[0,10,0],"height":[0,6,0],"texture":[4]},"detail14":{"section_segments":4,"offset":{"x":0,"y":20,"z":27},"position":{"x":[0,0,0,0],"y":[-30,-30,30,30],"z":[0,0,0,0]},"width":[0,4,4,0],"height":[0,2,2,0],"texture":[4,18,4]},"detail15":{"section_segments":10,"offset":{"x":0,"y":20,"z":-46},"position":{"x":[0,0,0,0,0,0],"y":[0,13,12,14,14],"z":[0,0,0,0,0,0]},"width":[8,6,4,2,0],"height":[8,6,4,2,0],"texture":[4,17,8,4],"vertical":true},"detail16":{"section_segments":[45,135,225,315],"offset":{"x":3,"y":1,"z":31},"position":{"x":[0,0,0,0,0],"y":[-5,-5,15,16,16],"z":[0,0,0,0,0]},"width":[0,4,4,2.5,0],"height":[0,30,30,26,0],"texture":[63,17,4,63],"angle":35,"vertical":true}},"wings":{"detail":{"offset":{"x":20,"y":13,"z":0},"doubleside":true,"length":[14,0,4,0,34,0],"width":[20,20,70,70,40,27,0],"angle":[0,0,0,0,0,0],"position":[0,0,-14,-10,0,40,0],"texture":[4,4,17,4,8.025,4],"bump":{"position":20,"size":15}},"detail2":{"offset":{"x":20,"y":14,"z":0},"doubleside":true,"length":[14,0,4,0,34,0],"width":[20,20,70,70,40,27,0],"angle":[0,0,0,0,0,0],"position":[0,0,-14,-10,0,40,0],"texture":[10,4,1,4,18],"bump":{"position":20,"size":15}},"detail3":{"doubleside":true,"offset":{"x":21,"y":60,"z":17},"length":[-10,10,10.5,10],"width":[0,0,50,55],"angle":[90,90,90,90],"position":[0,0,0,10],"texture":[63],"bump":{"position":-30,"size":20}},"detail4":{"offset":{"x":0,"y":-50,"z":3},"doubleside":true,"length":[25],"width":[50,10],"angle":[0],"position":[-10,40],"texture":[17],"bump":{"position":80,"size":15}},"detail5":{"doubleside":true,"offset":{"x":21,"y":59,"z":17},"length":[-10,10,10,10],"width":[0,0,50,55],"angle":[90,90,90,90],"position":[0,0,0,10],"texture":[63,63,17],"bump":{"position":-30,"size":19}}},"typespec":{"name":"Spark","level":5,"model":7,"code":507,"specs":{"shield":{"capacity":[275,375],"reload":[6,9]},"generator":{"capacity":[250,325],"reload":[70,95]},"ship":{"mass":250,"speed":[85,95],"rotation":[60,80],"acceleration":[65,90]}},"shape":[3.901,3.611,3.179,2.403,1.739,1.409,1.931,1.937,1.831,1.689,1.593,2.651,2.669,2.895,3.033,3.163,3.357,3.634,3.907,3.939,3.543,2.575,3.139,3.89,2.779,2.54,2.779,3.89,3.139,2.575,3.543,3.939,3.907,3.634,3.357,3.163,3.033,2.895,2.67,2.651,1.593,1.689,1.831,1.937,1.931,1.409,1.739,2.403,3.179,3.611],"lasers":[{"x":0.507,"y":-3.12,"z":0,"angle":0,"damage":[4,7],"rate":7.5,"type":1,"speed":[190,220],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.507,"y":-3.12,"z":0,"angle":0,"damage":[4,7],"rate":7.5,"type":1,"speed":[190,220],"number":1,"spread":0,"error":0,"recoil":0},{"x":2.535,"y":-0.585,"z":-0.195,"angle":0,"damage":[13,25],"rate":2,"type":2,"speed":[175,225],"number":1,"spread":0,"error":0,"recoil":0},{"x":-2.535,"y":-0.585,"z":-0.195,"angle":0,"damage":[13,25],"rate":2,"type":2,"speed":[175,225],"number":1,"spread":0,"error":0,"recoil":0}],"radius":3.939}}';
var Predator_508 = '{"name":"Predator","level":5,"model":8,"size":1.62,"specs":{"shield":{"capacity":[275,375],"reload":[6,8]},"generator":{"capacity":[200,275],"reload":[50,90]},"ship":{"mass":300,"speed":[80,90],"rotation":[40,55],"acceleration":[75,90]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":-40,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-75,-75,-70,-65,-20,-10,0,-15,42,50,120,130,133,133],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,4,10,10,20,20,16,16,16,25,25,20,15,0],"height":[0,2,5,5,15,15,13,13,13,15,15,10,7,0],"texture":[3.9,16.9,63,10.245,63,3.9,3.9,8.2,63,11,16.9,3.9],"propeller":true},"detail2":{"section_segments":6,"offset":{"x":30,"y":45,"z":6},"position":{"x":[0,0,0,0,0,-6,-6,0,0],"y":[-70,-73,-65,-61,-12,-5,20,25,25],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,3,5,5,5,16,16,5,0],"height":[0,3,5,5,5,10,10,5,0],"texture":[1.9,63,17,15,63,10,3.9,3.9],"laser":{"damage":[27,35],"rate":2.5,"type":2,"speed":[150,190],"number":1,"error":0,"recoil":30}},"detail3":{"section_segments":6,"offset":{"x":17,"y":40,"z":-5},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-10,-10,-13,-13,0,25,45,35],"z":[0,0,0,0,0,0,0,0]},"width":[0,6,8,10,15,15,10,0],"height":[0,3,5,7,12,12,7,0],"angle":0,"propeller":true,"texture":[12,3.9,63,63,3.9,63,16.9]},"detail4":{"section_segments":6,"offset":{"x":60,"y":40,"z":-5},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-30,-30,-20,-15,-10,30,15,40,30],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,7,12,12,15,15,13,10,0],"height":[0,3,7,7,10,10,7,7,0],"texture":[63,63,12.9,3.9,10.245,3.9,16.9,16.9],"propeller":true},"detail5":{"section_segments":6,"offset":{"x":0,"y":-80,"z":22},"position":{"x":[0,0,0,0,0,0],"y":[-15,-15,10,20,25,25],"z":[-8,-8,-6,-4,0,0]},"width":[0,7,14,14,8,0],"height":[0,6,12,12,5,0],"texture":[7,9,9,3.9],"angle":0,"propeller":false},"detail6":{"section_segments":6,"offset":{"x":0,"y":14,"z":-48},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-10,-10,12,20,20,17,17,17],"z":[0,0,0,-10,-10,-10,-10,-10]},"width":[0,30,30,13,10,10,7,0],"height":[0,45,35,23,18,18,14,0],"texture":[2.9,2.9,3.9,16.9,3.9,63,3.9],"vertical":true},"detail7":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":27,"z":-75},"position":{"x":[0,0,0,0,0,0,0],"y":[-25,-25,0,10,10,8,8],"z":[0,0,0,0,0,0,0]},"width":[0,40,40,15,12,12,0],"height":[0,15,15,15,12,12,0],"texture":[4,4,12,63,4],"vertical":true},"detail8":{"section_segments":6,"offset":{"x":60,"y":70,"z":-5},"position":{"x":[0,0,0,0,0,0],"y":[-7,-7,-5,0,2,2],"z":[0,0,0,0,0,0]},"width":[0,17,17,17,17,0],"height":[0,12,12,12,12,0],"texture":[3.9,3.9,63,3.9,3.9]},"detail9":{"section_segments":4,"offset":{"x":61,"y":30,"z":0.5},"position":{"x":[0.2,0.2,12],"y":[0,0,33],"z":[-0.2,-0.2,0]},"width":[0,12,0],"height":[0,5,0],"texture":[4]},"detail10":{"section_segments":4,"offset":{"x":59,"y":30,"z":0.5},"position":{"x":[-0.2,-0.2,-12],"y":[0,0,33],"z":[-0.2,-0.2,0]},"width":[0,12,0],"height":[0,5,0],"texture":[4]},"detail11":{"section_segments":4,"offset":{"x":-1.7,"y":-35,"z":17},"position":{"x":[-0.2,-0.2,-12],"y":[-5,-5,37],"z":[-0.2,-0.2,0]},"width":[0,12,0],"height":[0,7,0],"texture":[1]},"detail12":{"section_segments":10,"offset":{"x":0,"y":25,"z":-75},"position":{"x":[0,0,0,0,0,0],"y":[7,13,12,14,14],"z":[0,0,0,0,0,0]},"width":[8,6,4,2,0],"height":[8,6,4,2,0],"texture":[4,17,8,4],"vertical":true},"detail13":{"section_segments":10,"offset":{"x":0,"y":12,"z":6},"position":{"x":[0,0,0,0,0,0],"y":[7,13,12,14,14],"z":[0,0,0,0,0,0]},"width":[10,8,5,2,0],"height":[10,8,5,2,0],"texture":[4,17,63,1],"vertical":true},"detail14":{"section_segments":[45,135,225,315],"offset":{"x":-18,"y":61,"z":25},"position":{"x":[0,0,0,0],"y":[-4,-4,4,4],"z":[0,0,0,0]},"width":[0,23,8,0],"height":[0,6,12,0],"texture":[1],"angle":90}},"wings":{"detail":{"offset":{"x":0,"y":60,"z":-5},"length":[20,18,30,40],"width":[52,50,50,35,11],"texture":[3,4,12,63],"angle":[10,5,-15,-13,-14],"doubleside":true,"position":[-13,-10,-5,-10,5],"bump":{"position":40,"size":10}},"detail2":{"offset":{"x":0,"y":61,"z":-5},"length":[20,18,30,41],"width":[52,50,50,35,11],"texture":[1],"angle":[10,5,-15,-13,-14],"doubleside":true,"position":[-13,-10,-5,-10,5],"bump":{"position":40,"size":10}}},"typespec":{"name":"Predator","level":5,"model":8,"code":508,"specs":{"shield":{"capacity":[275,375],"reload":[6,8]},"generator":{"capacity":[200,275],"reload":[50,90]},"ship":{"mass":300,"speed":[80,90],"rotation":[40,55],"acceleration":[75,90]}},"shape":[3.728,3.621,2.484,1.816,1.052,0.829,1.325,1.392,1.337,1.269,1.196,1.147,1.121,1.12,2.323,2.518,3.514,4.158,3.901,3.416,3.363,2.929,2.921,2.972,3.042,3.019,3.042,2.972,2.921,2.929,3.363,3.416,3.901,4.158,3.514,2.518,2.323,1.12,1.121,1.147,1.196,1.269,1.337,1.392,1.325,0.829,1.052,1.816,2.484,3.621],"lasers":[{"x":0.972,"y":-0.907,"z":0.194,"angle":0,"damage":[27,35],"rate":2.5,"type":2,"speed":[150,190],"number":1,"spread":0,"error":0,"recoil":30},{"x":-0.972,"y":-0.907,"z":0.194,"angle":0,"damage":[27,35],"rate":2.5,"type":2,"speed":[150,190],"number":1,"spread":0,"error":0,"recoil":30}],"radius":4.158}}';
var Vampire_509 = '{"name":"Vampire","level":5,"model":9,"size":1.68,"specs":{"shield":{"capacity":[350,450],"reload":[7,9]},"generator":{"capacity":[150,225],"reload":[45,60]},"ship":{"mass":350,"speed":[80,90],"rotation":[40,55],"acceleration":[80,110]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-120,-125,-115,-95,-75,-70,-70,0,0,10,30,70,75,75],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,2,4,4,14,14,9,9,17,25,30,30,15,0],"height":[0,2,4,4,14,14,9,9,17,25,37,37,15,0],"texture":[0.9,16.9,3.9,63,63,3.9,8.2,3.9,17,11,8,3.9,3.9],"laser":{"damage":[35,50],"rate":2.5,"type":2,"speed":[130,165],"number":1,"error":0}},"detail2":{"section_segments":6,"offset":{"x":0,"y":-10,"z":12},"position":{"x":[0,0,0,0,0,0],"y":[-24,-24,-12,10,28,28],"z":[3,3,4,0,0,0]},"width":[0,8,12,15,15,0],"height":[0,5,10,20,20,0],"texture":[7,9,9,4]},"detail3":{"section_segments":6,"offset":{"x":15,"y":60,"z":0},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-34,-30,-20,10,20,40,50,40],"z":[0,0,0,0,0,0,0,0]},"width":[0,14,16,16,13,13,10,0],"height":[0,14,16,16,13,13,10,0],"texture":[63,63,10,3.9,11,3.9,16.9],"propeller":true},"detail4":{"section_segments":6,"offset":{"x":0,"y":60,"z":23},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-34,-30,-20,10,20,30,35,25],"z":[0,0,0,0,0,0,0,0]},"width":[0,14,16,16,13,13,10,0],"height":[0,14,16,16,13,13,10,0],"texture":[63,63,10.245,3.9,12,3.9,16.9],"propeller":true},"detail5":{"section_segments":6,"offset":{"x":5,"y":-15,"z":5},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-23,-23,-20,2,5,20,23,23],"z":[0,0,0,0,0,0,0,0]},"width":[0,10,12,12,12,12,10,0],"height":[0,10,12,12,12,12,10,0],"propeller":false,"texture":[3.9,3.9,0.9,63,18,3.9,3.9]},"detail6":{"section_segments":[45,135,225,315],"offset":{"x":45,"y":35,"z":0},"position":{"x":[0,0,0,-20,-20],"y":[-30,-30,0,30,30],"z":[0,0,0,0,0]},"width":[0,7,7,7,0],"height":[0,7,7,7,0],"propeller":false,"texture":[1,1,18]},"detail7":{"section_segments":[0,60,120,180],"offset":{"x":-1.5,"y":-54,"z":0},"position":{"x":[0,0,0,0],"y":[-12,-12,12,12],"z":[0,0,0,0]},"width":[0,14,14,0],"height":[0,15,15,0],"texture":[10]},"detail8":{"section_segments":10,"offset":{"x":0,"y":22,"z":-9},"position":{"x":[0,0,0,0,0,0],"y":[0,12,10,12,12],"z":[0,0,0,0,0,0]},"width":[10,7,5,3,0],"height":[10,7,5,3,0],"texture":[4,17,4,18],"vertical":true}},"wings":{"detail":{"length":[67.5],"width":[70,5],"angle":[0],"position":[0,70],"doubleside":true,"bump":{"position":20,"size":25},"texture":[63],"offset":{"x":0,"y":35,"z":-5}},"detail2":{"length":[0,27,0],"width":[0,23,23,0],"angle":[0,0,0],"position":[0,0,20,20],"doubleside":true,"bump":{"position":35,"size":30},"texture":[4,17,4],"offset":{"x":32,"y":-4,"z":3}},"detail4":{"length":[0,3,10,0,7,2,0],"width":[0,130,130,120,90,90,90,0],"angle":[0,0,0,0,0,0,0],"position":[0,0,0,5,25,30,40,40],"doubleside":true,"bump":{"position":64,"size":5},"texture":[4,63,4,4,8,17,4],"offset":{"x":34,"y":-77,"z":0}},"detail5":{"length":[50],"width":[70,15],"angle":[10],"position":[0,45],"doubleside":true,"bump":{"position":45,"size":17},"texture":[3.4],"offset":{"x":0,"y":25,"z":7}},"detail6":{"length":[67],"width":[70,5],"angle":[0],"position":[0,70],"doubleside":true,"bump":{"position":20,"size":24},"texture":[1],"offset":{"x":0,"y":36,"z":-5}},"detail7":{"length":[0,27,0],"width":[0,13,13,0],"angle":[0,0,0],"position":[0,0,20,20],"doubleside":true,"bump":{"position":35,"size":35},"texture":[4,15,4],"offset":{"x":32,"y":1,"z":7}}},"typespec":{"name":"Vampire","level":5,"model":9,"code":509,"specs":{"shield":{"capacity":[350,450],"reload":[7,9]},"generator":{"capacity":[150,225],"reload":[45,60]},"ship":{"mass":350,"speed":[80,90],"rotation":[40,55],"acceleration":[80,110]}},"shape":[4.5,3.239,5.283,5.114,3.971,3.697,3.161,2.758,2.49,2.299,2.168,2.081,2.032,2.141,2.192,2.284,2.343,2.196,2.225,2.289,4.535,4.591,3.819,4.051,4.031,3.968,4.031,4.051,3.819,4.591,4.535,2.289,2.225,2.196,2.343,2.284,2.192,2.141,2.032,2.081,2.168,2.299,2.49,2.758,3.161,3.697,3.971,5.114,5.283,3.239],"lasers":[{"x":0,"y":-4.5,"z":0,"angle":0,"damage":[35,50],"rate":2.5,"type":2,"speed":[130,165],"number":1,"spread":0,"error":0,"recoil":0}],"radius":5.283}}';
var Berserker_510 = '{"name":"Berserker","level":5,"model":10,"size":1.78,"specs":{"shield":{"capacity":[350,450],"reload":[7,9]},"generator":{"capacity":[175,250],"reload":[30,45]},"ship":{"mass":425,"speed":[85,100],"rotation":[55,75],"acceleration":[80,100],"dash":{"rate":1.2,"burst_speed":[180,200],"speed":[115,140],"acceleration":[60,60],"initial_energy":[45,70],"energy":[50,75]}}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":0,"z":6},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-110,-110,-105,-90,-85,-85,-70,-68,-65,-30,0,40,65,80,90,95,85],"z":[-4,-4,-4,-4,-4,-4,-4,-6,-6,-6,-6,-6,0,0,0,0,0,0]},"width":[0,32,40,40,32,8,8,10,10,24,27,27,23,23,20,15,0],"height":[0,11,14,14,11,5,5,10,10,25,30,30,28,28,17,10,0],"propeller":true,"texture":[63,63,10.241,63,63,8.2,3.9,63,0.9,10.241,10,3,8.2,4,16.9,16.9]},"detail2":{"section_segments":6,"angle":90,"offset":{"x":0,"y":-99,"z":0},"position":{"x":[-20,-20,-15,-5,0,0,-5,-15,-20,-20],"y":[-60,-60,-55,-40,-30,30,40,55,60,60],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,6,8,12,14,14,12,8,6,0],"height":[0,2,4,7,9,9,7,4,2,0],"texture":[63,63,0.9,3.9,3.9,3.9,0.9,63,63]},"detail3":{"section_segments":6,"angle":90,"offset":{"x":1,"y":-100,"z":0},"position":{"x":[-20,-20,-15,-5,0,0],"y":[-61,-61,-56,-41,-31,0,0],"z":[0,0,0,0,0,0]},"width":[0,7,9,13,15,15,0],"height":[0,2,4,7,9,9,0],"texture":[63,63,11,3.9]},"detail4":{"section_segments":6,"offset":{"x":0,"y":-5,"z":20},"position":{"x":[0,0,0,0,0,0],"y":[-17,-17,10,14,35,35],"z":[5.5,1.5,0,0,1,1]},"width":[0,6,15,15,15,0],"height":[0,6,13,13,13,0],"propeller":false,"texture":[4,9,63]},"detail5":{"section_segments":8,"offset":{"x":0,"y":0,"z":103},"position":{"x":[0,0,0,0,0,0],"y":[-3.5,-3.5,-2,2,3.5,3.5],"z":[0,0,0,0,0,0]},"width":[0,35,37,37,35,0],"height":[0,15,17,17,15,0],"texture":[17,63,4],"vertical":true,"angle":180},"detail6":{"section_segments":6,"offset":{"x":0,"y":41,"z":-45},"position":{"x":[0,0,0,0,0,0],"y":[-30,-7,2,2,-2,-2],"z":[0,0,0,0,0,10]},"width":[30,30,15,13,13,13],"height":[22,22,11,8,8,0],"texture":[3.9,3.9,63,3.9,15],"vertical":true},"detail7":{"section_segments":6,"offset":{"x":18,"y":10,"z":21},"position":{"x":[14,0,0],"y":[-25,5,30],"z":[-17,0,0]},"width":[3,3,3],"height":[3,3,3],"texture":[63]},"detail8":{"section_segments":6,"offset":{"x":30,"y":8,"z":10},"position":{"x":[0,0,0,0,0],"y":[-5,5,5,4,4],"z":[0,0,0,0,0]},"width":[6,6,4.5,2.5,0],"height":[6,6,4.5,2.5,0],"texture":[63,63,16.9,3.9],"vertical":true},"detail9":{"section_segments":4,"offset":{"x":0,"y":-93,"z":10},"position":{"x":[0,0,0,0,0],"y":[-4,-4,10,15,15],"z":[5,5,2,-5,-5]},"width":[0,8,20,10,0],"height":[0,2,5,5,0],"texture":[4],"angle":0},"detail10":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":-91,"z":10},"position":{"x":[0,0,0,0,0],"y":[-4,-4,10,15,15],"z":[5,5,2,-15,-15]},"width":[0,10,10,10,0],"height":[0,3,8,6,0],"texture":[4,12,4],"angle":0},"detail11":{"section_segments":6,"offset":{"x":4,"y":-60,"z":14},"position":{"x":[0,0,7],"y":[-25,15,31],"z":[0,3,3]},"width":[3,3,3],"height":[3,3,3],"texture":[63]},"detail12":{"section_segments":6,"offset":{"x":10,"y":16,"z":27},"position":{"x":[0,0,0,0,0],"y":[-5,5,5,4,4],"z":[0,0,0,0,0]},"width":[6,6,4.5,2.5,0],"height":[6,6,4.5,2.5,0],"texture":[63,63,16.9,3.9],"vertical":true,"angle":30},"detail13":{"section_segments":6,"offset":{"x":16,"y":70,"z":-13},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-34,-30,-20,10,20,30,35,25],"z":[0,0,0,0,0,0,0,0]},"width":[0,14,16,16,13,13,10,0],"height":[0,14,16,16,13,13,10,0],"texture":[63,63,10.245,3.9,12,3.9,16.9],"propeller":true},"detail14":{"section_segments":[45,135,225,315],"offset":{"x":9,"y":13,"z":-25},"position":{"x":[0,0,0,0,0],"y":[-5,-5,15,16,16],"z":[0,0,0,0,0]},"width":[0,3,3,2,0],"height":[0,30,30,28,0],"texture":[63,17,4],"angle":30,"vertical":true},"detail15":{"section_segments":6,"offset":{"x":2,"y":-5,"z":21},"position":{"x":[0,0,0,0],"y":[14,14,35,35],"z":[0,0,1,1]},"width":[0,14,14,0],"height":[0,12,12,0],"propeller":false,"texture":[9]}},"wings":{"detail":{"length":[0,22,3,0],"width":[0,90,65,57,0],"angle":[0,0,0,0],"position":[0,0,0,0,0],"doubleside":true,"bump":{"position":25,"size":6},"texture":[1,4,63],"offset":{"x":10,"y":2,"z":9}},"detail2":{"length":[0,3,10,2,8,0],"width":[0,100,100,70,60,55,0],"angle":[0,0,0,0,0,0],"position":[0,0,0,15,15,25,30],"doubleside":true,"bump":{"position":35,"size":10},"texture":[63,63,15,17,17,10,4],"offset":{"x":15,"y":-21,"z":0}},"detail3":{"length":[0,15,5,35,0],"width":[0,100,90,50,25,0],"angle":[0,0,0,0,0],"position":[0,0,5,25,64,64],"doubleside":true,"bump":{"position":30,"size":10},"texture":[18,18,63,11.5],"offset":{"x":10,"y":35,"z":0}},"detail4":{"length":[0,3,12,6],"width":[0,50,50,30,17],"angle":[0,0,0,0],"position":[-5,-5,-5,14,25],"doubleside":true,"bump":{"position":30,"size":15},"texture":[4,17],"offset":{"x":55,"y":90,"z":0}},"detail5":{"length":[24,3,13,0],"width":[85,45,40,10,0],"angle":[0,0,0,0],"position":[25,30,34,60,60],"doubleside":true,"bump":{"position":35,"size":10},"texture":[8.03,17,4],"offset":{"x":26,"y":-21,"z":0}},"detail6":{"length":[0,3,12,6],"width":[0,50,50,30,19],"angle":[0,0,0,0],"position":[-5,-5,-5,14,25],"doubleside":true,"bump":{"position":30,"size":16},"texture":[4,63,4,63],"offset":{"x":55,"y":91,"z":0}},"detail7":{"length":[0,3,12],"width":[0,50,50,30],"angle":[0,0,0],"position":[-5,-5,-5,14],"doubleside":true,"bump":{"position":30,"size":16},"texture":[4,1],"offset":{"x":55,"y":92,"z":0}},"detail8":{"length":[0,22,3,0],"width":[0,90,65,57,0],"angle":[0,0,0,0],"position":[0,0,0,0,0],"doubleside":true,"bump":{"position":25,"size":6},"texture":[1,18,63],"offset":{"x":10,"y":3,"z":9}},"detail9":{"length":[0,15,5,35,0],"width":[0,100,90,50,25,0],"angle":[0,0,0,0,0],"position":[0,0,5,25,64,64],"doubleside":true,"bump":{"position":30,"size":10},"texture":[63],"offset":{"x":10,"y":36,"z":0}},"detail10":{"length":[24,3,13,0],"width":[85,45,40,10,0],"angle":[0,0,0,0],"position":[25,30,34,60,60],"doubleside":true,"bump":{"position":35,"size":10},"texture":[63,63,63,4],"offset":{"x":26,"y":-20,"z":0}}},"typespec":{"name":"Berserker","level":5,"model":10,"code":510,"specs":{"shield":{"capacity":[350,450],"reload":[7,9]},"generator":{"capacity":[175,250],"reload":[30,45]},"ship":{"mass":425,"speed":[85,100],"rotation":[55,75],"acceleration":[80,100],"dash":{"rate":1.2,"burst_speed":[180,200],"speed":[115,140],"acceleration":[60,60],"initial_energy":[45,70],"energy":[50,75]}}},"shape":[4.32,4.277,4.247,4.136,3.976,3.836,1.69,1.65,1.692,1.763,1.868,1.925,1.988,2.082,2.228,2.444,2.711,2.876,2.098,3.74,5.102,5.282,3.905,3.883,3.848,3.728,3.848,3.883,3.905,5.282,5.102,3.74,2.098,2.876,2.711,2.444,2.228,2.082,1.988,1.925,1.868,1.763,1.692,1.65,1.69,3.836,3.976,4.136,4.247,4.277],"lasers":[],"radius":5.282}}';
 
var Leviathan_601 = '{"name":"Leviathan","level":6,"model":1,"size":3.3,"zoom":0.95,"specs":{"shield":{"capacity":[275,375],"reload":[8,10]},"generator":{"capacity":[325,400],"reload":[80,110]},"ship":{"mass":280,"speed":[75,90],"rotation":[50,70],"acceleration":[85,110]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":15,"z":-1},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-45,-50,-44,-20,0,36,45,35],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,2,5,10,22,22,12,0],"height":[0,2,5,11,11,10,8,0],"texture":[3.9,16.9,8,3.9,11,3.9,16.9],"propeller":true,"laser":{"damage":[95,140],"rate":1,"type":2,"speed":[200,240],"number":1,"recoil":250,"error":0}},"detail2":{"section_segments":6,"offset":{"x":0,"y":15,"z":4},"position":{"x":[0,0,0,0,0,0],"y":[-17,-17,0,5,16,16],"z":[3,3,0,3,3,3]},"width":[0,4,9,6,6,0],"height":[0,5,12,6,6,0],"texture":[7,9,9,9,7],"propeller":false},"detail3":{"section_segments":6,"offset":{"x":0,"y":15,"z":2},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-44,-44,-19,-19,0,5,16,21,21],"z":[-0.5,-0.5,5.5,4,0,4,4,4,4]},"width":[0,3,3,5,12,9,9,6,0],"height":[0,3,3,5,12,6,6,5,0],"texture":[0.9,0.9,63],"propeller":false},"detail4":{"section_segments":6,"offset":{"x":23,"y":15,"z":-12},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-85,-87,-84,-70,-65,-35,0,35,44,52,55,45],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,2.5,4,6,6,6,13,13,9,9,5,0],"height":[0,2,3,4,4,4,9,9,7,7,3,0],"texture":[3.9,63,3.9,63,12.9,3.9,10.241,3.9,15,16.9],"propeller":true,"laser":{"damage":[6,12],"rate":3,"type":1,"speed":[125,160],"number":1,"error":0}},"detail5":{"section_segments":6,"offset":{"x":22,"y":15,"z":-12},"position":{"x":[0,0,0,0,0,0,0],"y":[-70,-70,-35,0,35,35],"z":[0,0,0,0,0,0]},"width":[0,6,6,13,13,0],"height":[0,4,4,9,9,0],"texture":[3.9,10.241,11,11]},"detail6":{"section_segments":6,"offset":{"x":47,"y":17,"z":-11},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-30,-35,-30,-20,-15,5,7,37,40,40],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,2,4,4,3,3,6,6,3,0],"height":[0,2,4,4,3,3,6,6,3,0],"texture":[3.9,0.9,8,0.9,4,63,15,63],"laser":{"damage":[6,12],"rate":3,"type":1,"speed":[125,160],"number":1,"error":0}},"detail7":{"section_segments":4,"offset":{"x":29,"y":0,"z":-13},"position":{"x":[-5,-5,0,0,-8,-8],"y":[-55,-55,-20,-5,25,25],"z":[0,0,0,0,0,0]},"width":[0,5,8,7,3,0],"height":[0,3,3,3,3,0],"texture":63,"propeller":false,"angle":0},"detail8":{"section_segments":4,"offset":{"x":47,"y":34,"z":-7.6},"position":{"x":[-5,0,0],"y":[-20,10,10],"z":[0.1,0,0]},"width":[0,5,0],"height":[0,3,0],"texture":[1],"angle":180,"propeller":false},"detail9":{"section_segments":4,"offset":{"x":47,"y":34,"z":-7.6},"position":{"x":[5,0,0],"y":[-20,10,10],"z":[0.1,0,0]},"width":[0,5,0],"height":[0,3,0],"texture":[1],"angle":180},"detail10":{"section_segments":[45,135,225,315],"offset":{"x":12,"y":-6,"z":-33},"position":{"x":[0,0,0,0,0],"y":[5,5,15,16,16],"z":[0,0,0,0,0]},"width":[0,4,4,2,0],"height":[0,25,25,18,0],"texture":[63,17,4],"angle":20,"vertical":true},"detail11":{"section_segments":6,"offset":{"x":11,"y":24,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-2,0.7,2,2,-2,-2],"z":[0,0,0,0,0,0]},"width":[10,10,10,8,8,10],"height":[10,10,10,8,8,10],"texture":[3.9,63,3.9]},"detail12":{"section_segments":6,"offset":{"x":11,"y":30,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-2,0.7,2,2,-2,-2],"z":[0,0,0,0,0,0]},"width":[10,10,10,8,8,10],"height":[10,10,10,8,8,10],"texture":[3.9,63,3.9]},"detail13":{"section_segments":10,"offset":{"x":7.3,"y":-6,"z":-38},"position":{"x":[0,0,0,0,0,0],"y":[7,14,15,13,13],"z":[0,0,0,0,0,0]},"width":[4,4,3,1.5,0],"height":[4,4,3,1.5,0],"texture":[63,63,17,4],"vertical":true,"angle":10},"detail14":{"section_segments":6,"offset":{"x":37,"y":27,"z":-11},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[10,10,8,8,10],"height":[6,6,4,4,6],"texture":[3.9]},"detail15":{"section_segments":6,"offset":{"x":37,"y":34,"z":-11},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[10,10,8,8,10],"height":[6,6,4,4,6],"texture":[3.9]},"detail16":{"section_segments":10,"offset":{"x":47,"y":-18,"z":-50.5},"position":{"x":[0,0,0,0,0,0],"y":[7,14,15,13,13],"z":[0,0,0,0,0,0]},"width":[3,3,2,1,0],"height":[3,3,2,1,0],"texture":[63,63,17,4],"vertical":true},"detail17":{"section_segments":10,"offset":{"x":47,"y":-18,"z":-44},"position":{"x":[0,0,0,0,0,0],"y":[7,14,15,13,13],"z":[0,0,0,0,0,0]},"width":[3,3,2,1,0],"height":[3,3,2,1,0],"texture":[63,63,17,4],"vertical":true}},"wings":{"detail":{"doubleside":true,"length":[17,15,6],"width":[40,25,20,35],"angle":[-3,0,0],"position":[5,20,10,0],"texture":[8.2,63,17],"bump":{"position":25,"size":15},"offset":{"x":30,"y":21,"z":-13}},"detail2":{"doubleside":true,"length":[17,15,6.5],"width":[40,25,20,36],"angle":[-3,0,0],"position":[5,20,10,0],"texture":[4],"bump":{"position":25,"size":15},"offset":{"x":30,"y":22,"z":-13}},"detail3":{"doubleside":true,"offset":{"x":15,"y":29,"z":-1},"length":[0,25],"width":[0,40,0],"angle":[0,15],"position":[0,0,30],"texture":[63],"bump":{"position":43,"size":10}},"detail4":{"doubleside":true,"offset":{"x":0,"y":40,"z":-5},"length":[15,3,3,-1],"width":[12,12,35,15,0],"angle":[90,90,90,90],"position":[0,0,0,0,10],"texture":[4,4,4,17],"bump":{"position":30,"size":25}},"detail5":{"doubleside":true,"offset":{"x":0,"y":41,"z":-5},"length":[15,3,3,-1],"width":[12,12,35,15,0],"angle":[90,90,90,90],"position":[0,0,0,0,10],"texture":[4,4,12,17],"bump":{"position":30,"size":25}},"detail6":{"doubleside":true,"offset":{"x":0,"y":15,"z":-11},"length":[6,5,3,10],"width":[30,30,125,125,65],"angle":[0,0,0,0],"position":[0,0,-35,-35,-10],"texture":[4,15,17,63],"bump":{"position":40,"size":6}}},"typespec":{"name":"Leviathan","level":6,"model":1,"code":601,"specs":{"shield":{"capacity":[275,375],"reload":[8,10]},"generator":{"capacity":[325,400],"reload":[80,110]},"ship":{"mass":280,"speed":[75,90],"rotation":[50,70],"acceleration":[85,110]}},"shape":[2.313,5.523,5.212,5.034,4.289,3.757,3.368,3.091,2.9,3.227,3.439,3.438,3.356,4.553,4.662,4.859,5.152,5.234,4.898,4.987,4.881,4.771,4.96,4.858,4.019,3.968,4.019,4.858,4.96,4.771,4.881,4.987,4.898,5.234,5.152,4.859,4.662,4.553,3.356,3.438,3.439,3.227,2.9,3.091,3.368,3.757,4.289,5.034,5.212,5.523],"lasers":[{"x":0,"y":-2.31,"z":-0.066,"angle":0,"damage":[95,140],"rate":1,"type":2,"speed":[200,240],"number":1,"spread":0,"error":0,"recoil":250},{"x":1.518,"y":-4.752,"z":-0.792,"angle":0,"damage":[6,12],"rate":3,"type":1,"speed":[125,160],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.518,"y":-4.752,"z":-0.792,"angle":0,"damage":[6,12],"rate":3,"type":1,"speed":[125,160],"number":1,"spread":0,"error":0,"recoil":0},{"x":3.102,"y":-1.188,"z":-0.726,"angle":0,"damage":[6,12],"rate":3,"type":1,"speed":[125,160],"number":1,"spread":0,"error":0,"recoil":0},{"x":-3.102,"y":-1.188,"z":-0.726,"angle":0,"damage":[6,12],"rate":3,"type":1,"speed":[125,160],"number":1,"spread":0,"error":0,"recoil":0}],"radius":5.523}}';
var Side_Destroyer_602 = '{"name":"Side-Destroyer","level":6,"model":2,"size":1.7,"zoom":1.1,"specs":{"shield":{"capacity":[300,400],"reload":[8,10]},"generator":{"capacity":[350,450],"reload":[125,150]},"ship":{"mass":275,"speed":[80,95],"rotation":[50,70],"acceleration":[80,100]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":60,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-67,-70,-65,-42,-25,0,15,22,30,50,55,45],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,4,7,20,28,28,25,16,16,16,13,0],"height":[0,4,7,17,20,23,20,16,16,16,13,0],"texture":[1.9,16.9,3.9,3.9,8,63,3.9,11,12.9,63,16.9],"propeller":true},"detail2":{"section_segments":6,"offset":{"x":0,"y":25,"z":10},"position":{"x":[0,0,0,0,0,0],"y":[-20,-20,0,20,40,40],"z":[-3,-3,0,0,5,5]},"width":[0,6,10,13,10,0],"height":[0,5,10,17,8,0],"propeller":false,"texture":[7,9,9,10.241]},"detail3":{"section_segments":6,"offset":{"x":18,"y":5,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-50,-40,5,25,45,40],"z":[0,0,0,0,0,0,0]},"width":[0,2,4,4,7,7,0],"height":[0,2,4,4,7,7,0],"texture":[12,63,11,4,4,4],"angle":0,"laser":{"damage":[10,13],"rate":3,"type":1,"speed":[120,170],"number":1,"error":0}},"detail4":{"section_segments":6,"offset":{"x":0,"y":75,"z":39},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-25,-30,-20,5,25,45,50,50],"z":[0,0,0,0,0,0,0,0]},"width":[0,3,6,6,10,10,5,0],"height":[0,3,6,6,10,10,5,0],"texture":[3.9,63,12.9,3.9,3.9,16.9],"angle":0,"laser":{"damage":[10,13],"rate":3,"type":1,"speed":[120,170],"number":1,"error":0}},"detail5":{"section_segments":6,"offset":{"x":57,"y":40,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[-20,-20,-10,10,35,40,30],"z":[0,0,0,0,0,0,0]},"width":[0,8,12,12,12,10,0],"height":[0,5,8,8,8,7,0],"texture":[63,3.9,16.9,10.245,3.9,16.9],"propeller":true},"detail6":{"section_segments":6,"offset":{"x":15,"y":70,"z":-10},"position":{"x":[0,0,0,0,0,0,0],"y":[-20,-20,-10,10,35,40,30],"z":[0,0,0,0,0,0,0]},"width":[0,8,12,12,12,10,0],"height":[0,5,8,8,8,7,0],"texture":[63,3.9,16.9,10.245,3.9,16.9],"propeller":true},"detail7":{"section_segments":[0,60,120,180],"offset":{"x":-9,"y":35,"z":10},"position":{"x":[6,6,0,0,0,-8,-8],"y":[-33,-33,0,18,20,35,35],"z":[-4,-4,0,0,0,3,3]},"width":[0,5,15,15,15,5,0],"height":[0,5,14,14,14,3,0],"texture":[16.9,1,18,63,4]},"detail8":{"section_segments":8,"offset":{"x":15,"y":17,"z":-45},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-5,-7,-4,-4,-6,-6,8,8],"z":[0,0,0,0,0,0,0,0]},"width":[-4,4,4,5,5,6,6,0],"height":[-4,4,4,5,5,6,6,0],"vertical":true,"texture":[17,4,4,4,63,4],"angle":205},"detail9":{"section_segments":6,"offset":{"x":65,"y":35,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-105,-107,-93,-83,-30,-20,0,35,40,40],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,2,5,3.5,5,5,8,8,6,0],"height":[0,2,5,3.5,5,5,8,8,6,0],"texture":[3.9,0.9,16.9,3.9,10.25,63,11,3.9,3.9],"laser":{"damage":[60,80],"rate":0.8,"type":2,"speed":[190,240],"recoil":130,"number":1,"error":0}}},"wings":{"detail1":{"doubleside":true,"offset":{"x":66,"y":50,"z":-6},"length":[-15,-10,-40,-15,-15],"width":[30,30,200,40,40,0],"angle":[310,315,315,360,360],"position":[0,0,-20,40,47,47],"texture":[11,63,4,11.5],"bump":{"position":20,"size":-5}},"detail2":{"doubleside":true,"offset":{"x":50,"y":50,"z":0},"length":[0,15,10,5,30,0],"width":[0,30,30,270,255,50,0],"angle":[-175,-175,-135,-135,-145,-170],"position":[0,0,0,-80,-80,20,30],"texture":[1,1,63,17,3,4],"bump":{"position":50,"size":5}},"detail3":{"doubleside":true,"offset":{"x":65,"y":56,"z":-10},"length":[10,10,5,13,19],"width":[30,30,110,110,25,5],"angle":[0,0,0,0,0],"position":[0,0,-35,-35,20,53],"texture":[4,8,17,15,63],"bump":{"position":10,"size":5}},"detail4":{"doubleside":true,"offset":{"x":0,"y":20,"z":0},"length":[5,8,12,40],"width":[30,30,100,25,10],"angle":[0,0,0,4],"position":[10,10,-20,20,15],"texture":[20,17,8,4],"bump":{"position":10,"size":5}},"detail5":{"doubleside":true,"offset":{"x":66,"y":51,"z":-6},"length":[-15,-10,-40,-15,-15],"width":[30,30,200,40,40,0],"angle":[310,315,315,360,360],"position":[0,0,-20,40,47,47],"texture":[11,63,18,18,1],"bump":{"position":20,"size":-5}},"detail6":{"doubleside":true,"offset":{"x":65,"y":57,"z":-10},"length":[10,10,5,13,19],"width":[30,30,110,110,25,5],"angle":[0,0,0,0,0],"position":[0,0,-35,-35,20,53],"texture":[4,8,18,4,63],"bump":{"position":10,"size":5}}},"typespec":{"name":"Side-Destroyer","level":6,"model":2,"code":602,"specs":{"shield":{"capacity":[300,400],"reload":[8,10]},"generator":{"capacity":[350,450],"reload":[125,150]},"ship":{"mass":275,"speed":[80,95],"rotation":[50,70],"acceleration":[80,100]}},"shape":[0.341,5.69,5.158,3.35,2.489,2.911,3.338,3.181,2.866,3.139,3.271,3.208,3.21,3.292,3.428,3.643,3.95,4.627,5.642,3.662,3.519,4.12,4.759,4.461,4.127,4.253,4.127,4.461,4.759,4.12,3.519,3.662,5.642,4.627,3.95,3.643,3.428,3.292,3.21,3.208,3.271,3.139,2.866,3.181,3.338,2.911,2.489,3.35,5.158,5.69],"lasers":[{"x":0.612,"y":-1.53,"z":0,"angle":0,"damage":[10,13],"rate":3,"type":1,"speed":[120,170],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.612,"y":-1.53,"z":0,"angle":0,"damage":[10,13],"rate":3,"type":1,"speed":[120,170],"number":1,"spread":0,"error":0,"recoil":0},{"x":0,"y":1.53,"z":1.326,"angle":0,"damage":[10,13],"rate":3,"type":1,"speed":[120,170],"number":1,"spread":0,"error":0,"recoil":0},{"x":2.21,"y":-2.448,"z":-0.34,"angle":0,"damage":[60,80],"rate":0.8,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":130},{"x":-2.21,"y":-2.448,"z":-0.34,"angle":0,"damage":[60,80],"rate":0.8,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":130}],"radius":5.69}}';
var Falcon_603 = '{"name":"Falcon","level":6,"model":3,"size":3.35,"specs":{"shield":{"capacity":[275,375],"reload":[7,9]},"generator":{"capacity":[300,400],"reload":[105,150]},"ship":{"mass":265,"speed":[90,100],"rotation":[70,90],"acceleration":[85,105]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":-10,"z":-5},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-50,-50,-40,-30,-25,-20,-7,7,10,15,50,50],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,4,10,13,13,8,8,16,20,20,20,0],"height":[0,4,9,9,9,7,7,11,15,15,15,0],"texture":[63,63,0.9,0.9,0.9,10.245,11,16.9,8.2,18]},"detail2":{"section_segments":6,"angle":90,"offset":{"x":-2,"y":25,"z":6},"position":{"x":[0,0,0,0,0,0],"y":[-11,-11,-8,-5,2,2],"z":[0,0,0,0,0,0]},"width":[0,15,15,15,15,0],"height":[0,15,15,10,10,0],"texture":[0.9,18,16.9,15,3.9]},"detail3":{"section_segments":6,"offset":{"x":0,"y":-40,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[-17,-17,-10,0,5,13,13],"z":[-1,-1,0,0,0,-2,-2]},"width":[0,3,7,9,9,5,0],"height":[0,2,4,8,8,5,0],"propeller":false,"texture":[7,7,9,3.9]},"detail4":{"section_segments":[0,60,120,180],"offset":{"x":1,"y":30,"z":15},"position":{"x":[-0.5,-0.5,-0.5,-0.5,0,0,0],"y":[-33,-33,-30,-20,-15,-3,-3],"z":[0,0,0,0,0,0,0]},"width":[0,2,3,3,4,4,0],"height":[0,1.2,2,2,4,4,0],"angle":180,"texture":[1,1,1,4,10,4]},"detail5":{"section_segments":6,"offset":{"x":0,"y":30,"z":15},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-25,-30,-28,-25,-20,-15,-3,0,17,20,25,53],"z":[0,0,0,0,0,0,0,0,0,0,0,-20]},"width":[0,1.5,2,3,3,4,4,6,6,3,2,2],"height":[0,1,1.5,2,2,4,4,6,6,3,2,2],"angle":180,"laser":{"damage":[15,23],"rate":5,"type":1,"speed":[220,250],"number":1,"error":0},"propeller":false,"texture":[16.9,3.9,16.9,63,3.9,15,63,3.9,63]},"detail6":{"section_segments":6,"offset":{"x":0,"y":-50,"z":-13},"position":{"x":[0,0,0,0,0,0],"y":[-14,-17,-15,10,12,12],"z":[0,0,0,0,0,0]},"width":[0,2,3,3,2,0],"height":[0,2,3,3,2,0],"texture":[3.9,63,18,3.9],"laser":{"damage":[65,90],"rate":0.85,"type":1,"speed":[200,240],"number":1,"error":0}},"detail7":{"section_segments":6,"offset":{"x":19,"y":-34,"z":-5},"position":{"x":[0,0,0,0,0,0],"y":[-3,-5,0,12,17,15],"z":[0,0,0,0,0,0]},"width":[0,1.2,2,2,1.2,0],"height":[0,1.2,2,2,1.2,0],"texture":[12,0.9,8.2,0.9,12],"laser":{"damage":[7,10],"rate":2.5,"type":1,"speed":[140,200],"number":1,"error":0}},"detail8":{"section_segments":6,"offset":{"x":28,"y":21,"z":2},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-17,-20,-15,-5,5,15,20,17],"z":[0,0,0,0,0,0,0,0]},"width":[0,2,3,3,3,3,2,0],"height":[0,2,3,3,3,3,2,0],"texture":[12,0.9,15,3.9,15,0.9,12],"angle":0,"laser":{"damage":[7,10],"rate":2.5,"type":1,"speed":[140,200],"number":1,"error":0}},"detail9":{"section_segments":6,"offset":{"x":12,"y":20,"z":3},"position":{"x":[-2,-2,0,0,0,0,0,0],"y":[-15,-15,-10,0,10,30,32,25],"z":[2,2,0,0,0,0,0,0]},"width":[0,2,5,7,12,8,7,0],"height":[0,2,5,7,12,8,7,0],"texture":[63,63,63,63,3.9,63,16.9],"propeller":true},"detail10":{"section_segments":6,"offset":{"x":6,"y":20,"z":-13},"position":{"x":[0,0,0,0,0,0],"y":[-20,-20,0,10,35,25],"z":[-1,-1,0,0,0,0]},"width":[0,5,7,10,5,0],"height":[0,4,7,10,5,0],"texture":[63,63,63,16.9],"propeller":true},"detail11":{"section_segments":6,"offset":{"x":40,"y":20,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-5,-10,0,10,12,15,20,35,30],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,4,7,7,5,5,7,5,0],"height":[0,4,7,7,5,5,7,5,0],"texture":[12,63,10.25,0.9,3.9,3.9,0.9,16.9],"propeller":true},"detail12":{"section_segments":10,"offset":{"x":0,"y":-6,"z":9},"position":{"x":[0,0,0,0,0,0,0],"y":[0,12,12,10,12,12],"z":[0,0,0,0,0,0,0]},"width":[7,7,6,4,3,0],"height":[7,7,6,4,3,0],"texture":[4,4,17,4,18],"vertical":true}},"wings":{"detail":{"length":[24,0,4,15],"width":[20,20,35,35,10],"angle":[0,0,0,0],"position":[0,0,5,5,30],"doubleside":true,"offset":{"x":0,"y":15,"z":0},"bump":{"position":20,"size":10},"texture":[15,4,17,11.2]},"detail2":{"length":[19],"width":[25,8],"angle":[0],"position":[0,20],"doubleside":true,"offset":{"x":0,"y":-45,"z":-5},"bump":{"position":30,"size":25},"texture":[4]},"detail3":{"length":[7,9],"width":[55,55,10],"angle":[0,0],"position":[0,0,35],"doubleside":true,"offset":{"x":0,"y":-25,"z":-5},"bump":{"position":30,"size":8},"texture":[63]},"detail4":{"length":[24,0,4,13],"width":[20,20,35,35,10],"angle":[0,0,0,0],"position":[0,0,5,5,30],"doubleside":true,"offset":{"x":0,"y":16,"z":0},"bump":{"position":20,"size":10},"texture":[18,4,63]},"detail5":{"doubleside":true,"offset":{"x":15,"y":20,"z":10},"length":[0,-3,-3,-1,-9,-3,0],"width":[0,20,20,60,60,20,10,0],"angle":[280,280,315,315,335,350,0],"position":[7,7,7,-20,-20,3,3,3],"texture":[63,63,63,17,4,17,63],"bump":{"position":30,"size":-10}},"detail6":{"doubleside":true,"offset":{"x":15,"y":21,"z":10},"length":[0,-3,-3,-1,-9,-3,0],"width":[0,20,20,60,60,20,10,0],"angle":[280,280,315,315,335,350,0],"position":[7,7,7,-20,-20,3,3,3],"texture":[63,63,63,1,1,63,63],"bump":{"position":30,"size":-10}},"detail7":{"doubleside":true,"offset":{"x":37,"y":40,"z":0},"length":[0,10,0,2,4.5,0],"width":[0,10,10,35,35,30,0],"angle":[0,0,0,0,0,0],"position":[0,0,0,-5,-5,-3,-3],"texture":[4,4,4,17,63],"bump":{"position":35,"size":15}}},"typespec":{"name":"Falcon","level":6,"model":3,"code":603,"specs":{"shield":{"capacity":[275,375],"reload":[7,9]},"generator":{"capacity":[300,400],"reload":[105,150]},"ship":{"mass":265,"speed":[90,100],"rotation":[70,90],"acceleration":[85,105]}},"shape":[4.49,3.988,3.274,2.888,2.938,2.586,2.176,1.866,1.154,1.083,1.041,1.02,1.158,2.04,3.027,3.754,4.09,4.429,4.915,4.999,4.733,3.17,3.688,3.718,4.088,4.227,4.088,3.718,3.688,3.17,4.733,4.999,4.915,4.429,4.09,3.754,3.027,2.04,1.16,1.02,1.041,1.083,1.154,1.866,2.176,2.586,2.938,2.888,3.274,3.988],"lasers":[{"x":0,"y":4.02,"z":1.005,"angle":180,"damage":[15,23],"rate":5,"type":1,"speed":[220,250],"number":1,"spread":0,"error":0,"recoil":0},{"x":0,"y":-4.489,"z":-0.871,"angle":0,"damage":[65,90],"rate":0.85,"type":1,"speed":[200,240],"number":1,"spread":0,"error":0,"recoil":0},{"x":1.273,"y":-2.613,"z":-0.335,"angle":0,"damage":[7,10],"rate":2.5,"type":1,"speed":[140,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.273,"y":-2.613,"z":-0.335,"angle":0,"damage":[7,10],"rate":2.5,"type":1,"speed":[140,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":1.876,"y":0.067,"z":0.134,"angle":0,"damage":[7,10],"rate":2.5,"type":1,"speed":[140,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.876,"y":0.067,"z":0.134,"angle":0,"damage":[7,10],"rate":2.5,"type":1,"speed":[140,200],"number":1,"spread":0,"error":0,"recoil":0}],"radius":4.999}}';
var Helius_604 = '{"name":"Helius","level":6,"model":4,"size":2.4,"zoom":1,"specs":{"shield":{"capacity":[275,350],"reload":[6,8]},"generator":{"capacity":[225,300],"reload":[85,105]},"ship":{"mass":325,"speed":[80,95],"rotation":[50,65],"acceleration":[75,90]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[-25,-25,-17,37,50,60,60],"z":[3,3,3,1,0,2,2]},"width":[0,15,23,37,37,15,0],"height":[0,7,13,14,14,8,0],"texture":[3.9,3.9,8,63,3.9]},"detail2":{"section_segments":[0,60,120,180],"offset":{"x":-22,"y":-15,"z":0},"position":{"x":[12.5,12.5,11,9.7,0,-18,10,10.5,10.5],"y":[-70,-70,-64,-56,-52,45,65,80,80],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,11,20,20,10,10,32,25,0],"height":[0,7,10,10,8,8,13,8,0],"texture":[63,63,15,63,1,10.25,1]},"detail3":{"section_segments":[45,135,225,315],"offset":{"x":-27.5,"y":-11,"z":2.54},"position":{"x":[-12,-12,5,-5,0,0],"y":[-15,-15,-4,-4,12,12],"z":[0,0,0,0,0,0]},"width":[0,30,45,15,10,0],"height":[0,3,10,12,10,0],"texture":[63,4,17,18,4],"angle":79.5},"detail4":{"section_segments":6,"offset":{"x":0,"y":-23,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[-10,-10,-6,10,85,90,83],"z":[0,0,0,0,0,0,0]},"width":[0,5,10,14,17,14,0],"height":[0,4,8,9,9,7,0],"texture":[7,7,9,15,63,16.9],"propeller":true},"detail5":{"section_segments":6,"offset":{"x":0,"y":-12,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-16,-16,-14,-6,10,14,23,26,27,27],"z":[-5,-5,-3,0,2,2,2,2,2,2]},"width":[0,5,5,8,13,13,13,13,11,0],"height":[0,4,4,8,10,10,10,10,8,0],"texture":[63,63,9,9,15,10.241,15,3.9]},"detail6":{"section_segments":6,"offset":{"x":9,"y":-4,"z":12},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-35,-40,-20,-18,1,10,18,20,20],"z":[-4,-4,-4,-4,-1,0,0,0,0]},"width":[0,1,3,6,6,6,6,4,0],"height":[0,1,3,6,6,6,6,4,0],"texture":[4,63,1,12,10,8.2,63,63],"laser":{"damage":[40,60],"rate":2.6,"type":2,"speed":[190,240],"number":1,"error":0}},"detail8":{"section_segments":12,"offset":{"x":0,"y":9,"z":-30},"position":{"x":[0,0,0,0,0,0,0,0],"y":[0,11,11,10,13,13,12,12],"z":[0,0,0,0,0,0,0,0,0]},"width":[10,10,9,7,5,4,3,0],"height":[10,10,9,7,5,4,3,0],"texture":[4,4,17,4,63,4,18],"vertical":true},"detail9":{"section_segments":10,"offset":{"x":-9,"y":10,"z":10},"position":{"x":[0,0,0,0,0],"y":[-1.5,1.5,1.5,-1.5,-1.5],"z":[0,0,0,0,0]},"width":[10,10,8,8,10],"height":[6,6,4,4,6],"texture":[63]},"detail10":{"section_segments":16,"offset":{"x":0,"y":5,"z":-30},"position":{"x":[0,0,0,0,0,0,0],"y":[-10,-10,10,10,12,12,12],"z":[0,0,0,0,0,0,0]},"width":[0,20,20,15,14,12,12],"height":[0,20,20,15,14,12,0],"texture":[4,4,18,17,63,15],"vertical":true},"detail11":{"section_segments":10,"offset":{"x":7.5,"y":25.5,"z":9},"position":{"x":[0,0,0,0,0],"y":[-1.5,1.5,1.5,-1.5,-1.5],"z":[0,0,0,0,0]},"width":[10,10,8,8,10],"height":[10,10,8,8,10],"texture":[63],"angle":30},"detail12":{"section_segments":10,"offset":{"x":7.5,"y":34.5,"z":9},"position":{"x":[0,0,0,0,0],"y":[-1.5,1.5,1.5,-1.5,-1.5],"z":[0,0,0,0,0]},"width":[10,10,8,8,10],"height":[10,10,8,8,10],"texture":[63],"angle":-30},"detail13":{"section_segments":10,"offset":{"x":0,"y":40,"z":10},"position":{"x":[0,0,0,0,0],"y":[-1.5,1.5,1.5,-1.5,-1.5],"z":[0,0,0,0,0]},"width":[10,10,8,8,10],"height":[10,10,8,8,10],"texture":[63],"angle":90},"detail14":{"section_segments":10,"offset":{"x":0,"y":20,"z":10},"position":{"x":[0,0,0,0,0],"y":[-1.5,1.5,1.5,-1.5,-1.5],"z":[0,0,0,0,0]},"width":[10,10,8,8,10],"height":[10,10,8,8,10],"texture":[63],"angle":90},"detail15":{"section_segments":8,"offset":{"x":0,"y":8,"z":-55},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-5,-7,-4,-4,-6,-6,8,8],"z":[0,0,0,0,0,0,0,0]},"width":[-2,2,2,3,3,4,4,0],"height":[-2,2,2,3,3,4,4,0],"vertical":true,"texture":[17,6,4,4,63,4],"angle":180},"detail16":{"section_segments":6,"offset":{"x":9,"y":5,"z":10},"position":{"x":[0,0,0,0,0],"y":[-1.5,1.5,1.5,-1.5,-1.5],"z":[0,0,0,0,0]},"width":[10,10,8,8,10],"height":[6,6,4,4,6],"texture":[63]},"detail17":{"section_segments":6,"offset":{"x":9,"y":0,"z":10},"position":{"x":[0,0,0,0,0],"y":[-1.5,1.5,1.5,-1.5,-1.5],"z":[0,0,0,0,0]},"width":[10,10,8,8,10],"height":[6,6,4,4,6],"texture":[63]},"detail18":{"section_segments":[45,135,225,315],"offset":{"x":12,"y":0,"z":-5},"position":{"x":[0,0,0,0,0],"y":[-5,-5,15,16,16],"z":[0,0,0,0,0]},"width":[0,3,3,2,0],"height":[0,12,12,10,0],"texture":[63,17,63],"angle":35,"vertical":true},"detail19":{"section_segments":[45,135,225,315],"offset":{"x":21,"y":20,"z":9},"position":{"x":[0,0,0,0,0],"y":[-20,-20,0,20,20],"z":[-5,-5,0,5,5]},"width":[0,3,3,3,0],"height":[0,3,3,3,0],"texture":[4,12,18,4],"angle":-65},"detail20":{"section_segments":[45,135,225,315],"offset":{"x":23,"y":30,"z":9},"position":{"x":[0,0,0,0,0],"y":[-20,-20,0,20,20],"z":[-5,-5,0,5,5]},"width":[0,3,3,3,0],"height":[0,3,3,3,0],"texture":[4,12,18,4],"angle":-65},"detail21":{"section_segments":8,"offset":{"x":26,"y":8,"z":-29},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-5,-7,-4,-4,-6,-6,8,8],"z":[0,0,0,0,0,0,0,0]},"width":[-2,2,2,3,3,4,4,0],"height":[-2,2,2,3,3,4,4,0],"vertical":true,"texture":[17,6,4,4,63,4],"angle":180},"detail22":{"section_segments":8,"offset":{"x":24,"y":8,"z":-19},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-5,-7,-4,-4,-6,-6,8,8],"z":[0,0,0,0,0,0,0,0]},"width":[-2,2,2,3,3,4,4,0],"height":[-2,2,2,3,3,4,4,0],"vertical":true,"texture":[17,6,4,4,63,4],"angle":180},"detail23":{"section_segments":6,"offset":{"x":17,"y":60,"z":0},"position":{"x":[0,0,0,0,0],"y":[-10,-10,7,10,0],"z":[0,0,0,0,0]},"width":[0,10,10,8,0],"height":[0,5,5,4,0],"propeller":true,"texture":[3.9,12,63,16.9]}},"wings":{"detail":{"offset":{"x":33,"y":65,"z":0},"length":[0,11,2,19,0],"width":[0,17,45,45,15,0],"texture":[11,18,17,4],"angle":[0,0,0,0,0],"position":[-10,-10,-20,-20,10,10],"doubleside":true,"bump":{"position":35,"size":15}},"detail2":{"offset":{"x":33,"y":66,"z":0},"length":[0,11,2,19,0],"width":[0,17,45,45,15,0],"texture":[63,63,63,63,4],"angle":[0,0,0,0,0],"position":[-10.5,-10.5,-20,-20,10,10],"doubleside":true,"bump":{"position":34,"size":15}}},"typespec":{"name":"Helius","level":6,"model":4,"code":604,"specs":{"shield":{"capacity":[275,350],"reload":[6,8]},"generator":{"capacity":[225,300],"reload":[85,105]},"ship":{"mass":325,"speed":[80,95],"rotation":[50,65],"acceleration":[75,90]}},"shape":[1.587,4.153,4.181,4.058,3.46,2.984,2.627,2.405,2.246,2.224,2.153,2.119,2.15,2.219,2.33,2.49,2.621,3.124,3.978,4.895,5.079,3.875,3.551,3.532,3.42,3.222,3.42,3.532,3.551,3.875,5.079,4.895,3.978,3.124,2.621,2.49,2.33,2.219,2.15,2.119,2.153,2.224,2.246,2.405,2.627,2.984,3.46,4.058,4.181,4.153],"lasers":[{"x":0.432,"y":-2.112,"z":0.576,"angle":0,"damage":[40,60],"rate":2.6,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.432,"y":-2.112,"z":0.576,"angle":0,"damage":[40,60],"rate":2.6,"type":2,"speed":[190,240],"number":1,"spread":0,"error":0,"recoil":0}],"radius":5.079}}';
var Phoenix_605 = '{"name":"Phoenix","level":6,"model":5,"size":2.23,"specs":{"shield":{"capacity":[200,325],"reload":[7,9]},"generator":{"capacity":[325,450],"reload":[85,105]},"ship":{"mass":255,"speed":[105,125],"rotation":[110,130],"acceleration":[100,120]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":-10,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-70,-70,-62,-58,-30,-20,10,30,74,77,85,90,80],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,3,6,8,17,25,25,16,16,16,16,13,0],"height":[0,2,5,6,16,20,20,13,13,13,13,10,0],"propeller":true,"texture":[63,63,3.9,12,8,10,3.9,15,0.9,18,16.9,16.9]},"detail2":{"section_segments":6,"offset":{"x":0,"y":-50,"z":8},"position":{"x":[0,0,0,0,0,0,0],"y":[-11,-11,4,22,37,40,40],"z":[-1,-1,0,1,1,6,6]},"width":[0,3,10,15,15,11,0],"height":[0,3,8,13,13,7,0],"propeller":false,"texture":[7,9,9,18,63]},"detail3":{"section_segments":6,"offset":{"x":21,"y":-25,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[-35,-42,-39,-20,-5,8,8],"z":[0,0,0,0,0,0,0]},"width":[0,1.5,2.5,4,7,7,0],"height":[0,1.5,2.5,4,5,5,0],"angle":0,"laser":{"damage":[7,12],"rate":3,"type":1,"speed":[180,205],"number":1,"error":0},"propeller":false,"texture":[3.9,63,0.9,3.9,15,3.9]},"detail4":{"section_segments":6,"offset":{"x":0,"y":48,"z":-6},"position":{"x":[-58,-58,-58,-55,-55,-55,-55,-55,-55],"y":[-35,-35,-15,-5,-2,20,22,27,27],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,2,2,6,6,6,6,3,0],"height":[0,2,2,6,6,6,6,3,0],"texture":[0.9,0.9,3.9,63,10.11,63,3.9]},"detail5":{"section_segments":6,"offset":{"x":0,"y":48,"z":-6},"position":{"x":[58,58,58,55,55,55,55,55,55],"y":[-35,-35,-15,-5,-2,20,22,27,27],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,2,2,6,6,6,6,3,0],"height":[0,2,2,6,6,6,6,3,0],"texture":[0.9,0.9,3.9,63,10.37,63,3.9]},"detail6":{"section_segments":[0,60,120,180],"offset":{"x":54.5,"y":48,"z":-6},"position":{"x":[-2,-2,-2,-2,0,0,0,0,0,0],"y":[-41,-45,-41,-15,-5,-2,20,22,27,27],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,2,2,3,6.5,6.5,6.5,6.5,3,0],"height":[0,2,2,4,7,7,7,7,4,0],"angle":0,"laser":{"damage":[7,12],"rate":3,"type":1,"speed":[180,205],"number":1,"error":0},"propeller":false,"texture":[3.9,0.9,63,3.9,63,15,63,3.9]},"detail7":{"section_segments":10,"offset":{"x":54,"y":14.5,"z":-6},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[6.5,7,5,4.5,6.5],"height":[6.5,7,5,4.5,6.5],"texture":[17,4]},"detail8":{"section_segments":6,"offset":{"x":5,"y":-23.5,"z":10},"position":{"x":[0,0,0,0,0,0],"y":[-2,0.3,2,2,-2,-2],"z":[0,0,0,0,0,0]},"width":[11,11,11,9,9,11],"height":[10,10,10,8,8,10],"texture":[0.9,63,0.9]},"detail9":{"section_segments":6,"offset":{"x":0,"y":35,"z":30},"position":{"x":[0,0,0,0,0,0,0],"y":[-15,-20,-5,0,20,25,25],"z":[0,0,0,0,0,0,0]},"width":[0,3,5,8,8,5,0],"height":[0,3,5,8,8,5,0],"angle":0,"laser":{"damage":[4,6],"rate":7,"type":1,"speed":[150,170],"number":1,"error":0},"propeller":false,"texture":[1.9,63,3.9,12,3.9]},"detail10":{"section_segments":10,"offset":{"x":0,"y":34,"z":-45.5},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,0,6,6,4,4,7,7,9,9],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,8,8,7,7,6,6,4,3,0],"height":[0,8,8,7,7,6,6,4,3,0],"vertical":true,"texture":[0.9,0.9,3.9,3.9,17,17,4,1]},"detail12":{"section_segments":10,"offset":{"x":0,"y":12,"z":23},"position":{"x":[0,0,0,0,0,0,0],"y":[0,11,11,10,12,12],"z":[0,0,0,0,0,0,0]},"width":[8,8,7,5,3,0],"height":[8,8,7,5,3,0],"texture":[4,63,17,4,18],"vertical":true},"detail13":{"section_segments":[45,135,225,315],"offset":{"x":6,"y":3,"z":15},"position":{"x":[0,0,0,0,0],"y":[-5,-5,15,16,16],"z":[0,0,0,0,0]},"width":[0,3,3,2,0],"height":[0,20,20,18,0],"texture":[63,17,63],"angle":50,"vertical":true},"detail14":{"section_segments":6,"offset":{"x":0,"y":1,"z":11},"position":{"x":[0,0,0,0,0,0,0],"y":[-5,-3,3,5,5,-5,-5],"z":[0,0,0,0,0,0,0]},"width":[15,15,15,15,13,13,15],"height":[10,10,10,10,8,8,10],"texture":[63,10.1,63,3.9],"angle":90},"detail15":{"section_segments":10,"offset":{"x":0,"y":13,"z":4},"position":{"x":[0,0,0,0,0,0,0],"y":[0,11,11,10,12,12],"z":[0,0,0,0,0,0,0]},"width":[8,8,7,5,3,0],"height":[8,8,7,5,3,0],"texture":[4,63,17,4,18],"vertical":true},"detail16":{"section_segments":6,"offset":{"x":50,"y":50,"z":-8},"position":{"x":[0,0,0,0,0,0],"y":[-2,0.3,2,2,-2,-2],"z":[0,0,0,0,0,0]},"width":[10,10,10,8,8,10],"height":[10,10,10,8,8,10],"texture":[3.9,63,3.9]},"detail17":{"section_segments":6,"offset":{"x":50,"y":55,"z":-8},"position":{"x":[0,0,0,0,0,0],"y":[-2,0.3,2,2,-2,-2],"z":[0,0,0,0,0,0]},"width":[10,10,10,8,8,10],"height":[10,10,10,8,8,10],"texture":[3.9,63,3.9]},"detail18":{"section_segments":[45,135,225,315],"offset":{"x":40,"y":-15,"z":-51},"position":{"x":[0,0,0,0,0],"y":[8,8,15,16,16],"z":[0,0,0,0,0]},"width":[0,4,4,2,0],"height":[0,10,10,8,0],"texture":[63,17,63],"angle":15,"vertical":true},"detail19":{"section_segments":[45,135,225,315],"offset":{"x":33,"y":-13,"z":-51},"position":{"x":[0,0,0,0,0],"y":[8,8,15,16,16],"z":[0,0,0,0,0]},"width":[0,4,4,2,0],"height":[0,10,10,8,0],"texture":[63,17,63],"angle":15,"vertical":true}},"wings":{"detail":{"length":[21,0,5,45,0],"width":[20,20,37.5,55,12,0],"angle":[0,0,0,-14,0],"position":[10,10,8.5,0,35,35],"doubleside":true,"offset":{"x":0,"y":30,"z":0},"bump":{"position":-20,"size":10},"texture":[15,4,63,63]},"detail2":{"length":[30],"width":[50,0],"angle":[0],"position":[0,35],"doubleside":true,"offset":{"x":0,"y":45,"z":0},"bump":{"position":50,"size":20},"texture":[63]},"detail3":{"length":[5,30],"width":[45,45,10],"angle":[0,0],"position":[0,0,40],"doubleside":true,"offset":{"x":0,"y":-48,"z":0},"bump":{"position":55,"size":35},"texture":[63]},"detail4":{"length":[21,0,5,45,0],"width":[20,20,37.5,55,12,0],"angle":[0,0,0,-14,0],"position":[10,10,8.5,0,35,35],"doubleside":true,"offset":{"x":0,"y":31,"z":0},"bump":{"position":-20,"size":10},"texture":[4,4,8,11.4]},"detail5":{"length":[10,-2,3,8,2,13],"width":[20,20,50,50,26,25,5],"angle":[-30,-20,-20,-20,0,0],"position":[10,10,0,0,14,15,25],"doubleside":true,"bump":{"position":40,"size":10},"texture":[4,4,17,18,63,4],"offset":{"x":0,"y":30,"z":26}},"detail6":{"length":[10,-2,3,8,2,13],"width":[20,20,50,50,26,25,5],"angle":[-30,-20,-20,-20,0,0],"position":[10,10,0,0,14,15,25],"doubleside":true,"bump":{"position":40,"size":10},"texture":[4],"offset":{"x":0,"y":31,"z":26}}},"typespec":{"name":"Phoenix","level":6,"model":5,"code":605,"specs":{"shield":{"capacity":[200,325],"reload":[7,9]},"generator":{"capacity":[325,450],"reload":[85,105]},"ship":{"mass":255,"speed":[105,125],"rotation":[110,130],"acceleration":[100,120]}},"shape":[3.362,3.101,2.959,2.966,2.371,1.985,1.754,1.614,1.57,1.562,1.568,1.517,1.482,2.222,2.625,2.697,2.862,3.125,4.013,4.208,3.972,3.113,3.588,3.467,3.393,3.366,3.393,3.467,3.588,3.113,3.972,4.208,4.013,3.125,2.862,2.697,2.625,2.222,1.482,1.517,1.568,1.562,1.57,1.614,1.754,1.985,2.371,2.966,2.959,3.101],"lasers":[{"x":0.882,"y":-2.814,"z":0,"angle":0,"damage":[7,12],"rate":3,"type":1,"speed":[180,205],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.882,"y":-2.814,"z":0,"angle":0,"damage":[7,12],"rate":3,"type":1,"speed":[180,205],"number":1,"spread":0,"error":0,"recoil":0},{"x":2.205,"y":0.126,"z":-0.252,"angle":0,"damage":[7,12],"rate":3,"type":1,"speed":[180,205],"number":1,"spread":0,"error":0,"recoil":0},{"x":-2.205,"y":0.126,"z":-0.252,"angle":0,"damage":[7,12],"rate":3,"type":1,"speed":[180,205],"number":1,"spread":0,"error":0,"recoil":0},{"x":0,"y":0.63,"z":1.26,"angle":0,"damage":[4,6],"rate":7,"type":1,"speed":[150,170],"number":1,"spread":0,"error":0,"recoil":0}],"radius":4.208}}';
var Harpy_606 = '{"name":"Harpy","level":6,"model":6,"size":2.26,"specs":{"shield":{"capacity":[200,300],"reload":[7,9]},"generator":{"capacity":[300,425],"reload":[75,100]},"ship":{"mass":260,"speed":[115,130],"rotation":[105,125],"acceleration":[95,115]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-75,-75,-70,-55,-20,-10,7,30,50,60,80,87,90,80],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,2,6,12,17,17,26,26,20,16,13,12,10,0],"height":[0,2,4,10,12,12,14,14,12,10,7,6,4,0],"propeller":true,"texture":[63,63,63,3.9,8,63,8,18,63,11,15,16.9]},"detail2":{"section_segments":6,"offset":{"x":0,"y":-5,"z":9},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-25,-10,4,20,22,27,33,33],"z":[0,0,0,0,0,0,3,3]},"width":[3,4,10,12,12,12,6,0],"height":[2,4,8,10,10,10,4,0],"propeller":false,"texture":[17,9,9,63,15,3.9]},"detail3":{"section_segments":6,"offset":{"x":0,"y":-36,"z":7},"position":{"x":[0,0,0,0,0],"y":[-19,-19,-13,13,13],"z":[0,0,-2,0,0]},"width":[0,4,8,8,0],"height":[0,3,6,6,0],"propeller":false,"texture":[0.9,0.9,10.245,0.9]},"detail4":{"section_segments":6,"offset":{"x":0,"y":-20,"z":0},"position":{"x":[15,15,15,15,15,15,15,15,15,15],"y":[-40,-50,-47,-45,-5,0,3,20,25,25],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,2,3,3.2,4,6,6,6,4,0],"height":[0,2,3,3.2,4,6,6,6,4,0],"angle":0,"laser":{"damage":[5,7],"rate":8,"type":1,"speed":[190,230],"number":1,"error":0},"propeller":false,"texture":[2.9,63,0.9,8.2,63,3.9,12.9]},"detail5":{"section_segments":6,"offset":{"x":58,"y":20,"z":5},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-35,-40,-35,-33,-18,-20,0,20,24,28,30,22],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,2,3,2,2,8,12,12,10,10,8,0],"height":[0,2,3,2,2,8,12,12,8,8,6,0],"angle":0,"laser":{"damage":[5,7],"rate":8,"type":1,"speed":[190,230],"number":1,"error":0},"propeller":true,"texture":[1,1,63,3.9,3.9,10.245,12,3.9,16.9,63,16.9]},"detail6":{"section_segments":[45,135,225,315],"offset":{"x":55,"y":5,"z":-30},"position":{"x":[0,0,0,0,0],"y":[-5,-5,15,17,17],"z":[0,0,0,0,0]},"width":[0,3,3,2,0],"height":[0,15,15,13,0],"texture":[63,17,63],"angle":90,"vertical":true},"detail7":{"section_segments":4,"offset":{"x":-58.5,"y":20,"z":12},"position":{"x":[-8.5,0,-10],"y":[-10,0,20],"z":[-1.5,-0.2,-0.2]},"width":[0,10,0],"height":[0,6,0],"texture":[4]},"detail8":{"section_segments":4,"offset":{"x":57.5,"y":20,"z":12},"position":{"x":[-8.5,0,-10],"y":[-10,0,20],"z":[-1.5,-0.2,-0.2]},"width":[0,10,0],"height":[0,6,0],"texture":[4]},"detail9":{"section_segments":[45,135,225,315],"offset":{"x":53,"y":2,"z":5},"position":{"x":[1,1,0,0,0],"y":[-10,-10,-4,20,20],"z":[0,0,0,0,0]},"width":[0,1,2,2,0],"height":[0,2,2,2,0],"texture":[63]},"detail10":{"section_segments":[45,135,225,315],"offset":{"x":63,"y":2,"z":5},"position":{"x":[-1,-1,0,0,0],"y":[-10,-10,-4,20,20],"z":[0,0,0,0,0]},"width":[0,1,2,2,0],"height":[0,2,2,2,0],"texture":[63]},"detail11":{"section_segments":10,"offset":{"x":58,"y":-7,"z":5},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[5,6,4,3,5],"height":[5,6,4,3,5],"texture":[17,4]},"detail12":{"section_segments":10,"offset":{"x":58,"y":5,"z":-34},"position":{"x":[0,0,0,0,0,0],"y":[7,13,12,14,14],"z":[0,0,0,0,0,0]},"width":[6,5,4,2,0],"height":[6,5,4,2,0],"texture":[4,17,8,4],"vertical":true},"detail13":{"section_segments":[45,135,225,315],"offset":{"x":-61,"y":5,"z":-30},"position":{"x":[0,0,0,0,0],"y":[-5,-5,15,17,17],"z":[0,0,0,0,0]},"width":[0,3,3,2,0],"height":[0,15,15,13,0],"texture":[63,17,63],"angle":90,"vertical":true},"detail14":{"section_segments":[0,60,120,180],"offset":{"x":-6,"y":5,"z":4},"position":{"x":[3.1,3.1,0,0,0,0,-8,-8],"y":[-28,-28,0,2,18,20,35,35],"z":[4.1,4.1,0,0,0,0,3,3]},"width":[0,5,15,15,15,15,5,0],"height":[0,3.8,14,14,14,14,3,0],"texture":[1,1,63,10,63,1]},"detail15":{"section_segments":6,"offset":{"x":0,"y":-20,"z":0},"position":{"x":[-15,-15,-15,-15,-15,-15,-15,-15,-15,-15],"y":[-40,-50,-47,-45,-5,0,3,20,25,25],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,2,3,3.2,4,6,6,6,4,0],"height":[0,2,3,3.2,4,6,6,6,4,0],"angle":0,"laser":{"damage":[5,7],"rate":8,"type":1,"speed":[190,230],"number":1,"error":0},"propeller":false,"texture":[2.9,63,0.9,8.2,63,3.9,12.9]},"detail16":{"section_segments":6,"offset":{"x":13,"y":21,"z":7},"position":{"x":[0,0,0,0,0,0],"y":[-2,0.7,2,2,-2,-2],"z":[0,0,0,0,0,0]},"width":[10,10,10,8,8,10],"height":[10,10,10,8,8,10],"texture":[3.9,63,3.9]},"detail17":{"section_segments":6,"offset":{"x":13,"y":9,"z":7},"position":{"x":[0,0,0,0,0,0],"y":[-2,0.7,2,2,-2,-2],"z":[0,0,0,0,0,0]},"width":[10,10,10,8,8,10],"height":[10,10,10,8,8,10],"texture":[3.9,63,3.9]},"detail18":{"section_segments":6,"offset":{"x":13,"y":15,"z":7},"position":{"x":[0,0,0,0,0,0],"y":[-2,0.7,2,2,-2,-2],"z":[0,0,0,0,0,0]},"width":[10,10,10,8,8,10],"height":[10,10,10,8,8,10],"texture":[3.9,63,3.9]}},"wings":{"detail":{"length":[60],"width":[60,15],"angle":[10],"position":[0,-20],"doubleside":true,"offset":{"x":0,"y":37,"z":-5},"bump":{"position":-37,"size":14},"texture":[4]},"detail2":{"length":[30],"width":[50,0],"angle":[45],"position":[0,45],"doubleside":true,"offset":{"x":0,"y":50,"z":0},"bump":{"position":45,"size":17},"texture":[63]},"detail3":{"length":[30],"width":[50,0],"angle":[-45],"position":[0,45],"doubleside":true,"offset":{"x":0,"y":50,"z":0},"bump":{"position":45,"size":17},"texture":[63]},"detail4":{"length":[40,0],"width":[40,15,0],"angle":[6,0],"position":[0,-12.5,-12.5],"doubleside":true,"offset":{"x":0,"y":34.5,"z":0},"bump":{"position":-45,"size":14},"texture":[17,63]},"detail5":{"length":[40,0],"width":[40,15,0],"angle":[6,0],"position":[0,-12.5,-12.5],"doubleside":true,"offset":{"x":0,"y":35.5,"z":0},"bump":{"position":-45,"size":14},"texture":[63]},"detail6":{"length":[10,1,5,0,-3,0],"width":[0,45,37,20,15,17,0],"angle":[90,90,90,90,90,90],"position":[0,0,0,-0.5,0,6,0],"doubleside":true,"offset":{"x":0,"y":53,"z":4},"bump":{"position":14,"size":28},"texture":[4,4,1,63,17,15]},"detail7":{"length":[60],"width":[60,15],"angle":[10],"position":[0,-20],"doubleside":true,"offset":{"x":0,"y":36,"z":-5},"bump":{"position":-37,"size":13},"texture":[1]}},"typespec":{"name":"Harpy","level":6,"model":6,"code":606,"specs":{"shield":{"capacity":[200,300],"reload":[7,9]},"generator":{"capacity":[300,425],"reload":[75,100]},"ship":{"mass":260,"speed":[115,130],"rotation":[105,125],"acceleration":[95,115]}},"shape":[2.971,2.822,2.85,2.291,1.69,1.347,1.188,1.097,0.987,0.912,2.494,2.515,2.552,2.647,2.784,3.066,3.246,3.253,3.252,2.892,2.157,2.19,2.26,3.855,3.684,3.571,3.684,3.855,2.26,2.19,2.157,2.892,3.252,3.253,3.246,3.066,2.784,2.647,2.571,2.515,2.494,0.912,0.987,1.097,1.188,1.347,1.69,2.291,2.85,2.822],"lasers":[{"x":0.594,"y":-2.772,"z":0,"angle":0,"damage":[5,7],"rate":8,"type":1,"speed":[190,230],"number":1,"spread":0,"error":0,"recoil":0},{"x":2.297,"y":-0.792,"z":0.198,"angle":0,"damage":[5,7],"rate":8,"type":1,"speed":[190,230],"number":1,"spread":0,"error":0,"recoil":0},{"x":-2.297,"y":-0.792,"z":0.198,"angle":0,"damage":[5,7],"rate":8,"type":1,"speed":[190,230],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.594,"y":-2.772,"z":0,"angle":0,"damage":[5,7],"rate":8,"type":1,"speed":[190,230],"number":1,"spread":0,"error":0,"recoil":0}],"radius":3.855}}';
var W_Warrior_607 = '{"name":"W-Warrior","level":6,"model":7,"size":2.7,"specs":{"shield":{"capacity":[325,425],"reload":[8,11]},"generator":{"capacity":[300,450],"reload":[95,135]},"ship":{"mass":365,"speed":[80,95],"rotation":[60,70],"acceleration":[85,100]}},"bodies":{"detail":{"section_segments":[0,60,120,180],"offset":{"x":-2,"y":0,"z":10},"position":{"x":[2,2,2,2,2,0,0,0,0,2,2,2,2],"y":[-65,-65,-55,-25,-10,-10,0,35,45,45,55,55],"z":[0,0,0,0,0,1,1,0,0,0.5,5]},"width":[0,4,9,14,20,18,18,18,18,20,12,0],"height":[0,2,8,12,20,18,18,18,20,20,2,0],"texture":[63,63,18,11,4,4,11,4,4]},"detail2":{"section_segments":6,"offset":{"x":0,"y":-35,"z":17},"position":{"x":[0,0,0,0,0,0],"y":[-10,-10,5,15,20,20],"z":[0,0,0,0,3,3]},"width":[0,4,9,9,9,0],"height":[0,3,8,13,9,0],"propeller":false,"texture":[7,9,9,4]},"detail3":{"section_segments":6,"offset":{"x":0,"y":-40,"z":-2},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-35,-40,-37,-15,0,20,50,50],"z":[0,0,0,0,0,0,0,0]},"width":[0,1.5,3,6,6,10,10,0],"height":[0,1.5,3,6,6,10,10,0],"angle":0,"laser":{"damage":[7,10],"rate":4,"type":1,"speed":[160,200],"number":2,"angle":10,"error":0},"propeller":false,"texture":[3.9,63,3.9,3.9,3.9,63]},"detail4":{"section_segments":6,"offset":{"x":60,"y":2,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-20,-25,-15,15,20,30,40,50,55,55],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,2,4,4,6,6,6,6,4,0],"height":[0,2,5,4,6,6,4,6,6,0],"angle":0,"laser":{"damage":[7,10],"rate":4,"type":1,"speed":[160,200],"number":2,"angle":10,"error":0},"propeller":false,"texture":[0.9,3.9,10,3.9,63,8,63,3.9]},"detail5":{"section_segments":6,"offset":{"x":35,"y":-10,"z":-15},"position":{"x":[-7,-7,-6,-3,0,0,0,0,0,0,0],"y":[-25,-25,-22,-10,20,60,70,75,90,95,85],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,3,5,10,15,15,12,11,10,8,0],"height":[0,3,5,10,14,14,12,11,10,8,0],"texture":[63,63,0.9,10.241,0.9,63,8,12,3.9,16.9],"propeller":true},"detail6":{"section_segments":6,"offset":{"x":10,"y":30,"z":5},"position":{"x":[-10,-10,0,0,0,0,0,0],"y":[-70,-70,-40,0,10,50,55,50],"z":[0,0,0,0,0,0,0,0]},"width":[0,5,13,13,10,5,3,0],"height":[0,5,13,13,10,5,3,0],"texture":[3.9,16.9,15,3.9,3.9,63],"angle":0,"propeller":false},"detail7":{"section_segments":6,"offset":{"x":35,"y":30,"z":-5},"position":{"x":[0,0,0,0,0,0],"y":[-20,-20,-12,12,20,20],"z":[0,0,0,0,0,0]},"width":[0,5,7,7,5,0],"height":[0,5,7,7,5,0],"texture":[3.9,3.9,12.9,3.9,3.9],"angle":0,"propeller":false},"detail8":{"section_segments":6,"offset":{"x":36,"y":-10,"z":-15},"position":{"x":[-6.5,-6.5,-3,0,0,0,0],"y":[-22,-22,-10,20,60,70,70],"z":[0,0,0,0,0,0,0,0]},"width":[0,4.5,10,15,15,12,0],"height":[0,5,10,14,14,12,0],"texture":[63,63,3.9,8,3.9]},"detail9":{"section_segments":6,"offset":{"x":60,"y":2,"z":11},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-20,-25,-15,15,20,22,50,56,56],"z":[0,0,0,0,2,2,2,1,1]},"width":[0,1.5,2.5,2.5,3,3,4,3,0],"height":[0,2,5,4,4,4,4,2,0],"texture":[63,63,63,16.9,1,12,18]},"detail10":{"section_segments":6,"offset":{"x":63,"y":10,"z":-37},"position":{"x":[0,0,0,0,0],"y":[-2,1,1,-2,-2],"z":[0,0,0,0,0]},"width":[7,7,5,5,7],"height":[17,17,13,13,17],"texture":[3.9,16.9,3.9],"vertical":true},"detail11":{"section_segments":6,"offset":{"x":57,"y":10,"z":-37},"position":{"x":[0,0,0,0,0],"y":[-2,1,1,-2,-2],"z":[0,0,0,0,0]},"width":[7,7,5,5,7],"height":[17,17,13,13,17],"texture":[3.9,16.9,3.9],"vertical":true},"detail12":{"section_segments":[45,135,225,315],"offset":{"x":-5,"y":17.5,"z":26},"position":{"x":[0,0,0,0],"y":[1,1,5,5],"z":[0,0,0,0]},"width":[0,39,39,0],"height":[0,2,2,0],"texture":[17],"angle":90},"detail13":{"section_segments":6,"offset":{"x":0,"y":0,"z":23},"position":{"x":[0,0,0,0,0,0],"y":[-12,-12,-4,4,12,12],"z":[0,0,5,5,0,0]},"width":[0,3,3,3,3,0],"height":[0,3,3,3,3,0],"texture":[3.9],"angle":90},"detail14":{"section_segments":6,"offset":{"x":0,"y":35,"z":23},"position":{"x":[0,0,0,0,0,0],"y":[-12,-12,-4,4,12,12],"z":[0,0,5,5,0,0]},"width":[0,3,3,3,3,0],"height":[0,3,3,3,3,0],"texture":[3.9],"angle":90},"detail15":{"section_segments":8,"offset":{"x":8,"y":22,"z":-35},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-5,-7,-4,-4,-6,-6,8,8],"z":[0,0,0,0,0,0,0,0]},"width":[-4,4,4,5,5,6,6,0],"height":[-4,4,4,5,5,6,6,0],"vertical":true,"texture":[17,4,4,4,63,4],"angle":215},"detail16":{"section_segments":8,"offset":{"x":8,"y":22,"z":0},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-5,-7,-4,-4,-6,-6,8,8],"z":[0,0,0,0,0,0,0,0]},"width":[-4,4,4,5,5,6,6,0],"height":[-4,4,4,5,5,6,6,0],"vertical":true,"texture":[17,4,4,4,63,4],"angle":215},"detail17":{"section_segments":6,"offset":{"x":0,"y":8,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-41,-43,-32,-25,-20,0,54,60,65,55],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,5,6,13,14,14,13,13,11,0],"height":[0,5,6,13,14,14,13,13,11,0],"angle":0,"propeller":true,"texture":[2.9,3.9,3.9,16.9,11,11,15,63,16.9]},"detail18":{"section_segments":[45,135,225,315],"offset":{"x":1,"y":14,"z":-17.5},"position":{"x":[0,0,0,0,0],"y":[-5,-5,15,16,16],"z":[0,0,0,0,0]},"width":[0,5,5,3,0],"height":[0,15,15,12,0],"texture":[63,15,4,63],"angle":35,"vertical":true},"detail119":{"section_segments":6,"offset":{"x":8,"y":13.5,"z":18},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[10,10,8,8,10],"height":[10,10,8,8,10],"texture":[63]},"detail20":{"section_segments":6,"offset":{"x":8,"y":21.5,"z":18},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[10,10,8,8,10],"height":[10,10,8,8,10],"texture":[63]}},"wings":{"detail":{"length":[33],"width":[45,15],"angle":[55],"position":[0,25],"texture":[63],"doubleside":true,"bump":{"position":40,"size":10},"offset":{"x":44,"y":25,"z":-15}},"detail2":{"length":[50,0],"width":[50,25,25],"angle":[-40,0],"position":[-30,20,20],"texture":[4],"doubleside":true,"bump":{"position":45,"size":10},"offset":{"x":0,"y":25,"z":20}},"detail3":{"doubleside":true,"offset":{"x":35,"y":27,"z":-20},"length":[20,2,5,-1],"width":[15,15,35,10,0],"angle":[90,90,90,90],"position":[0,0,0,0,7],"texture":[4,4,63,17],"bump":{"position":22,"size":22}},"detail4":{"doubleside":true,"offset":{"x":35,"y":25,"z":-20},"length":[20,2,4],"width":[15,15,35,10,0],"angle":[90,90,90],"position":[0,0,0,0],"texture":[17],"bump":{"position":27,"size":22}},"detail5":{"length":[40,0],"width":[40,20,20],"angle":[-20,0],"position":[-30,20,20],"texture":[4],"doubleside":true,"bump":{"position":45,"size":20},"offset":{"x":0,"y":25,"z":0}}},"typespec":{"name":"W-Warrior","level":6,"model":7,"code":607,"specs":{"shield":{"capacity":[325,425],"reload":[8,11]},"generator":{"capacity":[300,450],"reload":[95,135]},"ship":{"mass":365,"speed":[80,95],"rotation":[60,70],"acceleration":[85,100]}},"shape":[4.321,3.488,2.578,1.897,1.548,2.452,2.51,2.493,2.477,2.495,3.557,3.508,3.454,3.454,3.536,3.944,4.253,4.466,4.608,4.574,4.456,5.118,5.073,4.222,4.64,3.95,4.64,4.222,5.073,5.118,4.456,4.574,4.608,4.466,4.253,3.944,3.536,3.454,3.454,3.508,3.557,2.495,2.477,2.493,2.51,2.452,1.548,1.897,2.578,3.488],"lasers":[{"x":0,"y":-4.32,"z":-0.108,"angle":0,"damage":[7,10],"rate":4,"type":1,"speed":[160,200],"number":2,"spread":10,"error":0,"recoil":0},{"x":3.24,"y":-1.242,"z":0.54,"angle":0,"damage":[7,10],"rate":4,"type":1,"speed":[160,200],"number":2,"spread":10,"error":0,"recoil":0},{"x":-3.24,"y":-1.242,"z":0.54,"angle":0,"damage":[7,10],"rate":4,"type":1,"speed":[160,200],"number":2,"spread":10,"error":0,"recoil":0}],"radius":5.118}}';
var Goliath_608 = '{"name":"Goliath","level":6,"model":8,"size":2.45,"specs":{"shield":{"capacity":[350,500],"reload":[9,13]},"generator":{"capacity":[300,400],"reload":[85,110]},"ship":{"mass":400,"speed":[80,95],"rotation":[50,70],"acceleration":[75,120]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":20,"y":20,"z":0},"position":{"x":[5,5,5,5,5,5,5,-10,-10,-10,-10,-10,-2,-2,-20,-20],"y":[-120,-125,-120,-95,-85,-80,-70,-50,-40,-11,-10,0,15,45,60],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,3,5,5,5,7,13,22,22,22,22,22,22,22,13],"height":[0,3,5,5,5,6.5,11,18,18,18,18,18,16,16,11],"texture":[3.9,63,10.245,15,63,63,63,8,10,3.9,8,3.9,10.241,3.9],"laser":{"damage":[15,20],"rate":3.3,"type":1,"speed":[160,200],"number":1,"error":0},"propeller":false},"detail2":{"section_segments":6,"offset":{"x":0,"y":-34,"z":10},"position":{"x":[0,0,0,0,0,0],"y":[-13,-13,3,20,57.6,57.5],"z":[0,0,7,2,0,0]},"width":[0,5,10,13,13,0],"height":[0,5,5,11,11,0],"texture":[7,9,9,3.9]},"detail3":{"section_segments":6,"offset":{"x":22,"y":0,"z":20},"position":{"x":[0,0,0,0,0,0],"y":[-3,0,3,3,-3,-3],"z":[0,0,0,0,0,0]},"width":[17,17,15,12,12,17],"height":[40,40,38,35,35,40],"angle":0,"vertical":true,"texture":[3.9,16.9,3.9]},"detail4":{"section_segments":6,"offset":{"x":25,"y":25,"z":-5},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-10,-10,-5,0,20,45,52,55,45],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,5,10,10,13,13,12,10,0],"height":[0,10,15,15,14,11,10,8,0],"angle":0,"propeller":true,"texture":[2.9,2.9,29,2.9,3.9,8,63,16.9]},"detail5":{"section_segments":6,"offset":{"x":0,"y":-45,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-55,-60,-55,-30,-25,-15,-10,10,128,132,125],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,3,5,5,5,8,13,17,13,11,0],"height":[0,3,5,5,5,7,11,15,11,9,0],"angle":0,"laser":{"damage":[15,20],"rate":3.3,"type":1,"speed":[160,200],"number":1,"error":0},"propeller":true,"texture":[3.9,63,10.245,15,63,3.9,11,15,16.9]},"detail6":{"section_segments":[45,135,225,315],"offset":{"x":18,"y":10,"z":5},"position":{"x":[0,0,0,0,0,0],"y":[-7,-7,6,8,6,6],"z":[0,0,0,0,0,0]},"width":[0,10,10,6,4,4],"height":[0,30,30,26,24,0],"texture":[15,15,63,17,15],"vertical":true,"angle":30},"detail7":{"section_segments":16,"offset":{"x":0,"y":10,"z":-50},"position":{"x":[0,0,0,0,0,0,0],"y":[-10,-10,10,10,12,12,12],"z":[0,0,0,0,0,0,0]},"width":[0,20,20,15,14,12,0],"height":[0,20,20,15,14,12,0],"texture":[4,4,18,17,63,4],"vertical":true},"detail8":{"section_segments":[0,60,120,180],"offset":{"x":-25,"y":-70,"z":0},"position":{"x":[0,0,0,0,0,15,15],"y":[-40,-40,-30,10,20,40,40],"z":[0,0,0,0,0,0,0]},"width":[0,7,8,11,14,23,0],"height":[0,5,7.5,8,11,18,0],"texture":[4]},"detail9":{"section_segments":[0,60,120,180],"offset":{"x":-4,"y":-32,"z":14},"position":{"x":[0,0,0,0,0,0,-8,-8],"y":[-20,-20,4,6,18,20,35,35],"z":[-7,-7,0,0,0,0,3,3]},"width":[0,5,15,15,15,15,5,0],"height":[0,5,10,10,10,10,3,0],"texture":[16.9,4,17,18,63,4]},"detail10":{"section_segments":12,"offset":{"x":0,"y":12,"z":-50},"position":{"x":[0,0,0,0,0,0,0],"y":[0,12,12,10,12,12],"z":[0,0,0,0,0,0,0]},"width":[9,9,8,6,4,0],"height":[9,9,8,6,4,0],"texture":[1,1,17,4,18],"vertical":true},"detail11":{"section_segments":8,"offset":{"x":0,"y":17,"z":-37},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-5,-7,-5.5,-5.5,-6,-6,8,8],"z":[0,0,0,0,0,0,0,0]},"width":[-3,3,3,4,4,5,5,0],"height":[-3,3,3,4,4,5,5,0],"vertical":true,"texture":[17,4,4,4,63,4],"angle":180},"detail12":{"section_segments":8,"offset":{"x":13,"y":17,"z":-50},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-5,-7,-5.5,-5.5,-6,-6,8,8],"z":[0,0,0,0,0,0,0,0]},"width":[-3,3,3,4,4,5,5,0],"height":[-3,3,3,4,4,5,5,0],"vertical":true,"texture":[17,4,4,4,63,4],"angle":180},"detail13":{"section_segments":6,"offset":{"x":10,"y":50,"z":19},"position":{"x":[0,0,0,0,0],"y":[-1.5,1.5,1.5,-1.5,-1.5],"z":[0,0,0,0,0]},"width":[8,8,6,6,8],"height":[6,6,4,4,6],"texture":[63]},"detail14":{"section_segments":6,"offset":{"x":0,"y":40,"z":19},"position":{"x":[0,0,0,0,0],"y":[-1.5,1.5,1.5,-1.5,-1.5],"z":[0,0,0,0,0]},"width":[8,8,6,6,8],"height":[6,6,4,4,6],"texture":[63],"angle":90},"detail15":{"section_segments":6,"offset":{"x":0,"y":60,"z":19},"position":{"x":[0,0,0,0,0],"y":[-1.5,1.5,1.5,-1.5,-1.5],"z":[0,0,0,0,0]},"width":[8,8,6,6,8],"height":[6,6,4,4,6],"texture":[63],"angle":90}},"wings":{"detail":{"length":[0,25,10],"width":[0,50,50,40],"angle":[90,40,30],"position":[0,0,0,20],"doubleside":true,"bump":{"position":-50,"size":20},"texture":[4,4,63],"offset":{"x":15,"y":45,"z":-5}},"detail2":{"length":[0,25,10],"width":[0,50,50,40],"angle":[-90,-40,-30],"position":[0,0,0,20],"doubleside":true,"bump":{"position":-50,"size":20},"texture":[4,4,63],"offset":{"x":15,"y":45,"z":0}},"detail3":{"length":[0,25,5],"width":[0,40,40,30],"angle":[90,90,90],"position":[0,0,0,20],"doubleside":true,"bump":{"position":-65,"size":30},"texture":[4,4,63],"offset":{"x":0,"y":-8,"z":-1}},"detail4":{"length":[0,15,-5,2,5,10],"width":[0,40,40,70,70,30,10],"angle":[0,0,0,0,0,0],"position":[10,10,10,0,0,20,35],"doubleside":true,"bump":{"position":45,"size":15},"texture":[4,18,4,17,4,63],"offset":{"x":35,"y":45,"z":-5}},"detail5":{"length":[16,0],"width":[85,40,0],"angle":[0,0,0],"position":[0,0,0],"bump":{"position":50,"size":4},"texture":63,"doubleside":true,"offset":{"x":19,"y":-20,"z":0}}},"typespec":{"name":"Goliath","level":6,"model":8,"code":608,"specs":{"shield":{"capacity":[350,500],"reload":[9,13]},"generator":{"capacity":[300,400],"reload":[85,110]},"ship":{"mass":400,"speed":[80,95],"rotation":[50,70],"acceleration":[75,120]}},"shape":[5.357,3.562,5.829,5.278,4.037,3.383,2.799,2.566,2.307,2.133,2.012,1.931,1.886,1.873,2.486,2.634,2.853,3.167,3.616,4.95,5.366,4.854,4.426,4.289,4.464,4.446,4.464,4.289,4.426,4.854,5.366,4.95,3.616,3.167,2.853,2.634,2.486,1.865,1.886,1.931,2.012,2.133,2.307,2.566,2.799,3.383,4.037,5.278,5.829,3.562],"lasers":[{"x":1.275,"y":-5.355,"z":0,"angle":0,"damage":[15,20],"rate":3.3,"type":1,"speed":[160,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.275,"y":-5.355,"z":0,"angle":0,"damage":[15,20],"rate":3.3,"type":1,"speed":[160,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":0,"y":-5.355,"z":0,"angle":0,"damage":[15,20],"rate":3.3,"type":1,"speed":[160,200],"number":1,"spread":0,"error":0,"recoil":0}],"radius":5.829}}';
var Centurion_609 = '{"name":"Centurion","level":6,"model":9,"size":1.9,"specs":{"shield":{"capacity":[300,500],"reload":[8,11]},"generator":{"capacity":[350,425],"reload":[110,135]},"ship":{"mass":400,"speed":[85,95],"rotation":[45,75],"acceleration":[70,100]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-80,-80,-78,-61,-10,30,40,50,60,70,85,93,97,105,110,100],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,4,7,13,25,25,25,25,25,25,23,18,18,18,15,0],"height":[0,3,5,13,20,20,20,20,20,20,18,13,13,13,10,0],"propeller":true,"texture":[63,63,63,10,10.241,8.2,8.2,8.2,8.2,63,3.9,11,15,16.9]},"detail2":{"section_segments":6,"offset":{"x":0,"y":-37,"z":10},"position":{"x":[0,0,0,0,0],"y":[-15,-14,15,30,30],"z":[0,0,0,6,6]},"width":[0,6,11,6,0],"height":[0,6,11,6,0],"texture":[9],"propeller":false},"detail3":{"section_segments":6,"offset":{"x":50,"y":40,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-140,-145,-140,-5,0,3,45,55,58,67,73,63],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,3,3,4,10,10,10,10,13,10,9,0],"height":[0,3,3,4,8,8,8,8,8,7,6,0],"angle":0,"laser":{"damage":[25,40],"rate":3.5,"type":2,"speed":[135,165],"number":1,"error":0},"propeller":true,"texture":[3.9,63,8.2,16.9,63,12,16.9,63,10.241,3.9,16.9]},"detail4":{"section_segments":6,"offset":{"x":11,"y":45,"z":6},"position":{"x":[0,0,0,0],"y":[-50,-50,25,25],"z":[0,0,0,0]},"width":[0,12,12,0],"height":[0,9.5,9.5,0],"texture":[4,11,4],"propeller":false},"detail5":{"section_segments":10,"offset":{"x":0,"y":16,"z":-3},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,0,6,6,4,4,7,6,8,8],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,11,11,10,10,8,8,5,2,0],"height":[0,11,11,10,10,8,8,5,2,0],"vertical":true,"texture":[4,15,63,4,17,4,4,11,1]},"detail6":{"section_segments":[0,60,120,180],"offset":{"x":-6,"y":-30,"z":10},"position":{"x":[3.2,3.2,3,0,0,0,0,0,0,0],"y":[-28,-28,-24,0,2,18.4,19,21,25,25],"z":[-4,-1,0,0,0,0,0,0,6,6]},"width":[0,3,6,12,12,12,12,12,5,0],"height":[0,4,5,10,10,10,10,10,3,0],"texture":[16.9,63,1.9,63,12,4,63,3.9]},"detail7":{"section_segments":[45,135,225,315],"offset":{"x":-1,"y":6,"z":-37.5},"position":{"x":[0,0,0,0,0],"y":[-5,-5,15,16,16],"z":[0,0,0,0,0]},"width":[0,5,5,3,0],"height":[0,45,45,42,0],"texture":[63,15,4,63],"angle":45,"vertical":true},"detail8":{"section_segments":6,"offset":{"x":12,"y":37.5,"z":9},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[10,10,8,8,10],"height":[8,8,6,6,8],"texture":[63]},"detail9":{"section_segments":6,"offset":{"x":12,"y":22.5,"z":9},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[10,10,8,8,10],"height":[8,8,6,6,8],"texture":[63]},"detail10":{"section_segments":6,"offset":{"x":12,"y":52.5,"z":9},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[10,10,8,8,10],"height":[8,8,6,6,8],"texture":[63]},"detail11":{"section_segments":[45,135,225,315],"offset":{"x":50,"y":-90,"z":-10},"position":{"x":[0,0,0,0,0,0,0],"y":[-7,-15,-10,14.5,15,17,17],"z":[0,0,0,0,0,0,0]},"width":[0,4,7,7,7,6,0],"height":[0,4,7,7,7,6,0],"texture":[4,63,12,4]}},"wings":{"detail":{"offset":{"x":0,"y":-5,"z":3},"length":[10,19,2,23,15,0],"width":[90,90,30,25,20,20,0],"texture":[4,4,63,18.35,4],"angle":[-10,-10,-10,-30,15,0],"position":[-20,-20,-10,-10,5,10,10],"doubleside":true,"bump":{"position":35,"size":15}},"detail2":{"offset":{"x":0,"y":65,"z":-2},"length":[25,5,10,23],"width":[60,60,44,44,4],"texture":[18,4,11,1],"angle":[0,0,0,-1],"position":[0,0,0,0,30],"doubleside":true,"bump":{"position":40,"size":10}},"detail3":{"doubleside":true,"offset":{"x":60,"y":-15,"z":-10},"length":[-1,2,15,5],"width":[0,100,100,32,5],"angle":[0,0,0,-5],"position":[30,-10,-10,35,51],"texture":[4,17,63,1],"bump":{"position":40,"size":7}},"detail4":{"doubleside":true,"offset":{"x":60,"y":-14,"z":-10},"length":[-1,2,15,5],"width":[0,100,100,30,5],"angle":[0,0,0,-5],"position":[30,-10,-10,35,51],"texture":[4,4,1],"bump":{"position":40,"size":7}},"detail5":{"doubleside":true,"offset":{"x":60,"y":-40,"z":-9},"length":[0,2,14,0],"width":[0,50,50,1,0],"angle":[0,0,0,0],"position":[-10,-10,-10,46,46],"texture":[4,3,4],"bump":{"position":40,"size":7}},"detail6":{"offset":{"x":0,"y":64,"z":-2},"length":[25,5,10,23],"width":[60,60,44,44,4],"texture":[4,63,8,4],"angle":[0,0,0,0],"position":[0,0,0,0,30],"doubleside":true,"bump":{"position":40,"size":10}},"detail7":{"doubleside":true,"offset":{"x":45,"y":75,"z":-10},"length":[20,-2,2,20,0],"width":[30,30,60,60,15,0],"angle":[0,0,0,0,0],"position":[-15,5,0,0,35,35],"texture":[11,4,17,63,4],"bump":{"position":35,"size":5}},"detail8":{"doubleside":true,"offset":{"x":45,"y":76,"z":-10},"length":[20,-2,2,20,0],"width":[30,30,60,60,15,0],"angle":[0,0,0,0,0],"position":[-15,5,0,0,35,35],"texture":[11,4,17,1],"bump":{"position":35,"size":5}}},"typespec":{"name":"Centurion","level":6,"model":9,"code":609,"specs":{"shield":{"capacity":[300,500],"reload":[8,11]},"generator":{"capacity":[350,425],"reload":[110,135]},"ship":{"mass":400,"speed":[85,95],"rotation":[45,75],"acceleration":[70,100]}},"shape":[3.043,3.002,2.493,4.41,4.467,3.895,3.685,3.361,3.116,2.964,2.867,2.817,2.854,2.947,3.085,3.294,3.424,3.098,3.812,5.067,5.542,4.87,4.745,3.733,4.209,4.188,4.209,3.733,4.745,4.87,5.542,5.067,3.812,3.098,3.424,3.294,3.085,2.947,2.854,2.817,2.867,2.964,3.116,3.361,3.685,3.895,4.467,4.41,2.493,3.002],"lasers":[{"x":1.9,"y":-3.99,"z":-0.38,"angle":0,"damage":[25,40],"rate":3.5,"type":2,"speed":[135,165],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.9,"y":-3.99,"z":-0.38,"angle":0,"damage":[25,40],"rate":3.5,"type":2,"speed":[135,165],"number":1,"spread":0,"error":0,"recoil":0}],"radius":5.542}}';
var Prometheus_610 = '{"name":"Prometheus","level":6,"model":10,"size":1.92,"specs":{"shield":{"capacity":[300,500],"reload":[8,11]},"generator":{"capacity":[325,425],"reload":[100,135]},"ship":{"mass":480,"speed":[80,90],"rotation":[50,70],"acceleration":[80,100]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":60,"z":-8},"position":{"x":[0,0,0,0,0,0,0],"y":[-45,-45,-35,0,40,45,35],"z":[0,0,0,0,0,0,0]},"width":[0,4,13,20,20,15,0],"height":[0,3,7,7,8,6,0],"texture":[3.9,3.9,0.9,15,16.9],"propeller":true},"detail2":{"section_segments":6,"offset":{"x":0,"y":45,"z":-5},"position":{"x":[0,0,0,0,0,0,0],"y":[-15,-15,-7,15,45,50,50],"z":[3,3,3,0,0,0,0]},"width":[0,3,8,13,12,8,0],"height":[0,2,6,14,13,9,0],"texture":[7,9,9,10.245,3.9],"propeller":false},"detail3":{"section_segments":6,"offset":{"x":25,"y":40,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-41,-43,-32,-25,-20,0,20,60,65,55],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,5,6,13,14,14,14,13,11,0],"height":[0,5,6,13,14,14,14,13,11,0],"angle":0,"propeller":true,"texture":[2.9,3.9,3.9,16.9,11,3.9,63,3.9,16.9]},"detail4":{"section_segments":6,"offset":{"x":68,"y":-10,"z":-27},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-40,-45,-40,-10,-5,20,40,45,60,75,77],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,3,6,6,4,4,4,10,10,9,0],"height":[0,3,6,6,4,4,4,9,8,8,0],"angle":0,"laser":{"damage":[8,12],"rate":2,"type":1,"speed":[130,150],"number":1,"angle":0,"error":0},"propeller":false,"texture":[3.9,3.9,12.9,3.9,3.9,3.9,3.9,63,3.9,3.9]},"detail5":{"section_segments":6,"offset":{"x":40,"y":80,"z":-5},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-25,-26,-32,-32,-10,-8,16,18,22,22],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,4,5,7,12,12,12,12,5,0],"height":[0,4,5,7,12,11,11,11,5,0],"angle":0,"propeller":false,"texture":[12,2.9,2.9,2.9,3.9,10.244,3.9,63,63]},"detail6":{"section_segments":6,"offset":{"x":0,"y":20,"z":-15},"position":{"x":[0,0,0,0,0,0],"y":[-20,-25,-10,0,20,35],"z":[0,0,0,0,0,0]},"width":[0,3,5,10,10,0],"height":[0,3,6,8,5,0],"angle":0,"laser":{"damage":[75,100],"rate":1,"type":2,"speed":[120,145],"number":1,"error":0},"propeller":false,"texture":[0.9,0.9,63]},"detail7":{"section_segments":8,"offset":{"x":22,"y":8,"z":-30},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-5,-7,-4,-4,-6,-6,8,8],"z":[0,0,0,0,0,0,0,0]},"width":[-4,4,4,5,5,6,6,0],"height":[-4,4,4,5,5,6,6,0],"vertical":true,"texture":[17,4,4,4,63,4],"angle":-215},"detail8":{"section_segments":8,"offset":{"x":22,"y":8,"z":-45},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-5,-7,-4,-4,-6,-6,8,8],"z":[0,0,0,0,0,0,0,0]},"width":[-4,4,4,5,5,6,6,0],"height":[-4,4,4,5,5,6,6,0],"vertical":true,"texture":[17,4,4,4,63,4],"angle":-215},"detail9":{"section_segments":6,"offset":{"x":23,"y":77,"z":7},"position":{"x":[0,0,0,0,0,0],"y":[-20,-20,-12,12,20,20],"z":[0,0,0,0,0,0]},"width":[0,5,7,7,5,0],"height":[0,5,7,7,5,0],"texture":[3.9,3.9,12.9,3.9,3.9],"angle":0,"propeller":false},"detail10":{"section_segments":6,"offset":{"x":15,"y":70,"z":5},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[10,10,8,8,10],"height":[10,10,8,8,10],"texture":[3.9]},"detail11":{"section_segments":6,"offset":{"x":15,"y":84,"z":5},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[10,10,8,8,10],"height":[10,10,8,8,10],"texture":[3.9]}},"wings":{"detail":{"offset":{"x":27,"y":-25,"z":0},"length":[3,6,4,4,8,5,19],"width":[140,185,205,205,200,164,80,20],"angle":[-15,-15,-15,-15,-8,-8,-8],"position":[10,2,2,2,4,35,70,120],"texture":[63,63,17,4,4,63,15],"doubleside":true,"bump":{"position":45,"size":8}},"detail2":{"offset":{"x":0,"y":70,"z":-15},"length":[20,12,30,35,8],"width":[12,10,50,40,13,7],"texture":[3,4,12,17],"angle":[10,10,-13,-13,-14],"doubleside":true,"position":[-13,-10,-5,-10,-21],"bump":{"position":40,"size":15}},"detail3":{"offset":{"x":0,"y":71,"z":-15},"length":[20,12,30,35,8],"width":[12,10,50,40,13,7],"texture":[3,4,4],"angle":[10,10,-13,-13,-14],"doubleside":true,"position":[-13,-10,-5,-10,-21],"bump":{"position":40,"size":16}}},"typespec":{"name":"Prometheus","level":6,"model":10,"code":610,"specs":{"shield":{"capacity":[300,500],"reload":[8,11]},"generator":{"capacity":[325,425],"reload":[100,135]},"ship":{"mass":480,"speed":[80,90],"rotation":[50,70],"acceleration":[80,100]}},"shape":[0.2,0.203,5.263,5.235,4.398,3.74,3.259,3.58,3.56,3.338,3.145,3.003,2.881,2.881,2.95,3.073,4.329,4.416,4.261,4.707,5.164,4.427,4.449,4.415,4.275,4.208,4.275,4.415,4.449,4.427,5.164,4.707,4.261,4.416,4.329,3.073,2.95,2.881,2.881,3.003,3.145,3.338,3.56,3.58,3.259,3.74,4.398,5.235,5.263,0.203],"lasers":[{"x":2.72,"y":-2.2,"z":-1.08,"angle":0,"damage":[8,12],"rate":2,"type":1,"speed":[130,150],"number":1,"spread":0,"error":0,"recoil":0},{"x":-2.72,"y":-2.2,"z":-1.08,"angle":0,"damage":[8,12],"rate":2,"type":1,"speed":[130,150],"number":1,"spread":0,"error":0,"recoil":0},{"x":0,"y":-0.2,"z":-0.6,"angle":0,"damage":[75,100],"rate":1,"type":2,"speed":[120,145],"number":1,"spread":0,"error":0,"recoil":0}],"radius":5.263}}';
var Chronos_611 = '{"name":"Chronos","level":6,"model":11,"size":3.07,"specs":{"shield":{"capacity":[400,575],"reload":[9,12]},"generator":{"capacity":[300,375],"reload":[90,120]},"ship":{"mass":490,"speed":[70,85],"rotation":[45,60],"acceleration":[75,100]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":5,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-70,-75,-60,-53,-50,-13,-3,35,50,63,63],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,3,7,14,15,15,26,26,26,15,0],"height":[0,3,5,11,12,12,16,16,16,8,0],"texture":[3.9,3.9,2.9,63,10.242,3.9,18,8,2.9],"laser":{"damage":[90,120],"rate":0.5,"type":1,"speed":[110,145],"number":1,"error":0,"recoil":100}},"detail2":{"section_segments":6,"offset":{"x":0,"y":20,"z":8},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-10,-10,-5,15,20,35,48,51,43],"z":[5,5,2,2,4,4,0,0,0]},"width":[0,5,10,10,7,7,10,7,0],"height":[0,3,10,10,4,4,7,4,0],"propeller":true,"texture":[7,9,9,63,15,63,16.9]},"detail3":{"section_segments":6,"offset":{"x":25,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,-9.2,-9.2,-9.2],"y":[-72,-76.5,-75,-65,-62,55,68,70,70],"z":[0,0,0,0,0,0,2,2,2]},"width":[0,2,2.5,3.5,5,5,5,3,0],"height":[0,0.7,1,1.5,4,4,2,1.5,0],"texture":[0.9,63,11,63,3.9],"laser":{"damage":[20,30],"rate":2.5,"type":1,"speed":[175,225],"number":1,"error":0}},"detail4":{"section_segments":[45,135,225,315],"angle":-55,"offset":{"x":32,"y":45,"z":0},"position":{"x":[0,0,0,0],"y":[-15,-15,10,10],"z":[0,0,0,0]},"width":[0,5,5,0],"height":[0,2.9,2.9,0],"propeller":false,"texture":[4]},"detail5":{"section_segments":[0,60,120,180],"offset":{"x":-53,"y":0,"z":-22},"position":{"x":[0,0,0,0,0,0],"y":[-2,2,2,2,-2,-2],"z":[0,0,0,0,0,0]},"width":[10,10,8,6,6,10],"height":[25,25,23,21,21,25],"texture":[3.9,3.9,63,3.9],"vertical":true},"detail6":{"section_segments":[0,60,120,180],"offset":{"x":47,"y":22,"z":0},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-30,-30,-25,-22,22,25,30,30],"z":[0,0,0,0,0,0,0,0]},"width":[0,5,8,8,8,8,5,0],"height":[0,3,6,6,6,6,3,0],"angle":0,"propeller":false,"texture":[3.9,3.9,63,15,63,3.9,3.9]},"detail7":{"section_segments":[45,135,225,315],"angle":35,"offset":{"x":20,"y":-25,"z":0},"position":{"x":[0,0,0,0],"y":[-20,-20,10,10],"z":[0,0,0,0]},"width":[0,3.5,3.5,0],"height":[0,2.9,2.9,0],"propeller":false,"texture":[4]},"detail8":{"section_segments":6,"offset":{"x":14,"y":55,"z":-4},"position":{"x":[0,0,0,0,0],"y":[-20,15,20,22,15],"z":[0,0,0,0,0]},"width":[9,9,7,6,0],"height":[7,7,5,4,0],"propeller":true,"texture":[3.9,8.2,63,16.9]},"detail9":{"section_segments":[45,135,225,315],"angle":35,"offset":{"x":20,"y":-22,"z":0},"position":{"x":[0,0,0,0],"y":[-20,-20,10,10],"z":[0,0,0,0]},"width":[0,3.5,3.5,0],"height":[0,2,2,0],"texture":[63]},"detail10":{"section_segments":[45,135,225,315],"offset":{"x":3,"y":28,"z":5},"position":{"x":[0,0,0,-1,-1],"y":[-10,-10,10,23,23],"z":[0,0,0,0,0]},"width":[0,44,44,34,0],"height":[0,5,5,3,0],"texture":[4,4,17,4],"angle":90},"detail11":{"section_segments":[0,60,120,180],"offset":{"x":-6,"y":20,"z":7},"position":{"x":[3,3,0,0,0,0],"y":[-12.83,-12.83,-3,20,35,35],"z":[5,5,0,0,5,5]},"width":[0,4,10,10,3,0],"height":[0,5,12,12,3,0],"texture":[63,63,10,63]},"detail12":{"section_segments":[0,60,120,180],"offset":{"x":-49,"y":22,"z":0},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-30,-30,-25,-22,22,25,30,30],"z":[0,0,0,0,0,0,0,0]},"width":[0,5,8,8,8,8,5,0],"height":[0,3,6,6,6,6,3,0],"angle":0,"propeller":false,"texture":[3.9,3.9,63,15,63,3.9,3.9]},"detail13":{"section_segments":6,"offset":{"x":-48,"y":22,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-10,-10,-8,8,10,10],"z":[0,0,0,0,0,0]},"width":[0,10.3,10.3,10.3,10.3,0],"height":[0,7.3,7.3,7.3,7.3,0],"texture":[3.9,17,8.2,17,3.9]},"detail14":{"section_segments":10,"offset":{"x":0,"y":6,"z":-47},"position":{"x":[0,0,0,0,0,0,0],"y":[0,11,11,10,11,11],"z":[0,0,0,0,0,0,0]},"width":[6,6,5,3,2,0],"height":[6,6,5,3,2,0],"texture":[4,4,17,4,18],"vertical":true},"detail15":{"section_segments":6,"offset":{"x":-47,"y":22,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-10,-10,-8,8,10,10],"z":[0,0,0,0,0,0]},"width":[0,10.3,10.3,10.3,10.3,0],"height":[0,7.3,7.3,7.3,7.3,0],"texture":[3.9,63,11,63,3.9]},"detail16":{"section_segments":6,"offset":{"x":25.6,"y":-30,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-32,-32,0,24,30,30],"z":[0,0,0,0,0,0]},"width":[0,5,5,5,5,0],"height":[0,4,4,4,4,0],"texture":[3.9,15,8.2,63]},"detail17":{"section_segments":6,"offset":{"x":10,"y":35,"z":4},"position":{"x":[0,0,0,0,0,0],"y":[-2,0.7,2,2,-2,-2],"z":[0,0,0,0,0,0]},"width":[10,10,10,8,8,10],"height":[15,15,15,13,13,15],"texture":[3.9,63,3.9]},"detail18":{"section_segments":6,"offset":{"x":10,"y":20,"z":4},"position":{"x":[0,0,0,0,0,0],"y":[-2,0.7,2,2,-2,-2],"z":[0,0,0,0,0,0]},"width":[10,10,10,8,8,10],"height":[15,15,15,13,13,15],"texture":[3.9,63,3.9]},"detail19":{"section_segments":6,"offset":{"x":10,"y":27.5,"z":4},"position":{"x":[0,0,0,0,0,0],"y":[-2,0.7,2,2,-2,-2],"z":[0,0,0,0,0,0]},"width":[10,10,10,8,8,10],"height":[15,15,15,13,13,15],"texture":[3.9,63,3.9]},"detail20":{"section_segments":6,"offset":{"x":17,"y":30,"z":5},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-32,-32,-28,-11,10,26,30,30],"z":[0,0,0,0,0,0,0,0]},"width":[0,3,6,6,6,6,3,0],"height":[0,5,9,9,9,9,5,0],"propeller":false,"texture":[3.9,3.9,10.245,15,10.245,3.9]},"detail21":{"section_segments":6,"offset":{"x":16,"y":30,"z":5},"position":{"x":[0,0,0,0,0,0],"y":[-28,-28,-11,10,26,26],"z":[0,0,0,0,0,0]},"width":[0,6,6,6,6,0],"height":[0,9,9,9,9,0],"propeller":false,"texture":[63]},"detail22":{"section_segments":6,"offset":{"x":6,"y":-25,"z":4.5},"position":{"x":[0,0,0,0,0,0],"y":[-17,-17,-12,12,17,17],"z":[0,0,0,0,0,0]},"width":[0,5,7,7,5,0],"height":[0,4,6,6,4,0],"texture":[3.9,3.9,8.2,3.9,3.9]},"detail23":{"section_segments":6,"offset":{"x":0,"y":-33,"z":8},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[10,10,8,8,10],"height":[7,7,5,5,7],"texture":[63]},"detail24":{"section_segments":6,"offset":{"x":0,"y":-17,"z":8},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[10,10,8,8,10],"height":[7,7,5,5,7],"texture":[63]},"detail25":{"section_segments":6,"offset":{"x":0,"y":-25,"z":8},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[10,10,8,8,10],"height":[7,7,5,5,7],"texture":[63]}},"wings":{"detail1":{"length":[0,25,0],"width":[0,25,25,0],"angle":[0,0,0],"position":[0,0,-17.5,-17.5],"doubleside":true,"offset":{"x":20,"y":37,"z":0},"bump":{"position":20,"size":5},"texture":[11]},"detail12":{"length":[0,25,0],"width":[0,25,25,0],"angle":[0,0,0],"position":[0,0,-17.5,-17.5],"doubleside":true,"offset":{"x":20,"y":35,"z":0},"bump":{"position":20,"size":5},"texture":[63]}},"typespec":{"name":"Chronos","level":6,"model":11,"code":611,"specs":{"shield":{"capacity":[400,575],"reload":[9,12]},"generator":{"capacity":[300,375],"reload":[90,120]},"ship":{"mass":490,"speed":[70,85],"rotation":[45,60],"acceleration":[75,100]}},"shape":[4.301,3.928,4.939,4.976,4.227,3.419,2.878,2.52,2.266,2.093,1.974,3.338,3.439,3.736,3.907,4.068,4.316,4.338,4.548,4.573,4.144,3.928,4.317,4.873,4.813,4.368,4.813,4.873,4.317,3.928,4.144,4.573,4.548,4.338,4.316,4.068,3.907,3.736,3.439,3.338,1.974,2.093,2.266,2.52,2.878,3.419,4.227,4.976,4.939,3.928],"lasers":[{"x":0,"y":-4.298,"z":0,"angle":0,"damage":[90,120],"rate":0.5,"type":1,"speed":[110,145],"number":1,"spread":0,"error":0,"recoil":100},{"x":1.535,"y":-4.697,"z":0,"angle":0,"damage":[20,30],"rate":2.5,"type":1,"speed":[175,225],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.535,"y":-4.697,"z":0,"angle":0,"damage":[20,30],"rate":2.5,"type":1,"speed":[175,225],"number":1,"spread":0,"error":0,"recoil":0}],"radius":4.976}}';
var Cthulhu_612 = '{"name":"Cthulhu","level":6,"model":12,"size":1.67,"zoom":1,"specs":{"shield":{"capacity":[425,600],"reload":[10,13]},"generator":{"capacity":[200,275],"reload":[70,95]},"ship":{"mass":550,"speed":[65,80],"rotation":[45,60],"acceleration":[75,100]}},"bodies":{"detail":{"section_segments":[0,60,120,180],"offset":{"x":0,"y":40,"z":0},"position":{"x":[0,0,0,0,0,0,0,-4,-12,-12],"y":[-135,-145,-140,-130,-120,-95,-10,0,60,60],"z":[0,0,0,0,0,0,0,0,4,4]},"width":[0,4,6,8,17,35,35,30,18,0],"height":[0,4,6,8,11,25,25,22,9,0],"texture":[3.95,16.95,3.95,63,10,18,63,1],"laser":{"damage":[70,90],"rate":5,"type":2,"speed":[120,150],"number":1,"angle":0,"error":0}},"detail2":{"section_segments":[-180,-120,-60,0],"offset":{"x":0,"y":40,"z":0},"position":{"x":[0,0,0,0,0,0,0,4,12,12],"y":[-135,-145,-140,-130,-120,-95,-10,0,60,60],"z":[0,0,0,0,0,0,0,0,4,4]},"width":[0,4,6,8,17,35,35,30,18,0],"height":[0,4,6,8,11,25,25,22,9,0],"texture":[3.95,16.95,3.95,63,10,18,63,1]},"detail3":{"section_segments":6,"offset":{"x":0,"y":45,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[58,58,55,55,60,80,95,100,105,110,100],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,10,20,32,32,32,22,22,22,20,0],"height":[0,5,10,16,16,20,17,17,17,15,0],"texture":[3.9,16.9,3.9,63,8.2,3.9,17,15,63],"propeller":true},"detail4":{"section_segments":6,"offset":{"x":67,"y":40,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-65,-65,-60,-15,-12,12,15,60,65,65],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,5,7,7,10,10,7,7,5,0],"height":[0,5,7,7,8,8,7,7,5,0],"texture":[3.9,3.9,8.2,63,11,63,8.2,3.9,3.9]},"detail5":{"section_segments":6,"offset":{"x":0,"y":-40,"z":20},"position":{"x":[0,0,0,0,0,0],"y":[-30,-30,-10,20,30,30],"z":[-5,-5,0,0,-4,-4]},"width":[0,7,17,17,15,0],"height":[0,3,11,11,11,0],"texture":[7,9,9,3.9]},"detail6":{"section_segments":10,"offset":{"x":0,"y":-120,"z":0},"position":{"x":[0,0,0,0,0],"y":[-5,5,5,-5,-5],"z":[0,0,0,0,0]},"width":[20,21,18,17,20],"height":[20,21,18,17,20],"texture":[17,4]},"detail7":{"section_segments":10,"offset":{"x":0,"y":-140,"z":0},"position":{"x":[0,0,0,0,0],"y":[-5,5,5,-5,-5],"z":[0,0,0,0,0]},"width":[17,18,15,14,17],"height":[17,18,15,14,17],"texture":[17,4]},"detail8":{"section_segments":10,"offset":{"x":0,"y":-160,"z":0},"position":{"x":[0,0,0,0,0],"y":[-5,5,5,-5,-5],"z":[0,0,0,0,0]},"width":[14,15,12,11,14],"height":[14,15,12,11,14],"texture":[17,4]},"detail9":{"section_segments":[0,60,120,180],"offset":{"x":-15,"y":-140,"z":0},"position":{"x":[5,5,-13,-13],"y":[-25,-25,120,120],"z":[0,0,0,0]},"width":[0,5,5,0],"height":[0,5,10,0],"texture":[3.9,63]},"detail10":{"section_segments":6,"offset":{"x":30,"y":-60,"z":-6},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-65,-65,-60,-15,-12,12,15,60,65,65],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,5,7,7,10,10,7,7,5,0],"height":[0,5,7,7,8,8,7,7,5,0],"texture":[3.9,3.9,8.2,63,11,63,15,3.9,3.9]},"detail11":{"section_segments":6,"offset":{"x":30,"y":-60,"z":6},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-65,-65,-60,-15,-12,12,15,60,65,65],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,5,7,7,10,10,7,7,5,0],"height":[0,5,7,7,8,8,7,7,5,0],"texture":[3.9,3.9,8.2,63,11,63,15,3.9,3.9]},"detail12":{"section_segments":10,"offset":{"x":0,"y":15,"z":-7},"position":{"x":[0,0,0,0,0,0,0],"y":[0,14,14,10,12,12],"z":[0,0,0,0,0,0,0]},"width":[15,15,12,9,7,0],"height":[15,15,12,9,7,0],"texture":[4,63,17,4,18],"vertical":true}},"wings":{"detail":{"doubleside":true,"offset":{"x":70,"y":-10,"z":0},"length":[0,-20,-10,-40,-8],"width":[0,30,30,160,30,20],"angle":[280,280,315,335,350],"position":[10,10,10,-50,0,0],"texture":[63,63,63,4,63],"bump":{"position":35,"size":-5}},"detail2":{"doubleside":true,"offset":{"x":70,"y":-10,"z":0},"length":[0,-20,-10,-40,-8],"width":[0,30,30,160,30,20],"angle":[-280,-280,-315,-335,-350],"position":[10,10,10,-50,0,0],"texture":[63,63,63,4,63],"bump":{"position":35,"size":-5}},"detail3":{"doubleside":true,"offset":{"x":70,"y":60,"z":0},"length":[0,-20,-10,-40,-8],"width":[0,30,30,120,30,20],"angle":[280,280,315,335,350],"position":[0,0,0,30,0,0],"texture":[63,63,63,4,63],"bump":{"position":-30,"size":-5}},"detail4":{"doubleside":true,"offset":{"x":70,"y":60,"z":0},"length":[0,-20,-10,-40,-8],"width":[0,30,30,120,30,20],"angle":[-280,-280,-315,-335,-350],"position":[0,0,0,30,0,0],"texture":[63,63,63,4,63],"bump":{"position":-30,"size":-5}},"detail5":{"doubleside":true,"offset":{"x":8,"y":-50,"z":18},"length":[0,5,8,0],"width":[0,130,130,70,20],"angle":[0,0,0,0],"position":[20,-16,-13,20,20],"texture":[12,63,4,4],"bump":{"position":35,"size":12}},"detail6":{"doubleside":true,"offset":{"x":30,"y":35,"z":0},"length":[10,4,33,0],"width":[60,60,50,20,0],"angle":[0,0,0,0],"position":[30,30,30,0,0],"texture":[4,63,8.4,4],"bump":{"position":35,"size":6}},"detail7":{"doubleside":true,"offset":{"x":71,"y":20,"z":0},"length":[10,0,3,15,0],"width":[20,20,130,130,70,20],"angle":[0,0,0,0,0],"position":[20,20,-16,-13,20,20],"texture":[17,4,63,4,4],"bump":{"position":35,"size":12}},"detail8":{"doubleside":true,"offset":{"x":81,"y":21,"z":0},"length":[0,3,15,0],"width":[20,130,130,70,20],"angle":[0,0,0,0],"position":[20,-16,-13,20,20],"texture":[4,1,1,4],"bump":{"position":35,"size":12}},"detail9":{"doubleside":true,"offset":{"x":70,"y":-9,"z":0},"length":[0,-20,-10,-40,-8],"width":[0,30,30,160,30,20],"angle":[280,280,315,335,350],"position":[10,10,10,-50,0,0],"texture":[63,63,63,18,63],"bump":{"position":35,"size":-5}},"detail10":{"doubleside":true,"offset":{"x":70,"y":59,"z":0},"length":[0,-20,-10,-40,-8],"width":[0,30,30,120,30,20],"angle":[280,280,315,335,350],"position":[0,0,0,30,0,0],"texture":[63,63,63,15,63],"bump":{"position":-30,"size":-5}},"detail11":{"doubleside":true,"offset":{"x":4,"y":75,"z":19},"length":[0,6,12,0],"width":[0,90,90,70,20],"angle":[0,0,0,0],"position":[-20,-6,-13,-20,-20],"texture":[12,17,8.3,3.9],"bump":{"position":-45,"size":5}},"detail12":{"doubleside":true,"offset":{"x":4,"y":74,"z":19},"length":[0,6,12,0],"width":[0,90,90,70,20],"angle":[0,0,0,0],"position":[-20,-6,-13,-20,-20],"texture":[3.9],"bump":{"position":-45,"size":5}}},"typespec":{"name":"Cthulhu","level":6,"model":12,"code":612,"specs":{"shield":{"capacity":[425,600],"reload":[10,13]},"generator":{"capacity":[200,275],"reload":[70,95]},"ship":{"mass":550,"speed":[65,80],"rotation":[45,60],"acceleration":[75,100]}},"shape":[5.522,5.532,4.33,5.08,4.709,3.836,3.289,3.395,3.409,3.294,3.211,3.197,3.267,3.333,3.412,3.554,3.773,4.087,4.169,3.828,4.24,4.794,5.389,4.419,5.209,5.187,5.209,4.419,5.389,4.794,4.24,3.828,4.169,4.087,3.773,3.554,3.412,3.333,3.267,3.197,3.211,3.294,3.409,3.395,3.289,3.836,4.709,5.08,4.33,5.532],"lasers":[{"x":0,"y":-3.507,"z":0,"angle":0,"damage":[70,90],"rate":5,"type":2,"speed":[120,150],"number":1,"spread":0,"error":0,"recoil":0}],"radius":5.532}}';
 
var V_Destroyer_701 = '{"name":"V-Destroyer","level":7,"model":1,"size":3.7,"zoom":1.08,"specs":{"shield":{"capacity":[700,700],"reload":[15,15]},"generator":{"capacity":[375,375],"reload":[150,150]},"ship":{"mass":700,"speed":[60,60],"rotation":[32,32],"acceleration":[80,80]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":50,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-40,-40,-45,-20,-15,-5,20,40,40],"z":[0,0,0,0,0,0,0,0,0]},"width":[13,13,22,35,35,35,35,20,0],"height":[0,13,17,26,26,26,26,17,0],"texture":[15,16.9,10.245,8.2,0.9,11,8]},"detail2":{"section_segments":10,"offset":{"x":0,"y":-1,"z":0},"position":{"x":[0,0,0,0,0],"y":[-3,2,2,-3,-3],"z":[0,0,0,0,0]},"width":[15,15,11,11,15],"height":[15,15,11,11,15],"texture":[17,4,17,4]},"detail3":{"section_segments":10,"offset":{"x":0,"y":-9,"z":0},"position":{"x":[0,0,0,0,0],"y":[-3,2,2,-3,-3],"z":[0,0,0,0,0]},"width":[15,15,11,11,15],"height":[15,15,11,11,15],"texture":[17,4,17,4]},"detail4":{"section_segments":10,"offset":{"x":0,"y":-17,"z":0},"position":{"x":[0,0,0,0,0],"y":[-3,2,2,-3,-3],"z":[0,0,0,0,0]},"width":[15,15,11,11,15],"height":[15,15,11,11,15],"texture":[17,4,17,4]},"detail5":{"section_segments":6,"offset":{"x":0,"y":-50,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-40,-45,-42,-30,-15,-10,15,26,26,23,23],"z":[0,0,0,0,5,5,5,5,3,3,3]},"width":[0,3,5,7,18,20,20,15,13,13,13],"height":[0,3,5,7,10,12,12,8,6,6,0],"texture":[3.9,63,10.241,0.9,63,8,3.9,16.9,3.9,15],"laser":{"damage":[225,225],"rate":1.5,"type":1,"speed":[225,225],"number":1,"error":0,"recoil":250}},"detail6":{"section_segments":6,"offset":{"x":0,"y":30,"z":20},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-12,-12,5,13,16,19,37,41,74,74],"z":[-1,-1,1,1,0,3,3,3,-21,-21]},"width":[0,7,12,12,16,16,16,16,25,0],"height":[0,4,7,7,8,8,6,6,10,0],"texture":[7,9,9,3.9,63,10.241,18,0.9]},"detail7":{"section_segments":6,"offset":{"x":26,"y":56,"z":19},"position":{"x":[4.5,4.5,0,0,0,0,0],"y":[-2,-2,6,9,16,16],"z":[-5,-5,0,0,0,0,0]},"width":[0,10,15,15,15,0],"height":[0,4,7,7,7,0],"texture":[7,9,9,3.9,3.9],"angle":-90},"detail8":{"section_segments":6,"offset":{"x":90,"y":-55,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-20,-20,-10,5,15,15,18,27.5,40,30],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,10,15,15,15,25,25,25,14,0],"height":[0,6,10,10,10,15,15,15,9,0],"texture":[3.9,18,8.2,18,3.9,63,11,0.9,16.9],"propeller":true},"detail9":{"section_segments":[45,135,225,315],"offset":{"x":40,"y":15,"z":0},"position":{"x":[0,0,0,0,0,0,0,-15,-25,-25],"y":[-65,-74,-72,-62,-59,-50,-15,10,30,30],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,3,4,4,5,9,9,18,20,0],"height":[0,3,4,4,5,9,9,9,9,0],"texture":[4,63,1,4,4,4],"laser":{"damage":[25,25],"rate":1.5,"type":1,"speed":[170,170],"number":1,"angle":0,"error":0}},"detail10":{"section_segments":[45,135,225,315],"offset":{"x":29,"y":-32,"z":2.5},"position":{"x":[0,0,-5,0,0],"y":[-20,-20,0,20,20],"z":[0,0,0,0,0]},"width":[0,4,4,4,0],"height":[0,2,2,2,0],"texture":[63],"angle":45},"detail11":{"section_segments":[0,60,120,180],"offset":{"x":87.5,"y":-55,"z":0},"position":{"x":[2.5,0,0,0,0,0,0,0],"y":[-30,-27,-25,-25,-10,7.5,10,10],"z":[0,0,0,0,0,0,0,0]},"width":[4,4,5,10,22,22,22,0],"height":[4,4,5,8,15,15,15,0],"texture":[0.9,0.9,0.9,0.9,10.241,63]},"detail12":{"section_segments":[0,60,120,180],"offset":{"x":-92.5,"y":-55,"z":0},"position":{"x":[2.5,0,0,0,0,0,0,0],"y":[-30,-27,-25,-25,-10,7.5,10,10],"z":[0,0,0,0,0,0,0,0]},"width":[4,4,5,10,22,22,22,0],"height":[4,4,5,8,15,15,15,0],"texture":[0.9,0.9,0.9,0.9,10.241,63]},"detail13":{"section_segments":6,"offset":{"x":26,"y":57,"z":19},"position":{"x":[4.5,4.5,0,0,0,0,0],"y":[-2,-2,6,9,16,16],"z":[-5,-5,0,0,0,0,0]},"width":[0,10,15,15,15,0],"height":[0,4,7,7,7,0],"texture":[7,0.9,63,15],"angle":-90},"detail14":{"section_segments":6,"offset":{"x":0,"y":50,"z":-1},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-25,-25,-44,-44,-30,30,54,54],"z":[0,0,0,0,0,0,0]},"width":[0,18,18,22,44,44,24,0],"height":[0,6,6,10,10,10,10,0],"texture":[3.9,3.9,3.9,3.9,12,18,1]},"detail15":{"section_segments":[45,135,225,315],"offset":{"x":25,"y":60,"z":0},"position":{"x":[0,0,0,0,0],"y":[-5,-5,15,18,18],"z":[0,0,0,0,0]},"width":[0,30,30,28,0],"height":[0,5,5,3,0],"texture":[63,17,63],"angle":90},"detail16":{"section_segments":[45,135,225,315],"offset":{"x":94,"y":-55,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-25,-25,-10,7.5,10,10],"z":[0,0,0,0,0,0]},"width":[0,2,2,2,2,0],"height":[0,11,21,21,21,0],"texture":[0.9,63]},"detail17":{"section_segments":[45,135,225,315],"offset":{"x":86,"y":-55,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-25,-25,-10,7.5,10,10],"z":[0,0,0,0,0,0]},"width":[0,2,2,2,2,0],"height":[0,11,21,21,21,0],"texture":[0.9,63]},"detail18":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":0,"y":-45,"z":12},"position":{"x":[0,0,0,0],"y":[-15,-15,10,10],"z":[0,0,0,0]},"width":[0,13,13,10],"height":[0,8,8,0],"texture":[3.9,15,3.9]},"detail19":{"section_segments":6,"offset":{"x":11,"y":100,"z":-3},"position":{"x":[0,0,0,0,0,0,0],"y":[-20,-20,-15,10,15,9],"z":[0,0,0,0,0,0,0]},"width":[0,10,15,15,11,0],"height":[0,4,7,7,7,0],"texture":[3.9,3.9,15,63,16.9],"propeller":true},"detail20":{"section_segments":[45,135,225,315],"offset":{"x":29,"y":-32,"z":-2.5},"position":{"x":[0,0,-5,0,0],"y":[-20,-20,0,20,20],"z":[0,0,0,0,0]},"width":[0,4,4,4,0],"height":[0,2,2,2,0],"texture":[63],"angle":45},"detail21":{"section_segments":6,"offset":{"x":90,"y":-90,"z":0},"position":{"x":[0,0,0,0,0],"y":[-3,-7,0,5,5],"z":[0,0,0,0,0]},"width":[0,2,4,4,0],"height":[0,2,4,4,0],"texture":[0.9,63,15,3.9],"laser":{"damage":[25,25],"rate":1.5,"type":1,"speed":[170,170],"number":1,"angle":0,"error":0}},"detail22":{"section_segments":[45,135,225,315],"offset":{"x":40,"y":15,"z":1},"position":{"x":[0,0,0,0,-15,-25,-25],"y":[-59,-59,-50,-15,10,30,30],"z":[0,0,0,0,0,0,0]},"width":[0,1,4,4,10,10,0],"height":[0,5,9,9,9,9,0],"texture":[63,63,8,2]},"detail23":{"section_segments":6,"offset":{"x":90,"y":-25,"z":11},"position":{"x":[0,0,0,0,0],"y":[-12,-12,-2,10,5],"z":[0,0,0,-8,-8]},"width":[0,7,7,14,0],"height":[0,5,5,7,0],"texture":[3.9,3.9,3.9,17.9]},"detail24":{"section_segments":[0,60,120,180],"offset":{"x":-20,"y":29,"z":9},"position":{"x":[2,2,2,-9,-9],"y":[-24,-24,1,15,15],"z":[-1,-1,0,3,3]},"width":[0,2,15,2,0],"height":[0,2,10,2,0],"texture":[3.9]},"detail25":{"section_segments":6,"offset":{"x":40,"y":0,"z":-60},"position":{"x":[0,0,0,0,0,0],"y":[-2,2,2,2,-2,-2],"z":[0,0,0,0,0,0]},"width":[10,10,8,6,6,10],"height":[22,22,20,16,16,22],"texture":[3.9,3.9,63,3.9],"vertical":true},"detail26":{"section_segments":6,"offset":{"x":0,"y":-50,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[-30,-30,-15,-10,15,23,23],"z":[0,0,-5,-5,-5,-5,-3]},"width":[0,5,16,18,18,13,0],"height":[0,7,10,12,12,8,0],"texture":[3.9]},"detail27":{"section_segments":10,"offset":{"x":0,"y":9,"z":53.5},"position":{"x":[0,0,0,0,0,0,0],"y":[0,11,11,10,11,11],"z":[0,0,0,0,0,0,0]},"width":[6,6,5,3,1.5,0],"height":[6,6,5,3,1.5,0],"texture":[4,4,17,63,18],"vertical":true},"detail28":{"section_segments":10,"offset":{"x":0,"y":9,"z":41.5},"position":{"x":[0,0,0,0,0,0,0],"y":[0,11,11,10,11,11],"z":[0,0,0,0,0,0,0]},"width":[6,6,5,3,1.5,0],"height":[6,6,5,3,1.5,0],"texture":[4,4,17,63,18],"vertical":true},"detail29":{"section_segments":6,"offset":{"x":5,"y":-53.5,"z":15},"position":{"x":[0,0,0,0,0],"y":[-1.5,1.5,1.5,-1.5,-1.5],"z":[0,0,0,0,0]},"width":[7,7,5,5,7],"height":[7,7,5,5,7],"texture":[63]},"detail30":{"section_segments":6,"offset":{"x":5,"y":-41.5,"z":15},"position":{"x":[0,0,0,0,0],"y":[-1.5,1.5,1.5,-1.5,-1.5],"z":[0,0,0,0,0]},"width":[7,7,5,5,7],"height":[7,7,5,5,7],"texture":[63]},"detail31":{"section_segments":6,"offset":{"x":12.5,"y":-47,"z":9.5},"position":{"x":[0,0,0,0,0,0],"y":[-12,-12,-4,4,12,12],"z":[0,0,0,0,0,0]},"width":[0,6,6,6,6,0],"height":[0,4,4,4,4,0],"texture":[3.9,10,4,10,3.9]},"detail32":{"section_segments":4,"offset":{"x":0,"y":-75,"z":11},"position":{"x":[0,0,0,0],"y":[-5,10,16,16],"z":[-4,0,0,0]},"width":[0,16,18,0],"height":[0,4.75,7,0],"texture":[4,63]},"detail33":{"section_segments":10,"offset":{"x":90,"y":6,"z":32},"position":{"x":[0,0,0,0,0,0,0],"y":[0,10.5,11,10,11,11],"z":[0,0,0,0,0,0,0]},"width":[5,5,4,3,1.5,0],"height":[5,5,4,3,1.5,0],"texture":[4,63,4,17,4],"vertical":true},"detail34":{"section_segments":6,"offset":{"x":0,"y":80,"z":24},"position":{"x":[0,0,0],"y":[-10,-10,24],"z":[0,0,-15]},"width":[0,16,0],"height":[0,6,0],"texture":[8.2]},"detail35":{"section_segments":4,"offset":{"x":14,"y":20,"z":19},"position":{"x":[0,0,0,0,0],"y":[-15,-15,10,30,30],"z":[-9.5,-9.5,0,0,0]},"width":[0,4,4,4,0],"height":[0,1.8,1.8,1.8,0],"texture":[63]}},"wings":{"detail":{"length":[40,2,30,0],"width":[40,40,20,20,0],"angle":[0,0,0,0],"position":[0,-60,-57,-100,-100],"texture":[18,4,11],"doubleside":true,"bump":{"position":25,"size":10},"offset":{"x":15,"y":62,"z":0}},"detail2":{"length":[35],"width":[65,0],"angle":[0],"position":[0,55],"texture":[63],"doubleside":true,"bump":{"position":40,"size":17},"offset":{"x":15,"y":66,"z":-6}},"detail3":{"length":[45],"width":[75,0],"angle":[0],"position":[0,65],"texture":[4],"doubleside":true,"bump":{"position":40,"size":5},"offset":{"x":15,"y":66,"z":-6}},"detail4":{"length":[0,25],"width":[0,75,0],"angle":[90,90],"position":[0,0,55],"texture":[63],"doubleside":true,"bump":{"position":45,"size":15},"offset":{"x":0,"y":60,"z":10}},"detail5":{"length":[40,2,30,0],"width":[40,40,20,20,0],"angle":[0,0,0,0],"position":[0,-60,-57,-100,-100],"texture":[63,4],"doubleside":true,"bump":{"position":25,"size":10},"offset":{"x":15,"y":61,"z":0}},"detail6":{"length":[0,35,0],"width":[0,20,20,0],"angle":[0,0,0],"position":[0,0,-50,-50],"texture":[17],"doubleside":true,"bump":{"position":40,"size":10},"offset":{"x":55,"y":2,"z":-6}}},"typespec":{"name":"V-Destroyer","level":7,"model":1,"code":701,"specs":{"shield":{"capacity":[700,700],"reload":[15,15]},"generator":{"capacity":[375,375],"reload":[150,150]},"ship":{"mass":700,"speed":[60,60],"rotation":[32,32],"acceleration":[80,80]}},"shape":[7.033,6.297,5.181,4.236,3.491,5.364,9.879,9.544,9.554,9.42,8.776,8.53,5.502,4.973,4.613,4.382,4.384,4.301,4.356,5.641,6.445,6.751,10.662,9.139,8.644,8.527,8.644,9.139,10.662,6.751,6.445,5.641,4.356,4.301,4.384,4.382,4.613,4.973,5.502,8.53,8.776,9.42,9.554,9.544,9.879,5.364,3.491,4.236,5.181,6.297],"lasers":[{"x":0,"y":-7.03,"z":0,"angle":0,"damage":[225,225],"rate":1.5,"type":1,"speed":[225,225],"number":1,"spread":0,"error":0,"recoil":250},{"x":2.96,"y":-4.366,"z":0,"angle":0,"damage":[25,25],"rate":1.5,"type":1,"speed":[170,170],"number":1,"spread":0,"error":0,"recoil":0},{"x":-2.96,"y":-4.366,"z":0,"angle":0,"damage":[25,25],"rate":1.5,"type":1,"speed":[170,170],"number":1,"spread":0,"error":0,"recoil":0},{"x":6.66,"y":-7.178,"z":0,"angle":0,"damage":[25,25],"rate":1.5,"type":1,"speed":[170,170],"number":1,"spread":0,"error":0,"recoil":0},{"x":-6.66,"y":-7.178,"z":0,"angle":0,"damage":[25,25],"rate":1.5,"type":1,"speed":[170,170],"number":1,"spread":0,"error":0,"recoil":0}],"radius":10.662}}';
var Wasp_Sniper_702 = '{"name":"Wasp-Sniper","level":7,"model":2,"size":3.5,"zoom":1.1,"specs":{"shield":{"capacity":[450,450],"reload":[10,10]},"generator":{"capacity":[400,400],"reload":[100,100]},"ship":{"mass":400,"speed":[130,130],"rotation":[40,40],"acceleration":[60,60]}},"bodies":{"detail":{"section_segments":[0,60,120,180],"offset":{"x":-2,"y":0,"z":5},"position":{"x":[0,0,0,0],"y":[-6,-6,6,6],"z":[-7,-7,-3,-3]},"width":[0,13,19,0],"height":[0,13,19,0],"propeller":false,"texture":[3.9]},"detail2":{"section_segments":[0,60,120,180],"offset":{"x":-9,"y":20,"z":5},"position":{"x":[0,0,0,0],"y":[-6,-6,6,6],"z":[2,2,0,0]},"width":[0,13,16,0],"height":[0,13,17,0],"propeller":false,"texture":[3.9]},"detail3":{"section_segments":[0,60,120,180],"offset":{"x":-2,"y":40,"z":5},"position":{"x":[0,0,0,0],"y":[-6,-6,6,6],"z":[1,1,-1,-1]},"width":[0,24.3,25,0],"height":[0,24.3,25,0],"propeller":false,"texture":[3.9]},"detail4":{"section_segments":[0,60,120,180],"offset":{"x":-2,"y":60,"z":5},"position":{"x":[0,0,0,0],"y":[-5,-5,6,6],"z":[-3,-3,-6,-6]},"width":[0,24.5,23,0],"height":[0,24.5,23,0],"propeller":false,"texture":[3.9]},"detail5":{"section_segments":[0,60,120,180],"offset":{"x":-2,"y":80,"z":5},"position":{"x":[0,0,0,0],"y":[-5,-5,5,5],"z":[-7,-7,-12,-12]},"width":[0,21,17.5,0],"height":[0,21,17.5,0],"propeller":false,"texture":[3.9]},"detail6":{"section_segments":[0,60,120,180],"offset":{"x":-2,"y":100,"z":5},"position":{"x":[0,0,0,0],"y":[-6,-6,2,2],"z":[-14,-14,-20,-20]},"width":[0,14,7,0],"height":[0,14,7,0],"propeller":false,"texture":[63]},"detail7":{"section_segments":6,"offset":{"x":0,"y":13,"z":5},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-95,-95,-85,-70,-56,-45,-37,-30,-25,-14,6,27,47,69,85,95,110,110],"z":[-6,-6,-8,-10,-15,-19,-25,-25,-12,-7,0,0,-5,-10,-18,-24,-30,-30]},"width":[0,10,16,18,17,12,6,6,9,14,20,22,22,17,9,3,1,0],"height":[0,10,16,18,17,12,8,8,6,14,20,22,22,17,9,3,1,0],"propeller":false,"texture":[3.9,3.9,10.245,3.9,3.9,18,15,3.9,2.9,3.9,12.9,3.9,8.2,3.9,3.9,16.9]},"detail8":{"section_segments":6,"offset":{"x":0,"y":14,"z":-23},"position":{"x":[0,0,0,0,0],"y":[4,13,12.1,12.1],"z":[0,0,0,0,0]},"width":[10,6,4,0],"height":[9,5,3,0],"texture":[3.9,16.9,2.9],"vertical":true},"detail9":{"section_segments":6,"offset":{"x":0,"y":0,"z":90},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-15,-15,-10,0,10,15,15.5,13,13],"z":[10,10,10,0,-7,-15,-15,-15,-15]},"width":[0,9,15,21,19,10,8,4,0],"height":[0,7,10,15,13,6,4,1.5,0],"texture":[3.9,2.9,8,10,3.9,63,16.9,3.9],"vertical":true},"detail10":{"section_segments":[0,60,120,180],"offset":{"x":-4.3,"y":-15,"z":106.6},"position":{"x":[3,3,0,0,0],"y":[-10,-10,0,10,10],"z":[5,5,0,-10,-10]},"width":[0,1,8,13,0],"height":[0,2,6,9.3,0],"texture":[63],"vertical":true},"detail11":{"section_segments":5,"offset":{"x":0,"y":1,"z":100},"position":{"x":[0,0,0,0,0,0],"y":[-5,-5,0,8,12,12],"z":[5,5,-1,-7,-13,-15,-15]},"width":[0,5,9,11,10,0],"height":[0,2,6,5,3,0],"texture":[9,9,9,9,3.9],"vertical":true},"detail12":{"section_segments":[0,60,120,180],"offset":{"x":-3,"y":0,"z":7},"position":{"x":[0,0,0,0],"y":[-5,-5,5,5],"z":[-7,-7,-3,-3]},"width":[0,11,16,0],"height":[0,12,18,0],"propeller":false,"texture":[63]},"detail13":{"section_segments":[0,60,120,180],"offset":{"x":-10,"y":20,"z":7},"position":{"x":[0,0,0,0],"y":[-5,-5,5,5],"z":[2,2,0,0]},"width":[0,11,14,0],"height":[0,12,17,0],"propeller":false,"texture":[63]},"detail14":{"section_segments":[0,60,120,180],"offset":{"x":-3,"y":40,"z":6.5},"position":{"x":[0,0,0,0],"y":[-5,-5,5,5],"z":[1,1,-1,-1]},"width":[0,22.3,23,0],"height":[0,23.3,24,0],"propeller":false,"texture":[63]},"detail15":{"section_segments":[0,60,120,180],"offset":{"x":-3,"y":60,"z":7},"position":{"x":[0,0,0,0],"y":[-4,-4,5,5],"z":[-3,-3,-6,-6]},"width":[0,22,21,0],"height":[0,23.5,22,0],"propeller":false,"texture":[63]},"detail16":{"section_segments":[0,60,120,180],"offset":{"x":-3,"y":80,"z":7},"position":{"x":[0,0,0,0],"y":[-4,-4,4,4],"z":[-7,-7,-12,-12]},"width":[0,18,15.5,0],"height":[0,20,16.5,0],"propeller":false,"texture":[63]},"detail17":{"section_segments":6,"offset":{"x":37,"y":-5,"z":8},"position":{"x":[0,0,0,0,0,0,0],"y":[-10,-15,-10,-8,15,17,17],"z":[0,0,0,0,0,0,0]},"width":[0,2,3.5,5,5,3.5,0],"height":[0,2,3.5,5,5,3.5,0],"texture":[0.9,63,3.9,10,3.9],"laser":{"damage":[8,8],"rate":5,"type":1,"speed":[180,180],"number":1,"error":0}},"detail18":{"section_segments":6,"offset":{"x":29,"y":-20,"z":8},"position":{"x":[0,0,0,0,0,0,0],"y":[-10,-15,-10,-8,15,17,17],"z":[0,0,0,0,0,0,0]},"width":[0,2,3.5,5,5,3.5,0],"height":[0,2,3.5,5,5,3.5,0],"texture":[0.9,63,3.9,10,3.9],"laser":{"damage":[8,8],"rate":5,"type":1,"speed":[180,180],"number":1,"error":0}},"detail19":{"section_segments":6,"offset":{"x":0,"y":-96,"z":-12},"position":{"x":[0,0,0,0,0,0],"y":[-12,-15,-11,15,17,17],"z":[0,0,0,0,0,0]},"width":[0,3,5,5,3.5,0],"height":[0,2,5,5,3.5,0],"propeller":false,"texture":[0.9,3.9,3.9,3.9],"laser":{"damage":[250,250],"rate":1,"type":1,"speed":[260,260],"number":1,"error":0,"recoil":300}},"detail20":{"section_segments":6,"offset":{"x":39,"y":-89,"z":-24},"position":{"x":[-3,-3,0,0,0],"y":[-3,-3,0,1.5,1.5],"z":[2,2,0,0,0]},"width":[0,6.5,9,8,0],"height":[0,2,2.5,2,0],"propeller":false,"texture":[3.9,3.9,63],"angle":90},"detail21":{"section_segments":6,"offset":{"x":49,"y":-48,"z":-30},"position":{"x":[-3,-3,0,0,0],"y":[-3,-3,0,1.5,1.5],"z":[2,2,0,0,0]},"width":[0,6.5,9,8,0],"height":[0,2,2.5,2,0],"propeller":false,"texture":[3.9,3.9,63],"angle":90},"detail22":{"section_segments":6,"offset":{"x":48,"y":1,"z":-34},"position":{"x":[-3,-3,0,0,0],"y":[-3,-3,0,1.5,1.5],"z":[2,2,0,0,0]},"width":[0,6.5,9,8,0],"height":[0,2,2.5,2,0],"propeller":false,"texture":[3.9,3.9,63],"angle":90},"detail23":{"section_segments":6,"offset":{"x":33,"y":-2,"z":8},"position":{"x":[0,0,0,0,0,0],"y":[-10,-10,-8,15,20,10],"z":[0,0,0,0,0,0]},"width":[0,7,10,10,8,0],"height":[0,3,5,5,4,0],"propeller":true,"texture":[3.9,3.9,12.9,63,16.9]}},"wings":{"detail":{"length":[5,50,5],"width":[20,23,40,25],"angle":[0,0,0],"position":[0,0,100,108],"doubleside":true,"offset":{"x":0,"y":-56,"z":13},"bump":{"position":30,"size":15},"texture":[63,11,4]},"detail2":{"length":[5,50,0],"width":[20,23,40,25],"angle":[0,0,0],"position":[0,0,100,108],"doubleside":true,"offset":{"x":0,"y":-54,"z":13},"bump":{"position":30,"size":15},"texture":[18,4]},"detail3":{"length":[25,19],"width":[6,6,6],"angle":[-15,-40],"position":[0,-10,-30],"doubleside":true,"bump":{"position":10,"size":35},"texture":[17],"offset":{"x":0,"y":-60,"z":-5}},"detail4":{"length":[25,20],"width":[6,6,7],"angle":[-15,-40],"position":[0,-10,-31],"doubleside":true,"bump":{"position":10,"size":35},"texture":[18,63],"offset":{"x":0,"y":-59,"z":-5}},"detail5":{"length":[30,25],"width":[6,6,6],"angle":[-15,-40],"position":[0,-5,-10],"doubleside":true,"bump":{"position":10,"size":35},"texture":[17],"offset":{"x":0,"y":-37,"z":-6}},"detail6":{"length":[30,26],"width":[6,6,7],"angle":[-15,-40],"position":[0,-5,-10.5],"doubleside":true,"bump":{"position":10,"size":35},"texture":[18,63],"offset":{"x":0,"y":-36,"z":-6}},"detail7":{"length":[30,19],"width":[6,6,6],"angle":[-10,-30],"position":[0,10,24],"doubleside":true,"bump":{"position":10,"size":35},"texture":[17],"offset":{"x":0,"y":-20,"z":-18}},"detail8":{"length":[30,20],"width":[6,6,7],"angle":[-10,-30],"position":[0,10,24.5],"doubleside":true,"bump":{"position":10,"size":35},"texture":[18,63],"offset":{"x":0,"y":-19,"z":-18}},"detail9":{"length":[15,15],"width":[8,8,8],"angle":[-15,-40],"position":[0,-10,-40],"doubleside":true,"bump":{"position":35,"size":55},"texture":[11.2,1],"offset":{"x":0,"y":-86,"z":13}}},"typespec":{"name":"Wasp-Sniper","level":7,"model":2,"code":702,"specs":{"shield":{"capacity":[450,450],"reload":[10,10]},"generator":{"capacity":[400,400],"reload":[100,100]},"ship":{"mass":400,"speed":[130,130],"rotation":[40,40],"acceleration":[60,60]}},"shape":[6.816,7.558,7.954,6.261,5.705,3.709,4.477,4.155,2.491,2.615,2.6,2.965,2.991,2.993,3.008,3.406,3.927,4.447,4.935,5.286,5.178,3.103,4.173,5.203,6.139,7.38,6.139,5.203,4.173,3.103,5.178,5.286,4.935,4.447,3.927,3.406,3.008,2.993,2.991,2.965,2.6,2.615,2.491,4.155,4.477,3.709,5.705,6.261,7.954,7.558],"lasers":[{"x":2.22,"y":-1.2,"z":0.48,"angle":0,"damage":[8,8],"rate":5,"type":1,"speed":[180,180],"number":1,"spread":0,"error":0,"recoil":0},{"x":-2.22,"y":-1.2,"z":0.48,"angle":0,"damage":[8,8],"rate":5,"type":1,"speed":[180,180],"number":1,"spread":0,"error":0,"recoil":0},{"x":1.74,"y":-2.1,"z":0.48,"angle":0,"damage":[8,8],"rate":5,"type":1,"speed":[180,180],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.74,"y":-2.1,"z":0.48,"angle":0,"damage":[8,8],"rate":5,"type":1,"speed":[180,180],"number":1,"spread":0,"error":0,"recoil":0},{"x":0,"y":-6.66,"z":-0.72,"angle":0,"damage":[250,250],"rate":1,"type":1,"speed":[260,260],"number":1,"spread":0,"error":0,"recoil":300}],"radius":7.954}}';
var Miles_703 = '{"name":"Miles","level":7,"model":3,"size":3.2,"specs":{"shield":{"capacity":[550,550],"reload":[14,14]},"generator":{"capacity":[500,500],"reload":[110,110]},"ship":{"mass":500,"speed":[85,85],"rotation":[60,60],"acceleration":[70,70]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":-20,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-100,-100,-90,-50,10,20,50,75,95,100,90],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,4,9,14,14,24,24,17,17,14,0],"height":[0,3,5,12,12,13,13,12,7,5,0],"texture":[63,63,10.241,1,4,8,4,15,16.9],"propeller":true},"detail2":{"section_segments":20,"offset":{"x":0,"y":1,"z":-10},"position":{"x":[0,0,0,0,0,0],"y":[-3,-2,2,3,3,3],"z":[0,0,0,0,0,0]},"width":[0,52,50,40,38,0],"height":[0,52,50,40,38,38],"texture":[4,63,11,63,15],"vertical":true},"detail3":{"section_segments":6,"offset":{"x":50,"y":50,"z":-8},"position":{"x":[0,0,0,0,0,0,0],"y":[-23,-20,-10,10,37,40,30],"z":[0,0,0,0,0,0,0]},"width":[0,10,15,15,10,7,0],"height":[0,5,12,12,7,5,0],"texture":[63,63,10.241,3.9,63],"propeller":true},"detail4":{"section_segments":6,"offset":{"x":0,"y":-65,"z":9},"position":{"x":[0,0,0,0,0,0,0],"y":[-30,-30,-12,10,18,22,22],"z":[0,0,0,0,0,0,0]},"width":[0,4,9,10,10,7,0],"height":[0,2,5,7,7,4,0],"propeller":false,"texture":[7,9,9,10.241,3.9]},"detail5":{"section_segments":[-110,-100,-90,-80,-70,-60,-50,-40,-30,-20,-10,0,20,40,60,80,100,110],"offset":{"x":0,"y":1,"z":-10},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[62,62,58,58,62],"height":[62,62,58,58,62],"texture":[4,17,4],"vertical":true},"detail6":{"section_segments":6,"offset":{"x":10,"y":-40,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-95,-98,-95,-91,-70,-55,-50,-25,-5,0,20,25,25],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,1.8,2.5,2.5,4,6,3.5,5,6,8,8,5,0],"height":[0,1.8,2.5,2.5,4,6,3.5,5,6,8,8,5,0],"angle":0,"laser":{"damage":[15,15],"rate":9,"type":2,"speed":[270,270],"number":1,"error":0},"propeller":false,"texture":[3.9,63,17,15,10.25,63,0.9,11,63,8,3.9]},"detail7":{"section_segments":6,"offset":{"x":50,"y":25,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-85,-87,-73,-70,-30,-20,-10,20,25,25],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,2,5,3.5,5,5,8,8,6,0],"height":[0,2,5,3.5,5,5,8,8,6,0],"texture":[3.9,0.9,16.9,3.9,10.25,63,11,3.9,3.9],"laser":{"damage":[5,5],"rate":9,"type":2,"speed":[270,270],"number":1,"error":0}},"detail8":{"section_segments":6,"offset":{"x":0,"y":30,"z":23},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-84,-60,-50,-50,-45,-25,10,45,50,50],"z":[-20,0,0,0,0,0,0,0,0,0]},"width":[3,3,3,8,10,10,10,10,8,0],"height":[2,2,2,3,5,5,5,5,3,0],"texture":[63,63,63,63,15,8,15,63,63]},"detail9":{"section_segments":6,"offset":{"x":5,"y":19,"z":6},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[20,20,18,18,20],"height":[20,20,18,18,20],"texture":[63]},"detail10":{"section_segments":6,"offset":{"x":5,"y":10,"z":6},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[20,20,18,18,20],"height":[20,20,18,18,20],"texture":[63]},"detail11":{"section_segments":6,"offset":{"x":5,"y":1,"z":6},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[20,20,18,18,20],"height":[20,20,18,18,20],"texture":[63]},"detail12":{"section_segments":10,"offset":{"x":0,"y":14,"z":26},"position":{"x":[0,0,0,0,0,0,0],"y":[0,14,14,10,12,12],"z":[0,0,0,0,0,0,0]},"width":[7,7,6,5,4,0],"height":[7,7,6,5,4,0],"texture":[4,63,17,4,18],"vertical":true}},"wings":{"detail":{"length":[3,30,15,24,-2,2,8],"width":[40,40,30,20,15,60,60,20],"angle":[0,-10,-15,-15,-5,0,-20],"position":[-5,-5,15,30,40,22,22,50],"doubleside":true,"bump":{"position":40,"size":10},"texture":[4,10.4,10,11,4,17,63],"offset":{"x":0,"y":30,"z":16}},"detail2":{"doubleside":true,"offset":{"x":0,"y":-90,"z":-1},"length":[18,-2,2,8],"width":[25,25,85,85,30],"angle":[0,0,0,0,0],"position":[-15,0,-20,-20,15],"texture":[4,4,17,63],"bump":{"position":30,"size":10}},"detail3":{"doubleside":true,"offset":{"x":0,"y":30,"z":0},"length":[30,-2,5],"width":[40,40,80,50],"angle":[90,90,90,90],"position":[0,0,0,0],"texture":[4,4,63,4],"bump":{"position":50,"size":20}},"detail4":{"doubleside":true,"offset":{"x":36,"y":11,"z":0},"length":[-10,-7,-20,-15,0],"width":[20,20,110,20,20,0],"angle":[270,315,325,360,360],"position":[0,0,0,40,47,47],"texture":[4,4,4,17],"bump":{"position":20,"size":-5}},"detail5":{"doubleside":true,"offset":{"x":45,"y":57,"z":-10},"length":[16,5,3,13,13],"width":[30,30,110,110,25,5],"angle":[0,0,0,0,0],"position":[0,0,-35,-35,20,45],"texture":[4,8,18,4,63],"bump":{"position":10,"size":5}},"detail6":{"doubleside":true,"offset":{"x":15,"y":-25,"z":0},"length":[-10,-7,-3,-10,0],"width":[20,20,130,130,20,0],"angle":[270,315,325,325,360],"position":[0,0,0,0,40,47],"texture":[4,4,63,4],"bump":{"position":20,"size":-5}},"detail7":{"doubleside":true,"offset":{"x":55,"y":35,"z":0},"length":[-10,-7,-3,-13,0],"width":[20,20,110,110,20,0],"angle":[270,315,325,325,360],"position":[0,0,0,0,40,47],"texture":[4,4,17,4],"bump":{"position":20,"size":-5}},"detail8":{"doubleside":true,"offset":{"x":35,"y":30,"z":0},"length":[30,-2,5],"width":[40,40,80,50],"angle":[50,50,50,50],"position":[0,0,0,0],"texture":[15,4,63],"bump":{"position":50,"size":20}},"detail9":{"doubleside":true,"offset":{"x":36,"y":14,"z":0},"length":[-10,-7,-20,-15,0],"width":[20,20,110,20,20,0],"angle":[270,315,325,360,360],"position":[0,0,0,40,47,47],"texture":[4,4,18,4],"bump":{"position":20,"size":-5}}},"typespec":{"name":"Miles","level":7,"model":3,"code":703,"specs":{"shield":{"capacity":[550,550],"reload":[14,14]},"generator":{"capacity":[500,500],"reload":[110,110]},"ship":{"mass":500,"speed":[85,85],"rotation":[60,60],"acceleration":[70,70]}},"shape":[8.849,9.828,7.656,5.371,3.401,5.149,5.168,4.726,4.209,4.895,4.792,4.683,4.691,4.808,5.002,5.324,5.766,6.412,7.807,9.039,6.768,6.786,6.138,4.923,5.178,5.13,5.178,4.923,6.138,6.786,6.768,9.039,7.807,6.412,5.766,5.324,5.002,4.808,4.691,4.683,4.792,4.895,4.209,4.726,5.168,5.149,3.365,5.371,7.656,9.828],"lasers":[{"x":0.64,"y":-8.832,"z":0,"angle":0,"damage":[15,15],"rate":9,"type":2,"speed":[270,270],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.64,"y":-8.832,"z":0,"angle":0,"damage":[15,15],"rate":9,"type":2,"speed":[270,270],"number":1,"spread":0,"error":0,"recoil":0},{"x":3.2,"y":-3.968,"z":0,"angle":0,"damage":[5,5],"rate":9,"type":2,"speed":[270,270],"number":1,"spread":0,"error":0,"recoil":0},{"x":-3.2,"y":-3.968,"z":0,"angle":0,"damage":[5,5],"rate":9,"type":2,"speed":[270,270],"number":1,"spread":0,"error":0,"recoil":0}],"radius":9.828}}';
var Himera_704 = '{"name":"Himera","level":7,"model":4,"size":3.7,"zoom":1.17,"specs":{"shield":{"capacity":[550,550],"reload":[16,16]},"generator":{"capacity":[600,600],"reload":[175,175]},"ship":{"mass":550,"speed":[70,70],"rotation":[25,25],"acceleration":[90,90]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":20,"z":7},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-37,-41,-38,-35,-13,-10,-5,10,40,55,55],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,15,19,19,19,26,26,26,15,0],"height":[0,4,10,12,12,12,15,15,15,5,0],"texture":[3.9,0.9,3.9,63,3.9,0.9,18,8,3.9],"laser":{"damage":[45,45],"rate":3.2,"type":1,"speed":[220,220],"number":1,"error":0}},"detail2":{"section_segments":6,"offset":{"x":0,"y":44,"z":19},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-20,-20,-16,-13,-5,13,17,17],"z":[0,0,0,0,0,0,0,0]},"width":[0,16,20,20,20,20,16,0],"height":[0,3,6,6,6,6,3,0],"texture":[63,63,16.9,0.9,10,0.9]},"detail3":{"section_segments":6,"offset":{"x":0,"y":44,"z":13},"position":{"x":[0,0,0,0,0,0,0],"y":[-20,-20,-16,-13,13,17,17],"z":[0,0,0,0,0,0,0]},"width":[0,16,20,20,20,16,0],"height":[0,9,6,6,6,9,0],"texture":[63,63,16.9,3.9,0.9]},"detail4":{"section_segments":6,"offset":{"x":0,"y":34,"z":4},"position":{"x":[-1,-1,-1,-1,-1,-1,-1,-1],"y":[25,25,30,33,40,45,55,50],"z":[0,0,0,0,0,0,0,0]},"width":[0,42,45,45,45,45,30,0],"height":[0,15,18,18,18,18,13,0],"texture":[0.9,10.07,4,11,63,3.9,3.9,3.9]},"detail5":{"section_segments":6,"offset":{"x":0,"y":40,"z":21},"position":{"x":[0,0,0,0,0,0],"y":[-12,-12,0,15,17,17],"z":[3,3,0,0,0,0]},"width":[0,6,11,11,8,0],"height":[0,3,10,10,7,0],"propeller":false,"texture":[4,9,63]},"detail6":{"section_segments":6,"offset":{"x":1,"y":40,"z":21},"position":{"x":[0,0,0,0],"y":[2,2,13,13],"z":[0,0,0,0]},"width":[0,10.3,10.3,0],"height":[0,9.8,9.8,0],"propeller":false,"texture":[3.9,9,3.9]},"detail7":{"section_segments":6,"offset":{"x":15,"y":18,"z":-43},"position":{"x":[0,0,0,0,0],"y":[-2,1,1,-2,-2],"z":[0,0,0,0,0]},"width":[7,7,5,5,7],"height":[15,15,11,11,15],"texture":[3.9,16.9,3.9],"vertical":true},"detail8":{"section_segments":6,"offset":{"x":28,"y":73,"z":4},"position":{"x":[0,0,0,0,0,0],"y":[-5,-5,20,22,15],"z":[0,0,0,0,0,0]},"width":[0,10,7,5.5,0],"height":[0,7,5,4,0],"texture":[63,63,16.9],"propeller":true,"angle":0},"detail9":{"section_segments":6,"offset":{"x":11,"y":75,"z":4},"position":{"x":[0,0,0,0,0],"y":[-20,15,20,22,15],"z":[0,0,0,0,0]},"width":[12,12,11,8,0],"height":[7,7,5,4,0],"propeller":true,"texture":[3.9,8.2,63,16.9]},"detail10":{"section_segments":6,"offset":{"x":19,"y":-90,"z":16},"position":{"x":[0,0,0,0,0,2,7,7],"y":[35,35,50,105,120,135,155,155],"z":[0.5,0.5,-3,-6,-9,-12,-16]},"width":[0,5,5,5,8,10,13,0],"height":[0,3,5,5,5,5,5,0],"texture":[4,63,15,3.99]},"detail11":{"section_segments":6,"offset":{"x":54.5,"y":36,"z":-3},"position":{"x":[0,0,0,0,0],"y":[-10,-13,-10,20,20],"z":[0,0,0,0,0]},"width":[0,2,3,3,0],"height":[0,2,3,3,0],"texture":[3.9,0.9,8.2],"laser":{"damage":[25,25],"rate":1.6,"type":1,"speed":[220,220],"number":1,"error":0}},"detail12":{"section_segments":[45,135,225,315],"offset":{"x":17,"y":-91,"z":22},"position":{"x":[-3.5,0,0,0,0,0,0],"y":[-8,-5,-4,22,27,30,30],"z":[0,0,0,0,0,0,0]},"width":[0,5,5,5,5,5,0],"height":[0.5,0.5,0.5,1.5,1.5,1.5,0],"texture":[4,1,12,11,63],"laser":{"damage":[45,45],"rate":1.6,"type":1,"speed":[220,220],"number":1}},"detail13":{"section_segments":[45,135,225,315],"offset":{"x":17,"y":-95,"z":18.6},"position":{"x":[-5,0,0,0],"y":[-10,-5,5,5],"z":[0,0,0,0]},"width":[0,7,7,0],"height":[0.7,0.7,0.7,0],"texture":[63]},"detail14":{"section_segments":6,"offset":{"x":16.5,"y":-88,"z":19},"position":{"x":[0,0,0,0,0],"y":[-15,-20,0,13,10],"z":[0,0,0,0,0]},"width":[0,3,3,2,0],"height":[0,2,2,1,0],"texture":[3.9,3.9,16.9,3.9],"angle":180},"detail15":{"section_segments":10,"offset":{"x":0,"y":12,"z":-69},"position":{"x":[0,0,0,0,0,0,0],"y":[0,10.5,11,10,11,11],"z":[0,0,0,0,0,0,0]},"width":[9,9,7.5,4,1.5,0],"height":[9,9,7.5,4,1.5,0],"texture":[4,63,18,17,4],"vertical":true},"detail16":{"section_segments":6,"offset":{"x":0,"y":34,"z":4},"position":{"x":[1,1,1,1,1,1,1,1],"y":[25,25,30,33,40,45,55,50],"z":[0,0,0,0,0,0,0,0]},"width":[0,42,45,45,45,45,30,0],"height":[0,15,18,18,18,18,13,0],"texture":[0.9,10.41,4,11,63,3.9,3.9,3.9]},"detail17":{"section_segments":6,"offset":{"x":41,"y":-3,"z":-34},"position":{"x":[0,0,0,0,0,0,0],"y":[0,10.5,11,10,11,11],"z":[0,0,0,0,0,0,0]},"width":[5,5,4,3,1.5,0],"height":[5,5,4,3,1.5,0],"texture":[3.9,63,3.9,16.9,3.9],"vertical":true,"angle":15},"detail18":{"section_segments":6,"offset":{"x":41,"y":-2,"z":-45},"position":{"x":[0,0,0,0,0,0,0],"y":[0,10.5,11,10,11,11],"z":[0,0,0,0,0,0,0]},"width":[5,5,4,3,1.5,0],"height":[5,5,4,3,1.5,0],"texture":[3.9,63,3.9,16.9,3.9],"vertical":true,"angle":15},"detail19":{"section_segments":6,"offset":{"x":0,"y":-10,"z":-1},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[40,40,36,36,40],"height":[10,10,6,6,10],"texture":[63]},"detail20":{"section_segments":6,"offset":{"x":0,"y":0,"z":-1},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[40,40,36,36,40],"height":[10,10,6,6,10],"texture":[63]},"detail21":{"section_segments":6,"offset":{"x":0,"y":10,"z":-1},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[40,40,36,36,40],"height":[10,10,6,6,10],"texture":[63]},"detail22":{"section_segments":6,"offset":{"x":0,"y":20,"z":-1},"position":{"x":[0,0,0,0,0],"y":[-3,3,3,-3,-3],"z":[0,0,0,0,0]},"width":[40,40,36,36,40],"height":[10,10,6,6,10],"texture":[63]},"detail23":{"section_segments":6,"offset":{"x":28,"y":50,"z":6},"position":{"x":[15,15,0],"y":[-5,5,20],"z":[-1,-1,-5]},"width":[3,3,3],"height":[2,3,2],"texture":[3]},"detail24":{"section_segments":[0,60,120,180],"offset":{"x":-2,"y":-4,"z":10},"position":{"x":[0,0,0,0,0],"y":[-10,-10,8.7,10,10],"z":[0,0,0,0,0]},"width":[0,15,15,15,0],"height":[0,10,10,10,0],"texture":[3.9,12,3.9]},"detail25":{"section_segments":6,"offset":{"x":0,"y":0,"z":12},"position":{"x":[0,0,0,0,0,0],"y":[-3,-3,-2,2,3,3],"z":[0,0,0,0,0,0]},"width":[0,15,15,15,15,0],"height":[0,10,10,10,10,0],"texture":[3.9,3.9,11,3.9,3.9]},"detail26":{"section_segments":6,"offset":{"x":0,"y":-8,"z":12},"position":{"x":[0,0,0,0,0,0],"y":[-3,-3,-2,2,3,3],"z":[0,0,0,0,0,0]},"width":[0,15,15,15,15,0],"height":[0,10,10,10,10,0],"texture":[3.9,3.9,11,3.9,3.9]}},"wings":{"detail":{"doubleside":true,"offset":{"x":35.5,"y":21,"z":1},"length":[0,18],"width":[25,105,25],"angle":[0,6],"position":[0,-20,15],"texture":[4],"bump":{"position":15,"size":8}},"detail2":{"doubleside":true,"offset":{"x":12,"y":-70,"z":19},"length":[0,10,7],"width":[0,55,50,0],"angle":[0,0,0],"position":[0,-2.5,0,30],"texture":[4,4,3.7],"bump":{"position":45,"size":10}},"detail3":{"doubleside":true,"offset":{"x":5,"y":-15,"z":7},"length":[5,2,10],"width":[0,50,50,0],"angle":[0,0,0],"position":[0,0,0,20],"texture":[63,17,8],"bump":{"position":35,"size":14}},"detail4":{"doubleside":true,"offset":{"x":12,"y":-73,"z":19},"length":[0,10,7],"width":[0,55,50,0],"angle":[0,0,0],"position":[0,-2.5,0,30],"texture":[4,63,4],"bump":{"position":45,"size":5}},"detail5":{"doubleside":true,"offset":{"x":12,"y":-67,"z":19},"length":[0,10,7],"width":[0,55,50,0],"angle":[0,0,0],"position":[0,-2.5,0,28],"texture":[4,1,1],"bump":{"position":40,"size":10}},"detail6":{"doubleside":true,"offset":{"x":35.5,"y":21,"z":0},"length":[0,18],"width":[25,105,25],"angle":[0,6],"position":[0,-20,15],"texture":[63],"bump":{"position":15,"size":10}},"detail7":{"doubleside":true,"offset":{"x":23,"y":35,"z":0},"length":[5,3,24,10,0],"width":[40,142,142,40,23,0],"angle":[0,0,0,0,0],"position":[0,-35,-35,25,45,45],"texture":[3.9,17,11,63],"bump":{"position":25,"size":8}},"detail8":{"doubleside":true,"offset":{"x":23,"y":36,"z":0},"length":[5,3,24,10,0],"width":[40,142,142,40,23,0],"angle":[0,0,0,0,0],"position":[0,-35,-35,25,45,45],"texture":[4,4,11,1],"bump":{"position":25,"size":8}}},"typespec":{"name":"Himera","level":7,"model":4,"code":704,"specs":{"shield":{"capacity":[550,550],"reload":[16,16]},"generator":{"capacity":[600,600],"reload":[175,175]},"ship":{"mass":550,"speed":[70,70],"rotation":[25,25],"acceleration":[90,90]}},"shape":[1.473,7.398,7.219,5.596,5.168,4.51,4.07,3.743,3.508,3.371,3.285,3.269,3.337,3.459,3.677,3.957,4.551,4.933,5.849,7.135,7.914,6.564,7.034,6.992,6.905,6.803,6.905,6.992,7.034,6.564,7.914,7.135,5.849,4.933,4.551,3.957,3.677,3.459,3.337,3.269,3.285,3.371,3.508,3.743,4.07,4.51,5.168,5.596,7.219,7.398],"lasers":[{"x":0,"y":-1.47,"z":0.49,"angle":0,"damage":[45,45],"rate":3.2,"type":1,"speed":[220,220],"number":1,"spread":0,"error":0,"recoil":0},{"x":3.815,"y":1.61,"z":-0.21,"angle":0,"damage":[25,25],"rate":1.6,"type":1,"speed":[220,220],"number":1,"spread":0,"error":0,"recoil":0},{"x":-3.815,"y":1.61,"z":-0.21,"angle":0,"damage":[25,25],"rate":1.6,"type":1,"speed":[220,220],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.945,"y":-6.93,"z":1.54,"angle":0,"damage":[45,45],"rate":1.6,"type":1,"speed":[220,220],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.945,"y":-6.93,"z":1.54,"angle":0,"damage":[45,45],"rate":1.6,"type":1,"speed":[220,220],"number":1,"spread":0,"error":0,"recoil":0}],"radius":7.914}}';
var Chronos_R35_705 = '{"name":"Chronos-R35","level":7,"model":5,"size":4.5,"zoom":1.25,"specs":{"shield":{"capacity":[750,750],"reload":[18,18]},"generator":{"capacity":[425,425],"reload":[100,100]},"ship":{"mass":800,"speed":[40,40],"rotation":[20,20],"acceleration":[55,55]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":-20,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-53,-53,-55,-55,-50,-40,-37,-8,-5,2,5,5,25,25,30,32.5,50,60,77.5,80,90,81,81],"z":[-3,-3,-3,-3,-3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[12,12,12,14,17,20,20,20,20,19,17,9,9,20,24,24,24,24,24,24,18,16,0],"height":[0,3,3,5,10,16,16,16,16,12,8,6,6,13,16,16,16,16,16,16,10,8,0],"texture":[15,3.9,63,3.9,11,63,10,63,10.241,63,4,15,3.9,11,63,0.9,8,0.9,63,3.9]},"detail2":{"section_segments":6,"offset":{"x":0,"y":40,"z":10},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-30,-30,-25,-22,-5,12,20,20],"z":[-2,-2,0,0,0,0,-2,-2]},"width":[0,13,17,17,17,17,13,0],"height":[0,10,13,13,13,13,8.5,0],"texture":[3.9,3.9,8.2,3.9,10,63]},"detail3":{"section_segments":6,"offset":{"x":0,"y":28,"z":15},"position":{"x":[1,1,1,1,0,0,0,0,0,0],"y":[-10,-10,-5,10,15,25,32,40,43,30],"z":[4,4,2,2,4,4,0,0,0,0]},"width":[0,5,8,8,7,7,10,10,7,0],"height":[0,4,7,7,4,4,5,5,4,0],"propeller":true,"texture":[7,9.25,9.25,63,12,63,18,16.9]},"detail4":{"section_segments":6,"offset":{"x":0,"y":28,"z":15},"position":{"x":[-1,-1,-1,-1,0,0,0],"y":[-10,-10,-5,10,15,25,25],"z":[4,4,2,2,4,0,0]},"width":[0,5,8,8,7,7,0],"height":[0,4,7,7,4,4,0],"texture":[7,9.15,9.15,63,12]},"detail5":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":28,"z":18},"position":{"x":[0,0,0,0,0],"y":[-10,-10,-5,10,15],"z":[0,0,0,0,0]},"width":[0,2,2,2,0],"height":[0,7,9,9,7],"texture":[63]},"detail6":{"section_segments":6,"offset":{"x":7,"y":55,"z":0},"position":{"x":[0,0,0,0,0],"y":[-20,15,20,22,15],"z":[0,0,0,0,0]},"width":[9,9,7,6,0],"height":[5,5,5,3,0],"propeller":true,"texture":[3.9,8.2,63,16.9]},"detail7":{"section_segments":[45,135,225,315],"offset":{"x":4,"y":6,"z":-35},"position":{"x":[0,0,0,-1,-1],"y":[-10,-10,10,15,15],"z":[0,0,0,0,0]},"width":[0,3,3,1,0],"height":[0,28,28,28,0],"texture":[4,4,17,4],"angle":70,"vertical":true},"detail8":{"section_segments":10,"offset":{"x":0,"y":13,"z":-48},"position":{"x":[0,0,0,0,0,0,0],"y":[0,11,11,10,11,11],"z":[0,0,0,0,0,0,0]},"width":[5,5,4,3,2,0],"height":[5,5,4,3,2,0],"texture":[4,4,17,4,18],"vertical":true},"detail9":{"section_segments":6,"offset":{"x":15,"y":20,"z":5},"position":{"x":[0,0,0,0,0,0],"y":[-2,0.7,2,2,-2,-2],"z":[0,0,0,0,0,0]},"width":[10,10,10,8,8,10],"height":[10,10,10,8,8,10],"texture":[3.9,63,3.9]},"detail10":{"section_segments":6,"offset":{"x":15,"y":25,"z":5},"position":{"x":[0,0,0,0,0,0],"y":[-2,0.7,2,2,-2,-2],"z":[0,0,0,0,0,0]},"width":[10,10,10,8,8,10],"height":[10,10,10,8,8,10],"texture":[3.9,63,3.9]},"detail11":{"section_segments":6,"offset":{"x":15,"y":50,"z":5},"position":{"x":[0,0,0,0,0,0],"y":[-2,0.7,2,2,-2,-2],"z":[0,0,0,0,0,0]},"width":[10,10,10,8,8,10],"height":[10,10,10,8,8,10],"texture":[3.9,63,3.9]},"detail12":{"section_segments":6,"offset":{"x":15,"y":45,"z":5},"position":{"x":[0,0,0,0,0,0],"y":[-2,0.7,2,2,-2,-2],"z":[0,0,0,0,0,0]},"width":[10,10,10,8,8,10],"height":[10,10,10,8,8,10],"texture":[3.9,63,3.9]},"detail13":{"section_segments":[45,135,225,315],"angle":55,"offset":{"x":19,"y":47,"z":0},"position":{"x":[0,0,0,0],"y":[-10,-10,15,15],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,2.9,2.9,0],"propeller":false,"texture":[4]},"detail14":{"section_segments":[0,60,120,180],"offset":{"x":-25.5,"y":40,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-10,-10,-8,8,10,10],"z":[0,0,0,0,0,0]},"width":[0,11,11,11,11,0],"height":[0,7.3,7.3,7.3,7.3,0],"texture":[3.9,17,10.24,17,3.9]},"detail15":{"section_segments":[0,60,120,180],"offset":{"x":-25.7,"y":40,"z":0},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-25,-25,-20,-17,17,20,25,25],"z":[0,0,0,0,0,0,0,0]},"width":[0,7,10,10,10,10,7,0],"height":[0,3,6,6,6,6,3,0],"texture":[3.9,3.9,63,15,63,3.9,3.9]},"detail16":{"section_segments":[0,60,120,180],"offset":{"x":-32.5,"y":0,"z":-40},"position":{"x":[0,0,0,0,0,0],"y":[-2,2,2,2,-2,-2],"z":[0,0,0,0,0,0]},"width":[10,10,8,6,6,10],"height":[20,20,17,15,17,20],"texture":[3.9,3.9,63,3.9],"vertical":true},"detail17":{"section_segments":[45,135,225,315],"offset":{"x":-26.9,"y":40,"z":1},"position":{"x":[0,0,0,0],"y":[-20,-20,20,20],"z":[0,0,0,0]},"width":[0,2,2,0],"height":[0,9,9,0],"texture":[8]},"detail18":{"section_segments":6,"offset":{"x":0,"y":-5,"z":0},"position":{"x":[0,0,0,0,0],"y":[-3,-3,-2,2,3,3],"z":[0,0,0,0,0,0]},"width":[0,15,15,15,15,0],"height":[0,12,12,12,12,0],"texture":[3.9,3.9,8,3.9,3.9]},"detail19":{"section_segments":6,"offset":{"x":0,"y":1,"z":0},"position":{"x":[0,0,0,0,0],"y":[-1.5,1.5,1.5,-1.5,-1.5],"z":[0,0,0,0,0]},"width":[15,15,13,13,15],"height":[12,12,10,10,12],"texture":[16.9]},"detail20":{"section_segments":6,"offset":{"x":0,"y":-11,"z":0},"position":{"x":[0,0,0,0,0],"y":[-1.5,1.5,1.5,-1.5,-1.5],"z":[0,0,0,0,0]},"width":[15,15,13,13,15],"height":[12,12,10,10,12],"texture":[16.9]},"detail21":{"section_segments":[0,60,120,180],"offset":{"x":-29,"y":-62,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-30,-40,-5,-5,0,0,5,7,20,22,25,25],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,3,5,3,3,5,8,8,8,8,7,0],"height":[0,3,5,3,3,5,8,8,8,8,7,0],"texture":[3.9,0.9,3.9,3.9,3.9,0.9,63,11,63,0.9]},"detail22":{"section_segments":6,"offset":{"x":0,"y":-50,"z":18},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-16,-18,-15,-14,-4,-4,0,2,17.4,18,20,24,24],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,1.9,3,3,3,6,8,8,8,8,8,5,0],"height":[0,1.8,3,3,3,5,6,6,6,6,6,3,0],"laser":{"damage":[200,200],"rate":0.7,"type":1,"speed":[165,165],"number":1,"error":0,"recoil":100},"texture":[3.9,16.9,3.9,11,3.9,3.9,63,12,3.9,63,3.9]},"detail23":{"section_segments":[0,60,120,180],"offset":{"x":29,"y":-62,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-30,-40,-5,-5,3,3,8,10,17,19,22,22],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,3,5,3,3,5,8,8,8,8,7,0],"height":[0,3,5,3,3,5,5,6,6,6,5,0],"texture":[3.9,8,3.9,3.9,3.9,3.9,63,15,63,3.9]},"detail24":{"section_segments":6,"offset":{"x":33,"y":-45,"z":2},"position":{"x":[0,0,0,0,0,0],"y":[-2,0.7,2,2,-2,-2],"z":[0,0,0,0,0,0]},"width":[6,6,6,4,4,6],"height":[6,6,6,4,4,6],"texture":[3.9,63,3.9]},"detail25":{"section_segments":6,"offset":{"x":33,"y":-52,"z":2},"position":{"x":[0,0,0,0,0,0],"y":[-2,0.7,2,2,-2,-2],"z":[0,0,0,0,0,0]},"width":[6,6,6,4,4,6],"height":[6,6,6,4,4,6],"texture":[3.9,63,3.9]},"detail26":{"section_segments":6,"offset":{"x":29,"y":-103,"z":0},"position":{"x":[0,0,0,0],"y":[0,-1,1,1],"z":[0,0,0,0]},"width":[0,2,3,0],"height":[0,2,3,0],"laser":{"damage":[25,25],"rate":2,"type":1,"speed":[180,180],"number":1,"error":0}},"detail27":{"section_segments":[0,60,120,180],"offset":{"x":-2,"y":-50,"z":18},"position":{"x":[0,0,0,0,0],"y":[-32,-32,-30,0,0],"z":[0,0,0,0,0]},"width":[0,2,3.5,3.5,0],"height":[0,2,3.5,3.5,0],"texture":[63,63]},"detail28":{"vertical":true,"angle":25,"section_segments":[45,135,225,315],"offset":{"x":12,"y":12,"z":42.5},"position":{"x":[0,0,0,0,0],"y":[-5,-1,1,1,1],"z":[0,0,0,0,0]},"width":[5,5,5,3,3],"height":[20,20,15,13,0],"texture":[4,17.95,17,15]},"detail29":{"propeller":true,"section_segments":6,"offset":{"x":31,"y":-42,"z":0},"position":{"x":[0,0,0,0,0],"y":[-10,-10,6,10,5],"z":[0,0,0,0,0]},"width":[0,4,4,3,0],"height":[0,5,5,4,0],"texture":[3.9,3.9,63,16.9]}},"wings":{"detail":{"length":[0,14,0],"width":[0,25,25,0],"angle":[0,0,0],"position":[0,0,10,10],"doubleside":true,"offset":{"x":20,"y":37,"z":0},"bump":{"position":20,"size":5},"texture":[11]},"detail2":{"length":[20],"width":[10,20],"angle":[-50],"position":[5,0],"doubleside":true,"offset":{"x":0,"y":-42,"z":18},"bump":{"position":40,"size":50},"texture":[4]},"detail3":{"length":[25,0],"width":[15,15,0],"angle":[0,0],"position":[0,0,0],"doubleside":true,"offset":{"x":0,"y":-48,"z":-1},"bump":{"position":30,"size":15},"texture":[10]}},"typespec":{"name":"Chronos-R35","level":7,"model":5,"code":705,"specs":{"shield":{"capacity":[750,750],"reload":[18,18]},"generator":{"capacity":[425,425],"reload":[100,100]},"ship":{"mass":800,"speed":[40,40],"rotation":[20,20],"acceleration":[55,55]}},"shape":[7.388,7.187,9.76,9.256,6.984,6.034,5.392,1.602,1.373,1.334,1.257,1.207,1.17,1.178,1.191,1.847,3.442,4.549,5.079,5.801,5.997,6.511,6.464,6.657,7.016,6.944,7.016,6.657,6.464,6.511,5.997,5.801,5.079,4.549,3.442,1.847,1.191,1.178,1.17,1.207,1.257,1.334,1.373,1.602,5.392,6.034,6.984,9.256,9.76,7.187],"lasers":[{"x":0,"y":-6.12,"z":1.62,"angle":0,"damage":[200,200],"rate":0.7,"type":1,"speed":[165,165],"number":1,"spread":0,"error":0,"recoil":100},{"x":2.61,"y":-9.36,"z":0,"angle":0,"damage":[25,25],"rate":2,"type":1,"speed":[180,180],"number":1,"spread":0,"error":0,"recoil":0},{"x":-2.61,"y":-9.36,"z":0,"angle":0,"damage":[25,25],"rate":2,"type":1,"speed":[180,180],"number":1,"spread":0,"error":0,"recoil":0}],"radius":9.76}}';
 
var Bomb_798 = '{"name":"Bomb","level":7.9,"model":8,"size":1.05,"teamMarkerSize":0,"specs":{"shield":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"generator":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"ship":{"mass":1e+300,"speed":[800,800],"rotation":[1e+300,1e+300],"acceleration":[1e+300,1e+300]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":0,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-65,-60,-50,-20,10,30,55,75,60],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,8,10,30,25,30,18,15,0],"height":[0,6,8,12,20,20,18,15,0],"propeller":true,"texture":[4,63,10,1,1,1,12,17]},"cockpit":{"section_segments":12,"offset":{"x":0,"y":0,"z":20},"position":{"x":[0,0,0,0,0,0,0],"y":[-15,0,20,30,60],"z":[0,0,0,0,0]},"width":[0,13,17,10,5],"height":[0,18,25,18,5],"propeller":false,"texture":[7,9,9,4,4]},"cannon":{"section_segments":6,"offset":{"x":0,"y":-15,"z":-10},"position":{"x":[0,0,0,0,0,0],"y":[-40,-50,-20,0,20,30],"z":[0,0,0,0,0,20]},"width":[0,5,8,11,7,0],"height":[0,5,8,11,10,0],"angle":0,"laser":{"damage":[10000000000000000000,10000000000000000000],"rate":2,"type":1,"speed":[160,180],"number":360,"angle":360},"propeller":false,"texture":[3,3,10,3]}},"wings":{"main":{"length":[60,20],"width":[100,50,40],"angle":[-10,10],"position":[0,20,10],"doubleside":true,"offset":{"x":0,"y":10,"z":5},"bump":{"position":30,"size":20},"texture":[11,63]}},"typespec":{"name":"Bomb","level":7.9,"model":8,"code":798,"specs":{"shield":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"generator":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"ship":{"mass":1e+300,"speed":[800,800],"rotation":[1e+300,1e+300],"acceleration":[1e+300,1e+300]}},"shape":[1.368,1.368,1.093,0.965,0.883,0.827,0.791,0.767,0.758,0.777,0.847,0.951,1.092,1.667,1.707,1.776,1.856,1.827,1.744,1.687,1.525,1.415,1.335,1.606,1.603,1.578,1.603,1.606,1.335,1.415,1.525,1.687,1.744,1.827,1.856,1.776,1.707,1.667,1.654,0.951,0.847,0.777,0.758,0.767,0.791,0.827,0.883,0.965,1.093,1.368],"lasers":[{"x":0,"y":-1.365,"z":-0.21,"angle":0,"damage":[10000000000000000000,10000000000000000000],"rate":2,"type":1,"speed":[160,180],"number":360,"spread":360,"error":0,"recoil":0}],"radius":1.856}}';
var Harpy_799 = '{"name":"Harpy","level":7.9,"model":9,"size":2.26,"specs":{"shield":{"capacity":[350,350],"reload":[25,25]},"generator":{"capacity":[425,425],"reload":[150,150]},"ship":{"mass":300,"speed":[130,130],"rotation":[125,125],"acceleration":[115,115]}},"bodies":{"detail":{"section_segments":6,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-75,-75,-70,-55,-20,-10,7,30,50,60,80,87,90,80],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,2,6,12,17,17,26,26,20,16,13,12,10,0],"height":[0,2,4,10,12,12,14,14,12,10,7,6,4,0],"propeller":true,"texture":[63,63,63,3.9,8,63,8,18,63,11,15,16.9]},"detail2":{"section_segments":6,"offset":{"x":0,"y":-5,"z":9},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-25,-10,4,20,22,27,33,33],"z":[0,0,0,0,0,0,3,3]},"width":[3,4,10,12,12,12,6,0],"height":[2,4,8,10,10,10,4,0],"propeller":false,"texture":[17,9,9,63,15,3.9]},"detail3":{"section_segments":6,"offset":{"x":0,"y":-36,"z":7},"position":{"x":[0,0,0,0,0],"y":[-19,-19,-13,13,13],"z":[0,0,-2,0,0]},"width":[0,4,8,8,0],"height":[0,3,6,6,0],"propeller":false,"texture":[0.9,0.9,10.245,0.9]},"detail4":{"section_segments":6,"offset":{"x":0,"y":-20,"z":0},"position":{"x":[15,15,15,15,15,15,15,15,15,15],"y":[-40,-50,-47,-45,-5,0,3,20,25,25],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,2,3,3.2,4,6,6,6,4,0],"height":[0,2,3,3.2,4,6,6,6,4,0],"angle":0,"laser":{"damage":[8,8],"rate":8,"type":1,"speed":[230,230],"number":1,"error":0},"propeller":false,"texture":[2.9,63,0.9,8.2,63,3.9,12.9]},"detail5":{"section_segments":6,"offset":{"x":58,"y":20,"z":5},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-35,-40,-35,-33,-18,-20,0,20,24,28,30,22],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,2,3,2,2,8,12,12,10,10,8,0],"height":[0,2,3,2,2,8,12,12,8,8,6,0],"angle":0,"laser":{"damage":[8,8],"rate":8,"type":1,"speed":[230,230],"number":1,"error":0},"propeller":true,"texture":[1,1,63,3.9,3.9,10.245,12,3.9,16.9,63,16.9]},"detail6":{"section_segments":[45,135,225,315],"offset":{"x":55,"y":5,"z":-30},"position":{"x":[0,0,0,0,0],"y":[-5,-5,15,17,17],"z":[0,0,0,0,0]},"width":[0,3,3,2,0],"height":[0,15,15,13,0],"texture":[63,17,63],"angle":90,"vertical":true},"detail7":{"section_segments":4,"offset":{"x":-58.5,"y":20,"z":12},"position":{"x":[-8.5,0,-10],"y":[-10,0,20],"z":[-1.5,-0.2,-0.2]},"width":[0,10,0],"height":[0,6,0],"texture":[4]},"detail8":{"section_segments":4,"offset":{"x":57.5,"y":20,"z":12},"position":{"x":[-8.5,0,-10],"y":[-10,0,20],"z":[-1.5,-0.2,-0.2]},"width":[0,10,0],"height":[0,6,0],"texture":[4]},"detail9":{"section_segments":[45,135,225,315],"offset":{"x":53,"y":2,"z":5},"position":{"x":[1,1,0,0,0],"y":[-10,-10,-4,20,20],"z":[0,0,0,0,0]},"width":[0,1,2,2,0],"height":[0,2,2,2,0],"texture":[63]},"detail10":{"section_segments":[45,135,225,315],"offset":{"x":63,"y":2,"z":5},"position":{"x":[-1,-1,0,0,0],"y":[-10,-10,-4,20,20],"z":[0,0,0,0,0]},"width":[0,1,2,2,0],"height":[0,2,2,2,0],"texture":[63]},"detail11":{"section_segments":10,"offset":{"x":58,"y":-7,"z":5},"position":{"x":[0,0,0,0,0],"y":[-2,2,2,-2,-2],"z":[0,0,0,0,0]},"width":[5,6,4,3,5],"height":[5,6,4,3,5],"texture":[17,4]},"detail12":{"section_segments":10,"offset":{"x":58,"y":5,"z":-34},"position":{"x":[0,0,0,0,0,0],"y":[7,13,12,14,14],"z":[0,0,0,0,0,0]},"width":[6,5,4,2,0],"height":[6,5,4,2,0],"texture":[4,17,8,4],"vertical":true},"detail13":{"section_segments":[45,135,225,315],"offset":{"x":-61,"y":5,"z":-30},"position":{"x":[0,0,0,0,0],"y":[-5,-5,15,17,17],"z":[0,0,0,0,0]},"width":[0,3,3,2,0],"height":[0,15,15,13,0],"texture":[63,17,63],"angle":90,"vertical":true},"detail14":{"section_segments":[0,60,120,180],"offset":{"x":-6,"y":5,"z":4},"position":{"x":[3.1,3.1,0,0,0,0,-8,-8],"y":[-28,-28,0,2,18,20,35,35],"z":[4.1,4.1,0,0,0,0,3,3]},"width":[0,5,15,15,15,15,5,0],"height":[0,3.8,14,14,14,14,3,0],"texture":[1,1,63,10,63,1]},"detail15":{"section_segments":6,"offset":{"x":0,"y":-20,"z":0},"position":{"x":[-15,-15,-15,-15,-15,-15,-15,-15,-15,-15],"y":[-40,-50,-47,-45,-5,0,3,20,25,25],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,2,3,3.2,4,6,6,6,4,0],"height":[0,2,3,3.2,4,6,6,6,4,0],"angle":0,"laser":{"damage":[8,8],"rate":8,"type":1,"speed":[230,230],"number":1,"error":0},"propeller":false,"texture":[2.9,63,0.9,8.2,63,3.9,12.9]},"detail16":{"section_segments":6,"offset":{"x":13,"y":21,"z":7},"position":{"x":[0,0,0,0,0,0],"y":[-2,0.7,2,2,-2,-2],"z":[0,0,0,0,0,0]},"width":[10,10,10,8,8,10],"height":[10,10,10,8,8,10],"texture":[3.9,63,3.9]},"detail17":{"section_segments":6,"offset":{"x":13,"y":9,"z":7},"position":{"x":[0,0,0,0,0,0],"y":[-2,0.7,2,2,-2,-2],"z":[0,0,0,0,0,0]},"width":[10,10,10,8,8,10],"height":[10,10,10,8,8,10],"texture":[3.9,63,3.9]},"detail18":{"section_segments":6,"offset":{"x":13,"y":15,"z":7},"position":{"x":[0,0,0,0,0,0],"y":[-2,0.7,2,2,-2,-2],"z":[0,0,0,0,0,0]},"width":[10,10,10,8,8,10],"height":[10,10,10,8,8,10],"texture":[3.9,63,3.9]},"detail19":{"section_segments":6,"offset":{"x":0,"y":-20,"z":0},"position":{"x":[15,15,15,15,15,15,15,15,15,15],"y":[-40,-50,-47,-45,-5,0,3,20,25,25],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,2,3,3.2,4,6,6,6,4,0],"height":[0,2,3,3.2,4,6,6,6,4,0],"angle":0,"laser":{"damage":[0.7,0.7],"rate":10,"type":1,"speed":[250,250],"number":1,"error":0},"propeller":false,"texture":[2.9,63,0.9,8.2,63,3.9,12.9]},"detail20":{"section_segments":6,"offset":{"x":0,"y":-20,"z":0},"position":{"x":[-15,-15,-15,-15,-15,-15,-15,-15,-15,-15],"y":[-40,-50,-47,-45,-5,0,3,20,25,25],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,2,3,3.2,4,6,6,6,4,0],"height":[0,2,3,3.2,4,6,6,6,4,0],"angle":0,"laser":{"damage":[0.7,0.7],"rate":10,"type":1,"speed":[250,250],"number":1,"error":0},"propeller":false,"texture":[2.9,63,0.9,8.2,63,3.9,12.9]}},"wings":{"detail":{"length":[60],"width":[60,15],"angle":[10],"position":[0,-20],"doubleside":true,"offset":{"x":0,"y":37,"z":-5},"bump":{"position":-37,"size":14},"texture":[4]},"detail2":{"length":[30],"width":[50,0],"angle":[45],"position":[0,45],"doubleside":true,"offset":{"x":0,"y":50,"z":0},"bump":{"position":45,"size":17},"texture":[63]},"detail3":{"length":[30],"width":[50,0],"angle":[-45],"position":[0,45],"doubleside":true,"offset":{"x":0,"y":50,"z":0},"bump":{"position":45,"size":17},"texture":[63]},"detail4":{"length":[40,0],"width":[40,15,0],"angle":[6,0],"position":[0,-12.5,-12.5],"doubleside":true,"offset":{"x":0,"y":34.5,"z":0},"bump":{"position":-45,"size":14},"texture":[17,63]},"detail5":{"length":[40,0],"width":[40,15,0],"angle":[6,0],"position":[0,-12.5,-12.5],"doubleside":true,"offset":{"x":0,"y":35.5,"z":0},"bump":{"position":-45,"size":14},"texture":[63]},"detail6":{"length":[10,1,5,0,-3,0],"width":[0,45,37,20,15,17,0],"angle":[90,90,90,90,90,90],"position":[0,0,0,-0.5,0,6,0],"doubleside":true,"offset":{"x":0,"y":53,"z":4},"bump":{"position":14,"size":28},"texture":[4,4,1,63,17,15]},"detail7":{"length":[60],"width":[60,15],"angle":[10],"position":[0,-20],"doubleside":true,"offset":{"x":0,"y":36,"z":-5},"bump":{"position":-37,"size":13},"texture":[1]}},"typespec":{"name":"Harpy","level":7.9,"model":9,"code":799,"specs":{"shield":{"capacity":[350,350],"reload":[25,25]},"generator":{"capacity":[425,425],"reload":[150,150]},"ship":{"mass":300,"speed":[130,130],"rotation":[125,125],"acceleration":[115,115]}},"shape":[3.391,3.221,3.253,2.615,1.929,1.537,1.355,1.252,1.127,1.041,2.847,2.87,2.913,3.022,3.177,3.499,3.705,3.713,3.711,3.301,2.462,2.5,2.58,4.4,4.205,4.076,4.205,4.4,2.58,2.5,2.462,3.301,3.711,3.713,3.705,3.499,3.177,3.022,2.935,2.87,2.847,1.041,1.127,1.252,1.355,1.537,1.929,2.615,3.253,3.221],"lasers":[{"x":0.678,"y":-3.164,"z":0,"angle":0,"damage":[8,8],"rate":8,"type":1,"speed":[230,230],"number":1,"spread":0,"error":0,"recoil":0},{"x":2.622,"y":-0.904,"z":0.226,"angle":0,"damage":[8,8],"rate":8,"type":1,"speed":[230,230],"number":1,"spread":0,"error":0,"recoil":0},{"x":-2.622,"y":-0.904,"z":0.226,"angle":0,"damage":[8,8],"rate":8,"type":1,"speed":[230,230],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.678,"y":-3.164,"z":0,"angle":0,"damage":[8,8],"rate":8,"type":1,"speed":[230,230],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.678,"y":-3.164,"z":0,"angle":0,"damage":[0.7,0.7],"rate":10,"type":1,"speed":[250,250],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.678,"y":-3.164,"z":0,"angle":0,"damage":[0.7,0.7],"rate":10,"type":1,"speed":[250,250],"number":1,"spread":0,"error":0,"recoil":0}],"radius":4.4}}';

var ships = [];
 
ships.push(Pegasus_301);
ships.push(Angel_Wing_302);
ships.push(Cayman_303);
ships.push(Hammer_304);

ships.push(Dragonfly_401);
ships.push(Stingray_402);
ships.push(Azimuth_403);
ships.push(Flash_Star_404);
ships.push(T_Rex_405);
ships.push(H_Conqueror_406);
ships.push(M_Defender_407);
ships.push(Simuran_408);

ships.push(Atlant_501);
ships.push(Vortex_502);
ships.push(Delta_Speedster_503);
ships.push(Hawk_504);
ships.push(Photon_505);
ships.push(Varan_506);
ships.push(Spark_507);
ships.push(Predator_508);
ships.push(Vampire_509);
ships.push(Berserker_510);

ships.push(Leviathan_601);
ships.push(Side_Destroyer_602);
ships.push(Falcon_603);
ships.push(Helius_604);
ships.push(Phoenix_605);
ships.push(Harpy_606);
ships.push(W_Warrior_607);
ships.push(Goliath_608);
ships.push(Centurion_609);
ships.push(Prometheus_610);
ships.push(Chronos_611);
ships.push(Cthulhu_612);

ships.push(V_Destroyer_701);
ships.push(Wasp_Sniper_702);
ships.push(Miles_703);
ships.push(Himera_704);
ships.push(Chronos_R35_705);

ships.push(Bomb_798);
ships.push(Harpy_799);
var ships_list = [
  
  ["Pegasus","Angel_Wing","Cayman","Hammer"],
  ["Dragonfly","Stingray","Azimuth","Flash_Star","T_Rex","H_Conqueror","M_Defender","Simuran"],
  ["Atlant","Vortex","Delta_Speedster","Hawk","Photon","Varan","Spark","Predator","Vampire","Berserker"],
  ["Leviathan","Side_Destroyer","Falcon","Helius","Phoenix","Harpy","W_Warrior","Goliath","Centurion","Prometheus","Chronos","Cthulhu"],
  ["V_Destroyer","Wasp_Sniper","Miles","Himera","Chronos_R35"]
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