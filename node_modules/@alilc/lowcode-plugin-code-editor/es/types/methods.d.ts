import { JSFunction, JSExpression } from '@alilc/lowcode-types';
export declare type Method = JSExpression | JSFunction & {
    source: string;
};
export interface Methods {
    [key: string]: Method;
}
