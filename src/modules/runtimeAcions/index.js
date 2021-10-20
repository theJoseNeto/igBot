exports.randomTime = async (max = 55, min = 45) => Math.floor(Math.random() * (max - min + 1)) + min;
