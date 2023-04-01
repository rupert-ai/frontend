interface ResearchUploadResponse {
  batchId: number;
  images: number;
  success: boolean;
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

type FaceLikelihood = 'VERY_UNLIKELY' | 'VERY_LIKELY';

interface BoundingPolyOrFdBoundingPolyOrBoundingBox {
  vertices?: VerticesEntityOrNormalizedVerticesEntity[] | null;
}

interface VerticesEntityOrNormalizedVerticesEntity {
  x: number;
  y: number;
}

interface FaceAnnotationsEntity {
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

interface LandmarksEntity {
  position: Position;
  type: string;
}
interface Position {
  x: number;
  y: number;
  z: number;
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

export interface ResearchResultResponse {
  createdAt: string;
  finishedAt: string;
  id: number;
  items?: ResearchItem[];
  name: string;
  startedAt: string;
  updatedAt: string;
}

export interface ResearchItem {
  clarityScore: string;
  createdAt: string;
  finishedAt: string;
  id: number;
  // link to image
  imageHeatmap: string;
  // link to image
  imageOriginal: string;
  // link to image
  imageSaliency: string;
  name: string;
  researchId: string;
  score: string;
  startedAt: string;
  studyId: string;
  updatedAt: string;
  visionApiResult: AdVision;
}

export class Backend {
  public static upload = async (accessToken: string, files: File[]): Promise<ResearchUploadResponse> => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }
    console.log(formData.getAll('images'));
    const response = await fetch(`https://rupert-ai-server-ds2havyh3q-ew.a.run.app/research`, {
      // headers: {
      //   Authorization: accessToken,
      //   // "Content-Type": "multipart/form-data",
      // },
      method: 'POST',
      body: formData,
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  };

  public static getResult = async (accessToken: string, id: number): Promise<ResearchResultResponse> => {
    const response = await fetch(`https://rupert-ai-server-ds2havyh3q-ew.a.run.app/research/${id}`, {
      headers: {
        // Authorization: accessToken,
        Accept: 'application/json',
      },
      method: 'GET',
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  };

  public static getResults = async (accessToken: string): Promise<ResearchResultResponse[]> => {
    const response = await fetch(`https://rupert-ai-server-ds2havyh3q-ew.a.run.app/research`, {
      headers: {
        // Authorization: accessToken,
        Accept: 'application/json',
      },
      method: 'GET',
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  };
}
