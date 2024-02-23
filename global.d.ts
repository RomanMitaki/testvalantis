declare module "*.css" {
  type IClassNames = Record<string, string>;
  const classNames: IClassNames;
  export = classNames;
}

declare module "*.png";
declare module "*.jpeg";
declare module "*.jpg";
declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
