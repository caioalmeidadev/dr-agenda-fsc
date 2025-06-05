"use server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

const upsetDoctorSchema = z
  .object({
    id: z.string().uuid().optional(),
    name: z.string().trim().min(1),
    specialty: z.string().trim().min(1),
    appontmentPriceInCents: z.number().min(1),
    availableFromWeekDay: z.number().min(0).max(6),
    availableToWeekDay: z.number().min(0).max(6),
    availableFromTime: z.string(),
    availableToTime: z.string(),
  })
  .refine(
    (data) => {
      return data.availableFromTime < data.availableToTime;
    },
    {
      message:
        "O horário de inicio não pode ser superior ao horário de termino.",
      path: ["availableFromTime"],
    },
  );

export type UpsetDoctorSchema = z.infer<typeof upsetDoctorSchema>;

dayjs.extend(utc);

export const UpsetDoctor = actionClient
  .schema(upsetDoctorSchema)
  .action(async ({ parsedInput }) => {
    const from = dayjs()
      .day(parsedInput.availableFromWeekDay)
      .set("hour", Number(parsedInput.availableFromTime.split(":")[0]))
      .set("minute", Number(parsedInput.availableFromTime.split(":")[1]))
      .set("second", Number(parsedInput.availableFromTime.split(":")[2] || 0))
      .utc();
    const to = dayjs()
      .day(parsedInput.availableToWeekDay)
      .set("hour", Number(parsedInput.availableToTime.split(":")[0]))
      .set("minute", Number(parsedInput.availableToTime.split(":")[1]))
      .set("second", Number(parsedInput.availableToTime.split(":")[2] || 0))
      .utc();

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }
    if (!session?.user.clinic) {
      throw new Error("Clinic not found");
    }
    await db
      .insert(doctorsTable)
      .values({
        clinicId: session.user.clinic.id,
        id: parsedInput.id,
        ...parsedInput,
        availableToTime: to.format("HH:mm:ss"),
        availableFromTime: from.format("HH:mm:ss"),
      })
      .onConflictDoUpdate({
        target: [doctorsTable.id],
        set: { ...parsedInput },
      });

    revalidatePath("/doctors");
  });
