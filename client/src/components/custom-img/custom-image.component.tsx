import React from "react";

export interface ICustomImageComponentProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
}

const CustomImageComponent: React.FunctionComponent<
  ICustomImageComponentProps
> = (props) => {
  return (
    <img
      src={props.src}
      alt={props.alt}
      width={props.width}
      height={props.height}
    />
  );
};

export default CustomImageComponent;
