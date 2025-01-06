interface Expr {
    type: string;
    value: string | number;
    extType?: string;
}
declare type ExprType = Expr | string;
export declare function evaluate(expr: ExprType): any;
export {};
