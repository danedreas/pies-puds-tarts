"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().optional(),
  phone: z.string().optional(),
  projectType: z.string().min(1, "Please choose what your message is about"),
  message: z.string().min(10, "Please add a few more details"),
  consent: z.literal(true, {
    message: "Consent is required to send your message",
  }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

function readContactPrefill(searchParams: URLSearchParams): Pick<ContactFormValues, "projectType" | "message"> {
  const type = searchParams.get("type");
  const message = searchParams.get("message") ?? "";
  const projectType =
    type && (siteConfig.projectTypes as readonly string[]).includes(type) ? type : "";

  return { projectType, message };
}

export function ContactForm({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const prefill = readContactPrefill(searchParams);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      projectType: prefill.projectType,
      message: prefill.message,
      consent: undefined,
    },
  });

  const consent = watch("consent");
  const projectType = watch("projectType");

  async function onSubmit(values: ContactFormValues) {
    setStatus("loading");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className={cn("surface-soft p-6 sm:p-8", className)}>
        <h2 className="font-heading text-xl font-semibold">Message sent</h2>
        <p className="mt-2 text-muted-foreground">
          Thanks for your message. We'll get back to you as soon as we can.
        </p>
        <Button className="mt-6" variant="outline" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("space-y-5 surface-soft p-6 sm:p-8", className)}
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input id="name" autoComplete="name" {...register("name")} />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" autoComplete="email" {...register("email")} />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input id="company" autoComplete="organization" {...register("company")} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" autoComplete="tel" {...register("phone")} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="projectType">What is it about? *</Label>
        <Select
          value={projectType || undefined}
          onValueChange={(value) => setValue("projectType", value, { shouldValidate: true })}
        >
          <SelectTrigger id="projectType" className="w-full">
            <SelectValue placeholder="Choose a topic" />
          </SelectTrigger>
          <SelectContent>
            {siteConfig.projectTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.projectType && (
          <p className="text-sm text-destructive">{errors.projectType.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Your message *</Label>
        <Textarea
          id="message"
          rows={5}
          placeholder="Which market you're collecting from, what you'd like to order, or anything else we should know."
          {...register("message")}
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-start gap-3">
          <Checkbox
            id="consent"
            className="mt-1 shrink-0"
            checked={consent === true}
            onCheckedChange={(checked) =>
              setValue("consent", checked === true ? true : (undefined as unknown as true), {
                shouldValidate: true,
              })
            }
          />
          <Label
            htmlFor="consent"
            className="min-w-0 flex-1 items-start font-normal text-muted-foreground"
          >
            <span className="block text-sm leading-relaxed text-pretty">
              I consent to data processing per GDPR.{" "}
              <Link href="/privacy" className="text-foreground underline-offset-4 hover:underline">
                View Privacy Policy
              </Link>
            </span>
          </Label>
        </div>
        {errors.consent && (
          <p className="pl-7 text-sm text-destructive">{errors.consent.message}</p>
        )}
      </div>

      {status === "error" && errorMessage && (
        <p className="text-sm text-destructive" role="alert">
          {errorMessage}
        </p>
      )}

      <Button type="submit" disabled={status === "loading"} className="w-full rounded-full sm:w-auto">
        {status === "loading" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          "Send message"
        )}
      </Button>
    </form>
  );
}
