import { closeId, messageId, notifierId } from './Notifier/states';
import { CaptionOwner } from '../core/CaptionOwner';
import {Dispatch, SetStateAction, useState} from 'react';
import Queue from '../core/Queue';

export type NotifierMessage = string|JSX.Element;
type NotifierScene = {
    message: NotifierMessage,
    autoClose: boolean,
};

const queue = new Queue<NotifierScene>();

const classHidden: string = 'hidden';
const classVisible: string = 'visible';

const Notifier = (props: CaptionOwner<NotifierMessage>) => {
    const [ message, setMessage ] = useState<NotifierMessage>(props.caption ?? '');
    const [ className, setClassName] = useState<string>(classHidden);
    messageDispatcher = setMessage;
    classNameDispatcher = setClassName;

    const closeClickHandler = () => {
        closeCurrentMessage();
    };

    return (
        <div id={notifierId} className={className}>
            <div id={messageId}>
                {message}
                <span id={closeId} onClick={closeClickHandler}>&#10799;</span>
            </div>
        </div>
    );
};

export default Notifier;

const msNotificationTimespan: number = 400;
const msNotificationDisplayTime: number = 3000;

let isOpen: boolean = false;
let messageDispatcher: Dispatch<SetStateAction<NotifierMessage>>|null = null;
let classNameDispatcher: Dispatch<SetStateAction<string>>|null = null;

const closeCurrentMessage = (): void => {
    if (!isOpen || classNameDispatcher === null) {
        return;
    }
    classNameDispatcher(() => classHidden);
    isOpen = false;
    window.setTimeout(displayNextMessage, msNotificationTimespan);
};

const displayNextMessage = (): void => {
    if (isOpen || messageDispatcher === null || classNameDispatcher === null) {
        return;
    }
    const nextScene: NotifierScene|undefined = queue.next();
    if (!nextScene) {
        return;
    }
    messageDispatcher(() => nextScene.message);
    classNameDispatcher(() => classVisible);
    isOpen = true;
    if (nextScene.autoClose) {
        window.setTimeout(closeCurrentMessage, msNotificationDisplayTime);
    }
};

export const showMessage = (message: NotifierMessage, autoClose: boolean = true):void => {
    queue.add({ message, autoClose });
    displayNextMessage();
};
