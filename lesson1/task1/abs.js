module.exports = (value) => {
    const abs = +value >= 0 ? +value : -+value;

    console.log('abs', abs);

    return abs;
};
