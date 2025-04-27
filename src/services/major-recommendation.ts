
/**
 * Represents a major with its associated details.
 */
export interface Major {
  /**
   * The name of the major.
   */
  majorName: string;
  /**
   * The code of the major.
   */
  majorCode: string;
  /**
   * The university offering the major.
   */
  university: string;
  /**
   * The admission score in 2022. Can be null if data is unavailable.
   */
  admissionScore2022: number | null;
  /**
   * The admission ranking in 2022. Can be null if data is unavailable.
   */
  admissionRanking2022: number | null;
  /**
   * The admission score in 2023. Can be null if data is unavailable.
   */
  admissionScore2023: number | null;
  /**
   * The admission ranking in 2023. Can be null if data is unavailable.
   */
  admissionRanking2023: number | null;
  /**
   * The admission score in 2024. Can be null if data is unavailable.
   */
  admissionScore2024: number | null;
  /**
   * The admission ranking in 2024. Can be null if data is unavailable.
   */
  admissionRanking2024: number | null;

  // Optional fields that might be useful for filtering, add as needed
  region?: string; // e.g., '北京', '上海'
  majorCategory?: string; // e.g., '工学', '理学'
  schoolingLength?: string; // e.g., '4年', '5年'
  tuition?: number; // e.g., 5000, 15000
  universityTier?: string; // e.g., '985', '211'
  /**
   * Subject requirements description for the major. e.g., "物理+化学", "物理", "不限", "物理/历史均可+化学/生物任选一"
   */
   subjectRequirements?: string;
}

/**
 * Represents the filter criteria for major recommendation.
 */
export interface MajorRecommendationFilter {
  /**
   * The intended regions for the major.
   */
  regions?: string[];
  /**
   * The intended major categories.
   */
  majorCategories?: string[];
  /**
   * The length of schooling. e.g., '4年', '5年'
   */
  schoolingLength?: string;
  /**
   * The tuition range identifier. e.g., '5000-10000元'
   */
  tuitionRange?: string;
    /**
   * The university tier. e.g., '985', '211'
   */
  universityTier?: string;
   // subjectRequirements might be added here if API supports direct filtering by subjects
}


