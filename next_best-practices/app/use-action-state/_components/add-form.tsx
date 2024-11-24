"use client";

import { createTodo } from "@/actions/use-form-state";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

const initialState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      Add
    </button>
  );
}

export function AddForm() {
  const [state, formAction] = useActionState(createTodo, initialState);


  return (
    <form action={formAction} className="flex gap-3 items-center">
      <label htmlFor="todo">Enter Task</label>
      <input type="text" id="todo" name="todo" className="text-red-600" required />
      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}