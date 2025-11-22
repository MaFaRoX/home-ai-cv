import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useLanguage } from "../App";

interface TutorialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TutorialDialog({ open, onOpenChange }: TutorialDialogProps) {
  const { t } = useLanguage();
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: t.tutorialStep1Title,
      description: t.tutorialStep1Desc,
      image: "📝",
    },
    {
      title: t.tutorialStep2Title,
      description: t.tutorialStep2Desc,
      image: "🎨",
    },
    {
      title: t.tutorialStep3Title,
      description: t.tutorialStep3Desc,
      image: "📥",
    },
    {
      title: t.tutorialStep5Title,
      description: t.tutorialStep5Desc,
      image: "✨",
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onOpenChange(false);
      setStep(0);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setStep(0);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl">{t.tutorialTitle}</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0"
            >
              <X size={18} />
            </Button>
          </div>
          <DialogDescription className="sr-only">
            {steps[step].description}
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          {/* Step Indicator */}
          <div className="flex justify-center gap-2 mb-6">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === step
                    ? "w-8 bg-blue-600"
                    : index < step
                    ? "w-2 bg-blue-400"
                    : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Step Content */}
          <div className="text-center space-y-4">
            <div className="text-6xl mb-4">{steps[step].image}</div>
            <h3 className="text-xl">{steps[step].title}</h3>
            <p className="text-gray-600 leading-relaxed max-w-xl mx-auto">
              {steps[step].description}
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={step === 0}
              className="gap-2"
            >
              <ArrowLeft size={16} />
              {t.prevStep}
            </Button>

            <div className="text-sm text-gray-500 self-center">
              {step + 1} / {steps.length}
            </div>

            <Button onClick={handleNext} className="gap-2">
              {step === steps.length - 1 ? t.getStarted : t.nextStep}
              {step < steps.length - 1 && <ArrowRight size={16} />}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
