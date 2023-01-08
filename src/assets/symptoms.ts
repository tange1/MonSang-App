import { SymptomLocation } from 'src/model/interfaces';

export const SYMPTOM_LOCATIONS: SymptomLocation[] = [
  {
    name: 'eye',
    sct: '81745001',
    image: 'eye.json'
  },
  {
    name: 'nose',
    sct: '45206002',
    image: 'nose.json'
  },
  {
    name: 'mouth',
    sct: '312533001',
    image: 'throat.json'
  },
  {
    name: 'lung',
    sct: '39607008',
    image: 'lung.json'
  },
  {
    name: 'skin',
    sct: '39937001',
    image: 'skin.json'
  },
  {
    name: 'gastro',
    sct: '122865005',
    image: 'digestive.json'
  }
]
