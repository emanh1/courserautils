function setToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value)); 
}

async function getFromStorage(key, defaultValue) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
};