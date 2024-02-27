import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import type {
  FastifyInstance as FInstance,
  FastifyLoggerInstance,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from "fastify";

export type FastifyInstance = FInstance<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FastifyLoggerInstance,
  TypeBoxTypeProvider
>;

declare module "fastify" {
  interface FastifyRequest {
  }
}
