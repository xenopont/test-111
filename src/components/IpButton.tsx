import { ipButtonClassName } from './IpButton/style';
import IpChecker from '../util/IpChecker';
import { useState } from 'react';

export interface TitleCarrierInterface {
    title?: string;
}

const clickHandler = (text: string) => {
    if (!navigator.clipboard) {
        console.log('No clipboard API support');
        return;
    }
    navigator.clipboard.writeText(text).then();
};

const IpButton = (props: TitleCarrierInterface) => {
    console.log('Button Render');
    const [ title, setTitle ] = useState(props.title ?? 'No Title');

    const button: JSX.Element = (
        <button type="button" onClick={() => { clickHandler(title) }} className={ipButtonClassName}>{title ?? 'No Title'}</button>
    );

    IpChecker.addListener(setTitle);
    IpChecker.start();

    return button;
}

export default IpButton;
