module.exports = {
    default: 'international',
    presets: {
        international: {
            preset: 'ldc',
            language: 'en',
            options: {
                timezone: 'utc',
                datetimeFormat: 'YYYY-MM-DD hh:mm:ss',
                currency: {
                    defaultCurrency: 'dollar'
                }
            }
        }
    }
};
