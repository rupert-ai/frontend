interface AdsResponse {
  data: Ad[];
  synced: boolean;
  total: number;
}
interface CropHintsAnnotation {
  cropHints?: CropHintsEntity[] | null;
}
interface CropHintsEntity {
  boundingPoly: BoundingPoly;
  confidence: number;
  importanceFraction: number;
}
interface BoundingPoly {
  vertices?: VerticesEntity[] | null;
}
interface VerticesEntity {
  x: number;
  y?: number | null;
}
interface FullTextAnnotation {
  pages?: PagesEntity[] | null;
  text: string;
}
interface PagesEntity {
  blocks?: BlocksEntity[] | null;
  confidence: number;
  height: number;
  property: Property;
  width: number;
}
interface BlocksEntity {
  blockType: string;
  boundingBox: BoundingBoxOrBoundingPoly;
  confidence: number;
  paragraphs?: ParagraphsEntity[] | null;
}
interface BoundingBoxOrBoundingPoly {
  vertices?: VerticesEntityOrNormalizedVerticesEntity[] | null;
}
interface VerticesEntityOrNormalizedVerticesEntity {
  x: number;
  y: number;
}
interface ParagraphsEntity {
  boundingBox: BoundingBoxOrBoundingPoly;
  confidence: number;
  words?: WordsEntity[] | null;
}
interface WordsEntity {
  boundingBox: BoundingBoxOrBoundingPoly;
  confidence: number;
  property: Property;
  symbols?: SymbolsEntity[] | null;
}
interface Property {
  detectedLanguages?: DetectedLanguagesEntity[] | null;
}
interface DetectedLanguagesEntity {
  confidence: number;
  languageCode: string;
}
interface SymbolsEntity {
  boundingBox: BoundingBoxOrBoundingPoly;
  confidence: number;
  text: string;
  property?: Property1 | null;
}
interface Property1 {
  detectedBreak: DetectedBreak;
}
interface DetectedBreak {
  type: string;
}
interface ImagePropertiesAnnotation {
  cropHints?: CropHintsEntity[] | null;
  dominantColors: DominantColors;
}
interface DominantColors {
  colors?: ColorsEntity[] | null;
}
interface ColorsEntity {
  color: Color;
  hex: string;
  percent: number;
  percentRounded: number;
  pixelFraction: number;
  rgb: string;
  score: number;
}
interface Color {
  blue: number;
  green: number;
  red: number;
  alpha?: number;
}
interface LabelAnnotationsEntity {
  description: string;
  mid: string;
  score: number;
  topicality: number;
}
interface LocalizedObjectAnnotationsEntity {
  boundingPoly: BoundingPoly1;
  mid: string;
  name: string;
  score: number;
}
interface BoundingPoly1 {
  normalizedVertices?: VerticesEntityOrNormalizedVerticesEntity[] | null;
}
interface SafeSearchAnnotation {
  adult: string;
  medical: string;
  racy: string;
  spoof: string;
  violence: string;
}
interface TextAnnotationsEntity {
  boundingPoly: BoundingBoxOrBoundingPoly;
  description: string;
  locale?: string | null;
}

type FaceLikelihood = "VERY_UNLIKELY" | "VERY_LIKELY";

export interface FaceAnnotationsEntity {
  angerLikelihood: FaceLikelihood;
  blurredLikelihood: FaceLikelihood;
  boundingPoly: BoundingPolyOrFdBoundingPolyOrBoundingBox;
  detectionConfidence: number;
  fdBoundingPoly: BoundingPolyOrFdBoundingPolyOrBoundingBox;
  headwearLikelihood: FaceLikelihood;
  joyLikelihood: FaceLikelihood;
  landmarkingConfidence: number;
  landmarks?: LandmarksEntity[] | null;
  panAngle: number;
  rollAngle: number;
  sorrowLikelihood: FaceLikelihood;
  surpriseLikelihood: FaceLikelihood;
  tiltAngle: number;
  underExposedLikelihood: FaceLikelihood;
}

type AdVision = {
  cropHintsAnnotation?: CropHintsAnnotation;
  faceAnnotations?: FaceAnnotationsEntity[] | null;
  fullTextAnnotation?: FullTextAnnotation;
  imagePropertiesAnnotation?: ImagePropertiesAnnotation;
  labelAnnotations?: LabelAnnotationsEntity[] | null;
  localizedObjectAnnotations?: LocalizedObjectAnnotationsEntity[] | null;
  safeSearchAnnotation?: SafeSearchAnnotation;
  textAnnotations?: TextAnnotationsEntity[] | null;
  error?: { code: number; message: string };
};

export type Ad = {
  name: string;
  image_url?: string;
  clarity_score?: number;
  impressions: number;
  amount_spent: number;
  clicks: number;
  cpc: number;
  ctr: number;
  reach: number;
  inline_link_clicks: number;
  outbound_clicks: number;
  created_at: string;
  objective: string;
  vision: AdVision;
  account_id: string;
  account_name: string;
  adset_id: string;
  adset_name: string;
  campaign_id: string;
  campaign_name: string;
};

export interface BoundingPolyOrFdBoundingPolyOrBoundingBox {
  vertices?: VerticesEntityOrNormalizedVerticesEntity[] | null;
}
export interface LandmarksEntity {
  position: Position;
  type: string;
}
export interface Position {
  x: number;
  y: number;
  z: number;
}

export class Backend {
  public static getAdsList = async (
    accessToken: string
  ): Promise<AdsResponse> => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE}/ads`, {
      headers: {
        Authorization: accessToken,
        Accept: "application/json",
      },
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  };
}
