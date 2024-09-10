let scrollDisableCount = 0;

export const disableBodyScroll = () => {
    scrollDisableCount++;
    if (scrollDisableCount === 1) {
        document.body.style.overflow = "hidden";
    }
};

export const enableBodyScroll = () => {
    scrollDisableCount = Math.max(0, scrollDisableCount - 1);
    if (scrollDisableCount === 0) {
        document.body.style.overflow = "visible";
    }
};
