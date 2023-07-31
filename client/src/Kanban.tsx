import {Box, Stack} from "@mui/material";
import {DragDropContext, Droppable, DropResult, ResponderProvided} from 'react-beautiful-dnd'
import request from 'graphql-request'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {graphql} from './gql'
import {useCallback} from "react";
import {DraggableKanbanList} from "./components/DraggableKanbanList";
import {KanbanQuery} from "./gql/graphql";

export const GRAPHQL_SERVER = 'http://localhost:4000/graphql';

const KANBAN_QUERY = graphql(/* GraphQL */`
    query Kanban {
        kanban {
            id
            name
            items {
                id
                name
                done
            }
        }
    }
`)

const MUTATE_MOVE_ITEM = graphql(/* GraphQL */`
    mutation MoveItem($itemId: ID!, $toListId: ID!, $index: Int!) {
        moveItem(itemId: $itemId, toListId: $toListId, index: $index) {
            id
            name
            items {
                id
                name
                done
            }
        }
    }
`)


const MUTATE_MOVE_COLUMN = graphql(/* GraphQL */`
    mutation MoveColumn($columnId: ID!, $index: Int!) {
        moveColumn(columnId: $columnId, index: $index) {
            id
            name
            items {
                id
                name
                done
            }
        }
    }
`)

export function Kanban() {
    const {data} = useQuery({
        queryKey: ['kanban'],
        queryFn: async () =>
            request(
                GRAPHQL_SERVER,
                KANBAN_QUERY,
            ),
    });

    const client = useQueryClient()

    const moveItemMutation = useMutation({
        mutationFn: async (variables: { itemId: string, toListId: string, index: number }) => {
            return request(
                GRAPHQL_SERVER, 
                MUTATE_MOVE_ITEM,
                variables,
            )
        }, 
        onSuccess: (data, variables) => {
            client.invalidateQueries(['kanban']);
        }
    });

    const moveColumnMutation = useMutation({
        mutationFn: async (variables: { columnId: string, index: number }) => {
            return request(
                GRAPHQL_SERVER, 
                MUTATE_MOVE_COLUMN,
                variables,
            )
        }, 
        onSuccess: (data, variables) => {
            client.invalidateQueries(['kanban']);
        }
    })

    const handleOnDragEnd = useCallback(async (result: DropResult, provided: ResponderProvided) => {
        if (!result.destination) return;
        if (result.destination.index === result.source.index && result.source.droppableId === result.destination.droppableId) return;
        if (result.reason === 'CANCEL') return;
        if (result.type === 'item') {
            moveItemMutation.mutate({
                index: result.destination.index,
                itemId: result.draggableId,
                toListId: result.destination.droppableId,
            });
        }
        if(result.type === 'column' && result.destination.droppableId === 'kanban') {
            moveColumnMutation.mutate({
                columnId: result.draggableId,
                index: result.destination.index
            });
        }

    }, [])

    return (
        <Box sx={{paddingBottom: 4}}>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId={'kanban'} direction={'horizontal'} type={'column'}>
                    {(provided) => (
                        <Stack spacing={2} margin={5} direction="row"
                               ref={provided.innerRef}
                               {...provided.droppableProps}
                        >
                            {
                                data?.kanban.map((list, index) => (
                                    <DraggableKanbanList key={list.id} id={list.id} title={list.name} items={list.items}
                                                         index={index}/>
                                ))
                            }
                            {provided.placeholder}
                        </Stack>
                    )}
                </Droppable>
            </DragDropContext>
        </Box>
    );
}

export default Kanban;