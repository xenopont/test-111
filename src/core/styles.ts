import { Dictionary } from './Dictionary';

const globalStyleElement: HTMLStyleElement = document.createElement('style');
globalStyleElement.setAttribute('type', 'text/css');
document.head.appendChild(globalStyleElement)

type ElementStyle = Dictionary<string|number>;
type RuleGenerator = (selector: string, style: ElementStyle, ...args: string[]) => string // eslint-disable-line no-unused-vars

/**
 * Inserts simple CSS rules into document's stylesheet
 *
 * @export
 * @example insertRules({
 *     body: {
 *         color: '#fff',
 *         'max-width': '900px',
 *     },
 *     '.someClass, #someId': {
 *         color: '#c00',
 *     },
 * })
 *
 * @param ruleSet
 */
export const insertRules = (ruleSet: Dictionary<ElementStyle>): void => {
    Object.keys(ruleSet).forEach((selector: string) => {
        const rule: string = createSimpleRule(selector, ruleSet[selector])
        insertOneRule(rule)
    });
};

/**
 * Insert an at-rule @media into document's stylesheet
 *
 * @export
 * @example insertMediaRules('only screen and (max-width: 900px)', {
 *     body: {
 *         padding: '16px',
 *         color: '#fff',
 *     },
 *     '.someClass span': {
 *         'min-width': 0,
 *     }
 * })
 *
 * @param mediaQuery
 * @param ruleSet
 */
export const insertMediaRules = (mediaQuery: string, ruleSet: Dictionary<ElementStyle>): void => {
    insertAtRule('media', mediaQuery, ruleSet)
};

/**
 * Inserts an at-rule @keyframes into document's stylesheet to define an animation
 *
 * @export
 * @example insertAnimation('slide-in', {
 *     from: {
 *         left: 0,
 *         top: 0,
 *     },
 *     '50%': {
 *         left: '500px',
 *         top: 0,
 *     }
 *     to: {
 *         left: '100%',
 *         top: '100%',
 *     },
 * })
 *
 * @param animationName
 * @param ruleSet
 */
export const insertAnimation = (animationName: string, ruleSet: Dictionary<ElementStyle>): void => {
    insertAtRule('keyframes', animationName, ruleSet)
};

/**
 * Inserts any generic at-rule into the document's stylesheet.
 * Used internally.
 * Normally you won't need this method exported. Create a shortcut instead.
 *
 * @example insertAtRule('myIdentifier', 'myRuleName', {
 *     'selector-1': { param1: 'value1', param2: 'value2' },
 *     'selector-2': { param3: 'value3', param4: 'value4' },
 * })
 *
 * @param atType
 * @param atName
 * @param ruleSet
 */
const insertAtRule = (atType: string, atName: string, ruleSet: Dictionary<ElementStyle>): void => {
    const initialValue: string = ''
    const res: string = Object.keys(ruleSet).reduce((result: string, selector: string) => {
        const rule = createSimpleRule(selector, ruleSet[selector])
        return result + ' ' + rule
    }, initialValue)
    const wrappedRule = `@${atType} ${atName} { ${res} }`
    insertOneRule(wrappedRule)
}

/**
 * Converts an ElementStyle object to its string representation
 *     { "color": "#fff", "max-width": "13px" } will be converted to
 *     'color: #fff; max-width: 13px; '
 *
 * @param {ElementStyle} style
 */
const elementStyleToString = (style: ElementStyle): string => {
    const initialValue: string = ''
    return Object.keys(style).reduce((result: string, property: string) => {
        return result + property + ': ' + style[property] + '; '
    }, initialValue)
}

/**
 * Creates a string representation of a rule, ready to be used in CSSStyleSheet.insertRule()
 *
 * @example createRule('.someClass, div#div-id', {
 *         background: #fff,
 *         'min-width': 0,
 *     })
 *     returns ".someClass, div#div-id { background: #fff; min-width: 0 }"
 *
 * @param {string} selector Any selector query
 * @param {ElementStyle} style A style description in JSON format
 */
const createSimpleRule: RuleGenerator = (selector: string, style: ElementStyle): string => {
    return selector + ' { ' + elementStyleToString(style) + '}'
}

/**
 * Inserts a rule into the app's global stylesheet.
 *
 * @param {string} rule
 */
const insertOneRule = (rule: string): void => {
    globalStyleElement.sheet?.insertRule(rule, globalStyleElement.sheet.cssRules.length);
}
