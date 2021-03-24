import { ipButtonClassName } from './IpButton/style';
import IpChecker from '../util/IpChecker';
import { useState } from 'react';

export interface ipButtonPropsInterface {
    title?: string;
}

const IpButton = (props: ipButtonPropsInterface) => {
    const [ title, setTitle ] = useState(props.title ?? 'No Title');

    const button: JSX.Element = (
        <button type="button" className={ipButtonClassName}>{title ?? 'No Title'}</button>
    );

    IpChecker.addListener(setTitle);
    IpChecker.start();

    return button;
}

export default IpButton;
