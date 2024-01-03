// bun run scripts/generate-emoji-regex.ts

import { ArrayTools, StringTools, MathsTools, ObjectTools, PromiseTools } from 'swiss-ak';

// upgrade the unicode version as needed
const regexs = [
  require('@unicode/unicode-15.1.0/Binary_Property/Emoji/regex.js'),
  require('@unicode/unicode-15.1.0/Binary_Property/Emoji_Component/regex.js'),
  require('@unicode/unicode-15.1.0/Binary_Property/Emoji_Modifier/regex.js'),
  require('@unicode/unicode-15.1.0/Binary_Property/Emoji_Modifier_Base/regex.js'),
  require('@unicode/unicode-15.1.0/Binary_Property/Emoji_Presentation/regex.js')
];

// List of characters/ranges to omit from the regex (aren't emojis)
const omitChars = [
  '#\\\\\\*0-9(\\\\xA9)?(\\\\xAE)?(\\\\u203C)?(\\\\u2049)?(\\\\u2122)?', // # \ * 0-9 © ® ‼ ⁉ ™
  '\\\\u2194-\\\\u2199', // ↔ - ↙
  '\\\\u21A9', // ↩
  '\\\\u21AA', // ↪
  '\\\\u2328', // ⌨
  '\\\\u23CF', // ⏏
  '\\\\u25B6', // ▶
  '\\\\u25C0', // ◀
  '\\\\u2714', // ✔
  '\\\\u2716' // ✖
];

const forceRemove = new RegExp(omitChars.join('|'), 'g');
const result = regexs
  .map((regex) => regex.toString().slice(1, -1))
  .join('|')
  .replace(forceRemove, '');

console.log('/' + result + '/g');

// ----------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------
// Effectiveness evaluation
// ----------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------

