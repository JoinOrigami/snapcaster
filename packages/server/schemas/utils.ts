import {
  ObjectOptions,
  StringOptions,
  TObject,
  TProperties,
  TSchema,
  Type,
} from "@sinclair/typebox";

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
  Type.TemplateLiteral("0x${string}", { pattern: /0x[a-fA-F0-9]+/, ...options });
