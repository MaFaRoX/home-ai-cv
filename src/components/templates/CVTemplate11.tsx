import { CVData, useLanguage } from "../../App";
import { Mail, Phone, MapPin, Linkedin, Globe, Briefcase, GraduationCap, Award, Languages, Facebook, MessageCircle } from "lucide-react";
import { getColorPalette } from "./colorUtils";

interface CVTemplate11Props {
  cvData: CVData;
  customColor?: string;
}

export function CVTemplate11({ cvData, customColor = "#06b6d4" }: CVTemplate11Props) {
  const { t } = useLanguage();
  const colors = getColorPalette(customColor);
  
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    return `${month}/${year}`;
  };

  return (
    <div 
      className="mx-auto" 
      style={{ 
        width: '210mm', 
        height: '297mm', 
        overflow: 'hidden',
        backgroundColor: 'rgb(26, 26, 26)'
      }}
    >
      {/* Header Section */}
      <div 
        className="px-8 py-6"
        style={{
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
          position: 'relative'
        }}
      >
        <div className="flex items-center gap-6">
          {cvData.personalInfo.photo && (
            <div className="relative">
              <img
                src={cvData.personalInfo.photo}
                alt={cvData.personalInfo.fullName}
                className="w-28 h-28 object-cover"
                style={{ 
                  borderRadius: '12px',
                  border: `3px solid rgba(255, 255, 255, 0.9)`,
                  boxShadow: `0 0 40px ${colors.primary}80, 0 0 80px ${colors.primary}40`
                }}
              />
            </div>
          )}
          <div className="flex-1 text-white">
            <h1 className="text-4xl mb-2 tracking-wide" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
              {cvData.personalInfo.fullName}
            </h1>
            <p className="text-xl mb-3 opacity-95">{cvData.personalInfo.title}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs">
              {cvData.personalInfo.email && (
                <div className="flex items-center gap-1.5">
                  <Mail size={12} />
                  <span>{cvData.personalInfo.email}</span>
                </div>
              )}
              {cvData.personalInfo.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone size={12} />
                  <span>{cvData.personalInfo.phone}</span>
                </div>
              )}
              {cvData.personalInfo.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin size={12} />
                  <span>{cvData.personalInfo.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact Links Row */}
        <div className="mt-4 pt-3 border-t border-white/20 flex flex-wrap gap-4 text-xs text-white/90">
          {cvData.personalInfo.linkedin && (
            <div className="flex items-center gap-1.5">
              <Linkedin size={12} />
              <span className="text-[10px]">{cvData.personalInfo.linkedin}</span>
            </div>
          )}
          {cvData.personalInfo.website && (
            <div className="flex items-center gap-1.5">
              <Globe size={12} />
              <span className="text-[10px]">{cvData.personalInfo.website}</span>
            </div>
          )}
          {cvData.personalInfo.facebook && (
            <div className="flex items-center gap-1.5">
              <Facebook size={12} />
              <span className="text-[10px]">{cvData.personalInfo.facebook}</span>
            </div>
          )}
          {cvData.personalInfo.zalo && (
            <div className="flex items-center gap-1.5">
              <MessageCircle size={12} />
              <span>{cvData.personalInfo.zalo}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(297mm-140px)]">
        {/* Left Column */}
        <div className="w-[38%] p-6 text-white" style={{ backgroundColor: 'rgb(20, 20, 20)' }}>
          {/* Profile */}
          {cvData.profile && (
            <div className="mb-6">
              <h2 
                className="text-sm uppercase tracking-wider mb-3 pb-2"
                style={{ 
                  color: colors.primary,
                  borderBottom: `2px solid ${colors.primary}`
                }}
              >
                {t.careerObjective}
              </h2>
              <p className="text-xs text-gray-300 leading-relaxed">{cvData.profile}</p>
            </div>
          )}

          {/* Skills */}
          {(cvData.skills.technical.some(s => s) || cvData.skills.soft.some(s => s)) && (
            <div className="mb-6">
              <h2 
                className="text-sm uppercase tracking-wider mb-3 pb-2"
                style={{ 
                  color: colors.primary,
                  borderBottom: `2px solid ${colors.primary}`
                }}
              >
                {t.skills}
              </h2>
              {cvData.skills.technical.some(s => s) && (
                <div className="mb-4">
                  <h3 className="text-xs mb-2" style={{ color: colors.primary }}>{t.technicalSkills}</h3>
                  <div className="space-y-1.5">
                    {cvData.skills.technical.filter(s => s).map((skill, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div 
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: colors.primary }}
                        />
                        <span className="text-xs text-gray-300">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {cvData.skills.soft.some(s => s) && (
                <div>
                  <h3 className="text-xs mb-2" style={{ color: colors.primary }}>{t.softSkills}</h3>
                  <div className="space-y-1.5">
                    {cvData.skills.soft.filter(s => s).map((skill, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div 
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: colors.primary }}
                        />
                        <span className="text-xs text-gray-300">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Languages */}
          {cvData.languages.some(l => l.name) && (
            <div className="mb-6">
              <h2 
                className="text-sm uppercase tracking-wider mb-3 pb-2"
                style={{ 
                  color: colors.primary,
                  borderBottom: `2px solid ${colors.primary}`
                }}
              >
                <div className="flex items-center gap-2">
                  <Languages size={14} />
                  <span>{t.languages}</span>
                </div>
              </h2>
              <div className="space-y-2.5">
                {cvData.languages.filter(l => l.name).map((lang, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-200">{lang.name}</span>
                      <span className="text-[10px]" style={{ color: colors.primary }}>{lang.level}</span>
                    </div>
                    <div 
                      className="h-1 rounded-full"
                      style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                    >
                      <div 
                        className="h-1 rounded-full"
                        style={{ 
                          width: '75%',
                          background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {cvData.certifications.some(c => c) && (
            <div>
              <h2 
                className="text-sm uppercase tracking-wider mb-3 pb-2"
                style={{ 
                  color: colors.primary,
                  borderBottom: `2px solid ${colors.primary}`
                }}
              >
                <div className="flex items-center gap-2">
                  <Award size={14} />
                  <span>{t.certifications}</span>
                </div>
              </h2>
              <ul className="space-y-2 text-xs text-gray-300">
                {cvData.certifications.filter(c => c).map((cert, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span style={{ color: colors.primary }}>◆</span>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="flex-1 p-6 text-white">
          {/* Work Experience */}
          {cvData.workExperience.some(w => w.position) && (
            <div className="mb-6">
              <h2 
                className="text-base uppercase tracking-wider mb-4 pb-2 flex items-center gap-2"
                style={{ 
                  color: colors.primary,
                  borderBottom: `3px solid ${colors.primary}`
                }}
              >
                <Briefcase size={18} />
                {t.workExperience}
              </h2>
              <div className="space-y-4">
                {cvData.workExperience.filter(w => w.position).map((work, index) => (
                  <div 
                    key={index} 
                    className="p-3 rounded-lg"
                    style={{ 
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      borderLeft: `3px solid ${colors.primary}`
                    }}
                  >
                    <div className="mb-2">
                      <h3 className="text-sm" style={{ color: colors.primary }}>{work.position}</h3>
                      <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                        <span className="text-gray-300">{work.company}</span>
                        {work.location && (
                          <>
                            <span>•</span>
                            <span>{work.location}</span>
                          </>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-500 mt-0.5">
                        {formatDate(work.startDate)} - {work.current ? t.current : formatDate(work.endDate)}
                      </p>
                    </div>
                    {work.responsibilities && (
                      <p className="text-xs text-gray-300 whitespace-pre-line leading-relaxed">
                        {work.responsibilities}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {cvData.education.some(e => e.degree) && (
            <div className="mb-6">
              <h2 
                className="text-base uppercase tracking-wider mb-4 pb-2 flex items-center gap-2"
                style={{ 
                  color: colors.primary,
                  borderBottom: `3px solid ${colors.primary}`
                }}
              >
                <GraduationCap size={18} />
                {t.education}
              </h2>
              <div className="space-y-3">
                {cvData.education.filter(e => e.degree).map((edu, index) => (
                  <div 
                    key={index}
                    className="p-3 rounded-lg"
                    style={{ 
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      borderLeft: `3px solid ${colors.primary}`
                    }}
                  >
                    <h3 className="text-sm" style={{ color: colors.primary }}>{edu.degree}</h3>
                    <p className="text-xs text-gray-300">{edu.school}</p>
                    <p className="text-[10px] text-gray-500">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                    {edu.details && (
                      <p className="text-xs text-gray-400 mt-1">{edu.details}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom Sections */}
          {cvData.customSections.map((section, index) => (
            section.title && (
              <div key={index} className="mb-6">
                <h2 
                  className="text-base uppercase tracking-wider mb-4 pb-2"
                  style={{ 
                    color: colors.primary,
                    borderBottom: `3px solid ${colors.primary}`
                  }}
                >
                  {section.title}
                </h2>
                <p className="text-xs text-gray-300 whitespace-pre-line leading-relaxed">
                  {section.content}
                </p>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
}
