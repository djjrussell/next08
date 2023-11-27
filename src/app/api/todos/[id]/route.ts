import { NextResponse } from 'next/server'

const DATA_SOURCE_URL  = "https://jsonplaceholder.typicode.com/todos";

type Props = {
    params: {
        id: string
    }
}

export const GET = async (request: Request, {params: { id }}: Props) => {
    // const id = request.url.slice(request.url.lastIndexOf('/') + 1)
  const resp = await fetch(`${DATA_SOURCE_URL}/${id}`);

  const todo: ToDo = await resp.json();
    if(!todo.id) {
        return NextResponse.json({"message": "TODO NOT FOUND"})
    }
  return NextResponse.json(todo);
}