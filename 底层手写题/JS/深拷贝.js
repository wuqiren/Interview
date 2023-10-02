function deepCopy(obj) {
    if (typeof obj !== 'object') {
        return obj;
    }
    if (obj === null) {
        return null;
    }
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }
    if (obj instanceof RegExp) {
        return new RegExp(obj);
    }
    if (obj instanceof Array) {
        return obj.map(deepCopy);
    }
    const result = {};
}