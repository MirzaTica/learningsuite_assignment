import {Draggable, Droppable} from "react-beautiful-dnd";
import {KanbanList} from "./KanbanList";
import {Button, Stack} from "@mui/material";
import {DraggableKanbanItem} from "./DraggableKanbanItem";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { graphql } from "../gql";
import request from "graphql-request";
import { GRAPHQL_SERVER } from "../Kanban";

const MUTATE_ADD_ITEM = graphql(/* GraphQL */`
    mutation AddItem($toListId: ID!) {
        addItem(toListId: $toListId) {
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

export function DraggableKanbanList({
                                        index,
                                        title, items, id
                                    }: { title: string, id: string, items: { id: string, name: string, done: boolean }[], index: any }) {
                                        
    const client = useQueryClient()

    const addItemMutation = useMutation({
        mutationFn: async (variables: { toListId: string }) => {
            return request(GRAPHQL_SERVER, MUTATE_ADD_ITEM, variables)
        },
        onSuccess: (data, variables) => {
            client.invalidateQueries(['kanban']);
        },        
    });
    return <Draggable draggableId={id} index={index}>
        {(provided) => (
            <KanbanList
                title={title}
                {...provided.draggableProps} {...provided.dragHandleProps}
                ref={provided.innerRef}>
                <Droppable droppableId={id}
                           direction={'vertical'} type={'item'}>
                    {(provided) => (
                        <Stack spacing={2} ref={provided.innerRef}
                               {...provided.droppableProps}>
                            {
                                items.map((item, index) => (
                                    <DraggableKanbanItem key={item.id} item={item} index={index}/>
                                ))
                            }
                            {provided.placeholder}
                        </Stack>
                    )}
                </Droppable>
                <Button onClick={() =>  addItemMutation.mutate({
                    toListId: id
                })}>Add item</Button>
            </KanbanList>
        )}
    </Draggable>;
}