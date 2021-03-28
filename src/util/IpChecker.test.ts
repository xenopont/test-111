import IpChecker from './IpChecker';

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
});
