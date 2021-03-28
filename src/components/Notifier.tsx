import { closeId, messageId, notifierId } from './Notifier/states';
import {Dispatch, SetStateAction, useState} from 'react';
import Queue from '../core/Queue';

export type NotifierMessage = string|JSX.Element;
type NotifierScene = {
    message: NotifierMessage,
    autoClose: boolean,
};

/** A queue to store the messages and display them one by one */
const queue = new Queue<NotifierScene>();

const classHidden: string = 'hidden';
const classVisible: string = 'visible';

/**
 * Notifier component
 * Puts messages in a queue and displays them in order.
 * Some messages close automatically to not bother the user.
 * The others should be closed manually (supposed to show important information).
 *
 * @constructor
 */
const Notifier = () => {
    const [ message, setMessage ] = useState<NotifierMessage>('');
    const [ className, setClassName] = useState<string>(classHidden);
    messageDispatcher = setMessage;
    classNameDispatcher = setClassName;

    return (
        <div id={notifierId} className={className}>
            <div id={messageId}>
                {message}
                <span id={closeId} onClick={closeCurrentMessage}>&#10799;</span>
            </div>
        </div>
    );
};

export default Notifier;

const msNotificationTimespan: number = 400; // A pause between one message is closed and another appears
const msNotificationDisplayTime: number = 3000; // Time to display one message, if it closes automatically

let isOpen: boolean = false; // Current state of the notifier
let messageDispatcher: Dispatch<SetStateAction<NotifierMessage>>|null = null; // Hook to change the message
let classNameDispatcher: Dispatch<SetStateAction<string>>|null = null; // Hook to change the visibility of the notifier

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

/**
 * Allows to put a new message into the display queue.
 * It will be displayed instantly if the queue were empty. Will wait for its turn, otherwise.
 *
 * @param message
 * @param autoClose Optional parameter to force the manual closure of the message
 */
export const showMessage = (message: NotifierMessage, autoClose: boolean = true):void => {
    queue.add({ message, autoClose });
    displayNextMessage();
};
