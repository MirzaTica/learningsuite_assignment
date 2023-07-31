import {forwardRef} from "react";
import {Card, CardContent, CardProps, Checkbox, Stack, Typography} from "@mui/material";
import { graphql } from "../gql";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import request from "graphql-request";
import { GRAPHQL_SERVER } from "../Kanban";

const MUTATE_TOGGLE_DONE = graphql(/* GraphQL */`
    mutation toggleDone($itemId: ID!, $done: Boolean!) {
        toggleDone(itemId: $itemId, done: $done) {
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

export const KanbanItem = forwardRef(function ({
                                                   id,
                                                   title,
                                                   done,
                                                   ...cardProps
                                               }: { id: string, title: string, done:boolean } & CardProps, ref: any) {

    const client = useQueryClient()

    const toggleDoneMutation = useMutation({
        mutationFn: async (variables: { itemId: string, done: boolean }) => {
            return request(GRAPHQL_SERVER, MUTATE_TOGGLE_DONE, variables)
        },
        onSuccess: (data, variables) => {
            client.invalidateQueries(['kanban']);
        },        
    });
    return (
        <Card ref={ref} {...cardProps}>
            <CardContent>
                <Stack spacing={2} direction="row" alignItems="center">
                    <Checkbox checked={done} onChange={() => toggleDoneMutation.mutate({
                        itemId: id,
                        done: !done
                    })}/>
                    <Typography variant="h6">{title}</Typography>
                </Stack>
            </CardContent>
        </Card>
    );
})