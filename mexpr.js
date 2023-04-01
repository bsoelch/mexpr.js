class Box{
  constructor(x0,y0,x1,y1) {
    this.x0=x0;
    this.y0=y0;
    this.x1=x1;
    this.y1=y1;
    this.w=x1-x0;
    this.h=y1-y0;
  }
}

const frakturLetters=new Map([
["A","𝔄"],["B","𝔅"],["C","ℭ"],["D","𝔇"],["E","𝔈"],["F","𝔉"],["G","𝔊"],["H","ℌ"],["I","ℑ"],["J","𝔍"],["K","𝔎"],["L","𝔏"],["M","𝔐"],
["N","𝔑"],["O","𝔒"],["P","𝔓"],["Q","𝔔"],["R","ℜ"],["S","𝔖"],["T","𝔗"],["U","𝔘"],["V","𝔙"],["W","𝔚"],["X","𝔛"],["Y","𝔜"],["Z","ℨ"],
["a","𝔞"],["b","𝔟"],["c","𝔠"],["d","𝔡"],["d","𝔢"],["f","𝔣"],["g","𝔤"],["h","𝔥"],["i","𝔦"],["j","𝔧"],["k","𝔨"],["l","𝔩"],["m","𝔪"],
["n","𝔫"],["o","𝔬"],["p","𝔭"],["q","𝔮"],["r","𝔯"],["s","𝔰"],["t","𝔱"],["u","𝔲"],["v","𝔳"],["w","𝔴"],["x","𝔵"],["y","𝔶"],["z","𝔷"]]);
const doubleLetters=new Map([
["A","𝔸"],["B","𝔹"],["C","ℂ"],["D","𝔻"],["E","𝔼"],["F","𝔽"],["G","𝔾"],["H","ℍ"],["I","𝕀"],["J","𝕁"],["K","𝕂"],["L","𝕃"],["M","𝕄"],
["N","ℕ"],["O","𝕆"],["P","ℙ"],["Q","ℚ"],["R","ℝ"],["S","𝕊"],["T","𝕋"],["U","𝕌"],["V","𝕍"],["W","𝕎"],["X","𝕏"],["Y","𝕐"],["Z","ℤ"],
["a","𝕒"],["b","𝕓"],["c","𝕔"],["d","𝕕"],["e","𝕖"],["f","𝕗"],["g","𝕘"],["h","𝕙"],["i","𝕚"],["j","𝕛"],["k","𝕜"],["l","𝕝"],["m","𝕞"],
["n","𝕟"],["o","𝕠"],["p","𝕡"],["q","𝕢"],["r","𝕣"],["s","𝕤"],["t","𝕥"],["u","𝕦"],["v","𝕧"],["w","𝕨"],["x","𝕩"],["y","𝕪"],["z","𝕫"],
["0","𝟘"],["1","𝟙"],["2","𝟚"],["3","𝟛"],["4","𝟜"],["5","𝟝"],["6","𝟞"],["7","𝟟"],["8","𝟠"],["9","𝟡"],
["π","ℼ"],["γ","ℽ"],["Γ","ℾ"],["Π","ℿ"],["Σ","⅀"]]);
const scriptLetters=new Map([
["A","𝒜"],["B","ℬ"],["C","𝒞"],["D","𝒟"],["E","ℰ"],["F","ℱ"],["G","𝒢"],["H","ℋ"],["I","ℐ"],["J","𝒥"],["K","𝒦"],["L","ℒ"],["M","ℳ"],
["N","𝒩"],["O","𝒪"],["P","𝒫"],["Q","𝒬"],["R","ℛ"],["S","𝒮"],["T","𝒯"],["U","𝒰"],["V","𝒱"],["W","𝒲"],["X","𝒳"],["Y","𝒴"],["Z","𝒵"],
["a","𝒶"],["b","𝒷"],["c","𝒸"],["d","𝒹"],["e","ℯ"],["f","𝒻"],["g","ℊ"],["h","𝒽"],["i","𝒾"],["j","𝒿"],["k","𝓀"],["l","𝓁"],["m","𝓂"],
["n","𝓃"],["o","ℴ"],["p","𝓅"],["q","𝓆"],["r","𝓇"],["s","𝓈"],["t","𝓉"],["u","𝓊"],["v","𝓋"],["w","𝓌"],["x","𝓍"],["y","𝓎"],["z","𝓏"]]);
const monospaceLetters=new Map([
["A","𝙰"],["B","𝙱"],["C","𝙲"],["D","𝙳"],["E","𝙴"],["F","𝙵"],["G","𝙶"],["H","𝙷"],["I","𝙸"],["J","𝙹"],["K","𝙺"],["L","𝙻"],["M","𝙼"],
["N","𝙽"],["O","𝙾"],["P","𝙿"],["Q","𝚀"],["R","𝚁"],["S","𝚂"],["T","𝚃"],["U","𝚄"],["V","𝚅"],["W","𝚆"],["X","𝚇"],["Y","𝚈"],["Z","𝚉"],
["a","𝚊"],["b","𝚋"],["c","𝚌"],["d","𝚍"],["e","𝚎"],["f","𝚏"],["g","𝚐"],["h","𝚑"],["i","𝚒"],["j","𝚓"],["k","𝚔"],["l","𝚕"],["m","𝚖"],
["n","𝚗"],["o","𝚘"],["p","𝚙"],["q","𝚚"],["r","𝚛"],["s","𝚜"],["t","𝚝"],["u","𝚞"],["v","𝚟"],["w","𝚠"],["x","𝚡"],["y","𝚢"],["z","𝚣"],
["0","𝟶"],["1","𝟷"],["2","𝟸"],["3","𝟹"],["4","𝟺"],["5","𝟻"],["6","𝟼"],["7","𝟽"],["8","𝟾"],["9","𝟿"]]);

function replaceChars(text,charMap){
  let res=""
  for(let i=0;i<text.length;i++){
    let c=charMap.get(text.charAt(i));
    if(c===undefined)
      c=text.charAt(i);
    res+=c;
  }
  return res;
}

class MathElementStyle{
  constructor(src=undefined,parent=undefined) {
    if(src){
      this.color=src.color;
      this.sizeScale=src.sizeScale;
      this.baseFont=src.baseFont;
      this.isBold=src.isBold;
      this.isItalic=src.isItalic;
      this.textType=src.textType;
      this.baseSize=src.baseSize;
      this.opacity=src.opacity;
    }else{
      this.color=undefined;
      this.sizeScale=undefined;
      this.baseFont=undefined;
      this.isBold=undefined;
      this.isItalic=undefined;
      this.textType=undefined;
      this.baseSize=undefined;
      this.opacity=undefined;
    }
    if(parent){
      if(this.color===undefined)
        this.color=parent.color
      if(this.sizeScale===undefined){
        this.sizeScale=parent.sizeScale
      }else{
        this.sizeScale*=parent.sizeScale
      }
      if(this.baseFont===undefined)
        this.baseFont=parent.baseFont
      if(this.isBold===undefined)
        this.isBold=parent.isBold
      if(this.isItalic===undefined)
        this.isItalic=parent.isItalic
      if(this.textType===undefined)
        this.textType=parent.textType
      if(this.baseSize===undefined)
        this.baseSize=parent.baseSize
      if(this.opacity===undefined){
        this.opacity=parent.opacity
      }else{
        this.opacity*=parent.opacity
      }
    }
    if(this.color&&this.opacity<1){
      this.color=Color.fromString(this.color).transparent(this.opacity).color();
    }
  }

