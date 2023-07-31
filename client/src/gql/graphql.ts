/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type KanbanColumn = {
  __typename?: 'KanbanColumn';
  id: Scalars['ID']['output'];
  items: Array<KanbanItem>;
  name: Scalars['String']['output'];
};

export type KanbanItem = {
  __typename?: 'KanbanItem';
  done: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addColumn: Array<KanbanColumn>;
  addItem: Array<KanbanColumn>;
  moveColumn: Array<KanbanColumn>;
  moveItem: Array<KanbanColumn>;
  toggleDone: Array<KanbanColumn>;
};


export type MutationAddColumnArgs = {
  name: Scalars['String']['input'];
};


export type MutationAddItemArgs = {
  toListId: Scalars['ID']['input'];
};


export type MutationMoveColumnArgs = {
  columnId: Scalars['ID']['input'];
  index: Scalars['Int']['input'];
};


export type MutationMoveItemArgs = {
  index: Scalars['Int']['input'];
  itemId: Scalars['ID']['input'];
  toListId: Scalars['ID']['input'];
};


export type MutationToggleDoneArgs = {
  done: Scalars['Boolean']['input'];
  itemId: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  kanban: Array<KanbanColumn>;
};

export type KanbanQueryVariables = Exact<{ [key: string]: never; }>;


export type KanbanQuery = { __typename?: 'Query', kanban: Array<{ __typename?: 'KanbanColumn', id: string, name: string, items: Array<{ __typename?: 'KanbanItem', id: string, name: string, done: boolean }> }> };

export type MoveItemMutationVariables = Exact<{
  itemId: Scalars['ID']['input'];
  toListId: Scalars['ID']['input'];
  index: Scalars['Int']['input'];
}>;


export type MoveItemMutation = { __typename?: 'Mutation', moveItem: Array<{ __typename?: 'KanbanColumn', id: string, name: string, items: Array<{ __typename?: 'KanbanItem', id: string, name: string, done: boolean }> }> };

export type MoveColumnMutationVariables = Exact<{
  columnId: Scalars['ID']['input'];
  index: Scalars['Int']['input'];
}>;


export type MoveColumnMutation = { __typename?: 'Mutation', moveColumn: Array<{ __typename?: 'KanbanColumn', id: string, name: string, items: Array<{ __typename?: 'KanbanItem', id: string, name: string, done: boolean }> }> };

export type AddItemMutationVariables = Exact<{
  toListId: Scalars['ID']['input'];
}>;


export type AddItemMutation = { __typename?: 'Mutation', addItem: Array<{ __typename?: 'KanbanColumn', id: string, name: string, items: Array<{ __typename?: 'KanbanItem', id: string, name: string, done: boolean }> }> };

export type ToggleDoneMutationVariables = Exact<{
  itemId: Scalars['ID']['input'];
  done: Scalars['Boolean']['input'];
}>;


export type ToggleDoneMutation = { __typename?: 'Mutation', toggleDone: Array<{ __typename?: 'KanbanColumn', id: string, name: string, items: Array<{ __typename?: 'KanbanItem', id: string, name: string, done: boolean }> }> };


export const KanbanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Kanban"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"kanban"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"done"}}]}}]}}]}}]} as unknown as DocumentNode<KanbanQuery, KanbanQueryVariables>;
export const MoveItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MoveItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"toListId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"index"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"moveItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"itemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}}},{"kind":"Argument","name":{"kind":"Name","value":"toListId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toListId"}}},{"kind":"Argument","name":{"kind":"Name","value":"index"},"value":{"kind":"Variable","name":{"kind":"Name","value":"index"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"done"}}]}}]}}]}}]} as unknown as DocumentNode<MoveItemMutation, MoveItemMutationVariables>;
export const MoveColumnDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MoveColumn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"columnId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"index"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"moveColumn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"columnId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"columnId"}}},{"kind":"Argument","name":{"kind":"Name","value":"index"},"value":{"kind":"Variable","name":{"kind":"Name","value":"index"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"done"}}]}}]}}]}}]} as unknown as DocumentNode<MoveColumnMutation, MoveColumnMutationVariables>;
export const AddItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"toListId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"toListId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toListId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"done"}}]}}]}}]}}]} as unknown as DocumentNode<AddItemMutation, AddItemMutationVariables>;
export const ToggleDoneDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"toggleDone"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"done"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"toggleDone"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"itemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}}},{"kind":"Argument","name":{"kind":"Name","value":"done"},"value":{"kind":"Variable","name":{"kind":"Name","value":"done"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"done"}}]}}]}}]}}]} as unknown as DocumentNode<ToggleDoneMutation, ToggleDoneMutationVariables>;