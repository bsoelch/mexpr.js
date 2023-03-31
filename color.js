class Color{
  static WHITE=new Color(255,255,255);
  static BLACK=new Color(0,0,0);
  static RED=new Color(255,0,0);
  static GREEN=new Color(0,255,0);
  static BLUE=new Color(0,0,255);
  static CYAN=new Color(0,255,255);
  static MAGENTA=new Color(255,0,255);
  static YELLOW=new Color(255,255,0);
  static ORANGE=new Color(255,128,0);
  
  constructor(r,g,b,a=1){
    this.r=r;
    this.g=g;
    this.b=b;
    this.a=a;
  }
  static fromString(s){
    let r=0,g=0,b=0,a=1;
    s=s.trim();
    if(s[0]=='#'){
      s=s.substring(1);
      switch(s.length){
        case 3:
          r=parseInt(s[0],16)*0x11;
          g=parseInt(s[1],16)*0x11;
          b=parseInt(s[2],16)*0x11;
          break;
        case 4:
          r=parseInt(s[0],16)*0x11;
          g=parseInt(s[1],16)*0x11;
          b=parseInt(s[2],16)*0x11;
          a=parseInt(s[3],16)/0x10;
          break;
        case 6:
          r=parseInt(s.substring(0,2),16);
          g=parseInt(s.substring(2,4),16);
          b=parseInt(s.substring(4),16);
          break;
        case 8:
          r=parseInt(s.substring(0,2),16);
          g=parseInt(s.substring(2,4),16);
          b=parseInt(s.substring(4,6),16);
          a=parseInt(s.substring(6),16)/0x100;
          break;
        default:
          console.log("invalid format for hex color: "+s);
          return new Color(0,0,0,0);
      }
      if(isNaN(r)||isNaN(g)||isNaN(b)||isNaN(a)){
        console.log("invalid format for hex color: "+s);
        return new Color(0,0,0,0);
      }
      return new Color(r,g,b,a);
    }else if(s.startsWith("rgb")){
      s=s.substring(s.indexOf('(')+1);
      s=s.substring(0,s.length-1);
      let rgb=s.split(",");
      r=+rgb[0];
      g=+rgb[1];
      b=+rgb[2];
      if(rgb.length>3){
        a=+rgb[3];
      }
      if(isNaN(r)||isNaN(g)||isNaN(b)||isNaN(a)){
        console.log("invalid format for rgb color: "+s);
        return new Color(0,0,0,0);
      }
      return new Color(r,g,b,a);
    }else{//TODO use color map with knwon color names
      console.log("unknown color name: "+s);
      return new Color(0,0,0,0);
    }
  }
  
  transparent(alpha=0){
    return new Color(this.r,this.g,this.b,alpha);
  }
  color(){
    return `rgba(${this.r},${this.g},${this.b},${this.a})`;
  }
  lerp(target,lambda){
    return new Color(lerp(this.r,target.r,lambda),lerp(this.g,target.g,lambda),lerp(this.b,target.b,lambda),lerp(this.a,target.a,lambda));
  }
}