  getFormatedText(text){
    switch(this.textType||defaultFormat.textType){
      case "normal":
        return text;
      case "fraktur":
        return replaceChars(text,frakturLetters);
      case "double":
        return replaceChars(text,doubleLetters);
      case "script":
        return replaceChars(text,scriptLetters);
      case "mono":
        return replaceChars(text,monospaceLetters);
      default:
        console.log("unsupported text type: "+this.textType);
        return text;
    }
  }

  getFont(){
    let baseSize=(this.baseSize===undefined?defaultStyle.baseSize:this.baseSize);
    let fontType="";
    if(this.isItalic===undefined?defaultStyle.isItalic:this.isItalic)
      fontType+="italic ";
    if(this.isBold===undefined?defaultStyle.isBold:this.isBold)
      fontType+="bold ";
    return fontType+baseSize*(this.sizeScale||defaultStyle.sizeScale)+"px "+(this.baseFont||defaultStyle.baseFont);
  }
  updateSizeScale(factor){
    if(this.sizeScale){
      this.sizeScale*=factor;
    }else{
      this.sizeScale=factor;
    }
  }
}
const defaultStyle=new MathElementStyle();
defaultStyle.color="#ffffff";
defaultStyle.sizeScale=1.0;
defaultStyle.baseFont="math";
defaultStyle.isBold=false;
defaultStyle.isItalic=false;
defaultStyle.textType="normal";
defaultStyle.baseSize=50;
defaultStyle.opacity=1.0;

class MathElement {
  constructor(type,content, elements) {
    this.type=type;
    this.content = content;
    this.elts = elements;

    this.animate=true;
    this.id=undefined;
    this.classes=[];
    this.style=new MathElementStyle();
    this.computedStyle=undefined;
    this.formatedText=undefined;
    this.visible=true;
    this.drawElements=true;

    this.innerBox=undefined;
    this.outerBox=undefined;
    this.x=undefined;
    this.y=undefined;
  }
  forEach(f){
    f(this);
    if(this.elts)
      this.elts.forEach((e)=>{e.forEach(f)});
  }

  moveTo(x=0,y=0){
    this.moveElements(x-this.x,y-this.y);
    this.x=x;
    this.y=y;
  }
  moveBy(x=0,y=0){
    this.x+=x;
    this.y+=y;
    this.moveElements(x,y);
  }
  moveElements(x=0,y=0){
    if(this.elts!==undefined){
      this.elts.forEach((e)=>{e.moveBy(x,y)});
    }
  }
}


let opPadding=3;
let textPadding=2;
let parenWidth=10;
let parenHeight=5;
let fracPaddingX=5;
let fracPaddingY=8;
let fractionScale=0.9;
let exponentIndent=0.4;
let exponentScale=0.7;
let exponentPadding=3;
let powerPadding=2;
let underScale=0.6;
let underDistance=5;
let underPadding=3;
let rootScale=0.5;
let rootPadding=3;
let rootDistance=12;
let matrixPadding=4;
let matrixPaddingX=12;
let matrixPaddingY=16;

let integralScale=1.5;
let integralWidth=16;
let integralPadding=4;

let sizeScaleFactor=2;
let sumScaleFactor=Math.sqrt(2);

