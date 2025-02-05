const changePrice = (operator, operand, price, setPrice) => {
    let value = parseFloat(price)
    if (!value && operator === 'plus') return setPrice(10)
    if (value < 10 && operator === 'minus') return

    if (operator === 'plus') {
        value += operand
    } else {
        value -= operand
    }
    value = parseFloat(value.toFixed(2))
    setPrice(value)
}

export default changePrice