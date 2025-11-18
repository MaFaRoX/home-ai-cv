import { CVData, useLanguage } from "../../App";
import { Mail, Phone, MapPin, Linkedin, Globe, Briefcase, GraduationCap, Award, Languages, Facebook, MessageCircle } from "lucide-react";
import { getColorPalette } from "./colorUtils";

interface CVTemplate1Props {
  cvData: CVData;
  customColor?: string;
}

export function CVTemplate1({ cvData, customColor = "#2563eb" }: CVTemplate1Props) {
  const { t } = useLanguage();
  const colors = getColorPalette(customColor);
  
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    return `${month}/${year}`;
  };

  return (
    <div className="bg-white mx-auto" style={{ width: '210mm', height: '297mm', overflow: 'hidden' }}>
      {/* Header */}
      <div className="text-white px-6 py-5" style={{ background: colors.gradient }}>
        <div className="flex items-center gap-4">
          {cvData.personalInfo.photo && (
            <img
              src={cvData.personalInfo.photo}
              alt={cvData.personalInfo.fullName}
              className="w-24 h-24 rounded-full border-4 border-white object-cover flex-shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl mb-1 truncate">{cvData.personalInfo.fullName}</h1>
            <p className="text-lg opacity-90 mb-2 truncate">{cvData.personalInfo.title}</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
              {cvData.personalInfo.email && (
                <div className="flex items-center gap-1.5 truncate">
                  <Mail size={12} className="flex-shrink-0" />
                  <span className="truncate">{cvData.personalInfo.email}</span>
                </div>
              )}
              {cvData.personalInfo.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone size={12} className="flex-shrink-0" />
                  <span>{cvData.personalInfo.phone}</span>
                </div>
              )}
              {cvData.personalInfo.location && (
                <div className="flex items-center gap-1.5 truncate">
                  <MapPin size={12} className="flex-shrink-0" />
                  <span className="truncate">{cvData.personalInfo.location}</span>
                </div>
              )}
              {cvData.personalInfo.linkedin && (
                <div className="flex items-center gap-1.5 truncate">
                  <Linkedin size={12} className="flex-shrink-0" />
                  <span className="truncate">{cvData.personalInfo.linkedinLabel}: {cvData.personalInfo.linkedin}</span>
                </div>
              )}
              {cvData.personalInfo.website && (
                <div className="flex items-center gap-1.5 truncate">
                  <Globe size={12} className="flex-shrink-0" />
                  <span className="truncate">{cvData.personalInfo.websiteLabel}: {cvData.personalInfo.website}</span>
                </div>
              )}
              {cvData.personalInfo.facebook && (
                <div className="flex items-center gap-1.5 truncate">
                  <Facebook size={12} className="flex-shrink-0" />
                  <span className="truncate">{cvData.personalInfo.facebookLabel}: {cvData.personalInfo.facebook}</span>
                </div>
              )}
              {cvData.personalInfo.zalo && (
                <div className="flex items-center gap-1.5 truncate">
                  <MessageCircle size={12} className="flex-shrink-0" />
                  <span className="truncate">{cvData.personalInfo.zaloLabel}: {cvData.personalInfo.zalo}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 px-6 py-5" style={{ height: 'calc(297mm - 130px)' }}>
        {/* Left Column - Main Content */}
        <div className="col-span-2 space-y-4 overflow-hidden">
          {/* Profile */}
          {cvData.profile && (
            <section>
              <h2 className="text-lg pb-1 mb-2" style={{ borderBottom: `2px solid ${colors.primary}` }}>{t.profile}</h2>
              <p className="text-gray-700 leading-snug text-xs">{cvData.profile}</p>
            </section>
          )}

          {/* Work Experience */}
          {cvData.workExperience.some((exp) => exp.position || exp.company) && (
            <section>
              <h2 className="text-lg pb-1 mb-2 flex items-center gap-2" style={{ borderBottom: `2px solid ${colors.primary}` }}>
                <Briefcase size={16} />
                {t.workExperience}
              </h2>
              <div className="space-y-3">
                {cvData.workExperience
                  .filter((exp) => exp.position || exp.company)
                  .map((job, index) => (
                    <div key={index} className="relative pl-3" style={{ borderLeft: `2px solid ${colors.primaryLight}` }}>
                      <div className="absolute w-2 h-2 rounded-full -left-[5px] top-1" style={{ background: colors.primary }}></div>
                      <div className="mb-1">
                        <h3 className="text-sm" style={{ color: colors.primaryDark }}>{job.position}</h3>
                        <p className="text-gray-700 text-xs">
                          {job.company}
                          {job.location && ` - ${job.location}`}
                        </p>
                        <p className="text-[10px] text-gray-500">
                          {formatDate(job.startDate)} - {job.current ? t.present : formatDate(job.endDate)}
                        </p>
                      </div>
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
              <h2 className="text-lg pb-1 mb-2 flex items-center gap-2" style={{ borderBottom: `2px solid ${colors.primary}` }}>
                <GraduationCap size={16} />
                {t.education}
              </h2>
              <div className="space-y-2">
                {cvData.education
                  .filter((edu) => edu.degree || edu.school)
                  .map((edu, index) => (
                    <div key={index} className="relative pl-3" style={{ borderLeft: `2px solid ${colors.primaryLight}` }}>
                      <div className="absolute w-2 h-2 rounded-full -left-[5px] top-1" style={{ background: colors.primary }}></div>
                      <h3 className="text-sm" style={{ color: colors.primaryDark }}>{edu.degree}</h3>
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

        {/* Right Column - Sidebar */}
        <div className="space-y-4 overflow-hidden">
          {/* Technical Skills */}
          {cvData.skills.technical.some((skill) => skill) && (
            <section>
              <h2 className="text-sm pb-1 mb-2" style={{ borderBottom: `2px solid ${colors.primary}` }}>{t.technicalSkills}</h2>
              <div className="flex flex-wrap gap-1">
                {cvData.skills.technical
                  .filter((skill) => skill)
                  .map((skill, index) => (
                    <span key={index} className="px-2 py-0.5 rounded text-[10px]" style={{ background: colors.primaryVeryLight, color: colors.primaryDark }}>
                      {skill}
                    </span>
                  ))}
              </div>
            </section>
          )}

          {/* Soft Skills */}
          {cvData.skills.soft.some((skill) => skill) && (
            <section>
              <h2 className="text-sm pb-1 mb-2" style={{ borderBottom: `2px solid ${colors.primary}` }}>{t.softSkills}</h2>
              <ul className="space-y-0.5">
                {cvData.skills.soft
                  .filter((skill) => skill)
                  .map((skill, index) => (
                    <li key={index} className="flex items-center gap-1.5 text-gray-700 text-xs">
                      <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: colors.primary }}></div>
                      {skill}
                    </li>
                  ))}
              </ul>
            </section>
          )}

          {/* Languages */}
          {cvData.languages.some((lang) => lang.name) && (
            <section>
              <h2 className="text-sm pb-1 mb-2 flex items-center gap-1" style={{ borderBottom: `2px solid ${colors.primary}` }}>
                <Languages size={14} />
                {t.languages}
              </h2>
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
            <section>
              <h2 className="text-sm pb-1 mb-2 flex items-center gap-1" style={{ borderBottom: `2px solid ${colors.primary}` }}>
                <Award size={14} />
                {t.certifications}
              </h2>
              <ul className="space-y-1">
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

          {/* Custom Sections */}
          {cvData.customSections && cvData.customSections.length > 0 && (
            <>
              {cvData.customSections.map((section, index) => (
                section.title && section.content && (
                  <section key={index}>
                    <h2 className="text-sm pb-1 mb-2" style={{ borderBottom: `2px solid ${colors.primary}` }}>
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
