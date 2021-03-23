const listeners: HTMLElement[] = [];

const addListener = (listener: HTMLElement): void => {
    listeners.push(listener);
};

export default {
    addListener,
};
