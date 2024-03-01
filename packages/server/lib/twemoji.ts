/**
 * cribbed from:
 * https://github.com/open-sauced/opengraph/blob/1cea5b470f27c566ad1dcd8de4093240fce30369/src/utils/twemoji.ts#L58
 *
 * which in turn takes inspiration from:
 * https://unpkg.com/twemoji@13.1.0/dist/twemoji.esm.js
 * and is MIT licensed by Twitter, Inc.
 */

const U200D = String.fromCharCode(8205);
const UFE0Fg = /\uFE0F/g;

export function getIconCode(char: string) {
  return toCodePoint(!char.includes(U200D) ? char.replace(UFE0Fg, "") : char);
}

function toCodePoint(unicodeSurrogates: string) {
  const r = [];
  let c = 0;
  let i = 0;
  let p = 0;

  while (i < unicodeSurrogates.length) {
    c = unicodeSurrogates.charCodeAt(i++);
    if (p) {
      r.push((65536 + ((p - 55296) << 10) + (c - 56320)).toString(16));
      p = 0;
    } else if (55296 <= c && c <= 56319) {
      p = c;
    } else {
      r.push(c.toString(16));
    }
  }
  return r.join("-");
}

export const twemojiURL = (code: string) => {
  return `https://twemoji.maxcdn.com/v/latest/svg/${code.toLowerCase()}.svg`;
};

const emojiCache: Record<string, Promise<string>> = {};

export async function loadEmoji(code: string) {
  if (code in emojiCache) {
    return emojiCache[code];
  }

  return (emojiCache[code] = fetch(twemojiURL(code)).then(async (r) =>
    r.text()
  ));
}
