import { google, sheets_v4 as SheetsV4 } from "googleapis";
import dayjs from "dayjs";
import config from "../utils/config";

// Read and write shenanigans to Google Sheets
export class SpreadsheetClient {
  constructor(private client: SheetsV4.Sheets) {}

  static async build() {
    const auth = await google.auth.getClient({
      credentials: {
        client_email: config.GOOGLE_CLIENT_EMAIL,
        private_key: config.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    return new SpreadsheetClient(google.sheets({ version: "v4", auth }));
  }
  // Go through each sheet ranges in the spreadsheet an return the values
  async getValues(spreadsheetId: string, range = "A:B") {
    const sheets = await this.client.spreadsheets.get({ spreadsheetId });

    const response = await Promise.all(
      sheets?.data?.sheets?.map(async (sheet) => {
        const { data } = await this.client.spreadsheets.values.get({
          spreadsheetId,
          range: `${sheet.properties.title}!${range}`,
        });
        return { title: sheet.properties.title, values: data.values };
      })
    );

    return response;
  }
  async setValues(spreadsheetId: string, data: any) {
    const response = await this.client.spreadsheets.get({
      spreadsheetId,
    });

    const sheets = response?.data.sheets.map((res) => res.properties);

    // The user didn't input anything so don't write anything
    if (!data.length) {
      return [];
    }
    const requests = await Promise.all(
      data.map(async (value, idx) => ({
        appendCells: {
          sheetId: sheets.find((sheet) => sheet.index === idx).sheetId,
          fields: "*",
          rows: {
            values: [
              {
                userEnteredValue: {
                  stringValue: value.value,
                },
              },
              {
                userEnteredValue: {
                  stringValue: dayjs().toDate(),
                },
              },
            ],
          },
        },
      }))
    );

    return await this.client.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests,
      },
    });
  }
}
