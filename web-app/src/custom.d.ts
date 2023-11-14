declare module '*.css' {
    const css: { [key: string]: string };
    export default css;
}


declare module '*.svg' {
    const ReactComponent: React.ComponentType<React.SVGAttributes<SVGElement>>;
    export default ReactComponent;
}

declare module "*.png" {
    const value: any;
    export default value;
 }


declare module 'react-intersection-observer';
