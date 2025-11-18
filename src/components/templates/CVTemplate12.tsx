import { CVData, useLanguage } from "../../App";
import { Mail, Phone, MapPin, Linkedin, Globe, Briefcase, GraduationCap, Award, Languages, Facebook, MessageCircle } from "lucide-react";
import { getColorPalette } from "./colorUtils";

interface CVTemplate12Props {
  cvData: CVData;
  customColor?: string;
}

export function CVTemplate12({ cvData, customColor = "#8b5cf6" }: CVTemplate12Props) {
  const { t } = useLanguage();
  const colors = getColorPalette(customColor);
  
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    return `${month}/${year}`;
  };

  return (
    <div 
      className="mx-auto text-white" 
      style={{ 
        width: '210mm', 
        height: '297mm', 
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgb(15, 10, 25) 0%, rgb(20, 15, 30) 50%, rgb(25, 15, 35) 100%)'
      }}
    >
      <div className="flex h-full">
        {/* Left Content - Main */}
        <div className="flex-1 p-7">
          {/* Header */}
          <div className="mb-6">
            <div className="relative inline-block mb-4">
              <h1 
                className="text-5xl mb-2 tracking-tight"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${colors.primary} 0%, #ec4899 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {cvData.personalInfo.fullName}
              </h1>
              <div 
                className="h-1 rounded-full mt-2"
                style={{
                  background: `linear-gradient(90deg, ${colors.primary} 0%, #ec4899 100%)`,
                  width: '70%'
                }}
              />
            </div>
            <p className="text-xl text-gray-300 mb-4">{cvData.personalInfo.title}</p>
            
            {/* Contact Info in Header */}
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-gray-400">
              {cvData.personalInfo.email && (
                <div className="flex items-center gap-1.5">
                  <Mail size={12} style={{ color: colors.primary }} />
                  <span>{cvData.personalInfo.email}</span>
                </div>
              )}
              {cvData.personalInfo.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone size={12} style={{ color: colors.primary }} />
                  <span>{cvData.personalInfo.phone}</span>
                </div>
              )}
              {cvData.personalInfo.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin size={12} style={{ color: colors.primary }} />
                  <span>{cvData.personalInfo.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Profile */}
          {cvData.profile && (
            <div className="mb-6">
              <h2 
                className="text-lg mb-3 uppercase tracking-wider"
                style={{ 
                  backgroundImage: `linear-gradient(90deg, ${colors.primary}, #ec4899)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {t.careerObjective}
              </h2>
              <div 
                className="h-0.5 w-16 mb-3 rounded-full"
                style={{ background: `linear-gradient(90deg, ${colors.primary}, #ec4899)` }}
              />
              <p className="text-xs text-gray-300 leading-relaxed">{cvData.profile}</p>
            </div>
          )}

          {/* Work Experience */}
          {cvData.workExperience.some(w => w.position) && (
            <div className="mb-6">
              <h2 
                className="text-lg mb-4 uppercase tracking-wider flex items-center gap-2"
                style={{ 
                  backgroundImage: `linear-gradient(90deg, ${colors.primary}, #ec4899)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                <Briefcase size={20} style={{ color: colors.primary }} />
                {t.workExperience}
              </h2>
              <div 
                className="h-0.5 w-16 mb-4 rounded-full"
                style={{ background: `linear-gradient(90deg, ${colors.primary}, #ec4899)` }}
              />
              <div className="space-y-4">
                {cvData.workExperience.filter(w => w.position).map((work, index) => (
                  <div 
                    key={index}
                    className="relative pl-4 pb-4"
                    style={{ borderLeft: `2px solid ${colors.primary}30` }}
                  >
                    <div 
                      className="absolute left-0 top-1.5 w-3 h-3 rounded-full"
                      style={{ 
                        background: `linear-gradient(135deg, ${colors.primary}, #ec4899)`,
                        transform: 'translateX(-6.5px)',
                        boxShadow: `0 0 10px ${colors.primary}`
                      }}
                    />
                    <div className="mb-1.5">
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
                className="text-lg mb-4 uppercase tracking-wider flex items-center gap-2"
                style={{ 
                  backgroundImage: `linear-gradient(90deg, ${colors.primary}, #ec4899)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                <GraduationCap size={20} style={{ color: colors.primary }} />
                {t.education}
              </h2>
              <div 
                className="h-0.5 w-16 mb-4 rounded-full"
                style={{ background: `linear-gradient(90deg, ${colors.primary}, #ec4899)` }}
              />
              <div className="space-y-3">
                {cvData.education.filter(e => e.degree).map((edu, index) => (
                  <div 
                    key={index}
                    className="relative pl-4"
                    style={{ borderLeft: `2px solid ${colors.primary}30` }}
                  >
                    <div 
                      className="absolute left-0 top-1.5 w-3 h-3 rounded-full"
                      style={{ 
                        background: `linear-gradient(135deg, ${colors.primary}, #ec4899)`,
                        transform: 'translateX(-6.5px)',
                        boxShadow: `0 0 10px ${colors.primary}`
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
                  className="text-lg mb-4 uppercase tracking-wider"
                  style={{ 
                    backgroundImage: `linear-gradient(90deg, ${colors.primary}, #ec4899)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {section.title}
                </h2>
                <div 
                  className="h-0.5 w-16 mb-4 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${colors.primary}, #ec4899)` }}
                />
                <p className="text-xs text-gray-300 whitespace-pre-line leading-relaxed">
                  {section.content}
                </p>
              </div>
            )
          ))}
        </div>

        {/* Right Sidebar */}
        <div 
          className="w-[35%] p-6"
          style={{
            background: `linear-gradient(180deg, rgba(139, 92, 246, 0.15) 0%, rgba(236, 72, 153, 0.1) 100%)`,
            backdropFilter: 'blur(10px)',
            borderLeft: `1px solid ${colors.primary}30`
          }}
        >
          {/* Photo */}
          {cvData.personalInfo.photo && (
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <img
                  src={cvData.personalInfo.photo}
                  alt={cvData.personalInfo.fullName}
                  className="w-40 h-40 rounded-2xl object-cover"
                  style={{ 
                    border: `3px solid transparent`,
                    background: `linear-gradient(rgb(20, 15, 30), rgb(20, 15, 30)) padding-box, linear-gradient(135deg, ${colors.primary}, #ec4899) border-box`
                  }}
                />
                <div 
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    boxShadow: `0 0 60px ${colors.primary}40, inset 0 0 40px ${colors.primary}10`
                  }}
                />
              </div>
            </div>
          )}

          {/* Contact Links */}
          <div className="mb-6">
            <h3 
              className="text-sm uppercase tracking-wider mb-3"
              style={{ color: colors.primary }}
            >
              {t.personalInfo}
            </h3>
            <div 
              className="h-0.5 w-12 mb-3 rounded-full"
              style={{ background: `linear-gradient(90deg, ${colors.primary}, #ec4899)` }}
            />
            <div className="space-y-2 text-xs text-gray-300">
              {cvData.personalInfo.linkedin && (
                <div className="flex items-start gap-2">
                  <Linkedin size={14} className="mt-0.5 flex-shrink-0" style={{ color: colors.primary }} />
                  <span className="break-all text-[10px]">{cvData.personalInfo.linkedin}</span>
                </div>
              )}
              {cvData.personalInfo.website && (
                <div className="flex items-start gap-2">
                  <Globe size={14} className="mt-0.5 flex-shrink-0" style={{ color: colors.primary }} />
                  <span className="break-all text-[10px]">{cvData.personalInfo.website}</span>
                </div>
              )}
              {cvData.personalInfo.facebook && (
                <div className="flex items-start gap-2">
                  <Facebook size={14} className="mt-0.5 flex-shrink-0" style={{ color: colors.primary }} />
                  <span className="break-all text-[10px]">{cvData.personalInfo.facebook}</span>
                </div>
              )}
              {cvData.personalInfo.zalo && (
                <div className="flex items-start gap-2">
                  <MessageCircle size={14} className="mt-0.5 flex-shrink-0" style={{ color: colors.primary }} />
                  <span>{cvData.personalInfo.zalo}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {(cvData.skills.technical.some(s => s) || cvData.skills.soft.some(s => s)) && (
            <div className="mb-6">
              <h3 
                className="text-sm uppercase tracking-wider mb-3"
                style={{ color: colors.primary }}
              >
                {t.skills}
              </h3>
              <div 
                className="h-0.5 w-12 mb-3 rounded-full"
                style={{ background: `linear-gradient(90deg, ${colors.primary}, #ec4899)` }}
              />
              {cvData.skills.technical.some(s => s) && (
                <div className="mb-4">
                  <h4 className="text-xs mb-2 text-pink-300">{t.technicalSkills}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {cvData.skills.technical.filter(s => s).map((skill, index) => (
                      <span
                        key={index}
                        className="text-[10px] px-2.5 py-1 rounded-full"
                        style={{ 
                          background: `linear-gradient(135deg, ${colors.primary}20, rgba(236, 72, 153, 0.2))`,
                          border: `1px solid ${colors.primary}40`,
                          color: colors.primary
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
                  <h4 className="text-xs mb-2 text-pink-300">{t.softSkills}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {cvData.skills.soft.filter(s => s).map((skill, index) => (
                      <span
                        key={index}
                        className="text-[10px] px-2.5 py-1 rounded-full"
                        style={{ 
                          background: `linear-gradient(135deg, ${colors.primary}20, rgba(236, 72, 153, 0.2))`,
                          border: `1px solid ${colors.primary}40`,
                          color: colors.primary
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
                className="text-sm uppercase tracking-wider mb-3 flex items-center gap-2"
                style={{ color: colors.primary }}
              >
                <Languages size={14} />
                {t.languages}
              </h3>
              <div 
                className="h-0.5 w-12 mb-3 rounded-full"
                style={{ background: `linear-gradient(90deg, ${colors.primary}, #ec4899)` }}
              />
              <div className="space-y-3">
                {cvData.languages.filter(l => l.name).map((lang, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs text-gray-200">{lang.name}</span>
                      <span className="text-[10px] text-pink-300">{lang.level}</span>
                    </div>
                    <div 
                      className="h-1.5 rounded-full overflow-hidden"
                      style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                    >
                      <div 
                        className="h-1.5 rounded-full"
                        style={{ 
                          width: '80%',
                          background: `linear-gradient(90deg, ${colors.primary}, #ec4899)`
                        }}
                      />
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
                className="text-sm uppercase tracking-wider mb-3 flex items-center gap-2"
                style={{ color: colors.primary }}
              >
                <Award size={14} />
                {t.certifications}
              </h3>
              <div 
                className="h-0.5 w-12 mb-3 rounded-full"
                style={{ background: `linear-gradient(90deg, ${colors.primary}, #ec4899)` }}
              />
              <ul className="space-y-2 text-xs text-gray-300">
                {cvData.certifications.filter(c => c).map((cert, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div 
                      className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${colors.primary}, #ec4899)` }}
                    />
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
