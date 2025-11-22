import { CVData, useLanguage } from "../../App";
import { Mail, Phone, MapPin, Linkedin, Globe, Briefcase, GraduationCap, Award, Languages, Facebook, MessageCircle } from "lucide-react";
import { getColorPalette } from "./colorUtils";

interface CVTemplate10Props {
  cvData: CVData;
  customColor?: string;
}

export function CVTemplate10({ cvData, customColor = "#fbbf24" }: CVTemplate10Props) {
  const { t } = useLanguage();
  const colors = getColorPalette(customColor);
  
  const formatDate = (date: string) => {
    if (!date) return "";
    return date;
  };

  return (
    <div 
      className="mx-auto text-white" 
      style={{ 
        width: '210mm', 
        minHeight: '297mm',
        background: 'linear-gradient(135deg, rgb(10, 10, 10) 0%, rgb(20, 20, 20) 100%)',
        pageBreakInside: 'avoid',
        breakInside: 'avoid'
      }}
    >
      <div className="flex">
        {/* Left Sidebar - Darker */}
        <div 
          className="w-[35%] p-6" 
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            pageBreakInside: 'avoid',
            breakInside: 'avoid'
          }}
        >
          {/* Photo */}
          {cvData.personalInfo.photo && (
            <div className="mb-6 flex justify-center">
              <img
                src={cvData.personalInfo.photo}
                alt={cvData.personalInfo.fullName}
                className="w-36 h-36 rounded-full object-cover"
                style={{ 
                  border: `4px solid ${colors.primary}`,
                  boxShadow: `0 0 30px ${colors.primary}40`
                }}
              />
            </div>
          )}

          {/* Contact Info */}
          <div className="mb-6">
            <h3 
              className="text-sm uppercase tracking-wider mb-3 pb-2 border-b-2"
              style={{ 
                color: colors.primary,
                borderColor: colors.primary
              }}
            >
              {t.personalInfo}
            </h3>
            <div className="space-y-2.5 text-xs">
              {cvData.personalInfo.email && (
                <div className="flex items-start gap-2">
                  <Mail size={14} className="mt-0.5 flex-shrink-0" style={{ color: colors.primary }} />
                  <span className="text-gray-300 break-all">{cvData.personalInfo.email}</span>
                </div>
              )}
              {cvData.personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={14} className="flex-shrink-0" style={{ color: colors.primary }} />
                  <span className="text-gray-300">{cvData.personalInfo.phone}</span>
                </div>
              )}
              {cvData.personalInfo.location && (
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="mt-0.5 flex-shrink-0" style={{ color: colors.primary }} />
                  <span className="text-gray-300">{cvData.personalInfo.location}</span>
                </div>
              )}
              {cvData.personalInfo.linkedin && (
                <div className="flex items-start gap-2">
                  <Linkedin size={14} className="mt-0.5 flex-shrink-0" style={{ color: colors.primary }} />
                  <span className="text-gray-300 break-all text-[10px]">{cvData.personalInfo.linkedin}</span>
                </div>
              )}
              {cvData.personalInfo.website && (
                <div className="flex items-start gap-2">
                  <Globe size={14} className="mt-0.5 flex-shrink-0" style={{ color: colors.primary }} />
                  <span className="text-gray-300 break-all text-[10px]">{cvData.personalInfo.website}</span>
                </div>
              )}
              {cvData.personalInfo.facebook && (
                <div className="flex items-start gap-2">
                  <Facebook size={14} className="mt-0.5 flex-shrink-0" style={{ color: colors.primary }} />
                  <span className="text-gray-300 break-all text-[10px]">{cvData.personalInfo.facebook}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {(cvData.skills.technical.some(s => s) || cvData.skills.soft.some(s => s)) && (
            <div className="mb-6">
              <h3 
                className="text-sm uppercase tracking-wider mb-3 pb-2 border-b-2"
                style={{ 
                  color: colors.primary,
                  borderColor: colors.primary
                }}
              >
                {t.skills}
              </h3>
              {cvData.skills.technical.some(s => s) && (
                <div className="mb-3">
                  <h4 className="text-xs mb-2" style={{ color: colors.primary }}>{t.technicalSkills}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {cvData.skills.technical.filter(s => s).map((skill, index) => (
                      <span
                        key={index}
                        className="text-[10px] px-2 py-1 rounded"
                        style={{ 
                          backgroundColor: `${colors.primary}20`,
                          color: colors.primary,
                          border: `1px solid ${colors.primary}40`
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {cvData.skills.soft.some(s => s) && (
                <div>
                  <h4 className="text-xs mb-2" style={{ color: colors.primary }}>{t.softSkills}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {cvData.skills.soft.filter(s => s).map((skill, index) => (
                      <span
                        key={index}
                        className="text-[10px] px-2 py-1 rounded"
                        style={{ 
                          backgroundColor: `${colors.primary}20`,
                          color: colors.primary,
                          border: `1px solid ${colors.primary}40`
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Languages */}
          {cvData.languages.some(l => l.name) && (
            <div className="mb-6">
              <h3 
                className="text-sm uppercase tracking-wider mb-3 pb-2 border-b-2"
                style={{ 
                  color: colors.primary,
                  borderColor: colors.primary
                }}
              >
                <div className="flex items-center gap-2">
                  <Languages size={16} />
                  <span>{t.languages}</span>
                </div>
              </h3>
              <div className="space-y-2">
                {cvData.languages.filter(l => l.name).map((lang, index) => (
                  <div key={index} className="text-xs">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-200">{lang.name}</span>
                      <span className="text-[10px]" style={{ color: colors.primary }}>{lang.level}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {cvData.certifications.some(c => c) && (
            <div>
              <h3 
                className="text-sm uppercase tracking-wider mb-3 pb-2 border-b-2"
                style={{ 
                  color: colors.primary,
                  borderColor: colors.primary
                }}
              >
                <div className="flex items-center gap-2">
                  <Award size={16} />
                  <span>{t.certifications}</span>
                </div>
              </h3>
              <ul className="space-y-1.5 text-xs text-gray-300">
                {cvData.certifications.filter(c => c).map((cert, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span style={{ color: colors.primary }}>▸</span>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="flex-1 p-6">
          {/* Name & Title */}
          <div className="mb-6 pb-4 border-b-2" style={{ borderColor: `${colors.primary}40` }}>
            <h1 className="text-4xl mb-2" style={{ color: colors.primary }}>
              {cvData.personalInfo.fullName}
            </h1>
            <p className="text-xl text-gray-300">{cvData.personalInfo.title}</p>
          </div>

          {/* Profile */}
          {cvData.profile && (
            <div className="mb-6">
              <h2 
                className="text-lg mb-3 flex items-center gap-2"
                style={{ color: colors.primary }}
              >
                <div 
                  className="w-1 h-6 rounded"
                  style={{ backgroundColor: colors.primary }}
                />
                {t.careerObjective}
              </h2>
              <p className="text-xs text-gray-300 leading-relaxed">{cvData.profile}</p>
            </div>
          )}

          {/* Work Experience */}
          {cvData.workExperience.some(w => w.position) && (
            <div className="mb-6">
              <h2 
                className="text-lg mb-3 flex items-center gap-2"
                style={{ color: colors.primary }}
              >
                <Briefcase size={20} />
                {t.workExperience}
              </h2>
              <div className="space-y-4">
                {cvData.workExperience.filter(w => w.position).map((work, index) => (
                  <div 
                    key={index} 
                    className="relative pl-4" 
                    style={{ 
                      borderLeft: `2px solid ${colors.primary}40`,
                      pageBreakInside: 'avoid',
                      breakInside: 'avoid'
                    }}
                  >
                    <div 
                      className="absolute left-0 top-1 w-2 h-2 rounded-full"
                      style={{ 
                        backgroundColor: colors.primary,
                        transform: 'translateX(-5px)'
                      }}
                    />
                    <div className="mb-1">
                      <h3 className="text-sm" style={{ color: colors.primary }}>{work.position}</h3>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
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
                className="text-lg mb-3 flex items-center gap-2"
                style={{ color: colors.primary }}
              >
                <GraduationCap size={20} />
                {t.education}
              </h2>
              <div className="space-y-3">
                {cvData.education.filter(e => e.degree).map((edu, index) => (
                  <div 
                    key={index} 
                    className="relative pl-4" 
                    style={{ 
                      borderLeft: `2px solid ${colors.primary}40`,
                      pageBreakInside: 'avoid',
                      breakInside: 'avoid'
                    }}
                  >
                    <div 
                      className="absolute left-0 top-1 w-2 h-2 rounded-full"
                      style={{ 
                        backgroundColor: colors.primary,
                        transform: 'translateX(-5px)'
                      }}
                    />
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
                  className="text-lg mb-3 flex items-center gap-2"
                  style={{ color: colors.primary }}
                >
                  <div 
                    className="w-1 h-6 rounded"
                    style={{ backgroundColor: colors.primary }}
                  />
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
