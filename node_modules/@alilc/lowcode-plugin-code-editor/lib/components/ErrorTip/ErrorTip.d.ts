/// <reference types="react" />
import './ErrorTip.less';
export interface ErrorTipProps {
    errorInfo: string;
}
export declare const ErrorTip: ({ errorInfo }: ErrorTipProps) => JSX.Element;
