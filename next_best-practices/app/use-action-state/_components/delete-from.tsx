"use client";

import { deleteTodo } from "@/actions/use-form-state";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

const initialState = {
    message: "",
};

function DeleteButton() {
    const { pending } = useFormStatus();

    return (
        <Button variant={"outline"} type="submit" className="border" disabled={pending}>
            Delete
        </Button>
    );
}

export function DeleteForm({ id, todo }: { id: number; todo: string }) {
    const [state, formAction] = useActionState(deleteTodo, initialState);

    return (
        <form action={formAction}>
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="todo" value={todo} />
            <DeleteButton />
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    );
}