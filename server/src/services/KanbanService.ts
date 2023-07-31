import { KanbanColumn, KanbanItem } from "@prisma/client";
import { KanbanColumnDTO } from "../model/KanbanColumnDTO";
import { KanbanColumnItemDTO } from "../model/KanbanColumnItemDTO";
import { DatabaseService } from "./DatabaseService";

export class KanbanService {

        constructor() {
        }

        
        public async findKanbanColumnByID(columnID: number): Promise<KanbanColumn> {
            let column : KanbanColumn | null = await DatabaseService.prisma.kanbanColumn.findUnique({
                where: 
                {
                    id: columnID
                },
                select: {
                    id: true,
                    name: true,
                    items: true,
                    index: true
                }

            });
            return column === null ? {} as KanbanColumn : column;
        }

        public async findKanbanColumnItemByID(itemID: number): Promise<KanbanItem> { 
            let item : KanbanItem | null = await DatabaseService.prisma.kanbanItem.findUnique({
                where: 
                {
                    id: itemID
                },
                select: {
                    id: true,
                    done: true,
                    name: true,
                    kanbanColumn: true,
                    kanbanColumnId: true,
                    index: true
                }

            });
            return item === null ? {} as KanbanItem : item;
        }
    
        public async addKanbanColumn(kanbanColumn: KanbanColumnDTO): Promise<KanbanColumn> {
            let column: KanbanColumn = await DatabaseService.prisma.kanbanColumn.create({
                data: {
                    name: kanbanColumn.name,
                    index: kanbanColumn.index
                },
                select: {
                    id: true,
                    name: true,
                    items: true, 
                    index: true
                }
            })
            return column;
        }
    
        public async addKanbanColumnItem(kanbanColumnItem: KanbanColumnItemDTO, columnID: number): Promise<KanbanItem> {
            let item: KanbanItem = await DatabaseService.prisma.kanbanItem.create({
                data: {
                    done: kanbanColumnItem.done,
                    name: kanbanColumnItem.name,
                    index: kanbanColumnItem.index,
                    kanbanColumnId: columnID
                },
                select: {
                    id: true,
                    done: true,
                    name: true,
                    kanbanColumn: true,
                    kanbanColumnId: true,
                    index: true
                }
            })
            return item;
        }

        public async deleteKanbanColumn(columnID: number): Promise<KanbanColumn> {
            let column: KanbanColumn = await DatabaseService.prisma.kanbanColumn.delete({
                where: {
                    id: columnID
                },
                select: {
                    id: true,
                    name: true,
                    items: true,
                    index: true
                }
            })
            return column;
        }

        public async deleteKanbanColumnItem(itemID: number): Promise<KanbanItem> {
            let item: KanbanItem = await DatabaseService.prisma.kanbanItem.delete({
                where: {
                    id: itemID
                },
                select: {
                    id: true,
                    done: true,
                    name: true,
                    kanbanColumn: true,
                    kanbanColumnId: true,
                    index: true
                }
            })
            return item;
        }


        public async changeKanbanColumnName(columnID: number, name: string): Promise<KanbanColumn> {
            let column: KanbanColumn = await DatabaseService.prisma.kanbanColumn.update({
                where: {
                    id: columnID
                },
                data: {
                    name: name
                },
                select: {
                    id: true,
                    name: true,
                    items: true,
                    index: true
                }
            })
            return column;
        }

        public async changeKanbanColumnItemDone(itemID: number, done: boolean): Promise<KanbanItem> {
            let item: KanbanItem = await DatabaseService.prisma.kanbanItem.update({
                where: {
                    id: itemID
                },
                data: {
                    done: done
                },
                select: {
                    id: true,
                    done: true,
                    name: true,
                    kanbanColumn: true,
                    kanbanColumnId: true,
                    index: true
                }
            })
            return item;
        }

        public async changeKanbanColumnItemName(itemID: number, name: string): Promise<KanbanItem> {
            let item: KanbanItem = await DatabaseService.prisma.kanbanItem.update({
                where: {
                    id: itemID
                },
                data: {
                    name: name
                },
                select: {
                    id: true,
                    done: true,
                    name: true,
                    kanbanColumn: true,
                    kanbanColumnId: true,
                    index: true
                }
            })
            return item;
        }

        public async moveKanbanColumn(columnID: number, index: number, currentIndex: number): Promise<KanbanColumn> {
            let fromIndex: number = 0;
            let toIndex: number = 0;

            if (index > currentIndex) {
                fromIndex = currentIndex;
                toIndex = index;
                let cols = await this.updateKanbanColumnAboveCurrentIndex(fromIndex, toIndex);
            } else if (index < currentIndex) {
                fromIndex = index;
                toIndex = currentIndex;
                let cols = await this.updateKanbanColumnBelowCurrentIndex(fromIndex, toIndex);
            } else {
                console.log("no action needed");
            }
            let col: KanbanColumn = await DatabaseService.prisma.kanbanColumn.update({
                where: {
                    id: columnID
                },
                data: {
                    index: index
                },
                select: {
                    id: true,
                    name: true,
                    items: true,
                    index: true
                }
            })
            return col;
        }

        public async updateKanbanColumnAboveCurrentIndex(fromIndex: number, toIndex: number) {
            let cols = await DatabaseService.prisma.kanbanColumn.updateMany({
             where: {
                 AND: 
                     [
                         { index: { gte: fromIndex } }, 
                         { index: { lte: toIndex } }
                     ]
             },
             data: {
                 index: {
                     decrement:1
                 }
             }
            });
            return cols;
         }
 
