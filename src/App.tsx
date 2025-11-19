"use client";

import { useState, createContext, useContext, useEffect, useCallback, useRef } from "react";
import { CVForm } from "./components/CVForm";
import { TemplateSelector } from "./components/TemplateSelector";
import { TutorialDialog } from "./components/TutorialDialog";
import { AuthProvider, useAuth } from "./components/AuthContext";
import { AuthDialog } from "./components/AuthDialog";
import { PremiumDialog } from "./components/PremiumDialog";
import { FileText, ArrowLeft, Eye, Edit, Globe, Download, Upload, HelpCircle, Share2, Facebook, Twitter, Linkedin, Mail, Link as LinkIcon, LogOut, Star, Check } from "lucide-react";
import { Button } from "./components/ui/button";
import { Language, translations, languageNames } from "./locales/translations";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./components/ui/dropdown-menu";
import { toast, Toaster } from "sonner";
import { cvApi, type CV } from "./lib/api";

// Language Context
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations[Language];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};

export interface CVData {
  personalInfo: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    linkedinLabel: string;
    website: string;
    websiteLabel: string;
    facebook: string;
    facebookLabel: string;
    zalo: string;
    zaloLabel: string;
    photo: string;
    showLinkedinQR?: boolean;
    showPortfolioQR?: boolean;
  };
  profile: string;
  workExperience: Array<{
    position: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    responsibilities: string;
  }>;
  education: Array<{
    degree: string;
    school: string;
    startDate: string;
    endDate: string;
    details: string;
  }>;
  skills: {
    technical: string[];
    soft: string[];
  };
  languages: Array<{
    name: string;
    level: string;
  }>;
  certifications: string[];
  customSections: Array<{
    title: string;
    content: string;
  }>;
}

