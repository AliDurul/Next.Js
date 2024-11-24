"use server";

import { revalidatePath, revalidateTag } from "next/cache";

// CREATE TABLE todos (
//   id SERIAL PRIMARY KEY,
//   text TEXT NOT NULL
// );

export async function createTodo(prevState: { message: string; }, formData: FormData,) {

    try {
        const response = await fetch("https://64ecd95ff9b2b70f2bfb0943.mockapi.io/todos", {
            method: "POST",
            body: JSON.stringify({ todo: formData.get("todo") }),
            headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        revalidateTag("todos");
        return { message: `Added todo ${data.todo}` };
    } catch (e) {
        return { message: "Failed to create todo" };
    }
}
export async function deleteTodo(prevState: { message: string; }, formData: FormData,) {

    try {
        const id = formData.get("id");
        const response = await fetch(`https://64ecd95ff9b2b70f2bfb0943.mockapi.io/todos/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        revalidateTag("todos");
        return { message: `Added todo ${data.todo}` };
    } catch (e) {
        return { message: "Failed to create todo" };
    }
}