function measureMathElement(ctx,mathElement,parentStyle=defaultStyle){
  measureRecursive(ctx,mathElement,0,0,parentStyle);
}
function measureRecursive(ctx,mathElement,x,y,parentStyle=defaultStyle){
  mathElement.x=x;
  mathElement.y=y;
  mathElement.computedStyle=new MathElementStyle(mathElement.style,parentStyle);
  ctx.font=mathElement.computedStyle.getFont();
  let scale=mathElement.computedStyle.sizeScale;
  switch(mathElement.type){
    case "NUMBER":
    case "OPERATOR":
    case "VAR":{
      mathElement.formatedText=mathElement.computedStyle.getFormatedText(mathElement.content);
      let boxSize=ctx.measureText(mathElement.formatedText);
      let t_x0=boxSize.actualBoundingBoxLeft,t_x1=boxSize.actualBoundingBoxRight,t_y0=boxSize.actualBoundingBoxDescent,t_y1=boxSize.actualBoundingBoxAscent;
      let x0=0,x1=boxSize.width;
      if(mathElement.type=="OPERATOR"){
        let y0=-(t_y1+t_y0)/2,y1=(t_y1+t_y0)/2;
        mathElement.innerBox=new Box(x0,y0,x1,y1);
        mathElement.outerBox=new Box(x0-opPadding*scale,y0-opPadding*scale,x1+opPadding*scale,y1+opPadding*scale);
        mathElement.textYOffset=-t_y0-y0;
      }else{
        let y0=(1/3)*scale*mathElement.computedStyle.baseSize-t_y1,y1=(1/3)*scale*mathElement.computedStyle.baseSize+t_y0;
        mathElement.innerBox=new Box(x0,y0,x1,y1);
        mathElement.outerBox=new Box(x0-textPadding*scale,y0-textPadding*scale,x1+textPadding*scale,y1+textPadding*scale);
        mathElement.textYOffset=(1/3)*scale*mathElement.computedStyle.baseSize;
      }
      mathElement.x+=mathElement.innerBox.x0;
      }break;
    case "ROW":
    case "PAREN":{
      let x0=x;
      let minX=undefined,minY=Infinity,w=0,maxY=-Infinity;
      mathElement.elts.forEach((e)=>{
        measureRecursive(ctx,e,x0,y,mathElement.computedStyle);
        if(e.outerBox.x0!=0){
          e.moveBy(-e.outerBox.x0,0);
        }
        minY=Math.min(e.outerBox.y0,minY);
        maxY=Math.max(e.outerBox.y1,maxY);
        w+=e.outerBox.w;
        x0+=e.outerBox.w;
      });
      if(minY>maxY)
        minY=maxY=0;
      mathElement.innerBox=new Box(0,minY,w,maxY);
      if(mathElement.type=="PAREN"){
        mathElement.formatedText=mathElement.content[0]+""+mathElement.content[1];
        mathElement.outerBox=new Box(-parenWidth*scale,minY-parenHeight*scale,w+parenWidth*scale,maxY+parenHeight*scale);
      }else{
        mathElement.outerBox=mathElement.innerBox;
      }
      }break;
    case "FRAC":{// [a,b]
      let a=mathElement.elts[0];
      let b=mathElement.elts[1];
      measureRecursive(ctx,a,0,0,mathElement.computedStyle);
      measureRecursive(ctx,b,0,0,mathElement.computedStyle);
      mathElement.innerBox=new Box(
        Math.min(a.outerBox.x0,b.outerBox.x0),
        -a.outerBox.h-scale*fracPaddingY,
        Math.max(a.outerBox.x1,b.outerBox.x1),
        b.outerBox.h+scale*fracPaddingY);
      mathElement.outerBox=new Box(mathElement.innerBox.x0-fracPaddingX*scale,
        mathElement.innerBox.y0-fracPaddingY*scale,
        mathElement.innerBox.x1+fracPaddingX*scale,
        mathElement.innerBox.y1+fracPaddingY*scale);
      let cx=x+(mathElement.outerBox.x0+mathElement.outerBox.x1)/2,cy=y;
      a.moveTo(cx-(a.innerBox.x0+a.innerBox.x1)/2,cy-scale*fracPaddingY-a.outerBox.y1);
      b.moveTo(cx-(b.innerBox.x0+b.innerBox.x1)/2,cy+scale*fracPaddingY-b.outerBox.y0);
      }break;
    case "SUP":{//base exponent
      let base=mathElement.elts[0];
      let exp=mathElement.elts[1];
      x+=powerPadding*scale;
      measureRecursive(ctx,base,x,y,mathElement.computedStyle);
      measureRecursive(ctx,exp,x,y,mathElement.computedStyle);
      mathElement.innerBox=new Box(
        base.outerBox.x0,
        base.outerBox.y0-exp.outerBox.h+Math.min(exponentIndent*exp.computedStyle.baseSize*exp.computedStyle.sizeScale,base.outerBox.h/2,exp.outerBox.h),
        base.outerBox.x1+scale*exponentPadding+exp.outerBox.w,
        base.outerBox.y1
      );
      mathElement.outerBox=new Box(mathElement.innerBox.x0-powerPadding*scale,
        mathElement.innerBox.y0-powerPadding*scale,
        mathElement.innerBox.x1+powerPadding*scale,
        mathElement.innerBox.y1+powerPadding*scale);
      exp.moveBy(base.outerBox.x1-exp.outerBox.x0+scale*exponentPadding,mathElement.innerBox.y0-exp.outerBox.y0);
      }break;
    case "SUB":{//base subscript
      let base=mathElement.elts[0];
      let sub=mathElement.elts[1];
      x+=powerPadding*scale;
      measureRecursive(ctx,base,x,y,mathElement.computedStyle);
      measureRecursive(ctx,sub,x,y,mathElement.computedStyle);
      mathElement.innerBox=new Box(
        base.outerBox.x0,
        base.outerBox.y0,
        base.outerBox.x1+scale*exponentPadding+sub.outerBox.w,
        base.outerBox.y1+sub.outerBox.h-Math.min(exponentIndent*sub.computedStyle.baseSize*sub.computedStyle.sizeScale,base.outerBox.h/2,sub.outerBox.h)
      );
      mathElement.outerBox=new Box(mathElement.innerBox.x0-powerPadding*scale,
        mathElement.innerBox.y0-powerPadding*scale,
        mathElement.innerBox.x1+powerPadding*scale,
        mathElement.innerBox.y1+powerPadding*scale);
      sub.moveBy(base.outerBox.x1-sub.outerBox.x0+scale*exponentPadding,mathElement.innerBox.y1-sub.outerBox.y1);
      }break;
    case "SUBSUP":{//base subscript superscript
      let base=mathElement.elts[0];
      let sub=mathElement.elts[1];
      let sup=mathElement.elts[2];
      x+=powerPadding*scale;
      measureRecursive(ctx,base,x,y,mathElement.computedStyle);
      measureRecursive(ctx,sub,x,y,mathElement.computedStyle);
      measureRecursive(ctx,sup,x,y,mathElement.computedStyle);
      mathElement.innerBox=new Box(
        base.outerBox.x0,
        base.outerBox.y0-sup.outerBox.h+Math.min(exponentIndent*sup.computedStyle.baseSize*sup.computedStyle.sizeScale,base.outerBox.h/2,sup.outerBox.h),
        base.outerBox.x1+scale*exponentPadding+Math.max(sub.outerBox.w,sup.outerBox.w),
        base.outerBox.y1+sub.outerBox.h-Math.min(exponentIndent*sub.computedStyle.baseSize*sub.computedStyle.sizeScale,base.outerBox.h/2,sub.outerBox.h)
      );
      mathElement.outerBox=new Box(mathElement.innerBox.x0-powerPadding*scale,
        mathElement.innerBox.y0-powerPadding*scale,
        mathElement.innerBox.x1+powerPadding*scale,
        mathElement.innerBox.y1+powerPadding*scale);
      sup.moveBy(base.outerBox.x1-sup.outerBox.x0+scale*exponentPadding,mathElement.innerBox.y0-sup.outerBox.y0);
      sub.moveBy(base.outerBox.x1-sub.outerBox.x0+scale*exponentPadding,mathElement.innerBox.y1-sub.outerBox.y1);
      }break;
    case "UNDER":{// base under
      let base=mathElement.elts[0];
      let under=mathElement.elts[1];
      measureRecursive(ctx,base,x,y,mathElement.computedStyle);
      measureRecursive(ctx,under,x,y,mathElement.computedStyle);
      mathElement.innerBox=new Box(
        Math.min(base.outerBox.x0,under.outerBox.x0),
        base.outerBox.y0,
        Math.max(base.outerBox.x1,under.outerBox.x1),
        base.outerBox.y1+under.outerBox.h+underDistance*scale
      );
      mathElement.outerBox=new Box(mathElement.innerBox.x0-underPadding*scale,
        mathElement.innerBox.y0-underPadding*scale,
        mathElement.innerBox.x1+underPadding*scale,
        mathElement.innerBox.y1+underPadding*scale);
      let cx=x+(mathElement.outerBox.x0+mathElement.outerBox.x1)/2;
      base.moveTo(cx-(base.innerBox.x0+base.innerBox.x1)/2,y);
      under.moveTo(cx-(under.innerBox.x0+under.innerBox.x1)/2,base.y+base.outerBox.y1-under.outerBox.y0+underDistance);
      }break;
    case "OVER":{// base over
      let base=mathElement.elts[0];
      let over=mathElement.elts[1];
      measureRecursive(ctx,base,x,y,mathElement.computedStyle);
      measureRecursive(ctx,over,x,y,mathElement.computedStyle);
      mathElement.innerBox=new Box(
        Math.min(base.outerBox.x0,over.outerBox.x0),
        base.outerBox.y0-over.outerBox.h-underDistance*scale,
        Math.max(base.outerBox.x1,over.outerBox.x1),
        base.outerBox.y1
      );
      mathElement.outerBox=new Box(mathElement.innerBox.x0-underPadding*scale,
        mathElement.innerBox.y0-underPadding*scale,
        mathElement.innerBox.x1+underPadding*scale,
        mathElement.innerBox.y1+underPadding*scale);
      let cx=x+(mathElement.outerBox.x0+mathElement.outerBox.x1)/2;
      base.moveTo(cx-(base.innerBox.x0+base.innerBox.x1)/2,y);
      over.moveTo(cx-(over.innerBox.x0+over.innerBox.x1)/2,base.y+base.outerBox.y0-over.outerBox.y1-underDistance);
      }break;
    case "UNDEROVER":{
      let base=mathElement.elts[0];
      let under=mathElement.elts[1];
      let over=mathElement.elts[2];
      measureRecursive(ctx,base,x,y,mathElement.computedStyle);
      measureRecursive(ctx,over,x,y,mathElement.computedStyle);
      measureRecursive(ctx,under,x,y,mathElement.computedStyle);
      mathElement.innerBox=new Box(
        Math.min(base.outerBox.x0,Math.max(under.outerBox.x1,over.outerBox.x1)),
        base.outerBox.y0-over.outerBox.h-underDistance*scale,
        Math.max(base.outerBox.x1,Math.max(under.outerBox.x1,over.outerBox.x1)),
        base.outerBox.y1+under.outerBox.h+underDistance*scale
      );
      mathElement.outerBox=new Box(mathElement.innerBox.x0-underPadding*scale,
        mathElement.innerBox.y0-underPadding*scale,
        mathElement.innerBox.x1+underPadding*scale,
        mathElement.innerBox.y1+underPadding*scale);
      let cx=x+(mathElement.outerBox.x0+mathElement.outerBox.x1)/2;
      base.moveTo(cx-(base.innerBox.x0+base.innerBox.x1)/2,y);
      under.moveTo(cx-(under.innerBox.x0+under.innerBox.x1)/2,base.y+base.outerBox.y1-under.outerBox.y0+underDistance);
      over.moveTo(cx-(over.innerBox.x0+over.innerBox.x1)/2,base.y+base.outerBox.y0-over.outerBox.y1-underDistance);
      }break;
    case "INTEGRAL":{
      let under=mathElement.elts[0];
      let over=mathElement.elts[1];
      measureRecursive(ctx,under,x,y,mathElement.computedStyle);
      measureRecursive(ctx,over,x,y,mathElement.computedStyle);
      let integralHeight=integralScale*mathElement.computedStyle.baseSize*scale;
      mathElement.integralHeight=integralHeight;
      mathElement.innerBox=new Box(
        0,
        -integralHeight/2-over.outerBox.h-underDistance*scale,
        Math.max(integralWidth*scale,Math.max(under.outerBox.w,over.outerBox.w)),
        integralHeight/2+under.outerBox.h+underDistance*scale
      );
      mathElement.outerBox=new Box(mathElement.innerBox.x0-integralPadding*scale,
        mathElement.innerBox.y0-integralPadding*scale,
        mathElement.innerBox.x1+integralPadding*scale,
        mathElement.innerBox.y1+integralPadding*scale);
      let cx=x+(mathElement.outerBox.x0+mathElement.outerBox.x1)/2;
      under.moveTo(Math.max(x,cx-integralWidth*scale/2-under.outerBox.w),integralHeight/2-under.outerBox.y0+underDistance*scale);
      over.moveTo(Math.min(mathElement.innerBox.x1-over.innerBox.x1,cx+integralWidth*scale/2),-integralHeight/2-over.outerBox.y1-underDistance*scale);
      }break;
    case "ROOT":{//root value
      let root=mathElement.elts[0];
      let value=mathElement.elts[1];
      measureRecursive(ctx,root,x,y,mathElement.computedStyle);
      root.moveBy(-root.outerBox.x0,-root.outerBox.y1-rootPadding);
      measureRecursive(ctx,value,x,y,mathElement.computedStyle);
      value.moveBy(Math.max(root.outerBox.w,scale*rootDistance/3)+scale*rootDistance-value.outerBox.x0,0);
      mathElement.innerBox=new Box(
        0,
        Math.min(-root.outerBox.y1,value.outerBox.y0)-rootPadding,
        Math.max(root.outerBox.w,scale*rootDistance/3)+scale*rootDistance+value.outerBox.w,
        value.outerBox.y1
      );
      mathElement.outerBox=new Box(mathElement.innerBox.x0-rootPadding*scale,
        mathElement.innerBox.y0-rootPadding*scale,
        mathElement.innerBox.x1+rootPadding*scale,
        mathElement.innerBox.y1+rootPadding*scale);
      }break;
    case "VECTOR":{
      let maxW=0,h=matrixPaddingY*(mathElement.elts.length-1)*scale;
      mathElement.elts.forEach((e)=>{
        measureRecursive(ctx,e,0,0,mathElement.computedStyle);
        maxW=Math.max(e.outerBox.w,maxW);
        h+=e.outerBox.h;
      });
      mathElement.innerBox=new Box(0,-h/2,maxW,h/2);
      mathElement.outerBox=new Box(mathElement.innerBox.x0-matrixPadding*scale,
        mathElement.innerBox.y0-matrixPadding*scale,
        mathElement.innerBox.x1+matrixPadding*scale,
        mathElement.innerBox.y1+matrixPadding*scale);
      let cx=x+(mathElement.outerBox.x0+mathElement.outerBox.x1)/2;
      h=mathElement.innerBox.y0;
      mathElement.elts.forEach((e)=>{
        e.moveTo(cx-(e.outerBox.x0+e.outerBox.x1)/2,y+h-e.outerBox.y0);
        h+=e.outerBox.h+matrixPaddingY*scale;
      });
      }break;
    case "MATRIX":{
      let w=0;
      let rowHeights=new Array(mathElement.elts[0].elts.length).fill(0);
      mathElement.elts.forEach((e)=>{
        let maxW=0,h=matrixPaddingY*(e.elts.length-1)*scale;
        for(let r=0;r<e.elts.length;r++){
          f=e.elts[r];
          measureRecursive(ctx,f,x,y,mathElement.computedStyle);
          maxW=Math.max(f.outerBox.w,maxW);
          h+=f.outerBox.h;
          rowHeights[r]=Math.max(rowHeights[r],f.outerBox.h);
        };
        e.innerBox=new Box(0,-h/2,maxW,h/2);
        w+=maxW+matrixPaddingX*scale;
      });
      w-=matrixPaddingX*scale;//remove padding after last element
      let h=matrixPaddingY*(rowHeights.length-1)*scale;
      rowHeights.forEach((e)=>{h+=e;});
      mathElement.elts.forEach((e)=>{
        e.innerBox=new Box(e.innerBox.x0,-h/2,e.innerBox.x1,h/2);
        e.outerBox=e.innerBox;
      });
      mathElement.rowHeights=rowHeights;
      mathElement.innerBox=new Box(0,-h/2,w,h/2);
      mathElement.outerBox=new Box(mathElement.innerBox.x0-matrixPadding*scale,
        mathElement.innerBox.y0-matrixPadding*scale,
        mathElement.innerBox.x1+matrixPadding*scale,
        mathElement.innerBox.y1+matrixPadding*scale);
      //compute element positions
      w=mathElement.innerBox.x0;
      mathElement.elts.forEach((e)=>{
        let cx=x+w+(e.outerBox.x0+e.outerBox.x1)/2;
        let h=mathElement.innerBox.y0;
        for(let r=0;r<e.elts.length;r++){
          let f=e.elts[r];
          let cy=y+h+mathElement.rowHeights[r]/2;
          f.moveTo(cx-(f.outerBox.x0+f.outerBox.x1)/2,cy-(f.outerBox.y0+f.outerBox.y1)/2);
          h+=mathElement.rowHeights[r]+matrixPaddingY*scale;
        }
        w+=e.outerBox.w+matrixPaddingX*scale;
      });
      }break;
    case "SPACE":
      mathElement.outerBox=mathElement.innerBox;
      break;
    case "ACCENT":{
      let content=mathElement.elts[0];
      measureRecursive(ctx,content,x,y,mathElement.computedStyle);
      mathElement.innerBox=new Box(
        content.outerBox.x0,
        content.outerBox.y0,
        content.outerBox.x1,
        content.outerBox.y1
      );
      let accentHeight=10;
      switch(mathElement.content){
        case "^":case "~":
          accentHeight=10+0.04*content.outerBox.w;
          break;
        case ".": case "..":case "-":
          accentHeight=6;
          break;
      }
      mathElement.outerBox=new Box(mathElement.innerBox.x0,
        mathElement.innerBox.y0-accentHeight*scale,
        mathElement.innerBox.x1,
        mathElement.innerBox.y1);
      }break;
    case "FUNC":
    case "SUPERSCRIPT":
    case "SQRT":
      console.log("unresolved "+mathElement.type+" element");
      mathElement.innerBox=new Box(0,0,0,0);
      mathElement.outerBox=new Box(0,0,0,0);
      break;//functions will not be rendered
    default:
      console.log("unexpected element type:"+mathElement.type);
      break;
  }
}

