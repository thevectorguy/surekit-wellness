import { Router, type IRouter } from "express";
import { z } from "zod";
import {
  appendContactSubmission,
  type ContactSubmission,
} from "../lib/contact-sheet.js";
import { logger } from "../lib/logger.js";

const contactRouter: IRouter = Router();

const contactSubmissionSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(120),
  email: z.string().trim().email("Valid email is required"),
  service: z.string().trim().min(1, "Please select a service").max(120),
  date: z.string().trim().optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please provide a brief message")
    .max(5000, "Please keep your message under 5000 characters"),
});

contactRouter.post("/contact", async (req, res) => {
  const parsedRequest = contactSubmissionSchema.safeParse(req.body);

  if (!parsedRequest.success) {
    res.status(400).json({
      error: "Please review your contact details and try again.",
      details: parsedRequest.error.flatten(),
    });
    return;
  }

  try {
    await appendContactSubmission(parsedRequest.data satisfies ContactSubmission);
    res.status(201).json({ ok: true });
  } catch (error) {
    logger.error({ error }, "Failed to store contact form submission");
    res.status(500).json({
      error:
        "We couldn't send your message right now. Please try again after the Google Sheets connection is configured.",
    });
  }
});

export default contactRouter;
