function checkIfValidIP(str) {
    // Regular expression to check if string is a IP address
    if (str === 'localhost') return true;
    const regexExp = new RegExp(
        "^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
    );
    return regexExp.test(str);
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

export {
    checkIfValidIP,
    asyncForEach
}