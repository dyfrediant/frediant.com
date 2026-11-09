"use client";

import { useActionState, useState } from "react";
import { EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react";
import { loginAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm({
  next,
  devHint,
}: {
  next: string;
  devHint: string | null;
}) {
  const [state, formAction, pending] = useActionState(loginAction, null);
  const [visible, setVisible] = useState(false);

  return (
    <form action={formAction} className="mt-8 space-y-4">
      <input type="hidden" name="next" value={next} />

      <div>
        <label htmlFor="password" className="field-label">
          Password
        </label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={visible ? "text" : "password"}
            autoComplete="current-password"
            autoFocus
            required
            placeholder="Enter your password"
            className="h-11 pr-11"
            aria-invalid={state?.error ? true : undefined}
            aria-describedby={state?.error ? "login-error" : undefined}
          />
          <button
            type="button"
            onClick={() => setVisible((value) => !value)}
            aria-label={visible ? "Hide password" : "Show password"}
            className="absolute right-1 top-1 inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
          >
            {visible ? (
              <EyeOffIcon className="size-4" />
            ) : (
              <EyeIcon className="size-4" />
            )}
          </button>
        </div>
      </div>

      {state?.error && (
        <p
          id="login-error"
          role="alert"
          className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {state.error}
        </p>
      )}

      <Button
        type="submit"
        disabled={pending}
        className="h-11 w-full gap-2 rounded-full text-sm"
      >
        {pending && <Loader2Icon className="size-4 animate-spin" />}
        {pending ? "Signing in…" : "Sign in"}
      </Button>

      {devHint && (
        <p className="rounded-md border border-border bg-muted/60 px-3 py-2 font-mono text-[11px] text-muted-foreground">
          {devHint}
        </p>
      )}
    </form>
  );
}
