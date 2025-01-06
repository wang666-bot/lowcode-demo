/// <reference types="react" />
import { Project, Event, Skeleton } from '@alilc/lowcode-shell';
import '@alilc/lowcode-plugin-base-monaco-editor/lib/style';
import './index.less';
interface CodeEditorPaneProps {
    project: Project;
    event: Event;
    skeleton: Skeleton;
}
export declare const CodeEditorPane: import("react").MemoExoticComponent<({ project, event, skeleton }: CodeEditorPaneProps) => JSX.Element>;
export {};
