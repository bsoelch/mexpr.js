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

class MathElement {
  constructor(type,content, elements) {
    this.type=type;
    this.content = content;
    this.elts = elements;
    this.color = undefined;
    this.animate=true
    this.attributes = new Map([]);
    this.innerBox=undefined;
    this.outerBox=undefined;
  }
  forEach(f){
    f(this);
    if(this.elts)
      this.elts.forEach((e)=>{e.forEach(f)});
  }
}


let opPadding=2;
let parenWidth=10;
let parenHeight=5;
let fracPaddingX=5;
let fracPaddingY=8;
let fractionScale=0.9;
let exponentIndent=0.4;
let exponentScale=0.7;
let exponentPadding=3;
let powerPadding=2;
let rootScale=0.5;
let rootPadding=3;
let rootDistance=12;

function measure(ctx,mathElement,baseSize=50,scale=1.0){
  ctx.font=baseSize*scale+"px math";
  switch(mathElement.type){
    case "NUMBER":
    case "OPERATOR":
    case "VAR":
      let boxSize=ctx.measureText(mathElement.content);
      let t_x0=boxSize.actualBoundingBoxLeft,t_x1=boxSize.actualBoundingBoxRight,t_y0=boxSize.actualBoundingBoxDescent,t_y1=boxSize.actualBoundingBoxAscent;
      let x0=0,x1=boxSize.width;
      if(mathElement.type=="OPERATOR"){
        let y0=-(t_y1-t_y0)/2,y1=(t_y1-t_y0)/2;
        mathElement.innerBox=new Box(x0,y0,x1,y1);
        mathElement.outerBox=new Box(x0-opPadding*scale,y0-opPadding*scale,x1+opPadding*scale,y1+opPadding*scale);
      }else{
        let y0=-(1/3)*scale*baseSize,y1=(1/3)*scale*baseSize+t_y0;//
        mathElement.innerBox=new Box(x0,y0,x1,y1);
        mathElement.outerBox=mathElement.innerBox;
      }
      break;
    case "ROW":
    case "PAREN":
      let minX=undefined,minY=Infinity,w=0,maxY=-Infinity;
      mathElement.elts.forEach((e)=>{
        measure(ctx,e,baseSize,scale);
        if(minX===undefined){
          minX=e.x0;
        }
        minY=Math.min(e.outerBox.y0,minY);
        maxY=Math.max(e.outerBox.y1,maxY);
        w+=e.outerBox.w;
      });
      if(minX===undefined)
        minX=0;
      if(minY>maxY)
        minY=maxY=0;
      mathElement.innerBox=new Box(minX,minY,w-minX,maxY);
      if(mathElement.type=="PAREN"){
        mathElement.outerBox=new Box(minX-parenWidth,minY-parenHeight,w-minX+parenWidth,maxY+parenHeight);
      }else{
        mathElement.outerBox=mathElement.innerBox;
      }
      break;
    case "FRAC":// [a,b]
      let a=mathElement.elts[0];
      let b=mathElement.elts[1];
      measure(ctx,a,baseSize,scale*fractionScale);
      measure(ctx,b,baseSize,scale*fractionScale);
      mathElement.innerBox=new Box(
        Math.min(a.outerBox.x0,b.outerBox.x0),
        -a.outerBox.h-scale*fracPaddingY,
        Math.max(a.outerBox.x1,b.outerBox.x1),
        b.outerBox.h+scale*fracPaddingY);
      mathElement.outerBox=new Box(mathElement.innerBox.x0-fracPaddingX*scale,
        mathElement.innerBox.y0-fracPaddingY*scale,
        mathElement.innerBox.x1+fracPaddingX*scale,
        mathElement.innerBox.y1+fracPaddingY*scale);
      break;      
    case "SUP":{//base exponent
      let base=mathElement.elts[0];
      let exp=mathElement.elts[1];
      measure(ctx,base,baseSize,scale);
      measure(ctx,exp,baseSize,scale*exponentScale);
      mathElement.innerBox=new Box(
        base.outerBox.x0,
        base.outerBox.y0-exp.outerBox.h+(exponentIndent*baseSize*scale*exponentScale),//set exponent half size below top line
        base.outerBox.x1+scale*exponentPadding+exp.outerBox.w,
        base.outerBox.y1
      );
      mathElement.outerBox=new Box(mathElement.innerBox.x0-powerPadding*scale,
        mathElement.innerBox.y0-powerPadding*scale,
        mathElement.innerBox.x1+powerPadding*scale,
        mathElement.innerBox.y1+powerPadding*scale);      
      }break;
    case "SUB":{//base subscript
      let base=mathElement.elts[0];
      let exp=mathElement.elts[1];
      measure(ctx,base,baseSize,scale);
      measure(ctx,exp,baseSize,scale*exponentScale);
      mathElement.innerBox=new Box(
        base.outerBox.x0,
        base.outerBox.y0,
        base.outerBox.x1+scale*exponentPadding+exp.outerBox.w,
        base.outerBox.y1+exp.outerBox.h-(exponentIndent*baseSize*scale*exponentScale)
      );
      mathElement.outerBox=new Box(mathElement.innerBox.x0-powerPadding*scale,
        mathElement.innerBox.y0-powerPadding*scale,
        mathElement.innerBox.x1+powerPadding*scale,
        mathElement.innerBox.y1+powerPadding*scale);      
      }break;
    //XXX SUBSUP
    case "ROOT"://root value
      let root=mathElement.elts[0];
      let value=mathElement.elts[1];
      measure(ctx,root,baseSize,scale*rootScale);
      measure(ctx,value,baseSize,scale);
      mathElement.innerBox=new Box(
        0,
        Math.min(-root.outerBox.y1,value.outerBox.y0)-rootPadding,
        Math.max(root.outerBox.w,rootDistance/3)+rootDistance+value.outerBox.w,
        value.outerBox.y1
      );
      mathElement.outerBox=mathElement.innerBox;//XXX padding
      break;
    case "UNDER":
    case "OVER":
    case "LIMITS":
    case "VECTOR":
    case "MATRIX":
      console.log("UNIMPLEMENTED:"+mathElement.type);
      break;
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
function drawMathElementInternal(ctx,mathElement,x,y,baseSize,scale=1.0){
  /*
  //DEBUG
  ctx.strokeStyle="#ff0000";
  ctx.strokeRect(x+mathElement.outerBox.x0,y+mathElement.outerBox.y0,mathElement.outerBox.w,mathElement.outerBox.h);
  ctx.strokeStyle="#00ff00";
  ctx.strokeRect(x+mathElement.innerBox.x0,y+mathElement.innerBox.y0,mathElement.innerBox.w,mathElement.innerBox.h);
  ctx.strokeStyle="#ffffff";
  //END DEBUG
  */
  ctx.font=baseSize*scale+"px math";
  switch(mathElement.type){
    case "NUMBER":
    case "OPERATOR":
    case "VAR":
      // zero line of text lies exactly at height -y0
      ctx.fillText(mathElement.content,x+mathElement.innerBox.x0,y-mathElement.innerBox.y0);
      break;
    case "ROW":
    case "PAREN":
      let x0=x;
      mathElement.elts.forEach((e)=>{
        let prevX0=x0;
        x0=prevX0-e.outerBox.x0;
        drawMathElementInternal(ctx,e,x0,y,baseSize,scale);
        x0=prevX0+e.outerBox.w;
      });
      if(mathElement.type=="PAREN"){//TODO improve drawing of parenthesis
        let cy=y+(mathElement.outerBox.y0+mathElement.outerBox.y1)/2;
        ctx.beginPath();
        ctx.ellipse(x,cy,parenWidth,mathElement.outerBox.h/2,0,2*Math.PI/3,-2*Math.PI/3);
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(x+mathElement.innerBox.w,cy,parenWidth,mathElement.outerBox.h/2,0,-Math.PI/3,Math.PI/3);
        ctx.stroke();
      }
      break;
    case "FRAC":// [a,b]
      let a=mathElement.elts[0];
      let b=mathElement.elts[1];
      let cx=x+(mathElement.outerBox.x0+mathElement.outerBox.x1)/2,cy=y;
      drawMathElementInternal(ctx,a,cx-(a.innerBox.x0+a.innerBox.x1)/2,cy-scale*fracPaddingY-a.outerBox.y1,baseSize,fractionScale*scale);
      drawMathElementInternal(ctx,b,cx-(b.innerBox.x0+b.innerBox.x1)/2,cy+scale*fracPaddingY-b.outerBox.y0,baseSize,fractionScale*scale);
      ctx.beginPath();
      ctx.moveTo(cx-mathElement.innerBox.w/2,cy);
      ctx.lineTo(cx+mathElement.innerBox.w/2,cy);
      ctx.stroke();
      break;
    case "SUP":{
      let base=mathElement.elts[0];
      let exp=mathElement.elts[1];
      x+=exponentPadding;
      drawMathElementInternal(ctx,base,x,y,baseSize,scale);
      drawMathElementInternal(ctx,exp,x+base.outerBox.x1-exp.outerBox.x0+scale*exponentPadding,y+mathElement.innerBox.y0-exp.outerBox.y0,baseSize,exponentScale*scale);
      }break;
    case "SUB":{
      let base=mathElement.elts[0];
      let sub=mathElement.elts[1];
      x+=exponentPadding;
      drawMathElementInternal(ctx,base,x,y,baseSize,scale);
      drawMathElementInternal(ctx,sub,x+base.outerBox.x1-sub.outerBox.x0+scale*exponentPadding,y+mathElement.innerBox.y1-sub.outerBox.y1,baseSize,exponentScale*scale);
      }break;
    case "ROOT":{
      let root=mathElement.elts[0];
      let val=mathElement.elts[1];
      drawMathElementInternal(ctx,root,x-root.outerBox.x0,y-root.outerBox.y1-rootPadding,baseSize,rootScale*scale);
      drawMathElementInternal(ctx,val,x+Math.max(root.outerBox.w,rootDistance/3)+rootDistance-val.outerBox.x0,y,baseSize,scale);
      ctx.beginPath();
      ctx.moveTo(x,y);
      ctx.lineTo(x+Math.max(root.outerBox.w,rootDistance/3),y);
      ctx.lineTo(x+Math.max(root.outerBox.w,rootDistance/3)+rootDistance/3,y+mathElement.outerBox.y1);
      ctx.lineTo(x+Math.max(root.outerBox.w,rootDistance/3)+rootDistance,y+mathElement.outerBox.y0);
      ctx.lineTo(x+mathElement.outerBox.x1,y+mathElement.outerBox.y0);
      ctx.stroke();
    }break;
    case "UNDER":
    case "OVER":
    case "LIMITS":
    case "VECTOR":
    case "MATRIX":
      console.log("UNIMPLEMENTED:"+mathElement.type);
      break;
    case "SQRT":
    case "FUNC":
    case "SUPERSCRIPT":
      console.log("unresolved "+mathElement.type+" element");
      break;//functions will not be rendered
    default:
      console.log("unexpected element type:"+mathElement.type);
      break;
  }
}
function drawMathElement(ctx,mathElement,x=100,y=100,baseSize=50){
  measure(ctx,mathElement,baseSize);
  ctx.lineWidth=3;
  ctx.fillStyle="#ffffff";//XXX make color customizable
  ctx.strokeStyle="#ffffff";
  drawMathElementInternal(ctx,mathElement,x,y,baseSize);
}

function emptyElt(){
  return new MathElement("ROW",undefined,[]);
}
const operators=["+","-","*","·","×","÷",":","%","=",">","<","&","|","±",","]// '/' '^' and '_' have special functions and therefore are excluded from operators explicitly excluded
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
  ["⁰","0"],
  ["⁻","-"]
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
]);
const func_operators = new Map([
 ["pm","±"],
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
 //TODO? more operators
]);



