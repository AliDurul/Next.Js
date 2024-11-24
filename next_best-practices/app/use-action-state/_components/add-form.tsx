"use client";

import { createTodo } from "@/actions/use-form-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";
import { z } from 'zod';

const initialState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      Add
    </Button>
  );
}

export function AddForm() {

  const [state, formAction] = useActionState(createTodo, initialState);


  return (
    <form action={formAction} className="flex gap-3 items-center">
      <Input type="text" id="todo" name="todo" className="text-red-600" placeholder="Enter new Todo" />
      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}