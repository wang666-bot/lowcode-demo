import { PureComponent } from 'react';
import { TAB_KEY } from '../../config';
import { FunctionEventParams } from '../../types';
import { IEditorInstance, IMonacoInstance } from '@alilc/lowcode-plugin-base-monaco-editor/lib/helper';
import './JsEditor.less';
interface JsEditorProps {
    jsCode: string;
    editor: any;
    currentTab: TAB_KEY;
    onTabChange: (tab: TAB_KEY) => void;
}
interface JsEditorState {
    state?: Record<string, any>;
    hasError: boolean;
    errorInfo?: string | null;
    code?: string;
    errorLocation?: {
        line: number;
        column: number;
    };
}
export declare class JsEditor extends PureComponent<JsEditorProps, JsEditorState> {
    static defaultProps: Partial<JsEditorProps>;
    state: JsEditorState;
    monaco?: IMonacoInstance;
    monacoEditor?: IEditorInstance;
    lastErrorDecoration: any;
    disposeProvider?: {
        dispose: () => void;
    };
    getSchemaFromCode(): {
        state: Record<string, any>;
        methods: Record<string, unknown>;
        lifeCycles: Record<string, unknown>;
        originCode: any;
    };
    editorDidMount(monaco: IMonacoInstance, editor: IEditorInstance): Promise<void>;
    focusByFunctionName({ functionName }: FunctionEventParams): void;
    addFunction(params: FunctionEventParams): void;
    render(): JSX.Element;
    _updateCode(newCode: string): void;
}
export {};
