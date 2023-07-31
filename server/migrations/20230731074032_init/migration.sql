-- CreateTable
CREATE TABLE "KanbanColumn" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "index" INTEGER NOT NULL,

    CONSTRAINT "KanbanColumn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KanbanItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL,
    "kanbanColumnId" INTEGER,
    "index" INTEGER NOT NULL,

    CONSTRAINT "KanbanItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "KanbanItem" ADD CONSTRAINT "KanbanItem_kanbanColumnId_fkey" FOREIGN KEY ("kanbanColumnId") REFERENCES "KanbanColumn"("id") ON DELETE SET NULL ON UPDATE CASCADE;
