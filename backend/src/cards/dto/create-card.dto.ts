export class CreateCardDto {
  name: string;
  description: string;
  order: number;
  users: string[];
  listId: string;
  boardId: string;
}
