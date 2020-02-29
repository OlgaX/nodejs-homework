module.exports = (arr) => {
    let min;

    if (arr instanceof Array) {
        min = arr[0];

        for (let i = 1; i < arr.length; i++) {
            min = min < arr[i] ? min : arr[i];
        }
    }

    console.log('min', min);

    return min;
};