function drawAccent(ctx,type,x0,y0,x1,y1){
  switch(type){
    case "^":
      ctx.beginPath();
      ctx.moveTo(x0,y1);
      ctx.lineTo((x0+x1)/2,y0);
      ctx.lineTo(x1,y1);
      ctx.stroke();
      break;
    case "-":
      ctx.beginPath();
      ctx.moveTo(x0,(y0+y1)/2);
      ctx.lineTo(x1,(y0+y1)/2);
      ctx.stroke();
      break;
    case "~":
      ctx.beginPath();
      ctx.moveTo(x0,(y0+2*y1)/3);
      ctx.bezierCurveTo((x0+x1)/2,y0-(y1-y0)/2,(x0+x1)/2,y1+(y1-y0)/2,x1,(2*y0+y1)/3);
      ctx.stroke();
      break;
    default:
      console.log("unsupported accent: '"+type+"'");
  }
}
function drawBrackets(ctx,type,x0,x1,y0,y0inner,y1inner,y1){
  let cy=(y0+y1)/2;
  let h=(y1-y0);
  let hInner=(y1inner-y0inner);
  switch(type){
    case "":
    case " ":
      break;
    case '(':
      ctx.beginPath();
      ctx.ellipse(x1+parenWidth,cy,2*parenWidth,hInner/Math.sqrt(3),0,2*Math.PI/3,-2*Math.PI/3);
      ctx.stroke();
      break;
    case ')':
      ctx.beginPath();
      ctx.ellipse(x0-parenWidth,cy,2*parenWidth,hInner/Math.sqrt(3),0,-Math.PI/3,Math.PI/3);
      ctx.stroke();
      break;
    case '[':
      ctx.beginPath();
      ctx.moveTo(x1,y0);
      ctx.lineTo((2*x0+x1)/3,y0);
      ctx.lineTo((2*x0+x1)/3,y1);
      ctx.lineTo(x1,y1);
      ctx.stroke();
      break;
    case ']':
      ctx.beginPath();
      ctx.moveTo(x0,y0);
      ctx.lineTo((x0+2*x1)/3,y0);
      ctx.lineTo((x0+2*x1)/3,y1);
      ctx.lineTo(x0,y1);
      ctx.stroke();
      break;
    case '⌊':
      ctx.beginPath();
      ctx.moveTo((2*x0+x1)/3,y0);
      ctx.lineTo((2*x0+x1)/3,y1);
      ctx.lineTo(x1,y1);
      ctx.stroke();
      break;
    case '⌋':
      ctx.beginPath();
      ctx.moveTo((x0+2*x1)/3,y0);
      ctx.lineTo((x0+2*x1)/3,y1);
      ctx.lineTo(x0,y1);
      ctx.stroke();
      break;
    case '⌈':
      ctx.beginPath();
      ctx.moveTo(x1,y0);
      ctx.lineTo((2*x0+x1)/3,y0);
      ctx.lineTo((2*x0+x1)/3,y1);
      ctx.stroke();
      break;
    case '⌉':
      ctx.beginPath();
      ctx.moveTo(x0,y0);
      ctx.lineTo((x0+2*x1)/3,y0);
      ctx.lineTo((x0+2*x1)/3,y1);
      ctx.stroke();
      break;
    case '|':
      ctx.beginPath();
      ctx.moveTo((x0+x1)/2,y0inner);
      ctx.lineTo((x0+x1)/2,y1inner);
      ctx.stroke();
      break;
    case '||':
      ctx.beginPath();
      ctx.moveTo((2*x0+x1)/3,y0inner);
      ctx.lineTo((2*x0+x1)/3,y1inner);
      ctx.moveTo((x0+2*x1)/3,y0inner);
      ctx.lineTo((x0+2*x1)/3,y1inner);
      ctx.stroke();
      break;
    case '<':
      ctx.beginPath();
      ctx.moveTo(x1,y0);
      ctx.lineTo(x0,(y0+y1)/2);
      ctx.lineTo(x1,y1);
      ctx.stroke();
      break;
    case '>':
      ctx.beginPath();
      ctx.moveTo(x0,y0);
      ctx.lineTo(x1,(y0+y1)/2);
      ctx.lineTo(x0,y1);
      ctx.stroke();
      break;
    case '{':
      ctx.beginPath();
      ctx.moveTo(x1,y0);
      ctx.bezierCurveTo(x0,y0,x1,(y0+y1)/2,x0,(y0+y1)/2);
      ctx.bezierCurveTo(x1,(y0+y1)/2,x0,y1,x1,y1);
      ctx.stroke();
      break;
    case '}':
      ctx.beginPath();
      ctx.moveTo(x0,y0);
      ctx.bezierCurveTo(x1,y0,x0,(y0+y1)/2,x1,(y0+y1)/2);
      ctx.bezierCurveTo(x0,(y0+y1)/2,x1,y1,x0,y1);
      ctx.stroke();
      break;
    case '[[':
      ctx.beginPath();
      ctx.moveTo(x1,y0);
      ctx.lineTo((2*x0+x1)/3,y0);
      ctx.lineTo((2*x0+x1)/3,y1);
      ctx.lineTo(x1,y1);
      ctx.moveTo((x0+2*x1)/3,y0);
      ctx.lineTo((x0+2*x1)/3,y1);
      ctx.stroke();
      break;
    case ']]':
      ctx.beginPath();
      ctx.moveTo(x0,y0);
      ctx.lineTo((x0+2*x1)/3,y0);
      ctx.lineTo((x0+2*x1)/3,y1);
      ctx.lineTo(x0,y1);
      ctx.moveTo((2*x0+x1)/3,y0);
      ctx.lineTo((2*x0+x1)/3,y1);
      ctx.stroke();
      break;
    case '/':
      ctx.beginPath();
      ctx.moveTo(x1,y0);
      ctx.lineTo(x0,y1);
      ctx.stroke();
      break;
    case '\\':
      ctx.beginPath();
      ctx.moveTo(x0,y0);
      ctx.lineTo(x1,y1);
      ctx.stroke();
      break;
    default:
      console.log("unsupported bracket: '"+type+"'");
  }
}
let drawBoundingBoxes=false;
function drawMathElementInternal(ctx,mathElement,x,y){
  let scale=mathElement.computedStyle.sizeScale;
  let baseX=x;
  let baseY=y;
  x+=mathElement.x;
  y+=mathElement.y;
  ctx.fillStyle=mathElement.computedStyle.color||"#ffffff";
  ctx.strokeStyle=mathElement.computedStyle.color||"#ffffff";
  ctx.lineWidth=Math.max(scale*2,3);
  ctx.font=mathElement.computedStyle.getFont();
  
  if(drawBoundingBoxes){
    ctx.strokeStyle="#ff0000";
    ctx.strokeRect(x+mathElement.outerBox.x0,y+mathElement.outerBox.y0,mathElement.outerBox.w,mathElement.outerBox.h);
    ctx.strokeStyle="#00ff00";
    ctx.strokeRect(x+mathElement.innerBox.x0,y+mathElement.innerBox.y0,mathElement.innerBox.w,mathElement.innerBox.h);
    ctx.strokeStyle="#ffffff";
  }
  if(mathElement.visible)
  switch(mathElement.type){
    case "NUMBER":
    case "OPERATOR":
    case "VAR":
      // zero line of text lies exactly at height -y0
      ctx.fillText(mathElement.formatedText,x,y+mathElement.textYOffset);
      break;
    case "ROW":
    case "PAREN":
      if(mathElement.type=="PAREN"){
        drawBrackets(ctx,mathElement.content[0],x+mathElement.outerBox.x0,x+mathElement.innerBox.x0,
          y+mathElement.outerBox.y0,y+mathElement.innerBox.y0,y+mathElement.innerBox.y1,y+mathElement.innerBox.y1);
        drawBrackets(ctx,mathElement.content[1],x+mathElement.innerBox.x1,x+mathElement.outerBox.x1,
          y+mathElement.outerBox.y0,y+mathElement.innerBox.y0,y+mathElement.innerBox.y1,y+mathElement.innerBox.y1);
      }
      break;
    case "FRAC":// [a,b]
      ctx.beginPath();
      ctx.moveTo(x+mathElement.innerBox.x0,y);
      ctx.lineTo(x+mathElement.innerBox.x1,y);
      ctx.stroke();
      break;
    case "SUP":
    case "SUB":
    case "UNDER":
    case "OVER":
    case "SUBSUP":
    case "UNDEROVER":
      break;
    case "INTEGRAL":{
      let cx=x+(mathElement.innerBox.x0+mathElement.innerBox.x1)/2;
      ctx.beginPath();
      ctx.moveTo(cx-integralWidth*scale/2,y+mathElement.integralHeight/2);
      ctx.bezierCurveTo(cx+integralWidth*scale/2,y+mathElement.integralHeight/2,
                        cx-integralWidth*scale/2,y-mathElement.integralHeight/2,
                        cx+integralWidth*scale/2,y-mathElement.integralHeight/2);
      ctx.stroke();
      }break;
    case "ROOT":{
      let root=mathElement.elts[0];
      ctx.beginPath();
      ctx.moveTo(x,y);
      ctx.lineTo(x+Math.max(root.outerBox.w,scale*rootDistance/3),y);
      ctx.lineTo(x+Math.max(root.outerBox.w,scale*rootDistance/3)+scale*rootDistance/3,y+mathElement.outerBox.y1);
      ctx.lineTo(x+Math.max(root.outerBox.w,scale*rootDistance/3)+scale*rootDistance,y+mathElement.outerBox.y0);
      ctx.lineTo(x+mathElement.outerBox.x1,y+mathElement.outerBox.y0);
      ctx.stroke();
    }break;
    case "VECTOR":{
      }break;
    case "MATRIX":{
      if(mathElement.drawElements)
      mathElement.elts.forEach((e)=>{
        e.elts.forEach((f)=>{
          drawMathElementInternal(ctx,f,baseX,baseY);
        });
      });
      }return;
    case "ACCENT":{
      drawAccent(ctx,mathElement.content,x+mathElement.innerBox.x0,y+mathElement.outerBox.y0,x+mathElement.innerBox.x1,y+mathElement.innerBox.y0);
      }break;
    case "SPACE":
      break;//do nothing
    case "SQRT":
    case "FUNC":
    case "SUPERSCRIPT":
      console.log("unresolved "+mathElement.type+" element");
      break;//functions will not be rendered
    default:
      console.log("unexpected element type:"+mathElement.type);
      break;
  }
  if(mathElement.drawElements&&mathElement.elts)
  mathElement.elts.forEach((e)=>{
    drawMathElementInternal(ctx,e,baseX,baseY);
  });
}
function drawMathElement(ctx,mathElement,x=100,y=100,style=defaultStyle){
  measureMathElement(ctx,mathElement,defaultStyle);
  drawMathElementInternal(ctx,mathElement,x,y);
}

