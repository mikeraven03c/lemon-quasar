export function getOptions(options) {
  if (options) {
    let items = options.split("|");

    for (let x = 0; x < items.length; x++) {
      items[x] = items[x].trim();
    }
    return items;
  }
  return [];
}
