import { ipButtonClassName } from './IpButton/style';
import IpChecker from '../util/IpChecker';
import { useEffect, useState } from 'react';

interface CaptionOwner {
    caption?: string;
}

/**
 * IpButton component
 *
 * @param props Contains the IP to show in the button additionally to its text
 * @constructor
 */
const IpButton = (props: CaptionOwner) => {
    const [ ip, setIp ] = useState<string>(props.caption ?? 'No Info');
    useEffect(() => {
        IpChecker.addListener(setIp);
        IpChecker.start();

        return () => { IpChecker.removeListener(setIp) };
    });

    return (
        <button type="button" onClick={() => { clickHandler(ip) }} className={ipButtonClassName}>My IP: {ip}</button>
    );
};

/**
 * OnClick handler for the button, copies the provided IP to the clipboard.
 * Displays it as a text message in case of error, so the user can copy it manually.
 *
 * @param ip The IP address to copy
 */
const clickHandler = (ip: string) => {
    if (!navigator.clipboard) {
        // @todo a popup with the IP to copy from
        return;
    }
    navigator.clipboard.writeText(ip).then(/* @todo a popup to show success */).catch(/* @todo a popup to show error and IP to copy from */);
};

export default IpButton;
