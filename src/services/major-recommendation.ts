

/**
 * Represents university-specific details.
 */
export interface UniversityDetails {
  /** University name */
  university: string;
  /** Region/City */
  region: string;
  /** Province */
  province: string; // Added province explicitly
  /** Tier ('985', '211', '双一流', '普通本科', '专科', '艺术类', '顶尖医学院', etc.) */
  universityTier: string;
  /** Level ('本科', '专科') */
  universityLevel: '本科' | '专科';
  /** Type ('公办', '民办', '中外合作') */
  universityType: '公办' | '民办' | '中外合作';
}


/**
 * Represents a major with its associated details, including university information.
 */
export interface Major extends UniversityDetails {
  /**
   * The name of the major.
   */
  majorName: string;
  /**
   * The code of the major.
   */
  majorCode: string;
    /**
   * The admission score in 2017. Can be null if data is unavailable.
   */
  admissionScore2017: number | null;
  /**
   * The admission ranking in 2017. Can be null if data is unavailable.
   */
  admissionRanking2017: number | null;
    /**
   * The admission score in 2018. Can be null if data is unavailable.
   */
  admissionScore2018: number | null;
  /**
   * The admission ranking in 2018. Can be null if data is unavailable.
   */
  admissionRanking2018: number | null;
    /**
   * The admission score in 2019. Can be null if data is unavailable.
   */
  admissionScore2019: number | null;
  /**
   * The admission ranking in 2019. Can be null if data is unavailable.
   */
  admissionRanking2019: number | null;
    /**
   * The admission score in 2020. Can be null if data is unavailable.
   */
  admissionScore2020: number | null;
  /**
   * The admission ranking in 2020. Can be null if data is unavailable.
   */
  admissionRanking2020: number | null;
    /**
   * The admission score in 2021. Can be null if data is unavailable.
   */
  admissionScore2021: number | null;
  /**
   * The admission ranking in 2021. Can be null if data is unavailable.
   */
  admissionRanking2021: number | null;
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
  /**
   * The estimated admission ranking for 2025. Can be null if data is unavailable.
   */
  estimatedRanking2025: number | null;
  /**
   * The category of the major. e.g., '工学', '理学'
   */
  majorCategory: string;
  /**
   * The length of schooling. e.g., '4年', '5年'
   */
  schoolingLength: string;
  /**
   * Annual tuition fee. e.g., 5000, 15000
   */
  tuition: number | null; // Allow null for cases like art schools
  /**
   * Subject requirements description for the major. e.g., "物理+化学", "物理", "不限", "物理/历史均可+化学/生物任选一"
   */
   subjectRequirements: string | null; // Allow null
   /**
    * Whether the major typically offers postgraduate recommendations (保研).
    */
   hasPostgraduateRecommendation: boolean;
   /**
    * Predicted admission probability (percentage). Can be null if data is unavailable.
    */
   admissionProbability: number | null; // Changed to number for percentage
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


// Helper function to assign mock probability percentage based on ranking
const getMockProbabilityPercentage = (ranking: number | null): number | null => {
    if (ranking === null || ranking === undefined) return null;
    // Simple non-linear mapping: lower rank -> higher probability
    if (ranking <= 50) return 95 + Math.floor(Math.random() * 5); // 95-99
    if (ranking <= 100) return 90 + Math.floor(Math.random() * 5); // 90-94
    if (ranking <= 250) return 85 + Math.floor(Math.random() * 5); // 85-89
    if (ranking <= 500) return 80 + Math.floor(Math.random() * 5); // 80-84
    if (ranking <= 1000) return 70 + Math.floor(Math.random() * 10); // 70-79
    if (ranking <= 2000) return 60 + Math.floor(Math.random() * 10); // 60-69
    if (ranking <= 5000) return 45 + Math.floor(Math.random() * 15); // 45-59
    if (ranking <= 10000) return 30 + Math.floor(Math.random() * 15); // 30-44
    if (ranking <= 20000) return 15 + Math.floor(Math.random() * 15); // 15-29
    return Math.max(1, 15 - Math.floor(ranking / 5000)); // 1-14 for higher ranks
};


// --- Mock Data ---
// Expanded mock data with more entries and variety in tuition/schooling length and university details
// Added mock data for 2017-2021 (nullable)
// Updated admissionProbability to use the percentage helper
const MOCK_MAJORS: Major[] = [
   {
      majorName: '计算机科学与技术', majorCode: '080901', university: '北京大学', region: '北京', province: '北京', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '工学', schoolingLength: '4年', tuition: 5500, subjectRequirements: '物理', hasPostgraduateRecommendation: true,
      admissionScore2017: 690, admissionRanking2017: 70, admissionScore2018: 692, admissionRanking2018: 65, admissionScore2019: 691, admissionRanking2019: 68, admissionScore2020: 694, admissionRanking2020: 55, admissionScore2021: 696, admissionRanking2021: 52,
      admissionScore2022: 695, admissionRanking2022: 50, admissionScore2023: 698, admissionRanking2023: 45, admissionScore2024: 701, admissionRanking2024: 40, estimatedRanking2025: 38,
      admissionProbability: getMockProbabilityPercentage(38),
    },
    {
      majorName: '软件工程', majorCode: '080902', university: '清华大学', region: '北京', province: '北京', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '工学', schoolingLength: '4年', tuition: 5500, subjectRequirements: '物理', hasPostgraduateRecommendation: true,
      admissionScore2017: 688, admissionRanking2017: 80, admissionScore2018: 690, admissionRanking2018: 75, admissionScore2019: 689, admissionRanking2019: 78, admissionScore2020: 692, admissionRanking2020: 65, admissionScore2021: 694, admissionRanking2021: 62,
      admissionScore2022: 693, admissionRanking2022: 60, admissionScore2023: 696, admissionRanking2023: 55, admissionScore2024: 699, admissionRanking2024: 50, estimatedRanking2025: 48,
      admissionProbability: getMockProbabilityPercentage(48),
    },
     {
      majorName: '人工智能', majorCode: '080717T', university: '上海交通大学', region: '上海', province: '上海', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '工学', schoolingLength: '4年', tuition: 6500, subjectRequirements: '物理+化学', hasPostgraduateRecommendation: true,
      admissionScore2017: null, admissionRanking2017: null, // AI was newer
      admissionScore2018: 685, admissionRanking2018: 140, admissionScore2019: 686, admissionRanking2019: 135, admissionScore2020: 687, admissionRanking2020: 130, admissionScore2021: 689, admissionRanking2021: 125,
      admissionScore2022: 688, admissionRanking2022: 120, admissionScore2023: 690, admissionRanking2023: 110, admissionScore2024: 692, admissionRanking2024: 100, estimatedRanking2025: 95,
      admissionProbability: getMockProbabilityPercentage(95),
    },
    {
      majorName: '临床医学', majorCode: '100201K', university: '复旦大学', region: '上海', province: '上海', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '医学', schoolingLength: '5年', tuition: 7000, subjectRequirements: '物理+化学+生物', hasPostgraduateRecommendation: true,
      admissionScore2017: 680, admissionRanking2017: 180, admissionScore2018: 682, admissionRanking2018: 170, admissionScore2019: 681, admissionRanking2019: 175, admissionScore2020: 684, admissionRanking2020: 160, admissionScore2021: 686, admissionRanking2021: 155,
      admissionScore2022: 685, admissionRanking2022: 150, admissionScore2023: 688, admissionRanking2023: 140, admissionScore2024: 690, admissionRanking2024: 130, estimatedRanking2025: 125,
      admissionProbability: getMockProbabilityPercentage(125),
    },
    {
      majorName: '经济学', majorCode: '020101', university: '浙江大学', region: '杭州', province: '浙江', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '经济学', schoolingLength: '4年', tuition: 5000, subjectRequirements: '不限', hasPostgraduateRecommendation: true,
      admissionScore2017: 670, admissionRanking2017: 350, admissionScore2018: 672, admissionRanking2018: 330, admissionScore2019: 671, admissionRanking2019: 340, admissionScore2020: 674, admissionRanking2020: 310, admissionScore2021: 676, admissionRanking2021: 305,
      admissionScore2022: 675, admissionRanking2022: 300, admissionScore2023: 678, admissionRanking2023: 280, admissionScore2024: 680, admissionRanking2024: 250, estimatedRanking2025: 240,
      admissionProbability: getMockProbabilityPercentage(240),
    },
     {
      majorName: '法学', majorCode: '030101K', university: '武汉大学', region: '武汉', province: '湖北', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '法学', schoolingLength: '4年', tuition: 5200, subjectRequirements: '历史/政治均可', hasPostgraduateRecommendation: true,
      admissionScore2017: 655, admissionRanking2017: 900, admissionScore2018: 658, admissionRanking2018: 850, admissionScore2019: 657, admissionRanking2019: 870, admissionScore2020: 659, admissionRanking2020: 820, admissionScore2021: 662, admissionRanking2021: 810,
      admissionScore2022: 660, admissionRanking2022: 800, admissionScore2023: 665, admissionRanking2023: 750, admissionScore2024: 668, admissionRanking2024: 700, estimatedRanking2025: 680,
      admissionProbability: getMockProbabilityPercentage(680),
    },
    {
      majorName: '电子信息工程', majorCode: '080701', university: '华中科技大学', region: '武汉', province: '湖北', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '工学', schoolingLength: '4年', tuition: 5800, subjectRequirements: '物理', hasPostgraduateRecommendation: true,
      admissionScore2017: 665, admissionRanking2017: 600, admissionScore2018: 668, admissionRanking2018: 550, admissionScore2019: 667, admissionRanking2019: 570, admissionScore2020: 669, admissionRanking2020: 520, admissionScore2021: 671, admissionRanking2021: 510,
      admissionScore2022: 670, admissionRanking2022: 500, admissionScore2023: 672, admissionRanking2023: 480, admissionScore2024: 675, admissionRanking2024: 450, estimatedRanking2025: 430,
      admissionProbability: getMockProbabilityPercentage(430),
    },
     {
      majorName: '工商管理', majorCode: '120201K', university: '中山大学', region: '广州', province: '广东', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '管理学', schoolingLength: '4年', tuition: 4800, subjectRequirements: '不限', hasPostgraduateRecommendation: true,
      admissionScore2017: 650, admissionRanking2017: 1400, admissionScore2018: 652, admissionRanking2018: 1300, admissionScore2019: 651, admissionRanking2019: 1350, admissionScore2020: 654, admissionRanking2020: 1250, admissionScore2021: 656, admissionRanking2021: 1220,
      admissionScore2022: 655, admissionRanking2022: 1200, admissionScore2023: 658, admissionRanking2023: 1100, admissionScore2024: 660, admissionRanking2024: 1000, estimatedRanking2025: 950,
      admissionProbability: getMockProbabilityPercentage(950),
    },
    {
      majorName: '土木工程', majorCode: '081001', university: '同济大学', region: '上海', province: '上海', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '工学', schoolingLength: '4年', tuition: 5000, subjectRequirements: '物理', hasPostgraduateRecommendation: true,
      admissionScore2017: 658, admissionRanking2017: 800, admissionScore2018: 660, admissionRanking2018: 750, admissionScore2019: 659, admissionRanking2019: 770, admissionScore2020: 661, admissionRanking2020: 730, admissionScore2021: 663, admissionRanking2021: 725,
      admissionScore2022: 662, admissionRanking2022: 700, admissionScore2023: 660, admissionRanking2023: 720, admissionScore2024: 663, admissionRanking2024: 710, estimatedRanking2025: 700,
      admissionProbability: getMockProbabilityPercentage(700),
    },
     {
      majorName: '英语', majorCode: '050201', university: '北京外国语大学', region: '北京', province: '北京', universityTier: '211', universityLevel: '本科', universityType: '公办', majorCategory: '文学', schoolingLength: '4年', tuition: 6000, subjectRequirements: '不限', hasPostgraduateRecommendation: true,
      admissionScore2017: 635, admissionRanking2017: 2800, admissionScore2018: 638, admissionRanking2018: 2700, admissionScore2019: 637, admissionRanking2019: 2750, admissionScore2020: 639, admissionRanking2020: 2600, admissionScore2021: 642, admissionRanking2021: 2550,
      admissionScore2022: 640, admissionRanking2022: 2500, admissionScore2023: 645, admissionRanking2023: 2300, admissionScore2024: 648, admissionRanking2024: 2200, estimatedRanking2025: 2150,
      admissionProbability: getMockProbabilityPercentage(2150),
    },
     {
      majorName: '数学与应用数学', majorCode: '070101', university: '山东大学', region: '济南', province: '山东', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '理学', schoolingLength: '4年', tuition: 5000, subjectRequirements: '物理', hasPostgraduateRecommendation: true,
      admissionScore2017: 645, admissionRanking2017: 1800, admissionScore2018: 648, admissionRanking2018: 1700, admissionScore2019: 647, admissionRanking2019: 1750, admissionScore2020: 649, admissionRanking2020: 1600, admissionScore2021: 652, admissionRanking2021: 1550,
      admissionScore2022: 650, admissionRanking2022: 1500, admissionScore2023: 655, admissionRanking2023: 1400, admissionScore2024: 658, admissionRanking2024: 1350, estimatedRanking2025: 1300,
      admissionProbability: getMockProbabilityPercentage(1300),
    },
    {
      majorName: '自动化', majorCode: '080801', university: '东南大学', region: '南京', province: '江苏', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '工学', schoolingLength: '4年', tuition: 5200, subjectRequirements: '物理', hasPostgraduateRecommendation: true,
      admissionScore2017: 663, admissionRanking2017: 700, admissionScore2018: 666, admissionRanking2018: 650, admissionScore2019: 665, admissionRanking2019: 670, admissionScore2020: 667, admissionRanking2020: 620, admissionScore2021: 669, admissionRanking2021: 610,
      admissionScore2022: 668, admissionRanking2022: 600, admissionScore2023: 670, admissionRanking2023: 580, admissionScore2024: 673, admissionRanking2024: 550, estimatedRanking2025: 530,
      admissionProbability: getMockProbabilityPercentage(530),
    },
     {
      majorName: '网络空间安全', majorCode: '080904TK', university: '西安电子科技大学', region: '西安', province: '陕西', universityTier: '211', universityLevel: '本科', universityType: '公办', majorCategory: '工学', schoolingLength: '4年', tuition: 5500, subjectRequirements: '物理', hasPostgraduateRecommendation: true,
      admissionScore2017: 648, admissionRanking2017: 1600, admissionScore2018: 650, admissionRanking2018: 1500, admissionScore2019: 649, admissionRanking2019: 1550, admissionScore2020: 651, admissionRanking2020: 1450, admissionScore2021: 654, admissionRanking2021: 1420,
      admissionScore2022: 652, admissionRanking2022: 1400, admissionScore2023: 656, admissionRanking2023: 1300, admissionScore2024: 659, admissionRanking2024: 1250, estimatedRanking2025: 1200,
      admissionProbability: getMockProbabilityPercentage(1200),
    },
    {
      majorName: '新闻传播学类', majorCode: '0503', university: '中国人民大学', region: '北京', province: '北京', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '文学', schoolingLength: '4年', tuition: 5000, subjectRequirements: '不限', hasPostgraduateRecommendation: true,
      admissionScore2017: 673, admissionRanking2017: 300, admissionScore2018: 676, admissionRanking2018: 280, admissionScore2019: 675, admissionRanking2019: 290, admissionScore2020: 677, admissionRanking2020: 260, admissionScore2021: 679, admissionRanking2021: 255,
      admissionScore2022: 678, admissionRanking2022: 250, admissionScore2023: 680, admissionRanking2023: 230, admissionScore2024: 682, admissionRanking2024: 220, estimatedRanking2025: 210,
      admissionProbability: getMockProbabilityPercentage(210),
    },
    {
      majorName: '护理学', majorCode: '101101', university: '四川大学', region: '成都', province: '四川', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '医学', schoolingLength: '4年', tuition: 4800, subjectRequirements: '化学+生物', hasPostgraduateRecommendation: false,
      admissionScore2017: 615, admissionRanking2017: 5500, admissionScore2018: 618, admissionRanking2018: 5300, admissionScore2019: 617, admissionRanking2019: 5400, admissionScore2020: 619, admissionRanking2020: 5100, admissionScore2021: 622, admissionRanking2021: 5050,
      admissionScore2022: 620, admissionRanking2022: 5000, admissionScore2023: 625, admissionRanking2023: 4800, admissionScore2024: 628, admissionRanking2024: 4700, estimatedRanking2025: 4600,
      admissionProbability: getMockProbabilityPercentage(4600),
    },
    // --- Added More Data ---
    {
      majorName: '物理学', majorCode: '070201', university: '南京大学', region: '南京', province: '江苏', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '理学', schoolingLength: '4年', tuition: 5200, subjectRequirements: '物理', hasPostgraduateRecommendation: true,
      admissionScore2017: 668, admissionRanking2017: 500, admissionScore2018: 670, admissionRanking2018: 480, admissionScore2019: 669, admissionRanking2019: 490, admissionScore2020: 671, admissionRanking2020: 460, admissionScore2021: 673, admissionRanking2021: 455,
      admissionScore2022: 672, admissionRanking2022: 450, admissionScore2023: 675, admissionRanking2023: 420, admissionScore2024: 678, admissionRanking2024: 400, estimatedRanking2025: 380,
      admissionProbability: getMockProbabilityPercentage(380),
    },
    {
      majorName: '化学', majorCode: '070301', university: '南开大学', region: '天津', province: '天津', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '理学', schoolingLength: '4年', tuition: 5200, subjectRequirements: '化学', hasPostgraduateRecommendation: true,
      admissionScore2017: 660, admissionRanking2017: 800, admissionScore2018: 663, admissionRanking2018: 750, admissionScore2019: 662, admissionRanking2019: 770, admissionScore2020: 664, admissionRanking2020: 720, admissionScore2021: 666, admissionRanking2021: 710,
      admissionScore2022: 665, admissionRanking2022: 700, admissionScore2023: 668, admissionRanking2023: 650, admissionScore2024: 670, admissionRanking2024: 620, estimatedRanking2025: 600,
      admissionProbability: getMockProbabilityPercentage(600),
    },
    {
      majorName: '生物科学', majorCode: '071001', university: '厦门大学', region: '厦门', province: '福建', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '理学', schoolingLength: '4年', tuition: 5400, subjectRequirements: '生物', hasPostgraduateRecommendation: true,
      admissionScore2017: 653, admissionRanking2017: 1200, admissionScore2018: 656, admissionRanking2018: 1100, admissionScore2019: 655, admissionRanking2019: 1150, admissionScore2020: 657, admissionRanking2020: 1050, admissionScore2021: 659, admissionRanking2021: 1020,
      admissionScore2022: 658, admissionRanking2022: 1000, admissionScore2023: 660, admissionRanking2023: 950, admissionScore2024: 663, admissionRanking2024: 900, estimatedRanking2025: 880,
      admissionProbability: getMockProbabilityPercentage(880),
    },
    {
      majorName: '地理科学', majorCode: '070501', university: '北京师范大学', region: '北京', province: '北京', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '理学', schoolingLength: '4年', tuition: 5000, subjectRequirements: '地理', hasPostgraduateRecommendation: true,
      admissionScore2017: 658, admissionRanking2017: 850, admissionScore2018: 661, admissionRanking2018: 800, admissionScore2019: 660, admissionRanking2019: 820, admissionScore2020: 662, admissionRanking2020: 770, admissionScore2021: 664, admissionRanking2021: 760,
      admissionScore2022: 663, admissionRanking2022: 750, admissionScore2023: 666, admissionRanking2023: 700, admissionScore2024: 669, admissionRanking2024: 680, estimatedRanking2025: 670,
      admissionProbability: getMockProbabilityPercentage(670),
    },
    {
      majorName: '机械工程', majorCode: '080201', university: '哈尔滨工业大学', region: '哈尔滨', province: '黑龙江', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '工学', schoolingLength: '4年', tuition: 5500, subjectRequirements: '物理', hasPostgraduateRecommendation: true,
      admissionScore2017: 640, admissionRanking2017: 2300, admissionScore2018: 643, admissionRanking2018: 2200, admissionScore2019: 642, admissionRanking2019: 2250, admissionScore2020: 644, admissionRanking2020: 2100, admissionScore2021: 646, admissionRanking2021: 2050,
      admissionScore2022: 645, admissionRanking2022: 2000, admissionScore2023: 648, admissionRanking2023: 1900, admissionScore2024: 650, admissionRanking2024: 1850, estimatedRanking2025: 1800,
      admissionProbability: getMockProbabilityPercentage(1800),
    },
    {
      majorName: '材料科学与工程', majorCode: '080401', university: '中南大学', region: '长沙', province: '湖南', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '工学', schoolingLength: '4年', tuition: 5900, subjectRequirements: '物理+化学', hasPostgraduateRecommendation: true,
      admissionScore2017: 645, admissionRanking2017: 1900, admissionScore2018: 648, admissionRanking2018: 1800, admissionScore2019: 647, admissionRanking2019: 1850, admissionScore2020: 649, admissionRanking2020: 1700, admissionScore2021: 651, admissionRanking2021: 1650,
      admissionScore2022: 650, admissionRanking2022: 1600, admissionScore2023: 653, admissionRanking2023: 1500, admissionScore2024: 655, admissionRanking2024: 1450, estimatedRanking2025: 1400,
      admissionProbability: getMockProbabilityPercentage(1400),
    },
    {
      majorName: '通信工程', majorCode: '080703', university: '北京邮电大学', region: '北京', province: '北京', universityTier: '211', universityLevel: '本科', universityType: '公办', majorCategory: '工学', schoolingLength: '4年', tuition: 5500, subjectRequirements: '物理', hasPostgraduateRecommendation: true,
      admissionScore2017: 664, admissionRanking2017: 680, admissionScore2018: 666, admissionRanking2018: 630, admissionScore2019: 665, admissionRanking2019: 650, admissionScore2020: 667, admissionRanking2020: 610, admissionScore2021: 669, admissionRanking2021: 600,
      admissionScore2022: 668, admissionRanking2022: 620, admissionScore2023: 671, admissionRanking2023: 590, admissionScore2024: 674, admissionRanking2024: 560, estimatedRanking2025: 540,
      admissionProbability: getMockProbabilityPercentage(540),
    },
    {
      majorName: '建筑学', majorCode: '082801', university: '东南大学', region: '南京', province: '江苏', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '工学', schoolingLength: '5年', tuition: 6800, subjectRequirements: '物理', hasPostgraduateRecommendation: true,
      admissionScore2017: 665, admissionRanking2017: 620, admissionScore2018: 668, admissionRanking2018: 580, admissionScore2019: 667, admissionRanking2019: 590, admissionScore2020: 669, admissionRanking2020: 560, admissionScore2021: 671, admissionRanking2021: 555,
      admissionScore2022: 670, admissionRanking2022: 550, admissionScore2023: 673, admissionRanking2023: 520, admissionScore2024: 676, admissionRanking2024: 500, estimatedRanking2025: 480,
      admissionProbability: getMockProbabilityPercentage(480),
    },
    {
      majorName: '口腔医学', majorCode: '100301K', university: '四川大学', region: '成都', province: '四川', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '医学', schoolingLength: '5年', tuition: 7200, subjectRequirements: '物理+化学+生物', hasPostgraduateRecommendation: true,
      admissionScore2017: 675, admissionRanking2017: 250, admissionScore2018: 678, admissionRanking2018: 230, admissionScore2019: 677, admissionRanking2019: 240, admissionScore2020: 679, admissionRanking2020: 210, admissionScore2021: 681, admissionRanking2021: 205,
      admissionScore2022: 680, admissionRanking2022: 200, admissionScore2023: 683, admissionRanking2023: 180, admissionScore2024: 685, admissionRanking2024: 170, estimatedRanking2025: 160,
      admissionProbability: getMockProbabilityPercentage(160),
    },
    {
      majorName: '药学', majorCode: '100701', university: '中国药科大学', region: '南京', province: '江苏', universityTier: '211', universityLevel: '本科', universityType: '公办', majorCategory: '医学', schoolingLength: '4年', tuition: 6800, subjectRequirements: '化学+生物', hasPostgraduateRecommendation: true,
      admissionScore2017: 635, admissionRanking2017: 2900, admissionScore2018: 638, admissionRanking2018: 2800, admissionScore2019: 637, admissionRanking2019: 2850, admissionScore2020: 639, admissionRanking2020: 2700, admissionScore2021: 641, admissionRanking2021: 2650,
      admissionScore2022: 640, admissionRanking2022: 2600, admissionScore2023: 643, admissionRanking2023: 2500, admissionScore2024: 645, admissionRanking2024: 2400, estimatedRanking2025: 2350,
      admissionProbability: getMockProbabilityPercentage(2350),
    },
    {
      majorName: '会计学', majorCode: '120203K', university: '上海财经大学', region: '上海', province: '上海', universityTier: '211', universityLevel: '本科', universityType: '公办', majorCategory: '管理学', schoolingLength: '4年', tuition: 5000, subjectRequirements: '不限', hasPostgraduateRecommendation: true,
      admissionScore2017: 666, admissionRanking2017: 600, admissionScore2018: 668, admissionRanking2018: 560, admissionScore2019: 667, admissionRanking2019: 570, admissionScore2020: 669, admissionRanking2020: 540, admissionScore2021: 671, admissionRanking2021: 535,
      admissionScore2022: 670, admissionRanking2022: 530, admissionScore2023: 672, admissionRanking2023: 510, admissionScore2024: 674, admissionRanking2024: 490, estimatedRanking2025: 470,
      admissionProbability: getMockProbabilityPercentage(470),
    },
    {
      majorName: '金融学', majorCode: '020301K', university: '中央财经大学', region: '北京', province: '北京', universityTier: '211', universityLevel: '本科', universityType: '公办', majorCategory: '经济学', schoolingLength: '4年', tuition: 5000, subjectRequirements: '不限', hasPostgraduateRecommendation: true,
      admissionScore2017: 671, admissionRanking2017: 380, admissionScore2018: 673, admissionRanking2018: 350, admissionScore2019: 672, admissionRanking2019: 360, admissionScore2020: 674, admissionRanking2020: 330, admissionScore2021: 676, admissionRanking2021: 325,
      admissionScore2022: 675, admissionRanking2022: 320, admissionScore2023: 677, admissionRanking2023: 300, admissionScore2024: 679, admissionRanking2024: 290, estimatedRanking2025: 280,
      admissionProbability: getMockProbabilityPercentage(280),
    },
    {
      majorName: '统计学', majorCode: '071201', university: '中国人民大学', region: '北京', province: '北京', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '理学', schoolingLength: '4年', tuition: 5000, subjectRequirements: '物理', hasPostgraduateRecommendation: true,
      admissionScore2017: 672, admissionRanking2017: 340, admissionScore2018: 674, admissionRanking2018: 310, admissionScore2019: 673, admissionRanking2019: 320, admissionScore2020: 675, admissionRanking2020: 300, admissionScore2021: 677, admissionRanking2021: 295,
      admissionScore2022: 676, admissionRanking2022: 290, admissionScore2023: 678, admissionRanking2023: 270, admissionScore2024: 680, admissionRanking2024: 260, estimatedRanking2025: 250,
      admissionProbability: getMockProbabilityPercentage(250),
    },
    {
      majorName: '历史学', majorCode: '060101', university: '复旦大学', region: '上海', province: '上海', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '历史学', schoolingLength: '4年', tuition: 5000, subjectRequirements: '历史', hasPostgraduateRecommendation: true,
      admissionScore2017: 666, admissionRanking2017: 610, admissionScore2018: 668, admissionRanking2018: 570, admissionScore2019: 667, admissionRanking2019: 580, admissionScore2020: 669, admissionRanking2020: 550, admissionScore2021: 671, admissionRanking2021: 545,
      admissionScore2022: 670, admissionRanking2022: 540, admissionScore2023: 672, admissionRanking2023: 515, admissionScore2024: 674, admissionRanking2024: 495, estimatedRanking2025: 485,
      admissionProbability: getMockProbabilityPercentage(485),
    },
    {
      majorName: '哲学', majorCode: '010101', university: '北京大学', region: '北京', province: '北京', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '哲学', schoolingLength: '4年', tuition: 5000, subjectRequirements: '不限', hasPostgraduateRecommendation: true,
      admissionScore2017: 676, admissionRanking2017: 240, admissionScore2018: 678, admissionRanking2018: 210, admissionScore2019: 677, admissionRanking2019: 220, admissionScore2020: 679, admissionRanking2020: 200, admissionScore2021: 681, admissionRanking2021: 195,
      admissionScore2022: 680, admissionRanking2022: 190, admissionScore2023: 682, admissionRanking2023: 175, admissionScore2024: 684, admissionRanking2024: 165, estimatedRanking2025: 160,
      admissionProbability: getMockProbabilityPercentage(160),
    },
    {
      majorName: '汉语言文学', majorCode: '050101', university: '南京大学', region: '南京', province: '江苏', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '文学', schoolingLength: '4年', tuition: 5200, subjectRequirements: '不限', hasPostgraduateRecommendation: true,
      admissionScore2017: 661, admissionRanking2017: 780, admissionScore2018: 663, admissionRanking2018: 740, admissionScore2019: 662, admissionRanking2019: 760, admissionScore2020: 664, admissionRanking2020: 730, admissionScore2021: 666, admissionRanking2021: 725,
      admissionScore2022: 665, admissionRanking2022: 720, admissionScore2023: 668, admissionRanking2023: 680, admissionScore2024: 670, admissionRanking2024: 650, estimatedRanking2025: 630,
      admissionProbability: getMockProbabilityPercentage(630),
    },
    {
        majorName: '教育学', majorCode: '040101', university: '华东师范大学', region: '上海', province: '上海', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '教育学', schoolingLength: '4年', tuition: 5000, subjectRequirements: '不限', hasPostgraduateRecommendation: true,
        admissionScore2017: 656, admissionRanking2017: 950, admissionScore2018: 658, admissionRanking2018: 900, admissionScore2019: 657, admissionRanking2019: 920, admissionScore2020: 659, admissionRanking2020: 870, admissionScore2021: 661, admissionRanking2021: 860,
        admissionScore2022: 660, admissionRanking2022: 850, admissionScore2023: 663, admissionRanking2023: 800, admissionScore2024: 665, admissionRanking2024: 780, estimatedRanking2025: 770,
        admissionProbability: getMockProbabilityPercentage(770),
    },
    {
        majorName: '心理学', majorCode: '071101', university: '浙江大学', region: '杭州', province: '浙江', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '理学', schoolingLength: '4年', tuition: 5300, subjectRequirements: '物理/生物均可', hasPostgraduateRecommendation: true,
        admissionScore2017: 664, admissionRanking2017: 670, admissionScore2018: 666, admissionRanking2018: 630, admissionScore2019: 665, admissionRanking2019: 640, admissionScore2020: 667, admissionRanking2020: 620, admissionScore2021: 669, admissionRanking2021: 615,
        admissionScore2022: 668, admissionRanking2022: 610, admissionScore2023: 670, admissionRanking2023: 590, admissionScore2024: 672, admissionRanking2024: 570, estimatedRanking2025: 560,
        admissionProbability: getMockProbabilityPercentage(560),
    },
    {
        majorName: '环境工程', majorCode: '082502', university: '同济大学', region: '上海', province: '上海', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '工学', schoolingLength: '4年', tuition: 5000, subjectRequirements: '物理+化学', hasPostgraduateRecommendation: true,
        admissionScore2017: 651, admissionRanking2017: 1450, admissionScore2018: 653, admissionRanking2018: 1350, admissionScore2019: 652, admissionRanking2019: 1400, admissionScore2020: 654, admissionRanking2020: 1300, admissionScore2021: 656, admissionRanking2021: 1280,
        admissionScore2022: 655, admissionRanking2022: 1250, admissionScore2023: 658, admissionRanking2023: 1150, admissionScore2024: 660, admissionRanking2024: 1100, estimatedRanking2025: 1080,
        admissionProbability: getMockProbabilityPercentage(1080),
    },
    {
        majorName: '车辆工程', majorCode: '080207', university: '吉林大学', region: '长春', province: '吉林', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '工学', schoolingLength: '4年', tuition: 5800, subjectRequirements: '物理', hasPostgraduateRecommendation: true,
        admissionScore2017: 625, admissionRanking2017: 4000, admissionScore2018: 628, admissionRanking2018: 3800, admissionScore2019: 627, admissionRanking2019: 3900, admissionScore2020: 629, admissionRanking2020: 3600, admissionScore2021: 631, admissionRanking2021: 3550,
        admissionScore2022: 630, admissionRanking2022: 3500, admissionScore2023: 633, admissionRanking2023: 3300, admissionScore2024: 635, admissionRanking2024: 3200, estimatedRanking2025: 3100,
        admissionProbability: getMockProbabilityPercentage(3100),
    },
    {
        majorName: '食品科学与工程', majorCode: '082701', university: '江南大学', region: '无锡', province: '江苏', universityTier: '211', universityLevel: '本科', universityType: '公办', majorCategory: '工学', schoolingLength: '4年', tuition: 5200, subjectRequirements: '化学+生物', hasPostgraduateRecommendation: true,
        admissionScore2017: 630, admissionRanking2017: 3400, admissionScore2018: 633, admissionRanking2018: 3200, admissionScore2019: 632, admissionRanking2019: 3300, admissionScore2020: 634, admissionRanking2020: 3100, admissionScore2021: 636, admissionRanking2021: 3050,
        admissionScore2022: 635, admissionRanking2022: 3000, admissionScore2023: 638, admissionRanking2023: 2800, admissionScore2024: 640, admissionRanking2024: 2700, estimatedRanking2025: 2650,
        admissionProbability: getMockProbabilityPercentage(2650),
    },
    {
        majorName: '农学', majorCode: '090101', university: '中国农业大学', region: '北京', province: '北京', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '农学', schoolingLength: '4年', tuition: 3000, subjectRequirements: '化学+生物', hasPostgraduateRecommendation: true,
        admissionScore2017: 626, admissionRanking2017: 3900, admissionScore2018: 629, admissionRanking2018: 3700, admissionScore2019: 628, admissionRanking2019: 3800, admissionScore2020: 630, admissionRanking2020: 3650, admissionScore2021: 632, admissionRanking2021: 3620,
        admissionScore2022: 630, admissionRanking2022: 3600, admissionScore2023: 632, admissionRanking2023: 3400, admissionScore2024: 634, admissionRanking2024: 3300, estimatedRanking2025: 3250,
        admissionProbability: getMockProbabilityPercentage(3250),
    },
    {
        majorName: '林学', majorCode: '090501', university: '北京林业大学', region: '北京', province: '北京', universityTier: '211', universityLevel: '本科', universityType: '公办', majorCategory: '农学', schoolingLength: '4年', tuition: 3000, subjectRequirements: '生物', hasPostgraduateRecommendation: true,
        admissionScore2017: 616, admissionRanking2017: 4900, admissionScore2018: 619, admissionRanking2018: 4700, admissionScore2019: 618, admissionRanking2019: 4800, admissionScore2020: 620, admissionRanking2020: 4600, admissionScore2021: 622, admissionRanking2021: 4550,
        admissionScore2022: 620, admissionRanking2022: 4500, admissionScore2023: 623, admissionRanking2023: 4300, admissionScore2024: 625, admissionRanking2024: 4200, estimatedRanking2025: 4100,
        admissionProbability: getMockProbabilityPercentage(4100),
    },
    {
        majorName: '中医学', majorCode: '100501K', university: '北京中医药大学', region: '北京', province: '北京', universityTier: '211', universityLevel: '本科', universityType: '公办', majorCategory: '医学', schoolingLength: '5年', tuition: 6000, subjectRequirements: '物理+化学+生物', hasPostgraduateRecommendation: true,
        admissionScore2017: 640, admissionRanking2017: 2500, admissionScore2018: 643, admissionRanking2018: 2400, admissionScore2019: 642, admissionRanking2019: 2450, admissionScore2020: 644, admissionRanking2020: 2300, admissionScore2021: 646, admissionRanking2021: 2250,
        admissionScore2022: 645, admissionRanking2022: 2200, admissionScore2023: 648, admissionRanking2023: 2100, admissionScore2024: 650, admissionRanking2024: 2000, estimatedRanking2025: 1950,
        admissionProbability: getMockProbabilityPercentage(1950),
    },
    {
        majorName: '设计学类', majorCode: '1305', university: '中央美术学院', region: '北京', province: '北京', universityTier: '艺术类', universityLevel: '本科', universityType: '公办', majorCategory: '艺术学', schoolingLength: '4年', tuition: 15000, subjectRequirements: '不限(艺术)', hasPostgraduateRecommendation: false,
        admissionScore2017: null, admissionRanking2017: null, admissionScore2018: null, admissionRanking2018: null, admissionScore2019: null, admissionRanking2019: null, admissionScore2020: null, admissionRanking2020: null, admissionScore2021: null, admissionRanking2021: null,
        admissionScore2022: null, admissionRanking2022: null,
        admissionScore2023: null, admissionRanking2023: null,
        admissionScore2024: null, admissionRanking2024: null, estimatedRanking2025: null,
        admissionProbability: null,
    },
     {
      majorName: '国际经济与贸易', majorCode: '020401', university: '对外经济贸易大学', region: '北京', province: '北京', universityTier: '211', universityLevel: '本科', universityType: '公办', majorCategory: '经济学', schoolingLength: '4年', tuition: 5000, subjectRequirements: '不限', hasPostgraduateRecommendation: true,
      admissionScore2017: 668, admissionRanking2017: 510, admissionScore2018: 670, admissionRanking2018: 490, admissionScore2019: 669, admissionRanking2019: 500, admissionScore2020: 671, admissionRanking2020: 470, admissionScore2021: 673, admissionRanking2021: 465,
      admissionScore2022: 672, admissionRanking2022: 460, admissionScore2023: 674, admissionRanking2023: 430, admissionScore2024: 676, admissionRanking2024: 410, estimatedRanking2025: 400,
      admissionProbability: getMockProbabilityPercentage(400),
    },
    {
      majorName: '电气工程及其自动化', majorCode: '080601', university: '西安交通大学', region: '西安', province: '陕西', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '工学', schoolingLength: '4年', tuition: 5500, subjectRequirements: '物理', hasPostgraduateRecommendation: true,
      admissionScore2017: 661, admissionRanking2017: 770, admissionScore2018: 663, admissionRanking2018: 730, admissionScore2019: 662, admissionRanking2019: 750, admissionScore2020: 664, admissionRanking2020: 720, admissionScore2021: 666, admissionRanking2021: 715,
      admissionScore2022: 665, admissionRanking2022: 710, admissionScore2023: 668, admissionRanking2023: 670, admissionScore2024: 670, admissionRanking2024: 640, estimatedRanking2025: 620,
      admissionProbability: getMockProbabilityPercentage(620),
    },
    {
      majorName: '临床医学(八年)', majorCode: '100201K', university: '北京协和医学院', region: '北京', province: '北京', universityTier: '顶尖医学院', universityLevel: '本科', universityType: '公办', majorCategory: '医学', schoolingLength: '8年', tuition: 8000, subjectRequirements: '物理+化学+生物', hasPostgraduateRecommendation: true,
      admissionScore2017: 695, admissionRanking2017: 40, admissionScore2018: 697, admissionRanking2018: 35, admissionScore2019: 696, admissionRanking2019: 38, admissionScore2020: 699, admissionRanking2020: 30, admissionScore2021: 701, admissionRanking2021: 28,
      admissionScore2022: 700, admissionRanking2022: 30, admissionScore2023: 702, admissionRanking2023: 25, admissionScore2024: 705, admissionRanking2024: 20, estimatedRanking2025: 18,
      admissionProbability: getMockProbabilityPercentage(18),
    },
     {
        majorName: '应用物理学', majorCode: '070202', university: '中国科学技术大学', region: '合肥', province: '安徽', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '理学', schoolingLength: '4年', tuition: 4800, subjectRequirements: '物理', hasPostgraduateRecommendation: true,
        admissionScore2017: 681, admissionRanking2017: 190, admissionScore2018: 683, admissionRanking2018: 180, admissionScore2019: 682, admissionRanking2019: 185, admissionScore2020: 684, admissionRanking2020: 170, admissionScore2021: 686, admissionRanking2021: 165,
        admissionScore2022: 685, admissionRanking2022: 160, admissionScore2023: 688, admissionRanking2023: 150, admissionScore2024: 690, admissionRanking2024: 140, estimatedRanking2025: 135,
        admissionProbability: getMockProbabilityPercentage(135),
    },
     {
        majorName: '城乡规划', majorCode: '082802', university: '华南理工大学', region: '广州', province: '广东', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '工学', schoolingLength: '5年', tuition: 6860, subjectRequirements: '物理', hasPostgraduateRecommendation: true,
        admissionScore2017: 656, admissionRanking2017: 1000, admissionScore2018: 658, admissionRanking2018: 950, admissionScore2019: 657, admissionRanking2019: 970, admissionScore2020: 659, admissionRanking2020: 920, admissionScore2021: 661, admissionRanking2021: 910,
        admissionScore2022: 660, admissionRanking2022: 900, admissionScore2023: 662, admissionRanking2023: 850, admissionScore2024: 664, admissionRanking2024: 820, estimatedRanking2025: 800,
        admissionProbability: getMockProbabilityPercentage(800),
    },
     {
        majorName: '行政管理', majorCode: '120402', university: '兰州大学', region: '兰州', province: '甘肃', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '管理学', schoolingLength: '4年', tuition: 4500, subjectRequirements: '不限', hasPostgraduateRecommendation: true,
        admissionScore2017: 605, admissionRanking2017: 6500, admissionScore2018: 608, admissionRanking2018: 6200, admissionScore2019: 607, admissionRanking2019: 6300, admissionScore2020: 609, admissionRanking2020: 6100, admissionScore2021: 612, admissionRanking2021: 6050,
        admissionScore2022: 610, admissionRanking2022: 6000, admissionScore2023: 615, admissionRanking2023: 5500, admissionScore2024: 618, admissionRanking2024: 5300, estimatedRanking2025: 5200,
        admissionProbability: getMockProbabilityPercentage(5200),
    },
    // Add ~35 more entries to reach approx 80
     {
        majorName: '日语', majorCode: '050207', university: '大连外国语大学', region: '大连', province: '辽宁', universityTier: '普通本科', universityLevel: '本科', universityType: '公办', majorCategory: '文学', schoolingLength: '4年', tuition: 4800, subjectRequirements: '不限', hasPostgraduateRecommendation: false,
        admissionScore2017: 575, admissionRanking2017: 16000, admissionScore2018: 578, admissionRanking2018: 15500, admissionScore2019: 577, admissionRanking2019: 15700, admissionScore2020: 579, admissionRanking2020: 15200, admissionScore2021: 582, admissionRanking2021: 15100,
        admissionScore2022: 580, admissionRanking2022: 15000, admissionScore2023: 585, admissionRanking2023: 14000, admissionScore2024: 588, admissionRanking2024: 13500, estimatedRanking2025: 13000,
        admissionProbability: getMockProbabilityPercentage(13000),
    },
    {
        majorName: '社会学', majorCode: '030301', university: '山东大学', region: '济南', province: '山东', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '法学', schoolingLength: '4年', tuition: 5000, subjectRequirements: '不限', hasPostgraduateRecommendation: true,
        admissionScore2017: 643, admissionRanking2017: 2000, admissionScore2018: 646, admissionRanking2018: 1900, admissionScore2019: 645, admissionRanking2019: 1950, admissionScore2020: 647, admissionRanking2020: 1800, admissionScore2021: 649, admissionRanking2021: 1750,
        admissionScore2022: 648, admissionRanking2022: 1700, admissionScore2023: 650, admissionRanking2023: 1600, admissionScore2024: 652, admissionRanking2024: 1550, estimatedRanking2025: 1500,
        admissionProbability: getMockProbabilityPercentage(1500),
    },
    {
        majorName: '学前教育', majorCode: '040106', university: '南京师范大学', region: '南京', province: '江苏', universityTier: '211', universityLevel: '本科', universityType: '公办', majorCategory: '教育学', schoolingLength: '4年', tuition: 5200, subjectRequirements: '不限', hasPostgraduateRecommendation: false,
        admissionScore2017: 626, admissionRanking2017: 3950, admissionScore2018: 629, admissionRanking2018: 3750, admissionScore2019: 628, admissionRanking2019: 3850, admissionScore2020: 630, admissionRanking2020: 3750, admissionScore2021: 632, admissionRanking2021: 3720,
        admissionScore2022: 630, admissionRanking2022: 3700, admissionScore2023: 633, admissionRanking2023: 3500, admissionScore2024: 635, admissionRanking2024: 3400, estimatedRanking2025: 3350,
        admissionProbability: getMockProbabilityPercentage(3350),
    },
     {
        majorName: '水利水电工程', majorCode: '081101', university: '河海大学', region: '南京', province: '江苏', universityTier: '211', universityLevel: '本科', universityType: '公办', majorCategory: '工学', schoolingLength: '4年', tuition: 5800, subjectRequirements: '物理', hasPostgraduateRecommendation: true,
        admissionScore2017: 636, admissionRanking2017: 2950, admissionScore2018: 639, admissionRanking2018: 2850, admissionScore2019: 638, admissionRanking2019: 2900, admissionScore2020: 640, admissionRanking2020: 2750, admissionScore2021: 642, admissionRanking2021: 2720,
        admissionScore2022: 640, admissionRanking2022: 2700, admissionScore2023: 642, admissionRanking2023: 2600, admissionScore2024: 644, admissionRanking2024: 2500, estimatedRanking2025: 2450,
        admissionProbability: getMockProbabilityPercentage(2450),
    },
     {
        majorName: '旅游管理', majorCode: '120901K', university: '海南大学', region: '海口', province: '海南', universityTier: '211', universityLevel: '本科', universityType: '公办', majorCategory: '管理学', schoolingLength: '4年', tuition: 4600, subjectRequirements: '不限', hasPostgraduateRecommendation: false,
        admissionScore2017: 621, admissionRanking2017: 4300, admissionScore2018: 624, admissionRanking2018: 4100, admissionScore2019: 623, admissionRanking2019: 4200, admissionScore2020: 625, admissionRanking2020: 4050, admissionScore2021: 627, admissionRanking2021: 4020,
        admissionScore2022: 625, admissionRanking2022: 4000, admissionScore2023: 628, admissionRanking2023: 3800, admissionScore2024: 630, admissionRanking2024: 3700, estimatedRanking2025: 3650,
        admissionProbability: getMockProbabilityPercentage(3650),
    },
     {
        majorName: '天文学', majorCode: '070401', university: '南京大学', region: '南京', province: '江苏', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '理学', schoolingLength: '4年', tuition: 5200, subjectRequirements: '物理', hasPostgraduateRecommendation: true,
        admissionScore2017: 671, admissionRanking2017: 390, admissionScore2018: 673, admissionRanking2018: 360, admissionScore2019: 672, admissionRanking2019: 370, admissionScore2020: 674, admissionRanking2020: 340, admissionScore2021: 676, admissionRanking2021: 335,
        admissionScore2022: 675, admissionRanking2022: 330, admissionScore2023: 677, admissionRanking2023: 310, admissionScore2024: 679, admissionRanking2024: 300, estimatedRanking2025: 290,
        admissionProbability: getMockProbabilityPercentage(290),
    },
     {
        majorName: '市场营销', majorCode: '120202', university: '暨南大学', region: '广州', province: '广东', universityTier: '211', universityLevel: '本科', universityType: '公办', majorCategory: '管理学', schoolingLength: '4年', tuition: 4800, subjectRequirements: '不限', hasPostgraduateRecommendation: false,
        admissionScore2017: 641, admissionRanking2017: 2400, admissionScore2018: 643, admissionRanking2018: 2300, admissionScore2019: 642, admissionRanking2019: 2350, admissionScore2020: 644, admissionRanking2020: 2200, admissionScore2021: 646, admissionRanking2021: 2150,
        admissionScore2022: 645, admissionRanking2022: 2100, admissionScore2023: 647, admissionRanking2023: 2000, admissionScore2024: 649, admissionRanking2024: 1950, estimatedRanking2025: 1900,
        admissionProbability: getMockProbabilityPercentage(1900),
    },
    {
        majorName: '海洋科学', majorCode: '070701', university: '中国海洋大学', region: '青岛', province: '山东', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '理学', schoolingLength: '4年', tuition: 5000, subjectRequirements: '物理/化学/生物任选一', hasPostgraduateRecommendation: true,
        admissionScore2017: 634, admissionRanking2017: 3100, admissionScore2018: 636, admissionRanking2018: 3000, admissionScore2019: 635, admissionRanking2019: 3050, admissionScore2020: 637, admissionRanking2020: 2900, admissionScore2021: 639, admissionRanking2021: 2850,
        admissionScore2022: 638, admissionRanking2022: 2800, admissionScore2023: 640, admissionRanking2023: 2700, admissionScore2024: 642, admissionRanking2024: 2650, estimatedRanking2025: 2600,
        admissionProbability: getMockProbabilityPercentage(2600),
    },
     {
        majorName: '小学教育', majorCode: '040107', university: '陕西师范大学', region: '西安', province: '陕西', universityTier: '211', universityLevel: '本科', universityType: '公办', majorCategory: '教育学', schoolingLength: '4年', tuition: 4600, subjectRequirements: '不限', hasPostgraduateRecommendation: false,
        admissionScore2017: 631, admissionRanking2017: 3400, admissionScore2018: 633, admissionRanking2018: 3200, admissionScore2019: 632, admissionRanking2019: 3300, admissionScore2020: 634, admissionRanking2020: 3150, admissionScore2021: 636, admissionRanking2021: 3120,
        admissionScore2022: 635, admissionRanking2022: 3100, admissionScore2023: 637, admissionRanking2023: 2900, admissionScore2024: 639, admissionRanking2024: 2800, estimatedRanking2025: 2750,
        admissionProbability: getMockProbabilityPercentage(2750),
    },
    {
      majorName: '视觉传达设计', majorCode: '130502', university: '中国美术学院', region: '杭州', province: '浙江', universityTier: '艺术类', universityLevel: '本科', universityType: '公办', majorCategory: '艺术学', schoolingLength: '4年', tuition: 18000, subjectRequirements: '不限(艺术)', hasPostgraduateRecommendation: false,
      admissionScore2017: null, admissionRanking2017: null, admissionScore2018: null, admissionRanking2018: null, admissionScore2019: null, admissionRanking2019: null, admissionScore2020: null, admissionRanking2020: null, admissionScore2021: null, admissionRanking2021: null,
      admissionScore2022: null, admissionRanking2022: null,
      admissionScore2023: null, admissionRanking2023: null,
      admissionScore2024: null, admissionRanking2024: null, estimatedRanking2025: null,
      admissionProbability: null,
    },
    {
      majorName: '舞蹈学', majorCode: '130205', university: '北京舞蹈学院', region: '北京', province: '北京', universityTier: '艺术类', universityLevel: '本科', universityType: '公办', majorCategory: '艺术学', schoolingLength: '4年', tuition: 10000, subjectRequirements: '不限(艺术)', hasPostgraduateRecommendation: false,
      admissionScore2017: null, admissionRanking2017: null, admissionScore2018: null, admissionRanking2018: null, admissionScore2019: null, admissionRanking2019: null, admissionScore2020: null, admissionRanking2020: null, admissionScore2021: null, admissionRanking2021: null,
      admissionScore2022: null, admissionRanking2022: null,
      admissionScore2023: null, admissionRanking2023: null,
      admissionScore2024: null, admissionRanking2024: null, estimatedRanking2025: null,
      admissionProbability: null,
    },
    {
      majorName: '体育教育', majorCode: '040201', university: '北京体育大学', region: '北京', province: '北京', universityTier: '211', universityLevel: '本科', universityType: '公办', majorCategory: '教育学', schoolingLength: '4年', tuition: 5500, subjectRequirements: '不限(体育)', hasPostgraduateRecommendation: false,
      admissionScore2017: 585, admissionRanking2017: 13000, admissionScore2018: 588, admissionRanking2018: 12500, admissionScore2019: 587, admissionRanking2019: 12700, admissionScore2020: 589, admissionRanking2020: 12200, admissionScore2021: 592, admissionRanking2021: 12100,
      admissionScore2022: 590, admissionRanking2022: 12000,
      admissionScore2023: 595, admissionRanking2023: 11000,
      admissionScore2024: 598, admissionRanking2024: 10500, estimatedRanking2025: 10000,
      admissionProbability: getMockProbabilityPercentage(10000),
    },
    {
      majorName: '应用化学', majorCode: '070302', university: '郑州大学', region: '郑州', province: '河南', universityTier: '211', universityLevel: '本科', universityType: '公办', majorCategory: '理学', schoolingLength: '4年', tuition: 4800, subjectRequirements: '化学', hasPostgraduateRecommendation: true,
      admissionScore2017: 616, admissionRanking2017: 5400, admissionScore2018: 619, admissionRanking2018: 5200, admissionScore2019: 618, admissionRanking2019: 5300, admissionScore2020: 620, admissionRanking2020: 5150, admissionScore2021: 622, admissionRanking2021: 5120,
      admissionScore2022: 620, admissionRanking2022: 5100, admissionScore2023: 623, admissionRanking2023: 4900, admissionScore2024: 625, admissionRanking2024: 4800, estimatedRanking2025: 4700,
      admissionProbability: getMockProbabilityPercentage(4700),
    },
    {
      majorName: '信息安全', majorCode: '080904K', university: '杭州电子科技大学', region: '杭州', province: '浙江', universityTier: '普通本科', universityLevel: '本科', universityType: '公办', majorCategory: '工学', schoolingLength: '4年', tuition: 6325, subjectRequirements: '物理', hasPostgraduateRecommendation: false,
      admissionScore2017: 636, admissionRanking2017: 2800, admissionScore2018: 638, admissionRanking2018: 2700, admissionScore2019: 637, admissionRanking2019: 2750, admissionScore2020: 639, admissionRanking2020: 2600, admissionScore2021: 641, admissionRanking2021: 2580,
      admissionScore2022: 640, admissionRanking2022: 2550, admissionScore2023: 643, admissionRanking2023: 2450, admissionScore2024: 645, admissionRanking2024: 2350, estimatedRanking2025: 2300,
      admissionProbability: getMockProbabilityPercentage(2300),
    },
     {
      majorName: '数字媒体技术', majorCode: '080906', university: '浙江工业大学', region: '杭州', province: '浙江', universityTier: '普通本科', universityLevel: '本科', universityType: '公办', majorCategory: '工学', schoolingLength: '4年', tuition: 6325, subjectRequirements: '物理/技术均可', hasPostgraduateRecommendation: false,
      admissionScore2017: 626, admissionRanking2017: 3800, admissionScore2018: 629, admissionRanking2018: 3600, admissionScore2019: 628, admissionRanking2019: 3700, admissionScore2020: 630, admissionRanking2020: 3600, admissionScore2021: 632, admissionRanking2021: 3580,
      admissionScore2022: 630, admissionRanking2022: 3550, admissionScore2023: 633, admissionRanking2023: 3350, admissionScore2024: 635, admissionRanking2024: 3250, estimatedRanking2025: 3200,
      admissionProbability: getMockProbabilityPercentage(3200),
    },
     {
        majorName: '俄语', majorCode: '050202', university: '黑龙江大学', region: '哈尔滨', province: '黑龙江', universityTier: '普通本科', universityLevel: '本科', universityType: '公办', majorCategory: '文学', schoolingLength: '4年', tuition: 4500, subjectRequirements: '不限', hasPostgraduateRecommendation: false,
        admissionScore2017: 565, admissionRanking2017: 19000, admissionScore2018: 568, admissionRanking2018: 18500, admissionScore2019: 567, admissionRanking2019: 18700, admissionScore2020: 569, admissionRanking2020: 18200, admissionScore2021: 572, admissionRanking2021: 18100,
        admissionScore2022: 570, admissionRanking2022: 18000, admissionScore2023: 575, admissionRanking2023: 17000, admissionScore2024: 578, admissionRanking2024: 16500, estimatedRanking2025: 16000,
        admissionProbability: getMockProbabilityPercentage(16000),
    },
    {
        majorName: '测绘工程', majorCode: '081201', university: '武汉大学', region: '武汉', province: '湖北', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '工学', schoolingLength: '4年', tuition: 5800, subjectRequirements: '物理', hasPostgraduateRecommendation: true,
        admissionScore2017: 651, admissionRanking2017: 1500, admissionScore2018: 653, admissionRanking2018: 1400, admissionScore2019: 652, admissionRanking2019: 1450, admissionScore2020: 654, admissionRanking2020: 1350, admissionScore2021: 656, admissionRanking2021: 1320,
        admissionScore2022: 655, admissionRanking2022: 1300, admissionScore2023: 657, admissionRanking2023: 1200, admissionScore2024: 659, admissionRanking2024: 1150, estimatedRanking2025: 1100,
        admissionProbability: getMockProbabilityPercentage(1100),
    },
    {
        majorName: '人力资源管理', majorCode: '120206', university: '西南财经大学', region: '成都', province: '四川', universityTier: '211', universityLevel: '本科', universityType: '公办', majorCategory: '管理学', schoolingLength: '4年', tuition: 4900, subjectRequirements: '不限', hasPostgraduateRecommendation: false,
        admissionScore2017: 646, admissionRanking2017: 1850, admissionScore2018: 648, admissionRanking2018: 1750, admissionScore2019: 647, admissionRanking2019: 1800, admissionScore2020: 649, admissionRanking2020: 1700, admissionScore2021: 651, admissionRanking2021: 1680,
        admissionScore2022: 650, admissionRanking2022: 1650, admissionScore2023: 652, admissionRanking2023: 1550, admissionScore2024: 654, admissionRanking2024: 1500, estimatedRanking2025: 1450,
        admissionProbability: getMockProbabilityPercentage(1450),
    },
    {
        majorName: '广播电视学', majorCode: '050302', university: '中国传媒大学', region: '北京', province: '北京', universityTier: '211', universityLevel: '本科', universityType: '公办', majorCategory: '文学', schoolingLength: '4年', tuition: 10000, subjectRequirements: '不限', hasPostgraduateRecommendation: true,
        admissionScore2017: 661, admissionRanking2017: 790, admissionScore2018: 663, admissionRanking2018: 750, admissionScore2019: 662, admissionRanking2019: 760, admissionScore2020: 664, admissionRanking2020: 740, admissionScore2021: 666, admissionRanking2021: 735,
        admissionScore2022: 665, admissionRanking2022: 730, admissionScore2023: 667, admissionRanking2023: 690, admissionScore2024: 669, admissionRanking2024: 670, estimatedRanking2025: 650,
        admissionProbability: getMockProbabilityPercentage(650),
    },
     {
        majorName: '风景园林', majorCode: '082803', university: '北京林业大学', region: '北京', province: '北京', universityTier: '211', universityLevel: '本科', universityType: '公办', majorCategory: '工学', schoolingLength: '4年', tuition: 6000, subjectRequirements: '物理/历史均可', hasPostgraduateRecommendation: true,
        admissionScore2017: 636, admissionRanking2017: 2900, admissionScore2018: 638, admissionRanking2018: 2800, admissionScore2019: 637, admissionRanking2019: 2850, admissionScore2020: 639, admissionRanking2020: 2700, admissionScore2021: 641, admissionRanking2021: 2680,
        admissionScore2022: 640, admissionRanking2022: 2650, admissionScore2023: 642, admissionRanking2023: 2550, admissionScore2024: 644, admissionRanking2024: 2450, estimatedRanking2025: 2400,
        admissionProbability: getMockProbabilityPercentage(2400),
    },
     {
        majorName: '物流管理', majorCode: '120601', university: '重庆大学', region: '重庆', province: '重庆', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '管理学', schoolingLength: '4年', tuition: 4600, subjectRequirements: '不限', hasPostgraduateRecommendation: false,
        admissionScore2017: 631, admissionRanking2017: 3500, admissionScore2018: 633, admissionRanking2018: 3300, admissionScore2019: 632, admissionRanking2019: 3400, admissionScore2020: 634, admissionRanking2020: 3250, admissionScore2021: 636, admissionRanking2021: 3220,
        admissionScore2022: 635, admissionRanking2022: 3200, admissionScore2023: 638, admissionRanking2023: 3000, admissionScore2024: 640, admissionRanking2024: 2900, estimatedRanking2025: 2850,
        admissionProbability: getMockProbabilityPercentage(2850),
    },
     {
        majorName: '预防医学', majorCode: '100401K', university: '华中科技大学同济医学院', region: '武汉', province: '湖北', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '医学', schoolingLength: '5年', tuition: 5800, subjectRequirements: '物理+化学+生物', hasPostgraduateRecommendation: true,
        admissionScore2017: 656, admissionRanking2017: 1050, admissionScore2018: 658, admissionRanking2018: 1000, admissionScore2019: 657, admissionRanking2019: 1020, admissionScore2020: 659, admissionRanking2020: 970, admissionScore2021: 661, admissionRanking2021: 960,
        admissionScore2022: 660, admissionRanking2022: 950, admissionScore2023: 663, admissionRanking2023: 900, admissionScore2024: 665, admissionRanking2024: 880, estimatedRanking2025: 870,
        admissionProbability: getMockProbabilityPercentage(870),
    },
     {
        majorName: '地质学', majorCode: '070901', university: '中国地质大学(北京)', region: '北京', province: '北京', universityTier: '211', universityLevel: '本科', universityType: '公办', majorCategory: '理学', schoolingLength: '4年', tuition: 5000, subjectRequirements: '物理+化学/地理', hasPostgraduateRecommendation: true,
        admissionScore2017: 621, admissionRanking2017: 4400, admissionScore2018: 624, admissionRanking2018: 4200, admissionScore2019: 623, admissionRanking2019: 4300, admissionScore2020: 625, admissionRanking2020: 4150, admissionScore2021: 627, admissionRanking2021: 4120,
        admissionScore2022: 625, admissionRanking2022: 4100, admissionScore2023: 628, admissionRanking2023: 3900, admissionScore2024: 630, admissionRanking2024: 3800, estimatedRanking2025: 3750,
        admissionProbability: getMockProbabilityPercentage(3750),
    },
     {
        majorName: '电子商务', majorCode: '120801', university: '宁波大学', region: '宁波', province: '浙江', universityTier: '双一流', universityLevel: '本科', universityType: '公办', majorCategory: '管理学', schoolingLength: '4年', tuition: 5500, subjectRequirements: '不限', hasPostgraduateRecommendation: false,
        admissionScore2017: 626, admissionRanking2017: 3900, admissionScore2018: 628, admissionRanking2018: 3700, admissionScore2019: 627, admissionRanking2019: 3800, admissionScore2020: 629, admissionRanking2020: 3700, admissionScore2021: 631, admissionRanking2021: 3680,
        admissionScore2022: 630, admissionRanking2022: 3650, admissionScore2023: 632, admissionRanking2023: 3450, admissionScore2024: 634, admissionRanking2024: 3350, estimatedRanking2025: 3300,
        admissionProbability: getMockProbabilityPercentage(3300),
    },
     {
        majorName: '精算学', majorCode: '020305T', university: '中央财经大学', region: '北京', province: '北京', universityTier: '211', universityLevel: '本科', universityType: '公办', majorCategory: '经济学', schoolingLength: '4年', tuition: 5500, subjectRequirements: '物理', hasPostgraduateRecommendation: true,
        admissionScore2017: 674, admissionRanking2017: 310, admissionScore2018: 676, admissionRanking2018: 290, admissionScore2019: 675, admissionRanking2019: 300, admissionScore2020: 677, admissionRanking2020: 270, admissionScore2021: 679, admissionRanking2021: 265,
        admissionScore2022: 678, admissionRanking2022: 260, admissionScore2023: 680, admissionRanking2023: 240, admissionScore2024: 682, admissionRanking2024: 230, estimatedRanking2025: 220,
        admissionProbability: getMockProbabilityPercentage(220),
    },
    {
        majorName: '能源与动力工程', majorCode: '080501', university: '华北电力大学', region: '北京', province: '北京', universityTier: '211', universityLevel: '本科', universityType: '公办', majorCategory: '工学', schoolingLength: '4年', tuition: 5500, subjectRequirements: '物理', hasPostgraduateRecommendation: true,
        admissionScore2017: 638, admissionRanking2017: 2700, admissionScore2018: 640, admissionRanking2018: 2600, admissionScore2019: 639, admissionRanking2019: 2650, admissionScore2020: 641, admissionRanking2020: 2500, admissionScore2021: 643, admissionRanking2021: 2450,
        admissionScore2022: 642, admissionRanking2022: 2400, admissionScore2023: 645, admissionRanking2023: 2200, admissionScore2024: 647, admissionRanking2024: 2100, estimatedRanking2025: 2050,
        admissionProbability: getMockProbabilityPercentage(2050),
    },
    {
        majorName: '遥感科学与技术', majorCode: '081202', university: '武汉大学', region: '武汉', province: '湖北', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '工学', schoolingLength: '4年', tuition: 5800, subjectRequirements: '物理', hasPostgraduateRecommendation: true,
        admissionScore2017: 656, admissionRanking2017: 1000, admissionScore2018: 658, admissionRanking2018: 950, admissionScore2019: 657, admissionRanking2019: 970, admissionScore2020: 659, admissionRanking2020: 930, admissionScore2021: 661, admissionRanking2021: 920,
        admissionScore2022: 660, admissionRanking2022: 910, admissionScore2023: 662, admissionRanking2023: 860, admissionScore2024: 664, admissionRanking2024: 830, estimatedRanking2025: 810,
        admissionProbability: getMockProbabilityPercentage(810),
    },
    {
        majorName: '西班牙语', majorCode: '050205', university: '上海外国语大学', region: '上海', province: '上海', universityTier: '211', universityLevel: '本科', universityType: '公办', majorCategory: '文学', schoolingLength: '4年', tuition: 5000, subjectRequirements: '不限', hasPostgraduateRecommendation: true,
        admissionScore2017: 651, admissionRanking2017: 1480, admissionScore2018: 653, admissionRanking2018: 1380, admissionScore2019: 652, admissionRanking2019: 1420, admissionScore2020: 654, admissionRanking2020: 1320, admissionScore2021: 656, admissionRanking2021: 1300,
        admissionScore2022: 655, admissionRanking2022: 1280, admissionScore2023: 658, admissionRanking2023: 1180, admissionScore2024: 660, admissionRanking2024: 1120, estimatedRanking2025: 1100,
        admissionProbability: getMockProbabilityPercentage(1100),
    },
    {
        majorName: '物联网工程', majorCode: '080905', university: '江南大学', region: '无锡', province: '江苏', universityTier: '211', universityLevel: '本科', universityType: '公办', majorCategory: '工学', schoolingLength: '4年', tuition: 5200, subjectRequirements: '物理', hasPostgraduateRecommendation: true,
        admissionScore2017: 636, admissionRanking2017: 3000, admissionScore2018: 639, admissionRanking2018: 2900, admissionScore2019: 638, admissionRanking2019: 2950, admissionScore2020: 640, admissionRanking2020: 2800, admissionScore2021: 642, admissionRanking2021: 2780,
        admissionScore2022: 640, admissionRanking2022: 2750, admissionScore2023: 643, admissionRanking2023: 2650, admissionScore2024: 645, admissionRanking2024: 2550, estimatedRanking2025: 2500,
        admissionProbability: getMockProbabilityPercentage(2500),
    },
     {
        majorName: '微电子科学与工程', majorCode: '080704', university: '电子科技大学', region: '成都', province: '四川', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '工学', schoolingLength: '4年', tuition: 4900, subjectRequirements: '物理', hasPostgraduateRecommendation: true,
        admissionScore2017: 671, admissionRanking2017: 390, admissionScore2018: 673, admissionRanking2018: 370, admissionScore2019: 672, admissionRanking2019: 380, admissionScore2020: 674, admissionRanking2020: 350, admissionScore2021: 676, admissionRanking2021: 345,
        admissionScore2022: 675, admissionRanking2022: 340, admissionScore2023: 678, admissionRanking2023: 320, admissionScore2024: 680, admissionRanking2024: 300, estimatedRanking2025: 290,
        admissionProbability: getMockProbabilityPercentage(290),
    },
    // Add ~ 10 more entries
    {
        majorName: '光电信息科学与工程', majorCode: '080705', university: '天津大学', region: '天津', province: '天津', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '工学', schoolingLength: '4年', tuition: 5200, subjectRequirements: '物理', hasPostgraduateRecommendation: true,
        admissionScore2017: 660, admissionRanking2017: 810, admissionScore2018: 662, admissionRanking2018: 780, admissionScore2019: 661, admissionRanking2019: 790, admissionScore2020: 663, admissionRanking2020: 760, admissionScore2021: 665, admissionRanking2021: 755,
        admissionScore2022: 664, admissionRanking2022: 750, admissionScore2023: 666, admissionRanking2023: 710, admissionScore2024: 668, admissionRanking2024: 690, estimatedRanking2025: 680,
        admissionProbability: getMockProbabilityPercentage(680),
    },
     {
        majorName: '信息管理与信息系统', majorCode: '120102', university: '北京航空航天大学', region: '北京', province: '北京', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '管理学', schoolingLength: '4年', tuition: 5500, subjectRequirements: '物理', hasPostgraduateRecommendation: true,
        admissionScore2017: 665, admissionRanking2017: 630, admissionScore2018: 667, admissionRanking2018: 600, admissionScore2019: 666, admissionRanking2019: 610, admissionScore2020: 668, admissionRanking2020: 580, admissionScore2021: 670, admissionRanking2021: 575,
        admissionScore2022: 669, admissionRanking2022: 570, admissionScore2023: 671, admissionRanking2023: 540, admissionScore2024: 673, admissionRanking2024: 520, estimatedRanking2025: 510,
        admissionProbability: getMockProbabilityPercentage(510),
    },
     {
        majorName: '工业设计', majorCode: '080205', university: '湖南大学', region: '长沙', province: '湖南', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '工学', schoolingLength: '4年', tuition: 5900, subjectRequirements: '物理/历史均可', hasPostgraduateRecommendation: false,
        admissionScore2017: 640, admissionRanking2017: 2450, admissionScore2018: 642, admissionRanking2018: 2350, admissionScore2019: 641, admissionRanking2019: 2400, admissionScore2020: 643, admissionRanking2020: 2250, admissionScore2021: 645, admissionRanking2021: 2220,
        admissionScore2022: 644, admissionRanking2022: 2200, admissionScore2023: 646, admissionRanking2023: 2100, admissionScore2024: 648, admissionRanking2024: 2050, estimatedRanking2025: 2000,
        admissionProbability: getMockProbabilityPercentage(2000),
    },
     {
        majorName: '财务管理', majorCode: '120204', university: '厦门大学', region: '厦门', province: '福建', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '管理学', schoolingLength: '4年', tuition: 5460, subjectRequirements: '不限', hasPostgraduateRecommendation: true,
        admissionScore2017: 660, admissionRanking2017: 820, admissionScore2018: 662, admissionRanking2018: 790, admissionScore2019: 661, admissionRanking2019: 800, admissionScore2020: 663, admissionRanking2020: 770, admissionScore2021: 665, admissionRanking2021: 765,
        admissionScore2022: 664, admissionRanking2022: 760, admissionScore2023: 666, admissionRanking2023: 720, admissionScore2024: 668, admissionRanking2024: 700, estimatedRanking2025: 690,
        admissionProbability: getMockProbabilityPercentage(690),
    },
     {
        majorName: '朝鲜语', majorCode: '050209', university: '延边大学', region: '延吉', province: '吉林', universityTier: '211', universityLevel: '本科', universityType: '公办', majorCategory: '文学', schoolingLength: '4年', tuition: 3800, subjectRequirements: '不限', hasPostgraduateRecommendation: false,
        admissionScore2017: 560, admissionRanking2017: 20000, admissionScore2018: 563, admissionRanking2018: 19500, admissionScore2019: 562, admissionRanking2019: 19700, admissionScore2020: 564, admissionRanking2020: 19200, admissionScore2021: 566, admissionRanking2021: 19100,
        admissionScore2022: 565, admissionRanking2022: 19000, admissionScore2023: 568, admissionRanking2023: 18000, admissionScore2024: 570, admissionRanking2024: 17500, estimatedRanking2025: 17000,
        admissionProbability: getMockProbabilityPercentage(17000),
    },
     {
        majorName: '宗教学', majorCode: '010103', university: '四川大学', region: '成都', province: '四川', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '哲学', schoolingLength: '4年', tuition: 4500, subjectRequirements: '不限', hasPostgraduateRecommendation: true,
        admissionScore2017: 630, admissionRanking2017: 3600, admissionScore2018: 632, admissionRanking2018: 3400, admissionScore2019: 631, admissionRanking2019: 3500, admissionScore2020: 633, admissionRanking2020: 3350, admissionScore2021: 635, admissionRanking2021: 3320,
        admissionScore2022: 634, admissionRanking2022: 3300, admissionScore2023: 636, admissionRanking2023: 3100, admissionScore2024: 638, admissionRanking2024: 3000, estimatedRanking2025: 2950,
        admissionProbability: getMockProbabilityPercentage(2950),
    },
     {
        majorName: '核工程与核技术', majorCode: '080502', university: '清华大学', region: '北京', province: '北京', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '工学', schoolingLength: '4年', tuition: 5000, subjectRequirements: '物理', hasPostgraduateRecommendation: true,
        admissionScore2017: 692, admissionRanking2017: 60, admissionScore2018: 694, admissionRanking2018: 55, admissionScore2019: 693, admissionRanking2019: 58, admissionScore2020: 696, admissionRanking2020: 45, admissionScore2021: 698, admissionRanking2021: 42,
        admissionScore2022: 697, admissionRanking2022: 40, admissionScore2023: 699, admissionRanking2023: 35, admissionScore2024: 702, admissionRanking2024: 30, estimatedRanking2025: 28,
        admissionProbability: getMockProbabilityPercentage(28),
    },
     {
        majorName: '劳动与社会保障', majorCode: '120403', university: '中国人民大学', region: '北京', province: '北京', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '管理学', schoolingLength: '4年', tuition: 5000, subjectRequirements: '不限', hasPostgraduateRecommendation: true,
        admissionScore2017: 670, admissionRanking2017: 400, admissionScore2018: 672, admissionRanking2018: 380, admissionScore2019: 671, admissionRanking2019: 390, admissionScore2020: 673, admissionRanking2020: 370, admissionScore2021: 675, admissionRanking2021: 365,
        admissionScore2022: 674, admissionRanking2022: 360, admissionScore2023: 676, admissionRanking2023: 330, admissionScore2024: 678, admissionRanking2024: 310, estimatedRanking2025: 300,
        admissionProbability: getMockProbabilityPercentage(300),
    },
     {
        majorName: '特殊教育', majorCode: '040109T', university: '华东师范大学', region: '上海', province: '上海', universityTier: '985', universityLevel: '本科', universityType: '公办', majorCategory: '教育学', schoolingLength: '4年', tuition: 5000, subjectRequirements: '不限', hasPostgraduateRecommendation: true,
        admissionScore2017: 640, admissionRanking2017: 2550, admissionScore2018: 643, admissionRanking2018: 2450, admissionScore2019: 642, admissionRanking2019: 2500, admissionScore2020: 644, admissionRanking2020: 2400, admissionScore2021: 646, admissionRanking2021: 2380,
        admissionScore2022: 645, admissionRanking2022: 2350, admissionScore2023: 648, admissionRanking2023: 2250, admissionScore2024: 650, admissionRanking2024: 2200, estimatedRanking2025: 2150,
        admissionProbability: getMockProbabilityPercentage(2150),
    },
     {
        majorName: '矿物加工工程', majorCode: '081402', university: '中国矿业大学', region: '徐州', province: '江苏', universityTier: '211', universityLevel: '本科', universityType: '公办', majorCategory: '工学', schoolingLength: '4年', tuition: 5800, subjectRequirements: '物理+化学', hasPostgraduateRecommendation: true,
        admissionScore2017: 610, admissionRanking2017: 6100, admissionScore2018: 613, admissionRanking2018: 5900, admissionScore2019: 612, admissionRanking2019: 6000, admissionScore2020: 614, admissionRanking2020: 5800, admissionScore2021: 616, admissionRanking2021: 5750,
        admissionScore2022: 615, admissionRanking2022: 5700, admissionScore2023: 618, admissionRanking2023: 5500, admissionScore2024: 620, admissionRanking2024: 5400, estimatedRanking2025: 5300,
        admissionProbability: getMockProbabilityPercentage(5300),
    },
];
// --- End Mock Data ---


/**
 * Asynchronously retrieves major recommendations based on the provided filter.
 * Simulates an API call. Returns filtered mock data.
 *
 * @param filter The filter criteria for major recommendation.
 * @returns A promise that resolves to an array of Major objects.
 */
export async function getMajorRecommendations(
  filter: MajorRecommendationFilter
): Promise<Major[]> {
  console.log('Fetching recommendations with filter:', filter);
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300)); // Reduced delay

  // Simulate filtering based on the provided criteria
  let results = MOCK_MAJORS;

  // Apply filters similar to how the RecommendationFilters component does client-side
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
   // NOTE: Subject requirement filtering is NOT done here in the mock service.
   // It's assumed the `RecommendationFilters` component handles all filtering *after*
   // this initial fetch based on regions/categories from the form.

   console.log(`Mock service returning ${results.length} results after initial filter.`);
  return results;
}


/**
 * Asynchronously retrieves the details for a specific major.
 * Simulates an API call. Finds the major in the mock data.
 *
 * @param majorCode The code of the major.
 * @param universityName The name of the university.
 * @returns A promise that resolves to the Major object or null if not found.
 */
export async function getMajorDetails(majorCode: string, universityName: string): Promise<Major | null> {
    console.log(`Fetching details for majorCode: ${majorCode}, university: ${universityName}`);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));

    const foundMajor = MOCK_MAJORS.find(
        major => major.majorCode === majorCode && major.university === universityName
    );

    if (!foundMajor) {
        console.error(`Major not found for code: ${majorCode}, university: ${universityName}`);
        return null;
    }

    console.log('Found major details:', foundMajor);
    return foundMajor;
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
