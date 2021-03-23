import { Converter } from './Converter';

export type StateConverter<T> = (converterFunction: Converter<T>) => void;
