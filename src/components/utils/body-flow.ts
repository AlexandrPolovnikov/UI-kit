const handlerShow = (): void => {
    try {
        document.body.style.overflow = "hidden";
    } catch (e) {
        console.error(e);
    }
};

const handlerHide = (): void => {
    try {
        document.body.style.overflow = "auto";
    } catch (e) {
        console.error(e);
    }
};

export {
    handlerShow,
    handlerHide
};
