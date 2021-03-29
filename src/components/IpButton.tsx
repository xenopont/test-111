import { ipButtonClassName } from './IpButton/style';
import IpChecker from '../util/IpChecker';
import { useEffect, useState } from 'react';
import { showMessage } from './Notifier';

interface CaptionOwner<T> {
    caption?: T;
}

/**
 * IpButton component
 *
 * @param props Contains the IP to show in the button additionally to its text
 * @constructor
 */
const IpButton = (props: CaptionOwner<string>) => {
    const [ ip, setIp ] = useState<string>(props.caption ?? '');
    useEffect(() => {
        // to disable linter warning
        const initIpChecker = () => {
            IpChecker.addListener(setIp);
            IpChecker.start();
        };
        initIpChecker();
        if (ip === '') {
            showMessage(
                <div>
                    A network error occurred during an attempt to determine your IP address.<br/>
                    That might happen if you use an ad blocker.
                </div>,
                false
            );
        }

        return () => { IpChecker.removeListener(setIp) };
    });
    const disabled: boolean = ip === '';

    return (
        <button type="button" onClick={() => { clickHandler(ip) }} className={ipButtonClassName} disabled={disabled}>
            My IP: {ip === '' ? 'Unknown' : ip}
        </button>
    );
};

export default IpButton;

/**
 * OnClick handler for the button, copies the provided IP to the clipboard.
 * Displays it as a text message in case of error, so the user can copy it manually.
 *
 * @param ip The IP address to copy
 */
const clickHandler = (ip: string) => {
    if (!navigator.clipboard) {
        showMessage(
            <div>
                Your browser doesn't support clipboard manipulation.<br/>
                Please, copy you IP {ip} manually and close this message.
            </div>,
            false
        );
        return;
    }
    navigator.clipboard.writeText(ip)
        .then(() => {
            showMessage('Your current IP was successfully copied to clipboard');
        })
        .catch(() => {
            showMessage(
                <div>
                    An error occurred during an attempt to use clipboard.<br/>
                    Please, copy you IP {ip} manually and close this message.
                </div>,
                false
            );
        });
};
