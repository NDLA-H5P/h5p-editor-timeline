import { H5PWrapper } from "./src/h5p/H5PWrapper";
import { H5PField } from "./src/types/h5p/H5PField";
import { H5PForm } from "./src/types/h5p/H5PForm";
import { Params } from "./src/types/h5p/Params";

export interface H5PObject {
  EventDispatcher: typeof EventDispatcher;
}

export interface H5PEditorObject {
  H5pEditorTimeline: typeof H5PWrapper;
  widgets: {
    timeline: typeof H5PWrapper;
  };
  $: typeof jQuery;

  /**
   * Translate text strings.
   *
   * @param library The library name(machineName), or "core".
   * @param key Translation string identifier.
   * @param vars Placeholders and values to replace in the text.
   *
   * @returns Translated string, or a default text if the translation is missing.
   */
  t: (
    library: "H5PEditor.Timeline" | "core",
    key: string,
    vars?: Record<string, string>
  ) => string;

  /**
   * Recursive processing of the semantics chunks.
   *
   * @param semanticsChunk Array of semantics
   * @param params
   * @param $wrapper
   * @param parent
   */
  processSemanticsChunk: (
    semanticsChunk: H5PField | Array<H5PField>,
    params: Params,
    $wrapper: JQuery<HTMLElement>,
    parent: H5PForm
  ) => void;

  /**
   * Search for a field or a set of fields. Returns `null` if the field isn't found.
   *
   * @param fieldName
   * @param semanticsStructure
   */
  findSemanticsField: (
    fieldName: string,
    semanticsStructure: H5PField | Array<H5PField>
  ) => H5PField | Array<H5PField> | null;
}

declare class EventDispatcher {
  /**
   * Add new event listener.
   *
   * @throws {TypeError}
   *   listener must be a function
   * @param {string} type
   *   Event type
   * @param {H5P.EventCallback} listener
   *   Event listener
   * @param {Object} [thisArg]
   *   Optionally specify the this value when calling listener.
   */
  on: (type: string, listener: any, thisArg?: any) => void;

  /**
   * Add new event listener that will be fired only once.
   *
   * @throws {TypeError}
   *   listener must be a function
   * @param {string} type
   *   Event type
   * @param {H5P.EventCallback} listener
   *   Event listener
   * @param {Object} thisArg
   *   Optionally specify the this value when calling listener.
   */
  once: (type: string, listener: any, thisArg: any) => void;

  /**
   * Remove event listener.
   * If no listener is specified, all listeners will be removed.
   *
   * @throws {TypeError}
   *   listener must be a function
   * @param {string} type
   *   Event type
   * @param {H5P.EventCallback} listener
   *   Event listener
   */
  off: (type: string, listener: any) => void;

  /**
   * Dispatch event.
   *
   * @param {string|H5P.Event} event
   *   Event object or event type as string
   * @param {*} [eventData]
   *   Custom event data(used when event type as string is used as first
   *   argument).
   * @param {Object} [extras]
   * @param {boolean} [extras.bubbles]
   * @param {boolean} [extras.external]
   */
  trigger: (
    event: string | any,
    eventData?: any,
    extras?: {
      bubbles?: boolean;
      external?: boolean;
    }
  ) => void;
}