// 
function bcCalculate(f1, f2, operation) {
  const operand1 = resolveFloat(f1)
  const operand2 = resolveFloat(f2)
  if (!operand1.decimal && !operand2.decimal) {
    let r = 0
    switch (operation) {
      case '+':
        r = Number(operand1.integer) + Number(operand2.integer)
        break
      case '-':
        r = Number(operand1.integer) - Number(operand2.integer)
        break
      case '*':
        r = Number(operand1.integer) * Number(operand2.integer)
        break
      case '/':
        r = Number(operand1.integer) / Number(operand2.integer)
        break
    }
    return r.toFixed(2)
  }

  const decimal1 = operand1.decimal.split('')
  const decimal2 = operand2.decimal.split('')

  let pow = 0
  let cnt = 0
  if (decimal1.length > decimal2.length) {
    pow = decimal1.length
    cnt = decimal1.length - decimal2.length
    for (let i = 0; i < cnt; i++) {
      decimal2.push('0')
    }
  } else if (decimal1.length < decimal2.length) {
    pow = decimal2.length
    cnt = decimal2.length - decimal1.length
    for (let i = 0; i < cnt; i++) {
      decimal1.push('0')
    }
  } else {
    pow = decimal1.length
  }

  const n1 = operand1.integer + decimal1.join('')
  const n2 = operand2.integer + decimal2.join('')
  const base = Math.pow(10, pow)
  switch (operation) {
    case '+':
      return (Number(n1) + Number(n2)) / base
    case '-':
      return (Number(n1) - Number(n2)) / base
    case '*':
      return (Number(n1) * Number(n2)) / base
    case '/':
      return (Number(n1) / Number(n2)) / base
  }
  return 0.00
}

export function bcAdd(f1, f2) {
  return bcCalculate(f1, f2, '+')
}

export function bcSub(f1, f2) {
  return bcCalculate(f1, f2, '-')
}

export function isNumeric(value) {
  return !isNaN(parseInt(value)) && isFinite(value)
}
