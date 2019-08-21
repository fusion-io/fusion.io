export const loose = (packageName: string) => {
    try {
        return require(packageName)
    } catch (e) {
        if (e.code === 'MODULE_NOT_FOUND') {
            console.error(
                `We need a third party library called: [${packageName}] to get things work.`
            );
        }

        throw e;
    }
};
