export type Language = 'vi' | 'en' | 'zh' | 'ja' | 'es';

export interface Translation {
  // Header
  appName: string;
  appTagline: string;
  createYourCV: string;
  viewSamples: string;
  editInfo: string;
  
  // Auth & Navigation
  login: string;
  logout: string;
  tutorial: string;
  welcome: string;
  
  // Login Dialog
  loginTitle: string;
  loginSubtitle: string;
  loginWithGoogle: string;
  loginWithApple: string;
  loginWithEmail: string;
  continueAsGuest: string;
  usernameLabel: string;
  usernamePlaceholder: string;
  orDivider: string;
  emailLabel: string;
  passwordLabel: string;
  loginEmailPlaceholder: string;
  passwordPlaceholder: string;
  loginButton: string;
  forgotPassword: string;
  noAccount: string;
  signUp: string;
  alreadyHaveAccount: string;
  signUpTitle: string;
  signUpSubtitle: string;
  fullNameLabel: string;
  confirmPassword: string;
  signUpButton: string;
  privacyPolicy: string;
  termsOfService: string;
  agreeToTerms: string;
  bySigningUp: string;
  and: string;
  guestRestrictionMessage: string;
  fillAllFields: string;
  success: string;
  
  // Tutorial Dialog
  tutorialTitle: string;
  tutorialStep1Title: string;
  tutorialStep1Desc: string;
  tutorialStep2Title: string;
  tutorialStep2Desc: string;
  tutorialStep3Title: string;
  tutorialStep3Desc: string;
  tutorialStep4Title: string;
  tutorialStep4Desc: string;
  tutorialStep5Title: string;
  tutorialStep5Desc: string;
  nextStep: string;
  prevStep: string;
  getStarted: string;
  closeTutorial: string;
  
  // Progress
  stepOne: string;
  stepTwo: string;
  
  // Demo Banner
  viewingDemo: string;
  selectAndDownload: string;
  
  // Form Sections
  personalInfo: string;
  socialPlatform: string;
  careerObjective: string;
  workExperience: string;
  education: string;
  skills: string;
  languages: string;
  certifications: string;
  customSections: string;
  
  // Custom Sections
  customSectionTitle: string;
  customSectionContent: string;
  addCustomSection: string;
  sectionTitlePlaceholder: string;
  sectionContentPlaceholder: string;
  
  // Personal Info Fields
  photo: string;
  uploadPhoto: string;
  removePhoto: string;
  uploadPhotoHint: string;
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  website: string;
  facebook: string;
  zalo: string;
  platformLabel: string;
  
  // QR Code Settings
  qrCodeSettings: string;
  showLinkedinQR: string;
  showLinkedinQRHint: string;
  showPortfolioQR: string;
  showPortfolioQRHint: string;
  
  // Form Placeholders
  fullNamePlaceholder: string;
  jobTitlePlaceholder: string;
  emailPlaceholder: string;
  phonePlaceholder: string;
  addressPlaceholder: string;
  linkedinPlaceholder: string;
  websitePlaceholder: string;
  facebookPlaceholder: string;
  zaloPlaceholder: string;
  careerObjectivePlaceholder: string;
  
  // Work Experience
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: string;
  responsibilities: string;
  jobNumber: string;
  responsibilitiesPlaceholder: string;
  
  // Education
  degree: string;
  school: string;
  startYear: string;
  endYear: string;
  details: string;
  degreeNumber: string;
  degreePlaceholder: string;
  schoolPlaceholder: string;
  detailsPlaceholder: string;
  
  // Skills
  technicalSkills: string;
  softSkills: string;
  technicalSkillsPlaceholder: string;
  softSkillsPlaceholder: string;
  
  // Languages
  languageName: string;
  languageLevel: string;
  languageNamePlaceholder: string;
  languageLevelPlaceholder: string;
  
  // Certifications
  certificationPlaceholder: string;
  
  // Buttons
  add: string;
  viewTemplates: string;
  downloadPDF: string;
  downloading: string;
  
  // Template Selector
  chooseTemplate: string;
  chooseTemplateDesc: string;
  selectTemplatePrompt: string;
  
  // Templates
  modernBlue: string;
  professionalPurple: string;
  creativeOrange: string;
  minimalistGreen: string;
  internationalCyan: string;
  elegantViolet: string;
  horizontalRed: string;
  executiveTeal: string;
  creativeIndigo: string;
  darkProfessional: string;
  darkCreative: string;
  darkElegant: string;
  
  // Template Customization
  customizeColors: string;
  primaryColor: string;
  resetColors: string;
  previewFullscreen: string;
  closePreview: string;
  downloadPNG: string;
  
  // Pro Features
  proFeature: string;
  upgradeToUnlock: string;
  upgradePro: string;
  
  // Premium Features
  premium: string;
  premiumActive: string;
  premiumDaysRemaining: string;
  premiumTitle: string;
  premiumSubtitle: string;
  premiumFeaturesTitle: string;
  premiumFeatureTemplates: string;
  premiumFeatureCustomSections: string;
  premiumFeaturePNG: string;
  premiumFeatureFullscreen: string;
  premiumFeatureCustomizeColors: string;
  premiumChoosePlan: string;
  premiumWeek: string;
  premiumMonth: string;
  premiumYear: string;
  premiumSelect: string;
  premiumUpgradeSuccess: string;
  
  // Toast Messages
  selectTemplateError: string;
  creatingPDF: string;
  downloadSuccess: string;
  downloadError: string;
  downloadingPNG: string;
  pngDownloadSuccess: string;
  
  // Save/Load
  saveCV: string;
  loadCV: string;
  savedSuccessfully: string;
  loadedSuccessfully: string;
  autoSaved: string;
  invalidFile: string;
  
  // Share
  share: string;
  shareOn: string;
  copyLink: string;
  linkCopied: string;
  
  // Analytics
  shareAnalytics: string;
  shareAnalyticsDesc: string;
  totalShares: string;
  sharesAcrossPlatforms: string;
  platforms: string;
  noShareDataYet: string;
  overview: string;
  charts: string;
  sharesByPlatform: string;
  barChartDesc: string;
  platformDistribution: string;
  pieChartDesc: string;
  clearAnalytics: string;
  confirmClearAnalytics: string;
  analyticsClearedSuccess: string;
  topPlatform: string;
  shares: string;
  viewAnalytics: string;
  close: string;
  
  // Time-based Analytics
  timeRangeToday: string;
  timeRangeWeek: string;
  timeRangeMonth: string;
  timeRangeAll: string;
  comparison: string;
  vsPrevious: string;
  previousPeriod: string;
  trends: string;
  sharesTrend: string;
  sharesTrendDesc: string;
  noTrendData: string;
  platformTrends: string;
  platformTrendsDesc: string;
  peakPerformance: string;
  peakPerformanceDesc: string;
  noPeakData: string;
  bestDay: string;
  
  // Footer
  footerText: string;
  
  // Required field
  required: string;
  
  // CV Template Section Headers
  profile: string;
  contact: string;
  present: string;
}

