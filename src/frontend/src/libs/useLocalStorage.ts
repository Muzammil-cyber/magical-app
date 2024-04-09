
const useLocalStorage = () => {
    const getLocalStorageItem = (key: string) => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    };

    const setLocalStorageItem = (key: string, value: string | number | boolean | null) => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    return { getLocalStorageItem, setLocalStorageItem };
};

export default useLocalStorage;