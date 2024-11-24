"use client";

import { createTodo } from "@/actions/use-form-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

const initialState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending}>
      Add
    </Button>
  );
}

export function AddForm() {
  const [state, formAction] = useActionState(createTodo, initialState);


  return (
    <form action={formAction} className="flex gap-3 items-center">
      <Input type="text" id="todo" name="todo" className="text-red-600" required  placeholder="Enter new Todo"/>
      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}