// --- Mock Data ---
// Note: Added subjectRequirements to mock data
const MOCK_MAJORS: Major[] = [
   {
      majorName: '计算机科学与技术',
      majorCode: '080901',
      university: '北京大学',
      region: '北京', majorCategory: '工学', universityTier: '985', schoolingLength: '4年', tuition: 5500,
      subjectRequirements: '物理', // Requires Physics
      admissionScore2022: 695, admissionRanking2022: 50,
      admissionScore2023: 698, admissionRanking2023: 45,
      admissionScore2024: 701, admissionRanking2024: 40,
    },
    {
      majorName: '软件工程',
      majorCode: '080902',
      university: '清华大学',
       region: '北京', majorCategory: '工学', universityTier: '985', schoolingLength: '4年', tuition: 5500,
       subjectRequirements: '物理', // Requires Physics
      admissionScore2022: 693, admissionRanking2022: 60,
      admissionScore2023: 696, admissionRanking2023: 55,
      admissionScore2024: 699, admissionRanking2024: 50,
    },
     {
      majorName: '人工智能',
      majorCode: '080717T',
      university: '上海交通大学',
       region: '上海', majorCategory: '工学', universityTier: '985', schoolingLength: '4年', tuition: 6500,
       subjectRequirements: '物理+化学', // Requires Physics and Chemistry
      admissionScore2022: 688, admissionRanking2022: 120,
      admissionScore2023: 690, admissionRanking2023: 110,
      admissionScore2024: 692, admissionRanking2024: 100,
    },
    {
      majorName: '临床医学',
      majorCode: '100201K',
      university: '复旦大学',
       region: '上海', majorCategory: '医学', universityTier: '985', schoolingLength: '5年', tuition: 7000,
       subjectRequirements: '物理+化学+生物', // Requires Physics, Chemistry, and Biology
      admissionScore2022: 685, admissionRanking2022: 150,
      admissionScore2023: 688, admissionRanking2023: 140,
      admissionScore2024: 690, admissionRanking2024: 130,
    },
    {
      majorName: '经济学',
      majorCode: '020101',
      university: '浙江大学',
       region: '浙江', majorCategory: '经济学', universityTier: '985', schoolingLength: '4年', tuition: 5000,
       subjectRequirements: '不限', // No subject requirement
      admissionScore2022: 675, admissionRanking2022: 300,
      admissionScore2023: 678, admissionRanking2023: 280,
      admissionScore2024: 680, admissionRanking2024: 250,
    },
     {
      majorName: '法学',
      majorCode: '030101K',
      university: '武汉大学',
      region: '湖北', majorCategory: '法学', universityTier: '985', schoolingLength: '4年', tuition: 5200,
      subjectRequirements: '历史/政治均可', // Requires History OR Politics
      admissionScore2022: 660, admissionRanking2022: 800,
      admissionScore2023: 665, admissionRanking2023: 750,
      admissionScore2024: 668, admissionRanking2024: 700,
    },
    {
      majorName: '电子信息工程',
      majorCode: '080701',
      university: '华中科技大学',
      region: '湖北', majorCategory: '工学', universityTier: '985', schoolingLength: '4年', tuition: 5800,
      subjectRequirements: '物理', // Requires Physics
      admissionScore2022: 670, admissionRanking2022: 500,
      admissionScore2023: 672, admissionRanking2023: 480,
      admissionScore2024: 675, admissionRanking2024: 450,
    },
     {
      majorName: '工商管理',
      majorCode: '120201K',
      university: '中山大学',
       region: '广东', majorCategory: '管理学', universityTier: '985', schoolingLength: '4年', tuition: 4800,
       subjectRequirements: '不限', // No subject requirement
      admissionScore2022: 655, admissionRanking2022: 1200,
      admissionScore2023: 658, admissionRanking2023: 1100,
      admissionScore2024: 660, admissionRanking2024: 1000,
    },
    {
      majorName: '土木工程',
      majorCode: '081001',
      university: '同济大学',
      region: '上海', majorCategory: '工学', universityTier: '985', schoolingLength: '4年', tuition: 5000,
      subjectRequirements: '物理', // Requires Physics
      admissionScore2022: 662, admissionRanking2022: 700,
      admissionScore2023: 660, admissionRanking2023: 720, // Example of score drop
      admissionScore2024: 663, admissionRanking2024: 710,
    },
     {
      majorName: '英语',
      majorCode: '050201',
      university: '北京外国语大学',
       region: '北京', majorCategory: '文学', universityTier: '211', schoolingLength: '4年', tuition: 6000,
       subjectRequirements: '不限', // No subject requirement
      admissionScore2022: 640, admissionRanking2022: 2500,
      admissionScore2023: 645, admissionRanking2023: 2300,
      admissionScore2024: 648, admissionRanking2024: 2200,
    },
     {
      majorName: '数学与应用数学',
      majorCode: '070101',
      university: '山东大学',
       region: '山东', majorCategory: '理学', universityTier: '985', schoolingLength: '4年', tuition: 5000,
       subjectRequirements: '物理', // Requires Physics
      admissionScore2022: 650, admissionRanking2022: 1500,
      admissionScore2023: 655, admissionRanking2023: 1400,
      admissionScore2024: 658, admissionRanking2024: 1350,
    },
    {
      majorName: '自动化',
      majorCode: '080801',
      university: '东南大学',
      region: '江苏', majorCategory: '工学', universityTier: '985', schoolingLength: '4年', tuition: 5200,
      subjectRequirements: '物理', // Requires Physics
      admissionScore2022: 668, admissionRanking2022: 600,
      admissionScore2023: 670, admissionRanking2023: 580,
      admissionScore2024: 673, admissionRanking2024: 550,
    },
     {
      majorName: '网络空间安全',
      majorCode: '080904TK',
      university: '西安电子科技大学',
      region: '陕西', majorCategory: '工学', universityTier: '211', schoolingLength: '4年', tuition: 5500,
      subjectRequirements: '物理', // Requires Physics
      admissionScore2022: 652, admissionRanking2022: 1400,
      admissionScore2023: 656, admissionRanking2023: 1300,
      admissionScore2024: 659, admissionRanking2024: 1250,
    },
    {
      majorName: '新闻传播学类',
      majorCode: '0503',
      university: '中国人民大学',
       region: '北京', majorCategory: '文学', universityTier: '985', schoolingLength: '4年', tuition: 5000,
       subjectRequirements: '不限', // No subject requirement
      admissionScore2022: 678, admissionRanking2022: 250,
      admissionScore2023: 680, admissionRanking2023: 230,
      admissionScore2024: 682, admissionRanking2024: 220,
    },
    {
      majorName: '护理学',
      majorCode: '101101',
      university: '四川大学',
      region: '四川', majorCategory: '医学', universityTier: '985', schoolingLength: '4年', tuition: 4800,
      subjectRequirements: '化学+生物', // Requires Chemistry and Biology
      admissionScore2022: 620, admissionRanking2022: 5000,
      admissionScore2023: 625, admissionRanking2023: 4800,
      admissionScore2024: 628, admissionRanking2024: 4700,
    },
];
// --- End Mock Data ---