// Dữ liệu mẫu để demo
const SAMPLE_CV_DATA: CVData = {
  personalInfo: {
    fullName: "Nguyễn Minh Anh",
    title: "Senior Full Stack Developer",
    email: "minhanh.dev@email.com",
    phone: "+84 901 234 567",
    location: "Hà Nội, Việt Nam",
    linkedin: "linkedin.com/in/nguyenminhanh",
    linkedinLabel: "LinkedIn",
    website: "minhanh.dev",
    websiteLabel: "Website",
    facebook: "facebook.com/nguyenminhanh",
    facebookLabel: "Facebook",
    zalo: "0901234567",
    zaloLabel: "Zalo",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    showLinkedinQR: true,
    showPortfolioQR: false,
  },
  profile: "Full Stack Developer với hơn 6 năm kinh nghiệm trong phát triển ứng dụng web và mobile. Chuyên sâu về React, Node.js, TypeScript và các công nghệ cloud hiện đại. Đam mê xây dựng sản phẩm có tác động lớn và làm việc trong môi trường năng động, sáng tạo. Có kinh nghiệm quản lý team và mentoring cho junior developers.",
  workExperience: [
    {
      position: "Senior Full Stack Developer",
      company: "VinaTech Solutions",
      location: "Hà Nội",
      startDate: "2022-03",
      endDate: "",
      current: true,
      responsibilities: "• Phát triển và duy trì hệ thống quản lý doanh nghiệp phục vụ 50,000+ người dùng\n• Xây dựng microservices architecture sử dụng Node.js, Express và MongoDB\n• Thiết kế và implement RESTful APIs với hiệu suất cao\n• Lead team 5 developers, review code và mentoring\n• Giảm 45% thời gian load trang thông qua tối ưu hóa performance",
    },
    {
      position: "Full Stack Developer",
      company: "Digital Innovation Co.",
      location: "Hồ Chí Minh",
      startDate: "2019-06",
      endDate: "2022-02",
      current: false,
      responsibilities: "• Phát triển ứng dụng e-commerce với React, Redux và Node.js\n• Tích hợp các cổng thanh toán: VNPay, Momo, ZaloPay\n• Implement CI/CD pipeline giúp tăng 60% tốc độ deployment\n• Xây dựng admin dashboard với real-time analytics\n• Làm việc theo phương pháp Agile/Scrum",
    },
    {
      position: "Junior Web Developer",
      company: "StartUp Hub Vietnam",
      location: "Hà Nội",
      startDate: "2018-01",
      endDate: "2019-05",
      current: false,
      responsibilities: "• Phát triển website sử dụng HTML, CSS, JavaScript và PHP\n• Làm việc với WordPress và các CMS khác\n• Tham gia dự án outsourcing cho khách hàng quốc tế\n• Học hỏi và áp dụng best practices trong web development",
    },
  ],
  education: [
    {
      degree: "Kỹ sư Công nghệ Thông tin",
      school: "Đại học Bách Khoa Hà Nội",
      startDate: "2014-09",
      endDate: "2018-06",
      details: "GPA: 3.7/4.0 - Tốt nghiệp loại Giỏi\nChuyên ngành: Kỹ thuật Phần mềm\nLuận văn: Ứng dụng AI trong phát hiện gian lận thanh toán trực tuyến",
    },
  ],
  skills: {
    technical: [
      "JavaScript/TypeScript",
      "React, Next.js, Vue.js",
      "Node.js, Express, NestJS",
      "MongoDB, PostgreSQL, Redis",
      "Docker, Kubernetes",
      "AWS, Google Cloud",
      "Git, CI/CD",
      "GraphQL, REST API",
      "TailwindCSS, Material-UI",
    ],
    soft: [
      "Làm việc nhóm hiệu quả",
      "Giải quyết vấn đề",
      "Quản lý thời gian",
      "Leadership & Mentoring",
      "Giao tiếp và thuyết trình",
      "Tư duy phản biện",
    ],
  },
  languages: [
    { name: "Tiếng Việt", level: "Bản ngữ" },
    { name: "Tiếng Anh", level: "IELTS 7.5 - Thành thạo" },
  ],
  certifications: [
    "AWS Certified Solutions Architect - Associate (2023)",
    "MongoDB Certified Developer Associate (2022)",
    "Google Cloud Professional Developer (2021)",
  ],
  customSections: [
    {
      title: "Người tham vấn",
      content: "TS. Trần Văn A - Giảng viên Đại học Bách Khoa Hà Nội\nEmail: trananh@hust.edu.vn | SĐT: +84 912 345 678\n\nKS. Nguyễn Thị B - CTO tại VinaTech Solutions\nEmail: nguyenb@vinatech.com | SĐT: +84 908 765 432"
    },
    {
      title: "Hoạt động xã hội",
      content: "• Tình nguyện viên chương trình \"Code for Community\" (2022-2023)\n• Diễn giả tại Hackathon sinh viên toàn quốc 2023\n• Mentor cho junior developers tại VinaTech Solutions"
    }
  ],
};

const APP_SLUG = 'cv-online';

