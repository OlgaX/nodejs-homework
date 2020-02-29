module.exports = (...values) => {
    let sum = 0;

    for (let i = 0; i < values.length; i++) {
        if (typeof values[i] === 'number') {
            sum += values[i];
        }
    }

    console.log('sum', sum);

    return sum;
};