/**
 * Asynchronously retrieves major recommendations based on the provided filter.
 * Simulates an API call.
 *
 * @param filter The filter criteria for major recommendation.
 * @returns A promise that resolves to an array of Major objects.
 */
export async function getMajorRecommendations(
  filter: MajorRecommendationFilter
): Promise<Major[]> {
  console.log('Fetching recommendations with filter:', filter);
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Simulate filtering based on the provided criteria
  // In a real scenario, the API would handle this filtering.
  let results = MOCK_MAJORS;

  if (filter.regions && filter.regions.length > 0) {
    results = results.filter(major => major.region && filter.regions?.includes(major.region));
  }
  if (filter.majorCategories && filter.majorCategories.length > 0) {
     results = results.filter(major => major.majorCategory && filter.majorCategories?.includes(major.majorCategory));
  }
   if (filter.schoolingLength && filter.schoolingLength !== '全部') {
      results = results.filter(major => major.schoolingLength === filter.schoolingLength);
   }
   if (filter.universityTier && filter.universityTier !== '全部') {
      results = results.filter(major => major.universityTier === filter.universityTier);
   }
   if (filter.tuitionRange && filter.tuitionRange !== '全部') {
       results = results.filter(major => {
           // Handle cases where tuition might be undefined/null
           if (major.tuition === undefined || major.tuition === null) return false;
           switch (filter.tuitionRange) {
               case '5000元以下': return major.tuition < 5000;
               case '5000-10000元': return major.tuition >= 5000 && major.tuition <= 10000;
               case '10000-20000元': return major.tuition > 10000 && major.tuition <= 20000;
               case '20000元以上': return major.tuition > 20000;
               default: return true;
           }
       });
   }
   // Subject requirement filtering could be added here if needed for the mock service
   // but the primary filtering is expected to happen in the AI flow based on the full dataset.


  // TODO: Implement actual API call here when available.
  // For now, return the filtered mock data.
   console.log(`Returning ${results.length} results after filtering.`);
  return results;
}

// Helper function (example) to check subject compatibility - This is complex and may need refinement
// function checkSubjectCompatibility(selectedSubjects: string[], requirement: string | undefined): boolean {
//     if (!requirement || requirement === '不限') {
//         return true;
//     }
//     // Basic check for single subject requirement
//     if (requirement.length === 2 && selectedSubjects.includes(requirement)) {
//         return true;
//     }
//      // Basic check for 'A+B' requirement
//     if (requirement.includes('+')) {
//         const required = requirement.split('+');
//         return required.every(sub => selectedSubjects.includes(sub));
//     }
//     // Basic check for 'A/B' requirement
//     if (requirement.includes('/')) {
//         const options = requirement.split('/');
//         return options.some(sub => selectedSubjects.includes(sub));
//     }
//
//     // Add more complex logic for combinations like "物理/历史均可+化学/生物任选一"
//
//     return false; // Default to false if no match found or logic not implemented
// }
