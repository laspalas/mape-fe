export function humanize(str) {
  if (!str) {
    return '';
  }

  str = str.toString();
  return str
    .replace(/^[\s_]+|[\s_]+$/g, '')
    .replace(/[_\s]+/g, ' ')
    .replace(/^[a-z]/, m => m.toUpperCase());
}
