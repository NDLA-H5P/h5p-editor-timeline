import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "../App";
import { H5P } from "./H5P.util";

export class H5PWrapper extends H5P.EventDispatcher {
  private wrapper: HTMLElement;

  constructor(params: unknown, contentId: string, extras?: unknown) {
    super();
    this.wrapper = H5PWrapper.createWrapperElement();

    ReactDOM.render(<App adjective="astonishing" />, this.wrapper);
  }

  attach([containerElement]: JQuery<HTMLElement>): void {
    containerElement.appendChild(this.wrapper);
    containerElement.classList.add("h5p-h5p-editor-timeline");
  }

  private static createWrapperElement(): HTMLDivElement {
    return document.createElement("div");
  }
}