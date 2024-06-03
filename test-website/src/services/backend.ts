import { HttpClient } from './httpClient';

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
  clarityScore: number;
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
  score: number;
  startedAt: string;
  studyId: string;
  updatedAt: string;
  visionApiResult: AdVision;
}

export interface BackendError {
  errorMessage: string;
  errors: string[];
  statusCode: number;
}

export interface PaintImageResponse {
  id: number;
  jobs: PaintImageJob[];
  output: unknown[];
}

export type PaintImageJobInputOptions = Options & { image_path: string };
export type PaintImageJobInputNewOptions = NewOptions & { image: string };

export interface PaintImageJob {
  completedAt?: string;
  createdAt: string;
  error?: { code: number; message: string };
  id: 'string';
  input: PaintImageJobInputOptions | PaintImageJobInputNewOptions;
  logs: string;
  seed: number;
  prompt: string;
  status: 'starting' | 'processing' | 'succeeded' | 'failed';
  urls: { cancel: string; get: string };
  version: string;
  output?: string[];
}

export type Options = {
  prompt: string; // required, max: 100
  negative_prompt: string; // optional, max: 100
  regen_prompt: boolean; // optional, true/false. default: false. If true, ChatGPT will generate a new prompt
  image_num: number; // optional, default: 1, max: 4
  manual_seed: number; // optional, default: -1
  guidance_scale: string; // optional, default: 7.5
  num_inference_steps: number; // optional, default: 20,
  product_size: string; // optional, default: Original, options: 'Original' | '0.6 * width' | '0.5 * width' | '0.4 * width' | '0.3 * width' | '0.2 * width'
  scale: number; // optional, range 1 - 4
};

// sdxl paint
export type NewOptions = {
  apply_watermark: boolean;
  condition_scale: number;
  guidance_scale: number;
  lora_scale: number;
  negative_prompt: string;
  num_inference_steps: number;
  num_outputs: number;
  prompt: string;
  refine?: string;
  refine_steps: number;
  regen_prompt: boolean;
  scheduler: string;
  seed: number;
  strength?: number;
  lora_weights?: string;
};

export type NewOptionsInput = {
  apply_watermark: boolean;
  condition_scale: number;
  guidance_scale: number;
  lora_scale: number;
  negative_prompt: string;
  num_inference_steps: number;
  num_outputs: number;
  prompt: string;
  refine?: string;
  refine_steps: number;
  scheduler: string;
  seed?: number;
  strength?: number;
  lora_weights?: string;
};

interface ActivateProResponse {
  ok: boolean;
  redirect_url: string;
}

interface RemoveBackgroundResponse {
  imageUrl: string;
}

interface IdentifyImageResponse {
  imageDescription: string;
}

export interface UpscaleImageResponse {
  createdAt: string;
  faceEnhance: boolean;
  id: number;
  imageUrl: string;
  model: string;
  scale: number;
  upscaledImageUrl: string;
  userId: number;
}

const BACKEND_URL = 'https://rupert-ai-server-ds2havyh3q-ew.a.run.app';

