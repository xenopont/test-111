import IpChecker from './IpChecker';
import ApiClient from './ApiClient';
import {Dispatch, SetStateAction} from "react";

describe('IpChecker test', () => {
    describe('setRefreshTimeout()', () => {
        it('Should return non negative integer timeout', (done) => {
            const positiveIntegerTimeout: number = Math.floor(Math.random() * 1000);
            const result: number = IpChecker.setRefreshTimeout(positiveIntegerTimeout);
            if (result === positiveIntegerTimeout) {
                done();
            }
            else {
                done('Timeout was not set');
            }
        });
        it('Should deny negative numbers', (done) => {
            const negativeNumber: number = Math.floor(Math.random() * -1000);
            const result: number = IpChecker.setRefreshTimeout(negativeNumber);
            if (result === negativeNumber) {
                done('Timeout was set to negative');
            }
            else {
                done();
            }
        });
        it('Should deny float numbers', (done) => {
            const floatNumber: number = Math.floor(Math.random() * -1000) + Math.random() - Number.MIN_VALUE;
            const result: number = IpChecker.setRefreshTimeout(floatNumber);
            if (result === floatNumber) {
                done('Timeout was set to negative');
            }
            else {
                done();
            }
        });
    });
    describe('addListener()', () => {
        const oldGetText = ApiClient.getText;
        let responseValue: number = 1;

        beforeEach(() => {
            // we need different response value for each test, otherwise no updates for the listeners
            responseValue++;
            ApiClient.getText = (): Promise<string> => Promise.resolve(responseValue.toString(10));

            IpChecker.removeAllListeners();
        });
        afterEach(() => {
            ApiClient.getText = oldGetText;
        });
        it('Should include the test function into the listeners set', (done) => {
            let calls: number = 0;
            const myListener: Dispatch<SetStateAction<string>> = (): void => {
                calls++;
            };
            IpChecker.addListener(myListener);
            IpChecker.start();
            setTimeout(() => {
                if (calls > 0) {
                    done();
                }
                else {
                    done('No calls to the test listener');
                }
            }, 0);
        });
        it('Should remove the test function from the listeners set', (done) => {
            let calls1: number = 0;
            let calls2: number = 0;
            const myListener1: Dispatch<SetStateAction<string>> = (): void => {
                calls1++;
            }
            const myListener2: Dispatch<SetStateAction<string>> = (): void => {
                calls2++;
            }
            IpChecker.addListener(myListener1);
            IpChecker.addListener(myListener2);
            IpChecker.removeListener(myListener2);
            IpChecker.start();
            setTimeout(() => {
                if (calls2 === 0) {
                    done();
                }
                else {
                    done('Extra calls detected as if the myListener2 was not removed');
                }
            }, 0);
        });
    });
});
