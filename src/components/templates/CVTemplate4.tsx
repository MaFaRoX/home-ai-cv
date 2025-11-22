import { CVData, useLanguage } from "../../App";
import { Mail, Phone, MapPin, Linkedin, Globe, Circle, Facebook, MessageCircle } from "lucide-react";
import { getColorPalette } from "./colorUtils";

interface CVTemplate4Props {
  cvData: CVData;
  customColor?: string;
}

export function CVTemplate4({ cvData, customColor = "#16a34a" }: CVTemplate4Props) {
  const { t } = useLanguage();
  const colors = getColorPalette(customColor);
  
  const formatDate = (date: string) => {
    if (!date) return "";
    return date;
  };

  return (
    <div 
      className="bg-white mx-auto p-6" 
      style={{ 
        width: '210mm', 
        minHeight: '297mm',
        pageBreakInside: 'avoid',
        breakInside: 'avoid'
      }}
    >
      {/* Header */}
      <div 
        className="flex items-start justify-between mb-5 pb-4" 
        style={{ 
          borderBottom: `2px solid ${colors.primary}`,
          pageBreakAfter: 'avoid',
          breakAfter: 'avoid'
        }}
      >
        <div className="flex-1">
          <h1 className="text-4xl text-gray-900 mb-1">{cvData.personalInfo.fullName}</h1>
          <p className="text-xl mb-3" style={{ color: colors.secondary }}>{cvData.personalInfo.title}</p>
          
          {/* Contact Info */}
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-600">
            {cvData.personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail size={12} style={{ color: colors.secondary }} />
                <span>{cvData.personalInfo.email}</span>
              </div>
            )}
            {cvData.personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone size={12} style={{ color: colors.secondary }} />
                <span>{cvData.personalInfo.phone}</span>
              </div>
            )}
            {cvData.personalInfo.location && (
              <div className="flex items-center gap-1">
                <MapPin size={12} style={{ color: colors.secondary }} />
                <span>{cvData.personalInfo.location}</span>
              </div>
            )}
            {cvData.personalInfo.linkedin && (
              <div className="flex items-center gap-1">
                <Linkedin size={12} style={{ color: colors.secondary }} />
                <span>{cvData.personalInfo.linkedinLabel}: {cvData.personalInfo.linkedin}</span>
              </div>
            )}
            {cvData.personalInfo.website && (
              <div className="flex items-center gap-1">
                <Globe size={12} style={{ color: colors.secondary }} />
                <span>{cvData.personalInfo.websiteLabel}: {cvData.personalInfo.website}</span>
              </div>
            )}
            {cvData.personalInfo.facebook && (
              <div className="flex items-center gap-1">
                <Facebook size={12} style={{ color: colors.secondary }} />
                <span>{cvData.personalInfo.facebookLabel}: {cvData.personalInfo.facebook}</span>
              </div>
            )}
          </div>
        </div>

        {/* Photo */}
        {cvData.personalInfo.photo && (
          <div className="ml-4 flex-shrink-0">
            <img
              src={cvData.personalInfo.photo}
              alt={cvData.personalInfo.fullName}
              className="w-24 h-24 rounded object-cover border-2"
              style={{ borderColor: colors.secondary }}
            />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-5">
        {/* Left Column */}
        <div className="col-span-2 space-y-4">
          {/* Profile */}
          {cvData.profile && (
            <section>
              <h2 className="text-lg mb-2 flex items-center gap-2" style={{ color: colors.secondary }}>
                <Circle size={8} style={{ fill: colors.secondary, color: colors.secondary }} />
                {t.profile.toUpperCase()}
              </h2>
              <p className="text-gray-700 leading-snug text-xs pl-4">{cvData.profile}</p>
            </section>
          )}

          {/* Work Experience */}
          {cvData.workExperience.some((exp) => exp.position || exp.company) && (
            <section>
              <h2 className="text-lg mb-2 flex items-center gap-2" style={{ color: colors.secondary }}>
                <Circle size={8} style={{ fill: colors.secondary, color: colors.secondary }} />
                {t.workExperience.toUpperCase()}
              </h2>
              <div className="space-y-3 pl-4">
                {cvData.workExperience
                  .filter((exp) => exp.position || exp.company)
                  .map((job, index) => (
                    <div 
                      key={index}
                      style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}
                    >
                      <h3 className="text-sm" style={{ color: colors.primaryMedium }}>{job.position}</h3>
                      <p className="text-gray-700 text-xs">
                        {job.company}
                        {job.location && ` - ${job.location}`}
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
              <h2 className="text-lg mb-2 flex items-center gap-2" style={{ color: colors.secondary }}>
                <Circle size={8} style={{ fill: colors.secondary, color: colors.secondary }} />
                {t.education.toUpperCase()}
              </h2>
              <div className="space-y-2 pl-4">
                {cvData.education
                  .filter((edu) => edu.degree || edu.school)
                  .map((edu, index) => (
                    <div 
                      key={index}
                      style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}
                    >
                      <h3 className="text-sm" style={{ color: colors.primaryMedium }}>{edu.degree}</h3>
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

        {/* Right Column */}
        <div className="space-y-4">
          {/* Technical Skills */}
          {cvData.skills.technical.some((skill) => skill) && (
            <section style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
              <h2 className="text-sm mb-2 flex items-center gap-1" style={{ color: colors.secondary }}>
                <Circle size={6} style={{ fill: colors.secondary, color: colors.secondary }} />
                {t.technicalSkills.toUpperCase()}
              </h2>
              <div className="flex flex-wrap gap-1 pl-3">
                {cvData.skills.technical
                  .filter((skill) => skill)
                  .map((skill, index) => (
                    <span key={index} className="px-2 py-0.5 rounded text-[10px]" style={{ background: colors.primaryUltraLight, color: colors.primaryMedium }}>
                      {skill}
                    </span>
                  ))}
              </div>
            </section>
          )}

          {/* Soft Skills */}
          {cvData.skills.soft.some((skill) => skill) && (
            <section style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
              <h2 className="text-sm mb-2 flex items-center gap-1" style={{ color: colors.secondary }}>
                <Circle size={6} style={{ fill: colors.secondary, color: colors.secondary }} />
                {t.softSkills.toUpperCase()}
              </h2>
              <ul className="space-y-0.5 pl-3">
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
              <h2 className="text-sm mb-2 flex items-center gap-1" style={{ color: colors.secondary }}>
                <Circle size={6} style={{ fill: colors.secondary, color: colors.secondary }} />
                {t.languages.toUpperCase()}
              </h2>
              <div className="space-y-1.5 pl-3">
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
              <h2 className="text-sm mb-2 flex items-center gap-1" style={{ color: colors.secondary }}>
                <Circle size={6} style={{ fill: colors.secondary, color: colors.secondary }} />
                {t.certifications.toUpperCase()}
              </h2>
              <ul className="space-y-1 pl-3">
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
                    <h2 className="text-sm text-green-700 mb-2 flex items-center gap-1">
                      <Circle size={6} className="fill-green-600 text-green-600" />
                      {section.title.toUpperCase()}
                    </h2>
                    <div className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap pl-3">
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
