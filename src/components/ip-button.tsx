import { ipButtonClassName } from './ip-button/style';
import ipChecker from '../util/ip-checker';
import { useState } from 'react';

export interface ipButtonPropsInterface {
    title?: string;
}

const IpButton = (props: ipButtonPropsInterface) => {
    const [ title, setTitle ] = useState(props.title ?? 'No Title');
    console.log('IpButton log record');

    const button: JSX.Element = (
        <button type="button" className={ipButtonClassName}>{title ?? 'No Title'}</button>
    );
    ipChecker.addListener(setTitle);
    ipChecker.start();
    return button;
}

export default IpButton;
