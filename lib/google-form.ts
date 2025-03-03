import { google } from "googleapis";

export async function getFormStructure(formId: string) {
  const auth = new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/forms.body.readonly"],
  });

  const forms = google.forms({
    version: "v1",
    auth: auth,
  });

  const res = await forms.forms.get({
    formId: formId,
  });

  return res.data.items?.map((item) => ({
    title: item.title,
    type: item.questionItem?.question,
  }));
}
