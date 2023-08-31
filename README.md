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
    - [wizard](#wizard123)
    - [date](#date)
    - [time](#time)
    - [datetime](#datetime)
    - [dateRange](#daterange)
    - [fileExplorer](#fileexplorer)
    - [multiFileExplorer](#multifileexplorer)
    - [saveFileExplorer](#savefileexplorer)
    - [**table (ask)**](#table-ask)
      - [select (ask.table)](#select-asktable)
      - [multiselect (ask.table)](#multiselect-asktable)
    - [trim](#trim)
    - [separator](#separator)
    - [section](#section)
    - [**utils**](#utils)
      - [itemsToPromptObjects](#itemstopromptobjects)

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### text

```typescript
ask.text(question: string | Breadcrumb, initial: string): Promise<string>
```

Get a text input from the user.

```typescript
const name = await ask.text('What is your name?'); // 'Jack'
```

|  #  | Parameter Name | Required | Type                   |
|:---:|:---------------|:---------|:-----------------------|
| *0* | `question`     | **Yes**  | `string \| Breadcrumb` |
| *1* | `initial`      | *No*     | `string`               |

| Return Type       |
|-------------------|
| `Promise<string>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### autotext

```typescript
ask.autotext(question: string | Breadcrumb, choices: PromptChoice<T>[], initial: T | string, choiceLimit: number): Promise<T>
```

Get a text input from the user, with auto-completion.

```typescript
const name = await ask.autotext('What is your name?', ['Jack', 'Jane', 'Joe']); // 'Jack'
```

|  #  | Parameter Name | Required | Type                   | Default |
|:---:|:---------------|:---------|:-----------------------|:--------|
| *0* | `question`     | **Yes**  | `string \| Breadcrumb` |         |
| *1* | `choices`      | **Yes**  | `PromptChoice<T>[]`    |         |
| *2* | `initial`      | *No*     | `T \| string`          |         |
| *3* | `choiceLimit`  | *No*     | `number`               | `10`    |

| Return Type  |
|--------------|
| `Promise<T>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### number

```typescript
ask.number(question: string | Breadcrumb, initial: number): Promise<number>
```

Get a number input from the user.

```typescript
const age = await ask.number('How old are you?'); // 30
```

|  #  | Parameter Name | Required | Type                   | Default |
|:---:|:---------------|:---------|:-----------------------|:--------|
| *0* | `question`     | **Yes**  | `string \| Breadcrumb` |         |
| *1* | `initial`      | *No*     | `number`               | `1`     |

| Return Type       |
|-------------------|
| `Promise<number>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### boolean

```typescript
ask.boolean(question: string | Breadcrumb, initial: boolean, yesTxt: string, noTxt: string): Promise<boolean>
```

Get a boolean input from the user (yes or no)

```typescript
const isCool = await ask.boolean('Is this cool?'); // true
```

|  #  | Parameter Name | Required | Type                   | Default |
|:---:|:---------------|:---------|:-----------------------|:--------|
| *0* | `question`     | **Yes**  | `string \| Breadcrumb` |         |
| *1* | `initial`      | *No*     | `boolean`              | `true`  |
| *2* | `yesTxt`       | *No*     | `string`               | `'yes'` |
| *3* | `noTxt`        | *No*     | `string`               | `'no'`  |

| Return Type        |
|--------------------|
| `Promise<boolean>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### booleanAlt

```typescript
ask.booleanAlt(question: string | Breadcrumb, initial: boolean): Promise<boolean>
```

Get a boolean input from the user (yes or no)

Alternative interface to ask.boolean

```typescript
const isCool = await ask.boolean('Is this cool?'); // true
```

|  #  | Parameter Name | Required | Type                   | Default |
|:---:|:---------------|:---------|:-----------------------|:--------|
| *0* | `question`     | **Yes**  | `string \| Breadcrumb` |         |
| *1* | `initial`      | *No*     | `boolean`              | `true`  |

| Return Type        |
|--------------------|
| `Promise<boolean>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### select

```typescript
ask.select(question: string | Breadcrumb, choices: PromptChoice<T>[], initial: T): Promise<T>
```

Get the user to select an option from a list.

```typescript
const colour = await ask.select('Whats your favourite colour?', ['red', 'green', 'blue']); // 'red'
```

|  #  | Parameter Name | Required | Type                   |
|:---:|:---------------|:---------|:-----------------------|
| *0* | `question`     | **Yes**  | `string \| Breadcrumb` |
| *1* | `choices`      | **Yes**  | `PromptChoice<T>[]`    |
| *2* | `initial`      | *No*     | `T`                    |

| Return Type  |
|--------------|
| `Promise<T>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### multiselect

```typescript
ask.multiselect(question: string | Breadcrumb, choices: PromptChoice<T>[], initial: PromptChoice<T> | PromptChoice<T>[], canSelectAll: boolean): Promise<T[]>
```

Get the user to select multiple opts from a list.

```typescript
const colours = await ask.multiselect('Whats your favourite colours?', ['red', 'green', 'blue']); // ['red', 'green']
```

|  #  | Parameter Name | Required | Type                                   | Default |
|:---:|:---------------|:---------|:---------------------------------------|:--------|
| *0* | `question`     | **Yes**  | `string \| Breadcrumb`                 |         |
| *1* | `choices`      | **Yes**  | `PromptChoice<T>[]`                    |         |
| *2* | `initial`      | *No*     | `PromptChoice<T> \| PromptChoice<T>[]` |         |
| *3* | `canSelectAll` | *No*     | `boolean`                              | `false` |

| Return Type    |
|----------------|
| `Promise<T[]>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### crud

```typescript
ask.crud(question: string | Breadcrumb, itemName: string, items: any[], options: Partial<CRUDOptions>): Promise<CRUD>
```

Get the user to select a CRUD (**C**reate, **R**ead, **U**pdate and **D**elete) action

Values returned are: 'none' | 'create' | 'update' | 'delete' | 'delete-all'

```typescript
const action = await ask.crud('What do you want to do next?'); // 'none'
```

|  #  | Parameter Name | Required | Type                   | Default  |
|:---:|:---------------|:---------|:-----------------------|:---------|
| *0* | `question`     | **Yes**  | `string \| Breadcrumb` |          |
| *1* | `itemName`     | *No*     | `string`               | `'item'` |
| *2* | `items`        | *No*     | `any[]`                |          |
| *3* | `options`      | *No*     | `Partial<CRUDOptions>` | `{}`     |

| Return Type     |
|-----------------|
| `Promise<CRUD>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### validate

```typescript
ask.validate(askFunc: (initialValue?: T) => Promise<I> | I, validateFn: (input: Awaited<I>) => boolean | string): Promise<I>
```

Validate the result of an `ask` prompt

```typescript
const name = await ask.validate(
  () => ask.text('What is your name?'),
  (name) => name.length > 0
); // 'Jack'
```

|  #  | Parameter Name | Required | Type                                       |
|:---:|:---------------|:---------|:-------------------------------------------|
| *0* | `askFunc`      | **Yes**  | `(initialValue?: T) => Promise<I> \| I`    |
| *1* | `validateFn`   | **Yes**  | `(input: Awaited<I>) => boolean \| string` |

| Return Type  |
|--------------|
| `Promise<I>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### imitate

```typescript
ask.imitate(done: boolean, question: string | Breadcrumb, result: any): number
```

Imitate the display of a prompt

```typescript
imitate(true, 'What is your name?', 'Jack');

ask.imitate(true, 'What is your name?', 'Jack');
```

|  #  | Parameter Name | Required | Type                   |
|:---:|:---------------|:---------|:-----------------------|
| *0* | `done`         | **Yes**  | `boolean`              |
| *1* | `question`     | **Yes**  | `string \| Breadcrumb` |
| *2* | `result`       | *No*     | `any`                  |

| Return Type |
|-------------|
| `number`    |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### prefill

```typescript
ask.prefill(value: T | undefined, question: string | Breadcrumb, askFn: (question: string | Breadcrumb) => Promise<T> | T): Promise<T>
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

|  #  | Parameter Name | Required | Type                                                  |
|:---:|:---------------|:---------|:------------------------------------------------------|
| *0* | `value`        | **Yes**  | `T \| undefined`                                      |
| *1* | `question`     | **Yes**  | `string \| Breadcrumb`                                |
| *2* | `askFn`        | **Yes**  | `(question: string \| Breadcrumb) => Promise<T> \| T` |

| Return Type  |
|--------------|
| `Promise<T>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### loading

```typescript
ask.loading(question: string | Breadcrumb): any
```

Display an animated loading indicator that imitates the display of a prompt

```typescript
const loader = ask.loading('What is your name?');
// ...
loader.stop();
```

|  #  | Parameter Name | Required | Type                   |
|:---:|:---------------|:---------|:-----------------------|
| *0* | `question`     | **Yes**  | `string \| Breadcrumb` |

| Return Type |
|-------------|
| `any`       |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### pause

```typescript
ask.pause(text: string | Breadcrumb): Promise<void>
```

Pause the program until the user presses enter

```typescript
await ask.pause();
```

|  #  | Parameter Name | Required | Type                   | Default                        |
|:---:|:---------------|:---------|:-----------------------|:-------------------------------|
| *0* | `text`         | *No*     | `string \| Breadcrumb` | `'Press enter to continue...'` |

| Return Type     |
|-----------------|
| `Promise<void>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### countdown

```typescript
ask.countdown(totalSeconds: number, template: (s: second) => string, complete: string): Promise<void>
```

Animated countdown for a given number of seconds

```typescript
await ask.countdown(5);
```

|  #  | Parameter Name | Required | Type                    | Default                            |
|:---:|:---------------|:---------|:------------------------|:-----------------------------------|
| *0* | `totalSeconds` | **Yes**  | `number`                |                                    |
| *1* | `template`     | *No*     | `(s: second) => string` | ``(s) => `Starting in ${s}s...` `` |
| *2* | `complete`     | *No*     | `string`                |                                    |

| Return Type     |
|-----------------|
| `Promise<void>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### wizard {#wizard123}

```typescript
ask.wizard(startObj: Partial<T>): { add(partial: Partial<T>): void; getPartial(): Partial<T>; get(): T; }
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

|  #  | Parameter Name | Required | Type         | Default |
|:---:|:---------------|:---------|:-------------|:--------|
| *0* | `startObj`     | *No*     | `Partial<T>` | `{}`    |

| Return Type                                                               |
|---------------------------------------------------------------------------|
| `{ add(partial: Partial<T>): void; getPartial(): Partial<T>; get(): T; }` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### date

```typescript
ask.date(questionText: string | Breadcrumb, initial: Date): Promise<Date>
```

Get a date input from the user.

```typescript
const date = await ask.date('Whats the date?');
// [Date: 2023-01-01T12:00:00.000Z] (user inputted date, always at 12 midday)
```

|  #  | Parameter Name | Required | Type                   |
|:---:|:---------------|:---------|:-----------------------|
| *0* | `questionText` | *No*     | `string \| Breadcrumb` |
| *1* | `initial`      | *No*     | `Date`                 |

| Return Type     |
|-----------------|
| `Promise<Date>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### time

```typescript
ask.time(questionText: string | Breadcrumb, initial: Date): Promise<Date>
```

Get a time input from the user.

```typescript
const time = await ask.time('Whats the time?');
// [Date: 2023-01-01T12:00:00.000Z] (user inputted time, with todays date)

const time2 = await ask.time('Whats the time?', new Date('1999-12-31'));
// [Date: 1999-12-31T12:00:00.000Z] (user inputted time, with same date as initial)
```

|  #  | Parameter Name | Required | Type                   |
|:---:|:---------------|:---------|:-----------------------|
| *0* | `questionText` | *No*     | `string \| Breadcrumb` |
| *1* | `initial`      | *No*     | `Date`                 |

| Return Type     |
|-----------------|
| `Promise<Date>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### datetime

```typescript
ask.datetime(questionText: string | Breadcrumb, initial: Date): Promise<Date>
```

Get a date and time input from the user.

```typescript
const when = await ask.datetime('Whats the date/time?');
// [Date: 2023-03-05T20:30:00.000Z] (user inputted time & date)
```

|  #  | Parameter Name | Required | Type                   |
|:---:|:---------------|:---------|:-----------------------|
| *0* | `questionText` | *No*     | `string \| Breadcrumb` |
| *1* | `initial`      | *No*     | `Date`                 |

| Return Type     |
|-----------------|
| `Promise<Date>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### dateRange

```typescript
ask.dateRange(questionText: string | Breadcrumb, initialStart: Date, initialEnd: Date): Promise<[Date, Date]>
```

Get a date range input from the user.

```typescript
const range = await ask.dateRange('When is the festival?');
// [
//   [Date: 2023-03-01T12:00:00.000Z],
//   [Date: 2023-03-31T12:00:00.000Z]
// ]
```

|  #  | Parameter Name | Required | Type                   |
|:---:|:---------------|:---------|:-----------------------|
| *0* | `questionText` | *No*     | `string \| Breadcrumb` |
| *1* | `initialStart` | *No*     | `Date`                 |
| *2* | `initialEnd`   | *No*     | `Date`                 |

| Return Type             |
|-------------------------|
| `Promise<[Date, Date]>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### fileExplorer

```typescript
ask.fileExplorer(questionText: string | Breadcrumb, selectType: 'd' | 'f', startPath: string): Promise<string>
```

Get a file or folder path from the user.

```typescript
const file = await ask.fileExplorer('What file?', 'f');
// '/Users/user/Documents/some_file.txt'

const dir = await ask.fileExplorer('What file?', 'd', '/Users/jackcannon/Documents');
// '/Users/jackcannon/Documents/some_folder'
```

|  #  | Parameter Name | Required | Type                   | Default         |
|:---:|:---------------|:---------|:-----------------------|:----------------|
| *0* | `questionText` | **Yes**  | `string \| Breadcrumb` |                 |
| *1* | `selectType`   | *No*     | `'d' \| 'f'`           | `'f'`           |
| *2* | `startPath`    | *No*     | `string`               | `process.cwd()` |

| Return Type       |
|-------------------|
| `Promise<string>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### multiFileExplorer

```typescript
ask.multiFileExplorer(questionText: string | Breadcrumb, selectType: 'd' | 'f', startPath: string): Promise<string[]>
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

|  #  | Parameter Name | Required | Type                   | Default         |
|:---:|:---------------|:---------|:-----------------------|:----------------|
| *0* | `questionText` | **Yes**  | `string \| Breadcrumb` |                 |
| *1* | `selectType`   | *No*     | `'d' \| 'f'`           | `'f'`           |
| *2* | `startPath`    | *No*     | `string`               | `process.cwd()` |

| Return Type         |
|---------------------|
| `Promise<string[]>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### saveFileExplorer

```typescript
ask.saveFileExplorer(questionText: string | Breadcrumb, startPath: string, suggestedFileName: string): Promise<string>
```

Get a file path from the user, with the intention of saving a file to that path.

```typescript
const HOME_DIR = '/Users/user/Documents';
const savePath = await ask.saveFileExplorer('Save file', HOME_DIR, 'data.json');
// '/Users/user/Documents/data.json'
```

|  #  | Parameter Name      | Required | Type                   | Default         |
|:---:|:--------------------|:---------|:-----------------------|:----------------|
| *0* | `questionText`      | **Yes**  | `string \| Breadcrumb` |                 |
| *1* | `startPath`         | *No*     | `string`               | `process.cwd()` |
| *2* | `suggestedFileName` | *No*     | `string`               | `''`            |

| Return Type       |
|-------------------|
| `Promise<string>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### table (ask)
A collection of functions for asking questions with tables.

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

#### select (ask.table)

```typescript
ask.table.select(question: string | Breadcrumb, items: T[], initial: T | number, rows: any[][] | ItemToRowMapFunction<T>, headers: any[][] | RemapOf<T, string>, tableOptions: tableOut.TableOptions): Promise<T>
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

|  #  | Parameter Name | Required | Type                                 |
|:---:|:---------------|:---------|:-------------------------------------|
| *0* | `question`     | **Yes**  | `string \| Breadcrumb`               |
| *1* | `items`        | **Yes**  | `T[]`                                |
| *2* | `initial`      | *No*     | `T \| number`                        |
| *3* | `rows`         | *No*     | `any[][] \| ItemToRowMapFunction<T>` |
| *4* | `headers`      | *No*     | `any[][] \| RemapOf<T, string>`      |
| *5* | `tableOptions` | *No*     | `tableOut.TableOptions`              |

| Return Type  |
|--------------|
| `Promise<T>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

#### multiselect (ask.table)

```typescript
ask.table.multiselect(question: string | Breadcrumb, items: T[], initial: T[] | number[], rows: any[][] | ItemToRowMapFunction<T>, headers: any[][] | RemapOf<T, string>, tableOptions: tableOut.TableOptions): Promise<T[]>
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

|  #  | Parameter Name | Required | Type                                 |
|:---:|:---------------|:---------|:-------------------------------------|
| *0* | `question`     | **Yes**  | `string \| Breadcrumb`               |
| *1* | `items`        | **Yes**  | `T[]`                                |
| *2* | `initial`      | *No*     | `T[] \| number[]`                    |
| *3* | `rows`         | *No*     | `any[][] \| ItemToRowMapFunction<T>` |
| *4* | `headers`      | *No*     | `any[][] \| RemapOf<T, string>`      |
| *5* | `tableOptions` | *No*     | `tableOut.TableOptions`              |

| Return Type    |
|----------------|
| `Promise<T[]>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### trim

```typescript
ask.trim(totalFrames: number, frameRate: number, options: Partial<AskTrimOptions>): Promise<Handles<number>>
```

Get a start and end frame from the user

|  #  | Parameter Name | Required | Type                      | Default |
|:---:|:---------------|:---------|:--------------------------|:--------|
| *0* | `totalFrames`  | **Yes**  | `number`                  |         |
| *1* | `frameRate`    | **Yes**  | `number`                  |         |
| *2* | `options`      | *No*     | `Partial<AskTrimOptions>` | `{}`    |

| Return Type                |
|----------------------------|
| `Promise<Handles<number>>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### separator

```typescript
ask.separator(version: 'down' | 'none' | 'up', spacing: number, offset: number, width: number): number
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

|  #  | Parameter Name | Required | Type                       | Default                            |
|:---:|:---------------|:---------|:---------------------------|:-----------------------------------|
| *0* | `version`      | *No*     | `'down' \| 'none' \| 'up'` | `'down'`                           |
| *1* | `spacing`      | *No*     | `number`                   | `8`                                |
| *2* | `offset`       | *No*     | `number`                   | `0`                                |
| *3* | `width`        | *No*     | `number`                   | `out.utils.getTerminalWidth() - 2` |

| Return Type |
|-------------|
| `number`    |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### section

```typescript
ask.section(question: string | Breadcrumb, sectionFn: (lc: LineCounter, separator: () => void) => void | Promise<any>, ...questionFns: QuesT[]): Promise<UnwrapPromFuncs<QuesT>>
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

|  #   | Parameter Name | Required | Type                                                               |
|:----:|:---------------|:---------|:-------------------------------------------------------------------|
| *0*  | `question`     | **Yes**  | `string \| Breadcrumb`                                             |
| *1*  | `sectionFn`    | *No*     | `(lc: LineCounter, separator: () => void) => void \| Promise<any>` |
| *2…* | `questionFns`  | *No*     | `QuesT[]`                                                          |

| Return Type                       |
|-----------------------------------|
| `Promise<UnwrapPromFuncs<QuesT>>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### utils

#### itemsToPromptObjects

```typescript
ask.utils.itemsToPromptObjects(items: T[], titles: string[], titleFn: TitleFn<T>): { title: string; value: T; }[]
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

|  #  | Parameter Name | Required | Type         | Default |
|:---:|:---------------|:---------|:-------------|:--------|
| *0* | `items`        | **Yes**  | `T[]`        |         |
| *1* | `titles`       | *No*     | `string[]`   | `[]`    |
| *2* | `titleFn`      | *No*     | `TitleFn<T>` |         |

| Return Type                      |
|----------------------------------|
| `{ title: string; value: T; }[]` |

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
out.pad(line: string, start: number, end: number, replaceChar: string): string
```

Pad before and after the given text with the given character.

```typescript
pad('foo', 3, 1, '-'); // '---foo-'
pad('bar', 10, 5, '_'); // '__________bar_____'
```

|  #  | Parameter Name | Required | Type     | Default |
|:---:|:---------------|:---------|:---------|:--------|
| *0* | `line`         | **Yes**  | `string` |         |
| *1* | `start`        | **Yes**  | `number` |         |
| *2* | `end`          | **Yes**  | `number` |         |
| *3* | `replaceChar`  | *No*     | `string` | `' '`   |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### center

```typescript
out.center(item: any, width: number, replaceChar: string, forceWidth: boolean): string
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

|  #  | Parameter Name | Required | Type      | Default                        |
|:---:|:---------------|:---------|:----------|:-------------------------------|
| *0* | `item`         | **Yes**  | `any`     |                                |
| *1* | `width`        | *No*     | `number`  | `out.utils.getTerminalWidth()` |
| *2* | `replaceChar`  | *No*     | `string`  | `' '`                          |
| *3* | `forceWidth`   | *No*     | `boolean` | `true`                         |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### left

```typescript
out.left(item: any, width: number, replaceChar: string, forceWidth: boolean): string
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

|  #  | Parameter Name | Required | Type      | Default                        |
|:---:|:---------------|:---------|:----------|:-------------------------------|
| *0* | `item`         | **Yes**  | `any`     |                                |
| *1* | `width`        | *No*     | `number`  | `out.utils.getTerminalWidth()` |
| *2* | `replaceChar`  | *No*     | `string`  | `' '`                          |
| *3* | `forceWidth`   | *No*     | `boolean` | `true`                         |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### right

```typescript
out.right(item: any, width: number, replaceChar: string, forceWidth: boolean): string
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

|  #  | Parameter Name | Required | Type      | Default                        |
|:---:|:---------------|:---------|:----------|:-------------------------------|
| *0* | `item`         | **Yes**  | `any`     |                                |
| *1* | `width`        | *No*     | `number`  | `out.utils.getTerminalWidth()` |
| *2* | `replaceChar`  | *No*     | `string`  | `' '`                          |
| *3* | `forceWidth`   | *No*     | `boolean` | `true`                         |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### justify

```typescript
out.justify(item: any, width: number, replaceChar: string, forceWidth: boolean): string
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

|  #  | Parameter Name | Required | Type      | Default                        |
|:---:|:---------------|:---------|:----------|:-------------------------------|
| *0* | `item`         | **Yes**  | `any`     |                                |
| *1* | `width`        | *No*     | `number`  | `out.utils.getTerminalWidth()` |
| *2* | `replaceChar`  | *No*     | `string`  | `' '`                          |
| *3* | `forceWidth`   | *No*     | `boolean` | `true`                         |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### leftLines

```typescript
out.leftLines(lines: string[], width: number): string[]
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

|  #  | Parameter Name | Required | Type       | Default                |
|:---:|:---------------|:---------|:-----------|:-----------------------|
| *0* | `lines`        | **Yes**  | `string[]` |                        |
| *1* | `width`        | *No*     | `number`   | `getLongestLen(lines)` |

| Return Type |
|-------------|
| `string[]`  |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### centerLines

```typescript
out.centerLines(lines: string[], width: number): string[]
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

|  #  | Parameter Name | Required | Type       | Default                |
|:---:|:---------------|:---------|:-----------|:-----------------------|
| *0* | `lines`        | **Yes**  | `string[]` |                        |
| *1* | `width`        | *No*     | `number`   | `getLongestLen(lines)` |

| Return Type |
|-------------|
| `string[]`  |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### rightLines

```typescript
out.rightLines(lines: string[], width: number): string[]
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

|  #  | Parameter Name | Required | Type       | Default                |
|:---:|:---------------|:---------|:-----------|:-----------------------|
| *0* | `lines`        | **Yes**  | `string[]` |                        |
| *1* | `width`        | *No*     | `number`   | `getLongestLen(lines)` |

| Return Type |
|-------------|
| `string[]`  |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### justifyLines

```typescript
out.justifyLines(lines: string[], width: number): string[]
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

|  #  | Parameter Name | Required | Type       | Default                |
|:---:|:---------------|:---------|:-----------|:-----------------------|
| *0* | `lines`        | **Yes**  | `string[]` |                        |
| *1* | `width`        | *No*     | `number`   | `getLongestLen(lines)` |

| Return Type |
|-------------|
| `string[]`  |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### align

```typescript
out.align(item: any, direction: AlignType, width: number, replaceChar: string, forceWidth: boolean): string
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

|  #  | Parameter Name | Required | Type        | Default                        |
|:---:|:---------------|:---------|:------------|:-------------------------------|
| *0* | `item`         | **Yes**  | `any`       |                                |
| *1* | `direction`    | **Yes**  | `AlignType` |                                |
| *2* | `width`        | *No*     | `number`    | `out.utils.getTerminalWidth()` |
| *3* | `replaceChar`  | *No*     | `string`    | `' '`                          |
| *4* | `forceWidth`   | *No*     | `boolean`   | `true`                         |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### split

```typescript
out.split(leftItem: any, rightItem: any, width: number, replaceChar: string): string
```

Split the given text into two parts, left and right, with the given width of characters/columns

```typescript
out.split('Left', 'Right', 15); // Left      Right
```

|  #  | Parameter Name | Required | Type     | Default                        |
|:---:|:---------------|:---------|:---------|:-------------------------------|
| *0* | `leftItem`     | **Yes**  | `any`    |                                |
| *1* | `rightItem`    | **Yes**  | `any`    |                                |
| *2* | `width`        | *No*     | `number` | `out.utils.getTerminalWidth()` |
| *3* | `replaceChar`  | *No*     | `string` | `' '`                          |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### wrap

```typescript
out.wrap(item: any, width: number, alignment: AlignType, forceWidth: boolean): string
```

Wrap the given text to the given width of characters/columns

```typescript
wrap('This is a sentence', 15);
// 'This is' + '\n' +
// 'a sentence'
```

|  #  | Parameter Name | Required | Type        | Default                        |
|:---:|:---------------|:---------|:------------|:-------------------------------|
| *0* | `item`         | **Yes**  | `any`       |                                |
| *1* | `width`        | *No*     | `number`    | `out.utils.getTerminalWidth()` |
| *2* | `alignment`    | *No*     | `AlignType` |                                |
| *3* | `forceWidth`   | *No*     | `boolean`   | `false`                        |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### moveUp

```typescript
out.moveUp(lines: number): void
```

Move the terminal cursor up X lines, clearing each row.

Useful for replacing previous lines of output

```typescript
moveUp(1);
```

|  #  | Parameter Name | Required | Type     | Default |
|:---:|:---------------|:---------|:---------|:--------|
| *0* | `lines`        | *No*     | `number` | `1`     |

| Return Type |
|-------------|
| `void`      |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### loading

```typescript
out.loading(action: (s: string) => any, lines: number, symbols: string[]): { stop: () => void; }
```

Display an animated loading indicator

```typescript
const loader = out.loading();
// ...
loader.stop();
```

|  #  | Parameter Name | Required | Type                 | Default          |
|:---:|:---------------|:---------|:---------------------|:-----------------|
| *0* | `action`       | *No*     | `(s: string) => any` | `loadingDefault` |
| *1* | `lines`        | *No*     | `number`             | `1`              |
| *2* | `symbols`      | *No*     | `string[]`           | `loadingChars`   |

| Return Type             |
|-------------------------|
| `{ stop: () => void; }` |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### limitToLength

```typescript
out.limitToLength(text: string, maxLength: number): string
```

Limit the length of a string to the given length

```typescript
out.limitToLength('This is a very long sentence', 12); // 'This is a ve'
```

|  #  | Parameter Name | Required | Type     |
|:---:|:---------------|:---------|:---------|
| *0* | `text`         | **Yes**  | `string` |
| *1* | `maxLength`    | **Yes**  | `number` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### limitToLengthStart

```typescript
out.limitToLengthStart(text: string, maxLength: number): string
```

Limit the length of a string to the given length, keeping the end

```typescript
out.limitToLengthStart('This is a very long sentence', 12); // 'ong sentence'
```

|  #  | Parameter Name | Required | Type     |
|:---:|:---------------|:---------|:---------|
| *0* | `text`         | **Yes**  | `string` |
| *1* | `maxLength`    | **Yes**  | `number` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### truncate

```typescript
out.truncate(text: string, maxLength: number, suffix: string): string
```

Limit the length of a string to the given length, and add an ellipsis if necessary

```typescript
out.truncate('This is a very long sentence', 15); // 'This is a ve...'
```

|  #  | Parameter Name | Required | Type     | Default                        |
|:---:|:---------------|:---------|:---------|:-------------------------------|
| *0* | `text`         | **Yes**  | `string` |                                |
| *1* | `maxLength`    | *No*     | `number` | `out.utils.getTerminalWidth()` |
| *2* | `suffix`       | *No*     | `string` | `chalk.dim('…')`               |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### truncateStart

```typescript
out.truncateStart(text: string, maxLength: number, suffix: string): string
```

Limit the length of a string to the given length, and add an ellipsis if necessary, keeping the end

```typescript
out.truncateStart('This is a very long sentence', 15); // '...ong sentence'
```

|  #  | Parameter Name | Required | Type     | Default                        |
|:---:|:---------------|:---------|:---------|:-------------------------------|
| *0* | `text`         | **Yes**  | `string` |                                |
| *1* | `maxLength`    | *No*     | `number` | `out.utils.getTerminalWidth()` |
| *2* | `suffix`       | *No*     | `string` | `chalk.dim('…')`               |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### concatLineGroups

```typescript
out.concatLineGroups(...groups: string[][]): any
```

Concatenate multiple line groups, aligning them by the longest line

```typescript
out.concatLineGroups(['lorem', 'ipsum'], ['dolor', 'sit', 'amet']);
// [ 'loremdolor', 'ipsumsit  ', '     amet ' ]
```

|  #   | Parameter Name | Required | Type         |
|:----:|:---------------|:---------|:-------------|
| *0…* | `groups`       | *No*     | `string[][]` |

| Return Type |
|-------------|
| `any`       |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### getResponsiveValue

```typescript
out.getResponsiveValue(options: ResponsiveOption<T>[]): T
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

|  #  | Parameter Name | Required | Type                    |
|:---:|:---------------|:---------|:------------------------|
| *0* | `options`      | **Yes**  | `ResponsiveOption<T>[]` |

| Return Type |
|-------------|
| `T`         |

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
out.getBreadcrumb(...baseNames: string[]): Breadcrumb
getBreadcrumb(...baseNames: string[]): Breadcrumb
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

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `baseNames`    | *No*     | `string[]` |

| Return Type  |
|--------------|
| `Breadcrumb` |

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
out.getLineCounter(undefined): LineCounter
getLineCounter(undefined): LineCounter
```

Get line counter for counter output lines

```typescript
const lc = getLineCounter();
lc.log('hello'); // 1
lc.wrap(undefined, () => console.log('a single line')); // 1
lc.add(1);
lc.get(); // 3
lc.clear();
```

| Return Type   |
|---------------|
| `LineCounter` |

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
lc.wrap(1, () => console.log('a single line')); // 1
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
```

|  #   | Parameter Name | Required | Type    | Description          |
|:----:|:---------------|:---------|:--------|:---------------------|
| *0…* | `args`         | **Yes**  | `any[]` | The arguments to log |

| Return Type |                       |
|-------------|-----------------------|
| `number`    | number of lines added |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

##### lc.move
Moves the cursor up by a given number of lines

|  #  | Parameter Name | Required | Type     | Description                 |
|:---:|:---------------|:---------|:---------|:----------------------------|
| *0* | `lines`        | **Yes**  | `number` | The number of lines to move |

| Return Type |
|-------------|
| `void`      |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

##### lc.wrap
Wraps a function, and adds a given number to the line counter

```typescript
const lc = getLineCounter();
lc.wrap(1, () => console.log('a single line')); // 1
```

|  #   | Parameter Name | Required | Type                            | Description                           |
|:----:|:---------------|:---------|:--------------------------------|:--------------------------------------|
| *0*  | `newLines`     | **Yes**  | `number`                        | The number of lines to add            |
| *1*  | `func`         | **Yes**  | `(...args: A[]) => number \| T` | The function to wrap                  |
| *2…* | `args`         | **Yes**  | `A[]`                           | The arguments to pass to the function |

| Return Type |                        |
|-------------|------------------------|
| `T`         | result of the function |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

##### lc.add
Adds a given number to the line counter

```typescript
const lc = getLineCounter();
lc.add(1);
```

|  #  | Parameter Name | Required | Type     | Description                |
|:---:|:---------------|:---------|:---------|:---------------------------|
| *0* | `newLines`     | **Yes**  | `number` | The number of lines to add |

| Return Type |
|-------------|
| `void`      |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

##### lc.get
returns the line counter

```typescript
const lc = getLineCounter();
lc.log('hello'); // 1
lc.wrap(1, () => console.log('a single line')); // 1
lc.add(1);
lc.get(); // 3
```

| Return Type |              |
|-------------|--------------|
| `number`    | line counter |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

##### lc.getSince
Returns the number of lines since a given checkpoint

```typescript
const lc = getLineCounter();
lc.log('hello'); // 1
lc.checkpoint('test-a');
lc.wrap(1, () => console.log('a single line')); // 1
lc.checkpoint('test-b');
lc.add(1);
lc.getSince('test-a'); // 2
lc.getSince('test-b'); // 1
```

|  #  | Parameter Name | Required | Type     | Description             |
|:---:|:---------------|:---------|:---------|:------------------------|
| *0* | `checkpointID` | **Yes**  | `string` | The checkpoint to check |

| Return Type |                                      |
|-------------|--------------------------------------|
| `number`    | number of lines since the checkpoint |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

##### lc.clear
clears the line counter, and moves the cursor up by the value of the line counter

```typescript
const lc = getLineCounter();
lc.log('hello'); // 1
lc.clear();
```

| Return Type |
|-------------|
| `void`      |

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

|  #  | Parameter Name         | Required | Type      | Description                                                                   |
|:---:|:-----------------------|:---------|:----------|:------------------------------------------------------------------------------|
| *0* | `linesToMoveBack`      | **Yes**  | `number`  | The number of lines to clear                                                  |
| *1* | `limitToRecordedLines` | *No*     | `boolean` | Whether to limit the number of lines to clear to the number of lines recorded |

| Return Type |
|-------------|
| `void`      |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

##### lc.checkpoint
Records a 'checkpoint' that can be returned to later

```typescript
const lc = getLineCounter();
lc.log('hello'); // 1
lc.checkpoint('test-a');
lc.wrap(1, () => console.log('a single line')); // 1
lc.checkpoint('test-b');
lc.add(1);
lc.getSince('test-a'); // 2
lc.getSince('test-b'); // 1
```

|  #  | Parameter Name | Required | Type     | Description              |
|:---:|:---------------|:---------|:---------|:-------------------------|
| *0* | `checkpointID` | *No*     | `string` | The checkpoint to record |

| Return Type |              |
|-------------|--------------|
| `string`    | checkpointID |

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

|  #  | Parameter Name | Required | Type     | Description                |
|:---:|:---------------|:---------|:---------|:---------------------------|
| *0* | `checkpointID` | **Yes**  | `string` | The checkpoint to clear to |

| Return Type |
|-------------|
| `void`      |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### utils

#### getTerminalWidth

```typescript
out.utils.getTerminalWidth(undefined): number
```

Get maximum terminal width (columns)

```typescript
print.utils.getTerminalWidth(); // 127
```

| Return Type |
|-------------|
| `number`    |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

#### getLines

```typescript
out.utils.getLines(text: Text): string[]
```

Split multi-line text into an array of lines

```typescript
out.utils.getLines(`
this is line 1
this is line 2
`); // [ '', 'this is line 1', 'this is line 2', '' ]
```

|  #  | Parameter Name | Required | Type   |
|:---:|:---------------|:---------|:-------|
| *0* | `text`         | **Yes**  | `Text` |

| Return Type |
|-------------|
| `string[]`  |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

#### getNumLines

```typescript
out.utils.getNumLines(text: Text): number
```

Get how many lines a string or array of lines has

```typescript
out.utils.getNumLines(`
this is line 1
this is line 2
`); // 4
```

|  #  | Parameter Name | Required | Type   |
|:---:|:---------------|:---------|:-------|
| *0* | `text`         | **Yes**  | `Text` |

| Return Type |
|-------------|
| `number`    |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

#### getLinesWidth

```typescript
out.utils.getLinesWidth(text: Text): number
```

Get how wide a string or array of lines has

```typescript
out.utils.getLinesWidth(`
this is line 1
this is line 2
`) // 14
```

|  #  | Parameter Name | Required | Type   |
|:---:|:---------------|:---------|:-------|
| *0* | `text`         | **Yes**  | `Text` |

| Return Type |
|-------------|
| `number`    |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

#### getLogLines

```typescript
out.utils.getLogLines(item: any): string[]
```

Split a log-formatted multi-line text into an array of lines

```typescript
out.utils.getLogLines(`
this is line 1
this is line 2
`); // [ '', 'this is line 1', 'this is line 2', '' ]
```

|  #  | Parameter Name | Required | Type  |
|:---:|:---------------|:---------|:------|
| *0* | `item`         | **Yes**  | `any` |

| Return Type |
|-------------|
| `string[]`  |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

#### getNumLogLines

```typescript
out.utils.getNumLogLines(item: Text): number
```

Get how many lines a log-formatted string or array of lines has

```typescript
out.utils.getNumLogLines(`
this is line 1
this is line 2
`); // 4
```

|  #  | Parameter Name | Required | Type   |
|:---:|:---------------|:---------|:-------|
| *0* | `item`         | **Yes**  | `Text` |

| Return Type |
|-------------|
| `number`    |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

#### getLogLinesWidth

```typescript
out.utils.getLogLinesWidth(item: Text): number
```

Get how wide a log-formatted string or array of lines has

```typescript
out.utils.getLogLinesWidth(`
this is line 1
this is line 2
`) // 14
```

|  #  | Parameter Name | Required | Type   |
|:---:|:---------------|:---------|:-------|
| *0* | `item`         | **Yes**  | `Text` |

| Return Type |
|-------------|
| `number`    |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

#### joinLines

```typescript
out.utils.joinLines(lines: string[]): string
```

Join an array of lines into a single multi-line string

```typescript
out.utils.joinLines(['this is line 1', 'this is line 2'])
// 'this is line 1' + '\n' +
// 'this is line 2'
```

|  #  | Parameter Name | Required | Type       |
|:---:|:---------------|:---------|:-----------|
| *0* | `lines`        | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

#### hasColor

```typescript
out.utils.hasColor(str: string): boolean
```

Determine whether a given string contains any chalk-ed colours

```typescript
out.utils.hasColor('this is line 1') // false
out.utils.hasColor(chalk.red('this is line 1')) // true
```

|  #  | Parameter Name | Required | Type     |
|:---:|:---------------|:---------|:---------|
| *0* | `str`          | **Yes**  | `string` |

| Return Type |
|-------------|
| `boolean`   |

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
table.print(body: any[][], header: any[][], options: TableOptions): number
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

|  #  | Parameter Name | Required | Type           | Default |
|:---:|:---------------|:---------|:---------------|:--------|
| *0* | `body`         | **Yes**  | `any[][]`      |         |
| *1* | `header`       | *No*     | `any[][]`      |         |
| *2* | `options`      | *No*     | `TableOptions` | `{}`    |

| Return Type |
|-------------|
| `number`    |

<p style="text-align: right" align="right"><a href="#table"> [↑ Back to <b>table</b> ↑] </a></p>

### printObjects

```typescript
table.printObjects(objects: Object[], headers: Object, options: TableOptions): number
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

|  #  | Parameter Name | Required | Type           | Default |
|:---:|:---------------|:---------|:---------------|:--------|
| *0* | `objects`      | **Yes**  | `Object[]`     |         |
| *1* | `headers`      | *No*     | `Object`       | `{}`    |
| *2* | `options`      | *No*     | `TableOptions` | `{}`    |

| Return Type |
|-------------|
| `number`    |

<p style="text-align: right" align="right"><a href="#table"> [↑ Back to <b>table</b> ↑] </a></p>

### markdown

```typescript
table.markdown(body: any[][], header: any[][], options: TableOptions): string[]
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

|  #  | Parameter Name | Required | Type           | Default |
|:---:|:---------------|:---------|:---------------|:--------|
| *0* | `body`         | **Yes**  | `any[][]`      |         |
| *1* | `header`       | *No*     | `any[][]`      |         |
| *2* | `options`      | *No*     | `TableOptions` | `{}`    |

| Return Type |
|-------------|
| `string[]`  |

<p style="text-align: right" align="right"><a href="#table"> [↑ Back to <b>table</b> ↑] </a></p>

### getLines

```typescript
table.getLines(body: any[][], header: any[][], options: TableOptions): string[]
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

|  #  | Parameter Name | Required | Type           | Default |
|:---:|:---------------|:---------|:---------------|:--------|
| *0* | `body`         | **Yes**  | `any[][]`      |         |
| *1* | `header`       | *No*     | `any[][]`      |         |
| *2* | `options`      | *No*     | `TableOptions` | `{}`    |

| Return Type |
|-------------|
| `string[]`  |

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
table.utils.objectsToTable(objects: Object[], headers: Object): { header: any[][]; body: any[][]; }
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

|  #  | Parameter Name | Required | Type       | Default |
|:---:|:---------------|:---------|:-----------|:--------|
| *0* | `objects`      | **Yes**  | `Object[]` |         |
| *1* | `headers`      | *No*     | `Object`   | `{}`    |

| Return Type                           |
|---------------------------------------|
| `{ header: any[][]; body: any[][]; }` |

<p style="text-align: right" align="right"><a href="#table"> [↑ Back to <b>table</b> ↑] </a></p>

#### transpose

```typescript
table.utils.transpose(rows: any[][]): any[][]
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

|  #  | Parameter Name | Required | Type      |
|:---:|:---------------|:---------|:----------|
| *0* | `rows`         | **Yes**  | `any[][]` |

| Return Type |
|-------------|
| `any[][]`   |

<p style="text-align: right" align="right"><a href="#table"> [↑ Back to <b>table</b> ↑] </a></p>

#### concatRows

```typescript
table.utils.concatRows(cells: { header: any[][]; body: any[][] }): any[][]
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

|  #  | Parameter Name | Required | Type                                 |
|:---:|:---------------|:---------|:-------------------------------------|
| *0* | `cells`        | **Yes**  | `{ header: any[][]; body: any[][] }` |

| Return Type |
|-------------|
| `any[][]`   |

<p style="text-align: right" align="right"><a href="#table"> [↑ Back to <b>table</b> ↑] </a></p>

#### getFormat

```typescript
table.utils.getFormat(format: Function | Colour, row: number, col: number, isHeader: boolean, isBody: boolean): TableFormatConfig
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

|  #  | Parameter Name | Required | Type                 |
|:---:|:---------------|:---------|:---------------------|
| *0* | `format`       | **Yes**  | `Function \| Colour` |
| *1* | `row`          | *No*     | `number`             |
| *2* | `col`          | *No*     | `number`             |
| *3* | `isHeader`     | *No*     | `boolean`            |
| *4* | `isBody`       | *No*     | `boolean`            |

| Return Type         |
|---------------------|
| `TableFormatConfig` |

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
createLogger(extraConfigs: T, options: LogOptions): any
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

|  #  | Parameter Name | Required | Type         | Default   |
|:---:|:---------------|:---------|:-------------|:----------|
| *0* | `extraConfigs` | *No*     | `T`          | `{} as T` |
| *1* | `options`      | *No*     | `LogOptions` | `{}`      |

| Return Type |
|-------------|
| `any`       |

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
chlk.gray0(...args: string[]): string
clr.gray0(...args: string[]): string
```

Gray 0 (0-5). Equivalent to chalk.black

|  #   | Parameter Name | Required | Type       | Description          |
|:----:|:---------------|:---------|:-----------|:---------------------|
| *0…* | `args`         | **Yes**  | `string[]` | Strings to be styled |

| Return Type |        |
|-------------|--------|
| `string`    | string |

<p style="text-align: right" align="right"><a href="#chlk"> [↑ Back to <b>chlk</b> ↑] </a></p>

### gray1

```typescript
chlk.gray1(...args: string[]): string
clr.gray1(...args: string[]): string
```

Gray 1 (0-5). Equivalent to chalk.gray.dim

|  #   | Parameter Name | Required | Type       | Description          |
|:----:|:---------------|:---------|:-----------|:---------------------|
| *0…* | `args`         | **Yes**  | `string[]` | Strings to be styled |

| Return Type |        |
|-------------|--------|
| `string`    | string |

<p style="text-align: right" align="right"><a href="#chlk"> [↑ Back to <b>chlk</b> ↑] </a></p>

### gray2

```typescript
chlk.gray2(...args: string[]): string
clr.gray2(...args: string[]): string
```

Gray 2 (0-5). Equivalent to chalk.white.dim

|  #   | Parameter Name | Required | Type       | Description          |
|:----:|:---------------|:---------|:-----------|:---------------------|
| *0…* | `args`         | **Yes**  | `string[]` | Strings to be styled |

| Return Type |        |
|-------------|--------|
| `string`    | string |

<p style="text-align: right" align="right"><a href="#chlk"> [↑ Back to <b>chlk</b> ↑] </a></p>

### gray3

```typescript
chlk.gray3(...args: string[]): string
clr.gray3(...args: string[]): string
```

Gray 3 (0-5). Equivalent to chalk.whiteBright.dim

|  #   | Parameter Name | Required | Type       | Description          |
|:----:|:---------------|:---------|:-----------|:---------------------|
| *0…* | `args`         | **Yes**  | `string[]` | Strings to be styled |

| Return Type |        |
|-------------|--------|
| `string`    | string |

<p style="text-align: right" align="right"><a href="#chlk"> [↑ Back to <b>chlk</b> ↑] </a></p>

### gray4

```typescript
chlk.gray4(...args: string[]): string
clr.gray4(...args: string[]): string
```

Gray 4 (0-5). Equivalent to chalk.white

|  #   | Parameter Name | Required | Type       | Description          |
|:----:|:---------------|:---------|:-----------|:---------------------|
| *0…* | `args`         | **Yes**  | `string[]` | Strings to be styled |

| Return Type |        |
|-------------|--------|
| `string`    | string |

<p style="text-align: right" align="right"><a href="#chlk"> [↑ Back to <b>chlk</b> ↑] </a></p>

### gray5

```typescript
chlk.gray5(...args: string[]): string
clr.gray5(...args: string[]): string
```

Gray 5 (0-5). Equivalent to chalk.whiteBright

|  #   | Parameter Name | Required | Type       | Description          |
|:----:|:---------------|:---------|:-----------|:---------------------|
| *0…* | `args`         | **Yes**  | `string[]` | Strings to be styled |

| Return Type |        |
|-------------|--------|
| `string`    | string |

<p style="text-align: right" align="right"><a href="#chlk"> [↑ Back to <b>chlk</b> ↑] </a></p>

### grays

```typescript
chlk.grays(...args: string[]): string
```

Grays between 0 and 5.

```typescript
grays[2]; // gray2
```

|  #   | Parameter Name | Required | Type       | Description          |
|:----:|:---------------|:---------|:-----------|:---------------------|
| *0…* | `args`         | **Yes**  | `string[]` | Strings to be styled |

| Return Type |        |
|-------------|--------|
| `string`    | string |

<p style="text-align: right" align="right"><a href="#chlk"> [↑ Back to <b>chlk</b> ↑] </a></p>

### gray

```typescript
chlk.gray(num: number): any
```

Grays between 0 and 5.

```typescript
gray(2); // gray2
```

|  #  | Parameter Name | Required | Type     |
|:---:|:---------------|:---------|:---------|
| *0* | `num`          | **Yes**  | `number` |

| Return Type |
|-------------|
| `any`       |

<p style="text-align: right" align="right"><a href="#chlk"> [↑ Back to <b>chlk</b> ↑] </a></p>

### clear

```typescript
chlk.clear(str: string): string
```

Removes ANSI colours. Not same as chalk.reset

|  #  | Parameter Name | Required | Type     |
|:---:|:---------------|:---------|:---------|
| *0* | `str`          | **Yes**  | `string` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#chlk"> [↑ Back to <b>chlk</b> ↑] </a></p>

### not

```typescript
chlk.not(style: Function): (item: string) => string
```

Stops and restarts a style around a given string

|  #  | Parameter Name | Required | Type       |
|:---:|:---------------|:---------|:-----------|
| *0* | `style`        | **Yes**  | `Function` |

| Return Type                |
|----------------------------|
| `(item: string) => string` |

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
    - [gray0](#gray0)
    - [gray1](#gray1)
    - [gray2](#gray2)
    - [gray3](#gray3)
    - [gray4](#gray4)
    - [gray5](#gray5)

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### hl1

```typescript
clr.hl1(...args: string[]): string
```

Highlight 1

|  #   | Parameter Name | Required | Type       | Description          |
|:----:|:---------------|:---------|:-----------|:---------------------|
| *0…* | `args`         | **Yes**  | `string[]` | Strings to be styled |

| Return Type |        |
|-------------|--------|
| `string`    | string |

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### hl2

```typescript
clr.hl2(...args: string[]): string
```

Highlight 2

|  #   | Parameter Name | Required | Type       | Description          |
|:----:|:---------------|:---------|:-----------|:---------------------|
| *0…* | `args`         | **Yes**  | `string[]` | Strings to be styled |

| Return Type |        |
|-------------|--------|
| `string`    | string |

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### approve

```typescript
clr.approve(...args: string[]): string
```

Approval colour (green)

|  #   | Parameter Name | Required | Type       | Description          |
|:----:|:---------------|:---------|:-----------|:---------------------|
| *0…* | `args`         | **Yes**  | `string[]` | Strings to be styled |

| Return Type |        |
|-------------|--------|
| `string`    | string |

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### create

```typescript
clr.create(...args: string[]): string
```

Create colour (greenBright)

|  #   | Parameter Name | Required | Type       | Description          |
|:----:|:---------------|:---------|:-----------|:---------------------|
| *0…* | `args`         | **Yes**  | `string[]` | Strings to be styled |

| Return Type |        |
|-------------|--------|
| `string`    | string |

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### update

```typescript
clr.update(...args: string[]): string
```

Update colour (yellow)

|  #   | Parameter Name | Required | Type       | Description          |
|:----:|:---------------|:---------|:-----------|:---------------------|
| *0…* | `args`         | **Yes**  | `string[]` | Strings to be styled |

| Return Type |        |
|-------------|--------|
| `string`    | string |

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### remove

```typescript
clr.remove(...args: string[]): string
```

Remove/delete colour (red)

|  #   | Parameter Name | Required | Type       | Description          |
|:----:|:---------------|:---------|:-----------|:---------------------|
| *0…* | `args`         | **Yes**  | `string[]` | Strings to be styled |

| Return Type |        |
|-------------|--------|
| `string`    | string |

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### removeAll

```typescript
clr.removeAll(...args: string[]): string
```

Remove/delete all colour (red)

|  #   | Parameter Name | Required | Type       | Description          |
|:----:|:---------------|:---------|:-----------|:---------------------|
| *0…* | `args`         | **Yes**  | `string[]` | Strings to be styled |

| Return Type |        |
|-------------|--------|
| `string`    | string |

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### blue

```typescript
clr.blue(...args: string[]): string
```

Alias for chalk.blueBright

|  #   | Parameter Name | Required | Type       | Description          |
|:----:|:---------------|:---------|:-----------|:---------------------|
| *0…* | `args`         | **Yes**  | `string[]` | Strings to be styled |

| Return Type |        |
|-------------|--------|
| `string`    | string |

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### cyan

```typescript
clr.cyan(...args: string[]): string
```

Alias for chalk.cyanBright

|  #   | Parameter Name | Required | Type       | Description          |
|:----:|:---------------|:---------|:-----------|:---------------------|
| *0…* | `args`         | **Yes**  | `string[]` | Strings to be styled |

| Return Type |        |
|-------------|--------|
| `string`    | string |

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### green

```typescript
clr.green(...args: string[]): string
```

Alias for chalk.greenBright

|  #   | Parameter Name | Required | Type       | Description          |
|:----:|:---------------|:---------|:-----------|:---------------------|
| *0…* | `args`         | **Yes**  | `string[]` | Strings to be styled |

| Return Type |        |
|-------------|--------|
| `string`    | string |

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### magenta

```typescript
clr.magenta(...args: string[]): string
```

Alias for chalk.magentaBright

|  #   | Parameter Name | Required | Type       | Description          |
|:----:|:---------------|:---------|:-----------|:---------------------|
| *0…* | `args`         | **Yes**  | `string[]` | Strings to be styled |

| Return Type |        |
|-------------|--------|
| `string`    | string |

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### red

```typescript
clr.red(...args: string[]): string
```

Alias for chalk.redBright

|  #   | Parameter Name | Required | Type       | Description          |
|:----:|:---------------|:---------|:-----------|:---------------------|
| *0…* | `args`         | **Yes**  | `string[]` | Strings to be styled |

| Return Type |        |
|-------------|--------|
| `string`    | string |

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### yellow

```typescript
clr.yellow(...args: string[]): string
```

Alias for chalk.yellowBright

|  #   | Parameter Name | Required | Type       | Description          |
|:----:|:---------------|:---------|:-----------|:---------------------|
| *0…* | `args`         | **Yes**  | `string[]` | Strings to be styled |

| Return Type |        |
|-------------|--------|
| `string`    | string |

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### t1

```typescript
clr.t1(...args: string[]): string
```

Theme 1

|  #   | Parameter Name | Required | Type       | Description          |
|:----:|:---------------|:---------|:-----------|:---------------------|
| *0…* | `args`         | **Yes**  | `string[]` | Strings to be styled |

| Return Type |        |
|-------------|--------|
| `string`    | string |

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### t2

```typescript
clr.t2(...args: string[]): string
```

Theme 2

|  #   | Parameter Name | Required | Type       | Description          |
|:----:|:---------------|:---------|:-----------|:---------------------|
| *0…* | `args`         | **Yes**  | `string[]` | Strings to be styled |

| Return Type |        |
|-------------|--------|
| `string`    | string |

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### t3

```typescript
clr.t3(...args: string[]): string
```

Theme 3

|  #   | Parameter Name | Required | Type       | Description          |
|:----:|:---------------|:---------|:-----------|:---------------------|
| *0…* | `args`         | **Yes**  | `string[]` | Strings to be styled |

| Return Type |        |
|-------------|--------|
| `string`    | string |

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### t4

```typescript
clr.t4(...args: string[]): string
```

Theme 4

|  #   | Parameter Name | Required | Type       | Description          |
|:----:|:---------------|:---------|:-----------|:---------------------|
| *0…* | `args`         | **Yes**  | `string[]` | Strings to be styled |

| Return Type |        |
|-------------|--------|
| `string`    | string |

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### t5

```typescript
clr.t5(...args: string[]): string
```

Theme 5

|  #   | Parameter Name | Required | Type       | Description          |
|:----:|:---------------|:---------|:-----------|:---------------------|
| *0…* | `args`         | **Yes**  | `string[]` | Strings to be styled |

| Return Type |        |
|-------------|--------|
| `string`    | string |

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### t6

```typescript
clr.t6(...args: string[]): string
```

Theme 6

|  #   | Parameter Name | Required | Type       | Description          |
|:----:|:---------------|:---------|:-----------|:---------------------|
| *0…* | `args`         | **Yes**  | `string[]` | Strings to be styled |

| Return Type |        |
|-------------|--------|
| `string`    | string |

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### gray0

```typescript
chlk.gray0(...args: string[]): string
clr.gray0(...args: string[]): string
```

Gray 0 (0-5). Equivalent to chalk.black

|  #   | Parameter Name | Required | Type       | Description          |
|:----:|:---------------|:---------|:-----------|:---------------------|
| *0…* | `args`         | **Yes**  | `string[]` | Strings to be styled |

| Return Type |        |
|-------------|--------|
| `string`    | string |

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### gray1

```typescript
chlk.gray1(...args: string[]): string
clr.gray1(...args: string[]): string
```

Gray 1 (0-5). Equivalent to chalk.gray.dim

|  #   | Parameter Name | Required | Type       | Description          |
|:----:|:---------------|:---------|:-----------|:---------------------|
| *0…* | `args`         | **Yes**  | `string[]` | Strings to be styled |

| Return Type |        |
|-------------|--------|
| `string`    | string |

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### gray2

```typescript
chlk.gray2(...args: string[]): string
clr.gray2(...args: string[]): string
```

Gray 2 (0-5). Equivalent to chalk.white.dim

|  #   | Parameter Name | Required | Type       | Description          |
|:----:|:---------------|:---------|:-----------|:---------------------|
| *0…* | `args`         | **Yes**  | `string[]` | Strings to be styled |

| Return Type |        |
|-------------|--------|
| `string`    | string |

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### gray3

```typescript
chlk.gray3(...args: string[]): string
clr.gray3(...args: string[]): string
```

Gray 3 (0-5). Equivalent to chalk.whiteBright.dim

|  #   | Parameter Name | Required | Type       | Description          |
|:----:|:---------------|:---------|:-----------|:---------------------|
| *0…* | `args`         | **Yes**  | `string[]` | Strings to be styled |

| Return Type |        |
|-------------|--------|
| `string`    | string |

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### gray4

```typescript
chlk.gray4(...args: string[]): string
clr.gray4(...args: string[]): string
```

Gray 4 (0-5). Equivalent to chalk.white

|  #   | Parameter Name | Required | Type       | Description          |
|:----:|:---------------|:---------|:-----------|:---------------------|
| *0…* | `args`         | **Yes**  | `string[]` | Strings to be styled |

| Return Type |        |
|-------------|--------|
| `string`    | string |

<p style="text-align: right" align="right"><a href="#clr"> [↑ Back to <b>clr</b> ↑] </a></p>

### gray5

```typescript
chlk.gray5(...args: string[]): string
clr.gray5(...args: string[]): string
```

Gray 5 (0-5). Equivalent to chalk.whiteBright

|  #   | Parameter Name | Required | Type       | Description          |
|:----:|:---------------|:---------|:-----------|:---------------------|
| *0…* | `args`         | **Yes**  | `string[]` | Strings to be styled |

| Return Type |        |
|-------------|--------|
| `string`    | string |

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
LogTools.getLogStr(item: any): string
getLogStr(item: any): string
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

|  #  | Parameter Name | Required | Type  |
|:---:|:---------------|:---------|:------|
| *0* | `item`         | **Yes**  | `any` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#logtools"> [↑ Back to <b>LogTools</b> ↑] </a></p>

### processLogContents

```typescript
LogTools.processLogContents(prefix: string, wrapper: Function, ...args: any[]): string
processLogContents(prefix: string, wrapper: Function, ...args: any[]): string
```

Process an item to be logged

|  #   | Parameter Name | Required | Type       | Default    |
|:----:|:---------------|:---------|:-----------|:-----------|
| *0*  | `prefix`       | **Yes**  | `string`   |            |
| *1*  | `wrapper`      | *No*     | `Function` | `fn.noact` |
| *2…* | `args`         | *No*     | `any[]`    |            |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#logtools"> [↑ Back to <b>LogTools</b> ↑] </a></p>

### getLog

```typescript
LogTools.getLog(prefix: string, wrapper: Function): (...args: any[]) => void
getLog(prefix: string, wrapper: Function): (...args: any[]) => void
```

Get a log function for a given prefix

|  #  | Parameter Name | Required | Type       | Default    |
|:---:|:---------------|:---------|:-----------|:-----------|
| *0* | `prefix`       | **Yes**  | `string`   |            |
| *1* | `wrapper`      | *No*     | `Function` | `fn.noact` |

| Return Type                |
|----------------------------|
| `(...args: any[]) => void` |

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
PathTools.explodePath(path: string): ExplodedPath
explodePath(path: string): ExplodedPath
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

|  #  | Parameter Name | Required | Type     |
|:---:|:---------------|:---------|:---------|
| *0* | `path`         | **Yes**  | `string` |

| Return Type    |
|----------------|
| `ExplodedPath` |

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
PathTools.removeTrailSlash(path: string): string
```

Remove trailing slash from path (if one exists)

```typescript
'/path/to/file/' -> '/path/to/file'
```

|  #  | Parameter Name | Required | Type     |
|:---:|:---------------|:---------|:---------|
| *0* | `path`         | **Yes**  | `string` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#pathtools"> [↑ Back to <b>PathTools</b> ↑] </a></p>

### trailSlash

```typescript
PathTools.trailSlash(path: string): string
```

Ensures there's a trailing slash on path

```typescript
'/path/to/file' -> '/path/to/file/'
```

|  #  | Parameter Name | Required | Type     |
|:---:|:---------------|:---------|:---------|
| *0* | `path`         | **Yes**  | `string` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#pathtools"> [↑ Back to <b>PathTools</b> ↑] </a></p>

### removeDoubleSlashes

```typescript
PathTools.removeDoubleSlashes(path: string): string
```

Removes double slashes from path (an bug with Unix paths)

```typescript
'/path/to//file' -> '/path/to/file'
```

|  #  | Parameter Name | Required | Type     |
|:---:|:---------------|:---------|:---------|
| *0* | `path`         | **Yes**  | `string` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#pathtools"> [↑ Back to <b>PathTools</b> ↑] </a></p>

## progressBarTools
A collection of tools for working with progress bars (from swiss-ak)

  - [**progressBarTools**](#progressbartools)
    - [getColouredProgressBarOpts](#getcolouredprogressbaropts)

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### getColouredProgressBarOpts

```typescript
progressBarTools.getColouredProgressBarOpts(opts: ProgressBarOptions, randomise: boolean): (prefix?: string, override?: any, resetColours?: boolean) => any
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

|  #  | Parameter Name | Required | Type                 | Default |
|:---:|:---------------|:---------|:---------------------|:--------|
| *0* | `opts`         | **Yes**  | `ProgressBarOptions` |         |
| *1* | `randomise`    | *No*     | `boolean`            | `false` |

| Return Type                                                        |
|--------------------------------------------------------------------|
| `(prefix?: string, override?: any, resetColours?: boolean) => any` |

<p style="text-align: right" align="right"><a href="#progressbartools"> [↑ Back to <b>progressBarTools</b> ↑] </a></p>

## waiters
  - [**waiters**](#waiters)
    - [nextTick](#nexttick)

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### nextTick

```typescript
nextTick(undefined): Promise<unknown>
waiters.nextTick(undefined): Promise<unknown>
```

Wait for the next tick

```typescript
wait nextTick();
```

| Return Type        |
|--------------------|
| `Promise<unknown>` |

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
getKeyListener(callback: (keyName?: string, rawValue?: string) => void, isStart: boolean, isDebugLog: boolean): KeyListener
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

|  #  | Parameter Name | Required | Type                                            | Default |
|:---:|:---------------|:---------|:------------------------------------------------|:--------|
| *0* | `callback`     | **Yes**  | `(keyName?: string, rawValue?: string) => void` |         |
| *1* | `isStart`      | *No*     | `boolean`                                       | `true`  |
| *2* | `isDebugLog`   | *No*     | `boolean`                                       | `false` |

| Return Type   |
|---------------|
| `KeyListener` |

<p style="text-align: right" align="right"><a href="#keylistener"> [↑ Back to <b>keyListener</b> ↑] </a></p>

### KeyListener

```typescript
KeyListener;
```

Returned by `getKeyListener`

<p style="text-align: right" align="right"><a href="#keylistener"> [↑ Back to <b>keyListener</b> ↑] </a></p>

#### start

```typescript
kl.start(undefined): void
```

Start listening for key presses

| Return Type |
|-------------|
| `void`      |

<p style="text-align: right" align="right"><a href="#keylistener"> [↑ Back to <b>keyListener</b> ↑] </a></p>

#### stop

```typescript
kl.stop(undefined): void
```

Stop listening for key presses

| Return Type |
|-------------|
| `void`      |

<p style="text-align: right" align="right"><a href="#keylistener"> [↑ Back to <b>keyListener</b> ↑] </a></p>

<!-- DOCS: MAIN END -->
