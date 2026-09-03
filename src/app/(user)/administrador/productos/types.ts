interface Urgency {
  id: number;
  name: string
}

export interface Product {
  id: number;
  name: string;
  urgency: Urgency;
}

export interface ProductFormData {
  name: string;
  urgencyId: number;
}
