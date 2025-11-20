import { CVData, useLanguage } from "../../App";
import { Mail, Phone, MapPin, Linkedin, Globe, Briefcase, GraduationCap, Award, Languages, Facebook, MessageCircle } from "lucide-react";
import { getColorPalette } from "./colorUtils";

interface CVTemplate2Props {
  cvData: CVData;
  customColor?: string;
}

export function CVTemplate2({ cvData, customColor = "#9333ea" }: CVTemplate2Props) {
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
        display: 'flex',
        pageBreakInside: 'avoid',
        breakInside: 'avoid'
      }}
    >
      {/* Left Sidebar */}
      <div 
        className="text-white p-5" 
        style={{ 
          width: '80mm', 
          background: `linear-gradient(to bottom, ${colors.primary}, ${colors.primaryDark})`,
          pageBreakInside: 'avoid',
          breakInside: 'avoid'
        }}
      >
        {/* Photo */}
        {cvData.personalInfo.photo && (
          <div className="mb-4">
            <img
              src={cvData.personalInfo.photo}
              alt={cvData.personalInfo.fullName}
              className="w-full aspect-square object-cover rounded-lg border-4 border-white shadow-lg"
            />
          </div>
        )}

        {/* Contact */}
        <section className="mb-4" style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
          <h2 className="text-sm pb-1 mb-2" style={{ borderBottom: `2px solid ${colors.primaryLighter}` }}>{t.contact.toUpperCase()}</h2>
          <div className="space-y-1.5 text-xs">
            {cvData.personalInfo.email && (
              <div className="flex items-start gap-1.5">
                <Mail size={12} className="mt-0.5 flex-shrink-0" />
                <span className="break-all">{cvData.personalInfo.email}</span>
              </div>
            )}
            {cvData.personalInfo.phone && (
              <div className="flex items-center gap-1.5">
                <Phone size={12} className="flex-shrink-0" />
                <span>{cvData.personalInfo.phone}</span>
              </div>
            )}
            {cvData.personalInfo.location && (
              <div className="flex items-start gap-1.5">
                <MapPin size={12} className="mt-0.5 flex-shrink-0" />
                <span>{cvData.personalInfo.location}</span>
              </div>
            )}
            {cvData.personalInfo.linkedin && (
              <div className="flex items-start gap-1.5">
                <Linkedin size={12} className="mt-0.5 flex-shrink-0" />
                <span className="break-all">{cvData.personalInfo.linkedinLabel}: {cvData.personalInfo.linkedin}</span>
              </div>
            )}
            {cvData.personalInfo.website && (
              <div className="flex items-start gap-1.5">
                <Globe size={12} className="mt-0.5 flex-shrink-0" />
                <span className="break-all">{cvData.personalInfo.websiteLabel}: {cvData.personalInfo.website}</span>
              </div>
            )}
            {cvData.personalInfo.facebook && (
              <div className="flex items-start gap-1.5">
                <Facebook size={12} className="mt-0.5 flex-shrink-0" />
                <span className="break-all">{cvData.personalInfo.facebookLabel}: {cvData.personalInfo.facebook}</span>
              </div>
            )}
            {cvData.personalInfo.zalo && (
              <div className="flex items-start gap-1.5">
                <MessageCircle size={12} className="mt-0.5 flex-shrink-0" />
                <span className="break-all">{cvData.personalInfo.zaloLabel}: {cvData.personalInfo.zalo}</span>
              </div>
            )}
          </div>
        </section>

        {/* Technical Skills */}
        {cvData.skills.technical.some((skill) => skill) && (
          <section className="mb-4" style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
            <h2 className="text-sm pb-1 mb-2" style={{ borderBottom: `2px solid ${colors.primaryLighter}` }}>{t.technicalSkills.toUpperCase()}</h2>
            <div className="flex flex-wrap gap-1">
              {cvData.skills.technical
                .filter((skill) => skill)
                .map((skill, index) => (
                  <span key={index} className="px-1.5 py-0.5 rounded text-[10px]" style={{ background: colors.primaryUltraLight, color: colors.primaryMedium }}>
                    {skill}
                  </span>
                ))}
            </div>
          </section>
        )}

        {/* Soft Skills */}
        {cvData.skills.soft.some((skill) => skill) && (
          <section className="mb-4" style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
            <h2 className="text-sm pb-1 mb-2" style={{ borderBottom: `2px solid ${colors.primaryLighter}` }}>{t.softSkills.toUpperCase()}</h2>
            <ul className="space-y-0.5">
              {cvData.skills.soft
                .filter((skill) => skill)
                .map((skill, index) => (
                  <li key={index} className="flex items-center gap-1.5 text-xs">
                    <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: colors.primaryLighter }}></div>
                    {skill}
                  </li>
                ))}
            </ul>
          </section>
        )}

        {/* Languages */}
        {cvData.languages.some((lang) => lang.name) && (
          <section className="mb-4" style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
            <h2 className="text-sm pb-1 mb-2 flex items-center gap-1" style={{ borderBottom: `2px solid ${colors.primaryLighter}` }}>
              <Languages size={12} />
              {t.languages.toUpperCase()}
            </h2>
            <div className="space-y-1">
              {cvData.languages
                .filter((lang) => lang.name)
                .map((lang, index) => (
                  <div key={index}>
                    <p className="text-xs">{lang.name}</p>
                    {lang.level && <p className="text-[10px]" style={{ color: colors.primarySemiLight }}>{lang.level}</p>}
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {cvData.certifications.some((cert) => cert) && (
          <section style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
            <h2 className="text-sm pb-1 mb-2 flex items-center gap-1" style={{ borderBottom: `2px solid ${colors.primaryLighter}` }}>
              <Award size={12} />
              {t.certifications.toUpperCase()}
            </h2>
            <ul className="space-y-1">
              {cvData.certifications
                .filter((cert) => cert)
                .map((cert, index) => (
                  <li key={index} className="flex items-start gap-1.5 text-xs">
                    <div className="w-1 h-1 rounded-full mt-1 flex-shrink-0" style={{ background: colors.primaryLighter }}></div>
                    <span className="leading-snug">{cert}</span>
                  </li>
                ))}
            </ul>
          </section>
        )}
      </div>

      {/* Right Main Content */}
      <div className="flex-1 p-5">
        {/* Header */}
        <div 
          className="mb-5 pb-3" 
          style={{ 
            borderBottom: `2px solid ${colors.secondary}`,
            pageBreakAfter: 'avoid',
            breakAfter: 'avoid'
          }}
        >
          <h1 className="text-3xl mb-1" style={{ color: colors.primaryMedium }}>{cvData.personalInfo.fullName}</h1>
          <p className="text-lg" style={{ color: colors.secondary }}>{cvData.personalInfo.title}</p>
        </div>

        <div className="space-y-4">
          {/* Profile */}
          {cvData.profile && (
            <section style={{ pageBreakAfter: 'avoid', breakAfter: 'avoid' }}>
              <h2 className="text-lg pb-1 mb-2" style={{ color: colors.secondary, borderBottom: `1px solid ${colors.primaryLighter}` }}>{t.profile}</h2>
              <p className="text-gray-700 leading-snug text-xs">{cvData.profile}</p>
            </section>
          )}

          {/* Work Experience */}
          {cvData.workExperience.some((exp) => exp.position || exp.company) && (
            <section>
              <h2 className="text-lg pb-1 mb-2 flex items-center gap-2" style={{ color: colors.secondary, borderBottom: `1px solid ${colors.primaryLighter}` }}>
                <Briefcase size={16} />
                {t.workExperience}
              </h2>
              <div className="space-y-3">
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
              <h2 className="text-lg pb-1 mb-2 flex items-center gap-2" style={{ color: colors.secondary, borderBottom: `1px solid ${colors.primaryLighter}` }}>
                <GraduationCap size={16} />
                {t.education}
              </h2>
              <div className="space-y-2">
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

          {/* Custom Sections */}
          {cvData.customSections && cvData.customSections.length > 0 && (
            <>
              {cvData.customSections.map((section, index) => (
                section.title && section.content && (
                  <section key={index} style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
                    <h2 className="text-lg pb-1 mb-2" style={{ color: colors.secondary, borderBottom: `1px solid ${colors.primaryLighter}` }}>
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
