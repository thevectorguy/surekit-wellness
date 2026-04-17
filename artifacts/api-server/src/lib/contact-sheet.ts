import { google } from "googleapis";

const GOOGLE_SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const SHEET_RANGE_COLUMNS = "A:E";

export type ContactSubmission = {
  name: string;
  email: string;
  service: string;
  date?: string;
  message: string;
};

type ContactSheetConfig = {
  spreadsheetId: string;
  clientEmail: string;
  privateKey: string;
  sheetName?: string;
};

function getRequiredEnv(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getContactSheetConfig(): ContactSheetConfig {
  return {
    spreadsheetId: getRequiredEnv("GOOGLE_CONTACT_SHEET_ID"),
    clientEmail: getRequiredEnv("GOOGLE_CONTACT_SERVICE_ACCOUNT_EMAIL"),
    privateKey: getRequiredEnv(
      "GOOGLE_CONTACT_SERVICE_ACCOUNT_PRIVATE_KEY",
    ).replace(/\\n/g, "\n"),
    sheetName: process.env["GOOGLE_CONTACT_SHEET_NAME"]?.trim() || undefined,
  };
}

function createSheetsClient(config: ContactSheetConfig) {
  const auth = new google.auth.JWT({
    email: config.clientEmail,
    key: config.privateKey,
    scopes: [GOOGLE_SHEETS_SCOPE],
  });

  return google.sheets({
    version: "v4",
    auth,
  });
}

async function resolveSheetName(config: ContactSheetConfig) {
  if (config.sheetName) {
    return config.sheetName;
  }

  const sheets = createSheetsClient(config);
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId: config.spreadsheetId,
    fields: "sheets.properties.title",
  });
  const firstSheetTitle = spreadsheet.data.sheets?.[0]?.properties?.title?.trim();

  if (!firstSheetTitle) {
    throw new Error("No worksheet tabs were found in the configured spreadsheet.");
  }

  return firstSheetTitle;
}

function buildStoredMessage(submission: ContactSubmission) {
  const lines = [submission.message.trim()];

  if (submission.date?.trim()) {
    lines.push(`Preferred date: ${submission.date.trim()}`);
  }

  return lines.join("\n");
}

export async function appendContactSubmission(submission: ContactSubmission) {
  const config = getContactSheetConfig();
  const sheetName = await resolveSheetName(config);
  const sheets = createSheetsClient(config);

  await sheets.spreadsheets.values.append({
    spreadsheetId: config.spreadsheetId,
    range: `'${sheetName.replace(/'/g, "''")}'!${SHEET_RANGE_COLUMNS}`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        [
          new Date().toISOString(),
          buildStoredMessage(submission),
          submission.name.trim(),
          submission.email.trim(),
          submission.service.trim(),
        ],
      ],
    },
  });
}
