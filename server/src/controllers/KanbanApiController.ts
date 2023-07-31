import { KanbanColumn } from "@prisma/client";
import { KanbanColumnDTO } from "../model/KanbanColumnDTO";
import { KanbanColumnItemDTO } from "../model/KanbanColumnItemDTO";
import { KanbanService } from "../services/KanbanService";

export class KanbanApiController {

    private kanbanService: KanbanService = new KanbanService();

    constructor() { }

    async kanban(): Promise<KanbanColumn[]> {
        return this.kanbanService.getAllKanbanColumns();
    }

    async addItem({toListId}: {toListId:string}): Promise<KanbanColumn[]> {
        let countItemsInColumn: number = await this.kanbanService.getCountItemsInColumn(parseInt(toListId));
        let countOverallItems: number = await this.kanbanService.getCountItems();

        let kanbanColumnItem: KanbanColumnItemDTO = {
            name: 'Item ' + (countOverallItems + 1),
            done: false,
            index: countItemsInColumn
        }
        let item = await this.kanbanService.addKanbanColumnItem(kanbanColumnItem, parseInt(toListId))
        return this.kanbanService.getAllKanbanColumns();
    }

    async addColumn({name}: {name:string}): Promise<KanbanColumn[]> {
        let countColumns: number = await this.kanbanService.getCountColumns();
        let kanbanColumn: KanbanColumnDTO = {
            name: name + " " + (countColumns + 1),
            index: countColumns
        }
        let col =  await this.kanbanService.addKanbanColumn(kanbanColumn);
        return this.kanbanService.getAllKanbanColumns();
    }

    async moveItem({itemId, toListId, index}: {itemId: string, toListId: string, index: number}): Promise<KanbanColumn[]> {
        let currentItem = await this.kanbanService.findKanbanColumnItemByID(parseInt(itemId));
        let fromListId: number = currentItem?.kanbanColumnId ?? 0;
        if (fromListId === parseInt(toListId)) {
            let item = await this.kanbanService.moveKanbanItemWithinColumn(parseInt(itemId), parseInt(toListId), index, currentItem?.index ?? 0);
        } else {
            let item = await this.kanbanService.moveKanbanItemOutsideCurrentColumn(parseInt(itemId), parseInt(toListId), fromListId , index, currentItem?.index ?? 0);
        }
        return this.kanbanService.getAllKanbanColumns();
    } 
    
    async moveColumn({columnId, index} : {columnId: string, index: number}): Promise<KanbanColumn[]> {
        let currentColumn = await this.kanbanService.findKanbanColumnByID(parseInt(columnId));
        let cols = await this.kanbanService.moveKanbanColumn(parseInt(columnId), index, currentColumn?.index?? 0);

        return this.kanbanService.getAllKanbanColumns();
    }

    async toggleDone({ itemId, done } : { itemId: string; done: boolean }): Promise<KanbanColumn[]> {
        let currentItem = await this.kanbanService.changeKanbanColumnItemDone(parseInt(itemId), done);
        return this.kanbanService.getAllKanbanColumns();
    }

}