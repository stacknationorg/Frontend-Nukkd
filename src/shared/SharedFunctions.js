export const chunk = (array, size) => Array.from({length: Math.ceil(array.length / size)}, (value, index) => array.slice(index * size, index * size + size));