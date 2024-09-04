export function isNumeric(value) {
  return !isNaN(parseInt(value)) && isFinite(value)
}
