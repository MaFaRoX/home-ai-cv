import { CVData, useLanguage } from "../../App";
import { Mail, Phone, MapPin, Linkedin, Globe, Briefcase, GraduationCap, Award, Languages, Facebook, MessageCircle } from "lucide-react";
import { getColorPalette } from "./colorUtils";

interface CVTemplate8Props {
  cvData: CVData;
  customColor?: string;
}

export function CVTemplate8({ cvData, customColor = "#0d9488" }: CVTemplate8Props) {
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
      {/* Top Section - Centered Design with Large Photo */}
      <div 
        className="relative text-center px-8 py-8" 
        style={{ 
          height: '110mm', 
          background: `linear-gradient(to bottom, ${colors.primaryVeryLight}, white)`,
          pageBreakAfter: 'avoid',
          breakAfter: 'avoid'
        }}
      >
        {/* Large Circular Photo */}
        {cvData.personalInfo.photo && (
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-xl opacity-40" style={{ background: colors.primary }}></div>
              <img
                src={cvData.personalInfo.photo}
                alt={cvData.personalInfo.fullName}
                className="relative w-36 h-36 rounded-full border-4 object-cover shadow-2xl"
                style={{ borderColor: colors.primary }}
              />
            </div>
          </div>
        )}
        
        {/* Name & Title */}
        <h1 className="text-4xl mb-2" style={{ color: colors.primaryDark }}>{cvData.personalInfo.fullName}</h1>
        <p className="text-xl mb-5" style={{ color: colors.primary }}>{cvData.personalInfo.title}</p>
        
        {/* Contact Info - Horizontal */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-600 mb-4">
          {cvData.personalInfo.email && (
            <div className="flex items-center gap-1.5">
              <Mail size={14} style={{ color: colors.primary }} />
              <span>{cvData.personalInfo.email}</span>
            </div>
          )}
          {cvData.personalInfo.phone && (
            <div className="flex items-center gap-1.5">
              <Phone size={14} style={{ color: colors.primary }} />
              <span>{cvData.personalInfo.phone}</span>
            </div>
          )}
          {cvData.personalInfo.location && (
            <div className="flex items-center gap-1.5">
              <MapPin size={14} style={{ color: colors.primary }} />
              <span>{cvData.personalInfo.location}</span>
            </div>
          )}
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs text-gray-500">
          {cvData.personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin size={12} style={{ color: colors.primary }} />
              <span>{cvData.personalInfo.linkedin}</span>
            </div>
          )}
          {cvData.personalInfo.website && (
            <div className="flex items-center gap-1">
              <Globe size={12} style={{ color: colors.primary }} />
              <span>{cvData.personalInfo.website}</span>
            </div>
          )}
          {cvData.personalInfo.facebook && (
            <div className="flex items-center gap-1">
              <Facebook size={12} style={{ color: colors.primary }} />
              <span>{cvData.personalInfo.facebook}</span>
            </div>
          )}
        </div>

        {/* Profile - Centered */}
        {cvData.profile && (
          <div className="mt-5 max-w-4xl mx-auto">
            <p className="text-sm text-gray-700 leading-relaxed text-center">{cvData.profile}</p>
          </div>
        )}
      </div>

      {/* Bottom Section - Three Columns */}
      <div className="grid grid-cols-3 gap-5 px-8 py-6">
        {/* Left Column - Work Experience */}
        <div className="col-span-1 space-y-4">
          {cvData.workExperience.some((exp) => exp.position || exp.company) && (
            <section>
              <h2 className="text-base pb-2 mb-3 flex items-center gap-2" style={{ borderBottom: `2px solid ${colors.primary}`, color: colors.primaryDark }}>
                <Briefcase size={16} />
                {t.workExperience}
              </h2>
              <div className="space-y-3">
                {cvData.workExperience
                  .filter((exp) => exp.position || exp.company)
                  .slice(0, 3)
                  .map((job, index) => (
                    <div 
                      key={index}
                      style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}
                    >
                      <h3 className="text-xs" style={{ color: colors.primaryDark }}>{job.position}</h3>
                      <p className="text-xs text-gray-600">{job.company}</p>
                      <p className="text-[10px] text-gray-500 mb-1">
                        {formatDate(job.startDate)} - {job.current ? t.present : formatDate(job.endDate)}
                      </p>
                      {job.responsibilities && (
                        <p className="text-[10px] text-gray-700 line-clamp-3 leading-snug">{job.responsibilities.split('\n')[0]}</p>
                      )}
                    </div>
                  ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {cvData.skills.technical.some((skill) => skill) && (
            <section style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
              <h2 className="text-sm pb-2 mb-2" style={{ borderBottom: `2px solid ${colors.primary}`, color: colors.primaryDark }}>{t.technicalSkills}</h2>
              <div className="flex flex-wrap gap-1">
                {cvData.skills.technical
                  .filter((skill) => skill)
                  .slice(0, 8)
                  .map((skill, index) => (
                    <span key={index} className="px-1.5 py-0.5 rounded text-[10px]" style={{ background: colors.primaryVeryLight, color: colors.primaryDark }}>
                      {skill}
                    </span>
                  ))}
              </div>
            </section>
          )}
        </div>

        {/* Middle Column - Education & Languages */}
        <div className="col-span-1 space-y-4">
          {cvData.education.some((edu) => edu.degree || edu.school) && (
            <section>
              <h2 className="text-base pb-2 mb-3 flex items-center gap-2" style={{ borderBottom: `2px solid ${colors.primary}`, color: colors.primaryDark }}>
                <GraduationCap size={16} />
                {t.education}
              </h2>
              <div className="space-y-3">
                {cvData.education
                  .filter((edu) => edu.degree || edu.school)
                  .map((edu, index) => (
                    <div 
                      key={index}
                      style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}
                    >
                      <h3 className="text-xs" style={{ color: colors.primaryDark }}>{edu.degree}</h3>
                      <p className="text-xs text-gray-600">{edu.school}</p>
                      <p className="text-[10px] text-gray-500 mb-1">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </p>
                      {edu.details && (
                        <p className="text-[10px] text-gray-700 line-clamp-2 leading-snug">{edu.details}</p>
                      )}
                    </div>
                  ))}
              </div>
            </section>
          )}

          {cvData.languages.some((lang) => lang.name) && (
            <section style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
              <h2 className="text-sm pb-2 mb-2 flex items-center gap-1.5" style={{ borderBottom: `2px solid ${colors.primary}`, color: colors.primaryDark }}>
                <Languages size={14} />
                {t.languages}
              </h2>
              <div className="space-y-1.5">
                {cvData.languages
                  .filter((lang) => lang.name)
                  .map((lang, index) => (
                    <div key={index}>
                      <p className="text-xs text-gray-700">{lang.name}</p>
                      {lang.level && <p className="text-[10px] text-gray-500">{lang.level}</p>}
                    </div>
                  ))}
              </div>
            </section>
          )}

          {cvData.skills.soft.some((skill) => skill) && (
            <section style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
              <h2 className="text-sm pb-2 mb-2" style={{ borderBottom: `2px solid ${colors.primary}`, color: colors.primaryDark }}>{t.softSkills}</h2>
              <ul className="space-y-1">
                {cvData.skills.soft
                  .filter((skill) => skill)
                  .slice(0, 6)
                  .map((skill, index) => (
                    <li key={index} className="flex items-center gap-1.5 text-gray-700 text-xs">
                      <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: colors.primary }}></div>
                      {skill}
                    </li>
                  ))}
              </ul>
            </section>
          )}
        </div>

        {/* Right Column - Certifications & Custom */}
        <div className="col-span-1 space-y-4">
          {cvData.certifications.some((cert) => cert) && (
            <section style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
              <h2 className="text-sm pb-2 mb-2 flex items-center gap-1.5" style={{ borderBottom: `2px solid ${colors.primary}`, color: colors.primaryDark }}>
                <Award size={14} />
                {t.certifications}
              </h2>
              <ul className="space-y-1.5">
                {cvData.certifications
                  .filter((cert) => cert)
                  .map((cert, index) => (
                    <li key={index} className="flex items-start gap-1.5 text-gray-700 text-xs">
                      <div className="w-1 h-1 rounded-full mt-1 flex-shrink-0" style={{ background: colors.primary }}></div>
                      <span className="leading-snug">{cert}</span>
                    </li>
                  ))}
              </ul>
            </section>
          )}

          {cvData.customSections && cvData.customSections.length > 0 && (
            <>
              {cvData.customSections.map((section, index) => (
                section.title && section.content && (
                  <section key={index} style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
                    <h2 className="text-sm pb-2 mb-2" style={{ borderBottom: `2px solid ${colors.primary}`, color: colors.primaryDark }}>
                      {section.title}
                    </h2>
                    <p className="text-xs text-gray-700 whitespace-pre-line leading-snug line-clamp-6">
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
  );
}
