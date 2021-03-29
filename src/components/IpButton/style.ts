import { insertRules } from "../../core/styles";

export const ipButtonClassName: string = 'ip-button-class';

const margin: string = '24px';
const borderShadow: string = 'inset 0 0 0 1px rgba(255, 255, 255, 0.85)';
const focusBorderShadow: string = 'inset 0 0 2px 2px rgba(128, 212, 255, 0.85)';
const activeShadow: string = 'inset 0 2px 4px 1px rgba(0, 0, 0, 0.3)';

insertRules({
    [`.${ipButtonClassName}`]: {
        background: 'linear-gradient(to bottom, #f6f7f8 0%, #ffffff 50%, #f8f7f5 50%, #fcfbf8 100%)',
        border: '1px solid #c8c8c8',
        'box-shadow': borderShadow,
        'border-radius': '4px',
        position: 'absolute',
        right: margin,
        top: margin,
        padding: margin,
        'min-width': '13ex',
    },
    [`.${ipButtonClassName}:focus`]: {
        outline: 'none',
        'box-shadow': focusBorderShadow,
        'border-color': '#bcbcbc',
    },
    [`.${ipButtonClassName}:active`]: {
        'box-shadow': `${activeShadow}, ${focusBorderShadow}`,
    },
    [`.${ipButtonClassName}:disabled`]: {
        background: 'linear-gradient(to bottom, #f4f3f0 0%, #fcfbf8 100%)',
        color: '#ccc8c0',
        'text-shadow': '1px 1px 0 rgba(255, 255, 255, 1)',
    },
});
