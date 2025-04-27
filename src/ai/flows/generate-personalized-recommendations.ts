
// This file is machine-generated - edit at your own risk.

'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating personalized major recommendations based on student information.
 *
 * - generatePersonalizedRecommendations - A function that takes student information and returns personalized major recommendations.
 * - GeneratePersonalizedRecommendationsInput - The input type for the generatePersonalizedRecommendations function.
 * - GeneratePersonalizedRecommendationsOutput - The output type for the generatePersonalizedRecommendations function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {Major, MajorRecommendationFilter, getMajorRecommendations as fetchMajorRecommendations } from '@/services/major-recommendation';

// Define Zod schema for Major based on the interface, making scores/rankings optional
const MajorSchema = z.object({
  majorName: z.string(),
  majorCode: z.string(),
  university: z.string(),
  admissionScore2022: z.number().nullable(),
  admissionRanking2022: z.number().nullable(),
  admissionScore2023: z.number().nullable(),
  admissionRanking2023: z.number().nullable(),
  admissionScore2024: z.number().nullable(),
  admissionRanking2024: z.number().nullable(),
  region: z.string().optional(),
  majorCategory: z.string().optional(),
  schoolingLength: z.string().optional(),
  tuition: z.number().optional(),
  universityTier: z.string().optional(),
  subjectRequirements: z.string().optional().describe('该专业的选科要求描述，例如 "物理+化学" 或 "不限"。'), // Added subject requirements
});


const GeneratePersonalizedRecommendationsInputSchema = z.object({
  gaokaoScore: z.number().describe('考生的总分。'),
  provinceRanking: z.number().describe('考生在省内的排名位次。'),
  selectedSubjects: z.string().array().length(3).describe('考生选择的3个高考科目，例如 ["物理", "化学", "生物"]。'), // Added selected subjects
  intendedRegions: z.string().array().optional().describe('考生倾向选择的地区列表。'),
  intendedMajorCategories: z.string().array().optional().describe('考生倾向选择的专业大类列表。'),
  excludedRegions: z.string().array().optional().describe('考生明确排除的地区列表。'),
  excludedMajorCategories: z.string().array().optional().describe('考生明确排除的专业大类列表。'),
});

export type GeneratePersonalizedRecommendationsInput = z.infer<
  typeof GeneratePersonalizedRecommendationsInputSchema
>;

const GeneratePersonalizedRecommendationsOutputSchema = z.object({
  recommendedMajors: z.array(MajorSchema).describe('推荐的专业列表，包含专业名称、代码、大学、历年录取分数和位次、选科要求等信息。'),
  reasoning: z.string().describe('给出这些专业推荐的详细理由，结合考生的分数、排名、选考科目、偏好以及历史录取数据进行分析。'),
});

export type GeneratePersonalizedRecommendationsOutput = z.infer<
  typeof GeneratePersonalizedRecommendationsOutputSchema
>;

export async function generatePersonalizedRecommendations(
  input: GeneratePersonalizedRecommendationsInput
): Promise<GeneratePersonalizedRecommendationsOutput> {
  return generatePersonalizedRecommendationsFlow(input);
}

// Define Zod schema for the tool input based on MajorRecommendationFilter
const MajorRecommendationFilterSchema = z.object({
    regions: z.string().array().optional().describe('意向地区列表，用于筛选大学所在地区。'),
    majorCategories: z.string().array().optional().describe('意向专业类别列表，用于筛选专业所属大类。'),
    schoolingLength: z.string().optional().describe('学制要求，例如 "4年" 或 "5年"。如果不需要特定学制，请勿指定。'),
    tuitionRange: z.string().optional().describe('学费范围，例如 "5000-10000元"。如果不需要特定学费范围，请勿指定。'),
    universityTier: z.string().optional().describe('院校层次要求，例如 "985", "211"。如果不需要特定层次，请勿指定。'),
    // Add subject requirements filter if the tool can handle it
    // subjectRequirements: z.string().array().optional().describe('考生已选科目，用于筛选符合选科要求的专业。'),
});

const majorRecommendationTool = ai.defineTool({
  name: 'getMajorRecommendations',
  description: '根据地区、专业类别、学制、学费、院校层次等筛选条件，获取专业录取信息（包括选科要求）。',
  inputSchema: MajorRecommendationFilterSchema,
  outputSchema: z.array(MajorSchema), // Use the defined MajorSchema
},
async (input: MajorRecommendationFilter): Promise<Major[]> => {
    // Directly call the imported function
    const recommendations = await fetchMajorRecommendations(input);
    // Validate the output against the schema (optional but good practice)
    // return z.array(MajorSchema).parse(recommendations);
    return recommendations; // Return directly if validation isn't strictly needed here
});

