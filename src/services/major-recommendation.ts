
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
  /**
   * The estimated admission ranking for 2025. Can be null if data is unavailable.
   */
  estimatedRanking2025: number | null;

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
// Expanded mock data with more entries and variety in tuition/schooling length
const MOCK_MAJORS: Major[] = [
   {
      majorName: '计算机科学与技术', majorCode: '080901', university: '北京大学', region: '北京', majorCategory: '工学', universityTier: '985', schoolingLength: '4年', tuition: 5500, subjectRequirements: '物理',
      admissionScore2022: 695, admissionRanking2022: 50, admissionScore2023: 698, admissionRanking2023: 45, admissionScore2024: 701, admissionRanking2024: 40, estimatedRanking2025: 38,
    },
    {
      majorName: '软件工程', majorCode: '080902', university: '清华大学', region: '北京', majorCategory: '工学', universityTier: '985', schoolingLength: '4年', tuition: 5500, subjectRequirements: '物理',
      admissionScore2022: 693, admissionRanking2022: 60, admissionScore2023: 696, admissionRanking2023: 55, admissionScore2024: 699, admissionRanking2024: 50, estimatedRanking2025: 48,
    },
     {
      majorName: '人工智能', majorCode: '080717T', university: '上海交通大学', region: '上海', majorCategory: '工学', universityTier: '985', schoolingLength: '4年', tuition: 6500, subjectRequirements: '物理+化学',
      admissionScore2022: 688, admissionRanking2022: 120, admissionScore2023: 690, admissionRanking2023: 110, admissionScore2024: 692, admissionRanking2024: 100, estimatedRanking2025: 95,
    },
    {
      majorName: '临床医学', majorCode: '100201K', university: '复旦大学', region: '上海', majorCategory: '医学', universityTier: '985', schoolingLength: '5年', tuition: 7000, subjectRequirements: '物理+化学+生物',
      admissionScore2022: 685, admissionRanking2022: 150, admissionScore2023: 688, admissionRanking2023: 140, admissionScore2024: 690, admissionRanking2024: 130, estimatedRanking2025: 125,
    },
    {
      majorName: '经济学', majorCode: '020101', university: '浙江大学', region: '浙江', majorCategory: '经济学', universityTier: '985', schoolingLength: '4年', tuition: 5000, subjectRequirements: '不限',
      admissionScore2022: 675, admissionRanking2022: 300, admissionScore2023: 678, admissionRanking2023: 280, admissionScore2024: 680, admissionRanking2024: 250, estimatedRanking2025: 240,
    },
     {
      majorName: '法学', majorCode: '030101K', university: '武汉大学', region: '湖北', majorCategory: '法学', universityTier: '985', schoolingLength: '4年', tuition: 5200, subjectRequirements: '历史/政治均可',
      admissionScore2022: 660, admissionRanking2022: 800, admissionScore2023: 665, admissionRanking2023: 750, admissionScore2024: 668, admissionRanking2024: 700, estimatedRanking2025: 680,
    },
    {
      majorName: '电子信息工程', majorCode: '080701', university: '华中科技大学', region: '湖北', majorCategory: '工学', universityTier: '985', schoolingLength: '4年', tuition: 5800, subjectRequirements: '物理',
      admissionScore2022: 670, admissionRanking2022: 500, admissionScore2023: 672, admissionRanking2023: 480, admissionScore2024: 675, admissionRanking2024: 450, estimatedRanking2025: 430,
    },
     {
      majorName: '工商管理', majorCode: '120201K', university: '中山大学', region: '广东', majorCategory: '管理学', universityTier: '985', schoolingLength: '4年', tuition: 4800, subjectRequirements: '不限',
      admissionScore2022: 655, admissionRanking2022: 1200, admissionScore2023: 658, admissionRanking2023: 1100, admissionScore2024: 660, admissionRanking2024: 1000, estimatedRanking2025: 950,
    },
    {
      majorName: '土木工程', majorCode: '081001', university: '同济大学', region: '上海', majorCategory: '工学', universityTier: '985', schoolingLength: '4年', tuition: 5000, subjectRequirements: '物理',
      admissionScore2022: 662, admissionRanking2022: 700, admissionScore2023: 660, admissionRanking2023: 720, admissionScore2024: 663, admissionRanking2024: 710, estimatedRanking2025: 700,
    },
     {
      majorName: '英语', majorCode: '050201', university: '北京外国语大学', region: '北京', majorCategory: '文学', universityTier: '211', schoolingLength: '4年', tuition: 6000, subjectRequirements: '不限',
      admissionScore2022: 640, admissionRanking2022: 2500, admissionScore2023: 645, admissionRanking2023: 2300, admissionScore2024: 648, admissionRanking2024: 2200, estimatedRanking2025: 2150,
    },
     {
      majorName: '数学与应用数学', majorCode: '070101', university: '山东大学', region: '山东', majorCategory: '理学', universityTier: '985', schoolingLength: '4年', tuition: 5000, subjectRequirements: '物理',
      admissionScore2022: 650, admissionRanking2022: 1500, admissionScore2023: 655, admissionRanking2023: 1400, admissionScore2024: 658, admissionRanking2024: 1350, estimatedRanking2025: 1300,
    },
    {
      majorName: '自动化', majorCode: '080801', university: '东南大学', region: '江苏', majorCategory: '工学', universityTier: '985', schoolingLength: '4年', tuition: 5200, subjectRequirements: '物理',
      admissionScore2022: 668, admissionRanking2022: 600, admissionScore2023: 670, admissionRanking2023: 580, admissionScore2024: 673, admissionRanking2024: 550, estimatedRanking2025: 530,
    },
     {
      majorName: '网络空间安全', majorCode: '080904TK', university: '西安电子科技大学', region: '陕西', majorCategory: '工学', universityTier: '211', schoolingLength: '4年', tuition: 5500, subjectRequirements: '物理',
      admissionScore2022: 652, admissionRanking2022: 1400, admissionScore2023: 656, admissionRanking2023: 1300, admissionScore2024: 659, admissionRanking2024: 1250, estimatedRanking2025: 1200,
    },
    {
      majorName: '新闻传播学类', majorCode: '0503', university: '中国人民大学', region: '北京', majorCategory: '文学', universityTier: '985', schoolingLength: '4年', tuition: 5000, subjectRequirements: '不限',
      admissionScore2022: 678, admissionRanking2022: 250, admissionScore2023: 680, admissionRanking2023: 230, admissionScore2024: 682, admissionRanking2024: 220, estimatedRanking2025: 210,
    },
    {
      majorName: '护理学', majorCode: '101101', university: '四川大学', region: '四川', majorCategory: '医学', universityTier: '985', schoolingLength: '4年', tuition: 4800, subjectRequirements: '化学+生物',
      admissionScore2022: 620, admissionRanking2022: 5000, admissionScore2023: 625, admissionRanking2023: 4800, admissionScore2024: 628, admissionRanking2024: 4700, estimatedRanking2025: 4600,
    },
    // --- Added More Data ---
    {
      majorName: '物理学', majorCode: '070201', university: '南京大学', region: '江苏', majorCategory: '理学', universityTier: '985', schoolingLength: '4年', tuition: 5200, subjectRequirements: '物理',
      admissionScore2022: 672, admissionRanking2022: 450, admissionScore2023: 675, admissionRanking2023: 420, admissionScore2024: 678, admissionRanking2024: 400, estimatedRanking2025: 380,
    },
    {
      majorName: '化学', majorCode: '070301', university: '南开大学', region: '天津', majorCategory: '理学', universityTier: '985', schoolingLength: '4年', tuition: 5200, subjectRequirements: '化学',
      admissionScore2022: 665, admissionRanking2022: 700, admissionScore2023: 668, admissionRanking2023: 650, admissionScore2024: 670, admissionRanking2024: 620, estimatedRanking2025: 600,
    },
    {
      majorName: '生物科学', majorCode: '071001', university: '厦门大学', region: '福建', majorCategory: '理学', universityTier: '985', schoolingLength: '4年', tuition: 5400, subjectRequirements: '生物',
      admissionScore2022: 658, admissionRanking2022: 1000, admissionScore2023: 660, admissionRanking2023: 950, admissionScore2024: 663, admissionRanking2024: 900, estimatedRanking2025: 880,
    },
    {
      majorName: '地理科学', majorCode: '070501', university: '北京师范大学', region: '北京', majorCategory: '理学', universityTier: '985', schoolingLength: '4年', tuition: 5000, subjectRequirements: '地理',
      admissionScore2022: 663, admissionRanking2022: 750, admissionScore2023: 666, admissionRanking2023: 700, admissionScore2024: 669, admissionRanking2024: 680, estimatedRanking2025: 670,
    },
    {
      majorName: '机械工程', majorCode: '080201', university: '哈尔滨工业大学', region: '黑龙江', majorCategory: '工学', universityTier: '985', schoolingLength: '4年', tuition: 5500, subjectRequirements: '物理',
      admissionScore2022: 645, admissionRanking2022: 2000, admissionScore2023: 648, admissionRanking2023: 1900, admissionScore2024: 650, admissionRanking2024: 1850, estimatedRanking2025: 1800,
    },
    {
      majorName: '材料科学与工程', majorCode: '080401', university: '中南大学', region: '湖南', majorCategory: '工学', universityTier: '985', schoolingLength: '4年', tuition: 5900, subjectRequirements: '物理+化学',
      admissionScore2022: 650, admissionRanking2022: 1600, admissionScore2023: 653, admissionRanking2023: 1500, admissionScore2024: 655, admissionRanking2024: 1450, estimatedRanking2025: 1400,
    },
    {
      majorName: '通信工程', majorCode: '080703', university: '北京邮电大学', region: '北京', majorCategory: '工学', universityTier: '211', schoolingLength: '4年', tuition: 5500, subjectRequirements: '物理',
      admissionScore2022: 668, admissionRanking2022: 620, admissionScore2023: 671, admissionRanking2023: 590, admissionScore2024: 674, admissionRanking2024: 560, estimatedRanking2025: 540,
    },
    {
      majorName: '建筑学', majorCode: '082801', university: '东南大学', region: '江苏', majorCategory: '工学', universityTier: '985', schoolingLength: '5年', tuition: 6800, subjectRequirements: '物理',
      admissionScore2022: 670, admissionRanking2022: 550, admissionScore2023: 673, admissionRanking2023: 520, admissionScore2024: 676, admissionRanking2024: 500, estimatedRanking2025: 480,
    },
    {
      majorName: '口腔医学', majorCode: '100301K', university: '四川大学', region: '四川', majorCategory: '医学', universityTier: '985', schoolingLength: '5年', tuition: 7200, subjectRequirements: '物理+化学+生物',
      admissionScore2022: 680, admissionRanking2022: 200, admissionScore2023: 683, admissionRanking2023: 180, admissionScore2024: 685, admissionRanking2024: 170, estimatedRanking2025: 160,
    },
    {
      majorName: '药学', majorCode: '100701', university: '中国药科大学', region: '江苏', majorCategory: '医学', universityTier: '211', schoolingLength: '4年', tuition: 6800, subjectRequirements: '化学+生物',
      admissionScore2022: 640, admissionRanking2022: 2600, admissionScore2023: 643, admissionRanking2023: 2500, admissionScore2024: 645, admissionRanking2024: 2400, estimatedRanking2025: 2350,
    },
    {
      majorName: '会计学', majorCode: '120203K', university: '上海财经大学', region: '上海', majorCategory: '管理学', universityTier: '211', schoolingLength: '4年', tuition: 5000, subjectRequirements: '不限',
      admissionScore2022: 670, admissionRanking2022: 530, admissionScore2023: 672, admissionRanking2023: 510, admissionScore2024: 674, admissionRanking2024: 490, estimatedRanking2025: 470,
    },
    {
      majorName: '金融学', majorCode: '020301K', university: '中央财经大学', region: '北京', majorCategory: '经济学', universityTier: '211', schoolingLength: '4年', tuition: 5000, subjectRequirements: '不限',
      admissionScore2022: 675, admissionRanking2022: 320, admissionScore2023: 677, admissionRanking2023: 300, admissionScore2024: 679, admissionRanking2024: 290, estimatedRanking2025: 280,
    },
    {
      majorName: '统计学', majorCode: '071201', university: '中国人民大学', region: '北京', majorCategory: '理学', universityTier: '985', schoolingLength: '4年', tuition: 5000, subjectRequirements: '物理',
      admissionScore2022: 676, admissionRanking2022: 290, admissionScore2023: 678, admissionRanking2023: 270, admissionScore2024: 680, admissionRanking2024: 260, estimatedRanking2025: 250,
    },
    {
      majorName: '历史学', majorCode: '060101', university: '复旦大学', region: '上海', majorCategory: '历史学', universityTier: '985', schoolingLength: '4年', tuition: 5000, subjectRequirements: '历史',
      admissionScore2022: 670, admissionRanking2022: 540, admissionScore2023: 672, admissionRanking2023: 515, admissionScore2024: 674, admissionRanking2024: 495, estimatedRanking2025: 485,
    },
    {
      majorName: '哲学', majorCode: '010101', university: '北京大学', region: '北京', majorCategory: '哲学', universityTier: '985', schoolingLength: '4年', tuition: 5000, subjectRequirements: '不限',
      admissionScore2022: 680, admissionRanking2022: 190, admissionScore2023: 682, admissionRanking2023: 175, admissionScore2024: 684, admissionRanking2024: 165, estimatedRanking2025: 160,
    },
    {
      majorName: '汉语言文学', majorCode: '050101', university: '南京大学', region: '江苏', majorCategory: '文学', universityTier: '985', schoolingLength: '4年', tuition: 5200, subjectRequirements: '不限',
      admissionScore2022: 665, admissionRanking2022: 720, admissionScore2023: 668, admissionRanking2023: 680, admissionScore2024: 670, admissionRanking2024: 650, estimatedRanking2025: 630,
    },
    {
        majorName: '教育学', majorCode: '040101', university: '华东师范大学', region: '上海', majorCategory: '教育学', universityTier: '985', schoolingLength: '4年', tuition: 5000, subjectRequirements: '不限',
        admissionScore2022: 660, admissionRanking2022: 850, admissionScore2023: 663, admissionRanking2023: 800, admissionScore2024: 665, admissionRanking2024: 780, estimatedRanking2025: 770,
    },
    {
        majorName: '心理学', majorCode: '071101', university: '浙江大学', region: '浙江', majorCategory: '理学', universityTier: '985', schoolingLength: '4年', tuition: 5300, subjectRequirements: '物理/生物均可',
        admissionScore2022: 668, admissionRanking2022: 610, admissionScore2023: 670, admissionRanking2023: 590, admissionScore2024: 672, admissionRanking2024: 570, estimatedRanking2025: 560,
    },
    {
        majorName: '环境工程', majorCode: '082502', university: '同济大学', region: '上海', majorCategory: '工学', universityTier: '985', schoolingLength: '4年', tuition: 5000, subjectRequirements: '物理+化学',
        admissionScore2022: 655, admissionRanking2022: 1250, admissionScore2023: 658, admissionRanking2023: 1150, admissionScore2024: 660, admissionRanking2024: 1100, estimatedRanking2025: 1080,
    },
    {
        majorName: '车辆工程', majorCode: '080207', university: '吉林大学', region: '吉林', majorCategory: '工学', universityTier: '985', schoolingLength: '4年', tuition: 5800, subjectRequirements: '物理',
        admissionScore2022: 630, admissionRanking2022: 3500, admissionScore2023: 633, admissionRanking2023: 3300, admissionScore2024: 635, admissionRanking2024: 3200, estimatedRanking2025: 3100,
    },
    {
        majorName: '食品科学与工程', majorCode: '082701', university: '江南大学', region: '江苏', majorCategory: '工学', universityTier: '211', schoolingLength: '4年', tuition: 5200, subjectRequirements: '化学+生物',
        admissionScore2022: 635, admissionRanking2022: 3000, admissionScore2023: 638, admissionRanking2023: 2800, admissionScore2024: 640, admissionRanking2024: 2700, estimatedRanking2025: 2650,
    },
    {
        majorName: '农学', majorCode: '090101', university: '中国农业大学', region: '北京', majorCategory: '农学', universityTier: '985', schoolingLength: '4年', tuition: 3000, subjectRequirements: '化学+生物',
        admissionScore2022: 630, admissionRanking2022: 3600, admissionScore2023: 632, admissionRanking2023: 3400, admissionScore2024: 634, admissionRanking2024: 3300, estimatedRanking2025: 3250,
    },
    {
        majorName: '林学', majorCode: '090501', university: '北京林业大学', region: '北京', majorCategory: '农学', universityTier: '211', schoolingLength: '4年', tuition: 3000, subjectRequirements: '生物',
        admissionScore2022: 620, admissionRanking2022: 4500, admissionScore2023: 623, admissionRanking2023: 4300, admissionScore2024: 625, admissionRanking2024: 4200, estimatedRanking2025: 4100,
    },
    {
        majorName: '中医学', majorCode: '100501K', university: '北京中医药大学', region: '北京', majorCategory: '医学', universityTier: '211', schoolingLength: '5年', tuition: 6000, subjectRequirements: '物理+化学+生物',
        admissionScore2022: 645, admissionRanking2022: 2200, admissionScore2023: 648, admissionRanking2023: 2100, admissionScore2024: 650, admissionRanking2024: 2000, estimatedRanking2025: 1950,
    },
    {
        majorName: '设计学类', majorCode: '1305', university: '中央美术学院', region: '北京', majorCategory: '艺术学', universityTier: '艺术类', schoolingLength: '4年', tuition: 15000, subjectRequirements: '不限(艺术)',
        admissionScore2022: null, admissionRanking2022: null, // Art schools often have different admission criteria
        admissionScore2023: null, admissionRanking2023: null,
        admissionScore2024: null, admissionRanking2024: null, estimatedRanking2025: null,
    },
     {
      majorName: '国际经济与贸易', majorCode: '020401', university: '对外经济贸易大学', region: '北京', majorCategory: '经济学', universityTier: '211', schoolingLength: '4年', tuition: 5000, subjectRequirements: '不限',
      admissionScore2022: 672, admissionRanking2022: 460, admissionScore2023: 674, admissionRanking2023: 430, admissionScore2024: 676, admissionRanking2024: 410, estimatedRanking2025: 400,
    },
    {
      majorName: '电气工程及其自动化', majorCode: '080601', university: '西安交通大学', region: '陕西', majorCategory: '工学', universityTier: '985', schoolingLength: '4年', tuition: 5500, subjectRequirements: '物理',
      admissionScore2022: 665, admissionRanking2022: 710, admissionScore2023: 668, admissionRanking2023: 670, admissionScore2024: 670, admissionRanking2024: 640, estimatedRanking2025: 620,
    },
    {
      majorName: '临床医学(八年)', majorCode: '100201K', university: '北京协和医学院', region: '北京', majorCategory: '医学', universityTier: '顶尖医学院', schoolingLength: '8年', tuition: 8000, subjectRequirements: '物理+化学+生物',
      admissionScore2022: 700, admissionRanking2022: 30, admissionScore2023: 702, admissionRanking2023: 25, admissionScore2024: 705, admissionRanking2024: 20, estimatedRanking2025: 18,
    },
     {
        majorName: '应用物理学', majorCode: '070202', university: '中国科学技术大学', region: '安徽', majorCategory: '理学', universityTier: '985', schoolingLength: '4年', tuition: 4800, subjectRequirements: '物理',
        admissionScore2022: 685, admissionRanking2022: 160, admissionScore2023: 688, admissionRanking2023: 150, admissionScore2024: 690, admissionRanking2024: 140, estimatedRanking2025: 135,
    },
     {
        majorName: '城乡规划', majorCode: '082802', university: '华南理工大学', region: '广东', majorCategory: '工学', universityTier: '985', schoolingLength: '5年', tuition: 6860, subjectRequirements: '物理',
        admissionScore2022: 660, admissionRanking2022: 900, admissionScore2023: 662, admissionRanking2023: 850, admissionScore2024: 664, admissionRanking2024: 820, estimatedRanking2025: 800,
    },
     {
        majorName: '行政管理', majorCode: '120402', university: '兰州大学', region: '甘肃', majorCategory: '管理学', universityTier: '985', schoolingLength: '4年', tuition: 4500, subjectRequirements: '不限',
        admissionScore2022: 610, admissionRanking2022: 6000, admissionScore2023: 615, admissionRanking2023: 5500, admissionScore2024: 618, admissionRanking2024: 5300, estimatedRanking2025: 5200,
    },
    // Add ~35 more entries to reach approx 80
     {
        majorName: '日语', majorCode: '050207', university: '大连外国语大学', region: '辽宁', majorCategory: '文学', universityTier: '普通本科', schoolingLength: '4年', tuition: 4800, subjectRequirements: '不限',
        admissionScore2022: 580, admissionRanking2022: 15000, admissionScore2023: 585, admissionRanking2023: 14000, admissionScore2024: 588, admissionRanking2024: 13500, estimatedRanking2025: 13000,
    },
    {
        majorName: '社会学', majorCode: '030301', university: '山东大学', region: '山东', majorCategory: '法学', universityTier: '985', schoolingLength: '4年', tuition: 5000, subjectRequirements: '不限',
        admissionScore2022: 648, admissionRanking2022: 1700, admissionScore2023: 650, admissionRanking2023: 1600, admissionScore2024: 652, admissionRanking2024: 1550, estimatedRanking2025: 1500,
    },
    {
        majorName: '学前教育', majorCode: '040106', university: '南京师范大学', region: '江苏', majorCategory: '教育学', universityTier: '211', schoolingLength: '4年', tuition: 5200, subjectRequirements: '不限',
        admissionScore2022: 630, admissionRanking2022: 3700, admissionScore2023: 633, admissionRanking2023: 3500, admissionScore2024: 635, admissionRanking2024: 3400, estimatedRanking2025: 3350,
    },
     {
        majorName: '水利水电工程', majorCode: '081101', university: '河海大学', region: '江苏', majorCategory: '工学', universityTier: '211', schoolingLength: '4年', tuition: 5800, subjectRequirements: '物理',
        admissionScore2022: 640, admissionRanking2022: 2700, admissionScore2023: 642, admissionRanking2023: 2600, admissionScore2024: 644, admissionRanking2024: 2500, estimatedRanking2025: 2450,
    },
     {
        majorName: '旅游管理', majorCode: '120901K', university: '海南大学', region: '海南', majorCategory: '管理学', universityTier: '211', schoolingLength: '4年', tuition: 4600, subjectRequirements: '不限',
        admissionScore2022: 625, admissionRanking2022: 4000, admissionScore2023: 628, admissionRanking2023: 3800, admissionScore2024: 630, admissionRanking2024: 3700, estimatedRanking2025: 3650,
    },
     {
        majorName: '天文学', majorCode: '070401', university: '南京大学', region: '江苏', majorCategory: '理学', universityTier: '985', schoolingLength: '4年', tuition: 5200, subjectRequirements: '物理',
        admissionScore2022: 675, admissionRanking2022: 330, admissionScore2023: 677, admissionRanking2023: 310, admissionScore2024: 679, admissionRanking2024: 300, estimatedRanking2025: 290,
    },
     {
        majorName: '市场营销', majorCode: '120202', university: '暨南大学', region: '广东', majorCategory: '管理学', universityTier: '211', schoolingLength: '4年', tuition: 4800, subjectRequirements: '不限',
        admissionScore2022: 645, admissionRanking2022: 2100, admissionScore2023: 647, admissionRanking2023: 2000, admissionScore2024: 649, admissionRanking2024: 1950, estimatedRanking2025: 1900,
    },
    {
        majorName: '海洋科学', majorCode: '070701', university: '中国海洋大学', region: '山东', majorCategory: '理学', universityTier: '985', schoolingLength: '4年', tuition: 5000, subjectRequirements: '物理/化学/生物任选一',
        admissionScore2022: 638, admissionRanking2022: 2800, admissionScore2023: 640, admissionRanking2023: 2700, admissionScore2024: 642, admissionRanking2024: 2650, estimatedRanking2025: 2600,
    },
     {
        majorName: '小学教育', majorCode: '040107', university: '陕西师范大学', region: '陕西', majorCategory: '教育学', universityTier: '211', schoolingLength: '4年', tuition: 4600, subjectRequirements: '不限',
        admissionScore2022: 635, admissionRanking2022: 3100, admissionScore2023: 637, admissionRanking2023: 2900, admissionScore2024: 639, admissionRanking2024: 2800, estimatedRanking2025: 2750,
    },
    {
      majorName: '视觉传达设计', majorCode: '130502', university: '中国美术学院', region: '浙江', majorCategory: '艺术学', universityTier: '艺术类', schoolingLength: '4年', tuition: 18000, subjectRequirements: '不限(艺术)',
      admissionScore2022: null, admissionRanking2022: null,
      admissionScore2023: null, admissionRanking2023: null,
      admissionScore2024: null, admissionRanking2024: null, estimatedRanking2025: null,
    },
    {
      majorName: '舞蹈学', majorCode: '130205', university: '北京舞蹈学院', region: '北京', majorCategory: '艺术学', universityTier: '艺术类', schoolingLength: '4年', tuition: 10000, subjectRequirements: '不限(艺术)',
      admissionScore2022: null, admissionRanking2022: null,
      admissionScore2023: null, admissionRanking2023: null,
      admissionScore2024: null, admissionRanking2024: null, estimatedRanking2025: null,
    },
    {
      majorName: '体育教育', majorCode: '040201', university: '北京体育大学', region: '北京', majorCategory: '教育学', universityTier: '211', schoolingLength: '4年', tuition: 5500, subjectRequirements: '不限(体育)',
      admissionScore2022: 590, admissionRanking2022: 12000, // Sports scores might be lower
      admissionScore2023: 595, admissionRanking2023: 11000,
      admissionScore2024: 598, admissionRanking2024: 10500, estimatedRanking2025: 10000,
    },
    {
      majorName: '应用化学', majorCode: '070302', university: '郑州大学', region: '河南', majorCategory: '理学', universityTier: '211', schoolingLength: '4年', tuition: 4800, subjectRequirements: '化学',
      admissionScore2022: 620, admissionRanking2022: 5100, admissionScore2023: 623, admissionRanking2023: 4900, admissionScore2024: 625, admissionRanking2024: 4800, estimatedRanking2025: 4700,
    },
    {
      majorName: '信息安全', majorCode: '080904K', university: '杭州电子科技大学', region: '浙江', majorCategory: '工学', universityTier: '普通本科', schoolingLength: '4年', tuition: 6325, subjectRequirements: '物理',
      admissionScore2022: 640, admissionRanking2022: 2550, admissionScore2023: 643, admissionRanking2023: 2450, admissionScore2024: 645, admissionRanking2024: 2350, estimatedRanking2025: 2300,
    },
     {
      majorName: '数字媒体技术', majorCode: '080906', university: '浙江工业大学', region: '浙江', majorCategory: '工学', universityTier: '普通本科', schoolingLength: '4年', tuition: 6325, subjectRequirements: '物理/技术均可',
      admissionScore2022: 630, admissionRanking2022: 3550, admissionScore2023: 633, admissionRanking2023: 3350, admissionScore2024: 635, admissionRanking2024: 3250, estimatedRanking2025: 3200,
    },
     {
        majorName: '俄语', majorCode: '050202', university: '黑龙江大学', region: '黑龙江', majorCategory: '文学', universityTier: '普通本科', schoolingLength: '4年', tuition: 4500, subjectRequirements: '不限',
        admissionScore2022: 570, admissionRanking2022: 18000, admissionScore2023: 575, admissionRanking2023: 17000, admissionScore2024: 578, admissionRanking2024: 16500, estimatedRanking2025: 16000,
    },
    {
        majorName: '测绘工程', majorCode: '081201', university: '武汉大学', region: '湖北', majorCategory: '工学', universityTier: '985', schoolingLength: '4年', tuition: 5800, subjectRequirements: '物理',
        admissionScore2022: 655, admissionRanking2022: 1300, admissionScore2023: 657, admissionRanking2023: 1200, admissionScore2024: 659, admissionRanking2024: 1150, estimatedRanking2025: 1100,
    },
    {
        majorName: '人力资源管理', majorCode: '120206', university: '西南财经大学', region: '四川', majorCategory: '管理学', universityTier: '211', schoolingLength: '4年', tuition: 4900, subjectRequirements: '不限',
        admissionScore2022: 650, admissionRanking2022: 1650, admissionScore2023: 652, admissionRanking2023: 1550, admissionScore2024: 654, admissionRanking2024: 1500, estimatedRanking2025: 1450,
    },
    {
        majorName: '广播电视学', majorCode: '050302', university: '中国传媒大学', region: '北京', majorCategory: '文学', universityTier: '211', schoolingLength: '4年', tuition: 10000, subjectRequirements: '不限',
        admissionScore2022: 665, admissionRanking2022: 730, admissionScore2023: 667, admissionRanking2023: 690, admissionScore2024: 669, admissionRanking2024: 670, estimatedRanking2025: 650,
    },
     {
        majorName: '风景园林', majorCode: '082803', university: '北京林业大学', region: '北京', majorCategory: '工学', universityTier: '211', schoolingLength: '4年', tuition: 6000, subjectRequirements: '物理/历史均可', // Often requires art test too
        admissionScore2022: 640, admissionRanking2022: 2650, admissionScore2023: 642, admissionRanking2023: 2550, admissionScore2024: 644, admissionRanking2024: 2450, estimatedRanking2025: 2400,
    },
     {
        majorName: '物流管理', majorCode: '120601', university: '重庆大学', region: '重庆', majorCategory: '管理学', universityTier: '985', schoolingLength: '4年', tuition: 4600, subjectRequirements: '不限',
        admissionScore2022: 635, admissionRanking2022: 3200, admissionScore2023: 638, admissionRanking2023: 3000, admissionScore2024: 640, admissionRanking2024: 2900, estimatedRanking2025: 2850,
    },
     {
        majorName: '预防医学', majorCode: '100401K', university: '华中科技大学同济医学院', region: '湖北', majorCategory: '医学', universityTier: '985', schoolingLength: '5年', tuition: 5800, subjectRequirements: '物理+化学+生物',
        admissionScore2022: 660, admissionRanking2022: 950, admissionScore2023: 663, admissionRanking2023: 900, admissionScore2024: 665, admissionRanking2024: 880, estimatedRanking2025: 870,
    },
     {
        majorName: '地质学', majorCode: '070901', university: '中国地质大学(北京)', region: '北京', majorCategory: '理学', universityTier: '211', schoolingLength: '4年', tuition: 5000, subjectRequirements: '物理+化学/地理',
        admissionScore2022: 625, admissionRanking2022: 4100, admissionScore2023: 628, admissionRanking2023: 3900, admissionScore2024: 630, admissionRanking2024: 3800, estimatedRanking2025: 3750,
    },
     {
        majorName: '电子商务', majorCode: '120801', university: '宁波大学', region: '浙江', majorCategory: '管理学', universityTier: '双一流', schoolingLength: '4年', tuition: 5500, subjectRequirements: '不限',
        admissionScore2022: 630, admissionRanking2022: 3650, admissionScore2023: 632, admissionRanking2023: 3450, admissionScore2024: 634, admissionRanking2024: 3350, estimatedRanking2025: 3300,
    },
     {
        majorName: '精算学', majorCode: '020305T', university: '中央财经大学', region: '北京', majorCategory: '经济学', universityTier: '211', schoolingLength: '4年', tuition: 5500, subjectRequirements: '物理',
        admissionScore2022: 678, admissionRanking2022: 260, admissionScore2023: 680, admissionRanking2023: 240, admissionScore2024: 682, admissionRanking2024: 230, estimatedRanking2025: 220,
    },
    {
        majorName: '能源与动力工程', majorCode: '080501', university: '华北电力大学', region: '北京', majorCategory: '工学', universityTier: '211', schoolingLength: '4年', tuition: 5500, subjectRequirements: '物理',
        admissionScore2022: 642, admissionRanking2022: 2400, admissionScore2023: 645, admissionRanking2023: 2200, admissionScore2024: 647, admissionRanking2024: 2100, estimatedRanking2025: 2050,
    },
    {
        majorName: '遥感科学与技术', majorCode: '081202', university: '武汉大学', region: '湖北', majorCategory: '工学', universityTier: '985', schoolingLength: '4年', tuition: 5800, subjectRequirements: '物理',
        admissionScore2022: 660, admissionRanking2022: 910, admissionScore2023: 662, admissionRanking2023: 860, admissionScore2024: 664, admissionRanking2024: 830, estimatedRanking2025: 810,
    },
    {
        majorName: '西班牙语', majorCode: '050205', university: '上海外国语大学', region: '上海', majorCategory: '文学', universityTier: '211', schoolingLength: '4年', tuition: 5000, subjectRequirements: '不限',
        admissionScore2022: 655, admissionRanking2022: 1280, admissionScore2023: 658, admissionRanking2023: 1180, admissionScore2024: 660, admissionRanking2024: 1120, estimatedRanking2025: 1100,
    },
    {
        majorName: '物联网工程', majorCode: '080905', university: '江南大学', region: '江苏', majorCategory: '工学', universityTier: '211', schoolingLength: '4年', tuition: 5200, subjectRequirements: '物理',
        admissionScore2022: 640, admissionRanking2022: 2750, admissionScore2023: 643, admissionRanking2023: 2650, admissionScore2024: 645, admissionRanking2024: 2550, estimatedRanking2025: 2500,
    },
     {
        majorName: '微电子科学与工程', majorCode: '080704', university: '电子科技大学', region: '四川', majorCategory: '工学', universityTier: '985', schoolingLength: '4年', tuition: 4900, subjectRequirements: '物理',
        admissionScore2022: 675, admissionRanking2022: 340, admissionScore2023: 678, admissionRanking2023: 320, admissionScore2024: 680, admissionRanking2024: 300, estimatedRanking2025: 290,
    },
    // Add more to reach 80
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


