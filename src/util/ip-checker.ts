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

const getIp = async (): Promise<string> => {
    const response = await fetch('https://api.ipify.org', {
        credentials: 'omit',
        mode: 'cors',
        redirect: 'follow',
    });
    if (!response.ok) {
        return 'Error';
    }

    return await response.text();
}

const refreshIp = async (): Promise<void> => {
    const newIp: string = await getIp();
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

export interface IpCheckerInterface {
    addListener: (newListener: StateConverter<string>) => void,
    start: () => void,
    stop: () => void,
}

const ipChecker: IpCheckerInterface = {
    addListener,
    start,
    stop,
};

export default ipChecker;
