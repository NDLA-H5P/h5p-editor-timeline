import * as React from "react";
import * as ReactDOM from "react-dom";
import { H5PField, H5PFieldList } from "../types/H5P/H5PField";
import { H5PForm } from "../types/H5P/H5PForm";
import { H5PSetValue } from "../types/H5P/H5PSetValue";
import { H5P } from "../H5P/H5P.util";
import { TagType } from "../types/TagType";
import { TagPicker } from "../components/TagPicker/TagPicker";

export type NDLATagsPickerParams = {
  tags: Array<TagType>;
};

export class NDLATagsPicker extends H5P.EventDispatcher {
  public field: H5PField;

  private wrapper: HTMLElement;

  constructor(
    parent: H5PForm,
    semantics: H5PFieldList,
    params: NDLATagsPickerParams,
    setValue: H5PSetValue<NDLATagsPickerParams>,
  ) {
    super();
    this.wrapper = NDLATagsPicker.createWrapperElement();
    this.field = semantics;

    ReactDOM.render(
      <TagPicker
        setActiveTags={tags => setValue(semantics, { tags })}
        tags={params.tags}
      />,
      this.wrapper,
    );
  }

  appendTo($container: JQuery<HTMLElement>): void {
    const containerElement = $container.get(0);
    if (!containerElement) {
      console.error(
        "Found no containing element to attach `h5p-tags-picker` to.",
      );
      return;
    }

    containerElement.appendChild(this.wrapper);
    containerElement.classList.add("h5p-tags-picker");
  }

  validate(): boolean {
    return this.wrapper !== null;
  }

  remove(): void {
    /* Can't be empty, must exist */
  }

  private static createWrapperElement(): HTMLDivElement {
    return document.createElement("div");
  }
}