function finishWord(str,i0,i,elements){
  let tmp=str.substring(i0,i);
  i0=0;
  while(/^[\d.]/.test(tmp[i0])){
    i0++;
  }
  if(i0>0){
    elements.push(new MathElement("NUMBER",tmp.substring(0,i0),undefined));
  }//no else
  if(i0<tmp.length){
    elements.push(new MathElement("VAR",tmp.substring(i0),undefined));
  }
  return i+1;
}

function stringToElement(str){
  elts=stringToElements(str);
  if(elts.length==1){
    return elts[0];
  }else{
    return new MathElement("ROW",["{","}"],elts);
  }
}
function stringToElements(str){
  let i0=0;
  let elements=[];
  for(let i=0;i<str.length;i++){
    if(/^\s/.test(str[i])){//whitespace
      i0=finishWord(str,i0,i,elements);
    }else if(operators.includes(str[i])){
        i0=finishWord(str,i0,i,elements);
        elements.push(new MathElement("OPERATOR",str[i],undefined));
    }else if(superscript.has(str[i])){
        i0=finishWord(str,i0,i,elements);
        let val=superscript.get(str[i]);
        if(elements.length>0&&elements.at(-1).type=="SUPERSCRIPT"){
          elements.at(-1).content+=val;
        }else{
          elements.push(new MathElement("SUPERSCRIPT",val,undefined));
        }
    }else{
      switch(str[i]){
        case "/":
          i0=finishWord(str,i0,i,elements);
          elements.push(new MathElement("FRAC",str[i],undefined));
          break;
        case "^":
          i0=finishWord(str,i0,i,elements);
          elements.push(new MathElement("SUP",str[i],undefined));
          break;
        case "_":
          i0=finishWord(str,i0,i,elements);
          elements.push(new MathElement("SUB",str[i],undefined));
          break;
        case "\\":
          i0=finishWord(str,i0,i,elements);
          elements.push(new MathElement("FUNC","",undefined));
          break;
        case "(":
        case "[":
        case "{":
          i0=finishWord(str,i0,i,elements);
          let close=")]}"["([{".indexOf(str[i])]
          let n=1;
          for(let j=i0;j<str.length;j++){
            if(str[j]==close){
              n--;
              if(n==0){
                elements.push(new MathElement(str[i]=="{"?"ROW":"PAREN",[str[i],close],stringToElements(str.substring(i0,j))));
                i=j;
                i0=j+1;
                break;
              }
            }else if(str[j]==str[i]){
              n++;
            }
          }
          if(n!=0){
            console.log("missing: "+close);
            return [];
          }
          break;
      }
    }
  }
  if(i0<str.length){
    finishWord(str,i0,str.length,elements);
  }
  for(let i=elements.length-1;i>=0;i--){//parse function names
    if(elements[i].type=="FUNC"&&elements[i].content.length==0){
      if(elements.length==i+1 || elements[i+1].type!="VAR"){//empty function name
          continue;
      }
      funcName=elements[i+1].content.toLowerCase();
      if(greek.has(funcName)){//greek letters
        elements[i+1].content=greek.get(funcName);
        elements.splice(i,1);
      }else if(constants.has(funcName)){//constants 
        elements[i+1].content=constants.get(funcName);
        elements.splice(i,1);
      }else if(func_operators.has(funcName)){//constants 
        elements[i+1].type="OPERATOR";
        elements[i+1].content=func_operators.get(funcName);
        elements.splice(i,1);
      }else{
         switch(funcName){
          case "set":
          case "abs":
          case "floor":
          case "ceil":
            elements[i].type="PAREN";
            elements[i].content=[["{","}"],["|","|"],["⌊","⌋"],["⌈","⌉"]][["set","abs","floor","ceil"].indexOf(funcName)];
            elements[i].elts=[elements[i+2]||emptyElt()];
            elements.splice(i+1,2);
            break;
          case "sup":
          case "inf":
          case "lim":
          case "liminf":
          case "limsup":
            elements[i].type="UNDER";
            elements[i].elts=[elements[i+1],(elements[i+2]||emptyElt())];
            elements.splice(i+1,2);
            break;
          case "sum":
          case "prod":
            elements[i].type="LIMITS";
            from=elements[i+2]||emptyElt();
            to=elements[i+3]||emptyElt();
            let center=new MathElement("OPERATOR",(funcName=="prod")?"∏":"∑",undefined);
            elements[i+2].attributes.set("movableLimits",false);
            elements[i].elts=[center,from,to];
            elements.splice(i+1,3);
            break;
          case "matrix":
          case "vector":
            elements[i].type=funcName.toUpperCase();
            elements[i].elts=(elements[i+2]||emptyElt()).elts;
            elements.splice(i+1,2);
            break;
            //TODO add \underover
          case "root":
          case "under":
          case "over":
            elements[i].type=funcName.toUpperCase();
            if(funcName!="root")
              elements[i+2].attributes.set("movableLimits",false);
            elements[i].elts=[elements[i+2]||emptyElt(),elements[i+3]||emptyElt()];
            elements.splice(i+1,3);
            break;
          case "sqrt":
            elements[i].type="ROOT";
            elements[i].elts=[emptyElt(),elements[i+2]||emptyElt()];
            elements.splice(i+1,2);
            break;
          //different script types
          case "double":
          case "script":
          case "fraktur":
          case "mono":
          case "bold":
          case "italic":
            if(elements[i+2]){
              elements[i+2].attributes.set("mathvariant",["double-struck","script","fraktur","monospace","bold","italic"][["double","script","fraktur","mono","bold","italic"].indexOf(funcName)]);
            }
            elements.splice(i,2);
            break;
          case "noanim":
            if(elements[i+2]){
              elements[i+2].animate=false;
            }
            elements.splice(i,2);
            break;
          case "color":
            if(elements[i+2]&&elements[i+3]){
              elements[i+3].color=elements[i+2].content;
            }
            elements.splice(i,3);
            break;
          case "id":
            if(elements[i+2]&&elements[i+3]){
              elements[i+3].attributes.set("id",elements[i+2].content);
            }
            elements.splice(i,3);
            break;
          case "class":
            if(elements[i+2]&&elements[i+3]){
              elements[i+3].attributes.set("class",(elements[i+3].attributes.get("class")||"")+" "+elements[i+2].content);
            }
            elements.splice(i,3);
            break;
        }
      }
    }else if(elements[i].type=="SUPERSCRIPT"){
      elements[i].type="SUP";
      elements[i].elts=[elements[i-1]||emptyElt(),new MathElement("NUMBER",elements[i].content,undefined)]
      elements[i].content=undefined;
      elements.splice(i-1,1);
    }
  }
  for(let i=elements.length-2;i>0;i--){
    if((elements[i].type=="FRAC"||elements[i].type=="SUB"||elements[i].type=="SUP")&&elements[i].content){
      elements[i].elts=[elements[i-1]||emptyElt(),elements[i+1]||emptyElt()]
      elements[i].content=undefined;//clear content of parsed elements
      elements.splice(i-1,1);
      elements.splice(i,1);
    }
  }
  return elements;   
}
