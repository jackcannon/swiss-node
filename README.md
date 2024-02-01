# swiss-node

Swiss Army Knife for node

A collection of helper functions and useful little things for node.js

Uses `swiss-ak`

<!-- DOCS: TOC START -->

  - [**Table of Contents**](#)
    - [**ask**](#ask)
    - [**out**](#out)
    - [**colr**](#colr)
    - [**table**](#table)
    - [**Logger**](#logger)
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
    - [text](#ask_text)
    - [autotext](#autotext)
    - [number](#number)
    - [boolean](#boolean)
    - [booleanYN](#booleanyn)
    - [select](#ask_select)
    - [multiselect](#ask_multiselect)
    - [date](#date)
    - [time](#time)
    - [datetime](#datetime)
    - [dateRange](#daterange)
    - [**fileExplorer**](#ask_fileexplorerheader)
      - [fileExplorer](#ask_fileexplorer)
      - [multiFileExplorer](#multifileexplorer)
      - [saveFileExplorer](#savefileexplorer)
    - [**table**](#ask_table)
      - [select](#ask_table_select)
      - [multiselect](#ask_table_multiselect)
      - [AskTableDisplaySettings<T>](#asktabledisplaysettingst)
    - [trim](#trim)
    - [**Extra**](#extra)
      - [customise](#customise)
      - [loading](#ask_loading)
      - [countdown](#countdown)
      - [pause](#pause)
      - [imitate](#imitate)
      - [prefill](#prefill)
      - [wizard](#wizard)
      - [section](#section)
      - [separator](#separator)
    - [**utils**](#ask_utils)
      - [itemsToPromptObjects](#itemstopromptobjects)
    - [AskOptions](#askoptions)
    - [PromptChoice](#promptchoice)

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### <span id="ask_text">text</span>

```typescript
ask.text(question: string | Breadcrumb, initial: string, validate: (value: string) => Error | string | boolean | void, lc: LineCounter): Promise<string>
```

Get a text input from the user.

```typescript
const name = await ask.text('What is your name?'); // 'Jack'
```

|  #  | Parameter Name | Required | Type                                                    |
|:---:|:---------------|:---------|:--------------------------------------------------------|
| *0* | `question`     | **Yes**  | `string \| Breadcrumb`                                  |
| *1* | `initial`      | *No*     | `string`                                                |
| *2* | `validate`     | *No*     | `(value: string) => Error \| string \| boolean \| void` |
| *3* | `lc`           | *No*     | `LineCounter`                                           |

| Return Type       |
|-------------------|
| `Promise<string>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### autotext

```typescript
ask.autotext(question: string | Breadcrumb, choices: ask.PromptChoice<T>[], initial: T | string, validate: (item: T, index: number, typedValue: string) => Error | string | boolean | void, lc: LineCounter): Promise<T>
```

Get a text input from the user, with auto-completion.

```typescript
const name = await ask.autotext('What is your name?', ['Jack', 'Jane', 'Joe']); // 'Jack'
```

|  #  | Parameter Name | Required | Type                                                                                 |
|:---:|:---------------|:---------|:-------------------------------------------------------------------------------------|
| *0* | `question`     | **Yes**  | `string \| Breadcrumb`                                                               |
| *1* | `choices`      | **Yes**  | `ask.PromptChoice<T>[]`                                                              |
| *2* | `initial`      | *No*     | `T \| string`                                                                        |
| *3* | `validate`     | *No*     | `(item: T, index: number, typedValue: string) => Error \| string \| boolean \| void` |
| *4* | `lc`           | *No*     | `LineCounter`                                                                        |

| Return Type  |
|--------------|
| `Promise<T>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### number

```typescript
ask.number(question: string | Breadcrumb, initial: number, validate: (value: number) => Error | string | boolean | void, lc: LineCounter): Promise<number>
```

Get a number input from the user.

```typescript
const age = await ask.number('How old are you?'); // 30
```

|  #  | Parameter Name | Required | Type                                                    |
|:---:|:---------------|:---------|:--------------------------------------------------------|
| *0* | `question`     | **Yes**  | `string \| Breadcrumb`                                  |
| *1* | `initial`      | *No*     | `number`                                                |
| *2* | `validate`     | *No*     | `(value: number) => Error \| string \| boolean \| void` |
| *3* | `lc`           | *No*     | `LineCounter`                                           |

| Return Type       |
|-------------------|
| `Promise<number>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### boolean

```typescript
ask.boolean(question: string | Breadcrumb, initial: boolean, validate: (value: boolean) => Error | string | boolean | void, lc: LineCounter): Promise<boolean>
```

Get a boolean input from the user (yes or no)

```typescript
const isCool = await ask.boolean('Is this cool?'); // true
```

|  #  | Parameter Name | Required | Type                                                     | Default |
|:---:|:---------------|:---------|:---------------------------------------------------------|:--------|
| *0* | `question`     | **Yes**  | `string \| Breadcrumb`                                   |         |
| *1* | `initial`      | *No*     | `boolean`                                                | `true`  |
| *2* | `validate`     | *No*     | `(value: boolean) => Error \| string \| boolean \| void` |         |
| *3* | `lc`           | *No*     | `LineCounter`                                            |         |

| Return Type        |
|--------------------|
| `Promise<boolean>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### booleanYN

```typescript
ask.booleanYN(question: string | Breadcrumb, validate: (value: boolean) => Error | string | boolean | void, lc: LineCounter): Promise<boolean>
```

Get a boolean input from the user (yes or no)

Alternative interface to ask.boolean

```typescript
const isCool = await ask.booleanYN('Is this cool?'); // true
```

|  #  | Parameter Name | Required | Type                                                     |
|:---:|:---------------|:---------|:---------------------------------------------------------|
| *0* | `question`     | **Yes**  | `string \| Breadcrumb`                                   |
| *1* | `validate`     | *No*     | `(value: boolean) => Error \| string \| boolean \| void` |
| *2* | `lc`           | *No*     | `LineCounter`                                            |

| Return Type        |
|--------------------|
| `Promise<boolean>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### <span id="ask_select">select</span>

```typescript
ask.select(question: string | Breadcrumb, choices: ask.PromptChoice<T>[], initial: ask.PromptChoice<T> | number, validate: (item: T, index: number) => Error | string | boolean | void, lc: LineCounter): Promise<T>
```

Get the user to select an option from a list.

```typescript
const colour = await ask.select('Whats your favourite colour?', ['red', 'green', 'blue']); // 'red'
```

|  #  | Parameter Name | Required | Type                                                             |
|:---:|:---------------|:---------|:-----------------------------------------------------------------|
| *0* | `question`     | **Yes**  | `string \| Breadcrumb`                                           |
| *1* | `choices`      | **Yes**  | `ask.PromptChoice<T>[]`                                          |
| *2* | `initial`      | *No*     | `ask.PromptChoice<T> \| number`                                  |
| *3* | `validate`     | *No*     | `(item: T, index: number) => Error \| string \| boolean \| void` |
| *4* | `lc`           | *No*     | `LineCounter`                                                    |

| Return Type  |
|--------------|
| `Promise<T>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### <span id="ask_multiselect">multiselect</span>

```typescript
ask.multiselect(question: string | Breadcrumb, choices: ask.PromptChoice<T>[], initial: ask.PromptChoice<T> | ask.PromptChoice<T>[] | number | number[], validate: (items: T[], indexes: number[]) => Error | string | boolean | void, lc: LineCounter): Promise<T[]>
```

Get the user to select multiple opts from a list.

```typescript
const colours = await ask.multiselect('Whats your favourite colours?', ['red', 'green', 'blue']); // ['red', 'green']
```

|  #  | Parameter Name | Required | Type                                                                    |
|:---:|:---------------|:---------|:------------------------------------------------------------------------|
| *0* | `question`     | **Yes**  | `string \| Breadcrumb`                                                  |
| *1* | `choices`      | **Yes**  | `ask.PromptChoice<T>[]`                                                 |
| *2* | `initial`      | *No*     | `ask.PromptChoice<T> \| ask.PromptChoice<T>[] \| number \| number[]`    |
| *3* | `validate`     | *No*     | `(items: T[], indexes: number[]) => Error \| string \| boolean \| void` |
| *4* | `lc`           | *No*     | `LineCounter`                                                           |

| Return Type    |
|----------------|
| `Promise<T[]>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### date

```typescript
ask.date(questionText: string | Breadcrumb, initial: Date, validate: (date: Date) => Error | string | boolean | void, lc: LineCounter): Promise<Date>
```

Get a date input from the user.

```typescript
const date = await ask.date('Whats the date?');
// [Date: 2023-01-01T12:00:00.000Z] (user inputted date, always at 12 midday)
```

|  #  | Parameter Name | Required | Type                                                 |
|:---:|:---------------|:---------|:-----------------------------------------------------|
| *0* | `questionText` | *No*     | `string \| Breadcrumb`                               |
| *1* | `initial`      | *No*     | `Date`                                               |
| *2* | `validate`     | *No*     | `(date: Date) => Error \| string \| boolean \| void` |
| *3* | `lc`           | *No*     | `LineCounter`                                        |

| Return Type     |
|-----------------|
| `Promise<Date>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### time

```typescript
ask.time(questionText: string | Breadcrumb, initial: Date, validate: (date: Date) => Error | string | boolean | void, lc: LineCounter): Promise<Date>
```

Get a time input from the user.

```typescript
const time = await ask.time('Whats the time?');
// [Date: 2023-01-01T12:00:00.000Z] (user inputted time, with todays date)

const time2 = await ask.time('Whats the time?', new Date('1999-12-31'));
// [Date: 1999-12-31T12:00:00.000Z] (user inputted time, with same date as initial)
```

|  #  | Parameter Name | Required | Type                                                 |
|:---:|:---------------|:---------|:-----------------------------------------------------|
| *0* | `questionText` | *No*     | `string \| Breadcrumb`                               |
| *1* | `initial`      | *No*     | `Date`                                               |
| *2* | `validate`     | *No*     | `(date: Date) => Error \| string \| boolean \| void` |
| *3* | `lc`           | *No*     | `LineCounter`                                        |

| Return Type     |
|-----------------|
| `Promise<Date>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### datetime

```typescript
ask.datetime(questionText: string | Breadcrumb, initial: Date, validate: (date: Date) => Error | string | boolean | void, lc: LineCounter): Promise<Date>
```

Get a date and time input from the user.

```typescript
const when = await ask.datetime('Whats the date/time?');
// [Date: 2023-03-05T20:30:00.000Z] (user inputted time & date)
```

|  #  | Parameter Name | Required | Type                                                 |
|:---:|:---------------|:---------|:-----------------------------------------------------|
| *0* | `questionText` | *No*     | `string \| Breadcrumb`                               |
| *1* | `initial`      | *No*     | `Date`                                               |
| *2* | `validate`     | *No*     | `(date: Date) => Error \| string \| boolean \| void` |
| *3* | `lc`           | *No*     | `LineCounter`                                        |

| Return Type     |
|-----------------|
| `Promise<Date>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### dateRange

```typescript
ask.dateRange(questionText: string | Breadcrumb, initialStart: Date, initialEnd: Date, validate: (dates: [Date, Date]) => Error | string | boolean | void, lc: LineCounter): Promise<[Date, Date]>
```

Get a date range input from the user.

```typescript
const range = await ask.dateRange('When is the festival?');
// [
//   [Date: 2023-03-01T12:00:00.000Z],
//   [Date: 2023-03-31T12:00:00.000Z]
// ]
```

|  #  | Parameter Name | Required | Type                                                          |
|:---:|:---------------|:---------|:--------------------------------------------------------------|
| *0* | `questionText` | *No*     | `string \| Breadcrumb`                                        |
| *1* | `initialStart` | *No*     | `Date`                                                        |
| *2* | `initialEnd`   | *No*     | `Date`                                                        |
| *3* | `validate`     | *No*     | `(dates: [Date, Date]) => Error \| string \| boolean \| void` |
| *4* | `lc`           | *No*     | `LineCounter`                                                 |

| Return Type             |
|-------------------------|
| `Promise<[Date, Date]>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### <span id="ask_fileexplorerheader">fileExplorer</span>

#### <span id="ask_fileexplorer">fileExplorer</span>

```typescript
ask.fileExplorer(questionText: string | Breadcrumb, selectType: 'd' | 'f', startPath: string, validate: (path: string) => Error | string | boolean | void): Promise<string>
```

Get a file or folder path from the user.

```typescript
const file = await ask.fileExplorer('What file?', 'f');
// '/Users/user/Documents/some_file.txt'

const dir = await ask.fileExplorer('What file?', 'd', '/Users/jackcannon/Documents');
// '/Users/jackcannon/Documents/some_folder'
```

|  #  | Parameter Name | Required | Type                                                   | Default         |
|:---:|:---------------|:---------|:-------------------------------------------------------|:----------------|
| *0* | `questionText` | **Yes**  | `string \| Breadcrumb`                                 |                 |
| *1* | `selectType`   | *No*     | `'d' \| 'f'`                                           | `'f'`           |
| *2* | `startPath`    | *No*     | `string`                                               | `process.cwd()` |
| *3* | `validate`     | *No*     | `(path: string) => Error \| string \| boolean \| void` |                 |

| Return Type       |
|-------------------|
| `Promise<string>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

#### multiFileExplorer

```typescript
ask.multiFileExplorer(questionText: string | Breadcrumb, selectType: 'd' | 'f', startPath: string, validate: (paths: string[]) => Error | string | boolean | void): Promise<string[]>
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

|  #  | Parameter Name | Required | Type                                                      | Default         |
|:---:|:---------------|:---------|:----------------------------------------------------------|:----------------|
| *0* | `questionText` | **Yes**  | `string \| Breadcrumb`                                    |                 |
| *1* | `selectType`   | *No*     | `'d' \| 'f'`                                              | `'f'`           |
| *2* | `startPath`    | *No*     | `string`                                                  | `process.cwd()` |
| *3* | `validate`     | *No*     | `(paths: string[]) => Error \| string \| boolean \| void` |                 |

| Return Type         |
|---------------------|
| `Promise<string[]>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

#### saveFileExplorer

```typescript
ask.saveFileExplorer(questionText: string | Breadcrumb, startPath: string, suggestedFileName: string, validate: (dir: string, filename?: string) => Error | string | boolean | void): Promise<string>
```

Get a file path from the user, with the intention of saving a file to that path.

```typescript
const HOME_DIR = '/Users/user/Documents';
const savePath = await ask.saveFileExplorer('Save file', HOME_DIR, 'data.json');
// '/Users/user/Documents/data.json'
```

|  #  | Parameter Name      | Required | Type                                                                     | Default         |
|:---:|:--------------------|:---------|:-------------------------------------------------------------------------|:----------------|
| *0* | `questionText`      | **Yes**  | `string \| Breadcrumb`                                                   |                 |
| *1* | `startPath`         | *No*     | `string`                                                                 | `process.cwd()` |
| *2* | `suggestedFileName` | *No*     | `string`                                                                 | `''`            |
| *3* | `validate`          | *No*     | `(dir: string, filename?: string) => Error \| string \| boolean \| void` |                 |

| Return Type       |
|-------------------|
| `Promise<string>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### <span id="ask_table">table</span>
A collection of functions for asking questions with tables.

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

#### <span id="ask_table_select">select</span>

```typescript
ask.table.select(question: string | Breadcrumb, items: T[], settings: AskTableDisplaySettings<T>, initial: T | number, validate: (item: T) => Error | string | boolean | void, lc: LineCounter): Promise<T>
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

|  #  | Parameter Name | Required | Type                                              | Default |
|:---:|:---------------|:---------|:--------------------------------------------------|:--------|
| *0* | `question`     | **Yes**  | `string \| Breadcrumb`                            |         |
| *1* | `items`        | **Yes**  | `T[]`                                             |         |
| *2* | `settings`     | *No*     | `AskTableDisplaySettings<T>`                      | `{}`    |
| *3* | `initial`      | *No*     | `T \| number`                                     |         |
| *4* | `validate`     | *No*     | `(item: T) => Error \| string \| boolean \| void` |         |
| *5* | `lc`           | *No*     | `LineCounter`                                     |         |

| Return Type  |
|--------------|
| `Promise<T>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

#### <span id="ask_table_multiselect">multiselect</span>

```typescript
ask.table.multiselect(question: string | Breadcrumb, items: T[], settings: AskTableDisplaySettings<T>, initial: T[] | number[], validate: (items: T[]) => Error | string | boolean | void, lc: LineCounter): Promise<T[]>
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

|  #  | Parameter Name | Required | Type                                                 | Default |
|:---:|:---------------|:---------|:-----------------------------------------------------|:--------|
| *0* | `question`     | **Yes**  | `string \| Breadcrumb`                               |         |
| *1* | `items`        | **Yes**  | `T[]`                                                |         |
| *2* | `settings`     | *No*     | `AskTableDisplaySettings<T>`                         | `{}`    |
| *3* | `initial`      | *No*     | `T[] \| number[]`                                    |         |
| *4* | `validate`     | *No*     | `(items: T[]) => Error \| string \| boolean \| void` |         |
| *5* | `lc`           | *No*     | `LineCounter`                                        |         |

| Return Type    |
|----------------|
| `Promise<T[]>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

#### AskTableDisplaySettings<T>

```typescript
AskTableDisplaySettings<T>;
```

Settings for how the table should display the items

All settings are optional.

| Name      | Type                            | Description                                                      |
| --------- | ------------------------------- | ---------------------------------------------------------------- |
| `rows`    | `any[][] \| (item: T) => any[]` | Rows to display or function that takes an item and returns a row |
| `headers` | `any[][] \| RemapOf<T, string>` | Header to display, or object with title for each item property   |
| `options` | `table.TableOptions`            | Options object for table (some options are overridden)           |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### trim

```typescript
ask.trim(question: string | Breadcrumb, totalFrames: number, frameRate: number, initial: Partial<Handles<number>>, validate: (handles: Handles<number>) => Error | string | boolean | void, lc: LineCounter): Promise<Handles<number>>
```

Get a start and end frame from the user

|  #  | Parameter Name | Required | Type                                                               | Default |
|:---:|:---------------|:---------|:-------------------------------------------------------------------|:--------|
| *0* | `question`     | **Yes**  | `string \| Breadcrumb`                                             |         |
| *1* | `totalFrames`  | **Yes**  | `number`                                                           |         |
| *2* | `frameRate`    | *No*     | `number`                                                           | `60`    |
| *3* | `initial`      | *No*     | `Partial<Handles<number>>`                                         |         |
| *4* | `validate`     | *No*     | `(handles: Handles<number>) => Error \| string \| boolean \| void` |         |
| *5* | `lc`           | *No*     | `LineCounter`                                                      |         |

| Return Type                |
|----------------------------|
| `Promise<Handles<number>>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### Extra
These are ask functions that don't prompt the user, but can help manage or organise how you use prompts

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

#### customise

```typescript
ask.customise(options: Partial<ask.AskOptions>): void
```

TODO docs

```typescript
TODO example
```

|  #  | Parameter Name | Required | Type                      |
|:---:|:---------------|:---------|:--------------------------|
| *0* | `options`      | **Yes**  | `Partial<ask.AskOptions>` |

| Return Type |
|-------------|
| `void`      |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

#### <span id="ask_loading">loading</span>

```typescript
ask.loading(question: string | Breadcrumb, isComplete: boolean, isError: boolean, lc: LineCounter): { stop: () => void; }
```

Display an animated loading indicator that imitates the display of a prompt

Intended to be indicate a question is coming, but something is loading first. For general 'loading' indicators, use `out.loading`.

```typescript
const loader = ask.loading('What is your name?');
// ...
loader.stop();
```

|  #  | Parameter Name | Required | Type                   | Default |
|:---:|:---------------|:---------|:-----------------------|:--------|
| *0* | `question`     | **Yes**  | `string \| Breadcrumb` |         |
| *1* | `isComplete`   | *No*     | `boolean`              | `false` |
| *2* | `isError`      | *No*     | `boolean`              | `false` |
| *3* | `lc`           | *No*     | `LineCounter`          |         |

| Return Type             |
|-------------------------|
| `{ stop: () => void; }` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

#### countdown

```typescript
ask.countdown(totalSeconds: number, template: (s: second) => string, isComplete: boolean, isError: boolean): Promise<void>
```

Animated countdown for a given number of seconds

```typescript
await ask.countdown(5);
```

|  #  | Parameter Name | Required | Type                    |
|:---:|:---------------|:---------|:------------------------|
| *0* | `totalSeconds` | **Yes**  | `number`                |
| *1* | `template`     | *No*     | `(s: second) => string` |
| *2* | `isComplete`   | *No*     | `boolean`               |
| *3* | `isError`      | *No*     | `boolean`               |

| Return Type     |
|-----------------|
| `Promise<void>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

#### pause

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

#### imitate

```typescript
ask.imitate(question: string | Breadcrumb, result: any, isComplete: boolean, isError: boolean, errorMessage: string, lc: LineCounter): void
```

Imitate the display of a prompt

```typescript
imitate('What is your name?', 'Jack', true);

ask.imitate('What is your name?', 'Jack', true);
```

|  #  | Parameter Name | Required | Type                   | Default |
|:---:|:---------------|:---------|:-----------------------|:--------|
| *0* | `question`     | **Yes**  | `string \| Breadcrumb` |         |
| *1* | `result`       | *No*     | `any`                  |         |
| *2* | `isComplete`   | *No*     | `boolean`              | `true`  |
| *3* | `isError`      | *No*     | `boolean`              | `false` |
| *4* | `errorMessage` | *No*     | `string`               |         |
| *5* | `lc`           | *No*     | `LineCounter`          |         |

| Return Type |
|-------------|
| `void`      |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

#### prefill

```typescript
ask.prefill(question: string | Breadcrumb, value: T | undefined, askFn: (question: string | Breadcrumb, lc: LineCounter) => Promise<T> | T, lc: LineCounter): Promise<T>
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

|  #  | Parameter Name | Required | Type                                                                   |
|:---:|:---------------|:---------|:-----------------------------------------------------------------------|
| *0* | `question`     | **Yes**  | `string \| Breadcrumb`                                                 |
| *1* | `value`        | **Yes**  | `T \| undefined`                                                       |
| *2* | `askFn`        | **Yes**  | `(question: string \| Breadcrumb, lc: LineCounter) => Promise<T> \| T` |
| *3* | `lc`           | *No*     | `LineCounter`                                                          |

| Return Type  |
|--------------|
| `Promise<T>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

#### wizard

```typescript
ask.wizard(startObj: Partial<T>): any
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

await wiz.add('foo', ask.text('What is foo?')); // User input: foo

await wiz.add('bar', ask.number('What is bar?')); // User input: 123

const result = wiz.get(); // { baz: 'baz', foo: 'foo', bar: 123 }
```

|  #  | Parameter Name | Required | Type         | Default |
|:---:|:---------------|:---------|:-------------|:--------|
| *0* | `startObj`     | *No*     | `Partial<T>` | `{}`    |

| Return Type |
|-------------|
| `any`       |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

#### section

```typescript
ask.section(question: string | Breadcrumb, sectionHeader: (lc: LineCounter) => void | Promise<any>, ...questionFns: [...T][]): Promise<TupleFromQuestionFuncs<T>>
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

|  #   | Parameter Name  | Required | Type                                        |
|:----:|:----------------|:---------|:--------------------------------------------|
| *0*  | `question`      | **Yes**  | `string \| Breadcrumb`                      |
| *1*  | `sectionHeader` | *No*     | `(lc: LineCounter) => void \| Promise<any>` |
| *2…* | `questionFns`   | *No*     | `[...T][]`                                  |

| Return Type                          |
|--------------------------------------|
| `Promise<TupleFromQuestionFuncs<T>>` |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

#### separator

```typescript
ask.separator(version: 'down' | 'none' | 'up', spacing: number, offset: number, width: number, lc: LineCounter): void
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
| *4* | `lc`           | *No*     | `LineCounter`              |                                    |

| Return Type |
|-------------|
| `void`      |

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### <span id="ask_utils">utils</span>

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

### AskOptions

```typescript
ask.AskOptions;
```

Options to customise the behaviour/appearance of the `ask` prompts.

TODO tables

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

### PromptChoice

```typescript
ask.PromptChoice<T>;
```

A choice for a prompt

Equivalent to ``T | { title?: string; value?: T; selected?: boolean; }``

<p style="text-align: right" align="right"><a href="#ask"> [↑ Back to <b>ask</b> ↑] </a></p>

## out
A collection of functions to print to the console

  - [**out**](#out)
    - [getWidth](#getwidth)
    - [pad](#pad)
    - [center](#center)
    - [left](#out_left)
    - [right](#out_right)
    - [justify](#justify)
    - [leftLines](#leftlines)
    - [centerLines](#centerlines)
    - [rightLines](#rightlines)
    - [justifyLines](#justifylines)
    - [align](#out_align)
    - [split](#split)
    - [wrap](#wrap)
    - [moveUp](#moveup)
    - [loading](#out_loading)
    - [limitToLength](#limittolength)
    - [limitToLengthStart](#limittolengthstart)
    - [truncate](#out_truncate)
    - [truncateStart](#truncatestart)
    - [concatLineGroups](#concatlinegroups)
    - [**getResponsiveValue**](#getresponsivevalue)
      - [ResponsiveOption<T>](#responsiveoptiont)
    - [**ansi**](#ansi)
    - [**getBreadcrumb**](#getbreadcrumb)
      - [Breadcrumb](#breadcrumb)
    - [**getLineCounter**](#getlinecounter)
      - [**LineCounter**](#linecounter)
        - [lc.log](#lclog)
        - [lc.overwrite](#lcoverwrite)
        - [lc.wrap](#lcwrap)
        - [lc.add](#lcadd)
        - [lc.get](#lcget)
        - [lc.getSince](#lcgetsince)
        - [lc.moveCursor](#lcmovecursor)
        - [lc.moveHome](#lcmovehome)
        - [lc.moveToCheckpoint](#lcmovetocheckpoint)
        - [lc.clear](#lcclear)
        - [lc.clearBack](#lcclearback)
        - [lc.clearDown](#lccleardown)
        - [lc.checkpoint](#lccheckpoint)
        - [lc.clearToCheckpoint](#lccleartocheckpoint)
        - [**lc.ansi**](#lcansi)
          - [lc.ansi.moveCursor](#lcansimovecursor)
          - [lc.ansi.moveHome](#lcansimovehome)
          - [lc.ansi.moveToCheckpoint](#lcansimovetocheckpoint)
          - [lc.ansi.clear](#lcansiclear)
          - [lc.ansi.clearBack](#lcansiclearback)
          - [lc.ansi.clearDown](#lcansicleardown)
          - [lc.ansi.clearToCheckpoint](#lcansicleartocheckpoint)
          - [lc.ansi.save](#lcansisave)
          - [lc.ansi.restore](#lcansirestore)
    - [**utils**](#out_utils)
      - [getTerminalWidth](#getterminalwidth)
      - [getLines](#out_utils_getlines)
      - [getNumLines](#getnumlines)
      - [getLinesWidth](#getlineswidth)
      - [getLogLines](#getloglines)
      - [getNumLogLines](#getnumloglines)
      - [getLogLinesWidth](#getloglineswidth)
      - [joinLines](#joinlines)
      - [hasColor](#hascolor)
      - [stripAnsi](#stripansi)
      - [getEmojiRegex](#getemojiregex)

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### getWidth

```typescript
out.getWidth(text: string): number
```

A rough approximation of the width of the given text (as it would appear in the terminal)

Removes all ansi escape codes, and attempts to count emojis as 2 characters wide

> __Note:__ Many special characters may not be counted correctly. Emoji support is also not perfect.

|  #  | Parameter Name | Required | Type     |
|:---:|:---------------|:---------|:---------|
| *0* | `text`         | **Yes**  | `string` |

| Return Type |
|-------------|
| `number`    |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

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

### <span id="out_left">left</span>

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

### <span id="out_right">right</span>

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

### <span id="out_align">align</span>

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

### <span id="out_loading">loading</span>

```typescript
out.loading(action: (s: string) => string | void, lines: number, symbols: string[]): { stop: () => void; }
```

Display an animated loading indicator

If the given action returns a string, it will be printed. Otherwise, it will assume the action prints to output itself (and clears the number of lines given as the second argument)

```typescript
const loader = out.loading();
// ...
loader.stop();
```

|  #  | Parameter Name | Required | Type                            | Default          |
|:---:|:---------------|:---------|:--------------------------------|:-----------------|
| *0* | `action`       | *No*     | `(s: string) => string \| void` | `loadingDefault` |
| *1* | `lines`        | *No*     | `number`                        | `1`              |
| *2* | `symbols`      | *No*     | `string[]`                      | `loadingChars`   |

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

### <span id="out_truncate">truncate</span>

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
| *2* | `suffix`       | *No*     | `string` | `colr.dim('…')`                |

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
| *2* | `suffix`       | *No*     | `string` | `colr.dim('…')`                |

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

### ansi

```typescript
ansi;
out.ansi;
```

ANSI escape codes for terminal manipulation

```typescript
process.out.write(ansi.cursor.to(0, 0) + ansi.cursor.hide);
```

  - [**ansi**](#ansi)
    - [**cursor**](#cursor)
      - [to](#to)
      - [move](#move)
      - [up](#out_ansi_cursor_up)
      - [down](#out_ansi_cursor_down)
      - [left](#out_ansi_cursor_left)
      - [right](#out_ansi_cursor_right)
      - [nextLine](#nextline)
      - [prevLine](#prevline)
      - [lineStart](#out_ansi_cursor_linestart)
      - [setShow](#setshow)
      - [show](#show)
      - [hide](#hide)
      - [save](#save)
      - [restore](#restore)
    - [**scroll**](#scroll)
      - [up](#out_ansi_scroll_up)
      - [down](#out_ansi_scroll_down)
    - [**erase**](#erase)
      - [screen](#screen)
      - [up](#out_ansi_erase_up)
      - [down](#out_ansi_erase_down)
      - [line](#line)
      - [lineEnd](#lineend)
      - [lineStart](#out_ansi_erase_linestart)
      - [lines](#lines)
      - [reserve](#reserve)
    - [clear](#out_ansi_clear)
    - [beep](#beep)
    - [null](#null)

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

#### cursor

```typescript
ansi.cursor;
out.ansi.cursor;
```

ANSI escape codes for controlling the cursor in the terminal

<p style="text-align: right" align="right"><a href="#ansi"> [↑ Back to <b>ansi</b> ↑] </a></p>

##### to

```typescript
ansi.cursor.to(x: number, y: number): string
out.ansi.cursor.to(x: number, y: number): string
```

Move the cursor to a specific position

|  #  | Parameter Name | Required | Type     | Default | Description                          |
|:---:|:---------------|:---------|:---------|:--------|:-------------------------------------|
| *0* | `x`            | *No*     | `number` | `0`     | The x position to move the cursor to |
| *1* | `y`            | *No*     | `number` | `0`     | The y position to move the cursor to |

| Return Type |              |
|-------------|--------------|
| `string`    | escape codes |

<p style="text-align: right" align="right"><a href="#ansi"> [↑ Back to <b>ansi</b> ↑] </a></p>

##### move

```typescript
ansi.cursor.move(x: number, y: number): string
out.ansi.cursor.move(x: number, y: number): string
```

Move the cursor a specific amount of spaces

|  #  | Parameter Name | Required | Type     | Default | Description                                                                 |
|:---:|:---------------|:---------|:---------|:--------|:----------------------------------------------------------------------------|
| *0* | `x`            | *No*     | `number` | `0`     | How many spaces to move the cursor horizontally (negative values move left) |
| *1* | `y`            | *No*     | `number` | `0`     | How many spaces to move the cursor vertically (negative values move up)     |

| Return Type |              |
|-------------|--------------|
| `string`    | escape codes |

<p style="text-align: right" align="right"><a href="#ansi"> [↑ Back to <b>ansi</b> ↑] </a></p>

##### <span id="out_ansi_cursor_up">up</span>

```typescript
ansi.cursor.up(count: number): string
out.ansi.cursor.up(count: number): string
```

Move the cursor up a specific amount of spaces

|  #  | Parameter Name | Required | Type     | Default | Description                           |
|:---:|:---------------|:---------|:---------|:--------|:--------------------------------------|
| *0* | `count`        | *No*     | `number` | `1`     | How many spaces to move the cursor up |

| Return Type |              |
|-------------|--------------|
| `string`    | escape codes |

<p style="text-align: right" align="right"><a href="#ansi"> [↑ Back to <b>ansi</b> ↑] </a></p>

##### <span id="out_ansi_cursor_down">down</span>

```typescript
ansi.cursor.down(count: number): string
out.ansi.cursor.down(count: number): string
```

Move the cursor down a specific amount of spaces

|  #  | Parameter Name | Required | Type     | Default | Description                             |
|:---:|:---------------|:---------|:---------|:--------|:----------------------------------------|
| *0* | `count`        | *No*     | `number` | `1`     | How many spaces to move the cursor down |

| Return Type |              |
|-------------|--------------|
| `string`    | escape codes |

<p style="text-align: right" align="right"><a href="#ansi"> [↑ Back to <b>ansi</b> ↑] </a></p>

##### <span id="out_ansi_cursor_left">left</span>

```typescript
ansi.cursor.left(count: number): string
out.ansi.cursor.left(count: number): string
```

Move the cursor left (backward) a specific amount of spaces

|  #  | Parameter Name | Required | Type     | Default | Description                             |
|:---:|:---------------|:---------|:---------|:--------|:----------------------------------------|
| *0* | `count`        | *No*     | `number` | `1`     | How many spaces to move the cursor left |

| Return Type |              |
|-------------|--------------|
| `string`    | escape codes |

<p style="text-align: right" align="right"><a href="#ansi"> [↑ Back to <b>ansi</b> ↑] </a></p>

##### <span id="out_ansi_cursor_right">right</span>

```typescript
ansi.cursor.right(count: number): string
out.ansi.cursor.right(count: number): string
```

Move the cursor right (forward) a specific amount of spaces

|  #  | Parameter Name | Required | Type     | Default | Description                              |
|:---:|:---------------|:---------|:---------|:--------|:-----------------------------------------|
| *0* | `count`        | *No*     | `number` | `1`     | How many spaces to move the cursor right |

| Return Type |              |
|-------------|--------------|
| `string`    | escape codes |

<p style="text-align: right" align="right"><a href="#ansi"> [↑ Back to <b>ansi</b> ↑] </a></p>

##### nextLine

```typescript
ansi.cursor.nextLine(count: number): string
out.ansi.cursor.nextLine(count: number): string
```

Move the cursor to the beginning of the next line

|  #  | Parameter Name | Required | Type     | Default | Description                            |
|:---:|:---------------|:---------|:---------|:--------|:---------------------------------------|
| *0* | `count`        | *No*     | `number` | `1`     | How many lines to move the cursor down |

| Return Type |              |
|-------------|--------------|
| `string`    | escape codes |

<p style="text-align: right" align="right"><a href="#ansi"> [↑ Back to <b>ansi</b> ↑] </a></p>

##### prevLine

```typescript
ansi.cursor.prevLine(count: number): string
out.ansi.cursor.prevLine(count: number): string
```

Move the cursor to the beginning of the previous line

|  #  | Parameter Name | Required | Type     | Default | Description                          |
|:---:|:---------------|:---------|:---------|:--------|:-------------------------------------|
| *0* | `count`        | *No*     | `number` | `1`     | How many lines to move the cursor up |

| Return Type |              |
|-------------|--------------|
| `string`    | escape codes |

<p style="text-align: right" align="right"><a href="#ansi"> [↑ Back to <b>ansi</b> ↑] </a></p>

##### <span id="out_ansi_cursor_linestart">lineStart</span>

```typescript
ansi.cursor.lineStart;
out.ansi.cursor.lineStart;
```

ANSI escape code to move the cursor to the beginning of the current line

<p style="text-align: right" align="right"><a href="#ansi"> [↑ Back to <b>ansi</b> ↑] </a></p>

##### setShow

```typescript
ansi.cursor.setShow(isShow: boolean): string
out.ansi.cursor.setShow(isShow: boolean): string
```

Set whether or not the cursor is shown

|  #  | Parameter Name | Required | Type      | Description                               |
|:---:|:---------------|:---------|:----------|:------------------------------------------|
| *0* | `isShow`       | **Yes**  | `boolean` | Whether or not the cursor should be shown |

| Return Type |             |
|-------------|-------------|
| `string`    | escape code |

<p style="text-align: right" align="right"><a href="#ansi"> [↑ Back to <b>ansi</b> ↑] </a></p>

##### show

```typescript
ansi.cursor.show;
out.ansi.cursor.show;
```

ANSI escape code to show the cursor

<p style="text-align: right" align="right"><a href="#ansi"> [↑ Back to <b>ansi</b> ↑] </a></p>

##### hide

```typescript
ansi.cursor.hide;
out.ansi.cursor.hide;
```

ANSI escape code to hide the cursor

<p style="text-align: right" align="right"><a href="#ansi"> [↑ Back to <b>ansi</b> ↑] </a></p>

##### save

```typescript
ansi.cursor.save;
out.ansi.cursor.save;
```

ANSI escape code to save the current cursor position (can be restored with `cursor.restore`)

<p style="text-align: right" align="right"><a href="#ansi"> [↑ Back to <b>ansi</b> ↑] </a></p>

##### restore

```typescript
ansi.cursor.restore;
out.ansi.cursor.restore;
```

ANSI escape code to restore a previously saved cursor position (saved with `cursor.save`)

<p style="text-align: right" align="right"><a href="#ansi"> [↑ Back to <b>ansi</b> ↑] </a></p>

#### scroll

```typescript
ansi.scroll;
out.ansi.scroll;
```

ANSI escape codes for scrolling the terminal

<p style="text-align: right" align="right"><a href="#ansi"> [↑ Back to <b>ansi</b> ↑] </a></p>

##### <span id="out_ansi_scroll_up">up</span>

```typescript
ansi.scroll.up(count: number): string
out.ansi.scroll.up(count: number): string
```

Scroll the terminal up a specific amount

|  #  | Parameter Name | Required | Type     | Default | Description                           |
|:---:|:---------------|:---------|:---------|:--------|:--------------------------------------|
| *0* | `count`        | *No*     | `number` | `1`     | How much to scroll the terminal up by |

| Return Type |              |
|-------------|--------------|
| `string`    | escape codes |

<p style="text-align: right" align="right"><a href="#ansi"> [↑ Back to <b>ansi</b> ↑] </a></p>

##### <span id="out_ansi_scroll_down">down</span>

```typescript
ansi.scroll.down(count: number): string
out.ansi.scroll.down(count: number): string
```

Scroll the terminal down a specific amount

|  #  | Parameter Name | Required | Type     | Default | Description                             |
|:---:|:---------------|:---------|:---------|:--------|:----------------------------------------|
| *0* | `count`        | *No*     | `number` | `1`     | How much to scroll the terminal down by |

| Return Type |              |
|-------------|--------------|
| `string`    | escape codes |

<p style="text-align: right" align="right"><a href="#ansi"> [↑ Back to <b>ansi</b> ↑] </a></p>

#### erase

```typescript
ansi.erase;
out.ansi.erase;
```

ANSI escape codes for erasing parts of the terminal

<p style="text-align: right" align="right"><a href="#ansi"> [↑ Back to <b>ansi</b> ↑] </a></p>

##### screen

```typescript
ansi.erase.screen;
out.ansi.erase.screen;
```

ANSI escape code to erase the entire terminal screen

<p style="text-align: right" align="right"><a href="#ansi"> [↑ Back to <b>ansi</b> ↑] </a></p>

##### <span id="out_ansi_erase_up">up</span>

```typescript
ansi.erase.up(count: number): string
out.ansi.erase.up(count: number): string
```

Erase the terminal above the cursor

|  #  | Parameter Name | Required | Type     | Default | Description             |
|:---:|:---------------|:---------|:---------|:--------|:------------------------|
| *0* | `count`        | *No*     | `number` | `1`     | How many lines to erase |

| Return Type |              |
|-------------|--------------|
| `string`    | escape codes |

<p style="text-align: right" align="right"><a href="#ansi"> [↑ Back to <b>ansi</b> ↑] </a></p>

##### <span id="out_ansi_erase_down">down</span>

```typescript
ansi.erase.down(count: number): string
out.ansi.erase.down(count: number): string
```

Erase the terminal below the cursor

|  #  | Parameter Name | Required | Type     | Default | Description             |
|:---:|:---------------|:---------|:---------|:--------|:------------------------|
| *0* | `count`        | *No*     | `number` | `1`     | How many lines to erase |

| Return Type |              |
|-------------|--------------|
| `string`    | escape codes |

<p style="text-align: right" align="right"><a href="#ansi"> [↑ Back to <b>ansi</b> ↑] </a></p>

##### line

```typescript
ansi.erase.line;
out.ansi.erase.line;
```

ANSI escape code to erase the current line

<p style="text-align: right" align="right"><a href="#ansi"> [↑ Back to <b>ansi</b> ↑] </a></p>

##### lineEnd

```typescript
ansi.erase.lineEnd;
out.ansi.erase.lineEnd;
```

ANSI escape code to erase the current line from the cursor to the end

<p style="text-align: right" align="right"><a href="#ansi"> [↑ Back to <b>ansi</b> ↑] </a></p>

##### <span id="out_ansi_erase_linestart">lineStart</span>

```typescript
ansi.erase.lineStart;
out.ansi.erase.lineStart;
```

ANSI escape code to erase the current line from the cursor to the start

<p style="text-align: right" align="right"><a href="#ansi"> [↑ Back to <b>ansi</b> ↑] </a></p>

##### lines

```typescript
ansi.erase.lines(count: number): string
out.ansi.erase.lines(count: number): string
```

Erase a specific number of lines upwards from the cursor

|  #  | Parameter Name | Required | Type     | Default | Description             |
|:---:|:---------------|:---------|:---------|:--------|:------------------------|
| *0* | `count`        | *No*     | `number` | `1`     | How many lines to erase |

| Return Type |              |
|-------------|--------------|
| `string`    | escape codes |

<p style="text-align: right" align="right"><a href="#ansi"> [↑ Back to <b>ansi</b> ↑] </a></p>

##### reserve

```typescript
ansi.erase.reserve(count: number): string
out.ansi.erase.reserve(count: number): string
```

Make sure the next couple of lines are blank and on the screen

> __Note:__ Erases the current line and returns to it afterwards

|  #  | Parameter Name | Required | Type     | Default | Description               |
|:---:|:---------------|:---------|:---------|:--------|:--------------------------|
| *0* | `count`        | *No*     | `number` | `1`     | How many lines to reserve |

| Return Type |              |
|-------------|--------------|
| `string`    | escape codes |

<p style="text-align: right" align="right"><a href="#ansi"> [↑ Back to <b>ansi</b> ↑] </a></p>

#### <span id="out_ansi_clear">clear</span>

```typescript
ansi.clear;
out.ansi.clear;
```

ANSI escape code to clear the terminal screen

<p style="text-align: right" align="right"><a href="#ansi"> [↑ Back to <b>ansi</b> ↑] </a></p>

#### beep

```typescript
ansi.beep;
out.ansi.beep;
```

ANSI escape code to make the terminal beep

<p style="text-align: right" align="right"><a href="#ansi"> [↑ Back to <b>ansi</b> ↑] </a></p>

#### null

```typescript
ansi.null;
out.ansi.null;
```

ANSI escape code for the NULL character. Can be used as a hidden marker.

<p style="text-align: right" align="right"><a href="#ansi"> [↑ Back to <b>ansi</b> ↑] </a></p>

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
out.getLineCounter(): LineCounter
getLineCounter(): LineCounter
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

##### lc.overwrite
Similar to lc.log, but designed for overwriting lines that have already been printed on the screen

Use in combination with ansi.cursor.up to move the cursor up and replace/overwrite lines.

Adds a ansi.erase.lineEnd before each new line so that the line is cleared apart from what you're overwriting it with.

```typescript
const lc = getLineCounter();
lc.overwrite('hello'); // 1
```

|  #   | Parameter Name | Required | Type    | Description                |
|:----:|:---------------|:---------|:--------|:---------------------------|
| *0…* | `args`         | **Yes**  | `any[]` | The arguments to overwrite |

| Return Type |                       |
|-------------|-----------------------|
| `number`    | number of lines added |

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

##### lc.moveCursor
Move the cursor without clearing/erasing lines.

Updates the line count in the process.

|  #  | Parameter Name | Required | Type     | Description                                                          |
|:---:|:---------------|:---------|:---------|:---------------------------------------------------------------------|
| *0* | `y`            | **Yes**  | `number` | How many lines to move the cursor (down if positive, up if negative) |

| Return Type |
|-------------|
| `void`      |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

##### lc.moveHome
Move the cursor to the start of the line count without clearing/erasing lines.

Same as `lc.clear`, but without clearing the lines.

Updates the line count in the process.

| Return Type |
|-------------|
| `void`      |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

##### lc.moveToCheckpoint
Move the cursor to a previously recorded checkpoint

Same as `lc.clearToCheckpoint`, but without clearing the lines.

Updates the line count in the process.

|  #  | Parameter Name | Required | Type     | Description               |
|:---:|:---------------|:---------|:---------|:--------------------------|
| *0* | `checkpointID` | **Yes**  | `string` | The checkpoint to move to |

| Return Type |
|-------------|
| `void`      |

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

##### lc.clearDown
Moves the cursor down by a given number of lines

Can be negative to move up (clearing lines)

> **NOTE:** This adds new lines

|  #  | Parameter Name | Required | Type     | Description                 |
|:---:|:---------------|:---------|:---------|:----------------------------|
| *0* | `lines`        | **Yes**  | `number` | The number of lines to move |

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

##### lc.ansi
Get ansi codes for clear/erase functions, and update the line counter in the process.

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

###### lc.ansi.moveCursor
Move the cursor without clearing/erasing lines.

Updates the line count in the process.

> **WARNING:** lc.ansi functions update the line count, but don't apply the affect themselves. You must print the returned string to apply the affect.

|  #  | Parameter Name | Required | Type     | Description                                                          |
|:---:|:---------------|:---------|:---------|:---------------------------------------------------------------------|
| *0* | `y`            | **Yes**  | `number` | How many lines to move the cursor (down if positive, up if negative) |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

###### lc.ansi.moveHome
Move the cursor to the start of the line count without clearing/erasing lines.

Same as `lc.clear`, but without clearing the lines.

Updates the line count in the process.

> **WARNING:** lc.ansi functions update the line count, but don't apply the affect themselves. You must print the returned string to apply the affect.

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

###### lc.ansi.moveToCheckpoint
Move the cursor to a previously recorded checkpoint

Same as `lc.clearToCheckpoint`, but without clearing the lines.

Updates the line count in the process.

> **WARNING:** lc.ansi functions update the line count, but don't apply the affect themselves. You must print the returned string to apply the affect.

|  #  | Parameter Name | Required | Type     | Description               |
|:---:|:---------------|:---------|:---------|:--------------------------|
| *0* | `checkpointID` | **Yes**  | `string` | The checkpoint to move to |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

###### lc.ansi.clear
Clears the line counter, and moves the cursor up by the value of the line counter

> **WARNING:** lc.ansi functions update the line count, but don't apply the affect themselves. You must print the returned string to apply the affect.

```typescript
const lc = getLineCounter();
lc.log('hello'); // 1
process.stdout.write(lc.ansi.clear());
```

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

###### lc.ansi.clearBack
Clears a given number of lines, and updates the line counter

> **WARNING:** lc.ansi functions update the line count, but don't apply the affect themselves. You must print the returned string to apply the affect.

```typescript
const lc = getLineCounter();
lc.log('line 1'); // 1
lc.log('line 2'); // 1
lc.log('line 3'); // 1
lc.log('line 4'); // 1
process.stdout.write(lc.ansi.clearBack(2)); // ('line 3' and 'line 4' are cleared)
```

|  #  | Parameter Name         | Required | Type      | Description                                                                   |
|:---:|:-----------------------|:---------|:----------|:------------------------------------------------------------------------------|
| *0* | `linesToMoveBack`      | **Yes**  | `number`  | The number of lines to clear                                                  |
| *1* | `limitToRecordedLines` | *No*     | `boolean` | Whether to limit the number of lines to clear to the number of lines recorded |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

###### lc.ansi.clearDown
Moves the cursor down by a given number of lines

Can be negative to move up (clearing lines)

> **NOTE:** This adds new lines

> **WARNING:** lc.ansi functions update the line count, but don't apply the affect themselves. You must print the returned string to apply the affect.

|  #  | Parameter Name | Required | Type     | Description                 |
|:---:|:---------------|:---------|:---------|:----------------------------|
| *0* | `lines`        | **Yes**  | `number` | The number of lines to move |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

###### lc.ansi.clearToCheckpoint
Clear lines up to a previously recorded checkpoint

> **WARNING:** lc.ansi functions update the line count, but don't apply the affect themselves. You must print the returned string to apply the affect.

```typescript
const lc = getLineCounter();
lc.log('line 1'); // 1
lc.log('line 2'); // 1
lc.checkpoint('test');
lc.log('line 3'); // 1
lc.log('line 4'); // 1
process.stdout.write(lc.ansi.clearToCheckpoint('test')); // ('line 3' and 'line 4' are cleared)
```

|  #  | Parameter Name | Required | Type     | Description                |
|:---:|:---------------|:---------|:---------|:---------------------------|
| *0* | `checkpointID` | **Yes**  | `string` | The checkpoint to clear to |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

###### lc.ansi.save
Saves the current cursor position and also tracks the line count

> **WARNING:** lc.ansi functions update the line count, but don't apply the affect themselves. You must print the returned string to apply the affect.

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

###### lc.ansi.restore
Restores to the previously saved cursor position and also tracks the line count

> **WARNING:** lc.ansi functions update the line count, but don't apply the affect themselves. You must print the returned string to apply the affect.

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

### <span id="out_utils">utils</span>

#### getTerminalWidth

```typescript
out.utils.getTerminalWidth(): number
```

Get maximum terminal width (columns)

```typescript
print.utils.getTerminalWidth(); // 127
```

| Return Type |
|-------------|
| `number`    |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

#### <span id="out_utils_getlines">getLines</span>

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

Determine whether a given string contains any colr-ed colours

```typescript
out.utils.hasColor('this is line 1') // false
out.utils.hasColor(colr.red('this is line 1')) // true
```

|  #  | Parameter Name | Required | Type     |
|:---:|:---------------|:---------|:---------|
| *0* | `str`          | **Yes**  | `string` |

| Return Type |
|-------------|
| `boolean`   |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

#### stripAnsi

```typescript
out.utils.stripAnsi(text: string): string
```

Removes all ANSI escape codes from a string. This includes any colour or styling added by colr or libraries like chalk.

|  #  | Parameter Name | Required | Type     |
|:---:|:---------------|:---------|:---------|
| *0* | `text`         | **Yes**  | `string` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

#### getEmojiRegex

```typescript
out.utils.getEmojiRegex(flags: string): RegExp
```

A rough way to regex emojis

Note: Certain symbols removed to minimise false positives

|  #  | Parameter Name | Required | Type     | Default |
|:---:|:---------------|:---------|:---------|:--------|
| *0* | `flags`        | *No*     | `string` | `'g'`   |

| Return Type |
|-------------|
| `RegExp`    |

<p style="text-align: right" align="right"><a href="#out"> [↑ Back to <b>out</b> ↑] </a></p>

## colr

```typescript
colr;
```

Tool for creating coloured/styled strings

Chain/combine different combinations of colours and styles to get the appearance you want.

| Name      | Type       | Modifier |                    | Description                                  |
|-----------|------------|----------|--------------------|----------------------------------------------|
| `light`   | Text       | Light    | `colr.light()`   | Use light text colours (on by default)       |
| `dark`    | Text       | Dark     | `colr.dark()`    | Use dark text colours                        |
| `lightBg` | Background | Light    | `colr.lightBg()` | Use light background colours (on by default) |
| `darkBg`  | Background | Dark     | `colr.darkBg()`  | Use dark background colours                  |

| Name             | Affects    | Colour     | Type                    | Recommended                | Alt                     |
|------------------|------------|------------|-------------------------|----------------------------|-------------------------|
| `red`            | Text       | 🟥 Red     | __Base__&nbsp;_(Light)_ | `colr.red()`               |                         |
| `darkRed`        | Text       | 🟥 Red     | Dark                    | `colr.dark.red()`          | `colr.darkRed()`        |
| `lightRed`       | Text       | 🟥 Red     | Light                   | `colr.light.red()`         | `colr.lightRed()`       |
| `green`          | Text       | 🟩 Green   | __Base__&nbsp;_(Light)_ | `colr.green()`             |                         |
| `darkGreen`      | Text       | 🟩 Green   | Dark                    | `colr.dark.green()`        | `colr.darkGreen()`      |
| `lightGreen`     | Text       | 🟩 Green   | Light                   | `colr.light.green()`       | `colr.lightGreen()`     |
| `yellow`         | Text       | 🟨 Yellow  | __Base__&nbsp;_(Light)_ | `colr.yellow()`            |                         |
| `darkYellow`     | Text       | 🟨 Yellow  | Dark                    | `colr.dark.yellow()`       | `colr.darkYellow()`     |
| `lightYellow`    | Text       | 🟨 Yellow  | Light                   | `colr.light.yellow()`      | `colr.lightYellow()`    |
| `blue`           | Text       | 🟦 Blue    | __Base__&nbsp;_(Light)_ | `colr.blue()`              |                         |
| `darkBlue`       | Text       | 🟦 Blue    | Dark                    | `colr.dark.blue()`         | `colr.darkBlue()`       |
| `lightBlue`      | Text       | 🟦 Blue    | Light                   | `colr.light.blue()`        | `colr.lightBlue()`      |
| `magenta`        | Text       | 🟪 Magenta | __Base__&nbsp;_(Light)_ | `colr.magenta()`           |                         |
| `darkMagenta`    | Text       | 🟪 Magenta | Dark                    | `colr.dark.magenta()`      | `colr.darkMagenta()`    |
| `lightMagenta`   | Text       | 🟪 Magenta | Light                   | `colr.light.magenta()`     | `colr.lightMagenta()`   |
| `cyan`           | Text       | 💠 Cyan    | __Base__&nbsp;_(Light)_ | `colr.cyan()`              |                         |
| `darkCyan`       | Text       | 💠 Cyan    | Dark                    | `colr.dark.cyan()`         | `colr.darkCyan()`       |
| `lightCyan`      | Text       | 💠 Cyan    | Light                   | `colr.light.cyan()`        | `colr.lightCyan()`      |
| `white`          | Text       | ⬜ White   | __Base__&nbsp;_(Light)_ | `colr.white()`             |                         |
| `darkWhite`      | Text       | ⬜ White   | Dark                    | `colr.dark.white()`        | `colr.darkWhite()`      |
| `lightWhite`     | Text       | ⬜ White   | Light                   | `colr.light.white()`       | `colr.lightWhite()`     |
| `redBg`          | Background | 🟥 Red     | __Base__&nbsp;_(Light)_ | `colr.redBg()`             |                         |
| `darkRedBg`      | Background | 🟥 Red     | Dark                    | `colr.darkBg.redBg()`      | `colr.darkRedBg()`      |
| `lightRedBg`     | Background | 🟥 Red     | Light                   | `colr.lightBg.redBg()`     | `colr.lightRedBg()`     |
| `greenBg`        | Background | 🟩 Green   | __Base__&nbsp;_(Light)_ | `colr.greenBg()`           |                         |
| `darkGreenBg`    | Background | 🟩 Green   | Dark                    | `colr.darkBg.greenBg()`    | `colr.darkGreenBg()`    |
| `lightGreenBg`   | Background | 🟩 Green   | Light                   | `colr.lightBg.greenBg()`   | `colr.lightGreenBg()`   |
| `yellowBg`       | Background | 🟨 Yellow  | __Base__&nbsp;_(Light)_ | `colr.yellowBg()`          |                         |
| `darkYellowBg`   | Background | 🟨 Yellow  | Dark                    | `colr.darkBg.yellowBg()`   | `colr.darkYellowBg()`   |
| `lightYellowBg`  | Background | 🟨 Yellow  | Light                   | `colr.lightBg.yellowBg()`  | `colr.lightYellowBg()`  |
| `blueBg`         | Background | 🟦 Blue    | __Base__&nbsp;_(Light)_ | `colr.blueBg()`            |                         |
| `darkBlueBg`     | Background | 🟦 Blue    | Dark                    | `colr.darkBg.blueBg()`     | `colr.darkBlueBg()`     |
| `lightBlueBg`    | Background | 🟦 Blue    | Light                   | `colr.lightBg.blueBg()`    | `colr.lightBlueBg()`    |
| `magentaBg`      | Background | 🟪 Magenta | __Base__&nbsp;_(Light)_ | `colr.magentaBg()`         |                         |
| `darkMagentaBg`  | Background | 🟪 Magenta | Dark                    | `colr.darkBg.magentaBg()`  | `colr.darkMagentaBg()`  |
| `lightMagentaBg` | Background | 🟪 Magenta | Light                   | `colr.lightBg.magentaBg()` | `colr.lightMagentaBg()` |
| `cyanBg`         | Background | 💠 Cyan    | __Base__&nbsp;_(Light)_ | `colr.cyanBg()`            |                         |
| `darkCyanBg`     | Background | 💠 Cyan    | Dark                    | `colr.darkBg.cyanBg()`     | `colr.darkCyanBg()`     |
| `lightCyanBg`    | Background | 💠 Cyan    | Light                   | `colr.lightBg.cyanBg()`    | `colr.lightCyanBg()`    |
| `whiteBg`        | Background | ⬜ White   | __Base__&nbsp;_(Light)_ | `colr.whiteBg()`           |                         |
| `darkWhiteBg`    | Background | ⬜ White   | Dark                    | `colr.darkBg.whiteBg()`    | `colr.darkWhiteBg()`    |
| `lightWhiteBg`   | Background | ⬜ White   | Light                   | `colr.lightBg.whiteBg()`   | `colr.lightWhiteBg()`   |
| `black`          | Text       | ⬛ Black   | __Always Dark__         | `colr.black()`             |                         |
| `darkBlack`      | Text       | ⬛ Black   | Dark                    | `colr.black()`             | `colr.darkBlack()`      |
| `lightBlack`     | Text       | ⬛ Black   | Light                   | `colr.light.black()`       | `colr.lightBlack()`     |
| `blackBg`        | Background | ⬛ Black   | __Always Dark__         | `colr.blackBg()`           |                         |
| `darkBlackBg`    | Background | ⬛ Black   | Dark                    | `colr.blackBg()`           | `colr.darkBlackBg()`    |
| `lightBlackBg`   | Background | ⬛ Black   | Light                   | `colr.lightBg.blackBg()`   | `colr.lightBlackBg()`   |
| `grey`           | Text       | 🩶 Grey    | Greys                   | `colr.grey()`              |                         |
| `greyBg`         | Background | 🩶 Grey    | Greys                   | `colr.greyBg()`            |                         |
| `grey0`          | Text       | ⬛ Black   | Greys                   | `colr.grey0()`             |                         |
| `grey1`          | Text       | 🩶 Grey    | Greys                   | `colr.grey1()`             |                         |
| `grey2`          | Text       | 🩶 Grey    | Greys                   | `colr.grey2()`             |                         |
| `grey3`          | Text       | 🩶 Grey    | Greys                   | `colr.grey3()`             |                         |
| `grey4`          | Text       | 🩶 Grey    | Greys                   | `colr.grey4()`             |                         |
| `grey5`          | Text       | ⬜ White   | Greys                   | `colr.grey5()`             |
| `primary`        | Text       | 🟨 Yellow  | Theme                   | `colr.primary()`           |                         |
| `secondary`      | Text       | 🟪 Magenta | Theme                   | `colr.secondary()`         |                         |
| `success`        | Text       | 🟩 Green   | Theme                   | `colr.success()`           |                         |
| `danger`         | Text       | 🟥 Red     | Theme                   | `colr.danger()`            |                         |
| `warning`        | Text       | 🟨 Yellow  | Theme                   | `colr.warning()`           |                         |
| `info`           | Text       | 🟦 Blue    | Theme                   | `colr.info()`              |                         |
| `primaryBg`      | Background | 🟨 Yellow  | Theme                   | `colr.primaryBg()`         |                         |
| `secondaryBg`    | Background | 🟪 Magenta | Theme                   | `colr.secondaryBg()`       |                         |
| `successBg`      | Background | 🟩 Green   | Theme                   | `colr.successBg()`         |                         |
| `dangerBg`       | Background | 🟥 Red     | Theme                   | `colr.dangerBg()`          |                         |
| `warningBg`      | Background | 🟨 Yellow  | Theme                   | `colr.warningBg()`         |                         |
| `infoBg`         | Background | 🟦 Blue    | Theme                   | `colr.infoBg()`            |                         |

| Name            |                          | Description                                                      |
|-----------------|--------------------------|------------------------------------------------------------------|
| `reset`         | `colr.reset('')`         | This returns the text back to normal colours/styles              |
| `bold`          | `colr.bold('')`          | This makes the text __bold__                                     |
| `dim`           | `colr.dim('')`           | This dims the brightness of the text colour                      |
| `italic`        | `colr.italic('')`        | This makes the text _italic_                                     |
| `overline`      | `colr.overline('')`      | This adds a horizontal line above the text                       |
| `underline`     | `colr.underline('')`     | This adds a horizontal line below the text                       |
| `strikethrough` | `colr.strikethrough('')` | This add a horizontal line through the middle of the given text  |
| `inverse`       | `colr.inverse('')`       | This inverses the text and background colours for the given text |
| `hidden`        | `colr.hidden('')`        | This makes the text invisible.                                   |

```typescript
colr.yellow('Hello World!'); // 'Hello World!' with yellow text
colr.dark.yellow('Hello World!'); // 'Hello World!' with dark yellow text
colr.yellow.dim('Hello World!'); // 'Hello World!' with dimmed yellow text
colr.dark.yellow.dim('Hello World!'); // 'Hello World!' with dimmed dark yellow text

colr.yellow.blueBg('Hello World!'); // 'Hello World!' with yellow text and blue background
colr.yellow.darkBg.blueBg('Hello World!'); // 'Hello World!' with yellow text and dark blue background

// pass in multiple arguments to get them all coloured/styled
colr.red('Hello', 'World!'); // 'Hello World!' with red text

// nested styles
colr.red(`A ${colr.blue('blue')} world`); // 'A blue world' with with red text, except 'blue' which is blue

// template literals
colr.red.$`A ${'red'} world`; // 'A red world' with default colours, except 'World!' which is red

// Debugging
colr.debug(colr.yellow.blueBg(`A ${colr.red('red')} world`)); // '(YLW>){blu>}A (RED>)red(<)(YLW>) world{<}(<)'
```

  - [**colr**](#colr)
    - [**Option Modifiers**](#option-modifiers)
      - [light](#light)
      - [dark](#dark)
      - [lightBg](#lightbg)
      - [darkBg](#darkbg)
    - [**Text Colours**](#text-colours)
      - [**red**](#colr_red)
        - [darkRed](#darkred)
        - [lightRed](#lightred)
      - [**green**](#colr_green)
        - [darkGreen](#darkgreen)
        - [lightGreen](#lightgreen)
      - [**yellow**](#colr_yellow)
        - [darkYellow](#darkyellow)
        - [lightYellow](#lightyellow)
      - [**blue**](#colr_blue)
        - [darkBlue](#darkblue)
        - [lightBlue](#lightblue)
      - [**magenta**](#colr_magenta)
        - [darkMagenta](#darkmagenta)
        - [lightMagenta](#lightmagenta)
      - [**cyan**](#colr_cyan)
        - [darkCyan](#darkcyan)
        - [lightCyan](#lightcyan)
      - [**white**](#colr_white)
        - [darkWhite](#darkwhite)
        - [lightWhite](#lightwhite)
    - [**Background Colours**](#background-colours)
      - [**redBg**](#redbg)
        - [darkRedBg](#darkredbg)
        - [lightRedBg](#lightredbg)
      - [**greenBg**](#greenbg)
        - [darkGreenBg](#darkgreenbg)
        - [lightGreenBg](#lightgreenbg)
      - [**yellowBg**](#yellowbg)
        - [darkYellowBg](#darkyellowbg)
        - [lightYellowBg](#lightyellowbg)
      - [**blueBg**](#bluebg)
        - [darkBlueBg](#darkbluebg)
        - [lightBlueBg](#lightbluebg)
      - [**magentaBg**](#magentabg)
        - [darkMagentaBg](#darkmagentabg)
        - [lightMagentaBg](#lightmagentabg)
      - [**cyanBg**](#cyanbg)
        - [darkCyanBg](#darkcyanbg)
        - [lightCyanBg](#lightcyanbg)
      - [**whiteBg**](#whitebg)
        - [darkWhiteBg](#darkwhitebg)
        - [lightWhiteBg](#lightwhitebg)
    - [**Black Colours**](#black-colours)
      - [**black**](#colr_black)
        - [darkBlack](#darkblack)
        - [lightBlack](#colr_lightblack)
      - [**blackBg**](#blackbg)
        - [darkBlackBg](#darkblackbg)
        - [lightBlackBg](#lightblackbg)
    - [**Grey / Gray Colours**](#grey--gray-colours)
      - [grey / gray](#grey--gray)
      - [greyBg / grayBg](#greybg--graybg)
      - [grey0 / gray0](#grey0--gray0)
      - [grey1 / gray1](#grey1--gray1)
      - [grey2 / gray2](#grey2--gray2)
      - [grey3 / gray3](#grey3--gray3)
      - [grey4 / gray4](#grey4--gray4)
      - [grey5 / gray5](#grey5--gray5)
    - [**Theme Colours**](#theme-colours)
      - [primary](#colr_primary)
      - [secondary](#colr_secondary)
      - [success](#colr_success)
      - [danger](#colr_danger)
      - [warning](#colr_warning)
      - [info](#colr_info)
      - [primaryBg](#primarybg)
      - [secondaryBg](#secondarybg)
      - [successBg](#successbg)
      - [dangerBg](#dangerbg)
      - [warningBg](#warningbg)
      - [infoBg](#infobg)
    - [**Other Styles**](#other-styles)
      - [reset](#reset)
      - [bold](#bold)
      - [dim](#dim)
      - [italic](#italic)
      - [overline](#overline)
      - [underline](#underline)
      - [strikethrough](#strikethrough)
      - [inverse](#inverse)
      - [hidden](#hidden)
    - [**Helper Functions**](#helper-functions)
      - [$ / template](#--template)
      - [clear](#colr_clear)
      - [debug](#debug)
    - [**sets**](#sets)
      - [red](#colr_sets_red)
      - [green](#colr_sets_green)
      - [yellow](#colr_sets_yellow)
      - [blue](#colr_sets_blue)
      - [magenta](#colr_sets_magenta)
      - [cyan](#colr_sets_cyan)
      - [white](#colr_sets_white)
      - [black](#colr_sets_black)
      - [lightBlack](#colr_sets_lightblack)
      - [grey](#grey)
      - [gray](#gray)
      - [primary](#colr_sets_primary)
      - [secondary](#colr_sets_secondary)
      - [success](#colr_sets_success)
      - [danger](#colr_sets_danger)
      - [warning](#colr_sets_warning)
      - [info](#colr_sets_info)
    - [WrapFn](#wrapfn)
    - [ColrFn](#colrfn)
    - [WrapSet](#wrapset)
    - [ColrSet](#colrset)

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### Option Modifiers

#### light

```typescript
colr.light(...text: string[]): string
```

Modifies base (`red`, `blue`, `green`, etc) text colours to use the __light__ version of the colour.

`light` is __on__ by default.

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

```typescript
colr.light.red('Hello World!'); // 'Hello World!' with light red text
colr.red.light('Hello World!'); // 'Hello World!' with light red text
```

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### dark

```typescript
colr.dark(...text: string[]): string
```

Modifies base (`red`, `blue`, `green`, etc) text colours to use the __dark__ version of the colour.

`dark` is __off__ by default (defaults to `light`).

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

```typescript
colr.dark.red('Hello World!'); // 'Hello World!' with dark red text
colr.red.dark('Hello World!'); // 'Hello World!' with dark red text
```

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### lightBg

```typescript
colr.lightBg(...text: string[]): string
```

Modifies base (`redBg`, `blueBg`, `greenBg`, etc) background colours to use the __light__ version of the colour.

`lightBg` is __on__ by default.

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

```typescript
colr.lightBg.redBg('Hello World!'); // 'Hello World!' with a light red background
colr.redBg.lightBg('Hello World!'); // 'Hello World!' with a light red background
```

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### darkBg

```typescript
colr.darkBg(...text: string[]): string
```

Modifies base (`redBg`, `blueBg`, `greenBg`, etc) background colours to use the __dark__ version of the colour.

`darkBg` is __off__ by default (defaults to `lightBg`).

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

```typescript
colr.darkBg.redBg('Hello World!'); // 'Hello World!' with a dark red background
colr.redBg.darkBg('Hello World!'); // 'Hello World!' with a dark red background
```

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

### Text Colours

#### <span id="colr_red">red</span>

```typescript
colr.red(...text: string[]): string
```

Makes the given text __red__.

Uses `lightRed` _by default_, or if `light` modifier is used in the chain.
Uses `darkRed` if `dark` modifier is used in the chain.

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

```typescript
colr.red('Hello World!'); // 'Hello World!' with __light__ red text
colr.light.red('Hello World!'); // 'Hello World!' with __light__ red text
colr.dark.red('Hello World!'); // 'Hello World!' with __dark__ red text
```

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

##### darkRed

```typescript
colr.darkRed(...text: string[]): string
colr.dark.red(...text: string[]): string
```

Makes the given text __dark red__.

Unaffected by `light`/`dark` modifiers and __will always be dark__.

Prefer `dark.red`

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

##### lightRed

```typescript
colr.lightRed(...text: string[]): string
colr.light.red(...text: string[]): string
colr.red(...text: string[]): string
```

Makes the given text __light red__.

Unaffected by `light`/`dark` modifiers and __will always be light__.

Prefer `light.red`

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### <span id="colr_green">green</span>

```typescript
colr.green(...text: string[]): string
```

Makes the given text __green__.

Uses `lightGreen` _by default_, or if `light` modifier is used in the chain.
Uses `darkGreen` if `dark` modifier is used in the chain.

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

```typescript
colr.green('Hello World!'); // 'Hello World!' with __light__ green text
colr.light.green('Hello World!'); // 'Hello World!' with __light__ green text
colr.dark.green('Hello World!'); // 'Hello World!' with __dark__ green text
```

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

##### darkGreen

```typescript
colr.darkGreen(...text: string[]): string
colr.dark.green(...text: string[]): string
```

Makes the given text __dark green__.

Unaffected by `light`/`dark` modifiers and __will always be dark__.

Prefer `dark.green`

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

##### lightGreen

```typescript
colr.lightGreen(...text: string[]): string
colr.light.green(...text: string[]): string
colr.green(...text: string[]): string
```

Makes the given text __light green__.

Unaffected by `light`/`dark` modifiers and __will always be light__.

Prefer `light.green`

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### <span id="colr_yellow">yellow</span>

```typescript
colr.yellow(...text: string[]): string
```

Makes the given text __yellow__.

Uses `lightYellow` _by default_, or if `light` modifier is used in the chain.
Uses `darkYellow` if `dark` modifier is used in the chain.

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

```typescript
colr.yellow('Hello World!'); // 'Hello World!' with __light__ yellow text
colr.light.yellow('Hello World!'); // 'Hello World!' with __light__ yellow text
colr.dark.yellow('Hello World!'); // 'Hello World!' with __dark__ yellow text
```

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

##### darkYellow

```typescript
colr.darkYellow(...text: string[]): string
colr.dark.yellow(...text: string[]): string
```

Makes the given text __dark yellow__.

Unaffected by `light`/`dark` modifiers and __will always be dark__.

Prefer `dark.yellow`

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

##### lightYellow

```typescript
colr.lightYellow(...text: string[]): string
colr.light.yellow(...text: string[]): string
colr.yellow(...text: string[]): string
```

Makes the given text __light yellow__.

Unaffected by `light`/`dark` modifiers and __will always be light__.

Prefer `light.yellow`

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### <span id="colr_blue">blue</span>

```typescript
colr.blue(...text: string[]): string
```

Makes the given text __blue__.

Uses `lightBlue` _by default_, or if `light` modifier is used in the chain.
Uses `darkBlue` if `dark` modifier is used in the chain.

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

```typescript
colr.blue('Hello World!'); // 'Hello World!' with __light__ blue text
colr.light.blue('Hello World!'); // 'Hello World!' with __light__ blue text
colr.dark.blue('Hello World!'); // 'Hello World!' with __dark__ blue text
```

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

##### darkBlue

```typescript
colr.darkBlue(...text: string[]): string
colr.dark.blue(...text: string[]): string
```

Makes the given text __dark blue__.

Unaffected by `light`/`dark` modifiers and __will always be dark__.

Prefer `dark.blue`

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

##### lightBlue

```typescript
colr.lightBlue(...text: string[]): string
colr.light.blue(...text: string[]): string
colr.blue(...text: string[]): string
```

Makes the given text __light blue__.

Unaffected by `light`/`dark` modifiers and __will always be light__.

Prefer `light.blue`

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### <span id="colr_magenta">magenta</span>

```typescript
colr.magenta(...text: string[]): string
```

Makes the given text __magenta__.

Uses `lightMagenta` _by default_, or if `light` modifier is used in the chain.
Uses `darkMagenta` if `dark` modifier is used in the chain.

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

```typescript
colr.magenta('Hello World!'); // 'Hello World!' with __light__ magenta text
colr.light.magenta('Hello World!'); // 'Hello World!' with __light__ magenta text
colr.dark.magenta('Hello World!'); // 'Hello World!' with __dark__ magenta text
```

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

##### darkMagenta

```typescript
colr.darkMagenta(...text: string[]): string
colr.dark.magenta(...text: string[]): string
```

Makes the given text __dark magenta__.

Unaffected by `light`/`dark` modifiers and __will always be dark__.

Prefer `dark.magenta`

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

##### lightMagenta

```typescript
colr.lightMagenta(...text: string[]): string
colr.light.magenta(...text: string[]): string
colr.magenta(...text: string[]): string
```

Makes the given text __light magenta__.

Unaffected by `light`/`dark` modifiers and __will always be light__.

Prefer `light.magenta`

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### <span id="colr_cyan">cyan</span>

```typescript
colr.cyan(...text: string[]): string
```

Makes the given text __cyan__.

Uses `lightCyan` _by default_, or if `light` modifier is used in the chain.
Uses `darkCyan` if `dark` modifier is used in the chain.

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

```typescript
colr.cyan('Hello World!'); // 'Hello World!' with __light__ cyan text
colr.light.cyan('Hello World!'); // 'Hello World!' with __light__ cyan text
colr.dark.cyan('Hello World!'); // 'Hello World!' with __dark__ cyan text
```

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

##### darkCyan

```typescript
colr.darkCyan(...text: string[]): string
colr.dark.cyan(...text: string[]): string
```

Makes the given text __dark cyan__.

Unaffected by `light`/`dark` modifiers and __will always be dark__.

Prefer `dark.cyan`

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

##### lightCyan

```typescript
colr.lightCyan(...text: string[]): string
colr.light.cyan(...text: string[]): string
colr.cyan(...text: string[]): string
```

Makes the given text __light cyan__.

Unaffected by `light`/`dark` modifiers and __will always be light__.

Prefer `light.cyan`

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### <span id="colr_white">white</span>

```typescript
colr.white(...text: string[]): string
```

Makes the given text __white__.

Uses `lightWhite` _by default_, or if `light` modifier is used in the chain.
Uses `darkWhite` if `dark` modifier is used in the chain.

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

```typescript
colr.white('Hello World!'); // 'Hello World!' with __light__ white text
colr.light.white('Hello World!'); // 'Hello World!' with __light__ white text
colr.dark.white('Hello World!'); // 'Hello World!' with __dark__ white text
```

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

##### darkWhite

```typescript
colr.darkWhite(...text: string[]): string
colr.dark.white(...text: string[]): string
```

Makes the given text __dark white__.

Unaffected by `light`/`dark` modifiers and __will always be dark__.

Prefer `dark.white`

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

##### lightWhite

```typescript
colr.lightWhite(...text: string[]): string
colr.light.white(...text: string[]): string
colr.white(...text: string[]): string
```

Makes the given text __light white__.

Unaffected by `light`/`dark` modifiers and __will always be light__.

Prefer `light.white`

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

### Background Colours

#### redBg

```typescript
colr.redBg(...text: string[]): string
```

Makes the __background__ of the given text __red__.

Uses `lightRedBg` _by default_, or if `lightBg` modifier is used in the chain.
Uses `darkRedBg` if `darkBg` modifier is used in the chain.

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

```typescript
colr.redBg('Hello World!'); // 'Hello World!' with a __light__ red background
colr.lightBg.redBg('Hello World!'); // 'Hello World!' with a __light__ red background
colr.darkBg.redBg('Hello World!'); // 'Hello World!' with a __dark__ red background
```

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

##### darkRedBg

```typescript
colr.darkRedBg(...text: string[]): string
colr.darkBg.redBg(...text: string[]): string
colr.redBg(...text: string[]): string
```

Makes the __background__ of the given text __dark red__.

Unaffected by `lightBg`/`darkBg` modifiers and __will always be dark__.

Prefer `darkBg.redBg`

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

##### lightRedBg

```typescript
colr.lightBg.redBg(...text: string[]): string
colr.lightRedBg(...text: string[]): string
```

Makes the __background__ of the given text __light red__.

Unaffected by `lightBg`/`darkBg` modifiers and __will always be light__.

Prefer `lightBg.redBg`

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### greenBg

```typescript
colr.greenBg(...text: string[]): string
```

Makes the __background__ of the given text __green__.

Uses `lightGreenBg` _by default_, or if `lightBg` modifier is used in the chain.
Uses `darkGreenBg` if `darkBg` modifier is used in the chain.

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

```typescript
colr.greenBg('Hello World!'); // 'Hello World!' with a __light__ green background
colr.lightBg.greenBg('Hello World!'); // 'Hello World!' with a __light__ green background
colr.darkBg.greenBg('Hello World!'); // 'Hello World!' with a __dark__ green background
```

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

##### darkGreenBg

```typescript
colr.darkGreenBg(...text: string[]): string
colr.darkBg.greenBg(...text: string[]): string
colr.greenBg(...text: string[]): string
```

Makes the __background__ of the given text __dark green__.

Unaffected by `lightBg`/`darkBg` modifiers and __will always be dark__.

Prefer `darkBg.greenBg`

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

##### lightGreenBg

```typescript
colr.lightBg.greenBg(...text: string[]): string
colr.lightGreenBg(...text: string[]): string
```

Makes the __background__ of the given text __light green__.

Unaffected by `lightBg`/`darkBg` modifiers and __will always be light__.

Prefer `lightBg.greenBg`

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### yellowBg

```typescript
colr.yellowBg(...text: string[]): string
```

Makes the __background__ of the given text __yellow__.

Uses `lightYellowBg` _by default_, or if `lightBg` modifier is used in the chain.
Uses `darkYellowBg` if `darkBg` modifier is used in the chain.

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

```typescript
colr.yellowBg('Hello World!'); // 'Hello World!' with a __light__ yellow background
colr.lightBg.yellowBg('Hello World!'); // 'Hello World!' with a __light__ yellow background
colr.darkBg.yellowBg('Hello World!'); // 'Hello World!' with a __dark__ yellow background
```

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

##### darkYellowBg

```typescript
colr.darkYellowBg(...text: string[]): string
colr.darkBg.yellowBg(...text: string[]): string
colr.yellowBg(...text: string[]): string
```

Makes the __background__ of the given text __dark yellow__.

Unaffected by `lightBg`/`darkBg` modifiers and __will always be dark__.

Prefer `darkBg.yellowBg`

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

##### lightYellowBg

```typescript
colr.lightBg.yellowBg(...text: string[]): string
colr.lightYellowBg(...text: string[]): string
```

Makes the __background__ of the given text __light yellow__.

Unaffected by `lightBg`/`darkBg` modifiers and __will always be light__.

Prefer `lightBg.yellowBg`

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### blueBg

```typescript
colr.blueBg(...text: string[]): string
```

Makes the __background__ of the given text __blue__.

Uses `lightBlueBg` _by default_, or if `lightBg` modifier is used in the chain.
Uses `darkBlueBg` if `darkBg` modifier is used in the chain.

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

```typescript
colr.blueBg('Hello World!'); // 'Hello World!' with a __light__ blue background
colr.lightBg.blueBg('Hello World!'); // 'Hello World!' with a __light__ blue background
colr.darkBg.blueBg('Hello World!'); // 'Hello World!' with a __dark__ blue background
```

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

##### darkBlueBg

```typescript
colr.darkBlueBg(...text: string[]): string
colr.darkBg.blueBg(...text: string[]): string
colr.blueBg(...text: string[]): string
```

Makes the __background__ of the given text __dark blue__.

Unaffected by `lightBg`/`darkBg` modifiers and __will always be dark__.

Prefer `darkBg.blueBg`

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

##### lightBlueBg

```typescript
colr.lightBg.blueBg(...text: string[]): string
colr.lightBlueBg(...text: string[]): string
```

Makes the __background__ of the given text __light blue__.

Unaffected by `lightBg`/`darkBg` modifiers and __will always be light__.

Prefer `lightBg.blueBg`

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### magentaBg

```typescript
colr.magentaBg(...text: string[]): string
```

Makes the __background__ of the given text __magenta__.

Uses `lightMagentaBg` _by default_, or if `lightBg` modifier is used in the chain.
Uses `darkMagentaBg` if `darkBg` modifier is used in the chain.

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

```typescript
colr.magentaBg('Hello World!'); // 'Hello World!' with a __light__ magenta background
colr.lightBg.magentaBg('Hello World!'); // 'Hello World!' with a __light__ magenta background
colr.darkBg.magentaBg('Hello World!'); // 'Hello World!' with a __dark__ magenta background
```

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

##### darkMagentaBg

```typescript
colr.darkMagentaBg(...text: string[]): string
colr.darkBg.magentaBg(...text: string[]): string
colr.magentaBg(...text: string[]): string
```

Makes the __background__ of the given text __dark magenta__.

Unaffected by `lightBg`/`darkBg` modifiers and __will always be dark__.

Prefer `darkBg.magentaBg`

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

##### lightMagentaBg

```typescript
colr.lightBg.magentaBg(...text: string[]): string
colr.lightMagentaBg(...text: string[]): string
```

Makes the __background__ of the given text __light magenta__.

Unaffected by `lightBg`/`darkBg` modifiers and __will always be light__.

Prefer `lightBg.magentaBg`

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### cyanBg

```typescript
colr.cyanBg(...text: string[]): string
```

Makes the __background__ of the given text __cyan__.

Uses `lightCyanBg` _by default_, or if `lightBg` modifier is used in the chain.
Uses `darkCyanBg` if `darkBg` modifier is used in the chain.

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

```typescript
colr.cyanBg('Hello World!'); // 'Hello World!' with a __light__ cyan background
colr.lightBg.cyanBg('Hello World!'); // 'Hello World!' with a __light__ cyan background
colr.darkBg.cyanBg('Hello World!'); // 'Hello World!' with a __dark__ cyan background
```

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

##### darkCyanBg

```typescript
colr.darkCyanBg(...text: string[]): string
colr.darkBg.cyanBg(...text: string[]): string
colr.cyanBg(...text: string[]): string
```

Makes the __background__ of the given text __dark cyan__.

Unaffected by `lightBg`/`darkBg` modifiers and __will always be dark__.

Prefer `darkBg.cyanBg`

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

##### lightCyanBg

```typescript
colr.lightBg.cyanBg(...text: string[]): string
colr.lightCyanBg(...text: string[]): string
```

Makes the __background__ of the given text __light cyan__.

Unaffected by `lightBg`/`darkBg` modifiers and __will always be light__.

Prefer `lightBg.cyanBg`

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### whiteBg

```typescript
colr.whiteBg(...text: string[]): string
```

Makes the __background__ of the given text __white__.

Uses `lightWhiteBg` _by default_, or if `lightBg` modifier is used in the chain.
Uses `darkWhiteBg` if `darkBg` modifier is used in the chain.

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

```typescript
colr.whiteBg('Hello World!'); // 'Hello World!' with a __light__ white background
colr.lightBg.whiteBg('Hello World!'); // 'Hello World!' with a __light__ white background
colr.darkBg.whiteBg('Hello World!'); // 'Hello World!' with a __dark__ white background
```

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

##### darkWhiteBg

```typescript
colr.darkWhiteBg(...text: string[]): string
colr.darkBg.whiteBg(...text: string[]): string
colr.whiteBg(...text: string[]): string
```

Makes the __background__ of the given text __dark white__.

Unaffected by `lightBg`/`darkBg` modifiers and __will always be dark__.

Prefer `darkBg.whiteBg`

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

##### lightWhiteBg

```typescript
colr.lightBg.whiteBg(...text: string[]): string
colr.lightWhiteBg(...text: string[]): string
```

Makes the __background__ of the given text __light white__.

Unaffected by `lightBg`/`darkBg` modifiers and __will always be light__.

Prefer `lightBg.whiteBg`

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

### Black Colours

#### <span id="colr_black">black</span>

```typescript
colr.black(...text: string[]): string
colr.darkBlack(...text: string[]): string
```

> __Note:__ Black behaves differently to other colours as the 'base' is always dark, regardless of modifiers.

Makes the given text __dark black__.

Unaffected by `light`/`dark` modifiers and __will always be dark__.

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

```typescript
colr.black('Hello World!'); // 'Hello World!' with __dark__ black text
colr.light.black('Hello World!'); // 'Hello World!' with __dark__ black text
colr.dark.black('Hello World!'); // 'Hello World!' with __dark__ black text
```

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

##### darkBlack

```typescript
colr.black(...text: string[]): string
colr.darkBlack(...text: string[]): string
```

Makes the given text __dark black__.

Unaffected by `light`/`dark` modifiers and __will always be dark__.

Same as `black`.

> __Note:__ Black behaves differently to other colours as the 'base' is always dark, regardless of modifiers.

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

##### <span id="colr_lightblack">lightBlack</span>

```typescript
colr.lightBlack(...text: string[]): string
```

Makes the given text __light black__.

Unaffected by `light`/`dark` modifiers and __will always be light__.

> __Note:__ Black behaves differently to other colours as the 'base' is always dark, regardless of modifiers.

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### blackBg

```typescript
colr.blackBg(...text: string[]): string
colr.darkBlackBg(...text: string[]): string
```

> __Note:__ Black behaves differently to other colours as the 'base' is always dark, regardless of modifiers.

Makes the __background__ of the given text __dark black__.

Unaffected by `lightBg`/`darkBg` modifiers and __will always be dark__.

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

```typescript
colr.blackBg('Hello World!'); // 'Hello World!' with a __dark__ black background
colr.lightBg.blackBg('Hello World!'); // 'Hello World!' with a __dark__ black background
colr.darkBg.blackBg('Hello World!'); // 'Hello World!' with a __dark__ black background
```

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

##### darkBlackBg

```typescript
colr.blackBg(...text: string[]): string
colr.darkBlackBg(...text: string[]): string
```

Makes the __background__ of the given text __dark black__.

Unaffected by `lightBg`/`darkBg` modifiers and __will always be dark__.

Same as `blackBg`.

> __Note:__ Black behaves differently to other colours as the 'base' is always dark, regardless of modifiers.

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

##### lightBlackBg

```typescript
colr.lightBlackBg(...text: string[]): string
```

Makes the __background__ of the given text __light black__.

Unaffected by `lightBg`/`darkBg` modifiers and __will always be light__.

> __Note:__ Black behaves differently to other colours as the 'base' is always dark, regardless of modifiers.

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

### Grey / Gray Colours

#### grey / gray

```typescript
colr.grey(...text: string[]): string
colr.gray(...text: string[]): string
```

Makes the given text __grey__.

Equivalent to `colr.light.black`.

Unaffected by `light`/`dark` modifiers

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### greyBg / grayBg

```typescript
colr.greyBg(...text: string[]): string
colr.grayBg(...text: string[]): string
```

Makes the __background__ of the given text __grey__.

Equivalent to `colr.lightBg.blackBg`.

Unaffected by `lightBg`/`darkBg` modifiers

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### grey0 / gray0

```typescript
colr.grey0(...text: string[]): string
colr.gray0(...text: string[]): string
```

Makes the given text __grey__. 0 out of 5 _(where 0 is black and 5 is white)_.

Equivalent to `colr.black`.

Unaffected by `light`/`dark` modifiers

> __Warning:__ Numbered greys may not inverse as expected. `colr.grey0.inverse` ≈ `colr.blackBg`

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### grey1 / gray1

```typescript
colr.grey1(...text: string[]): string
colr.gray1(...text: string[]): string
```

Makes the given text __grey__. 1 out of 5 _(where 0 is black and 5 is white)_.

Equivalent to `colr.light.black.dim`.

Unaffected by `light`/`dark` modifiers

> __Warning:__ Numbered greys may not inverse as expected. `colr.grey1.inverse` ≈ `colr.lightBlackBg`

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### grey2 / gray2

```typescript
colr.grey2(...text: string[]): string
colr.gray2(...text: string[]): string
```

Makes the given text __grey__. 2 out of 5 _(where 0 is black and 5 is white)_.

Equivalent to `colr.dark.white.dim`.

Unaffected by `light`/`dark` modifiers

> __Warning:__ Numbered greys may not inverse as expected. `colr.grey2.inverse` ≈ `colr.darkWhiteBg`

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### grey3 / gray3

```typescript
colr.grey3(...text: string[]): string
colr.gray3(...text: string[]): string
```

Makes the given text __grey__. 3 out of 5 _(where 0 is black and 5 is white)_.

Equivalent to `colr.light.white.dim`.

Unaffected by `light`/`dark` modifiers

> __Warning:__ Numbered greys may not inverse as expected. `colr.grey3.inverse` ≈ `colr.whiteBg`

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### grey4 / gray4

```typescript
colr.grey4(...text: string[]): string
colr.gray4(...text: string[]): string
```

Makes the given text __grey__. 4 out of 5 _(where 0 is black and 5 is white)_.

Equivalent to `colr.dark.white`.

Unaffected by `light`/`dark` modifiers

> __Warning:__ Numbered greys may not inverse as expected. `colr.grey4.inverse` ≈ `colr.darkWhiteBg`

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### grey5 / gray5

```typescript
colr.grey5(...text: string[]): string
colr.gray5(...text: string[]): string
```

Makes the given text __grey__. 5 out of 5 _(where 0 is black and 5 is white)_.

Equivalent to `colr.light.white`.

Unaffected by `light`/`dark` modifiers

> __Warning:__ Numbered greys may not inverse as expected. `colr.grey5.inverse` ≈ `colr.whiteBg`

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

### Theme Colours

#### <span id="colr_primary">primary</span>

```typescript
colr.primary(...text: string[]): string
```

Makes the given text __'primary'__ (light yellow) themed.

Equivalent to `colr.light.yellow`.

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### <span id="colr_secondary">secondary</span>

```typescript
colr.secondary(...text: string[]): string
```

Makes the given text __'secondary'__ (magenta) themed.

Equivalent to `colr.light.magenta`.

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### <span id="colr_success">success</span>

```typescript
colr.success(...text: string[]): string
```

Makes the given text __'success'__ (green) themed.

Equivalent to `colr.light.green`.

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### <span id="colr_danger">danger</span>

```typescript
colr.danger(...text: string[]): string
```

Makes the given text __'danger'__ (red) themed.

Equivalent to `colr.dark.red`.

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### <span id="colr_warning">warning</span>

```typescript
colr.warning(...text: string[]): string
```

Makes the given text __'warning'__ (dark yellow) themed.

Equivalent to `colr.dark.yellow`.

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### <span id="colr_info">info</span>

```typescript
colr.info(...text: string[]): string
```

Makes the given text __'info'__ (blue) themed.

Equivalent to `colr.light.blue`.

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### primaryBg

```typescript
colr.primaryBg(...text: string[]): string
```

Makes the __background__ of the given text __'primary'__ (light yellow) themed and makes the text __black__.

Equivalent to `colr.lightBg.yellowBg.black`.

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### secondaryBg

```typescript
colr.secondaryBg(...text: string[]): string
```

Makes the __background__ of the given text __'secondary'__ (magenta) themed and makes the text __black__.

Equivalent to `colr.lightBg.magentaBg.black`.

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### successBg

```typescript
colr.successBg(...text: string[]): string
```

Makes the __background__ of the given text __'success'__ (green) themed and makes the text __black__.

Equivalent to `colr.lightBg.greenBg.black`.

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### dangerBg

```typescript
colr.dangerBg(...text: string[]): string
```

Makes the __background__ of the given text __'danger'__ (red) themed and makes the text __black__.

Equivalent to `colr.darkBg.redBg.black`.

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### warningBg

```typescript
colr.warningBg(...text: string[]): string
```

Makes the __background__ of the given text __'warning'__ (dark yellow) themed and makes the text __black__.

Equivalent to `colr.darkBg.yellowBg.black`.

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### infoBg

```typescript
colr.infoBg(...text: string[]): string
```

Makes the __background__ of the given text __'info'__ (blue) themed and makes the text __black__.

Equivalent to `colr.lightBg.blueBg.black`.

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

### Other Styles

#### reset

```typescript
colr.reset(...text: string[]): string
```

Applies the __'reset'__ style to the given text.

This returns the text back to normal colours/styles.

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### bold

```typescript
colr.bold(...text: string[]): string
```

Applies the __'bold'__ style to the given text.

This makes the text __bold__.

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### dim

```typescript
colr.dim(...text: string[]): string
```

Applies the __'dim'__ style to the given text.

This dims the brightness of the text colour.

> __Note:__ Not the same as `dark` colours.

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### italic

```typescript
colr.italic(...text: string[]): string
```

Applies the __'italic'__ style to the given text.

This makes the text _italic_.

> __Note:__ Not widely supported

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### overline

```typescript
colr.overline(...text: string[]): string
```

Applies the __'overline'__ style to the given text.

This adds a horizontal line above the text

> __Note:__ Not widely supported

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### underline

```typescript
colr.underline(...text: string[]): string
```

Applies the __'underline'__ style to the given text.

This adds a horizontal line below the text

> __Note:__ Not widely supported

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### strikethrough

```typescript
colr.strikethrough(...text: string[]): string
```

Applies the __'strikethrough'__ style to the given text.

This add a horizontal line through the middle of the given text.

> __Note:__ Not widely supported

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### inverse

```typescript
colr.inverse(...text: string[]): string
```

Applies the __'inverse'__ style to the given text.

This inverses the text and background colours for the given text.

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### hidden

```typescript
colr.hidden(...text: string[]): string
```

Applies the __'hidden'__ style to the given text.

This makes the text invisible.

> __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles

|  #   | Parameter Name | Required | Type       |
|:----:|:---------------|:---------|:-----------|
| *0…* | `text`         | **Yes**  | `string[]` |

| Return Type |
|-------------|
| `string`    |

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

### Helper Functions

#### $ / template

```typescript
colr.$;
colr.template;
```

A helper function to make it easier to use colr with template strings.

Applies the given template string to the $'d expressions in the template string.

```typescript
colr.red.$`A ${'red'} world`; // 'A red world' with default colours, except 'World!' which is red
colr.red.template`A ${'red'} world`; // 'A red world' with default colours, except 'World!' which is red

colr.blueBg(colr.red.$`A ${'red'} word in a blue world`); // 'A red word in a blue world' with a blue background, and 'red' has red text
```

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### <span id="colr_clear">clear</span>

```typescript
colr.clear;
```

Removes all colr ANSI escapes code from the given text.

```typescript
const text = colr.red('Hello World!'); // 'Hello World!' with red text
colr.clear(text); // 'Hello World!' with no colours
```

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### debug

```typescript
colr.debug;
```

Replaces all colr ANSI escapes code with human readable indicators to help debugging why a style might not be working.

- Each colour/style has a 3 letter key and is wrapped in backets with a direction indicator.
- The direction indicator is `>` for opening and `<` for closing.
- The key is uppercase for light colours, and lowercase for dark colours.
- The key is wrapped in `()` for text colours, `{}` for background colours, and `[]` for other styles.
- Colours have common ending codes, so `(<)` (text) or `{<}` (background) is used for these codes.

| Colour  | Light Text     | Dark Text      | Light BG       | Dark BG        |
|---------|----------------|----------------|----------------|----------------|
| black   | `(BLK>)...(<)` | `(blk>)...(<)` | `{BLK>}...{<}` | `{blk>}...{<}` |
| red     | `(RED>)...(<)` | `(red>)...(<)` | `{RED>}...{<}` | `{red>}...{<}` |
| green   | `(GRN>)...(<)` | `(grn>)...(<)` | `{GRN>}...{<}` | `{grn>}...{<}` |
| yellow  | `(YLW>)...(<)` | `(ylw>)...(<)` | `{YLW>}...{<}` | `{ylw>}...{<}` |
| blue    | `(BLU>)...(<)` | `(blu>)...(<)` | `{BLU>}...{<}` | `{blu>}...{<}` |
| magenta | `(MAG>)...(<)` | `(mag>)...(<)` | `{MAG>}...{<}` | `{mag>}...{<}` |
| cyan    | `(CYN>)...(<)` | `(cyn>)...(<)` | `{CYN>}...{<}` | `{cyn>}...{<}` |
| white   | `(WHT>)...(<)` | `(wht>)...(<)` | `{WHT>}...{<}` | `{wht>}...{<}` |

| Style         |                   |
|---------------|-------------------|
| reset         | `[rst>]...[<rst]` |
| bold          | `[bld>]...[<bld]` |
| dim           | `[dim>]...[<dim]` |
| italic        | `[itl>]...[<itl]` |
| overline      | `[ovr>]...[<ovr]` |
| underline     | `[und>]...[<und]` |
| strikethrough | `[str>]...[<str]` |
| inverse       | `[inv>]...[<inv]` |
| hidden        | `[hdn>]...[<hdn]` |

```typescript
colr.debug(colr.yellow('Hello World!')); // '(YLW>)Hello World!(<)'
colr.debug(colr.dark.yellow('Hello World!')); // '(ylw>)Hello World!(<)'
colr.debug(colr.yellow.dim('Hello World!')); // '(YLW>)[dim>]Hello World![<dim](<)'
colr.debug(colr.dark.yellow.dim('Hello World!')); // '(ylw>)[dim>]Hello World![<dim](<)'

colr.debug(colr.yellow.blueBg('Hello World!')); // '(YLW>){blu>}Hello World!{<}(<)'
colr.debug(colr.yellow.lightBg.blueBg('Hello World!')); // '(YLW>){BLU>}Hello World!{<}(<)'
```

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

### sets

```typescript
colr.sets;
```

A collection of different colour 'sets'.

A set is a collection of `ColrFn`'s for a certain colour/theme that affect the text or the background.

Useful for when you want to attribute a certain colour/theme, and apply it to the text colour or background colour in different applications.

| Name         | `text`            | `bg`                |
|--------------|-------------------|---------------------|
| `red`        | `colr.red`        | `colr.redBg`        |
| `green`      | `colr.green`      | `colr.greenBg`      |
| `yellow`     | `colr.yellow`     | `colr.yellowBg`     |
| `blue`       | `colr.blue`       | `colr.blueBg`       |
| `magenta`    | `colr.magenta`    | `colr.magentaBg`    |
| `cyan`       | `colr.cyan`       | `colr.cyanBg`       |
| `white`      | `colr.white`      | `colr.whiteBg`      |
| `black`      | `colr.black`      | `colr.blackBg`      |
| `lightBlack` | `colr.lightBlack` | `colr.lightBlackBg` |
| `grey`       | `colr.grey`       | `colr.greyBg`       |
| `gray`       | `colr.gray`       | `colr.grayBg`       |
| `primary`    | `colr.primary`    | `colr.primaryBg`    |
| `secondary`  | `colr.secondary`  | `colr.secondaryBg`  |
| `success`    | `colr.success`    | `colr.successBg`    |
| `danger`     | `colr.danger`     | `colr.dangerBg`     |
| `warning`    | `colr.warning`    | `colr.warningBg`    |
| `info`       | `colr.info`       | `colr.infoBg`       |

```typescript
const printOption = (name: string, colour: ColrSet) => {
  console.log(' ' + colour.bg.darkBlack('   ') + ' ' + colour.text(name));
};
printOption('Approve', colr.lightBg.sets.green);
printOption('Decline', colr.dark.sets.red);

// Rough output:
// '███ Approve' in green
// '███ Decline' in red
```

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### <span id="colr_sets_red">red</span>

```typescript
colr.sets.red;
```

A ColrSet object for the colour `red`.

- The `text` function is: `colr.red`.
- The `bg` function is: `colr.redBg`.

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### <span id="colr_sets_green">green</span>

```typescript
colr.sets.green;
```

A ColrSet object for the colour `green`.

- The `text` function is: `colr.green`.
- The `bg` function is: `colr.greenBg`.

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### <span id="colr_sets_yellow">yellow</span>

```typescript
colr.sets.yellow;
```

A ColrSet object for the colour `yellow`.

- The `text` function is: `colr.yellow`.
- The `bg` function is: `colr.yellowBg`.

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### <span id="colr_sets_blue">blue</span>

```typescript
colr.sets.blue;
```

A ColrSet object for the colour `blue`.

- The `text` function is: `colr.blue`.
- The `bg` function is: `colr.blueBg`.

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### <span id="colr_sets_magenta">magenta</span>

```typescript
colr.sets.magenta;
```

A ColrSet object for the colour `magenta`.

- The `text` function is: `colr.magenta`.
- The `bg` function is: `colr.magentaBg`.

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### <span id="colr_sets_cyan">cyan</span>

```typescript
colr.sets.cyan;
```

A ColrSet object for the colour `cyan`.

- The `text` function is: `colr.cyan`.
- The `bg` function is: `colr.cyanBg`.

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### <span id="colr_sets_white">white</span>

```typescript
colr.sets.white;
```

A ColrSet object for the colour `white`.

- The `text` function is: `colr.white`.
- The `bg` function is: `colr.whiteBg`.

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### <span id="colr_sets_black">black</span>

```typescript
colr.sets.black;
```

A ColrSet object for the colour `black`.

- The `text` function is: `colr.black`.
- The `bg` function is: `colr.blackBg`.

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### <span id="colr_sets_lightblack">lightBlack</span>

```typescript
colr.sets.lightBlack;
```

A ColrSet object for the colour `lightBlack`.

- The `text` function is: `colr.lightBlack`.
- The `bg` function is: `colr.lightBlackBg`.

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### grey

```typescript
colr.sets.grey;
```

A ColrSet object for the colour `grey`.

- The `text` function is: `colr.grey`.
- The `bg` function is: `colr.greyBg`.

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### gray

```typescript
colr.sets.gray;
```

A ColrSet object for the colour `gray`.

- The `text` function is: `colr.gray`.
- The `bg` function is: `colr.grayBg`.

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### <span id="colr_sets_primary">primary</span>

```typescript
colr.sets.primary;
```

A ColrSet object for the theme `primary`.

- The `text` function is: `colr.primary`.
- The `bg` function is: `colr.primaryBg`.

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### <span id="colr_sets_secondary">secondary</span>

```typescript
colr.sets.secondary;
```

A ColrSet object for the theme `secondary`.

- The `text` function is: `colr.secondary`.
- The `bg` function is: `colr.secondaryBg`.

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### <span id="colr_sets_success">success</span>

```typescript
colr.sets.success;
```

A ColrSet object for the theme `success`.

- The `text` function is: `colr.success`.
- The `bg` function is: `colr.successBg`.

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### <span id="colr_sets_danger">danger</span>

```typescript
colr.sets.danger;
```

A ColrSet object for the theme `danger`.

- The `text` function is: `colr.danger`.
- The `bg` function is: `colr.dangerBg`.

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### <span id="colr_sets_warning">warning</span>

```typescript
colr.sets.warning;
```

A ColrSet object for the theme `warning`.

- The `text` function is: `colr.warning`.
- The `bg` function is: `colr.warningBg`.

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

#### <span id="colr_sets_info">info</span>

```typescript
colr.sets.info;
```

A ColrSet object for the theme `info`.

- The `text` function is: `colr.info`.
- The `bg` function is: `colr.infoBg`.

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

### WrapFn
Type for a function that manipulates a string

Can by a colr `ColrFn`, a `chalk` function, or something else

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

### ColrFn
Type for a function that manipulates a string, but also has properties for chaining more colours/styles

See `colr`

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

### WrapSet
An agnostic set of functions to wrap/modify the given text with the given colour/style.

Same as `ColrSet`, but not limited to colr library.

Has two properties:
- `text` - A function to wrap/modify the given text with the given colour/style.
- `bg` - A function to wrap/modify the background of the given text with the given colour/style.

Example:
```typescript
const chalkSet: WrapSet = {
  text: chalk.redBright,
  bg: chalk.bgRedBright,
};
```

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

### ColrSet
A set of ColrFns for a certain colour/theme.

Has two properties:
- `text` - A function to set the text colour to the given colour/style.
- `bg` - A function to set the background colour to the given colour/style.

<p style="text-align: right" align="right"><a href="#colr"> [↑ Back to <b>colr</b> ↑] </a></p>

## <span id="table">table</span>
A simple table generator

  - [**table**](#table)
    - [print](#print)
    - [printObjects](#printobjects)
    - [markdown](#markdown)
    - [getLines](#table_getlines)
    - [**TableOptions**](#table_fulltableoptions)
    - [**TableFormatConfig**](#tableformatconfig)
    - [TableCharLookup](#tablecharlookup)
    - [**utils**](#table_utils)
      - [objectsToTable](#objectstotable)
      - [transpose](#table_utils_transpose)
      - [concatRows](#concatrows)
      - [getFormat](#getformat)
      - [getFullOptions](#getfulloptions)

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

### <span id="table_getlines">getLines</span>

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

### <span id="table_fulltableoptions">TableOptions</span>
The configuration options for the table

  - [**TableOptions**](#table_fulltableoptions)
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
    - [align](#table_fulltableoptions_align)
    - [alignCols](#aligncols)
    - [transpose](#table_fulltableoptions_transpose)
    - [transposeBody](#transposebody)
    - [margin](#margin)
    - [cellPadding](#cellpadding)
    - [format](#format)
    - [truncate](#table_fulltableoptions_truncate)
    - [maxWidth](#maxwidth)

<p style="text-align: right" align="right"><a href="#table"> [↑ Back to <b>table</b> ↑] </a></p>

#### wrapperFn
Function to wrap each line of the output in (e.g. colr.blue)

<p style="text-align: right" align="right"><a href="#tableoptions"> [↑ Back to <b>TableOptions</b> ↑] </a></p>

#### wrapLinesFn
Function to wrap the output lines of each cell of the table (e.g. colr.blue)

<p style="text-align: right" align="right"><a href="#tableoptions"> [↑ Back to <b>TableOptions</b> ↑] </a></p>

#### wrapHeaderLinesFn
Function to wrap the output lines of each cell of the header of the table (e.g. colr.blue)

Default: `colr.bold`

<p style="text-align: right" align="right"><a href="#tableoptions"> [↑ Back to <b>TableOptions</b> ↑] </a></p>

#### wrapBodyLinesFn
Function to wrap the output lines of each cell of the body of the table (e.g. colr.blue)

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

#### <span id="table_fulltableoptions_align">align</span>
How the table should be aligned on the screen

left, right, center or justify

<p style="text-align: right" align="right"><a href="#tableoptions"> [↑ Back to <b>TableOptions</b> ↑] </a></p>

#### alignCols
How each column should be aligned

Array with alignment for each column: left, right, center or justify

<p style="text-align: right" align="right"><a href="#tableoptions"> [↑ Back to <b>TableOptions</b> ↑] </a></p>

#### <span id="table_fulltableoptions_transpose">transpose</span>
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

#### <span id="table_fulltableoptions_truncate">truncate</span>
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

### <span id="table_utils">utils</span>

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

#### <span id="table_utils_transpose">transpose</span>

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
table.utils.getFormat(format: WrapFn, row: number, col: number, isHeader: boolean, isBody: boolean): TableFormatConfig
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

|  #  | Parameter Name | Required | Type      |
|:---:|:---------------|:---------|:----------|
| *0* | `format`       | **Yes**  | `WrapFn`  |
| *1* | `row`          | *No*     | `number`  |
| *2* | `col`          | *No*     | `number`  |
| *3* | `isHeader`     | *No*     | `boolean` |
| *4* | `isBody`       | *No*     | `boolean` |

| Return Type         |
|---------------------|
| `TableFormatConfig` |

<p style="text-align: right" align="right"><a href="#table"> [↑ Back to <b>table</b> ↑] </a></p>

#### getFullOptions

```typescript
table.utils.getFullOptions(opts: TableOptions): FullTableOptions
```

A function for simplifying the format configuration

|  #  | Parameter Name | Required | Type           |
|:---:|:---------------|:---------|:---------------|
| *0* | `opts`         | **Yes**  | `TableOptions` |

| Return Type        |
|--------------------|
| `FullTableOptions` |

<p style="text-align: right" align="right"><a href="#table"> [↑ Back to <b>table</b> ↑] </a></p>

## Logger
  - [**Logger**](#logger)
    - [log](#log)

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

## LogTools
A collection of tools for logging

  - [**LogTools**](#logtools)
    - [getLogStr](#getlogstr)
    - [processLogContents](#processlogcontents)
    - [getLog](#getlog)
    - [createLogger](#createlogger)
    - [LogOptions](#logoptions)
    - [LogConfig](#logconfig)

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

### createLogger

```typescript
createLogger(extraConfigs: T, options: LogOptions): Logger<T>
```

Create a logger with custom configs

```typescript
const log = createLogger({
  myLog: {
    name: 'MYLOG',
    nameColour: colr.dark.magenta,
    showDate: false,
    showTime: true,
    contentColour: colr.yellow
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
| `Logger<T>` |

<p style="text-align: right" align="right"><a href="#logtools"> [↑ Back to <b>LogTools</b> ↑] </a></p>

### LogOptions

```typescript
LogOptions;
```

Options for the log function

<p style="text-align: right" align="right"><a href="#logtools"> [↑ Back to <b>LogTools</b> ↑] </a></p>

### LogConfig

```typescript
LogConfig;
```

Configuration for the log function

See createLogger

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
progressBarTools.getColouredProgressBarOpts(opts: progressBar.ProgressBarOptions, randomise: boolean): (prefix?: string, override?: any, resetColours?: boolean) => any
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

|  #  | Parameter Name | Required | Type                             | Default |
|:---:|:---------------|:---------|:---------------------------------|:--------|
| *0* | `opts`         | **Yes**  | `progressBar.ProgressBarOptions` |         |
| *1* | `randomise`    | *No*     | `boolean`                        | `false` |

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
nextTick(): Promise<unknown>
waiters.nextTick(): Promise<unknown>
```

Wait for the next tick

```typescript
wait nextTick();
```

| Return Type        |
|--------------------|
| `Promise<unknown>` |

<p style="text-align: right" align="right"><a href="#waiters"> [↑ Back to <b>waiters</b> ↑] </a></p>

## <span id="keylistener">keyListener</span>
  - [**keyListener**](#keylistener)
    - [getKeyListener](#getkeylistener)
    - [**KeyListener**](#keylistener_keylistener)
      - [start](#start)
      - [stop](#stop)

<p style="text-align: right" align="right"><a href="#"> [↑ Back to top ↑] </a></p>

### getKeyListener

```typescript
getKeyListener(callback: (keyName: string, rawValue: string) => void, isStart: boolean, isDebugLog: boolean): KeyListener
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

|  #  | Parameter Name | Required | Type                                          | Default |
|:---:|:---------------|:---------|:----------------------------------------------|:--------|
| *0* | `callback`     | **Yes**  | `(keyName: string, rawValue: string) => void` |         |
| *1* | `isStart`      | *No*     | `boolean`                                     | `true`  |
| *2* | `isDebugLog`   | *No*     | `boolean`                                     | `false` |

| Return Type   |
|---------------|
| `KeyListener` |

<p style="text-align: right" align="right"><a href="#keylistener"> [↑ Back to <b>keyListener</b> ↑] </a></p>

### <span id="keylistener_keylistener">KeyListener</span>

```typescript
KeyListener;
```

Returned by `getKeyListener`

<p style="text-align: right" align="right"><a href="#keylistener"> [↑ Back to <b>keyListener</b> ↑] </a></p>

#### start

```typescript
kl.start(): void
```

Start listening for key presses

| Return Type |
|-------------|
| `void`      |

<p style="text-align: right" align="right"><a href="#keylistener"> [↑ Back to <b>keyListener</b> ↑] </a></p>

#### stop

```typescript
kl.stop(): void
```

Stop listening for key presses

| Return Type |
|-------------|
| `void`      |

<p style="text-align: right" align="right"><a href="#keylistener"> [↑ Back to <b>keyListener</b> ↑] </a></p>

<!-- DOCS: MAIN END -->
