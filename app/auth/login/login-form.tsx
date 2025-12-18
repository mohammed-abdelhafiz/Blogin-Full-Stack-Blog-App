"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";

import { authClient } from "@/lib/auth-client";
import { LoginData, loginSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { FormButton } from "@/components/custom/form-button";

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data: LoginData) => {
    startTransition(async () => {
      await authClient.signIn.email({
        email: data.email,
        password: data.password,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged in successfully");
            router.push("/");
          },
          onError: ({ error }) => {
            toast.error(error.message);
          },
        },
      });
    });
  };
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-y-4">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                aria-invalid={fieldState.invalid}
                placeholder="johnDoe@gmail.com"
                type="email"
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Password</FieldLabel>
              <Input
                aria-invalid={fieldState.invalid}
                placeholder="* * * * * * * *"
                type="password"
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <FormButton isPending={isPending}>Login</FormButton>
      </FieldGroup>
      <div className="flex items-center mt-2 mx-2">
        <p className="text-sm">Don&apos;t have an account?</p>
        <Link
          href="/auth/sign-up"
          className={buttonVariants({ variant: "link", size: "sm" })}
        >
          Sign Up
        </Link>
      </div>
    </form>
  );
};
