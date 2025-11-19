import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Plus, Trash2, Upload, User, Briefcase, GraduationCap, Award, Languages, Target, X, QrCode } from "lucide-react";
import { CVData, useLanguage } from "../App";
import { Switch } from "./ui/switch";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";
interface CVFormProps {
  onSubmit: (data: CVData) => void;
  initialData: CVData | null;
  onRestrictedAccess?: () => void;
}

export function CVForm({ onSubmit, initialData, onRestrictedAccess }: CVFormProps) {
  const { t } = useLanguage();
  const { isPremium, accessToken } = useAuth();
  const [formData, setFormData] = useState<CVData>(
    initialData || {
      personalInfo: {
        fullName: "",
        title: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        linkedinLabel: "LinkedIn",
        website: "",
        websiteLabel: "Website",
        facebook: "",
        facebookLabel: "Facebook",
        zalo: "",
        zaloLabel: "Zalo",
        photo: "",
        showLinkedinQR: false,
        showPortfolioQR: false,
      },
      profile: "",
      workExperience: [
        {
          position: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          current: false,
          responsibilities: "",
        },
      ],
      education: [
        {
          degree: "",
          school: "",
          startDate: "",
          endDate: "",
          details: "",
        },
      ],
      skills: {
        technical: [""],
        soft: [""],
      },
      languages: [
        {
          name: "",
          level: "",
        },
      ],
      certifications: [""],
      customSections: [],
    }
  );

  // Sync form data when initialData changes (e.g., after loading from API)
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPEG, PNG, and WebP images are allowed");
      return;
    }

    try {
      // Show loading state
      const loadingToast = toast.loading("Processing image...");
      
      // Convert to base64 data URL (works for both guests and authenticated users)
      const reader = new FileReader();
      const photoUrl = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      
      // Update form data with URL
      setFormData({
        ...formData,
        personalInfo: {
          ...formData.personalInfo,
          photo: photoUrl,
        },
      });
      
      toast.dismiss(loadingToast);
      toast.success("Image added successfully");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to process image";
      toast.error(message);
    }
  };

  const addWorkExperience = () => {
    setFormData({
      ...formData,
      workExperience: [
        ...formData.workExperience,
        {
          position: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          current: false,
          responsibilities: "",
        },
      ],
    });
  };

  const removeWorkExperience = (index: number) => {
    setFormData({
      ...formData,
      workExperience: formData.workExperience.filter((_, i) => i !== index),
    });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        {
          degree: "",
          school: "",
          startDate: "",
          endDate: "",
          details: "",
        },
      ],
    });
  };

  const removeEducation = (index: number) => {
    setFormData({
      ...formData,
      education: formData.education.filter((_, i) => i !== index),
    });
  };

  const addSkill = (type: "technical" | "soft") => {
    setFormData({
      ...formData,
      skills: {
        ...formData.skills,
        [type]: [...formData.skills[type], ""],
      },
    });
  };

  const removeSkill = (type: "technical" | "soft", index: number) => {
    setFormData({
      ...formData,
      skills: {
        ...formData.skills,
        [type]: formData.skills[type].filter((_, i) => i !== index),
      },
    });
  };

  const updateSkill = (type: "technical" | "soft", index: number, value: string) => {
    const newSkills = [...formData.skills[type]];
    newSkills[index] = value;
    setFormData({
      ...formData,
      skills: {
        ...formData.skills,
        [type]: newSkills,
      },
    });
  };

  const addLanguage = () => {
    setFormData({
      ...formData,
      languages: [...formData.languages, { name: "", level: "" }],
    });
  };

  const removeLanguage = (index: number) => {
    setFormData({
      ...formData,
      languages: formData.languages.filter((_, i) => i !== index),
    });
  };

  const addCertification = () => {
    setFormData({
      ...formData,
      certifications: [...formData.certifications, ""],
    });
  };

  const removeCertification = (index: number) => {
    setFormData({
      ...formData,
      certifications: formData.certifications.filter((_, i) => i !== index),
    });
  };

  const updateCertification = (index: number, value: string) => {
    const newCerts = [...formData.certifications];
    newCerts[index] = value;
    setFormData({
      ...formData,
      certifications: newCerts,
    });
  };

  const addCustomSection = () => {
    if (!isPremium) {
      onRestrictedAccess?.();
      return;
    }
    setFormData({
      ...formData,
      customSections: [...formData.customSections, { title: "", content: "" }],
    });
  };

  const updateCustomSection = (index: number, field: "title" | "content", value: string) => {
    const newSections = [...formData.customSections];
    newSections[index][field] = value;
    setFormData({ ...formData, customSections: newSections });
  };

  const removeCustomSection = (index: number) => {
    const newSections = formData.customSections.filter((_, i) => i !== index);
    setFormData({ ...formData, customSections: newSections });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Info */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 p-2 rounded-lg">
            <User className="text-blue-600" size={24} />
          </div>
          <h2 className="text-2xl">{t.personalInfo}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="photo">{t.photo}</Label>
            <div className="flex items-center gap-4 mt-2">
              {formData.personalInfo.photo && (
                <img
                  src={formData.personalInfo.photo}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                />
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors w-fit">
                    <Upload size={18} />
                    <span>{t.uploadPhoto}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                  {formData.personalInfo.photo && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // Remove from form data
                        setFormData({
                          ...formData,
                          personalInfo: {
                            ...formData.personalInfo,
                            photo: "",
                          },
                        });
                        
                        toast.success("Photo removed");
                      }}
                      className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                    >
                      <Trash2 size={16} />
                      <span>{t.removePhoto}</span>
                    </Button>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-2">{t.uploadPhotoHint}</p>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="fullName">{t.fullName} {t.required}</Label>
            <Input
              id="fullName"
              value={formData.personalInfo.fullName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  personalInfo: { ...formData.personalInfo, fullName: e.target.value },
                })
              }
              placeholder={t.fullNamePlaceholder}
              required
            />
          </div>

          <div>
            <Label htmlFor="title">{t.jobTitle} {t.required}</Label>
            <Input
              id="title"
              value={formData.personalInfo.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  personalInfo: { ...formData.personalInfo, title: e.target.value },
                })
              }
              placeholder={t.jobTitlePlaceholder}
              required
            />
          </div>

          <div>
            <Label htmlFor="email">{t.email} {t.required}</Label>
            <Input
              id="email"
              type="email"
              value={formData.personalInfo.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  personalInfo: { ...formData.personalInfo, email: e.target.value },
                })
              }
              placeholder={t.emailPlaceholder}
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">{t.phone} {t.required}</Label>
            <Input
              id="phone"
              value={formData.personalInfo.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  personalInfo: { ...formData.personalInfo, phone: e.target.value },
                })
              }
              placeholder={t.phonePlaceholder}
              required
            />
          </div>

          <div>
            <Label htmlFor="location">{t.address}</Label>
            <Input
              id="location"
              value={formData.personalInfo.location}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  personalInfo: { ...formData.personalInfo, location: e.target.value },
                })
              }
              placeholder={t.addressPlaceholder}
            />
          </div>

          <div>
            <div className="flex gap-2 items-end mb-2">
              <div className="flex-1">
                <Label htmlFor="linkedinLabel" className="text-xs text-gray-600">{t.platformLabel || "Platform Name"}</Label>
                <Input
                  id="linkedinLabel"
                  value={formData.personalInfo.linkedinLabel}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, linkedinLabel: e.target.value },
                    })
                  }
                  placeholder="LinkedIn"
                  className="h-8 text-sm"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Input
                id="linkedin"
                value={formData.personalInfo.linkedin}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, linkedin: e.target.value },
                  })
                }
                placeholder={t.linkedinPlaceholder}
                className="flex-1"
              />
              {formData.personalInfo.linkedin && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, linkedin: "" },
                    })
                  }
                  className="flex-shrink-0"
                >
                  <X size={18} />
                </Button>
              )}
            </div>
          </div>

          <div>
            <div className="flex gap-2 items-end mb-2">
              <div className="flex-1">
                <Label htmlFor="websiteLabel" className="text-xs text-gray-600">{t.platformLabel || "Platform Name"}</Label>
                <Input
                  id="websiteLabel"
                  value={formData.personalInfo.websiteLabel}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, websiteLabel: e.target.value },
                    })
                  }
                  placeholder="Website"
                  className="h-8 text-sm"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Input
                id="website"
                value={formData.personalInfo.website}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, website: e.target.value },
                  })
                }
                placeholder={t.websitePlaceholder}
                className="flex-1"
              />
              {formData.personalInfo.website && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, website: "" },
                    })
                  }
                  className="flex-shrink-0"
                >
                  <X size={18} />
                </Button>
              )}
            </div>
          </div>

          <div>
            <div className="flex gap-2 items-end mb-2">
              <div className="flex-1">
                <Label htmlFor="facebookLabel" className="text-xs text-gray-600">{t.platformLabel || "Platform Name"}</Label>
                <Input
                  id="facebookLabel"
                  value={formData.personalInfo.facebookLabel}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, facebookLabel: e.target.value },
                    })
                  }
                  placeholder="Facebook"
                  className="h-8 text-sm"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Input
                id="facebook"
                value={formData.personalInfo.facebook}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, facebook: e.target.value },
                  })
                }
                placeholder={t.facebookPlaceholder}
                className="flex-1"
              />
              {formData.personalInfo.facebook && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, facebook: "" },
                    })
                  }
                  className="flex-shrink-0"
                >
                  <X size={18} />
                </Button>
              )}
            </div>
          </div>

          <div>
            <div className="flex gap-2 items-end mb-2">
              <div className="flex-1">
                <Label htmlFor="zaloLabel" className="text-xs text-gray-600">{t.platformLabel || "Platform Name"}</Label>
                <Input
                  id="zaloLabel"
                  value={formData.personalInfo.zaloLabel}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, zaloLabel: e.target.value },
                    })
                  }
                  placeholder="Zalo"
                  className="h-8 text-sm"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Input
                id="zalo"
                value={formData.personalInfo.zalo}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, zalo: e.target.value },
                  })
                }
                placeholder={t.zaloPlaceholder}
                className="flex-1"
              />
              {formData.personalInfo.zalo && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, zalo: "" },
                    })
                  }
                  className="flex-shrink-0"
                >
                  <X size={18} />
                </Button>
              )}
            </div>
          </div>

        </div>
      </Card>

      {/* Profile */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-purple-100 p-2 rounded-lg">
            <Target className="text-purple-600" size={24} />
          </div>
          <h2 className="text-2xl">{t.careerObjective}</h2>
        </div>
        <Textarea
          value={formData.profile}
          onChange={(e) => setFormData({ ...formData, profile: e.target.value })}
          placeholder={t.careerObjectivePlaceholder}
          rows={4}
        />
      </Card>

      {/* Work Experience */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <Briefcase className="text-green-600" size={24} />
            </div>
            <h2 className="text-2xl">{t.workExperience}</h2>
          </div>
          <Button type="button" onClick={addWorkExperience} variant="outline" size="sm" className="gap-2">
            <Plus size={16} />
            {t.add}
          </Button>
        </div>

        <div className="space-y-6">
          {formData.workExperience.map((exp, index) => (
            <div key={index} className="p-4 border rounded-lg bg-gray-50">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg">{t.jobNumber} {index + 1}</h3>
                {formData.workExperience.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => removeWorkExperience(index)}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </Button>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>{t.position}</Label>
                  <Input
                    value={exp.position}
                    onChange={(e) => {
                      const newExp = [...formData.workExperience];
                      newExp[index].position = e.target.value;
                      setFormData({ ...formData, workExperience: newExp });
                    }}
                    placeholder={t.jobTitlePlaceholder}
                  />
                </div>

                <div>
                  <Label>{t.company}</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => {
                      const newExp = [...formData.workExperience];
                      newExp[index].company = e.target.value;
                      setFormData({ ...formData, workExperience: newExp });
                    }}
                    placeholder="ABC Tech"
                  />
                </div>

                <div>
                  <Label>{t.location}</Label>
                  <Input
                    value={exp.location}
                    onChange={(e) => {
                      const newExp = [...formData.workExperience];
                      newExp[index].location = e.target.value;
                      setFormData({ ...formData, workExperience: newExp });
                    }}
                    placeholder={t.addressPlaceholder}
                  />
                </div>

                <div>
                  <Label>{t.startDate}</Label>
                  <Input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => {
                      const newExp = [...formData.workExperience];
                      newExp[index].startDate = e.target.value;
                      setFormData({ ...formData, workExperience: newExp });
                    }}
                  />
                </div>

                <div>
                  <Label>{t.endDate}</Label>
                  <Input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => {
                      const newExp = [...formData.workExperience];
                      newExp[index].endDate = e.target.value;
                      setFormData({ ...formData, workExperience: newExp });
                    }}
                    disabled={exp.current}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`current-${index}`}
                    checked={exp.current}
                    onChange={(e) => {
                      const newExp = [...formData.workExperience];
                      newExp[index].current = e.target.checked;
                      if (e.target.checked) {
                        newExp[index].endDate = "";
                      }
                      setFormData({ ...formData, workExperience: newExp });
                    }}
                    className="w-4 h-4"
                  />
                  <Label htmlFor={`current-${index}`} className="cursor-pointer">{t.current}</Label>
                </div>

                <div className="md:col-span-2">
                  <Label>{t.responsibilities}</Label>
                  <Textarea
                    value={exp.responsibilities}
                    onChange={(e) => {
                      const newExp = [...formData.workExperience];
                      newExp[index].responsibilities = e.target.value;
                      setFormData({ ...formData, workExperience: newExp });
                    }}
                    placeholder={t.responsibilitiesPlaceholder}
                    rows={3}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Education */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-2 rounded-lg">
              <GraduationCap className="text-orange-600" size={24} />
            </div>
            <h2 className="text-2xl">{t.education}</h2>
          </div>
          <Button type="button" onClick={addEducation} variant="outline" size="sm" className="gap-2">
            <Plus size={16} />
            {t.add}
          </Button>
        </div>

        <div className="space-y-6">
          {formData.education.map((edu, index) => (
            <div key={index} className="p-4 border rounded-lg bg-gray-50">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg">{t.degreeNumber} {index + 1}</h3>
                {formData.education.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => removeEducation(index)}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </Button>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>{t.degree}</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => {
                      const newEdu = [...formData.education];
                      newEdu[index].degree = e.target.value;
                      setFormData({ ...formData, education: newEdu });
                    }}
                    placeholder={t.degreePlaceholder}
                  />
                </div>

                <div>
                  <Label>{t.school}</Label>
                  <Input
                    value={edu.school}
                    onChange={(e) => {
                      const newEdu = [...formData.education];
                      newEdu[index].school = e.target.value;
                      setFormData({ ...formData, education: newEdu });
                    }}
                    placeholder={t.schoolPlaceholder}
                  />
                </div>

                <div>
                  <Label>{t.startYear}</Label>
                  <Input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => {
                      const newEdu = [...formData.education];
                      newEdu[index].startDate = e.target.value;
                      setFormData({ ...formData, education: newEdu });
                    }}
                  />
                </div>

                <div>
                  <Label>{t.endYear}</Label>
                  <Input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => {
                      const newEdu = [...formData.education];
                      newEdu[index].endDate = e.target.value;
                      setFormData({ ...formData, education: newEdu });
                    }}
                  />
                </div>

                <div className="md:col-span-2">
                  <Label>{t.details}</Label>
                  <Textarea
                    value={edu.details}
                    onChange={(e) => {
                      const newEdu = [...formData.education];
                      newEdu[index].details = e.target.value;
                      setFormData({ ...formData, education: newEdu });
                    }}
                    placeholder={t.detailsPlaceholder}
                    rows={2}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Skills */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-pink-100 p-2 rounded-lg">
            <Award className="text-pink-600" size={24} />
          </div>
          <h2 className="text-2xl">{t.skills}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Technical Skills */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <Label>{t.technicalSkills}</Label>
              <Button
                type="button"
                onClick={() => addSkill("technical")}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Plus size={16} />
                {t.add}
              </Button>
            </div>
            <div className="space-y-2">
              {formData.skills.technical.map((skill, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={skill}
                    onChange={(e) => updateSkill("technical", index, e.target.value)}
                    placeholder={t.technicalSkillsPlaceholder}
                  />
                  {formData.skills.technical.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => removeSkill("technical", index)}
                      variant="ghost"
                      size="sm"
                      className="text-red-600"
                    >
                      <Trash2 size={16} />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <Label>{t.softSkills}</Label>
              <Button
                type="button"
                onClick={() => addSkill("soft")}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Plus size={16} />
                {t.add}
              </Button>
            </div>
            <div className="space-y-2">
              {formData.skills.soft.map((skill, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={skill}
                    onChange={(e) => updateSkill("soft", index, e.target.value)}
                    placeholder={t.softSkillsPlaceholder}
                  />
                  {formData.skills.soft.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => removeSkill("soft", index)}
                      variant="ghost"
                      size="sm"
                      className="text-red-600"
                    >
                      <Trash2 size={16} />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Languages */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <Languages className="text-indigo-600" size={24} />
            </div>
            <h2 className="text-2xl">{t.languages}</h2>
          </div>
          <Button type="button" onClick={addLanguage} variant="outline" size="sm" className="gap-2">
            <Plus size={16} />
            {t.add}
          </Button>
        </div>

        <div className="space-y-3">
          {formData.languages.map((lang, index) => (
            <div key={index} className="flex gap-3">
              <Input
                value={lang.name}
                onChange={(e) => {
                  const newLangs = [...formData.languages];
                  newLangs[index].name = e.target.value;
                  setFormData({ ...formData, languages: newLangs });
                }}
                placeholder={t.languageNamePlaceholder}
                className="flex-1"
              />
              <Input
                value={lang.level}
                onChange={(e) => {
                  const newLangs = [...formData.languages];
                  newLangs[index].level = e.target.value;
                  setFormData({ ...formData, languages: newLangs });
                }}
                placeholder={t.languageLevelPlaceholder}
                className="flex-1"
              />
              {formData.languages.length > 1 && (
                <Button
                  type="button"
                  onClick={() => removeLanguage(index)}
                  variant="ghost"
                  size="sm"
                  className="text-red-600"
                >
                  <Trash2 size={16} />
                </Button>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Certifications */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-teal-100 p-2 rounded-lg">
              <Award className="text-teal-600" size={24} />
            </div>
            <h2 className="text-2xl">{t.certifications}</h2>
          </div>
          <Button type="button" onClick={addCertification} variant="outline" size="sm" className="gap-2">
            <Plus size={16} />
            {t.add}
          </Button>
        </div>

        <div className="space-y-2">
          {formData.certifications.map((cert, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={cert}
                onChange={(e) => updateCertification(index, e.target.value)}
                placeholder={t.certificationPlaceholder}
              />
              {formData.certifications.length > 1 && (
                <Button
                  type="button"
                  onClick={() => removeCertification(index)}
                  variant="ghost"
                  size="sm"
                  className="text-red-600"
                >
                  <Trash2 size={16} />
                </Button>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Custom Sections */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <Plus className="text-indigo-600" size={24} />
            </div>
            <h2 className="text-2xl">{t.customSections}</h2>
            {!isPremium && (
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                {t.proFeature}
              </span>
            )}
          </div>
          <Button 
            type="button" 
            onClick={addCustomSection} 
            variant={isPremium ? "outline" : "default"}
            size="sm" 
            className={`gap-2 ${!isPremium ? "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white" : ""}`}
          >
            <Plus size={16} />
            {isPremium ? t.addCustomSection : `${t.addCustomSection} (${t.proFeature})`}
          </Button>
        </div>

        {formData.customSections.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>{t.addCustomSection}</p>
            <p className="text-sm mt-2">{t.sectionTitlePlaceholder}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {formData.customSections.map((section, index) => (
              <Card key={index} className="p-4 bg-gray-50 border-2 border-dashed">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-700">
                    {t.customSectionTitle} {index + 1}
                  </h3>
                  <Button
                    type="button"
                    onClick={() => removeCustomSection(index)}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>{t.customSectionTitle}</Label>
                    <Input
                      value={section.title}
                      onChange={(e) => updateCustomSection(index, "title", e.target.value)}
                      placeholder={t.sectionTitlePlaceholder}
                    />
                  </div>

                  <div>
                    <Label>{t.customSectionContent}</Label>
                    <Textarea
                      value={section.content}
                      onChange={(e) => updateCustomSection(index, "content", e.target.value)}
                      placeholder={t.sectionContentPlaceholder}
                      rows={5}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>

      {/* Submit Button */}
      <div className="flex justify-center">
        <Button type="submit" size="lg" className="gap-2 px-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          {t.viewTemplates}
          <span className="text-xl">→</span>
        </Button>
      </div>
    </form>
  );
}
