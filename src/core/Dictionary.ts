/**
 * Simple Dictionary with string keys and typed values
 */
export type Dictionary<T> = {
    [ key: string ]: T,
}
