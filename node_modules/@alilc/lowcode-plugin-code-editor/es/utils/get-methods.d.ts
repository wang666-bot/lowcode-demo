import { Node } from '@babel/types';
import { Methods } from '../types';
/**
 * get all methods from code-editor-pane
 */
export declare const getMethods: (ast: Node) => {
    readonly methods: Methods;
    readonly errorsByMethods: Record<string, string>;
};
