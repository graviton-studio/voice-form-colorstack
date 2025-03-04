export type ExtractResult = {
  success: boolean;
  questions?: Question[];
  error?: string;
};

export type Question = {
  id: string;
  text: string;
  type: "text" | "choice" | "checkbox" | "other";
  options?: string[];
  required: boolean;
};

export async function extractFormQuestions(
  url: string,
  formId: string,
  addQuestionMutation: (args: {
    formId: string;
    question: string;
  }) => Promise<any>,
): Promise<ExtractResult> {
  try {
    // Validate URL
    let formUrl: URL;
    try {
      formUrl = new URL(url);
    } catch (e) {
      return {
        success: false,
        error: "Please enter a valid URL",
      };
    }

    // Determine form provider
    const hostname = formUrl.hostname;
    let provider = "";

    if (hostname.includes("docs.google.com")) {
      provider = "google";
    } else if (hostname.includes("airtable.com")) {
      provider = "airtable";
    } else {
      return {
        success: false,
        error:
          "This URL is not from a supported form provider. We currently support Google Forms and Airtable.",
      };
    }

    let questions: Question[] = [];

    // Extract questions based on provider
    if (provider === "google") {
      questions = await extractGoogleForm(url);
    } else if (provider === "airtable") {
      questions = await extractAirtableForm(url);
    }

    if (questions.length === 0) {
      return {
        success: false,
        error: `Could not extract questions from this ${provider === "google" ? "Google Form" : "Airtable form"}. Make sure the form is public.`,
      };
    }

    // Save questions to database
    await saveQuestionsToDatabase(questions, formId, addQuestionMutation);

    return {
      success: true,
      questions,
    };
  } catch (error) {
    console.error("Error extracting form:", error);
    return {
      success: false,
      error: "An error occurred while extracting the form questions.",
    };
  }
}

/**
 * Save questions to the database using the Convex mutation
 */
async function saveQuestionsToDatabase(
  questions: Question[],
  formId: string,
  addQuestion: (args: { formId: string; question: string }) => Promise<any>,
) {
  const savedQuestions = [];

  for (const question of questions) {
    try {
      const result = await addQuestion({
        formId: formId,
        question: question.text,
      });

      savedQuestions.push(result);
      console.log(`Saved question to database: ${question.text}`);
    } catch (error) {
      console.error(
        `Failed to save question to database: ${question.text}`,
        error,
      );
    }
  }

  return savedQuestions;
}

/**
 * Extract questions from a Google Form
 */
async function extractGoogleForm(url: string): Promise<Question[]> {
  try {
    // Method 1: Try direct fetch with CORS proxy
    const questions = await extractGoogleFormWithCorsProxy(url);

    if (questions.length > 0) {
      return questions;
    }

    // Method 2: Use Google Forms API
    // Google Forms have a publicly accessible API endpoint for form data
    const formId = extractGoogleFormId(url);
    if (!formId) {
      return [];
    }

    const formDataUrl = `https://docs.google.com/forms/d/e/${formId}/viewform`;
    return await extractGoogleFormWithCorsProxy(formDataUrl);
  } catch (error) {
    console.error("Error extracting Google Form:", error);
    return [];
  }
}

/**
 * Extract the form ID from a Google Form URL
 */
function extractGoogleFormId(url: string): string | null {
  try {
    // Handle different Google Form URL formats
    // Format 1: https://docs.google.com/forms/d/e/1FAIpQLSdxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/viewform
    const match1 = url.match(/\/forms\/d\/e\/([^\/]+)\//);
    if (match1) return match1[1];

    // Format 2: https://docs.google.com/forms/d/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/edit
    const match2 = url.match(/\/forms\/d\/([^\/]+)/);
    if (match2) return match2[1];

    return null;
  } catch (error) {
    console.error("Error extracting Google Form ID:", error);
    return null;
  }
}

/**
 * Extract Google Form questions using a CORS proxy
 */
async function extractGoogleFormWithCorsProxy(
  url: string,
): Promise<Question[]> {
  try {
    const corsProxy = "https://corsproxy.io/?";
    const response = await fetch(`${corsProxy}${encodeURIComponent(url)}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch Google Form: ${response.statusText}`);
    }

    const html = await response.text();

    // Extract the form data from FB_PUBLIC_LOAD_DATA_ variable
    const fbDataMatch = html.match(
      /FB_PUBLIC_LOAD_DATA_\s*=\s*([\s\S]*?);\s*<\/script>/,
    );

    if (!fbDataMatch || !fbDataMatch[1]) {
      return [];
    }

    try {
      const fbData = JSON.parse(fbDataMatch[1]);

      // Google Forms structure: fbData[1][1] contains array of form items
      const formItems = fbData[1][1];
      if (!formItems || !Array.isArray(formItems)) {
        return [];
      }

      const questions: Question[] = [];

      formItems.forEach((item, index) => {
        // Skip if not a valid question (e.g., section headers, page breaks)
        if (!item || !item[1] || item[0] === 4) return;

        const questionText = item[1];
        const questionType = getGoogleFormQuestionType(item[3]);
        const required = item[2] === 1; // 1 means required

        let options: string[] | undefined;

        // Extract options for multiple choice/checkbox questions
        if (
          (questionType === "choice" || questionType === "checkbox") &&
          item[4] &&
          Array.isArray(item[4])
        ) {
          options = item[4].map((opt: any) => opt[0]).filter(Boolean);
        }

        const question: Question = {
          id: `google-q${index}`,
          text: questionText,
          type: questionType,
          required,
        };

        if (options && options.length > 0) {
          question.options = options;
        }

        questions.push(question);
      });

      return questions;
    } catch (error) {
      console.error("Error parsing Google Form data:", error);
      return [];
    }
  } catch (error) {
    console.error("Error extracting Google Form with CORS proxy:", error);
    return [];
  }
}

