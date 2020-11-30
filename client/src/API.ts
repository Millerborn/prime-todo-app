import axios, { AxiosResponse } from 'axios'

// API Gateway URL (Copy your own and update here)
const apiGatewayUrl: string = 'edit-here';
const baseUrl: string = 'https://cors-anywhere.herokuapp.com/' + apiGatewayUrl + '/primeTodoLambda';

export const getTodoList = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todoList: AxiosResponse<ApiDataType> = await axios.post(baseUrl, {
      requestType: 'read'
    });
    return todoList;
  } catch (error) {
    throw new Error(error)
  }
}

export const addTodo = async (
  formData: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todo = {
      name: formData.name,
      description: formData.description,
      status: false,
      requestType: 'create'
    }
    const saveTodo: AxiosResponse<ApiDataType> = await axios.post(
      baseUrl,
      todo
    )
    return saveTodo
  } catch (error) {
    throw new Error(error)
  }
}

export const updateTodo = async (
  formData: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todo = {
      id: formData.id,
      name: formData.name,
      description: formData.description,
      status: true,
      requestType: 'update'
    }
    const updatedTodo: AxiosResponse<ApiDataType> = await axios.post(
      baseUrl,
      todo
    )
    return updatedTodo
  } catch (error) {
    throw new Error(error)
  }
}

export const deleteTodo = async (
  id: string
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const deleteParams = {
      id: id,
      requestType: 'delete'
    }
    const deletedTodo: AxiosResponse<ApiDataType> = await axios.post(baseUrl, deleteParams);
    return deletedTodo
  } catch (error) {
    throw new Error(error)
  }
}
