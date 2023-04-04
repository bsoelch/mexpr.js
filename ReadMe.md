# mexpr ( Mathematical EXPression Renderer )

`mexpr.js` is a self-contained (*) script for rendering mathematical expressions.

[Examples](https://bsoelch.github.io/mexpr.js/)

mexpr can:

- create `MathElement` objects from strings 
  (`stringToElement(<string>)` function)
- render these objects into an HTML5-canvas 
  (`drawMathElement(<canvasContext>,<MathElement>,<float:x>,<float:y>,<MathElementStyle=defaultStyle>)`
   `measureMathElement(<canvasContext>,<MathElement>,<MathElementStyle=defaultStyle>)`)
- animate the transformation from one equation to another one (`mexprTrafo.js` script)

(*) when the opacity of an equations is set to values different from one`color.js` is needed to compute the translucent versions of the equation colors.

## parsing expressions

the parsed text is split into words at white-spaces, operators (see list `operators` in script) as well as the following special characters:

- `,` `;` end current word and add use as separator character
- `~` insert a space in the equation
- `/` creates a fraction with the previous element as numerator and the next element as denominator
- `^` uses the next element as superscript of the previous element
- `_` uses the next element as subscript of the previous element
- `(` `[` `{` open bracket ( `{` `}` brackets are not displayed by default and can be used to group elements)
- `)` `]` `}` close bracket
- `\` the next word will be interpreted as a command

### commands

#### insert special characters

- Greek letters are inserted using their name (first letter capital for capital letter) as a command
examples: `\pi` -> small pi `\Sigma` big sigma
- constants (see `constants` map in source code for full list)
   examples: `\infty` -> infinity symbol `\emptyset` -> empty-set symbol
- operators (see `func_operators` map in source code for full list)
   examples: 
    `\pm` -> plus-minus symbol 
    `\ge` -> greater-or-equal symbol
- white-spaces: 
  `\space` insert one space
  `\t` insert four spaces
  `\n` continue the equation on the next line (the final equation (withing the current bracket) will be a vector consisting of all lines)

#### syntactical elements

- `\root <R> <V>` -> `<R>` th root of  `<V>`
- `\sqrt <V>` -> square root of `<V>`
- `\cbrt <V>` -> cube root of `<V>`
- `\sum <from> <to>` -> sum from `<from>` to `<to>` 
- `\prod <from> <to>` ->  product from `<from>` to `<to>` 
- `\int <from> <to>` -> intergral from `<from>` to `<to>` 
- `\nary <operator> <from> <to>` -> n-ary `<operator>` with boundaries `<from>` and `<to>` 
- `\vector {<element1> <elementN>}` -> create a vector
- `\matrix {{<element11> ... } ... {<elementN1> ... }}` -> create a matrix
- `\under <A> <B>` `\over <A> <B>` write `<B>` above/below `<A>`
- `\underover <A> <B> <C>` write `<B>` below `<A>` and `<C>` above `<A>`
- `\subsup <A> <B> <C>` use `<B>` as subscript and as superscript `<C>` of `<A>`

#### brackets

wrapping the next element in brackets
- `\set`: write next element in curly brackets
- `\abs`: write next element in `| |` brackets
- `\norm`: norm of an element (double lines on both sides)
- `\floor`:  write next element in floor brackets
- `\ceil`:  write next element in ceiling brackets
- `\cases`: write a opening curly bracket before the next element

#### accents
applies an accent to the next element

- `\hat` `^` above the current element
- `\tilde` `~` above the current element
- `\bar` line above the current element
- `\dot` dot above the current element, the number of `d`s determines the number of dots (i.e `\dddot` adds three does above the element) 

it is possible to apply more than one accent to an element, accents are applied from right to left

#### style modifiers
all style modifiers apply to the next element and all its sub-elements until they are replaced by another modifier of the same type.

- `\big` `\small` multiply/divide the size of the element by `sizeScaleFactor` (currently set to 2), 
  the scale factor is applied to all sub-elements if an element has more than one scale factor, the factor are multiples
- `\color <colorname>` sets the color of the next element
- `\plain` reset text style
- `\bold` `\italic` make text bold/italic
- `\bold` `\italic` make text bold/italic
- `\double` `\script` `\fraktur` `\mono` change text-type


## rendering equations

rendering an equations consist of two steps, first measuring the sizes of all elements, then drawing these elements at their respective positions 

- `drawMathElement(<canvasContext>,<MathElement>,<float:x>,<float:y>,<MathElementStyle=defaultStyle>)`
recomputes the position and style of the given MathElement and then draws it at the position `(x,y)` on the canvas given by the first parameter

- `measureMathElement(<canvasContext>,<MathElement>,<MathElementStyle=defaultStyle>)`
computes the styles and positions of the provided MathElement and all its sub-elements when drawn on the given canvas context
the computed values can be read out through the fields `computedStyle` for styles, `innerBox`/`outerBox` for bounding boxes
and `x`,`y` for positions relative to the position of the root element.

- `drawMathElementInternal(<canvasContext>,<MathElement>,<float:x>,<float:y>)`
draws a MathElement without recomputing its style 

the style parameter can be uses to customize the default-style (size,color,font,...) of an equation element
the default values are given in the MathElements/MathElementStyle section

## MathElements
<!-- TODO -->

### MathElementStyle
controls the drawing style of a MathElement if an element of the style is not set, it will be inherited from the parent style

#### default values:

```
defaultStyle.color="#ffffff";
defaultStyle.sizeScale=1.0;
defaultStyle.baseFont="math";
defaultStyle.isBold=false;
defaultStyle.isItalic=false;
defaultStyle.textType="normal";
defaultStyle.baseSize=50;
defaultStyle.opacity=1.0;
```

## animations

for animations the additional `mexprTrafo.js` and `color.js` scripts are needed

`transformEquation(<MathElement:src>,<MathElement:target>)` creates a `MathTrafo` object

`MathTrafo` has four functions:

- `onStart()` 
  prepares the source and target equations for the animation, it has to be called once at the start of the animation
- `onEnd()` 
  finishes the animation, it has to be called at the end of the animation
- `onStep(<float:lambda>)`
  computes the intermediate state of the animation, the parameter `lambda` (between 0 and 1) determines the percentage of the transformation between the two equations
  (lambda does not need to increase between different calls of this functions)
- `drawOn(<canvasContext>,<float:x0>,<float:y0>,<float:x1=x9>,<float:y1=y1>)`
  draws the current animation state (set by `onStep(...)`) in the provided canvas context at the given positions
  if the parameters `x1` and `y1` are given the source equation will be drawn at `(x0,y0)` and the target equation at `(x1,y1)`
  otherwise both equations will be draw at position `(x0,y0)`
  
  
### commands for modifying animations
- `\noanim` disable animations for the given element
- `\class` add class to element, classes are used to group elements in animations
- `\class` `\Class` add class to element and all its sub-elements

