"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { useAuth } from "./AuthContext";
import { useLanguage } from "../App";
import { toast } from "sonner";
import { X, Star, Check } from "lucide-react";

interface PremiumDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PremiumDialog({ open, onOpenChange }: PremiumDialogProps) {
  const { t } = useLanguage();
  const { upgradeToPremium } = useAuth();

  const pricingPlans = [
    { period: "month", days: 30, price: 0, label: t.premiumMonth || "Tháng" },
    { period: "year", days: 365, price: 0, label: t.premiumYear || "Năm" },
  ];

  const features = [
    t.premiumFeatureTemplates || "Tất cả 12 mẫu CV",
    t.premiumFeatureCustomSections || "Thêm phần tùy chỉnh",
    t.premiumFeaturePNG || "Tải xuống PNG",
    t.premiumFeatureFullscreen || "Xem trước toàn màn hình",
    t.premiumFeatureCustomizeColors || "Tùy chỉnh màu sắc",
  ];

  const handlePurchase = (days: number) => {
    upgradeToPremium(days);
    toast.success(t.premiumUpgradeSuccess || "Nâng cấp Premium thành công!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 z-[100] h-8 w-8 p-0 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
        <DialogHeader className="pr-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-2 rounded-lg">
              <Star className="h-6 w-6 text-white" />
            </div>
            <DialogTitle className="text-2xl">
              {t.premiumTitle || "Nâng cấp Premium"}
            </DialogTitle>
          </div>
          <DialogDescription className="text-base">
            {t.premiumSubtitle || "Mở khóa tất cả tính năng cao cấp"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Features List */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">
              {t.premiumFeaturesTitle || "Tính năng Premium:"}
            </h3>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <Check className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing Plans */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">
              {t.premiumChoosePlan || "Chọn gói:"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.period}
                  className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-yellow-400 dark:hover:border-yellow-600 transition-all hover:shadow-lg"
                >
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                      {plan.price.toLocaleString('vi-VN')} VND
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {plan.label}
                    </div>
                  </div>
                  <Button
                    onClick={() => handlePurchase(plan.days)}
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold"
                  >
                    {t.premiumSelect || "Chọn"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