function emptyElt(){
  return new MathElement("ROW",undefined,[]);
}
const operators=["+","-","*","·","×","÷",":","%","=",">","<","&","|","±",",","°"]// '/' '^' and '_' have special functions and therefore are excluded from operators explicitly excluded
const superscript=new Map([
  ["¹","1"],
  ["²","2"],
  ["³","3"],
  ["⁴","4"],
  ["⁵","5"],
  ["⁶","6"],
  ["⁷","7"],
  ["⁸","8"],
  ["⁹","9"],
  ["⁰","0"]
]);
const greek = new Map([
  ["Alpha", "Α"],
  ["Beta", "Β"],
  ["Chi", "Χ"],
  ["Delta", "Δ"],
  ["Epsilon", "Ε"],
  ["Eta", "Η"],
  ["Gamma", "Γ"],
  ["Iota", "Ι"],
  ["Kappa", "Κ"],
  ["Lambda", "Λ"],
  ["Mu", "Μ"],
  ["Nu", "Ν"],
  ["Omega", "Ω"],
  ["Omicron", "Ο"],
  ["Phi", "Φ"],
  ["Pi", "Π"],
  ["Psi", "Ψ"],
  ["Rho", "Ρ"],
  ["Sigma", "Σ"],
  ["Tau", "Τ"],
  ["Theta", "Θ"],
  ["Upsilon", "Υ"],
  ["Xi", "Ξ"],
  ["Zeta", "Ζ"],
  ["alpha", "α"],
  ["beta", "β"],
  ["chi", "χ"],
  ["delta", "δ"],
  ["epsilon", "ε"],
  ["eta", "η"],
  ["gamma", "γ"],
  ["iota", "ι"],
  ["kappa", "κ"],
  ["lambda", "λ"],
  ["mu", "μ"],
  ["nu", "ν"],
  ["omega", "ω"],
  ["omicron", "ο"],
  ["phi", "φ"],
  ["varphi", "φ"],
  ["pi", "π"],
  ["psi", "ψ"],
  ["rho", "ρ"],
  ["sigma", "σ"],
  ["tau", "τ"],
  ["theta", "θ"],
  ["upsilon", "υ"],
  ["xi", "ξ"],
  ["zeta", "ζ"]
]);
const constants = new Map([
 ["infty","∞"],
 ["e","𝑒"],
]);
const func_operators = new Map([
 ["pm","±"],
 ["times","×"],
 ["cdot","·"],
 ["in","∈"],
 ["to","→"],
 ["mapsto","↦"],
 ["ge","≥"],
 ["ne","≠"],
 ["le","≤"],
 ["xor","^"],
 ["divide","/"],
 ["implies","⇒"],
 ["or","∨"],
 ["and","∧"],
 ["exists","∃"],
 ["forall","∀"],
 ["union","⋃"],
 ["intersection","⋂"],
 ["Cap","⋂"],
 ["Cup","⋃"],
 ["cap","∩"],
 ["cup","∪"],
 //TODO? more operators
]);