export const translations: Record<Language, Translation> = {
  vi: {
    appName: "CV Maker Pro",
    appTagline: "Tạo CV chuyên nghiệp trong vài phút",
    createYourCV: "Tạo CV của bạn",
    viewSamples: "Xem mẫu CV",
    editInfo: "Chỉnh sửa thông tin",
    
    login: "Đăng nhập",
    logout: "Đăng xuất",
    tutorial: "Hướng dẫn",
    welcome: "Xin chào",
    
    loginTitle: "Đăng nhập vào CV Maker Pro",
    loginSubtitle: "Lưu và quản lý CV của bạn dễ dàng hơn",
    loginWithGoogle: "Đăng nhập với Google",
    loginWithApple: "Đăng nhập với Apple",
    loginWithEmail: "Đăng nhập bằng Email",
    continueAsGuest: "Tiếp tục với tư cách khách",
    usernameLabel: "Tên đăng nhập",
    usernamePlaceholder: "Nhập tên đăng nhập",
    orDivider: "Hoặc",
    emailLabel: "Email",
    passwordLabel: "Mật khẩu",
    loginEmailPlaceholder: "name@example.com",
    passwordPlaceholder: "Nhập mật khẩu",
    loginButton: "Đăng nhập",
    forgotPassword: "Quên mật khẩu?",
    noAccount: "Chưa có tài khoản?",
    signUp: "Đăng ký ngay",
    alreadyHaveAccount: "Đã có tài khoản?",
    signUpTitle: "Tạo tài khoản mới",
    signUpSubtitle: "Bắt đầu tạo CV chuyên nghiệp của bạn",
    fullNameLabel: "Họ và tên",
    confirmPassword: "Xác nhận mật khẩu",
    signUpButton: "Đăng ký",
    privacyPolicy: "Chính sách bảo mật",
    termsOfService: "Điều khoản dịch vụ",
    agreeToTerms: "Tôi đồng ý với",
    bySigningUp: "Bằng việc đăng ký, bạn đồng ý với",
    and: "và",
    guestRestrictionMessage: "Bạn đang duyệt với tư cách khách. Đăng nhập để truy cập tất cả các mẫu CV và tính năng.",
    fillAllFields: "Vui lòng điền đầy đủ các trường",
    success: "thành công",
    
    tutorialTitle: "Hướng dẫn sử dụng CV Maker Pro",
    tutorialStep1Title: "📝 Bước 1: Nhập thông tin cá nhân",
    tutorialStep1Desc: "Điền đầy đủ thông tin cá nhân, kinh nghiệm làm việc, học vấn và kỹ năng của bạn. Bạn có thể tải ảnh đại diện lên để CV trông chuyên nghiệp hơn.",
    tutorialStep2Title: "🎨 Bước 2: Chọn mẫu CV yêu thích",
    tutorialStep2Desc: "Xem trước và chọn từ 9 mẫu CV đẹp mắt, bao gồm 3 mẫu ngang độc đáo (phần trên ảnh & thông tin, phần dưới chi tiết) rất tiện lợi cho nhà tuyển dụng!",
    tutorialStep3Title: "📥 Bước 3: Tải xuống CV dạng PDF",
    tutorialStep3Desc: "Sau khi chọn mẫu, nhấn nút 'Tải xuống PDF' để xuất CV của bạn. File PDF có thể in ra hoặc gửi trực tiếp cho nhà tuyển dụng.",
    tutorialStep4Title: "💾 Bước 4: Lưu và tải lại dữ liệu",
    tutorialStep4Desc: "Sử dụng tính năng 'Lưu CV' để xuất dữ liệu thành file JSON. Bạn có thể 'Tải CV' lên để tiếp tục chỉnh sửa sau này.",
    tutorialStep5Title: "✨ Bước 4: Tùy chỉnh nâng cao",
    tutorialStep5Desc: "Thêm các mục tùy chọn như Người tham vấn, Hoạt động xã hội, Giải thưởng. Tùy chỉnh tên mạng xã hội và chuyển đổi giữa 5 ngôn ngữ!",
    nextStep: "Tiếp theo",
    prevStep: "Quay lại",
    getStarted: "Bắt đầu ngay",
    closeTutorial: "Đóng",
    
    stepOne: "Nhập thông tin",
    stepTwo: "Chọn mẫu & Tải xuống",
    
    viewingDemo: "Đang xem mẫu CV demo - Chọn mẫu và tải xuống để trải nghiệm!",
    selectAndDownload: "Chọn mẫu và tải xuống để trải nghiệm!",
    
    personalInfo: "Thông tin cá nhân",
    socialPlatform: "Nền tảng xã hội",
    careerObjective: "Mục tiêu nghề nghiệp",
    workExperience: "Kinh nghiệm làm việc",
    education: "Học vấn",
    skills: "Kỹ năng",
    languages: "Ngôn ngữ",
    certifications: "Chứng chỉ",
    customSections: "Tùy chọn",
    
    customSectionTitle: "Tiêu đề mục",
    customSectionContent: "Nội dung",
    addCustomSection: "Thêm mục tùy chọn",
    sectionTitlePlaceholder: "VD: Người tham vấn, Hoạt động xã hội, Giải thưởng...",
    sectionContentPlaceholder: "Nhập nội dung cho mục này...",
    
    photo: "Ảnh đại diện",
    uploadPhoto: "Tải ảnh lên",
    removePhoto: "Xóa ảnh",
    uploadPhotoHint: "Định dạng: JPG, PNG. Kích thước tối đa: 5MB",
    fullName: "Họ và tên",
    jobTitle: "Vị trí ứng tuyển",
    email: "Email",
    phone: "Số điện thoại",
    address: "Địa chỉ",
    linkedin: "LinkedIn",
    website: "Website",
    facebook: "Facebook",
    zalo: "Gmail",
    platformLabel: "Tên nền tảng",
    
    qrCodeSettings: "Cài đặt QR Code",
    showLinkedinQR: "Hiển thị QR Code LinkedIn",
    showLinkedinQRHint: "Nhà tuyển dụng có thể quét để xem LinkedIn của bạn",
    showPortfolioQR: "Hiển thị QR Code Portfolio/Website",
    showPortfolioQRHint: "Nhà tuyển dụng có thể quét để xem portfolio/website của bạn",
    
    fullNamePlaceholder: "Nguyễn Văn An",
    jobTitlePlaceholder: "Full Stack Developer",
    emailPlaceholder: "email@example.com",
    phonePlaceholder: "+84 123 456 789",
    addressPlaceholder: "Hà Nội, Việt Nam",
    linkedinPlaceholder: "linkedin.com/in/username",
    websitePlaceholder: "yourwebsite.com",
    facebookPlaceholder: "facebook.com/username",
    zaloPlaceholder: "yourname@gmail.com",
    careerObjectivePlaceholder: "Mô tả ngắn gọn về bản thân, kinh nghiệm và mục tiêu nghề nghiệp của bạn...",
    
    position: "Vị trí",
    company: "Công ty",
    location: "Địa điểm",
    startDate: "Ngày bắt đầu",
    endDate: "Ngày kết thúc",
    current: "Hiện tại",
    responsibilities: "Mô tả công việc",
    jobNumber: "Công việc",
    responsibilitiesPlaceholder: "Mô tả các nhiệm vụ, thành tích và trách nhiệm của bạn...",
    
    degree: "Bằng cấp",
    school: "Trường",
    startYear: "Năm bắt đầu",
    endYear: "Năm kết thúc",
    details: "Chi tiết",
    degreeNumber: "Bằng cấp",
    degreePlaceholder: "Kỹ sư Công nghệ Thông tin",
    schoolPlaceholder: "Đại học Bách Khoa",
    detailsPlaceholder: "GPA, học bổng, thành tích...",
    
    technicalSkills: "Kỹ năng chuyên môn",
    softSkills: "Kỹ năng mềm",
    technicalSkillsPlaceholder: "JavaScript, React, Node.js...",
    softSkillsPlaceholder: "Làm việc nhóm, Giao tiếp...",
    
    languageName: "Ngôn ngữ",
    languageLevel: "Trình độ",
    languageNamePlaceholder: "Tiếng Việt, Tiếng Anh...",
    languageLevelPlaceholder: "Bản ngữ, IELTS 7.0...",
    
    certificationPlaceholder: "AWS Certified Developer, PMP...",
    
    add: "Thêm",
    viewTemplates: "Xem mẫu CV",
    downloadPDF: "Tải xuống PDF",
    downloading: "Đang tạo PDF...",
    
    chooseTemplate: "Chọn mẫu CV yêu thích",
    chooseTemplateDesc: "Chọn một trong 12 mẫu CV dưới đây (bao gồm 3 mẫu Dark Mode độc đáo) và tải xuống file PDF",
    selectTemplatePrompt: "* Vui lòng chọn một mẫu CV để tải xuống",
    
    modernBlue: "Modern Blue",
    professionalPurple: "Professional Purple",
    creativeOrange: "Creative Orange",
    minimalistGreen: "Minimalist Green",
    internationalCyan: "International Cyan",
    elegantViolet: "Elegant Violet",
    horizontalRed: "Horizontal Red",
    executiveTeal: "Executive Teal",
    creativeIndigo: "Creative Indigo",
    darkProfessional: "Dark Professional",
    darkCreative: "Dark Creative",
    darkElegant: "Dark Elegant",
    
    customizeColors: "Tùy chỉnh màu sắc",
    primaryColor: "Màu chủ đạo",
    resetColors: "Đặt lại màu",
    previewFullscreen: "Xem toàn màn hình",
    closePreview: "Đóng xem trước",
    downloadPNG: "Tải xuống PNG",
    
    proFeature: "Tính năng Pro",
    upgradeToUnlock: "Nâng cấp để mở khóa",
    upgradePro: "Nâng cấp",
    
    premium: "Premium",
    premiumActive: "Premium Active",
    premiumDaysRemaining: "Còn {days} ngày",
    premiumTitle: "Nâng cấp Premium",
    premiumSubtitle: "Mở khóa tất cả tính năng cao cấp",
    premiumFeaturesTitle: "Tính năng Premium:",
    premiumFeatureTemplates: "Tất cả 12 mẫu CV",
    premiumFeatureCustomSections: "Thêm phần tùy chỉnh",
    premiumFeaturePNG: "Tải xuống PNG",
    premiumFeatureFullscreen: "Xem trước toàn màn hình",
    premiumFeatureCustomizeColors: "Tùy chỉnh màu sắc",
    premiumChoosePlan: "Chọn gói:",
    premiumWeek: "Tuần",
    premiumMonth: "Tháng",
    premiumYear: "Năm",
    premiumSelect: "Chọn",
    premiumUpgradeSuccess: "Nâng cấp Premium thành công!",
    
    selectTemplateError: "Vui lòng chọn một mẫu CV",
    creatingPDF: "Đang tạo file PDF...",
    downloadSuccess: "Tải xuống thành công!",
    downloadError: "Có lỗi xảy ra khi tạo PDF",
    downloadingPNG: "Đang tạo file PNG...",
    pngDownloadSuccess: "Tải xuống PNG thành công!",
    
    saveCV: "Lưu CV",
    loadCV: "Tải CV",
    savedSuccessfully: "Đã lưu CV thành công!",
    loadedSuccessfully: "Đã tải CV thành công!",
    autoSaved: "Đã tự động lưu",
    invalidFile: "File không hợp lệ hoặc dữ liệu bị lỗi",
    
    share: "Chia sẻ",
    shareOn: "Chia sẻ trên",
    copyLink: "Sao chép link",
    linkCopied: "Đã sao chép link!",
    
    shareAnalytics: "Thống kê Chia sẻ",
    shareAnalyticsDesc: "Theo dõi hiệu suất chia sẻ trên các nền tảng mạng xã hội",
    totalShares: "Tổng số lượt chia sẻ",
    sharesAcrossPlatforms: "lượt chia sẻ trên",
    platforms: "nền tảng",
    noShareDataYet: "Chưa có dữ liệu chia sẻ. Hãy chia sẻ ứng dụng để bắt đầu theo dõi!",
    overview: "Tổng quan",
    charts: "Biểu đồ",
    sharesByPlatform: "Lượt chia sẻ theo nền tảng",
    barChartDesc: "Biểu đồ cột so sánh",
    platformDistribution: "Phân bố theo nền tảng",
    pieChartDesc: "Biểu đồ tròn tỷ lệ phần trăm",
    clearAnalytics: "Xóa dữ liệu",
    confirmClearAnalytics: "Bạn có chắc muốn xóa toàn bộ dữ liệu analytics?",
    analyticsClearedSuccess: "Đã xóa dữ liệu analytics",
    topPlatform: "Top",
    shares: "Lượt chia sẻ",
    viewAnalytics: "Xem thống kê",
    close: "Đóng",
    
    timeRangeToday: "Hôm nay",
    timeRangeWeek: "7 ngày qua",
    timeRangeMonth: "30 ngày qua",
    timeRangeAll: "Toàn bộ",
    comparison: "So sánh",
    vsPrevious: "so với kỳ trước",
    previousPeriod: "Kỳ trước",
    trends: "Xu hướng",
    sharesTrend: "Xu hướng chia sẻ",
    sharesTrendDesc: "Biểu đồ xu hướng theo thời gian",
    noTrendData: "Không có dữ liệu xu hướng",
    platformTrends: "Xu hướng theo nền tảng",
    platformTrendsDesc: "So sánh xu hướng từng nền tảng",
    peakPerformance: "Hiệu suất đỉnh",
    peakPerformanceDesc: "Ngày có nhiều lượt chia sẻ nhất",
    noPeakData: "Chưa có dữ liệu",
    bestDay: "Ngày tốt nhất",
    
    footerText: "© 2025 CV Maker Pro. Tạo CV chuyên nghiệp, dễ dàng và nhanh chóng.",
    
    required: "*",
    
    profile: "Giới thiệu",
    contact: "Liên hệ",
    present: "Hiện tại",
  },
  
  en: {
    appName: "CV Maker Pro",
    appTagline: "Create professional CV in minutes",
    createYourCV: "Create Your CV",
    viewSamples: "View Sample CVs",
    editInfo: "Edit Information",
    
    login: "Login",
    logout: "Logout",
    tutorial: "Tutorial",
    welcome: "Welcome",
    
    loginTitle: "Login to CV Maker Pro",
    loginSubtitle: "Save and manage your CVs easier",
    loginWithGoogle: "Login with Google",
    loginWithApple: "Login with Apple",
    loginWithEmail: "Login with Email",
    continueAsGuest: "Continue as Guest",
    usernameLabel: "Username",
    usernamePlaceholder: "Enter username",
    orDivider: "Or",
    emailLabel: "Email",
    passwordLabel: "Password",
    loginEmailPlaceholder: "name@example.com",
    passwordPlaceholder: "Enter password",
    loginButton: "Login",
    forgotPassword: "Forgot password?",
    noAccount: "Don't have an account?",
    signUp: "Sign up",
    alreadyHaveAccount: "Already have an account?",
    signUpTitle: "Create New Account",
    signUpSubtitle: "Start creating your professional CV",
    fullNameLabel: "Full Name",
    confirmPassword: "Confirm Password",
    signUpButton: "Sign Up",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    agreeToTerms: "I agree to the",
    bySigningUp: "By signing up, you agree to our",
    and: "and",
    guestRestrictionMessage: "You're currently browsing as a guest. Sign in to access all CV templates and features.",
    fillAllFields: "Please fill all fields",
    success: "successful",
    
    tutorialTitle: "How to Use CV Maker Pro",
    tutorialStep1Title: "📝 Step 1: Enter Personal Information",
    tutorialStep1Desc: "Fill in your personal information, work experience, education, and skills. You can upload a profile photo to make your CV more professional.",
    tutorialStep2Title: "🎨 Step 2: Choose Your Favorite Template",
    tutorialStep2Desc: "Preview and choose from 9 beautiful CV templates, including 3 unique horizontal layouts (top: photo & info, bottom: details) that are very convenient for recruiters!",
    tutorialStep3Title: "📥 Step 3: Download CV as PDF",
    tutorialStep3Desc: "After selecting a template, click 'Download PDF' to export your CV. The PDF file can be printed or sent directly to employers.",
    tutorialStep4Title: "💾 Step 4: Save and Load Data",
    tutorialStep4Desc: "Use 'Save CV' feature to export data as JSON file. You can 'Load CV' to continue editing later.",
    tutorialStep5Title: "✨ Step 4: Advanced Customization",
    tutorialStep5Desc: "Add custom sections like References, Social Activities, Awards. Customize social media labels and switch between 5 languages!",
    nextStep: "Next",
    prevStep: "Back",
    getStarted: "Get Started",
    closeTutorial: "Close",
    
    stepOne: "Enter Information",
    stepTwo: "Choose Template & Download",
    
    viewingDemo: "Viewing demo CV - Choose a template and download to try it out!",
    selectAndDownload: "Choose a template and download to try it out!",
    
    personalInfo: "Personal Information",
    socialPlatform: "Social Platform",
    careerObjective: "Career Objective",
    workExperience: "Work Experience",
    education: "Education",
    skills: "Skills",
    languages: "Languages",
    certifications: "Certifications",
    customSections: "Custom Sections",
    
    customSectionTitle: "Section Title",
    customSectionContent: "Content",
    addCustomSection: "Add Custom Section",
    sectionTitlePlaceholder: "e.g., References, Social Activities, Awards...",
    sectionContentPlaceholder: "Enter content for this section...",
    
    photo: "Profile Photo",
    uploadPhoto: "Upload Photo",
    removePhoto: "Remove Photo",
    uploadPhotoHint: "Format: JPG, PNG. Max size: 5MB",
    fullName: "Full Name",
    jobTitle: "Job Title",
    email: "Email",
    phone: "Phone",
    address: "Address",
    linkedin: "LinkedIn",
    website: "Website",
    facebook: "Facebook",
    zalo: "Gmail",
    platformLabel: "Platform Name",
    
    qrCodeSettings: "QR Code Settings",
    showLinkedinQR: "Show LinkedIn QR Code",
    showLinkedinQRHint: "Recruiters can scan to view your LinkedIn profile",
    showPortfolioQR: "Show Portfolio/Website QR Code",
    showPortfolioQRHint: "Recruiters can scan to view your portfolio/website",
    
    fullNamePlaceholder: "John Smith",
    jobTitlePlaceholder: "Full Stack Developer",
    emailPlaceholder: "email@example.com",
    phonePlaceholder: "+1 234 567 8900",
    addressPlaceholder: "New York, USA",
    linkedinPlaceholder: "linkedin.com/in/username",
    websitePlaceholder: "yourwebsite.com",
    facebookPlaceholder: "facebook.com/username",
    zaloPlaceholder: "yourname@gmail.com",
    careerObjectivePlaceholder: "Brief description of yourself, your experience and career goals...",
    
    position: "Position",
    company: "Company",
    location: "Location",
    startDate: "Start Date",
    endDate: "End Date",
    current: "Current",
    responsibilities: "Responsibilities",
    jobNumber: "Job",
    responsibilitiesPlaceholder: "Describe your tasks, achievements and responsibilities...",
    
    degree: "Degree",
    school: "School",
    startYear: "Start Year",
    endYear: "End Year",
    details: "Details",
    degreeNumber: "Degree",
    degreePlaceholder: "Bachelor of Computer Science",
    schoolPlaceholder: "University of Technology",
    detailsPlaceholder: "GPA, scholarships, achievements...",
    
    technicalSkills: "Technical Skills",
    softSkills: "Soft Skills",
    technicalSkillsPlaceholder: "JavaScript, React, Node.js...",
    softSkillsPlaceholder: "Teamwork, Communication...",
    
    languageName: "Language",
    languageLevel: "Level",
    languageNamePlaceholder: "English, Spanish...",
    languageLevelPlaceholder: "Native, Fluent, TOEFL 100...",
    
    certificationPlaceholder: "AWS Certified Developer, PMP...",
    
    add: "Add",
    viewTemplates: "View Templates",
    downloadPDF: "Download PDF",
    downloading: "Creating PDF...",
    
    chooseTemplate: "Choose Your Favorite Template",
    chooseTemplateDesc: "Choose one of 12 CV templates below (including 3 unique Dark Mode templates) and download as PDF",
    selectTemplatePrompt: "* Please select a CV template to download",
    
    modernBlue: "Modern Blue",
    professionalPurple: "Professional Purple",
    creativeOrange: "Creative Orange",
    minimalistGreen: "Minimalist Green",
    internationalCyan: "International Cyan",
    elegantViolet: "Elegant Violet",
    horizontalRed: "Horizontal Red",
    executiveTeal: "Executive Teal",
    creativeIndigo: "Creative Indigo",
    darkProfessional: "Dark Professional",
    darkCreative: "Dark Creative",
    darkElegant: "Dark Elegant",
    
    customizeColors: "Customize Colors",
    primaryColor: "Primary Color",
    resetColors: "Reset Colors",
    previewFullscreen: "Fullscreen Preview",
    closePreview: "Close Preview",
    downloadPNG: "Download PNG",
    
    proFeature: "Pro Feature",
    upgradeToUnlock: "Upgrade to unlock",
    upgradePro: "Upgrade",
    
    premium: "Premium",
    premiumActive: "Premium Active",
    premiumDaysRemaining: "{days} days remaining",
    premiumTitle: "Upgrade to Premium",
    premiumSubtitle: "Unlock all premium features",
    premiumFeaturesTitle: "Premium Features:",
    premiumFeatureTemplates: "All 12 CV templates",
    premiumFeatureCustomSections: "Add custom sections",
    premiumFeaturePNG: "Download PNG",
    premiumFeatureFullscreen: "Fullscreen preview",
    premiumFeatureCustomizeColors: "Customize colors",
    premiumChoosePlan: "Choose a plan:",
    premiumWeek: "Week",
    premiumMonth: "Month",
    premiumYear: "Year",
    premiumSelect: "Select",
    premiumUpgradeSuccess: "Premium upgrade successful!",
    
    selectTemplateError: "Please select a CV template",
    creatingPDF: "Creating PDF file...",
    downloadSuccess: "Download successful!",
    downloadError: "Error creating PDF",
    downloadingPNG: "Creating PNG file...",
    pngDownloadSuccess: "PNG download successful!",
    
    saveCV: "Save CV",
    loadCV: "Load CV",
    savedSuccessfully: "CV saved successfully!",
    loadedSuccessfully: "CV loaded successfully!",
    autoSaved: "Auto-saved",
    invalidFile: "Invalid file or corrupted data",
    
    share: "Share",
    shareOn: "Share on",
    copyLink: "Copy Link",
    linkCopied: "Link copied!",
    
    shareAnalytics: "Share Analytics",
    shareAnalyticsDesc: "Track sharing performance across social media platforms",
    totalShares: "Total Shares",
    sharesAcrossPlatforms: "shares across",
    platforms: "platforms",
    noShareDataYet: "No sharing data yet. Share the app to start tracking!",
    overview: "Overview",
    charts: "Charts",
    sharesByPlatform: "Shares by Platform",
    barChartDesc: "Comparative bar chart",
    platformDistribution: "Platform Distribution",
    pieChartDesc: "Percentage pie chart",
    clearAnalytics: "Clear Data",
    confirmClearAnalytics: "Are you sure you want to delete all analytics data?",
    analyticsClearedSuccess: "Analytics data cleared",
    topPlatform: "Top",
    shares: "Shares",
    viewAnalytics: "View Analytics",
    close: "Close",
    
    timeRangeToday: "Today",
    timeRangeWeek: "Last 7 days",
    timeRangeMonth: "Last 30 days",
    timeRangeAll: "All time",
    comparison: "Comparison",
    vsPrevious: "vs previous period",
    previousPeriod: "Previous period",
    trends: "Trends",
    sharesTrend: "Share Trends",
    sharesTrendDesc: "Time-based trend chart",
    noTrendData: "No trend data available",
    platformTrends: "Platform Trends",
    platformTrendsDesc: "Compare trends across platforms",
    peakPerformance: "Peak Performance",
    peakPerformanceDesc: "Day with most shares",
    noPeakData: "No peak data yet",
    bestDay: "Best Day",
    
    footerText: "© 2025 CV Maker Pro. Create professional CVs easily and quickly.",
    
    required: "*",
    
    profile: "Professional Summary",
    contact: "Contact",
    present: "Present",
  },
  
  zh: {
    appName: "CV Maker Pro",
    appTagline: "几分钟内创建专业简历",
    createYourCV: "创建简历",
    viewSamples: "查看样本",
    editInfo: "编辑信息",
    
    login: "登录",
    logout: "退出",
    tutorial: "教程",
    welcome: "欢迎",
    
    loginTitle: "登录 CV Maker Pro",
    loginSubtitle: "更轻松地保存和管理您的简历",
    loginWithGoogle: "使用 Google 登录",
    loginWithApple: "使用 Apple 登录",
    loginWithEmail: "使用电子邮件登录",
    continueAsGuest: "以访客身份继续",
    usernameLabel: "用户名",
    usernamePlaceholder: "输入用户名",
    orDivider: "或",
    emailLabel: "电子邮件",
    passwordLabel: "密码",
    loginEmailPlaceholder: "name@example.com",
    passwordPlaceholder: "输入密码",
    loginButton: "登录",
    forgotPassword: "忘记密码？",
    noAccount: "还没有账户？",
    signUp: "注册",
    alreadyHaveAccount: "已有账户？",
    signUpTitle: "创建新账户",
    signUpSubtitle: "开始创建您的专业简历",
    fullNameLabel: "姓名",
    confirmPassword: "确认密码",
    signUpButton: "注册",
    privacyPolicy: "隐私政策",
    termsOfService: "服务条款",
    agreeToTerms: "我同意",
    bySigningUp: "注册即表示您同意我们的",
    and: "和",
    guestRestrictionMessage: "您当前以访客身份浏览。登录以访问所有简历模板和功能。",
    fillAllFields: "请填写所有字段",
    success: "成功",
    
    tutorialTitle: "如何使用 CV Maker Pro",
    tutorialStep1Title: "📝 步骤 1：输入个人信息",
    tutorialStep1Desc: "填写您的个人信息、工作经验、教育背景和技能。您可以上传个人照片以使简历更专业。",
    tutorialStep2Title: "🎨 步骤 2：选择您喜欢的模板",
    tutorialStep2Desc: "预览并从9个精美简历模板中选择，包括3个独特的横向布局（上部：照片和信息，下部：详细内容），非常方便招聘人员查看！",
    tutorialStep3Title: "📥 步骤 3：下载 PDF 格式简历",
    tutorialStep3Desc: "选择模板后，点击「下载 PDF」导出您的简历。PDF 文件可以打印或直接发送给雇主。",
    tutorialStep4Title: "💾 步骤 4：保存和加载数据",
    tutorialStep4Desc: "使用「保存简历」功能将数据导出为 JSON 文件。您可以「加载简历」以便稍后继续编辑。",
    tutorialStep5Title: "✨步骤 4：高级定制",
    tutorialStep5Desc: "添加自定义部分，如推荐人、社会活动、奖项。自定义社交媒体标签并在 5 种语言之间切换！",
    nextStep: "下一步",
    prevStep: "返回",
    getStarted: "开始使用",
    closeTutorial: "关闭",
    
    stepOne: "输入信息",
    stepTwo: "选择模板并下载",
    
    viewingDemo: "正在查看演示简历 - 选择模板并下载试用！",
    selectAndDownload: "选择模板并下载试用！",
    
    personalInfo: "个人信息",
    socialPlatform: "社交平台",
    careerObjective: "职业目标",
    workExperience: "工作经验",
    education: "教育背景",
    skills: "技能",
    languages: "语言能力",
    certifications: "证书",
    customSections: "自定义部分",
    
    customSectionTitle: "部分标题",
    customSectionContent: "内容",
    addCustomSection: "添加自定义部分",
    sectionTitlePlaceholder: "例如：推荐人、社会活动、奖项...",
    sectionContentPlaceholder: "输入此部分的内容...",
    
    photo: "个人照片",
    uploadPhoto: "上传照片",
    removePhoto: "删除照片",
    uploadPhotoHint: "格式：JPG、PNG。最大大小：5MB",
    fullName: "姓名",
    jobTitle: "职位",
    email: "电子邮件",
    phone: "电话",
    address: "地址",
    linkedin: "领英",
    website: "网站",
    facebook: "脸书",
    zalo: "Gmail",
    platformLabel: "平台名称",
    
    qrCodeSettings: "二维码设置",
    showLinkedinQR: "显示领英二维码",
    showLinkedinQRHint: "招聘人员可以扫描查看您的领英资料",
    showPortfolioQR: "显示作品集/网站二维码",
    showPortfolioQRHint: "招聘人员可以扫描查看您的作品集/网站",
    
    fullNamePlaceholder: "张三",
    jobTitlePlaceholder: "全栈开发工程师",
    emailPlaceholder: "email@example.com",
    phonePlaceholder: "+86 138 0000 0000",
    addressPlaceholder: "北京，中国",
    linkedinPlaceholder: "linkedin.com/in/username",
    websitePlaceholder: "yourwebsite.com",
    facebookPlaceholder: "facebook.com/username",
    zaloPlaceholder: "yourname@gmail.com",
    careerObjectivePlaceholder: "简要描述您自己、您的经验和职业目标...",
    
    position: "职位",
    company: "公司",
    location: "地点",
    startDate: "开始日期",
    endDate: "结束日期",
    current: "至今",
    responsibilities: "职责描述",
    jobNumber: "工作",
    responsibilitiesPlaceholder: "描述您的任务、成就和职责...",
    
    degree: "学位",
    school: "学校",
    startYear: "开始年份",
    endYear: "结束年份",
    details: "详细信息",
    degreeNumber: "学位",
    degreePlaceholder: "计算机科学学士",
    schoolPlaceholder: "科技大学",
    detailsPlaceholder: "GPA、奖学金、成就...",
    
    technicalSkills: "技术技能",
    softSkills: "软技能",
    technicalSkillsPlaceholder: "JavaScript、React、Node.js...",
    softSkillsPlaceholder: "团队合作、沟通...",
    
    languageName: "语言",
    languageLevel: "水平",
    languageNamePlaceholder: "中文、英语...",
    languageLevelPlaceholder: "母语、流利、托福100...",
    
    certificationPlaceholder: "AWS认证开发人员、PMP...",
    
    add: "添加",
    viewTemplates: "查看模板",
    downloadPDF: "下载PDF",
    downloading: "正在创建PDF...",
    
    chooseTemplate: "选择您喜欢的模板",
    chooseTemplateDesc: "从以下12个简历模板（包括3个独特的暗黑模式模板）中选择一个并下载为PDF",
    selectTemplatePrompt: "* 请选择一个简历模板以下载",
    
    modernBlue: "现代蓝色",
    professionalPurple: "专业紫色",
    creativeOrange: "创意橙色",
    minimalistGreen: "极简绿色",
    internationalCyan: "国际青色",
    elegantViolet: "优雅紫罗兰",
    horizontalRed: "横向红色",
    executiveTeal: "高管青绿",
    creativeIndigo: "创意靛蓝",
    darkProfessional: "暗黑专业版",
    darkCreative: "暗黑创意版",
    darkElegant: "暗黑优雅版",
    
    customizeColors: "自定义颜色",
    primaryColor: "主色调",
    resetColors: "重置颜色",
    previewFullscreen: "全屏预览",
    closePreview: "关闭预览",
    downloadPNG: "下载 PNG",
    
    proFeature: "专业功能",
    upgradeToUnlock: "升级解锁",
    upgradePro: "升级",
    
    premium: "高级版",
    premiumActive: "高级版已激活",
    premiumDaysRemaining: "剩余 {days} 天",
    premiumTitle: "升级到高级版",
    premiumSubtitle: "解锁所有高级功能",
    premiumFeaturesTitle: "高级功能:",
    premiumFeatureTemplates: "所有 12 个简历模板",
    premiumFeatureCustomSections: "添加自定义部分",
    premiumFeaturePNG: "下载 PNG",
    premiumFeatureFullscreen: "全屏预览",
    premiumFeatureCustomizeColors: "自定义颜色",
    premiumChoosePlan: "选择套餐:",
    premiumWeek: "周",
    premiumMonth: "月",
    premiumYear: "年",
    premiumSelect: "选择",
    premiumUpgradeSuccess: "高级版升级成功！",
    
    selectTemplateError: "请选择一个简历模板",
    creatingPDF: "正在创建PDF文件...",
    downloadSuccess: "下载成功！",
    downloadError: "创建PDF时出错",
    downloadingPNG: "正在创建PNG文件...",
    pngDownloadSuccess: "PNG下载成功！",
    
    saveCV: "保存简历",
    loadCV: "加载简历",
    savedSuccessfully: "简历保存成功！",
    loadedSuccessfully: "简历加载成功！",
    autoSaved: "已自动保存",
    invalidFile: "文件无效或数据损坏",
    
    share: "分享",
    shareOn: "分享到",
    copyLink: "复制链接",
    linkCopied: "已复制链接！",
    
    shareAnalytics: "分享统计",
    shareAnalyticsDesc: "跟踪社交媒体平台的分享表现",
    totalShares: "总分享次数",
    sharesAcrossPlatforms: "次分享，跨越",
    platforms: "个平台",
    noShareDataYet: "暂无分享数据。分享应用以开始跟踪！",
    overview: "概览",
    charts: "图表",
    sharesByPlatform: "按平台分享",
    barChartDesc: "柱状图对比",
    platformDistribution: "平台分布",
    pieChartDesc: "百分比饼图",
    clearAnalytics: "清除数据",
    confirmClearAnalytics: "您确定要删除所有分析数据吗？",
    analyticsClearedSuccess: "已清除分析数据",
    topPlatform: "最高",
    shares: "分享次数",
    viewAnalytics: "查看统计",
    close: "关闭",
    
    timeRangeToday: "今天",
    timeRangeWeek: "过去7天",
    timeRangeMonth: "过去30天",
    timeRangeAll: "全部时间",
    comparison: "比较",
    vsPrevious: "与上期相比",
    previousPeriod: "上一期",
    trends: "趋势",
    sharesTrend: "分享趋势",
    sharesTrendDesc: "基于时间的趋势图",
    noTrendData: "暂无趋势数据",
    platformTrends: "平台趋势",
    platformTrendsDesc: "比较各平台趋势",
    peakPerformance: "峰值表现",
    peakPerformanceDesc: "分享次数最多的一天",
    noPeakData: "暂无峰值数据",
    bestDay: "最佳日期",
    
    footerText: "© 2025 CV Maker Pro。轻松快速地创建专��简历。",
    
    required: "*",
    
    profile: "个人简介",
    contact: "联系方式",
    present: "至今",
  },
  
  ja: {
    appName: "CV Maker Pro",
    appTagline: "数分で専門的な履歴書を作成",
    createYourCV: "履歴書を作成",
    viewSamples: "サンプルを見る",
    editInfo: "情報を編集",
    
    login: "ログイン",
    logout: "ログアウト",
    tutorial: "チュートリアル",
    welcome: "ようこそ",
    
    loginTitle: "CV Maker Pro にログイン",
    loginSubtitle: "履歴書をより簡単に保存・管理",
    loginWithGoogle: "Google でログイン",
    loginWithApple: "Apple でログイン",
    loginWithEmail: "メールでログイン",
    continueAsGuest: "ゲストとして続ける",
    usernameLabel: "ユーザー名",
    usernamePlaceholder: "ユーザー名を入力",
    orDivider: "または",
    emailLabel: "メールアドレス",
    passwordLabel: "パスワード",
    loginEmailPlaceholder: "name@example.com",
    passwordPlaceholder: "パスワードを入力",
    loginButton: "ログイン",
    forgotPassword: "パスワードをお忘れですか？",
    noAccount: "アカウントをお持ちでない方",
    signUp: "新規登録",
    alreadyHaveAccount: "すでにアカウントをお持ちの方",
    signUpTitle: "新規アカウント作成",
    signUpSubtitle: "プロフェッショナルな履歴書作成を始めましょう",
    fullNameLabel: "氏名",
    confirmPassword: "パスワード確認",
    signUpButton: "登録",
    privacyPolicy: "プライバシーポリシー",
    termsOfService: "利用規約",
    agreeToTerms: "同意します",
    bySigningUp: "登録することで、",
    and: "および",
    guestRestrictionMessage: "現在ゲストとして閲覧しています。すべてのCVテンプレートと機能にアクセスするには、サインインしてください。",
    fillAllFields: "すべてのフィールドを入力してください",
    success: "成功",
    
    tutorialTitle: "CV Maker Pro の使い方",
    tutorialStep1Title: "📝 ステップ 1：個人情報の入力",
    tutorialStep1Desc: "個人情報、職務経歴、学歴、スキルを入力します。プロフィール写真をアップロードすると、より専門的な履歴書になります。",
    tutorialStep2Title: "🎨 ステップ 2：お気に入りのテンプレートを選択",
    tutorialStep2Desc: "9つの美しい履歴書テンプレートから選択。上部に写真と情報、下部に詳細を配置した3つのユニークな横型レイアウトを含み、採用担当者に便利です！",
    tutorialStep3Title: "📥 ステップ 3：PDF形式でダウンロード",
    tutorialStep3Desc: "テンプレートを選択した後、「PDFダウンロード」をクリックして履歴書をエクスポート。PDFファイルは印刷または雇用主に直接送信できます。",
    tutorialStep4Title: "💾 ステップ 4：データの保存と読み込み",
    tutorialStep4Desc: "「履歴書を保存」機能を使用してデータをJSONファイルとしてエクスポート。後で編集を続けるために「履歴書を読み込む」ことができます。",
    tutorialStep5Title: "✨ ステップ 4：高度なカスタマイズ",
    tutorialStep5Desc: "推薦者、社会活動、受賞歴などのカスタムセクションを追加。ソーシャルメディアラベルをカスタマイズし、5つの言語を切り替えられます！",
    nextStep: "次へ",
    prevStep: "戻る",
    getStarted: "始める",
    closeTutorial: "閉じる",
    
    stepOne: "情報入力",
    stepTwo: "テンプレート選択とダウンロード",
    
    viewingDemo: "デモ履歴書を表示中 - テンプレートを選択してダウンロードしてお試しください！",
    selectAndDownload: "テンプレートを選択してダウンロードしてお試しください！",
    
    personalInfo: "個人情報",
    socialPlatform: "ソーシャルプラットフォーム",
    careerObjective: "キャリア目標",
    workExperience: "職務経歴",
    education: "学歴",
    skills: "スキル",
    languages: "語学力",
    certifications: "資格",
    customSections: "カスタムセクション",
    
    customSectionTitle: "セクションタイトル",
    customSectionContent: "内容",
    addCustomSection: "カスタムセクションを追加",
    sectionTitlePlaceholder: "例：推薦者、社会活動、受賞歴...",
    sectionContentPlaceholder: "このセクションの内容を入力してください...",
    
    photo: "プロフィール写真",
    uploadPhoto: "写真をアップロード",
    removePhoto: "写真を削除",
    uploadPhotoHint: "形式：JPG、PNG。最大サイズ：5MB",
    fullName: "氏名",
    jobTitle: "職種",
    email: "メールアドレス",
    phone: "電話番号",
    address: "住所",
    linkedin: "LinkedIn",
    website: "ウェブサイト",
    facebook: "Facebook",
    zalo: "Gmail",
    platformLabel: "プラットフォーム名",
    
    qrCodeSettings: "QRコード設定",
    showLinkedinQR: "LinkedIn QRコードを表示",
    showLinkedinQRHint: "採用担当者がスキャンしてLinkedInプロフィールを表示できます",
    showPortfolioQR: "ポートフォリオ/ウェブサイトQRコードを表示",
    showPortfolioQRHint: "採用担当者がスキャンしてポートフォリオ/ウェブサイトを表示できます",
    
    fullNamePlaceholder: "山田太郎",
    jobTitlePlaceholder: "フルスタック開発者",
    emailPlaceholder: "email@example.com",
    phonePlaceholder: "+81 90 1234 5678",
    addressPlaceholder: "東京、日本",
    linkedinPlaceholder: "linkedin.com/in/username",
    websitePlaceholder: "yourwebsite.com",
    facebookPlaceholder: "facebook.com/username",
    zaloPlaceholder: "yourname@gmail.com",
    careerObjectivePlaceholder: "自己紹介、経験、キャリア目標について簡単に説明してください...",
    
    position: "役職",
    company: "会社",
    location: "場所",
    startDate: "開始日",
    endDate: "終了日",
    current: "現在",
    responsibilities: "職務内容",
    jobNumber: "職務",
    responsibilitiesPlaceholder: "担当業務、実績、責任について説明してください...",
    
    degree: "学位",
    school: "学校",
    startYear: "開始年",
    endYear: "終了年",
    details: "詳細",
    degreeNumber: "学位",
    degreePlaceholder: "コンピュータサイエンス学士",
    schoolPlaceholder: "工科大学",
    detailsPlaceholder: "GPA、奨学金、実績...",
    
    technicalSkills: "技術スキル",
    softSkills: "ソフトスキル",
    technicalSkillsPlaceholder: "JavaScript、React、Node.js...",
    softSkillsPlaceholder: "チームワーク、コミュニケーション...",
    
    languageName: "言語",
    languageLevel: "レベル",
    languageNamePlaceholder: "日本語、英語...",
    languageLevelPlaceholder: "母国語、流暢、TOEIC900...",
    
    certificationPlaceholder: "AWS認定デベロッパー、PMP...",
    
    add: "追加",
    viewTemplates: "テンプレートを見る",
    downloadPDF: "PDFをダウンロード",
    downloading: "PDFを作成中...",
    
    chooseTemplate: "お気に入りのテンプレートを選択",
    chooseTemplateDesc: "以下の9つの履歴書テンプレートから1つを選択してPDFとしてダウンロード",
    selectTemplatePrompt: "* ダウンロードする履歴書テンプレートを選択してください",
    
    modernBlue: "モダンブルー",
    professionalPurple: "プロフェッショナルパープル",
    creativeOrange: "クリエイティブオレンジ",
    minimalistGreen: "ミニマリストグリーン",
    internationalCyan: "インターナショナルシアン",
    elegantViolet: "エレガントバイオレット",
    horizontalRed: "ホリゾンタルレッド",
    executiveTeal: "エグゼクティブティール",
    creativeIndigo: "クリエイティブインディゴ",
    darkProfessional: "ダークプロフェッショナル",
    darkCreative: "ダーククリエイティブ",
    darkElegant: "ダークエレガント",
    
    customizeColors: "カラーカスタマイズ",
    primaryColor: "プライマリカラー",
    resetColors: "色をリセット",
    previewFullscreen: "フルスクリーンプレビュー",
    closePreview: "プレビューを閉じる",
    downloadPNG: "PNGダウンロード",
    
    proFeature: "プロ機能",
    upgradeToUnlock: "アップグレードしてロック解除",
    upgradePro: "アップグレード",
    
    premium: "プレミアム",
    premiumActive: "プレミアム有効",
    premiumDaysRemaining: "残り {days} 日",
    premiumTitle: "プレミアムにアップグレード",
    premiumSubtitle: "すべてのプレミアム機能を解除",
    premiumFeaturesTitle: "プレミアム機能:",
    premiumFeatureTemplates: "全12種類の履歴書テンプレート",
    premiumFeatureCustomSections: "カスタムセクションの追加",
    premiumFeaturePNG: "PNGダウンロード",
    premiumFeatureFullscreen: "フルスクリーンプレビュー",
    premiumFeatureCustomizeColors: "色のカスタマイズ",
    premiumChoosePlan: "プランを選択:",
    premiumWeek: "週",
    premiumMonth: "月",
    premiumYear: "年",
    premiumSelect: "選択",
    premiumUpgradeSuccess: "プレミアムアップグレード成功！",
    
    selectTemplateError: "履歴書テンプレートを選択してください",
    creatingPDF: "PDFファイルを作成中...",
    downloadSuccess: "ダウンロード成功！",
    downloadError: "PDF作成中にエラーが発生しました",
    downloadingPNG: "PNGファイルを作成中...",
    pngDownloadSuccess: "PNGダウンロード成功！",
    
    saveCV: "履歴書を保存",
    loadCV: "履歴書を読み込む",
    savedSuccessfully: "履歴書が保存されました！",
    loadedSuccessfully: "履歴書が読み込まれました！",
    autoSaved: "自動保存されました",
    invalidFile: "ファイルが無効またはデータが破損しています",
    
    share: "共有",
    shareOn: "で共有",
    copyLink: "リンクをコピー",
    linkCopied: "リンクをコピーしました！",
    
    shareAnalytics: "シェア統計",
    shareAnalyticsDesc: "ソーシャルメディアプラットフォームでのシェアパフォーマンスを追跡",
    totalShares: "総シェア数",
    sharesAcrossPlatforms: "回のシェア、",
    platforms: "プラットフォーム",
    noShareDataYet: "まだシェアデータがありません。アプリをシェアして追跡を開始しましょう！",
    overview: "概要",
    charts: "グラフ",
    sharesByPlatform: "プラットフォーム別シェア",
    barChartDesc: "棒グラフ比較",
    platformDistribution: "プラットフォーム分布",
    pieChartDesc: "円グラフのパーセンテージ",
    clearAnalytics: "データをクリア",
    confirmClearAnalytics: "すべての分析データを削除してもよろしいですか？",
    analyticsClearedSuccess: "分析データをクリアしました",
    topPlatform: "トップ",
    shares: "シェア数",
    viewAnalytics: "統計を表示",
    close: "閉じる",
    
    timeRangeToday: "今日",
    timeRangeWeek: "過去7日間",
    timeRangeMonth: "過去30日間",
    timeRangeAll: "全期間",
    comparison: "比較",
    vsPrevious: "前期比",
    previousPeriod: "前期",
    trends: "トレンド",
    sharesTrend: "シェアトレンド",
    sharesTrendDesc: "時系列トレンドグラフ",
    noTrendData: "トレンドデータがありません",
    platformTrends: "プラットフォームトレンド",
    platformTrendsDesc: "各プラットフォームのトレンドを比較",
    peakPerformance: "ピークパフォーマンス",
    peakPerformanceDesc: "最も多くシェアされた日",
    noPeakData: "ピークデータがありません",
    bestDay: "ベストデイ",
    
    footerText: "© 2025 CV Maker Pro。簡単かつ迅速に専門的な履歴書を作成。",
    
    required: "*",
    
    profile: "プロフィール",
    contact: "連絡先",
    present: "現在",
  },
  
  es: {
    appName: "CV Maker Pro",
    appTagline: "Crea un CV profesional en minutos",
    createYourCV: "Crear tu CV",
    viewSamples: "Ver Ejemplos",
    editInfo: "Editar Información",
    
    login: "Iniciar sesión",
    logout: "Cerrar sesión",
    tutorial: "Tutorial",
    welcome: "Bienvenido",
    
    loginTitle: "Iniciar sesión en CV Maker Pro",
    loginSubtitle: "Guarda y administra tus CVs más fácilmente",
    loginWithGoogle: "Iniciar sesión con Google",
    loginWithApple: "Iniciar sesión con Apple",
    loginWithEmail: "Iniciar sesión con Email",
    continueAsGuest: "Continuar como Invitado",
    usernameLabel: "Nombre de usuario",
    usernamePlaceholder: "Ingresa nombre de usuario",
    orDivider: "O",
    emailLabel: "Correo electrónico",
    passwordLabel: "Contraseña",
    loginEmailPlaceholder: "nombre@ejemplo.com",
    passwordPlaceholder: "Ingresa contraseña",
    loginButton: "Iniciar sesión",
    forgotPassword: "¿Olvidaste tu contraseña?",
    noAccount: "¿No tienes cuenta?",
    signUp: "Regístrate",
    alreadyHaveAccount: "¿Ya tienes cuenta?",
    signUpTitle: "Crear Nueva Cuenta",
    signUpSubtitle: "Comienza a crear tu CV profesional",
    fullNameLabel: "Nombre Completo",
    confirmPassword: "Confirmar Contraseña",
    signUpButton: "Registrarse",
    privacyPolicy: "Política de Privacidad",
    termsOfService: "Términos de Servicio",
    agreeToTerms: "Acepto los",
    bySigningUp: "Al registrarte, aceptas nuestros",
    and: "y",
    guestRestrictionMessage: "Actualmente estás navegando como invitado. Inicia sesión para acceder a todas las plantillas de CV y funciones.",
    fillAllFields: "Por favor completa todos los campos",
    success: "exitoso",
    
    tutorialTitle: "Cómo usar CV Maker Pro",
    tutorialStep1Title: "📝 Paso 1: Ingresar Información Personal",
    tutorialStep1Desc: "Complete su información personal, experiencia laboral, educación y habilidades. Puede cargar una foto de perfil para hacer su CV más profesional.",
    tutorialStep2Title: "🎨 Paso 2: Elegir tu Plantilla Favorita",
    tutorialStep2Desc: "Previsualiza y elige entre 9 hermosas plantillas de CV, incluyendo 3 diseños horizontales únicos (superior: foto e información, inferior: detalles) ¡muy convenientes para reclutadores!",
    tutorialStep3Title: "📥 Paso 3: Descargar CV como PDF",
    tutorialStep3Desc: "Después de seleccionar una plantilla, haz clic en 'Descargar PDF' para exportar tu CV. El archivo PDF se puede imprimir o enviar directamente a los empleadores.",
    tutorialStep4Title: "💾 Paso 4: Guardar y Cargar Datos",
    tutorialStep4Desc: "Usa la función 'Guardar CV' para exportar datos como archivo JSON. Puedes 'Cargar CV' para continuar editando más tarde.",
    tutorialStep5Title: "✨ Paso 4: Personalización Avanzada",
    tutorialStep5Desc: "Agrega secciones personalizadas como Referencias, Actividades Sociales, Premios. ¡Personaliza etiquetas de redes sociales y cambia entre 5 idiomas!",
    nextStep: "Siguiente",
    prevStep: "Atrás",
    getStarted: "Comenzar",
    closeTutorial: "Cerrar",
    
    stepOne: "Ingresar Información",
    stepTwo: "Elegir Plantilla y Descargar",
    
    viewingDemo: "Viendo CV de demostración - ¡Elige una plantilla y descarga para probarlo!",
    selectAndDownload: "¡Elige una plantilla y descarga para probarlo!",
    
    personalInfo: "Información Personal",
    socialPlatform: "Plataforma Social",
    careerObjective: "Objetivo Profesional",
    workExperience: "Experiencia Laboral",
    education: "Educación",
    skills: "Habilidades",
    languages: "Idiomas",
    certifications: "Certificaciones",
    customSections: "Secciones Personalizadas",
    
    customSectionTitle: "Título de Sección",
    customSectionContent: "Contenido",
    addCustomSection: "Agregar Sección Personalizada",
    sectionTitlePlaceholder: "ej., Referencias, Actividades Sociales, Premios...",
    sectionContentPlaceholder: "Ingrese el contenido para esta sección...",
    
    photo: "Foto de Perfil",
    uploadPhoto: "Subir Foto",
    removePhoto: "Eliminar Foto",
    uploadPhotoHint: "Formato: JPG, PNG. Tamaño máximo: 5MB",
    fullName: "Nombre Completo",
    jobTitle: "Título del Trabajo",
    email: "Correo Electrónico",
    phone: "Teléfono",
    address: "Dirección",
    linkedin: "LinkedIn",
    website: "Sitio Web",
    facebook: "Facebook",
    zalo: "Gmail",
    platformLabel: "Nombre de la Plataforma",
    
    qrCodeSettings: "Configuración de Códigos QR",
    showLinkedinQR: "Mostrar Código QR de LinkedIn",
    showLinkedinQRHint: "Los reclutadores pueden escanear para ver tu perfil de LinkedIn",
    showPortfolioQR: "Mostrar Código QR de Portafolio/Sitio Web",
    showPortfolioQRHint: "Los reclutadores pueden escanear para ver tu portafolio/sitio web",
    
    fullNamePlaceholder: "Juan García",
    jobTitlePlaceholder: "Desarrollador Full Stack",
    emailPlaceholder: "email@example.com",
    phonePlaceholder: "+34 612 345 678",
    addressPlaceholder: "Madrid, España",
    linkedinPlaceholder: "linkedin.com/in/username",
    websitePlaceholder: "tusitio.com",
    facebookPlaceholder: "facebook.com/username",
    zaloPlaceholder: "yourname@gmail.com",
    careerObjectivePlaceholder: "Breve descripción sobre ti, tu experiencia y objetivos profesionales...",
    
    position: "Puesto",
    company: "Empresa",
    location: "Ubicación",
    startDate: "Fecha de Inicio",
    endDate: "Fecha de Fin",
    current: "Actual",
    responsibilities: "Responsabilidades",
    jobNumber: "Trabajo",
    responsibilitiesPlaceholder: "Describe tus tareas, logros y responsabilidades...",
    
    degree: "Título",
    school: "Institución",
    startYear: "Año de Inicio",
    endYear: "Año de Fin",
    details: "Detalles",
    degreeNumber: "Título",
    degreePlaceholder: "Licenciatura en Informática",
    schoolPlaceholder: "Universidad de Tecnología",
    detailsPlaceholder: "Promedio, becas, logros...",
    
    technicalSkills: "Habilidades Técnicas",
    softSkills: "Habilidades Blandas",
    technicalSkillsPlaceholder: "JavaScript, React, Node.js...",
    softSkillsPlaceholder: "Trabajo en equipo, Comunicación...",
    
    languageName: "Idioma",
    languageLevel: "Nivel",
    languageNamePlaceholder: "Español, Inglés...",
    languageLevelPlaceholder: "Nativo, Fluido, TOEFL 100...",
    
    certificationPlaceholder: "Desarrollador Certificado AWS, PMP...",
    
    add: "Agregar",
    viewTemplates: "Ver Plantillas",
    downloadPDF: "Descargar PDF",
    downloading: "Creando PDF...",
    
    chooseTemplate: "Elige tu Plantilla Favorita",
    chooseTemplateDesc: "Elige una de las 9 plantillas de CV a continuación y descarga como PDF",
    selectTemplatePrompt: "* Por favor, selecciona una plantilla de CV para descargar",
    
    modernBlue: "Azul Moderno",
    professionalPurple: "Púrpura Profesional",
    creativeOrange: "Naranja Creativo",
    minimalistGreen: "Verde Minimalista",
    internationalCyan: "Cian Internacional",
    elegantViolet: "Violeta Elegante",
    horizontalRed: "Rojo Horizontal",
    executiveTeal: "Verde Azulado Ejecutivo",
    creativeIndigo: "Índigo Creativo",
    darkProfessional: "Oscuro Profesional",
    darkCreative: "Oscuro Creativo",
    darkElegant: "Oscuro Elegante",
    
    customizeColors: "Personalizar Colores",
    primaryColor: "Color Principal",
    resetColors: "Restablecer Colores",
    previewFullscreen: "Vista Previa Completa",
    closePreview: "Cerrar Vista Previa",
    downloadPNG: "Descargar PNG",
    
    proFeature: "Función Pro",
    upgradeToUnlock: "Actualizar para desbloquear",
    upgradePro: "Actualizar",
    
    premium: "Premium",
    premiumActive: "Premium Activo",
    premiumDaysRemaining: "{days} días restantes",
    premiumTitle: "Actualizar a Premium",
    premiumSubtitle: "Desbloquea todas las funciones premium",
    premiumFeaturesTitle: "Funciones Premium:",
    premiumFeatureTemplates: "Las 12 plantillas de CV",
    premiumFeatureCustomSections: "Agregar secciones personalizadas",
    premiumFeaturePNG: "Descargar PNG",
    premiumFeatureFullscreen: "Vista previa en pantalla completa",
    premiumFeatureCustomizeColors: "Personalizar colores",
    premiumChoosePlan: "Elige un plan:",
    premiumWeek: "Semana",
    premiumMonth: "Mes",
    premiumYear: "Año",
    premiumSelect: "Seleccionar",
    premiumUpgradeSuccess: "¡Actualización a Premium exitosa!",
    
    selectTemplateError: "Por favor, selecciona una plantilla de CV",
    creatingPDF: "Creando archivo PDF...",
    downloadSuccess: "¡Descarga exitosa!",
    downloadError: "Error al crear PDF",
    downloadingPNG: "Creando archivo PNG...",
    pngDownloadSuccess: "¡Descarga PNG exitosa!",
    
    saveCV: "Guardar CV",
    loadCV: "Cargar CV",
    savedSuccessfully: "¡CV guardado exitosamente!",
    loadedSuccessfully: "¡CV cargado exitosamente!",
    autoSaved: "Guardado automáticamente",
    invalidFile: "Archivo inválido o datos corruptos",
    
    share: "Compartir",
    shareOn: "Compartir en",
    copyLink: "Copiar enlace",
    linkCopied: "¡Enlace copiado!",
    
    shareAnalytics: "Estadísticas de Compartir",
    shareAnalyticsDesc: "Seguimiento del rendimiento de compartir en plataformas de redes sociales",
    totalShares: "Total de Compartidos",
    sharesAcrossPlatforms: "compartidos en",
    platforms: "plataformas",
    noShareDataYet: "Aún no hay datos de compartir. ¡Comparte la aplicación para comenzar a rastrear!",
    overview: "Resumen",
    charts: "Gráficos",
    sharesByPlatform: "Compartidos por Plataforma",
    barChartDesc: "Gráfico de barras comparativo",
    platformDistribution: "Distribución de Plataformas",
    pieChartDesc: "Gráfico circular de porcentaje",
    clearAnalytics: "Borrar Datos",
    confirmClearAnalytics: "¿Estás seguro de que deseas eliminar todos los datos de análisis?",
    analyticsClearedSuccess: "Datos de análisis borrados",
    topPlatform: "Top",
    shares: "Compartidos",
    viewAnalytics: "Ver Estadísticas",
    close: "Cerrar",
    
    timeRangeToday: "Hoy",
    timeRangeWeek: "Últimos 7 días",
    timeRangeMonth: "Últimos 30 días",
    timeRangeAll: "Todo el tiempo",
    comparison: "Comparación",
    vsPrevious: "vs período anterior",
    previousPeriod: "Período anterior",
    trends: "Tendencias",
    sharesTrend: "Tendencias de Compartidos",
    sharesTrendDesc: "Gráfico de tendencias temporal",
    noTrendData: "No hay datos de tendencias",
    platformTrends: "Tendencias por Plataforma",
    platformTrendsDesc: "Comparar tendencias entre plataformas",
    peakPerformance: "Rendimiento Máximo",
    peakPerformanceDesc: "Día con más compartidos",
    noPeakData: "Sin datos de picos",
    bestDay: "Mejor Día",
    
    footerText: "© 2025 CV Maker Pro. Crea CVs profesionales de forma fácil y rápida.",
    
    required: "*",
    
    profile: "Perfil Profesional",
    contact: "Contacto",
    present: "Actual",
  },
};

export const languageNames: Record<Language, string> = {
  vi: "Tiếng Việt",
  en: "English",
  zh: "中文",
  ja: "日本語",
  es: "Español",
};
