interface ITodo {
    id: string;
    name: string;
    description: string;
    status: boolean;
    createdAt?: string;
    updatedAt?: string;
}

interface IGet {
    requestType: string;
}

type TodoProps = {
    todo: ITodo;
}

type ApiDataType = {
    message: string;
    status: string;
    todoList: ITodo[];
    todo?: ITodo;
    data: any;
  }
  