class ParserState{
  constructor(){
    this.elements=[];
    this.openBrackets=[];
  }

  openBracket(left,right){
    if(this.left){
      this.left=false;
      this.openBrackets.at(-1)[1]=left;
      return;
    }
    if(this.right){
      this.right=false;
      this.elements.at(-1).content[1]=left;
      return;
    }
    this.openBrackets.push([this.elements,left,right]);
    this.elements=[];
  }
  closeBracket(name,chr=undefined){
    if(chr===undefined)
      chr=name;
    if(this.left){
      this.left=false;
      this.openBrackets.at(-1)[1]=chr;
      return;
    }
    if(this.right){
      this.right=false;
      this.elements.at(-1).content[1]=chr;
      return;
    }
    if(this.openBrackets.length==0){
      console.log("unexpected closing bracket: "+name);
      return;
    }
    let bracket=this.openBrackets.pop();
    if(bracket[2]!=name){
      console.log("mismatched bracket: "+name+" expected:"+bracket[2]);
    }
    bracket[0].push(new MathElement(bracket[2]=="}"?"ROW":"PAREN",[bracket[1],chr],parseElements(this.elements)));
    this.elements=bracket[0];
  }
}
function stringToElement(str){
  let elts=stringToElements(str);
  if(elts.length==1){
    return elts[0];
  }else{
    return new MathElement("ROW",["{","}"],elts);
  }
}
function finishWord(str,i0,i,state){
  let tmp=str.substring(i0,i);
  if(tmp.length==0)
    return i+1;
  if(tmp.charAt(0)=='\\'){
    tmp=tmp.substring(1);
    if(greek.has(tmp)){//greek letters
      state.elements.push(new MathElement("VAR",greek.get(tmp),undefined));
      state.left=false;state.right=false;
      return i+1;
    }
    if(constants.has(tmp)){//constants
      state.elements.push(new MathElement("VAR",constants.get(tmp),undefined));
      state.left=false;state.right=false;
      return i+1;
    }
    if(func_operators.has(tmp)){//constants
      state.elements.push(new MathElement("OPERATOR",func_operators.get(tmp),undefined));
      state.left=false;state.right=false;
      return i+1;
    }
    switch(tmp){
      case "":
        if(state.left||state.right)
          state.openBracket("\\");
        break;
      case "langle":
      case "lfloor":
      case "lceil":
      case "lnorm":
        state.openBracket(["<","⌊","⌈","||"][["langle","lfloor","lceil","lnorm"].indexOf(tmp)],"\\r"+tmp.substring(1));
        break;
      case "rangle":
      case "rfloor":
      case "rceil":
      case "rnorm":
        state.closeBracket("\\"+tmp,[">","⌋","⌉","||"][["rangle","rfloor","rceil","rnorm"].indexOf(tmp)]);
        break;
      case "left":
        state.openBrackets.push([state.elements,"","\\right"]);
        state.left=true;
        state.elements=[];
        break;
      case "right":
        state.closeBracket("\\"+tmp,"");
        state.right=true;
        break;
      default:
        state.left=false;state.right=false;
        state.elements.push(new MathElement("FUNC",tmp,undefined));
    }
    return i+1;
  }
  state.left=false;state.right=false;
  i0=0;
  while(/^[\d.]/.test(tmp[i0])){
    i0++;
  }
  if(i0>0){
    state.elements.push(new MathElement("NUMBER",tmp.substring(0,i0),undefined));
  }//no else
  if(i0<tmp.length){
    state.elements.push(new MathElement("VAR",tmp.substring(i0),undefined));
  }
  return i+1;
}
function stringToElements(str){
  let i0=0;
  let state=new ParserState();
  for(let i=0;i<str.length;i++){
    if(/^\s/.test(str[i])){//whitespace
      i0=finishWord(str,i0,i,state);
    }else if(operators.includes(str[i])){
      i0=finishWord(str,i0,i,state);
      if(state.left||state.right){
        state.openBracket(str[i]);
        continue;
      }
      state.elements.push(new MathElement("OPERATOR",str[i],undefined));
    }else if(superscript.has(str[i])){
      i0=finishWord(str,i0,i,state);
      state.left=state.right=false;
      let val=superscript.get(str[i]);
      if(state.elements.length>0&&state.elements.at(-1).type=="SUPERSCRIPT"){
        state.elements.at(-1).content+=val;
      }else{
        state.elements.push(new MathElement("SUPERSCRIPT",val,undefined));
      }
    }else{
      switch(str[i]){
        case "~":{
          i0=finishWord(str,i0,i,state);
          if(state.left||state.right){
            state.openBracket(" ");
            continue;
          }
          state.elements.push(new MathElement("VAR"," ",undefined));
          }break;
        case "/":
          i0=finishWord(str,i0,i,state);
          if(state.left||state.right){
            state.openBracket(str[i]);
            continue;
          }
          state.elements.push(new MathElement("FRAC",str[i],undefined));
          break;
        case "^":
          i0=finishWord(str,i0,i,state);
          state.left=state.right=false;
          state.elements.push(new MathElement("SUP",str[i],undefined));
          break;
        case "_":
          i0=finishWord(str,i0,i,state);
          state.left=state.right=false;
          state.elements.push(new MathElement("SUB",str[i],undefined));
          break;
        case "\\":
          i0=finishWord(str,i0,i,state)-1;//keep leading backslash
          break;
        case "(":
        case "[":
        case "{":
          i0=finishWord(str,i0,i,state);
          state.openBracket(str[i],")]}"["([{".indexOf(str[i])]);
          break;
        case ")":
        case "]":
        case "}":{
          i0=finishWord(str,i0,i,state);
          state.closeBracket(str[i]);
          }break;
      }
    }
  }
  if(i0<str.length){
    finishWord(str,i0,str.length,state);
  }
  while(state.openBrackets.length>0){
    let bracket=state.openBrackets.pop();
    console.log("missing closing bracket: "+bracket[2]);
    bracket[0].push(new MathElement(bracket[1]=="{"?"ROW":"PAREN",[bracket[1],bracket[2]],parseElements(state.elements)));
    state.elements=bracket[0];
  }
  return parseElements(state.elements);
}

