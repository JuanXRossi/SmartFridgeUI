export interface ProductResponse {
  id: number;
  name: string;
  urgencyName: string;
}

export interface ProductRequest {
  name: string;
  urgencyId: number;
}
