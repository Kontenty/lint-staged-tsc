function isBigEnough(array: number[], limit: number) {
  return array.filter((number) => number >= limit);
}

isBigEnough([10, 20, 4, 18], 11);