function parseElements(elements){
  for(let i=elements.length-1;i>=0;i--){//parse function names
    if(elements[i].type=="FUNC"){
      funcName=elements[i].content;
      if(/^d*dot$/.test(funcName)){
        elements[i].type="OVER";
        let dot=new MathElement("OPERATOR",".".repeat(funcName.length-2),undefined);
        dot.style.sizeScale=2;
        elements[i].elts=[elements[i+1]||emptyElt(),dot];
        elements.splice(i+1,1);
        continue;
      }
      switch(funcName){
        case "space":
          elements[i].type="VAR";
          elements[i].content=" ";
          break;
        case "t"://tab
          elements[i].type="VAR";
          elements[i].content="    ";
          break;
        case "n"://newline
          elements[i].type="VAR";
          elements[i].content="\n";
          break;
        case "set":
        case "abs":
        case "floor":
        case "ceil":
        case "norm":
        case "cases":
          elements[i].type="PAREN";
          elements[i].content=[["{","}"],["|","|"],["⌊","⌋"],["⌈","⌉"],["||","||"],["{",""]][["set","abs","floor","ceil","norm","cases"].indexOf(funcName)];
          elements[i].elts=[elements[i+1]||emptyElt()];
          elements.splice(i+1,1);
          break;
        case "sup":
        case "inf":
        case "lim":
        case "liminf":
        case "limsup":{
          let body=elements[i];
          body.type="VAR";
          elements[i]=new MathElement("UNDER",undefined,[body,(elements[i+1]||emptyElt())]);
          elements[i].elts[1].style.updateSizeScale(underScale);
          elements.splice(i+1,1);
          }break;
        case "sum":
        case "prod":{
          elements[i].type="UNDEROVER";
          let from=elements[i+1]||emptyElt();
          let to=elements[i+2]||emptyElt();
          from.style.updateSizeScale(underScale);
          to.style.updateSizeScale(underScale);
          let center=new MathElement("OPERATOR",(funcName=="prod")?"∏":"∑",undefined);
          elements[i].style.sizeScale=sumScaleFactor;
          elements[i].elts=[center,from,to];
          elements.splice(i+1,2);
          }break;
        case "nary":{
          elements[i].type="UNDEROVER";
          let op=elements[i+1]||emptyElt();
          let from=elements[i+2]||emptyElt();
          let to=elements[i+3]||emptyElt();
          from.style.updateSizeScale(underScale);
          to.style.updateSizeScale(underScale);
          elements[i].style.sizeScale=sumScaleFactor;
          elements[i].elts=[op,from,to];
          elements.splice(i+1,3);
          }break;
        case "int":{
          elements[i].type="INTEGRAL";
          let from=elements[i+1]||emptyElt();
          let to=elements[i+2]||emptyElt();
          from.style.updateSizeScale(underScale);
          to.style.updateSizeScale(underScale);
          elements[i].elts=[from,to];
          elements.splice(i+1,2);
          }break;
        case "vector":
          elements[i].type=funcName.toUpperCase();
          elements[i].elts=(elements[i+1]||emptyElt()).elts;
          elements.splice(i+1,1);
          break;
        case "matrix":{
          elements[i].type=funcName.toUpperCase();
          let matrix=(elements[i+1]||emptyElt()).elts;
          let nrows=matrix.length;
          let ncolums=0;
          matrix.forEach((e)=>{
            ncolums=Math.max(ncolums,(e.elts||[]).length);
          });
          elements[i].elts=[];
          for(let c=0;c<ncolums;c++){
            elements[i].elts.push([]);
            for(let r=0;r<nrows;r++){
              if((matrix[r].elts||[]).length<=c){
                elements[i].elts[c].push(emptyElt());
                continue;
              }
              elements[i].elts[c].push(matrix[r].elts[c]);
            }
            elements[i].elts[c]=new MathElement("VECTOR",undefined,elements[i].elts[c]);
          }
          elements.splice(i+1,1);
          }break;
        case "root":
          elements[i].type=funcName.toUpperCase();
          elements[i].elts=[elements[i+1]||emptyElt(),elements[i+2]||emptyElt()];
          elements[i].elts[0].style.updateSizeScale(rootScale);
          elements.splice(i+1,2);
          break;
        case "under":
        case "over":
          elements[i].type=funcName.toUpperCase();
          elements[i].elts=[elements[i+1]||emptyElt(),elements[i+2]||emptyElt()];
          elements[i].elts[1].style.updateSizeScale(underScale);
          elements.splice(i+1,2);
          break;
        case "underover":
        case "subsup":
          elements[i].type=funcName.toUpperCase();
          elements[i].elts=[elements[i+1]||emptyElt(),elements[i+2]||emptyElt(),elements[i+3]||emptyElt()];
          elements[i].elts[1].style.updateSizeScale(underScale);
          elements[i].elts[2].style.updateSizeScale(underScale);
          elements.splice(i+1,3);
          break;
        case "subsup":
          elements[i].type=funcName.toUpperCase();
          elements[i].elts=[elements[i+1]||emptyElt(),elements[i+2]||emptyElt(),elements[i+3]||emptyElt()];
          elements[i].elts[1].style.updateSizeScale(exponentScale);
          elements[i].elts[2].style.updateSizeScale(exponentScale);
          elements.splice(i+1,3);
          break;
        case "sqrt":
          elements[i].type="ROOT";
          elements[i].elts=[emptyElt(),elements[i+1]||emptyElt()];
          elements[i].elts[0].style.updateSizeScale(rootScale);
          elements.splice(i+1,1);
          break;
        case "cbrt":
          elements[i].type="ROOT";
          elements[i].elts=[new MathElement("NUMBER","3",undefined),elements[i+1]||emptyElt()];
          elements[i].elts[0].style.updateSizeScale(rootScale);
          elements.splice(i+1,1);
          break;
        case "hat":
          elements[i].type="ACCENT";
          elements[i].content="^";
          elements[i].elts=[elements[i+1]||emptyElt()];
          elements.splice(i+1,1);
          break;
        case "bar":
          elements[i].type="ACCENT";
          elements[i].content="-";
          elements[i].elts=[elements[i+1]||emptyElt()];
          elements.splice(i+1,1);
          break;
        case "tilde":
          elements[i].type="ACCENT";
          elements[i].content="~";
          elements[i].elts=[elements[i+1]||emptyElt()];
          elements.splice(i+1,1);
          break;
        case "big":
          if(elements[i+1]){
            elements[i+1].style.updateSizeScale(sizeScaleFactor);
          }
          elements.splice(i,1);
          break;
        case "small":
          if(elements[i+1]){
            elements[i+1].style.updateSizeScale(1/sizeScaleFactor);
          }
          elements.splice(i,1);
          break;
        case "bold":
          if(elements[i+1]){
            elements[i+1].style.isBold=true;
          }
          elements.splice(i,1);
          break;
        case "italic":
          if(elements[i+1]){
            elements[i+1].style.isItalic=true;
          }
          elements.splice(i,1);
          break;
        case "plain":
          if(elements[i+1]){
            elements[i+1].style.isBold=false;
            elements[i+1].style.isItalic=false;
            elements[i+1].style.textType="normal";
          }
          elements.splice(i,1);
          break;
        //different script types
        case "double":
        case "script":
        case "fraktur":
        case "mono":
          if(elements[i+1]){
            elements[i+1].style.textType=funcName;
          }
          elements.splice(i,1);
          break;
        case "noanim":
          if(elements[i+1]){
            elements[i+1].animate=false;
          }
          elements.splice(i,1);
          break;
        case "color":
          if(elements[i+1]&&elements[i+2]){
            elements[i+2].style.color=elements[i+1].content;
          }
          elements.splice(i,2);
          break;
        case "id":
          if(elements[i+1]&&elements[i+2]){
            elements[i+2].id=elements[i+1].content;
          }
          elements.splice(i,2);
          break;
        case "class":
          if(elements[i+1]&&elements[i+2]){
            elements[i+2].classes.push(elements[i+1].content);
          }
          elements.splice(i,2);
          break;
        case "Class":
          if(elements[i+1]&&elements[i+2]){
            elements[i+2].forEach((e)=>e.classes.push(elements[i+1].content));
          }
          elements.splice(i,2);
          break;
        default:
          console.log("unknown function: '"+elements[i].content+"'");
          elements.splice(i,1);
      }
    }else if(elements[i].type=="SUPERSCRIPT"){
      elements[i].type="SUP";
      elements[i].elts=[elements[i-1]||emptyElt(),new MathElement("NUMBER",elements[i].content,undefined)]
      elements[i].elts[1].style.updateSizeScale(exponentScale);
      elements[i].content=undefined;
      elements.splice(i-1,1);
    }
  }
  for(let i=elements.length-1;i>=0;i--){
    if((elements[i].type=="SUB"||elements[i].type=="SUP")&&elements[i].content){
      elements[i].elts=[elements[i-1]||emptyElt(),elements[i+1]||emptyElt()];
      elements[i].elts[1].style.updateSizeScale(exponentScale);
      elements[i].content=undefined;//clear content of parsed elements
      if(i+1<elements.length)
        elements.splice(i+1,1);
      if(i>0)
        elements.splice(i-1,1);
    }
  }
  for(let i=elements.length-1;i>=0;i--){
    if((elements[i].type=="FRAC")&&elements[i].content){
      elements[i].elts=[elements[i-1]||emptyElt(),elements[i+1]||emptyElt()];
      elements[i].elts.forEach((e)=>{
        e.style.updateSizeScale(fractionScale);
      });
      elements[i].content=undefined;//clear content of parsed elements
      if(i+1<elements.length)
        elements.splice(i+1,1);
      if(i>0)
        elements.splice(i-1,1);
    }
  }
  let lines=[];
  for(let i=0;i<elements.length;i++){
    if(elements[i].type=="VAR"&&elements[i].content=="\n"){
       lines.push(new MathElement("ROW",undefined,elements.slice(0,i)));
       elements=elements.slice(i+1)
       i=0;
    }
  }
  if(lines.length>0){
    lines.push(new MathElement("ROW",undefined,elements));
    return [new MathElement("VECTOR",undefined,lines)];
  }
  return elements;
}