export class Backend {
  public static upload = async ({
    accessToken,
    files,
  }: {
    accessToken: string;
    files: File[];
  }): Promise<ResearchUploadResponse> => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }
    return HttpClient.post(`${BACKEND_URL}/research`, accessToken, formData);
  };

  public static uploadGenerated = async ({
    accessToken,
    files,
    name,
  }: {
    accessToken: string;
    files: string[];
    name: string;
  }): Promise<ResearchUploadResponse> => {
    return HttpClient.post(`${BACKEND_URL}/research/url`, accessToken, JSON.stringify({ images: files, name }), {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
  };

  public static getResultItem = async (accessToken: string, id: number, itemId: number): Promise<ResearchItem> => {
    return HttpClient.get(`${BACKEND_URL}/research/${id}/${itemId}`, accessToken);
  };

  public static getResult = async (accessToken: string, id: number): Promise<ResearchResultResponse> => {
    return HttpClient.get(`${BACKEND_URL}/research/${id}`, accessToken);
  };

  public static getResults = async (accessToken: string): Promise<ResearchResultResponse[]> => {
    return HttpClient.get(`${BACKEND_URL}/research`, accessToken);
  };

  public static paintImage = async (accessToken: string, file: File, options: Options): Promise<PaintImageResponse> => {
    const formData = new FormData();
    formData.append('image', file);
    Object.keys(options).forEach(key => {
      formData.append(key, options[key as keyof Options] as string);
    });

    return HttpClient.post(`${BACKEND_URL}/repl/paint`, accessToken, formData, {
      Accept: 'application/json',
    });
  };

  public static paintImageNew = async (
    accessToken: string,
    file: Blob,
    options: NewOptionsInput,
  ): Promise<PaintImageResponse> => {
    const formData = new FormData();
    formData.append('image', file);
    Object.keys(options).forEach(key => {
      formData.append(key, options[key as keyof NewOptionsInput] as string);
    });

    return HttpClient.post(`${BACKEND_URL}/repl/paint-sdxl`, accessToken, formData, {
      Accept: 'application/json',
    });
  };

  public static getPaintImages = async (accessToken: string): Promise<PaintImageResponse[]> => {
    return HttpClient.get(`${BACKEND_URL}/repl/paint`, accessToken);
  };

  public static getPaintImage = async (accessToken: string, id: string): Promise<PaintImageResponse> => {
    return HttpClient.get(`${BACKEND_URL}/repl/paint/${id}`, accessToken);
  };

  public static regeneratePaintImage = async (
    accessToken: string,
    id: string,
    options: Options,
  ): Promise<PaintImageResponse> => {
    const newOptions: Record<string, string | number | boolean> = {};
    Object.entries(options).forEach(([key, value]) => {
      if (key !== 'image_path' && key !== 'api_key' && key !== 'image') {
        newOptions[key] = value;
      }
    });

    return HttpClient.post(`${BACKEND_URL}/repl/paint/${id}`, accessToken, JSON.stringify(newOptions), {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
  };

  public static regeneratePaintImageNew = async (
    accessToken: string,
    id: string,
    options: NewOptionsInput,
  ): Promise<PaintImageResponse> => {
    const newOptions: Record<string, string | number | boolean> = {};
    Object.entries(options).forEach(([key, value]) => {
      if (key !== 'image_path' && key !== 'api_key' && key !== 'image') {
        newOptions[key] = value;
      }
    });

    return HttpClient.post(`${BACKEND_URL}/repl/paint-sdxl/${id}`, accessToken, JSON.stringify(newOptions), {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
  };

  public static activatePro = async (accessToken: string): Promise<ActivateProResponse> => {
    return HttpClient.post(`${BACKEND_URL}/user/payment`, accessToken, undefined, {
      Accept: 'application/json',
    });
  };

  public static getBilling = async (accessToken: string): Promise<ActivateProResponse> => {
    return HttpClient.post(`${BACKEND_URL}/user/payment/portal`, accessToken, undefined, {
      Accept: 'application/json',
    });
  };

  public static removeBackground = async (accessToken: string, file: File): Promise<RemoveBackgroundResponse> => {
    const formData = new FormData();
    formData.append('image', file);

    return HttpClient.post(`${BACKEND_URL}/remove-background`, accessToken, formData, {
      Accept: 'application/json',
    });
  };

  public static identifyImage = async (accessToken: string, file: Blob): Promise<IdentifyImageResponse> => {
    const formData = new FormData();
    formData.append('image', file);

    return HttpClient.post(`${BACKEND_URL}/identify-image`, accessToken, formData, {
      Accept: 'application/json',
    });
  };

  public static upscale = async ({
    accessToken,
    file,
    options,
  }: {
    accessToken: string;
    file: File;
    options: { scale: number; faceEnhance: boolean };
  }): Promise<UpscaleImageResponse> => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('scale', options.scale.toString());
    formData.append('faceEnhance', options.faceEnhance.toString());
    return HttpClient.post(`${BACKEND_URL}/repl/upscale`, accessToken, formData, {
      Accept: 'application/json',
    });
  };

  public static getUpscaledImages = async (accessToken: string): Promise<UpscaleImageResponse[]> => {
    return HttpClient.get(`${BACKEND_URL}/repl/upscale`, accessToken);
  };

  public static getUpscaledImage = async (accessToken: string, id: string): Promise<UpscaleImageResponse> => {
    return HttpClient.get(`${BACKEND_URL}/repl/upscale/${id}`, accessToken);
  };
}
