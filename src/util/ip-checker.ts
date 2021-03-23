import { StateConverter } from '../core/StateConverter';

const refreshTimeout: number = 2000;
const listeners: StateConverter<string>[] = [];
let current: string = 'Unknown IP';

const addListener = (newListener: StateConverter<string>): void => {
    if (listeners.find((l) => l === newListener)) {
        return;
    }
    listeners.push(newListener);
};

const getIp = (): string => {
    return 'Who knows?'; // @todo replace with an API call
}

const refreshIp = (): void => {
    const newIp: string = getIp();
    if (newIp === current) {
        return;
    }
    current = newIp;
    updateListeners(newIp);
}

const updateListeners = (newIp: string) => {
    listeners.forEach((l: StateConverter<string>) => {
        l(() => newIp);
    })
};

let intervalHandle: number = 0;

const start = (): void => {
    if (intervalHandle !== 0) {
        return;
    }

    intervalHandle = window.setInterval(refreshIp, refreshTimeout);
};

const stop = (): void => {
    window.clearInterval(intervalHandle);
    intervalHandle = 0;
};

export default {
    addListener,
    start,
    stop,
};