function AppContent() {
  const { isAuthenticated, isPremium, premiumDaysRemaining, signOut, accessToken } = useAuth();
  // Always start with 'en' to prevent hydration mismatch
  const [language, setLanguage] = useState<Language>('en');
  const [step, setStep] = useState<"form" | "preview">("form");
  const [cvData, setCVData] = useState<CVData | null>(null);
  const [currentCV, setCurrentCV] = useState<CV | null>(null);
  const [userCVs, setUserCVs] = useState<CV[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"create" | "demo">("create");
  const [showTutorialDialog, setShowTutorialDialog] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authDialogReason, setAuthDialogReason] = useState<"manual" | "restriction">("manual");
  const [showPremiumDialog, setShowPremiumDialog] = useState(false);
  
  // Track if we've loaded from localStorage to prevent overwriting on initial mount
  const hasLoadedFromStorage = useRef(false);

  const t = translations[language];

  // Load language from localStorage after mount to prevent hydration mismatch
  useEffect(() => {
    if (typeof window !== 'undefined' && !hasLoadedFromStorage.current) {
      const savedLang = localStorage.getItem("cv-maker-language");
      const validLanguages: Language[] = ['vi', 'en', 'zh', 'ja', 'es'];
      if (savedLang && validLanguages.includes(savedLang as Language)) {
        setLanguage(savedLang as Language);
      }
      hasLoadedFromStorage.current = true;
    }
  }, []);

  // Save language preference (only after initial load to prevent overwriting)
  useEffect(() => {
    if (typeof window !== 'undefined' && hasLoadedFromStorage.current) {
      localStorage.setItem("cv-maker-language", language);
    }
  }, [language]);

  // Load user's CVs from backend
  const loadUserCVs = useCallback(async () => {
    if (!isAuthenticated || !accessToken) return;

    try {
      setLoading(true);
      const { cvs } = await cvApi.getCVs(accessToken, APP_SLUG);
      setUserCVs(cvs);
      
      // If we have CVs and no current CV is set, load the first one
      if (cvs.length > 0) {
        setCurrentCV((prevCV) => {
          if (prevCV) {
            // If we already have a CV, keep it
            return prevCV;
          }
          // Otherwise, set the first CV
          return cvs[0];
        });
        // Set CV data separately to avoid dependency issues
        setCVData((prevData) => {
          // Only update if we don't have data or if it's different
          if (!prevData && cvs.length > 0) {
            return cvs[0].cvData;
          }
          return prevData;
        });
      }
    } catch (error) {
      console.error("Failed to load CVs:", error);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, accessToken]);

  // Load CVs when authenticated
  useEffect(() => {
    if (isAuthenticated && accessToken) {
      // Clear guest data when logging in
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cv-online-guest-data');
      }
      // Clear guest CV data before loading user CVs
      setCVData(null);
      setCurrentCV(null);
      loadUserCVs();
    } else {
      setUserCVs([]);
      setCurrentCV(null);
      // Load guest CV from localStorage
      if (typeof window !== 'undefined') {
        const guestCVData = localStorage.getItem('cv-online-guest-data');
        if (guestCVData) {
          try {
            const parsed = JSON.parse(guestCVData);
            setCVData(parsed);
          } catch (error) {
            console.error('Failed to parse guest CV data:', error);
          }
        } else {
          // Clear cvData if no guest data exists
          setCVData(null);
        }
      }
    }
  }, [isAuthenticated, accessToken, loadUserCVs]);

  const handleFormSubmit = async (data: CVData) => {
    // If not authenticated, save to localStorage for guests
    if (!isAuthenticated || !accessToken) {
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem('cv-online-guest-data', JSON.stringify(data));
        }
        setCVData(data);
        setStep("preview");
        setViewMode("create");
        toast.success("CV data saved locally. Sign in to save to cloud.");
        return;
      } catch (error) {
        toast.error("Failed to save CV data locally");
        return;
      }
    }

    // Authenticated users: save to backend

    try {
      setLoading(true);
      
      if (currentCV) {
        // Update existing CV
        const { cv } = await cvApi.updateCV(accessToken, currentCV.id, {
          cvData: data,
          title: data.personalInfo.fullName || "My CV",
        });
        setCurrentCV(cv);
        setCVData(cv.cvData);
        toast.success("CV updated successfully");
      } else {
        // Create new CV
        const { cv } = await cvApi.createCV(
          accessToken,
          APP_SLUG,
          data.personalInfo.fullName || "My CV",
          data,
          1
        );
        setCurrentCV(cv);
        setCVData(cv.cvData);
        setUserCVs([...userCVs, cv]);
        toast.success("CV saved successfully");
      }
      
      setStep("preview");
      setViewMode("create");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to save CV";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToForm = () => {
    setStep("form");
  };

  const handleViewDemo = () => {
    setViewMode("demo");
    setStep("preview");
  };

  const handleCreateNew = () => {
    setViewMode("create");
    setStep("form");
    setCVData(null);
    setCurrentCV(null);
    // Clear guest data from localStorage if exists
    if (typeof window !== 'undefined' && !isAuthenticated) {
      localStorage.removeItem('cv-online-guest-data');
    }
  };

  const handleRestrictedAccess = () => {
    if (!isAuthenticated) {
      setAuthDialogReason("restriction");
      setShowAuthDialog(true);
    } else if (!isPremium) {
      setShowPremiumDialog(true);
    }
  };


  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-5">
            <div className="flex items-center justify-between">
              {/* Left Side - Logo & Brand */}
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-3 rounded-2xl shadow-lg transform group-hover:scale-110 transition-all duration-300">
                    <FileText className="text-white" size={28} strokeWidth={2.5} />
                  </div>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-in fade-in slide-in-from-left duration-500">{t.appName}</h1>
                  <p className="text-sm text-gray-600 animate-in fade-in slide-in-from-left duration-700">{t.appTagline}</p>
                </div>
              </div>

              {/* Right Side - Actions */}
              <div className="flex items-center gap-2 flex-wrap justify-end">
                {/* Tutorial Button */}
                <Button 
                  onClick={() => setShowTutorialDialog(true)} 
                  variant="outline" 
                  size="sm" 
                  className="gap-2 border-gray-300 hover:border-purple-400 hover:bg-purple-50 hover:text-purple-700 transition-all duration-200 hover:shadow-md"
                >
                  <HelpCircle size={16} />
                  <span className="hidden md:inline">{t.tutorial}</span>
                </Button>

                {/* Save/Share Buttons - Only show in create mode */}
                {viewMode === "create" && (
                  <>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 hover:shadow-md"
                        >
                          <Share2 size={16} />
                          <span className="hidden lg:inline">{t.share}</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-52">
                        <DropdownMenuItem
                          onClick={() => {
                            const url = window.location.href;
                            const text = t.appName + " - " + t.appTagline;
                            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`, '_blank');
                          }}
                          className="gap-2 cursor-pointer"
                        >
                          <Facebook size={16} className="text-blue-600" />
                          <span>{t.shareOn} Facebook</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            const url = window.location.href;
                            const text = t.appName + " - " + t.appTagline;
                            window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
                          }}
                          className="gap-2 cursor-pointer"
                        >
                          <Twitter size={16} className="text-sky-500" />
                          <span>{t.shareOn} Twitter</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            const url = window.location.href;
                            const text = t.appName + " - " + t.appTagline;
                            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
                          }}
                          className="gap-2 cursor-pointer"
                        >
                          <Linkedin size={16} className="text-blue-700" />
                          <span>{t.shareOn} LinkedIn</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            const url = window.location.href;
                            const text = t.appName + " - " + t.appTagline;
                            window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
                          }}
                          className="gap-2 cursor-pointer"
                        >
                          <svg viewBox="0 0 24 24" width="16" height="16" className="text-green-600" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                          </svg>
                          <span>{t.shareOn} WhatsApp</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            const url = window.location.href;
                            const subject = t.appName;
                            const body = t.appTagline + '\n\n' + url;
                            window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
                          }}
                          className="gap-2 cursor-pointer"
                        >
                          <Mail size={16} className="text-gray-600" />
                          <span>{t.shareOn} Email</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            const url = window.location.href;
                            navigator.clipboard.writeText(url).then(() => {
                              toast.success(t.linkCopied);
                            });
                          }}
                          className="gap-2 cursor-pointer"
                        >
                          <LinkIcon size={16} className="text-purple-600" />
                          <span>{t.copyLink}</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                )}

                {/* Language Selector */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2 border-gray-300 hover:border-orange-400 hover:bg-orange-50 hover:text-orange-700 transition-all duration-200 hover:shadow-md">
                      <Globe size={16} />
                      <span className="hidden sm:inline">{languageNames[language]}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-[160px]">
                    {(Object.keys(languageNames) as Language[]).map((lang) => (
                      <DropdownMenuItem
                        key={lang}
                        onClick={() => setLanguage(lang)}
                        className={language === lang ? "bg-gradient-to-r from-blue-50 to-purple-50 text-purple-700 font-medium" : "hover:bg-gray-50"}
                      >
                        {languageNames[lang]}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Premium Button - Only show for authenticated users */}
                {isAuthenticated && (
                  <Button 
                    onClick={() => setShowPremiumDialog(true)}
                    variant={isPremium ? "outline" : "default"}
                    size="sm" 
                    className={`gap-2 transition-all duration-200 hover:shadow-md ${
                      isPremium 
                        ? "border-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50 hover:from-yellow-100 hover:to-orange-100 text-yellow-700 hover:text-yellow-800"
                        : "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white"
                    }`}
                  >
                    {isPremium ? (
                      <>
                        <Check size={16} />
                        <span className="hidden sm:inline">
                          {t.premiumActive} ({t.premiumDaysRemaining.replace('{days}', premiumDaysRemaining.toString())})
                        </span>
                      </>
                    ) : (
                      <>
                        <Star size={16} />
                        <span className="hidden sm:inline">{t.premium}</span>
                      </>
                    )}
                  </Button>
                )}

                {/* Sign In/Out Button */}
                {isAuthenticated ? (
                  <Button 
                    onClick={signOut} 
                    variant="outline" 
                    size="sm" 
                    className="gap-2 border-gray-300 hover:border-red-400 hover:bg-red-50 hover:text-red-700 transition-all duration-200 hover:shadow-md"
                  >
                    <LogOut size={16} />
                    <span className="hidden sm:inline">{t.logout}</span>
                  </Button>
                ) : (
                  <Button 
                    onClick={() => {
                      setAuthDialogReason("manual");
                      setShowAuthDialog(true);
                    }} 
                    variant="outline" 
                    size="sm" 
                    className="gap-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 hover:shadow-md"
                  >
                    <span className="hidden sm:inline">{t.login}</span>
                  </Button>
                )}

                {/* Mode Switching Buttons */}
                {viewMode === "demo" && (
                  <Button onClick={handleCreateNew} className="gap-2 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                    <Edit size={16} />
                    <span className="hidden sm:inline">{t.createYourCV}</span>
                  </Button>
                )}
                {viewMode === "create" && step === "form" && (
                  <Button onClick={handleViewDemo} variant="outline" className="gap-2 border-gray-300 hover:border-pink-400 hover:bg-pink-50 hover:text-pink-700 transition-all duration-200 hover:shadow-md">
                    <Eye size={16} />
                    <span className="hidden sm:inline">{t.viewSamples}</span>
                  </Button>
                )}
                {viewMode === "create" && step === "preview" && (
                  <Button onClick={handleBackToForm} variant="outline" className="gap-2 border-gray-300 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-200 hover:shadow-md">
                    <ArrowLeft size={16} />
                    <span className="hidden sm:inline">{t.editInfo}</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Progress Indicator */}
        {viewMode === "create" && (
          <div className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex items-center gap-4">
                <div className={`flex items-center gap-2 ${step === "form" ? "text-blue-600" : "text-green-600"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "form" ? "bg-blue-600 text-white" : "bg-green-600 text-white"}`}>
                    {step === "form" ? "1" : "✓"}
                  </div>
                  <span>{t.stepOne}</span>
                </div>
                <div className="flex-1 h-1 bg-gray-200 rounded">
                  <div className={`h-full bg-blue-600 rounded transition-all duration-500 ${step === "preview" ? "w-full" : "w-0"}`}></div>
                </div>
                <div className={`flex items-center gap-2 ${step === "preview" ? "text-blue-600" : "text-gray-400"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "preview" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
                    2
                  </div>
                  <span>{t.stepTwo}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Demo Mode Banner */}
        {viewMode === "demo" && (
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex items-center justify-center gap-3">
                <Eye size={20} />
                <p className="text-sm">{t.viewingDemo}</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          {viewMode === "demo" ? (
            <TemplateSelector cvData={SAMPLE_CV_DATA} onRestrictedAccess={handleRestrictedAccess} />
          ) : step === "form" ? (
            <CVForm onSubmit={handleFormSubmit} initialData={cvData} onRestrictedAccess={handleRestrictedAccess} />
          ) : (
            cvData && <TemplateSelector cvData={cvData} onRestrictedAccess={handleRestrictedAccess} />
          )}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t mt-12">
          <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-600 text-sm">
            <p>{t.footerText}</p>
          </div>
        </footer>

        {/* Dialogs */}
        <TutorialDialog 
          open={showTutorialDialog} 
          onOpenChange={setShowTutorialDialog}
        />
        <AuthDialog 
          open={showAuthDialog} 
          onOpenChange={setShowAuthDialog}
          isGuestRestriction={authDialogReason === "restriction"}
        />
        <PremiumDialog 
          open={showPremiumDialog} 
          onOpenChange={setShowPremiumDialog}
        />
        </div>
        <Toaster position="top-center" richColors />
      </LanguageContext.Provider>
  );
}

// Wrapper with Auth Provider
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
