import { CVData, useLanguage } from "../../App";
import { Mail, Phone, MapPin, Linkedin, Globe, Briefcase, GraduationCap, Award, Languages, Facebook, MessageCircle } from "lucide-react";
import { getColorPalette } from "./colorUtils";

interface CVTemplate3Props {
  cvData: CVData;
  customColor?: string;
}

export function CVTemplate3({ cvData, customColor = "#ea580c" }: CVTemplate3Props) {
  const { t } = useLanguage();
  const colors = getColorPalette(customColor);
  
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    return `${month}/${year}`;
  };

  return (
    <div className="bg-white mx-auto" style={{ width: '210mm', height: '297mm', overflow: 'hidden' }}>
      {/* Header with Photo Background */}
      <div className="relative overflow-hidden" style={{ height: '140px', background: colors.gradient }}>
        {cvData.personalInfo.photo ? (
          <div className="absolute inset-0">
            <img
              src={cvData.personalInfo.photo}
              alt={cvData.personalInfo.fullName}
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${colors.primary}dd, ${colors.primaryDark}dd)` }}></div>
          </div>
        ) : null}
        <div className="relative z-10 h-full flex flex-col justify-center px-6 text-white">
          <h1 className="text-4xl mb-1">{cvData.personalInfo.fullName}</h1>
          <p className="text-xl opacity-90">{cvData.personalInfo.title}</p>
        </div>
      </div>

      {/* Contact Bar */}
      <div className="px-6 py-3" style={{ background: colors.primaryUltraLight }}>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs" style={{ color: colors.primaryDark }}>
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
          {cvData.personalInfo.linkedin && (
            <div className="flex items-center gap-1.5">
              <Linkedin size={12} />
              <span>{cvData.personalInfo.linkedinLabel}: {cvData.personalInfo.linkedin}</span>
            </div>
          )}
          {cvData.personalInfo.website && (
            <div className="flex items-center gap-1.5">
              <Globe size={12} />
              <span>{cvData.personalInfo.websiteLabel}: {cvData.personalInfo.website}</span>
            </div>
          )}
          {cvData.personalInfo.facebook && (
            <div className="flex items-center gap-1.5">
              <Facebook size={12} />
              <span>{cvData.personalInfo.facebookLabel}: {cvData.personalInfo.facebook}</span>
            </div>
          )}
          {cvData.personalInfo.zalo && (
            <div className="flex items-center gap-1.5">
              <MessageCircle size={12} />
              <span>{cvData.personalInfo.zaloLabel}: {cvData.personalInfo.zalo}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-4 px-6 py-5">
        {/* Left Column */}
        <div className="col-span-2 space-y-4">
          {/* Profile */}
          {cvData.profile && (
            <section>
              <h2 className="text-lg pb-1 mb-2" style={{ color: colors.secondary, borderBottom: `2px solid ${colors.secondary}` }}>{t.profile}</h2>
              <p className="text-gray-700 leading-snug text-xs">{cvData.profile}</p>
            </section>
          )}

          {/* Work Experience */}
          {cvData.workExperience.some((exp) => exp.position || exp.company) && (
            <section>
              <h2 className="text-lg pb-1 mb-2 flex items-center gap-2" style={{ color: colors.secondary, borderBottom: `2px solid ${colors.secondary}` }}>
                <Briefcase size={16} />
                {t.workExperience}
              </h2>
              <div className="space-y-3">
                {cvData.workExperience
                  .filter((exp) => exp.position || exp.company)
                  .map((job, index) => (
                    <div key={index} className="relative pl-3" style={{ borderLeft: `2px solid ${colors.primaryLighter}` }}>
                      <div className="absolute w-2 h-2 rounded-full -left-[5px] top-1" style={{ background: colors.secondary }}></div>
                      <div className="mb-1">
                        <h3 className="text-sm" style={{ color: colors.primaryMedium }}>{job.position}</h3>
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
              <h2 className="text-lg pb-1 mb-2 flex items-center gap-2" style={{ color: colors.secondary, borderBottom: `2px solid ${colors.secondary}` }}>
                <GraduationCap size={16} />
                {t.education}
              </h2>
              <div className="space-y-2">
                {cvData.education
                  .filter((edu) => edu.degree || edu.school)
                  .map((edu, index) => (
                    <div key={index} className="relative pl-3" style={{ borderLeft: `2px solid ${colors.primaryLighter}` }}>
                      <div className="absolute w-2 h-2 rounded-full -left-[5px] top-1" style={{ background: colors.secondary }}></div>
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
            <section>
              <h2 className="text-sm pb-1 mb-2" style={{ color: colors.secondary, borderBottom: `2px solid ${colors.secondary}` }}>{t.technicalSkills}</h2>
              <div className="flex flex-wrap gap-1">
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
            <section>
              <h2 className="text-sm pb-1 mb-2" style={{ color: colors.secondary, borderBottom: `2px solid ${colors.secondary}` }}>{t.softSkills}</h2>
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
            <section>
              <h2 className="text-sm pb-1 mb-2 flex items-center gap-1" style={{ color: colors.secondary, borderBottom: `2px solid ${colors.secondary}` }}>
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
              <h2 className="text-sm pb-1 mb-2 flex items-center gap-1" style={{ color: colors.secondary, borderBottom: `2px solid ${colors.secondary}` }}>
                <Award size={14} />
                {t.certifications}
              </h2>
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
                  <section key={index}>
                    <h2 className="text-sm pb-1 mb-2" style={{ color: colors.secondary, borderBottom: `2px solid ${colors.secondary}` }}>
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
