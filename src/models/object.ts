import * as React from "react";
export interface SelectItem {
  id: number | boolean | undefined;
  name: string;
}

export const ProductCount = React.createContext({});