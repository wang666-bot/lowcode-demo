import { PureComponent } from 'react';
import { IEditorInstance } from '@alilc/lowcode-plugin-base-monaco-editor/lib/helper';
import { TAB_KEY } from '../../config';
import './CssEditor.less';
export interface CssEditorProps {
    cssCode?: string;
    currentTab: TAB_KEY;
    onTabChange: (tab: TAB_KEY) => void;
    saveSchema: () => void;
}
export interface CssEditorState {
    code: string;
}
export declare class CssEditor extends PureComponent<CssEditorProps, CssEditorState> {
    static defaultProps: Partial<CssEditorProps>;
    state: CssEditorState;
    cssEditor: IEditorInstance;
    editorDidMount(editor: IEditorInstance): void;
    getBeautifiedCSS(): string;
    render(): JSX.Element;
    _updateCode(newCode: string): void;
}