const emojis =
  '😋✂️📋👍😃💁🐻🌻🍔🍹🎷⚽️🚘🌇💡🎉💖🔣🎌🏳️‍🌈📅😀😃😄😁😆😅😂🤣🥲🥹☺️😊😇🙂🙃😉😌😍🥰😘😗😙😚😋😛😝😜🤪🤨🧐🤓😎🥸🤩🥳😏😒😞😔😟😕🙁☹️😣😖😫😩🥺😢😭😮‍💨😤😠😡🤬🤯😳🥵🥶😱😨😰😥😓🫣🤗🫡🤔🫢🤭🤫🤥😶😶‍🌫️😐😑😬🫨🫠🙄😯😦😧😮😲🥱😴🤤😪😵😵‍💫🫥🤐🥴🤢🤮🤧😷🤒🤕🤑🤠😈👿👹👺🤡💩👻💀☠️👽👾🤖🎃😺😸😹😻😼😽🙀😿😾👋🤚🖐✋🖖👌🤌🤏✌️🤞🫰🤟🤘🤙🫵🫱🫲🫸🫷🫳🫴👈👉👆🖕👇☝️👍👎✊👊🤛🤜👏🫶🙌👐🤲🤝🙏✍️💅🤳💪🦾🦵🦿🦶👣👂🦻👃🫀🫁🧠🦷🦴👀👁👅👄🫦💋🩸👶👧🧒👦👩🧑👨👩‍🦱🧑‍🦱👨‍🦱👩‍🦰🧑‍🦰👨‍🦰👱‍♀️👱👱‍♂️👩‍🦳🧑‍🦳👨‍🦳👩‍🦲🧑‍🦲👨‍🦲🧔‍♀️🧔🧔‍♂️👵🧓👴👲👳‍♀️👳👳‍♂️🧕👮‍♀️👮👮‍♂️👷‍♀️👷👷‍♂️💂‍♀️💂💂‍♂️🕵️‍♀️🕵️🕵️‍♂️👩‍⚕️🧑‍⚕️👨‍⚕️👩‍🌾🧑‍🌾👨‍🌾👩‍🍳🧑‍🍳👨‍🍳👩‍🎓🧑‍🎓👨‍🎓👩‍🎤🧑‍🎤👨‍🎤👩‍🏫🧑‍🏫👨‍🏫👩‍🏭🧑‍🏭👨‍🏭👩‍💻🧑‍💻👨‍💻👩‍💼🧑‍💼👨‍💼👩‍🔧🧑‍🔧👨‍🔧👩‍🔬🧑‍🔬👨‍🔬👩‍🎨🧑‍🎨👨‍🎨👩‍🚒🧑‍🚒👨‍🚒👩‍✈️🧑‍✈️👨‍✈️👩‍🚀🧑‍🚀👨‍🚀👩‍⚖️🧑‍⚖️👨‍⚖️👰‍♀️👰👰‍♂️🤵‍♀️🤵🤵‍♂️👸🫅🤴🥷🦸‍♀️🦸🦸‍♂️🦹‍♀️🦹🦹‍♂️🤶🧑‍🎄🎅🧙‍♀️🧙🧙‍♂️🧝‍♀️🧝🧝‍♂️🧛‍♀️🧛🧛‍♂️🧟‍♀️🧟🧟‍♂️🧞‍♀️🧞🧞‍♂️🧜‍♀️🧜🧜‍♂️🧚‍♀️🧚🧚‍♂️🧌👼🤰🫄🫃🤱👩‍🍼🧑‍🍼👨‍🍼🙇‍♀️🙇🙇‍♂️💁‍♀️💁💁‍♂️🙅‍♀️🙅🙅‍♂️🙆‍♀️🙆🙆‍♂️🙋‍♀️🙋🙋‍♂️🧏‍♀️🧏🧏‍♂️🤦‍♀️🤦🤦‍♂️🤷‍♀️🤷🤷‍♂️🙎‍♀️🙎🙎‍♂️🙍‍♀️🙍🙍‍♂️💇‍♀️💇💇‍♂️💆‍♀️💆💆‍♂️🧖‍♀️🧖🧖‍♂️💅🤳💃🕺👯‍♀️👯👯‍♂️🕴👩‍🦽🧑‍🦽👨‍🦽👩‍🦼🧑‍🦼👨‍🦼🚶‍♀️🚶🚶‍♂️👩‍🦯🧑‍🦯👨‍🦯🧎‍♀️🧎🧎‍♂️🏃‍♀️🏃🏃‍♂️🧍‍♀️🧍🧍‍♂️👭🧑‍🤝‍🧑👬👫👩‍❤️‍👩💑👨‍❤️‍👨👩‍❤️‍👨👩‍❤️‍💋‍👩💏👨‍❤️‍💋‍👨👩‍❤️‍💋‍👨👪👨‍👩‍👦👨‍👩‍👧👨‍👩‍👧‍👦👨‍👩‍👦‍👦👨‍👩‍👧‍👧👨‍👨‍👦👨‍👨‍👧👨‍👨‍👧‍👦👨‍👨‍👦‍👦👨‍👨‍👧‍👧👩‍👩‍👦👩‍👩‍👧👩‍👩‍👧‍👦👩‍👩‍👦‍👦👩‍👩‍👧‍👧👨‍👦👨‍👦‍👦👨‍👧👨‍👧‍👦👨‍👧‍👧👩‍👦👩‍👦‍👦👩‍👧👩‍👧‍👦👩‍👧‍👧🗣👤👥🫂🧳🌂☂️🧵🪡🪢🪭🧶👓🕶🥽🥼🦺👔👕👖🧣🧤🧥🧦👗👘🥻🩴🩱🩲🩳👙👚👛👜👝🎒👞👟🥾🥿👠👡🩰👢👑👒🎩🎓🧢⛑🪖💄💍💼👋🏻🤚🏻🖐🏻✋🏻🖖🏻👌🏻🤌🏻🤏🏻✌🏻🤞🏻🫰🏻🤟🏻🤘🏻🤙🏻🫵🏻🫱🏻🫲🏻🫸🏻🫷🏻🫳🏻🫴🏻👈🏻👉🏻👆🏻🖕🏻👇🏻☝🏻👍🏻👎🏻✊🏻👊🏻🤛🏻🤜🏻👏🏻🫶🏻🙌🏻👐🏻🤲🏻🙏🏻✍🏻💅🏻🤳🏻💪🏻🦵🏻🦶🏻👂🏻🦻🏻👃🏻👶🏻👧🏻🧒🏻👦🏻👩🏻🧑🏻👨🏻👩🏻‍🦱🧑🏻‍🦱👨🏻‍🦱👩🏻‍🦰🧑🏻‍🦰👨🏻‍🦰👱🏻‍♀️👱🏻👱🏻‍♂️👩🏻‍🦳🧑🏻‍🦳👨🏻‍🦳👩🏻‍🦲🧑🏻‍🦲👨🏻‍🦲🧔🏻‍♀️🧔🏻🧔🏻‍♂️👵🏻🧓🏻👴🏻👲🏻👳🏻‍♀️👳🏻👳🏻‍♂️🧕🏻👮🏻‍♀️👮🏻👮🏻‍♂️👷🏻‍♀️👷🏻👷🏻‍♂️💂🏻‍♀️💂🏻💂🏻‍♂️🕵🏻‍♀️🕵🏻🕵🏻‍♂️👩🏻‍⚕️🧑🏻‍⚕️👨🏻‍⚕️👩🏻‍🌾🧑🏻‍🌾👨🏻‍🌾👩🏻‍🍳🧑🏻‍🍳👨🏻‍🍳👩🏻‍🎓🧑🏻‍🎓👨🏻‍🎓👩🏻‍🎤🧑🏻‍🎤👨🏻‍🎤👩🏻‍🏫🧑🏻‍🏫👨🏻‍🏫👩🏻‍🏭🧑🏻‍🏭👨🏻‍🏭👩🏻‍💻🧑🏻‍💻👨🏻‍💻👩🏻‍💼🧑🏻‍💼👨🏻‍💼👩🏻‍🔧🧑🏻‍🔧👨🏻‍🔧👩🏻‍🔬🧑🏻‍🔬👨🏻‍🔬👩🏻‍🎨🧑🏻‍🎨👨🏻‍🎨👩🏻‍🚒🧑🏻‍🚒👨🏻‍🚒👩🏻‍✈️🧑🏻‍✈️👨🏻‍✈️👩🏻‍🚀🧑🏻‍🚀👨🏻‍🚀👩🏻‍⚖️🧑🏻‍⚖️👨🏻‍⚖️👰🏻‍♀️👰🏻👰🏻‍♂️🤵🏻‍♀️🤵🏻🤵🏻‍♂️👸🏻🫅🏻🤴🏻🥷🏻🦸🏻‍♀️🦸🏻🦸🏻‍♂️🦹🏻‍♀️🦹🏻🦹🏻‍♂️🤶🏻🧑🏻‍🎄🎅🏻🧙🏻‍♀️🧙🏻🧙🏻‍♂️🧝🏻‍♀️🧝🏻🧝🏻‍♂️🧛🏻‍♀️🧛🏻🧛🏻‍♂️🧜🏻‍♀️🧜🏻🧜🏻‍♂️🧚🏻‍♀️🧚🏻🧚🏻‍♂️👼🏻🤰🏻🫄🏻🫃🏻🤱🏻👩🏻‍🍼🧑🏻‍🍼👨🏻‍🍼🙇🏻‍♀️🙇🏻🙇🏻‍♂️💁🏻‍♀️💁🏻💁🏻‍♂️🙅🏻‍♀️🙅🏻🙅🏻‍♂️🙆🏻‍♀️🙆🏻🙆🏻‍♂️🙋🏻‍♀️🙋🏻🙋🏻‍♂️🧏🏻‍♀️🧏🏻🧏🏻‍♂️🤦🏻‍♀️🤦🏻🤦🏻‍♂️🤷🏻‍♀️🤷🏻🤷🏻‍♂️🙎🏻‍♀️🙎🏻🙎🏻‍♂️🙍🏻‍♀️🙍🏻🙍🏻‍♂️💇🏻‍♀️💇🏻💇🏻‍♂️💆🏻‍♀️💆🏻💆🏻‍♂️🧖🏻‍♀️🧖🏻🧖🏻‍♂️💃🏻🕺🏻🕴🏻👩🏻‍🦽🧑🏻‍🦽👨🏻‍🦽👩🏻‍🦼🧑🏻‍🦼👨🏻‍🦼🚶🏻‍♀️🚶🏻🚶🏻‍♂️👩🏻‍🦯🧑🏻‍🦯👨🏻‍🦯🧎🏻‍♀️🧎🏻🧎🏻‍♂️🏃🏻‍♀️🏃🏻🏃🏻‍♂️🧍🏻‍♀️🧍🏻🧍🏻‍♂️👭🏻🧑🏻‍🤝‍🧑🏻👬🏻👫🏻🧗🏻‍♀️🧗🏻🧗🏻‍♂️🏇🏻🏂🏻🏌🏻‍♀️🏌🏻🏌🏻‍♂️🏄🏻‍♀️🏄🏻🏄🏻‍♂️🚣🏻‍♀️🚣🏻🚣🏻‍♂️🏊🏻‍♀️🏊🏻🏊🏻‍♂️⛹🏻‍♀️⛹🏻⛹🏻‍♂️🏋🏻‍♀️🏋🏻🏋🏻‍♂️🚴🏻‍♀️🚴🏻🚴🏻‍♂️🚵🏻‍♀️🚵🏻🚵🏻‍♂️🤸🏻‍♀️🤸🏻🤸🏻‍♂️🤽🏻‍♀️🤽🏻🤽🏻‍♂️🤾🏻‍♀️🤾🏻🤾🏻‍♂️🤹🏻‍♀️🤹🏻🤹🏻‍♂️🧘🏻‍♀️🧘🏻🧘🏻‍♂️🛀🏻🛌🏻👋🏼🤚🏼🖐🏼✋🏼🖖🏼👌🏼🤌🏼🤏🏼✌🏼🤞🏼🫰🏼🤟🏼🤘🏼🤙🏼🫵🏼🫱🏼🫲🏼🫸🏼🫷🏼🫳🏼🫴🏼👈🏼👉🏼👆🏼🖕🏼👇🏼☝🏼👍🏼👎🏼✊🏼👊🏼🤛🏼🤜🏼👏🏼🫶🏼🙌🏼👐🏼🤲🏼🙏🏼✍🏼💅🏼🤳🏼💪🏼🦵🏼🦶🏼👂🏼🦻🏼👃🏼👶🏼👧🏼🧒🏼👦🏼👩🏼🧑🏼👨🏼👩🏼‍🦱🧑🏼‍🦱👨🏼‍🦱👩🏼‍🦰🧑🏼‍🦰👨🏼‍🦰👱🏼‍♀️👱🏼👱🏼‍♂️👩🏼‍🦳🧑🏼‍🦳👨🏼‍🦳👩🏼‍🦲🧑🏼‍🦲👨🏼‍🦲🧔🏼‍♀️🧔🏼🧔🏼‍♂️👵🏼🧓🏼👴🏼👲🏼👳🏼‍♀️👳🏼👳🏼‍♂️🧕🏼👮🏼‍♀️👮🏼👮🏼‍♂️👷🏼‍♀️👷🏼👷🏼‍♂️💂🏼‍♀️💂🏼💂🏼‍♂️🕵🏼‍♀️🕵🏼🕵🏼‍♂️👩🏼‍⚕️🧑🏼‍⚕️👨🏼‍⚕️👩🏼‍🌾🧑🏼‍🌾👨🏼‍🌾👩🏼‍🍳🧑🏼‍🍳👨🏼‍🍳👩🏼‍🎓🧑🏼‍🎓👨🏼‍🎓👩🏼‍🎤🧑🏼‍🎤👨🏼‍🎤👩🏼‍🏫🧑🏼‍🏫👨🏼‍🏫👩🏼‍🏭🧑🏼‍🏭👨🏼‍🏭👩🏼‍💻🧑🏼‍💻👨🏼‍💻👩🏼‍💼🧑🏼‍💼👨🏼‍💼👩🏼‍🔧🧑🏼‍🔧👨🏼‍🔧👩🏼‍🔬🧑🏼‍🔬👨🏼‍🔬👩🏼‍🎨🧑🏼‍🎨👨🏼‍🎨👩🏼‍🚒🧑🏼‍🚒👨🏼‍🚒👩🏼‍✈️🧑🏼‍✈️👨🏼‍✈️👩🏼‍🚀🧑🏼‍🚀👨🏼‍🚀👩🏼‍⚖️🧑🏼‍⚖️👨🏼‍⚖️👰🏼‍♀️👰🏼👰🏼‍♂️🤵🏼‍♀️🤵🏼🤵🏼‍♂️👸🏼🫅🏼🤴🏼🥷🏼🦸🏼‍♀️🦸🏼🦸🏼‍♂️🦹🏼‍♀️🦹🏼🦹🏼‍♂️🤶🏼🧑🏼‍🎄🎅🏼🧙🏼‍♀️🧙🏼🧙🏼‍♂️🧝🏼‍♀️🧝🏼🧝🏼‍♂️🧛🏼‍♀️🧛🏼🧛🏼‍♂️🧜🏼‍♀️🧜🏼🧜🏼‍♂️🧚🏼‍♀️🧚🏼🧚🏼‍♂️👼🏼🤰🏼🫄🏼🫃🏼🤱🏼👩🏼‍🍼🧑🏼‍🍼👨🏼‍🍼🙇🏼‍♀️🙇🏼🙇🏼‍♂️💁🏼‍♀️💁🏼💁🏼‍♂️🙅🏼‍♀️🙅🏼🙅🏼‍♂️🙆🏼‍♀️🙆🏼🙆🏼‍♂️🙋🏼‍♀️🙋🏼🙋🏼‍♂️🧏🏼‍♀️🧏🏼🧏🏼‍♂️🤦🏼‍♀️🤦🏼🤦🏼‍♂️🤷🏼‍♀️🤷🏼🤷🏼‍♂️🙎🏼‍♀️🙎🏼🙎🏼‍♂️🙍🏼‍♀️🙍🏼🙍🏼‍♂️💇🏼‍♀️💇🏼💇🏼‍♂️💆🏼‍♀️💆🏼💆🏼‍♂️🧖🏼‍♀️🧖🏼🧖🏼‍♂️💃🏼🕺🏼🕴🏼👩🏼‍🦽🧑🏼‍🦽👨🏼‍🦽👩🏼‍🦼🧑🏼‍🦼👨🏼‍🦼🚶🏼‍♀️🚶🏼🚶🏼‍♂️👩🏼‍🦯🧑🏼‍🦯👨🏼‍🦯🧎🏼‍♀️🧎🏼🧎🏼‍♂️🏃🏼‍♀️🏃🏼🏃🏼‍♂️🧍🏼‍♀️🧍🏼🧍🏼‍♂️👭🏼🧑🏼‍🤝‍🧑🏼👬🏼👫🏼🧗🏼‍♀️🧗🏼🧗🏼‍♂️🏇🏼🏂🏼🏌🏼‍♀️🏌🏼🏌🏼‍♂️🏄🏼‍♀️🏄🏼🏄🏼‍♂️🚣🏼‍♀️🚣🏼🚣🏼‍♂️🏊🏼‍♀️🏊🏼🏊🏼‍♂️⛹🏼‍♀️⛹🏼⛹🏼‍♂️🏋🏼‍♀️🏋🏼🏋🏼‍♂️🚴🏼‍♀️🚴🏼🚴🏼‍♂️🚵🏼‍♀️🚵🏼🚵🏼‍♂️🤸🏼‍♀️🤸🏼🤸🏼‍♂️🤽🏼‍♀️🤽🏼🤽🏼‍♂️🤾🏼‍♀️🤾🏼🤾🏼‍♂️🤹🏼‍♀️🤹🏼🤹🏼‍♂️🧘🏼‍♀️🧘🏼🧘🏼‍♂️🛀🏼🛌🏼👋🏽🤚🏽🖐🏽✋🏽🖖🏽👌🏽🤌🏽🤏🏽✌🏽🤞🏽🫰🏽🤟🏽🤘🏽🤙🏽🫵🏽🫱🏽🫲🏽🫸🏽🫷🏽🫳🏽🫴🏽👈🏽👉🏽👆🏽🖕🏽👇🏽☝🏽👍🏽👎🏽✊🏽👊🏽🤛🏽🤜🏽👏🏽🫶🏽🙌🏽👐🏽🤲🏽🙏🏽✍🏽💅🏽🤳🏽💪🏽🦵🏽🦶🏽👂🏽🦻🏽👃🏽👶🏽👧🏽🧒🏽👦🏽👩🏽🧑🏽👨🏽👩🏽‍🦱🧑🏽‍🦱👨🏽‍🦱👩🏽‍🦰🧑🏽‍🦰👨🏽‍🦰👱🏽‍♀️👱🏽👱🏽‍♂️👩🏽‍🦳🧑🏽‍🦳👨🏽‍🦳👩🏽‍🦲🧑🏽‍🦲👨🏽‍🦲🧔🏽‍♀️🧔🏽🧔🏽‍♂️👵🏽🧓🏽👴🏽👲🏽👳🏽‍♀️👳🏽👳🏽‍♂️🧕🏽👮🏽‍♀️👮🏽👮🏽‍♂️👷🏽‍♀️👷🏽👷🏽‍♂️💂🏽‍♀️💂🏽💂🏽‍♂️🕵🏽‍♀️🕵🏽🕵🏽‍♂️👩🏽‍⚕️🧑🏽‍⚕️👨🏽‍⚕️👩🏽‍🌾🧑🏽‍🌾👨🏽‍🌾👩🏽‍🍳🧑🏽‍🍳👨🏽‍🍳👩🏽‍🎓🧑🏽‍🎓👨🏽‍🎓👩🏽‍🎤🧑🏽‍🎤👨🏽‍🎤👩🏽‍🏫🧑🏽‍🏫👨🏽‍🏫👩🏽‍🏭🧑🏽‍🏭👨🏽‍🏭👩🏽‍💻🧑🏽‍💻👨🏽‍💻👩🏽‍💼🧑🏽‍💼👨🏽‍💼👩🏽‍🔧🧑🏽‍🔧👨🏽‍🔧👩🏽‍🔬🧑🏽‍🔬👨🏽‍🔬👩🏽‍🎨🧑🏽‍🎨👨🏽‍🎨👩🏽‍🚒🧑🏽‍🚒👨🏽‍🚒👩🏽‍✈️🧑🏽‍✈️👨🏽‍✈️👩🏽‍🚀🧑🏽‍🚀👨🏽‍🚀👩🏽‍⚖️🧑🏽‍⚖️👨🏽‍⚖️👰🏽‍♀️👰🏽👰🏽‍♂️🤵🏽‍♀️🤵🏽🤵🏽‍♂️👸🏽🫅🏽🤴🏽🥷🏽🦸🏽‍♀️🦸🏽🦸🏽‍♂️🦹🏽‍♀️🦹🏽🦹🏽‍♂️🤶🏽🧑🏽‍🎄🎅🏽🧙🏽‍♀️🧙🏽🧙🏽‍♂️🧝🏽‍♀️🧝🏽🧝🏽‍♂️🧛🏽‍♀️🧛🏽🧛🏽‍♂️🧜🏽‍♀️🧜🏽🧜🏽‍♂️🧚🏽‍♀️🧚🏽🧚🏽‍♂️👼🏽🤰🏽🫄🏽🫃🏽🤱🏽👩🏽‍🍼🧑🏽‍🍼👨🏽‍🍼🙇🏽‍♀️🙇🏽🙇🏽‍♂️💁🏽‍♀️💁🏽💁🏽‍♂️🙅🏽‍♀️🙅🏽🙅🏽‍♂️🙆🏽‍♀️🙆🏽🙆🏽‍♂️🙋🏽‍♀️🙋🏽🙋🏽‍♂️🧏🏽‍♀️🧏🏽🧏🏽‍♂️🤦🏽‍♀️🤦🏽🤦🏽‍♂️🤷🏽‍♀️🤷🏽🤷🏽‍♂️🙎🏽‍♀️🙎🏽🙎🏽‍♂️🙍🏽‍♀️🙍🏽🙍🏽‍♂️💇🏽‍♀️💇🏽💇🏽‍♂️💆🏽‍♀️💆🏽💆🏽‍♂️🧖🏽‍♀️🧖🏽🧖🏽‍♂️💃🏽🕺🏽🕴🏽👩🏽‍🦽🧑🏽‍🦽👨🏽‍🦽👩🏽‍🦼🧑🏽‍🦼👨🏽‍🦼🚶🏽‍♀️🚶🏽🚶🏽‍♂️👩🏽‍🦯🧑🏽‍🦯👨🏽‍🦯🧎🏽‍♀️🧎🏽🧎🏽‍♂️🏃🏽‍♀️🏃🏽🏃🏽‍♂️🧍🏽‍♀️🧍🏽🧍🏽‍♂️👭🏽🧑🏽‍🤝‍🧑🏽👬🏽👫🏽🧗🏽‍♀️🧗🏽🧗🏽‍♂️🏇🏽🏂🏽🏌🏽‍♀️🏌🏽🏌🏽‍♂️🏄🏽‍♀️🏄🏽🏄🏽‍♂️🚣🏽‍♀️🚣🏽🚣🏽‍♂️🏊🏽‍♀️🏊🏽🏊🏽‍♂️⛹🏽‍♀️⛹🏽⛹🏽‍♂️🏋🏽‍♀️🏋🏽🏋🏽‍♂️🚴🏽‍♀️🚴🏽🚴🏽‍♂️🚵🏽‍♀️🚵🏽🚵🏽‍♂️🤸🏽‍♀️🤸🏽🤸🏽‍♂️🤽🏽‍♀️🤽🏽🤽🏽‍♂️🤾🏽‍♀️🤾🏽🤾🏽‍♂️🤹🏽‍♀️🤹🏽🤹🏽‍♂️🧘🏽‍♀️🧘🏽🧘🏽‍♂️🛀🏽🛌🏽👋🏾🤚🏾🖐🏾✋🏾🖖🏾👌🏾🤌🏾🤏🏾✌🏾🤞🏾🫰🏾🤟🏾🤘🏾🤙🏾🫵🏾🫱🏾🫲🏾🫸🏾🫷🏾🫳🏾🫴🏾👈🏾👉🏾👆🏾🖕🏾👇🏾☝🏾👍🏾👎🏾✊🏾👊🏾🤛🏾🤜🏾👏🏾🫶🏾🙌🏾👐🏾🤲🏾🙏🏾✍🏾💅🏾🤳🏾💪🏾🦵🏾🦶🏾👂🏾🦻🏾👃🏾👶🏾👧🏾🧒🏾👦🏾👩🏾🧑🏾👨🏾👩🏾‍🦱🧑🏾‍🦱👨🏾‍🦱👩🏾‍🦰🧑🏾‍🦰👨🏾‍🦰👱🏾‍♀️👱🏾👱🏾‍♂️👩🏾‍🦳🧑🏾‍🦳👨🏾‍🦳👩🏾‍🦲🧑🏾‍🦲👨🏾‍🦲🧔🏾‍♀️🧔🏾🧔🏾‍♂️👵🏾🧓🏾👴🏾👲🏾👳🏾‍♀️👳🏾👳🏾‍♂️🧕🏾👮🏾‍♀️👮🏾👮🏾‍♂️👷🏾‍♀️👷🏾👷🏾‍♂️💂🏾‍♀️💂🏾💂🏾‍♂️🕵🏾‍♀️🕵🏾🕵🏾‍♂️👩🏾‍⚕️🧑🏾‍⚕️👨🏾‍⚕️👩🏾‍🌾🧑🏾‍🌾👨🏾‍🌾👩🏾‍🍳🧑🏾‍🍳👨🏾‍🍳👩🏾‍🎓🧑🏾‍🎓👨🏾‍🎓👩🏾‍🎤🧑🏾‍🎤👨🏾‍🎤👩🏾‍🏫🧑🏾‍🏫👨🏾‍🏫👩🏾‍🏭🧑🏾‍🏭👨🏾‍🏭👩🏾‍💻🧑🏾‍💻👨🏾‍💻👩🏾‍💼🧑🏾‍💼👨🏾‍💼👩🏾‍🔧🧑🏾‍🔧👨🏾‍🔧👩🏾‍🔬🧑🏾‍🔬👨🏾‍🔬👩🏾‍🎨🧑🏾‍🎨👨🏾‍🎨👩🏾‍🚒🧑🏾‍🚒👨🏾‍🚒👩🏾‍✈️🧑🏾‍✈️👨🏾‍✈️👩🏾‍🚀🧑🏾‍🚀👨🏾‍🚀👩🏾‍⚖️🧑🏾‍⚖️👨🏾‍⚖️👰🏾‍♀️👰🏾👰🏾‍♂️🤵🏾‍♀️🤵🏾🤵🏾‍♂️👸🏾🫅🏾🤴🏾🥷🏾🦸🏾‍♀️🦸🏾🦸🏾‍♂️🦹🏾‍♀️🦹🏾🦹🏾‍♂️🤶🏾🧑🏾‍🎄🎅🏾🧙🏾‍♀️🧙🏾🧙🏾‍♂️🧝🏾‍♀️🧝🏾🧝🏾‍♂️🧛🏾‍♀️🧛🏾🧛🏾‍♂️🧜🏾‍♀️🧜🏾🧜🏾‍♂️🧚🏾‍♀️🧚🏾🧚🏾‍♂️👼🏾🤰🏾🫄🏾🫃🏾🤱🏾👩🏾‍🍼🧑🏾‍🍼👨🏾‍🍼🙇🏾‍♀️🙇🏾🙇🏾‍♂️💁🏾‍♀️💁🏾💁🏾‍♂️🙅🏾‍♀️🙅🏾🙅🏾‍♂️🙆🏾‍♀️🙆🏾🙆🏾‍♂️🙋🏾‍♀️🙋🏾🙋🏾‍♂️🧏🏾‍♀️🧏🏾🧏🏾‍♂️🤦🏾‍♀️🤦🏾🤦🏾‍♂️🤷🏾‍♀️🤷🏾🤷🏾‍♂️🙎🏾‍♀️🙎🏾🙎🏾‍♂️🙍🏾‍♀️🙍🏾🙍🏾‍♂️💇🏾‍♀️💇🏾💇🏾‍♂️💆🏾‍♀️💆🏾💆🏾‍♂️🧖🏾‍♀️🧖🏾🧖🏾‍♂️💃🏾🕺🏾🕴🏿👩🏾‍🦽🧑🏾‍🦽👨🏾‍🦽👩🏾‍🦼🧑🏾‍🦼👨🏾‍🦼🚶🏾‍♀️🚶🏾🚶🏾‍♂️👩🏾‍🦯🧑🏾‍🦯👨🏾‍🦯🧎🏾‍♀️🧎🏾🧎🏾‍♂️🏃🏾‍♀️🏃🏾🏃🏾‍♂️🧍🏾‍♀️🧍🏾🧍🏾‍♂️👭🏾🧑🏾‍🤝‍🧑🏾👬🏾👫🏾🧗🏾‍♀️🧗🏾🧗🏾‍♂️🏇🏾🏂🏾🏌🏾‍♀️🏌🏾🏌🏾‍♂️🏄🏾‍♀️🏄🏾🏄🏾‍♂️🚣🏾‍♀️🚣🏾🚣🏾‍♂️🏊🏾‍♀️🏊🏾🏊🏾‍♂️⛹🏾‍♀️⛹🏾⛹🏾‍♂️🏋🏾‍♀️🏋🏾🏋🏾‍♂️🚴🏾‍♀️🚴🏾🚴🏾‍♂️🚵🏾‍♀️🚵🏾🚵🏾‍♂️🤸🏾‍♀️🤸🏾🤸🏾‍♂️🤽🏾‍♀️🤽🏾🤽🏾‍♂️🤾🏾‍♀️🤾🏾🤾🏾‍♂️🤹🏾‍♀️🤹🏾🤹🏾‍♂️🧘🏾‍♀️🧘🏾🧘🏾‍♂️🛀🏾🛌🏾👋🏿🤚🏿🖐🏿✋🏿🖖🏿👌🏿🤌🏿🤏🏿✌🏿🤞🏿🫰🏿🤟🏿🤘🏿🤙🏿🫵🏿🫱🏿🫲🏿🫸🏿🫷🏿🫳🏿🫴🏿👈🏿👉🏿👆🏿🖕🏿👇🏿☝🏿👍🏿👎🏿✊🏿👊🏿🤛🏿🤜🏿👏🏿🫶🏿🙌🏿👐🏿🤲🏿🙏🏿✍🏿💅🏿🤳🏿💪🏿🦵🏿🦶🏿👂🏿🦻🏿👃🏿👶🏿👧🏿🧒🏿👦🏿👩🏿🧑🏿👨🏿👩🏿‍🦱🧑🏿‍🦱👨🏿‍🦱👩🏿‍🦰🧑🏿‍🦰👨🏿‍🦰👱🏿‍♀️👱🏿👱🏿‍♂️👩🏿‍🦳🧑🏿‍🦳👨🏿‍🦳👩🏿‍🦲🧑🏿‍🦲👨🏿‍🦲🧔🏿‍♀️🧔🏿🧔🏿‍♂️👵🏿🧓🏿👴🏿👲🏿👳🏿‍♀️👳🏿👳🏿‍♂️🧕🏿👮🏿‍♀️👮🏿👮🏿‍♂️👷🏿‍♀️👷🏿👷🏿‍♂️💂🏿‍♀️💂🏿💂🏿‍♂️🕵🏿‍♀️🕵🏿🕵🏿‍♂️👩🏿‍⚕️🧑🏿‍⚕️👨🏿‍⚕️👩🏿‍🌾🧑🏿‍🌾👨🏿‍🌾👩🏿‍🍳🧑🏿‍🍳👨🏿‍🍳👩🏿‍🎓🧑🏿‍🎓👨🏿‍🎓👩🏿‍🎤🧑🏿‍🎤👨🏿‍🎤👩🏿‍🏫🧑🏿‍🏫👨🏿‍🏫👩🏿‍🏭🧑🏿‍🏭👨🏿‍🏭👩🏿‍💻🧑🏿‍💻👨🏿‍💻👩🏿‍💼🧑🏿‍💼👨🏿‍💼👩🏿‍🔧🧑🏿‍🔧👨🏿‍🔧👩🏿‍🔬🧑🏿‍🔬👨🏿‍🔬👩🏿‍🎨🧑🏿‍🎨👨🏿‍🎨👩🏿‍🚒🧑🏿‍🚒👨🏿‍🚒👩🏿‍✈️🧑🏿‍✈️👨🏿‍✈️👩🏿‍🚀🧑🏿‍🚀👨🏿‍🚀👩🏿‍⚖️🧑🏿‍⚖️👨🏿‍⚖️👰🏿‍♀️👰🏿👰🏿‍♂️🤵🏿‍♀️🤵🏿🤵🏿‍♂️👸🏿🫅🏿🤴🏿🥷🏿🦸🏿‍♀️🦸🏿🦸🏿‍♂️🦹🏿‍♀️🦹🏿🦹🏿‍♂️🤶🏿🧑🏿‍🎄🎅🏿🧙🏿‍♀️🧙🏿🧙🏿‍♂️🧝🏿‍♀️🧝🏿🧝🏿‍♂️🧛🏿‍♀️🧛🏿🧛🏿‍♂️🧜🏿‍♀️🧜🏿🧜🏿‍♂️🧚🏿‍♀️🧚🏿🧚🏿‍♂️👼🏿🤰🏿🫄🏿🫃🏿🤱🏿👩🏿‍🍼🧑🏿‍🍼👨🏿‍🍼🙇🏿‍♀️🙇🏿🙇🏿‍♂️💁🏿‍♀️💁🏿💁🏿‍♂️🙅🏿‍♀️🙅🏿🙅🏿‍♂️🙆🏿‍♀️🙆🏿🙆🏿‍♂️🙋🏿‍♀️🙋🏿🙋🏿‍♂️🧏🏿‍♀️🧏🏿🧏🏿‍♂️🤦🏿‍♀️🤦🏿🤦🏿‍♂️🤷🏿‍♀️🤷🏿🤷🏿‍♂️🙎🏿‍♀️🙎🏿🙎🏿‍♂️🙍🏿‍♀️🙍🏿🙍🏿‍♂️💇🏿‍♀️💇🏿💇🏿‍♂️💆🏿‍♀️💆🏿💆🏿‍♂️🧖🏿‍♀️🧖🏿🧖🏿‍♂️💃🏿🕺🏿🕴🏿👩🏿‍🦽🧑🏿‍🦽👨🏿‍🦽👩🏿‍🦼🧑🏿‍🦼👨🏿‍🦼🚶🏿‍♀️🚶🏿🚶🏿‍♂️👩🏿‍🦯🧑🏿‍🦯👨🏿‍🦯🧎🏿‍♀️🧎🏿🧎🏿‍♂️🏃🏿‍♀️🏃🏿🏃🏿‍♂️🧍🏿‍♀️🧍🏿🧍🏿‍♂️👭🏿🧑🏿‍🤝‍🧑🏿👬🏿👫🏿🧗🏿‍♀️🧗🏿🧗🏿‍♂️🏇🏿🏂🏿🏌🏿‍♀️🏌🏿🏌🏿‍♂️🏄🏿‍♀️🏄🏿🏄🏿‍♂️🚣🏿‍♀️🚣🏿🚣🏿‍♂️🏊🏿‍♀️🏊🏿🏊🏿‍♂️⛹🏿‍♀️⛹🏿⛹🏿‍♂️🏋🏿‍♀️🏋🏿🏋🏿‍♂️🚴🏿‍♀️🚴🏿🚴🏿‍♂️🚵🏿‍♀️🚵🏿🚵🏿‍♂️🤸🏿‍♀️🤸🏿🤸🏿‍♂️🤽🏿‍♀️🤽🏿🤽🏿‍♂️🤾🏿‍♀️🤾🏿🤾🏿‍♂️🤹🏿‍♀️🤹🏿🤹🏿‍♂️🧘🏿‍♀️🧘🏿🧘🏿‍♂️🛀🏿🛌🏿🐶🐱🐭🐹🐰🦊🐻🐼🐻‍❄️🐨🐯🦁🐮🐷🐽🐸🐵🙈🙉🙊🐒🐔🐧🐦🐦‍⬛🐤🐣🐥🦆🦅🦉🦇🐺🐗🐴🦄🐝🪱🐛🦋🐌🐞🐜🪰🪲🪳🦟🦗🕷🕸🦂🐢🐍🦎🦖🦕🐙🦑🦐🦞🦀🪼🪸🐡🐠🐟🐬🐳🐋🦈🐊🐅🐆🦓🫏🦍🦧🦣🐘🦛🦏🐪🐫🦒🦘🦬🐃🐂🐄🐎🐖🐏🐑🦙🐐🦌🫎🐕🐩🦮🐕‍🦺🐈🐈‍⬛🪽🪶🐓🦃🦤🦚🦜🦢🪿🦩🕊🐇🦝🦨🦡🦫🦦🦥🐁🐀🐿🦔🐾🐉🐲🌵🎄🌲🌳🌴🪹🪺🪵🌱🌿☘️🍀🎍🪴🎋🍃🍂🍁🍄🐚🪨🌾💐🌷🪷🌹🥀🌺🌸🪻🌼🌻🌞🌝🌛🌜🌚🌕🌖🌗🌘🌑🌒🌓🌔🌙🌎🌍🌏🪐💫⭐️🌟✨⚡️☄️💥🔥🌪🌈☀️🌤⛅️🌥☁️🌦🌧⛈🌩🌨❄️☃️⛄️🌬💨💧💦🫧☔️☂️🌊🍏🍎🍐🍊🍋🍌🍉🍇🍓🫐🍈🍒🍑🥭🍍🥥🥝🍅🍆🥑🥦🫛🥬🥒🌶🫑🌽🥕🫒🧄🧅🫚🥔🍠🫘🥐🥯🍞🥖🥨🧀🥚🍳🧈🥞🧇🥓🥩🍗🍖🦴🌭🍔🍟🍕🫓🥪🥙🧆🌮🌯🫔🥗🥘🫕🥫🍝🍜🍲🍛🍣🍱🥟🦪🍤🍙🍚🍘🍥🥠🥮🍢🍡🍧🍨🍦🥧🧁🍰🎂🍮🍭🍬🍫🍿🍩🍪🌰🥜🍯🥛🍼🫖☕️🍵🧃🥤🧋🫙🍶🍺🍻🥂🍷🫗🥃🍸🍹🧉🍾🧊🥄🍴🍽🥣🥡🥢🧂⚽️🏀🏈⚾️🥎🎾🏐🏉🥏🎱🪀🏓🏸🏒🏑🥍🏏🪃🥅⛳️🪁🏹🎣🤿🥊🥋🎽🛹🛼🛷⛸🥌🎿⛷🏂🪂🏋️‍♀️🏋️🏋️‍♂️🤼‍♀️🤼🤼‍♂️🤸‍♀️🤸🤸‍♂️⛹️‍♀️⛹️⛹️‍♂️🤺🤾‍♀️🤾🤾‍♂️🏌️‍♀️🏌️🏌️‍♂️🏇🧘‍♀️🧘🧘‍♂️🏄‍♀️🏄🏄‍♂️🏊‍♀️🏊🏊‍♂️🤽‍♀️🤽🤽‍♂️🚣‍♀️🚣🚣‍♂️🧗‍♀️🧗🧗‍♂️🚵‍♀️🚵🚵‍♂️🚴‍♀️🚴🚴‍♂️🏆🥇🥈🥉🏅🎖🏵🎗🎫🎟🎪🤹🤹‍♂️🤹‍♀️🎭🩰🎨🎬🎤🎧🎼🎹🥁🪘🪇🎷🎺🪗🎸🪕🎻🪈🎲♟🎯🎳🎮🎰🧩🚗🚕🚙🚌🚎🏎🚓🚑🚒🚐🛻🚚🚛🚜🦯🦽🦼🛴🚲🛵🏍🛺🚨🚔🚍🚘🚖🛞🚡🚠🚟🚃🚋🚞🚝🚄🚅🚈🚂🚆🚇🚊🚉✈️🛫🛬🛩💺🛰🚀🛸🚁🛶⛵️🚤🛥🛳⛴🚢⚓️🛟🪝⛽️🚧🚦🚥🚏🗺🗿🗽🗼🏰🏯🏟🎡🎢🛝🎠⛲️⛱🏖🏝🏜🌋⛰🏔🗻🏕⛺️🛖🏠🏡🏘🏚🏗🏭🏢🏬🏣🏤🏥🏦🏨🏪🏫🏩💒🏛⛪️🕌🕍🛕🕋⛩🛤🛣🗾🎑🏞🌅🌄🌠🎇🎆🌇🌆🏙🌃🌌🌉🌁⌚️📱📲💻🖥🖨🖱🖲🕹🗜💽💾💿📀📼📷📸📹🎥📽🎞📞☎️📟📠📺📻🎙🎚🎛🧭⏱⏲⏰🕰⌛️⏳📡🔋🪫🔌💡🔦🕯🪔🧯🛢🛍️💸💵💴💶💷🪙💰💳💎⚖️🪮🪜🧰🪛🔧🔨⚒🛠⛏🪚🔩⚙️🪤🧱⛓🧲🔫💣🧨🪓🔪🗡⚔️🛡🚬⚰️🪦⚱️🏺🔮📿🧿🪬💈⚗️🔭🔬🕳🩹🩺🩻🩼💊💉🩸🧬🦠🧫🧪🌡🧹🪠🧺🧻🚽🚰🚿🛁🛀🧼🪥🪒🧽🪣🧴🛎🔑🗝🚪🪑🛋🛏🛌🧸🪆🖼🪞🪟🛍🛒🎁🎈🎏🎀🪄🪅🎊🎉🪩🎎🏮🎐🧧✉️📩📨📧💌📥📤📦🏷🪧📪📫📬📭📮📯📜📃📄📑🧾📊📈📉🗒🗓📆📅🗑🪪📇🗃🗳🗄📋📁📂🗂🗞📰📓📔📒📕📗📘📙📚📖🔖🧷🔗📎🖇📐📏🧮📌📍✂️🖊🖋✒️🖌🖍📝✏️🔍🔎🔏🔐🔒🔓❤️🩷🧡💛💚💙🩵💜🖤🩶🤍🤎❤️‍🔥❤️‍🩹💔❣️💕💞💓💗💖💘💝💟☮️✝️☪️🪯🕉☸️✡️🔯🕎☯️☦️🛐⛎♈️♉️♊️♋️♌️♍️♎️♏️♐️♑️♒️♓️🆔⚛️🉑☢️☣️📴📳🈶🈚️🈸🈺🈷️✴️🆚💮🉐㊙️㊗️🈴🈵🈹🈲🅰️🅱️🆎🆑🅾️🆘❌⭕️🛑⛔️📛🚫💯💢♨️🚷🚯🚳🚱🔞📵🚭❗️❕❓❔🔅🔆〽️⚠️🚸🔱⚜️🔰♻️✅🈯️💹❇️✳️❎🌐💠Ⓜ️🌀💤🏧🚾♿️🅿️🛗🈳🈂️🛂🛃🛄🛅🚹🚺🚼⚧🚻🚮🎦🛜📶🈁🔣ℹ️🔤🔡🔠🆖🆗🆙🆒🆕🆓️⃣️⃣️⃣️⃣️⃣️⃣️⃣️⃣️⃣️⃣🔟🔢#️⃣*️⃣⏸⏯⏹⏺⏭⏮⏩⏪⏫⏬🔼🔽➡️⬅️⬆️⬇️⤴️⤵️🔀🔁🔂🔄🔃🎵🎶➕➖➗🟰♾💲💱〰️➰➿🔚🔙🔛🔝🔜☑️🔘🔴🟠🟡🟢🔵🟣⚫️⚪️🟤🔺🔻🔸🔹🔶🔷🔳🔲▪️▫️◾️◽️◼️◻️🟥🟧🟨🟩🟦🟪⬛️⬜️🟫🔈🔇🔉🔊🔔🔕📣📢👁‍🗨💬💭🗯♠️♣️♥️♦️🃏🎴🀄️🕐🕑🕒🕓🕔🕕🕖🕗🕘🕙🕚🕛🕜🕝🕞🕟🕠🕡🕢🕣🕤🕥🕦🕧🏳️🏴🏁🚩🏳️‍🌈🏳️‍⚧️🏴‍☠️🇦🇫🇦🇽🇦🇱🇩🇿🇦🇸🇦🇩🇦🇴🇦🇮🇦🇶🇦🇬🇦🇷🇦🇲🇦🇼🇦🇺🇦🇹🇦🇿🇧🇸🇧🇭🇧🇩🇧🇧🇧🇾🇧🇪🇧🇿🇧🇯🇧🇲🇧🇹🇧🇴🇧🇦🇧🇼🇧🇷🇮🇴🇻🇬🇧🇳🇧🇬🇧🇫🇧🇮🇰🇭🇨🇲🇨🇦🇮🇨🇨🇻🇧🇶🇰🇾🇨🇫🇹🇩🇨🇱🇨🇳🇨🇽🇨🇨🇨🇴🇰🇲🇨🇬🇨🇩🇨🇰🇨🇷🇨🇮🇭🇷🇨🇺🇨🇼🇨🇾🇨🇿🇩🇰🇩🇯🇩🇲🇩🇴🇪🇨🇪🇬🇸🇻🇬🇶🇪🇷🇪🇪🇪🇹🇪🇺🇫🇰🇫🇴🇫🇯🇫🇮🇫🇷🇬🇫🇵🇫🇹🇫🇬🇦🇬🇲🇬🇪🇩🇪🇬🇭🇬🇮🇬🇷🇬🇱🇬🇩🇬🇵🇬🇺🇬🇹🇬🇬🇬🇳🇬🇼🇬🇾🇭🇹🇭🇳🇭🇰🇭🇺🇮🇸🇮🇳🇮🇩🇮🇷🇮🇶🇮🇪🇮🇲🇮🇱🇮🇹🇯🇲🇯🇵🎌🇯🇪🇯🇴🇰🇿🇰🇪🇰🇮🇽🇰🇰🇼🇰🇬🇱🇦🇱🇻🇱🇧🇱🇸🇱🇷🇱🇾🇱🇮🇱🇹🇱🇺🇲🇴🇲🇰🇲🇬🇲🇼🇲🇾🇲🇻🇲🇱🇲🇹🇲🇭🇲🇶🇲🇷🇲🇺🇾🇹🇲🇽🇫🇲🇲🇩🇲🇨🇲🇳🇲🇪🇲🇸🇲🇦🇲🇿🇲🇲🇳🇦🇳🇷🇳🇵🇳🇱🇳🇨🇳🇿🇳🇮🇳🇪🇳🇬🇳🇺🇳🇫🇰🇵🇲🇵🇳🇴🇴🇲🇵🇰🇵🇼🇵🇸🇵🇦🇵🇬🇵🇾🇵🇪🇵🇭🇵🇳🇵🇱🇵🇹🇵🇷🇶🇦🇷🇪🇷🇴🇷🇺🇷🇼🇼🇸🇸🇲🇸🇦🇸🇳🇷🇸🇸🇨🇸🇱🇸🇬🇸🇽🇸🇰🇸🇮🇬🇸🇸🇧🇸🇴🇿🇦🇰🇷🇸🇸🇪🇸🇱🇰🇧🇱🇸🇭🇰🇳🇱🇨🇵🇲🇻🇨🇸🇩🇸🇷🇸🇿🇸🇪🇨🇭🇸🇾🇹🇼🇹🇯🇹🇿🇹🇭🇹🇱🇹🇬🇹🇰🇹🇴🇹🇹🇹🇳🇹🇷🇹🇲🇹🇨🇹🇻🇻🇮🇺🇬🇺🇦🇦🇪🇬🇧🏴󠁧󠁢󠁥󠁮󠁧󠁿🏴󠁧󠁢󠁳󠁣󠁴󠁿🏴󠁧󠁢󠁷󠁬󠁳󠁿🇺🇳🇺🇸🇺🇾🇺🇿🇻🇺🇻🇦🇻🇪🇻🇳🇼🇫🇪🇭🇾🇪🇿🇲🇿🇼😃💁🐻🌻🍔🍹🎷⚽️🚘🌇💡🎉💖🔣🎌🏳️‍🌈🫨🩷🩵🩶🫸🫸🏻🫸🏼🫸🏽🫸🏾🫸🏿🫷🫷🏻🫷🏼🫷🏽🫷🏾🫷🏿🫏🫎🪿🐦‍⬛🪽🪼🪻🫛🫚🪭🪮🪈🪇🪯🛜🫠🫢🫣🫡🫥🫤🥹🫱🫱🏻🫱🏼🫱🏽🫱🏾🫱🏿🫲🫲🏻🫲🏼🫲🏽🫲🏾🫲🏿🫳🫳🏻🫳🏼🫳🏽🫳🏾🫳🏿🫴🫴🏻🫴🏼🫴🏽🫴🏾🫴🏿🫰🫰🏻🫰🏼🫰🏽🫰🏾🫰🏿🫵🫵🏻🫵🏼🫵🏽🫵🏾🫵🏿🫶🫶🏻🫶🏼🫶🏽🫶🏾🫶🏿🤝🏻🤝🏼🤝🏽🤝🏾🤝🏿🫱🏻‍🫲🏼🫱🏻‍🫲🏽🫱🏻‍🫲🏾🫱🏻‍🫲🏿🫱🏼‍🫲🏻🫱🏼‍🫲🏽🫱🏼‍🫲🏾🫱🏼‍🫲🏿🫱🏽‍🫲🏻🫱🏽‍🫲🏼🫱🏽‍🫲🏾🫱🏽‍🫲🏿🫱🏾‍🫲🏻🫱🏾‍🫲🏼🫱🏾‍🫲🏽🫱🏾‍🫲🏿🫱🏿‍🫲🏻🫱🏿‍🫲🏼🫱🏿‍🫲🏽🫱🏿‍🫲🏾🫦🫅🫅🏻🫅🏼🫅🏽🫅🏾🫅🏿🫃🫃🏻🫃🏼🫃🏽🫃🏾🫃🏿🫄🫄🏻🫄🏼🫄🏽🫄🏾🫄🏿🧌🪸🪷🪹🪺🫘🫗🫙🛝🛞🛟🪬🪩🪫🩼🩻🫧🪪🟰😮‍💨😵‍💫😶‍🌫️❤️‍🔥❤️‍🩹🧔‍♀️🧔🏻‍♀️🧔🏼‍♀️🧔🏽‍♀️🧔🏾‍♀️🧔🏿‍♀️🧔‍♂️🧔🏻‍♂️🧔🏼‍♂️🧔🏽‍♂️🧔🏾‍♂️🧔🏿‍♂️💑🏻💑🏼💑🏽💑🏾💑🏿💏🏻💏🏼💏🏽💏🏾💏🏿👨🏻‍❤️‍👨🏻👨🏻‍❤️‍👨🏼👨🏻‍❤️‍👨🏽👨🏻‍❤️‍👨🏾👨🏻‍❤️‍👨🏿👨🏼‍❤️‍👨🏻👨🏼‍❤️‍👨🏼👨🏼‍❤️‍👨🏽👨🏼‍❤️‍👨🏾👨🏼‍❤️‍👨🏿👨🏽‍❤️‍👨🏻👨🏽‍❤️‍👨🏼👨🏽‍❤️‍👨🏽👨🏽‍❤️‍👨🏾👨🏽‍❤️‍👨🏿👨🏾‍❤️‍👨🏻👨🏾‍❤️‍👨🏼👨🏾‍❤️‍👨🏽👨🏾‍❤️‍👨🏾👨🏾‍❤️‍👨🏿👨🏿‍❤️‍👨🏻👨🏿‍❤️‍👨🏼👨🏿‍❤️‍👨🏽👨🏿‍❤️‍👨🏾👨🏿‍❤️‍👨🏿👩🏻‍❤️‍👨🏻👩🏻‍❤️‍👨🏼👩🏻‍❤️‍👨🏽👩🏻‍❤️‍👨🏾👩🏻‍❤️‍👨🏿👩🏻‍❤️‍👩🏻👩🏻‍❤️‍👩🏼👩🏻‍❤️‍👩🏽👩🏻‍❤️‍👩🏾👩🏻‍❤️‍👩🏿👩🏼‍❤️‍👨🏻👩🏼‍❤️‍👨🏼👩🏼‍❤️‍👨🏽👩🏼‍❤️‍👨🏾👩🏼‍❤️‍👨🏿👩🏼‍❤️‍👩🏻👩🏼‍❤️‍👩🏼👩🏼‍❤️‍👩🏽👩🏼‍❤️‍👩🏾👩🏼‍❤️‍👩🏿👩🏽‍❤️‍👨🏻👩🏽‍❤️‍👨🏼👩🏽‍❤️‍👨🏽👩🏽‍❤️‍👨🏾👩🏽‍❤️‍👨🏿👩🏽‍❤️‍👩🏻👩🏽‍❤️‍👩🏼👩🏽‍❤️‍👩🏽👩🏽‍❤️‍👩🏾👩🏽‍❤️‍👩🏿👩🏾‍❤️‍👨🏻👩🏾‍❤️‍👨🏼👩🏾‍❤️‍👨🏽👩🏾‍❤️‍👨🏾👩🏾‍❤️‍👨🏿👩🏾‍❤️‍👩🏻👩🏾‍❤️‍👩🏼👩🏾‍❤️‍👩🏽👩🏾‍❤️‍👩🏾👩🏾‍❤️‍👩🏿👩🏿‍❤️‍👨🏻👩🏿‍❤️‍👨🏼👩🏿‍❤️‍👨🏽👩🏿‍❤️‍👨🏾👩🏿‍❤️‍👨🏿👩🏿‍❤️‍👩🏻👩🏿‍❤️‍👩🏼👩🏿‍❤️‍👩🏽👩🏿‍❤️‍👩🏾👩🏿‍❤️‍👩🏿🧑🏻‍❤️‍🧑🏼🧑🏻‍❤️‍🧑🏽🧑🏻‍❤️‍🧑🏾🧑🏻‍❤️‍🧑🏿🧑🏼‍❤️‍🧑🏻🧑🏼‍❤️‍🧑🏽🧑🏼‍❤️‍🧑🏾🧑🏼‍❤️‍🧑🏿🧑🏽‍❤️‍🧑🏻🧑🏽‍❤️‍🧑🏼🧑🏽‍❤️‍🧑🏾🧑🏽‍❤️‍🧑🏿🧑🏾‍❤️‍🧑🏻🧑🏾‍❤️‍🧑🏼🧑🏾‍❤️‍🧑🏽🧑🏾‍❤️‍🧑🏿🧑🏿‍❤️‍🧑🏻🧑🏿‍❤️‍🧑🏼🧑🏿‍❤️‍🧑🏽🧑🏿‍❤️‍🧑🏾👨🏻‍❤️‍💋‍👨🏻👨🏻‍❤️‍💋‍👨🏼👨🏻‍❤️‍💋‍👨🏽👨🏻‍❤️‍💋‍👨🏾👨🏻‍❤️‍💋‍👨🏿👨🏼‍❤️‍💋‍👨🏻👨🏼‍❤️‍💋‍👨🏼👨🏼‍❤️‍💋‍👨🏽👨🏼‍❤️‍💋‍👨🏾👨🏼‍❤️‍💋‍👨🏿👨🏽‍❤️‍💋‍👨🏻👨🏽‍❤️‍💋‍👨🏼👨🏽‍❤️‍💋‍👨🏽👨🏽‍❤️‍💋‍👨🏾👨🏽‍❤️‍💋‍👨🏿👨🏾‍❤️‍💋‍👨🏻👨🏾‍❤️‍💋‍👨🏼👨🏾‍❤️‍💋‍👨🏽👨🏾‍❤️‍💋‍👨🏾👨🏾‍❤️‍💋‍👨🏿👨🏿‍❤️‍💋‍👨🏻👨🏿‍❤️‍💋‍👨🏼👨🏿‍❤️‍💋‍👨🏽👨🏿‍❤️‍💋‍👨🏾👨🏿‍❤️‍💋‍👨🏿👩🏻‍❤️‍💋‍👨🏻👩🏻‍❤️‍💋‍👨🏼👩🏻‍❤️‍💋‍👨🏽👩🏻‍❤️‍💋‍👨🏾👩🏻‍❤️‍💋‍👨🏿👩🏻‍❤️‍💋‍👩🏻👩🏻‍❤️‍💋‍👩🏼👩🏻‍❤️‍💋‍👩🏽👩🏻‍❤️‍💋‍👩🏾👩🏻‍❤️‍💋‍👩🏿👩🏼‍❤️‍💋‍👨🏻👩🏼‍❤️‍💋‍👨🏼👩🏼‍❤️‍💋‍👨🏽👩🏼‍❤️‍💋‍👨🏾👩🏼‍❤️‍💋‍👨🏿👩🏼‍❤️‍💋‍👩🏻👩🏼‍❤️‍💋‍👩🏼👩🏼‍❤️‍💋‍👩🏽👩🏼‍❤️‍💋‍👩🏾👩🏼‍❤️‍💋‍👩🏿👩🏽‍❤️‍💋‍👨🏻👩🏽‍❤️‍💋‍👨🏼👩🏽‍❤️‍💋‍👨🏽👩🏽‍❤️‍💋‍👨🏾👩🏽‍❤️‍💋‍👨🏿👩🏽‍❤️‍💋‍👩🏻👩🏽‍❤️‍💋‍👩🏼👩🏽‍❤️‍💋‍👩🏽👩🏽‍❤️‍💋‍👩🏾👩🏽‍❤️‍💋‍👩🏿👩🏾‍❤️‍💋‍👨🏻👩🏾‍❤️‍💋‍👨🏼👩🏾‍❤️‍💋‍👨🏽👩🏾‍❤️‍💋‍👨🏾👩🏾‍❤️‍💋‍👨🏿👩🏾‍❤️‍💋‍👩🏻👩🏾‍❤️‍💋‍👩🏼👩🏾‍❤️‍💋‍👩🏽👩🏾‍❤️‍💋‍👩🏾👩🏾‍❤️‍💋‍👩🏿👩🏿‍❤️‍💋‍👨🏻👩🏿‍❤️‍💋‍👨🏼👩🏿‍❤️‍💋‍👨🏽👩🏿‍❤️‍💋‍👨🏾👩🏿‍❤️‍💋‍👨🏿👩🏿‍❤️‍💋‍👩🏻👩🏿‍❤️‍💋‍👩🏼👩🏿‍❤️‍💋‍👩🏽👩🏿‍❤️‍💋‍👩🏾👩🏿‍❤️‍💋‍👩🏿🧑🏻‍❤️‍💋‍🧑🏼🧑🏻‍❤️‍💋‍🧑🏽🧑🏻‍❤️‍💋‍🧑🏾🧑🏻‍❤️‍💋‍🧑🏿🧑🏼‍❤️‍💋‍🧑🏻🧑🏼‍❤️‍💋‍🧑🏽🧑🏼‍❤️‍💋‍🧑🏾🧑🏼‍❤️‍💋‍🧑🏿🧑🏽‍❤️‍💋‍🧑🏻🧑🏽‍❤️‍💋‍🧑🏼🧑🏽‍❤️‍💋‍🧑🏾🧑🏽‍❤️‍💋‍🧑🏿🧑🏾‍❤️‍💋‍🧑🏻🧑🏾‍❤️‍💋‍🧑🏼🧑🏾‍❤️‍💋‍🧑🏽🧑🏾‍❤️‍💋‍🧑🏿🧑🏿‍❤️‍💋‍🧑🏻🧑🏿‍❤️‍💋‍🧑🏼🧑🏿‍❤️‍💋‍🧑🏽🧑🏿‍❤️‍💋‍🧑🏾';
const otherCharacters =
  '\t\n !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~¡¢£§ª«°±²³¶¹º¼½¾×æ÷–‘“•…‹›⁰ⁱ⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾ⁿ€←↑→↓↔↕↖↗↘↙↺↻∞≠≤≥⏏─━│┃┌┏┐┓└┗┘┛├┡┣┤┩┫┬┳┴┻┼╇╋█▏▕▞▲▶▼◀◉◯✔✖❯⫘';

const regex = new RegExp(result, 'g');

const testResultA = emojis.replace(regex, '');
const testResultB = [...(otherCharacters.match(regex) || [])].join('');

console.log(
  'Important to match (but isnt):',
  JSON.stringify(testResultA),
  `(${100 - MathsTools.roundTo(0.001, (testResultA.length / otherCharacters.length) * 100)}%)`
);
console.log(
  'Important to not match (but is):',
  JSON.stringify(testResultB),
  `(${MathsTools.roundTo(0.001, ((otherCharacters.length - testResultB.length) / otherCharacters.length) * 100)}%)`
);