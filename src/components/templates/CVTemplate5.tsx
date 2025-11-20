import { CVData, useLanguage } from "../../App";
import { Mail, Phone, MapPin, Linkedin, Globe, Facebook, MessageCircle } from "lucide-react";
import { getColorPalette } from "./colorUtils";

interface CVTemplate5Props {
  cvData: CVData;
  customColor?: string;
}

export function CVTemplate5({ cvData, customColor = "#0891b2" }: CVTemplate5Props) {
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
      {/* Header with Modern Design */}
      <div 
        className="text-white px-6 py-5" 
        style={{ 
          background: colors.gradient,
          pageBreakAfter: 'avoid',
          breakAfter: 'avoid'
        }}
      >
        <div className="flex items-start gap-5">
          {/* Photo */}
          {cvData.personalInfo.photo && (
            <div className="flex-shrink-0">
              <img
                src={cvData.personalInfo.photo}
                alt={cvData.personalInfo.fullName}
                className="w-28 h-28 rounded-lg object-cover border-4 border-white shadow-lg"
              />
            </div>
          )}
          
          {/* Name and Title */}
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl mb-1 truncate">{cvData.personalInfo.fullName}</h1>
            <p className="text-lg mb-3 truncate" style={{ color: colors.primarySemiLight }}>{cvData.personalInfo.title}</p>
            
            {/* Contact Info - Horizontal Layout */}
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs">
              {cvData.personalInfo.email && (
                <div className="flex items-center gap-1.5">
                  <Mail size={12} />
                  <span className="truncate">{cvData.personalInfo.email}</span>
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
                  <span className="truncate">{cvData.personalInfo.location}</span>
                </div>
              )}
              {cvData.personalInfo.linkedin && (
                <div className="flex items-center gap-1.5">
                  <Linkedin size={12} />
                  <span className="truncate">{cvData.personalInfo.linkedinLabel}: {cvData.personalInfo.linkedin}</span>
                </div>
              )}
              {cvData.personalInfo.website && (
                <div className="flex items-center gap-1.5">
                  <Globe size={12} />
                  <span className="truncate">{cvData.personalInfo.websiteLabel}: {cvData.personalInfo.website}</span>
                </div>
              )}
              {cvData.personalInfo.facebook && (
                <div className="flex items-center gap-1.5">
                  <Facebook size={12} />
                  <span className="truncate">{cvData.personalInfo.facebookLabel}: {cvData.personalInfo.facebook}</span>
                </div>
              )}
              {cvData.personalInfo.zalo && (
                <div className="flex items-center gap-1.5">
                  <MessageCircle size={12} />
                  <span className="truncate">{cvData.personalInfo.zaloLabel}: {cvData.personalInfo.zalo}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="grid grid-cols-3 gap-5 px-6 py-5">
        {/* Left Column - Main Content */}
        <div className="col-span-2 space-y-4">
          {/* Profile Summary */}
          {cvData.profile && (
            <section>
              <h2 className="text-lg pl-2 mb-2" style={{ color: colors.secondary, borderLeft: `4px solid ${colors.secondary}` }}>{t.profile.toUpperCase()}</h2>
              <p className="text-gray-700 text-xs leading-snug">{cvData.profile}</p>
            </section>
          )}

          {/* Work Experience */}
          {cvData.workExperience.some((exp) => exp.position || exp.company) && (
            <section>
              <h2 className="text-lg pl-2 mb-2" style={{ color: colors.secondary, borderLeft: `4px solid ${colors.secondary}` }}>{t.workExperience.toUpperCase()}</h2>
              <div className="space-y-3">
                {cvData.workExperience
                  .filter((exp) => exp.position || exp.company)
                  .map((job, index) => (
                    <div 
                      key={index} 
                      className="border-l-2 border-gray-200 pl-3"
                      style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}
                    >
                      <h3 className="text-sm" style={{ color: colors.secondary }}>{job.position}</h3>
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
              <h2 className="text-lg pl-2 mb-2" style={{ color: colors.secondary, borderLeft: `4px solid ${colors.secondary}` }}>{t.education.toUpperCase()}</h2>
              <div className="space-y-2">
                {cvData.education
                  .filter((edu) => edu.degree || edu.school)
                  .map((edu, index) => (
                    <div 
                      key={index} 
                      className="border-l-2 border-gray-200 pl-3"
                      style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}
                    >
                      <h3 className="text-sm" style={{ color: colors.secondary }}>{edu.degree}</h3>
                      <p className="text-gray-700 text-xs">{edu.school}</p>
                      <p className="text-[10px] text-gray-500">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </p>
                      {edu.details && <p className="text-xs text-gray-700 mt-0.5 leading-snug">{edu.details}</p>}
                    </div>
                  ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column - Skills & Additional Info */}
        <div className="space-y-4">
          {/* Technical Skills */}
          {cvData.skills.technical.some((skill) => skill) && (
            <section style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
              <h2 className="text-sm pb-1 mb-2" style={{ color: colors.secondary, borderBottom: `2px solid ${colors.secondary}` }}>{t.technicalSkills.toUpperCase()}</h2>
              <div className="flex flex-wrap gap-1">
                {cvData.skills.technical
                  .filter((skill) => skill)
                  .map((skill, index) => (
                    <span key={index} className="px-1.5 py-0.5 rounded text-[10px]" style={{ background: colors.primaryUltraLight, color: colors.primaryMedium, border: `1px solid ${colors.primaryLighter}` }}>
                      {skill}
                    </span>
                  ))}
              </div>
            </section>
          )}

          {/* Soft Skills */}
          {cvData.skills.soft.some((skill) => skill) && (
            <section style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
              <h2 className="text-sm pb-1 mb-2" style={{ color: colors.secondary, borderBottom: `2px solid ${colors.secondary}` }}>{t.softSkills.toUpperCase()}</h2>
              <ul className="space-y-0.5">
                {cvData.skills.soft
                  .filter((skill) => skill)
                  .map((skill, index) => (
                    <li key={index} className="flex items-center gap-1.5 text-gray-700 text-xs">
                      <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: colors.secondary }}></div>
                      {skill}
                    </li>
                  ))}
              </ul>
            </section>
          )}

          {/* Languages */}
          {cvData.languages.some((lang) => lang.name) && (
            <section style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
              <h2 className="text-sm pb-1 mb-2" style={{ color: colors.secondary, borderBottom: `2px solid ${colors.secondary}` }}>{t.languages.toUpperCase()}</h2>
              <div className="space-y-1.5">
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
              <h2 className="text-sm pb-1 mb-2" style={{ color: colors.secondary, borderBottom: `2px solid ${colors.secondary}` }}>{t.certifications.toUpperCase()}</h2>
              <ul className="space-y-1">
                {cvData.certifications
                  .filter((cert) => cert)
                  .map((cert, index) => (
                    <li key={index} className="flex items-start gap-1.5 text-gray-700 text-xs">
                      <div className="w-1 h-1 rounded-full mt-1 flex-shrink-0" style={{ background: colors.secondary }}></div>
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
                  <section key={index} style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
                    <h2 className="text-base pb-1 mb-2" style={{ color: colors.primaryMedium, borderBottom: `2px solid ${colors.secondary}` }}>
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
