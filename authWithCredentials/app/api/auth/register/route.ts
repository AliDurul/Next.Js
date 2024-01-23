import { NextResponse } from "next/server";


export  async function POST(request: Request) {
    try {
        const { email, password, firstName, lastName, nrcNo, phoneNO, address, role, } = await request.json()

        const response = await fetch(`http://localhost:8000/auth/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstName,
              lastName,
              nrcNo,
              phoneNO,
              address,
              role,
              email,
              password,
            }),
          });
      
          if (response.ok) {
            const data = await response.json();
            console.log("Login successful:", data);
          } else {
            console.error(
              "Login failed:",
              response.status,
              response.statusText,
              await response.json()
            );
          }

          

    } catch (error) {
        console.log(error);
    }


return NextResponse.json({msg:'success'})

}