export const getCookie = (name: string) => {
    try {
        if (document) {
            let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
            if (match) return match[2].replaceAll('"', "");
        }
        return undefined
    } catch (error: any) {
        if (error.message === 'document is not defined') {
            return undefined
        }
        console.error(error);
        return undefined
    }
}

export const setCookie = (name: string, value: any, options?: any) => {
    try {
        if (document) {
            options = {
                path: '/',
                ...options
            }

            let updatedCookie: string = String(name) + '=' + value.toString();

            for (const optionKey in options) {
                updatedCookie += '; ' + optionKey
                const optionValue = options[optionKey]
                if (optionValue !== true) {
                    updatedCookie += '=' + optionValue
                }
            }

            document.cookie = updatedCookie
        }
    } catch (error: any) {
        if (error.message === 'document is not defined') {
            return undefined
        }
        console.error(error);
        return undefined
    }
}

export const deleteCookie = (name: string) => {
    try {
        setCookie(name, '', {
            'max-age': -1
        })
    } catch (error: any) {
        if (error.message === 'document is not defined') {
            return undefined
        }
        // eslint-disable-next-line
        console.error(error);
    }
}
