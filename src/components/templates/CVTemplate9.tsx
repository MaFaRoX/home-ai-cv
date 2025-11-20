import { CVData, useLanguage } from "../../App";
import { Mail, Phone, MapPin, Linkedin, Globe, Briefcase, GraduationCap, Award, Languages, Facebook, MessageCircle } from "lucide-react";
import { getColorPalette } from "./colorUtils";

interface CVTemplate9Props {
  cvData: CVData;
  customColor?: string;
}

export function CVTemplate9({ cvData, customColor = "#4f46e5" }: CVTemplate9Props) {
  const { t } = useLanguage();
  const colors = getColorPalette(customColor);
  
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    return `${month}/${year}`;
  };

  return (
    <div 
      className="bg-white mx-auto" 
      style={{ 
        width: '210mm', 
        minHeight: '297mm',
        pageBreakInside: 'avoid',
        breakInside: 'avoid'
      }}
    >
      {/* Top Section - Full-width Photo with Overlay */}
      <div 
        className="relative" 
        style={{ 
          height: '95mm',
          pageBreakAfter: 'avoid',
          breakAfter: 'avoid'
        }}
      >
        {/* Background Pattern/Color */}
        <div className="absolute inset-0" style={{ background: colors.gradientDiagonal }}></div>
        
        {/* Photo Background (if available) */}
        {cvData.personalInfo.photo && (
          <div className="absolute inset-0 opacity-20">
            <img
              src={cvData.personalInfo.photo}
              alt={cvData.personalInfo.fullName}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Overlay Content */}
        <div className="absolute inset-0 flex items-center px-8">
          <div className="flex items-center gap-8 w-full">
            {/* Photo Circle */}
            {cvData.personalInfo.photo && (
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full blur-2xl opacity-60" style={{ background: 'white' }}></div>
                  <img
                    src={cvData.personalInfo.photo}
                    alt={cvData.personalInfo.fullName}
                    className="relative w-40 h-40 rounded-full border-4 border-white object-cover shadow-2xl"
                  />
                </div>
              </div>
            )}
            
            {/* Text Content */}
            <div className="flex-1 text-white">
              <h1 className="text-5xl mb-3 drop-shadow-lg">{cvData.personalInfo.fullName}</h1>
              <p className="text-2xl opacity-95 mb-5 drop-shadow">{cvData.personalInfo.title}</p>
              
              {/* Contact Grid - White text */}
              <div className="grid grid-cols-3 gap-x-5 gap-y-2 text-sm">
                {cvData.personalInfo.email && (
                  <div className="flex items-center gap-2">
                    <Mail size={14} />
                    <span className="truncate">{cvData.personalInfo.email}</span>
                  </div>
                )}
                {cvData.personalInfo.phone && (
                  <div className="flex items-center gap-2">
                    <Phone size={14} />
                    <span>{cvData.personalInfo.phone}</span>
                  </div>
                )}
                {cvData.personalInfo.location && (
                  <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    <span className="truncate">{cvData.personalInfo.location}</span>
                  </div>
                )}
                {cvData.personalInfo.linkedin && (
                  <div className="flex items-center gap-2">
                    <Linkedin size={14} />
                    <span className="truncate">{cvData.personalInfo.linkedin}</span>
                  </div>
                )}
                {cvData.personalInfo.website && (
                  <div className="flex items-center gap-2">
                    <Globe size={14} />
                    <span className="truncate">{cvData.personalInfo.website}</span>
                  </div>
                )}
                {cvData.personalInfo.facebook && (
                  <div className="flex items-center gap-2">
                    <Facebook size={14} />
                    <span className="truncate">{cvData.personalInfo.facebook}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Masonry-style Grid */}
      <div className="px-8 py-6">
        {/* Profile Summary - Full Width */}
        {cvData.profile && (
          <div className="mb-5 p-4 rounded-lg" style={{ background: colors.primaryVeryLight }}>
            <h2 className="text-base mb-2" style={{ color: colors.primaryDark }}>{t.profile}</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{cvData.profile}</p>
          </div>
        )}

        {/* Two Column Grid */}
        <div className="grid grid-cols-5 gap-5">
          {/* Left Side - 3 columns */}
          <div className="col-span-3 space-y-5">
            {/* Work Experience */}
            {cvData.workExperience.some((exp) => exp.position || exp.company) && (
              <section>
                <h2 className="text-lg pb-2 mb-3 flex items-center gap-2" style={{ borderBottom: `3px solid ${colors.primary}`, color: colors.primaryDark }}>
                  <Briefcase size={18} />
                  {t.workExperience}
                </h2>
                <div className="space-y-4">
                  {cvData.workExperience
                    .filter((exp) => exp.position || exp.company)
                    .map((job, index) => (
                      <div 
                        key={index} 
                        className="p-3 rounded-lg border-l-4" 
                        style={{ 
                          borderColor: colors.primary, 
                          background: '#f9fafb',
                          pageBreakInside: 'avoid',
                          breakInside: 'avoid'
                        }}
                      >
                        <h3 className="text-sm" style={{ color: colors.primaryDark }}>{job.position}</h3>
                        <p className="text-xs text-gray-600 mb-1">
                          {job.company}
                          {job.location && ` • ${job.location}`}
                        </p>
                        <p className="text-xs mb-2" style={{ color: colors.primary }}>
                          {formatDate(job.startDate)} - {job.current ? t.present : formatDate(job.endDate)}
                        </p>
                        {job.responsibilities && (
                          <p className="text-xs text-gray-700 whitespace-pre-line leading-relaxed">{job.responsibilities}</p>
                        )}
                      </div>
                    ))}
                </div>
              </section>
            )}

            {/* Education */}
            {cvData.education.some((edu) => edu.degree || edu.school) && (
              <section>
                <h2 className="text-lg pb-2 mb-3 flex items-center gap-2" style={{ borderBottom: `3px solid ${colors.primary}`, color: colors.primaryDark }}>
                  <GraduationCap size={18} />
                  {t.education}
                </h2>
                <div className="space-y-3">
                  {cvData.education
                    .filter((edu) => edu.degree || edu.school)
                    .map((edu, index) => (
                      <div 
                        key={index} 
                        className="p-3 rounded-lg border-l-4" 
                        style={{ 
                          borderColor: colors.primary, 
                          background: '#f9fafb',
                          pageBreakInside: 'avoid',
                          breakInside: 'avoid'
                        }}
                      >
                        <h3 className="text-sm" style={{ color: colors.primaryDark }}>{edu.degree}</h3>
                        <p className="text-xs text-gray-600 mb-1">{edu.school}</p>
                        <p className="text-xs mb-1" style={{ color: colors.primary }}>
                          {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                        </p>
                        {edu.details && (
                          <p className="text-xs text-gray-700 whitespace-pre-line leading-snug">{edu.details}</p>
                        )}
                      </div>
                    ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Sidebar - 2 columns */}
          <div className="col-span-2 space-y-5">
            {/* Technical Skills */}
            {cvData.skills.technical.some((skill) => skill) && (
              <section 
                className="p-4 rounded-lg" 
                style={{ 
                  background: colors.primaryVeryLight,
                  pageBreakInside: 'avoid',
                  breakInside: 'avoid'
                }}
              >
                <h2 className="text-sm mb-3" style={{ color: colors.primaryDark }}>{t.technicalSkills}</h2>
                <div className="flex flex-wrap gap-1.5">
                  {cvData.skills.technical
                    .filter((skill) => skill)
                    .map((skill, index) => (
                      <span key={index} className="px-2 py-1 rounded text-xs text-white" style={{ background: colors.primary }}>
                        {skill}
                      </span>
                    ))}
                </div>
              </section>
            )}

            {/* Soft Skills */}
            {cvData.skills.soft.some((skill) => skill) && (
              <section 
                className="p-4 rounded-lg" 
                style={{ 
                  background: colors.primaryVeryLight,
                  pageBreakInside: 'avoid',
                  breakInside: 'avoid'
                }}
              >
                <h2 className="text-sm mb-3" style={{ color: colors.primaryDark }}>{t.softSkills}</h2>
                <ul className="space-y-1.5">
                  {cvData.skills.soft
                    .filter((skill) => skill)
                    .map((skill, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-700 text-xs">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: colors.primary }}></div>
                        {skill}
                      </li>
                    ))}
                </ul>
              </section>
            )}

            {/* Languages */}
            {cvData.languages.some((lang) => lang.name) && (
              <section 
                className="p-4 rounded-lg" 
                style={{ 
                  background: colors.primaryVeryLight,
                  pageBreakInside: 'avoid',
                  breakInside: 'avoid'
                }}
              >
                <h2 className="text-sm mb-3 flex items-center gap-1.5" style={{ color: colors.primaryDark }}>
                  <Languages size={16} />
                  {t.languages}
                </h2>
                <div className="space-y-2">
                  {cvData.languages
                    .filter((lang) => lang.name)
                    .map((lang, index) => (
                      <div key={index} className="text-gray-700">
                        <p className="text-xs">{lang.name}</p>
                        {lang.level && <p className="text-xs text-gray-500">{lang.level}</p>}
                      </div>
                    ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {cvData.certifications.some((cert) => cert) && (
              <section 
                className="p-4 rounded-lg" 
                style={{ 
                  background: colors.primaryVeryLight,
                  pageBreakInside: 'avoid',
                  breakInside: 'avoid'
                }}
              >
                <h2 className="text-sm mb-3 flex items-center gap-1.5" style={{ color: colors.primaryDark }}>
                  <Award size={16} />
                  {t.certifications}
                </h2>
                <ul className="space-y-1.5">
                  {cvData.certifications
                    .filter((cert) => cert)
                    .map((cert, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700 text-xs">
                        <div className="w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0" style={{ background: colors.primary }}></div>
                        <span className="leading-snug">{cert}</span>
                      </li>
                    ))}
                </ul>
              </section>
            )}

            {/* Custom Sections */}
            {cvData.customSections && cvData.customSections.length > 0 && (
              <>
                {cvData.customSections.map((section, index) => (
                  section.title && section.content && (
                    <section 
                      key={index} 
                      className="p-4 rounded-lg" 
                      style={{ 
                        background: colors.primaryVeryLight,
                        pageBreakInside: 'avoid',
                        breakInside: 'avoid'
                      }}
                    >
                      <h2 className="text-sm mb-2" style={{ color: colors.primaryDark }}>
                        {section.title}
                      </h2>
                      <p className="text-xs text-gray-700 whitespace-pre-line leading-relaxed">
                        {section.content}
                      </p>
                    </section>
                  )
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
