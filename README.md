# swiss-node

Swiss Army Knife for node

A collection of helper functions and useful little things for node.js

Uses `swiss-ak`

<!-- DOCS: TOC START -->

  - [Table of Contents](#)
    - [ask](#ask)
      - [text](#text)
      - [autotext](#autotext)
      - [number](#number)
      - [boolean](#boolean)
      - [booleanAlt](#booleanalt)
      - [select](#select)
      - [multiselect](#multiselect)
      - [crud](#crud)
      - [validate](#validate)
      - [imitate](#imitate)
      - [prefill](#prefill)
      - [loading](#loading)
      - [pause](#pause)
      - [countdown](#countdown)
      - [wizard](#wizard)
      - [date](#date)
      - [time](#time)
      - [datetime](#datetime)
      - [dateRange](#daterange)
      - [fileExplorer](#fileexplorer)
      - [multiFileExplorer](#multifileexplorer)
      - [saveFileExplorer](#savefileexplorer)
      - [select](#select)
      - [multiselect](#multiselect)
      - [trim](#trim)
      - [separator](#separator)
      - [section](#section)
      - [utils](#utils)
        - [itemsToPromptObjects](#itemstopromptobjects)
    - [out](#out)
      - [pad](#pad)
      - [center](#center)
      - [left](#left)
      - [right](#right)
      - [justify](#justify)
      - [leftLines](#leftlines)
      - [centerLines](#centerlines)
      - [rightLines](#rightlines)
      - [justifyLines](#justifylines)
      - [align](#align)
      - [split](#split)
      - [wrap](#wrap)
      - [moveUp](#moveup)
      - [loading](#loading)
      - [limitToLength](#limittolength)
      - [limitToLengthStart](#limittolengthstart)
      - [truncate](#truncate)
      - [truncateStart](#truncatestart)
      - [concatLineGroups](#concatlinegroups)
      - [getResponsiveValue](#getresponsivevalue)
        - [ResponsiveOption<T>](#responsiveoptiont)
      - [getBreadcrumb](#getbreadcrumb)
        - [Breadcrumb](#breadcrumb)
      - [getLineCounter](#getlinecounter)
        - [LineCounter](#linecounter)
          - [lc.log](#lclog)
          - [move](#move)
          - [lc.wrap](#lcwrap)
          - [lc.add](#lcadd)
          - [lc.get](#lcget)
          - [getSince](#getsince)
          - [lc.clear](#lcclear)
          - [lc.clearBack](#lcclearback)
          - [lc.checkpoint](#lccheckpoint)
          - [lc.clearToCheckpoint](#lccleartocheckpoint)
      - [utils](#utils)
        - [getTerminalWidth](#getterminalwidth)
        - [getLines](#getlines)
        - [getNumLines](#getnumlines)
        - [getLinesWidth](#getlineswidth)
        - [getLogLines](#getloglines)
        - [getNumLogLines](#getnumloglines)
        - [getLogLinesWidth](#getloglineswidth)
        - [joinLines](#joinlines)
        - [hasColor](#hascolor)
    - [table](#table)
      - [print](#print)
      - [printObjects](#printobjects)
      - [getLines](#getlines)
      - [TableOptions](#tableoptions)
        - [wrapperFn](#wrapperfn)
        - [wrapLinesFn](#wraplinesfn)
        - [overrideChar](#overridechar)
        - [overrideHorChar](#overridehorchar)
        - [overrideVerChar](#overrideverchar)
        - [drawOuter](#drawouter)
        - [drawRowLines](#drawrowlines)
        - [drawColLines](#drawcollines)
        - [colWidths](#colwidths)
        - [align](#align)
        - [alignCols](#aligncols)
        - [transpose](#transpose)
        - [transposeBody](#transposebody)
        - [margin](#margin)
        - [cellPadding](#cellpadding)
        - [format](#format)
        - [truncate](#truncate)
        - [maxWidth](#maxwidth)
      - [TableFormatConfig](#tableformatconfig)
        - [formatFn](#formatfn)
        - [isHeader](#isheader)
        - [isBody](#isbody)
        - [row](#row)
        - [col](#col)
      - [utils](#utils)
        - [objectsToTable](#objectstotable)
        - [transpose](#transpose)
        - [concatRows](#concatrows)
        - [getFormat](#getformat)
    - [log](#log)
      - [log](#log)
      - [createLogger](#createlogger)
      - [LogOptions](#logoptions)
        - [showDate](#showdate)
        - [showTime](#showtime)
        - [enableColours](#enablecolours)
      - [LogConfig](#logconfig)
    - [chlk](#chlk)
      - [gray0](#gray0)
      - [gray1](#gray1)
      - [gray2](#gray2)
      - [gray3](#gray3)
      - [gray4](#gray4)
      - [gray5](#gray5)
      - [grays](#grays)
      - [gray](#gray)
      - [clear](#clear)
      - [not](#not)
      - [notUnderlined](#notunderlined)
      - [gray0](#gray0)
      - [gray1](#gray1)
      - [gray2](#gray2)
      - [gray3](#gray3)
      - [gray4](#gray4)
      - [gray5](#gray5)
    - [clr](#clr)
      - [hl1](#hl1)
      - [hl2](#hl2)
      - [approve](#approve)
      - [create](#create)
      - [update](#update)
      - [delete](#delete)
      - [deleteAll](#deleteall)
      - [blue](#blue)
      - [cyan](#cyan)
      - [green](#green)
      - [magenta](#magenta)
      - [red](#red)
      - [yellow](#yellow)
      - [t1](#t1)
      - [t2](#t2)
      - [t3](#t3)
      - [t4](#t4)
      - [t5](#t5)
      - [t6](#t6)
    - [LogTools](#logtools)
      - [getLogStr](#getlogstr)
      - [processLogContents](#processlogcontents)
      - [getLog](#getlog)
    - [PathsTools](#pathstools)
      - [explodePath](#explodepath)
        - [ExplodedPath](#explodedpath)
          - [path](#path)
          - [dir](#dir)
          - [folders](#folders)
          - [name](#name)
          - [ext](#ext)
          - [filename](#filename)
      - [removeTrailSlash](#removetrailslash)
      - [trailSlash](#trailslash)
      - [removeDoubleSlashes](#removedoubleslashes)
    - [progressBarTools](#progressbartools)
      - [getColouredProgressBarOpts](#getcolouredprogressbaropts)
    - [waiters](#waiters)
      - [nextTick](#nexttick)
    - [keyListener](#keylistener)
      - [getKeyListener](#getkeylistener)

<!-- DOCS: TOC END -->

<!-- DOCS: MAIN START -->

## ask
A collection of functions to ask the user for input.

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### text
- `ask.text`

Get a text input from the user.

```typescript
const name = await ask.text('What is your name?'); // 'Jack'
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### autotext
- `ask.autotext`

Get a text input from the user, with auto-completion.

```typescript
const name = await ask.autotext('What is your name?', ['Jack', 'Jane', 'Joe']); // 'Jack'
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### number
- `ask.number`

Get a number input from the user.

```typescript
const age = await ask.number('How old are you?'); // 30
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### boolean
- `ask.boolean`

Get a boolean input from the user (yes or no)

```typescript
const isCool = await ask.boolean('Is this cool?'); // true
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### booleanAlt
- `ask.booleanAlt`

Get a boolean input from the user (yes or no)

Alternative interface to ask.boolean

```typescript
const isCool = await ask.boolean('Is this cool?'); // true
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### select
- `ask.select`

Get the user to select an option from a list.

```typescript
const colour = await ask.select('Whats your favourite colour?', ['red', 'green', 'blue']); // 'red'
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### multiselect
- `ask.multiselect`

Get the user to select multiple opts from a list.

```typescript
const colours = await ask.multiselect('Whats your favourite colours?', ['red', 'green', 'blue']); // ['red', 'green']
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### crud
- `ask.crud`

Get the user to select a CRUD (**C**reate, **R**ead, **U**pdate and **D**elete) action

Values returned are: 'none' | 'create' | 'update' | 'delete' | 'delete-all'

```typescript
const action = await ask.crud('What do you want to do next?'); // 'none'
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### validate
- `ask.validate`

Validate the result of an `ask` prompt

```typescript
const name = await ask.validate(
  () => ask.text('What is your name?'),
  (name) => name.length > 0
); // 'Jack'
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### imitate
- `ask.imitate`

Imitate the display of a prompt

```typescript
imitate(true, 'What is your name?', 'Jack');

ask.imitate(true, 'What is your name?', 'Jack');
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### prefill
- `ask.prefill`

Auto-fills an ask prompt with the provided value, if defined.

Continues to display the 'prompt', but already 'submitted'

Good for keeping skipping parts of forms, but providing context and keeping display consistent

```typescript
let data = {};
const name1 = ask.prefill(data.name, 'What is your name?', ask.text); // User input

data = {name: 'Jack'}
const name2 = ask.prefill(data.name, 'What is your name?', ask.text); // Jack
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### loading
- `ask.loading`

Display an animated loading indicator that imitates the display of a prompt

```typescript
const loader = ask.loading('What is your name?');
// ...
loader.stop();
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### pause
- `ask.pause`

Pause the program until the user presses enter

```typescript
await ask.pause();
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### countdown
- `ask.countdown`

Animated countdown for a given number of seconds

```typescript
await ask.countdown(5);
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### wizard
- `ask.wizard`

Create a wizard object that can be used to build up a complex object

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### date
- `ask.date`

Get a date input from the user.

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### time
- `ask.time`

Get a time input from the user.

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### datetime
- `ask.datetime`

Get a date and time input from the user.

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### dateRange
- `ask.dateRange`

Get a date range input from the user.

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### fileExplorer
- `ask.fileExplorer`

Get a file or folder path from the user.

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### multiFileExplorer
- `ask.multiFileExplorer`

Get multiple file or folder paths from the user.

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### saveFileExplorer
- `ask.saveFileExplorer`

Get a file path from the user, with the intention of saving a file to that path.

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### select
- `ask.table.select`

Get a single selection from a table.

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### multiselect
- `ask.table.multiselect`

Get multiple selections from a table.

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### trim
- `ask.trim`

Get a start and end frame from the user

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### separator
- `ask.separator`

Prints a separator line to the console.

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### section
- `ask.section`

Allows information to be displayed before a question, and follow up questions to be asked, while only leaving the 'footprint' of a single question afterwards.

```typescript
const ans1 = await ask.text('Question 1:');
const ans2 = await ask.section('Question 2:',
  (lc: LineCounter) => {
    lc.log('Some information');
  },
  (qst) => ask.text(qst),
  () => ask.text('Question 2b:')
);

```

During the section, it looks like this:
```
Question 1: answer1
┄┄┄┄┄◦┄┄┄┄┄┄┄◦┄┄┄┄┄┄┄◦┄┄┄┄┄┄┄◦┄┄┄┄┄┄
Some information
┄┄┄┄┄◦┄┄┄┄┄┄┄◦┄┄┄┄┄┄┄◦┄┄┄┄┄┄┄◦┄┄┄┄┄┄
Question 2: answer2
Question 2b: answer2b
```

After the last question in the section has been submitted, it looks like this:
```
Question 1: answer1
Question 2a: [ answer2, answer2b ]
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### utils

#### itemsToPromptObjects
- `ask.utils.itemsToPromptObjects`

Take an array of items and convert them to an array of prompt objects

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

## out
A collection of functions to print to the console

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### pad
- `out.pad`

Pad before and after the given text with the given character.

```typescript
pad('foo', 3, 1, '-'); // '---foo-'
pad('bar', 10, 5, '_'); // '__________bar_____'
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### center
- `out.center`

Align the given text to the center within the given width of characters/columns

Giving a width of 0 will use the terminal width

```typescript
out.center('foo', 10); // '   foo    '
out.center('something long', 10); // 'something long'
out.center('lines\n1\n2', 5);
// 'lines' + '\n' +
// '  1  ' + '\n' +
// '  2  '
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### left
- `out.left`

Align the given text to the left within the given width of characters/columns

Giving a width of 0 will use the terminal width

```typescript
out.left('foo', 10); // 'foo       '
out.left('something long', 10); // 'something long'
out.left('lines\n1\n2', 5);
// 'lines' + '\n' +
// '1    ' + '\n' +
// '2    '
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### right
- `out.right`

Align the given text to the right within the given width of characters/columns

Giving a width of 0 will use the terminal width

```typescript
out.right('foo', 10); // '       foo'
out.right('something long', 10); // 'something long'
out.right('lines\n1\n2', 5);
// 'lines' + '\n' +
// '    1' + '\n' +
// '    2'
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### justify
- `out.justify`

Evenly space the text horizontally across the given width.

Giving a width of 0 will use the terminal width

```typescript
const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
out.justify(out.wrap(lorem, 20), 20);
// 'Lorem  ipsum   dolor' + '\n' +
// 'sit            amet,' + '\n' +
// 'consectetur         ' + '\n' +
// 'adipiscing      elit'
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### leftLines
- `out.leftLines`

Align each line of the given text to the left within the given width of characters/columns

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### centerLines
- `out.centerLines`

Align each line of the given text to the center within the given width of characters/columns

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### rightLines
- `out.rightLines`

Align each line of the given text to the right within the given width of characters/columns

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### justifyLines
- `out.justifyLines`

Justify align each line of the given text within the given width of characters/columns

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### align
- `out.align`

Align the given text to the given alignment within the given width of characters/columns

Giving a width of 0 will use the terminal width

```typescript
out.align('foo', 'left', 10); // 'foo       '
out.align('something long', 'center', 10); // 'something long'
out.align('lines\n1\n2', 'right', 5);
// 'lines' + '\n' +
// '    1' + '\n' +
// '    2'
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### split
- `out.split`

Split the given text into two parts, left and right, with the given width of characters/columns

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### wrap
- `out.wrap`

Wrap the given text to the given width of characters/columns

```typescript
wrap('This is a sentence', 15);
// 'This is' + '\n' +
// 'a sentence'
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### moveUp
- `out.moveUp`

Move the terminal cursor up X lines, clearing each row.

Useful for replacing previous lines of output

```typescript
moveUp(1);
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### loading
- `out.loading`

Display an animated loading indicator

```typescript
const loader = out.loading();
// ...
loader.stop();
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### limitToLength
- `out.limitToLength`

Limit the length of a string to the given length

```typescript
out.limitToLength('This is a very long sentence', 12); // 'This is a ve'
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### limitToLengthStart
- `out.limitToLengthStart`

Limit the length of a string to the given length, keeping the end

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### truncate
- `out.truncate`

Limit the length of a string to the given length, and add an ellipsis if necessary

```typescript
out.truncate('This is a very long sentence', 15); // 'This is a ve...'
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### truncateStart
- `out.truncateStart`

Limit the length of a string to the given length, and add an ellipsis if necessary, keeping the end

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### concatLineGroups
- `out.concatLineGroups`

Concatenate multiple line groups, aligning them by the longest line

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### getResponsiveValue
- `out.getResponsiveValue`

Get a value based on the terminal width

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

#### ResponsiveOption<T>
- `out.ResponsiveOption`

Configuration for a responsive value (see `getResponsiveValue`)

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### getBreadcrumb
- `out.getBreadcrumb`
- `getBreadcrumb`

Provides a consistent format and style for questions/prompts

```typescript
const bread = getBreadcrumb();
bread() // ''
bread('a') // 'a'
bread('a', 'b') // 'a › b'
bread('a', 'b', 'c') // 'a › b › c'

const sub = bread.sub('a', 'b');
sub(); // 'a › b'
sub('c') // 'a › b › c'
sub('c', 'd') // 'a › b › c › d'

const subsub = sub.sub('c', 'd');
subsub(); // 'a › b › c › d'
subsub('e'); // 'a › b › c › d › e'
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

#### Breadcrumb
- `out.Breadcrumb`
- `Breadcrumb`

Return type for getBreadcrumb

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### getLineCounter
- `out.getLineCounter`
- `getLineCounter`

Get line counter for counter output lines

```typescript
const lc = getLineCounter();
lc.log('hello'); // 1
lc.wrap(undefined, () => table.print(['hello', 'world'])); // 1
lc.add(1);
lc.get(); // 3
lc.clear();
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

#### LineCounter
- `out.LineCounter`
- `LineCounter`

Return type for getLineCounter

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

##### lc.log
Same as console.log, but adds to the lc counter

```typescript
const lc = getLineCounter();
lc.log('hello'); // 1
lc.wrap(undefined, () => table.print(['hello', 'world'])); // 1
lc.add(1);
lc.get(); // 3
lc.clear();
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

##### move
Moves the cursor up by a given number of lines

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

##### lc.wrap
Wraps a function, and adds a given number to the line counter

```typescript
const lc = getLineCounter();
lc.log('hello'); // 1
lc.wrap(undefined, () => table.print(['hello', 'world'])); // 1
lc.add(1);
lc.get(); // 3
lc.clear();
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

##### lc.add
Adds a given number to the line counter

```typescript
const lc = getLineCounter();
lc.log('hello'); // 1
lc.wrap(undefined, () => table.print(['hello', 'world'])); // 1
lc.add(1);
lc.get(); // 3
lc.clear();
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

##### lc.get
returns the line counter

```typescript
const lc = getLineCounter();
lc.log('hello'); // 1
lc.wrap(undefined, () => table.print(['hello', 'world'])); // 1
lc.add(1);
lc.get(); // 3
lc.clear();
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

##### getSince
Returns the number of lines since a given checkpoint

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

##### lc.clear
clears the line counter, and moves the cursor up by the value of the line counter

```typescript
const lc = getLineCounter();
lc.log('hello'); // 1
lc.wrap(undefined, () => table.print(['hello', 'world'])); // 1
lc.add(1);
lc.get(); // 3
lc.clear();
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

##### lc.clearBack
Clears a given number of lines, and updates the line counter

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

##### lc.checkpoint
Records a 'checkpoint' that can be returned to later

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

##### lc.clearToCheckpoint
Clear lines up to a previously recorded checkpoint

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### utils

#### getTerminalWidth
- `out.utils.getTerminalWidth`

Get maximum terminal width (columns)

```typescript
print.utils.getTerminalWidth(); // 127
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

#### getLines
- `out.utils.getLines`

Split multi-line text into an array of lines

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

#### getNumLines
- `out.utils.getNumLines`

Get how many lines a string or array of lines has

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

#### getLinesWidth
- `out.utils.getLinesWidth`

Get how wide a string or array of lines has

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

#### getLogLines
- `out.utils.getLogLines`

Split a log-formatted multi-line text into an array of lines

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

#### getNumLogLines
- `out.utils.getNumLogLines`

Get how many lines a log-formatted string or array of lines has

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

#### getLogLinesWidth
- `out.utils.getLogLinesWidth`

Get how wide a log-formatted string or array of lines has

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

#### joinLines
- `out.utils.joinLines`

Join an array of lines into a single multi-line string

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

#### hasColor
- `out.utils.hasColor`

Determine whether a given string contains any chalk-ed colours

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

## table
A simple table generator

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### print
- `table.print`

Print a table

```typescript
const header = [['Name', 'Age']];
const body = [['John', '25'], ['Jane', '26']];
table.print(body, header);

// ┏━━━━━━┳━━━━━┓
// ┃ Name ┃ Age ┃
// ┡━━━━━━╇━━━━━┩
// │ John │ 25  │
// │ Jane │ 26  │
// └──────┴─────┘
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### printObjects
- `table.printObjects`

Print a table of given objects

```typescript
const objs = [
  // objs
  { a: '1', b: '2', c: '3' },
  { a: '0', c: '2' },
  { b: '4' },
  { a: '6' }
];
const header = {
  a: 'Col A',
  b: 'Col B',
  c: 'Col C'
};
table.printObjects(objs, header);

// ┏━━━━━━━┳━━━━━━━┳━━━━━━━┓
// ┃ Col A ┃ Col B ┃ Col C ┃
// ┡━━━━━━━╇━━━━━━━╇━━━━━━━┩
// │ 1     │ 2     │ 3     │
// ├───────┼───────┼───────┤
// │ 0     │       │ 2     │
// ├───────┼───────┼───────┤
// │       │ 4     │       │
// ├───────┼───────┼───────┤
// │ 6     │       │       │
// └───────┴───────┴───────┘
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### getLines
- `table.getLines`

Get the lines of a table (rather than printing it)

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### TableOptions
The configuration options for the table

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

#### wrapperFn
Function to wrap each line of the table in (e.g. chalk.blue)

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

#### wrapLinesFn
Function to wrap the lines of the table (between the cells)

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

#### overrideChar
Character to use instead of lines

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

#### overrideHorChar
Character to use instead of horizontal lines

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

#### overrideVerChar
Character to use instead of vertical lines

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

#### drawOuter
Whether to draw the outer border of the table

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

#### drawRowLines
Whether to draw lines between rows (other than separating header and body)

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

#### drawColLines
Whether to draw lines between columns

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

#### colWidths
Preferred width (in number of characters) of each column

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

#### align
How the table should be aligned on the screen

left, right, center or justify

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

#### alignCols
How each column should be aligned

Array with alignment for each column: left, right, center or justify

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

#### transpose
Change rows into columns and vice versa

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

#### transposeBody
Change rows into columns and vice versa (body only)

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

#### margin
The amount of space to leave around the outside of the table

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

#### cellPadding
The amount of space to leave around the outside of each cell

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

#### format
A set of formatting configurations

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

#### truncate
Truncates (cuts the end off) line instead of wrapping

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

#### maxWidth
Maximum width of the table

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### TableFormatConfig
Configuration for formatting a cell

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

#### formatFn
A wrapper function to apply to the cell

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

#### isHeader
Whether to apply the format to the header

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

#### isBody
Whether to apply the format to the body

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

#### row
A specific row to apply the format to

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

#### col
A specific column to apply the format to

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### utils

#### objectsToTable
- `table.utils.objectsToTable`

Process an array of objects into a table format (string[][])

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

#### transpose
- `table.utils.transpose`

Change rows into columns and vice versa

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

#### concatRows
- `table.utils.concatRows`

Concatenate header and body rows into one list of rows

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

#### getFormat
- `table.utils.getFormat`

A function for simplifying the format configuration

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

## log

### log
- `log`

A set of log functions

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### createLogger
- `createLogger`

Create a logger with custom configs

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### LogOptions
- `LogOptions`

Options for the log function

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

#### showDate
Default: false

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

#### showTime
Default: true

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

#### enableColours
Default: true

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### LogConfig
- `LogConfig`

Configuration for the log function

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

## chlk
A collection of colours and styles for use in the console.

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### gray0
- `chlk.gray0`
- `clr.gray0`

Gray 0 (0-5). Equivalent to chalk.black

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### gray1
- `chlk.gray1`
- `clr.gray1`

Gray 1 (0-5). Equivalent to chalk.gray.dim

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### gray2
- `chlk.gray2`
- `clr.gray2`

Gray 2 (0-5). Equivalent to chalk.white.dim

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### gray3
- `chlk.gray3`
- `clr.gray3`

Gray 3 (0-5). Equivalent to chalk.whiteBright.dim

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### gray4
- `chlk.gray4`
- `clr.gray4`

Gray 4 (0-5). Equivalent to chalk.white

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### gray5
- `chlk.gray5`
- `clr.gray5`

Gray 5 (0-5). Equivalent to chalk.whiteBright

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### grays
- `chlk.grays`

Grays between 0 and 5.

```typescript
grays[2]; // gray2
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### gray
- `chlk.gray`

Grays between 0 and 5.

```typescript
gray(2); // gray2
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### clear
- `chlk.clear`

Removes ANSI colours. Not same as chalk.reset

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### not
- `chlk.not`

Stops and restarts a style around a given string

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### notUnderlined
- `chlk.notUnderlined`

Dont underline a section of text

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### gray0
- `chlk.gray0`
- `clr.gray0`

Gray 0 (0-5). Equivalent to chalk.black

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### gray1
- `chlk.gray1`
- `clr.gray1`

Gray 1 (0-5). Equivalent to chalk.gray.dim

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### gray2
- `chlk.gray2`
- `clr.gray2`

Gray 2 (0-5). Equivalent to chalk.white.dim

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### gray3
- `chlk.gray3`
- `clr.gray3`

Gray 3 (0-5). Equivalent to chalk.whiteBright.dim

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### gray4
- `chlk.gray4`
- `clr.gray4`

Gray 4 (0-5). Equivalent to chalk.white

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### gray5
- `chlk.gray5`
- `clr.gray5`

Gray 5 (0-5). Equivalent to chalk.whiteBright

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

## clr
A collection of shortcuts and aliases for chalk functions

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### hl1
- `clr.hl1`

Highlight 1

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### hl2
- `clr.hl2`

Highlight 2

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### approve
- `clr.approve`

Approval colour (green)

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### create
- `clr.create`

Create colour (greenBright)

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### update
- `clr.update`

Update colour (yellow)

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### delete
- `clr.delete`

Delete colour (red)

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### deleteAll
- `clr.deleteAll`

Delete all colour (red)

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### blue
- `clr.blue`

Alias for chalk.blueBright

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### cyan
- `clr.cyan`

Alias for chalk.cyanBright

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### green
- `clr.green`

Alias for chalk.greenBright

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### magenta
- `clr.magenta`

Alias for chalk.magentaBright

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### red
- `clr.red`

Alias for chalk.redBright

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### yellow
- `clr.yellow`

Alias for chalk.yellowBright

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### t1
- `clr.t1`

Theme 1

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### t2
- `clr.t2`

Theme 2

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### t3
- `clr.t3`

Theme 3

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### t4
- `clr.t4`

Theme 4

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### t5
- `clr.t5`

Theme 5

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### t6
- `clr.t6`

Theme 6

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

## LogTools
A collection of tools for logging

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### getLogStr
- `LogTools.getLogStr`
- `getLogStr`

Get a string for a given object as it would be printed by console.log

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### processLogContents
- `LogTools.processLogContents`
- `processLogContents`

Process an item to be logged

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### getLog
- `LogTools.getLog`
- `getLog`

Get a log function for a given prefix

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

## PathsTools
A collection of tools for working with paths

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### explodePath
- `PathsTools.explodePath`
- `explodePath`

'Explodes' a path into its components

- path: the full original path as it was passed in.
- dir: the directory path of the given path
- name: the name of the file, not including the extension
- ext: the extension of the file, not including the dot
- filename: the full name of the file, including the extension (and dot)
- folders: the ancestral folders of the given dir as an array

```typescript
const { dir, name, ext, filename } = explodePath('/path/to/file.txt');

console.log(path); // '/path/to/file.txt'
console.log(dir); // '/path/to'
console.log(name); // 'file'
console.log(ext); // 'txt'
console.log(filename); // 'file.txt'
console.log(folders); // ['path', 'to']
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

#### ExplodedPath
- `PathsTools.ExplodedPath`
- `ExplodedPath`

An object containing the exploded components of a path

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

##### path
The full original path as it was passed in.

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

##### dir
The directory path of the given path

Note: no trailing slash

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

##### folders
the ancestral folders of the given dir as an array

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

##### name
the name of the file, not including the extension

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

##### ext
the extension of the file, not including the dot

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

##### filename
the full name of the file, including the extension (and dot)

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### removeTrailSlash
- `PathTools.removeTrailSlash`

Remove trailing slash from path (if one exists)

```typescript
'/path/to/file/' -> '/path/to/file'
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### trailSlash
- `PathTools.trailSlash`

Ensures there's a trailing slash on path

```typescript
'/path/to/file' -> '/path/to/file/'
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### removeDoubleSlashes
- `PathTools.removeDoubleSlashes`

Removes double slashes from path (an bug with Unix paths)

```typescript
'/path/to//file' -> '/path/to/file'
```

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

## progressBarTools
A collection of tools for working with progress bars (from swiss-ak)

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### getColouredProgressBarOpts
- `progressBarTools.getColouredProgressBarOpts`

Helper for providing a consistent set of options for a progress bar, and colouring them appropriately

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

## waiters

### nextTick
- `nextTick`

Wait for the next tick

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

## keyListener

### getKeyListener
- `getKeyListener`

Listens for key presses and returns the key name and raw value.

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

<!-- DOCS: MAIN END -->
