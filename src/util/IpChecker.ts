import { StateConverter } from '../core/StateConverter';
import ApiClient from './ApiClient';

const refreshTimeout: number = 300000;
const listeners: StateConverter<string>[] = [];
let current: string = 'Unknown IP';

const addListener = (newListener: StateConverter<string>): void => {
    if (listeners.find((l) => l === newListener)) {
        return;
    }
    listeners.push(newListener);
};

const getIp = async (): Promise<string> => {
    return await ApiClient.getText('https://api.ipify.org');
};

const refreshIp = async (): Promise<void> => {
    const newIp: string = await getIp();
    if (newIp === current) {
        return;
    }
    current = newIp;
    updateListeners(newIp);
};

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

    refreshIp().then();
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

const IpChecker: IpCheckerInterface = {
    addListener,
    start,
    stop,
};

export default IpChecker;
