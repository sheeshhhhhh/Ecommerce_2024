

const removeNBigInt = (number: BigInt | null | undefined) => {
    if(!number) return undefined
    const stringnumber = number.toString()
    const StrResult = stringnumber.replace('n', '')
    const BacktoNumber = parseInt(StrResult)

    return BacktoNumber
}

export default removeNBigInt