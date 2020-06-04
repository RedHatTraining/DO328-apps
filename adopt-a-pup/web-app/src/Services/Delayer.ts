export function delay<T>(callable: () => T, milliseconds = 0): Promise<T> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(callable());
        }, milliseconds);
    });
}