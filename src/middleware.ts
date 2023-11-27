import { NextResponse } from "next/server"

const allowedOrigins = process.env.NODE_ENV === 'production' ? [] : ['http://localhost:3000', 'http://127.0.0.7:3000', 'https://www.google.com']

export const middleware = (request: Request) => {
    const origin = request.headers.get('origin');
    if(origin && !allowedOrigins.includes(origin)){
        return new NextResponse(null, {
            status: 400,
            statusText: "Bad Request",
            headers: {
                "Content-Type": "text/plain"
            }
        })
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/api/:path*'
}