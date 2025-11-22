import { useState, useRef } from "react";
import { CVData, useLanguage } from "../App";
import { useAuth } from "./AuthContext";
import { Button } from "./ui/button";
import { Download, Check, Eye, Image as ImageIcon, X, Palette, RotateCcw } from "lucide-react";
import { CVTemplate1 } from "./templates/CVTemplate1";
import { CVTemplate2 } from "./templates/CVTemplate2";
import { CVTemplate3 } from "./templates/CVTemplate3";
import { CVTemplate4 } from "./templates/CVTemplate4";
import { CVTemplate5 } from "./templates/CVTemplate5";
import { CVTemplate6 } from "./templates/CVTemplate6";
import { CVTemplate7 } from "./templates/CVTemplate7";
import { CVTemplate8 } from "./templates/CVTemplate8";
import { CVTemplate9 } from "./templates/CVTemplate9";
import { CVTemplate10 } from "./templates/CVTemplate10";
import { CVTemplate11 } from "./templates/CVTemplate11";
import { CVTemplate12 } from "./templates/CVTemplate12";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { toast } from "sonner";
import { Toaster } from "./ui/sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface TemplateSelectorProps {
  cvData: CVData;
  onRestrictedAccess?: () => void;
}

// Default colors for each template
const DEFAULT_COLORS: { [key: number]: string } = {
  1: "#2563eb", // blue
  2: "#9333ea", // purple
  3: "#ea580c", // orange
  4: "#16a34a", // green
  5: "#0891b2", // cyan
  6: "#7c3aed", // violet
  7: "#dc2626", // red
  8: "#0d9488", // teal
  9: "#4f46e5", // indigo
  10: "#fbbf24", // gold
  11: "#06b6d4", // cyan-neon
  12: "#8b5cf6", // purple-gradient
};

