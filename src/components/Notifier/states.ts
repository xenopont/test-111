import { insertRules } from '../../core/styles';

export const notifierId: string = 'notifier-div';
export const messageId: string = 'notifier-message-div';
export const closeId: string = 'notifier-close-button-span';

insertRules({
    [`#${notifierId}`]: {
        position: 'absolute',
        width: '100%',
        margin: 0,
        padding: '10px 0',
        left: 0,
        bottom: 0,
        display: 'flex',
        'justify-content': 'center',
        'box-sizing': 'border-box',
        'pointer-events': 'none',
        overflow: 'hidden',
    },
    [`#${notifierId} button`]: {
        'pointer-events': 'all',
    },
    [`#${messageId}`]: {
        margin: '0 auto 0 auto',
        'max-width': '75%',
        'min-height': '2.8ex',
        padding: '1.5ex 7ex 1.5ex 3ex',
        background: 'linear-gradient(to bottom, #ffffcc 0%, #f2de8e 100%)',
        border: '1px solid #cccccc',
        'border-radius': '4px',
        'box-shadow': '2px 2px 8px 0 rgba(0, 0, 0, 0.2)',
        'pointer-events': 'all',
        position: 'relative',
        'font-size': '85%',
    },
    [`#${notifierId}.visible #${messageId}`]: {
        bottom: 0,
        opacity: 1,
        transition: '0.4s ease',
    },
    [`#${notifierId}.hidden #${messageId}`]: {
        bottom: '-1000px',
        opacity: 0,
        transition: '2s ease',
    },
    [`#${closeId}`]: {
        display: 'inline-block',
        position: 'absolute',
        right: '8px',
        top: '8px',
        cursor: 'default',
        margin: 0,
        padding: '8px',
        'font-size': 'large',
        'box-shadow': 'inset 0 0 1px 1px rgba(0, 0, 0, 0.2)',
        'border-radius': '4px',
        'line-height': '1ex',
        transition: '0.4s',
    },
    [`#${closeId}:hover`]: {
        'box-shadow': 'inset 0 0 2px 1px rgba(0, 0, 0, 0.45)',
        transition: '0.2s',
    },
});
