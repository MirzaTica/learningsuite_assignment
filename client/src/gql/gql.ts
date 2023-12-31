/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    query Kanban {\n        kanban {\n            id\n            name\n            items {\n                id\n                name\n                done\n            }\n        }\n    }\n": types.KanbanDocument,
    "\n    mutation MoveItem($itemId: ID!, $toListId: ID!, $index: Int!) {\n        moveItem(itemId: $itemId, toListId: $toListId, index: $index) {\n            id\n            name\n            items {\n                id\n                name\n                done\n            }\n        }\n    }\n": types.MoveItemDocument,
    "\n    mutation MoveColumn($columnId: ID!, $index: Int!) {\n        moveColumn(columnId: $columnId, index: $index) {\n            id\n            name\n            items {\n                id\n                name\n                done\n            }\n        }\n    }\n": types.MoveColumnDocument,
    "\n    mutation AddItem($toListId: ID!) {\n        addItem(toListId: $toListId) {\n            id\n            name\n            items {\n                id\n                name\n                done\n            }\n        }\n    }\n": types.AddItemDocument,
    "\n    mutation toggleDone($itemId: ID!, $done: Boolean!) {\n        toggleDone(itemId: $itemId, done: $done) {\n            id\n            name\n            items {\n                id\n                name\n                done\n            }\n        }\n    }\n": types.ToggleDoneDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Kanban {\n        kanban {\n            id\n            name\n            items {\n                id\n                name\n                done\n            }\n        }\n    }\n"): (typeof documents)["\n    query Kanban {\n        kanban {\n            id\n            name\n            items {\n                id\n                name\n                done\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation MoveItem($itemId: ID!, $toListId: ID!, $index: Int!) {\n        moveItem(itemId: $itemId, toListId: $toListId, index: $index) {\n            id\n            name\n            items {\n                id\n                name\n                done\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation MoveItem($itemId: ID!, $toListId: ID!, $index: Int!) {\n        moveItem(itemId: $itemId, toListId: $toListId, index: $index) {\n            id\n            name\n            items {\n                id\n                name\n                done\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation MoveColumn($columnId: ID!, $index: Int!) {\n        moveColumn(columnId: $columnId, index: $index) {\n            id\n            name\n            items {\n                id\n                name\n                done\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation MoveColumn($columnId: ID!, $index: Int!) {\n        moveColumn(columnId: $columnId, index: $index) {\n            id\n            name\n            items {\n                id\n                name\n                done\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation AddItem($toListId: ID!) {\n        addItem(toListId: $toListId) {\n            id\n            name\n            items {\n                id\n                name\n                done\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation AddItem($toListId: ID!) {\n        addItem(toListId: $toListId) {\n            id\n            name\n            items {\n                id\n                name\n                done\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation toggleDone($itemId: ID!, $done: Boolean!) {\n        toggleDone(itemId: $itemId, done: $done) {\n            id\n            name\n            items {\n                id\n                name\n                done\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation toggleDone($itemId: ID!, $done: Boolean!) {\n        toggleDone(itemId: $itemId, done: $done) {\n            id\n            name\n            items {\n                id\n                name\n                done\n            }\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;