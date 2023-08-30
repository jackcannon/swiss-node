# swiss-node

Swiss Army Knife for node

A collection of helper functions and useful little things for node.js

Uses `swiss-ak`

<!-- DOCS: TOC START -->

  - [**Table of Contents**](#)
    - [**ask**](#ask)
    - [**out**](#out)
    - [**table**](#table)
    - [**Logger**](#logger)
    - [**chlk**](#chlk)
    - [**clr**](#clr)
    - [**LogTools**](#logtools)
    - [**PathTools**](#pathtools)
    - [**progressBarTools**](#progressbartools)
    - [**waiters**](#waiters)
    - [**keyListener**](#keylistener)

<!-- DOCS: TOC END -->

<!-- DOCS: MAIN START -->

## ask
A collection of functions to ask the user for input.

  - [**ask**](#ask)
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
    - [**table (ask)**](#table-ask)
      - [select](#select)
      - [multiselect](#multiselect)
    - [trim](#trim)
    - [separator](#separator)
    - [section](#section)
    - [**utils**](#utils)
      - [itemsToPromptObjects](#itemstopromptobjects)

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### text

```typescript
ask.text;
```

Get a text input from the user.

```typescript
const name = await ask.text('What is your name?'); // 'Jack'
```

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### autotext

```typescript
ask.autotext;
```

Get a text input from the user, with auto-completion.

```typescript
const name = await ask.autotext('What is your name?', ['Jack', 'Jane', 'Joe']); // 'Jack'
```

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### number

```typescript
ask.number;
```

Get a number input from the user.

```typescript
const age = await ask.number('How old are you?'); // 30
```

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### boolean

```typescript
ask.boolean;
```

Get a boolean input from the user (yes or no)

```typescript
const isCool = await ask.boolean('Is this cool?'); // true
```

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### booleanAlt

```typescript
ask.booleanAlt;
```

Get a boolean input from the user (yes or no)

Alternative interface to ask.boolean

```typescript
const isCool = await ask.boolean('Is this cool?'); // true
```

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### select

```typescript
ask.select;
```

Get the user to select an option from a list.

```typescript
const colour = await ask.select('Whats your favourite colour?', ['red', 'green', 'blue']); // 'red'
```

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### multiselect

```typescript
ask.multiselect;
```

Get the user to select multiple opts from a list.

```typescript
const colours = await ask.multiselect('Whats your favourite colours?', ['red', 'green', 'blue']); // ['red', 'green']
```

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### crud

```typescript
ask.crud;
```

Get the user to select a CRUD (**C**reate, **R**ead, **U**pdate and **D**elete) action

Values returned are: 'none' | 'create' | 'update' | 'delete' | 'delete-all'

```typescript
const action = await ask.crud('What do you want to do next?'); // 'none'
```

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### validate

```typescript
ask.validate;
```

Validate the result of an `ask` prompt

```typescript
const name = await ask.validate(
  () => ask.text('What is your name?'),
  (name) => name.length > 0
); // 'Jack'
```

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### imitate

```typescript
ask.imitate;
```

Imitate the display of a prompt

```typescript
imitate(true, 'What is your name?', 'Jack');

ask.imitate(true, 'What is your name?', 'Jack');
```

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### prefill

```typescript
ask.prefill;
```

Auto-fills an ask prompt with the provided value, if defined.

Continues to display the 'prompt', but already 'submitted'

Good for keeping skipping parts of forms, but providing context and keeping display consistent

```typescript
let data = {};
const name1 = ask.prefill(data.name, 'What is your name?', ask.text); // User input

data = {name: 'Jack'}
const name2 = ask.prefill(data.name, 'What is your name?', ask.text); // Jack
```

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### loading

```typescript
ask.loading;
```

Display an animated loading indicator that imitates the display of a prompt

```typescript
const loader = ask.loading('What is your name?');
// ...
loader.stop();
```

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### pause

```typescript
ask.pause;
```

Pause the program until the user presses enter

```typescript
await ask.pause();
```

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### countdown

```typescript
ask.countdown;
```

Animated countdown for a given number of seconds

```typescript
await ask.countdown(5);
```

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### wizard

```typescript
ask.wizard;
```

Create a wizard object that can be used to build up a complex object

```typescript
interface Example {
  foo: string;
  bar: number;
  baz: string;
}

const base: Partial<Example> = {
  baz: 'baz'
};

const wiz = ask.wizard<Example>(base);

const foo = await ask.text('What is foo?'); // User input: foo
wiz.add({ foo });

const bar = await ask.number('What is bar?'); // User input: 123
wiz.add({ bar });

const result = wiz.get(); // { baz: 'baz', foo: 'foo', bar: 123 }
```

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### date

```typescript
ask.date;
```

Get a date input from the user.

```typescript
const date = await ask.date('Whats the date?');
// [Date: 2023-01-01T12:00:00.000Z] (user inputted date, always at 12 midday)
```

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### time

```typescript
ask.time;
```

Get a time input from the user.

```typescript
const time = await ask.time('Whats the time?');
// [Date: 2023-01-01T12:00:00.000Z] (user inputted time, with todays date)

const time2 = await ask.time('Whats the time?', new Date('1999-12-31'));
// [Date: 1999-12-31T12:00:00.000Z] (user inputted time, with same date as initial)
```

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### datetime

```typescript
ask.datetime;
```

Get a date and time input from the user.

```typescript
const when = await ask.datetime('Whats the date/time?');
// [Date: 2023-03-05T20:30:00.000Z] (user inputted time & date)
```

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### dateRange

```typescript
ask.dateRange;
```

Get a date range input from the user.

```typescript
const range = await ask.dateRange('When is the festival?');
// [
//   [Date: 2023-03-01T12:00:00.000Z],
//   [Date: 2023-03-31T12:00:00.000Z]
// ]
```

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### fileExplorer

```typescript
ask.fileExplorer;
```

Get a file or folder path from the user.

```typescript
const file = await ask.fileExplorer('What file?', 'f');
// '/Users/user/Documents/some_file.txt'

const dir = await ask.fileExplorer('What file?', 'd', '/Users/jackcannon/Documents');
// '/Users/jackcannon/Documents/some_folder'
```

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### multiFileExplorer

```typescript
ask.multiFileExplorer;
```

Get multiple file or folder paths from the user.

```typescript
const files = await ask.multiFileExplorer('What files?', 'f');
// [
//   '/Users/user/Documents/some_file_1.txt',
//   '/Users/user/Documents/some_file_2.txt',
//   '/Users/user/Documents/some_file_3.txt'
// ]
```

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### saveFileExplorer

```typescript
ask.saveFileExplorer;
```

Get a file path from the user, with the intention of saving a file to that path.

```typescript
const HOME_DIR = '/Users/user/Documents';
const savePath = await ask.saveFileExplorer('Save file', HOME_DIR, 'data.json');
// '/Users/user/Documents/data.json'
```

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### table (ask)
A collection of functions for asking questions with tables.

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

#### select

```typescript
ask.table.select;
```

Get a single selection from a table.

```typescript
const items = [
  { name: 'John', age: 25 },
  { name: 'Jane', age: 26 },
  { name: 'Derek', age: 27 }
];
const headers = [['Name', 'Age']];
const itemToRow = ({ name, age }) => [name, age];

const answer = await ask.table.select('Who?', items, undefined, itemToRow, headers);
// ┏━━━┳━━━━━━━┳━━━━━┓
// ┃   ┃ Name  ┃ Age ┃
// ┡━━━╇━━━━━━━╇━━━━━┩
// │   │ John  │ 25  │
// ├───┼───────┼─────┤
// │ ❯ │ Jane  │ 26  │
// ├───┼───────┼─────┤
// │   │ Derek │ 27  │
// └───┴───────┴─────┘
// Returns: { name: 'Jane', age: 26 }
```

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

#### multiselect

```typescript
ask.table.multiselect;
```

Get multiple selections from a table.

```typescript
const items = [
  { name: 'John', age: 25 },
  { name: 'Jane', age: 26 },
  { name: 'Derek', age: 27 }
];
const headers = [['Name', 'Age']];
const itemToRow = ({ name, age }) => [name, age];

const answer = await ask.table.multiselect('Who?', items, undefined, itemToRow, headers);
┏━━━┳━━━━━━━┳━━━━━┓
┃   ┃ Name  ┃ Age ┃
┡━━━╇━━━━━━━╇━━━━━┩
│ ◉ │ John  │ 25  │
├───┼───────┼─────┤
│ ◯ │ Jane  │ 26  │
├───┼───────┼─────┤
│ ◉ │ Derek │ 27  │
└───┴───────┴─────┘
// [
//   { name: 'John', age: 25 },
//   { name: 'Derek', age: 27 }
// ]
```

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### trim

```typescript
ask.trim;
```

Get a start and end frame from the user

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### separator

```typescript
ask.separator;
```

Prints a separator line to the console.

```typescript
ask.separator('down');
// ┄┄┄┄┄▿┄┄┄┄┄┄┄▿┄┄┄┄┄┄┄▿┄┄┄┄┄┄┄▿┄┄┄┄┄┄┄▿┄┄┄┄┄┄┄▿┄┄┄┄┄┄

ask.separator('none', 15);
// ┄┄┄┄┄┄┄┄┄┄◦┄┄┄┄┄┄┄┄┄┄┄┄┄┄◦┄┄┄┄┄┄┄┄┄┄┄┄┄┄◦┄┄┄┄┄┄┄┄┄┄┄

ask.separator('up', 5, 2);
// ┄┄┄┄┄┄┄┄▵┄┄┄┄▵┄┄┄┄▵┄┄┄┄▵┄┄┄┄▵┄┄┄┄▵┄┄┄┄▵┄┄┄┄▵┄┄┄┄┄┄┄┄
```

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### section

```typescript
ask.section;
```

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

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### utils

#### itemsToPromptObjects

```typescript
ask.utils.itemsToPromptObjects;
```

Take an array of items and convert them to an array of prompt objects

```typescript
ask.utils.itemsToPromptObjects(['lorem', 'ipsum', 'dolor'])
// [
//   { title: 'lorem', value: 'lorem' },
//   { title: 'ipsum', value: 'ipsum' },
//   { title: 'dolor', value: 'dolor' }
// ]

ask.utils.itemsToPromptObjects(['lorem', 'ipsum', 'dolor'], ['Lorem', 'Ipsum', 'Dolor'])
// [
//   { title: 'Lorem', value: 'lorem' },
//   { title: 'Ipsum', value: 'ipsum' },
//   { title: 'Dolor', value: 'dolor' }
// ]

ask.utils.itemsToPromptObjects(['lorem', 'ipsum', 'dolor'], undefined, (s) => s.toUpperCase())
// [
//   { title: 'LOREM', value: 'lorem' },
//   { title: 'IPSUM', value: 'ipsum' },
//   { title: 'DOLOR', value: 'dolor' }
// ]
```

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

## out
A collection of functions to print to the console

  - [**out**](#out)
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
    - [**getResponsiveValue**](#getresponsivevalue)
      - [ResponsiveOption<T>](#responsiveoptiont)
    - [**getBreadcrumb**](#getbreadcrumb)
      - [Breadcrumb](#breadcrumb)
    - [**getLineCounter**](#getlinecounter)
      - [**LineCounter**](#linecounter)
        - [lc.log](#lclog)
        - [lc.move](#lcmove)
        - [lc.wrap](#lcwrap)
        - [lc.add](#lcadd)
        - [lc.get](#lcget)
        - [lc.getSince](#lcgetsince)
        - [lc.clear](#lcclear)
        - [lc.clearBack](#lcclearback)
        - [lc.checkpoint](#lccheckpoint)
        - [lc.clearToCheckpoint](#lccleartocheckpoint)
    - [**utils**](#utils)
      - [getTerminalWidth](#getterminalwidth)
      - [getLines](#getlines)
      - [getNumLines](#getnumlines)
      - [getLinesWidth](#getlineswidth)
      - [getLogLines](#getloglines)
      - [getNumLogLines](#getnumloglines)
      - [getLogLinesWidth](#getloglineswidth)
      - [joinLines](#joinlines)
      - [hasColor](#hascolor)

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### pad

```typescript
out.pad;
```

Pad before and after the given text with the given character.

```typescript
pad('foo', 3, 1, '-'); // '---foo-'
pad('bar', 10, 5, '_'); // '__________bar_____'
```

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### center

```typescript
out.center;
```

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

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### left

```typescript
out.left;
```

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

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### right

```typescript
out.right;
```

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

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### justify

```typescript
out.justify;
```

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

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### leftLines

```typescript
out.leftLines;
```

Align each line of the given text to the left within the given width of characters/columns

```typescript
out.leftLines(['This is line 1', 'This is a longer line 2', 'Line 3']);
// [
//   'This is line 1         ',
//   'This is a longer line 2',
//   'Line 3                 '
// ]
```

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### centerLines

```typescript
out.centerLines;
```

Align each line of the given text to the center within the given width of characters/columns

```typescript
out.rightLines(['This is line 1', 'This is a longer line 2', 'Line 3']);
// [
//   '         This is line 1',
//   'This is a longer line 2',
//   '                 Line 3'
// ]
```

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### rightLines

```typescript
out.rightLines;
```

Align each line of the given text to the right within the given width of characters/columns

```typescript
out.centerLines(['This is line 1', 'This is a longer line 2', 'Line 3']);
// [
//   '    This is line 1     ',
//   'This is a longer line 2',
//   '        Line 3         '
// ]
```

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### justifyLines

```typescript
out.justifyLines;
```

Justify align each line of the given text within the given width of characters/columns

```typescript
out.justifyLines(['This is line 1', 'This is a longer line 2', 'Line 3']);
// [
//   'This    is    line    1',
//   'This is a longer line 2',
//   'Line                  3'
// ]
```

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### align

```typescript
out.align;
```

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

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### split

```typescript
out.split;
```

Split the given text into two parts, left and right, with the given width of characters/columns

```typescript
out.split('Left', 'Right', 15); // Left      Right
```

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### wrap

```typescript
out.wrap;
```

Wrap the given text to the given width of characters/columns

```typescript
wrap('This is a sentence', 15);
// 'This is' + '\n' +
// 'a sentence'
```

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### moveUp

```typescript
out.moveUp;
```

Move the terminal cursor up X lines, clearing each row.

Useful for replacing previous lines of output

```typescript
moveUp(1);
```

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### loading

```typescript
out.loading;
```

Display an animated loading indicator

```typescript
const loader = out.loading();
// ...
loader.stop();
```

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### limitToLength

```typescript
out.limitToLength;
```

Limit the length of a string to the given length

```typescript
out.limitToLength('This is a very long sentence', 12); // 'This is a ve'
```

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### limitToLengthStart

```typescript
out.limitToLengthStart;
```

Limit the length of a string to the given length, keeping the end

```typescript
out.limitToLengthStart('This is a very long sentence', 12); // 'ong sentence'
```

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### truncate

```typescript
out.truncate;
```

Limit the length of a string to the given length, and add an ellipsis if necessary

```typescript
out.truncate('This is a very long sentence', 15); // 'This is a ve...'
```

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### truncateStart

```typescript
out.truncateStart;
```

Limit the length of a string to the given length, and add an ellipsis if necessary, keeping the end

```typescript
out.truncateStart('This is a very long sentence', 15); // '...ong sentence'
```

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### concatLineGroups

```typescript
out.concatLineGroups;
```

Concatenate multiple line groups, aligning them by the longest line

```typescript
out.concatLineGroups(['lorem', 'ipsum'], ['dolor', 'sit', 'amet']);
// [ 'loremdolor', 'ipsumsit  ', '     amet ' ]
```

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### getResponsiveValue

```typescript
out.getResponsiveValue;
```

Get a value based on the terminal width

```typescript
out.getResponsiveValue([
  {minColumns: 0, value: 'a'},
  {minColumns: 10, value: 'b'},
  {minColumns: 100, value: 'c'},
  {minColumns: 1000, value: 'd'}
]) // c
```

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

#### ResponsiveOption<T>

```typescript
out.ResponsiveOption;
```

Configuration for a responsive value (see `getResponsiveValue`)

See getResponsiveValue for an example

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### getBreadcrumb

```typescript
out.getBreadcrumb;
getBreadcrumb;
```

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

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

#### Breadcrumb

```typescript
out.Breadcrumb;
Breadcrumb;
```

Return type for getBreadcrumb

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### getLineCounter

```typescript
out.getLineCounter;
getLineCounter;
```

Get line counter for counter output lines

```typescript
const lc = getLineCounter();
lc.log('hello'); // 1
lc.wrap(undefined, () => table.print(['hello', 'world'])); // 1
lc.add(1);
lc.get(); // 3
lc.clear();
```

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

#### LineCounter

```typescript
out.LineCounter;
LineCounter;
```

Return type for getLineCounter

```typescript
const lc = getLineCounter();
lc.log('hello'); // 1
lc.wrap(undefined, () => table.print(['hello', 'world'])); // 1
lc.add(1);
lc.get(); // 3
lc.clear();
```

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

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

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

##### lc.move
Moves the cursor up by a given number of lines

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

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

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

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

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

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

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

##### lc.getSince
Returns the number of lines since a given checkpoint

```typescript
const lc = getLineCounter();
lc.log('hello'); // 1
lc.checkpoint('test-a');
lc.wrap(undefined, () => table.print(['hello', 'world'])); // 1
lc.checkpoint('test-b');
lc.add(1);
lc.getSince('test-a'); // 2
lc.getSince('test-b'); // 1
```

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

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

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

##### lc.clearBack
Clears a given number of lines, and updates the line counter

```typescript
const lc = getLineCounter();
lc.log('line 1'); // 1
lc.log('line 2'); // 1
lc.log('line 3'); // 1
lc.log('line 4'); // 1
lc.clearBack(2); // ('line 3' and 'line 4' are cleared)
```

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

##### lc.checkpoint
Records a 'checkpoint' that can be returned to later

```typescript
const lc = getLineCounter();
lc.log('hello'); // 1
lc.checkpoint('test-a');
lc.wrap(undefined, () => table.print(['hello', 'world'])); // 1
lc.checkpoint('test-b');
lc.add(1);
lc.getSince('test-a'); // 2
lc.getSince('test-b'); // 1
```

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

##### lc.clearToCheckpoint
Clear lines up to a previously recorded checkpoint

```typescript
const lc = getLineCounter();
lc.log('line 1'); // 1
lc.log('line 2'); // 1
lc.checkpoint('test');
lc.log('line 3'); // 1
lc.log('line 4'); // 1
lc.clearToCheckpoint('test'); // ('line 3' and 'line 4' are cleared)
```

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### utils

#### getTerminalWidth

```typescript
out.utils.getTerminalWidth;
```

Get maximum terminal width (columns)

```typescript
print.utils.getTerminalWidth(); // 127
```

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

#### getLines

```typescript
out.utils.getLines;
```

Split multi-line text into an array of lines

```typescript
out.utils.getLines(`
this is line 1
this is line 2
`); // [ '', 'this is line 1', 'this is line 2', '' ]
```

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

#### getNumLines

```typescript
out.utils.getNumLines;
```

Get how many lines a string or array of lines has

```typescript
out.utils.getNumLines(`
this is line 1
this is line 2
`); // 4
```

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

#### getLinesWidth

```typescript
out.utils.getLinesWidth;
```

Get how wide a string or array of lines has

```typescript
out.utils.getLinesWidth(`
this is line 1
this is line 2
`) // 14
```

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

#### getLogLines

```typescript
out.utils.getLogLines;
```

Split a log-formatted multi-line text into an array of lines

```typescript
out.utils.getLogLines(`
this is line 1
this is line 2
`); // [ '', 'this is line 1', 'this is line 2', '' ]
```

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

#### getNumLogLines

```typescript
out.utils.getNumLogLines;
```

Get how many lines a log-formatted string or array of lines has

```typescript
out.utils.getNumLogLines(`
this is line 1
this is line 2
`); // 4
```

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

#### getLogLinesWidth

```typescript
out.utils.getLogLinesWidth;
```

Get how wide a log-formatted string or array of lines has

```typescript
out.utils.getLogLinesWidth(`
this is line 1
this is line 2
`) // 14
```

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

#### joinLines

```typescript
out.utils.joinLines;
```

Join an array of lines into a single multi-line string

```typescript
out.utils.joinLines(['this is line 1', 'this is line 2'])
// 'this is line 1' + '\n' +
// 'this is line 2'
```

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

#### hasColor

```typescript
out.utils.hasColor;
```

Determine whether a given string contains any chalk-ed colours

```typescript
out.utils.hasColor('this is line 1') // false
out.utils.hasColor(chalk.red('this is line 1')) // true
```

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

## table
A simple table generator

  - [**table**](#table)
    - [print](#print)
    - [printObjects](#printobjects)
    - [markdown](#markdown)
    - [getLines](#getlines)
    - [**TableOptions**](#tableoptions)
    - [**TableFormatConfig**](#tableformatconfig)
    - [TableCharLookup](#tablecharlookup)
    - [**utils**](#utils)
      - [objectsToTable](#objectstotable)
      - [transpose](#transpose)
      - [concatRows](#concatrows)
      - [getFormat](#getformat)

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### print

```typescript
table.print;
```

Print a table

```typescript
const header = [['Name', 'Age']];
const body = [['John', '25'], ['Jane', '26']];
table.print(body, header); // 7

// ┏━━━━━━┳━━━━━┓
// ┃ Name ┃ Age ┃
// ┡━━━━━━╇━━━━━┩
// │ John │ 25  │
// ├──────┼─────┤
// │ Jane │ 26  │
// └──────┴─────┘
```

<p style="text-align: right" align="right"><a href="#table"> [↑ Back to <b>table</b> ↑] </a></p>

### printObjects

```typescript
table.printObjects;
```

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
table.printObjects(objs, header); // 11

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

<p style="text-align: right" align="right"><a href="#table"> [↑ Back to <b>table</b> ↑] </a></p>

### markdown

```typescript
table.markdown;
```

Generate a markdown table

```typescript
const header = [['Name', 'Age (in years)', 'Job']];
const body = [
  ['Alexander', '25', 'Builder'],
  ['Jane', '26', 'Software Engineer']
];
const md = table.markdown(body, header, { alignCols: ['right', 'center', 'left'] });
console.log(md.join('\n'));

// |      Name | Age (in years) | Job               |
// |----------:|:--------------:|:------------------|
// | Alexander |       25       | Builder           |
// |      Jane |       26       | Software Engineer |
```

<p style="text-align: right" align="right"><a href="#table"> [↑ Back to <b>table</b> ↑] </a></p>

### getLines

```typescript
table.getLines;
```

Get the lines of a table (rather than printing it)

```typescript
const header = [['Name', 'Age']];
const body = [['John', '25'], ['Jane', '26']];
table.getLines(body, header);
// [
//   '┏━━━━━━┳━━━━━┓',
//   '┃ \x1B[1mName\x1B[22m ┃ \x1B[1mAge\x1B[22m ┃',
//   '┡━━━━━━╇━━━━━┩',
//   '│ John │ 25  │',
//   '├──────┼─────┤',
//   '│ Jane │ 26  │',
//   '└──────┴─────┘'
// ]
```

<p style="text-align: right" align="right"><a href="#table"> [↑ Back to <b>table</b> ↑] </a></p>

### TableOptions
The configuration options for the table

  - [**TableOptions**](#tableoptions)
    - [wrapperFn](#wrapperfn)
    - [wrapLinesFn](#wraplinesfn)
    - [wrapHeaderLinesFn](#wrapheaderlinesfn)
    - [wrapBodyLinesFn](#wrapbodylinesfn)
    - [overrideChar](#overridechar)
    - [overrideHorChar](#overridehorchar)
    - [overrideVerChar](#overrideverchar)
    - [overrideCornChar](#overridecornchar)
    - [overrideOuterChar](#overrideouterchar)
    - [overrideCharSet](#overridecharset)
    - [overridePrioritiseVer](#overrideprioritisever)
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

<p style="text-align: right" align="right"><a href="#table"> [↑ Back to <b>table</b> ↑] </a></p>

#### wrapperFn
Function to wrap each line of the output in (e.g. chalk.blue)

<p style="text-align: right" align="right"><a href="#tableoptions"> [↑ Back to <b>TableOptions</b> ↑] </a></p>

#### wrapLinesFn
Function to wrap the output lines of each cell of the table (e.g. chalk.blue)

<p style="text-align: right" align="right"><a href="#tableoptions"> [↑ Back to <b>TableOptions</b> ↑] </a></p>

#### wrapHeaderLinesFn
Function to wrap the output lines of each cell of the header of the table (e.g. chalk.blue)

Default: `chalk.bold`

<p style="text-align: right" align="right"><a href="#tableoptions"> [↑ Back to <b>TableOptions</b> ↑] </a></p>

#### wrapBodyLinesFn
Function to wrap the output lines of each cell of the body of the table (e.g. chalk.blue)

<p style="text-align: right" align="right"><a href="#tableoptions"> [↑ Back to <b>TableOptions</b> ↑] </a></p>

#### overrideChar
Character to use instead of lines

Override character options are applied in the following order (later options have higher priority):
overrideChar, overrideHorChar/overrideVerChar (see overridePrioritiseVer), overrideOuterChar, overrideCornChar, overrideCharSet

<p style="text-align: right" align="right"><a href="#tableoptions"> [↑ Back to <b>TableOptions</b> ↑] </a></p>

#### overrideHorChar
Character to use instead of horizontal lines

Override character options are applied in the following order (later options have higher priority):
overrideChar, overrideHorChar/overrideVerChar (see overridePrioritiseVer), overrideOuterChar, overrideCornChar, overrideCharSet

<p style="text-align: right" align="right"><a href="#tableoptions"> [↑ Back to <b>TableOptions</b> ↑] </a></p>

#### overrideVerChar
Character to use instead of vertical lines

Override character options are applied in the following order (later options have higher priority):
overrideChar, overrideHorChar/overrideVerChar (see overridePrioritiseVer), overrideOuterChar, overrideCornChar, overrideCharSet

<p style="text-align: right" align="right"><a href="#tableoptions"> [↑ Back to <b>TableOptions</b> ↑] </a></p>

#### overrideCornChar
Character to use instead of corner and intersecting lines (┌, ┬, ┐, ├, ┼, ┤, └, ┴, ┘)

Override character options are applied in the following order (later options have higher priority):
overrideChar, overrideHorChar/overrideVerChar (see overridePrioritiseVer), overrideOuterChar, overrideCornChar, overrideCharSet

<p style="text-align: right" align="right"><a href="#tableoptions"> [↑ Back to <b>TableOptions</b> ↑] </a></p>

#### overrideOuterChar
Character to use instead of lines on the outside of the table (┌, ┬, ┐, ├, ┤, └, ┴, ┘)

Override character options are applied in the following order (later options have higher priority):
overrideChar, overrideHorChar/overrideVerChar (see overridePrioritiseVer), overrideOuterChar, overrideCornChar, overrideCharSet

<p style="text-align: right" align="right"><a href="#tableoptions"> [↑ Back to <b>TableOptions</b> ↑] </a></p>

#### overrideCharSet
Completely override all the characters used in the table.

See TableCharLookup for more information.

Default:
```
{
  hTop: ['━', '┏', '┳', '┓'],
  hNor: [' ', '┃', '┃', '┃'],
  hSep: ['━', '┣', '╋', '┫'],
  hBot: ['━', '┗', '┻', '┛'],
  mSep: ['━', '┡', '╇', '┩'],
  bTop: ['─', '┌', '┬', '┐'],
  bNor: [' ', '│', '│', '│'],
  bSep: ['─', '├', '┼', '┤'],
  bBot: ['─', '└', '┴', '┘']
}
```

<p style="text-align: right" align="right"><a href="#tableoptions"> [↑ Back to <b>TableOptions</b> ↑] </a></p>

#### overridePrioritiseVer
By default, if not overrideHorChar and overrideVerChar are set, overrideHorChar will be prioritised (and used where both are applicable).
Setting this to true will prioritise overrideVerChar instead.

Default: `false`

<p style="text-align: right" align="right"><a href="#tableoptions"> [↑ Back to <b>TableOptions</b> ↑] </a></p>

#### drawOuter
Whether to draw the outer border of the table

<p style="text-align: right" align="right"><a href="#tableoptions"> [↑ Back to <b>TableOptions</b> ↑] </a></p>

#### drawRowLines
Whether to draw lines between rows (other than separating header and body)

<p style="text-align: right" align="right"><a href="#tableoptions"> [↑ Back to <b>TableOptions</b> ↑] </a></p>

#### drawColLines
Whether to draw lines between columns

<p style="text-align: right" align="right"><a href="#tableoptions"> [↑ Back to <b>TableOptions</b> ↑] </a></p>

#### colWidths
Preferred width (in number of characters) of each column

<p style="text-align: right" align="right"><a href="#tableoptions"> [↑ Back to <b>TableOptions</b> ↑] </a></p>

#### align
How the table should be aligned on the screen

left, right, center or justify

<p style="text-align: right" align="right"><a href="#tableoptions"> [↑ Back to <b>TableOptions</b> ↑] </a></p>

#### alignCols
How each column should be aligned

Array with alignment for each column: left, right, center or justify

<p style="text-align: right" align="right"><a href="#tableoptions"> [↑ Back to <b>TableOptions</b> ↑] </a></p>

#### transpose
Change rows into columns and vice versa

<p style="text-align: right" align="right"><a href="#tableoptions"> [↑ Back to <b>TableOptions</b> ↑] </a></p>

#### transposeBody
Change rows into columns and vice versa (body only)

<p style="text-align: right" align="right"><a href="#tableoptions"> [↑ Back to <b>TableOptions</b> ↑] </a></p>

#### margin
The amount of space to leave around the outside of the table

<p style="text-align: right" align="right"><a href="#tableoptions"> [↑ Back to <b>TableOptions</b> ↑] </a></p>

#### cellPadding
The amount of space to leave around the outside of each cell

<p style="text-align: right" align="right"><a href="#tableoptions"> [↑ Back to <b>TableOptions</b> ↑] </a></p>

#### format
A set of formatting configurations

<p style="text-align: right" align="right"><a href="#tableoptions"> [↑ Back to <b>TableOptions</b> ↑] </a></p>

#### truncate
Truncates (cuts the end off) line instead of wrapping

<p style="text-align: right" align="right"><a href="#tableoptions"> [↑ Back to <b>TableOptions</b> ↑] </a></p>

#### maxWidth
Maximum width of the table

<p style="text-align: right" align="right"><a href="#tableoptions"> [↑ Back to <b>TableOptions</b> ↑] </a></p>

### TableFormatConfig
Configuration for formatting a cell

  - [**TableFormatConfig**](#tableformatconfig)
    - [formatFn](#formatfn)
    - [isHeader](#isheader)
    - [isBody](#isbody)
    - [row](#row)
    - [col](#col)

<p style="text-align: right" align="right"><a href="#table"> [↑ Back to <b>table</b> ↑] </a></p>

#### formatFn
A wrapper function to apply to the cell

<p style="text-align: right" align="right"><a href="#tableformatconfig"> [↑ Back to <b>TableFormatConfig</b> ↑] </a></p>

#### isHeader
Whether to apply the format to the header

<p style="text-align: right" align="right"><a href="#tableformatconfig"> [↑ Back to <b>TableFormatConfig</b> ↑] </a></p>

#### isBody
Whether to apply the format to the body

<p style="text-align: right" align="right"><a href="#tableformatconfig"> [↑ Back to <b>TableFormatConfig</b> ↑] </a></p>

#### row
A specific row to apply the format to

<p style="text-align: right" align="right"><a href="#tableformatconfig"> [↑ Back to <b>TableFormatConfig</b> ↑] </a></p>

#### col
A specific column to apply the format to

<p style="text-align: right" align="right"><a href="#tableformatconfig"> [↑ Back to <b>TableFormatConfig</b> ↑] </a></p>

### TableCharLookup
The configuration for the table line characters

Each property in the object represents a row type:

| Type   | Description                                                       | Example     |
|:------:|-------------------------------------------------------------------|:-----------:|
| `hTop` | Lines at the top of the table, if there's a header                | `┏━━━┳━━━┓` |
| `hNor` | Regular lines of cells in a header cell                           | `┃...┃...┃` |
| `hSep` | Lines between rows of the header                                  | `┣━━━╋━━━┫` |
| `hBot` | Lines at the bottom of the table, if there's a header but no body | `┗━━━┻━━━┛` |
| `mSep` | Lines between the header and the body if both are there           | `┡━━━╇━━━┩` |
| `bTop` | Lines at the top of the table, if there's not a header            | `┌───┬───┐` |
| `bNor` | Regular lines of cells in a body cell                             | `│...│...│` |
| `bSep` | Lines between rows of the body                                    | `├───┼───┤` |
| `bBot` | Lines at the bottom of the table                                  | `└───┴───┘` |

Each item in each array is a character to use for the row type:

| Index | Description                                                               | Example |
|:-----:|---------------------------------------------------------------------------|:-------:|
| `0`   | A regular character for the row (gets repeated for the width of the cell) | `━`     |
| `1`   | A border line at the start of the row                                     | `┣`     |
| `2`   | A border line between cells                                               | `╋`     |
| `3`   | A border line at the end of the row                                       | `┫`     |

<p style="text-align: right" align="right"><a href="#table"> [↑ Back to <b>table</b> ↑] </a></p>

### utils

#### objectsToTable

```typescript
table.utils.objectsToTable;
```

Process an array of objects into a table format (string[][])

```typescript
const objs = [
  { name: 'John', age: 25 },
  { name: 'Jane', age: 26 }
];
table.utils.objectsToTable(objs)
// {
//   header: [ [ 'name', 'age' ] ],
//   body: [ [ 'John', 25 ], [ 'Jane', 26 ] ]
// }
```

<p style="text-align: right" align="right"><a href="#table"> [↑ Back to <b>table</b> ↑] </a></p>

#### transpose

```typescript
table.utils.transpose;
```

Change rows into columns and vice versa

```typescript
const input = [
  ['John', 25],
  ['Jane', 26],
  ['Derek', 27]
];
table.utils.transpose(input)
// [
//   [ 'John', 'Jane', 'Derek' ],
//   [ 25, 26, 27 ]
// ]
```

<p style="text-align: right" align="right"><a href="#table"> [↑ Back to <b>table</b> ↑] </a></p>

#### concatRows

```typescript
table.utils.concatRows;
```

Concatenate header and body rows into one list of rows

```typescript
const header = [['Name', 'Age']];
const body = [
  ['John', 25],
  ['Jane', 26],
  ['Derek', 27]
];
table.utils.concatRows({header, body})
// [
//   [ 'Name', 'Age' ],
//   [ 'John', 25 ],
//   [ 'Jane', 26 ],
//   [ 'Derek', 27 ]
// ]
```

<p style="text-align: right" align="right"><a href="#table"> [↑ Back to <b>table</b> ↑] </a></p>

#### getFormat

```typescript
table.utils.getFormat;
```

A function for simplifying the format configuration

```typescript
const wrap = (str: string) => 'X';

const format = [table.utils.getFormat(wrap, 0, 0), table.utils.getFormat(wrap, 1, 1, false, true), table.utils.getFormat(wrap, 2, 2, true, false)];
// [
//   { formatFn: wrap, row: 0, col: 0 },
//   { formatFn: wrap, row: 1, col: 1, isHeader: false, isBody: true },
//   { formatFn: wrap, row: 2, col: 2, isHeader: true, isBody: false }
// ]

const header = partition(range(9), 3);
const body = partition(range(9), 3);
table.print(header, body, {format})
// ┏━━━┳━━━┳━━━┓
// ┃ 0 ┃ 1 ┃ 2 ┃
// ┣━━━╋━━━╋━━━┫
// ┃ 3 ┃ 4 ┃ 5 ┃
// ┣━━━╋━━━╋━━━┫
// ┃ 6 ┃ 7 ┃ X ┃
// ┡━━━╇━━━╇━━━┩
// │ X │ 1 │ 2 │
// ├───┼───┼───┤
// │ 3 │ X │ 5 │
// ├───┼───┼───┤
// │ 6 │ 7 │ 8 │
// └───┴───┴───┘
```

<p style="text-align: right" align="right"><a href="#table"> [↑ Back to <b>table</b> ↑] </a></p>

## Logger
  - [**Logger**](#logger)
    - [log](#log)
    - [createLogger](#createlogger)
    - [LogOptions](#logoptions)
    - [LogConfig](#logconfig)

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### log

```typescript
log;
```

A set of log functions

```typescript
log.blank('This is blank');     //                       This is blank
log.log('This is log');         // [12:00:00.123]  LOG   This is log
log.out('This is out');         // [12:00:00.123]  OUT   This is out
log.normal('This is normal');   // [12:00:00.123]  LOG   This is normal
log.verbose('This is verbose'); // [12:00:00.123]  LOG   This is verbose
log.debug('This is debug');     // [12:00:00.123]  DBUG  This is debug
log.info('This is info');       // [12:00:00.123]  INFO  This is info
log.warn('This is warn');       // [12:00:00.123]  WARN  This is warn
log.error('This is error');     // [12:00:00.123]  ERRR  This is error
```

<p style="text-align: right" align="right"><a href="#logger"> [↑ Back to <b>Logger</b> ↑] </a></p>

### createLogger

```typescript
createLogger;
```

Create a logger with custom configs

```typescript
const log = createLogger({
  myLog: {
    name: 'MYLOG',
    nameColour: chalk.magenta,
    showDate: false,
    showTime: true,
    contentColour: chalk.yellowBright
  }
});

log.myLog('Hello World'); // [12:00:00.123]  MYLOG  Hello World
```

<p style="text-align: right" align="right"><a href="#logger"> [↑ Back to <b>Logger</b> ↑] </a></p>

### LogOptions

```typescript
LogOptions;
```

Options for the log function

<p style="text-align: right" align="right"><a href="#logger"> [↑ Back to <b>Logger</b> ↑] </a></p>

### LogConfig

```typescript
LogConfig;
```

Configuration for the log function

See createLogger

<p style="text-align: right" align="right"><a href="#logger"> [↑ Back to <b>Logger</b> ↑] </a></p>

## chlk
A collection of colours and styles for use in the console.

  - [**chlk**](#chlk)
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

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### gray0

```typescript
chlk.gray0;
clr.gray0;
```

Gray 0 (0-5). Equivalent to chalk.black

<p style="text-align: right" align="right"><a href="#chlk"> [↑ Back to <b>chlk</b> ↑] </a></p>

### gray1

```typescript
chlk.gray1;
clr.gray1;
```

Gray 1 (0-5). Equivalent to chalk.gray.dim

<p style="text-align: right" align="right"><a href="#chlk"> [↑ Back to <b>chlk</b> ↑] </a></p>

### gray2

```typescript
chlk.gray2;
clr.gray2;
```

Gray 2 (0-5). Equivalent to chalk.white.dim

<p style="text-align: right" align="right"><a href="#chlk"> [↑ Back to <b>chlk</b> ↑] </a></p>

### gray3

```typescript
chlk.gray3;
clr.gray3;
```

Gray 3 (0-5). Equivalent to chalk.whiteBright.dim

<p style="text-align: right" align="right"><a href="#chlk"> [↑ Back to <b>chlk</b> ↑] </a></p>

### gray4

```typescript
chlk.gray4;
clr.gray4;
```

Gray 4 (0-5). Equivalent to chalk.white

<p style="text-align: right" align="right"><a href="#chlk"> [↑ Back to <b>chlk</b> ↑] </a></p>

### gray5

```typescript
chlk.gray5;
clr.gray5;
```

Gray 5 (0-5). Equivalent to chalk.whiteBright

<p style="text-align: right" align="right"><a href="#chlk"> [↑ Back to <b>chlk</b> ↑] </a></p>

### grays

```typescript
chlk.grays;
```

Grays between 0 and 5.

```typescript
grays[2]; // gray2
```

<p style="text-align: right" align="right"><a href="#chlk"> [↑ Back to <b>chlk</b> ↑] </a></p>

### gray

```typescript
chlk.gray;
```

Grays between 0 and 5.

```typescript
gray(2); // gray2
```

<p style="text-align: right" align="right"><a href="#chlk"> [↑ Back to <b>chlk</b> ↑] </a></p>

### clear

```typescript
chlk.clear;
```

Removes ANSI colours. Not same as chalk.reset

<p style="text-align: right" align="right"><a href="#chlk"> [↑ Back to <b>chlk</b> ↑] </a></p>

### not

```typescript
chlk.not;
```

Stops and restarts a style around a given string

<p style="text-align: right" align="right"><a href="#chlk"> [↑ Back to <b>chlk</b> ↑] </a></p>

### notUnderlined

```typescript
chlk.notUnderlined;
```

Dont underline a section of text

<p style="text-align: right" align="right"><a href="#chlk"> [↑ Back to <b>chlk</b> ↑] </a></p>

## clr
A collection of shortcuts and aliases for chalk functions

  - [**clr**](#clr)
    - [hl1](#hl1)
    - [hl2](#hl2)
    - [approve](#approve)
    - [create](#create)
    - [update](#update)
    - [remove](#remove)
    - [removeAll](#removeall)
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

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### hl1

```typescript
clr.hl1;
```

Highlight 1

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### hl2

```typescript
clr.hl2;
```

Highlight 2

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### approve

```typescript
clr.approve;
```

Approval colour (green)

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### create

```typescript
clr.create;
```

Create colour (greenBright)

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### update

```typescript
clr.update;
```

Update colour (yellow)

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### remove

```typescript
clr.remove;
```

Remove/delete colour (red)

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### removeAll

```typescript
clr.removeAll;
```

Remove/delete all colour (red)

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### blue

```typescript
clr.blue;
```

Alias for chalk.blueBright

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### cyan

```typescript
clr.cyan;
```

Alias for chalk.cyanBright

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### green

```typescript
clr.green;
```

Alias for chalk.greenBright

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### magenta

```typescript
clr.magenta;
```

Alias for chalk.magentaBright

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### red

```typescript
clr.red;
```

Alias for chalk.redBright

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### yellow

```typescript
clr.yellow;
```

Alias for chalk.yellowBright

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### t1

```typescript
clr.t1;
```

Theme 1

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### t2

```typescript
clr.t2;
```

Theme 2

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### t3

```typescript
clr.t3;
```

Theme 3

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### t4

```typescript
clr.t4;
```

Theme 4

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### t5

```typescript
clr.t5;
```

Theme 5

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### t6

```typescript
clr.t6;
```

Theme 6

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

## LogTools
A collection of tools for logging

  - [**LogTools**](#logtools)
    - [getLogStr](#getlogstr)
    - [processLogContents](#processlogcontents)
    - [getLog](#getlog)

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### getLogStr

```typescript
LogTools.getLogStr;
getLogStr;
```

Get a string for a given object as it would be printed by console.log

```typescript
getLogStr(true); // true
getLogStr(1); // 1
getLogStr('foobar'); // foobar
getLogStr({ test: 'test' }); // { test: 'test' }
getLogStr(['a', 'b', 'c']); // [ 'a', 'b', 'c' ]

getLogStr([
  [
    [
      ['a', 'b', 'c'],
      ['d', 'e', 'f']
    ],
    [
      ['g', 'h', 'i'],
      ['j', 'k', 'l']
    ]
  ],
  [
    [
      ['m', 'n', 'o']
    ]
  ]
]);
// [
//   [
//     [ [ 'a', 'b', 'c' ], [ 'd', 'e', 'f' ] ],
//     [ [ 'g', 'h', 'i' ], [ 'j', 'k', 'l' ] ]
//   ],
//   [ [ [ 'm', 'n', 'o' ] ] ]
// ]
```

<p style="text-align: right" align="right"><a href="#logtools"> [↑ Back to <b>LogTools</b> ↑] </a></p>

### processLogContents

```typescript
LogTools.processLogContents;
processLogContents;
```

Process an item to be logged

<p style="text-align: right" align="right"><a href="#logtools"> [↑ Back to <b>LogTools</b> ↑] </a></p>

### getLog

```typescript
LogTools.getLog;
getLog;
```

Get a log function for a given prefix

<p style="text-align: right" align="right"><a href="#logtools"> [↑ Back to <b>LogTools</b> ↑] </a></p>

## PathTools
A collection of tools for working with paths

  - [**PathTools**](#pathtools)
    - [explodePath](#explodepath)
    - [**ExplodedPath**](#explodedpath)
    - [removeTrailSlash](#removetrailslash)
    - [trailSlash](#trailslash)
    - [removeDoubleSlashes](#removedoubleslashes)

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### explodePath

```typescript
PathTools.explodePath;
explodePath;
```

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

<p style="text-align: right" align="right"><a href="#pathtools"> [↑ Back to <b>PathTools</b> ↑] </a></p>

### ExplodedPath

```typescript
PathTools.ExplodedPath;
ExplodedPath;
```

An object containing the exploded components of a path

See `explodePath` for more details

  - [**ExplodedPath**](#explodedpath)
      - [path](#path)
      - [dir](#dir)
      - [folders](#folders)
      - [name](#name)
      - [ext](#ext)
      - [filename](#filename)

<p style="text-align: right" align="right"><a href="#pathtools"> [↑ Back to <b>PathTools</b> ↑] </a></p>

##### path
The full original path as it was passed in.

<p style="text-align: right" align="right"><a href="#explodedpath"> [↑ Back to <b>ExplodedPath</b> ↑] </a></p>

##### dir
The directory path of the given path

Note: no trailing slash

<p style="text-align: right" align="right"><a href="#explodedpath"> [↑ Back to <b>ExplodedPath</b> ↑] </a></p>

##### folders
the ancestral folders of the given dir as an array

<p style="text-align: right" align="right"><a href="#explodedpath"> [↑ Back to <b>ExplodedPath</b> ↑] </a></p>

##### name
the name of the file, not including the extension

<p style="text-align: right" align="right"><a href="#explodedpath"> [↑ Back to <b>ExplodedPath</b> ↑] </a></p>

##### ext
the extension of the file, not including the dot

<p style="text-align: right" align="right"><a href="#explodedpath"> [↑ Back to <b>ExplodedPath</b> ↑] </a></p>

##### filename
the full name of the file, including the extension (and dot)

<p style="text-align: right" align="right"><a href="#explodedpath"> [↑ Back to <b>ExplodedPath</b> ↑] </a></p>

### removeTrailSlash

```typescript
PathTools.removeTrailSlash;
```

Remove trailing slash from path (if one exists)

```typescript
'/path/to/file/' -> '/path/to/file'
```

<p style="text-align: right" align="right"><a href="#pathtools"> [↑ Back to <b>PathTools</b> ↑] </a></p>

### trailSlash

```typescript
PathTools.trailSlash;
```

Ensures there's a trailing slash on path

```typescript
'/path/to/file' -> '/path/to/file/'
```

<p style="text-align: right" align="right"><a href="#pathtools"> [↑ Back to <b>PathTools</b> ↑] </a></p>

### removeDoubleSlashes

```typescript
PathTools.removeDoubleSlashes;
```

Removes double slashes from path (an bug with Unix paths)

```typescript
'/path/to//file' -> '/path/to/file'
```

<p style="text-align: right" align="right"><a href="#pathtools"> [↑ Back to <b>PathTools</b> ↑] </a></p>

## progressBarTools
A collection of tools for working with progress bars (from swiss-ak)

  - [**progressBarTools**](#progressbartools)
    - [getColouredProgressBarOpts](#getcolouredprogressbaropts)

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### getColouredProgressBarOpts

```typescript
progressBarTools.getColouredProgressBarOpts;
```

Helper for providing a consistent set of options for a progress bar, and colouring them appropriately

```typescript
const progOpts = progressBarTools.getColouredProgressBarOpts({
  showCount: true,
  showPercent: true,
});
// later...
const progressBar = getProgressBar(numThings, progOpts('Things'));
progressBar.update();
```

<p style="text-align: right" align="right"><a href="#progressbartools"> [↑ Back to <b>progressBarTools</b> ↑] </a></p>

## waiters
  - [**waiters**](#waiters)
    - [nextTick](#nexttick)

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### nextTick

```typescript
nextTick;
waiters.nextTick;
```

Wait for the next tick

```typescript
wait nextTick();
```

<p style="text-align: right" align="right"><a href="#waiters"> [↑ Back to <b>waiters</b> ↑] </a></p>

## keyListener
  - [**keyListener**](#keylistener)
    - [getKeyListener](#getkeylistener)
    - [**KeyListener**](#keylistener)
      - [start](#start)
      - [stop](#stop)

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### getKeyListener

```typescript
getKeyListener;
```

Listens for key presses and returns the key name and raw value.

```typescript
const kl = getKeyListener((keyName, rawValue) => {
  // do something with keyName and rawValue
});

kl.start();

// later...

kl.stop();
```

<p style="text-align: right" align="right"><a href="#keylistener"> [↑ Back to <b>keyListener</b> ↑] </a></p>

### KeyListener

```typescript
KeyListener;
```

Returned by `getKeyListener`

<p style="text-align: right" align="right"><a href="#keylistener"> [↑ Back to <b>keyListener</b> ↑] </a></p>

#### start

```typescript
kl.start;
```

Start listening for key presses

<p style="text-align: right" align="right"><a href="#keylistener"> [↑ Back to <b>keyListener</b> ↑] </a></p>

#### stop

```typescript
kl.stop;
```

Stop listening for key presses

<p style="text-align: right" align="right"><a href="#keylistener"> [↑ Back to <b>keyListener</b> ↑] </a></p>

<!-- DOCS: MAIN END -->
