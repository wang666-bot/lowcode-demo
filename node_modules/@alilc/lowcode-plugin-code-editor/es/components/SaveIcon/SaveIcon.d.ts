/// <reference types="react" />
import './SaveIcon.less';
export interface ErrorTipProps {
    onClick: () => void;
    isDisabled?: boolean;
}
export declare const SaveIcon: ({ isDisabled, onClick }: ErrorTipProps) => JSX.Element;