/**
 * Map Google Form question types to our internal types
 */
function getGoogleFormQuestionType(
  googleType: number,
): "text" | "choice" | "checkbox" | "other" {
  switch (googleType) {
    case 0: // Short answer
    case 1: // Paragraph
      return "text";
    case 2: // Multiple choice
    case 3: // Dropdown
    case 5: // Linear scale
      return "choice";
    case 4: // Checkboxes
      return "checkbox";
    default:
      return "other";
  }
}

/**
 * Extract questions from an Airtable form
 */
async function extractAirtableForm(url: string): Promise<Question[]> {
  try {
    const corsProxy = "https://corsproxy.io/?";
    const response = await fetch(`${corsProxy}${encodeURIComponent(url)}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch Airtable form: ${response.statusText}`);
    }

    const html = await response.text();

    // Airtable forms store their structure in a JSON script tag
    const scriptMatch = html.match(
      /<script id="formData" type="application\/json">([\s\S]*?)<\/script>/,
    );

    if (!scriptMatch || !scriptMatch[1]) {
      // Try alternative method - Airtable sometimes uses different structure
      return extractAirtableFormAlternative(html);
    }

    try {
      const formData = JSON.parse(scriptMatch[1]);
      const formFields = formData?.fields || [];

      if (
        !formFields ||
        !Array.isArray(formFields) ||
        formFields.length === 0
      ) {
        return extractAirtableFormAlternative(html);
      }

      const questions: Question[] = [];

      formFields.forEach((field, index) => {
        if (!field || !field.name) return;

        const questionType = getAirtableQuestionType(field.type);

        const question: Question = {
          id: field.id || `at-q${index}`,
          text: field.name,
          type: questionType,
          required: field.required || false,
        };

        // Extract options for choice and checkbox questions
        if (
          (questionType === "choice" || questionType === "checkbox") &&
          field.options
        ) {
          question.options = field.options
            .map((opt: any) => opt.name || opt.label || opt.text)
            .filter(Boolean);
        }

        questions.push(question);
      });

      return questions;
    } catch (error) {
      console.error("Error parsing Airtable form data:", error);
      return extractAirtableFormAlternative(html);
    }
  } catch (error) {
    console.error("Error extracting Airtable form:", error);
    return [];
  }
}

/**
 * Alternative method to extract Airtable form questions by looking for field labels in the HTML
 */
function extractAirtableFormAlternative(html: string): Question[] {
  try {
    const questions: Question[] = [];

    // Use regex to find field labels
    const fieldLabelRegex = /<div class="field-label">(.*?)<\/div>/g;
    const requiredRegex = /<span class="required">\*<\/span>/;

    let match;
    let index = 0;

    while ((match = fieldLabelRegex.exec(html)) !== null) {
      // Extract the question text
      let questionText = match[1].trim();

      // Check if the field has the required indicator
      const required = requiredRegex.test(questionText);

      // Remove the required indicator from the question text if present
      questionText = questionText
        .replace(/<span class="required">\*<\/span>/, "")
        .trim();

      if (questionText) {
        // We can't reliably determine question type from HTML alone,
        // so we'll default to "text" for all questions
        const question: Question = {
          id: `at-alt-q${index}`,
          text: questionText,
          type: "text",
          required,
        };

        questions.push(question);
        index++;
      }
    }

    return questions;
  } catch (error) {
    console.error("Error extracting Airtable form alternative method:", error);
    return [];
  }
}

/**
 * Map Airtable field types to our internal types
 */
function getAirtableQuestionType(
  atType: string,
): "text" | "choice" | "checkbox" | "other" {
  switch (atType) {
    case "singleLineText":
    case "multilineText":
    case "email":
    case "url":
    case "phoneNumber":
    case "number":
      return "text";
    case "singleSelect":
      return "choice";
    case "multipleSelect":
    case "checkbox":
      return "checkbox";
    default:
      return "other";
  }
}
