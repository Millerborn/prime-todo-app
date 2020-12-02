import axios, { AxiosResponse } from 'axios'

// API Gateway URL (Copy your own and update here)
const apiGatewayUrl: string = 'api_gateway_invoke_url';
const baseUrl: string = 'https://cors-anywhere.herokuapp.com/' + apiGatewayUrl + '/primeTodoLambda';

export const getTodoList = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const params = { "requestType": 'read' };
    console.log('Get TODO Items with Params:', params);
    const todoList: AxiosResponse<ApiDataType> = await axios.post(
      baseUrl,
      params
    );
    console.log('Get Response:', todoList);
    return todoList;
  } catch (error) {
    throw new Error(error)
  }
}

export const addTodo = async (
  formData: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const params = {
      name: formData.name,
      description: formData.description,
      requestType: 'create'
    }
    console.log('Add TODO Item with Params:', params);
    const saveTodo: AxiosResponse<ApiDataType> = await axios.post(
      baseUrl,
      params
    )
    console.log('Save Response:', saveTodo);
    return saveTodo
  } catch (error) {
    throw new Error(error)
  }
}

export const updateTodo = async (
  formData: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const params = {
      id: formData.id,
      name: formData.name,
      description: formData.description,
      status: true,
      requestType: 'update'
    }
    console.log('Update TODO Item with Params:', params);
    const updatedTodo: AxiosResponse<ApiDataType> = await axios.post(
      baseUrl,
      params
    )
    console.log('Update Response:', updatedTodo);
    return updatedTodo
  } catch (error) {
    throw new Error(error)
  }
}

export const deleteTodo = async (
  id: string
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const params = {
      id: id,
      requestType: 'delete'
    }
    console.log('Delete TODO Item with Params:', params);
    const deletedTodo: AxiosResponse<ApiDataType> = await axios.post(
      baseUrl,
      params
    );
    console.log('Delete Response:', deletedTodo);
    return deletedTodo
  } catch (error) {
    throw new Error(error)
  }
}
