import {
  ObjectOptions,
  StringOptions,
  TObject,
  TProperties,
  TSchema,
  Type,
} from "@sinclair/typebox";
import type { Format } from "ajv";

export const FORMATS: Record<string, Format> = {
  hex: /^0x[0-9a-fA-F]+$/,
  "eth-address": /^0x[0-9a-fA-F]{40}$/,
  uint256: /^[0-9]{1,78}$/,
  uint64: /^[0-9]{1,20}$/,
};

// Forbids additional properties in the object
export function StrictObject<T extends TProperties>(
  properties: T,
  options?: ObjectOptions,
): TObject<T> {
  return Type.Object(properties, { ...options, additionalProperties: false });
}

export const Nullable = <T extends TSchema>(type: T) =>
  Type.Union([type, Type.Null()]);

export const Hex = (options?: StringOptions) =>
  Type.TemplateLiteral("0x${string}", { format: "hex", ...options });
