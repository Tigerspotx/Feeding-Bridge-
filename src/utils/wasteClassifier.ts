
import { pipeline } from '@huggingface/transformers';
import { env } from '@huggingface/transformers';

// Configure transformers.js to use consistent download settings
env.allowLocalModels = false;
env.useBrowserCache = false;

export type WasteCategory = 'recyclable' | 'compostable' | 'hazardous' | 'general';

export interface ClassificationResult {
  category: WasteCategory;
  confidence: number;
  description: string;
  tips: string[];
}

// Map classifier labels to our waste categories and provide descriptions
const categoryMapping: Record<string, {
  category: WasteCategory, 
  description: string,
  tips: string[]
}> = {
  // Recyclable items
  'plastic': {
    category: 'recyclable',
    description: 'This appears to be plastic waste.',
    tips: ['Rinse containers before recycling', 'Remove caps and lids', 'Check for recycling symbols']
  },
  'paper': {
    category: 'recyclable',
    description: 'This appears to be paper waste.',
    tips: ['Keep paper dry and clean', 'Flatten cardboard boxes', 'Remove tape and staples if possible']
  },
  'cardboard': {
    category: 'recyclable',
    description: 'This appears to be cardboard waste.',
    tips: ['Flatten boxes to save space', 'Remove tape and staples', 'Keep dry and clean']
  },
  'metal': {
    category: 'recyclable',
    description: 'This appears to be metal waste.',
    tips: ['Rinse food residue', 'Crush cans to save space', 'Remove paper labels if possible']
  },
  'glass': {
    category: 'recyclable',
    description: 'This appears to be glass waste.',
    tips: ['Rinse containers', 'Remove caps and lids', 'Sort by color if required in your area']
  },
  // Compostable items
  'food': {
    category: 'compostable',
    description: 'This appears to be food waste.',
    tips: ['Avoid meat and dairy in home compost', 'Cut into smaller pieces to speed decomposition', 'Mix with dry materials']
  },
  'fruit': {
    category: 'compostable',
    description: 'This appears to be fruit waste.',
    tips: ['Cut into smaller pieces', 'Include peels and cores', 'Mix with dry materials like leaves']
  },
  'vegetable': {
    category: 'compostable',
    description: 'This appears to be vegetable waste.',
    tips: ['Cut into smaller pieces', 'All vegetable scraps are compostable', 'Mix with dry materials']
  },
  'plant': {
    category: 'compostable',
    description: 'This appears to be plant waste.',
    tips: ['Cut into smaller pieces', 'Avoid diseased plants', 'Mix green and brown materials']
  },
  'leaves': {
    category: 'compostable',
    description: 'These appear to be leaves or yard waste.',
    tips: ['Shred to speed decomposition', 'Mix with food scraps for balance', 'Keep slightly moist']
  },
  // Hazardous items
  'battery': {
    category: 'hazardous',
    description: 'This appears to be a battery.',
    tips: ['Never throw in regular trash', 'Take to special collection points', 'Store in a cool, dry place before disposal']
  },
  'electronic': {
    category: 'hazardous',
    description: 'This appears to be electronic waste.',
    tips: ['Take to e-waste collection centers', 'Data should be wiped from devices', 'Check if manufacturer has a take-back program']
  },
  'chemical': {
    category: 'hazardous',
    description: 'This appears to be chemical waste.',
    tips: ['Never pour down drains', 'Keep in original containers', 'Take to hazardous waste collection']
  },
  'medicine': {
    category: 'hazardous',
    description: 'This appears to be medicine waste.',
    tips: ['Never flush medications', 'Take to pharmacy take-back programs', 'Remove personal information from containers']
  },
  // Default for general waste
  'default': {
    category: 'general',
    description: 'This appears to be general waste.',
    tips: ['Consider if any parts can be recycled', 'Minimize waste when possible', 'Dispose in general waste bin']
  }
};

// Initialize the classifier
let classifierPromise: Promise<any> | null = null;

const getClassifier = async () => {
  if (!classifierPromise) {
    console.log('Loading image classification model...');
    classifierPromise = pipeline(
      'image-classification',
      'Xenova/clip-vit-base-patch32',
      { quantized: true }
    );
  }
  return classifierPromise;
};

export const classifyWasteImage = async (imageFile: File): Promise<ClassificationResult> => {
  try {
    // Load the classifier
    const classifier = await getClassifier();
    
    // Create an image element from the file
    const img = document.createElement('img');
    img.src = URL.createObjectURL(imageFile);
    
    // Wait for the image to load
    await new Promise(resolve => {
      img.onload = resolve;
    });
    
    console.log('Running image classification...');
    
    // Run the classification
    const results = await classifier(img, {
      candidate_labels: [
        'plastic', 'paper', 'cardboard', 'metal', 'glass', 
        'food', 'fruit', 'vegetable', 'plant', 'leaves',
        'battery', 'electronic', 'chemical', 'medicine',
        'general waste', 'trash'
      ]
    });
    
    // Clean up the object URL
    URL.revokeObjectURL(img.src);
    
    console.log('Classification results:', results);
    
    // Get the top result
    const topResult = results[0];
    const label = topResult.label.toLowerCase();
    
    // Find matching category or use default
    let matchingCategory = categoryMapping['default'];
    
    for (const key of Object.keys(categoryMapping)) {
      if (label.includes(key)) {
        matchingCategory = categoryMapping[key];
        break;
      }
    }
    
    return {
      category: matchingCategory.category,
      confidence: topResult.score,
      description: matchingCategory.description,
      tips: matchingCategory.tips
    };
  } catch (error) {
    console.error('Error classifying waste image:', error);
    throw error;
  }
};
