import { CVData, useLanguage } from "../../App";
import { Mail, Phone, MapPin, Linkedin, Globe, Briefcase, GraduationCap, Award, Languages, Facebook, MessageCircle } from "lucide-react";
import { getColorPalette } from "./colorUtils";

interface CVTemplate6Props {
  cvData: CVData;
  customColor?: string;
}

export function CVTemplate6({ cvData, customColor = "#7c3aed" }: CVTemplate6Props) {
  const { t } = useLanguage();
  const colors = getColorPalette(customColor);
  
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    return `${month}/${year}`;
  };

  return (
    <div 
      className="bg-white mx-auto shadow-lg" 
      style={{ 
        width: '210mm', 
        minHeight: '297mm',
        pageBreakInside: 'avoid',
        breakInside: 'avoid'
      }}
    >
      {/* Elegant Header - Minimal Design */}
      <div 
        className="px-6 py-6" 
        style={{ 
          background: colors.gradientDiagonal,
          pageBreakAfter: 'avoid',
          breakAfter: 'avoid'
        }}
      >
        <div className="text-center text-white">
          <h1 className="text-4xl mb-2 tracking-wide">{cvData.personalInfo.fullName}</h1>
          <p className="text-lg tracking-wider uppercase" style={{ color: colors.primarySemiLight }}>{cvData.personalInfo.title}</p>
        </div>
      </div>

      {/* Two Column Layout - Balanced 1:1 */}
      <div className="grid grid-cols-2 gap-0">
        {/* Left Sidebar - Contact & Skills */}
        <div 
          className="px-6 py-6 space-y-5" 
          style={{ 
            background: 'rgb(250, 250, 251)',
            pageBreakInside: 'avoid',
            breakInside: 'avoid'
          }}
        >
          {/* Photo - Circular */}
          {cvData.personalInfo.photo && (
            <div className="flex justify-center mb-4" style={{ pageBreakAfter: 'avoid', breakAfter: 'avoid' }}>
              <img
                src={cvData.personalInfo.photo}
                alt={cvData.personalInfo.fullName}
                className="w-32 h-32 rounded-full object-cover border-4 shadow-lg"
                style={{ borderColor: colors.primary }}
              />
            </div>
          )}

          {/* Contact Information */}
          <section style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
            <h2 className="text-base uppercase tracking-wider pb-2 mb-3" style={{ color: colors.primaryMedium, borderBottom: `3px solid ${colors.primary}` }}>
              {t.contact}
            </h2>
            <div className="space-y-2">
              {cvData.personalInfo.email && (
                <div className="flex items-start gap-2">
                  <Mail size={14} className="flex-shrink-0 mt-0.5" style={{ color: colors.primary }} />
                  <span className="text-xs text-gray-700 break-all">{cvData.personalInfo.email}</span>
                </div>
              )}
              {cvData.personalInfo.phone && (
                <div className="flex items-start gap-2">
                  <Phone size={14} className="flex-shrink-0 mt-0.5" style={{ color: colors.primary }} />
                  <span className="text-xs text-gray-700">{cvData.personalInfo.phone}</span>
                </div>
              )}
              {cvData.personalInfo.location && (
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="flex-shrink-0 mt-0.5" style={{ color: colors.primary }} />
                  <span className="text-xs text-gray-700">{cvData.personalInfo.location}</span>
                </div>
              )}
              {cvData.personalInfo.linkedin && (
                <div className="flex items-start gap-2">
                  <Linkedin size={14} className="flex-shrink-0 mt-0.5" style={{ color: colors.primary }} />
                  <span className="text-xs text-gray-700 break-all">{cvData.personalInfo.linkedinLabel}: {cvData.personalInfo.linkedin}</span>
                </div>
              )}
              {cvData.personalInfo.website && (
                <div className="flex items-start gap-2">
                  <Globe size={14} className="flex-shrink-0 mt-0.5" style={{ color: colors.primary }} />
                  <span className="text-xs text-gray-700 break-all">{cvData.personalInfo.websiteLabel}: {cvData.personalInfo.website}</span>
                </div>
              )}
              {cvData.personalInfo.facebook && (
                <div className="flex items-start gap-2">
                  <Facebook size={14} className="flex-shrink-0 mt-0.5" style={{ color: colors.primary }} />
                  <span className="text-xs text-gray-700 break-all">{cvData.personalInfo.facebookLabel}: {cvData.personalInfo.facebook}</span>
                </div>
              )}
              {cvData.personalInfo.zalo && (
                <div className="flex items-start gap-2">
                  <MessageCircle size={14} className="flex-shrink-0 mt-0.5" style={{ color: colors.primary }} />
                  <span className="text-xs text-gray-700">{cvData.personalInfo.zaloLabel}: {cvData.personalInfo.zalo}</span>
                </div>
              )}
            </div>
          </section>

          {/* Technical Skills */}
          {cvData.skills.technical.some((skill) => skill) && (
            <section style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
              <h2 className="text-base uppercase tracking-wider pb-2 mb-3" style={{ color: colors.primaryMedium, borderBottom: `3px solid ${colors.primary}` }}>
                {t.technicalSkills}
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {cvData.skills.technical
                  .filter((skill) => skill)
                  .map((skill, index) => (
                    <span key={index} className="px-2 py-1 rounded text-[10px] text-white" style={{ background: colors.primary }}>
                      {skill}
                    </span>
                  ))}
              </div>
            </section>
          )}

          {/* Soft Skills */}
          {cvData.skills.soft.some((skill) => skill) && (
            <section style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
              <h2 className="text-base uppercase tracking-wider pb-2 mb-3" style={{ color: colors.primaryMedium, borderBottom: `3px solid ${colors.primary}` }}>
                {t.softSkills}
              </h2>
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
            <section style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
              <h2 className="text-base uppercase tracking-wider pb-2 mb-3 flex items-center gap-2" style={{ color: colors.primaryMedium, borderBottom: `3px solid ${colors.primary}` }}>
                <Languages size={16} />
                {t.languages}
              </h2>
              <div className="space-y-2">
                {cvData.languages
                  .filter((lang) => lang.name)
                  .map((lang, index) => (
                    <div key={index} className="text-gray-700">
                      <p className="text-xs">{lang.name}</p>
                      {lang.level && <p className="text-[10px] text-gray-500">{lang.level}</p>}
                    </div>
                  ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {cvData.certifications.some((cert) => cert) && (
            <section style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
              <h2 className="text-base uppercase tracking-wider pb-2 mb-3 flex items-center gap-2" style={{ color: colors.primaryMedium, borderBottom: `3px solid ${colors.primary}` }}>
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

          {/* Custom Sections in Sidebar */}
          {cvData.customSections && cvData.customSections.length > 0 && (
            <>
              {cvData.customSections.slice(0, 1).map((section, index) => (
                section.title && section.content && (
                  <section key={index} style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
                    <h2 className="text-base uppercase tracking-wider pb-2 mb-3" style={{ color: colors.primaryMedium, borderBottom: `3px solid ${colors.primary}` }}>
                      {section.title}
                    </h2>
                    <div className="text-xs text-gray-700 leading-snug whitespace-pre-wrap">
                      {section.content}
                    </div>
                  </section>
                )
              ))}
            </>
          )}
        </div>

        {/* Right Column - Main Content */}
        <div className="px-6 py-6 space-y-5">
          {/* Profile Summary */}
          {cvData.profile && (
            <section style={{ pageBreakAfter: 'avoid', breakAfter: 'avoid' }}>
              <h2 className="text-lg uppercase tracking-wider pb-2 mb-3" style={{ color: colors.primaryMedium, borderBottom: `3px solid ${colors.primary}` }}>
                {t.profile}
              </h2>
              <p className="text-gray-700 text-xs leading-relaxed">{cvData.profile}</p>
            </section>
          )}

          {/* Work Experience */}
          {cvData.workExperience.some((exp) => exp.position || exp.company) && (
            <section>
              <h2 className="text-lg uppercase tracking-wider pb-2 mb-3 flex items-center gap-2" style={{ color: colors.primaryMedium, borderBottom: `3px solid ${colors.primary}` }}>
                <Briefcase size={18} />
                {t.workExperience}
              </h2>
              <div className="space-y-4">
                {cvData.workExperience
                  .filter((exp) => exp.position || exp.company)
                  .map((job, index) => (
                    <div 
                      key={index} 
                      className="relative pl-4" 
                      style={{ 
                        borderLeft: `2px solid ${colors.primaryLighter}`,
                        pageBreakInside: 'avoid',
                        breakInside: 'avoid'
                      }}
                    >
                      <div className="absolute w-2.5 h-2.5 rounded-full -left-[6px] top-1" style={{ background: colors.primary }}></div>
                      <h3 className="text-sm" style={{ color: colors.primaryMedium }}>{job.position}</h3>
                      <p className="text-gray-700 text-xs">
                        {job.company}
                        {job.location && ` • ${job.location}`}
                      </p>
                      <p className="text-[10px] text-gray-500 mb-1">
                        {formatDate(job.startDate)} - {job.current ? t.present : formatDate(job.endDate)}
                      </p>
                      {job.responsibilities && (
                        <p className="text-xs text-gray-700 whitespace-pre-line leading-snug">{job.responsibilities}</p>
                      )}
                    </div>
                  ))}
              </div>
            </section>
          )}

          {/* Education */}
          {cvData.education.some((edu) => edu.degree || edu.school) && (
            <section>
              <h2 className="text-lg uppercase tracking-wider pb-2 mb-3 flex items-center gap-2" style={{ color: colors.primaryMedium, borderBottom: `3px solid ${colors.primary}` }}>
                <GraduationCap size={18} />
                {t.education}
              </h2>
              <div className="space-y-3">
                {cvData.education
                  .filter((edu) => edu.degree || edu.school)
                  .map((edu, index) => (
                    <div 
                      key={index} 
                      className="relative pl-4" 
                      style={{ 
                        borderLeft: `2px solid ${colors.primaryLighter}`,
                        pageBreakInside: 'avoid',
                        breakInside: 'avoid'
                      }}
                    >
                      <div className="absolute w-2.5 h-2.5 rounded-full -left-[6px] top-1" style={{ background: colors.primary }}></div>
                      <h3 className="text-sm" style={{ color: colors.primaryMedium }}>{edu.degree}</h3>
                      <p className="text-gray-700 text-xs">{edu.school}</p>
                      <p className="text-[10px] text-gray-500">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </p>
                      {edu.details && <p className="text-xs text-gray-700 mt-1 leading-snug">{edu.details}</p>}
                    </div>
                  ))}
              </div>
            </section>
          )}

          {/* Additional Custom Sections in Main Content */}
          {cvData.customSections && cvData.customSections.length > 1 && (
            <>
              {cvData.customSections.slice(1).map((section, index) => (
                section.title && section.content && (
                  <section key={index} style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
                    <h2 className="text-lg uppercase tracking-wider pb-2 mb-3" style={{ color: colors.primaryMedium, borderBottom: `3px solid ${colors.primary}` }}>
                      {section.title}
                    </h2>
                    <div className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {section.content}
                    </div>
                  </section>
                )
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
