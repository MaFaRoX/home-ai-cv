"use client";

import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { RotateCw, ZoomIn, ZoomOut } from "lucide-react";
import { toast } from "sonner";
import type { Area, Point } from "react-easy-crop";

interface PhotoCropperDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageSrc: string;
  onCropComplete: (croppedImage: string) => void;
}

const OUTPUT_SIZE = 400; // Fixed 400x400px output

export function PhotoCropperDialog({
  open,
  onOpenChange,
  imageSrc,
  onCropComplete,
}: PhotoCropperDialogProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropChange = useCallback((crop: Point) => {
    setCrop(crop);
  }, []);

  const onZoomChange = useCallback((zoom: number) => {
    setZoom(zoom);
  }, []);

  const onRotationChange = useCallback((rotation: number) => {
    setRotation(rotation);
  }, []);

  const onCropCompleteCallback = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.src = url;
    });

  const getRadianAngle = (degreeValue: number) => {
    return (degreeValue * Math.PI) / 180;
  };

  const rotateSize = (width: number, height: number, rotation: number) => {
    const rotRad = getRadianAngle(rotation);
    return {
      width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
      height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
    };
  };

  const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: Area,
    rotation = 0,
    flip = { horizontal: false, vertical: false }
  ): Promise<string> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("No 2d context");
    }

    const rotRad = getRadianAngle(rotation);

    // Calculate bounding box of the rotated image
    const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
      image.width,
      image.height,
      rotation
    );

    // Set canvas size to match bounding box
    canvas.width = bBoxWidth;
    canvas.height = bBoxHeight;

    // Move canvas context to a central location to allow rotation and flipping
    ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
    ctx.rotate(rotRad);
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
    ctx.translate(-image.width / 2, -image.height / 2);

    // Draw rotated image
    ctx.drawImage(image, 0, 0);

    // Get the image data from the rotated canvas at the crop area
    const imageData = ctx.getImageData(
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height
    );

    // Create output canvas with fixed size
    const outputCanvas = document.createElement("canvas");
    outputCanvas.width = OUTPUT_SIZE;
    outputCanvas.height = OUTPUT_SIZE;
    const outputCtx = outputCanvas.getContext("2d");

    if (!outputCtx) {
      throw new Error("No 2d context for output canvas");
    }

    // Create a temporary canvas to hold the cropped image data
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = pixelCrop.width;
    tempCanvas.height = pixelCrop.height;
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) {
      throw new Error("No 2d context for temp canvas");
    }
    
    // Put the cropped image data into temp canvas
    tempCtx.putImageData(imageData, 0, 0);

    // Draw the cropped image scaled to the output size
    outputCtx.drawImage(tempCanvas, 0, 0, OUTPUT_SIZE, OUTPUT_SIZE);

    return new Promise((resolve, reject) => {
      outputCanvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        const reader = new FileReader();
        reader.addEventListener("load", () => resolve(reader.result as string));
        reader.addEventListener("error", (error) => reject(error));
        reader.readAsDataURL(blob);
      }, "image/jpeg", 0.95);
    });
  };

  const handleSave = async () => {
    if (!croppedAreaPixels) {
      return;
    }

    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
      onCropComplete(croppedImage);
      onOpenChange(false);
      // Reset state
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setRotation(0);
      setCroppedAreaPixels(null);
    } catch (error) {
      console.error("Error cropping image:", error);
      toast.error("Failed to crop image. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-full p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Crop Your Photo</DialogTitle>
        </DialogHeader>
        <div className="relative w-full" style={{ height: "400px", backgroundColor: "#000" }}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={1} // Square aspect ratio
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onRotationChange={onRotationChange}
            onCropComplete={onCropCompleteCallback}
            cropShape="rect"
            showGrid={true}
          />
        </div>
        <div className="px-6 py-4 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ZoomOut className="w-4 h-4 text-gray-500" />
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={(e) => onZoomChange(Number(e.target.value))}
                className="flex-1"
              />
              <ZoomIn className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600 w-12 text-right">{zoom.toFixed(1)}x</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCw className="w-4 h-4 text-gray-500" />
              <input
                type="range"
                value={rotation}
                min={0}
                max={360}
                step={1}
                onChange={(e) => onRotationChange(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm text-gray-600 w-12 text-right">{rotation}°</span>
            </div>
          </div>
        </div>
        <DialogFooter className="px-6 pb-6">
          <Button variant="outline" onClick={() => {
            onOpenChange(false);
            // Reset state
            setCrop({ x: 0, y: 0 });
            setZoom(1);
            setRotation(0);
            setCroppedAreaPixels(null);
          }}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={!croppedAreaPixels}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Save Cropped Photo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

