function lerp(a,b,lambda){
  if(lambda<=0)
    return a;
  if(lambda>=1)
    return b;
  return (1-lambda)*a+(lambda)*b;
}
  
class MathElementTrafo{
  constructor(src,target,computeStyle=true,elements=undefined){
    this.src=src;
    this.target=target;
    this.srcStyle=src.computedStyle;
    this.targetStyle=target.computedStyle;
    this.element=new MathElement(computeStyle?src.type:"SPACE",src.content,elements);
    this.element.formatedText=src.formatedText;
    if(elements===undefined&&src.elts!==undefined){
      this.element.elts=[];
      src.elts.forEach((e)=>{
        let placeHolder=new MathElement("SPACE",undefined,undefined);
        placeHolder.innerBox=e.innerBox;
        placeHolder.outerBox=e.outerBox;
        placeHolder.computedStyle=defaultStyle;
        this.element.elts.push(placeHolder);
      });
    }
    this.element.computedStyle=new MathElementStyle();
    this.computeSize=elements!==undefined;
    this.computeStyle=computeStyle;
  }
  
  lerpElt(lambda=0){
    let src=this.src,target=this.target,element=this.element,srcStyle=this.srcStyle,targetStyle=this.targetStyle;
    if(this.computeStyle){
      element.computedStyle.color=Color.fromString(srcStyle.color).lerp(Color.fromString(targetStyle.color),lambda).color();
      element.computedStyle.sizeScale=lerp(srcStyle.sizeScale,targetStyle.sizeScale,lambda);
      element.computedStyle.baseSize=lerp(srcStyle.baseSize,targetStyle.baseSize,lambda);
      if(lambda<0.5){//XXX? interpolate by combining two different elements
        element.computedStyle.baseFont=srcStyle.baseFont;
        element.computedStyle.isBold=srcStyle.isBold;
        element.computedStyle.isItalic=srcStyle.isItalic;
        element.computedStyle.textType=srcStyle.textType;
      }else{
        element.computedStyle.baseFont=targetStyle.baseFont;
        element.computedStyle.isBold=targetStyle.isBold;
        element.computedStyle.isItalic=targetStyle.isItalic;
        element.computedStyle.textType=targetStyle.textType;
      }
      element.textYOffset=lerp(src.textYOffset,target.textYOffset,lambda);
    }
    if(this.computeSize){
      measureMathElement(element);
    }else{
      element.innerBox=new Box(
        lerp(src.innerBox.x0,target.innerBox.x0,lambda),
        lerp(src.innerBox.y0,target.innerBox.y0,lambda),
        lerp(src.innerBox.x1,target.innerBox.x1,lambda),
        lerp(src.innerBox.y1,target.innerBox.y1,lambda)
      );
      element.outerBox=new Box(
        lerp(src.outerBox.x0,target.outerBox.x0,lambda),
        lerp(src.outerBox.y0,target.outerBox.y0,lambda),
        lerp(src.outerBox.x1,target.outerBox.x1,lambda),
        lerp(src.outerBox.y1,target.outerBox.y1,lambda)
      );
    }
    element.x=lerp(src.x,target.x,lambda);
    element.y=lerp(src.y,target.y,lambda);
    this.element=element;
    return element;
  }
}

class MathTrafo{
  constructor(src,target,srcElements,targetElements,elementTrafos){
    this.src=src;
    this.target=target;
    this.srcElements=srcElements;
    this.targetElements=targetElements;
    this.elementTrafos=elementTrafos;
    this.lambda=0;
  }
  onStart(){
    this.srcElements.forEach((t)=>{t.visible=false;});//XXX parameter for disabling clearing of source
    this.targetElements.forEach((t)=>{t.visible=false;});
  }
  onEnd(){
    this.srcElements.forEach((t)=>{t.visible=true;});
    this.targetElements.forEach((t)=>{t.visible=true;});
  }
  onStep(lambda){
    this.lambda=lambda;
    this.src.style.opacity=1-lambda;//XXX parameters for disabling fading of equations
    this.target.style.opacity=lambda;
    this.elementTrafos.forEach((t)=>{
      t.lerpElt(lambda);
    });
  }
  drawOn(ctx,x0,y0,x1,y1){
    if(x1===undefined)
      x1=x0;
    if(y1===undefined)
      y1=y0;
    drawMathElement(ctx,this.src,x0,y0);
    drawMathElement(ctx,this.target,x1,y1);
    let x=lerp(x0,x1,this.lambda);
    let y=lerp(y0,y1,this.lambda);
    this.elementTrafos.forEach((t)=>{
      drawMathElementInternal(ctx,t.element,x,y);
    });
  }
}
function transformEquation(src,target){
  let elements=new Map();
  src.forEach((e)=>{
    if(!e.animate)
      return;
    let id=e.type+".";
    e.classes.forEach((c)=>{id+=c+".";});
    id+=e.formatedText;
    switch(e.type){
      case "VAR":case "NUMBER":case "OPERATOR"://text elements
      case "PAREN":case "FRAC":case "INTEGRAL":case "ACCENT"://container elements that draw components
      case "ROOT"://elements that draw components based on sub-elements
        if(elements.has(id)){
          elements.get(id)[0].push(e);
        }else{
          elements.set(id,[[e],[]]);
        }
    }
  });
  target.forEach((e)=>{
    if(!e.animate)
      return;
    let id=e.type+".";
    e.classes.forEach((c)=>{id+=c+".";});
    id+=e.formatedText;
    if(elements.has(id))
      elements.get(id)[1].push(e);
  });
  let elementTrafos=[];
  elements.forEach((e)=>{
    if(e[1].length==0)
      return;
    let n=Math.max(e[0].length,e[1].length);
    for(let i=0;i<n;i++){
      let src=e[0][Math.round(i*((e[0].length-1)/Math.max(n-1,1)))];
      let target=e[1][Math.round(i*((e[1].length-1)/Math.max(n-1,1)))];
      if(e[0].type=="ROOT"){//elements that draw components based on sub-elements
        let rootTrafo=new MathElementTrafo(src.elts[0],target.elts[0],false);
        let valTrafo=new MathElementTrafo(src.elts[1],target.elts[1],false);
        elementTrafos.push(rootTrafo);
        elementTrafos.push(valTrafo);
        elementTrafos.push(new MathElementTrafo(src,target,true,[rootTrafo.element,valTrafo.element]));
        continue;
      }
      elementTrafos.push(new MathElementTrafo(src,target));
    }
  });
  let srcElements=[];
  let targetElements=[];
  elements.forEach((e)=>{
    if(e[1].length==0)
      return;
    e[0].forEach((src)=>{srcElements.push(src);});
    e[1].forEach((target)=>{targetElements.push(target);});
  });
  return new MathTrafo(src,target,srcElements,targetElements,elementTrafos);
}


