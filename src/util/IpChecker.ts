import ApiClient from './ApiClient';
import { Dispatch, SetStateAction } from "react";

let refreshTimeout: number = 300000; // timeout to refresh the IP via an API call
const setRefreshTimeout = (timeout: number): number => {
    if (timeout === parseInt(timeout.toString(10), 10) && timeout >= 0) {
        refreshTimeout = timeout;
    }

    return refreshTimeout;
}
/** set of listeners to receive an updated IP value */
const listeners = new Set<Dispatch<SetStateAction<string>>>();
/** IP value cache to compare with a newly received one */
let current: string = 'Unknown IP';

/**
 * Collects listeners to be notified about current IP change
 *
 * @param newListener A function that can change the state of a component
 */
const addListener = (newListener: Dispatch<SetStateAction<string>>): void => {
    listeners.add(newListener);
};

/**
 * Removes a listener from the collection,
 * so it won't be notified about the IP changes anymore
 *
 * @param oldListener
 */
const removeListener = (oldListener: Dispatch<SetStateAction<string>>): void => {
    listeners.delete(oldListener);
    if (listeners.size === 0) {
        stop();
    }
}

/**
 * Makes an HTTP request to a third party API to get the current IP
 */
const getIp = async (): Promise<string> => {
    // doesn't work from localhost:XXX while having adblock on
    return await ApiClient.getText('https://api.ipify.org');
};

/**
 * Checks if the current IP changed and sends around a notification
 * to all the listeners, if it did
 */
const refreshIp = async (): Promise<void> => {
    const newIp: string = await getIp();
    if (newIp === current) {
        return;
    }
    current = newIp;
    updateListeners(newIp);
};

/**
 * Send the new IP to all the listeners
 * Empty IP means an error
 *
 * @param newIp
 */
const updateListeners = (newIp: string) => {
    listeners.forEach((l: Dispatch<SetStateAction<string>>) => {
        l(() => newIp);
    })
};

/** a value returned from window.setInterval() for the start/stop operations */
let intervalHandle: number = 0;

/**
 * Starts monitoring IP changes
 */
const start = (): void => {
    if (intervalHandle !== 0) {
        return;
    }

    refreshIp().then();
    intervalHandle = window.setInterval(refreshIp, refreshTimeout);
};

/** Stops monitoring IP changes */
const stop = (): void => {
    window.clearInterval(intervalHandle);
    intervalHandle = 0;
};

const IpChecker = {
    addListener,
    removeListener,
    setRefreshTimeout,
    start,
    stop,
};

export default IpChecker;
