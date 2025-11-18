import { CVData, useLanguage } from "../../App";
import { Mail, Phone, MapPin, Linkedin, Globe, Briefcase, GraduationCap, Award, Languages, Facebook, MessageCircle } from "lucide-react";
import { getColorPalette } from "./colorUtils";

interface CVTemplate7Props {
  cvData: CVData;
  customColor?: string;
}

export function CVTemplate7({ cvData, customColor = "#dc2626" }: CVTemplate7Props) {
  const { t } = useLanguage();
  const colors = getColorPalette(customColor);
  
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    return `${month}/${year}`;
  };

  return (
    <div className="bg-white mx-auto" style={{ width: '210mm', height: '297mm', overflow: 'hidden' }}>
      {/* Top Section - Photo & Personal Info */}
      <div className="relative" style={{ height: '100mm', background: colors.gradient }}>
        <div className="absolute inset-0 px-8 py-6 flex items-center gap-6">
          {/* Photo */}
          {cvData.personalInfo.photo && (
            <div className="flex-shrink-0">
              <img
                src={cvData.personalInfo.photo}
                alt={cvData.personalInfo.fullName}
                className="w-32 h-32 rounded-2xl border-4 border-white object-cover shadow-xl"
              />
            </div>
          )}
          
          {/* Personal Info */}
          <div className="flex-1 text-white">
            <h1 className="text-4xl mb-2">{cvData.personalInfo.fullName}</h1>
            <p className="text-xl opacity-90 mb-4">{cvData.personalInfo.title}</p>
            
            {/* Contact Grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {cvData.personalInfo.email && (
                <div className="flex items-center gap-2">
                  <Mail size={14} className="flex-shrink-0" />
                  <span className="truncate">{cvData.personalInfo.email}</span>
                </div>
              )}
              {cvData.personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={14} className="flex-shrink-0" />
                  <span>{cvData.personalInfo.phone}</span>
                </div>
              )}
              {cvData.personalInfo.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="flex-shrink-0" />
                  <span className="truncate">{cvData.personalInfo.location}</span>
                </div>
              )}
              {cvData.personalInfo.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin size={14} className="flex-shrink-0" />
                  <span className="truncate">{cvData.personalInfo.linkedin}</span>
                </div>
              )}
              {cvData.personalInfo.website && (
                <div className="flex items-center gap-2">
                  <Globe size={14} className="flex-shrink-0" />
                  <span className="truncate">{cvData.personalInfo.website}</span>
                </div>
              )}
              {cvData.personalInfo.facebook && (
                <div className="flex items-center gap-2">
                  <Facebook size={14} className="flex-shrink-0" />
                  <span className="truncate">{cvData.personalInfo.facebook}</span>
                </div>
              )}
            </div>

            {/* Profile Summary */}
            {cvData.profile && (
              <div className="mt-4 pt-4 border-t border-white/30">
                <p className="text-sm leading-relaxed line-clamp-3">{cvData.profile}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Section - Two Columns */}
      <div className="grid grid-cols-2 gap-6 px-8 py-6" style={{ height: '197mm' }}>
        {/* Left Column */}
        <div className="space-y-5">
          {/* Work Experience */}
          {cvData.workExperience.some((exp) => exp.position || exp.company) && (
            <section>
              <h2 className="text-lg pb-2 mb-3 flex items-center gap-2" style={{ borderBottom: `2px solid ${colors.primary}`, color: colors.primaryDark }}>
                <Briefcase size={18} />
                {t.workExperience}
              </h2>
              <div className="space-y-4">
                {cvData.workExperience
                  .filter((exp) => exp.position || exp.company)
                  .map((job, index) => (
                    <div key={index} className="relative pl-4" style={{ borderLeft: `3px solid ${colors.primaryLight}` }}>
                      <div className="absolute w-2.5 h-2.5 rounded-full -left-[7px] top-1" style={{ background: colors.primary }}></div>
                      <h3 className="text-sm" style={{ color: colors.primaryDark }}>{job.position}</h3>
                      <p className="text-xs text-gray-600 mb-1">
                        {job.company}
                        {job.location && ` • ${job.location}`}
                      </p>
                      <p className="text-xs text-gray-500 mb-2">
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
              <h2 className="text-lg pb-2 mb-3 flex items-center gap-2" style={{ borderBottom: `2px solid ${colors.primary}`, color: colors.primaryDark }}>
                <GraduationCap size={18} />
                {t.education}
              </h2>
              <div className="space-y-3">
                {cvData.education
                  .filter((edu) => edu.degree || edu.school)
                  .map((edu, index) => (
                    <div key={index} className="relative pl-4" style={{ borderLeft: `3px solid ${colors.primaryLight}` }}>
                      <div className="absolute w-2.5 h-2.5 rounded-full -left-[7px] top-1" style={{ background: colors.primary }}></div>
                      <h3 className="text-sm" style={{ color: colors.primaryDark }}>{edu.degree}</h3>
                      <p className="text-xs text-gray-600 mb-1">{edu.school}</p>
                      <p className="text-xs text-gray-500 mb-1">
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

        {/* Right Column */}
        <div className="space-y-5">
          {/* Technical Skills */}
          {cvData.skills.technical.some((skill) => skill) && (
            <section>
              <h2 className="text-sm pb-2 mb-3" style={{ borderBottom: `2px solid ${colors.primary}`, color: colors.primaryDark }}>{t.technicalSkills}</h2>
              <div className="flex flex-wrap gap-1.5">
                {cvData.skills.technical
                  .filter((skill) => skill)
                  .map((skill, index) => (
                    <span key={index} className="px-2 py-1 rounded text-xs" style={{ background: colors.primaryVeryLight, color: colors.primaryDark }}>
                      {skill}
                    </span>
                  ))}
              </div>
            </section>
          )}

          {/* Soft Skills */}
          {cvData.skills.soft.some((skill) => skill) && (
            <section>
              <h2 className="text-sm pb-2 mb-3" style={{ borderBottom: `2px solid ${colors.primary}`, color: colors.primaryDark }}>{t.softSkills}</h2>
              <ul className="space-y-1">
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
            <section>
              <h2 className="text-sm pb-2 mb-3 flex items-center gap-1.5" style={{ borderBottom: `2px solid ${colors.primary}`, color: colors.primaryDark }}>
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
            <section>
              <h2 className="text-sm pb-2 mb-3 flex items-center gap-1.5" style={{ borderBottom: `2px solid ${colors.primary}`, color: colors.primaryDark }}>
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
                  <section key={index}>
                    <h2 className="text-sm pb-2 mb-3" style={{ borderBottom: `2px solid ${colors.primary}`, color: colors.primaryDark }}>
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
  );
}
