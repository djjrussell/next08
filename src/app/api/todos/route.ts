import { NextResponse } from 'next/server'

const DATA_SOURCE_URL  = "https://jsonplaceholder.typicode.com/todos";
const API_KEY: string = process.env.DATA_API_KEY as string;

export const GET = async (request: Request) => {
    const origin = request.headers.get('origin');
  const resp = await fetch(DATA_SOURCE_URL);

  const todos: ToDo[] = await resp.json();

  return new NextResponse(JSON.stringify(todos), {
    headers: {
        'Access-Control-Allow-Origin': origin || '*',
        "Content-Type": "application/json"
      }
  });
}


export const DELETE = async (request: Request) => {
    const {id}: Partial<ToDo> = await request.json();
    if(!id) return NextResponse.json({"message": "todo id required"});

    await fetch(`${DATA_SOURCE_URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "API_KEY": API_KEY
        }
    });

    return NextResponse.json({message: `Todo ${id} deleted`})
}

export const POST = async (request: Request) => {
    const { userId, title }: Partial<ToDo> = await request.json();
    if(!userId || !title) return NextResponse.json({"message": "missing required data"});

    const res = await fetch(DATA_SOURCE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "API_KEY": API_KEY
        },
        body:  JSON.stringify({
            userId, title, completed: false
        })
    });

    const newToDo: ToDo = await res.json();

    return NextResponse.json(newToDo)
}

export const PUT = async (request: Request) => {
    const { id, userId, title, completed }: ToDo = await request.json();
    if(!userId || !title || !id || typeof completed !== "boolean") return NextResponse.json({"message": "missing required data"});

    const res = await fetch(`${DATA_SOURCE_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "API_KEY": API_KEY
        },
        body:  JSON.stringify({
            userId, title, completed
        })
    });

    const updatedToDo: ToDo = await res.json();

    return NextResponse.json(updatedToDo)
}