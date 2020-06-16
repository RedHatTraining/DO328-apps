export function delay<T>(callable: () => T, milliseconds = 1000): Promise<T> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(callable());
        }, milliseconds);
    });
}