const prompt = ai.definePrompt({
  name: 'generatePersonalizedRecommendationsPrompt',
  input: {
    schema: GeneratePersonalizedRecommendationsInputSchema,
  },
  output: {
    schema: GeneratePersonalizedRecommendationsOutputSchema,
  },
  tools: [majorRecommendationTool],
  prompt: `请根据以下考生信息，为其推荐合适的高考志愿专业和大学：

考生分数：{{gaokaoScore}}
全省排名：{{provinceRanking}}
选考科目：{{#each selectedSubjects}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

意向地区：{{#if intendedRegions}}{{#each intendedRegions}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}无特殊偏好{{/if}}
意向专业类别：{{#if intendedMajorCategories}}{{#each intendedMajorCategories}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}无特殊偏好{{/if}}
排除地区：{{#if excludedRegions}}{{#each excludedRegions}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}无{{/if}}
排除专业类别：{{#if excludedMajorCategories}}{{#each excludedMajorCategories}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}无{{/if}}

请综合考虑考生的分数、排名、**选考科目**、地区偏好、专业偏好以及排除项，并参考历史录取数据（尤其是近三年的分数和位次）和**专业的选科要求**，分析录取可能性，给出几条（例如5-10条）明确的专业志愿建议。

**重要：推荐的专业必须符合考生的选考科目要求。**

你可以并且应该使用 'getMajorRecommendations' 工具来获取符合初步筛选条件的专业列表（例如基于意向地区和专业类别进行查询）。在调用工具时，仅传入用户明确指定的意向条件。工具会返回包含选科要求的专业信息。

获取工具返回的专业列表后，你**必须**根据考生的选考科目 ({{#each selectedSubjects}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}) 进一步筛选，确保推荐的每一个专业都满足选科要求。例如，如果专业要求“物理+化学”，而考生选了“物理+化学+生物”，则符合要求；如果专业要求“物理”，考生选了“历史+地理+政治”，则不符合。请注意各种选科要求组合的匹配规则（如“物理/历史均可”，“物理+化学/生物任选一”等）。

最终的输出应包含推荐的、**符合选科要求的**专业列表（使用从工具获取并经过你筛选的数据）和详细的推荐理由。理由需要解释为什么这些专业和学校适合该考生，特别是结合考生的分数排名和专业的历史录取位次进行对比分析，并明确说明该专业符合考生的选考科目要求。

输出格式必须是 JSON，结构如下：
{
  "recommendedMajors": [
    {
      "majorName": "专业名称",
      "majorCode": "专业代码",
      "university": "大学名称",
      "admissionScore2022": 分数 (数字或null),
      "admissionRanking2022": 位次 (数字或null),
      "admissionScore2023": 分数 (数字或null),
      "admissionRanking2023": 位次 (数字或null),
      "admissionScore2024": 分数 (数字或null),
      "admissionRanking2024": 位次 (数字或null),
      "subjectRequirements": "选科要求描述", // e.g., "物理+化学"
      // ... 其他可选字段如 region, majorCategory ...
    }
    // ... 更多推荐的专业
  ],
  "reasoning": "详细的推荐理由，解释选择这些专业的依据，包括录取概率分析、专业前景、学校特色以及如何符合选科要求等。"
}
`,
});

const generatePersonalizedRecommendationsFlow = ai.defineFlow<
  typeof GeneratePersonalizedRecommendationsInputSchema,
  typeof GeneratePersonalizedRecommendationsOutputSchema
>(
  {
    name: 'generatePersonalizedRecommendationsFlow',
    inputSchema: GeneratePersonalizedRecommendationsInputSchema,
    outputSchema: GeneratePersonalizedRecommendationsOutputSchema,
  },
  async input => {
    console.log("Flow input:", input); // Log input
    try {
      const {output} = await prompt(input);
      console.log("Flow output:", output); // Log output
      if (!output) {
          throw new Error("AI did not return a valid output.");
      }
       // Basic validation to ensure the structure matches expected output
       if (!output.recommendedMajors || !output.reasoning) {
            console.error("AI output missing required fields:", output);
            throw new Error("AI output structure is invalid. Missing recommendedMajors or reasoning.");
       }
      // Further validation: Check if recommended majors actually match subject requirements (if possible client-side)
      // This requires parsing subjectRequirements strings and comparing, which can be complex.
      // Relying on the LLM to follow instructions is the primary mechanism here.
      // You could add a warning if any recommended major clearly doesn't fit based on a simple check.

      return output;
    } catch(error) {
        console.error("Error in generatePersonalizedRecommendationsFlow:", error);
        // Provide a default error response or re-throw
         throw new Error(`Failed to generate recommendations: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);