export function TemplateSelector({ cvData, onRestrictedAccess }: TemplateSelectorProps) {
  const { t } = useLanguage();
  const { isAuthenticated, isPremium } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<number | null>(null);
  const [customColors, setCustomColors] = useState<{ [key: number]: string }>(DEFAULT_COLORS);
  const templateRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const previewRef = useRef<HTMLDivElement | null>(null);

  // Reorder templates - smallest ID first
  const templates = [
    { id: 1, name: t.modernBlue, component: CVTemplate1, color: "blue" },
    { id: 2, name: t.professionalPurple, component: CVTemplate2, color: "purple" },
    { id: 3, name: t.creativeOrange, component: CVTemplate3, color: "orange" },
    { id: 4, name: t.minimalistGreen, component: CVTemplate4, color: "green" },
    { id: 5, name: t.internationalCyan, component: CVTemplate5, color: "cyan" },
    { id: 6, name: t.elegantViolet, component: CVTemplate6, color: "violet" },
    { id: 7, name: t.horizontalRed, component: CVTemplate7, color: "red" },
    { id: 8, name: t.executiveTeal, component: CVTemplate8, color: "teal" },
    { id: 9, name: t.creativeIndigo, component: CVTemplate9, color: "indigo" },
    { id: 10, name: t.darkProfessional, component: CVTemplate10, color: "gold", isDark: true },
    { id: 11, name: t.darkCreative, component: CVTemplate11, color: "cyan", isDark: true },
    { id: 12, name: t.darkElegant, component: CVTemplate12, color: "purple", isDark: true },
  ];

  // Helper function to check if template is restricted
  const isTemplateRestricted = (templateId: number) => {
    if (!isAuthenticated) {
      // Guests can only access templates 1-2
      return templateId > 2;
    }
    // Authenticated users: free users can access 1-4, premium can access all
    if (!isPremium && templateId > 4) {
      return true;
    }
    return false;
  };

  // Handler for template actions (preview, select)
  const handleTemplateAction = (templateId: number, action: () => void) => {
    if (isTemplateRestricted(templateId)) {
      onRestrictedAccess?.();
      return;
    }
    action();
  };

  const handleDownloadPDF = async () => {
    if (selectedTemplate === null) {
      toast.error(t.selectTemplateError);
      return;
    }
    if (isTemplateRestricted(selectedTemplate)) {
      onRestrictedAccess?.();
      return;
    }

    setIsDownloading(true);
    toast.info(t.creatingPDF);

    try {
      const element = templateRefs.current[selectedTemplate];
      if (!element) {
        throw new Error("Template not found");
      }

      // Step 1: Wait for all images to load completely
      const images = element.querySelectorAll('img');
      if (images.length > 0) {
        await Promise.all(
          Array.from(images).map((img) => {
            return new Promise<void>((resolve) => {
              // Already loaded
              if (img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
                resolve();
                return;
              }

              const timeout = setTimeout(() => {
                console.warn('Image load timeout, continuing');
                resolve();
              }, 10000);

              img.onload = () => {
                clearTimeout(timeout);
                if (img.naturalWidth > 0 && img.naturalHeight > 0) {
                  resolve();
                } else {
                  resolve(); // Continue anyway
                }
              };

              img.onerror = () => {
                clearTimeout(timeout);
                resolve(); // Continue even if image fails
              };

              // Force reload for base64 images
              if (img.src.startsWith('data:') && !img.complete) {
                const src = img.src;
                img.src = '';
                requestAnimationFrame(() => {
                  img.src = src;
                });
              }
            });
          })
        );
      }

      // Step 2: Wait for rendering to complete
      await new Promise(resolve => setTimeout(resolve, 300));

      // Step 3: Convert HTML to image using html-to-image
      const dataUrl = await toPng(element, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        cacheBust: true,
        useCORS: true,
        allowTaint: false,
      });

      if (!dataUrl || dataUrl.length < 100) {
        throw new Error('Failed to generate image from template');
      }

      // Step 4: Load the image to get dimensions
      const img = new Image();
      img.src = dataUrl;
      
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('Image load timeout')), 10000);
        img.onload = () => {
          clearTimeout(timeout);
          resolve(undefined);
        };
        img.onerror = () => {
          clearTimeout(timeout);
          reject(new Error('Failed to load generated image'));
        };
      });

      // Step 5: Create PDF and add image
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = 297; // A4 height in mm
      const imgWidth = pdfWidth;
      const imgHeight = (img.height * pdfWidth) / img.width;

      // Step 6: Handle single or multiple pages
      // Add small tolerance (3mm) to account for pixel-to-mm rounding errors
      // Templates have minHeight: 297mm, so slight rounding can make it 297.1-297.5mm
      const tolerance = 3; // mm
      const isSinglePage = imgHeight <= pdfHeight + tolerance;
      
      if (isSinglePage) {
        // Single page - clamp height to prevent any overflow
        const finalHeight = Math.min(imgHeight, pdfHeight);
        pdf.addImage(dataUrl, 'PNG', 0, 0, imgWidth, finalHeight, undefined, 'FAST');
      } else {
        // Multiple pages - extract each page portion
        const totalPages = Math.ceil(imgHeight / pdfHeight);
        const imgWidthPx = img.width;
        const imgHeightPx = img.height;
        const pageHeightPx = Math.ceil((pdfHeight / imgHeight) * imgHeightPx);
        
        // Load source image once
        const sourceImg = new Image();
        sourceImg.src = dataUrl;
        
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(() => reject(new Error('Source image timeout')), 10000);
          sourceImg.onload = () => {
            clearTimeout(timeout);
            resolve(undefined);
          };
          sourceImg.onerror = () => {
            clearTimeout(timeout);
            reject(new Error('Failed to load source image'));
          };
        });
        
        // Process each page
        for (let page = 0; page < totalPages; page++) {
          if (page > 0) {
            pdf.addPage();
          }
          
          const sourceY = page * pageHeightPx;
          const remainingHeight = imgHeightPx - sourceY;
          const sourceHeight = Math.min(pageHeightPx, remainingHeight);
          
          if (sourceHeight <= 0) break;
          
          // Create canvas for this page
          const canvas = document.createElement('canvas');
          canvas.width = imgWidthPx;
          canvas.height = sourceHeight;
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            throw new Error(`Canvas context failed for page ${page + 1}`);
          }
          
          // Draw the page portion
          ctx.drawImage(sourceImg, 0, sourceY, imgWidthPx, sourceHeight, 0, 0, imgWidthPx, sourceHeight);
          
          // Convert to data URL
          const pageDataUrl = canvas.toDataURL('image/png');
          
          if (!pageDataUrl || pageDataUrl.length < 50) {
            throw new Error(`Failed to generate page ${page + 1} image`);
          }
          
          // Calculate PDF dimensions
          const pageImgHeight = (sourceHeight * pdfWidth) / imgWidthPx;
          
          // Add to PDF
          pdf.addImage(pageDataUrl, 'PNG', 0, 0, pdfWidth, pageImgHeight, undefined, 'FAST');
        }
      }

      // Step 7: Save the PDF
      const safeFilename = cvData.personalInfo.fullName
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .replace(/\s+/g, '_')
        .substring(0, 50);
      
      pdf.save(`CV_${safeFilename || 'Document'}.pdf`);
      
      toast.success(t.downloadSuccess);
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error(t.downloadError + ": " + (error instanceof Error ? error.message : "Unknown error"));
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadPNG = async () => {
    if (selectedTemplate === null) {
      toast.error(t.selectTemplateError);
      return;
    }
    if (isTemplateRestricted(selectedTemplate)) {
      onRestrictedAccess?.();
      return;
    }

    setIsDownloading(true);
    toast.info(t.downloadingPNG);

    try {
      const element = templateRefs.current[selectedTemplate];
      if (!element) {
        throw new Error("Template not found");
      }

      // Wait for rendering
      await new Promise(resolve => setTimeout(resolve, 200));

      // Generate PNG with high quality
      const dataUrl = await toPng(element, {
        quality: 1.0,
        pixelRatio: 3, // Higher resolution for PNG
        backgroundColor: '#ffffff',
        cacheBust: true,
        style: {
          transform: 'none',
          transformOrigin: 'top left'
        }
      });

      // Download the PNG
      const link = document.createElement('a');
      const safeFilename = cvData.personalInfo.fullName
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .replace(/\s+/g, '_')
        .substring(0, 50);
      
      link.download = `CV_${safeFilename || 'Document'}.png`;
      link.href = dataUrl;
      link.click();
      
      toast.success(t.pngDownloadSuccess);
    } catch (error) {
      console.error("Error generating PNG:", error);
      toast.error(t.downloadError + ": " + (error instanceof Error ? error.message : "Unknown error"));
    } finally {
      setIsDownloading(false);
    }
  };

  const handleColorChange = (templateId: number, color: string) => {
    setCustomColors(prev => ({
      ...prev,
      [templateId]: color
    }));
  };

  const handleResetColor = (templateId: number) => {
    setCustomColors(prev => ({
      ...prev,
      [templateId]: DEFAULT_COLORS[templateId]
    }));
  };

  const handleResetAllColors = () => {
    setCustomColors(DEFAULT_COLORS);
    toast.success(t.resetColors);
  };

  return (
    <div className="space-y-8">
      <Toaster position="top-center" />
      
      {/* Color Customization Panel - Sticky Top (Premium Only) */}
      {isPremium && selectedTemplate && (
        <div className="sticky top-20 z-40 mb-4">
          <Card className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-2 border-purple-200 dark:border-purple-800 shadow-lg">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Palette className="text-purple-600 dark:text-purple-400" size={20} />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">{t.customizeColors}</h3>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleResetColor(selectedTemplate)}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <RotateCcw size={14} />
                  {t.resetColors}
                </Button>
                <Button
                  onClick={handleResetAllColors}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  {t.resetColors} All
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-4 flex-wrap">
              <Label htmlFor="color-picker" className="text-gray-700 dark:text-gray-300 whitespace-nowrap">
                {t.primaryColor}:
              </Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  id="color-picker"
                  value={customColors[selectedTemplate]}
                  onChange={(e) => handleColorChange(selectedTemplate, e.target.value)}
                  className="w-16 h-10 rounded border-2 border-gray-300 dark:border-gray-600 cursor-pointer bg-white dark:bg-gray-800"
                />
                <Input
                  type="text"
                  value={customColors[selectedTemplate]}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^#[0-9A-F]{6}$/i.test(value) || value === '') {
                      handleColorChange(selectedTemplate, value || DEFAULT_COLORS[selectedTemplate]);
                    }
                  }}
                  className="w-24 font-mono text-sm"
                  placeholder="#2563eb"
                />
              </div>
              <div 
                className="w-12 h-12 rounded border-2 border-gray-300 dark:border-gray-600 shadow-sm"
                style={{ backgroundColor: customColors[selectedTemplate] }}
                title={customColors[selectedTemplate]}
              />
            </div>
          </Card>
        </div>
      )}

      {/* Hidden full-size templates for export */}
      <div className="fixed left-[-9999px] top-0">
        {templates.map((template) => {
          const TemplateComponent = template.component;
          return (
            <div key={`pdf-${template.id}`} ref={(el) => { templateRefs.current[template.id] = el; }}>
              <TemplateComponent cvData={cvData} customColor={customColors[template.id]} />
            </div>
          );
        })}
      </div>

      {/* Template Grid - Preview only */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => {
          const TemplateComponent = template.component;
          const isRestricted = isTemplateRestricted(template.id);
          return (
            <div
              key={template.id}
              className={`group relative rounded-2xl overflow-hidden transition-all duration-300 ${
                isRestricted
                  ? "opacity-50 blur-sm cursor-pointer hover:opacity-60"
                  : selectedTemplate === template.id
                  ? "ring-4 ring-blue-600 ring-offset-2 shadow-2xl scale-105"
                  : "ring-2 ring-gray-200 hover:ring-gray-400 hover:shadow-xl hover:scale-[1.02]"
              }`}
              onClick={() => {
                if (isRestricted) {
                  onRestrictedAccess?.();
                }
              }}
            >
              {/* Selection Indicator */}
              {selectedTemplate === template.id && !isRestricted && (
                <div className="absolute top-3 right-3 z-10 bg-blue-600 text-white rounded-full p-2 shadow-lg animate-in fade-in zoom-in duration-200">
                  <Check size={20} />
                </div>
              )}


              {/* Action Buttons */}
              {!isRestricted && (
                <div className="absolute bottom-3 left-3 right-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {isPremium ? (
                    <Button
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation();
                        handleTemplateAction(template.id, () => setPreviewTemplate(template.id));
                      }}
                      size="sm"
                      className="flex-1 gap-2 bg-white/95 backdrop-blur-sm text-gray-700 hover:bg-white border border-gray-300"
                    >
                      <Eye size={14} />
                      {t.previewFullscreen}
                    </Button>
                  ) : (
                    <Button
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation();
                        onRestrictedAccess?.();
                      }}
                      size="sm"
                      className="flex-1 gap-2 bg-white/95 backdrop-blur-sm text-gray-500 hover:bg-white border border-gray-300"
                      title={t.proFeature}
                    >
                      <Eye size={14} />
                      {t.previewFullscreen} ({t.proFeature})
                    </Button>
                  )}
                  <Button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      handleTemplateAction(template.id, () => setSelectedTemplate(template.id));
                    }}
                    size="sm"
                    className="flex-1 gap-2"
                    variant={selectedTemplate === template.id ? "default" : "secondary"}
                  >
                    <Check size={14} />
                    {selectedTemplate === template.id ? "Selected" : "Select"}
                  </Button>
                </div>
              )}

              {/* Template Preview - Optimized scaling */}
              <div 
                className={`relative bg-white ${isRestricted ? "cursor-pointer" : "cursor-pointer"}`}
                style={{ aspectRatio: '210/297', width: '100%' }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isRestricted) {
                    onRestrictedAccess?.();
                  } else {
                    handleTemplateAction(template.id, () => setSelectedTemplate(template.id));
                  }
                }}
              >
                <div className="absolute inset-0 transform scale-[0.48] origin-top-left pointer-events-none" style={{ width: '208.33%', height: '208.33%' }}>
                  <TemplateComponent cvData={cvData} customColor={customColors[template.id]} />
                </div>
              </div>

              {/* Hover overlay */}
              {!isRestricted && (
                <div className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${
                  selectedTemplate === template.id ? "opacity-0" : ""
                }`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Download Buttons */}
      <div className="flex flex-wrap justify-center gap-4 pt-6">
        <Button
          onClick={handleDownloadPDF}
          disabled={selectedTemplate === null || isDownloading}
          size="lg"
          className="gap-2 px-8 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
        >
          <Download size={20} />
          {isDownloading ? t.downloading : t.downloadPDF}
        </Button>
        {isPremium ? (
          <Button
            onClick={handleDownloadPNG}
            disabled={selectedTemplate === null || isDownloading}
            size="lg"
            variant="outline"
            className="gap-2 px-8 border-2 border-purple-600 text-purple-600 hover:bg-purple-50"
          >
            <ImageIcon size={20} />
            {isDownloading ? t.downloadingPNG : t.downloadPNG}
          </Button>
        ) : (
          <Button
            onClick={() => onRestrictedAccess?.()}
            size="lg"
            variant="outline"
            className="gap-2 px-8 border-2 border-gray-300 text-gray-500 hover:bg-gray-50"
            title={t.proFeature}
          >
            <ImageIcon size={20} />
            {t.downloadPNG} ({t.proFeature})
          </Button>
        )}
      </div>

      {selectedTemplate === null && (
        <p className="text-center text-gray-500 text-sm">
          {t.selectTemplatePrompt}
        </p>
      )}

      {/* Fullscreen Preview Dialog */}
      <Dialog open={previewTemplate !== null} onOpenChange={() => setPreviewTemplate(null)}>
        <DialogContent className="max-w-[calc(210mm+3rem)] max-h-[95vh] p-0 overflow-hidden w-auto min-w-[calc(210mm+3rem)]">
          <DialogHeader className="p-6 pb-4 border-b">
            <DialogTitle>
              {t.previewFullscreen}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {t.previewFullscreen}
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-y-auto overflow-x-hidden p-6 bg-gray-100" style={{ maxHeight: 'calc(95vh - 100px)' }}>
            <div className="mx-auto bg-white shadow-2xl" style={{ width: '210mm', minHeight: '297mm' }}>
              {previewTemplate && (() => {
                const template = templates.find(t => t.id === previewTemplate);
                if (!template) return null;
                const TemplateComponent = template.component;
                return <TemplateComponent cvData={cvData} customColor={customColors[previewTemplate]} />;
              })()}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}