         public async updateKanbanColumnBelowCurrentIndex(fromIndex: number, toIndex: number) {
             let cols = await DatabaseService.prisma.kanbanColumn.updateMany({
             where: {
                     AND: 
                         [
                             { index: { gte: fromIndex } }, 
                             { index: { lte: toIndex } }
                         ]
             },
              data: {
                  index: {
                      increment:1
                  }
              }
             });
             return cols;
          }

          public async moveKanbanItemWithinColumn(itemID: number, columnID: number, index: number, currentIndex: number): Promise<KanbanColumn> {
            let fromIndex: number = 0;
            let toIndex: number = 0;

            if (index > currentIndex) {
                fromIndex = currentIndex;
                toIndex = index;
                let cols = await this.updateKanbanItemsAboveCurrentIndex(columnID, fromIndex, toIndex)
            } else if (index < currentIndex) {
                fromIndex = index;
                toIndex = currentIndex;
                let cols = await this.updateKanbanItemsBelowCurrentIndex(columnID, fromIndex, toIndex)
            } else {
                console.log("no action needed")
            }
            let item: KanbanItem = await DatabaseService.prisma.kanbanItem.update({
                where: {
                    id: itemID
                },
                data: {
                    index: index
                },
                select: {
                    id: true,
                    done: true,
                    name: true,
                    kanbanColumn: true,
                    kanbanColumnId: true,
                    index: true
                }
            })
            return item;

        }

        public async updateKanbanItemsBelowCurrentIndex(columnID: number, fromIndex: number, toIndex: number): Promise<KanbanColumn> {
            let cols = await DatabaseService.prisma.kanbanColumn.update({
                where: {
                    id: columnID
                },
                data: {
                    items: {
                        updateMany: [
                            {
                                where: {
                                    AND: 
                                        [
                                            { index: { gte: fromIndex } }, 
                                            { index: { lte: toIndex } }
                                        ]
                                },
                                data: {
                                    index: {
                                        increment:1
                                    }
                                }
                            }
                        ]
                    }
                },
                select: {
                    id: true,
                    name: true,
                    items: true,
                    index: true
                }
            });
            return cols;
        }



        public async updateKanbanItemsAboveCurrentIndex(columnID: number, fromIndex: number, toIndex: number): Promise<KanbanColumn> {
            let cols = await DatabaseService.prisma.kanbanColumn.update({
                where: {
                    id: columnID
                },
                data: {
                    items: {
                        updateMany: [
                            {
                                where: {
                                    AND: 
                                        [
                                            { index: { gte: fromIndex } }, 
                                            { index: { lte: toIndex } }
                                        ]
                                },
                                data: {
                                    index: {
                                        decrement:1
                                    }
                                }
                            }
                        ]
                    }
                },
                select: {
                    id: true,
                    name: true,
                    items: true,
                    index: true
                }
            });
            return cols;
        }


        public async moveKanbanItemOutsideCurrentColumn(itemID: number, toColumnID: number, fromColumnID: number, index: number, currentIndex: number): Promise<KanbanItem> {
            let toCols = await this.updateKanbanItemsIndexToColumn(toColumnID, index);
            let fromCols = await this.updateKanbanItemsIndexFromColumn(fromColumnID, currentIndex);

            let item: KanbanItem = await DatabaseService.prisma.kanbanItem.update({
                where: {
                    id:itemID
                },
                data: {
                    kanbanColumnId: toColumnID,
                    index: index
                },
                select: {
                    id: true,
                    done: true,
                    name: true,
                    kanbanColumn: true,
                    kanbanColumnId: true,
                    index: true
                }
            })
            return item;
        }


        public async updateKanbanItemsIndexToColumn(toColumnID: number, index: number): Promise<KanbanColumn> {
            let cols = await DatabaseService.prisma.kanbanColumn.update({
                where: {
                    id: toColumnID
                },
                data: {
                    items: {
                        updateMany: [
                            {
                                where: {
                                    index: {gte: index}
                                },
                                data: {
                                    index: {
                                        increment:1
                                    }
                                }
                            }
                        ]
                    }
                },
                select: {
                    id: true,
                    name: true,
                    items: true,
                    index: true
                }
            });
            return cols;
        }

        public async updateKanbanItemsIndexFromColumn(fromColumnID: number, index: number): Promise<KanbanColumn> {
            let cols = await DatabaseService.prisma.kanbanColumn.update({
                where: {
                    id:fromColumnID
                },
                data: {
                    items: {
                        updateMany: [
                            {
                                where: {
                                    index: {gte: index}
                                },
                                data: {
                                    index: {
                                        decrement:1
                                    }
                                }
                            }
                        ]
                    }
                },
                select: {
                    id: true,
                    name: true,
                    items: true,
                    index: true
                }
            });
            return cols;
        }

        public async getAllKanbanColumns(): Promise<KanbanColumn[]> {
            let kanbanColumns: KanbanColumn[] = await DatabaseService.prisma.kanbanColumn.findMany({
                select: {
                    id: true,
                    name: true,
                    index: true,
                    items: {
                        select: {
                            id: true,
                            done: true,
                            name: true,
                            kanbanColumn: true,
                            kanbanColumnId: true,
                            index: true
                        },
                        orderBy: {
                            index: "asc"
                        }
                    }
                },
                orderBy: {
                    index: "asc"
                }
            });
            return kanbanColumns;
        }

        public async getCountItemsInColumn(columnID: number): Promise<number> { 
            let count: number = await DatabaseService.prisma.kanbanItem.count({
                where: {
                    kanbanColumnId: columnID
                }
            })
            return count;
        }

        public async getCountColumns(): Promise<number> { 
            let count: number = await DatabaseService.prisma.kanbanColumn.count({
            })
            return count;
        }

        public async getCountItems(): Promise<number> { 
            let count: number = await DatabaseService.prisma.kanbanItem.count({
            })
            return count;
        }
}



