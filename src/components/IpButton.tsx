import { ipButtonClassName } from './IpButton/style';
import IpChecker from '../util/IpChecker';
import { useEffect, useState } from 'react';

export interface TitleCarrierInterface {
    title?: string;
}

const clickHandler = (text: string) => {
    if (!navigator.clipboard) {
        console.log('No clipboard API support');
        return;
    }
    navigator.clipboard.writeText(text).then().catch();
};

const IpButton = (props: TitleCarrierInterface) => {
    const [ title, setTitle ] = useState(props.title ?? 'No Info');
    useEffect(() => {
        IpChecker.addListener(setTitle);
        IpChecker.start();

        return () => { IpChecker.removeListener(setTitle) };
    });

    return (
        <button type="button" onClick={() => { clickHandler(title) }} className={ipButtonClassName}>My IP: {title}</button>
    );
}

export default IpButton;
