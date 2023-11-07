export const compareObjects = (obj1, obj2) => {
    // Check if obj1 is not empty
    for (const key in obj1) {
        if (obj1.hasOwnProperty(key) && (obj1[key] === null || obj1[key] === undefined || obj1[key] === '')) {
            return false;
        }
    }
  
    // Check if both objects have the same fields
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
  
    if (keys1.length !== keys2.length) {
        return false;
    }
  
    // Check if the keys in obj1 match the keys in obj2
    for (const key of keys1) {
        if (!keys2.includes(key)) {
            return false;
        }
    }
  
    return true;
};
  