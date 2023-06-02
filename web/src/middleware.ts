import { NextRequest, NextResponse } from 'next/server'

const signInURL = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(signInURL, {
      headers: {
        'Set-Cookie': `redirectTo=${request.url}; Path=/; HttpOnly; max-age=20;`,
        // armazena a informação da url que o usuário estava tentando acessar, para redirecioná-lo após o login.
        // HttpOnly é uma flag que torna o cookie inacessível para ao client side script do browser, somente acessível no server side.
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/memories/:path*',
}

// caso o usuário tente acessar a rota não estando logado, ele é redirecionado para o login no github.
